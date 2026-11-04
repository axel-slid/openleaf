import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ElectronHarness } from "./electron-harness.mjs";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(testDir, "../..");
const readingProject = "/Users/alexdils/Documents/Openleaf/Untitled LaTeX Project-6";
const secondProject = "/Users/alexdils/Documents/Openleaf/Untitled LaTeX Project-4";
const demogProject = "/Users/alexdils/Downloads/DEMOG C126 - Assigned Readings";
const screenshotPath = "/tmp/openleaf-reader-feature-verification.png";

let harness;

before(async () => {
  harness = await new ElectronHarness(appRoot).start();
});

after(async () => {
  await harness?.stop();
});

test("reader, cinematic, tutorial, and collection features work together", async () => {
  const imported = await harness.evaluate(`window.localOverleaf.addProjectFromPath(${JSON.stringify([readingProject, secondProject])})`);
  assert.equal(imported.projects.length, 2);
  await harness.evaluate(`(async () => {
    projects = (await window.localOverleaf.listProjects()).projects;
    renderProjectGrid();
    await openProject(${JSON.stringify(imported.project.id)});
    return true;
  })()`);
  await harness.waitForExpression("pdfSpeechPlan.wordCount > 40 && Boolean(pdfViewer.querySelector('.pdf-speech-word'))", 20_000);

  const filteredOpening = await harness.evaluate(`pdfSpeechPlan.chunks.slice(0, 4).map((chunk) => chunk.text).join(" ")`);
  assert.doesNotMatch(filteredOpening, /READING\s+1|Worst Mistake in the History|By Jared Diamond|Farming and agriculture|Shutterstock/i);
  assert.match(filteredOpening, /To science we owe dramatic changes/i);

  const visualMode = await harness.evaluate(`(() => {
    const original = getSourceText();
    setSourceText("\\\\section{Visual check}\\nOpenleaf visual mode renders editable prose.");
    visualModeButton.click();
    const result = {
      visible: !visualEditor.hidden,
      hasDocument: Boolean(visualEditor.querySelector(".visual-page")),
      active: visualModeButton.classList.contains("active")
    };
    sourceModeButton.click();
    setSourceText(original);
    return result;
  })()`);
  assert.deepEqual(visualMode, { visible: true, hasDocument: true, active: true });

  const reader = await harness.evaluate(`(() => {
    const words = pdfSpeechPlan.chunks.flatMap((chunk) => chunk.words);
    const target = words.find((word) => word.pageNumber === 1 && word.pageWordIndex > 24
      && pdfViewer.querySelector('[data-pdf-speech-key="' + CSS.escape(word.domKey) + '"]'));
    const element = pdfViewer.querySelector('[data-pdf-speech-key="' + CSS.escape(target.domKey) + '"]');
    const beforeProgress = pdfSpeechProgressDetail.textContent;
    pdfSpeechBackend = { available: true, model: "test", voice: "am_adam" };
    const box = element.getBoundingClientRect();
    element.dispatchEvent(new MouseEvent("click", {
      bubbles: true, cancelable: true, button: 0,
      clientX: box.left + box.width / 2, clientY: box.top + box.height / 2
    }));
    const highlight = pdfViewer.querySelector(".pdf-speech-highlight");
    const wordBox = element.getBoundingClientRect();
    const highlightBox = highlight.getBoundingClientRect();
    const allText = words.map((word) => word.spokenText);
    const titleBox = activeDocumentTitle.getBoundingClientRect();
    const topbarBox = activeDocumentTitle.closest(".topbar").getBoundingClientRect();
    return {
      target: target.text,
      paused: pdfSpeechPaused && !pdfSpeechPlaying,
      progressChanged: beforeProgress !== pdfSpeechProgressDetail.textContent,
      progress: pdfSpeechProgressDetail.textContent,
      excludesReadingLabel: !allText.some((word) => /^reading$/i.test(word)),
      excludesPageNumber: !allText.some((word, index) => /^1$/.test(word) && index > allText.length - 6),
      padding: {
        left: wordBox.left - highlightBox.left,
        top: wordBox.top - highlightBox.top,
        right: highlightBox.right - wordBox.right,
        bottom: highlightBox.bottom - wordBox.bottom
      },
      titleCenterDelta: Math.abs((titleBox.left + titleBox.width / 2) - (topbarBox.left + topbarBox.width / 2)),
      titleCenters: {
        title: titleBox.left + titleBox.width / 2,
        topbar: topbarBox.left + topbarBox.width / 2,
        viewport: innerWidth / 2,
        cssLeft: getComputedStyle(activeDocumentTitle.parentElement).left
      },
      defaultVoice: pdfSpeechVoice.value
    };
  })()`);
  assert.ok(reader.target);
  assert.equal(reader.paused, true, "clicking a word while stopped must seek and remain paused");
  assert.equal(reader.progressChanged, true, "clicking a word must update current progress");
  assert.equal(reader.excludesReadingLabel, true);
  assert.equal(reader.excludesPageNumber, true);
  assert.equal(reader.defaultVoice, "am_adam");
  assert.ok(reader.titleCenterDelta <= 1.5, `title is ${reader.titleCenterDelta}px off center: ${JSON.stringify(reader.titleCenters)}`);
  for (const [side, value] of Object.entries(reader.padding)) {
    assert.ok(Math.abs(value - 4) <= 1.25, `${side} highlight padding was ${value}px`);
  }

  const compactToolbar = await harness.evaluate(`(async () => {
    previewPaneHeader.style.width = "520px";
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const result = {
      compileLabel: getComputedStyle(compileButton.querySelector(".compile-pill-label")).display,
      compileIcon: getComputedStyle(compileButton.querySelector(".compile-pill-icon")).display,
      progress: getComputedStyle(pdfSpeechProgressCurrent.closest(".pdf-speech-progress")).display,
      speechWidth: pdfSpeechControls.getBoundingClientRect().width,
      paneWidth: previewPaneHeader.getBoundingClientRect().width,
      containerType: getComputedStyle(previewPaneHeader).containerType
    };
    previewPaneHeader.style.removeProperty("width");
    return result;
  })()`);
  assert.equal(compactToolbar.compileLabel, "none", JSON.stringify(compactToolbar));
  assert.notEqual(compactToolbar.compileIcon, "none");
  assert.equal(compactToolbar.progress, "none");
  assert.ok(compactToolbar.speechWidth <= 36);

  const controls = await harness.evaluate(`(async () => {
    pdfPronunciationDictionary.value = "cm = centimeter";
    handlePdfPronunciationDictionaryChange();
    const pronunciation = applyPdfPronunciationRules("The specimen was 5 cm long.");
    const fakeAudio = {
      playbackRate: 1, paused: false,
      pause() { this.paused = true; },
      play() { this.paused = false; return Promise.resolve(); },
      removeAttribute() {}, load() {}
    };
    pdfSpeechAudio = fakeAudio;
    pdfSpeechPlaying = true;
    pdfSpeechPaused = false;
    pdfSpeechRate.value = "1.5";
    handlePdfSpeechRateChange();
    const speedKeptPlaying = pdfSpeechPlaying && !pdfSpeechPaused && fakeAudio.playbackRate === 1.5;
    document.activeElement?.blur();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true, cancelable: true }));
    const spacePaused = !pdfSpeechPlaying && pdfSpeechPaused;
    pdfSpeechAudio = fakeAudio;
    pdfSpeechPlaying = true;
    pdfSpeechPaused = false;
    pdfPronunciationDictionary.focus();
    pdfPronunciationDictionary.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true, cancelable: true }));
    const inputIgnored = pdfSpeechPlaying && !pdfSpeechPaused;

    const playingBeforeReaderMode = pdfSpeechPlaying;
    togglePdfReaderMode(true);
    const readerModeKeptPlaying = playingBeforeReaderMode && pdfSpeechPlaying;
    togglePdfReaderMode(false);

    applyThemePreset("quiet-light");
    const lightPdf = {
      theme: document.body.dataset.theme,
      surface: getComputedStyle(document.documentElement).getPropertyValue("--pdf-paper").trim()
    };
    applyThemePreset("dusk-contrast-hc");
    const darkPdf = {
      theme: document.body.dataset.theme,
      surface: getComputedStyle(document.documentElement).getPropertyValue("--pdf-dark-paper").trim(),
      active: pdfViewer.classList.contains("pdf-dark-render")
    };
    applyThemePreset("quiet-light");
    stopPdfSpeech({ resetCursor: false, updateStatus: false });

    applyExtraFeaturesSetting(true);
    void openPdfCinematicMode();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const cinematic = {
      visible: !pdfCinematicStage.hidden,
      artwork: pdfCinematicArtwork.getAttribute("src"),
      passage: pdfCinematicNarration.textContent,
      yinYang: Boolean(pdfCinematicButton.querySelector(".yin-yang-symbol"))
    };
    closePdfCinematicMode();

    startOpenleafTour();
    const tutorial = {
      step: document.querySelector(".openleaf-tour-step-label")?.textContent,
      dots: document.querySelectorAll(".openleaf-tour-dots i").length,
      title: document.querySelector(".openleaf-tour-card h2")?.textContent
    };
    closeOpenleafTour();
    return { pronunciation, speedKeptPlaying, spacePaused, inputIgnored, readerModeKeptPlaying, lightPdf, darkPdf, cinematic, tutorial };
  })()`);
  assert.equal(controls.pronunciation, "The specimen was 5 centimeter long.");
  assert.equal(controls.speedKeptPlaying, true);
  assert.equal(controls.spacePaused, true);
  assert.equal(controls.inputIgnored, true);
  assert.equal(controls.readerModeKeptPlaying, true);
  assert.equal(controls.lightPdf.theme, "light");
  assert.equal(controls.darkPdf.theme, "dark");
  assert.equal(controls.darkPdf.active, true);
  assert.notEqual(controls.lightPdf.surface, controls.darkPdf.surface);
  assert.equal(controls.cinematic.visible, true);
  assert.match(controls.cinematic.artwork, /^assets\/cinematic\/.+\.webp$/);
  assert.ok(controls.cinematic.passage.length > 20);
  assert.equal(controls.cinematic.yinYang, true);
  assert.equal(controls.tutorial.step, "1/10");
  assert.equal(controls.tutorial.dots, 10);

  const syntheticReading = await harness.evaluate(`(() => {
    pdfSpeechBackend = { available: false, model: "", voice: "am_adam" };
    const word = (text, key, x) => ({ text, domKey: key, x, top: 10, width: 20, height: 10 });
    const line = (text, words, height = 10) => ({ text, words, height });
    preparePdfSpeechPlan(new Map([[1, [
      line("READING 1", [word("READING", "a", 0), word("1", "b", 25)], 15),
      line("DEMOG C126 | READING 04 Population", [word("DEMOG", "a1", 0), word("C126", "a2", 25), word("|", "a3", 50), word("READING", "a4", 55), word("04", "a5", 80), word("Population", "a6", 100)], 18),
      line("Figure 1. Population by year", [word("Figure", "g1", 0), word("1.", "g2", 25), word("Population", "g3", 50), word("by", "g4", 75), word("year", "g5", 100)], 8),
      line("Source: United Nations", [word("Source:", "h1", 0), word("United", "h2", 45), word("Nations", "h3", 90)], 8),
      line("By Alex Author", [word("By", "i1", 0), word("Alex", "i2", 25), word("Author", "i3", 50)], 10),
      line("micro-", [word("micro-", "c", 0)], 10),
      line("plastic matters", [word("plastic", "d", 0), word("matters", "e", 45)], 10),
      line("1", [word("1", "f", 0)], 10)
    ]]]), 1, "synthetic", "1");
    return {
      text: pdfSpeechPlan.chunks.map((chunk) => chunk.text).join(" "),
      words: pdfSpeechPlan.chunks.flatMap((chunk) => chunk.words).map((entry) => entry.spokenText)
    };
  })()`);
  assert.equal(syntheticReading.text, "microplastic matters");
  assert.deepEqual(syntheticReading.words, ["micro-", "plastic", "matters"]);

  await harness.evaluate(`(async () => {
    projects = (await window.localOverleaf.listProjects()).projects;
    projectCollections = [];
    saveProjectCollections();
    renderProjectGrid();
    const cards = Array.from(projectGrid.querySelectorAll(".project-card"));
    const transfer = new DataTransfer();
    cards[0].dispatchEvent(new DragEvent("dragstart", { bubbles: true, dataTransfer: transfer }));
    cards[1].dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: transfer }));
    cards[1].dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: transfer }));
    return true;
  })()`);
  const folder = await harness.evaluate(`(() => ({
    count: projectCollections.length,
    members: projectCollections[0]?.divisions[0]?.projectIds.length || 0,
    card: document.querySelector(".project-collection-card")?.textContent || ""
  }))()`);
  assert.equal(folder.count, 1);
  assert.equal(folder.members, 2);
  assert.match(folder.card, /2 projects/);

  const demog = await harness.evaluate(`(async () => {
    const result = await window.localOverleaf.addProjectFromPath(${JSON.stringify([demogProject])});
    projects = result.projects;
    ensureDemogReadingCollection();
    renderProjectGrid();
    const collection = projectCollections.find((item) => item.name === "DEMOG C126");
    const project = projects.find((item) => collection?.divisions[0]?.projectIds.includes(item.id));
    const files = project ? await window.localOverleaf.listProjectFiles(project.id) : null;
    const countPdfs = (nodes) => (nodes || []).reduce((sum, node) => sum + (node.kind === "file" && /\\.pdf$/i.test(node.name) ? 1 : 0) + countPdfs(node.children), 0);
    if (collection) openProjectCollection(collection.id);
    return {
      subject: collection?.name,
      division: collection?.divisions[0]?.name,
      pdfs: countPdfs(files?.files),
      visibleReadings: document.querySelectorAll(".project-division-card.reading-card").length,
      cardVisible: Array.from(document.querySelectorAll(".project-collection-card")).some((card) => /DEMOG C126/.test(card.textContent))
    };
  })()`);
  assert.deepEqual(demog, { subject: "DEMOG C126", division: "Readings", pdfs: 33, visibleReadings: 33, cardVisible: true });

  const definition = await harness.evaluate(`window.localOverleaf.lookupWordDefinition("agriculture")`);
  assert.equal(definition.word, "agriculture");
  assert.ok(definition.definition.length > 10);
  assert.doesNotMatch(definition.pronunciation, /[\/\\]/);
  assert.match(definition.pronunciation, /-/);

  const screenshot = await harness.command("Page.captureScreenshot", {
    format: "png", fromSurface: true, captureBeyondViewport: false
  });
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));
});
