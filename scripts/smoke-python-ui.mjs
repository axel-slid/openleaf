import fs from "node:fs/promises";

const port = Number(process.env.OPENLEAF_DEBUG_PORT || 9339);
const projectPath = process.env.OPENLEAF_TEST_PROJECT || "/tmp/openleaf-regression-project";
const screenshotPath = process.env.OPENLEAF_TEST_SCREENSHOT || "/tmp/openleaf-python-regression.png";
const settingsScreenshotPath = process.env.OPENLEAF_SETTINGS_SCREENSHOT || "/tmp/openleaf-theme-gallery.png";
const notebookScreenshotPath = process.env.OPENLEAF_NOTEBOOK_SCREENSHOT || "/tmp/openleaf-ipynb-vim.png";
const glassScreenshotPath = process.env.OPENLEAF_GLASS_SCREENSHOT || "/tmp/openleaf-glass-readability.png";
const historyScreenshotPath = process.env.OPENLEAF_HISTORY_SCREENSHOT || "/tmp/openleaf-history-panel.png";

const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
if (!tabs.length) throw new Error("No Openleaf renderer tab was found.");

const socket = new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});
const keepAlive = setInterval(() => {}, 1000);

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
  const result = await command("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function waitFor(expression, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await evaluate(expression)) return true;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for: ${expression}`);
}

