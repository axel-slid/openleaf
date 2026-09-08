import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../main.js", import.meta.url), "utf8");
const handler = source.slice(source.indexOf("async function openProjectInTab("), source.indexOf("function closeWindow("));

function fixture({ missingProject = false, closedWindow = false } = {}) {
  const created = [];
  const sender = {};
  const parent = { isDestroyed: () => closedWindow };
  const context = vm.createContext({
    BrowserWindow: { fromWebContents: (webContents) => webContents === sender ? parent : null },
    async getProject(id) {
      if (missingProject) throw new Error("Project not found");
      return { id };
    },
    createWindow(options) { created.push(options); return { id: 42 }; }
  });
  vm.runInContext(handler, context);
  return { context, sender, parent, created };
}

test("opening a project tab targets the requesting window and requested project", async () => {
  const f = fixture();
  const result = await f.context.openProjectInTab({ sender: f.sender }, "project-two");
  assert.equal(result.windowId, 42);
  assert.equal(f.created.length, 1);
  assert.equal(f.created[0].projectId, "project-two");
  assert.equal(f.created[0].tabParent, f.parent);
});

test("a missing project cannot create an empty tab", async () => {
  const f = fixture({ missingProject: true });
  await assert.rejects(f.context.openProjectInTab({ sender: f.sender }, "missing"), /Project not found/);
  assert.equal(f.created.length, 0);
});

test("a closed requesting window cannot open an orphan tab", async () => {
  const f = fixture({ closedWindow: true });
  await assert.rejects(f.context.openProjectInTab({ sender: f.sender }, "project"), /no longer available/);
  assert.equal(f.created.length, 0);
});

test("Mac tabs use a native frame and Control-T creates a blank tab in the same group", () => {
  const windows = [];
  class FakeWindow {
    constructor(options) {
      this.options = options;
      this.events = new Map();
      this.webEvents = new Map();
      this.webContents = {
        id: windows.length + 1,
        once: (name, callback) => this.webEvents.set(name, callback),
        on: (name, callback) => this.webEvents.set(name, callback),
        setWindowOpenHandler() {}
      };
      windows.push(this);
    }
    on(name, callback) { this.events.set(name, callback); }
    once(name, callback) { this.events.set(name, callback); }
    loadFile(file, options) { this.loaded = { file, options }; }
    isDestroyed() { return false; }
    setBounds() {}
    show() {}
    focus() {}
    addTabbedWindow(window) { this.addedTab = window; }
  }
  const context = vm.createContext({
    BrowserWindow: FakeWindow, process: { platform: "darwin" },
    widestDisplayWindowBounds: () => ({ width: 1200, height: 800 }),
    fs: { existsSync: () => false }, appIconPngPath: "icon.png", app: {},
    path: { join: (...parts) => parts.join("/") }, __dirname: "/app",
    setTimeout: () => 1, clearTimeout() {}
  });
  vm.runInContext(source.slice(source.indexOf("function createWindow("), source.indexOf("function activeWindow()")), context);
  const first = context.createWindow();
  assert.equal(first.options.transparent, false);
  assert.equal(first.options.titleBarStyle, "default");
  assert.equal(first.options.tabbingIdentifier, "openleaf-projects");
  let prevented = false;
  first.webEvents.get("before-input-event")({ preventDefault() { prevented = true; } }, { type: "keyDown", key: "t", control: true });
  assert.equal(prevented, true);
  assert.equal(windows.length, 2);
  const second = windows[1];
  assert.equal(Object.keys(second.loaded.options.query).length, 0);
  second.events.get("ready-to-show")();
  assert.equal(first.addedTab, second);
  first.webEvents.get("before-input-event")({ preventDefault() { throw new Error("Ordinary typing was intercepted"); } }, { type: "keyDown", key: "t", control: false });
  assert.equal(windows.length, 2);
});
