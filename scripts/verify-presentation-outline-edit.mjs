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
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-outline-edit-"));
const testPresentation = path.join(testRoot, "Outline Edit Test.pptx");
const userDataPath = path.join(testRoot, "user-data");
const port = 10120 + Math.floor(Math.random() * 30);
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
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(testPresentation)}]);
    const project = added.project;
    projects = added.projects || [project];
    await openProject(project.id);
    const outlined = currentPresentationSlide().elements.find((element) => element.tagName === "p:sp");
    if (!outlined) return { passed: false, reason: "No editable PowerPoint shape found" };
    selectPresentationElement(outlined);
    const controlsVisible = !pptxOutlineControls.hidden
      && !pptxLineColorInput.disabled
      && !pptxLineWidthInput.disabled
      && !pptxLineStyleSelect.disabled;
    updateSelectedPresentationOutline({
      lineColor: "#D97706",
      lineWidth: 2.5,
      lineStyle: "dashDot"
    });
    const node = pptxElementLayer.querySelector(
      '[data-element-id="' + CSS.escape(String(outlined.id)) + '"]'
    );
    const livePreviewWorks = node?.style.borderColor === "rgb(217, 119, 6)"
      || node?.style.borderColor === "#D97706"
      || node?.style.borderColor === "#d97706";
    const controlsUpdated = pptxLineColorInput.value.toLowerCase() === "#d97706"
      && Number(pptxLineWidthInput.value) === 2.5
      && pptxLineStyleSelect.value === "dashDot";

    await saveActivePresentation();
    const reloaded = await window.localOverleaf.loadPresentationProject(project.id);
    const persisted = reloaded.presentation.slides[0].elements.find((element) => (
      String(element.id) === String(outlined.id)
    ));
    const persistenceWorks = Boolean(persisted)
      && String(persisted.lineColor || "").toLowerCase() === "#d97706"
      && Math.abs(Number(persisted.lineWidth) - 2.5) < 0.01
      && persisted.lineStyle === "dashDot";

    return {
      passed: controlsVisible && livePreviewWorks && controlsUpdated && persistenceWorks,
      controlsVisible,
      livePreviewWorks,
      controlsUpdated,
      persistenceWorks,
      persisted: persisted && {
        lineColor: persisted.lineColor,
        lineWidth: persisted.lineWidth,
        lineStyle: persisted.lineStyle
      }
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
  await fs.rm(testRoot, { recursive: true, force: true });
}
