// End-to-end test of the agent CLI: launch Openleaf from source on throwaway
// data, then drive it only through `openleaf ...` commands over the socket.
import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(appRoot, "scripts", "openleaf-cli.mjs");
let root;
let socket;
let child;
let output = "";

function openleaf(...args) {
  const result = spawnSync(process.execPath, [cli, ...args, "--json"], {
    env: { ...process.env, OPENLEAF_CONTROL_SOCKET: socket },
    encoding: "utf8",
    timeout: 120000
  });
  if (result.status !== 0) throw new Error(`openleaf ${args.join(" ")} failed: ${result.stderr}${result.stdout}`);
  return JSON.parse(result.stdout);
}

function openleafError(...args) {
  const result = spawnSync(process.execPath, [cli, ...args], {
    env: { ...process.env, OPENLEAF_CONTROL_SOCKET: socket }, encoding: "utf8", timeout: 60000
  });
  return { status: result.status, stderr: result.stderr };
}

async function waitForSocket() {
  const started = Date.now();
  while (Date.now() - started < 30000) {
    if (child.exitCode !== null) throw new Error(`Openleaf exited early.\n${output}`);
    try {
      const status = openleaf("status");
      if (status.windows.length) return status;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Control socket never answered.\n${output}`);
}

async function makeProject(name, body) {
  const dir = path.join(root, "projects", name);
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "main.tex");
  await fs.writeFile(file, `\\documentclass{article}\n\\begin{document}\n${body}\n\\end{document}\n`);
  return file;
}

before(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-cli-"));
  // Unix socket paths are limited to ~104 bytes, so keep this one short.
  socket = path.join("/tmp", `openleaf-cli-${process.pid}.sock`);
  child = spawn(require("electron"), [`--user-data-dir=${path.join(root, "user-data")}`, appRoot], {
    cwd: appRoot,
    env: {
      ...process.env,
      OPENLEAF_CONTROL_SOCKET: socket,
      OPENLEAF_SKIP_LATEX_CHECK: "1",
      OPENLEAF_PROJECT_LIBRARY_ROOT: path.join(root, "library")
    },
    stdio: ["ignore", "pipe", "pipe"]
  });
  child.stdout.on("data", (chunk) => { output += chunk; });
  child.stderr.on("data", (chunk) => { output += chunk; });
  await waitForSocket();
});

after(async () => {
  if (child && child.exitCode === null) {
    child.kill("SIGTERM");
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  await fs.rm(root, { recursive: true, force: true });
  await fs.rm(socket, { force: true });
});

test("status reports the running app and its window", () => {
  const status = openleaf("status");
  assert.match(status.version, /^\d+\.\d+\.\d+/);
  assert.equal(status.windows.length, 1);
});

test("add and list projects", async () => {
  const alpha = await makeProject("Alpha Paper", "alpha beta alpha");
  const beta = await makeProject("Beta Notes", "gamma");
  const added = openleaf("add", alpha);
  openleaf("add", beta);
  const projects = openleaf("projects");
  assert.ok(projects.some((project) => project.id === added.id));
  assert.equal(projects.length, 2);
});

test("open a project by name, then a second one as a tab", () => {
  const first = openleaf("open", "Alpha");
  assert.equal(first.screen, "editor");
  assert.match(first.project.name, /Alpha/i);
  const second = openleaf("open", "Beta", "--tab");
  assert.equal(second.mode, "tab");
  const tabs = openleaf("tabs");
  assert.equal(tabs.length, 2);
  assert.equal(tabs.filter((tab) => tab.active).length, 1);
});

test("switch and close tabs", () => {
  const selected = openleaf("tab", "1");
  assert.equal(selected.tabIndex, 1);
  assert.match(openleaf("state").project.name, /Alpha/i);
  openleaf("close-tab", "2");
  assert.equal(openleaf("tabs").length, 1);
});

test("panels open and close", () => {
  for (const name of ["files", "source", "preview", "terminal", "log", "notes"]) {
    const closed = openleaf("panel", name, "close");
    assert.equal(closed.panels[name], false, `${name} should close`);
    const opened = openleaf("panel", name, "open");
    assert.equal(opened.panels[name], true, `${name} should open`);
  }
  assert.notEqual(openleafError("panel", "nope", "open").status, 0);
});

test("find counts matches in the current file", () => {
  const found = openleaf("find", "alpha");
  assert.equal(found.count, 2);
});

test("screenshot writes a PNG", async () => {
  const out = path.join(root, "shot.png");
  const shot = openleaf("screenshot", "--out", out);
  assert.equal(shot.path, out);
  const bytes = await fs.readFile(out);
  assert.equal(bytes.subarray(1, 4).toString(), "PNG");
  assert.ok(shot.width > 0 && shot.height > 0);
});

test("fullscreen toggles on and off", () => {
  assert.equal(openleaf("fullscreen", "on").fullscreen, true);
  assert.equal(openleaf("fullscreen", "off").fullscreen, false);
});

test("home returns to the projects page", () => {
  assert.equal(openleaf("home").screen, "projects");
});

test("unknown projects and methods fail clearly", () => {
  const missing = openleafError("open", "does-not-exist-anywhere");
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /No Openleaf project matches/);
  const raw = openleafError("call", "nonsense");
  assert.match(raw.stderr, /Unknown method/);
});
