// Typeset visual editor for .tex files. Renders the document body as LaTeX
// would lay it out (paper size, margins, font, numbering, math via KaTeX) and
// lets the user type directly on the page. Each paragraph, heading, and list
// item keeps its source range; only a block the user edits is serialized back
// to LaTeX, so untouched source is never rewritten. Constructs the editor
// doesn't model (citations, footnotes, unknown macros) become atomic chips
// that carry their exact source text.
//
// Shared app.js globals used here: editor, getSourceText, suppressSourceChange,
// handleSourceChanged, visualEditor, renderVisualFigure, renderVisualTable,
// parseFigureItem, parseTableItem.

const TYPESET_PAPERS = {
  letterpaper: [8.5, 11],
  a4paper: [8.27, 11.69],
  legalpaper: [8.5, 14],
  a5paper: [5.83, 8.27]
};
// Standard article text widths (pt) when geometry isn't loaded.
const TYPESET_DEFAULT_TEXTWIDTH_PT = { 10: 345, 11: 360, 12: 390 };
const TYPESET_PX_PER_IN = 96;
const TYPESET_PX_PER_PT = 96 / 72.27;

let typesetBlocks = [];
let typesetWriteTimer = 0;
let typesetResizeObserver = null;

function typesetLengthToPx(value) {
  const match = String(value || "").trim().match(/^(-?[\d.]+)\s*(in|cm|mm|pt|bp|em|ex)?$/);
  if (!match) return null;
  const number = Number(match[1]);
  const unit = match[2] || "pt";
  const factor = { in: 96, cm: 96 / 2.54, mm: 96 / 25.4, pt: TYPESET_PX_PER_PT, bp: 96 / 72, em: 10 * TYPESET_PX_PER_PT, ex: 4.3 * TYPESET_PX_PER_PT }[unit];
  return number * factor;
}

function typesetBraceArgument(text, openIndex) {
  if (text[openIndex] !== "{") return null;
  let depth = 0;
  for (let index = openIndex; index < text.length; index += 1) {
    const char = text[index];
    if (char === "\\") {
      index += 1;
      continue;
    }
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return { start: openIndex + 1, end: index, close: index + 1 };
    }
  }
  return null;
}

function typesetCommandArg(text, command) {
  const pattern = new RegExp(`\\\\${command}\\*?\\s*(?:\\[[^\\]]*\\])?\\s*\\{`);
  const match = pattern.exec(text);
  if (!match) return null;
  const arg = typesetBraceArgument(text, match.index + match[0].length - 1);
  return arg ? text.slice(arg.start, arg.end) : null;
}

