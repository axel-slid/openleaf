#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(process.argv[2] || "");
const previewRoot = process.argv[3] ? path.resolve(process.argv[3]) : "";
const projectId = String(process.argv[4] || "");
if (!root || !fs.existsSync(root)) {
  throw new Error("Pass the reading-library folder as the first argument.");
}

function findPdfs(directory, depth = 0) {
  if (depth > 5) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith(".")) return [];
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findPdfs(absolutePath, depth + 1);
    return entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf" ? [absolutePath] : [];
  });
}

function normalizeExtractedText(raw) {
  const pages = String(raw || "").replace(/\r/g, "").split("\f");
  const lineCounts = new Map();
  pages.forEach((page) => {
    const unique = new Set(page.split("\n").map((line) => line.trim()).filter((line) => line.length >= 5 && line.length <= 120));
    unique.forEach((line) => lineCounts.set(line, (lineCounts.get(line) || 0) + 1));
  });
  const repeatedMarginLines = new Set(Array.from(lineCounts).filter(([, count]) => count >= Math.max(3, Math.ceil(pages.length * 0.45))).map(([line]) => line));
  return pages.map((page) => page
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/^(?:page\s+)?\d+(?:\s+of\s+\d+)?$/i.test(trimmed)) return false;
      if (/^reading\s+\d+$/i.test(trimmed)) return false;
      return !repeatedMarginLines.has(trimmed);
    })
    .join("\n"))
    .join("\n\n")
    .replace(/([\p{L}])-[ \t]*\n[ \t]*([\p{Ll}])/gu, "$1$2")
    .replace(/(?<!\n)\n(?!\n)/g, " ")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeLatex(text) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([{}$&#_%])/g, "\\$1")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/~/g, "\\textasciitilde{}");
}

const pdfs = findPdfs(root).sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
for (const pdfPath of pdfs) {
  const relativePath = path.relative(root, pdfPath).split(path.sep).join("/");
  const key = crypto.createHash("sha1").update(relativePath).digest("hex").slice(0, 16);
  const outputDir = path.join(root, ".openleaf-reading-text", key);
  const outputPath = path.join(outputDir, "main.tex");
  const sourceStat = fs.statSync(pdfPath);
  const existingStat = fs.existsSync(outputPath) ? fs.statSync(outputPath) : null;
  if (!existingStat || existingStat.mtimeMs < sourceStat.mtimeMs) {
    const extracted = execFileSync("pdftotext", ["-enc", "UTF-8", pdfPath, "-"], {
      encoding: "utf8",
      maxBuffer: 128 * 1024 * 1024
    });
    const cleanText = normalizeExtractedText(extracted);
    const title = path.basename(pdfPath, path.extname(pdfPath));
    const paragraphs = cleanText.split(/\n{2,}/).map((paragraph) => escapeLatex(paragraph.trim())).filter(Boolean);
    const tex = `\\documentclass[11pt]{article}
\\usepackage[letterpaper,margin=0.82in]{geometry}
\\usepackage{fontspec}
\\usepackage{microtype}
\\usepackage{parskip}
\\setmainfont{Times New Roman}
\\setlength{\\parindent}{0pt}
\\title{${escapeLatex(title)}}
\\date{}
\\begin{document}
\\maketitle

${paragraphs.join("\n\n")}

\\end{document}
`;
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, tex, "utf8");
    fs.utimesSync(outputPath, sourceStat.atime, new Date(sourceStat.mtimeMs + 5));
  }

  if (previewRoot && projectId) {
    const previewKey = crypto.createHash("sha1").update(`${projectId}\n${relativePath}`).digest("hex").slice(0, 20);
    const previewPath = path.join(previewRoot, `${previewKey}.webp`);
    const previewStat = fs.existsSync(previewPath) ? fs.statSync(previewPath) : null;
    if (!previewStat || previewStat.mtimeMs < sourceStat.mtimeMs) {
      fs.mkdirSync(previewRoot, { recursive: true });
      fs.mkdirSync(outputDir, { recursive: true });
      const temporaryBase = path.join(outputDir, "preview-first-page");
      const temporaryPng = `${temporaryBase}.png`;
      execFileSync("pdftoppm", ["-f", "1", "-l", "1", "-singlefile", "-scale-to-x", "1100", "-scale-to-y", "-1", "-png", pdfPath, temporaryBase]);
      execFileSync("cwebp", ["-quiet", "-q", "84", temporaryPng, "-o", previewPath]);
      fs.rmSync(temporaryPng, { force: true });
      fs.utimesSync(previewPath, sourceStat.atime, new Date(sourceStat.mtimeMs + 5));
    }
  }
}

process.stdout.write(`Prepared ${pdfs.length} reading texts${previewRoot && projectId ? " and first-page previews" : ""}.\n`);
