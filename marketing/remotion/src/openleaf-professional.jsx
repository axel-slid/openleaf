import React, {useEffect} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {CodeEditor, FileTree, Icon, PdfPage, VisualEditor} from "./openleaf-digital-twin";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};
const PLAYBACK_SCALE = 1.4;
const TRANSITION = 18;
const baseScenes = {
  projects: [0, 50],
  latex: [50, 205],
  powerpoint: [205, 350],
  python: [350, 495],
  agents: [495, 625],
  remote: [625, 705],
  settings: [705, 780],
};
const scenes = Object.fromEntries(Object.entries(baseScenes).map(([name, range]) => [
  name,
  range.map((frame) => Math.round(frame * PLAYBACK_SCALE)),
]));
export const OPENLEAF_DURATION = Math.round(780 * PLAYBACK_SCALE);

const ease = (value) => Easing.out(Easing.cubic)(value);
const transitionEase = (value) => Easing.inOut(Easing.cubic)(value);

const Scene = ({range, children, first = false, last = false}) => {
  const frame = useCurrentFrame();
  const [start, end] = range;
  if (frame < start - TRANSITION || frame >= end + TRANSITION) return null;
  const enter = first ? 1 : transitionEase(interpolate(frame, [start - TRANSITION, start + TRANSITION], [0, 1], clamp));
  const leave = last ? 1 : transitionEase(interpolate(frame, [end - TRANSITION, end + TRANSITION], [1, 0], clamp));
  const opacity = Math.min(enter, leave);
  const translate = (1 - enter) * 18 - (1 - leave) * 10;
  const scale = 0.994 + enter * 0.006 + (1 - leave) * 0.006;
  return (
    <AbsoluteFill
      className="twin-scene"
      style={{
        opacity,
        filter: `blur(${(1 - opacity) * 2.5}px) saturate(${0.92 + opacity * 0.08})`,
        transform: `translateX(${translate}px) scale(${scale})`,
      }}
    >
      {children((frame - start) / PLAYBACK_SCALE)}
    </AbsoluteFill>
  );
};

const cursorPosition = (frame, actions) => {
  if (frame <= actions[0].arrive) return actions[0];
  for (let index = 1; index < actions.length; index += 1) {
    const previous = actions[index - 1];
    const next = actions[index];
    const moveStart = next.arrive - 5;
    if (frame < moveStart) return previous;
    if (frame <= next.arrive) {
      const progress = ease(interpolate(frame, [moveStart, next.arrive], [0, 1], clamp));
      return {
        x: interpolate(progress, [0, 1], [previous.x, next.x]),
        y: interpolate(progress, [0, 1], [previous.y, next.y]),
      };
    }
  }
  return actions.at(-1);
};

