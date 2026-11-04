import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import path from "node:path";
import commitModule from "../git-file-commit.js";
const { fileCommitInfo, commitFile } = commitModule;
const exec = promisify(execFile);

async function fixture(run) {
  const root = await mkdtemp(path.join(tmpdir(), "openleaf-commit-"));
  const git = async (...args) => (await exec("git", args, { cwd: root })).stdout.trim();
  try {
    await git("init", "-b", "main");
    await git("config", "user.name", "Openleaf Test");
    await git("config", "user.email", "test@example.invalid");
    await writeFile(path.join(root, "index.html"), "<h1>Before</h1>\n");
    await writeFile(path.join(root, "other.txt"), "before\n");
    await git("add", "."); await git("commit", "-m", "Initial");
    await run(root, git);
  } finally { await rm(root, { recursive: true, force: true }); }
}

test("commits only the active HTML, preserves other staged changes, and keeps the chosen message", async () => {
  await fixture(async (root, git) => {
    await git("remote", "add", "origin", "https://example.invalid/never-push.git");
    await writeFile(path.join(root, "index.html"), "<h1>Task 1</h1>\n");
    await writeFile(path.join(root, "other.txt"), "unrelated staged change\n");
    await git("add", "other.txt");
    const info = await fileCommitInfo(root, path.join(root, "index.html"));
    assert.equal(info.branch, "main"); assert.equal(info.changed, true);
    assert.match(info.diff, /Task 1/);
    const message = "Improve Task 1 equations\n\nKeep $(literal) and `literal` text";
    const result = await commitFile(root, path.join(root, "index.html"), message, info.head);
    assert.equal(result.committed, true);
    assert.equal(await git("log", "-1", "--format=%B"), message);
    assert.equal(await git("diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"), "index.html");
    assert.equal(await git("diff", "--cached", "--name-only"), "other.txt");
    assert.equal((await fileCommitInfo(root, path.join(root, "index.html"))).changed, false);
    assert.equal((await commitFile(root, path.join(root, "index.html"), "No change")).committed, false);
  });
});

test("accepts a new file with a literal Git path and rejects blank messages or a changed branch", async () => {
  await fixture(async (root, git) => {
    const file = path.join(root, "task[1].html");
    await writeFile(file, "<p>New</p>\n");
    const before = await git("rev-parse", "HEAD");
    await assert.rejects(commitFile(root, file, "   "), /commit message/);
    await assert.rejects(commitFile(root, file, "Task 1", "old-head"), /branch changed/);
    assert.equal(await git("rev-parse", "HEAD"), before);
    const result = await commitFile(root, file, "Add Task 1", before);
    assert.equal(result.committed, true);
    assert.equal(await git("show", "HEAD:task[1].html"), "<p>New</p>");
  });
});

test("commits saved C++ from its source folder without including the visual HTML or other staged files", async () => {
  await fixture(async (root, git) => {
    const source = path.join(root, "src");
    const file = path.join(source, "rasterizer.cpp");
    await mkdir(source);
    await writeFile(file, "void rasterize_triangle() {}\n");
    await git("add", "src/rasterizer.cpp"); await git("commit", "-m", "Add source");
    assert.equal((await fileCommitInfo(source, file)).changed, false);
    await writeFile(file, "void rasterize_triangle() { /* Task 1 */ }\n");
    await writeFile(path.join(root, "index.html"), "<h1>Uncommitted visual edit</h1>\n");
    await writeFile(path.join(root, "other.txt"), "unrelated\n"); await git("add", "other.txt");
    const info = await fileCommitInfo(source, file);
    assert.equal(info.relativePath, "src/rasterizer.cpp");
    assert.match(info.diff, /Task 1/);
    const result = await commitFile(source, file, "Improve triangle coverage", info.head);
    assert.equal(result.committed, true);
    assert.equal(await git("diff-tree", "--no-commit-id", "--name-only", "-r", "HEAD"), "src/rasterizer.cpp");
    assert.equal(await git("diff", "--cached", "--name-only"), "other.txt");
    assert.equal(await git("diff", "--name-only"), "index.html");
  });
});

test("rejects files outside the project and folders without Git", async () => {
  await fixture(async (root) => {
    await assert.rejects(fileCommitInfo(root, path.join(root, "..")), /inside this project/);
  });
  const root = await mkdtemp(path.join(tmpdir(), "openleaf-no-git-"));
  try {
    const file = path.join(root, "index.html"); await writeFile(file, "<p>Example</p>");
    await assert.rejects(fileCommitInfo(root, file), /not a Git repository/);
  } finally { await rm(root, { recursive: true, force: true }); }
});
