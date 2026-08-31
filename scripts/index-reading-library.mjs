#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

function commandPath(name) {
  for (const candidate of [`/opt/homebrew/bin/${name}`, `/usr/local/bin/${name}`, `/usr/bin/${name}`]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  try {
    return execFileSync("/usr/bin/which", [name], { encoding: "utf8" }).trim();
  } catch (_error) {
    return "";
  }
}

export function readingEstimate(text, pageCount = 0) {
  const normalized = String(text || "").replace(/\s+/g, " ").trim();
  const words = normalized.match(/[\p{L}\p{M}\p{N}]+(?:[’'-][\p{L}\p{M}\p{N}]+)*/gu) || [];
  const formulaLines = String(text || "").split(/\r?\n/).filter((line) => (
    /(?:[=≤≥≠≈<>∑∏∫√∞∈∉∪∩⊂⊆→⇒↔]|\b(?:O|Theta|Omega)\s*\(|\b\w+\s*\^\s*[-+]?\w+)/u.test(line)
  ));
  const formulaCount = formulaLines.length;
  const contentMinutes = (words.length + formulaCount * 25) / 180;
  const pageFloorMinutes = Math.max(0, Number(pageCount) || 0) * 1.5;
  return {
    wordCount: words.length,
    formulaCount,
    minutes: Math.max(1, Math.ceil(Math.max(contentMinutes, pageFloorMinutes)))
  };
}

function pdfPageCount(pdfinfo, filePath) {
  if (!pdfinfo) return 0;
  try {
    const output = execFileSync(pdfinfo, [filePath], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 });
    return Number(output.match(/^Pages:\s+(\d+)/m)?.[1]) || 0;
  } catch (_error) {
    return 0;
  }
}

function pdfText(pdftotext, filePath) {
  if (!pdftotext) return "";
  try {
    return execFileSync(pdftotext, ["-layout", "-enc", "UTF-8", "-nopgbrk", filePath, "-"], {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024
    });
  } catch (_error) {
    return "";
  }
}

function pdfFiles(rootPath) {
  const files = [];
  const visit = (directory) => {
    fs.readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      if (entry.name.startsWith(".")) return;
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolutePath);
      else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf") files.push(absolutePath);
    });
  };
  visit(rootPath);
  return files.sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" }));
}

export function indexReadingLibrary({ rootPath, subject, division = "Readings", scanDirectory = "." }) {
  const resolvedRoot = path.resolve(rootPath);
  const scanRoot = path.resolve(resolvedRoot, scanDirectory);
  if (!(scanRoot === resolvedRoot || scanRoot.startsWith(`${resolvedRoot}${path.sep}`))) {
    throw new Error("The scan directory must stay inside the reading-library root.");
  }
  const pdftotext = commandPath("pdftotext");
  const pdfinfo = commandPath("pdfinfo");
  const readings = {};
  pdfFiles(scanRoot).forEach((filePath) => {
    const relativePath = path.relative(resolvedRoot, filePath).split(path.sep).join("/");
    const pageCount = pdfPageCount(pdfinfo, filePath);
    readings[relativePath] = { ...readingEstimate(pdfText(pdftotext, filePath), pageCount), pageCount };
  });
  const manifest = {
    version: 1,
    subject,
    division,
    scanDirectory: path.relative(resolvedRoot, scanRoot).split(path.sep).join("/") || ".",
    generatedAt: new Date().toISOString(),
    readings
  };
  fs.writeFileSync(path.join(resolvedRoot, ".openleaf-readings.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const [rootPath, subject, scanDirectory = ".", division = "Readings"] = process.argv.slice(2);
  if (!rootPath || !subject) {
    console.error("Usage: node scripts/index-reading-library.mjs <root> <subject> [scan-directory] [division]");
    process.exitCode = 1;
  } else {
    const manifest = indexReadingLibrary({ rootPath, subject, scanDirectory, division });
    console.log(`Indexed ${Object.keys(manifest.readings).length} readings for ${subject}.`);
  }
}
