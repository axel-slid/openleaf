const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const fs = require("node:fs/promises");
const path = require("node:path");

const exec = promisify(execFile);
const committing = new Set();
const git = (cwd, args) => exec("git", args, { cwd, maxBuffer: 16 * 1024 * 1024 });
const inside = (root, file) => file.startsWith(root + path.sep);

async function fileCommitInfo(projectRoot, filePath) {
  const root = await fs.realpath(projectRoot);
  const file = await fs.realpath(filePath);
  if (!inside(root, file) || !(await fs.stat(file)).isFile()) throw new Error("Choose a file inside this project.");
  let repo;
  try { repo = (await git(root, ["rev-parse", "--show-toplevel"])).stdout.trim(); }
  catch { throw new Error("This project folder is not a Git repository."); }
  repo = await fs.realpath(repo);
  if (!inside(repo, file)) throw new Error("The file is outside the Git repository.");
  const relativePath = path.relative(repo, file);
  const fileSpec = `:(literal)${relativePath}`;
  const head = (await git(repo, ["rev-parse", "--verify", "HEAD"]).catch(() => ({ stdout: "" }))).stdout.trim();
  const branch = (await git(repo, ["symbolic-ref", "--short", "HEAD"]).catch(() => ({ stdout: "detached HEAD" }))).stdout.trim();
  const status = (await git(repo, ["status", "--porcelain", "--", fileSpec])).stdout;
  const tracked = await git(repo, ["ls-files", "--error-unmatch", "--", fileSpec]).then(() => true, () => false);
  let diff = head && tracked ? (await git(repo, ["diff", "--no-ext-diff", "--no-textconv", "HEAD", "--", fileSpec])).stdout : "";
  if (!tracked || !head) diff = `New file: ${relativePath}\n\n${(await fs.readFile(file, "utf8")).slice(0, 100000)}`;
  return { repo, relativePath, fileSpec, head, branch, changed: Boolean(status.trim()) && Boolean(diff), diff: diff.slice(0, 100000) };
}

async function commitFile(projectRoot, filePath, message, expectedHead) {
  message = String(message || "").trim();
  if (!message || message.includes("\0")) throw new Error("Enter a commit message.");
  const info = await fileCommitInfo(projectRoot, filePath);
  if (expectedHead !== undefined && expectedHead !== info.head) throw new Error("The branch changed. Reopen Commit to review the current changes.");
  if (!info.changed) return { committed: false, ...info };
  if (committing.has(info.repo)) throw new Error("A commit is already in progress.");
  committing.add(info.repo);
  try {
    // --only commits this file's working copy and leaves other staged files alone.
    await git(info.repo, ["add", "--", info.fileSpec]);
    const result = await git(info.repo, ["commit", "--only", "-m", message, "--", info.fileSpec]);
    const commit = (await git(info.repo, ["rev-parse", "HEAD"])).stdout.trim();
    return { committed: true, commit, branch: info.branch, relativePath: info.relativePath, output: result.stdout };
  } finally { committing.delete(info.repo); }
}

module.exports = { fileCommitInfo, commitFile };
