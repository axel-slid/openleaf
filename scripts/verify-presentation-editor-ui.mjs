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
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-pptx-editor-ui-"));
const testPresentation = path.join(testRoot, "Editable Presentation.pptx");
const userDataPath = path.join(testRoot, "user-data");
const screenshotPath = process.env.OPENLEAF_TEST_SCREENSHOT || path.join(testRoot, "pptx-editor.png");
const port = 9950 + Math.floor(Math.random() * 40);
await fs.copyFile(sourcePresentation, testPresentation);

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
      } else {
        resolve(message.result);
      }
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
  while (!(await evaluate(socket, "Boolean(window.localOverleaf && window.localOverleaf.loadPresentationProject && typeof openProject === 'function')"))) {
    if (Date.now() - readyStarted > 10000) throw new Error("Openleaf PowerPoint API did not become ready.");
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const result = await evaluate(socket, `(async () => {
    const added = await window.localOverleaf.addProjectFromPath([${JSON.stringify(testPresentation)}]);
    const project = added.project;
    projects = added.projects || [project];
    await openProject(project.id);
    if (!activePresentation) {
      return {
        loadError: pptxSlideList.textContent,
        status: pptxSaveStatus.textContent,
        kind: project.kind,
        project
      };
    }
    const initialSlideCount = activePresentation.slides.length;
    const fullFidelityThumbnailPages = activePresentationThumbnailPdf?.numPages || 0;
    const thumbnailButtons = Array.from(pptxSlideList.querySelectorAll(".pptx-slide-thumb"));
    const thumbnailOverlapPx = thumbnailButtons.slice(0, -1).reduce((maximum, button, index) => {
      const previewBottom = button.querySelector(".pptx-slide-thumb-preview").getBoundingClientRect().bottom;
      const nextTop = thumbnailButtons[index + 1].getBoundingClientRect().top;
      return Math.max(maximum, previewBottom - nextTop);
    }, 0);
    const renderedThumbnailCount = thumbnailButtons.filter((button) => (
      button.querySelector("canvas")?.width > 0
    )).length;
    const firstText = currentPresentationSlide().elements.find((element) => element.type === "text" && element.text);
    const firstTextNode = pptxElementLayer.querySelector(\`[data-element-id="\${CSS.escape(firstText.id)}"]\`);
    firstTextNode.dispatchEvent(new PointerEvent("pointerdown", {
      bubbles: true,
      button: 0,
      clientX: 100,
      clientY: 100
    }));
    window.dispatchEvent(new PointerEvent("pointerup", {
      bubbles: true,
      button: 0,
      clientX: 100,
      clientY: 100
    }));
    const selectionStaysClean = !presentationDirty && pptxSaveStatus.textContent === "Saved";
    const inlineTextNode = pptxElementLayer
      .querySelector(\`[data-element-id="\${CSS.escape(firstText.id)}"] .pptx-element-text\`);
    inlineTextNode.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, button: 0 }));
    const doubleClickEditingWorks = inlineTextNode.contentEditable === "true"
      && inlineTextNode.closest(".pptx-element").classList.contains("editing");
    inlineTextNode.blur();
    const waitFor = async (predicate, timeoutMs = 6000) => {
      const started = Date.now();
      while (!predicate()) {
        if (Date.now() - started > timeoutMs) return false;
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return true;
    };
    const originalFirstText = firstText.text;
    selectPresentationElement(firstText);
    updateSelectedPresentationElement("text", "Undo and redo smoke test");
    pptxUndoButton.click();
    await waitFor(() => (
      currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText
      && !pptxRedoButton.disabled
    ));
    const undoWorks = currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText;
    pptxRedoButton.click();
    await waitFor(() => currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === "Undo and redo smoke test");
    const redoWorks = currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === "Undo and redo smoke test";
    pptxUndoButton.click();
    await waitFor(() => (
      !presentationHistorySuspended
      && currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText
    ));
    selectPresentationElement(currentPresentationSlide().elements.find((element) => element.id === firstText.id));
    updateSelectedPresentationElement("text", "Keyboard undo and redo smoke test");
    pptxZoomInButton.focus();
    pptxZoomInButton.dispatchEvent(new KeyboardEvent("keydown", { key: "z", metaKey: true, bubbles: true }));
    await waitFor(() => (
      !presentationHistorySuspended
      && currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText
    ));
    const keyboardUndoWorks = currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText;
    pptxZoomInButton.dispatchEvent(new KeyboardEvent("keydown", {
      key: "z",
      metaKey: true,
      shiftKey: true,
      bubbles: true
    }));
    await waitFor(() => (
      !presentationHistorySuspended
      &&
      currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text
      === "Keyboard undo and redo smoke test"
    ));
    const keyboardRedoWorks = currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text
      === "Keyboard undo and redo smoke test";
    pptxUndoButton.click();
    await waitFor(() => (
      !presentationHistorySuspended
      && currentPresentationSlide().elements.find((element) => element.id === firstText.id)?.text === originalFirstText
    ));
    selectPresentationElement(currentPresentationSlide().elements.find((element) => element.id === firstText.id));
    updateSelectedPresentationElement("text", "Edited inside Openleaf\\nSecond paragraph");
    updateSelectedPresentationElement("fontSize", 30);
    updateSelectedPresentationElement("color", "#C2410C");
    pptxAddTextButton.click();
    const addedTextId = selectedPresentationElement.id;
    updateSelectedPresentationElement("text", "New Openleaf text box\\nwith two lines");
    pptxAddRectangleButton.click();
    const addedShapeId = selectedPresentationElement.id;
    updateSelectedPresentationElement("fillColor", "#3B82F6");
    pptxAddEllipseButton.click();
    const addedEllipseId = selectedPresentationElement.id;
    const imageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
    addPresentationImage({
      dataUrl: imageData,
      fileName: "openleaf-test.png",
      mediaType: "image/png",
      width: 1,
      height: 1
    });
    pptxAddChartButton.click();
    pptxAddTableButton.click();
    pptxAddLineButton.click();
    pptxLayoutButton.click();
    pptxBackgroundColorInput.value = "#f8fafc";
    pptxBackgroundColorInput.dispatchEvent(new Event("input", { bubbles: true }));
    pptxTransitionButton.click();

    const originalImageInputClick = pptxImageFileInput.click;
    let imagePickerTriggered = false;
    pptxImageFileInput.click = () => { imagePickerTriggered = true; };
    pptxAddImageButton.click();
    pptxImageFileInput.click = originalImageInputClick;
    const originalBackgroundInputClick = pptxBackgroundColorInput.click;
    let backgroundPickerTriggered = false;
    pptxBackgroundColorInput.click = () => { backgroundPickerTriggered = true; };
    pptxBackgroundButton.click();
    pptxBackgroundColorInput.click = originalBackgroundInputClick;

    pptxZoomRange.value = "75";
    pptxZoomOutput.value = "75%";
    pptxFitButton.click();
    const fitWorks = pptxZoomRange.value === "100" && pptxZoomOutput.value === "100%";
    pptxZoomInButton.click();
    const zoomInButtonWorks = pptxZoomRange.value === "105" && pptxZoomOutput.value === "105%";
    pptxZoomOutButton.click();
    const zoomOutButtonWorks = pptxZoomRange.value === "100" && pptxZoomOutput.value === "100%";
    pptxStageViewport.focus();
    pptxStageViewport.dispatchEvent(new KeyboardEvent("keydown", { key: "+", bubbles: true }));
    const zoomInKeyboardWorks = pptxZoomRange.value === "105" && pptxZoomOutput.value === "105%";
    pptxStageViewport.dispatchEvent(new KeyboardEvent("keydown", { key: "-", bubbles: true }));
    const zoomOutKeyboardWorks = pptxZoomRange.value === "100" && pptxZoomOutput.value === "100%";
    setPresentationZoom(200);
    const extendedZoomRangeWorks = pptxZoomRange.max === "400"
      && pptxZoomRange.value === "200"
      && pptxZoomOutput.value === "200%";
    setPresentationZoom(300);
    const highZoomRendered = await waitFor(() => (
      presentationZoomRenderFrame === 0
      && presentationBackgroundRenderTask === null
      && pptxSlideCanvas.clientHeight > pptxStageViewport.clientHeight
    ));
    pptxStageViewport.scrollTop = 0;
    const highZoomViewportRect = pptxStageViewport.getBoundingClientRect();
    const highZoomCanvasRect = pptxSlideCanvas.getBoundingClientRect();
    const zoomCanReachTop = highZoomRendered
      && pptxStageViewport.scrollHeight > pptxStageViewport.clientHeight
      && highZoomCanvasRect.top >= highZoomViewportRect.top - 1;
    setPresentationZoom(200);
    await waitFor(() => presentationZoomRenderFrame === 0 && presentationBackgroundRenderTask === null);
    pptxStageViewport.scrollTop = Math.round(
      Math.max(0, pptxStageViewport.scrollHeight - pptxStageViewport.clientHeight) * 0.45
    );
    const wheelViewportRect = pptxStageViewport.getBoundingClientRect();
    const wheelFocusX = wheelViewportRect.left + (wheelViewportRect.width * 0.5);
    const wheelFocusY = wheelViewportRect.top + (wheelViewportRect.height * 0.5);
    const beforeWheelCanvasRect = pptxSlideCanvas.getBoundingClientRect();
    const beforeWheelFractionY = (wheelFocusY - beforeWheelCanvasRect.top) / beforeWheelCanvasRect.height;
    const commandZoomEvent = new WheelEvent("wheel", {
      deltaY: -100,
      metaKey: true,
      clientX: wheelFocusX,
      clientY: wheelFocusY,
      bubbles: true,
      cancelable: true
    });
    pptxStageViewport.dispatchEvent(commandZoomEvent);
    await waitFor(() => (
      pptxZoomRange.value === "205"
      && presentationZoomRenderFrame === 0
      && presentationBackgroundRenderTask === null
    ));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const afterWheelCanvasRect = pptxSlideCanvas.getBoundingClientRect();
    const afterWheelFractionY = (wheelFocusY - afterWheelCanvasRect.top) / afterWheelCanvasRect.height;
    const unmodifiedWheelZoom = pptxZoomRange.value;
    pptxStageViewport.dispatchEvent(new WheelEvent("wheel", {
      deltaY: -100,
      clientX: wheelFocusX,
      clientY: wheelFocusY,
      bubbles: true,
      cancelable: true
    }));
    const commandScrollZoomWorks = commandZoomEvent.defaultPrevented
      && unmodifiedWheelZoom === "205"
      && pptxZoomRange.value === "205"
      && Math.abs(afterWheelFractionY - beforeWheelFractionY) < 0.025;
    setPresentationZoom(100);
    const zoomStepControlsWork = zoomInButtonWorks
      && zoomOutButtonWorks
      && zoomInKeyboardWorks
      && zoomOutKeyboardWorks
      && extendedZoomRangeWorks
      && zoomCanReachTop
      && commandScrollZoomWorks;
    const menubarWasCollapsed = pptxMenubar.classList.contains("collapsed");
    pptxMenusToggle.click();
    const menusToggleWorks = pptxMenubar.classList.contains("collapsed") !== menubarWasCollapsed;
    pptxMenusToggle.click();
    const originalPrint = window.print;
    let printTriggered = false;
    window.print = () => { printTriggered = true; };
    pptxPrintButton.click();
    window.print = originalPrint;

    pptxAddRectangleButton.click();
    const disposableElement = selectedPresentationElement;
    pptxDeleteElementButton.click();
    const deleteElementButtonWorks = disposableElement.deleted && selectedPresentationElement === null;
    selectPresentationElement(currentPresentationSlide().elements.find((element) => element.id === addedTextId));
    pptxSelectButton.click();
    const selectToolWorks = selectedPresentationElement === null && presentationSelectionScope === "canvas";

    const beforeProtectedShortcuts = activePresentation.slides.length;
    pptxTextInput.focus();
    pptxTextInput.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
    pptxTextInput.dispatchEvent(new KeyboardEvent("keydown", { key: "c", metaKey: true, bubbles: true }));
    pptxTextInput.dispatchEvent(new KeyboardEvent("keydown", { key: "v", metaKey: true, bubbles: true }));
    const textEditingShortcutsSafe = activePresentation.slides.length === beforeProtectedShortcuts;

    const sourceThumbnail = pptxSlideList.querySelector('.pptx-slide-thumb[data-slide-index="0"]');
    sourceThumbnail.click();
    sourceThumbnail.focus();
    sourceThumbnail.dispatchEvent(new KeyboardEvent("keydown", { key: "c", metaKey: true, bubbles: true }));
    sourceThumbnail.dispatchEvent(new KeyboardEvent("keydown", { key: "v", metaKey: true, bubbles: true }));
    const slidePasteRendered = await waitFor(() => (
      activePresentation.slides.length === initialSlideCount + 1
      && pptxSlideList.querySelectorAll(".pptx-slide-thumb").length === initialSlideCount + 1
    ));
    const pastedThumbnail = pptxSlideList.querySelector(\`.pptx-slide-thumb[data-slide-index="\${activePresentationSlideIndex}"]\`);
    const pastedPreview = pastedThumbnail && pastedThumbnail.querySelector(".pptx-slide-thumb-preview");
    const slideSelectionVisible = Boolean(
      pastedPreview
      && getComputedStyle(pastedPreview).boxShadow
      && getComputedStyle(pastedPreview).boxShadow !== "none"
    );
    const pastedThumbnailStyle = pastedThumbnail && getComputedStyle(pastedThumbnail);
    const slideSelectionRingOnly = Boolean(
      pastedThumbnailStyle
      && pastedThumbnailStyle.backgroundColor === "rgba(0, 0, 0, 0)"
      && pastedThumbnailStyle.boxShadow === "none"
      && [
        pastedThumbnailStyle.borderTopWidth,
        pastedThumbnailStyle.borderRightWidth,
        pastedThumbnailStyle.borderBottomWidth,
        pastedThumbnailStyle.borderLeftWidth
      ].every((width) => width === "0px")
    );
    const presentationStartIndex = activePresentationSlideIndex;
    await setPresentationView(true, { manageFullscreen: false });
    const presentationViewEntered = presentationViewIsActive()
      && !pptxPresentControls.hidden
      && getComputedStyle(document.querySelector(".pptx-slide-pane")).display === "none"
      && getComputedStyle(pptxStageViewport).backgroundColor === "rgb(0, 0, 0)"
      && pptxSlideCanvas.clientWidth > 0;
    pptxPresentPreviousButton.click();
    const presentationNavigationWorks = await waitFor(() => (
      activePresentationSlideIndex === Math.max(0, presentationStartIndex - 1)
      && pptxPresentStatus.value === \`\${activePresentationSlideIndex + 1} / \${activePresentation.slides.length}\`
    ));
    handlePresentationShortcut(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    const presentationViewExited = await waitFor(() => (
      !presentationViewIsActive()
      && pptxPresentControls.hidden
      && getComputedStyle(document.querySelector(".pptx-slide-pane")).display !== "none"
    ));
    const presentationViewWorks = presentationViewEntered && presentationNavigationWorks && presentationViewExited;
    await saveActivePresentation();
    const reloaded = await window.localOverleaf.loadPresentationProject(project.id);
    const reloadedFirstSlide = reloaded.presentation.slides[0];
    const copiedSlidePersisted = reloaded.presentation.slides.length === initialSlideCount + 1
      && reloaded.presentation.slides[1].elements.some((element) => element.text === "Edited inside Openleaf\\nSecond paragraph");
    const copiedThumbnail = pptxSlideList.querySelector('.pptx-slide-thumb[data-slide-index="1"]');
    copiedThumbnail.click();
    copiedThumbnail.focus();
    copiedThumbnail.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
    const slideDeleteRendered = await waitFor(() => (
      activePresentation.slides.length === initialSlideCount
      && pptxSlideList.querySelectorAll(".pptx-slide-thumb").length === initialSlideCount
    ));
    await saveActivePresentation();
    const afterDelete = await window.localOverleaf.loadPresentationProject(project.id);
    const deletedSlidePersisted = afterDelete.presentation.slides.length === initialSlideCount;
    const themeExpectations = [
      ["light-plus", "light", "normal", false],
      ["dark-plus", "dark", "normal", false],
      ["github-light", "light", "high", false],
      ["glass-dark", "dark", "normal", true]
    ];
    const themeMatrix = themeExpectations.map(([preset, theme, contrast, transparent]) => {
      applyThemePreset(preset);
      const topbar = getComputedStyle(document.querySelector(".pptx-topbar"));
      const commandbar = getComputedStyle(document.querySelector(".pptx-commandbar"));
      const inspector = getComputedStyle(document.querySelector(".pptx-inspector"));
      const statusbar = getComputedStyle(document.querySelector(".pptx-statusbar"));
      return {
        preset,
        expected: { theme, contrast, transparent },
        actual: {
          theme: document.body.dataset.theme,
          contrast: document.body.dataset.contrast,
          transparent: document.body.classList.contains("transparent-theme")
        },
        styles: {
          topbarBackground: topbar.backgroundColor,
          commandbarBackground: commandbar.backgroundColor,
          inspectorBackground: inspector.backgroundColor,
          statusbarBackground: statusbar.backgroundColor,
          inspectorColor: inspector.color
        }
      };
    });
    const themesPassed = themeMatrix.every((entry) => (
      entry.actual.theme === entry.expected.theme
      && entry.actual.contrast === entry.expected.contrast
      && entry.actual.transparent === entry.expected.transparent
      && entry.styles.commandbarBackground
      && entry.styles.inspectorColor
    ));
    applyThemePreset("dark-plus");
    const reloadedText = reloadedFirstSlide.elements.find((element) => element.text === "Edited inside Openleaf\\nSecond paragraph");
    const reloadedShape = reloadedFirstSlide.elements.find((element) => element.type === "shape" && element.fillColor === "#3B82F6");
    const reloadedImage = reloadedFirstSlide.elements.find((element) => element.type === "image" && element.name === "openleaf-test.png");
    const reloadedEllipse = reloadedFirstSlide.elements.find((element) => (
      element.type === "shape"
      && element.shapeType === "ellipse"
      && element.fillColor === "#6BAED6"
    ));
    const chartFound = reloadedFirstSlide.elements.some((element) => element.text === "Results")
      && reloadedFirstSlide.elements.filter((element) => /^Chart bar /.test(element.name || "")).length === 4;
    const tableFound = reloadedFirstSlide.elements.some((element) => element.text === "Volume MAE")
      && reloadedFirstSlide.elements.some((element) => element.text === "Fine-tuned");
    const slideStyleChangesFound = reloadedFirstSlide.backgroundColor === "#F8FAFC"
      && reloadedFirstSlide.transition === "fade"
      && reloadedFirstSlide.elements.some((element) => element.name === "Openleaf Line")
      && reloadedFirstSlide.elements.some((element) => element.text === "Presentation title");
    const presentationSettingsButton = document.querySelector(".pptx-topbar .settingsButton");
    presentationSettingsButton.click();
    const settingsAvailable = !settingsDrawer.hidden;
    closeSettings();
    setPresentationTerminalOpen(true, { persist: false });
    const terminalStarted = await new Promise((resolve) => {
      const started = Date.now();
      const check = () => {
        if (terminalSessions.length && terminalBody.querySelector(".terminal-instance")) return resolve(true);
        if (Date.now() - started > 4000) return resolve(false);
        setTimeout(check, 80);
      };
      check();
    });
    const firstToolbarButton = document.querySelector(".pptx-commandbar button");
    const stageToolbar = pptxStageLabel.parentElement;
    const stageToolbarActions = pptxPresentButton.parentElement;
    const stageZoomControls = pptxZoomRange.closest(".pptx-stage-zoom-controls");
    const presentButtonPlacementWorks = stageToolbarActions.parentElement === stageToolbar
      && stageZoomControls.parentElement === stageToolbarActions
      && stageZoomControls.nextElementSibling === pptxPresentButton
      && !pptxStatusSlide.parentElement.contains(pptxZoomRange);
    const topActionsAreIconsOnly = pptxSaveButton.textContent.trim() === ""
      && presentationSettingsButton.textContent.trim() === ""
      && Boolean(pptxSaveButton.querySelector("svg") && presentationSettingsButton.querySelector("svg"));
    const outlinedTopButtons = Array.from(document.querySelectorAll(
      ".pptx-topbar button, .pptx-menubar button, .pptx-commandbar button, .pptx-stage-toolbar button"
    )).filter((button) => {
      const style = getComputedStyle(button);
      return [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth]
        .some((width) => width !== "0px");
    }).map((button) => button.id || button.textContent.trim() || button.title);
    const terminalAvailable = terminalStarted
      && terminalPanel.parentElement === pptxTerminalSlot
      && presentationScreen.classList.contains("pptx-terminal-open")
      && pptxTerminalToggle.textContent.trim() === "Terminal"
      && pptxTerminalToggle.getAttribute("aria-expanded") === "true";
    const controlsWithBackground = Array.from(document.querySelectorAll(
      ".pptx-topbar-actions button, .pptx-menubar button, .pptx-commandbar button, .pptx-stage-toolbar button, .pptx-terminal-toggle, .pptx-zoom-step-button, .pptx-slide-thumb"
    )).filter((button) => getComputedStyle(button).backgroundColor !== "rgba(0, 0, 0, 0)")
      .map((button) => button.id || button.textContent.trim() || button.title);
    const outlinedSlideRows = Array.from(document.querySelectorAll(".pptx-slide-thumb"))
      .filter((button) => {
        const style = getComputedStyle(button);
        return style.boxShadow !== "none"
          || style.outlineStyle !== "none"
          || [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth]
            .some((width) => width !== "0px");
      })
      .map((button) => button.getAttribute("aria-label"));
    return {
      kind: project.kind,
      screenVisible: !presentationScreen.hidden && editorScreen.hidden,
      selectionStaysClean,
      doubleClickEditingWorks,
      initialSlideCount,
      fullFidelityThumbnailPages,
      thumbnailPdfBytes: reloaded.thumbnailPdf?.byteLength || 0,
      thumbnailOverlapPx,
      renderedThumbnailCount,
      renderedElements: pptxElementLayer.querySelectorAll(".pptx-element").length,
      title: pptxProjectTitle.textContent,
      savedStatus: pptxSaveStatus.textContent,
      editedTextFound: Boolean(reloadedText && reloadedText.fontSize === 30 && reloadedText.color === "#C2410C"),
      addedTextFound: reloadedFirstSlide.elements.some((element) => element.text === "New Openleaf text box\\nwith two lines"),
      addedShapeFound: Boolean(reloadedShape && reloadedShape.shapeType === "rect"),
      addedEllipseFound: Boolean(reloadedEllipse),
      addedImageFound: Boolean(reloadedImage),
      chartFound,
      tableFound,
      slideStyleChangesFound,
      addedTextId,
      addedShapeId,
      backgroundWidth: pptxBackgroundCanvas.width,
      slideCountLabel: pptxSlideCount.textContent,
      statusSlide: pptxStatusSlide.textContent,
      zoomOutput: pptxZoomOutput.value,
      settingsAvailable,
      terminalAvailable,
      presentationViewWorks,
      presentButtonPlacementWorks,
      topActionsAreIconsOnly,
      toolbarFunctionality: {
        undoWorks,
        redoWorks,
        keyboardUndoWorks,
        keyboardRedoWorks,
        menusToggleWorks,
        printTriggered,
        fitWorks,
        zoomStepControlsWork,
        selectToolWorks,
        imagePickerTriggered,
        backgroundPickerTriggered,
        deleteElementButtonWorks
      },
      allToolbarControlsWork: [
        undoWorks,
        redoWorks,
        keyboardUndoWorks,
        keyboardRedoWorks,
        menusToggleWorks,
        printTriggered,
        fitWorks,
        zoomStepControlsWork,
        selectToolWorks,
        imagePickerTriggered,
        backgroundPickerTriggered,
        deleteElementButtonWorks
      ].every(Boolean),
      textEditingShortcutsSafe,
      slideClipboardWorks: slidePasteRendered && copiedSlidePersisted,
      slideDeleteWorks: slideDeleteRendered && deletedSlidePersisted,
      slideSelectionVisible,
      slideSelectionRingOnly,
      controlsWithBackground,
      outlinedSlideRows,
      outlinedTopButtons,
      toolbarButtonBorderWidth: getComputedStyle(firstToolbarButton).borderTopWidth,
      helperCopyRemoved: !document.querySelector(".pptx-selection-help") && !document.querySelector(".pptx-stage-hint"),
      themesPassed,
      themeMatrix
    };
  })()`);

  const screenshot = await command(socket, "Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));
  const passed = result.kind === "presentation"
    && result.screenVisible
    && result.selectionStaysClean
    && result.doubleClickEditingWorks
    && result.initialSlideCount > 0
    && result.fullFidelityThumbnailPages === result.initialSlideCount
    && result.thumbnailPdfBytes > 0
    && result.thumbnailOverlapPx <= 0.5
    && result.renderedThumbnailCount === result.initialSlideCount
    && result.renderedElements > 0
    && result.editedTextFound
    && result.addedTextFound
    && result.addedShapeFound
    && result.addedEllipseFound
    && result.addedImageFound
    && result.chartFound
    && result.tableFound
    && result.slideStyleChangesFound
    && result.settingsAvailable
    && result.terminalAvailable
    && result.presentationViewWorks
    && result.presentButtonPlacementWorks
    && result.topActionsAreIconsOnly
    && result.allToolbarControlsWork
    && result.textEditingShortcutsSafe
    && result.slideClipboardWorks
    && result.slideDeleteWorks
    && result.slideSelectionVisible
    && result.slideSelectionRingOnly
    && result.controlsWithBackground.length === 0
    && result.outlinedSlideRows.length === 0
    && result.outlinedTopButtons.length === 0
    && result.toolbarButtonBorderWidth === "0px"
    && result.helperCopyRemoved
    && result.themesPassed
    && result.backgroundWidth > 0;
  console.log(JSON.stringify({ passed, ...result, screenshotPath }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  if (socket) socket.close();
  child.kill("SIGTERM");
  await new Promise((resolve) => child.once("exit", resolve));
  if (!process.env.OPENLEAF_KEEP_TEST_PROJECT) await fs.rm(testRoot, { recursive: true, force: true });
}
