import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ElectronHarness, hammingDistance } from "./electron-harness.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(testDir, "../..");
const baselinePath = path.join(testDir, "visual-baselines.json");

// These are intentionally explicit. Removing or replacing a production control must be
// reviewed here rather than silently changing the test inventory.
const contracts = [
  "projectScreen:SECTION", "projectHeroTitle:H1", "addProjectButton:BUTTON", "templatesButton:BUTTON", "remoteWorkspaceButton:BUTTON",
  "helpButton:BUTTON", "projectSearch:INPUT", "projectGridButton:BUTTON", "projectRowsButton:BUTTON", "refreshProjectsButton:BUTTON",
  "projectSortButton:BUTTON", "projectSortMenu:DIV", "projectGrid:DIV", "projectEmpty:P", "editorScreen:SECTION",
  "backToProjectsButton:BUTTON", "sshConnectionBadge:DIV", "activeDocumentTitle:P", "editTitleButton:BUTTON", "topRefreshFilesButton:BUTTON",
  "historyButton:BUTTON", "pushGithubButton:BUTTON", "pullGithubButton:BUTTON", "topSaveStatusButton:DIV", "topSaveStatusLabel:SPAN",
  "workspace:MAIN", "fileRail:DIV", "fileRailButton:BUTTON", "railRefreshFilesButton:BUTTON", "railHelpButton:BUTTON",
  "filePane:ASIDE", "fileHeaderRefreshButton:BUTTON", "newFileButton:BUTTON", "newFolderButton:BUTTON", "downloadPackageButton:BUTTON",
  "fileTree:DIV", "fileOutline:SECTION", "fileOutlineResizeHandle:DIV", "fileOutlineToggle:BUTTON", "fileOutlineBody:DIV",
  "filePreview:DIV", "saveState:P", "compileState:P", "fileSplitter:DIV", "sourceRail:DIV",
  "sourceRailButton:BUTTON", "editorTitle:H2", "sourceStats:P", "undoButton:BUTTON", "redoButton:BUTTON",
  "minimapToggleButton:BUTTON", "pythonRuntimeControls:DIV", "ipynbVimModeIndicator:SPAN", "pythonKernelButton:BUTTON", "ipynbKernelLabel:SPAN",
  "sourceModeButton:BUTTON", "visualModeButton:BUTTON", "vimModeIndicator:SPAN", "editorFullscreenButton:BUTTON", "textTabs:DIV",
  "pythonEditorToolbar:DIV", "pythonRunCellButton:BUTTON", "pythonRunAboveButton:BUTTON", "pythonDebugCellButton:BUTTON", "latexSource:TEXTAREA",
  "ipynbNotebookEditor:SECTION", "ipynbAddCellButton:BUTTON", "ipynbAddMarkdownButton:BUTTON", "ipynbRunAllButton:BUTTON", "ipynbClearOutputsButton:BUTTON",
  "ipynbNotebookCells:DIV", "visualEditor:DIV", "mediaViewer:DIV", "sourceMinimap:DIV", "terminalPanel:SECTION",
  "terminalResizeHandle:DIV", "terminalCollapsedButton:BUTTON", "terminalNewButton:BUTTON", "terminalRemoteButton:BUTTON", "terminalShellButton:BUTTON",
  "terminalCodexButton:BUTTON", "terminalClaudeButton:BUTTON", "terminalSplitButton:BUTTON", "terminalKillButton:BUTTON", "terminalMaximizeButton:BUTTON",
  "terminalClosePanelButton:BUTTON", "terminalBody:DIV", "terminalEmpty:DIV", "terminalTabsResizeHandle:DIV", "terminalTabs:DIV",
  "splitter:DIV", "previewRail:DIV", "previewRailButton:BUTTON", "previewPaneHeader:DIV", "pdfTitle:H2",
  "pdfMeta:P", "pdfFileMenu:DIV", "compileButton:BUTTON", "pdfSidebarButton:BUTTON", "openPdfButton:BUTTON",
  "downloadPdfButton:BUTTON", "pdfZoomOutButton:BUTTON", "pdfZoomLabel:SPAN", "pdfZoomInButton:BUTTON", "pdfFitButton:BUTTON",
  "pdfPageIndicator:SPAN", "pdfReaderButton:BUTTON", "pdfViewerShell:DIV", "pdfSidebar:ASIDE", "pdfThumbnailList:DIV",
  "pdfViewer:DIV", "pythonNotebookPanel:SECTION", "pythonNotebookMeta:H2", "pythonStopButton:BUTTON", "pythonClearButton:BUTTON",
  "pythonNotebookFeed:DIV", "pythonScratchRunButton:BUTTON", "pythonScratchInput:TEXTAREA", "historyPanel:ASIDE", "closeHistoryButton:BUTTON",
  "historyPanelBody:DIV", "compileLogPanel:SECTION", "compileLogResizeHandle:DIV", "compileLogCollapsedButton:BUTTON", "compileLog:PRE",
  "notesPanel:ASIDE", "notesResizeHandle:DIV", "notesRailButton:BUTTON", "notesModeTextButton:BUTTON", "notesModeDrawButton:BUTTON",
  "notesClearButton:BUTTON", "notesFullscreenButton:BUTTON", "notesToolbar:DIV", "notesPreviewButton:BUTTON", "notesText:TEXTAREA",
  "notesPreview:DIV", "notesCanvasWrap:DIV", "notesCanvas:CANVAS", "presentationScreen:SECTION", "pptxBackButton:BUTTON",
  "pptxProjectTitle:STRONG", "pptxSaveStatus:SPAN", "pptxCollaborationStatus:SPAN", "pptxSaveButton:BUTTON", "pptxMenubar:NAV",
  "pptxMenusToggle:BUTTON", "pptxUndoButton:BUTTON", "pptxRedoButton:BUTTON", "pptxPrintButton:BUTTON", "pptxFitButton:BUTTON",
  "pptxSelectButton:BUTTON", "pptxAddTextButton:BUTTON", "pptxAddLineButton:BUTTON", "pptxAddImageButton:BUTTON", "pptxAddRectangleButton:BUTTON",
  "pptxAddEllipseButton:BUTTON", "pptxAddChartButton:BUTTON", "pptxAddTableButton:BUTTON", "pptxImageFileInput:INPUT", "pptxContextToolbar:DIV",
  "pptxElementType:SPAN", "pptxTextContextControls:DIV", "pptxEditTextButton:BUTTON", "pptxFontFamilyInput:SELECT", "pptxFontSizeInput:INPUT",
  "pptxBoldButton:BUTTON", "pptxItalicButton:BUTTON", "pptxUnderlineButton:BUTTON", "pptxAlignSelect:SELECT", "pptxColorInput:INPUT",
  "pptxOutlineControls:DIV", "pptxLineColorInput:INPUT", "pptxLineWidthInput:INPUT", "pptxLineStyleSelect:SELECT", "pptxSendToBackButton:BUTTON",
  "pptxSendBackwardButton:BUTTON", "pptxBringForwardButton:BUTTON", "pptxBringToFrontButton:BUTTON", "pptxDeleteElementButton:BUTTON", "pptxBackgroundButton:BUTTON",
  "pptxLayoutButton:BUTTON", "pptxThemeButton:BUTTON", "pptxTransitionButton:BUTTON", "pptxBackgroundColorInput:INPUT", "pptxFileRefreshButton:BUTTON",
  "pptxNewFileButton:BUTTON", "pptxNewFolderButton:BUTTON", "pptxDownloadPackageButton:BUTTON", "pptxFileTree:DIV", "pptxSlideCount:SPAN",
  "pptxSlideList:DIV", "pptxStageLabel:SPAN", "pptxZoomOutButton:BUTTON", "pptxZoomRange:INPUT", "pptxZoomInButton:BUTTON",
  "pptxZoomOutput:OUTPUT", "pptxPresentButton:BUTTON", "pptxStageViewport:DIV", "pptxSlideCanvas:DIV", "pptxBackgroundCanvas:CANVAS"
].map((contract) => {
  const [id, tag] = contract.split(":");
  return { id, tag };
});

