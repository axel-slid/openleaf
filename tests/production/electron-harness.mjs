import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);

export class ElectronHarness {
  constructor(appRoot) {
    this.appRoot = appRoot;
    this.commandId = 0;
    this.pending = new Map();
    this.output = "";
    this.exceptions = [];
  }

  async start() {
    const startedAt = performance.now();
    this.testRoot = await fs.mkdtemp(path.join(os.tmpdir(), "openleaf-production-tests-"));
    this.port = 12000 + Math.floor(Math.random() * 2000);
    this.child = spawn(require("electron"), [
      `--remote-debugging-port=${this.port}`,
      `--user-data-dir=${path.join(this.testRoot, "user-data")}`,
      this.appRoot
    ], {
      cwd: this.appRoot,
      env: {
        ...process.env,
        OPENLEAF_SKIP_LATEX_CHECK: "1",
        OPENLEAF_PROJECT_LIBRARY_ROOT: path.join(this.testRoot, "project-library")
      },
      stdio: ["ignore", "pipe", "pipe"]
    });
    this.child.stdout.on("data", (chunk) => { this.output += chunk.toString(); });
    this.child.stderr.on("data", (chunk) => { this.output += chunk.toString(); });

    const tab = await this.waitForRenderer();
    this.socket = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Runtime.exceptionThrown") {
        this.exceptions.push(message.params?.exceptionDetails?.exception?.description
          || message.params?.exceptionDetails?.text
          || "Unknown renderer exception");
      }
      if (!message.id || !this.pending.has(message.id)) return;
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error || message.result?.exceptionDetails) {
        reject(new Error(JSON.stringify(message.error || message.result.exceptionDetails)));
      } else {
        resolve(message.result);
      }
    });
    await this.command("Runtime.enable");
    await this.waitForExpression("Boolean(window.localOverleaf && typeof openSettings === 'function')");
    this.startupMs = performance.now() - startedAt;
    return this;
  }

  async waitForRenderer(timeoutMs = 30_000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
      if (this.child.exitCode !== null) {
        throw new Error(`Openleaf exited before its renderer started.\n${this.output}`);
      }
      try {
        const response = await fetch(`http://127.0.0.1:${this.port}/json/list`);
        const tabs = await response.json();
        const renderer = tabs.find((item) => /index\.html(?:$|[?#])/i.test(item.url || ""));
        if (renderer) return renderer;
      } catch {
        // The debugging server is not listening yet.
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error(`Openleaf renderer did not start.\n${this.output}`);
  }

  command(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.commandId;
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  async evaluate(expression) {
    const result = await this.command("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    return result.result.value;
  }

  async waitForExpression(expression, timeoutMs = 10_000) {
    const started = Date.now();
    while (!(await this.evaluate(expression))) {
      if (Date.now() - started > timeoutMs) throw new Error(`Timed out waiting for: ${expression}`);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  async setViewport(width, height) {
    await this.command("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false
    });
    await this.evaluate("new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))");
  }

  async showState(state) {
    await this.evaluate(`(async () => {
      closeOverlayModals();
      projectScreen.hidden = false;
      editorScreen.hidden = true;
      presentationScreen.hidden = true;
      if (${JSON.stringify(state)} === "settings") openSettings();
      if (${JSON.stringify(state)} === "new-project") openNewProjectPanel();
      if (${JSON.stringify(state)} === "command-palette") openCommandPalette("");
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return true;
    })()`);
  }

  async capturePerceptualHash() {
    const screenshot = await this.command("Page.captureScreenshot", {
      format: "png",
      fromSurface: true,
      captureBeyondViewport: false
    });
    return this.evaluate(`(async () => {
      const image = new Image();
      image.src = ${JSON.stringify(`data:image/png;base64,${screenshot.data}`)};
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 17;
      canvas.height = 16;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, 17, 16);
      const pixels = context.getImageData(0, 0, 17, 16).data;
      let bits = "";
      for (let y = 0; y < 16; y += 1) {
        for (let x = 0; x < 16; x += 1) {
          const left = (y * 17 + x) * 4;
          const right = left + 4;
          const leftGray = pixels[left] * 0.299 + pixels[left + 1] * 0.587 + pixels[left + 2] * 0.114;
          const rightGray = pixels[right] * 0.299 + pixels[right + 1] * 0.587 + pixels[right + 2] * 0.114;
          bits += leftGray > rightGray ? "1" : "0";
        }
      }
      return Array.from({ length: 64 }, (_, index) => (
        Number.parseInt(bits.slice(index * 4, index * 4 + 4), 2).toString(16)
      )).join("");
    })()`);
  }

  async stop() {
    if (this.socket) this.socket.close();
    if (this.child && this.child.exitCode === null) {
      this.child.kill("SIGTERM");
      await Promise.race([
        new Promise((resolve) => this.child.once("exit", resolve)),
        new Promise((resolve) => setTimeout(resolve, 3000))
      ]);
    }
    if (this.testRoot) await fs.rm(this.testRoot, { recursive: true, force: true });
  }
}

export function hammingDistance(left, right) {
  if (left.length !== right.length) return Number.POSITIVE_INFINITY;
  let distance = 0;
  for (let index = 0; index < left.length; index += 1) {
    let value = Number.parseInt(left[index], 16) ^ Number.parseInt(right[index], 16);
    while (value) {
      distance += value & 1;
      value >>= 1;
    }
  }
  return distance;
}
