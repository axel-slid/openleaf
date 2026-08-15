import React, {useEffect} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import "./openleaf-digital-twin.css";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};

const actions = [
  {name: "Visual", x: 833, y: 68, arrive: 18, click: 19},
  {name: "Code", x: 755, y: 68, arrive: 55, click: 56},
  {name: "Compile", x: 1060, y: 68, arrive: 97, click: 98},
  {name: "Open PDF", x: 1585, y: 68, arrive: 151, click: 152},
  {name: "Download PDF", x: 1716, y: 68, arrive: 188, click: 189},
  {name: "methods.tex", x: 94, y: 279, arrive: 225, click: 226},
  {name: "New terminal", x: 296, y: 889, arrive: 266, click: 267},
  {name: "Codex", x: 360, y: 963, arrive: 296, click: 297},
  {name: "Settings", x: 1792, y: 21, arrive: 340, click: 341},
  {name: "Agents", x: 486, y: 479, arrive: 375, click: 376},
  {name: "Close settings", x: 399, y: 165, arrive: 420, click: 421},
];

export const Icon = ({children, viewBox = "0 0 24 24"}) => (
  <svg className="icon" viewBox={viewBox} aria-hidden="true">{children}</svg>
);

const cursorAt = (frame) => {
  if (frame <= actions[0].arrive) return actions[0];
  for (let index = 1; index < actions.length; index += 1) {
    const previous = actions[index - 1];
    const next = actions[index];
    const moveStart = next.arrive - 5;
    if (frame < moveStart) return previous;
    if (frame <= next.arrive) {
      const progress = Easing.out(Easing.cubic)(interpolate(frame, [moveStart, next.arrive], [0, 1], clamp));
      return {
        x: interpolate(progress, [0, 1], [previous.x, next.x]),
        y: interpolate(progress, [0, 1], [previous.y, next.y]),
      };
    }
  }
  return actions.at(-1);
};

const Cursor = () => {
  const frame = useCurrentFrame();
  const point = cursorAt(frame);
  const click = actions.reduce((value, action) => Math.max(
    value,
    interpolate(Math.abs(frame - action.click), [0, 7], [1, 0], clamp),
  ), 0);
  return (
    <div className="twin-cursor" style={{left: point.x, top: point.y}}>
      <span className="twin-click" style={{opacity: click, transform: `scale(${0.35 + click})`}} />
      <span className="twin-pointer" />
    </div>
  );
};

export const FileTree = ({methodsActive}) => (
  <div className="file-tree twin-file-tree">
    <div className="twin-folder">▼ <span>▰</span> figures</div>
    {["architecture.png", "attention-map.png", "results.pdf"].map((name) => (
      <div className="twin-file nested" key={name}><span className="file-icon">{name.endsWith("pdf") ? "PDF" : "IMG"}</span>{name}</div>
    ))}
    <div className="twin-folder">▼ <span>▰</span> sections</div>
    {["abstract.tex", "introduction.tex", "methods.tex", "results.tex"].map((name) => (
      <div className={`twin-file nested ${methodsActive && name === "methods.tex" ? "active" : (!methodsActive && name === "introduction.tex" ? "active" : "")}`} key={name}>
        <span className="file-icon">TeX</span>{name}
      </div>
    ))}
    {["bibliography.bib", "main.pdf", "main.tex", "README.md"].map((name) => (
      <div className={`twin-file ${name === "main.tex" && !methodsActive ? "selected" : ""}`} key={name}>
        <span className="file-icon">{name.endsWith(".pdf") ? "PDF" : name.endsWith(".tex") ? "TeX" : "•"}</span>{name}
      </div>
    ))}
  </div>
);