function typesetPageSetup(preamble) {
  const classMatch = preamble.match(/\\documentclass\s*(?:\[([^\]]*)\])?\s*\{([^}]*)\}/);
  const options = (classMatch?.[1] || "").split(",").map((item) => item.trim());
  const fontPt = Number((options.find((item) => /^\d+pt$/.test(item)) || "10pt").replace("pt", "")) || 10;
  const paperName = options.find((item) => TYPESET_PAPERS[item]) || "letterpaper";
  let [paperWidthIn, paperHeightIn] = TYPESET_PAPERS[paperName];

  const geometryMatch = preamble.match(/\\usepackage\s*\[([^\]]*)\]\s*\{geometry\}/) || preamble.match(/\\geometry\s*\{([^}]*)\}/);
  const geometry = {};
  if (geometryMatch) {
    geometryMatch[1].split(",").forEach((pair) => {
      const [key, value] = pair.split("=").map((item) => item?.trim());
      if (TYPESET_PAPERS[key]) [paperWidthIn, paperHeightIn] = TYPESET_PAPERS[key];
      if (key && value) geometry[key] = value;
    });
  }
  const paperWidth = paperWidthIn * TYPESET_PX_PER_IN;
  const paperHeight = paperHeightIn * TYPESET_PX_PER_IN;
  const margin = typesetLengthToPx(geometry.margin);
  const hmargin = typesetLengthToPx(geometry.hmargin) ?? margin;
  const vmargin = typesetLengthToPx(geometry.vmargin) ?? margin;
  let left = typesetLengthToPx(geometry.left) ?? hmargin;
  let right = typesetLengthToPx(geometry.right) ?? hmargin;
  let top = typesetLengthToPx(geometry.top) ?? vmargin;
  let bottom = typesetLengthToPx(geometry.bottom) ?? vmargin;
  if (left == null || right == null) {
    const textWidth = (TYPESET_DEFAULT_TEXTWIDTH_PT[fontPt] || 345) * TYPESET_PX_PER_PT;
    left = left ?? (paperWidth - textWidth) / 2;
    right = right ?? (paperWidth - textWidth) / 2;
  }
  if (top == null) top = 1.5 * TYPESET_PX_PER_IN;
  if (bottom == null) bottom = 1.5 * TYPESET_PX_PER_IN;

  const mainFont = typesetCommandArg(preamble, "setmainfont");
  const usesTimes = /\\usepackage\s*(?:\[[^\]]*\])?\s*\{[^}]*\b(times|mathptmx|newtxtext|tgtermes)\b/.test(preamble);
  const usesSans = /\\renewcommand\s*\{?\\familydefault\}?\s*\{?\\sfdefault/.test(preamble);
  let fontFamily = '"KaTeX_Main", "Latin Modern Roman", "CMU Serif", "Times New Roman", serif';
  if (mainFont) fontFamily = `"${mainFont.replace(/"/g, "")}", ${fontFamily}`;
  else if (usesTimes) fontFamily = '"Times New Roman", Times, serif';
  else if (usesSans) fontFamily = '"Helvetica Neue", Helvetica, Arial, sans-serif';

  const parindent = /\\setlength\s*\{?\\parindent\}?\s*\{?\s*0\s*(pt|in|cm|mm|em)?\s*\}?/.test(preamble)
    ? 0
    : (typesetLengthToPx(preamble.match(/\\setlength\s*\{?\\parindent\}?\s*\{([^}]*)\}/)?.[1]) ?? 15 * TYPESET_PX_PER_PT);
  const parskipMatch = preamble.match(/\\setlength\s*\{?\\parskip\}?\s*\{([^}]*)\}/);
  const parskip = parskipMatch
    ? (typesetLengthToPx(parskipMatch[1].split(/\s+plus|\s+minus/)[0]) ?? 0)
    : (/\\usepackage\s*(?:\[[^\]]*\])?\s*\{parskip\}/.test(preamble) ? fontPt * 0.6 * TYPESET_PX_PER_PT : 0);

  return {
    fontPx: fontPt * TYPESET_PX_PER_PT,
    paperWidth,
    paperHeight,
    margins: { top, right, bottom, left },
    fontFamily,
    parindent,
    parskip,
    title: typesetCommandArg(preamble, "title"),
    author: typesetCommandArg(preamble, "author"),
    date: typesetCommandArg(preamble, "date")
  };
}

// ---- Inline LaTeX <-> DOM ----

const TYPESET_INLINE_COMMANDS = {
  textit: "em",
  emph: "em",
  textbf: "strong",
  underline: "u",
  texttt: "code",
  textsc: "span"
};

function typesetChip(raw, display, className = "") {
  const chip = document.createElement("span");
  chip.className = `typeset-chip ${className}`.trim();
  chip.contentEditable = "false";
  chip.dataset.tex = raw;
  chip.textContent = display;
  chip.title = raw;
  return chip;
}

function typesetMathChip(raw, tex, displayMode) {
  const span = document.createElement("span");
  span.className = displayMode ? "typeset-math display" : "typeset-math";
  span.contentEditable = "false";
  span.dataset.tex = raw;
  span.title = raw;
  try {
    window.katex.render(tex, span, { throwOnError: false, displayMode, strict: "ignore" });
  } catch (error) {
    span.textContent = raw;
  }
  return span;
}

