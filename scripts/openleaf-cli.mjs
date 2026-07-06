#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const command = String(process.argv[2] || "help").toLowerCase();
const args = process.argv.slice(3);

function run(commandName, commandArgs, options = {}) {
  const result = spawnSync(commandName, commandArgs, {
    cwd: appRoot,
    stdio: "inherit",
    ...options
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

Notes:
  macOS app installation is explicit on purpose. npm install will not silently
  write to /Applications; run openleaf install when you want that.
`);
}

if (command === "help" || command === "--help" || command === "-h") {
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
} else if (command === "dev") {
  run("npm", ["run", "dev", ...args]);
} else {
  console.error(`Unknown command: ${command}\n`);
  printHelp();
  process.exitCode = 1;
}
