import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sourcePresentation = process.env.OPENLEAF_TEST_PPTX;
if (!sourcePresentation) throw new Error("Set OPENLEAF_TEST_PPTX to a .pptx file.");

const require = createRequire(import.meta.url);
const electronPath = require("electron");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = process.env.OPENLEAF_TEST_APP_ROOT || path.resolve(scriptDir, "..");
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-caption-edit-"));
const testPresentation = path.join(testRoot, "Caption Edit Test.pptx");
const userDataPath = path.join(testRoot, "user-data");
const port = 10070 + Math.floor(Math.random() * 30);
await fs.copyFile(sourcePresentation, testPresentation);

const child = spawn(electronPath, [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataPath}`,
  appRoot
], { stdio: ["ignore", "pipe", "pipe"] });

let childOutput = "";
child.stdout.on("data", (chunk) => { childOutput += chunk.toString(); });
child.stderr.on("data", (chunk) => { childOutput += chunk.toString(); });

async function waitForRenderer(timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const tabs = await response.json();
      const renderer = tabs.find((item) => /index\.html(?:$|[?#])/i.test(item.url || ""));
      if (renderer) return renderer;
    } catch (error) {
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Openleaf renderer did not start.\n${childOutput}`);
}

let commandId = 0;
function command(socket, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++commandId;
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", onMessage);
      if (message.error || message.result?.exceptionDetails) {
        reject(new Error(JSON.stringify(message.error || message.result.exceptionDetails)));
      } else resolve(message.result);
    };
    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(socket, expression) {
  const result = await command(socket, "Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  return result.result.value;
}

let socket;
try {
  const tab = await waitForRenderer();
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const readyStarted = Date.now();
  while (!(await evaluate(socket, "Boolean(window.localOverleaf && typeof openProject === 'function')"))) {
    if (Date.now() - readyStarted > 10000) throw new Error("Openleaf did not become ready.");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const result = await evaluate(socket, `(async () => {
    window.__captionTestAlert = "";
    window.alert = (message) => { window.__captionTestAlert = String(message || ""); };
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(testPresentation)}]);
    const project = added.project;
    projects = added.projects || [project];
    await openProject(project.id);
    const caption = currentPresentationSlide().elements.find((element) => /^Figure 5\\./.test(element.text || ""))
      || currentPresentationSlide().elements.find((element) => /^Figure \\d+\\./.test(element.text || ""));
    if (!caption) return { passed: false, reason: "No editable figure caption found" };
    const selector = \`[data-element-id="\${CSS.escape(String(caption.id))}"]\`;
    let node = pptxElementLayer.querySelector(selector);
    const originalText = caption.text;
    const originalPrefixBold = Boolean(caption.richTextRuns?.[0]?.bold)
      && caption.richTextRuns[0].text.startsWith("Figure ");

    node.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      buttons: 1,
      pointerId: 81,
      detail: 1,
      clientX: 240,
      clientY: 220
    }));
    window.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      button: 0,
      pointerId: 81,
      detail: 1,
      clientX: 240,
      clientY: 220
    }));
    node.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      buttons: 1,
      pointerId: 82,
      detail: 2,
      clientX: 245,
      clientY: 220
    }));
    let textNode = node.querySelector(".pptx-element-text");
    const realDoubleClickEditingWorks = textNode?.contentEditable === "true"
      && node.classList.contains("editing");

    const appendedText = originalText + " QA";
    textNode.innerText = appendedText;
    textNode.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: " QA" }));
    textNode.blur();
    const prefixBoldAfterEdit = Boolean(caption.richTextRuns?.[0]?.bold)
      && caption.richTextRuns[0].text === originalText.match(/^Figure \\d+\\./)?.[0];
    const appendedRun = caption.richTextRuns?.[caption.richTextRuns.length - 1];
    const insertedTextUsesRegularStyle = Boolean(appendedRun)
      && appendedRun.text.endsWith(" QA")
      && !appendedRun.bold;

    node = pptxElementLayer.querySelector(selector);
    selectPresentationElement(caption, { rerender: false });
    pptxEditTextButton.click();
    textNode = node.querySelector(".pptx-element-text");
    const editButtonWorks = textNode?.contentEditable === "true" && node.classList.contains("editing");
    textNode.blur();

    await saveActivePresentation();
    const reloaded = await window.localOverleaf.loadPresentationProject(project.id);
    const persisted = reloaded.presentation.slides[0].elements.find((element) => String(element.id) === String(caption.id));
    const persistenceWorks = Boolean(persisted)
      && persisted.text === appendedText
      && persisted.richTextRuns?.[0]?.bold === true
      && persisted.richTextRuns?.[0]?.text === originalText.match(/^Figure \\d+\\./)?.[0]
      && persisted.richTextRuns?.[persisted.richTextRuns.length - 1]?.bold === false;

    return {
      passed: originalPrefixBold
        && realDoubleClickEditingWorks
        && prefixBoldAfterEdit
        && insertedTextUsesRegularStyle
        && editButtonWorks
        && persistenceWorks,
      originalPrefixBold,
      realDoubleClickEditingWorks,
      prefixBoldAfterEdit,
      insertedTextUsesRegularStyle,
      editButtonWorks,
      persistenceWorks,
      alert: window.__captionTestAlert,
      captionId: caption.id
    };
  })()`);

  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
} finally {
  if (socket) socket.close();
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((resolve) => setTimeout(resolve, 3000))
  ]);
}
