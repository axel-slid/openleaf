import {execFileSync} from "node:child_process";
import {mkdtempSync, mkdirSync, renameSync, rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = process.env.OPENLEAF_WEBSITE_ROOT
  ? resolve(process.env.OPENLEAF_WEBSITE_ROOT)
  : resolve(projectRoot, "../../../../../../personal-website");
const outputDirectory = resolve(websiteRoot, "openleaf/motion");
const webmOutputPath = resolve(outputDirectory, "openleaf-digital-twin.webm");
const movOutputPath = resolve(outputDirectory, "openleaf-digital-twin-alpha.mov");
const mp4OutputPath = resolve(outputDirectory, "openleaf-digital-twin.mp4");
const posterOutputPath = resolve(outputDirectory, "openleaf-digital-twin-poster.png");
const renderDirectory = mkdtempSync(resolve(tmpdir(), "openleaf-remotion-"));
const renderedWebmPath = resolve(renderDirectory, "render.webm");
const silentWebmPath = resolve(renderDirectory, "openleaf-digital-twin.webm");
const silentMovPath = resolve(renderDirectory, "openleaf-digital-twin-alpha.mov");
const renderedMp4Path = resolve(renderDirectory, "render.mp4");
const silentMp4Path = resolve(renderDirectory, "openleaf-digital-twin.mp4");
const posterPath = resolve(renderDirectory, "openleaf-digital-twin-poster.png");
const remotion = resolve(projectRoot, "node_modules/.bin/remotion");

try {
  mkdirSync(outputDirectory, {recursive: true});
  execFileSync(
    remotion,
    [
      "render",
      "src/index.jsx",
      "OpenleafDemo",
      renderedWebmPath,
      "--codec=vp8",
      "--video-bitrate=6M",
      "--pixel-format=yuva420p",
      "--image-format=png",
      "--concurrency=4",
      "--overwrite",
      "--timeout=120000",
    ],
    {cwd: projectRoot, stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-i", renderedWebmPath, "-map", "0:v:0", "-c:v", "copy", "-an", "-y", silentWebmPath],
    {stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner", "-loglevel", "error", "-c:v", "libvpx", "-i", silentWebmPath,
      "-map", "0:v:0", "-vf", "format=bgra", "-c:v", "hevc_videotoolbox",
      "-alpha_quality", "0.95", "-b:v", "8M", "-tag:v", "hvc1", "-an",
      "-movflags", "+faststart", "-y", silentMovPath,
    ],
    {stdio: "inherit"},
  );
  execFileSync(
    remotion,
    [
      "render",
      "src/index.jsx",
      "OpenleafDemo",
      renderedMp4Path,
      "--codec=h264",
      "--video-bitrate=10M",
      "--pixel-format=yuv420p",
      '--props={"matteBackground":true}',
      "--concurrency=4",
      "--overwrite",
      "--timeout=120000",
    ],
    {cwd: projectRoot, stdio: "inherit"},
  );
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-i", renderedMp4Path, "-map", "0:v:0", "-c:v", "copy", "-an", "-movflags", "+faststart", "-y", silentMp4Path],
    {stdio: "inherit"},
  );
  execFileSync(
    remotion,
    ["still", "src/index.jsx", "OpenleafDemo", posterPath, "--frame=75", "--image-format=png", "--overwrite", "--timeout=120000"],
    {cwd: projectRoot, stdio: "inherit"},
  );
  renameSync(silentWebmPath, webmOutputPath);
  renameSync(silentMovPath, movOutputPath);
  renameSync(silentMp4Path, mp4OutputPath);
  renameSync(posterPath, posterOutputPath);
} finally {
  rmSync(renderDirectory, {recursive: true, force: true});
}
