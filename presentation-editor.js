const crypto = require("node:crypto");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { execFile } = require("node:child_process");
const JSZip = require("jszip");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");

const EMU_PER_INCH = 914400;
const LINE_EMU_PER_POINT = 12700;
const DRAWING_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";
const PRESENTATION_NS = "http://schemas.openxmlformats.org/presentationml/2006/main";
const OFFICE_RELATIONSHIPS_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const PACKAGE_RELATIONSHIPS_NS = "http://schemas.openxmlformats.org/package/2006/relationships";
const IMAGE_RELATIONSHIP_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
const SLIDE_RELATIONSHIP_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide";
const NOTES_SLIDE_RELATIONSHIP_TYPE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide";
const SLIDE_CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
const PRESENTATION_BACKGROUND_CACHE_VERSION = 2;
const PRESENTATION_LOCK_TIMEOUT_MS = 20000;
const PRESENTATION_LOCK_STALE_MS = 60000;
const PRESENTATION_MUTABLE_PROPERTIES = [
  "text",
  "richTextRuns",
  "x",
  "y",
  "cx",
  "cy",
  "fontSize",
  "fontFamily",
  "color",
  "fillColor",
  "lineColor",
  "lineWidth",
  "lineStyle",
  "bold",
  "italic",
  "underline",
  "align",
  "zIndex"
];
const parser = new DOMParser();
const serializer = new XMLSerializer();

function parseXml(xml) {
  return parser.parseFromString(String(xml || "").replace(/^\uFEFF/, ""), "application/xml");
}

function createOpenXmlElement(document, tagName) {
  const namespace = tagName.startsWith("p:") ? PRESENTATION_NS : DRAWING_NS;
  return document.createElementNS(namespace, tagName);
}

function execFileAsync(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(command, args, options, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || stdout || error.message));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

function presentationConverterPath() {
  const candidates = [
    "/Applications/LibreOffice.app/Contents/MacOS/soffice",
    "/usr/bin/libreoffice",
    "/usr/bin/soffice",
    "/opt/homebrew/bin/libreoffice",
    "/opt/homebrew/bin/soffice",
    "/usr/local/bin/libreoffice",
    "/usr/local/bin/soffice"
  ];
  return candidates.find((candidate) => {
    try {
      return fs.statSync(candidate).isFile();
    } catch (error) {
      return false;
    }
  }) || "";
}

function cacheKey(sourcePath) {
  return crypto.createHash("sha1").update(path.resolve(sourcePath)).digest("hex").slice(0, 18);
}

function presentationRevision(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function presentationValuesEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (left === undefined && right === undefined) return true;
  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch (error) {
    return false;
  }
}

function presentationChangeProperties(change) {
  if (!change || change.isNew) return PRESENTATION_MUTABLE_PROPERTIES.slice();
  if (change.deleted) return ["deleted"];
  if (Array.isArray(change.changedProperties) && change.changedProperties.length) {
    return [...new Set(change.changedProperties.filter((property) => (
      PRESENTATION_MUTABLE_PROPERTIES.includes(property)
    )))];
  }
  if (change.base && typeof change.base === "object") {
    return PRESENTATION_MUTABLE_PROPERTIES.filter((property) => (
      Object.prototype.hasOwnProperty.call(change, property)
      && !presentationValuesEqual(change[property], change.base[property])
    ));
  }
  return PRESENTATION_MUTABLE_PROPERTIES.filter((property) => (
    Object.prototype.hasOwnProperty.call(change, property)
  ));
}

function sparsePresentationChange(change) {
  if (!change || change.isNew || ["slide-background", "slide-transition", "slide-copy", "slide-order"].includes(change.type)) {
    return change;
  }
  const sparse = {
    slidePath: change.slidePath,
    id: change.id,
    name: change.name,
    type: change.type,
    shapeType: change.shapeType,
    isNew: false,
    deleted: Boolean(change.deleted)
  };
  presentationChangeProperties(change).forEach((property) => {
    if (property !== "deleted" && Object.prototype.hasOwnProperty.call(change, property)) {
      sparse[property] = change[property];
    }
  });
  return sparse;
}

