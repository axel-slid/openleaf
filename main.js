const { app, BrowserWindow, Menu, dialog, ipcMain, shell, clipboard } = require("electron");
const { execFile, spawn } = require("node:child_process");
const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const pty = require("node-pty");

const repoRoot = resolveRepoRoot();
const defaultTexPath = path.join(repoRoot, "papers", "sashimi2026_synthetic_cnf", "main.tex");
const homeDir = process.env.HOME || "";
const latexDocumentsRemoteUrl = "https://github.com/axel-slid/openleaf-latex-documents.git";
const latexSourceExtensions = new Set([".tex", ".ltx", ".bib", ".bst", ".cls", ".sty"]);
const appIconPngPath = path.join(repoRoot, "assets", "icon.png");

let mainWindow;
const terminalSessions = new Map();
const terminalPath = [
  "/opt/homebrew/bin",
  "/usr/local/bin",
  path.join(homeDir, ".local", "bin"),
  path.join(homeDir, "bin"),
  process.env.PATH || ""
].join(path.delimiter);

app.setName("Openleaf");

function resolveRepoRoot() {
  const configPath = path.join(__dirname, "local-config.json");
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    if (config.repoRoot) return config.repoRoot;
  }

  return __dirname;
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1520,
    height: 980,
    minWidth: 1180,
    minHeight: 700,
    title: "Openleaf",
    ...(fs.existsSync(appIconPngPath) ? { icon: appIconPngPath } : {}),
    backgroundColor: "#00000000",
    transparent: true,
    ...(process.platform === "darwin"
      ? {
          titleBarStyle: "hiddenInset",
          vibrancy: "under-window",
          visualEffectState: "active",
          trafficLightPosition: { x: 14, y: 13 }
        }
      : {}),
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  if (process.platform === "darwin" && app.dock && fs.existsSync(appIconPngPath)) {
    app.dock.setIcon(appIconPngPath);
  }

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.once("ready-to-show", () => mainWindow.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("enter-full-screen", () => sendEditorCommand("fullscreen-enter"));
  mainWindow.on("leave-full-screen", () => sendEditorCommand("fullscreen-leave"));

  mainWindow.on("closed", () => {
    killTerminalSessions();
    mainWindow = null;
  });
}

function sendEditorCommand(command) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("editor-command", command);
  }
}