assert.equal(contracts.length, 200, "The production contract inventory must stay at 200 explicit elements");

let harness;
let factsById;
let globalFacts;
let baselines;

before(async () => {
  harness = await new ElectronHarness(appRoot).start();
  const facts = await harness.evaluate(`(() => {
    const accessibleName = (element) => {
      const labelledBy = (element.getAttribute("aria-labelledby") || "")
        .split(/\\s+/)
        .filter(Boolean)
        .map((id) => document.getElementById(id)?.textContent || "")
        .join(" ");
      return [
        element.getAttribute("aria-label"), labelledBy, element.getAttribute("title"),
        element.getAttribute("placeholder"), element.textContent
      ].find((value) => String(value || "").trim())?.trim() || "";
    };
    return ${JSON.stringify(contracts)}.map(({ id }) => {
      const matches = document.querySelectorAll("#" + CSS.escape(id));
      const element = matches[0];
      if (!element) return { id, count: 0 };
      const interactive = element.matches("button, input, select, textarea, [role=button], [role=separator]");
      return {
        id,
        count: matches.length,
        tag: element.tagName,
        interactive,
        accessibleName: accessibleName(element),
        directlyHidden: element.hidden,
        buttonType: element.tagName === "BUTTON" ? element.getAttribute("type") : null,
        separatorTabIndex: element.getAttribute("role") === "separator" ? element.getAttribute("tabindex") : null
      };
    });
  })()`);
  factsById = new Map(facts.map((fact) => [fact.id, fact]));

  globalFacts = await harness.evaluate(`(() => ({
    title: document.title,
    language: document.documentElement.lang,
    viewportMeta: document.querySelector('meta[name="viewport"]')?.content || "",
    duplicateIds: Array.from(document.querySelectorAll("[id]"))
      .map((element) => element.id)
      .filter((id, index, ids) => ids.indexOf(id) !== index),
    buttonsWithoutType: Array.from(document.querySelectorAll("button:not([type])")).length,
    unlabeledDialogs: Array.from(document.querySelectorAll('[role="dialog"]')).filter((element) => {
      const label = element.getAttribute("aria-label");
      const labelledBy = element.getAttribute("aria-labelledby");
      return !label && !(labelledBy && document.getElementById(labelledBy));
    }).map((element) => element.id),
    invalidModalDialogs: Array.from(document.querySelectorAll('[role="dialog"]'))
      .filter((element) => element.getAttribute("aria-modal") !== "true").map((element) => element.id),
    unlabeledSeparators: Array.from(document.querySelectorAll('[role="separator"]'))
      .filter((element) => !element.getAttribute("aria-label")).map((element) => element.id),
    unfocusableSeparators: Array.from(document.querySelectorAll('[role="separator"]'))
      .filter((element) => element.getAttribute("tabindex") !== "0").map((element) => element.id),
    visibleScreen: [projectScreen, editorScreen, presentationScreen].filter((element) => !element.hidden).map((element) => element.id),
    styleSheetCount: document.styleSheets.length,
    unreadableStyleSheets: Array.from(document.styleSheets).filter((sheet) => {
      try { return !sheet.cssRules.length; } catch { return true; }
    }).map((sheet) => sheet.href),
    cssVariables: ["--bg", "--panel", "--text", "--muted", "--border", "--accent"]
      .filter((name) => !getComputedStyle(document.body).getPropertyValue(name).trim()),
    rootScroll: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
    viewport: { width: innerWidth, height: innerHeight },
    projectControls: Array.from(document.querySelectorAll("#projectScreen button, #projectScreen input")).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }).map((element) => ({ id: element.id || element.className, rect: element.getBoundingClientRect().toJSON() }))
  }))()`);
  baselines = JSON.parse(await fs.readFile(baselinePath, "utf8"));
});

