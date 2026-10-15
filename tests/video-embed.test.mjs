import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { test } from "node:test";
const require = createRequire(import.meta.url);
const { parse, markup } = require("../video-embed.js");

test("YouTube watch, short, and embed links preserve useful start and end times", () => {
  const short = parse("https://youtu.be/ND2fa08vxkY?t=1m30s");
  assert.equal(short.start, 90);
  assert.equal(new URL(short.embedUrl).searchParams.get("start"), "90");
  assert.equal(parse("https://www.youtube.com/watch?v=ND2fa08vxkY&start=15&end=60").end, 60);
  assert.equal(parse("https://www.youtube.com/embed/ND2fa08vxkY?feature=oembed").id, short.id);
  assert.equal(parse("https://www.youtube-nocookie.com/embed/ND2fa08vxkY").id, short.id);
});

test("local video paths resolve against the document, and signed remote media URLs survive", () => {
  assert.equal(parse("media/demo.mp4", "file:///Users/alex/Documents/guide/index.html").url, "file:///Users/alex/Documents/guide/media/demo.mp4");
  assert.equal(parse("https://example.org/demo.webm?token=abc").url, "https://example.org/demo.webm?token=abc");
});

test("untrusted protocols, lookalike providers, and malformed video ids cannot become players", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,<script></script>", "https://youtube.com.evil.test/watch?v=ND2fa08vxkY", "https://user:pass@youtube.com/watch?v=ND2fa08vxkY", "https://youtube.com/watch?v=<script>", "https://example.org/page.html"]) {
    assert.equal(parse(value), null, value);
  }
});

test("captions and URLs are escaped rather than becoming document markup", () => {
  const html = markup('media/clip.mp4?x="&y=2', '<img src=x onerror="alert(1)">');
  assert.ok(html.includes("&lt;img"));
  assert.ok(html.includes("&quot;&amp;y=2"));
  assert.ok(!html.includes("<img"));
});