const checks = {};
let themeFailures = [];
try {
  const setup = await evaluate(`(async () => {
    applyThemePreset("dark-plus");
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
    const project = added.project || (added.projects || []).find((item) => item.folderPath === ${JSON.stringify(projectPath)});
    if (!project) throw new Error("Regression project was not registered.");
    await openProject(project.id);
    await loadProjectFile("sample.py", { preview: false });
    editor.setCursor({ line: 1, ch: 0 });
    return { projectId: project.id, active: activeFile.relativePath, toolbarHidden: pythonEditorToolbar.hidden };
  })()`);
  checks.projectOpened = setup.active === "sample.py";
  checks.pythonToolbarVisible = setup.toolbarHidden === false;
  checks.pythonKernelControlVisible = await evaluate(`!pythonRuntimeControls.hidden && Boolean(pythonKernelButton) && pythonKernelMenu.hidden`);
  checks.pythonOutlineHidden = await evaluate(`fileOutline.hidden`);
  checks.pythonCodePillHidden = await evaluate(`sourceModeButton.hidden && visualModeButton.hidden && vimModeIndicator.hidden && getComputedStyle(document.querySelector(".source-mode-actions")).display === "none"`);
  checks.pythonVimIndicator = await evaluate(`(() => { setVimMode(true); const visible = vimModeIndicator.hidden
    && !ipynbVimModeIndicator.hidden && ipynbVimModeIndicator.textContent === "Normal" && sourceModeButton.hidden;
    setVimMode(false); return visible && ipynbVimModeIndicator.hidden; })()`);
  const splitTerminal = await evaluate(`(() => {
    setTerminalCollapsed(false, { persist: false });
    const terminalRect = terminalPanel.getBoundingClientRect();
    const sourceRect = sourcePane.getBoundingClientRect();
    const headerRect = terminalPanel.querySelector(".terminal-header").getBoundingClientRect();
    const result = {
      parent: terminalPanel.parentElement === sourcePane,
      sourceWidth: Math.abs(terminalRect.left - sourceRect.left) < 1 && Math.abs(terminalRect.right - sourceRect.right) < 1,
      pdfVisible: !pdfViewerShell.hidden,
      logVisible: !compileLogPanel.hidden,
      singleBanner: Math.abs(headerRect.top - terminalRect.top) <= 2
        && getComputedStyle(terminalResizeHandle).backgroundColor === "rgba(0, 0, 0, 0)"
    };
    setTerminalCollapsed(true, { persist: false });
    return result;
  })()`);
  checks.pythonTerminalSplitWithPdf = Object.values(splitTerminal).every(Boolean);
  checks.pythonPdfKeepsLog = await evaluate(`!pdfViewerShell.hidden && !compileLogPanel.hidden`);
  checks.dragHandlesThemed = await evaluate(`[
    document.querySelector(".file-splitter"), document.querySelector(".splitter"), terminalResizeHandle,
    compileLogResizeHandle, fileOutlineResizeHandle, terminalTabsResizeHandle, document.getElementById("notesResizeHandle")
  ].filter(Boolean).every((handle) => {
    const color = getComputedStyle(handle, "::before").backgroundColor;
    return color && color !== "rgba(0, 0, 0, 0)";
  })`);

  checks.firstCell = await evaluate(`runActivePythonCell()`);
  checks.firstStdout = await evaluate(`currentPythonRuns().at(-1).response.stdout.includes("first 21")`);

  await evaluate(`editor.setCursor({ line: 5, ch: 0 })`);
  checks.persistentCell = await evaluate(`runActivePythonCell()`);
  checks.persistentState = await evaluate(`currentPythonRuns().at(-1).response.stdout.includes("second 42")`);

  checks.runAbove = await evaluate(`editor.setCursor({ line: 5, ch: 0 }); runActivePythonCell({ cell: pythonCellsThroughCursor() })`);
  checks.runAboveOutput = await evaluate(`currentPythonRuns().at(-1).response.stdout.includes("second 42")`);

  checks.debugCell = await evaluate(`editor.setCursor({ line: 5, ch: 0 }); runActivePythonCell({ debug: true })`);
  checks.debugTrace = await evaluate(`currentPythonRuns().at(-1).response.stdout.includes("second 42")`);

  checks.scratch = await evaluate(`pythonScratchInput.value = "value + 1"; runPythonScratchCell()`);
  checks.scratchOutput = await evaluate(`currentPythonRuns().at(-1).response.stdout.trim() === "22"`);
  checks.scratchBannerRemoved = await evaluate(`getComputedStyle(document.querySelector(".python-notebook-footer")).display === "none"
    && getComputedStyle(pythonNotebookPanel).gridTemplateRows.split(" ").length === 2`);

  checks.tracebackRun = (await evaluate(`pythonScratchInput.value = "1 / 0"; runPythonScratchCell()`)) === false;
  checks.tracebackShown = await evaluate(`currentPythonRuns().at(-1).response.stderr.includes("ZeroDivisionError")`);

  checks.matplotlibRun = await evaluate(`pythonScratchInput.value = "import matplotlib.pyplot as plt\\nplt.plot([1, 4, 2, 5])"; runPythonScratchCell()`);
  checks.matplotlibCaptured = await evaluate(`currentPythonRuns().at(-1).response.images.length === 1 && document.querySelectorAll(".python-run-image").length > 0`);

  checks.plotlyRun = await evaluate(`pythonScratchInput.value = "import plotly.express as px\\nfig = px.line(x=[1,2,3], y=[3,1,4])\\nfig.show()"; runPythonScratchCell()`);
  await waitFor(`document.querySelector(".python-run-plotly .plot-container") !== null`, 20000);
  checks.plotlyCaptured = await evaluate(`currentPythonRuns().at(-1).response.plotly.length === 1 && document.querySelector(".python-run-plotly .plot-container") !== null`);

  const beforeShortcut = await evaluate(`currentPythonRuns().length`);
  await evaluate(`editor.setCursor({ line: 1, ch: 0 }); editor.getInputField().dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", shiftKey: true, bubbles: true, cancelable: true }))`);
  try {
    await waitFor(`currentPythonRuns().length > ${beforeShortcut} && currentPythonRuns().at(-1).status !== "running"`);
    checks.shiftEnter = true;
  } catch (error) {
    checks.shiftEnter = false;
  }

  const dark = await evaluate(`({
    panel: getComputedStyle(pythonNotebookPanel).backgroundColor,
    input: getComputedStyle(pythonScratchInput).backgroundColor,
    pyBadge: document.querySelector(".python-notebook-mark") !== null,
    panelVisible: !pythonNotebookPanel.hidden
  })`);
  checks.darkPanel = dark.panel === "rgb(30, 30, 30)";
  checks.darkScratch = dark.input !== "rgba(0, 0, 0, 0)" && dark.input !== "rgb(255, 255, 255)";
  checks.pyBadgeRemoved = dark.pyBadge === false;
  checks.outputVisibleAfterRun = dark.panelVisible;
  checks.pythonTerminalOnly = await evaluate(`(() => {
    const terminalRect = terminalPanel.getBoundingClientRect();
    const sourceRect = sourcePane.getBoundingClientRect();
    const notesRect = document.getElementById("notesPanel").getBoundingClientRect();
    const filesRect = (workspace.classList.contains("files-hidden") ? fileRail : filePane).getBoundingClientRect();
    const workspaceRect = workspace.getBoundingClientRect();
    const handleStyle = getComputedStyle(terminalResizeHandle);
    const sourceRail = getComputedStyle(sourcePane, "::after");
    const previewRail = getComputedStyle(previewPane, "::after");
    const bannerRect = (sourcePane.classList.contains("terminal-collapsed")
      ? terminalCollapsedButton
      : terminalPanel.querySelector(".terminal-header")).getBoundingClientRect();
    return pythonNotebookPanel.hidden === false && pdfViewerShell.hidden && compileLogPanel.hidden
      && terminalPanel.parentElement === workspace
      && Math.abs(terminalRect.left - sourceRect.left) <= 2
      && Math.abs(terminalRect.right - notesRect.left) <= 2
      && Math.abs(filesRect.bottom - workspaceRect.bottom) <= 2
      && handleStyle.backgroundColor === "rgba(0, 0, 0, 0)"
      && (sourceRail.display === "none" || sourceRail.content === "none")
      && (previewRail.display === "none" || previewRail.content === "none")
      && Math.abs(bannerRect.top - terminalRect.top) <= 2;
  })()`);

  const runCardUi = await evaluate(`(() => {
    const source = document.querySelector(".python-run-source");
    const beforeHeight = source.getBoundingClientRect().height;
    const beforeRuns = currentPythonRuns().length;
    const syntaxTokens = source.querySelectorAll("span[class*='cm-']").length;
    source.click();
    const expandedHeight = source.getBoundingClientRect().height;
    source.querySelector(".python-run-delete").click();
    const footerGap = pythonNotebookPanel.getBoundingClientRect().bottom - pythonScratchInput.getBoundingClientRect().bottom;
    return {
      collapsed: source.getAttribute("aria-expanded") === "true" && beforeHeight <= 50,
      expanded: expandedHeight > beforeHeight,
      deleted: currentPythonRuns().length === beforeRuns - 1,
      syntaxTokens,
      footerGap
    };
  })()`);
  checks.runCodeCollapsed = runCardUi.collapsed;
  checks.runCodeExpands = runCardUi.expanded;
  checks.runDelete = runCardUi.deleted;
  checks.runSyntaxHighlighted = runCardUi.syntaxTokens > 0;
  checks.scratchRaised = runCardUi.footerGap >= 12;

  checks.pythonButtonHints = await evaluate(`[pythonRunCellButton, pythonRunAboveButton, pythonDebugCellButton, pythonStopButton, pythonClearButton, pythonScratchRunButton]
    .every((button) => Boolean(button.dataset.tip || button.getAttribute("title") || button.getAttribute("aria-label")))`);

  const themeMatrix = await evaluate(`(() => {
    const rgb = (value) => (value.match(/[\\d.]+/g) || []).slice(0, 3).map(Number);
    const luminance = (value) => {
      const channels = rgb(value).map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const contrast = (foreground, background) => {
      const a = luminance(foreground);
      const b = luminance(background);
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    return Object.keys(THEME_PRESETS).filter((id) => id !== "custom").map((id) => {
      applyThemePreset(id);
      const panelStyle = getComputedStyle(pythonNotebookPanel);
      const inputStyle = getComputedStyle(pythonScratchInput);
      const source = document.querySelector(".python-run-source");
      const sourceStyle = getComputedStyle(source);
      const sourceTextStyle = getComputedStyle(source.querySelector("pre"));
      return {
        id,
        mode: document.body.dataset.theme,
        expectedMode: THEME_PRESETS[id].theme,
        panelContrast: contrast(panelStyle.color, panelStyle.backgroundColor),
        inputContrast: contrast(inputStyle.color, inputStyle.backgroundColor),
        sourceContrast: contrast(sourceTextStyle.color, sourceStyle.backgroundColor),
        visible: !pythonNotebookPanel.hidden
      };
    });
  })()`);
  themeFailures = themeMatrix.filter((theme) =>
    theme.mode !== theme.expectedMode || !theme.visible || theme.panelContrast < 4 || theme.inputContrast < 4 || theme.sourceContrast < 4
  );
  checks.allThemes = themeMatrix.length > 0 && themeMatrix.every((theme) =>
    theme.mode === theme.expectedMode && theme.visible && theme.panelContrast >= 4 && theme.inputContrast >= 4 && theme.sourceContrast >= 4
  );
  checks.themesTested = themeMatrix.length === Object.keys(await evaluate(`THEME_PRESETS`)).length - 1;
  await evaluate(`applyThemePreset("dark-plus")`);

  await evaluate(`createProjectFile("file"); activeFileCreation.input.value = "created_test.py"; activeFileCreation.input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))`);
  await waitFor(`flattenProjectFileNodes(projectFiles).some((node) => node.relativePath === "created_test.py")`);
  checks.inlineFileCreation = true;

  const notebook = await evaluate(`(async () => {
    setTerminalCollapsed(false, { persist: false });
    await loadProjectFile("notebook.ipynb", { preview: false });
    const before = editor.getValue();
    addIpynbCodeCell();
    ipynbCellEditors.at(-1).editor.setValue("print(number)");
    addIpynbCell("markdown");
    ipynbCellEditors.at(-1).editor.setValue("## Notes\\nA Markdown cell.");
    const saved = await saveManuscript();
    const loaded = await window.localOverleaf.load(activeProject.id, "notebook.ipynb");
    return { before, saved, loaded: loaded.tex, mode: editor.getOption("mode"), cells: ipynbCellEditors.length,
      lastType: ipynbCellEditors.at(-1).type, terminalCollapsed: sourcePane.classList.contains("terminal-collapsed"),
      terminalParent: terminalPanel.parentElement === sourcePane };
  })()`);
  checks.ipynbEditor = notebook.before.startsWith("# %%") && notebook.before.includes("number * 6") && notebook.cells === 3;
  checks.ipynbSaved = notebook.saved && notebook.loaded.includes("print(number)");
  checks.ipynbPythonMode = notebook.mode === "python";
  checks.ipynbMarkdownCell = notebook.lastType === "markdown" && notebook.loaded.includes("# %% [markdown]") && notebook.loaded.includes("# ## Notes");
  checks.ipynbTerminalStartsCollapsed = notebook.terminalCollapsed && notebook.terminalParent;
  checks.ipynbEmptyState = await evaluate(`parseIpynbEditorCells("").length === 1 && parseIpynbEditorCells("")[0].type === "code" && Boolean(ipynbAddCellButton) && Boolean(ipynbAddMarkdownButton)`);
  checks.ipynbToolbar = await evaluate(`!ipynbAddCellButton.hidden && !ipynbAddMarkdownButton.hidden && Boolean(ipynbRunAllButton) && Boolean(ipynbClearOutputsButton)`);
  checks.ipynbRuntimeAbove = await evaluate(`!pythonRuntimeControls.hidden
    && pythonRuntimeControls.getBoundingClientRect().bottom <= textTabs.getBoundingClientRect().top + 2
    && !document.querySelector(".ipynb-run-hint")`);
  checks.ipynbKernelPicker = await evaluate(`(async () => {
    const kernels = await window.localOverleaf.listPythonInterpreters(activeProject.id);
    await openPythonKernelMenu();
    const optionCount = pythonKernelMenu.querySelectorAll(".python-kernel-option").length;
    if (kernels[0]) await selectPythonInterpreter(kernels[0].path);
    return kernels.length > 0 && optionCount === kernels.length && selectedPythonInterpreter() === kernels[0].path
      && ipynbKernelLabel.textContent.includes(pythonEnvironmentLabel(kernels[0].path));
  })()`);
  checks.ipynbLineNumbers = await evaluate(`ipynbCellEditors.every((entry) => entry.editor.getOption("lineNumbers") === true && Boolean(entry.card.querySelector(".CodeMirror-linenumbers")))`);
  checks.ipynbCompactCells = await evaluate(`ipynbCellEditors[1].card.querySelector(".CodeMirror").getBoundingClientRect().height <= 60`);
  checks.ipynbRoundedPlayIcon = await evaluate(`(() => {
    const button = ipynbCellEditors[0].card.querySelector(".ipynb-cell-run");
    const icon = button.querySelector(".ipynb-play-icon");
    const buttonStyle = getComputedStyle(button);
    const iconStyle = getComputedStyle(icon);
    return Boolean(icon) && buttonStyle.borderTopWidth === "0px" && buttonStyle.backgroundColor === "rgba(0, 0, 0, 0)"
      && iconStyle.strokeLinejoin === "round" && iconStyle.strokeLinecap === "round";
  })()`);
  checks.ipynbVimIndicator = await evaluate(`(() => {
    setVimMode(true);
    updateIpynbVimModeIndicator("insert");
    const visible = !ipynbVimModeIndicator.hidden && ipynbVimModeIndicator.textContent === "Insert"
      && ipynbCellEditors.every((entry) => entry.editor.getOption("keyMap") === "vim");
    setVimMode(false);
    return visible && ipynbVimModeIndicator.hidden;
  })()`);

  checks.ipynbRun = await evaluate(`runIpynbCell(0)`);
  checks.ipynbSelectedKernelRuns = await evaluate(`currentPythonRuns().at(-1)?.response?.interpreter === selectedPythonInterpreter()`);
  checks.ipynbNoEmptyOutputCopy = await evaluate(`!ipynbCellEditors[0].card.querySelector(".python-no-output")`);
  const ipynbLayout = await evaluate(`({
    notebookEditorVisible: !ipynbNotebookEditor.hidden && ipynbCellEditors.length === 3 && editor.getWrapperElement().hidden,
    inlineOutput: ipynbCellEditors[0].card.querySelector(".ipynb-cell-output").children.length > 0,
    pdfVisible: !pdfViewerShell.hidden && !previewPaneHeader.hidden,
    previewStillPdf: !previewPane.classList.contains("python-output-active"),
    separateOutputHidden: pythonNotebookPanel.hidden,
    logHidden: compileLogPanel.hidden,
    executionCount: ipynbCellEditors[0].card.querySelector(".ipynb-cell-count").textContent
  })`);
  checks.ipynbNotebookFormat = ipynbLayout.notebookEditorVisible && ipynbLayout.inlineOutput
    && ipynbLayout.separateOutputHidden && ipynbLayout.executionCount === "[1]";
  checks.ipynbKeepsPdf = ipynbLayout.pdfVisible && ipynbLayout.previewStillPdf;
  checks.ipynbKeepsLog = !ipynbLayout.logHidden;

  const rawNotebook = JSON.parse(await fs.readFile(`${projectPath}/notebook.ipynb`, "utf8"));
  checks.ipynbValidJson = rawNotebook.nbformat === 4 && rawNotebook.cells.length === 3
    && rawNotebook.cells[2].cell_type === "markdown" && rawNotebook.cells[2].source?.[0]?.includes("## Notes");
  checks.ipynbOutputsPreserved = rawNotebook.cells[0].outputs?.[0]?.text?.[0] === "preserved output\n";

  checks.ipynbExecuteAddsCell = await evaluate(`(async () => {
    addIpynbCodeCell();
    const targetIndex = ipynbCellEditors.length - 1;
    ipynbCellEditors[targetIndex].editor.setValue("number + 1");
    const beforeRun = ipynbCellEditors.length;
    const completed = await runIpynbCell(targetIndex);
    return completed && ipynbCellEditors.length === beforeRun + 1
      && ipynbCellEditors.at(-1).type === "code" && ipynbCellEditors.at(-1).editor.getValue() === "";
  })()`);

  checks.ipynbShiftEnterExecutes = await evaluate(`(async () => {
    const targetIndex = ipynbCellEditors.length - 1;
    const target = ipynbCellEditors[targetIndex];
    target.editor.setValue("number + 2");
    const beforeRun = currentPythonRuns().length;
    target.editor.getOption("extraKeys")["Shift-Enter"]();
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline && (currentPythonRuns().length === beforeRun || !currentPythonRuns().at(-1)?.response)) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return currentPythonRuns().length > beforeRun && currentPythonRuns().at(-1)?.response?.stdout.includes("9");
  })()`);

  await evaluate(`loadProjectFile("main.tex", { preview: false })`);
  checks.hiddenForLatex = await evaluate(`pythonNotebookPanel.hidden && pythonEditorToolbar.hidden && ipynbNotebookEditor.hidden && !compileLogPanel.hidden`);

  const ssh = await evaluate(`(async () => {
    const previousLoad = loadProjectFiles;
    const previousTerminal = createTerminalSession;
    const previousRemote = remoteWorkspace;
    const previousProject = activeProject;
    const previousFiles = projectFiles;
    const previousRenderPdf = renderPdf;
    let loads = 0;
    let terminals = 0;
    loadProjectFiles = async () => { loads += 1; projectFiles = [{ name: "remote.py", relativePath: "remote.py", kind: "file", editable: true }]; renderFileTree(); };
    createTerminalSession = async () => { terminals += 1; return { id: "test-ssh" }; };
    renderPdf = async () => true;
    remoteWorkspace = { user: "tester", host: "example.test", path: "/workspace" };
    await openVerifiedRemoteWorkspace({ startTerminal: false });
    const withoutTerminal = { loads, terminals, files: projectFiles.length, remote: activeProject.remote };
    await openVerifiedRemoteWorkspace({ startTerminal: true });
    const withTerminal = { loads, terminals, files: projectFiles.length, remote: activeProject.remote };
    loadProjectFiles = previousLoad;
    createTerminalSession = previousTerminal;
    remoteWorkspace = previousRemote;
    activeProject = previousProject;
    projectFiles = previousFiles;
    renderPdf = previousRenderPdf;
    return { withoutTerminal, withTerminal };
  })()`);
  checks.sshFilesWithoutTerminal = ssh.withoutTerminal.loads === 1 && ssh.withoutTerminal.terminals === 0 && ssh.withoutTerminal.files === 1 && ssh.withoutTerminal.remote;
  checks.sshFilesWithTerminal = ssh.withTerminal.loads === 2 && ssh.withTerminal.terminals === 1 && ssh.withTerminal.files === 1 && ssh.withTerminal.remote;

  const themeSettings = await evaluate(`(() => {
    const nav = Array.from(document.querySelectorAll(".settings-nav-button[data-settings-section]"));
    const workspaceIndex = nav.findIndex((button) => button.dataset.settingsSection === "workspace");
    const appearanceIndex = nav.findIndex((button) => button.dataset.settingsSection === "appearance");
    setSettingsPanel("appearance");
    settingsThemeCategoryBar.querySelector('[data-theme-category="Light High Contrast"]').click();
    const cards = Array.from(settingsThemeGallery.querySelectorAll("[data-theme-card]"));
    const mint = settingsThemeGallery.querySelector('[data-theme-card="mint-paper-hc"]');
    mint.click();
    const result = {
      workspaceFirst: workspaceIndex >= 0 && appearanceIndex >= 0 && workspaceIndex < appearanceIndex,
      noKeyboardSection: !document.querySelector('[data-settings-section="shortcuts"]') && !document.querySelector('[data-settings-panel="shortcuts"]'),
      workspaceControls: [settingsVimModeToggle, settingsRelativeLineNumbersToggle, document.getElementById("settingsNotesToggle")]
        .every((control) => control?.closest('[data-settings-panel]')?.dataset.settingsPanel === "workspace"),
      cardCount: cards.length,
      optionCount: settingsThemePreset.querySelector('optgroup[label="Light High Contrast"]').querySelectorAll("option").length,
      categories: settingsThemeCategoryBar.querySelectorAll("[data-theme-category]").length === settingsThemePreset.querySelectorAll("optgroup").length,
      categoryUnderline: (() => {
        const active = settingsThemeCategoryBar.querySelector(".theme-category-button.active");
        const style = getComputedStyle(active);
        return style.backgroundColor === "rgba(0, 0, 0, 0)" && style.borderRadius === "0px" && style.boxShadow !== "none";
      })(),
      pdfControl: settingsPdfRenderModeButtons.length === 3 && settingsPdfRenderModeButtons.every((button) =>
        Boolean(button.querySelector(".icon") && button.querySelector("strong") && button.querySelector("small")))
        && getComputedStyle(document.getElementById("settingsPdfRenderMode")).display === "grid",
      simpleIcons: cards.every((card) => Boolean(card.querySelector(".theme-card-circle") && card.querySelector(".theme-card-check"))
        && !card.querySelector(".theme-card-swatch") && !card.querySelector(".theme-card-mini")),
      newLightThemes: ["cobalt-paper-hc", "mint-paper-hc", "plum-paper-hc", "coral-paper-hc", "teal-paper-hc", "gold-paper-hc"]
        .every((id) => Boolean(settingsThemeGallery.querySelector('[data-theme-card="' + id + '"]'))),
      selected: document.body.dataset.themePreset === "mint-paper-hc" && mint.classList.contains("active")
    };
    applyThemePreset("dark-plus");
    return result;
  })()`);
  checks.settingsWorkspaceFirst = themeSettings.workspaceFirst;
  checks.settingsNoKeyboardSection = themeSettings.noKeyboardSection;
  checks.settingsWorkspaceControls = themeSettings.workspaceControls;
  checks.themeGallery = themeSettings.cardCount === themeSettings.optionCount && themeSettings.categories && themeSettings.categoryUnderline && themeSettings.simpleIcons && themeSettings.selected;
  checks.pdfRenderControl = themeSettings.pdfControl;
  checks.moreLightHighContrastThemes = themeSettings.newLightThemes;
  checks.moreTransparentThemes = await evaluate(`["glass-ocean", "glass-violet", "glass-forest", "glass-amber"]
    .every((id) => Boolean(THEME_PRESETS[id]) && TRANSPARENT_PRESETS.has(id))`);
  checks.documentationShortcuts = await evaluate(`(() => {
    const labels = Array.from(document.querySelectorAll('[data-settings-panel="documentation"] .documentation-shortcut-list > div > span'))
      .map((node) => node.textContent.trim());
    return ["Save", "Find", "Find next", "Compile PDF", "Toggle Code / Visual", "Toggle files", "Toggle terminal",
      "Toggle minimap", "Toggle relative line numbers", "Toggle text wrapping", "Open settings", "Close panel"]
      .every((label) => labels.includes(label));
  })()`);
  checks.agentsFlatUi = await evaluate(`(() => {
    const editorStyle = getComputedStyle(agentsEditor);
    const saveStyle = getComputedStyle(saveAgentsButton);
    return editorStyle.borderTopWidth === "1px" && editorStyle.borderLeftWidth === "0px"
      && editorStyle.borderRadius === "0px" && editorStyle.backgroundColor === "rgba(0, 0, 0, 0)"
      && saveStyle.borderTopWidth === "0px" && saveStyle.boxShadow === "none";
  })()`);
  checks.profileFlatUi = await evaluate(`(() => {
    setSettingsPanel("profile");
    const inputStyle = getComputedStyle(profileNameInput);
    const panelStyle = getComputedStyle(document.querySelector(".profile-settings-panel"));
    return panelStyle.display === "grid"
      && inputStyle.borderLeftWidth === "1px" && inputStyle.borderBottomWidth === "1px"
      && inputStyle.borderRadius === "7px" && inputStyle.backgroundColor !== "rgba(0, 0, 0, 0)";
  })()`);
  checks.githubCompactUi = await evaluate(`(() => {
    setSettingsPanel("project");
    const saveStyle = getComputedStyle(saveProjectSettingsButton);
    const inputStyle = getComputedStyle(projectGithubRemoteInput);
    return saveProjectSettingsButton.textContent.trim() === "Save changes"
      && Boolean(pullProjectGithubButton.querySelector(".icon"))
      && saveStyle.borderTopWidth === "0px" && saveStyle.backgroundColor === "rgba(0, 0, 0, 0)"
      && inputStyle.borderLeftWidth === "0px" && inputStyle.borderBottomWidth === "1px";
  })()`);

  const history = await evaluate(`(() => {
    const original = getSourceText();
    resetHistoryEvents(original);
    const before = historyEvents.length;
    suppressSourceChange = true;
    setSourceText(original + "\\n# persistent history regression");
    suppressSourceChange = false;
    recordHistoryEvent("Edited");
    const storedCount = historyEvents.length;
    setHistoryPanelOpen(true);
    const opened = !historyPanel.hidden;
    closeHistoryButton.click();
    const closed = historyPanel.hidden;
    historyEvents = [];
    lastHistoryText = "";
    resetHistoryEvents(getSourceText());
    const restored = historyEvents.some((entry) => entry.text.includes("persistent history regression"));
    suppressSourceChange = true;
    setSourceText(original);
    suppressSourceChange = false;
    localStorage.removeItem(historyStorageKey());
    resetHistoryEvents(original);
    return { before, storedCount, opened, closed, restored, closeLabel: closeHistoryButton.getAttribute("aria-label") };
  })()`);
  checks.historyPersistent = history.storedCount > history.before && history.restored;
  checks.historyCloseButton = history.opened && history.closed && history.closeLabel === "Close history";

  await evaluate(`(async () => { applyThemePreset("dark-plus"); await openProject(${JSON.stringify(setup.projectId)}); await loadProjectFile("sample.py", { preview: false }); pythonNotebookRuns.set(pythonNotebookHistoryKey(), [{ id: 1, label: "Cell 1", code: pythonCellAtCursor().code, status: "complete", response: { stdout: "", stderr: "", images: [], plotly: [], elapsedMs: 100, interpreter: "/opt/anaconda3/bin/python3" }, error: "" }]); syncPythonNotebookVisibility(); })()`);
  await new Promise((resolve) => setTimeout(resolve, 250));
  checks.darkTooltips = await evaluate(`new Promise((resolve) => {
    pythonRunCellButton.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    setTimeout(() => {
      const tip = document.getElementById("appTooltip");
      const style = getComputedStyle(tip);
      resolve(!tip.hidden && tip.textContent.includes("Shift+Enter") && style.color !== style.backgroundColor);
    }, 250);
  })`);
  const screenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));

  await evaluate(`(() => { openSettings(); setSettingsPanel("appearance"); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  const settingsScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(settingsScreenshotPath, Buffer.from(settingsScreenshot.data, "base64"));

  await evaluate(`(async () => { closeSettings(); await loadProjectFile("notebook.ipynb", { preview: false }); setVimMode(true); ipynbCellEditors[0]?.editor.focus(); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  const notebookScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(notebookScreenshotPath, Buffer.from(notebookScreenshot.data, "base64"));

  await evaluate(`(async () => { setVimMode(false); await loadProjectFile("sample.py", { preview: false }); applyThemePreset("glass-light"); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  const glassScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(glassScreenshotPath, Buffer.from(glassScreenshot.data, "base64"));

  await evaluate(`(() => { applyThemePreset("dark-plus"); openHistoryWindow(); })()`);
  await new Promise((resolve) => setTimeout(resolve, 150));
  const historyScreenshot = await command("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(historyScreenshotPath, Buffer.from(historyScreenshot.data, "base64"));

  const failed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name);
  console.log(JSON.stringify({ checks, failed, themeFailures, screenshotPath, settingsScreenshotPath, notebookScreenshotPath, glassScreenshotPath, historyScreenshotPath }, null, 2));
  if (failed.length) process.exitCode = 1;
} finally {
  await command("Emulation.clearDeviceMetricsOverride").catch(() => {});
  clearInterval(keepAlive);
  socket.close();
}
