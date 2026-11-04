import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const sourcePresentation = process.env.OPENLEAF_TEST_PPTX;
if (!sourcePresentation) throw new Error("Set OPENLEAF_TEST_PPTX to a .pptx file.");

const require = createRequire(import.meta.url);
const { loadPresentationEditor, savePresentationEditor } = require("../presentation-editor.js");
const testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-collaboration-"));
const testPresentation = path.join(testRoot, "Shared Poster.pptx");
const cacheRoot = path.join(testRoot, "cache");
const backupRoot = path.join(testRoot, "backups");
await fs.copyFile(sourcePresentation, testPresentation);

const trackedProperties = [
  "text", "richTextRuns", "x", "y", "cx", "cy", "fontSize", "fontFamily", "color",
  "fillColor", "lineColor", "lineWidth", "lineStyle", "bold", "italic", "underline", "align", "zIndex"
];

function state(element) {
  return Object.fromEntries(trackedProperties.map((property) => [property, structuredClone(element[property])]));
}

function change(slide, element, updates) {
  return {
    slidePath: slide.path,
    id: element.id,
    name: element.name,
    type: element.type,
    shapeType: element.shapeType,
    isNew: false,
    deleted: false,
    ...state(element),
    ...updates,
    base: state(element)
  };
}

try {
  const agentA = await loadPresentationEditor(testPresentation, cacheRoot);
  const agentB = await loadPresentationEditor(testPresentation, cacheRoot);
  const slideA = agentA.presentation.slides[0];
  const slideB = agentB.presentation.slides[0];
  const imageA = slideA.elements.find((element) => element.type === "image");
  const textB = slideB.elements.find((element) => element.type === "text" && String(element.text || "").trim());
  if (!imageA || !textB) throw new Error("The collaboration fixture needs an image and a text object.");

  const movedX = imageA.x + 19050;
  const editedText = `${textB.text} · agent B`;
  const saveA = await savePresentationEditor(testPresentation, cacheRoot, backupRoot, {
    baseRevision: agentA.presentation.revision,
    changes: [change(slideA, imageA, { x: movedX })]
  });
  const saveB = await savePresentationEditor(testPresentation, cacheRoot, backupRoot, {
    baseRevision: agentB.presentation.revision,
    changes: [change(slideB, textB, { text: editedText })]
  });

  const merged = await loadPresentationEditor(testPresentation, cacheRoot);
  const mergedSlide = merged.presentation.slides[0];
  const mergedImage = mergedSlide.elements.find((element) => String(element.id) === String(imageA.id));
  const mergedText = mergedSlide.elements.find((element) => String(element.id) === String(textB.id));
  const disjointMergeWorks = saveA.mergeStatus === "saved"
    && saveB.mergeStatus === "merged"
    && mergedImage?.x === movedX
    && mergedText?.text === editedText;

  const agentC = await loadPresentationEditor(testPresentation, cacheRoot);
  const agentD = await loadPresentationEditor(testPresentation, cacheRoot);
  const textC = agentC.presentation.slides[0].elements.find((element) => String(element.id) === String(textB.id));
  const textD = agentD.presentation.slides[0].elements.find((element) => String(element.id) === String(textB.id));
  await savePresentationEditor(testPresentation, cacheRoot, backupRoot, {
    baseRevision: agentC.presentation.revision,
    changes: [change(agentC.presentation.slides[0], textC, { text: `${textC.text} · agent C` })]
  });
  let conflictBlocked = false;
  try {
    await savePresentationEditor(testPresentation, cacheRoot, backupRoot, {
      baseRevision: agentD.presentation.revision,
      changes: [change(agentD.presentation.slides[0], textD, { text: `${textD.text} · agent D` })]
    });
  } catch (error) {
    conflictBlocked = /Shared-edit conflict/.test(String(error?.message || error));
  }

  const result = {
    passed: disjointMergeWorks && conflictBlocked,
    disjointMergeWorks,
    conflictBlocked,
    firstSave: saveA.mergeStatus,
    secondSave: saveB.mergeStatus
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
} finally {
  await fs.rm(testRoot, { recursive: true, force: true });
}
