// Two-way sync between a local Openleaf project and an Overleaf project through
// Overleaf's Git bridge (https://git.overleaf.com/<projectId>). The token is
// handed to git through GIT_ASKPASS so it never lands in .git/config or argv.
const { execFile } = require("node:child_process");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");

const GIT_HOST = "https://git.overleaf.com";
const BRANCH = "master";
// Build products Openleaf writes next to the sources. Kept out of Overleaf via
// .git/info/exclude so the remote project never sees them.
const LOCAL_EXCLUDES = [
  "*.aux", "*.log", "*.out", "*.toc", "*.lof", "*.lot", "*.fls", "*.fdb_latexmk",
  "*.synctex.gz", "*.synctex(busy)", "*.bbl", "*.blg", "*.bcf", "*.run.xml",
  "*.nav", "*.snm", "*.vrb", ".DS_Store", "AGENTS.md"
];

const running = new Map();

function parseOverleafLink(raw) {
  const value = String(raw || "").trim();
  if (/^[0-9a-f]{24}$/i.test(value)) return { projectId: value.toLowerCase() };
  let url;
  try {
    url = new URL(/^[a-z]+:\/\//i.test(value) ? value : `https://${value}`);
  } catch (_error) {
    throw new Error("That is not an Overleaf link.");
  }
  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);
  if (host === "git.overleaf.com" && /^[0-9a-f]{24}$/i.test(parts[0] || "")) {
    return { projectId: parts[0].toLowerCase() };
  }
  if (!/(^|\.)overleaf\.com$/.test(host)) throw new Error("That is not an Overleaf link.");
  if (parts[0] === "project" && /^[0-9a-f]{24}$/i.test(parts[1] || "")) {
    return { projectId: parts[1].toLowerCase() };
  }
  // Share links (/read/<token>, /<digits><token>) only reveal the project id
  // after the browser session follows them.
  if (parts[0] === "read" || /^\d+[a-z]+$/i.test(parts[0] || "")) {
    return { shareUrl: `https://www.overleaf.com/${parts.join("/")}` };
  }
  throw new Error("That is not an Overleaf project link.");
}

function remoteUrl(projectId) {
  return `${GIT_HOST}/${projectId}`;
}

function askpassPath(userDataDir) {
  return path.join(userDataDir, "overleaf-askpass.sh");
}

async function ensureAskpass(userDataDir) {
  const file = askpassPath(userDataDir);
  const body = "#!/bin/sh\ncase \"$1\" in\n  Username*) printf '%s\\n' git ;;\n  *) printf '%s\\n' \"$OPENLEAF_OVERLEAF_TOKEN\" ;;\nesac\n";
  let current = "";
  try { current = await fsp.readFile(file, "utf8"); } catch (_error) { current = ""; }
  if (current !== body) await fsp.writeFile(file, body, { mode: 0o700 });
  await fsp.chmod(file, 0o700);
  return file;
}

