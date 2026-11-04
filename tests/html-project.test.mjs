import assert from "node:assert/strict";
import { readFile, mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";

const main = await readFile(new URL("../main.js", import.meta.url), "utf8");
const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

test("HTML and HTM import directly and folder discovery keeps TeX precedence", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "openleaf-html-"));
  try {
    await mkdir(path.join(root, "images"));
    await writeFile(path.join(root, "index.html"), "<html><body>Example</body></html>");
    await writeFile(path.join(root, "other.htm"), "<html></html>");
    const sandbox = { fsp: fs, path, isEditablePresentationFile: () => false, isArchivePath: () => false, registerProjectRecord: (file) => ({ file }) };
    vm.createContext(sandbox);
    vm.runInContext(main.slice(main.indexOf("async function findProjectEntryFile("), main.indexOf("async function uniqueDirectory(")), sandbox);
    vm.runInContext(main.slice(main.indexOf("async function registerProjectFromPath("), main.indexOf("async function importArchiveToProject(")), sandbox);
    assert.equal(await sandbox.findProjectEntryFile(root), path.join(root, "index.html"));
    assert.equal((await sandbox.registerProjectFromPath(root)).file, path.join(root, "index.html"));
    assert.equal((await sandbox.registerProjectFromPath(path.join(root, "other.htm"))).file, path.join(root, "other.htm"));
    await writeFile(path.join(root, "main.tex"), "\\documentclass{article}");
    assert.equal(await sandbox.findProjectEntryFile(root), path.join(root, "main.tex"));
  } finally { await rm(root, { recursive: true, force: true }); }
});

test("HTML edits update preview and save without starting a LaTeX compile", () => {
  const calls = [];
  const sandbox = { activeFile: { name: "index.html" }, activeProject: {}, savedText: "before", htmlPreviewTimer: null,
    updateStats() {}, scheduleSourceMinimapUpdate() {}, updateActiveDocumentTitle() {}, updateActiveTextTabDirtyState() {}, updateFileOutline() {},
    setSaveState() {}, getSourceText: () => "after", scheduleAutoSave: () => calls.push("save"),
    setPdfStale: () => calls.push("stale"), scheduleAutoCompile: () => calls.push("compile"), scheduleHistoryCapture() {},
    syncHtmlPreview: () => calls.push("preview"), clearTimeout() {}, setTimeout(callback) { callback(); return 1; }, isPythonExecutionFile: () => false };
  vm.createContext(sandbox);
  vm.runInContext(app.slice(app.indexOf("function isHtmlFile("), app.indexOf("function syncHtmlPreview(")), sandbox);
  vm.runInContext(app.slice(app.indexOf("function handleSourceChanged("), app.indexOf("function setupSourceMinimap(")), sandbox);
  sandbox.handleSourceChanged();
  assert.deepEqual(calls, ["save", "preview"]);
  sandbox.activeFile = { name: "chapter.tex" };
  calls.length = 0;
  sandbox.handleSourceChanged();
  assert.deepEqual(calls, ["save", "stale", "compile"]);
});