function typesetPlainText(text) {
  return text
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/``/g, "“")
    .replace(/''/g, "”")
    .replace(/`/g, "‘")
    .replace(/'/g, "’")
    .replace(/~/g, " ");
}

// Parses inline LaTeX into DOM nodes appended to parent. Text keeps LaTeX's
// typographic substitutions; anything structural becomes a chip.
function typesetInline(source, parent) {
  let index = 0;
  let buffer = "";
  const flush = () => {
    if (buffer) parent.appendChild(document.createTextNode(typesetPlainText(buffer)));
    buffer = "";
  };
  while (index < source.length) {
    const char = source[index];
    if (char === "%") {
      const end = source.indexOf("\n", index);
      const stop = end === -1 ? source.length : end + 1;
      flush();
      parent.appendChild(typesetChip(source.slice(index, stop), "", "typeset-comment"));
      index = stop;
      continue;
    }
    if (char === "$") {
      const display = source[index + 1] === "$";
      const open = display ? 2 : 1;
      let close = index + open;
      while (close < source.length) {
        if (source[close] === "\\") {
          close += 2;
          continue;
        }
        if (source.startsWith(display ? "$$" : "$", close)) break;
        close += 1;
      }
      if (close < source.length) {
        flush();
        const raw = source.slice(index, close + open);
        parent.appendChild(typesetMathChip(raw, source.slice(index + open, close), display));
        index = close + open;
        continue;
      }
    }
    if (char === "\n") {
      buffer += " ";
      index += 1;
      continue;
    }
    if (char !== "\\") {
      buffer += char;
      index += 1;
      continue;
    }

    const next = source[index + 1] || "";
    if ("%&$#_{} ".includes(next)) {
      buffer += next === " " ? " " : next;
      index += 2;
      continue;
    }
    if (next === "(" || next === "[") {
      const closer = next === "(" ? "\\)" : "\\]";
      const close = source.indexOf(closer, index + 2);
      if (close !== -1) {
        flush();
        const raw = source.slice(index, close + 2);
        parent.appendChild(typesetMathChip(raw, source.slice(index + 2, close), next === "["));
        index = close + 2;
        continue;
      }
    }
    if (next === "\\") {
      flush();
      let end = index + 2;
      const optional = source.slice(end).match(/^\s*\[[^\]]*\]/);
      if (optional) end += optional[0].length;
      const chip = typesetChip(source.slice(index, end), "", "typeset-linebreak");
      parent.appendChild(chip);
      index = end;
      continue;
    }

    const nameMatch = source.slice(index + 1).match(/^[A-Za-z@]+\*?/);
    if (!nameMatch) {
      // Accent and spacing commands like \, \' \"; keep them atomic.
      flush();
      const raw = source.slice(index, index + 2 + (/[`'"^~=.]/.test(next) && source[index + 2] ? 1 : 0));
      parent.appendChild(typesetChip(raw, next === "," ? " " : raw.slice(-1), "typeset-symbol"));
      index += raw.length;
      continue;
    }
    const name = nameMatch[0];
    let cursor = index + 1 + name.length;
    const optionalMatch = source.slice(cursor).match(/^\s*\[[^\]]*\]/);
    const optional = optionalMatch ? optionalMatch[0] : "";
    const argStart = cursor + optional.length + (source.slice(cursor + optional.length).match(/^\s*/)?.[0].length || 0);
    const firstArg = source[argStart] === "{" ? typesetBraceArgument(source, argStart) : null;

    if (TYPESET_INLINE_COMMANDS[name] && firstArg && !optional) {
      flush();
      const element = document.createElement(TYPESET_INLINE_COMMANDS[name]);
      element.dataset.cmd = name;
      if (name === "textsc") element.style.fontVariant = "small-caps";
      typesetInline(source.slice(firstArg.start, firstArg.end), element);
      parent.appendChild(element);
      index = firstArg.close;
      continue;
    }

    // Everything else is atomic: collect the command and its arguments.
    let end = firstArg ? firstArg.close : cursor + optional.length;
    const args = firstArg ? [source.slice(firstArg.start, firstArg.end)] : [];
    while (firstArg && source[end] === "{") {
      const extra = typesetBraceArgument(source, end);
      if (!extra) break;
      args.push(source.slice(extra.start, extra.end));
      end = extra.close;
    }
    if (!firstArg) {
      const trailingSpace = source.slice(end).match(/^\{\}/);
      if (trailingSpace) end += 2;
    }
    flush();
    const raw = source.slice(index, end);
    parent.appendChild(typesetCommandChip(name, args, raw));
    index = end;
  }
  flush();
}

