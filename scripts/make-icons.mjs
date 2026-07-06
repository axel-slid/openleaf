import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(appRoot, "assets");
const svgPath = path.join(assetsDir, "icon.svg");
const pngPath = path.join(assetsDir, "icon.png");
const iconsetDir = path.join(assetsDir, "Openleaf.iconset");
const icnsPath = path.join(assetsDir, "Openleaf.icns");

function run(command, args, options = {}) {
  execFileSync(command, args, { stdio: "inherit", ...options });
}

function commandExists(command) {
  try {
    execFileSync("sh", ["-lc", `command -v ${command}`], { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

fs.mkdirSync(assetsDir, { recursive: true });
fs.rmSync(iconsetDir, { recursive: true, force: true });
fs.mkdirSync(iconsetDir, { recursive: true });

if (commandExists("rsvg-convert")) {
  run("rsvg-convert", ["-w", "1024", "-h", "1024", "-o", pngPath, svgPath]);
} else if (commandExists("magick")) {
  run("magick", ["-background", "none", svgPath, "-resize", "1024x1024", pngPath]);
} else {
  throw new Error("Install rsvg-convert or ImageMagick to render the app icon.");
}

const sizes = [
  [16, "icon_16x16.png"],
  [32, "icon_16x16@2x.png"],
  [32, "icon_32x32.png"],
  [64, "icon_32x32@2x.png"],
  [128, "icon_128x128.png"],
  [256, "icon_128x128@2x.png"],
  [256, "icon_256x256.png"],
  [512, "icon_256x256@2x.png"],
  [512, "icon_512x512.png"],
  [1024, "icon_512x512@2x.png"]
];

for (const [size, filename] of sizes) {
  run("sips", ["-z", String(size), String(size), pngPath, "--out", path.join(iconsetDir, filename)]);
}

run("iconutil", ["-c", "icns", iconsetDir, "-o", icnsPath]);
console.log(`Wrote ${icnsPath}`);
