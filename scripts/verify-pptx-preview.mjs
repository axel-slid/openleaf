import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const requestedPresentations = JSON.parse(process.env.OPENLEAF_TEST_PPTXES || "[]");
if (!Array.isArray(requestedPresentations) || !requestedPresentations.length) {
  throw new Error("Set OPENLEAF_TEST_PPTXES to a JSON array containing at least one .ppt or .pptx path.");
}

const require = createRequire(import.meta.url);
const electronPath = require("electron");
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(scriptDir, "..");
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-pptx-preview-"));
const projectPath = path.join(testRoot, "project");
const userDataPath = path.join(testRoot, "user-data");
const port = 9800 + Math.floor(Math.random() * 150);

await fs.mkdir(projectPath, { recursive: true });
await fs.writeFile(path.join(projectPath, "main.tex"), String.raw`\documentclass{article}
\begin{document}
PowerPoint preview regression project.
\end{document}
`, "utf8");

const presentationNames = [];
for (const sourcePath of requestedPresentations) {
  const extension = path.extname(sourcePath).toLowerCase();
  if (![".ppt", ".pptx"].includes(extension)) throw new Error(`Not a PowerPoint file: ${sourcePath}`);
  await fs.access(sourcePath);
  const name = path.basename(sourcePath);
  presentationNames.push(name);
  await fs.copyFile(sourcePath, path.join(projectPath, name));
}

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
      const renderer = tabs.find((item) => /index\.html(?:$|[?#])/i.test(item.url || ""));
      if (renderer) return renderer;
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

  const readyStarted = Date.now();
  while (!(await evaluate(socket, "Boolean(window.localOverleaf)"))) {
    if (Date.now() - readyStarted > 10000) throw new Error("Openleaf preload API did not become ready.");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const result = await evaluate(socket, `(async () => {
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
    const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
    const listed = await window.localOverleaf.listProjectFiles(project.id);
    const flatten = (nodes) => nodes.flatMap((node) => [node, ...flatten(node.children || [])]);
    const files = flatten(listed.files || []);
    const results = [];
    for (const name of ${JSON.stringify(presentationNames)}) {
      const node = files.find((item) => item.name === name);
      const buffer = await window.localOverleaf.readPdf(project.id, name);
      const bytes = new Uint8Array(buffer);
      results.push({
        name,
        listedAsPresentation: Boolean(node && node.presentation),
        byteLength: bytes.byteLength,
        signature: Array.from(bytes.slice(0, 4))
      });
    }
    await openProject(project.id);
    const uiName = ${JSON.stringify(presentationNames[presentationNames.length - 1])};
    const uiNode = flattenProjectFileNodes(projectFiles).find((item) => item.name === uiName);
    await selectProjectFile(uiNode, { preview: false });
    const uiButton = [...fileTree.querySelectorAll(".file-item")].find((item) => item.dataset.filePath === uiName);
    return {
      presentations: results,
      ui: {
        title: pdfTitle.textContent,
        meta: pdfMeta.textContent,
        canvasCount: pdfViewer.querySelectorAll(".pdf-page canvas").length,
        icon: uiButton && uiButton.querySelector(".file-icon img") ? uiButton.querySelector(".file-icon img").getAttribute("src") : "",
        selectedPath: selectedPdfRelativePath
      }
    };
  })()`);

  for (const item of result.presentations) {
    const isPdf = item.signature.join(",") === "37,80,68,70";
    if (!item.listedAsPresentation || !isPdf || item.byteLength < 1000) {
      throw new Error(`PowerPoint preview verification failed: ${JSON.stringify(item)}`);
    }
  }
  if (
    result.ui.title !== presentationNames[presentationNames.length - 1]
    || result.ui.selectedPath !== presentationNames[presentationNames.length - 1]
    || result.ui.canvasCount < 1
    || !result.ui.icon.endsWith("/powerpoint.svg")
  ) {
    throw new Error(`PowerPoint UI verification failed: ${JSON.stringify(result.ui)}`);
  }
  console.log(JSON.stringify({ ok: true, presentations: result }, null, 2));
} finally {
  if (socket) socket.close();
  child.kill("SIGTERM");
  await new Promise((resolve) => child.once("exit", resolve));
  await fs.rm(testRoot, { recursive: true, force: true });
}