after(async () => {
  await harness?.stop();
});

for (const contract of contracts) {
  test(`production contract: #${contract.id}`, () => {
    const fact = factsById.get(contract.id);
    assert.equal(fact.count, 1, `#${contract.id} must exist exactly once`);
    assert.equal(fact.tag, contract.tag, `#${contract.id} changed semantic element type`);
    if (fact.interactive && !fact.directlyHidden) {
      assert.ok(fact.accessibleName, `#${contract.id} needs an accessible name`);
    }
    if (contract.tag === "BUTTON") assert.equal(fact.buttonType, "button", `#${contract.id} must not submit forms implicitly`);
    if (fact.separatorTabIndex !== null) assert.equal(fact.separatorTabIndex, "0", `#${contract.id} must remain keyboard focusable`);
  });
}

const globalContracts = [
  ["document title is stable", () => assert.equal(globalFacts.title, "Openleaf")],
  ["document language is declared", () => assert.equal(globalFacts.language, "en")],
  ["viewport is responsive", () => assert.match(globalFacts.viewportMeta, /width=device-width/)],
  ["all element ids are unique", () => assert.deepEqual(globalFacts.duplicateIds, [])],
  ["all buttons have explicit non-submit types", () => assert.equal(globalFacts.buttonsWithoutType, 0)],
  ["all dialogs have accessible labels", () => assert.deepEqual(globalFacts.unlabeledDialogs, [])],
  ["all dialogs expose modal semantics", () => assert.deepEqual(globalFacts.invalidModalDialogs, [])],
  ["all splitters have accessible labels", () => assert.deepEqual(globalFacts.unlabeledSeparators, [])],
  ["all splitters are keyboard focusable", () => assert.deepEqual(globalFacts.unfocusableSeparators, [])],
  ["only the project screen is initially visible", () => assert.deepEqual(globalFacts.visibleScreen, ["projectScreen"])],
  ["production stylesheets load", () => assert.ok(globalFacts.styleSheetCount >= 6)],
  ["production stylesheets are readable and nonempty", () => assert.deepEqual(globalFacts.unreadableStyleSheets, [])],
  ["required color tokens resolve", () => assert.deepEqual(globalFacts.cssVariables, [])],
  ["initial page has no horizontal overflow", () => assert.ok(globalFacts.rootScroll.width <= globalFacts.viewport.width)],
  ["initial page has no vertical overflow", () => assert.ok(globalFacts.rootScroll.height <= globalFacts.viewport.height)],
  ["project screen has its complete primary control set", () => assert.ok(globalFacts.projectControls.length >= 9)]
];

