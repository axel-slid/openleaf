import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const electronPath = require("electron");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-include-compile-"));
const projectPath = path.join(testRoot, "project");
const userDataPath = path.join(testRoot, "user-data");
const port = 9400 + Math.floor(Math.random() * 400);

await fs.mkdir(projectPath, { recursive: true });
await fs.writeFile(path.join(projectPath, "main.tex"), String.raw`\documentclass{article}
\begin{document}
Main document.
\input{appendix}
\end{document}
`, "utf8");
await fs.writeFile(path.join(projectPath, "appendix.tex"), "Initial appendix.\n", "utf8");

const child = spawn(electronPath, [
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataPath}`,
  appRoot
], {
  stdio: ["ignore", "pipe", "pipe"]
});

let childOutput = "";
child.stdout.on("data", (chunk) => { childOutput += chunk.toString(); });
child.stderr.on("data", (chunk) => { childOutput += chunk.toString(); });

async function waitForRenderer(timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const tabs = await response.json();
      if (tabs.length) return tabs[0];
    } catch (error) {
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Openleaf renderer did not start.\n${childOutput}`);
}

function evaluate(socket, expression) {
  return new Promise((resolve, reject) => {
    const id = 1;
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", onMessage);
      if (message.error || message.result?.exceptionDetails) {
        reject(new Error(JSON.stringify(message.error || message.result.exceptionDetails)));
      } else {
        resolve(message.result.result.value);
      }
    };
    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({
      id,
      method: "Runtime.evaluate",
      params: { expression, awaitPromise: true, returnByValue: true }
    }));
  });
}

let socket;
try {
  const tab = await waitForRenderer();
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  const updatedAppendix = "Updated appendix compiled through main.tex.\n";
  const result = await evaluate(socket, `(async () => {
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
    const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
    return window.localOverleaf.compile(project.id, "appendix.tex", ${JSON.stringify(updatedAppendix)});
  })()`);

  const savedAppendix = await fs.readFile(path.join(projectPath, "appendix.tex"), "utf8");
  await fs.access(path.join(projectPath, "main.pdf"));
  if (savedAppendix !== updatedAppendix) throw new Error("Compile did not save the active included file.");
  if (result.compiledPdfName !== "main.pdf" || result.compiledPdfRelativePath !== "main.pdf") {
    throw new Error(`Compile returned the wrong PDF: ${JSON.stringify(result)}`);
  }
  console.log(JSON.stringify({ ok: true, compiledPdf: result.compiledPdfRelativePath }));
} finally {
  if (socket) socket.close();
  child.kill("SIGTERM");
  await new Promise((resolve) => child.once("exit", resolve));
  await fs.rm(testRoot, { recursive: true, force: true });
}