const sourceLines = [
  ["\\documentclass", "{article}"],
  ["\\usepackage", "{amsmath, graphicx, booktabs}"],
  ["\\title", "{Attention Is All You Need}"],
  ["\\author", "{Openleaf Research Group}"],
  ["", ""],
  ["\\begin", "{document}"],
  ["\\maketitle", ""],
  ["", ""],
  ["\\section", "{Introduction}"],
  ["Transformers replace recurrence with", " attention."],
  ["The architecture enables parallel", " computation."],
  ["", ""],
  ["\\input", "{sections/methods}"],
  ["\\input", "{sections/results}"],
  ["", ""],
  ["\\bibliographystyle", "{plain}"],
  ["\\bibliography", "{bibliography}"],
  ["\\end", "{document}"],
];

const methodLines = [
  ["\\section", "{Method}"],
  ["\\subsection", "{Scaled Dot-Product Attention}"],
  ["", ""],
  ["We compute the matrix of outputs as:", ""],
  ["", ""],
  ["\\begin", "{equation}"],
  ["  Attention(Q,K,V) = softmax(", "QK^T / \\sqrt{d_k})V"],
  ["\\end", "{equation}"],
  ["", ""],
  ["\\subsection", "{Multi-Head Attention}"],
  ["Parallel attention heads learn", " complementary representations."],
  ["", ""],
  ["\\begin", "{figure}[h]"],
  ["  \\includegraphics", "[width=.7\\linewidth]{figures/attention-map.png}"],
  ["  \\caption", "{Attention weights across eight heads.}"],
  ["\\end", "{figure}"],
];

export const CodeEditor = ({methodsActive}) => {
  const lines = methodsActive ? methodLines : sourceLines;
  return (
    <div className="twin-code-editor">
      <div className="twin-code-lines">
        {lines.map(([command, rest], index) => (
          <div className="twin-code-line" key={`${index}-${command}`}>
            <span className="twin-line-number">{index + 1}</span>
            <code><span className="syntax-command">{command}</span><span className="syntax-rest">{rest}</span></code>
          </div>
        ))}
      </div>
      <div className="twin-minimap">
        {Array.from({length: 41}).map((_, index) => <i key={index} style={{width: `${35 + ((index * 37) % 58)}%`}} />)}
      </div>
    </div>
  );
};

export const VisualEditor = () => (
  <div className="visual-editor twin-visual-editor">
    <article>
      <h1>Attention Is All You Need</h1>
      <p className="authors">Openleaf Research Group</p>
      <h2>Introduction</h2>
      <p>Transformers replace recurrence with attention, allowing every token to connect directly with the rest of a sequence.</p>
      <h2>Scaled Dot-Product Attention</h2>
      <div className="equation">Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V</div>
      <p>Multiple heads learn complementary representations and make the architecture efficient to train.</p>
    </article>
  </div>
);

export const PdfPage = ({methodsActive, compiled}) => (
  <div className={`twin-pdf-page ${compiled ? "compiled" : ""}`}>
    <div className="paper-rule" />
    <h1>Attention Is All You Need</h1>
    <div className="paper-rule thin" />
    <div className="paper-authors"><b>A. Researcher</b><b>B. Researcher</b><b>C. Researcher</b></div>
    <h2>{methodsActive ? "2  Method" : "Abstract"}</h2>
    <p>{methodsActive ? "We compute attention on queries, keys, and values simultaneously. Multi-head attention projects the inputs into complementary representation subspaces." : "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose a new architecture based entirely on attention mechanisms."}</p>
    {methodsActive ? <div className="paper-equation">Attention(Q,K,V) = softmax(QKᵀ / √dₖ)V</div> : null}
    <h2>{methodsActive ? "2.1  Multi-Head Attention" : "1  Introduction"}</h2>
    <p>Experiments establish strong quality while requiring significantly less time to train. The model is more parallelizable and reaches a new state of the art.</p>
    <p>Attention connects positions across the document and learns useful relationships without recurrence.</p>
    <div className="paper-columns">
      <p>Our architecture uses stacked self-attention and point-wise, fully connected layers. Residual connections surround each sublayer.</p>
      <p>The decoder attends to the encoder output while masking later positions to preserve autoregressive behavior.</p>
    </div>
  </div>
);