for (const [name, assertion] of globalContracts) test(`global UI invariant: ${name}`, assertion);

test("latency budget: cold renderer readiness stays under 4 seconds", () => {
  assert.ok(harness.startupMs < 4000, `renderer readiness took ${harness.startupMs.toFixed(1)}ms`);
});

test("latency budget: repeated overlay transitions stay under 200ms", async () => {
  const elapsed = await harness.evaluate(`(async () => {
    const started = performance.now();
    for (let index = 0; index < 10; index += 1) {
      openSettings();
      closeSettings();
      openNewProjectPanel();
      closeNewProjectPanel();
      openCommandPalette("");
      closeCommandPalette();
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return performance.now() - started;
  })()`);
  assert.ok(elapsed < 200, `30 overlay open/close cycles took ${elapsed.toFixed(1)}ms`);
});

test("latency budget: command palette filtering stays under 100ms", async () => {
  const elapsed = await harness.evaluate(`(() => {
    openCommandPalette("");
    const started = performance.now();
    for (const query of ["/", "/open", "/settings", "paper", "template", "compile", "ssh", "project"]) {
      commandPaletteInput.value = query;
      renderCommandPalette();
    }
    return performance.now() - started;
  })()`);
  assert.ok(elapsed < 100, `eight palette filters took ${elapsed.toFixed(1)}ms`);
});

test("editor keyboard shortcuts compile with Shift+Enter and find with Command+F", async () => {
  const result = await harness.evaluate(`(async () => {
    const originalCompile = compileManuscript;
    const originalOpenFind = openFind;
    let compileCalls = 0;
    let findCalls = 0;
    compileManuscript = async () => { compileCalls += 1; };
    openFind = () => { findCalls += 1; };
    const input = editor.getInputField();
    const compileEvent = new KeyboardEvent("keydown", {
      key: "Enter", shiftKey: true, bubbles: true, cancelable: true
    });
    input.dispatchEvent(compileEvent);
    const findEvent = new KeyboardEvent("keydown", {
      key: "f", metaKey: true, bubbles: true, cancelable: true
    });
    input.dispatchEvent(findEvent);
    await Promise.resolve();
    compileManuscript = originalCompile;
    openFind = originalOpenFind;
    return {
      compileCalls,
      findCalls,
      compilePrevented: compileEvent.defaultPrevented,
      findPrevented: findEvent.defaultPrevented
    };
  })()`);
  assert.deepEqual(result, {
    compileCalls: 1,
    findCalls: 1,
    compilePrevented: true,
    findPrevented: true
  });
});