const Cursor = ({frame, actions}) => {
  const point = cursorPosition(frame, actions);
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

const Topbar = ({title, remote = false}) => (
  <header className="topbar">
    <div className="topbar-left">
      <button className="project-back-button" type="button">← <span>Projects</span></button>
      {remote ? <div className="ssh-connection-badge twin-ssh-badge" data-state="connected"><span className="ssh-connection-status-dot" /> Connected · gpu-lab</div> : null}
    </div>
    <p className="top-document-title">{title}</p>
    <div className="topbar-actions">
      <button className="topbar-action-button" type="button">↻ <span>Refresh Project</span></button>
      <button className="topbar-action-button" type="button">⌁ <span>History</span></button>
      <button className="topbar-action-button" type="button">⚙ <span>Settings</span></button>
      <div className="save-status" data-save-status="saved"><span>Saved</span><span className="save-status-icon" /></div>
    </div>
  </header>
);

const ProjectPreview = ({kind}) => (
  <div className={`project-preview twin-project-preview ${kind}`}>
    {kind === "pptx" ? <><i /><i /><i /><b>Quarterly Research</b></> : null}
    {kind === "python" ? <><code>import numpy as np</code><code>model.fit(data)</code><span className="mini-chart" /></> : null}
    {kind === "tex" ? <><h4>Attention Is All You Need</h4><p>Abstract</p><i /><i /><i /></> : null}
  </div>
);

const ProjectsScene = (frame) => {
  const actions = [{x: 442, y: 620, arrive: 24, click: 25}, {x: 442, y: 620, arrive: 25, click: 25}];
  return (
    <section className="project-screen twin-project-screen">
      <div className="project-shell">
        <header className="project-hero">
          <h1>Projects</h1>
          <div className="hero-actions">
            <button className="hero-action">New Project</button><button className="hero-action">Templates</button><button className="hero-action">New SSH Project</button><button className="settingsButton">Settings</button>
          </div>
        </header>
        <div className="project-tools"><input value="" readOnly placeholder="Search projects" /><div className="project-view-toggle"><button className="active">▦</button><button>☷</button></div><button>↻</button></div>
        <div className="project-grid twin-project-grid">
          {[
            ["Attention Is All You Need", "main.tex", "tex"],
            ["Quarterly Research", "review.pptx", "pptx"],
            ["Transformer Analysis", "analysis.ipynb", "python"],
            ["Remote GPU Lab", "ssh · gpu-lab", "remote"],
          ].map(([name, file, kind], index) => (
            <button className={`project-card ${index === 0 && frame >= 26 ? "opening" : ""}`} key={name}>
              <ProjectPreview kind={kind} /><div className="project-card-copy"><strong className="project-name">{name}</strong><span className="project-file">{file}</span><span className="project-meta">Edited just now</span></div>
            </button>
          ))}
        </div>
      </div>
      <Cursor frame={frame} actions={actions} />
    </section>
  );
};

const NotesPanel = ({open, draw}) => (
  <aside className={`notes-panel twin-notes-panel ${open ? "notes-open" : ""}`}>
    {!open ? <button className="notes-rail-open" type="button">Notes</button> : <div className="notes-body">
      <header className="notes-header"><div className="notes-mode-actions"><button className={`mode-button ${!draw ? "active" : ""}`}>Text</button><button className={`mode-button ${draw ? "active" : ""}`}>Draw</button></div><span>Research notes</span></header>
      {draw ? <div className="twin-whiteboard"><svg viewBox="0 0 320 680"><path pathLength="1" d="M32 90 C95 35 170 160 280 78 M55 250 C130 180 218 205 275 300 M75 420 L245 420 M160 335 L160 520" /></svg><p>cross-attention</p></div> : <div className="twin-note-text"><h3>Review checklist</h3><p>– compare attention heads</p><p>– rerun ablation table</p><p>– update Figure 3</p></div>}
    </div>}
  </aside>
);

const LatexScene = (frame) => {
  const visual = frame >= 26 && frame < 59;
  const compiling = frame >= 91 && frame < 112;
  const compiled = frame >= 112;
  const notes = frame >= 122;
  const draw = frame >= 137;
  const actions = [
    {x: 833, y: 68, arrive: 24, click: 25},
    {x: 755, y: 68, arrive: 57, click: 58},
    {x: 1060, y: 68, arrive: 89, click: 90},
    {x: 1898, y: 530, arrive: 120, click: 121},
    {x: 1660, y: 83, arrive: 135, click: 136},
  ];
  const drawProgress = ease(interpolate(frame, [137, 154], [0, 1], clamp));
  return (
    <section className="editor-screen twin-editor-screen">
      <Topbar title="Attention Is All You Need" />
      <main className={`workspace twin-workspace twin-complete-workspace ${notes ? "notes-visible" : ""}`}>
        <aside className="file-pane"><div className="file-pane-header"><h2>Files</h2><div className="file-header-actions"><button>↻</button><button>＋</button><button>▱</button></div></div><FileTree methodsActive={false} /><footer className="file-pane-footer"><span>12 files</span><span>LaTeX project</span></footer></aside>
        <div className="file-splitter" />
        <section className="source-pane twin-source-pane twin-latex-source"><div className="pane-header twin-source-header"><div className="source-heading"><h2>main.tex</h2><p>414 lines · 2,319 words</p></div><div className="source-mode-actions twin-mode-actions"><button className={`mode-button ${!visual ? "active" : ""}`}>Code</button><button className={`mode-button ${visual ? "active" : ""}`}>Visual</button></div></div><div className="text-tabs"><button className="text-tab active">main.tex　×</button></div><div className="editor-stack twin-editor-stack">{visual ? <VisualEditor /> : <CodeEditor methodsActive={false} />}</div><div className="terminal-panel twin-collapsed-terminal"><button className="collapsed-panel-rail">Terminal</button></div></section>
        <div className="splitter" />
        <section className="preview-pane log-collapsed twin-preview-pane"><div className="pane-header twin-preview-header"><div className="pdf-title-block"><h2>main.pdf</h2><p>{compiled ? "15 pages · just now" : "15 pages"}</p></div><button className={`compile-pill ${compiling ? "stale" : ""}`}>{compiling ? "Compiling…" : compiled ? "Compiled ✓" : "Compile"}</button><div className="pdf-header-actions twin-pdf-actions"><button className="pdf-action-button">Open PDF</button><button className="pdf-action-button">Download PDF</button><div className="pdf-controls"><button>−</button><span id="pdfZoomLabel">87%</span><button>+</button></div></div></div><div className="pdf-viewer-shell"><div className="pdf-viewer pdf-dark-render"><PdfPage compiled={compiled} methodsActive={false} /></div></div><section className="log-panel"><button className="collapsed-panel-rail log-collapsed-rail">{compiling ? "Compiling main.tex…" : compiled ? "Compile log · success" : "Compile log"}</button></section></section>
        <div className="twin-notes-animation" style={{"--draw-progress": drawProgress}}><NotesPanel open={notes} draw={draw} /></div>
      </main>
      {compiled && frame < 121 ? <div className="twin-toast"><span>✓</span>PDF compiled in 0.8s</div> : null}
      <Cursor frame={frame} actions={actions} />
    </section>
  );
};

const SlideThumb = ({number, active, variant = 0}) => (
  <button className={`pptx-slide-thumb ${active ? "active" : ""}`}><span className="pptx-slide-thumb-number">{number}</span><span className={`pptx-slide-thumb-preview twin-slide-thumb variant-${variant}`}><i /><b>{variant === 1 ? "Results" : variant === 2 ? "Roadmap" : "Openleaf"}</b></span><span className="pptx-slide-thumb-title">{variant === 1 ? "Results" : variant === 2 ? "Roadmap" : "Overview"}</span></button>
);

const SlideCanvas = ({chart, second, selected, chartProgress = 1}) => (
  <div className="pptx-slide-canvas twin-pptx-canvas">
    <div className="twin-slide-accent" />
    <div className={`pptx-element pptx-text-element twin-slide-title ${selected ? "selected" : ""}`}><span className="pptx-element-text">{second ? "Results that compound" : "Research without context switching"}</span>{selected ? <><i className="pptx-element-handle nw" /><i className="pptx-element-handle se" /></> : null}</div>
    <div className="pptx-element pptx-text-element twin-slide-copy"><span className="pptx-element-text">{second ? "Compile, analyze, present, and collaborate in one native workspace." : "LaTeX · live PDF · PowerPoint · Python · agents"}</span></div>
    {chart ? <div className="pptx-element twin-slide-chart" style={{opacity: chartProgress, transform:`translateY(${(1-chartProgress)*18}px)`}}><b>Iteration speed</b><div><i style={{height:"34%",transform:`scaleY(${chartProgress})`}} /><i style={{height:"52%",transform:`scaleY(${Math.max(0,(chartProgress-.12)/.88)})`}} /><i style={{height:"71%",transform:`scaleY(${Math.max(0,(chartProgress-.24)/.76)})`}} /><i style={{height:"92%",transform:`scaleY(${Math.max(0,(chartProgress-.36)/.64)})`}} /></div></div> : <div className="twin-slide-window"><i /><i /><i /><span /></div>}
  </div>
);

const PresentationScene = (frame) => {
  const selected = frame >= 26;
  const chart = frame >= 65;
  const second = frame >= 96;
  const presenting = frame >= 126;
  const actions = [
    {x: 318, y: 98, arrive: 24, click: 25},
    {x: 492, y: 98, arrive: 63, click: 64},
    {x: 285, y: 330, arrive: 94, click: 95},
    {x: 1880, y: 139, arrive: 124, click: 125},
  ];
  const chartProgress = ease(interpolate(frame, [65, 83], [0, 1], clamp));
  if (presenting) return <div className="twin-present-mode"><SlideCanvas chart second selected={false} chartProgress={1} /><div className="pptx-present-controls"><button>←</button><output>2 / 3</output><button>→</button><button>Exit</button></div><Cursor frame={frame} actions={actions} /></div>;
  return (
    <section className="presentation-screen twin-presentation-screen">
      <header className="pptx-topbar"><div className="pptx-topbar-left"><button className="project-back-button">← Projects</button><span className="pptx-file-badge">PPTX</span></div><div className="pptx-title-block"><strong>Quarterly Research</strong><div className="pptx-title-status-row"><span>Saved</span><span className="pptx-collaboration-status"><span />Shared editing</span></div></div><div className="pptx-topbar-actions"><button>⚙</button><button>▣</button></div></header>
      <nav className="pptx-menubar">{["File","Edit","View","Insert","Format","Slide","Arrange","Tools","Extensions","Help"].map(item=><button key={item}>{item}</button>)}</nav>
      <div className="pptx-commandbar"><button className="pptx-menus-toggle">Menus</button><div className="pptx-tool-group"><button>↶</button><button>↷</button><button>▣</button></div><div className="pptx-tool-group"><button className="pptx-fit-button">⌗ Fit</button></div><div className="pptx-tool-group twin-pptx-insert"><button>⌁</button><button className={selected ? "active" : ""}>T</button><button>╱</button><button>▧</button><button>□</button><button>○</button><button className={chart ? "active" : ""}>▥</button><button>▦</button></div>{selected ? <div className="pptx-context-toolbar"><span className="pptx-selection-chip">Text</span><select><option>Aptos</option></select><input value="28" readOnly /><button><b>B</b></button><button><i>I</i></button></div> : null}<div className="pptx-tool-spacer"/><div className="pptx-tool-group pptx-slide-style-tools"><button className="pptx-labeled-tool">Background</button><button className="pptx-labeled-tool">Layout</button><button className="pptx-labeled-tool">Theme</button><button className="pptx-labeled-tool">Transition</button></div></div>
      <main className="pptx-workspace"><aside className="pptx-file-pane"><header><strong>Files</strong><div className="file-header-actions"><button>↻</button><button>＋</button><button>▱</button></div></header><div className="file-tree pptx-file-tree"><div className="twin-file active"><span className="file-icon">PPT</span>Quarterly Research.pptx</div><div className="twin-file"><span className="file-icon">IMG</span>growth.png</div><div className="twin-file"><span className="file-icon">CSV</span>results.csv</div></div></aside><aside className="pptx-slide-pane"><header><strong>Slides</strong><span>3</span></header><div className="pptx-slide-list"><SlideThumb number="1" active={!second} /><SlideThumb number="2" active={second} variant={1}/><SlideThumb number="3" variant={2}/></div></aside><section className="pptx-stage-pane"><div className="pptx-stage-toolbar"><span>Slide {second ? 2 : 1}</span><div className="pptx-stage-toolbar-actions"><label className="pptx-stage-zoom-controls">Zoom　−　<input type="range" value="84" readOnly/>　+　84%</label><button className="pptx-stage-present-button">⌗ <span>Present</span></button></div></div><div className="pptx-stage-viewport"><SlideCanvas chart={chart} second={second} selected={selected} chartProgress={chartProgress}/></div></section></main>
      <footer className="pptx-statusbar"><span>Slide {second ? 2 : 1} of 3</span><button className="pptx-terminal-toggle">Terminal</button></footer>
      <Cursor frame={frame} actions={actions} />
    </section>
  );
};

const PythonChart = ({progress}) => (
  <div className="twin-python-chart"><div className="chart-grid"/><svg viewBox="0 0 520 250"><path className="chart-area" d="M20 212 C95 180 100 195 160 130 S260 160 310 86 S430 85 500 30 L500 230 L20 230Z" style={{opacity:progress*.22}}/><path className="chart-line" pathLength="1" d="M20 212 C95 180 100 195 160 130 S260 160 310 86 S430 85 500 30" style={{strokeDasharray:1,strokeDashoffset:1-progress}}/></svg><span>validation accuracy</span></div>
);

const PythonScene = (frame) => {
  const ran = frame >= 30;
  const notebook = frame >= 77;
  const ranAll = frame >= 108;
  const kernel = frame >= 132;
  const chartProgress = ease(interpolate(frame, [31, 54], [0, 1], clamp));
  const actions = [
    {x: 326, y: 143, arrive: 28, click: 29},
    {x: 105, y: 134, arrive: 75, click: 76},
    {x: 840, y: 143, arrive: 106, click: 107},
    {x: 805, y: 68, arrive: 130, click: 131},
  ];
  return (
    <section className="editor-screen twin-editor-screen">
      <Topbar title="Transformer Analysis" />
      <main className="workspace twin-workspace twin-python-workspace">
        <aside className="file-pane"><div className="file-pane-header"><h2>Files</h2><div className="file-header-actions"><button>↻</button><button>＋</button></div></div><div className="file-tree twin-file-tree">{["analysis.py","analysis.ipynb","model.py","results.csv","attention.png"].map((name,index)=><div className={`twin-file ${notebook ? index===1?"active":"" : index===0?"active":""}`} key={name}><span className="file-icon">{name.endsWith("ipynb")?"NB":name.endsWith("py")?"PY":"•"}</span>{name}</div>)}</div><footer className="file-pane-footer"><span>Python 3.12</span></footer></aside>
        <div className="file-splitter" />
        <section className="source-pane twin-source-pane twin-python-source"><div className="pane-header twin-source-header"><div className="source-heading"><h2>{notebook?"analysis.ipynb":"analysis.py"}</h2><p>{notebook?"4 cells":"38 lines · Python"}</p></div><div className="python-runtime-controls twin-python-runtime"><span className="vim-mode-indicator">NORMAL</span><button className="python-kernel-button">Python 3.12⌄</button></div></div><div className="text-tabs"><button className="text-tab active">{notebook?"analysis.ipynb":"analysis.py"}　×</button></div><div className="python-editor-toolbar twin-python-toolbar"><button>Run Cell</button><span>|</span><button>Run Above</button><span>|</span><button>Debug Cell</button>{notebook?<button className="twin-run-all">▷ Run All</button>:null}</div><div className="editor-stack twin-editor-stack">{notebook?<div className="ipynb-notebook-editor twin-notebook"><div className="ipynb-cell"><button className="ipynb-cell-run">▷</button><div className="ipynb-cell-body"><pre>import pandas as pd\nfrom openleaf import workspace</pre></div></div><div className="ipynb-cell"><button className="ipynb-cell-run">▷</button><div className="ipynb-cell-body"><pre>metrics = workspace.read_csv("results.csv")\nmetrics.plot()</pre>{ranAll?<small>Out [2]　interactive chart rendered</small>:null}</div></div></div>:<div className="twin-python-code"><span>1</span><code>import numpy as np</code><span>2</span><code>import matplotlib.pyplot as plt</code><span>4</span><code>epochs = np.arange(1, 25)</code><span>5</span><code>accuracy = model.evaluate(epochs)</code><span>7</span><code>plt.plot(epochs, accuracy)</code><span>8</span><code>plt.title("Validation accuracy")</code></div>}</div><div className="terminal-panel twin-collapsed-terminal"><button className="collapsed-panel-rail">Terminal</button></div>{kernel?<div className="twin-kernel-menu"><button className="active">✓ Python 3.12 · .venv</button><button>Python 3.11 · system</button><button>Connect to kernel…</button></div>:null}</section>
        <div className="splitter" />
        <section className="python-notebook-panel twin-python-output"><header className="python-notebook-header"><div className="python-notebook-heading"><h2>{ran?"Python 3.12 · Ready":"Python 3.12"}</h2></div><div className="python-notebook-actions"><button>Stop</button><button>Clear</button></div></header><div className="python-notebook-feed">{ran?<div className="python-run-card"><span className="python-execution-count">[1]</span><div className="python-run-source"><pre>plt.plot(epochs, accuracy)</pre></div><div className="python-run-output"><div className="python-run-label"><span className="python-run-status complete">●</span> completed in 0.42s</div><PythonChart progress={chartProgress}/></div></div>:<div className="terminal-empty">Run a cell to see rich Python output.</div>}</div></section>
      </main>
      <Cursor frame={frame} actions={actions}/>
    </section>
  );
};

const AgentPane = ({kind, frame}) => (
  <div className={`twin-agent-pane ${kind.toLowerCase()}`}><div className="twin-agent-brand">{kind === "Codex" ? "CX" : "CL"}　{kind}</div><p className="agent-banner">{kind === "Codex" ? "Reading AGENTS.md and active project…" : "Reviewing the compiled manuscript…"}</p>{frame > 70 ? <><p>✓ indexed 12 project files</p><p>✓ inspected compile log</p><p>{kind === "Codex" ? "→ editing sections/methods.tex" : "→ checking claims against results.csv"}</p><div className="twin-agent-diff"><span>+ clearer method description</span><span>+ updated Figure 3 reference</span></div></> : null}</div>
);

const AgentsScene = (frame) => {
  const menu = frame >= 17 && frame < 37;
  const codex = frame >= 37;
  const menu2 = frame >= 69 && frame < 92;
  const claude = frame >= 92;
  const split = frame >= 112;
  const actions = [{x:296,y:558,arrive:15,click:16},{x:360,y:635,arrive:35,click:36},{x:296,y:558,arrive:67,click:68},{x:360,y:665,arrive:90,click:91},{x:1840,y:544,arrive:110,click:111}];
  return (
    <section className="editor-screen twin-editor-screen"><Topbar title="Attention Is All You Need"/><main className="workspace twin-agent-workspace"><aside className="file-pane"><div className="file-pane-header"><h2>Files</h2></div><FileTree methodsActive/><footer className="file-pane-footer"><span>AGENTS.md loaded</span></footer></aside><div className="file-splitter"/><section className="source-pane twin-agent-source"><div className="pane-header"><div className="source-heading"><h2>methods.tex</h2><p>Agent workspace · project context enabled</p></div></div><div className="editor-stack twin-editor-stack"><CodeEditor methodsActive/></div><section className="terminal-panel twin-agent-terminal"><header className="terminal-header"><button className="twin-terminal-plus">+</button><div className="terminal-tabs"><button className={!codex?"terminal-tab active":"terminal-tab"}>SH　Shell</button>{codex?<button className="terminal-tab active">CX　Codex</button>:null}{claude?<button className="terminal-tab active">CL　Claude</button>:null}</div><button className={`twin-split-button ${split?"active":""}`}>▥</button></header><div className={`terminal-body twin-agent-body ${split?"split":""}`}>{codex?<AgentPane kind="Codex" frame={frame}/>:<div className="terminal-empty">Start Shell, Codex, or Claude. Use + for another shell.</div>}{claude?<AgentPane kind="Claude" frame={frame}/>:null}</div>{menu||menu2?<div className={`twin-terminal-menu ${menu2?"second":""}`}><button>›_　Shell</button><button className={!menu2?"active":""}>CX　Codex</button><button className={menu2?"active":""}>CL　Claude</button></div>:null}</section></section></main><Cursor frame={frame} actions={actions}/></section>
  );
};

const RemoteScene = (frame) => {
  const modal = frame >= 20;
  const connected = frame >= 55;
  const actions = [{x:1550,y:266,arrive:18,click:19},{x:1248,y:738,arrive:53,click:54}];
  return (
    <section className="project-screen twin-project-screen"><div className="project-shell"><header className="project-hero"><h1>Projects</h1><div className="hero-actions"><button>New Project</button><button>Templates</button><button className="active">New SSH Project</button><button>Settings</button></div></header><div className="project-tools"><input value="" readOnly placeholder="Search projects"/></div><div className="project-grid twin-project-grid"><button className="project-card"><ProjectPreview kind="tex"/><div className="project-card-copy"><strong>Attention Is All You Need</strong><span>main.tex</span></div></button><button className="project-card"><ProjectPreview kind="python"/><div className="project-card-copy"><strong>Remote GPU Lab</strong><span>ssh · gpu-lab</span></div></button></div></div>{modal?<><div className="twin-modal-backdrop"/><section className="new-project-panel twin-remote-panel"><header className="new-project-header"><div><p>REMOTE WORKSPACE</p><h2>{connected?"Connected to gpu-lab":"New SSH Project"}</h2></div><button>×</button></header>{connected?<div className="twin-remote-terminal"><div className="ssh-connection-badge" data-state="connected"><span className="ssh-connection-status-dot"/> gpu-lab · connected</div><pre><span>$</span> ssh alex@gpu-lab.local\n<span>✓</span> authenticated with SSH key\n<span>$</span> cd ~/research/transformer-study\n<span>$</span> git pull\nAlready up to date.\n<span>$</span> openleaf .</pre></div>:<div className="new-project-body twin-remote-form"><label>SSH host<input value="alex@gpu-lab.local" readOnly/></label><label>Remote path<input value="~/research/transformer-study" readOnly/></label><label>Identity<input value="~/.ssh/id_ed25519" readOnly/></label><button className="settings-action-button primary">Connect & Open Workspace</button></div>}</section></>:null}<Cursor frame={frame} actions={actions}/></section>
  );
};

const SettingsScene = (frame) => {
  const agents = frame >= 22;
  const saved = frame >= 58;
  const actions = [{x:486,y:479,arrive:20,click:21},{x:1438,y:676,arrive:56,click:57}];
  return (
    <section className="editor-screen twin-editor-screen"><Topbar title="Attention Is All You Need"/><main className="workspace twin-workspace"><aside className="file-pane"><div className="file-pane-header"><h2>Files</h2></div><FileTree methodsActive/></aside><div className="file-splitter"/><section className="source-pane twin-source-pane"><div className="pane-header"><h2>methods.tex</h2></div><div className="editor-stack twin-editor-stack"><CodeEditor methodsActive/></div></section><div className="splitter"/><section className="preview-pane twin-preview-pane"><div className="pane-header"><h2>main.pdf</h2></div><div className="pdf-viewer-shell"><div className="pdf-viewer pdf-dark-render"><PdfPage compiled methodsActive/></div></div></section></main><div className="twin-modal-backdrop"/><section className="settings-drawer twin-settings"><aside className="settings-sidebar"><button className="settings-close-button">×</button>{["General","Appearance","Editor","LaTeX","PDF","Terminal","Agents","Documentation"].map(label=><button className={`settings-nav-button ${agents&&label==="Agents"?"active":!agents&&label==="Appearance"?"active":""}`} key={label}>{label}</button>)}</aside><main className="settings-main"><header className="settings-header"><h2>{agents?"Agents":"Appearance"}</h2><input className="settings-search-input" readOnly placeholder="Search settings"/></header><div className="settings-content">{agents?<section className="settings-section active twin-agents-settings"><div><b>AGENTS.md</b><small>Project instructions for coding agents</small></div><textarea className="settings-code-editor" readOnly value={"# Openleaf project instructions\n\n- compile main.tex after edits\n- preserve bibliography keys\n- keep figures inside /figures\n- run Python checks before committing\n- report LaTeX warnings"}/><div className="settings-action-row"><button className="settings-action-button">Reload</button><button className="settings-action-button primary">{saved?"Saved ✓":"Save AGENTS.md"}</button></div><p className="settings-status">{saved?"Project instructions saved.":"Project instructions loaded."}</p></section>:<section className="settings-section active twin-appearance-settings"><h3>Theme</h3><div className="twin-theme-grid"><button>Light+</button><button className="active">Dark+</button><button>Glass</button></div><h3>Accent color</h3><div className="twin-swatches"><i/><i/><i/><i/><i/></div></section>}</div></main></section><Cursor frame={frame} actions={actions}/></section>
  );
};

const TransitionBloom = () => {
  const frame = useCurrentFrame();
  const boundaries = Object.values(scenes).slice(0, -1).map(([,end])=>end);
  const strength = boundaries.reduce((value, boundary)=>Math.max(value,interpolate(Math.abs(frame-boundary),[0,TRANSITION],[0.16,0],clamp)),0);
  return <div className="twin-transition-bloom" style={{opacity:strength,transform:`scale(${1 + strength * 0.12})`}}/>;
};

const LoopBridge = () => {
  const frame = useCurrentFrame();
  const opacity = transitionEase(interpolate(frame, [OPENLEAF_DURATION - TRANSITION, OPENLEAF_DURATION - 1], [0, 1], clamp));
  if (opacity <= 0) return null;
  return <AbsoluteFill className="twin-loop-bridge" style={{opacity}}>{ProjectsScene(0)}</AbsoluteFill>;
};

export const OpenleafProfessional = () => {
  useEffect(()=>{document.body.dataset.theme="dark";return()=>delete document.body.dataset.theme;},[]);
  return (
    <AbsoluteFill className="openleaf-twin twin-professional">
      <Scene range={scenes.projects} first>{(frame)=>ProjectsScene(frame)}</Scene>
      <Scene range={scenes.latex}>{(frame)=>LatexScene(frame)}</Scene>
      <Scene range={scenes.powerpoint}>{(frame)=>PresentationScene(frame)}</Scene>
      <Scene range={scenes.python}>{(frame)=>PythonScene(frame)}</Scene>
      <Scene range={scenes.agents}>{(frame)=>AgentsScene(frame)}</Scene>
      <Scene range={scenes.remote}>{(frame)=>RemoteScene(frame)}</Scene>
      <Scene range={scenes.settings} last>{(frame)=>SettingsScene(frame)}</Scene>
      <TransitionBloom/>
      <LoopBridge/>
    </AbsoluteFill>
  );
};