function typesetCommandChip(name, args, raw) {
  const plain = (value) => typesetPlainText(String(value || "").replace(/\\[a-zA-Z]+\*?\s*/g, "").replace(/[{}]/g, ""));
  if (name === "cite" || name === "citep" || name === "citet") return typesetChip(raw, `[${args[0] || "?"}]`, "typeset-cite");
  if (name === "ref" || name === "eqref" || name === "autoref" || name === "cref") return typesetChip(raw, name === "eqref" ? "(?)" : "?", "typeset-ref");
  if (name === "footnote") return typesetChip(raw, "*", "typeset-footnote");
  if (name === "label" || name === "index") return typesetChip(raw, "", "typeset-hidden");
  if (name === "url") return typesetChip(raw, args[0] || "", "typeset-link");
  if (name === "href") return typesetChip(raw, plain(args[1] || args[0]), "typeset-link");
  if (name === "LaTeX") return typesetChip(raw, "LaTeX", "typeset-logo");
  if (name === "TeX") return typesetChip(raw, "TeX", "typeset-logo");
  if (name === "today") return typesetChip(raw, new Date().toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" }));
  if (name === "hfill") return typesetChip(raw, "", "typeset-hfill");
  if (name === "noindent" || name === "par" || name === "centering" || name === "small" || name === "large") return typesetChip(raw, "", "typeset-hidden");
  if (args.length) return typesetChip(raw, plain(args[args.length - 1]), "typeset-macro");
  return typesetChip(raw, "", "typeset-hidden");
}

function typesetEscapeText(text) {
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([%&#_$])/g, "\\$1")
    .replace(/(?<!\\textbackslash)([{}])/g, "\\$1")
    .replace(/ /g, "~")
    .replace(/\u2029/g, "\n\n")
    .replace(/—/g, "---")
    .replace(/–/g, "--")
    .replace(/“/g, "``")
    .replace(/”/g, "''")
    .replace(/‘/g, "`")
    .replace(/’/g, "'");
}

// Serializes an edited block's DOM back to LaTeX.
function typesetSerialize(node) {
  let out = "";
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      out += typesetEscapeText(child.textContent);
      return;
    }
    if (!(child instanceof HTMLElement)) return;
    if (child.dataset.tex !== undefined) {
      out += child.dataset.tex;
      return;
    }
    const tag = child.tagName.toLowerCase();
    if (tag === "br") {
      out += "\n\n";
      return;
    }
    const command = child.dataset.cmd
      || (tag === "em" || tag === "i" ? "textit" : tag === "strong" || tag === "b" ? "textbf" : tag === "u" ? "underline" : tag === "code" ? "texttt" : "");
    const inner = typesetSerialize(child);
    if (command) out += `\\${command}{${inner}}`;
    else if (tag === "div" || tag === "p") out += `\n\n${inner}`;
    else out += inner;
  });
  return out;
}

// ---- Block parsing ----

const TYPESET_HEADINGS = { section: 1, subsection: 2, subsubsection: 3, paragraph: 4 };
const TYPESET_MATH_ENVS = /^(equation|align|gather|multline|eqnarray|displaymath|math|flalign|alignat)\*?$/;

function typesetFindEnvEnd(text, name, from) {
  const pattern = new RegExp(`\\\\(begin|end)\\{${name.replace("*", "\\*")}\\}`, "g");
  pattern.lastIndex = from;
  let depth = 1;
  let match;
  while ((match = pattern.exec(text))) {
    depth += match[1] === "begin" ? 1 : -1;
    if (depth === 0) return { start: match.index, end: match.index + match[0].length };
  }
  return null;
}

