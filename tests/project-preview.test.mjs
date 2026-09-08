import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../app.js", import.meta.url), "utf8");
const renderSource = source.slice(source.indexOf("async function renderProjectPreview("), source.indexOf("function cacheActiveProjectPreview("));

function fixture({ cachedFails = false, renderFails = false, disconnectOnRead = false, tile = false } = {}) {
  const calls = [];
  const preview = {
    children: [], dataset: {},
    replaceChildren(...children) { this.children = children; },
    querySelector() { return this.children[0]; },
    set innerHTML(value) { this.message = value; this.children = []; }
  };
  const card = tile ? preview : { querySelector: () => preview };
  card.matches = () => tile;
  card.isConnected = true;
  const project = { id: "example", name: "Example", pdfExists: true };
  const page = {
    getViewport: ({ scale }) => ({ width: 600 * scale, height: 800 * scale }),
    render(options) {
      calls.push(["render", options.background]);
      return { promise: renderFails ? Promise.reject(new Error("bad page")) : Promise.resolve() };
    }
  };
  const sandbox = {
    Uint8Array,
    document: { createElement: () => ({ getContext: () => ({}), toDataURL: (type) => `data:${type};base64,cG5n` }) },
    window: { localOverleaf: {
      async readPdf(...args) { calls.push(["read", ...args]); if (disconnectOnRead) card.isConnected = false; return new ArrayBuffer(1); },
      async cacheProjectPreview(...args) { calls.push(["cache", ...args]); return { previewImageUrl: "cached.png" }; },
      async cachePdfViewPreview(...args) { calls.push(["readingCache", ...args]); return { previewImageUrl: "cached.webp" }; }
    } },
    async loadPdfJs() { return { getDocument() {
      calls.push(["load"]);
      return {
        promise: Promise.resolve({ async getPage(n) { calls.push(["page", n]); return page; } }),
        async destroy() { calls.push(["destroy"]); }
      };
    } }; },
    previewImageElement(src) { return {
      src, classList: { add() {} },
      async decode() { if (cachedFails) throw new Error("stale cache"); }
    }; },
    formatError: (error) => error.message
  };
  vm.createContext(sandbox);
  vm.runInContext(renderSource, sandbox);
  return { calls, card, preview, project, run: () => sandbox.renderProjectPreview(card, project) };
}

test("missing thumbnails render only page one, display PNG, cache, and release PDF resources", async () => {
  const f = fixture();
  await f.run();
  assert.deepEqual(f.calls.map(([call]) => call), ["read", "load", "page", "render", "cache", "destroy"]);
  assert.deepEqual(f.calls.find(([call]) => call === "page"), ["page", 1]);
  assert.match(f.preview.children[0].src, /^data:image\/png;/);
  assert.equal(f.project.previewImageUrl, "cached.png");
});

test("cached previews skip PDF decoding and cannot stall offscreen on lazy loading", async () => {
  const f = fixture();
  f.project.previewImageUrl = "cached.png";
  await f.run();
  assert.deepEqual(f.calls, []);
  assert.equal(f.preview.children[0].loading, "eager");
});

test("a stale cached image regenerates from the PDF", async () => {
  const f = fixture({ cachedFails: true });
  f.project.previewImageUrl = "stale.png";
  await f.run();
  assert.match(f.preview.children[0].src, /^data:image\/png;/);
  assert.equal(f.project.previewImageUrl, "cached.png");
});

test("a project without a PDF does not start compilation or PDF rendering", async () => {
  const f = fixture();
  f.project.pdfExists = false;
  await f.run();
  assert.deepEqual(f.calls, []);
  assert.match(f.preview.message, /No PDF yet/);
});

test("failed page rendering frees resources and leaves an explicit fallback", async () => {
  const f = fixture({ renderFails: true, cachedFails: true });
  f.project.previewImageUrl = "stale.png";
  await f.run();
  assert.match(f.preview.message, /Preview unavailable/);
  assert.equal(f.calls.at(-1)[0], "destroy");
  assert.ok(!f.calls.some(([call]) => call === "cache"));
});

test("navigating away stops work before decoding a PDF", async () => {
  const f = fixture({ disconnectOnRead: true });
  await f.run();
  assert.deepEqual(f.calls.map(([call]) => call), ["read"]);
});

test("collection reading tiles use the selected reading and its separate cache", async () => {
  const f = fixture({ tile: true });
  f.project.previewRelativePath = "Readings/chapter.pdf";
  await f.run();
  assert.deepEqual(f.calls[0], ["read", "example", "Readings/chapter.pdf"]);
  assert.match(f.preview.children[0].src, /^data:image\/png;/);
  assert.ok(f.calls.some(([call]) => call === "readingCache"));
  assert.ok(!f.calls.some(([call]) => call === "cache"));
});