async function withPresentationLock(sourcePath, operation) {
  const lockPath = path.join(path.dirname(sourcePath), `.${path.basename(sourcePath)}.openleaf.lock`);
  const started = Date.now();
  let handle = null;
  while (!handle) {
    try {
      handle = await fsp.open(lockPath, "wx");
      await handle.writeFile(JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }), "utf8");
    } catch (error) {
      if (error.code !== "EEXIST") throw error;
      const stat = await fsp.stat(lockPath).catch(() => null);
      if (stat && Date.now() - stat.mtimeMs > PRESENTATION_LOCK_STALE_MS) {
        await fsp.rm(lockPath, { force: true }).catch(() => {});
        continue;
      }
      if (Date.now() - started >= PRESENTATION_LOCK_TIMEOUT_MS) {
        throw new Error("Another OpenLeaf editor is still saving this poster. Try again in a moment.");
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  try {
    return await operation();
  } finally {
    await handle.close().catch(() => {});
    await fsp.rm(lockPath, { force: true }).catch(() => {});
  }
}

function elementChildren(node) {
  return Array.from(node && node.childNodes ? node.childNodes : []).filter((child) => child.nodeType === 1);
}

function directChildByTag(node, tagName) {
  return elementChildren(node).find((child) => child.tagName === tagName) || null;
}

function firstByTag(node, tagName) {
  return node && node.getElementsByTagName ? node.getElementsByTagName(tagName)[0] || null : null;
}

function allByTag(node, tagName) {
  return node && node.getElementsByTagName ? Array.from(node.getElementsByTagName(tagName)) : [];
}

function numberAttr(node, name, fallback = 0) {
  const value = Number(node && node.getAttribute ? node.getAttribute(name) : NaN);
  return Number.isFinite(value) ? value : fallback;
}

function boolAttr(node, name) {
  return ["1", "true"].includes(String(node && node.getAttribute ? node.getAttribute(name) : "").toLowerCase());
}

function textColorFromProperties(properties) {
  for (const property of properties) {
    const solidFill = firstByTag(property, "a:solidFill");
    const srgb = firstByTag(solidFill, "a:srgbClr");
    if (srgb && srgb.getAttribute("val")) return `#${srgb.getAttribute("val")}`;
  }
  return "#1f2937";
}

function directTextColor(property) {
  const solidFill = directChildByTag(property, "a:solidFill");
  const srgb = directChildByTag(solidFill, "a:srgbClr");
  return srgb && srgb.getAttribute("val") ? `#${srgb.getAttribute("val")}` : "";
}

function textRunStyle(properties, fallback) {
  const candidates = properties.filter(Boolean);
  const attributeValue = (name) => {
    const property = candidates.find((candidate) => candidate.hasAttribute && candidate.hasAttribute(name));
    return property ? property.getAttribute(name) : null;
  };
  const fontProperty = candidates.find((candidate) => directChildByTag(candidate, "a:latin"));
  const latin = fontProperty ? directChildByTag(fontProperty, "a:latin") : null;
  const color = candidates.map(directTextColor).find(Boolean) || fallback.color;
  const size = attributeValue("sz");
  const bold = attributeValue("b");
  const italic = attributeValue("i");
  const underline = attributeValue("u");
  return {
    fontSize: Math.max(6, Number.isFinite(Number(size)) ? Number(size) / 100 : fallback.fontSize),
    fontFamily: (latin && latin.getAttribute("typeface")) || fallback.fontFamily,
    color,
    bold: bold === null ? Boolean(fallback.bold) : ["1", "true"].includes(String(bold).toLowerCase()),
    italic: italic === null ? Boolean(fallback.italic) : ["1", "true"].includes(String(italic).toLowerCase()),
    underline: underline === null ? Boolean(fallback.underline) : Boolean(underline && underline !== "none")
  };
}

function mergeRichTextRuns(runs) {
  const merged = [];
  runs.filter((run) => run && run.text !== "").forEach((run) => {
    const normalized = {
      text: String(run.text || ""),
      fontSize: Number(run.fontSize) || 18,
      fontFamily: run.fontFamily || "Aptos",
      color: run.color || "#1f2937",
      bold: Boolean(run.bold),
      italic: Boolean(run.italic),
      underline: Boolean(run.underline)
    };
    const previous = merged[merged.length - 1];
    const sameStyle = previous
      && previous.fontSize === normalized.fontSize
      && previous.fontFamily === normalized.fontFamily
      && previous.color === normalized.color
      && previous.bold === normalized.bold
      && previous.italic === normalized.italic
      && previous.underline === normalized.underline;
    if (sameStyle) previous.text += normalized.text;
    else merged.push(normalized);
  });
  return merged;
}

function parseRichTextRuns(textBody, paragraphs, fallbackStyle) {
  const runs = [];
  paragraphs.forEach((paragraph, paragraphIndex) => {
    const paragraphProperties = directChildByTag(paragraph, "a:pPr");
    const defaultProperties = directChildByTag(paragraphProperties, "a:defRPr");
    let paragraphHasText = false;
    elementChildren(paragraph).forEach((child) => {
      if (!["a:r", "a:fld", "a:br"].includes(child.tagName)) return;
      const runProperties = directChildByTag(child, "a:rPr");
      const style = textRunStyle([runProperties, defaultProperties], fallbackStyle);
      if (child.tagName === "a:br") {
        runs.push({ text: "\n", ...style });
        paragraphHasText = true;
        return;
      }
      const textNode = directChildByTag(child, "a:t");
      const runText = textNode ? textNode.textContent || "" : "";
      if (!runText) return;
      runs.push({ text: runText, ...style });
      paragraphHasText = true;
    });
    if (!paragraphHasText) {
      const paragraphText = allByTag(paragraph, "a:t").map((node) => node.textContent || "").join("");
      if (paragraphText) runs.push({ text: paragraphText, ...fallbackStyle });
    }
    if (paragraphIndex < paragraphs.length - 1) {
      const breakStyle = runs[runs.length - 1] || fallbackStyle;
      runs.push({ ...breakStyle, text: "\n" });
    }
  });
  return mergeRichTextRuns(runs);
}

function shapeFillColor(shapeNode) {
  const spPr = firstByTag(shapeNode, "p:spPr");
  if (!spPr) return "";
  const directFill = elementChildren(spPr).find((child) => child.tagName === "a:solidFill");
  const srgb = firstByTag(directFill, "a:srgbClr");
  return srgb && srgb.getAttribute("val") ? `#${srgb.getAttribute("val")}` : "";
}

function shapeLineProperties(shapeNode) {
  const spPr = firstByTag(shapeNode, "p:spPr");
  const line = spPr ? directChildByTag(spPr, "a:ln") : null;
  if (!line) return { lineColor: "", lineWidth: 0, lineStyle: "solid" };
  const noFill = directChildByTag(line, "a:noFill");
  const solidFill = directChildByTag(line, "a:solidFill");
  const srgb = directChildByTag(solidFill, "a:srgbClr");
  const dash = directChildByTag(line, "a:prstDash");
  const rawDash = dash ? dash.getAttribute("val") : "solid";
  const lineStyle = ["sysDot", "dot"].includes(rawDash)
    ? "dot"
    : ["sysDash", "dash", "lgDash"].includes(rawDash)
      ? "dash"
      : ["dashDot", "lgDashDot", "sysDashDot"].includes(rawDash)
        ? "dashDot"
        : "solid";
  const width = numberAttr(line, "w", LINE_EMU_PER_POINT) / LINE_EMU_PER_POINT;
  return {
    lineColor: srgb && srgb.getAttribute("val") ? `#${srgb.getAttribute("val")}` : "",
    lineWidth: noFill ? 0 : Math.max(0, width),
    lineStyle
  };
}

function shapeTransform(shapeNode) {
  const transform = firstByTag(firstByTag(shapeNode, "p:spPr"), "a:xfrm")
    || firstByTag(shapeNode, "p:xfrm")
    || firstByTag(shapeNode, "a:xfrm");
  const offset = firstByTag(transform, "a:off");
  const extent = firstByTag(transform, "a:ext");
  return {
    x: numberAttr(offset, "x"),
    y: numberAttr(offset, "y"),
    cx: Math.max(1, numberAttr(extent, "cx", EMU_PER_INCH)),
    cy: Math.max(1, numberAttr(extent, "cy", EMU_PER_INCH)),
    rotation: numberAttr(transform, "rot") / 60000
  };
}

function shapeType(shapeNode, hasTextBody, text) {
  if (shapeNode.tagName === "p:pic") return "image";
  if (shapeNode.tagName === "p:graphicFrame") return "graphic";
  if (shapeNode.tagName === "p:cxnSp") return "line";
  if (hasTextBody || text) return "text";
  return "shape";
}

function presetGeometry(shapeNode) {
  const geometry = firstByTag(firstByTag(shapeNode, "p:spPr"), "a:prstGeom");
  return geometry && geometry.getAttribute("prst") ? geometry.getAttribute("prst") : "";
}

function slideBackgroundColor(document) {
  const background = firstByTag(document, "p:bg");
  const srgb = firstByTag(background, "a:srgbClr");
  return srgb && srgb.getAttribute("val") ? `#${srgb.getAttribute("val")}` : "";
}

function slideTransitionType(document) {
  const transition = firstByTag(document, "p:transition");
  const effect = elementChildren(transition)[0];
  return effect ? effect.tagName.replace(/^p:/, "") : "";
}

function parseShape(shapeNode, zIndex) {
  const metadata = firstByTag(shapeNode, "p:cNvPr");
  if (!metadata) return null;
  const id = metadata.getAttribute("id") || `${zIndex + 1}`;
  const name = metadata.getAttribute("name") || `${shapeNode.tagName} ${id}`;
  const textBody = firstByTag(shapeNode, "p:txBody");
  const paragraphs = textBody ? allByTag(textBody, "a:p") : [];
  const text = paragraphs.map((paragraph) => (
    allByTag(paragraph, "a:t").map((node) => node.textContent || "").join("")
  )).join("\n");
  const runProperties = textBody
    ? [...allByTag(textBody, "a:rPr"), ...allByTag(textBody, "a:defRPr"), ...allByTag(textBody, "a:endParaRPr")]
    : [];
  const primaryProperties = runProperties.find((node) => node.hasAttribute("sz")) || runProperties[0] || null;
  const paragraphProperties = textBody ? firstByTag(textBody, "a:pPr") : null;
  const bodyProperties = textBody ? firstByTag(textBody, "a:bodyPr") : null;
  const latin = primaryProperties ? firstByTag(primaryProperties, "a:latin") : null;
  const transform = shapeTransform(shapeNode);
  const lineProperties = shapeLineProperties(shapeNode);
  const fallbackStyle = {
    fontSize: Math.max(6, numberAttr(primaryProperties, "sz", 1800) / 100),
    fontFamily: (latin && latin.getAttribute("typeface")) || "Aptos",
    color: textColorFromProperties(runProperties),
    bold: boolAttr(primaryProperties, "b"),
    italic: boolAttr(primaryProperties, "i"),
    underline: Boolean(primaryProperties && primaryProperties.getAttribute("u") && primaryProperties.getAttribute("u") !== "none")
  };

  return {
    id: String(id),
    name,
    type: shapeType(shapeNode, Boolean(textBody), text),
    shapeType: presetGeometry(shapeNode),
    tagName: shapeNode.tagName,
    zIndex,
    text,
    hasTextBody: Boolean(textBody),
    x: transform.x,
    y: transform.y,
    cx: transform.cx,
    cy: transform.cy,
    rotation: transform.rotation,
    fontSize: fallbackStyle.fontSize,
    fontFamily: fallbackStyle.fontFamily,
    color: fallbackStyle.color,
    fillColor: shapeFillColor(shapeNode),
    lineColor: lineProperties.lineColor,
    lineWidth: lineProperties.lineWidth,
    lineStyle: lineProperties.lineStyle,
    bold: fallbackStyle.bold,
    italic: fallbackStyle.italic,
    underline: fallbackStyle.underline,
    richTextRuns: textBody ? parseRichTextRuns(textBody, paragraphs, fallbackStyle) : [],
    align: (paragraphProperties && paragraphProperties.getAttribute("algn")) || "l",
    verticalAlign: (bodyProperties && bodyProperties.getAttribute("anchor")) || "t",
    marginLeft: numberAttr(bodyProperties, "lIns", 91440),
    marginRight: numberAttr(bodyProperties, "rIns", 91440),
    marginTop: numberAttr(bodyProperties, "tIns", 45720),
    marginBottom: numberAttr(bodyProperties, "bIns", 45720)
  };
}

function relationshipsMap(xml) {
  const document = parseXml(xml);
  const relationships = {};
  allByTag(document, "Relationship").forEach((relationship) => {
    relationships[relationship.getAttribute("Id")] = relationship.getAttribute("Target");
  });
  return relationships;
}

function normalizeZipTarget(basePath, target) {
  if (String(target || "").startsWith("/")) return String(target).replace(/^\/+/, "");
  return path.posix.normalize(path.posix.join(path.posix.dirname(basePath), target)).replace(/^\/+/, "");
}

function imageMediaTypeFromPath(filePath) {
  const extension = path.posix.extname(String(filePath || "")).toLowerCase();
  if ([".jpg", ".jpeg", ".jpe"].includes(extension)) return "image/jpeg";
  if (extension === ".gif") return "image/gif";
  if (extension === ".webp") return "image/webp";
  if (extension === ".svg") return "image/svg+xml";
  if (extension === ".bmp") return "image/bmp";
  if ([".tif", ".tiff"].includes(extension)) return "image/tiff";
  return "image/png";
}

async function hydratePresentationImages(zip, slidePath, shapeNodes, elements) {
  const relationshipsPath = slideRelationshipsPath(slidePath);
  const relationshipsFile = zip.file(relationshipsPath);
  if (!relationshipsFile) return;
  const relationships = relationshipsMap(await relationshipsFile.async("string"));

  await Promise.all(shapeNodes.map(async (shapeNode, index) => {
    const element = elements[index];
    if (!element || element.type !== "image") return;
    const blip = firstByTag(shapeNode, "a:blip");
    const relationshipId = blip && (
      blip.getAttribute("r:embed")
      || blip.getAttributeNS(OFFICE_RELATIONSHIPS_NS, "embed")
    );
    const target = relationshipId ? relationships[relationshipId] : "";
    const mediaPath = target ? normalizeZipTarget(slidePath, target) : "";
    const mediaFile = mediaPath ? zip.file(mediaPath) : null;
    if (!mediaFile) return;
    const mediaType = imageMediaTypeFromPath(mediaPath);
    element.imageData = `data:${mediaType};base64,${await mediaFile.async("base64")}`;
    element.imageFileName = path.posix.basename(mediaPath);
    element.imageMediaType = mediaType;
    element.imageRelationshipId = relationshipId;
    element.imagePath = mediaPath;
  }));
}

async function presentationStructure(zip) {
  const presentationXml = await zip.file("ppt/presentation.xml").async("string");
  const presentationDocument = parseXml(presentationXml);
  const slideSize = firstByTag(presentationDocument, "p:sldSz");
  const width = numberAttr(slideSize, "cx", 12192000);
  const height = numberAttr(slideSize, "cy", 6858000);
  const relationshipXml = await zip.file("ppt/_rels/presentation.xml.rels").async("string");
  const relationships = relationshipsMap(relationshipXml);
  const slideIds = allByTag(presentationDocument, "p:sldId");
  const slidePaths = slideIds.map((slideId) => {
    const relationshipId = slideId.getAttribute("r:id");
    return normalizeZipTarget("ppt/presentation.xml", relationships[relationshipId] || "");
  }).filter(Boolean);
  return { width, height, slidePaths };
}

async function parsePresentationModel(zip, sourcePath, { hydrateImages = true } = {}) {
  const structure = await presentationStructure(zip);
  const slides = [];

  for (let index = 0; index < structure.slidePaths.length; index += 1) {
    const slidePath = structure.slidePaths[index];
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;
    const xml = await slideFile.async("string");
    const document = parseXml(xml);
    const shapeTree = firstByTag(document, "p:spTree");
    const shapeNodes = elementChildren(shapeTree).filter((node) => (
      ["p:sp", "p:pic", "p:graphicFrame", "p:cxnSp", "p:grpSp"].includes(node.tagName)
    ));
    const parsedElements = shapeNodes.map(parseShape);
    if (hydrateImages) await hydratePresentationImages(zip, slidePath, shapeNodes, parsedElements);
    const elements = parsedElements.filter(Boolean);
    const titleElement = elements.find((element) => element.type === "text" && element.text.trim());
    slides.push({
      index,
      number: index + 1,
      path: slidePath,
      previewPageIndex: index,
      title: titleElement ? titleElement.text.trim().slice(0, 100) : `Slide ${index + 1}`,
      backgroundColor: slideBackgroundColor(document),
      transition: slideTransitionType(document),
      elements
    });
  }

  return {
    sourcePath,
    fileName: path.basename(sourcePath),
    width: structure.width,
    height: structure.height,
    widthInches: structure.width / EMU_PER_INCH,
    heightInches: structure.height / EMU_PER_INCH,
    slides
  };
}

async function blankSlideText(zip, slidePaths) {
  for (const slidePath of slidePaths) {
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;
    const document = parseXml(await slideFile.async("string"));
    const shapeTree = firstByTag(document, "p:spTree");
    // Pictures are rendered in the editable HTML layer. Leaving them in the
    // PDF background creates a stationary duplicate when the user drags one.
    elementChildren(shapeTree)
      .filter((node) => node.tagName === "p:pic")
      .forEach((pictureNode) => shapeTree.removeChild(pictureNode));
    elementChildren(shapeTree).filter((node) => node.tagName === "p:sp").forEach((shapeNode) => {
      const textBody = firstByTag(shapeNode, "p:txBody");
      allByTag(textBody, "a:t").forEach((textNode) => {
        textNode.textContent = "";
      });
    });
    zip.file(slidePath, serializer.serializeToString(document));
  }
}

async function ensurePresentationPdfs(sourcePath, cacheRoot) {
  const sourceStat = await fsp.stat(sourcePath);
  const editorCache = path.join(cacheRoot, cacheKey(sourcePath));
  const manifestPath = path.join(editorCache, "manifest.json");
  const previewPptxPath = path.join(editorCache, "preview.pptx");
  const previewPdfPath = path.join(editorCache, "preview.pdf");
  const backgroundPptxPath = path.join(editorCache, "background.pptx");
  const backgroundPdfPath = path.join(editorCache, "background.pdf");
  let manifest = null;
  try {
    manifest = JSON.parse(await fsp.readFile(manifestPath, "utf8"));
  } catch (error) {
    manifest = null;
  }
  if (
    manifest
    && manifest.backgroundCacheVersion === PRESENTATION_BACKGROUND_CACHE_VERSION
    && manifest.sourceMtimeMs === sourceStat.mtimeMs
    && manifest.sourceSize === sourceStat.size
    && fs.existsSync(previewPdfPath)
    && fs.existsSync(backgroundPdfPath)
  ) {
    return { previewPdfPath, backgroundPdfPath };
  }

  const converter = presentationConverterPath();
  if (!converter) throw new Error("Editable PowerPoint projects require LibreOffice for slide rendering.");
  await fsp.rm(editorCache, { recursive: true, force: true });
  await fsp.mkdir(editorCache, { recursive: true });

  const zip = await JSZip.loadAsync(await fsp.readFile(sourcePath));
  const structure = await presentationStructure(zip);
  await fsp.copyFile(sourcePath, previewPptxPath);
  await blankSlideText(zip, structure.slidePaths);
  await fsp.writeFile(backgroundPptxPath, await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  }));

  const profileDir = path.join(os.tmpdir(), `openleaf-libreoffice-profile-${process.pid}-${Date.now()}`);
  await fsp.mkdir(profileDir, { recursive: true });
  try {
    await execFileAsync(converter, [
      `-env:UserInstallation=${pathToFileURL(profileDir).href}`,
      "--headless",
      "--convert-to",
      "pdf:impress_pdf_Export",
      "--outdir",
      editorCache,
      previewPptxPath,
      backgroundPptxPath
    ], {
      timeout: 180000,
      maxBuffer: 1024 * 1024 * 8
    });
    const conversionDeadline = Date.now() + 30000;
    while (
      Date.now() < conversionDeadline
      && (!fs.existsSync(previewPdfPath) || !fs.existsSync(backgroundPdfPath))
    ) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } finally {
    await fsp.rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }
  if (!fs.existsSync(previewPdfPath)) throw new Error("LibreOffice did not create the full-fidelity slide previews.");
  if (!fs.existsSync(backgroundPdfPath)) throw new Error("LibreOffice did not create the editable slide background.");
  await fsp.writeFile(manifestPath, JSON.stringify({
    backgroundCacheVersion: PRESENTATION_BACKGROUND_CACHE_VERSION,
    sourceMtimeMs: sourceStat.mtimeMs,
    sourceSize: sourceStat.size
  }, null, 2), "utf8");
  return { previewPdfPath, backgroundPdfPath };
}