// Splits the document body into blocks with absolute source ranges.
function typesetParseBody(tex, bodyStart, bodyEnd) {
  const blocks = [];
  let index = bodyStart;
  let paragraphStart = -1;
  let noindent = false;

  const endParagraph = (end) => {
    if (paragraphStart < 0) return;
    let start = paragraphStart;
    let stop = end;
    while (start < stop && /\s/.test(tex[start])) start += 1;
    while (stop > start && /\s/.test(tex[stop - 1])) stop -= 1;
    if (stop > start) {
      let raw = tex.slice(start, stop);
      const leading = raw.match(/^\\noindent\b\s*/);
      if (leading) {
        noindent = true;
        start += leading[0].length;
        raw = raw.slice(leading[0].length);
      }
      const onlyComment = raw.split("\n").every((line) => /^\s*%/.test(line) || !line.trim());
      if (raw.trim() && !onlyComment) blocks.push({ type: "paragraph", start, end: stop, noindent });
    }
    noindent = false;
    paragraphStart = -1;
  };

  while (index < bodyEnd) {
    const rest = tex.slice(index, Math.min(bodyEnd, index + 400));

    if (tex[index] === "%") {
      const end = tex.indexOf("\n", index);
      const lineStart = tex.lastIndexOf("\n", index - 1) + 1;
      if (paragraphStart < 0 && !tex.slice(lineStart, index).trim()) {
        index = end === -1 ? bodyEnd : end + 1;
        continue;
      }
      index = end === -1 ? bodyEnd : end + 1;
      continue;
    }

    const blank = rest.match(/^\n[ \t]*\n/);
    if (blank) {
      endParagraph(index);
      index += blank[0].length;
      continue;
    }

    const heading = rest.match(/^\\(section|subsection|subsubsection|paragraph)(\*?)\s*(\[[^\]]*\])?\s*\{/);
    if (heading) {
      endParagraph(index);
      const arg = typesetBraceArgument(tex, index + heading[0].length - 1);
      if (arg) {
        blocks.push({ type: "heading", level: TYPESET_HEADINGS[heading[1]], starred: Boolean(heading[2]), start: arg.start, end: arg.end });
        index = arg.close;
        continue;
      }
    }

    if (rest.startsWith("\\maketitle")) {
      endParagraph(index);
      blocks.push({ type: "title", start: index, end: index + 10 });
      index += 10;
      continue;
    }

    const spacing = rest.match(/^\\(vspace\*?\{[^}]*\}|bigskip|medskip|smallskip|newpage|clearpage|pagebreak)/);
    if (spacing && paragraphStart < 0) {
      const kind = spacing[1].startsWith("vspace") ? "vspace" : spacing[1];
      const amount = kind === "vspace" ? typesetLengthToPx(spacing[1].match(/\{([^}]*)\}/)[1]) : null;
      blocks.push({ type: "space", kind, amount, start: index, end: index + spacing[0].length });
      index += spacing[0].length;
      continue;
    }

    const begin = rest.match(/^\\begin\{([^}]+)\}/);
    if (begin) {
      const name = begin[1];
      const close = typesetFindEnvEnd(tex, name, index + begin[0].length);
      if (close) {
        endParagraph(index);
        const innerStart = index + begin[0].length;
        if (name === "itemize" || name === "enumerate") {
          blocks.push({ type: "list", ordered: name === "enumerate", items: typesetListItems(tex, innerStart, close.start), start: index, end: close.end });
        } else if (TYPESET_MATH_ENVS.test(name)) {
          blocks.push({ type: "math", env: name, start: index, end: close.end });
        } else if (name === "figure" || name === "figure*") {
          blocks.push({ type: "figure", start: index, end: close.end });
        } else if (name === "table" || name === "table*") {
          blocks.push({ type: "table", start: index, end: close.end });
        } else if (name === "center" || name === "flushright" || name === "flushleft" || name === "quote" || name === "quotation" || name === "abstract") {
          blocks.push({ type: "container", env: name, children: typesetParseBody(tex, innerStart, close.start), start: index, end: close.end });
        } else {
          blocks.push({ type: "raw", start: index, end: close.end });
        }
        index = close.end;
        continue;
      }
    }

    const display = rest.match(/^(\\\[|\$\$)/);
    if (display && paragraphStart < 0) {
      const closer = display[1] === "$$" ? "$$" : "\\]";
      const close = tex.indexOf(closer, index + 2);
      if (close !== -1 && close < bodyEnd) {
        blocks.push({ type: "math", env: "display", start: index, end: close + 2 });
        index = close + 2;
        continue;
      }
    }

    if (paragraphStart < 0 && /\S/.test(tex[index])) paragraphStart = index;
    if (tex[index] === "\\") index += 2;
    else index += 1;
  }
  endParagraph(bodyEnd);
  return blocks;
}