const Terminal = ({frame}) => {
  const menuOpen = frame >= 268 && frame < 298;
  const codexOpen = frame >= 298;
  return (
    <section className="terminal-panel twin-terminal">
      <header className="terminal-header">
        <button className="twin-terminal-plus" type="button">+</button>
        <div className="terminal-tabs">
          <button className={`terminal-tab ${!codexOpen ? "active" : ""}`} type="button"><span className="terminal-tab-kind">SH</span> Shell</button>
          {codexOpen ? <button className="terminal-tab active" type="button"><span className="terminal-tab-kind terminal-tab-kind-codex">CX</span> Codex</button> : null}
        </div>
        <div className="twin-terminal-actions">⌗　□　×</div>
      </header>
      <div className="terminal-body twin-terminal-body">
        {codexOpen ? (
          <div className="twin-terminal-output">
            <p><span>openleaf</span> $ codex</p>
            <p className="agent-banner">╭─ Codex · project-aware agent ─────────────────╮</p>
            <p>│ Reading AGENTS.md and active LaTeX sources… │</p>
            <p>╰─────────────────────────────────────────────╯</p>
            <p className="agent-done">✓ workspace indexed　✓ main.tex compiled</p>
          </div>
        ) : <div className="terminal-empty">Start Shell, Codex, or Claude. Use + for another shell.</div>}
      </div>
      {menuOpen ? (
        <div className="twin-terminal-menu">
          <button type="button"><span>›_</span> Shell</button>
          <button className="active" type="button"><span>CX</span> Codex</button>
          <button type="button"><span>CL</span> Claude</button>
        </div>
      ) : null}
    </section>
  );
};

const Settings = ({frame}) => {
  const agents = frame >= 377;
  return (
    <>
      <div className="twin-modal-backdrop" />
      <section className="settings-drawer twin-settings">
        <aside className="settings-sidebar">
          <button className="settings-close-button" type="button" aria-label="Close settings">×</button>
          {["General", "Appearance", "Editor", "LaTeX", "PDF", "Terminal", "Agents", "Documentation"].map((label) => (
            <button className={`settings-nav-button ${agents && label === "Agents" ? "active" : (!agents && label === "Appearance" ? "active" : "")}`} type="button" key={label}>{label}</button>
          ))}
        </aside>
        <main className="settings-main">
          <header className="settings-header"><h2>{agents ? "Agents" : "Appearance"}</h2><input className="settings-search-input" value="" readOnly placeholder="Search settings" /></header>
          <div className="settings-content">
            {agents ? (
              <section className="settings-section active twin-agents-settings">
                <div><b>AGENTS.md</b><small>Project instructions for coding agents</small></div>
                <textarea className="settings-code-editor" readOnly value={"# Openleaf agent instructions\n\n- compile main.tex after edits\n- preserve bibliography keys\n- keep figures inside /figures\n- report any LaTeX warnings"} />
                <div className="settings-action-row"><button className="settings-action-button">Reload</button><button className="settings-action-button primary">Save AGENTS.md</button></div>
                <p className="settings-status">Project instructions loaded.</p>
              </section>
            ) : (
              <section className="settings-section active twin-appearance-settings">
                <h3>Theme</h3>
                <div className="twin-theme-grid"><button>Light+</button><button className="active">Dark+</button><button>Glass</button></div>
                <h3>Accent color</h3>
                <div className="twin-swatches"><i /><i /><i /><i /><i /></div>
                <h3>Editor</h3><label><span>Minimap</span><input type="checkbox" defaultChecked /></label><label><span>Relative line numbers</span><input type="checkbox" /></label>
              </section>
            )}
          </div>
        </main>
      </section>
    </>
  );
};

const Toast = ({frame}) => {
  const open = frame >= 153 && frame < 178;
  const download = frame >= 190 && frame < 218;
  if (!open && !download) return null;
  return <div className="twin-toast"><span>✓</span>{open ? "Opened main.pdf" : "Downloaded main.pdf"}</div>;
};

