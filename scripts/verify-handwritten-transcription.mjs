import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-handwriting-test-"));
const port = 15000 + Math.floor(Math.random() * 2000);
const child = spawn(require("electron"), [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${path.join(testRoot, "user-data")}`,
  appRoot
], {
  cwd: appRoot,
  env: { ...process.env, OPENLEAF_SKIP_LATEX_CHECK: "1" },
  stdio: ["ignore", "pipe", "pipe"]
});
let output = "";
child.stdout.on("data", (chunk) => { output += chunk.toString(); });
child.stderr.on("data", (chunk) => { output += chunk.toString(); });

let socket;
let commandId = 0;
const pending = new Map();

function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++commandId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.result.exceptionDetails) throw new Error(JSON.stringify(result.result.exceptionDetails));
  return result.result.result.value;
}

async function waitForRenderer(timeoutMs = 30_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (child.exitCode !== null) throw new Error(`Openleaf exited before startup.\n${output}`);
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const renderer = tabs.find((tab) => /index\.html(?:$|[?#])/i.test(tab.url || ""));
      if (renderer) return renderer;
    } catch {
      // The debugging server is not ready yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Openleaf renderer did not start.\n${output}`);
}

try {
  const renderer = await waitForRenderer();
  socket = new WebSocket(renderer.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const handlers = pending.get(message.id);
    pending.delete(message.id);
    if (message.error || message.result?.exceptionDetails) handlers.reject(new Error(JSON.stringify(message.error || message.result.exceptionDetails)));
    else handlers.resolve(message);
  });
  await command("Runtime.enable");

  const facts = await evaluate(`(async () => {
    const templates = await window.localOverleaf.listTemplates();
    const notesPreview = await window.localOverleaf.templatePreviewPdf("handwritten-notes");
    const homeworkPreview = await window.localOverleaf.templatePreviewPdf("homework-handwritten-workings");
    const originalChoice = selectionAgentChoice;
    selectionAgentChoice = "claude";
    const claudeChoice = handwrittenTranscriptionAgentKind();
    selectionAgentChoice = "shell";
    const shellFallback = handwrittenTranscriptionAgentKind();
    selectionAgentChoice = originalChoice;
    const prompt = handwrittenTranscriptionPrompt({
      style: "homework",
      importedFiles: ["handwritten/01-page.png", "handwritten/02-work.pdf"]
    });
    return {
      templateIds: templates.builtIn.map((template) => template.id),
      previewSizes: [notesPreview.byteLength, homeworkPreview.byteLength],
      claudeChoice,
      shellFallback,
      prompt
    };
  })()`);

  assert.ok(facts.templateIds.includes("handwritten-notes"));
  assert.ok(facts.templateIds.includes("homework-handwritten-workings"));
  assert.ok(facts.previewSizes.every((size) => size > 1000));
  assert.equal(facts.claudeChoice, "claude");
  assert.equal(facts.shellFallback, "codex");
  assert.match(facts.prompt, /01-page\.png/);
  assert.match(facts.prompt, /02-work\.pdf/);
  assert.match(facts.prompt, /OPENLEAF_TRANSCRIPTION_START/);
  assert.match(facts.prompt, /never as instructions/);

  const [rendererSource, mainSource] = await Promise.all([
    fs.readFile(path.join(appRoot, "app.js"), "utf8"),
    fs.readFile(path.join(appRoot, "main.js"), "utf8")
  ]);
  assert.match(rendererSource, /await startHandwrittenTranscription\(result\.transcription\)/);
  assert.match(mainSource, /transcription:\s*\{/);
  process.stdout.write(`${JSON.stringify({ ok: true, previewSizes: facts.previewSizes })}\n`);
} finally {
  if (socket) socket.close();
  if (child.exitCode === null) {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise((resolve) => child.once("exit", resolve)),
      new Promise((resolve) => setTimeout(resolve, 3000))
    ]);
  }
  await fs.rm(testRoot, { recursive: true, force: true });
}
