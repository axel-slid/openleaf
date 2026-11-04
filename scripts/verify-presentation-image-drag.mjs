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
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-image-drag-"));
const testPresentation = path.join(testRoot, "Image Drag Test.pptx");
const userDataPath = path.join(testRoot, "user-data");
const port = 10020 + Math.floor(Math.random() * 40);
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
    const image = currentPresentationSlide().elements.find((element) => (
      element.type === "image" && element.name === "Longitudinal cNF progression"
    )) || currentPresentationSlide().elements.find((element) => element.type === "image");
    if (!image) return { passed: false, reason: "No editable image element found" };
    const node = pptxElementLayer.querySelector(
      \`[data-element-id="\${CSS.escape(String(image.id))}"]\`
    );
    if (!node) return { passed: false, reason: "No image hit target rendered" };

    const startX = image.x;
    const startY = image.y;
    node.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      buttons: 1,
      pointerId: 31,
      clientX: 220,
      clientY: 220
    }));
    window.dispatchEvent(new PointerEvent("pointermove", {
      bubbles: true,
      buttons: 1,
      pointerId: 31,
      clientX: 252,
      clientY: 240
    }));
    window.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      button: 0,
      pointerId: 31,
      clientX: 252,
      clientY: 240
    }));
    const pointerDragWorks = image.x > startX && image.y > startY && presentationDragState === null;

    const beforeNudge = image.x;
    pptxStageViewport.focus();
    pptxStageViewport.dispatchEvent(new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true
    }));
    const keyboardNudgeWorks = image.x > beforeNudge;

    const cancelNode = pptxElementLayer.querySelector(
      \`[data-element-id="\${CSS.escape(String(image.id))}"]\`
    );
    cancelNode.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      buttons: 1,
      pointerId: 32,
      clientX: 240,
      clientY: 230
    }));
    window.dispatchEvent(new PointerEvent("pointercancel", {
      bubbles: true,
      pointerId: 32,
      clientX: 240,
      clientY: 230
    }));
    const pointerCancelCleansUp = presentationDragState === null;

    const savedX = image.x;
    const savedY = image.y;
    await saveActivePresentation();
    const reloaded = await window.localOverleaf.loadPresentationProject(project.id);
    const persisted = reloaded.presentation.slides[0].elements.find((element) => (
      String(element.id) === String(image.id)
    ));
    const persistenceWorks = Boolean(persisted)
      && Math.abs(persisted.x - savedX) < 2
      && Math.abs(persisted.y - savedY) < 2;

    return {
      passed: pointerDragWorks && keyboardNudgeWorks && pointerCancelCleansUp && persistenceWorks,
      pointerDragWorks,
      keyboardNudgeWorks,
      pointerCancelCleansUp,
      persistenceWorks,
      start: { x: startX, y: startY },
      saved: { x: savedX, y: savedY }
    };
  })()`);

  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
} finally {
  if (socket) socket.close();
  child.kill("SIGTERM");
  await new Promise((resolve) => child.once("exit", resolve));
  await fs.rm(testRoot, { recursive: true, force: true });
}