export const OpenleafDigitalTwin = () => {
  const frame = useCurrentFrame();
  useEffect(() => {
    document.body.dataset.theme = "dark";
    return () => delete document.body.dataset.theme;
  }, []);
  const visual = frame >= 20 && frame < 57;
  const compiling = frame >= 99 && frame < 130;
  const compiled = frame >= 130;
  const methodsActive = frame >= 227;
  const settingsOpen = frame >= 342 && frame < 422;

  return (
    <AbsoluteFill className="openleaf-twin" style={{background: "#11151d"}}>
      <section className="editor-screen twin-editor-screen">
        <header className="topbar">
          <div className="topbar-left"><button className="project-back-button" type="button">← <span>Projects</span></button></div>
          <p className="top-document-title">Attention Is All You Need</p>
          <div className="topbar-actions">
            <button className="topbar-action-button" type="button">↻ <span>Refresh Project</span></button>
            <button className="topbar-action-button" type="button">⌁ <span>History</span></button>
            <button className="topbar-action-button" type="button">⚙ <span>Settings</span></button>
            <div className="save-status" data-save-status="saved"><span>Saved</span><span className="save-status-icon" /></div>
          </div>
        </header>

        <main className="workspace twin-workspace">
          <aside className="file-pane">
            <div className="file-pane-header"><h2>Files</h2><div className="file-header-actions"><button className="icon-button">↻</button><button className="icon-button">＋</button><button className="icon-button">▱</button></div></div>
            <FileTree methodsActive={methodsActive} />
            <footer className="file-pane-footer"><span>12 files</span><span>LaTeX project</span></footer>
          </aside>
          <div className="file-splitter" />

          <section className="source-pane twin-source-pane">
            <div className="pane-header twin-source-header">
              <div className="source-heading"><h2>{methodsActive ? "methods.tex" : "main.tex"}</h2><p>{methodsActive ? "16 lines · 54 words" : "414 lines · 2,319 words"}</p></div>
              <div className="source-mode-actions twin-mode-actions">
                <button className={`mode-button ${!visual ? "active" : ""}`} type="button">Code</button>
                <button className={`mode-button ${visual ? "active" : ""}`} type="button">Visual</button>
              </div>
            </div>
            <div className="text-tabs"><button className="text-tab active"><span className="text-tab-name">{methodsActive ? "methods.tex" : "main.tex"}</span><span className="text-tab-close">×</span></button></div>
            <div className="editor-stack twin-editor-stack">{visual ? <VisualEditor /> : <CodeEditor methodsActive={methodsActive} />}</div>
            <Terminal frame={frame} />
          </section>
          <div className="splitter" />

          <section className="preview-pane log-collapsed twin-preview-pane">
            <div className="pane-header twin-preview-header">
              <div className="pdf-title-block"><h2>main.pdf</h2><p>{compiled ? "15 pages · just now" : "15 pages"}</p></div>
              <button className={`compile-pill ${compiling ? "stale" : ""}`} type="button">{compiling ? "Compiling…" : compiled ? "Compiled ✓" : "Compile"}</button>
              <div className="pdf-header-actions twin-pdf-actions">
                <button className="pdf-action-button" type="button"><Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M9 15h6" /></Icon> Open PDF</button>
                <button className="pdf-action-button" type="button"><Icon><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></Icon> Download PDF</button>
                <div className="pdf-controls"><button>−</button><span id="pdfZoomLabel">87%</span><button>+</button></div>
              </div>
            </div>
            <div className="pdf-viewer-shell"><div className="pdf-viewer pdf-dark-render"><PdfPage methodsActive={methodsActive} compiled={compiled} /></div></div>
            <section className="log-panel"><button className="collapsed-panel-rail log-collapsed-rail" type="button">{compiling ? "Compiling main.tex…" : compiled ? "Compile log · success" : "Compile log"}</button></section>
          </section>
        </main>
      </section>
      <Toast frame={frame} />
      {settingsOpen ? <Settings frame={frame} /> : null}
      <Cursor />
    </AbsoluteFill>
  );
};