async function loadPresentationEditor(sourcePath, cacheRoot) {
  const sourceBuffer = await fsp.readFile(sourcePath);
  const revision = presentationRevision(sourceBuffer);
  const zip = await JSZip.loadAsync(sourceBuffer);
  const [presentation, pdfPaths] = await Promise.all([
    parsePresentationModel(zip, sourcePath),
    ensurePresentationPdfs(sourcePath, cacheRoot)
  ]);
  presentation.revision = revision;
  const [pdf, thumbnailPdf] = await Promise.all([
    fsp.readFile(pdfPaths.backgroundPdfPath),
    fsp.readFile(pdfPaths.previewPdfPath)
  ]);
  return {
    presentation,
    pdf: pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength),
    thumbnailPdf: thumbnailPdf.buffer.slice(thumbnailPdf.byteOffset, thumbnailPdf.byteOffset + thumbnailPdf.byteLength)
  };
}

function findShapeById(document, id) {
  const shapeTree = firstByTag(document, "p:spTree");
  return elementChildren(shapeTree).find((shapeNode) => {
    const metadata = firstByTag(shapeNode, "p:cNvPr");
    return metadata && String(metadata.getAttribute("id")) === String(id);
  }) || null;
}

function setTransform(shapeNode, change) {
  const transform = firstByTag(firstByTag(shapeNode, "p:spPr"), "a:xfrm")
    || firstByTag(shapeNode, "p:xfrm")
    || firstByTag(shapeNode, "a:xfrm");
  if (!transform) return;
  const offset = firstByTag(transform, "a:off");
  const extent = firstByTag(transform, "a:ext");
  if (offset) {
    if (Number.isFinite(change.x)) offset.setAttribute("x", String(Math.round(change.x)));
    if (Number.isFinite(change.y)) offset.setAttribute("y", String(Math.round(change.y)));
  }
  if (extent) {
    if (Number.isFinite(change.cx)) extent.setAttribute("cx", String(Math.max(1, Math.round(change.cx))));
    if (Number.isFinite(change.cy)) extent.setAttribute("cy", String(Math.max(1, Math.round(change.cy))));
  }
}