function typesetListItems(tex, start, end) {
  const items = [];
  const pattern = /\\item\b\s*(\[[^\]]*\])?\s*/g;
  pattern.lastIndex = start;
  const marks = [];
  let match;
  while ((match = pattern.exec(tex)) && match.index < end) {
    // Skip items that belong to nested lists.
    const before = tex.slice(start, match.index);
    const depth = (before.match(/\\begin\{(itemize|enumerate)\}/g) || []).length - (before.match(/\\end\{(itemize|enumerate)\}/g) || []).length;
    if (depth === 0) marks.push({ index: match.index, contentStart: match.index + match[0].length, label: match[1] ? match[1].slice(1, -1) : "" });
  }
  marks.forEach((mark, position) => {
    let stop = position + 1 < marks.length ? marks[position + 1].index : end;
    while (stop > mark.contentStart && /\s/.test(tex[stop - 1])) stop -= 1;
    items.push({ start: mark.contentStart, end: stop, label: mark.label });
  });
  return items;
}

// ---- Rendering ----

function renderTypesetVisualEditor(tex) {
  const beginDoc = tex.indexOf("\\begin{document}");
  const endDoc = tex.lastIndexOf("\\end{document}");
  const bodyStart = beginDoc === -1 ? 0 : beginDoc + "\\begin{document}".length;
  const bodyEnd = endDoc === -1 ? tex.length : endDoc;
  const setup = typesetPageSetup(beginDoc === -1 ? "" : tex.slice(0, beginDoc));
  const blocks = typesetParseBody(tex, bodyStart, bodyEnd);
  typesetBlocks = [];

  visualEditor.innerHTML = "";
  visualEditor.classList.add("typeset-mode");
  const stack = document.createElement("div");
  stack.className = "typeset-stack";
  stack.style.setProperty("--typeset-font", setup.fontFamily);
  stack.style.setProperty("--typeset-size", `${setup.fontPx}px`);
  stack.style.setProperty("--typeset-parindent", `${setup.parindent}px`);
  stack.style.setProperty("--typeset-parskip", `${setup.parskip}px`);
  visualEditor.appendChild(stack);

  const flow = document.createElement("div");
  const counters = [0, 0, 0, 0];
  let equationNumber = 0;
  let afterHeading = true;

  const renderBlocks = (list, parent) => {
    list.forEach((block) => {
      const element = renderTypesetBlock(block, tex, setup, counters, () => ++equationNumber, afterHeading);
      if (!element) return;
      afterHeading = block.type === "heading" || block.type === "title";
      if (block.type === "container") {
        renderBlocks(block.children, element);
        afterHeading = false;
      }
      parent.appendChild(element);
    });
  };
  renderBlocks(blocks, flow);

  if (!flow.childElementCount) {
    const empty = document.createElement("p");
    empty.className = "typeset-paragraph";
    flow.appendChild(empty);
  }

  paginateTypeset(stack, flow, setup);
  fitTypesetPages(stack, setup);
  typesetResizeObserver?.disconnect();
  typesetResizeObserver = new ResizeObserver(() => fitTypesetPages(stack, setup));
  typesetResizeObserver.observe(visualEditor);
}