function git(cwd, args, { token, userDataDir, timeout = 120000 } = {}) {
  const env = {
    ...process.env,
    GIT_TERMINAL_PROMPT: "0",
    GIT_ASKPASS: askpassPath(userDataDir),
    OPENLEAF_OVERLEAF_TOKEN: token || ""
  };
  // An empty credential.helper keeps the macOS keychain from storing the token.
  const fullArgs = ["-c", "credential.helper=", "-c", "core.quotepath=off", ...args];
  return new Promise((resolve, reject) => {
    execFile("git", fullArgs, { cwd, env, timeout, maxBuffer: 32 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        error.message = friendlyGitError(stderr || error.message);
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function friendlyGitError(text) {
  const message = String(text || "").trim();
  if (/Authentication failed|could not read Password|403|401/i.test(message)) {
    return "Overleaf rejected the Git token. Create one under Overleaf Account Settings → Git Integration.";
  }
  if (/not found|404|does not exist/i.test(message)) {
    return "Overleaf could not find that project, or this account cannot open it.";
  }
  if (/Could not resolve host|Failed to connect|timed out/i.test(message)) {
    return "Could not reach Overleaf.";
  }
  return message.split("\n").filter(Boolean).slice(-4).join("\n") || "Git failed.";
}

async function writeLocalExcludes(root, extra = []) {
  const file = path.join(root, ".git", "info", "exclude");
  await fsp.mkdir(path.dirname(file), { recursive: true });
  let current = "";
  try { current = await fsp.readFile(file, "utf8"); } catch (_error) { current = ""; }
  const lines = new Set(current.split("\n").map((line) => line.trim()));
  const missing = [...LOCAL_EXCLUDES, ...extra].filter((pattern) => !lines.has(pattern));
  if (!missing.length) return;
  const prefix = current && !current.endsWith("\n") ? "\n" : "";
  await fsp.appendFile(file, `${prefix}# Openleaf build output\n${missing.join("\n")}\n`);
}

// Untracked PDFs named after a .tex entry are compile output (main.tex → main.pdf).
async function compiledPdfExcludes(root) {
  const entries = await fsp.readdir(root).catch(() => []);
  return entries
    .filter((name) => name.toLowerCase().endsWith(".tex"))
    .map((name) => `/${name.slice(0, -4)}.pdf`);
}

async function ensureIdentity(root, options) {
  const name = await git(root, ["config", "user.name"], options).then((r) => r.stdout.trim(), () => "");
  if (!name) await git(root, ["config", "user.name", "Openleaf"], options);
  const email = await git(root, ["config", "user.email"], options).then((r) => r.stdout.trim(), () => "");
  if (!email) await git(root, ["config", "user.email", "openleaf@localhost"], options);
}

async function cloneProject({ projectId, destination, token, userDataDir }) {
  await ensureAskpass(userDataDir);
  const options = { token, userDataDir, timeout: 300000 };
  await fsp.mkdir(path.dirname(destination), { recursive: true });
  try {
    await git(path.dirname(destination), ["clone", "--branch", BRANCH, remoteUrl(projectId), destination], options);
  } catch (error) {
    await fsp.rm(destination, { recursive: true, force: true }).catch(() => {});
    throw error;
  }
  await writeLocalExcludes(destination, await compiledPdfExcludes(destination));
  await ensureIdentity(destination, options);
  return destination;
}

async function changedPaths(root, from, to, options) {
  if (!from || !to || from === to) return [];
  const { stdout } = await git(root, ["diff", "--name-only", from, to], options);
  return stdout.split("\n").map((line) => line.trim()).filter(Boolean);
}

// Commit local edits, merge Overleaf's edits, push. Returns what moved.
async function syncProject({ root, token, userDataDir, message = "Openleaf edits" }) {
  if (running.has(root)) return running.get(root);
  const job = (async () => {
    await ensureAskpass(userDataDir);
    const options = { token, userDataDir };
    if (!fs.existsSync(path.join(root, ".git"))) throw new Error("This Overleaf project folder is no longer a Git checkout.");
    await writeLocalExcludes(root, await compiledPdfExcludes(root));
    await ensureIdentity(root, options);

    const unmerged = (await git(root, ["diff", "--name-only", "--diff-filter=U"], options)).stdout.trim();
    if (unmerged) {
      return { status: "conflict", conflicts: unmerged.split("\n"), pulled: [], pushed: false };
    }

    await git(root, ["add", "-A"], options);
    const staged = (await git(root, ["diff", "--cached", "--name-only"], options)).stdout.trim();
    let committed = false;
    if (staged) {
      await git(root, ["commit", "-q", "-m", message], options);
      committed = true;
    }

    const before = (await git(root, ["rev-parse", "HEAD"], options)).stdout.trim();
    await git(root, ["fetch", "-q", "origin", BRANCH], options);
    const remoteHead = (await git(root, ["rev-parse", `origin/${BRANCH}`], options)).stdout.trim();

    let pulled = [];
    const behind = Number((await git(root, ["rev-list", "--count", `HEAD..origin/${BRANCH}`], options)).stdout.trim() || 0);
    if (behind > 0) {
      try {
        await git(root, ["merge", "--no-edit", "-q", `origin/${BRANCH}`], options);
      } catch (error) {
        const conflicts = (await git(root, ["diff", "--name-only", "--diff-filter=U"], options)).stdout.trim();
        await git(root, ["merge", "--abort"], options).catch(() => {});
        if (conflicts) {
          return { status: "conflict", conflicts: conflicts.split("\n"), pulled: [], pushed: false, committed };
        }
        throw error;
      }
      const after = (await git(root, ["rev-parse", "HEAD"], options)).stdout.trim();
      pulled = await changedPaths(root, before, after, options);
    }

    let pushed = false;
    const ahead = Number((await git(root, ["rev-list", "--count", `origin/${BRANCH}..HEAD`], options)).stdout.trim() || 0);
    if (ahead > 0) {
      await git(root, ["push", "-q", "origin", `HEAD:${BRANCH}`], options);
      pushed = true;
    }

    return { status: "synced", pulled, pushed, committed, remoteHead, syncedAt: new Date().toISOString() };
  })();
  running.set(root, job);
  try {
    return await job;
  } finally {
    running.delete(root);
  }
}

// Settle a conflicted sync by taking one side for every conflicting hunk.
async function resolveConflict({ root, token, userDataDir, keep }) {
  if (keep !== "overleaf" && keep !== "local") throw new Error("Choose which version to keep.");
  await ensureAskpass(userDataDir);
  const options = { token, userDataDir };
  await git(root, ["merge", "--abort"], options).catch(() => {});
  await git(root, ["add", "-A"], options);
  const staged = (await git(root, ["diff", "--cached", "--name-only"], options)).stdout.trim();
  if (staged) await git(root, ["commit", "-q", "-m", "Openleaf edits"], options);
  await git(root, ["fetch", "-q", "origin", BRANCH], options);
  const before = (await git(root, ["rev-parse", "HEAD"], options)).stdout.trim();
  const strategy = keep === "overleaf" ? "theirs" : "ours";
  await git(root, ["merge", "--no-edit", "-q", "-X", strategy, `origin/${BRANCH}`], options);
  const after = (await git(root, ["rev-parse", "HEAD"], options)).stdout.trim();
  await git(root, ["push", "-q", "origin", `HEAD:${BRANCH}`], options);
  return { status: "synced", pulled: await changedPaths(root, before, after, options), pushed: true, syncedAt: new Date().toISOString() };
}

module.exports = { parseOverleafLink, remoteUrl, cloneProject, syncProject, resolveConflict };
