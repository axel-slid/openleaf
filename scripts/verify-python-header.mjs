import fs from "node:fs/promises";

const port = Number(process.env.OPENLEAF_DEBUG_PORT || 9361);
const projectPath = process.env.OPENLEAF_TEST_PROJECT || "/tmp/openleaf-regression-project";
const screenshotPath = process.env.OPENLEAF_TEST_SCREENSHOT || "/tmp/openleaf-python-header.png";
const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
if (!tabs.length) throw new Error("No Openleaf renderer tab was found.");

const socket = new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++commandId;
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id !== id) return;
      socket.removeEventListener("message", onMessage);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    };
    socket.addEventListener("message", onMessage);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

const result = await evaluate(`(async () => {
  applyThemePreset("light-plus");
  const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
  const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
  await openProject(project.id);
  await loadProjectFile("sample.py", { preview: false });
  setVimMode(true);
  await openPythonKernelMenu();
  const vimRect = ipynbVimModeIndicator.getBoundingClientRect();
  const kernelRect = pythonKernelButton.getBoundingClientRect();
  const menuRect = pythonKernelMenu.getBoundingClientRect();
  const menuKeyboardReady = document.activeElement.classList.contains("python-kernel-option");
  closePythonKernelMenu();
  await loadProjectFile("main.tex", { preview: false });
  setMode("source");
  const modeControl = document.querySelector(".source-mode-actions");
  const sourceModeWidth = modeControl.getBoundingClientRect().width;
  setMode("visual");
  const visualModeWidth = modeControl.getBoundingClientRect().width;
  const latexVisualControlStable = !sourceModeButton.hidden
    && !visualModeButton.hidden
    && getComputedStyle(sourceModeButton).display !== "none"
    && getComputedStyle(visualModeButton).display !== "none"
    && visualModeButton.classList.contains("active")
    && !sourceModeButton.classList.contains("active")
    && Math.abs(sourceModeWidth - visualModeWidth) <= 1;
  setMode("source");
  await loadProjectFile("notebook.ipynb", { preview: false });
  const cells = [...document.querySelectorAll(".ipynb-cell")];
  const markdownIndex = ipynbCellEditors.findIndex((entry) => entry.type === "markdown");
  renderIpynbMarkdownCell(markdownIndex, { advance: false });
  const markdownEntry = ipynbCellEditors[markdownIndex];
  const markdownRunButton = markdownEntry.card.querySelector(".ipynb-cell-run");
  const renderedPlayHidden = getComputedStyle(markdownRunButton).visibility === "hidden";
  markdownEntry.preview.click();
  const markdownEditorRestored = !markdownEntry.editor.getWrapperElement().hidden
    && getComputedStyle(markdownRunButton).visibility !== "hidden";
  renderIpynbMarkdownCell(markdownIndex, { advance: false });
  const emptyCell = cells.find((cell) => !cell.querySelector(".CodeMirror-code").textContent.trim()) || cells.at(-1);
  const emptyEditor = emptyCell.querySelector(".CodeMirror");
  const emptyScroll = emptyCell.querySelector(".CodeMirror-scroll");
  const play = cells[0].querySelector(".ipynb-play-icon path");
  return {
    headerCenters: { vim: vimRect.top + vimRect.height / 2, kernel: kernelRect.top + kernelRect.height / 2 },
    centerDelta: Math.abs((vimRect.top + vimRect.height / 2) - (kernelRect.top + kernelRect.height / 2)),
    menu: { width: menuRect.width, belowButton: menuRect.top >= kernelRect.bottom, keyboardReady: menuKeyboardReady },
    latexVisualControlStable,
    emptyCellHeight: emptyCell.getBoundingClientRect().height,
    emptyEditorHeight: emptyEditor.getBoundingClientRect().height,
    emptyScrollHeight: emptyScroll.getBoundingClientRect().height,
    markdownRendered: markdownIndex >= 0
      && !markdownEntry.preview.hidden
      && markdownEntry.editor.getWrapperElement().hidden
      && Boolean(markdownEntry.preview.querySelector("h2"))
      && renderedPlayHidden
      && markdownEditorRestored
      && markdownEntry.card.querySelector(".ipynb-cell-count").textContent === ""
      && getComputedStyle(markdownEntry.card.querySelector(".ipynb-cell-body")).borderTopColor === "rgba(0, 0, 0, 0)",
    roundedPlayPath: play.getAttribute("d").includes("C") && getComputedStyle(play).fill !== "none"
  };
})()`);

const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));
socket.close();

const passed = result.centerDelta <= 1
  && result.menu.width <= 370
  && result.menu.belowButton
  && result.menu.keyboardReady
  && result.latexVisualControlStable
  && result.emptyCellHeight <= 58
  && result.markdownRendered
  && result.roundedPlayPath;
console.log(JSON.stringify({ passed, ...result, screenshotPath }, null, 2));
if (!passed) process.exitCode = 1;