function renderTypesetBlock(block, tex, setup, counters, nextEquation, afterHeading) {
  if (block.type === "heading") {
    const heading = document.createElement(`h${Math.min(6, block.level + 1)}`);
    heading.className = `typeset-heading level-${block.level}`;
    if (!block.starred && block.level <= 3) {
      counters[block.level - 1] += 1;
      for (let level = block.level; level < counters.length; level += 1) counters[level] = 0;
      const number = document.createElement("span");
      number.className = "typeset-heading-number";
      number.contentEditable = "false";
      number.textContent = counters.slice(0, block.level).join(".");
      heading.appendChild(number);
    }
    const text = document.createElement("span");
    text.className = "typeset-heading-text";
    makeTypesetEditable(text, block, tex);
    heading.appendChild(text);
    return heading;
  }

  if (block.type === "paragraph") {
    const paragraph = document.createElement("p");
    paragraph.className = "typeset-paragraph";
    if (block.noindent || afterHeading) paragraph.classList.add("noindent");
    makeTypesetEditable(paragraph, block, tex);
    if (paragraph.querySelector(".typeset-hfill")) paragraph.classList.add("has-hfill");
    return paragraph;
  }

  if (block.type === "title") {
    const title = document.createElement("header");
    title.className = "typeset-title";
    [["title", setup.title], ["author", setup.author], ["date", setup.date ?? "\\today"]].forEach(([part, value]) => {
      if (value == null || !String(value).trim()) return;
      const line = document.createElement("div");
      line.className = `typeset-title-${part}`;
      typesetInline(value, line);
      title.appendChild(line);
    });
    return title;
  }

  if (block.type === "space") {
    const space = document.createElement("div");
    space.className = `typeset-space ${block.kind}`;
    const amounts = { bigskip: 12, medskip: 6, smallskip: 3 };
    if (block.kind === "vspace") space.style.height = `${Math.max(0, block.amount || 0)}px`;
    else if (amounts[block.kind]) space.style.height = `${amounts[block.kind] * TYPESET_PX_PER_PT}px`;
    else space.dataset.pagebreak = "true";
    return space;
  }

  if (block.type === "list") {
    const list = document.createElement(block.ordered ? "ol" : "ul");
    list.className = "typeset-list";
    block.items.forEach((item) => {
      const li = document.createElement("li");
      if (item.label) li.dataset.label = item.label;
      makeTypesetEditable(li, item, tex);
      list.appendChild(li);
    });
    return list;
  }

  if (block.type === "math") {
    const raw = tex.slice(block.start, block.end);
    const wrapper = document.createElement("div");
    wrapper.className = "typeset-display-math";
    wrapper.contentEditable = "false";
    wrapper.title = raw;
    let body = raw;
    let env = block.env;
    if (env === "display") body = raw.startsWith("$$") ? raw.slice(2, -2) : raw.slice(2, -2);
    else body = raw.replace(new RegExp(`^\\\\begin\\{${env.replace("*", "\\*")}\\}`), "").replace(new RegExp(`\\\\end\\{${env.replace("*", "\\*")}\\}$`), "");
    body = body.replace(/\\label\{[^}]*\}/g, "").replace(/\\nonumber|\\notag/g, "");
    const bare = env.replace("*", "");
    const katexBody = ["align", "flalign", "alignat", "eqnarray"].includes(bare) ? `\\begin{aligned}${body}\\end{aligned}` : bare === "gather" ? `\\begin{gathered}${body}\\end{gathered}` : body;
    const math = document.createElement("div");
    math.className = "typeset-display-math-body";
    try {
      window.katex.render(katexBody, math, { displayMode: true, throwOnError: false, strict: "ignore" });
    } catch (error) {
      math.textContent = raw;
    }
    wrapper.appendChild(math);
    if (env !== "display" && !env.endsWith("*") && env !== "displaymath" && env !== "math") {
      const number = document.createElement("span");
      number.className = "typeset-equation-number";
      number.textContent = `(${nextEquation()})`;
      wrapper.appendChild(number);
    }
    return wrapper;
  }

  if (block.type === "figure") {
    const element = renderVisualFigure(parseFigureItem(tex.slice(block.start, block.end)));
    element.classList.add("typeset-figure");
    element.contentEditable = "false";
    return element;
  }

  if (block.type === "table") {
    const element = renderVisualTable(parseTableItem(tex.slice(block.start, block.end), block.start));
    element.classList.add("typeset-table");
    return element;
  }

  if (block.type === "container") {
    const container = document.createElement("div");
    container.className = `typeset-container env-${block.env}`;
    if (block.env === "abstract") {
      const label = document.createElement("div");
      label.className = "typeset-abstract-label";
      label.textContent = "Abstract";
      container.appendChild(label);
    }
    return container;
  }

  if (block.type === "raw") {
    const raw = document.createElement("pre");
    raw.className = "typeset-raw";
    raw.contentEditable = "false";
    raw.textContent = tex.slice(block.start, block.end);
    return raw;
  }
  return null;
}

