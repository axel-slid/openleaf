#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import net from "node:net";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const command = String(process.argv[2] || "help").toLowerCase();
const args = process.argv.slice(3);
const defaultPathParts = [
  "/opt/homebrew/bin",
  "/opt/homebrew/sbin",
  "/usr/local/bin",
  "/usr/bin",
  "/bin",
  "/usr/sbin",
  "/sbin"
];
const childEnv = { ...process.env, PATH: normalizedPath(process.env.PATH || "") };

function normalizedPath(value) {
  return [...defaultPathParts, ...String(value).split(path.delimiter)]
    .filter(Boolean)
    .filter((entry, index, entries) => entries.indexOf(entry) === index)
    .join(path.delimiter);
}

function run(commandName, commandArgs, options = {}) {
  const result = spawnSync(commandName, commandArgs, {
    ...options,
    cwd: appRoot,
    env: { ...childEnv, ...(options.env || {}) },
    stdio: "inherit"
  });
  process.exitCode = result.status || 0;
  return result.status || 0;
}

function runNode(scriptName, scriptArgs = []) {
  return run(process.execPath, [path.join(appRoot, "scripts", scriptName), ...scriptArgs]);
}

function openMacApp(appPath) {
  return run("open", [appPath], { cwd: process.cwd() });
}

function printHelp() {
  console.log(`Openleaf

Usage:
  openleaf install    Build and copy Openleaf.app to /Applications on macOS
  openleaf package    Build dist/mac/Openleaf.app on macOS
  openleaf open       Open /Applications/Openleaf.app, building a local copy if needed
  openleaf dev        Run the Electron app from this source checkout
  openleaf path LINK  Print the folder of an openleaf://project/<id> link
  openleaf link PATH  Print the openleaf:// link of the project holding PATH

Control a running Openleaf (for agents and scripts):
  openleaf status                     Version and open windows/tabs
  openleaf projects                   All projects (id, name, folder, PDF)
  openleaf add PATH                   Register a .tex/.html/.pptx file or folder
  openleaf open PROJECT [--tab|--new-window|--here]
                                      Open by id, name, link or path
  openleaf tabs                       Tabs in the current window
  openleaf tab N|NAME                 Switch to a tab
  openleaf close-tab [N|NAME]         Close a tab (default: the current one)
  openleaf state                      Screen, project, file, panels, save status
  openleaf panel NAME open|close      files, source, preview, terminal, log, notes
  openleaf file RELATIVE_PATH         Open a file of the current project
  openleaf home                       Show the projects page
  openleaf find TEXT                  Matches of TEXT in the current file
  openleaf compile [PROJECT]          Build (current project, or PROJECT headless)
  openleaf fullscreen [on|off]        Toggle or set fullscreen
  openleaf screenshot [--out FILE]    PNG of the current window
  openleaf call METHOD [JSON]         Raw control-socket request

  Add --json for machine-readable output and --window ID to target a window.
  The socket is OPENLEAF_CONTROL_SOCKET or <userData>/control.sock.

Notes:
  macOS app installation is explicit on purpose. npm install will not silently
  write to /Applications; run openleaf install when you want that.
`);
}

function readProjectStore() {
  const store = path.join(process.env.HOME || "", "Library", "Application Support", "Openleaf", "projects.json");
  try {
    return JSON.parse(fs.readFileSync(store, "utf8")).projects || [];
  } catch (_error) {
    return [];
  }
}

function projectRoot(project) {
  return path.resolve((project.overleaf && project.overleaf.root) || path.dirname(project.texPath));
}

function controlSocketPath() {
  if (process.env.OPENLEAF_CONTROL_SOCKET) return process.env.OPENLEAF_CONTROL_SOCKET;
  const userData = process.platform === "darwin"
    ? path.join(os.homedir(), "Library", "Application Support", "Openleaf")
    : process.platform === "win32"
      ? path.join(process.env.APPDATA || os.homedir(), "Openleaf")
      : path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config"), "Openleaf");
  return path.join(userData, "control.sock");
}

function controlRequest(method, params = {}, timeoutMs = 60000) {
  return new Promise((resolve, reject) => {
    const socket = net.connect(controlSocketPath());
    let buffer = "";
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error(`Openleaf did not answer "${method}" within ${Math.round(timeoutMs / 1000)}s.`));
    }, timeoutMs);
    socket.setEncoding("utf8");
    socket.on("connect", () => socket.write(`${JSON.stringify({ id: 1, method, params })}\n`));
    socket.on("data", (chunk) => {
      buffer += chunk;
      const newline = buffer.indexOf("\n");
      if (newline < 0) return;
      clearTimeout(timer);
      socket.end();
      const message = JSON.parse(buffer.slice(0, newline));
      if (message.error) reject(new Error(message.error));
      else resolve(message.result);
    });
    socket.on("error", (error) => {
      clearTimeout(timer);
      reject(error.code === "ENOENT" || error.code === "ECONNREFUSED"
        ? new Error("Openleaf is not running (start it with `openleaf open`).")
        : error);
    });
  });
}

const controlCommands = new Set([
  "status", "projects", "add", "open", "tabs", "tab", "close-tab", "state", "panel",
  "file", "home", "find", "compile", "fullscreen", "screenshot", "call"
]);

function takeFlag(list, name) {
  const index = list.indexOf(name);
  if (index < 0) return false;
  list.splice(index, 1);
  return true;
}

function takeOption(list, name) {
  const index = list.indexOf(name);
  if (index < 0) return undefined;
  const value = list[index + 1];
  list.splice(index, 2);
  return value;
}

