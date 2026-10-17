/* HTML previews never run page scripts; editing keeps the original scripts and LaTeX in the saved source. */
window.OpenleafHtmlEditor = (() => {
  function create({ editable = false, onChange = () => {}, onOpenDocument = () => {} } = {}) {
    const frame = document.createElement("iframe");
    frame.className = "html-live-frame";
    frame.title = editable ? "Visual HTML editor" : "Live HTML preview";
    frame.setAttribute("sandbox", "allow-same-origin");
    let sourceDocument, sourceText = "", fileUrl = "", scrollTop = 0;

    function serialize() {
      const body = frame.contentDocument.body.cloneNode(true);
      body.querySelectorAll("[data-openleaf-video-player]").forEach((player) => player.remove());
      body.querySelectorAll("[data-openleaf-plot-player]").forEach((player) => player.remove());
      body.querySelectorAll(".openleaf-plot-ready").forEach((block) => block.classList.remove("openleaf-plot-ready"));
      body.querySelectorAll("[data-openleaf-latex]").forEach((token) => {
        token.replaceWith(body.ownerDocument.createTextNode(token.dataset.openleafLatex));
      });
      const clean = sourceDocument.cloneNode(true);
      clean.body.innerHTML = body.innerHTML;
      return (sourceDocument.doctype ? "<!DOCTYPE html>\n" : "") + clean.documentElement.outerHTML;
    }

    function renderPlots(doc) {
      const style = doc.createElement("style");
      style.textContent = ".openleaf-plot-ready [data-openleaf-plot-fallback]{display:none!important}";
      // Plotly installs its stylesheet in the host document; plots live in this iframe.
      document.querySelectorAll('style[id^="plotly.js-style"]').forEach((hostStyle) => {
        style.textContent += [...(hostStyle.sheet?.cssRules || [])].map((rule) => rule.cssText).join("\n");
      });
      doc.head.append(style);
      doc.querySelectorAll("[data-openleaf-plot]").forEach(async (block) => {
        // Only trusted host code runs. Documents provide local JSON, never JavaScript.
        try {
          async function readJson(path, base) {
            const url = new URL(path, base);
            if (url.protocol !== "file:" || !/\.json$/i.test(url.pathname)) throw new Error("Expected local JSON plot data");
            const response = await fetch(url.href);
            if (!response.ok) throw new Error("Could not read plot data");
            return { value: await response.json(), url: url.href };
          }
          if (!window.Plotly || !block.isConnected) return;
          const wrapper = doc.createElement("div");
          wrapper.dataset.openleafPlotPlayer = "";
          wrapper.contentEditable = "false";
          wrapper.setAttribute("aria-label", block.getAttribute("aria-label") || "Interactive chart");
          const player = doc.createElement("div");
          player.dataset.openleafPlotCanvas = "";
          let revision = 0;
          async function draw(path, base) {
            const current = ++revision;
            const { value: figure } = await readJson(path, base);
            if (current !== revision || !block.isConnected) return;
            if (!Array.isArray(figure.data)) throw new Error("Invalid plot data");
            window.Plotly.purge(player);
            const layout = { ...(figure.layout || {}), autosize: true };
            delete layout.width;
            await window.Plotly.newPlot(player, figure.data, layout, {
              responsive: true, displaylogo: false, scrollZoom: true,
              modeBarButtonsToRemove: ["toImage", "lasso2d", "select2d"],
            });
            if (current !== revision) return;
            block.classList.add("openleaf-plot-ready");
            const baseShapes = Array.isArray(layout.shapes) ? layout.shapes : [];
            const bands = Array.isArray(figure.openleaf?.stageBands) ? figure.openleaf.stageBands : [];
            let activeBand = -1;
            player.on("plotly_hover", (event) => {
              const index = event.points?.[0]?.customdata?.[0];
              const band = Number.isInteger(index) ? bands[index] : null;
              if (!band || activeBand === index || !Number.isFinite(band.start) || !Number.isFinite(band.end)) return;
              activeBand = index;
              void window.Plotly.relayout(player, { shapes: [...baseShapes, {
                type: "rect", xref: "x", yref: "paper", x0: band.start, x1: band.end,
                y0: 0, y1: 1, fillcolor: "rgba(193,138,45,0.15)",
                line: { color: "rgba(193,138,45,0.7)", width: 1 }, layer: "below",
              }] });
            });
            player.on("plotly_unhover", () => {
              if (activeBand < 0) return;
              activeBand = -1;
              void window.Plotly.relayout(player, { shapes: baseShapes });
            });
          }
          block.prepend(wrapper);
          if (block.dataset.openleafRuns) {
            const { value: manifest, url: manifestUrl } = await readJson(block.dataset.openleafRuns, fileUrl);
            const runs = (manifest.runs || []).filter((run) => run && typeof run.id === "string" && typeof run.figure === "string");
            if (!runs.length) throw new Error("No chart runs");
            const controls = doc.createElement("div");
            controls.style.cssText = "margin:0 0 18px;font:14px Georgia,serif;color:#28333f";
            const label = doc.createElement("label");
            label.textContent = "Run ";
            const select = doc.createElement("select");
            select.dataset.openleafRunSelector = "";
            select.setAttribute("aria-label", "Select benchmark run");
            select.style.cssText = "font:inherit;background:white;color:inherit;border:1px solid #bbc2c7;padding:6px 10px;margin:0 0 12px 8px;max-width:100%";
            for (const run of runs) {
              const option = doc.createElement("option");
              option.value = run.id;
              option.textContent = run.label || run.id;
              select.append(option);
            }
            select.value = runs.some((run) => run.id === manifest.defaultRun) ? manifest.defaultRun : runs[0].id;
            label.append(select);
            const settings = doc.createElement("dl");
            settings.dataset.openleafRunSettings = "";
            settings.style.cssText = "display:grid;grid-template-columns:max-content 1fr;gap:4px 18px;margin:0;line-height:1.45";
            async function choose() {
              const run = runs.find((item) => item.id === select.value);
              settings.replaceChildren();
              const pairs = Array.isArray(run.settings) ? run.settings : Object.entries(run.settings || {});
              for (const [key, value] of pairs) {
                const term = doc.createElement("dt"), detail = doc.createElement("dd");
                term.textContent = String(key); detail.textContent = String(value); detail.style.margin = "0";
                settings.append(term, detail);
              }
              await draw(run.figure, manifestUrl);
            }
            select.addEventListener("input", (event) => event.stopPropagation());
            select.addEventListener("change", (event) => {
              event.stopPropagation();
              void choose().catch((error) => console.warn("Could not switch chart run:", error));
            });
            controls.append(label, settings);
            if (manifest.comparisonNote) {
              const note = doc.createElement("p"); note.textContent = String(manifest.comparisonNote);
              note.style.cssText = "margin:10px 0 0;color:#66717b;font-size:12px"; controls.append(note);
            }
            wrapper.append(controls, player);
            await choose();
          } else {
            wrapper.append(player);
            await draw(block.dataset.openleafPlot, fileUrl);
          }
        } catch (error) {
          console.warn("Could not render document plot:", error);
          // The document's static image remains visible on any failure.
        }
      });
    }

    function renderVideos(doc) {
      const style = doc.createElement("style");
      style.textContent = `
        [data-openleaf-video] { margin: 24px 0; }
        [data-openleaf-video-player] video { display:block; width:100%; max-height:70vh; background:#101619; border-radius:12px; }
        .openleaf-video-play { display:block; position:relative; width:100%; aspect-ratio:16/9; min-height:200px; border:0; border-radius:12px; overflow:hidden; cursor:pointer; background:#101619; color:white; }
        .openleaf-video-play img { width:100%; height:100%; position:absolute; inset:0; object-fit:contain; }
        .openleaf-video-play span { position:relative; display:inline-block; border-radius:30px; padding:14px 24px; background:#000c; font:bold 16px system-ui; }
        [data-openleaf-video-player] p { font:14px system-ui; }
      `;
      doc.head.append(style);
      doc.querySelectorAll("[data-openleaf-video]").forEach((block) => {
        const video = OpenleafVideo.parse(block.dataset.openleafVideo, fileUrl);
        const player = doc.createElement("div");
        player.dataset.openleafVideoPlayer = "";
        player.contentEditable = "false";
        const title = block.querySelector("figcaption")?.textContent || "Video";
        if (!video) {
          const error = doc.createElement("p");
          error.textContent = "Unsupported video. Use a YouTube link or an MP4, WebM, or Ogg video file.";
          player.append(error);
        } else {
          const button = doc.createElement("button");
          button.type = "button";
          button.className = "openleaf-video-play";
          button.setAttribute("aria-label", `Play ${title}`);
          const poster = doc.createElement("img");
          const posterUrl = video.poster || (block.dataset.openleafPoster ? new URL(block.dataset.openleafPoster, fileUrl).href : "");
          if (posterUrl) poster.src = posterUrl;
          poster.alt = "";
          poster.loading = "lazy";
          const label = doc.createElement("span");
          label.textContent = "▶ Play video";
          if (posterUrl) button.append(poster);
          button.append(label);
          button.addEventListener("click", () => OpenleafVideo.play(video, title));
          player.append(button);
        }
        block.prepend(player);
      });
    }

    function insertVideo(url, title) {
      const doc = frame.contentDocument;
      const range = doc.getSelection()?.rangeCount ? doc.getSelection().getRangeAt(0) : null;
      const template = doc.createElement("template");
      template.innerHTML = OpenleafVideo.markup(url, title);
      if (range && doc.body.contains(range.commonAncestorContainer) && !range.startContainer.parentElement?.closest("[data-openleaf-video-player]")) {
        range.deleteContents();
        range.insertNode(template.content);
      } else doc.body.append(template.content);
      const html = serialize();
      onChange(html);
      update(html, fileUrl, true);
    }

    function renderMath(doc) {
      const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) {
        if (!walker.currentNode.parentElement.closest("script,style,code,pre,[data-openleaf-latex]")) nodes.push(walker.currentNode);
      }
      for (const node of nodes) {
        const pattern = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g;
        let match, end = 0;
        const fragment = doc.createDocumentFragment();
        while ((match = pattern.exec(node.textContent))) {
          fragment.append(doc.createTextNode(node.textContent.slice(end, match.index)));
          const token = doc.createElement("span");
          token.dataset.openleafLatex = match[0];
          token.contentEditable = "false";
          token.innerHTML = katex.renderToString(match[1] ?? match[2], { displayMode: match[2] !== undefined, throwOnError: false, trust: false });
          if (editable) {
            token.title = "Double-click to edit LaTeX";
            token.addEventListener("dblclick", () => {
              const next = window.prompt("Edit LaTeX, including \\( … \\) or \\[ … \\] delimiters", token.dataset.openleafLatex);
              if (next === null) return;
              token.dataset.openleafLatex = next;
              const html = serialize();
              onChange(html);
              update(html, fileUrl, true);
            });
          }
          fragment.append(token);
          end = pattern.lastIndex;
        }
        if (end) {
          fragment.append(doc.createTextNode(node.textContent.slice(end)));
          node.replaceWith(fragment);
        }
      }
    }

    function update(html, url, force = false) {
      if (!force && sourceText === html && fileUrl === url) return;
      scrollTop = frame.contentDocument?.scrollingElement?.scrollTop || 0;
      frame.contentDocument?.querySelectorAll("[data-openleaf-plot-canvas]").forEach((plot) => window.Plotly?.purge(plot));
      sourceText = html;
      fileUrl = url;
      sourceDocument = new DOMParser().parseFromString(html, "text/html");
      const view = sourceDocument.cloneNode(true);
      // A restrictive sandbox prevents scripts, forms, popups, and top navigation.
      view.querySelectorAll('meta[http-equiv="refresh" i]').forEach((element) => element.remove());
      const base = view.createElement("base");
      base.href = url || location.href;
      view.querySelectorAll("base").forEach((element) => element.remove());
      view.head.prepend(base);
      const mathCss = view.createElement("link");
      mathCss.rel = "stylesheet";
      mathCss.href = new URL("node_modules/katex/dist/katex.min.css", location.href).href;
      view.head.append(mathCss);
      frame.onload = () => {
        const doc = frame.contentDocument;
        renderMath(doc);
        renderVideos(doc);
        renderPlots(doc);
        doc.designMode = editable ? "on" : "off";
        doc.scrollingElement.scrollTop = scrollTop;
        doc.addEventListener("click", (event) => {
          const link = event.target.closest("a");
          if (!link) return;
          event.preventDefault();
          const url = new URL(link.getAttribute("href") || "", fileUrl);
          if (url.protocol === "https:" || url.protocol === "http:") window.localOverleaf.openExternalLink(url.href);
          else if (url.protocol === "file:" && /\.(pdf|html?)$/i.test(url.pathname)) {
            if (url.pathname === new URL(fileUrl).pathname && url.hash) doc.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
            else onOpenDocument(url.href);
          }
        });
        doc.addEventListener("input", () => onChange(serialize()));
        doc.addEventListener("keydown", (event) => {
          if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
            event.preventDefault();
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "s", metaKey: event.metaKey, ctrlKey: event.ctrlKey, bubbles: true }));
          }
        });
      };
      frame.srcdoc = "<!DOCTYPE html>" + view.documentElement.outerHTML;
    }
    function pause() {
      frame.contentDocument?.querySelectorAll("video,audio").forEach((media) => media.pause());
    }
    return { frame, update, insertVideo, pause };
  }
  return { create };
})();
