// Per-file version history kept in the app's userData folder, so it survives
// restarts without adding files to the user's project (or its git repo).
// Each file gets one JSON list of snapshots, newest first. Bursts of edits
// merge into one "Edited" snapshot; saves, opens, and restores always add one.

const crypto = require("node:crypto");
const fsp = require("node:fs/promises");
const path = require("node:path");
const { execFile } = require("node:child_process");

const MAX_SNAPSHOTS = 300;
const MERGE_WINDOWS_MS = { Edited: 3 * 60 * 1000, Saved: 2 * 60 * 1000 };

function historyFilePath(root, projectId, relativePath) {
  const projectKey = String(projectId || "project").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileKey = crypto.createHash("sha1").update(String(relativePath || "")).digest("hex");
  return path.join(root, projectKey, `${fileKey}.json`);
}

async function readSnapshots(filePath) {
  try {
    const parsed = JSON.parse(await fsp.readFile(filePath, "utf8"));
    return Array.isArray(parsed.snapshots) ? repairImportedTimes(parsed.snapshots) : [];
  } catch (error) {
    return [];
  }
}

async function writeSnapshots(filePath, relativePath, snapshots) {
  await fsp.mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.tmp`;
  await fsp.writeFile(tempPath, JSON.stringify({ relativePath, snapshots }), "utf8");
  await fsp.rename(tempPath, filePath);
}

// Counts lines added and removed, ignoring order (cheap enough to run on
// every snapshot; the renderer computes the real ordered diff for display).
function lineChangeStats(previousText, currentText) {
  const lines = (text) => (text ? String(text).split("\n") : []);
  const remaining = new Map();
  lines(previousText).forEach((line) => remaining.set(line, (remaining.get(line) || 0) + 1));
  let added = 0;
  lines(currentText).forEach((line) => {
    const count = remaining.get(line) || 0;
    if (count > 0) remaining.set(line, count - 1);
    else added += 1;
  });
  let removed = 0;
  remaining.forEach((count) => { removed += count; });
  return { added, removed };
}

function snapshotMeta(snapshot) {
  const { text, ...meta } = snapshot;
  return { ...meta, kind: "snapshot", chars: String(text || "").length };
}

async function recordSnapshot(root, { projectId, relativePath, text, reason = "Edited" }) {
  const filePath = historyFilePath(root, projectId, relativePath);
  const snapshots = await readSnapshots(filePath);
  const content = String(text ?? "");
  const latest = snapshots[0];
  if (latest && latest.text === content) return { recorded: false };

  const now = Date.now();
  const mergeable = latest
    && MERGE_WINDOWS_MS[reason]
    && latest.reason === reason
    && now - Date.parse(latest.time) < MERGE_WINDOWS_MS[reason];
  if (mergeable) {
    const base = snapshots[1] ? snapshots[1].text : "";
    snapshots[0] = { ...latest, time: new Date(now).toISOString(), text: content, ...lineChangeStats(base, content) };
  } else {
    snapshots.unshift({
      id: `${now.toString(36)}-${crypto.randomBytes(3).toString("hex")}`,
      time: new Date(now).toISOString(),
      reason: String(reason || "Edited").slice(0, 60),
      text: content,
      ...lineChangeStats(latest ? latest.text : "", content)
    });
  }
  await writeSnapshots(filePath, relativePath, snapshots.slice(0, MAX_SNAPSHOTS));
  return { recorded: true };
}

// The old localStorage history stored times like "Oct 1, 11:57 PM" with no
// year, which Date.parse reads as 2001. Use the most recent such date that
// isn't in the future.
function parseLegacyTime(value) {
  const parsed = new Date(Date.parse(value));
  if (!Number.isFinite(parsed.getTime())) return null;
  if (/\b\d{4}\b/.test(String(value))) return parsed;
  const now = new Date();
  parsed.setFullYear(now.getFullYear());
  if (parsed.getTime() > now.getTime() + 60000) parsed.setFullYear(now.getFullYear() - 1);
  return parsed;
}

// Snapshots imported before the year fix carry 2001 dates; repair on read.
function repairImportedTimes(snapshots) {
  snapshots.forEach((snapshot) => {
    const date = new Date(snapshot.time);
    if (String(snapshot.id).startsWith("import-") && date.getFullYear() < 2015) {
      const now = new Date();
      date.setFullYear(now.getFullYear());
      if (date.getTime() > now.getTime() + 60000) date.setFullYear(now.getFullYear() - 1);
      snapshot.time = date.toISOString();
    }
  });
  return snapshots;
}

// One-time import of the old per-file history kept in renderer localStorage.
async function importSnapshots(root, { projectId, relativePath, entries }) {
  const filePath = historyFilePath(root, projectId, relativePath);
  const existing = await readSnapshots(filePath);
  if (existing.length || !Array.isArray(entries) || !entries.length) return { imported: 0 };
  const ordered = entries
    .filter((entry) => entry && typeof entry.text === "string")
    .slice(0, MAX_SNAPSHOTS)
    .reverse();
  const snapshots = [];
  ordered.forEach((entry, index) => {
    const previous = ordered[index - 1];
    const parsedTime = parseLegacyTime(entry.time);
    snapshots.unshift({
      id: `import-${index}-${crypto.randomBytes(3).toString("hex")}`,
      time: (parsedTime || new Date(Date.now() - (ordered.length - index) * 1000)).toISOString(),
      reason: String(entry.title || "Edited").slice(0, 60),
      text: entry.text,
      ...lineChangeStats(previous ? previous.text : "", entry.text)
    });
  });
  await writeSnapshots(filePath, relativePath, snapshots);
  return { imported: snapshots.length };
}

function runGit(cwd, args) {
  return new Promise((resolve) => {
    execFile("git", ["-C", cwd, ...args], { maxBuffer: 1024 * 1024 * 32, timeout: 15000 }, (error, stdout) => {
      resolve(error ? null : stdout);
    });
  });
}

async function gitCommitsForFile(projectRoot, relativePath, limit = 60) {
  const output = await runGit(projectRoot, [
    "log", "--follow", `-n${limit}`, "--numstat",
    "--format=%x1e%H%x1f%an%x1f%aI%x1f%s", "--", relativePath
  ]);
  if (!output) return [];
  return output.split("\x1e").map((block) => block.trim()).filter(Boolean).map((block) => {
    const [header, ...statLines] = block.split("\n");
    const [hash, author, time, subject] = header.split("\x1f");
    let added = 0;
    let removed = 0;
    statLines.forEach((line) => {
      const [plus, minus] = line.split("\t");
      added += Number(plus) || 0;
      removed += Number(minus) || 0;
    });
    return { id: `git:${hash}`, kind: "commit", hash, author, time, reason: subject || "Commit", added, removed };
  });
}

async function gitFileAtCommit(projectRoot, hash, relativePath) {
  if (!/^[0-9a-f]{7,40}$/i.test(hash)) throw new Error("Unknown commit.");
  const output = await runGit(projectRoot, ["show", `${hash}:./${relativePath}`]);
  if (output === null) throw new Error("This file does not exist in that commit.");
  return output;
}

async function listHistory(root, { projectId, relativePath, projectRoot }) {
  const snapshots = await readSnapshots(historyFilePath(root, projectId, relativePath));
  const commits = projectRoot ? await gitCommitsForFile(projectRoot, relativePath) : [];
  const entries = [...snapshots.map(snapshotMeta), ...commits]
    .sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
  return { entries };
}

async function historyEntryText(root, { projectId, relativePath, projectRoot, entryId }) {
  if (String(entryId).startsWith("git:")) {
    return { text: await gitFileAtCommit(projectRoot, String(entryId).slice(4), relativePath) };
  }
  const snapshots = await readSnapshots(historyFilePath(root, projectId, relativePath));
  const snapshot = snapshots.find((item) => item.id === entryId);
  if (!snapshot) throw new Error("That version is no longer in the history.");
  return { text: snapshot.text };
}

module.exports = { recordSnapshot, importSnapshots, listHistory, historyEntryText, lineChangeStats };