function buildMenu() {
  const isMac = process.platform === "darwin";
  const template = [
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideOthers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" }
          ]
        }]
      : []),
    {
      label: "File",
      submenu: [
        {
          label: "Command Palette",
          accelerator: "CommandOrControl+P",
          click: () => sendEditorCommand("command-palette")
        },
        { type: "separator" },
        {
          label: "New Project",
          accelerator: "CommandOrControl+Shift+O",
          click: () => sendEditorCommand("add-project")
        },
        {
          label: "Projects",
          click: () => sendEditorCommand("projects")
        },
        { type: "separator" },
        {
          label: "Save",
          accelerator: "CommandOrControl+S",
          click: () => sendEditorCommand("save")
        },
        {
          label: "Compile PDF",
          accelerator: "CommandOrControl+Enter",
          click: () => sendEditorCommand("compile")
        },
        {
          label: "Open PDF",
          accelerator: "CommandOrControl+O",
          click: () => sendEditorCommand("open-pdf")
        },
        {
          label: "Reload From Disk",
          click: () => sendEditorCommand("reload")
        },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectAll" },
        { type: "separator" },
        {
          label: "Find",
          accelerator: "CommandOrControl+F",
          click: () => sendEditorCommand("find")
        },
        {
          label: "Find Next",
          accelerator: "CommandOrControl+G",
          click: () => sendEditorCommand("find-next")
        },
        {
          label: "Find Previous",
          accelerator: "Shift+CommandOrControl+G",
          click: () => sendEditorCommand("find-previous")
        }
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function toggleFullscreen() {
  if (!mainWindow || mainWindow.isDestroyed()) return { fullscreen: false };
  const next = !mainWindow.isFullScreen();
  mainWindow.setFullScreen(next);
  return { fullscreen: next };
}

function storePath() {
  return path.join(app.getPath("userData"), "projects.json");
}

function templateStorePath() {
  return path.join(app.getPath("userData"), "templates.json");
}

function templateRootPath() {
  return path.join(app.getPath("userData"), "templates");
}

function projectLibraryRoot() {
  return path.join(app.getPath("documents"), "Openleaf");
}

function templatePreviewRootPath() {
  return path.join(app.getPath("userData"), "template-previews");
}

function projectPreviewRootPath() {
  return path.join(app.getPath("userData"), "project-previews");
}

function makeProjectId(texPath) {
  return crypto.createHash("sha1").update(path.resolve(texPath)).digest("hex").slice(0, 14);
}

function makeProject(texPath, name) {
  const resolvedTexPath = path.resolve(texPath);
  const now = new Date().toISOString();
  return {
    id: makeProjectId(resolvedTexPath),
    name: name || inferProjectName(resolvedTexPath),
    texPath: resolvedTexPath,
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now
  };
}

function inferProjectName(texPath) {
  const folder = path.basename(path.dirname(texPath)).replace(/[-_]+/g, " ");
  if (folder && folder !== ".") return titleCase(folder);
  return path.basename(texPath, path.extname(texPath));
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function normalizeExternalUrl(rawUrl) {
  const url = new URL(String(rawUrl || "").trim());
  if (!["http:", "https:", "mailto:"].includes(url.protocol)) {
    throw new Error(`Unsupported link protocol: ${url.protocol || "unknown"}`);
  }
  return url.toString();
}

function normalizeGithubRemote(rawRemote) {
  const remote = String(rawRemote || "").trim();
  if (!remote) return "";
  if (/^git@github\.com:[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?:\.git)?$/.test(remote)) return remote;

  let url;
  try {
    url = new URL(remote);
  } catch (error) {
    throw new Error("Project GitHub must be a GitHub HTTPS URL or git@github.com SSH URL.");
  }

  if (!["http:", "https:"].includes(url.protocol) || url.hostname !== "github.com") {
    throw new Error("Project GitHub must point to github.com.");
  }
  return url.toString().replace(/\/$/, "");
}

function formatMainError(error) {
  if (!error) return "Unknown error.";
  if (typeof error === "string") return error;
  return error.message || JSON.stringify(error, null, 2);
}

async function openExternalLink(_event, rawUrl) {
  const url = normalizeExternalUrl(rawUrl);
  await shell.openExternal(url);
  return { ok: true };
}

async function openHistoryWindow(_event, payload = {}) {
  const history = normalizeHistoryPayload(payload);
  const historyWindow = new BrowserWindow({
    width: 1080,
    height: 760,
    minWidth: 760,
    minHeight: 520,
    title: `History - ${history.fileName}`,
    backgroundColor: history.theme.mode === "dark" ? "#111827" : "#ffffff",
    parent: mainWindow || undefined,
    ...(process.platform === "darwin"
      ? {
          titleBarStyle: "hiddenInset",
          trafficLightPosition: { x: 14, y: 13 }
        }
      : {}),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  await historyWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(historyWindowHtml(history))}`);
  return { ok: true };
}

function normalizeHistoryPayload(payload) {
  const theme = payload && payload.theme ? payload.theme : {};
  const entries = Array.isArray(payload.entries) ? payload.entries.slice(0, 60) : [];
  return {
    title: String(payload.title || "History"),
    fileName: String(payload.fileName || "document"),
    currentText: String(payload.currentText || ""),
    entries: entries.map((entry, index) => ({
      id: String(entry.id || index),
      title: String(entry.title || "Edit"),
      summary: String(entry.summary || ""),
      fileName: String(entry.fileName || payload.fileName || "document"),
      time: String(entry.time || ""),
      added: Number(entry.added || 0),
      removed: Number(entry.removed || 0),
      text: String(entry.text || "")
    })),
    theme: {
      mode: theme.mode === "dark" ? "dark" : "light",
      accent: String(theme.accent || "#f97316"),
      bg: String(theme.bg || (theme.mode === "dark" ? "#111827" : "#ffffff")),
      panel: String(theme.panel || (theme.mode === "dark" ? "#1f2937" : "#f8fafc")),
      text: String(theme.text || (theme.mode === "dark" ? "#f8fafc" : "#111827")),
      muted: String(theme.muted || "#6b7280"),
      border: String(theme.border || "rgba(120, 120, 120, 0.28)")
    }
  };
}

function historyWindowHtml(history) {
  const entries = history.entries.length ? history.entries : [{
    title: "Current version",
    summary: "No recorded edits in this session.",
    time: "",
    added: 0,
    removed: 0,
    text: history.currentText
  }];
  const selected = entries[0] || {};

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(`History - ${history.fileName}`)}</title>
  <style>
    :root {
      --accent: ${escapeCss(history.theme.accent)};
      --bg: ${escapeCss(history.theme.bg)};
      --panel: ${escapeCss(history.theme.panel)};
      --text: ${escapeCss(history.theme.text)};
      --muted: ${escapeCss(history.theme.muted)};
      --border: ${escapeCss(history.theme.border)};
      color-scheme: ${history.theme.mode};
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif;
      height: 100vh;
      overflow: hidden;
    }
    header {
      align-items: center;
      border-bottom: 1px solid var(--border);
      display: flex;
      gap: 12px;
      height: 58px;
      justify-content: center;
      padding: 0 22px;
      -webkit-app-region: drag;
    }
    header strong { font-size: 15px; }
    header span { color: var(--muted); font-size: 12px; }
    main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      height: calc(100vh - 58px);
      min-height: 0;
    }
    aside {
      background: color-mix(in srgb, var(--panel) 88%, var(--bg));
      border-right: 1px solid var(--border);
      overflow: auto;
      padding: 14px;
    }
    .entry {
      background: transparent;
      border: 1px solid transparent;
      border-radius: 9px;
      color: var(--text);
      display: grid;
      font: inherit;
      gap: 6px;
      margin-bottom: 8px;
      padding: 11px;
      text-align: left;
      width: 100%;
    }
    .entry.active {
      background: color-mix(in srgb, var(--accent) 18%, transparent);
      border-color: color-mix(in srgb, var(--accent) 44%, var(--border));
    }
    .entry-title { font-size: 13px; font-weight: 700; }
    .entry-meta { color: var(--muted); font-size: 12px; line-height: 1.35; }
    .entry-diff {
      display: flex;
      gap: 8px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
    }
    .entry-diff .add { color: #22c55e; }
    .entry-diff .remove { color: #ef4444; }
    .doc {
      overflow: auto;
      padding: 30px;
    }
    .paper {
      background: ${history.theme.mode === "dark" ? "#111827" : "#ffffff"};
      border: 1px solid var(--border);
      border-radius: 10px;
      box-shadow: 0 20px 55px rgba(0, 0, 0, 0.16);
      margin: 0 auto;
      max-width: 850px;
      min-height: calc(100vh - 130px);
      padding: 34px 42px;
    }
    .paper-title {
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      padding-bottom: 14px;
    }
    .paper-title h1 {
      font-size: 20px;
      line-height: 1.2;
      margin: 0;
    }
    .paper-title p {
      color: var(--muted);
      font-size: 12px;
      margin: 4px 0 0;
    }
    pre {
      color: var(--text);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 13px;
      line-height: 1.55;
      margin: 0;
      overflow: visible;
      white-space: pre-wrap;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <header>
    <strong>${escapeHtml(history.title)}</strong>
    <span>${escapeHtml(history.fileName)}</span>
  </header>
  <main>
    <aside>
      ${entries.map((entry, index) => `
        <button class="entry${index === 0 ? " active" : ""}" type="button" data-history-index="${index}">
          <div class="entry-title">${escapeHtml(entry.title)}</div>
          <div class="entry-meta">${escapeHtml(entry.time || "Current session")} · ${escapeHtml(entry.summary || "")}</div>
          <div class="entry-diff">
            <span class="add">+${Number(entry.added || 0)}</span>
            <span class="remove">-${Number(entry.removed || 0)}</span>
          </div>
        </button>
      `).join("")}
    </aside>
    <section class="doc">
      <article class="paper">
        <div class="paper-title">
          <div>
            <h1 id="revisionTitle">${escapeHtml(selected.title || "Current version")}</h1>
            <p id="revisionSummary">${escapeHtml(selected.summary || "")}</p>
          </div>
          <p id="revisionTime">${escapeHtml(selected.time || "")}</p>
        </div>
        <pre id="revisionText">${escapeHtml(selected.text || history.currentText || "")}</pre>
      </article>
    </section>
  </main>
  <script>
    const revisions = ${safeScriptJson(entries)};
    const title = document.getElementById("revisionTitle");
    const summary = document.getElementById("revisionSummary");
    const time = document.getElementById("revisionTime");
    const text = document.getElementById("revisionText");
    document.querySelectorAll(".entry").forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".entry").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        const revision = revisions[Number(button.dataset.historyIndex)] || revisions[0] || {};
        title.textContent = revision.title || "Revision";
        summary.textContent = revision.summary || "";
        time.textContent = revision.time || "";
        text.textContent = revision.text || "";
      });
    });
  </script>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeCss(value) {
  return String(value || "").replace(/[;{}<>]/g, "");
}

function safeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
}

async function readProjects() {
  const file = storePath();
  let projects = [];
  let hasStore = false;

  try {
    const raw = await fsp.readFile(file, "utf8");
    projects = JSON.parse(raw).projects || [];
    hasStore = true;
  } catch (error) {
    projects = [];
  }

  if (!hasStore && !projects.length && fs.existsSync(defaultTexPath)) {
    projects = [makeProject(defaultTexPath, "Synthetic cNF SASHIMI Manuscript")];
    await writeProjects(projects);
  }

  return dedupeProjects(projects);
}

async function writeProjects(projects) {
  await fsp.mkdir(path.dirname(storePath()), { recursive: true });
  await fsp.writeFile(storePath(), JSON.stringify({ projects }, null, 2), "utf8");
}

function dedupeProjects(projects) {
  const seen = new Set();
  return projects.filter((project) => {
    const key = path.resolve(project.texPath);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pdfPathFor(project) {
  const parsed = path.parse(project.texPath);
  return path.join(parsed.dir, `${parsed.name}.pdf`);
}

function safeCacheName(id) {
  return String(id || "preview").replace(/[^a-z0-9_-]+/gi, "-").slice(0, 96) || "preview";
}

function templatePreviewPngPath(templateId) {
  return path.join(templatePreviewRootPath(), `${safeCacheName(templateId)}.png`);
}

function projectPreviewPngPath(projectId) {
  return path.join(projectPreviewRootPath(), `${safeCacheName(projectId)}.png`);
}

function freshPreviewUrl(previewPath, sourcePath = "") {
  if (!fs.existsSync(previewPath)) return "";

  try {
    const previewStat = fs.statSync(previewPath);
    if (sourcePath && fs.existsSync(sourcePath)) {
      const sourceStat = fs.statSync(sourcePath);
      if (previewStat.mtimeMs + 1 < sourceStat.mtimeMs) return "";
    }
    return `${pathToFileURL(previewPath).href}?v=${Math.round(previewStat.mtimeMs)}`;
  } catch (error) {
    return "";
  }
}

function projectRootFor(project) {
  return path.dirname(project.texPath);
}

function agentsPathFor(project) {
  return path.join(projectRootFor(project), "AGENTS.md");
}

function decorateProject(project) {
  const texExists = fs.existsSync(project.texPath);
  const pdfPath = pdfPathFor(project);
  const rootPath = projectRootFor(project);
  const pdfExists = fs.existsSync(pdfPath);
  const previewImageUrl = pdfExists ? freshPreviewUrl(projectPreviewPngPath(project.id), pdfPath) : "";
  const detectedTitle = texExists ? detectTexTitle(project.texPath) : "";
  let modifiedAt = project.updatedAt;

  if (texExists) {
    try {
      modifiedAt = fs.statSync(project.texPath).mtime.toISOString();
    } catch (error) {
      modifiedAt = project.updatedAt;
    }
  }

  return {
    ...project,
    texName: path.basename(project.texPath),
    folderName: path.basename(rootPath),
    rootPath,
    rootUrl: `${pathToFileURL(rootPath).href}/`,
    displayName: detectedTitle || project.name,
    pdfPath,
    pdfName: path.basename(pdfPath),
    texExists,
    pdfExists,
    previewImageUrl,
    modifiedAt
  };
}

function detectTexTitle(texPath) {
  try {
    const tex = fs.readFileSync(texPath, "utf8").slice(0, 12000);
    const title = extractTexCommandBody(tex, "title");
    return cleanTexTitle(title);
  } catch (error) {
    return "";
  }
}

function extractTexCommandBody(tex, command) {
  const pattern = new RegExp(`\\\\${command}\\s*\\{`);
  const match = pattern.exec(tex);
  if (!match) return "";

  let depth = 1;
  let cursor = match.index + match[0].length;
  const start = cursor;
  while (cursor < tex.length) {
    const char = tex[cursor];
    const previous = tex[cursor - 1];
    if (char === "{" && previous !== "\\") depth += 1;
    if (char === "}" && previous !== "\\") depth -= 1;
    if (depth === 0) return tex.slice(start, cursor);
    cursor += 1;
  }

  return "";
}

function cleanTexTitle(value) {
  return String(value || "")
    .replace(/%.*$/gm, "")
    .replace(/\\[a-zA-Z]+\*?(?:\[[^\]]*\])?\{([^{}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+\*?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\\([#$%&_{}])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function listProjects() {
  const projects = await readProjects();
  return {
    projects: projects
      .map(decorateProject)
      .sort((a, b) => (
        Number(Boolean(b.favorite)) - Number(Boolean(a.favorite))
        || String(b.lastOpenedAt || "").localeCompare(String(a.lastOpenedAt || ""))
      ))
  };
}

async function addProject(_event, payload = {}) {
  const kind = String(payload.kind || "");

  if (kind === "blank") return createBlankProject();
  if (kind === "tex") return addTexProject();
  if (kind === "folder") return addFolderProject();
  if (kind === "archive") return addArchiveProject();

  const choice = await dialog.showMessageBox(mainWindow, {
    type: "question",
    title: "New Project",
    message: "How do you want to start?",
    buttons: ["Blank Project", "Existing .tex", "Folder", "Archive", "Cancel"],
    cancelId: 4,
    defaultId: 0
  });

  if (choice.response === 4) return { project: null, ...(await listProjects()) };
  if (choice.response === 0) return createBlankProject();
  if (choice.response === 1) return addTexProject();
  if (choice.response === 2) return addFolderProject();
  if (choice.response === 3) return addArchiveProject();
  return { project: null, ...(await listProjects()) };
}

async function addProjectFromPath(_event, payload = {}) {
  const paths = (payload.paths || []).map((filePath) => String(filePath || "")).filter(Boolean);
  const imported = [];

  for (const filePath of paths) {
    imported.push(await registerProjectFromPath(filePath));
  }

  return {
    project: imported[0] ? decorateProject(imported[0]) : null,
    ...(await listProjects())
  };
}

async function createBlankProject() {
  const projectName = "Untitled LaTeX Project";
  const destination = await uniqueDirectory(projectLibraryRoot(), projectName);
  const texPath = path.join(destination, "main.tex");

  await fsp.mkdir(destination, { recursive: true });
  await fsp.writeFile(texPath, blankProjectTemplate(projectName), "utf8");

  const project = await registerProjectRecord(texPath, projectName);
  await compileProjectIfPossible(project.id);

  return {
    project: decorateProject(project),
    ...(await listProjects())
  };
}

async function addTexProject() {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Open LaTeX Project",
    buttonLabel: "Add Project",
    properties: ["openFile"],
    filters: [
      { name: "LaTeX files", extensions: ["tex"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || !result.filePaths.length) {
    return { project: null, ...(await listProjects()) };
  }

  return registerProject(result.filePaths[0]);
}

async function addFolderProject() {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Open LaTeX Project Folder",
    buttonLabel: "Open Folder",
    properties: ["openDirectory"]
  });

  if (result.canceled || !result.filePaths.length) {
    return { project: null, ...(await listProjects()) };
  }

  const entryPath = await findProjectEntryFile(result.filePaths[0]);
  if (!entryPath) throw new Error("No .tex or .txt file found in that folder.");
  return registerProject(entryPath);
}

async function addArchiveProject() {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Import LaTeX Archive",
    buttonLabel: "Import Archive",
    properties: ["openFile"],
    filters: [
      { name: "Archives", extensions: ["zip", "tar", "gz", "tgz"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || !result.filePaths.length) {
    return { project: null, ...(await listProjects()) };
  }

  const archivePath = path.resolve(result.filePaths[0]);
  const texPath = await importArchiveToProject(archivePath);
  return registerProject(texPath);
}

async function registerProjectFromPath(filePath) {
  const resolvedPath = path.resolve(filePath);
  const stat = await fsp.stat(resolvedPath);

  if (stat.isDirectory()) {
    const entryPath = await findProjectEntryFile(resolvedPath);
    if (!entryPath) throw new Error("No .tex or .txt file found in that folder.");
    return registerProjectRecord(entryPath);
  }

  if ([".tex", ".txt"].includes(path.extname(resolvedPath).toLowerCase())) {
    return registerProjectRecord(resolvedPath);
  }

  if (isArchivePath(resolvedPath)) {
    const texPath = await importArchiveToProject(resolvedPath);
    return registerProjectRecord(texPath);
  }

  throw new Error(`Unsupported project import: ${path.basename(resolvedPath)}`);
}

async function importArchiveToProject(archivePath) {
  const destination = await uniqueDirectory(projectLibraryRoot(), archiveBaseName(archivePath) || "Imported Project");
  await fsp.mkdir(destination, { recursive: true });
  await extractArchive(archivePath, destination);

  const entryPath = await findProjectEntryFile(destination);
  if (!entryPath) throw new Error("Imported archive did not contain a .tex or .txt file.");
  return entryPath;
}

async function registerProject(texPath, name) {
  const project = await registerProjectRecord(texPath, name);
  return {
    project: decorateProject(project),
    ...(await listProjects())
  };
}

async function registerProjectRecord(texPath, name) {
  const resolvedTexPath = path.resolve(texPath);
  const projects = await readProjects();
  let project = projects.find((item) => path.resolve(item.texPath) === resolvedTexPath);

  if (!project) {
    project = makeProject(resolvedTexPath, name);
    projects.unshift(project);
  }

  project.lastOpenedAt = new Date().toISOString();
  project.updatedAt = project.lastOpenedAt;
  await writeProjects(projects);

  return project;
}

function blankProjectTemplate(name) {
  const title = titleCase(String(name || "Untitled").replace(/[-_]+/g, " "));
  return [
    "\\documentclass{article}",
    "\\usepackage[margin=1in]{geometry}",
    "",
    `\\title{${title}}`,
    "\\author{}",
    "\\date{\\today}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\section{Introduction}",
    "Start writing here.",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function homeworkTemplate() {
  return [
    "\\documentclass[11pt]{article}",
    "\\usepackage[margin=1in]{geometry}",
    "\\usepackage{amsmath,amssymb}",
    "\\usepackage{enumitem}",
    "",
    "\\title{Homework Assignment}",
    "\\author{Your Name}",
    "\\date{\\today}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\section*{Problem 1}",
    "\\begin{enumerate}[label=(\\alph*)]",
    "  \\item Write your solution here.",
    "  \\item Add another part here.",
    "\\end{enumerate}",
    "",
    "\\section*{Problem 2}",
    "Show your work clearly.",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function cs170HomeworkTemplate() {
  return [
    "\\documentclass[11pt]{article}",
    "\\usepackage{amsmath,textcomp,amssymb,geometry,graphicx,enumerate}",
    "\\usepackage{algorithm}",
    "\\usepackage[noend]{algpseudocode}",
    "\\usepackage{hyperref}",
    "\\hypersetup{colorlinks=true, linkcolor=blue, filecolor=magenta, urlcolor=blue}",
    "",
    "\\def\\Name{Your Name}",
    "\\def\\SID{Your SID}",
    "\\def\\Login{cs170-xx}",
    "\\def\\Homework{N}",
    "\\def\\Session{Spring 2026}",
    "",
    "\\title{CS 170 -- \\Session{} -- Homework \\Homework}",
    "\\author{\\Name, SID \\SID, \\texttt{\\Login}}",
    "\\markboth{CS 170 -- \\Session{} Homework \\Homework{} \\Name}{CS 170 -- \\Session{} Homework \\Homework{} \\Name, \\texttt{\\Login}}",
    "\\pagestyle{myheadings}",
    "\\date{}",
    "",
    "\\newenvironment{qparts}{\\begin{enumerate}[{(}a{)}]}{\\end{enumerate}}",
    "\\newenvironment{answer}{\\par\\noindent\\textbf{Answer.}}{\\medskip}",
    "\\newenvironment{proofbox}{\\par\\noindent\\textbf{Proof.}}{\\hfill$\\square$\\medskip}",
    "\\textheight=9in",
    "\\textwidth=6.5in",
    "\\topmargin=-0.75in",
    "\\oddsidemargin=0.25in",
    "\\evensidemargin=0.25in",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\noindent\\textbf{Collaborators:} None",
    "",
    "\\section*{1. Study Group}",
    "\\begin{answer}",
    "List study group members here, or write none.",
    "\\end{answer}",
    "",
    "\\section*{2. First Question}",
    "\\begin{qparts}",
    "  \\item Your answer to part (a).",
    "  \\item Your answer to part (b).",
    "\\end{qparts}",
    "",
    "\\newpage",
    "\\section*{3. Algorithm Question}",
    "\\noindent\\textbf{Main idea}\\\\",
    "Explain the key insight in a few sentences.",
    "",
    "\\noindent\\textbf{Pseudocode}\\\\",
    "\\begin{algorithmic}[0]",
    "  \\Procedure{AlgorithmName}{input $x$}",
    "    \\State Initialize the data structure.",
    "    \\For{each item in $x$}",
    "      \\State Update the answer.",
    "    \\EndFor",
    "    \\State \\Return answer",
    "  \\EndProcedure",
    "\\end{algorithmic}",
    "",
    "\\noindent\\textbf{Proof of correctness}\\\\",
    "\\begin{proofbox}",
    "Prove why the algorithm returns the correct answer.",
    "\\end{proofbox}",
    "",
    "\\noindent\\textbf{Running time analysis}\\\\",
    "State the running time and justify it.",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function labReportTemplate() {
  return [
    "\\documentclass[11pt]{article}",
    "\\usepackage[margin=1in]{geometry}",
    "\\usepackage{booktabs}",
    "\\usepackage{graphicx}",
    "\\usepackage{siunitx}",
    "",
    "\\title{Lab Report}",
    "\\author{Your Name}",
    "\\date{\\today}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\section{Objective}",
    "State the goal of the experiment.",
    "",
    "\\section{Methods}",
    "Describe the setup, measurements, and assumptions.",
    "",
    "\\section{Results}",
    "\\begin{table}[h]",
    "  \\centering",
    "  \\begin{tabular}{lll}",
    "    \\toprule",
    "    Trial & Measurement & Notes \\\\",
    "    \\midrule",
    "    1 & -- & -- \\\\",
    "    \\bottomrule",
    "  \\end{tabular}",
    "  \\caption{Summary of measurements.}",
    "\\end{table}",
    "",
    "\\section{Discussion}",
    "Interpret the results and sources of error.",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function articleTemplate() {
  return [
    "\\documentclass[11pt]{article}",
    "\\usepackage[margin=1in]{geometry}",
    "\\usepackage{graphicx}",
    "\\usepackage{booktabs}",
    "\\usepackage{hyperref}",
    "",
    "\\title{Research Article Title}",
    "\\author{Author Name}",
    "\\date{}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\begin{abstract}",
    "Summarize the contribution, method, and findings.",
    "\\end{abstract}",
    "",
    "\\section{Introduction}",
    "Motivate the problem and cite related work~\\cite{example}.",
    "",
    "\\section{Methods}",
    "Describe the approach.",
    "",
    "\\section{Results}",
    "Present the evidence.",
    "",
    "\\section{Conclusion}",
    "State the takeaway and next steps.",
    "",
    "\\bibliographystyle{plain}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

function ieeeTemplate() {
  return [
    "\\documentclass[conference]{IEEEtran}",
    "\\usepackage{cite}",
    "\\usepackage{amsmath,amssymb}",
    "\\usepackage{graphicx}",
    "",
    "\\title{Conference Paper Title}",
    "\\author{\\IEEEauthorblockN{Author Name}\\\\",
    "\\IEEEauthorblockA{Department\\\\University\\\\email@example.com}}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\begin{abstract}",
    "Write a concise abstract.",
    "\\end{abstract}",
    "",
    "\\begin{IEEEkeywords}",
    "LaTeX, paper, template",
    "\\end{IEEEkeywords}",
    "",
    "\\section{Introduction}",
    "Introduce the problem.",
    "",
    "\\section{Method}",
    "Describe the method.",
    "",
    "\\section{Results}",
    "Summarize results.",
    "",
    "\\bibliographystyle{IEEEtran}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

function acmTemplate() {
  return [
    "\\documentclass[sigconf]{acmart}",
    "\\title{ACM Paper Title}",
    "\\author{Author Name}",
    "\\affiliation{%",
    "  \\institution{Institution}",
    "  \\city{City}",
    "  \\country{Country}",
    "}",
    "\\email{email@example.com}",
    "",
    "\\begin{document}",
    "\\begin{abstract}",
    "Write the abstract here.",
    "\\end{abstract}",
    "",
    "\\maketitle",
    "",
    "\\section{Introduction}",
    "Introduce the work.",
    "",
    "\\section{System}",
    "Describe the system or method.",
    "",
    "\\section{Evaluation}",
    "Describe evaluation.",
    "",
    "\\bibliographystyle{ACM-Reference-Format}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

function lncsTemplate() {
  return [
    "\\documentclass[runningheads]{llncs}",
    "\\usepackage{graphicx}",
    "",
    "\\title{LNCS Paper Title}",
    "\\author{Author Name}",
    "\\institute{Institution\\\\\\email{email@example.com}}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\begin{abstract}",
    "Write the abstract here.",
    "\\keywords{LaTeX \\and Template \\and Paper}",
    "\\end{abstract}",
    "",
    "\\section{Introduction}",
    "Introduce the work.",
    "",
    "\\section{Method}",
    "Describe the method.",
    "",
    "\\section{Results}",
    "Summarize results.",
    "",
    "\\bibliographystyle{splncs04}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

function beamerTemplate() {
  return [
    "\\documentclass{beamer}",
    "\\usetheme{Madrid}",
    "",
    "\\title{Presentation Title}",
    "\\author{Your Name}",
    "\\date{\\today}",
    "",
    "\\begin{document}",
    "",
    "\\begin{frame}",
    "  \\titlepage",
    "\\end{frame}",
    "",
    "\\begin{frame}{Overview}",
    "  \\begin{itemize}",
    "    \\item Motivation",
    "    \\item Method",
    "    \\item Results",
    "  \\end{itemize}",
    "\\end{frame}",
    "",
    "\\begin{frame}{Key Result}",
    "  Add the main figure or claim here.",
    "\\end{frame}",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function cvTemplate() {
  return [
    "\\documentclass[11pt]{article}",
    "\\usepackage[margin=0.75in]{geometry}",
    "\\usepackage{enumitem}",
    "\\usepackage[hidelinks]{hyperref}",
    "\\setlength{\\parindent}{0pt}",
    "",
    "\\begin{document}",
    "",
    "{\\LARGE Your Name}\\\\",
    "\\href{mailto:email@example.com}{email@example.com} \\quad City, State \\quad \\href{https://example.com}{website}",
    "",
    "\\section*{Education}",
    "\\textbf{University Name} \\hfill Expected 2027\\\\",
    "Degree, Major",
    "",
    "\\section*{Experience}",
    "\\textbf{Role, Organization} \\hfill Dates",
    "\\begin{itemize}[leftmargin=*]",
    "  \\item Describe impact with specific outcomes.",
    "\\end{itemize}",
    "",
    "\\section*{Projects}",
    "\\textbf{Project Name}: One-line description.",
    "",
    "\\section*{Skills}",
    "Languages, tools, methods",
    "",
    "\\end{document}",
    ""
  ].join("\n");
}

function thesisTemplate() {
  return [
    "\\documentclass[12pt]{report}",
    "\\usepackage[margin=1in]{geometry}",
    "\\usepackage{graphicx}",
    "\\usepackage{hyperref}",
    "",
    "\\title{Thesis Title}",
    "\\author{Your Name}",
    "\\date{\\today}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "\\tableofcontents",
    "",
    "\\chapter{Introduction}",
    "Introduce the research question.",
    "",
    "\\chapter{Background}",
    "Review related work.",
    "",
    "\\chapter{Methods}",
    "Describe the method.",
    "",
    "\\chapter{Results}",
    "Present findings.",
    "",
    "\\chapter{Conclusion}",
    "Summarize contributions.",
    "",
    "\\bibliographystyle{plain}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

function posterTemplate() {
  return [
    "\\documentclass[final]{beamer}",
    "\\usepackage[size=a0,scale=1.15]{beamerposter}",
    "\\usetheme{default}",
    "",
    "\\title{Poster Title}",
    "\\author{Your Name}",
    "\\institute{Institution}",
    "",
    "\\begin{document}",
    "\\begin{frame}[t]",
    "\\begin{columns}[t]",
    "  \\begin{column}{0.48\\linewidth}",
    "    \\begin{block}{Motivation}",
    "      State the problem and why it matters.",
    "    \\end{block}",
    "    \\begin{block}{Method}",
    "      Describe the approach.",
    "    \\end{block}",
    "  \\end{column}",
    "  \\begin{column}{0.48\\linewidth}",
    "    \\begin{block}{Results}",
    "      Add figures and key findings.",
    "    \\end{block}",
    "    \\begin{block}{Conclusion}",
    "      Summarize the contribution.",
    "    \\end{block}",
    "  \\end{column}",
    "\\end{columns}",
    "\\end{frame}",
    "\\end{document}",
    ""
  ].join("\n");
}

function neuripsTemplate() {
  return [
    "\\documentclass{article}",
    "\\usepackage[preprint]{neurips_2026}",
    "\\usepackage[utf8]{inputenc}",
    "\\usepackage[T1]{fontenc}",
    "\\usepackage{hyperref}",
    "\\usepackage{url}",
    "\\usepackage{booktabs}",
    "\\usepackage{amsfonts}",
    "\\usepackage{nicefrac}",
    "\\usepackage{microtype}",
    "\\usepackage{xcolor}",
    "\\usepackage{graphicx}",
    "",
    "\\title{NeurIPS Paper Title}",
    "",
    "\\author{%",
    "  First Author\\\\",
    "  Department\\\\",
    "  Institution\\\\",
    "  \\texttt{email@example.com}",
    "}",
    "",
    "\\begin{document}",
    "\\maketitle",
    "",
    "\\begin{abstract}",
    "Summarize the contribution, method, and core results.",
    "\\end{abstract}",
    "",
    "\\section{Introduction}",
    "Motivate the problem and state the main contributions.",
    "",
    "\\section{Method}",
    "Describe the model, algorithm, or experimental setup.",
    "",
    "\\section{Experiments}",
    "Report datasets, baselines, metrics, and ablations.",
    "",
    "\\section{Conclusion}",
    "Summarize limitations and future work.",
    "",
    "\\bibliographystyle{plain}",
    "\\bibliography{references}",
    "\\end{document}",
    ""
  ].join("\n");
}

const BUILT_IN_TEMPLATES = [
  {
    id: "berkeley-cs170-homework",
    name: "Berkeley CS 170 Homework",
    description: "Problem-set starter for CS 170-style algorithms homework.",
    sourceName: "CS 170 course template",
    sourceUrl: "https://www.overleaf.com/latex/templates/cs170-homework-template/rrhswrgkrfnd",
    entry: "main.tex",
    files: {
      "main.tex": cs170HomeworkTemplate()
    }
  },
  {
    id: "homework-assignment",
    name: "Homework Assignment",
    description: "A clean problem-set format for weekly class work.",
    sourceName: "Overleaf homework templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/homework",
    entry: "main.tex",
    files: {
      "main.tex": homeworkTemplate()
    }
  },
  {
    id: "lab-report",
    name: "Lab Report",
    description: "Sections for objective, methods, results, and discussion.",
    sourceName: "Overleaf report templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/report",
    entry: "main.tex",
    files: {
      "main.tex": labReportTemplate()
    }
  },
  {
    id: "research-article",
    name: "Research Article",
    description: "General manuscript starter with bibliography wiring.",
    sourceName: "Overleaf academic journal templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/academic-journal",
    entry: "main.tex",
    files: {
      "main.tex": articleTemplate(),
      "references.bib": "@article{example,\n  title={Example Reference},\n  author={Author, A.},\n  journal={Journal Name},\n  year={2026}\n}\n"
    }
  },
  {
    id: "neurips-paper",
    name: "NeurIPS Paper",
    description: "NeurIPS-style manuscript starter with abstract, method, and experiments sections.",
    sourceName: "NeurIPS style files",
    sourceUrl: "https://neurips.cc/Conferences/2026/PaperInformation/StyleFiles",
    entry: "main.tex",
    files: {
      "main.tex": neuripsTemplate(),
      "neurips_2026.sty": [
        "\\NeedsTeXFormat{LaTeX2e}",
        "\\ProvidesPackage{neurips_2026}[2026/01/01 Openleaf NeurIPS-style starter]",
        "\\RequirePackage[margin=1in]{geometry}",
        "\\RequirePackage{times}",
        "\\RequirePackage{natbib}",
        "\\setlength{\\parindent}{0pt}",
        "\\setlength{\\parskip}{6pt}",
        ""
      ].join("\n"),
      "references.bib": "@article{example,\n  title={Example Reference},\n  author={Author, A.},\n  journal={Journal Name},\n  year={2026}\n}\n"
    }
  },
  {
    id: "ieee-conference",
    name: "IEEE Conference Paper",
    description: "IEEEtran conference starter with keywords and references.",
    sourceName: "IEEE templates",
    sourceUrl: "https://www.ieee.org/conferences/publishing/templates.html",
    entry: "main.tex",
    files: {
      "main.tex": ieeeTemplate(),
      "references.bib": "@article{example,\n  title={Example Reference},\n  author={Author, A.},\n  journal={Journal Name},\n  year={2026}\n}\n"
    }
  },
  {
    id: "acm-paper",
    name: "ACM Paper",
    description: "ACM acmart starter for conference papers.",
    sourceName: "ACM proceedings template",
    sourceUrl: "https://www.acm.org/publications/proceedings-template",
    entry: "main.tex",
    files: {
      "main.tex": acmTemplate(),
      "references.bib": "@article{example,\n  title={Example Reference},\n  author={Author, A.},\n  journal={Journal Name},\n  year={2026}\n}\n"
    }
  },
  {
    id: "springer-lncs",
    name: "Springer LNCS",
    description: "LNCS-style paper starter for conference proceedings.",
    sourceName: "Springer LNCS guidelines",
    sourceUrl: "https://www.springer.com/gp/computer-science/lncs/conference-proceedings-guidelines",
    entry: "main.tex",
    files: {
      "main.tex": lncsTemplate(),
      "references.bib": "@article{example,\n  title={Example Reference},\n  author={Author, A.},\n  journal={Journal Name},\n  year={2026}\n}\n"
    }
  },
  {
    id: "beamer-presentation",
    name: "Beamer Presentation",
    description: "Slide deck starter with title, overview, and result frames.",
    sourceName: "Overleaf presentation templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/presentation",
    entry: "main.tex",
    files: {
      "main.tex": beamerTemplate()
    }
  },
  {
    id: "cv-resume",
    name: "CV / Resume",
    description: "Compact academic resume skeleton.",
    sourceName: "Overleaf CV templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/cv",
    entry: "main.tex",
    files: {
      "main.tex": cvTemplate()
    }
  },
  {
    id: "thesis-report",
    name: "Thesis / Long Report",
    description: "Chaptered report starter with table of contents.",
    sourceName: "Overleaf thesis templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/thesis",
    entry: "main.tex",
    files: {
      "main.tex": thesisTemplate(),
      "references.bib": ""
    }
  },
  {
    id: "research-poster",
    name: "Research Poster",
    description: "Beamer poster layout for conference posters.",
    sourceName: "Overleaf poster templates",
    sourceUrl: "https://www.overleaf.com/latex/templates/tagged/poster",
    entry: "main.tex",
    files: {
      "main.tex": posterTemplate()
    }
  }
];

function publicBuiltInTemplate(template) {
  const entry = template.entry || "main.tex";
  return {
    id: template.id,
    name: template.name,
    description: template.description,
    sourceName: template.sourceName,
    sourceUrl: template.sourceUrl,
    kind: "online",
    entry,
    previewImageUrl: freshPreviewUrl(templatePreviewPngPath(template.id)),
    previewText: String((template.files && template.files[entry]) || Object.values(template.files || {})[0] || "").slice(0, 12000),
    fileCount: Object.keys(template.files || {}).length
  };
}

async function readCustomTemplates() {
  try {
    const raw = await fsp.readFile(templateStorePath(), "utf8");
    return (JSON.parse(raw).templates || []).filter((template) => template && template.id && template.rootPath);
  } catch (error) {
    return [];
  }
}

async function writeCustomTemplates(templates) {
  await fsp.mkdir(path.dirname(templateStorePath()), { recursive: true });
  await fsp.writeFile(templateStorePath(), JSON.stringify({ templates }, null, 2), "utf8");
}

function decorateCustomTemplate(template) {
  let previewText = "";
  if (template.texPath && fs.existsSync(template.texPath)) {
    try {
      previewText = fs.readFileSync(template.texPath, "utf8").slice(0, 12000);
    } catch (error) {
      previewText = "";
    }
  }

  return {
    id: template.id,
    name: template.name,
    description: template.description || "Saved local LaTeX template.",
    sourceName: template.sourceName || "Custom template",
    sourceUrl: "",
    kind: "custom",
    texName: template.texPath ? path.basename(template.texPath) : "main.tex",
    previewImageUrl: freshPreviewUrl(templatePreviewPngPath(template.id), template.texPath),
    previewText,
    rootPath: template.rootPath,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt
  };
}

async function listTemplates() {
  const custom = await readCustomTemplates();
  return {
    builtIn: BUILT_IN_TEMPLATES.map(publicBuiltInTemplate),
    custom: custom.map(decorateCustomTemplate)
  };
}

async function importTemplate() {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Add LaTeX Template",
    buttonLabel: "Add Template",
    properties: ["openFile", "openDirectory"],
    filters: [
      { name: "LaTeX templates", extensions: ["tex", "zip", "tar", "gz", "tgz"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || !result.filePaths.length) {
    return listTemplates();
  }

  const sourcePath = path.resolve(result.filePaths[0]);
  const stat = await fsp.stat(sourcePath);
  const id = crypto.randomUUID();
  const destination = path.join(templateRootPath(), id);
  await fsp.mkdir(destination, { recursive: true });

  if (stat.isDirectory()) {
    await copyTemplateDirectory(sourcePath, destination);
  } else if (path.extname(sourcePath).toLowerCase() === ".tex") {
    await fsp.copyFile(sourcePath, path.join(destination, path.basename(sourcePath)));
  } else if (isArchivePath(sourcePath)) {
    await extractArchive(sourcePath, destination);
  } else {
    throw new Error(`Unsupported template import: ${path.basename(sourcePath)}`);
  }

  const entryPath = await findProjectEntryFile(destination);
  if (!entryPath) {
    await fsp.rm(destination, { recursive: true, force: true });
    throw new Error("Template does not contain a .tex or .txt file.");
  }

  const now = new Date().toISOString();
  const templateName = stat.isDirectory()
    ? path.basename(sourcePath)
    : (isArchivePath(sourcePath) ? archiveBaseName(sourcePath) : path.basename(sourcePath, path.extname(sourcePath)));
  const name = titleCase(templateName.replace(/[-_]+/g, " "));
  const templates = await readCustomTemplates();
  templates.unshift({
    id,
    name,
    description: "Saved local LaTeX template.",
    rootPath: destination,
    texPath: entryPath,
    createdAt: now,
    updatedAt: now
  });
  await writeCustomTemplates(templates);
  return listTemplates();
}

async function removeTemplate(_event, templateId) {
  const templates = await readCustomTemplates();
  const template = templates.find((item) => item.id === templateId);
  const nextTemplates = templates.filter((item) => item.id !== templateId);
  await writeCustomTemplates(nextTemplates);

  if (template && template.rootPath) {
    const root = path.resolve(templateRootPath());
    const templatePath = path.resolve(template.rootPath);
    if (templatePath.startsWith(`${root}${path.sep}`)) {
      await fsp.rm(templatePath, { recursive: true, force: true });
    }
  }

  return listTemplates();
}

async function createProjectFromTemplate(_event, templateId) {
  const id = String(templateId || "");
  const builtIn = BUILT_IN_TEMPLATES.find((template) => template.id === id);
  if (builtIn) {
    const destination = await uniqueDirectory(projectLibraryRoot(), builtIn.name);
    await writeTemplateFiles(destination, builtIn.files);
    const result = await registerProject(path.join(destination, builtIn.entry || "main.tex"), builtIn.name);
    await compileProjectIfPossible(result.project && result.project.id);
    return {
      ...result,
      ...(await listProjects())
    };
  }

  const templates = await readCustomTemplates();
  const template = templates.find((item) => item.id === id);
  if (!template) throw new Error("Template not found.");

  const destination = await uniqueDirectory(projectLibraryRoot(), template.name || "Template Project");
  await copyTemplateDirectory(template.rootPath, destination);

  let entryPath = "";
  if (template.texPath) {
    const relativeEntry = path.relative(path.resolve(template.rootPath), path.resolve(template.texPath));
    if (relativeEntry && !relativeEntry.startsWith("..") && !path.isAbsolute(relativeEntry)) {
      const candidate = path.join(destination, relativeEntry);
      if (fs.existsSync(candidate)) entryPath = candidate;
    }
  }
  if (!entryPath) entryPath = await findProjectEntryFile(destination);
  if (!entryPath) throw new Error("Template copy did not contain a .tex or .txt file.");

  const result = await registerProject(entryPath, template.name);
  await compileProjectIfPossible(result.project && result.project.id);
  return {
    ...result,
    ...(await listProjects())
  };
}

async function templatePreviewPdf(_event, templateId) {
  const id = String(templateId || "");
  const builtIn = BUILT_IN_TEMPLATES.find((template) => template.id === id);
  const previewRoot = templatePreviewRootPath();
  await fsp.mkdir(previewRoot, { recursive: true });

  let workDir = "";
  let entryPath = "";
  if (builtIn) {
    workDir = path.join(previewRoot, builtIn.id);
    await fsp.rm(workDir, { recursive: true, force: true });
    await writeTemplateFiles(workDir, builtIn.files);
    entryPath = path.join(workDir, builtIn.entry || "main.tex");
  } else {
    const templates = await readCustomTemplates();
    const template = templates.find((item) => item.id === id);
    if (!template) throw new Error("Template not found.");
    workDir = path.join(previewRoot, template.id);
    await fsp.rm(workDir, { recursive: true, force: true });
    await copyTemplateDirectory(template.rootPath, workDir);
    entryPath = await findProjectEntryFile(workDir);
  }

  if (!entryPath || path.extname(entryPath).toLowerCase() !== ".tex") {
    throw new Error("Template preview requires a .tex entry file.");
  }

  const project = makeProject(entryPath, builtIn ? builtIn.name : "Template Preview");
  await runTectonic(project);
  const pdfPath = pdfPathFor(project);
  const pdf = await fsp.readFile(pdfPath);
  return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
}

function pngBufferFromDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:image\/png;base64,([a-z0-9+/=]+)$/i);
  if (!match) throw new Error("Preview cache requires a PNG data URL.");
  return Buffer.from(match[1], "base64");
}

async function cacheTemplatePreview(_event, payload = {}) {
  const templateId = String(payload.templateId || "");
  if (!templateId) throw new Error("Template preview cache is missing a template id.");

  const previewPath = templatePreviewPngPath(templateId);
  await fsp.mkdir(path.dirname(previewPath), { recursive: true });
  await fsp.writeFile(previewPath, pngBufferFromDataUrl(payload.dataUrl));
  return { previewImageUrl: freshPreviewUrl(previewPath) };
}

async function cacheProjectPreview(_event, payload = {}) {
  const project = await getProject(payload.projectId);
  const pdfPath = pdfPathFor(project);
  if (!fs.existsSync(pdfPath)) throw new Error("Project has no PDF to cache.");

  const previewPath = projectPreviewPngPath(project.id);
  await fsp.mkdir(path.dirname(previewPath), { recursive: true });
  await fsp.writeFile(previewPath, pngBufferFromDataUrl(payload.dataUrl));
  return { previewImageUrl: freshPreviewUrl(previewPath, pdfPath) };
}

async function compileProjectIfPossible(projectId) {
  if (!projectId) return { ok: false, output: "" };

  try {
    const project = await getProject(projectId);
    const output = await runTectonic(project);
    const entryPath = await compileEntryPath(project);
    return { ok: fs.existsSync(pdfPathFor({ ...project, texPath: entryPath })), output };
  } catch (error) {
    return { ok: false, output: formatMainError(error) };
  }
}

async function writeTemplateFiles(destination, files) {
  await fsp.mkdir(destination, { recursive: true });
  for (const [relativePath, content] of Object.entries(files || {})) {
    const filePath = path.resolve(destination, relativePath);
    if (filePath !== destination && !filePath.startsWith(`${path.resolve(destination)}${path.sep}`)) {
      throw new Error("Template file path escapes destination.");
    }
    await fsp.mkdir(path.dirname(filePath), { recursive: true });
    await fsp.writeFile(filePath, content, "utf8");
  }
}

async function copyTemplateDirectory(sourceDir, destination) {
  const skipNames = new Set([".git", "node_modules", "__pycache__"]);
  await fsp.cp(sourceDir, destination, {
    recursive: true,
    filter: (source) => {
      const name = path.basename(source);
      if (name === ".DS_Store") return false;
      return !skipNames.has(name);
    }
  });
}

async function findProjectTexEntry(rootDir) {
  return findProjectEntryFile(rootDir);
}

async function findProjectEntryFile(rootDir) {
  const candidates = [];

  async function visit(dir, depth = 0) {
    if (depth > 6) return;
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith(".") || ["node_modules", "__pycache__", ".git"].includes(entry.name)) continue;
      const itemPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await visit(itemPath, depth + 1);
      } else if (entry.isFile()) {
        const lowerName = entry.name.toLowerCase();
        if (lowerName.endsWith(".tex") || lowerName.endsWith(".txt")) candidates.push(itemPath);
      }
    }
  }

  await visit(path.resolve(rootDir));
  candidates.sort((a, b) => {
    const rank = (filePath) => {
      const name = path.basename(filePath).toLowerCase();
      if (name === "main.tex") return 0;
      if (name.endsWith(".tex")) return 1;
      if (name.endsWith(".txt")) return 2;
      return 3;
    };
    const rankDiff = rank(a) - rank(b);
    if (rankDiff) return rankDiff;
    return a.length - b.length || a.localeCompare(b);
  });
  return candidates[0] || "";
}

async function uniqueDirectory(parentDir, folderName) {
  await fsp.mkdir(parentDir, { recursive: true });
  const safeName = String(folderName || "Imported Project").replace(/[/:\\]/g, "-").trim() || "Imported Project";
  let candidate = path.join(parentDir, safeName);
  let suffix = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(parentDir, `${safeName}-${suffix}`);
    suffix += 1;
  }
  return candidate;
}

function archiveBaseName(archivePath) {
  return path.basename(archivePath)
    .replace(/\.tar\.gz$/i, "")
    .replace(/\.tgz$/i, "")
    .replace(/\.tar$/i, "")
    .replace(/\.zip$/i, "");
}

function isArchivePath(filePath) {
  const lower = filePath.toLowerCase();
  return lower.endsWith(".zip") || lower.endsWith(".tar") || lower.endsWith(".tar.gz") || lower.endsWith(".tgz");
}

function extractArchive(archivePath, destination) {
  const lower = archivePath.toLowerCase();
  if (lower.endsWith(".tar.gz") || lower.endsWith(".tgz")) {
    return execFileAsync("tar", ["-xzf", archivePath, "-C", destination]);
  }
  if (lower.endsWith(".tar")) {
    return execFileAsync("tar", ["-xf", archivePath, "-C", destination]);
  }
  return execFileAsync("ditto", ["-x", "-k", archivePath, destination])
    .catch(() => execFileAsync("unzip", ["-q", archivePath, "-d", destination]));
}

function execFileAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || error.message));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function execFileWithInput(command, args, input = "", options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env,
      stdio: ["pipe", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      if (stdout.length > (options.maxBuffer || 1024 * 1024 * 16)) child.kill("SIGTERM");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code) {
        reject(new Error(stderr || stdout || `${command} exited with code ${code}`));
        return;
      }
      resolve({ stdout, stderr });
    });
    child.stdin.end(input);
  });
}

function remoteTextExtensions() {
  return JSON.stringify([
    ".tex", ".ltx", ".bib", ".bst", ".cls", ".sty", ".txt", ".md", ".markdown", ".log",
    ".csv", ".tsv", ".json", ".jsonl", ".yaml", ".yml", ".toml", ".ini", ".cfg",
    ".py", ".r", ".jl", ".m", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html",
    ".htm", ".xml", ".sql", ".sh", ".bash", ".zsh", ".fish", ".c", ".cc", ".cpp",
    ".h", ".hpp", ".java", ".go", ".rs", ".swift", ".kt", ".kts", ".rb", ".php",
    ".pl", ".lua", ".rst"
  ]);
}

function remoteImageExtensions() {
  return JSON.stringify([".png", ".jpg", ".jpeg", ".gif", ".webp", ".tif", ".tiff", ".bmp", ".svg"]);
}

async function removeProject(_event, projectId) {
  const projects = await readProjects();
  const nextProjects = projects.filter((project) => project.id !== projectId);
  await writeProjects(nextProjects);
  return listProjects();
}

async function renameProject(_event, payload = {}) {
  const name = String(payload.name || "").trim();
  if (!name) throw new Error("Project name cannot be empty.");

  const projects = await readProjects();
  const project = projects.find((item) => item.id === payload.projectId);
  if (!project) throw new Error("Project not found.");

  project.name = name;
  project.updatedAt = new Date().toISOString();
  await writeProjects(projects);
  return listProjects();
}

async function saveProjectSettings(_event, payload = {}) {
  const projects = await readProjects();
  const project = projects.find((item) => item.id === payload.projectId);
  if (!project) throw new Error("Project not found.");

  const settings = payload.settings || {};
  project.githubRemote = normalizeGithubRemote(settings.githubRemote);
  project.updatedAt = new Date().toISOString();
  await writeProjects(projects);
  return { project: decorateProject(project), ...(await listProjects()) };
}

async function toggleProjectFavorite(_event, projectId) {
  const projects = await readProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) throw new Error("Project not found.");
  project.favorite = !project.favorite;
  project.updatedAt = new Date().toISOString();
  await writeProjects(projects);
  return listProjects();
}

async function getProject(projectId) {
  const projects = await readProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) throw new Error("Project not found. Return to Projects and reopen it.");
  if (!fs.existsSync(project.texPath)) throw new Error(`LaTeX file not found: ${project.texPath}`);
  return project;
}

function safeProjectPath(project, relativePath = "") {
  const root = projectRootFor(project);
  const resolved = path.resolve(root, relativePath || ".");
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error("File path escapes the project folder.");
  }
  return resolved;
}

function relativeProjectPath(project, absolutePath) {
  return path.relative(projectRootFor(project), absolutePath).split(path.sep).join("/");
}

function isTextFile(filePath) {
  const name = path.basename(filePath).toLowerCase();
  const extension = path.extname(filePath).toLowerCase();
  if (["dockerfile", "makefile", "rakefile", "gemfile", "requirements.txt"].includes(name)) return true;
  return [
    ".tex", ".ltx", ".bib", ".bst", ".cls", ".sty", ".txt", ".md", ".markdown", ".log",
    ".csv", ".tsv", ".json", ".jsonl", ".yaml", ".yml", ".toml", ".ini", ".cfg",
    ".py", ".r", ".jl", ".m", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".html",
    ".htm", ".xml", ".sql", ".sh", ".bash", ".zsh", ".fish", ".c", ".cc", ".cpp",
    ".h", ".hpp", ".java", ".go", ".rs", ".swift", ".kt", ".kts", ".rb", ".php",
    ".pl", ".lua", ".dockerfile", ".rst"
  ].includes(extension);
}

function isImageFile(filePath) {
  return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".tif", ".tiff", ".bmp", ".svg"].includes(path.extname(filePath).toLowerCase());
}

function importTargetDir(project, fileName) {
  if (isImageFile(fileName)) {
    const figuresDir = safeProjectPath(project, "figures");
    return figuresDir;
  }

  return projectRootFor(project);
}

async function uniqueDestination(targetDir, fileName) {
  await fsp.mkdir(targetDir, { recursive: true });
  const parsed = path.parse(fileName);
  let candidate = path.join(targetDir, fileName);
  let suffix = 2;

  while (fs.existsSync(candidate)) {
    candidate = path.join(targetDir, `${parsed.name}-${suffix}${parsed.ext}`);
    suffix += 1;
  }

  return candidate;
}

function shouldSkipFile(name) {
  if (name === ".DS_Store") return true;
  if (name.startsWith(".")) return true;
  return [".aux", ".bbl", ".blg", ".fdb_latexmk", ".fls", ".out", ".synctex.gz", ".toc"].some((ext) => name.endsWith(ext));
}

async function walkProjectFiles(project, dir = projectRootFor(project), depth = 0) {
  if (depth > 5) return [];

  const entries = await fsp.readdir(dir, { withFileTypes: true });
  const visible = entries
    .filter((entry) => !shouldSkipFile(entry.name))
    .filter((entry) => !["node_modules", "__pycache__", ".git"].includes(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

  const nodes = [];
  for (const entry of visible) {
    const absolutePath = path.join(dir, entry.name);
    const relativePath = relativeProjectPath(project, absolutePath);
    const node = {
      name: entry.name,
      relativePath,
      kind: entry.isDirectory() ? "folder" : "file",
      editable: entry.isFile() && isTextFile(absolutePath),
      image: entry.isFile() && isImageFile(absolutePath),
      fileUrl: entry.isFile() ? pathToFileURL(absolutePath).href : ""
    };

    if (entry.isDirectory()) {
      node.children = await walkProjectFiles(project, absolutePath, depth + 1);
    }

    nodes.push(node);
  }

  return nodes;
}

async function touchProject(projectId) {
  const projects = await readProjects();
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  const now = new Date().toISOString();
  project.lastOpenedAt = now;
  project.updatedAt = now;
  await writeProjects(projects);
}

function pdfUrl(project) {
  return `${pathToFileURL(pdfPathFor(project)).href}?v=${Date.now()}`;
}

function resolveExecutable(name) {
  const candidates = [
    name,
    path.join("/opt/homebrew/bin", name),
    path.join("/usr/local/bin", name),
    path.join(homeDir, ".local", "bin", name),
    path.join(homeDir, "bin", name)
  ];

  return candidates.find((candidate) => {
    try {
      return fs.existsSync(candidate) && fs.statSync(candidate).isFile();
    } catch (error) {
      return false;
    }
  }) || name;
}

function terminalPreset(kind, cwd, options = {}) {
  if (kind === "codex") {
    return {
      title: "Codex",
      command: resolveExecutable("codex"),
      args: ["--dangerously-bypass-approvals-and-sandbox", "-C", cwd],
      commandLabel: "codex --dangerously-bypass-approvals-and-sandbox"
    };
  }

  if (kind === "claude") {
    return {
      title: "Claude",
      command: resolveExecutable("claude"),
      args: ["--dangerously-skip-permissions", "--add-dir", cwd],
      commandLabel: "claude --dangerously-skip-permissions"
    };
  }

  if (kind === "ssh") {
    const remote = normalizeRemoteOptions(options.remote);
    if (!remote.host) throw new Error("Choose a New SSH Project before opening an SSH terminal.");
    const controlPath = remote.controlPath || sshControlPath(remote);
    fs.mkdirSync(path.dirname(controlPath), { recursive: true });
    const target = remoteTarget(remote);
    const controlArgs = ["-S", controlPath, "-o", "ControlMaster=auto", "-o", "ControlPersist=8h"];
    const remoteCommand = remote.path
      ? `cd ${shellQuoteRemotePath(remote.path)} && exec ${remote.shell || "$SHELL"} -l`
      : "";
    return {
      title: "SSH",
      command: resolveExecutable("ssh"),
      args: remoteCommand ? [...controlArgs, target, "-t", remoteCommand] : [...controlArgs, target],
      commandLabel: remote.path ? `ssh ${target} (${remote.path})` : `ssh ${target}`,
      remote: { ...remote, target, controlPath }
    };
  }

  if (kind === "ssh-auth") {
    const remote = normalizeRemoteOptions(options.remote);
    if (!remote.host) throw new Error("Enter a server before connecting.");
    const controlPath = remote.controlPath || sshControlPath(remote);
    fs.mkdirSync(path.dirname(controlPath), { recursive: true });
    const target = remoteTarget(remote);
    return {
      title: "SSH",
      command: resolveExecutable("ssh"),
      args: [
        "-S", controlPath,
        "-o", "ControlMaster=auto",
        "-o", "ControlPersist=8h",
        "-f",
        "-N",
        target
      ],
      commandLabel: `ssh ${target} (authenticate)`,
      remote: { ...remote, target, controlPath }
    };
  }

  return {
    title: "Shell",
    command: process.env.SHELL || "/bin/zsh",
    args: ["-l"],
    commandLabel: path.basename(process.env.SHELL || "/bin/zsh")
  };
}

function normalizeRemoteOptions(remote = {}) {
  const parsed = splitRemoteHost(remote.host || remote.server || "");
  return {
    user: String(remote.user || parsed.user || "").trim(),
    host: String(parsed.host || remote.server || remote.host || "").trim(),
    path: String(remote.path || "").trim(),
    shell: String(remote.shell || "").trim(),
    controlPath: String(remote.controlPath || "").trim()
  };
}

function splitRemoteHost(value = "") {
  const raw = String(value || "").trim();
  const at = raw.lastIndexOf("@");
  if (at > 0) return { user: raw.slice(0, at), host: raw.slice(at + 1) };
  return { user: "", host: raw };
}

function remoteTarget(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  return normalized.user ? `${normalized.user}@${normalized.host}` : normalized.host;
}

function sshControlPath(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const key = `${normalized.user || "user"}-${normalized.host || "host"}-${normalized.path || "home"}`;
  const uid = typeof process.getuid === "function" ? process.getuid() : safeCacheName(os.userInfo().username || "user");
  const hash = crypto.createHash("sha1").update(key).digest("hex").slice(0, 16);
  return path.join("/tmp", `openleaf-ssh-${uid}`, `${hash}.sock`);
}

function sshCommandArgs(remote = {}, commandArgs = []) {
  const normalized = normalizeRemoteOptions(remote);
  if (!normalized.host) throw new Error("Missing SSH server.");
  const controlPath = remote.controlPath || sshControlPath(normalized);
  fs.mkdirSync(path.dirname(controlPath), { recursive: true });
  return [
    "-S", controlPath,
    "-o", "ControlMaster=auto",
    "-o", "ControlPersist=8h",
    "-o", "BatchMode=yes",
    remoteTarget(normalized),
    ...commandArgs
  ];
}

function remoteShellCommand(commandArgs = []) {
  return commandArgs.map((arg) => shellQuote(arg)).join(" ");
}

function sshRemoteCommandArgs(remote = {}, commandArgs = []) {
  return sshCommandArgs(remote, [remoteShellCommand(commandArgs)]);
}

async function verifySshConnection(_event, remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  if (!normalized.host) throw new Error("Missing SSH server.");
  const script = `
import json, os, sys
root = os.path.abspath(os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~"))
if not os.path.isdir(root):
    raise SystemExit(f"Remote path is not a directory: {root}")
print(json.dumps({"root": root}))
`;
  const result = await execFileAsync(
    resolveExecutable("ssh"),
    sshRemoteCommandArgs(normalized, ["python3", "-c", script, normalized.path || "~"]),
    { timeout: 20000, maxBuffer: 1024 * 1024 }
  );
  const parsed = JSON.parse(result.stdout || "{}");
  return {
    root: parsed.root || normalized.path || "~",
    remote: {
      ...normalized,
      controlPath: sshControlPath(normalized)
    }
  };
}

async function listSshHosts() {
  const hosts = new Set();
  const sshDir = path.join(homeDir, ".ssh");

  const addHost = (host) => {
    const normalized = String(host || "").trim();
    if (!normalized || normalized === "*" || normalized.includes("*") || normalized.startsWith("|")) return;
    hosts.add(normalized);
  };

  try {
    const config = await fsp.readFile(path.join(sshDir, "config"), "utf8");
    config.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*Host\s+(.+)$/i);
      if (!match) return;
      match[1].split(/\s+/).forEach(addHost);
    });
  } catch (error) {
    // Missing SSH config is normal.
  }

  try {
    const knownHosts = await fsp.readFile(path.join(sshDir, "known_hosts"), "utf8");
    knownHosts.split(/\r?\n/).forEach((line) => {
      const firstField = line.trim().split(/\s+/)[0] || "";
      firstField.split(",").forEach((entry) => {
        addHost(entry.replace(/^\[([^\]]+)\](?::\d+)?$/, "$1").replace(/:\d+$/, ""));
      });
    });
  } catch (error) {
    // Missing known_hosts is normal.
  }

  return { hosts: Array.from(hosts).sort((a, b) => a.localeCompare(b)) };
}

function shellQuote(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function shellQuoteRemotePath(value) {
  const raw = String(value || "").trim();
  if (raw === "~") return "~";
  if (raw.startsWith("~/")) return `~/${shellQuote(raw.slice(2))}`;
  return shellQuote(raw);
}

function remoteWorkspaceCachePath(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const key = `${normalized.user || "user"}@${normalized.host || "host"}:${normalized.path || "~"}`;
  const hash = crypto.createHash("sha1").update(key).digest("hex").slice(0, 20);
  return path.join(app.getPath("userData"), "remote-workspaces", `${safeCacheName(normalized.host || "ssh")}-${hash}`);
}

function safeWorkspacePath(root, relativePath = "") {
  const workspaceRoot = path.resolve(root);
  const resolved = path.resolve(workspaceRoot, String(relativePath || "").replace(/^\/+/, ""));
  if (resolved !== workspaceRoot && !resolved.startsWith(`${workspaceRoot}${path.sep}`)) {
    throw new Error("File path escapes the local SSH workspace mirror.");
  }
  return resolved;
}

function remoteWorkspaceRsyncSource(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const rawPath = String(normalized.path || "~").trim() || "~";
  const remotePath = rawPath.endsWith("/") ? rawPath : `${rawPath}/`;
  const quotedPath = remotePath === "~/" ? "~/" : shellQuoteRemotePath(remotePath);
  return `${remoteTarget(normalized)}:${quotedPath}`;
}

function rsyncSshCommand(remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const controlPath = normalized.controlPath || sshControlPath(normalized);
  fs.mkdirSync(path.dirname(controlPath), { recursive: true });
  return [
    resolveExecutable("ssh"),
    "-S", controlPath,
    "-o", "ControlMaster=auto",
    "-o", "ControlPersist=8h",
    "-o", "BatchMode=yes"
  ].join(" ");
}

async function mirrorRemoteWorkspace(remote = {}, destination) {
  const normalized = normalizeRemoteOptions(remote);
  if (!normalized.host) throw new Error("Missing SSH server.");
  await fsp.mkdir(destination, { recursive: true });
  const args = [
    "-az",
    "--delete",
    "--exclude", ".git/",
    "--exclude", "node_modules/",
    "--exclude", "__pycache__/",
    "--exclude", ".venv/",
    "--exclude", "venv/",
    "-e", rsyncSshCommand(normalized),
    remoteWorkspaceRsyncSource(normalized),
    `${destination}${path.sep}`
  ];

  try {
    await execFileAsync(resolveExecutable("rsync"), args, {
      timeout: 120000,
      maxBuffer: 1024 * 1024 * 12
    });
  } catch (error) {
    throw new Error(`Could not mirror the SSH workspace locally.\n\n${formatMainError(error)}`);
  }
}

function terminalEnv(cwd) {
  return {
    ...process.env,
    COLORTERM: "truecolor",
    FORCE_COLOR: "1",
    PATH: terminalPath,
    PWD: cwd,
    TERM: "xterm-256color"
  };
}

function ensurePtyHelperExecutable() {
  try {
    const utils = require("node-pty/lib/utils");
    const native = utils.loadNativeModule("pty");
    const helperPath = path
      .resolve(__dirname, "node_modules", "node-pty", "lib", native.dir, "spawn-helper")
      .replace("app.asar", "app.asar.unpacked")
      .replace("node_modules.asar", "node_modules.asar.unpacked");

    if (fs.existsSync(helperPath)) {
      fs.chmodSync(helperPath, 0o755);
    }
  } catch (error) {
    // If this fails, node-pty will surface the real spawn error to the terminal panel.
  }
}

async function createTerminal(_event, payload = {}) {
  const project = payload.projectId ? await getProject(payload.projectId) : null;
  const cwd = project ? projectRootFor(project) : repoRoot;
  const preset = terminalPreset(payload.kind || "shell", cwd, payload);
  const id = crypto.randomUUID();
  ensurePtyHelperExecutable();
  const ptyProcess = pty.spawn(preset.command, preset.args, {
    name: "xterm-256color",
    cols: clampTerminalDimension(payload.cols, 40, 220, 100),
    rows: clampTerminalDimension(payload.rows, 8, 80, 18),
    cwd,
    env: terminalEnv(cwd)
  });

  terminalSessions.set(id, { ptyProcess, cwd, ...preset });

  ptyProcess.onData((data) => sendTerminalData(id, data));
  ptyProcess.onExit(({ exitCode, signal }) => {
    terminalSessions.delete(id);
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("terminal-exit", { id, code: exitCode, signal });
    }
  });

  return {
    id,
    cwd,
    title: preset.title,
    commandLabel: preset.commandLabel
  };
}

function sendTerminalData(id, data) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("terminal-data", { id, data: String(data) });
  }
}

function writeTerminal(_event, payload = {}) {
  const session = terminalSessions.get(payload.id);
  if (!session) return;
  session.ptyProcess.write(String(payload.data || ""));
}

function resizeTerminal(_event, payload = {}) {
  const session = terminalSessions.get(payload.id);
  if (!session) return false;
  session.ptyProcess.resize(
    clampTerminalDimension(payload.cols, 40, 220, 100),
    clampTerminalDimension(payload.rows, 8, 80, 18)
  );
  return true;
}

function killTerminal(_event, id) {
  const session = terminalSessions.get(id);
  if (!session) return false;

  session.ptyProcess.kill("SIGTERM");
  terminalSessions.delete(id);
  return true;
}

function killTerminalSessions() {
  terminalSessions.forEach((session) => session.ptyProcess.kill("SIGTERM"));
  terminalSessions.clear();
}

function clampTerminalDimension(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(numeric)));
}

async function loadManuscript(_event, payload) {
  const projectId = typeof payload === "string" ? payload : payload.projectId;
  const project = await getProject(projectId);
  const relativePath = typeof payload === "object" && payload.relativePath ? payload.relativePath : relativeProjectPath(project, project.texPath);
  const filePath = safeProjectPath(project, relativePath);
  if (!isTextFile(filePath)) throw new Error("Only text project files can be opened in the editor.");
  const tex = await fsp.readFile(filePath, "utf8");
  await touchProject(project.id);

  return {
    project: decorateProject(project),
    file: fileDescriptor(project, filePath),
    tex,
    texPath: project.texPath,
    pdfPath: pdfPathFor(project),
    pdfUrl: pdfUrl(project)
  };
}

async function readProjectFile(_event, payload = {}) {
  const project = await getProject(payload.projectId);
  const relativePath = payload.relativePath || relativeProjectPath(project, project.texPath);
  const filePath = safeProjectPath(project, relativePath);
  if (!isTextFile(filePath)) throw new Error("Only text project files can be watched in the editor.");
  return {
    project: decorateProject(project),
    file: fileDescriptor(project, filePath),
    tex: await fsp.readFile(filePath, "utf8")
  };
}

async function listRemoteFiles(_event, remote = {}) {
  const normalized = normalizeRemoteOptions(remote);
  const script = `
import json, os, sys
root = os.path.abspath(os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else "~"))
text_ext = set(${remoteTextExtensions()})
image_ext = set(${remoteImageExtensions()})
skip = {".git", "node_modules", "__pycache__", ".venv", "venv", ".DS_Store"}
def rel(path):
    value = os.path.relpath(path, root)
    return "" if value == "." else value.replace(os.sep, "/")
def node(path, depth=0):
    name = os.path.basename(path) or path
    try:
        stat = os.stat(path)
    except OSError:
        return None
    if os.path.isdir(path):
        children = []
        if depth < 6:
            try:
                entries = sorted(os.listdir(path), key=lambda x: (not os.path.isdir(os.path.join(path, x)), x.lower()))
            except OSError:
                entries = []
            for entry in entries:
                if entry in skip or entry.startswith("."):
                    continue
                child = node(os.path.join(path, entry), depth + 1)
                if child:
                    children.append(child)
        return {"name": name, "relativePath": rel(path), "kind": "folder", "children": children}
    ext = os.path.splitext(name.lower())[1]
    return {"name": name, "relativePath": rel(path), "kind": "file", "editable": ext in text_ext, "image": ext in image_ext, "mtimeMs": stat.st_mtime * 1000, "size": stat.st_size}
tree = node(root)
print(json.dumps({"files": tree.get("children", []) if tree else [], "root": root}))
`;
  const result = await execFileAsync(resolveExecutable("ssh"), sshRemoteCommandArgs(normalized, ["python3", "-c", script, normalized.path || "~"]), {
    timeout: 20000,
    maxBuffer: 1024 * 1024 * 8
  });
  return JSON.parse(result.stdout || "{\"files\":[]}");
}

async function readRemoteFile(_event, payload = {}) {
  const normalized = normalizeRemoteOptions(payload.remote || {});
  const relativePath = String(payload.relativePath || "").replace(/^\/+/, "");
  if (!relativePath) throw new Error("Choose a remote file first.");
  const script = `
import base64, json, os, sys
root = os.path.abspath(os.path.expanduser(sys.argv[1]))
relative = sys.argv[2].lstrip("/")
path = os.path.abspath(os.path.join(root, relative))
if path != root and not path.startswith(root + os.sep):
    raise SystemExit("Path escapes remote workspace")
with open(path, "rb") as handle:
    data = handle.read()
print(json.dumps({"name": os.path.basename(path), "relativePath": relative.replace(os.sep, "/"), "tex": base64.b64encode(data).decode("ascii")}))
`;
  const result = await execFileAsync(resolveExecutable("ssh"), sshRemoteCommandArgs(normalized, ["python3", "-c", script, normalized.path || "~", relativePath]), {
    timeout: 20000,
    maxBuffer: 1024 * 1024 * 16
  });
  const parsed = JSON.parse(result.stdout);
  const fileName = parsed.name || path.basename(relativePath);
  const extension = path.extname(fileName).toLowerCase();
  return {
    file: {
      name: fileName,
      relativePath: parsed.relativePath || relativePath,
      kind: "file",
      editable: true,
      image: false
    },
    tex: Buffer.from(parsed.tex || "", "base64").toString("utf8"),
    mtimeMs: Date.now(),
    extension
  };
}

async function readRemotePdf(_event, payload = {}) {
  const normalized = normalizeRemoteOptions(payload.remote || {});
  const relativePath = String(payload.relativePath || "").replace(/^\/+/, "");
  if (!relativePath) throw new Error("Choose a remote PDF first.");
  if (path.extname(relativePath).toLowerCase() !== ".pdf") {
    throw new Error("Only remote PDF files can be opened in the PDF viewer.");
  }
  const script = `
import base64, os, sys
root = os.path.abspath(os.path.expanduser(sys.argv[1]))
relative = sys.argv[2].lstrip("/")
path = os.path.abspath(os.path.join(root, relative))
if path != root and not path.startswith(root + os.sep):
    raise SystemExit("Path escapes remote workspace")
if not os.path.isfile(path):
    raise SystemExit(f"PDF not found: {relative}")
with open(path, "rb") as handle:
    sys.stdout.write(base64.b64encode(handle.read()).decode("ascii"))
`;
  try {
    const result = await execFileAsync(resolveExecutable("ssh"), sshRemoteCommandArgs(normalized, ["python3", "-c", script, normalized.path || "~", relativePath]), {
      timeout: 30000,
      maxBuffer: 1024 * 1024 * 96
    });
    const pdf = Buffer.from(result.stdout || "", "base64");
    return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
  } catch (error) {
    const localPdfPath = safeWorkspacePath(remoteWorkspaceCachePath(normalized), relativePath);
    if (fs.existsSync(localPdfPath)) {
      const pdf = await fsp.readFile(localPdfPath);
      return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
    }
    throw error;
  }
}

async function saveRemoteFile(_event, payload = {}) {
  const normalized = normalizeRemoteOptions(payload.remote || {});
  const relativePath = String(payload.relativePath || "").replace(/^\/+/, "");
  if (!relativePath) throw new Error("Choose a remote file first.");
  const script = `
import base64, os, sys
root = os.path.abspath(os.path.expanduser(sys.argv[1]))
relative = sys.argv[2].lstrip("/")
path = os.path.abspath(os.path.join(root, relative))
if path != root and not path.startswith(root + os.sep):
    raise SystemExit("Path escapes remote workspace")
os.makedirs(os.path.dirname(path), exist_ok=True)
raw = sys.stdin.read()
with open(path, "wb") as handle:
    handle.write(base64.b64decode(raw.encode("ascii")))
`;
  await execFileWithInput(
    resolveExecutable("ssh"),
    sshRemoteCommandArgs(normalized, ["python3", "-c", script, normalized.path || "~", relativePath]),
    Buffer.from(String(payload.tex || ""), "utf8").toString("base64"),
    { timeout: 20000, maxBuffer: 1024 * 1024 * 16 }
  );
  return {
    file: {
      name: path.basename(relativePath),
      relativePath,
      kind: "file",
      editable: true,
      image: false
    }
  };
}

async function compileRemoteManuscript(_event, payload = {}) {
  const normalized = normalizeRemoteOptions(payload.remote || {});
  const relativePath = String(payload.relativePath || "").replace(/^\/+/, "");
  if (!relativePath) throw new Error("Choose a remote TeX file first.");
  if (path.extname(relativePath).toLowerCase() !== ".tex") {
    throw new Error("Switch to a TeX file before compiling.");
  }
  const localRoot = remoteWorkspaceCachePath(normalized);
  await mirrorRemoteWorkspace(normalized, localRoot);

  const localTexPath = safeWorkspacePath(localRoot, relativePath);
  await fsp.mkdir(path.dirname(localTexPath), { recursive: true });
  await fsp.writeFile(localTexPath, String(payload.tex || ""), "utf8");

  const compileProject = {
    id: `remote:${crypto.createHash("sha1").update(localRoot).digest("hex").slice(0, 12)}`,
    name: `SSH ${normalized.host}`,
    texPath: localTexPath
  };
  const output = await runTectonic(compileProject);
  const pdfPath = pdfPathFor(compileProject);
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`${output}\n\nCompile finished locally but ${path.basename(pdfPath)} was not found.`);
  }

  const pdf = await fsp.readFile(pdfPath);
  const compiledPdfRelativePath = path.relative(localRoot, pdfPath).split(path.sep).join("/");
  return {
    file: {
      name: path.basename(relativePath),
      relativePath,
      kind: "file",
      editable: true,
      image: false
    },
    output: output || `Compiled ${path.basename(relativePath)} locally from the SSH workspace.`,
    compiledPdfRelativePath,
    compiledPdfName: path.basename(pdfPath),
    localWorkspacePath: localRoot,
    localPdfPath: pdfPath,
    pdf: pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength),
    compileWarning: false
  };
}

async function listProjectFiles(_event, projectId) {
  const project = await getProject(projectId);
  return {
    project: decorateProject(project),
    files: await walkProjectFiles(project)
  };
}

async function chooseProjectFiles(_event, projectId) {
  const project = await getProject(projectId);
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Add Files or Folders to Project",
    buttonLabel: "Add",
    properties: ["openFile", "openDirectory", "multiSelections"],
    filters: [
      { name: "Project assets", extensions: ["tex", "ltx", "bib", "bst", "cls", "sty", "png", "jpg", "jpeg", "gif", "webp", "svg", "pdf", "csv", "tsv", "txt", "md", "json", "yaml", "yml", "py", "js", "ts", "tsx", "jsx", "css", "html", "xml", "sh"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || !result.filePaths.length) {
    return { imported: [], files: await walkProjectFiles(project) };
  }

  const imported = await importFiles(project, result.filePaths.map((filePath) => ({ path: filePath })));
  return { imported, files: await walkProjectFiles(project) };
}

async function importProjectFiles(_event, payload) {
  const project = await getProject(payload.projectId);
  const imported = await importFiles(project, payload.files || []);
  return { imported, files: await walkProjectFiles(project) };
}

async function importFiles(project, files) {
  const imported = [];

  for (const file of files) {
    const fileName = path.basename(file.name || file.path || "asset");

    if (file.path) {
      const stat = await fsp.stat(file.path);
      const targetDir = stat.isDirectory() ? projectRootFor(project) : importTargetDir(project, fileName);
      const destination = await uniqueDestination(targetDir, fileName);
      if (stat.isDirectory()) {
        await fsp.cp(file.path, destination, {
          recursive: true,
          filter: (source) => !shouldSkipFile(path.basename(source))
        });
      } else {
        await fsp.copyFile(file.path, destination);
      }
      imported.push(fileDescriptor(project, destination));
    } else if (file.bytes) {
      const targetDir = importTargetDir(project, fileName);
      const destination = await uniqueDestination(targetDir, fileName);
      await fsp.writeFile(destination, Buffer.from(file.bytes));
      imported.push(fileDescriptor(project, destination));
    } else {
      continue;
    }
  }

  if (imported.length) await touchProject(project.id);
  return imported;
}

async function projectFileAction(_event, payload = {}) {
  const project = await getProject(payload.projectId);
  const relativePath = String(payload.relativePath || "");
  const action = String(payload.action || "");
  const options = payload.options || {};
  const filePath = safeProjectPath(project, relativePath);
  if (action === "create-file" || action === "create-folder") {
    const targetName = sanitizeFileName(options.name);
    if (!targetName) throw new Error("Enter a valid name.");
    const parentPath = relativePath ? safeProjectPath(project, relativePath) : projectRootFor(project);
    const parentStat = fs.existsSync(parentPath) ? await fsp.stat(parentPath) : null;
    const targetDir = parentStat && parentStat.isDirectory() ? parentPath : path.dirname(parentPath);
    const destination = safeProjectPath(project, path.relative(projectRootFor(project), path.join(targetDir, targetName)));
    if (fs.existsSync(destination)) throw new Error(`A file named ${targetName} already exists.`);

    if (action === "create-folder") await fsp.mkdir(destination, { recursive: false });
    else await fsp.writeFile(destination, defaultContentForNewFile(targetName), "utf8");

    await touchProject(project.id);
    return {
      project: decorateProject(project),
      file: fileDescriptor(project, destination),
      files: await walkProjectFiles(project)
    };
  }

  const stat = await fsp.stat(filePath);

  if (action === "copy-path") {
    clipboard.writeText(filePath);
    return { value: filePath };
  }

  if (action === "copy-relative-path") {
    clipboard.writeText(relativePath);
    return { value: relativePath };
  }

  if (action === "copy-name") {
    clipboard.writeText(path.basename(filePath));
    return { value: path.basename(filePath) };
  }

  if (action === "reveal") {
    shell.showItemInFolder(filePath);
    return { ok: true };
  }

  if (action === "open") {
    return { ok: true, result: await shell.openPath(filePath) };
  }

  if (action === "duplicate") {
    const destination = await uniqueSiblingPath(filePath);
    if (stat.isDirectory()) {
      await fsp.cp(filePath, destination, { recursive: true });
    } else {
      await fsp.copyFile(filePath, destination);
    }
    await touchProject(project.id);
    return {
      project: decorateProject(project),
      file: fileDescriptor(project, destination),
      files: await walkProjectFiles(project)
    };
  }

  if (action === "copy-into") {
    const sourceRelativePath = String(options.sourceRelativePath || "");
    const sourcePath = safeProjectPath(project, sourceRelativePath);
    const sourceStat = await fsp.stat(sourcePath);
    const targetDir = stat.isDirectory() ? filePath : path.dirname(filePath);
    const destination = await uniqueChildPath(targetDir, path.basename(sourcePath), { preferOriginal: true });
    if (sourceStat.isDirectory()) {
      await fsp.cp(sourcePath, destination, { recursive: true });
    } else {
      await fsp.copyFile(sourcePath, destination);
    }
    await touchProject(project.id);
    return {
      project: decorateProject(project),
      file: fileDescriptor(project, destination),
      files: await walkProjectFiles(project)
    };
  }

  if (action === "rename") {
    if (path.resolve(filePath) === path.resolve(project.texPath)) {
      throw new Error("The project entry .tex file cannot be renamed from the file tree.");
    }
    const nextName = sanitizeFileName(options.name);
    if (!nextName) throw new Error("Enter a file name.");
    const destination = safeProjectPath(project, path.posix.join(path.posix.dirname(relativePath), nextName));
    if (fs.existsSync(destination)) throw new Error(`A file named ${nextName} already exists.`);
    await fsp.rename(filePath, destination);
    await touchProject(project.id);
    return {
      project: decorateProject(project),
      file: fileDescriptor(project, destination),
      files: await walkProjectFiles(project)
    };
  }

  if (action === "delete") {
    if (path.resolve(filePath) === path.resolve(project.texPath)) {
      throw new Error("The project entry .tex file cannot be deleted from the file tree.");
    }
    if (stat.isDirectory() && path.resolve(project.texPath).startsWith(`${path.resolve(filePath)}${path.sep}`)) {
      throw new Error("A folder containing the project entry .tex file cannot be deleted from the file tree.");
    }
    await fsp.rm(filePath, { recursive: stat.isDirectory(), force: false });
    await touchProject(project.id);
    return {
      project: decorateProject(project),
      files: await walkProjectFiles(project)
    };
  }

  throw new Error(`Unknown file action: ${action}`);
}

function defaultContentForNewFile(name) {
  const extension = path.extname(name).toLowerCase();
  if (extension === ".tex") {
    return "\\documentclass{article}\n\\begin{document}\n\n\\end{document}\n";
  }
  if (extension === ".md") return "# Notes\n";
  if (extension === ".py") return "";
  return "";
}

async function uniqueSiblingPath(filePath) {
  const parentDir = path.dirname(filePath);
  return uniqueChildPath(parentDir, path.basename(filePath));
}

async function uniqueChildPath(parentDir, basename, { preferOriginal = false } = {}) {
  const filePath = path.join(parentDir, basename);
  if (preferOriginal && !fs.existsSync(filePath)) return filePath;
  const parsed = path.parse(filePath);
  let candidate = path.join(parentDir, `${parsed.name} copy${parsed.ext}`);
  let suffix = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(parentDir, `${parsed.name} copy ${suffix}${parsed.ext}`);
    suffix += 1;
  }
  return candidate;
}

function sanitizeFileName(value) {
  const name = String(value || "").trim();
  if (!name || name === "." || name === "..") return "";
  if (name.includes("/") || name.includes("\\") || name.includes("\0")) return "";
  return name;
}

async function saveManuscript(_event, payload) {
  const project = await getProject(payload.projectId);
  const filePath = safeProjectPath(project, payload.relativePath || relativeProjectPath(project, project.texPath));
  if (!isTextFile(filePath)) throw new Error("Only text project files can be saved from the editor.");
  await fsp.writeFile(filePath, payload.tex, "utf8");
  await touchProject(project.id);

  return {
    project: decorateProject(project),
    file: fileDescriptor(project, filePath),
    texPath: project.texPath
  };
}

async function compileManuscript(_event, payload) {
  const project = await getProject(payload.projectId);
  const filePath = safeProjectPath(project, payload.relativePath || relativeProjectPath(project, project.texPath));
  if (!isTextFile(filePath)) throw new Error("Only text project files can be saved from the editor.");
  await fsp.writeFile(filePath, payload.tex, "utf8");

  const compileProject = { ...project, texPath: filePath };
  const output = await runTectonic(compileProject);
  const pdfPath = pdfPathFor(compileProject);
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`${output}\n\nCompile finished but ${path.basename(pdfPath)} was not found.`);
  }

  await touchProject(project.id);

  return {
    project: decorateProject(project),
    file: fileDescriptor(project, filePath),
    output,
    pdfPath,
    pdfUrl: pdfUrl(compileProject),
    compiledPdfRelativePath: relativeProjectPath(project, pdfPath),
    compiledPdfName: path.basename(pdfPath)
  };
}

function fileDescriptor(project, filePath) {
  let stat = null;
  try {
    stat = fs.statSync(filePath);
  } catch (error) {
    stat = null;
  }

  return {
    name: path.basename(filePath),
    relativePath: relativeProjectPath(project, filePath),
    editable: isTextFile(filePath),
    image: isImageFile(filePath),
    fileUrl: pathToFileURL(filePath).href,
    isMain: path.resolve(filePath) === path.resolve(project.texPath),
    modifiedAt: stat ? stat.mtime.toISOString() : "",
    mtimeMs: stat ? stat.mtimeMs : 0,
    size: stat ? stat.size : 0
  };
}

async function runTectonic(project) {
  const entryPath = await compileEntryPath(project);
  await ensureLatexSupportFiles(entryPath);
  const cwd = path.dirname(entryPath);
  const entry = path.basename(entryPath);
  const outputPath = pdfPathFor({ ...project, texPath: entryPath });
  const attempts = [
    { label: "tectonic", command: "tectonic", args: [entry] },
    { label: "latexmk", command: "latexmk", args: ["-pdf", "-interaction=nonstopmode", "-halt-on-error", entry] },
    { label: "pdflatex", command: "pdflatex", args: ["-interaction=nonstopmode", "-halt-on-error", entry], repeat: 2 }
  ];
  const failures = [];

  for (const attempt of attempts) {
    let output = "";
    try {
      for (let index = 0; index < (attempt.repeat || 1); index += 1) {
        const result = await execFileAsync(resolveExecutable(attempt.command), attempt.args, {
          cwd,
          timeout: 180000,
          maxBuffer: 1024 * 1024 * 12
        });
        output += [result.stdout, result.stderr].filter(Boolean).join("\n");
      }
      if (fs.existsSync(outputPath)) {
        return output || `${attempt.label} compiled ${entry}.`;
      }
      failures.push(`${attempt.label}: finished but did not create ${path.basename(outputPath)}.`);
    } catch (error) {
      failures.push(`${attempt.label}: ${formatMainError(error)}`);
    }
  }

  throw new Error(`Could not compile ${entry}.\n\n${failures.join("\n\n")}`);
}

async function ensureLatexSupportFiles(entryPath) {
  let source = "";
  try {
    source = await fsp.readFile(entryPath, "utf8");
  } catch (error) {
    return;
  }

  const cwd = path.dirname(entryPath);
  await ensureLatexClassFile(cwd, source, "llncs.cls");
  await ensureLatexFigureAssets(cwd, source);
}

async function ensureLatexClassFile(cwd, source, className) {
  if (!new RegExp(`\\\\documentclass(?:\\[[^\\]]*\\])?\\{${className.replace(/\.cls$/i, "")}\\}`, "i").test(source)) return;
  const target = path.join(cwd, className);
  if (fs.existsSync(target)) return;
  const candidate = latexSupportFileCandidates(className).find((filePath) => fs.existsSync(filePath));
  if (!candidate) return;
  await fsp.copyFile(candidate, target);
}

async function ensureLatexFigureAssets(cwd, source) {
  const figures = latexIncludedFigureNames(source);
  if (!figures.length) return;

  const targetDir = path.join(cwd, "figures");
  const missing = figures.filter((figureName) => !latexFigureExists(targetDir, figureName));
  if (!missing.length) return;

  const candidateDir = latexFigureDirectoryCandidates().find((dirPath) => (
    fs.existsSync(dirPath)
      && missing.some((figureName) => latexFigureExists(dirPath, figureName))
  ));
  if (!candidateDir) return;

  await fsp.mkdir(targetDir, { recursive: true });
  for (const figureName of missing) {
    const sourcePath = latexFigurePath(candidateDir, figureName);
    if (!sourcePath) continue;
    await fsp.copyFile(sourcePath, path.join(targetDir, path.basename(sourcePath)));
  }
}

function latexIncludedFigureNames(source) {
  return Array.from(source.matchAll(/\\includegraphics(?:\[[^\]]*\])?\{([^}]+)\}/g))
    .map((match) => String(match[1] || "").trim().replace(/^['"]|['"]$/g, ""))
    .map((value) => value.replace(/^\.\/+/, "").replace(/^figures\//, ""))
    .filter(Boolean);
}

function latexFigureExists(dirPath, figureName) {
  return Boolean(latexFigurePath(dirPath, figureName));
}

function latexFigurePath(dirPath, figureName) {
  const base = path.basename(figureName);
  const names = path.extname(base)
    ? [base]
    : ["png", "jpg", "jpeg", "pdf", "eps"].map((extension) => `${base}.${extension}`);
  return names.map((name) => path.join(dirPath, name)).find((candidate) => fs.existsSync(candidate)) || "";
}

function latexSupportFileCandidates(fileName) {
  return [
    path.join(repoRoot, fileName),
    path.join(repoRoot, "papers", "sashimi2026_synthetic_cnf", fileName),
    path.join(homeDir, "Downloads", "manuscript", fileName),
    path.join(homeDir, "Downloads", "stanford_research", "canary_CREST", "projects", "neurofibroma", "papers", "sashimi2026_synthetic_cnf", fileName),
    path.join(app.getPath("userData"), "latex-documents-repo", "Manuscript", fileName)
  ];
}

function latexFigureDirectoryCandidates() {
  return [
    path.join(repoRoot, "figures"),
    path.join(repoRoot, "papers", "sashimi2026_synthetic_cnf", "figures"),
    path.join(homeDir, "Downloads", "manuscript", "figures"),
    path.join(homeDir, "Downloads", "stanford_research", "canary_CREST", "projects", "neurofibroma", "papers", "sashimi2026_synthetic_cnf", "figures"),
    path.join(app.getPath("userData"), "latex-documents-repo", "Manuscript", "figures")
  ];
}

async function compileEntryPath(project) {
  const root = projectRootFor(project);
  if (project.texPath && fs.existsSync(project.texPath) && path.extname(project.texPath).toLowerCase() === ".tex") {
    return project.texPath;
  }

  const mainTex = path.join(root, "main.tex");
  if (fs.existsSync(mainTex)) return mainTex;

  const entry = await findProjectEntryFile(root);
  if (entry && path.extname(entry).toLowerCase() === ".tex") return entry;
  throw new Error("No TeX entry file found. Add main.tex or another .tex file first.");
}

async function selectedPdfPath(project, relativePath = "") {
  const requestedPath = String(relativePath || "").trim();
  if (!requestedPath) {
    return ensureProjectPdf(project);
  }

  const pdfPath = safeProjectPath(project, requestedPath);
  if (path.extname(pdfPath).toLowerCase() !== ".pdf") throw new Error("Only project PDF files can be opened in the PDF viewer.");
  if (!fs.existsSync(pdfPath)) throw new Error(`PDF not found: ${requestedPath}`);
  return pdfPath;
}

async function readPdf(_event, payload) {
  const options = payload && typeof payload === "object" ? payload : { projectId: payload };
  const project = await getProject(options.projectId);
  const pdfPath = await selectedPdfPath(project, options.relativePath);
  const pdf = await fsp.readFile(pdfPath);
  return pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength);
}

async function openPdf(_event, payload) {
  const options = payload && typeof payload === "object" ? payload : { projectId: payload };
  const project = await getProject(options.projectId);
  const pdfPath = await selectedPdfPath(project, options.relativePath);
  return shell.openPath(pdfPath);
}

async function downloadPdf(_event, payload) {
  const options = payload && typeof payload === "object" ? payload : { projectId: payload };
  const project = await getProject(options.projectId);
  const sourcePath = await selectedPdfPath(project, options.relativePath);
  if (!fs.existsSync(sourcePath)) throw new Error("No compiled PDF exists yet. Compile the project first.");

  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Download PDF",
    buttonLabel: "Download",
    defaultPath: path.join(app.getPath("downloads"), path.basename(sourcePath)),
    filters: [
      { name: "PDF", extensions: ["pdf"] }
    ]
  });

  if (result.canceled || !result.filePath) return { canceled: true };

  const destination = result.filePath.endsWith(".pdf") ? result.filePath : `${result.filePath}.pdf`;
  await fsp.copyFile(sourcePath, destination);
  return { filePath: destination };
}

async function downloadProjectPackage(_event, projectId) {
  const project = await getProject(projectId);
  const root = projectRootFor(project);
  const baseName = sanitizeArchiveBaseName(project.name || path.basename(root) || "openleaf-project");
  const formats = [
    { label: "zip", extension: "zip" },
    { label: "tar.gz", extension: "tar.gz" },
    { label: "tar", extension: "tar" },
    { label: "tgz", extension: "tgz" }
  ];

  const choice = await dialog.showMessageBox(mainWindow, {
    type: "question",
    title: "Download Project Package",
    message: "Choose a package format.",
    buttons: [...formats.map((format) => format.label), "Cancel"],
    cancelId: formats.length,
    defaultId: 0
  });
  if (choice.response >= formats.length) return { canceled: true };

  const format = formats[choice.response];
  const result = await dialog.showSaveDialog(mainWindow, {
    title: "Save Project Package",
    buttonLabel: "Download",
    defaultPath: path.join(app.getPath("downloads"), `${baseName}.${format.extension}`),
    filters: [
      { name: `${format.label} archive`, extensions: [format.extension] },
      { name: "All files", extensions: ["*"] }
    ]
  });
  if (result.canceled || !result.filePath) return { canceled: true };

  const destination = result.filePath.toLowerCase().endsWith(`.${format.extension}`)
    ? result.filePath
    : `${result.filePath}.${format.extension}`;
  await createProjectArchive(root, destination, format.label);
  return { filePath: destination, format: format.label };
}

async function createProjectArchive(root, destination, format) {
  const parent = path.dirname(root);
  const folderName = path.basename(root);
  const excludes = [
    `${folderName}/.git/*`,
    `${folderName}/node_modules/*`,
    `${folderName}/__pycache__/*`,
    `${folderName}/.DS_Store`
  ];

  if (format === "zip") {
    await execFileAsync("zip", ["-qry", destination, folderName, "-x", ...excludes], { cwd: parent });
    return;
  }

  const args = [];
  if (format === "tar.gz" || format === "tgz") args.push("-czf", destination);
  else args.push("-cf", destination);
  args.push(
    "--exclude", ".git",
    "--exclude", "node_modules",
    "--exclude", "__pycache__",
    "--exclude", ".DS_Store",
    "-C", parent,
    folderName
  );
  await execFileAsync("tar", args);
}

async function pushProjectToGithub(_event, payload) {
  const options = payload && typeof payload === "object"
    ? payload
    : { projectId: payload };
  const projectId = options.projectId;
  const project = await getProject(projectId);
  const latexFiles = await listProjectLatexFiles(project);
  if (!latexFiles.length) throw new Error("No LaTeX source files found to push.");
  if (project.githubRemote) return pushProjectToConfiguredGithub(project, latexFiles);

  const fallbackRemote = normalizeGithubRemote(options.defaultRemote || latexDocumentsRemoteUrl) || latexDocumentsRemoteUrl;
  const sourceRoot = projectRootFor(project);
  const repoPath = await ensureLatexDocumentsRepo(fallbackRemote);
  const folderName = sanitizeArchiveBaseName(project.displayName || project.name || path.basename(sourceRoot));
  const targetRoot = path.join(repoPath, folderName);
  await fsp.rm(targetRoot, { recursive: true, force: true });

  for (const relativePath of latexFiles) {
    const sourcePath = path.join(sourceRoot, relativePath);
    const targetPath = path.join(targetRoot, relativePath);
    await fsp.mkdir(path.dirname(targetPath), { recursive: true });
    await fsp.copyFile(sourcePath, targetPath);
  }

  await execFileAsync("git", ["add", "-A", "--", folderName], { cwd: repoPath });
  const status = await execFileAsync("git", ["diff", "--cached", "--name-only"], { cwd: repoPath });
  let committed = false;
  let commit = "";

  if (status.stdout.trim()) {
    await execFileAsync("git", ["commit", "-m", `Update ${project.name || folderName} LaTeX sources from Openleaf`], { cwd: repoPath });
    committed = true;
    const rev = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoPath });
    commit = rev.stdout.trim();
  }

  const push = await execFileAsync("git", ["push", "-u", "origin", "HEAD:main"], { cwd: repoPath });
  return {
    ok: true,
    committed,
    commit,
    folder: folderName,
    files: latexFiles,
    remote: fallbackRemote,
    output: [push.stdout, push.stderr].filter(Boolean).join("\n").trim()
  };
}

async function listProjectLatexFiles(project) {
  const root = projectRootFor(project);
  const files = [];

  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (shouldSkipFile(entry.name)) continue;
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!latexSourceExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      files.push(path.relative(root, absolutePath));
    }
  }

  await walk(root);
  return files.sort();
}

function projectGithubRepoPath(project) {
  return path.join(app.getPath("userData"), "project-github-repos", safeCacheName(project.id));
}

async function currentGitBranch(cwd) {
  const branch = await execFileAsync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd }).catch(() => ({ stdout: "" }));
  const name = branch.stdout.trim();
  if (name && name !== "HEAD") return name;
  await execFileAsync("git", ["checkout", "-B", "main"], { cwd }).catch(() => {});
  return "main";
}

async function ensureProjectGithubRepo(project) {
  const remote = normalizeGithubRemote(project.githubRemote);
  if (!remote) throw new Error("Set a project GitHub remote in Project settings first.");

  const repoPath = projectGithubRepoPath(project);
  const gitPath = path.join(repoPath, ".git");

  if (!fs.existsSync(gitPath)) {
    await fsp.rm(repoPath, { recursive: true, force: true });
    await fsp.mkdir(path.dirname(repoPath), { recursive: true });
    await execFileAsync("git", ["clone", remote, repoPath]);
  } else {
    await execFileAsync("git", ["remote", "set-url", "origin", remote], { cwd: repoPath });
  }

  await ensureGitIdentity(repoPath);
  const branch = await currentGitBranch(repoPath);
  await execFileAsync("git", ["pull", "--ff-only", "origin", branch], { cwd: repoPath }).catch(() => {});
  return repoPath;
}

async function listLatexFilesInRoot(root) {
  const files = [];

  async function walk(dir) {
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === ".git" || shouldSkipFile(entry.name)) continue;
      const absolutePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(absolutePath);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!latexSourceExtensions.has(path.extname(entry.name).toLowerCase())) continue;
      files.push(path.relative(root, absolutePath));
    }
  }

  await walk(root);
  return files.sort();
}

async function clearLatexFilesInRoot(root) {
  const files = await listLatexFilesInRoot(root).catch(() => []);
  for (const relativePath of files) {
    await fsp.rm(path.join(root, relativePath), { force: true });
  }
}

async function copyLatexFiles(sourceRoot, targetRoot, relativePaths) {
  for (const relativePath of relativePaths) {
    const sourcePath = path.join(sourceRoot, relativePath);
    const targetPath = path.join(targetRoot, relativePath);
    await fsp.mkdir(path.dirname(targetPath), { recursive: true });
    await fsp.copyFile(sourcePath, targetPath);
  }
}

async function pushProjectToConfiguredGithub(project, latexFiles) {
  const sourceRoot = projectRootFor(project);
  const repoPath = await ensureProjectGithubRepo(project);

  await clearLatexFilesInRoot(repoPath);
  await copyLatexFiles(sourceRoot, repoPath, latexFiles);
  await execFileAsync("git", ["add", "-A", "--", "."], { cwd: repoPath });
  const status = await execFileAsync("git", ["diff", "--cached", "--name-only"], { cwd: repoPath });
  let committed = false;
  let commit = "";

  if (status.stdout.trim()) {
    await execFileAsync("git", ["commit", "-m", `Update ${project.name || "project"} LaTeX sources from Openleaf`], { cwd: repoPath });
    committed = true;
    const rev = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: repoPath });
    commit = rev.stdout.trim();
  }

  const push = await execFileAsync("git", ["push", "-u", "origin", "HEAD"], { cwd: repoPath });
  return {
    ok: true,
    committed,
    commit,
    files: latexFiles,
    remote: project.githubRemote,
    output: [push.stdout, push.stderr].filter(Boolean).join("\n").trim()
  };
}

async function pullProjectFromGithub(_event, payload) {
  const options = payload && typeof payload === "object"
    ? payload
    : { projectId: payload };
  const project = await getProject(options.projectId);
  const defaultRemote = normalizeGithubRemote(options.defaultRemote || latexDocumentsRemoteUrl) || latexDocumentsRemoteUrl;
  let defaultError = null;

  try {
    return await pullProjectFromDefaultGithub(project, defaultRemote);
  } catch (error) {
    defaultError = error;
  }

  if (!project.githubRemote) throw defaultError;

  try {
    return await pullProjectFromConfiguredGithub(project);
  } catch (projectError) {
    throw new Error([
      "Could not pull from the default GitHub repo or the project GitHub remote.",
      `Default GitHub: ${formatErrorMessage(defaultError)}`,
      `Project GitHub: ${formatErrorMessage(projectError)}`
    ].join("\n\n"));
  }
}

async function pullProjectFromDefaultGithub(project, defaultRemote) {
  const repoPath = await ensureLatexDocumentsRepo(defaultRemote);
  const folder = defaultGithubProjectFolderName(project);
  const sourceRoot = path.join(repoPath, folder);
  const stat = await fsp.stat(sourceRoot).catch(() => null);
  if (!stat || !stat.isDirectory()) {
    throw new Error(`No ${folder} folder found in the default GitHub repo.`);
  }

  const latexFiles = await listLatexFilesInRoot(sourceRoot);
  if (!latexFiles.length) throw new Error(`No LaTeX source files found in ${folder} in the default GitHub repo.`);

  await copyLatexFiles(sourceRoot, projectRootFor(project), latexFiles);
  await touchProject(project.id);

  const projects = await readProjects();
  const updatedProject = projects.find((item) => item.id === project.id) || project;
  return {
    ok: true,
    project: decorateProject(updatedProject),
    files: latexFiles,
    remote: defaultRemote,
    source: "default",
    folder
  };
}

async function pullProjectFromConfiguredGithub(project) {
  const repoPath = await ensureProjectGithubRepo(project);
  const latexFiles = await listLatexFilesInRoot(repoPath);
  if (!latexFiles.length) throw new Error("No LaTeX source files found in the project GitHub repo.");

  await copyLatexFiles(repoPath, projectRootFor(project), latexFiles);
  await touchProject(project.id);

  const projects = await readProjects();
  const updatedProject = projects.find((item) => item.id === project.id) || project;
  return {
    ok: true,
    project: decorateProject(updatedProject),
    files: latexFiles,
    remote: project.githubRemote,
    source: "project"
  };
}

function defaultGithubProjectFolderName(project) {
  const sourceRoot = projectRootFor(project);
  return sanitizeArchiveBaseName(project.displayName || project.name || path.basename(sourceRoot));
}

function formatErrorMessage(error) {
  return error && error.message ? error.message : String(error || "Unknown error");
}

function latexDocumentsRepoPath() {
  return path.join(app.getPath("userData"), "latex-documents-repo");
}

async function ensureLatexDocumentsRepo(remoteUrl = latexDocumentsRemoteUrl) {
  const normalizedRemote = normalizeGithubRemote(remoteUrl || latexDocumentsRemoteUrl) || latexDocumentsRemoteUrl;
  const repoPath = latexDocumentsRepoPath();
  const gitPath = path.join(repoPath, ".git");

  if (!fs.existsSync(gitPath)) {
    await fsp.rm(repoPath, { recursive: true, force: true });
    await fsp.mkdir(path.dirname(repoPath), { recursive: true });
    await execFileAsync("git", ["clone", normalizedRemote, repoPath]);
  } else {
    await execFileAsync("git", ["remote", "set-url", "origin", normalizedRemote], { cwd: repoPath });
  }

  await ensureGitIdentity(repoPath);
  await execFileAsync("git", ["checkout", "-B", "main"], { cwd: repoPath });
  await execFileAsync("git", ["pull", "--ff-only", "origin", "main"], { cwd: repoPath }).catch(() => {});
  return repoPath;
}

async function ensureGitIdentity(cwd) {
  const name = await execFileAsync("git", ["config", "user.name"], { cwd }).catch(() => ({ stdout: "" }));
  const email = await execFileAsync("git", ["config", "user.email"], { cwd }).catch(() => ({ stdout: "" }));
  if (!name.stdout.trim()) await execFileAsync("git", ["config", "user.name", "Openleaf"], { cwd });
  if (!email.stdout.trim()) await execFileAsync("git", ["config", "user.email", "openleaf@users.noreply.github.com"], { cwd });
}

function sanitizeArchiveBaseName(value) {
  return String(value || "openleaf-project")
    .trim()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "openleaf-project";
}

async function ensureProjectPdf(project) {
  const entryPath = await compileEntryPath(project);
  const compileProject = { ...project, texPath: entryPath };
  const pdfPath = pdfPathFor(compileProject);
  if (fs.existsSync(pdfPath)) return pdfPath;

  await runTectonic(compileProject);
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Compile finished but ${path.basename(pdfPath)} was not found.`);
  }
  return pdfPath;
}

async function readAgents(_event, projectId) {
  const project = await getProject(projectId);
  const agentsPath = agentsPathFor(project);

  try {
    return {
      path: agentsPath,
      text: await fsp.readFile(agentsPath, "utf8"),
      exists: true
    };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return {
      path: agentsPath,
      text: "",
      exists: false
    };
  }
}

async function saveAgents(_event, payload = {}) {
  const project = await getProject(payload.projectId);
  const agentsPath = agentsPathFor(project);
  await fsp.writeFile(agentsPath, String(payload.text || ""), "utf8");
  await touchProject(project.id);
  return {
    path: agentsPath,
    text: String(payload.text || ""),
    exists: true
  };
}

ipcMain.handle("list-projects", listProjects);
ipcMain.handle("add-project", addProject);
ipcMain.handle("add-project-from-path", addProjectFromPath);
ipcMain.handle("list-templates", listTemplates);
ipcMain.handle("template-preview-pdf", templatePreviewPdf);
ipcMain.handle("cache-template-preview", cacheTemplatePreview);
ipcMain.handle("cache-project-preview", cacheProjectPreview);
ipcMain.handle("import-template", importTemplate);
ipcMain.handle("remove-template", removeTemplate);
ipcMain.handle("create-project-from-template", createProjectFromTemplate);
ipcMain.handle("rename-project", renameProject);
ipcMain.handle("remove-project", removeProject);
ipcMain.handle("toggle-project-favorite", toggleProjectFavorite);
ipcMain.handle("save-project-settings", saveProjectSettings);
ipcMain.handle("list-project-files", listProjectFiles);
ipcMain.handle("list-remote-files", listRemoteFiles);
ipcMain.handle("read-remote-file", readRemoteFile);
ipcMain.handle("read-remote-pdf", readRemotePdf);
ipcMain.handle("save-remote-file", saveRemoteFile);
ipcMain.handle("compile-remote-manuscript", compileRemoteManuscript);
ipcMain.handle("verify-ssh-connection", verifySshConnection);
ipcMain.handle("project-file-action", projectFileAction);
ipcMain.handle("choose-project-files", chooseProjectFiles);
ipcMain.handle("import-project-files", importProjectFiles);
ipcMain.handle("load-manuscript", loadManuscript);
ipcMain.handle("read-project-file", readProjectFile);
ipcMain.handle("save-manuscript", saveManuscript);
ipcMain.handle("compile-manuscript", compileManuscript);
ipcMain.handle("read-pdf", readPdf);
ipcMain.handle("open-pdf", openPdf);
ipcMain.handle("download-pdf", downloadPdf);
ipcMain.handle("download-project-package", downloadProjectPackage);
ipcMain.handle("push-project-to-github", pushProjectToGithub);
ipcMain.handle("pull-project-from-github", pullProjectFromGithub);
ipcMain.handle("list-ssh-hosts", listSshHosts);
ipcMain.handle("toggle-fullscreen", toggleFullscreen);
ipcMain.handle("open-external-link", openExternalLink);
ipcMain.handle("open-history-window", openHistoryWindow);
ipcMain.handle("read-agents", readAgents);
ipcMain.handle("save-agents", saveAgents);
ipcMain.handle("terminal-create", createTerminal);
ipcMain.handle("terminal-kill", killTerminal);
ipcMain.on("terminal-write", writeTerminal);
ipcMain.on("terminal-resize", resizeTerminal);

app.on("before-quit", killTerminalSessions);

app.whenReady().then(() => {
  app.setName("Openleaf");
  buildMenu();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