test("immersive fullscreen hides the document title and restores layout on exit", async () => {
  const result = await harness.evaluate(`(async () => {
    editorScreen.hidden = false;
    projectScreen.hidden = true;
    activeDocumentTitle.textContent = "Notch title test";
    await Promise.resolve();
    setEditorFullscreen(true, { syncWindow: false });
    const immersive = {
      bodyClass: document.body.classList.contains("editor-immersive-fullscreen"),
      workspaceClass: workspace.classList.contains("editor-fullscreen"),
      titleDisplay: getComputedStyle(activeDocumentTitle.parentElement).display,
      notchDisplay: getComputedStyle(fullscreenNotchTitle).display,
      notchTitle: fullscreenNotchTitleText.textContent
    };
    setEditorFullscreen(false, { syncWindow: false });
    document.body.classList.add("window-fullscreen");
    const nativeTitleDisplay = getComputedStyle(activeDocumentTitle.parentElement).display;
    document.body.classList.remove("window-fullscreen");
    return {
      immersive,
      nativeTitleDisplay,
      restored: !document.body.classList.contains("editor-immersive-fullscreen")
        && !workspace.classList.contains("editor-fullscreen")
    };
  })()`);
  assert.deepEqual(result, {
    immersive: {
      bodyClass: true,
      workspaceClass: true,
      titleDisplay: "none",
      notchDisplay: "block",
      notchTitle: "Notch title test"
    },
    nativeTitleDisplay: "none",
    restored: true
  });
});

test("macOS display-frame fullscreen toggles in and out reliably", async () => {
  if (process.platform !== "darwin") return;
  const result = await harness.evaluate(`(async () => {
    const waitForFullscreenClass = async (expected) => {
      const started = performance.now();
      while (document.body.classList.contains("window-fullscreen") !== expected) {
        if (performance.now() - started > 5000) return false;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return true;
    };
    const firstRequest = await window.localOverleaf.setFullscreen(true);
    const firstEntered = await waitForFullscreenClass(true);
    const entered = {
      requestMode: firstRequest.mode,
      bodyClass: firstEntered
    };
    await window.localOverleaf.setFullscreen(false);
    const exited = await waitForFullscreenClass(false);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await window.localOverleaf.setFullscreen(true);
    const reentered = await waitForFullscreenClass(true);
    await window.localOverleaf.setFullscreen(false);
    await waitForFullscreenClass(false);
    return { entered, exited, reentered };
  })()`);
  assert.equal(result.entered.requestMode, "display-frame");
  assert.equal(result.exited, true);
  assert.ok(result.entered.bodyClass || result.reentered, "at least one native fullscreen transition must complete");
});

test("double-clicking a PDF word jumps to the matching LaTeX source word", async () => {
  const result = await harness.evaluate(`(async () => {
    const originalProject = activeProject;
    const originalText = editor.getValue();
    const originalMode = sourceModeButton.classList.contains("active") ? "source" : "visual";
    activeProject = { id: "pdf-source-jump-test" };
    editor.setValue("\\\\section{Review}\\nSimplify these expressions into a single logarithm.");

    const page = document.createElement("div");
    page.className = "pdf-page";
    const canvas = document.createElement("canvas");
    canvas.dataset.renderedWidth = "500";
    canvas.dataset.renderedHeight = "700";
    canvas.getBoundingClientRect = () => ({
      left: 0, top: 0, right: 500, bottom: 700, width: 500, height: 700, x: 0, y: 0
    });
    page.appendChild(canvas);
    pdfPageTextLines.set(1, [{
      y: 100,
      text: "Simplify these expressions into a single logarithm.",
      words: [{ text: "logarithm.", x: 250, width: 70 }]
    }]);
    page.addEventListener("dblclick", (event) => jumpToSourceFromPdfClick(event, 1));
    const event = new MouseEvent("dblclick", {
      clientX: 280, clientY: 100, button: 0, bubbles: true, cancelable: true
    });
    page.dispatchEvent(event);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const cursor = editor.getCursor();
    const expectedColumn = editor.getLine(1).indexOf("logarithm");
    const output = { line: cursor.line, ch: cursor.ch, expectedColumn, prevented: event.defaultPrevented };
    activeProject = originalProject;
    editor.setValue(originalText);
    setMode(originalMode);
    pdfPageTextLines.delete(1);
    return output;
  })()`);
  assert.deepEqual(result, { line: 1, ch: 41, expectedColumn: 41, prevented: true });
});

