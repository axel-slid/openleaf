import { execFileSync } from "node:child_process";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(appRoot, "package.json"), "utf8"));
const productName = packageJson.productName || "Openleaf";
const bundleId = "com.openleaf.latex";
const distDir = path.join(appRoot, "dist", "mac");
const sourceElectronApp = path.join(appRoot, "node_modules", "electron", "dist", "Electron.app");
const appBundle = path.join(distDir, `${productName}.app`);
const resourcesDir = path.join(appBundle, "Contents", "Resources");
const appResourcesDir = path.join(resourcesDir, "app");
const sourceIcon = path.join(appRoot, "assets", "Openleaf.icns");
const sourcePngIcon = path.join(appRoot, "assets", "icon.png");
const install = process.argv.includes("--install");

function run(command, args, options = {}) {
  execFileSync(command, args, { stdio: "inherit", ...options });
}

function plist(command, plistPath) {
  run("/usr/libexec/PlistBuddy", ["-c", command, plistPath]);
}

function safeSetPlist(plistPath, key, value) {
  try {
    plist(`Set :${key} ${value}`, plistPath);
  } catch (error) {
    plist(`Add :${key} string ${value}`, plistPath);
  }
}

function ensureElectronTemplate() {
  if (fs.existsSync(sourceElectronApp)) return;
  console.log("Electron app template not found. Installing packaging dependencies...");
  run("npm", ["install", "--include=dev", "--ignore-scripts", "--no-audit", "--no-fund"], { cwd: appRoot });
  if (!fs.existsSync(sourceElectronApp)) {
    throw new Error("Electron app template was not found after installing dependencies.");
  }
}

function ensureAppIcons() {
  if (fs.existsSync(sourceIcon) && fs.existsSync(sourcePngIcon)) return;
  run("npm", ["run", "make:icons"], { cwd: appRoot });
}

async function copyAppSources() {
  await fsp.mkdir(appResourcesDir, { recursive: true });
  const entries = [
    "app.js",
    "index.html",
    "main.js",
    "preload.js",
    "styles.css",
    "package.json",
    "package-lock.json",
    "README.md",
    "assets",
    "docs",
    "scripts"
  ];

  for (const entry of entries) {
    const source = path.join(appRoot, entry);
    if (!fs.existsSync(source)) continue;
    const destination = path.join(appResourcesDir, entry);
    await fsp.cp(source, destination, { recursive: true });
  }
}

function writeMainPlist() {
  const plistPath = path.join(appBundle, "Contents", "Info.plist");
  safeSetPlist(plistPath, "CFBundleName", "Electron");
  safeSetPlist(plistPath, "CFBundleDisplayName", productName);
  safeSetPlist(plistPath, "CFBundleExecutable", "Electron");
  safeSetPlist(plistPath, "CFBundleIdentifier", bundleId);
  safeSetPlist(plistPath, "CFBundleShortVersionString", packageJson.version || "0.1.0");
  safeSetPlist(plistPath, "CFBundleVersion", packageJson.version || "0.1.0");
  safeSetPlist(plistPath, "CFBundleIconFile", "Openleaf.icns");
  safeSetPlist(plistPath, "LSApplicationCategoryType", "public.app-category.developer-tools");
  safeSetPlist(plistPath, "NSCameraUsageDescription", "Openleaf does not use the camera.");
  safeSetPlist(plistPath, "NSMicrophoneUsageDescription", "Openleaf does not use the microphone.");
}

async function main() {
  ensureElectronTemplate();

  ensureAppIcons();
  await fsp.rm(appBundle, { recursive: true, force: true });
  await fsp.mkdir(distDir, { recursive: true });
  run("ditto", [sourceElectronApp, appBundle]);

  await fsp.copyFile(sourceIcon, path.join(resourcesDir, "Openleaf.icns"));
  await fsp.rm(appResourcesDir, { recursive: true, force: true });
  await copyAppSources();
  const installMode = fs.existsSync(path.join(appResourcesDir, "package-lock.json")) ? "ci" : "install";
  run("npm", [installMode, "--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund"], { cwd: appResourcesDir });

  writeMainPlist();
  try {
    run("xattr", ["-dr", "com.apple.quarantine", appBundle]);
  } catch (error) {
  }
  try {
    run("codesign", ["--force", "--deep", "--sign", "-", appBundle]);
  } catch (error) {
    console.warn("Ad-hoc signing failed; the app bundle was still created.");
  }

  if (install) {
    const installedPath = path.join("/Applications", `${productName}.app`);
    await fsp.rm(installedPath, { recursive: true, force: true });
    run("ditto", [appBundle, installedPath]);
    run("xattr", ["-dr", "com.apple.quarantine", installedPath]);
    console.log(`Installed ${installedPath}`);
  }

  console.log(`Packaged ${appBundle}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