function printHuman(commandName, result) {
  if (commandName === "projects") {
    for (const project of result) {
      console.log(`${project.id}  ${project.name}${project.favorite ? " ★" : ""}\n    ${project.root}${project.pdf ? "" : "  (no PDF)"}`);
    }
  } else if (commandName === "tabs" || commandName === "status") {
    const windows = commandName === "tabs" ? result : result.windows;
    if (commandName === "status") console.log(`Openleaf ${result.version} (pid ${result.pid})`);
    for (const tab of windows) {
      console.log(`${tab.active ? "*" : " "} ${tab.tabIndex}. ${tab.title}  [window ${tab.id}${tab.fullscreen ? ", fullscreen" : ""}]`);
    }
  } else if (commandName === "screenshot") {
    console.log(result.path);
  } else if (commandName === "find") {
    console.log(`${result.count} match${result.count === 1 ? "" : "es"} for "${result.query}"`);
    for (const match of result.matches.slice(0, 50)) console.log(`  line ${match.line}, col ${match.ch + 1}`);
  } else if (commandName === "compile") {
    if ("ok" in result) console.log(result.ok ? `Built ${result.pdf}` : `Build failed\n${result.log}`);
    else console.log(result.log || "Compiled.");
  } else if (result && typeof result === "object" && "screen" in result) {
    const panels = Object.entries(result.panels || {}).map(([name, open]) => `${name} ${open ? "open" : "closed"}`).join(", ");
    console.log(`${result.screen}${result.project ? `: ${result.project.name}` : ""}${result.file ? ` — ${result.file}` : ""}`);
    if (result.screen !== "projects") console.log(`panels: ${panels}`);
    if (result.saveStatus) console.log(`save: ${result.saveStatus}${result.fullscreen ? " · fullscreen" : ""}`);
  } else {
    console.log(typeof result === "string" ? result : JSON.stringify(result, null, 2));
  }
}

async function runControlCommand(commandName, commandArgs) {
  const list = [...commandArgs];
  const json = takeFlag(list, "--json");
  const window = takeOption(list, "--window");
  const base = window ? { window } : {};
  let method = commandName;
  let params = { ...base };
  if (commandName === "add") params.path = list[0];
  if (commandName === "open") {
    const mode = takeFlag(list, "--window-new") || takeFlag(list, "--new-window") ? "window"
      : takeFlag(list, "--tab") ? "tab" : takeFlag(list, "--here") ? "current" : "";
    params = { ...params, project: list.join(" "), mode };
  }
  if (commandName === "tab") { method = "selectTab"; params.tab = list.join(" "); }
  if (commandName === "close-tab") { method = "closeTab"; if (list.length) params.tab = list.join(" "); }
  if (commandName === "panel") {
    const [name, action = "open"] = list;
    if (!["open", "close", "show", "hide"].includes(action)) throw new Error("Use: openleaf panel NAME open|close");
    params = { ...params, name, open: action === "open" || action === "show" };
  }
  if (commandName === "file") { method = "openFile"; params.file = list.join(" "); }
  if (commandName === "find") params.query = list.join(" ");
  if (commandName === "compile" && list.length) params.project = list.join(" ");
  if (commandName === "fullscreen" && list[0]) params.on = !["off", "false", "0"].includes(list[0]);
  if (commandName === "screenshot") { const out = takeOption(list, "--out") || list[0]; if (out) params.out = path.resolve(out); }
  if (commandName === "call") { method = list[0]; params = { ...base, ...(list[1] ? JSON.parse(list[1]) : {}) }; }
  const result = await controlRequest(method, params, commandName === "compile" ? 300000 : 60000);
  if (json) console.log(JSON.stringify(result, null, 2));
  else printHuman(commandName, result);
}

if (controlCommands.has(command)) {
  runControlCommand(command, args).catch((error) => {
    console.error(error.message || String(error));
    process.exitCode = 1;
  });
} else if (command === "help" || command === "--help" || command === "-h") {
  printHelp();
} else if (command === "install") {
  if (process.platform !== "darwin") {
    console.error("openleaf install currently creates a macOS .app bundle only.");
    process.exitCode = 1;
  } else {
    runNode("package-mac.mjs", ["--install", ...args]);
  }
} else if (command === "package") {
  if (process.platform !== "darwin") {
    console.error("openleaf package currently creates a macOS .app bundle only.");
    process.exitCode = 1;
  } else {
    runNode("package-mac.mjs", args);
  }
} else if (command === "open") {
  if (process.platform !== "darwin") {
    console.error("openleaf open currently supports macOS only.");
    process.exitCode = 1;
  } else {
    const installedApp = "/Applications/Openleaf.app";
    const localApp = path.join(appRoot, "dist", "mac", "Openleaf.app");
    if (fs.existsSync(installedApp)) {
      openMacApp(installedApp);
    } else {
      if (!fs.existsSync(localApp)) runNode("package-mac.mjs", args);
      if (!process.exitCode) openMacApp(localApp);
    }
  }
} else if (command === "path" || command === "link") {
  const projects = readProjectStore();
  const target = String(args[0] || "");
  const match = command === "path"
    ? projects.find((project) => project.id === target.replace(/^openleaf:\/\/project\//, "").split(/[?#/]/)[0])
    : projects.find((project) => {
        const root = projectRoot(project);
        const resolved = path.resolve(target || ".");
        return resolved === root || resolved.startsWith(root + path.sep) || resolved === path.resolve(project.texPath);
      });
  if (!match) {
    console.error("No Openleaf project matches that.");
    process.exitCode = 1;
  } else if (command === "path") {
    console.log(projectRoot(match));
  } else {
    console.log(`openleaf://project/${match.id}`);
  }
} else if (command === "dev") {
  run("npm", ["run", "dev", ...args]);
} else {
  console.error(`Unknown command: ${command}\n`);
  printHelp();
  process.exitCode = 1;
}