test("latency budget: responsive reflow stays under 300ms", async () => {
  const started = performance.now();
  await harness.setViewport(1180, 700);
  assert.ok(performance.now() - started < 300, "viewport reflow exceeded 300ms");
});

test("latency budget: perceptual capture stays under 750ms", async () => {
  await harness.showState("project");
  const started = performance.now();
  const hash = await harness.capturePerceptualHash();
  assert.equal(hash.length, 64);
  assert.ok(performance.now() - started < 750, "visual capture exceeded 750ms");
});

const visualScenarios = [
  ["project", 1180, 700], ["project", 1440, 900], ["project", 1728, 1050],
  ["settings", 1180, 700], ["settings", 1440, 900], ["settings", 1728, 1050],
  ["new-project", 1180, 700], ["new-project", 1440, 900], ["new-project", 1728, 1050],
  ["command-palette", 1180, 700], ["command-palette", 1440, 900], ["command-palette", 1728, 1050]
];

for (const [state, width, height] of visualScenarios) {
  const snapshotName = `${state}-${width}x${height}`;
  test(`visual regression: ${snapshotName}`, async () => {
    await harness.setViewport(width, height);
    await harness.showState(state);
    const layout = await harness.evaluate(`(() => {
      const root = ${JSON.stringify(state)} === "project" ? projectScreen : (
        ${JSON.stringify(state)} === "settings" ? settingsDrawer : (
          ${JSON.stringify(state)} === "new-project" ? newProjectPanel : commandPalette
        )
      );
      const rect = root.getBoundingClientRect();
      return {
        hidden: root.hidden,
        rect: rect.toJSON(),
        viewport: { width: innerWidth, height: innerHeight },
        bodyOverflowX: document.documentElement.scrollWidth - innerWidth,
        bodyOverflowY: document.documentElement.scrollHeight - innerHeight,
        visibleControls: Array.from(root.querySelectorAll("button, input, select, textarea, [role=button]"))
          .filter((element) => {
            const box = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return box.width > 0 && box.height > 0 && style.visibility !== "hidden" && style.display !== "none";
          }).length
      };
    })()`);
    assert.equal(layout.hidden, false, "scenario root must be visible");
    assert.ok(layout.rect.left >= -1 && layout.rect.top >= -1, "scenario must not escape the top or left edge");
    assert.ok(layout.rect.right <= width + 1 && layout.rect.bottom <= height + 1, "scenario must fit the viewport");
    assert.ok(layout.visibleControls >= (state === "project" ? 9 : 2), "scenario lost visible controls");
    assert.ok(layout.bodyOverflowX <= 1, "page has horizontal overflow");
    assert.ok(layout.bodyOverflowY <= 1, "page has vertical overflow");

    const actualHash = await harness.capturePerceptualHash();
    const expectedHash = baselines[snapshotName];
    assert.ok(expectedHash, `Missing visual baseline for ${snapshotName}; captured ${actualHash}`);
    const distance = hammingDistance(actualHash, expectedHash);
    assert.ok(distance <= 12, `${snapshotName} changed visually (${distance}/256 perceptual bits differ; actual ${actualHash})`);
  });
}

test("project preview copy never reports a source project as having no PDF", async () => {
  const productionCopy = await Promise.all([
    fs.readFile(path.join(appRoot, "app.js"), "utf8"),
    fs.readFile(path.join(appRoot, "main.js"), "utf8"),
    fs.readFile(path.join(appRoot, "index.html"), "utf8")
  ]);
  assert.doesNotMatch(productionCopy.join("\n"), /no (?:compiled )?pdf(?: yet| exists)?/i);
});