function ensureTextProperties(document, textBody) {
  let properties = [
    ...allByTag(textBody, "a:rPr"),
    ...allByTag(textBody, "a:defRPr"),
    ...allByTag(textBody, "a:endParaRPr")
  ];
  if (properties.length) return properties;
  let paragraph = firstByTag(textBody, "a:p");
  if (!paragraph) {
    paragraph = createOpenXmlElement(document, "a:p");
    textBody.appendChild(paragraph);
  }
  let paragraphProperties = firstByTag(paragraph, "a:pPr");
  if (!paragraphProperties) {
    paragraphProperties = createOpenXmlElement(document, "a:pPr");
    paragraph.insertBefore(paragraphProperties, paragraph.firstChild);
  }
  const defaultProperties = createOpenXmlElement(document, "a:defRPr");
  paragraphProperties.appendChild(defaultProperties);
  return [defaultProperties];
}

function setTextColor(document, property, color) {
  elementChildren(property).filter((child) => child.tagName === "a:solidFill").forEach((child) => property.removeChild(child));
  const solidFill = createOpenXmlElement(document, "a:solidFill");
  const srgb = createOpenXmlElement(document, "a:srgbClr");
  srgb.setAttribute("val", String(color || "#1f2937").replace(/^#/, "").toUpperCase());
  solidFill.appendChild(srgb);
  property.appendChild(solidFill);
}

function setShapeFill(document, shapeNode, color) {
  const shapeProperties = firstByTag(shapeNode, "p:spPr");
  if (!shapeProperties || !color) return;
  elementChildren(shapeProperties)
    .filter((child) => ["a:noFill", "a:solidFill", "a:gradFill", "a:pattFill", "a:blipFill"].includes(child.tagName))
    .forEach((child) => shapeProperties.removeChild(child));
  const solidFill = createOpenXmlElement(document, "a:solidFill");
  const srgb = createOpenXmlElement(document, "a:srgbClr");
  srgb.setAttribute("val", String(color).replace(/^#/, "").toUpperCase());
  solidFill.appendChild(srgb);
  const geometry = firstByTag(shapeProperties, "a:prstGeom");
  if (geometry && geometry.nextSibling) shapeProperties.insertBefore(solidFill, geometry.nextSibling);
  else shapeProperties.appendChild(solidFill);
}

function setShapeLine(document, shapeNode, change) {
  const shapeProperties = firstByTag(shapeNode, "p:spPr");
  if (!shapeProperties) return;
  let line = directChildByTag(shapeProperties, "a:ln");
  if (!line) {
    line = createOpenXmlElement(document, "a:ln");
    shapeProperties.appendChild(line);
  }
  const hasWidth = Object.prototype.hasOwnProperty.call(change, "lineWidth")
    && Number.isFinite(Number(change.lineWidth));
  const width = hasWidth ? Math.max(0, Number(change.lineWidth)) : null;
  if (hasWidth) line.setAttribute("w", String(Math.round(width * LINE_EMU_PER_POINT)));

  const fillNodes = () => elementChildren(line)
    .filter((child) => ["a:noFill", "a:solidFill", "a:gradFill", "a:pattFill"].includes(child.tagName));
  if (hasWidth && width === 0) {
    fillNodes().forEach((child) => line.removeChild(child));
    line.appendChild(createOpenXmlElement(document, "a:noFill"));
  } else if (change.lineColor || (hasWidth && width > 0 && directChildByTag(line, "a:noFill"))) {
    fillNodes().forEach((child) => line.removeChild(child));
    const solidFill = createOpenXmlElement(document, "a:solidFill");
    const srgb = createOpenXmlElement(document, "a:srgbClr");
    srgb.setAttribute("val", String(change.lineColor || "#1f2937").replace(/^#/, "").toUpperCase());
    solidFill.appendChild(srgb);
    line.appendChild(solidFill);
  }

  if (Object.prototype.hasOwnProperty.call(change, "lineStyle")) {
    elementChildren(line)
      .filter((child) => child.tagName === "a:prstDash")
      .forEach((child) => line.removeChild(child));
    const dash = createOpenXmlElement(document, "a:prstDash");
    const dashValue = change.lineStyle === "dot"
      ? "sysDot"
      : change.lineStyle === "dash"
        ? "dash"
        : change.lineStyle === "dashDot"
          ? "dashDot"
          : "solid";
    dash.setAttribute("val", dashValue);
    line.appendChild(dash);
  }
}

function setParagraphText(document, paragraph, text) {
  let textNodes = allByTag(paragraph, "a:t");
  if (!textNodes.length) {
    const run = createOpenXmlElement(document, "a:r");
    run.appendChild(createOpenXmlElement(document, "a:rPr"));
    const textNode = createOpenXmlElement(document, "a:t");
    run.appendChild(textNode);
    const endProperties = firstByTag(paragraph, "a:endParaRPr");
    paragraph.insertBefore(run, endProperties || null);
    textNodes = [textNode];
  }
  textNodes[0].textContent = text;
  textNodes.slice(1).forEach((node) => {
    node.textContent = "";
  });
}

function updateTextParagraphs(document, textBody, value) {
  const lines = String(value || "").split(/\r?\n/);
  let paragraphs = allByTag(textBody, "a:p");
  if (!paragraphs.length) {
    const paragraph = createOpenXmlElement(document, "a:p");
    textBody.appendChild(paragraph);
    paragraphs = [paragraph];
  }
  const template = paragraphs[paragraphs.length - 1];
  while (paragraphs.length < lines.length) {
    const paragraph = template.cloneNode(true);
    textBody.appendChild(paragraph);
    paragraphs.push(paragraph);
  }
  paragraphs.slice(lines.length).forEach((paragraph) => {
    if (paragraph.parentNode === textBody) textBody.removeChild(paragraph);
  });
  paragraphs.slice(0, lines.length).forEach((paragraph, index) => {
    setParagraphText(document, paragraph, lines[index]);
  });
}

function splitRichTextRunsIntoParagraphs(runs, fallback) {
  const paragraphs = [[]];
  const source = Array.isArray(runs) && runs.length ? runs : [{ text: "", ...fallback }];
  source.forEach((run) => {
    const style = {
      fontSize: Number(run.fontSize) || fallback.fontSize,
      fontFamily: run.fontFamily || fallback.fontFamily,
      color: run.color || fallback.color,
      bold: Boolean(run.bold),
      italic: Boolean(run.italic),
      underline: Boolean(run.underline)
    };
    String(run.text || "").split("\n").forEach((part, index, parts) => {
      if (part) paragraphs[paragraphs.length - 1].push({ text: part, ...style });
      if (index < parts.length - 1) paragraphs.push([]);
    });
  });
  return paragraphs;
}

function appendRichTextRun(document, paragraph, run, fallback, beforeNode) {
  if (!run.text) return;
  const richRun = createOpenXmlElement(document, "a:r");
  const properties = createOpenXmlElement(document, "a:rPr");
  properties.setAttribute("lang", "en-US");
  properties.setAttribute("sz", String(Math.round((Number(run.fontSize) || fallback.fontSize) * 100)));
  properties.setAttribute("b", run.bold ? "1" : "0");
  properties.setAttribute("i", run.italic ? "1" : "0");
  properties.setAttribute("u", run.underline ? "sng" : "none");
  setTextColor(document, properties, run.color || fallback.color);
  const latin = createOpenXmlElement(document, "a:latin");
  latin.setAttribute("typeface", run.fontFamily || fallback.fontFamily);
  properties.appendChild(latin);
  richRun.appendChild(properties);
  const text = createOpenXmlElement(document, "a:t");
  if (/^\s|\s$/.test(run.text)) text.setAttribute("xml:space", "preserve");
  text.appendChild(document.createTextNode(run.text));
  richRun.appendChild(text);
  paragraph.insertBefore(richRun, beforeNode || null);
}

function updateRichTextParagraphs(document, textBody, richTextRuns, change) {
  const fallback = {
    fontSize: Number(change.fontSize) || 18,
    fontFamily: change.fontFamily || "Aptos",
    color: change.color || "#1f2937",
    bold: Boolean(change.bold),
    italic: Boolean(change.italic),
    underline: Boolean(change.underline)
  };
  const richParagraphs = splitRichTextRunsIntoParagraphs(richTextRuns, fallback);
  let paragraphs = elementChildren(textBody).filter((child) => child.tagName === "a:p");
  if (!paragraphs.length) {
    const paragraph = createOpenXmlElement(document, "a:p");
    textBody.appendChild(paragraph);
    paragraphs = [paragraph];
  }
  const template = paragraphs[paragraphs.length - 1];
  while (paragraphs.length < richParagraphs.length) {
    const paragraph = template.cloneNode(true);
    textBody.appendChild(paragraph);
    paragraphs.push(paragraph);
  }
  paragraphs.slice(richParagraphs.length).forEach((paragraph) => {
    if (paragraph.parentNode === textBody) textBody.removeChild(paragraph);
  });
  paragraphs.slice(0, richParagraphs.length).forEach((paragraph, index) => {
    elementChildren(paragraph)
      .filter((child) => ["a:r", "a:fld", "a:br"].includes(child.tagName))
      .forEach((child) => paragraph.removeChild(child));
    let endProperties = elementChildren(paragraph).find((child) => child.tagName === "a:endParaRPr") || null;
    if (!endProperties) {
      endProperties = createOpenXmlElement(document, "a:endParaRPr");
      paragraph.appendChild(endProperties);
    }
    const paragraphRuns = richParagraphs[index];
    paragraphRuns.forEach((run) => appendRichTextRun(document, paragraph, run, fallback, endProperties));
    const terminalStyle = paragraphRuns[paragraphRuns.length - 1] || fallback;
    endProperties.setAttribute("lang", "en-US");
    endProperties.setAttribute("sz", String(Math.round((Number(terminalStyle.fontSize) || fallback.fontSize) * 100)));
    endProperties.setAttribute("b", terminalStyle.bold ? "1" : "0");
    endProperties.setAttribute("i", terminalStyle.italic ? "1" : "0");
    endProperties.setAttribute("u", terminalStyle.underline ? "sng" : "none");
  });
}

function updateTextShape(document, shapeNode, change) {
  const textBody = firstByTag(shapeNode, "p:txBody");
  if (!textBody) {
    if (change.fillColor) setShapeFill(document, shapeNode, change.fillColor);
    return;
  }
  const hasRichText = Array.isArray(change.richTextRuns) && change.richTextRuns.length > 0;
  if (hasRichText) {
    updateRichTextParagraphs(document, textBody, change.richTextRuns, change);
  } else if (Object.prototype.hasOwnProperty.call(change, "text")) {
    updateTextParagraphs(document, textBody, change.text);
  }
  if (!hasRichText) {
    const properties = ensureTextProperties(document, textBody);
    properties.forEach((property) => {
      if (Number.isFinite(change.fontSize)) property.setAttribute("sz", String(Math.round(change.fontSize * 100)));
      if (Object.prototype.hasOwnProperty.call(change, "bold")) property.setAttribute("b", change.bold ? "1" : "0");
      if (Object.prototype.hasOwnProperty.call(change, "italic")) property.setAttribute("i", change.italic ? "1" : "0");
      if (Object.prototype.hasOwnProperty.call(change, "underline")) property.setAttribute("u", change.underline ? "sng" : "none");
      if (change.color) setTextColor(document, property, change.color);
      if (change.fontFamily) {
        let latin = firstByTag(property, "a:latin");
        if (!latin) {
          latin = createOpenXmlElement(document, "a:latin");
          property.appendChild(latin);
        }
        latin.setAttribute("typeface", change.fontFamily);
      }
    });
  }
  if (change.align) allByTag(textBody, "a:p").forEach((paragraph) => {
    let paragraphProperties = firstByTag(paragraph, "a:pPr");
    if (!paragraphProperties) {
      paragraphProperties = createOpenXmlElement(document, "a:pPr");
      paragraph.insertBefore(paragraphProperties, paragraph.firstChild);
    }
    paragraphProperties.setAttribute("algn", change.align);
  });
}

function appendTextShape(document, shapeTree, change, id) {
  const shape = createOpenXmlElement(document, "p:sp");
  const nvSpPr = createOpenXmlElement(document, "p:nvSpPr");
  const cNvPr = createOpenXmlElement(document, "p:cNvPr");
  cNvPr.setAttribute("id", String(id));
  cNvPr.setAttribute("name", change.name || `Openleaf Text Box ${id}`);
  const cNvSpPr = createOpenXmlElement(document, "p:cNvSpPr");
  cNvSpPr.setAttribute("txBox", "1");
  const nvPr = createOpenXmlElement(document, "p:nvPr");
  nvSpPr.appendChild(cNvPr);
  nvSpPr.appendChild(cNvSpPr);
  nvSpPr.appendChild(nvPr);
  shape.appendChild(nvSpPr);

  const spPr = createOpenXmlElement(document, "p:spPr");
  const xfrm = createOpenXmlElement(document, "a:xfrm");
  const offset = createOpenXmlElement(document, "a:off");
  offset.setAttribute("x", String(Math.round(change.x || EMU_PER_INCH)));
  offset.setAttribute("y", String(Math.round(change.y || EMU_PER_INCH)));
  const extent = createOpenXmlElement(document, "a:ext");
  extent.setAttribute("cx", String(Math.round(change.cx || EMU_PER_INCH * 3)));
  extent.setAttribute("cy", String(Math.round(change.cy || EMU_PER_INCH)));
  xfrm.appendChild(offset);
  xfrm.appendChild(extent);
  const geometry = createOpenXmlElement(document, "a:prstGeom");
  geometry.setAttribute("prst", "rect");
  geometry.appendChild(createOpenXmlElement(document, "a:avLst"));
  spPr.appendChild(xfrm);
  spPr.appendChild(geometry);
  shape.appendChild(spPr);
  if (change.fillColor) setShapeFill(document, shape, change.fillColor);
  else spPr.appendChild(createOpenXmlElement(document, "a:noFill"));
  setShapeLine(document, shape, {
    lineColor: change.lineColor || "",
    lineWidth: Number.isFinite(Number(change.lineWidth)) ? Number(change.lineWidth) : 0,
    lineStyle: change.lineStyle || "solid"
  });

  const txBody = createOpenXmlElement(document, "p:txBody");
  const bodyPr = createOpenXmlElement(document, "a:bodyPr");
  bodyPr.setAttribute("wrap", "square");
  bodyPr.setAttribute("anchor", change.verticalAlign || "t");
  bodyPr.setAttribute("lIns", String(Math.max(0, Math.round(Number(change.marginLeft) || 0))));
  bodyPr.setAttribute("rIns", String(Math.max(0, Math.round(Number(change.marginRight) || 0))));
  bodyPr.setAttribute("tIns", String(Math.max(0, Math.round(Number(change.marginTop) || 0))));
  bodyPr.setAttribute("bIns", String(Math.max(0, Math.round(Number(change.marginBottom) || 0))));
  txBody.appendChild(bodyPr);
  txBody.appendChild(createOpenXmlElement(document, "a:lstStyle"));
  String(change.text || "New text").split(/\r?\n/).forEach((lineText) => {
    const paragraph = createOpenXmlElement(document, "a:p");
    const paragraphProperties = createOpenXmlElement(document, "a:pPr");
    paragraphProperties.setAttribute("algn", change.align || "l");
    paragraph.appendChild(paragraphProperties);
    const run = createOpenXmlElement(document, "a:r");
    const runProperties = createOpenXmlElement(document, "a:rPr");
    runProperties.setAttribute("lang", "en-US");
    runProperties.setAttribute("sz", String(Math.round((change.fontSize || 24) * 100)));
    runProperties.setAttribute("b", change.bold ? "1" : "0");
    runProperties.setAttribute("i", change.italic ? "1" : "0");
    setTextColor(document, runProperties, change.color || "#1f2937");
    const latin = createOpenXmlElement(document, "a:latin");
    latin.setAttribute("typeface", change.fontFamily || "Aptos");
    runProperties.appendChild(latin);
    run.appendChild(runProperties);
    const text = createOpenXmlElement(document, "a:t");
    text.appendChild(document.createTextNode(lineText));
    run.appendChild(text);
    paragraph.appendChild(run);
    const endProperties = createOpenXmlElement(document, "a:endParaRPr");
    endProperties.setAttribute("lang", "en-US");
    endProperties.setAttribute("sz", String(Math.round((change.fontSize || 24) * 100)));
    paragraph.appendChild(endProperties);
    txBody.appendChild(paragraph);
  });
  if (Array.isArray(change.richTextRuns) && change.richTextRuns.length) {
    updateRichTextParagraphs(document, txBody, change.richTextRuns, change);
  }
  shape.appendChild(txBody);
  shapeTree.appendChild(shape);
  return shape;
}

function appendShape(document, shapeTree, change, id) {
  const shape = createOpenXmlElement(document, "p:sp");
  const nonVisual = createOpenXmlElement(document, "p:nvSpPr");
  const metadata = createOpenXmlElement(document, "p:cNvPr");
  metadata.setAttribute("id", String(id));
  metadata.setAttribute("name", change.name || `Openleaf Shape ${id}`);
  nonVisual.appendChild(metadata);
  nonVisual.appendChild(createOpenXmlElement(document, "p:cNvSpPr"));
  nonVisual.appendChild(createOpenXmlElement(document, "p:nvPr"));
  shape.appendChild(nonVisual);

  const shapeProperties = createOpenXmlElement(document, "p:spPr");
  const transform = createOpenXmlElement(document, "a:xfrm");
  const offset = createOpenXmlElement(document, "a:off");
  offset.setAttribute("x", String(Math.round(change.x || EMU_PER_INCH)));
  offset.setAttribute("y", String(Math.round(change.y || EMU_PER_INCH)));
  const extent = createOpenXmlElement(document, "a:ext");
  extent.setAttribute("cx", String(Math.round(change.cx || EMU_PER_INCH * 2)));
  extent.setAttribute("cy", String(Math.round(change.cy || EMU_PER_INCH)));
  transform.appendChild(offset);
  transform.appendChild(extent);
  shapeProperties.appendChild(transform);
  const geometry = createOpenXmlElement(document, "a:prstGeom");
  geometry.setAttribute("prst", change.shapeType === "ellipse" ? "ellipse" : "rect");
  geometry.appendChild(createOpenXmlElement(document, "a:avLst"));
  shapeProperties.appendChild(geometry);
  shape.appendChild(shapeProperties);
  setShapeFill(document, shape, change.fillColor || "#5B9BD5");
  setShapeLine(document, shape, {
    lineColor: change.lineColor || "#2F5597",
    lineWidth: Number.isFinite(Number(change.lineWidth)) ? Number(change.lineWidth) : 1,
    lineStyle: change.lineStyle || "solid"
  });
  shapeTree.appendChild(shape);
  return shape;
}

function imageExtension(mediaType, fileName = "") {
  const normalizedType = String(mediaType || "").toLowerCase();
  if (normalizedType === "image/jpeg") return "jpg";
  if (normalizedType === "image/gif") return "gif";
  if (normalizedType === "image/webp") return "webp";
  const namedExtension = path.extname(String(fileName || "")).replace(/^\./, "").toLowerCase();
  if (["png", "jpg", "jpeg", "gif", "webp"].includes(namedExtension)) {
    return namedExtension === "jpeg" ? "jpg" : namedExtension;
  }
  return "png";
}

function imageContentType(extension, mediaType) {
  if (mediaType && /^image\//i.test(mediaType)) return String(mediaType).toLowerCase();
  if (extension === "jpg") return "image/jpeg";
  return `image/${extension}`;
}

function decodeImageData(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?(?:;charset=[^;,]+)?(;base64)?,([\s\S]*)$/i);
  if (!match) throw new Error("The inserted image data is invalid.");
  return {
    mediaType: match[1] || "image/png",
    bytes: match[2] ? Buffer.from(match[3], "base64") : Buffer.from(decodeURIComponent(match[3]))
  };
}

function slideRelationshipsPath(slidePath) {
  return path.posix.join(path.posix.dirname(slidePath), "_rels", `${path.posix.basename(slidePath)}.rels`);
}

async function ensureSlideRelationships(zip, slidePath) {
  const relationshipsPath = slideRelationshipsPath(slidePath);
  const file = zip.file(relationshipsPath);
  if (file) return { relationshipsPath, document: parseXml(await file.async("string")) };
  const document = parser.parseFromString(
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="${PACKAGE_RELATIONSHIPS_NS}"/>`,
    "application/xml"
  );
  return { relationshipsPath, document };
}

function nextRelationshipId(document) {
  const maximum = allByTag(document, "Relationship").reduce((value, relationship) => {
    const match = String(relationship.getAttribute("Id") || "").match(/^rId(\d+)$/i);
    return Math.max(value, match ? Number(match[1]) : 0);
  }, 0);
  return `rId${maximum + 1}`;
}

async function ensureImageContentType(zip, extension, mediaType) {
  const contentTypesFile = zip.file("[Content_Types].xml");
  if (!contentTypesFile) return;
  const document = parseXml(await contentTypesFile.async("string"));
  const exists = allByTag(document, "Default").some((node) => (
    String(node.getAttribute("Extension") || "").toLowerCase() === extension.toLowerCase()
  ));
  if (!exists) {
    const root = document.documentElement;
    const node = document.createElementNS(root.namespaceURI, "Default");
    node.setAttribute("Extension", extension);
    node.setAttribute("ContentType", imageContentType(extension, mediaType));
    root.appendChild(node);
    zip.file("[Content_Types].xml", serializer.serializeToString(document));
  }
}

async function appendImage(zip, slidePath, document, shapeTree, change, id) {
  const decoded = decodeImageData(change.imageData);
  const extension = imageExtension(change.imageMediaType || decoded.mediaType, change.imageFileName);
  let mediaIndex = 1;
  let mediaName = `openleaf-image-${id}.${extension}`;
  while (zip.file(`ppt/media/${mediaName}`)) {
    mediaIndex += 1;
    mediaName = `openleaf-image-${id}-${mediaIndex}.${extension}`;
  }
  zip.file(`ppt/media/${mediaName}`, decoded.bytes);
  await ensureImageContentType(zip, extension, change.imageMediaType || decoded.mediaType);

  const { relationshipsPath, document: relationshipsDocument } = await ensureSlideRelationships(zip, slidePath);
  const relationshipId = nextRelationshipId(relationshipsDocument);
  const relationship = relationshipsDocument.createElementNS(PACKAGE_RELATIONSHIPS_NS, "Relationship");
  relationship.setAttribute("Id", relationshipId);
  relationship.setAttribute("Type", IMAGE_RELATIONSHIP_TYPE);
  relationship.setAttribute("Target", `../media/${mediaName}`);
  relationshipsDocument.documentElement.appendChild(relationship);
  zip.file(relationshipsPath, serializer.serializeToString(relationshipsDocument));

  const picture = createOpenXmlElement(document, "p:pic");
  const nonVisual = createOpenXmlElement(document, "p:nvPicPr");
  const metadata = createOpenXmlElement(document, "p:cNvPr");
  metadata.setAttribute("id", String(id));
  metadata.setAttribute("name", change.name || change.imageFileName || `Openleaf Picture ${id}`);
  const nonVisualPicture = createOpenXmlElement(document, "p:cNvPicPr");
  const pictureLocks = createOpenXmlElement(document, "a:picLocks");
  pictureLocks.setAttribute("noChangeAspect", "1");
  nonVisualPicture.appendChild(pictureLocks);
  nonVisual.appendChild(metadata);
  nonVisual.appendChild(nonVisualPicture);
  nonVisual.appendChild(createOpenXmlElement(document, "p:nvPr"));
  picture.appendChild(nonVisual);

  const blipFill = createOpenXmlElement(document, "p:blipFill");
  const blip = createOpenXmlElement(document, "a:blip");
  blip.setAttributeNS(OFFICE_RELATIONSHIPS_NS, "r:embed", relationshipId);
  blipFill.appendChild(blip);
  const stretch = createOpenXmlElement(document, "a:stretch");
  stretch.appendChild(createOpenXmlElement(document, "a:fillRect"));
  blipFill.appendChild(stretch);
  picture.appendChild(blipFill);

  const shapeProperties = createOpenXmlElement(document, "p:spPr");
  const transform = createOpenXmlElement(document, "a:xfrm");
  const offset = createOpenXmlElement(document, "a:off");
  offset.setAttribute("x", String(Math.round(change.x || EMU_PER_INCH)));
  offset.setAttribute("y", String(Math.round(change.y || EMU_PER_INCH)));
  const extent = createOpenXmlElement(document, "a:ext");
  extent.setAttribute("cx", String(Math.round(change.cx || EMU_PER_INCH * 4)));
  extent.setAttribute("cy", String(Math.round(change.cy || EMU_PER_INCH * 3)));
  transform.appendChild(offset);
  transform.appendChild(extent);
  shapeProperties.appendChild(transform);
  const geometry = createOpenXmlElement(document, "a:prstGeom");
  geometry.setAttribute("prst", "rect");
  geometry.appendChild(createOpenXmlElement(document, "a:avLst"));
  shapeProperties.appendChild(geometry);
  picture.appendChild(shapeProperties);
  shapeTree.appendChild(picture);
  return picture;
}

function reorderPresentationShapeTree(shapeTree, desiredZIndexes) {
  if (!shapeTree || !desiredZIndexes || desiredZIndexes.size === 0) return;
  const drawableTags = new Set(["p:sp", "p:pic", "p:graphicFrame", "p:cxnSp", "p:grpSp"]);
  const drawableNodes = elementChildren(shapeTree).filter((node) => drawableTags.has(node.tagName));
  const originalIndexes = new Map(drawableNodes.map((node, index) => [node, index]));
  drawableNodes.sort((left, right) => {
    const leftIndex = desiredZIndexes.has(left)
      ? Number(desiredZIndexes.get(left))
      : originalIndexes.get(left);
    const rightIndex = desiredZIndexes.has(right)
      ? Number(desiredZIndexes.get(right))
      : originalIndexes.get(right);
    return leftIndex - rightIndex || originalIndexes.get(left) - originalIndexes.get(right);
  });
  const extensionList = elementChildren(shapeTree).find((node) => node.tagName === "p:extLst") || null;
  drawableNodes.forEach((node) => shapeTree.removeChild(node));
  drawableNodes.forEach((node) => shapeTree.insertBefore(node, extensionList));
}

function setSlideBackground(document, color) {
  const commonSlideData = firstByTag(document, "p:cSld");
  if (!commonSlideData || !/^#[0-9a-f]{6}$/i.test(String(color || ""))) return;
  elementChildren(commonSlideData)
    .filter((child) => child.tagName === "p:bg")
    .forEach((child) => commonSlideData.removeChild(child));
  const background = createOpenXmlElement(document, "p:bg");
  const properties = createOpenXmlElement(document, "p:bgPr");
  const solidFill = createOpenXmlElement(document, "a:solidFill");
  const srgb = createOpenXmlElement(document, "a:srgbClr");
  srgb.setAttribute("val", String(color).replace(/^#/, "").toUpperCase());
  solidFill.appendChild(srgb);
  properties.appendChild(solidFill);
  properties.appendChild(createOpenXmlElement(document, "a:effectLst"));
  background.appendChild(properties);
  const shapeTree = elementChildren(commonSlideData).find((child) => child.tagName === "p:spTree");
  commonSlideData.insertBefore(background, shapeTree || commonSlideData.firstChild);
}

function setSlideTransition(document, transition) {
  const root = document.documentElement;
  if (!root) return;
  elementChildren(root)
    .filter((child) => child.tagName === "p:transition")
    .forEach((child) => root.removeChild(child));
  if (transition !== "fade") return;
  const transitionNode = createOpenXmlElement(document, "p:transition");
  transitionNode.setAttribute("spd", "med");
  transitionNode.appendChild(createOpenXmlElement(document, "p:fade"));
  const nextNode = elementChildren(root).find((child) => ["p:timing", "p:extLst"].includes(child.tagName));
  root.insertBefore(transitionNode, nextNode || null);
}

function maxShapeId(document) {
  return allByTag(document, "p:cNvPr").reduce((maximum, node) => Math.max(maximum, numberAttr(node, "id")), 0);
}

function relationshipId(node) {
  return node.getAttribute("r:id")
    || node.getAttributeNS(OFFICE_RELATIONSHIPS_NS, "id")
    || "";
}

function slideTargetFromPath(slidePath) {
  return path.posix.relative("ppt", slidePath);
}

function nextSlidePartNumber(zip) {
  return Object.keys(zip.files).reduce((maximum, filePath) => {
    const match = filePath.match(/^ppt\/slides\/slide(\d+)\.xml$/i);
    return Math.max(maximum, match ? Number(match[1]) : 0);
  }, 0) + 1;
}

async function ensureSlideContentTypeOverride(zip, slidePath) {
  const contentTypesFile = zip.file("[Content_Types].xml");
  if (!contentTypesFile) return;
  const document = parseXml(await contentTypesFile.async("string"));
  const partName = `/${slidePath}`;
  const exists = allByTag(document, "Override").some((node) => node.getAttribute("PartName") === partName);
  if (!exists) {
    const node = document.createElementNS(document.documentElement.namespaceURI, "Override");
    node.setAttribute("PartName", partName);
    node.setAttribute("ContentType", SLIDE_CONTENT_TYPE);
    document.documentElement.appendChild(node);
    zip.file("[Content_Types].xml", serializer.serializeToString(document));
  }
}

async function copySlideRelationships(zip, sourceSlidePath, targetSlidePath) {
  const sourceRelationshipsPath = slideRelationshipsPath(sourceSlidePath);
  const sourceFile = zip.file(sourceRelationshipsPath);
  if (!sourceFile) return;
  const document = parseXml(await sourceFile.async("string"));
  allByTag(document, "Relationship")
    .filter((node) => node.getAttribute("Type") === NOTES_SLIDE_RELATIONSHIP_TYPE)
    .forEach((node) => node.parentNode.removeChild(node));
  zip.file(slideRelationshipsPath(targetSlidePath), serializer.serializeToString(document));
}

async function applySlideStructureChanges(zip, changes) {
  const copyChanges = changes.filter((change) => change && change.type === "slide-copy");
  const orderChange = [...changes].reverse().find((change) => change && change.type === "slide-order");
  if (!copyChanges.length && !orderChange) return new Map();

  const presentationFile = zip.file("ppt/presentation.xml");
  const relationshipsFile = zip.file("ppt/_rels/presentation.xml.rels");
  if (!presentationFile || !relationshipsFile) throw new Error("The PowerPoint slide list is missing.");
  const presentationDocument = parseXml(await presentationFile.async("string"));
  const relationshipsDocument = parseXml(await relationshipsFile.async("string"));
  const slideIdList = firstByTag(presentationDocument, "p:sldIdLst");
  if (!slideIdList) throw new Error("The PowerPoint slide list is invalid.");

  const relationshipNodes = allByTag(relationshipsDocument, "Relationship");
  const relationshipsById = new Map(relationshipNodes.map((node) => [node.getAttribute("Id"), node]));
  const descriptors = new Map();
  elementChildren(slideIdList)
    .filter((node) => node.tagName === "p:sldId")
    .forEach((node) => {
      const id = relationshipId(node);
      const relationship = relationshipsById.get(id);
      if (!relationship) return;
      const slidePath = normalizeZipTarget("ppt/presentation.xml", relationship.getAttribute("Target"));
      descriptors.set(slidePath, { node, relationship, relationshipId: id, slidePath });
    });

  let slidePartNumber = nextSlidePartNumber(zip);
  let slideId = allByTag(presentationDocument, "p:sldId")
    .reduce((maximum, node) => Math.max(maximum, numberAttr(node, "id")), 255) + 1;
  const aliases = new Map();

  for (const change of copyChanges) {
    const requestedSource = aliases.get(change.sourceSlidePath) || change.sourceSlidePath;
    const sourceDescriptor = descriptors.get(change.sourceSlidePath)
      || Array.from(descriptors.values()).find((descriptor) => descriptor.slidePath === requestedSource);
    const sourcePath = sourceDescriptor ? sourceDescriptor.slidePath : requestedSource;
    const sourceFile = zip.file(sourcePath);
    if (!sourceFile) throw new Error(`Could not copy missing slide: ${sourcePath}`);
    const targetPath = `ppt/slides/slide${slidePartNumber++}.xml`;
    zip.file(targetPath, await sourceFile.async("nodebuffer"));
    await copySlideRelationships(zip, sourcePath, targetPath);
    await ensureSlideContentTypeOverride(zip, targetPath);

    const relationshipIdValue = nextRelationshipId(relationshipsDocument);
    const relationship = relationshipsDocument.createElementNS(PACKAGE_RELATIONSHIPS_NS, "Relationship");
    relationship.setAttribute("Id", relationshipIdValue);
    relationship.setAttribute("Type", SLIDE_RELATIONSHIP_TYPE);
    relationship.setAttribute("Target", slideTargetFromPath(targetPath));
    relationshipsDocument.documentElement.appendChild(relationship);

    const slideNode = sourceDescriptor
      ? sourceDescriptor.node.cloneNode(true)
      : createOpenXmlElement(presentationDocument, "p:sldId");
    slideNode.setAttribute("id", String(slideId++));
    slideNode.setAttributeNS(OFFICE_RELATIONSHIPS_NS, "r:id", relationshipIdValue);
    const descriptor = {
      node: slideNode,
      relationship,
      relationshipId: relationshipIdValue,
      slidePath: targetPath
    };
    aliases.set(change.slidePath, targetPath);
    descriptors.set(change.slidePath, descriptor);
    descriptors.set(targetPath, descriptor);
  }

  const requestedOrder = orderChange && Array.isArray(orderChange.slidePaths)
    ? orderChange.slidePaths
    : [
        ...Array.from(descriptors.keys()).filter((slidePath) => !slidePath.startsWith("openleaf://")),
        ...copyChanges.map((change) => change.slidePath)
      ];
  const orderedDescriptors = requestedOrder
    .map((slidePath) => descriptors.get(slidePath) || descriptors.get(aliases.get(slidePath)))
    .filter(Boolean);
  if (!orderedDescriptors.length) throw new Error("A PowerPoint presentation must contain at least one slide.");

  elementChildren(slideIdList)
    .filter((node) => node.tagName === "p:sldId")
    .forEach((node) => slideIdList.removeChild(node));
  orderedDescriptors.forEach((descriptor) => slideIdList.appendChild(descriptor.node));

  const retainedRelationshipIds = new Set(orderedDescriptors.map((descriptor) => descriptor.relationshipId));
  allByTag(relationshipsDocument, "Relationship")
    .filter((node) => (
      node.getAttribute("Type") === SLIDE_RELATIONSHIP_TYPE
      && !retainedRelationshipIds.has(node.getAttribute("Id"))
    ))
    .forEach((node) => node.parentNode.removeChild(node));

  zip.file("ppt/presentation.xml", serializer.serializeToString(presentationDocument));
  zip.file("ppt/_rels/presentation.xml.rels", serializer.serializeToString(relationshipsDocument));
  return aliases;
}

async function backupPresentation(sourcePath, backupRoot) {
  const backupDir = path.join(backupRoot, cacheKey(sourcePath));
  await fsp.mkdir(backupDir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(backupDir, `${path.parse(sourcePath).name}-${stamp}${path.extname(sourcePath)}`);
  await fsp.copyFile(sourcePath, backupPath);
  return backupPath;
}

function presentationElementLookup(presentation) {
  const lookup = new Map();
  (presentation?.slides || []).forEach((slide) => {
    (slide.elements || []).forEach((element) => {
      lookup.set(`${slide.path}:${element.id}`, element);
    });
  });
  return lookup;
}

function concurrentPresentationConflicts(changes, currentPresentation) {
  const currentElements = presentationElementLookup(currentPresentation);
  const conflicts = [];
  changes.forEach((change) => {
    if (!change || change.isNew || !change.slidePath || !change.id || !change.base) return;
    if (["slide-background", "slide-transition", "slide-copy", "slide-order"].includes(change.type)) return;
    const current = currentElements.get(`${change.slidePath}:${change.id}`);
    if (!current) {
      if (!change.deleted) conflicts.push(`${change.name || change.id}: object was removed by another editor`);
      return;
    }
    if (change.deleted) {
      const externallyChanged = PRESENTATION_MUTABLE_PROPERTIES.some((property) => (
        !presentationValuesEqual(current[property], change.base[property])
      ));
      if (externallyChanged) conflicts.push(`${change.name || change.id}: object changed before deletion`);
      return;
    }
    presentationChangeProperties(change).forEach((property) => {
      if (
        !presentationValuesEqual(current[property], change.base[property])
        && !presentationValuesEqual(current[property], change[property])
      ) {
        conflicts.push(`${change.name || change.id}: ${property}`);
      }
    });
  });
  return conflicts;
}

async function savePresentationEditor(sourcePath, cacheRoot, backupRoot, payload = {}) {
  return withPresentationLock(sourcePath, async () => {
  const sourceBuffer = await fsp.readFile(sourcePath);
  const currentRevision = presentationRevision(sourceBuffer);
  const zip = await JSZip.loadAsync(sourceBuffer);
  const rawChanges = Array.isArray(payload.changes) ? payload.changes : [];
  const concurrent = Boolean(payload.baseRevision && payload.baseRevision !== currentRevision);
  if (concurrent) {
    const currentPresentation = await parsePresentationModel(zip, sourcePath, { hydrateImages: false });
    const conflicts = concurrentPresentationConflicts(rawChanges, currentPresentation);
    if (conflicts.length) {
      throw new Error(`Shared-edit conflict: ${conflicts.slice(0, 5).join(", ")}. Reload the poster and reapply only those edits.`);
    }
  }
  const changes = rawChanges.map(sparsePresentationChange);
  const slidePathAliases = await applySlideStructureChanges(zip, changes);
  const changesBySlide = new Map();
  changes.forEach((change) => {
    if (change && ["slide-copy", "slide-order"].includes(change.type)) return;
    if (!change || !change.slidePath) return;
    const slidePath = slidePathAliases.get(change.slidePath) || change.slidePath;
    if (!changesBySlide.has(slidePath)) changesBySlide.set(slidePath, []);
    changesBySlide.get(slidePath).push({ ...change, slidePath });
  });

  for (const [slidePath, changes] of changesBySlide.entries()) {
    const slideFile = zip.file(slidePath);
    if (!slideFile) continue;
    const document = parseXml(await slideFile.async("string"));
    const shapeTree = firstByTag(document, "p:spTree");
    const desiredZIndexes = new Map();
    let nextId = maxShapeId(document) + 1;
    for (const change of changes) {
      if (change.type === "slide-background") {
        setSlideBackground(document, change.color);
        continue;
      }
      if (change.type === "slide-transition") {
        setSlideTransition(document, change.transition);
        continue;
      }
      if (change.isNew) {
        if (!change.deleted) {
          let shapeNode;
          if (change.type === "image") shapeNode = await appendImage(zip, slidePath, document, shapeTree, change, nextId++);
          else if (change.type === "shape") shapeNode = appendShape(document, shapeTree, change, nextId++);
          else shapeNode = appendTextShape(document, shapeTree, change, nextId++);
          if (shapeNode && Number.isFinite(Number(change.zIndex))) {
            desiredZIndexes.set(shapeNode, Number(change.zIndex));
          }
        }
        continue;
      }
      const shapeNode = findShapeById(document, change.id);
      if (!shapeNode) continue;
      if (change.deleted) {
        shapeNode.parentNode.removeChild(shapeNode);
        continue;
      }
      setTransform(shapeNode, change);
      if (change.fillColor) setShapeFill(document, shapeNode, change.fillColor);
      if (["lineColor", "lineWidth", "lineStyle"].some((property) => (
        Object.prototype.hasOwnProperty.call(change, property)
      ))) {
        setShapeLine(document, shapeNode, change);
      }
      updateTextShape(document, shapeNode, change);
      if (Number.isFinite(Number(change.zIndex))) {
        desiredZIndexes.set(shapeNode, Number(change.zIndex));
      }
    }
    reorderPresentationShapeTree(shapeTree, desiredZIndexes);
    zip.file(slidePath, serializer.serializeToString(document));
  }

  const backupPath = await backupPresentation(sourcePath, backupRoot);
  const temporaryPath = path.join(path.dirname(sourcePath), `.${path.basename(sourcePath)}.openleaf-${process.pid}-${Date.now()}.tmp`);
  const output = await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 }
  });
  await fsp.writeFile(temporaryPath, output);
  await fsp.rename(temporaryPath, sourcePath);
  await fsp.rm(path.join(cacheRoot, cacheKey(sourcePath)), { recursive: true, force: true });
  const loaded = await loadPresentationEditor(sourcePath, cacheRoot);
  return { ...loaded, backupPath, mergeStatus: concurrent ? "merged" : "saved" };
  });
}

module.exports = {
  loadPresentationEditor,
  savePresentationEditor
};