function makeTypesetEditable(element, block, tex) {
  element.contentEditable = "true";
  element.spellcheck = true;
  typesetInline(tex.slice(block.start, block.end), element);
  const record = { element, start: block.start, end: block.end, kind: element.tagName === "LI" ? "item" : element.classList.contains("typeset-heading-text") ? "heading" : "paragraph" };
  typesetBlocks.push(record);
  element.addEventListener("input", () => scheduleTypesetWrite(record));
  element.addEventListener("keydown", (event) => handleTypesetKeydown(event, record));
  element.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain").replace(/\r\n?/g, "\n").replace(/\n{2,}/g, "\u2029").replace(/\n/g, " ");
    document.execCommand("insertText", false, text);
  });
}

function handleTypesetKeydown(event, record) {
  const mod = event.metaKey || event.ctrlKey;
  if (mod && (event.key === "b" || event.key === "i")) {
    event.preventDefault();
    document.execCommand(event.key === "b" ? "bold" : "italic");
    scheduleTypesetWrite(record);
    return;
  }
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    if (record.kind !== "paragraph") return;
    // A paragraph break: write it to the source, then redraw so the new
    // paragraph becomes its own block with the caret at its start.
    document.execCommand("insertText", false, "\u2029");
    flushTypesetWrite(record);
    const caretOffset = record.start + typesetSerialize(record.element).split("\n\n")[0].length + 2;
    renderTypesetVisualEditor(getSourceText());
    focusTypesetAtSource(caretOffset);
  }
}

function scheduleTypesetWrite(record) {
  clearTimeout(typesetWriteTimer);
  typesetWriteTimer = setTimeout(() => flushTypesetWrite(record), 160);
}

function flushTypesetWrite(record) {
  clearTimeout(typesetWriteTimer);
  let replacement = typesetSerialize(record.element);
  if (record.kind !== "paragraph") replacement = replacement.replace(/\n{2,}/g, " ");
  const current = getSourceText();
  if (current.slice(record.start, record.end) === replacement) return;
  const from = editor.posFromIndex(record.start);
  const to = editor.posFromIndex(record.end);
  suppressSourceChange = true;
  editor.replaceRange(replacement, from, to, "+visual");
  const delta = replacement.length - (record.end - record.start);
  const oldStart = record.start;
  record.end = record.start + replacement.length;
  typesetBlocks.forEach((other) => {
    if (other !== record && other.start > oldStart) {
      other.start += delta;
      other.end += delta;
    }
  });
  handleSourceChanged({ renderVisual: false });
}

function focusTypesetAtSource(offset) {
  const target = typesetBlocks.find((record) => offset >= record.start && offset <= record.end + 2);
  if (!target) return;
  target.element.focus();
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(target.element);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

// Lays the flowed blocks onto pages of the document's text height. Blocks
// aren't split across pages; a block taller than a page gets its own page.
function paginateTypeset(stack, flow, setup) {
  const textHeight = setup.paperHeight - setup.margins.top - setup.margins.bottom;
  const makePage = () => {
    const page = document.createElement("article");
    page.className = "typeset-page";
    page.style.width = `${setup.paperWidth}px`;
    page.style.minHeight = `${setup.paperHeight}px`;
    page.style.padding = `${setup.margins.top}px ${setup.margins.right}px ${setup.margins.bottom}px ${setup.margins.left}px`;
    const body = document.createElement("div");
    body.className = "typeset-page-body";
    page.appendChild(body);
    stack.appendChild(page);
    return body;
  };
  let body = makePage();
  // Measure in place: move blocks one at a time and start a new page on overflow.
  Array.from(flow.children).forEach((block) => {
    if (block.dataset.pagebreak) {
      if (body.childElementCount) body = makePage();
      return;
    }
    body.appendChild(block);
    if (body.scrollHeight > textHeight + 1 && body.childElementCount > 1) {
      body.removeChild(block);
      body = makePage();
      body.appendChild(block);
    }
  });
  stack.querySelectorAll(".typeset-page").forEach((page, index) => {
    const number = document.createElement("div");
    number.className = "typeset-page-number";
    number.contentEditable = "false";
    number.textContent = String(index + 1);
    number.style.bottom = `${Math.max(18, setup.margins.bottom / 2 - 8)}px`;
    page.appendChild(number);
  });
}

function fitTypesetPages(stack, setup) {
  const available = visualEditor.clientWidth - 48;
  const scale = Math.max(0.4, Math.min(1.25, available / setup.paperWidth));
  stack.style.zoom = String(scale);
}
