/* HTML previews never run page scripts; editing keeps the original scripts and LaTeX in the saved source. */
window.OpenleafHtmlEditor = (() => {
  function create({ editable = false, onChange = () => {} } = {}) {
    const frame = document.createElement("iframe");
    frame.className = "html-live-frame";
    frame.title = editable ? "Visual HTML editor" : "Live HTML preview";
    frame.setAttribute("sandbox", "allow-same-origin");
    let sourceDocument, sourceText = "", fileUrl = "", scrollTop = 0;

    function serialize() {
      const body = frame.contentDocument.body.cloneNode(true);
      body.querySelectorAll("[data-openleaf-latex]").forEach((token) => {
        token.replaceWith(body.ownerDocument.createTextNode(token.dataset.openleafLatex));
      });
      const clean = sourceDocument.cloneNode(true);
      clean.body.innerHTML = body.innerHTML;
      return (sourceDocument.doctype ? "<!DOCTYPE html>\n" : "") + clean.documentElement.outerHTML;
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
        doc.designMode = editable ? "on" : "off";
        doc.scrollingElement.scrollTop = scrollTop;
        doc.addEventListener("click", (event) => { if (event.target.closest("a")) event.preventDefault(); });
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
    return { frame, update };
  }
  return { create };
})();
