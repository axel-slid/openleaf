import fs from "node:fs/promises";

const port = Number(process.env.OPENLEAF_DEBUG_PORT || 9363);
const projectPath = process.env.OPENLEAF_TEST_PROJECT || "/tmp/openleaf-regression-project";
const screenshotPath = process.env.OPENLEAF_TEST_SCREENSHOT || "/tmp/openleaf-single-terminal-banner.png";
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
  applyThemePreset("dark-plus");
  const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
  const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
  await openProject(project.id);
  await loadProjectFile("sample.py", { preview: false });
  editor.setCursor({ line: 1, ch: 0 });
  await runActivePythonCell();
  setTerminalCollapsed(true, { persist: false });
  const rect = (element) => {
    const value = element.getBoundingClientRect();
    return { top: value.top, bottom: value.bottom, height: value.height, left: value.left, right: value.right };
  };
  const childRects = [...sourcePane.children].map((element) => ({
    id: element.id,
    className: element.className,
    display: getComputedStyle(element).display,
    ...rect(element)
  }));
  const sourceAfter = getComputedStyle(sourcePane, "::after");
  const previewAfter = getComputedStyle(previewPane, "::after");
  const terminal = rect(terminalPanel);
  const source = rect(sourcePane);
  const preview = rect(previewPane);
  return {
    workspaceClass: workspace.className,
    sourceClass: sourcePane.className,
    previewClass: previewPane.className,
    terminal,
    source,
    preview,
    sourceRows: getComputedStyle(sourcePane).gridTemplateRows,
    previewRows: getComputedStyle(previewPane).gridTemplateRows,
    sourceAfter: { display: sourceAfter.display, content: sourceAfter.content, height: sourceAfter.height },
    previewAfter: { display: previewAfter.display, content: previewAfter.content, height: previewAfter.height },
    childRects,
    terminalIsOnlyBanner: Math.abs(source.bottom - terminal.top) <= 1
      && Math.abs(preview.bottom - terminal.top) <= 1
      && (sourceAfter.display === "none" || sourceAfter.content === "none")
      && (previewAfter.display === "none" || previewAfter.content === "none")
  };
})()`);

const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));
socket.close();
console.log(JSON.stringify({ ...result, screenshotPath }, null, 2));
if (!result.terminalIsOnlyBanner) process.exitCode = 1;