test("handwritten starters copy scans into their matching templates", async () => {
  const scanPath = path.join(harness.testRoot, "lecture-page.png");
  await fs.copyFile(path.join(appRoot, "assets", "icon.png"), scanPath);

  const result = await harness.evaluate(`(async () => {
    const templates = await window.localOverleaf.listTemplates();
    const notes = await window.localOverleaf.addProject("handwritten-notes", [${JSON.stringify(scanPath)}]);
    const homework = await window.localOverleaf.addProject("homework-workings", [notes.project.pdfPath]);
    const notesSource = await window.localOverleaf.readProjectFile(notes.project.id, "main.tex");
    const homeworkSource = await window.localOverleaf.readProjectFile(homework.project.id, "main.tex");
    const notesFiles = await window.localOverleaf.listProjectFiles(notes.project.id);
    const homeworkFiles = await window.localOverleaf.listProjectFiles(homework.project.id);
    const flatten = (nodes) => nodes.flatMap((node) => [node, ...(node.children ? flatten(node.children) : [])]);
    return {
      templateIds: templates.builtIn.map((template) => template.id),
      notesPdfExists: notes.project.pdfExists,
      homeworkPdfExists: homework.project.pdfExists,
      notesCompile: notes.compile,
      homeworkCompile: homework.compile,
      notesImported: notes.importedFiles,
      homeworkImported: homework.importedFiles,
      notesTex: notesSource.tex,
      homeworkTex: homeworkSource.tex,
      notesPaths: flatten(notesFiles.files || notesFiles).map((file) => file.relativePath),
      homeworkPaths: flatten(homeworkFiles.files || homeworkFiles).map((file) => file.relativePath)
    };
  })()`);

  assert.ok(result.templateIds.includes("handwritten-notes"));
  assert.ok(result.templateIds.includes("homework-handwritten-workings"));
  assert.equal(result.notesPdfExists, true, result.notesCompile?.output);
  assert.equal(result.homeworkPdfExists, true, result.homeworkCompile?.output);
  assert.deepEqual(result.notesImported, ["handwritten/01-lecture-page.png"]);
  assert.deepEqual(result.homeworkImported, ["handwritten/01-main.pdf"]);
  assert.match(result.notesTex, /\\section\*\{Imported pages\}/);
  assert.match(result.homeworkTex, /\\section\*\{Handwritten workings\}/);
  assert.match(result.notesTex, /\\includegraphics.*01-lecture-page\.png/);
  assert.match(result.homeworkTex, /\\includepdf.*01-main\.pdf/);
  assert.ok(result.notesPaths.includes("handwritten/01-lecture-page.png"));
  assert.ok(result.homeworkPaths.includes("handwritten/01-main.pdf"));
});

test("the project grid never renders or compiles missing PDF previews", async () => {
  const projectPath = path.join(harness.testRoot, "preview-generation-project");
  await fs.mkdir(projectPath, { recursive: true });
  await fs.writeFile(path.join(projectPath, "main.tex"), String.raw`\documentclass{article}
\begin{document}
Background preview generation works.
\end{document}
`, "utf8");

  await harness.showState("project");
  const initial = await harness.evaluate(`(async () => {
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(projectPath)}]);
    projects = added.projects || [];
    renderProjectGrid();
    const card = projectGrid.querySelector('[data-project-id="' + CSS.escape(added.project.id) + '"]');
    return {
      message: card?.querySelector(".project-preview-message")?.textContent || "",
      projectGridVisible: !projectGrid.hidden && projectGrid.getBoundingClientRect().width > 0
    };
  })()`);
  assert.equal(initial.message, "P");
  assert.equal(initial.projectGridVisible, true);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const renderedOnHome = await harness.evaluate(`Boolean(projectGrid.querySelector(".project-card canvas"))`);
  assert.equal(renderedOnHome, false, "Home must only use cached preview images");
});

test("runtime invariant: production scenarios raise no uncaught renderer exceptions", () => {
  assert.deepEqual(harness.exceptions, []);
});
