import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const C = {
  ink: "#17121f",
  muted: "#716a7a",
  lavender: "#c9b5ef",
  lavenderDeep: "#8b5ed7",
  lavenderSoft: "#eee7fb",
  canvas: "#f7f5fa",
  panel: "#ffffff",
  line: "#c8c1d0",
  green: "#44a96c",
  red: "#c55757",
  blue: "#4d76c9",
  amber: "#c88937",
  dark: "#1c1d1f",
  darkPanel: "#252629",
  darkLine: "#3a3c40",
  darkText: "#f2f2f2",
};

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};

const sceneOpacity = (frame, duration, fadeFrames = 16) =>
  Math.min(
    interpolate(frame, [0, fadeFrames], [0, 1], clamp),
    interpolate(frame, [duration - fadeFrames, duration], [1, 0], clamp),
  );

const Button = ({children, active, primary, small, style = {}}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: small ? 32 : 40,
      padding: small ? "0 12px" : "0 17px",
      border: `1px solid ${active || primary ? C.lavenderDeep : C.line}`,
      borderRadius: 9,
      background: primary ? C.lavenderDeep : active ? C.lavenderSoft : C.panel,
      color: primary ? "#fff" : C.ink,
      fontSize: small ? 15 : 17,
      fontWeight: 650,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

const TrafficLights = () => (
  <div style={{display: "flex", gap: 9}}>
    {["#ff605c", "#ffbd44", "#00ca4e"].map((color) => (
      <span key={color} style={{width: 14, height: 14, borderRadius: "50%", background: color}} />
    ))}
  </div>
);

const Window = ({children, dark = false}) => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      background: dark ? C.dark : C.canvas,
      color: dark ? C.darkText : C.ink,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    }}
  >
    <div
      style={{
        height: 34,
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: `1px solid ${dark ? C.darkLine : C.line}`,
        background: dark ? "#202124" : "#f2eff6",
      }}
    >
      <TrafficLights />
    </div>
    <div style={{position: "absolute", top: 34, left: 0, right: 0, bottom: 0}}>{children}</div>
  </AbsoluteFill>
);

const Cursor = ({frame, points, clickAt}) => {
  const finalSegment = Math.max(0, points.length - 2);
  const nextPointIndex = points.findIndex((point, index) => index > 0 && frame <= point.at);
  const segment = nextPointIndex === -1 ? finalSegment : Math.max(0, nextPointIndex - 1);
  const a = points[segment] || points[0];
  const b = points[segment + 1] || a;
  const segmentDuration = Math.max(1, b.at - a.at);
  const travelFrames = Math.min(18, Math.max(8, Math.round(segmentDuration * 0.22)));
  const travelStart = Math.max(a.at, b.at - travelFrames);
  const rawProgress = interpolate(frame, [travelStart, b.at], [0, 1], clamp);
  const local = Easing.inOut(Easing.cubic)(rawProgress);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const distance = Math.max(1, Math.hypot(dx, dy));
  const curve = Math.sin(local * Math.PI) * Math.min(34, distance * 0.08) * (segment % 2 ? -1 : 1);
  const x = interpolate(local, [0, 1], [a.x, b.x], clamp) - (dy / distance) * curve;
  const y = interpolate(local, [0, 1], [a.y, b.y], clamp) + (dx / distance) * curve;
  const moving = rawProgress > 0 && rawProgress < 1;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const click = clickAt == null ? 0 : interpolate(Math.abs(frame - clickAt), [0, 8], [1, 0], clamp);
  return (
    <div style={{position: "absolute", left: x, top: y, zIndex: 80, pointerEvents: "none"}}>
      <div
        style={{
          position: "absolute",
          left: -31,
          top: 7,
          width: moving ? 32 : 0,
          height: 5,
          borderRadius: 8,
          background: "linear-gradient(90deg, transparent, rgba(139,94,215,.5))",
          opacity: moving ? 1 : 0,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "right center",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -21,
          top: -21,
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: `3px solid rgba(139, 94, 215, ${click})`,
          background: `rgba(139, 94, 215, ${click * 0.1})`,
          transform: `scale(${0.35 + click * 1.05})`,
          opacity: click,
        }}
      />
      <div
        style={{
          width: 15,
          height: 21,
          clipPath: "polygon(0 0, 0 100%, 29% 69%, 50% 100%, 62% 94%, 43% 65%, 100% 64%)",
          background: C.lavenderDeep,
          filter: "drop-shadow(0 1px 1px rgba(255,255,255,.85)) drop-shadow(0 4px 6px rgba(31,17,49,.4))",
          transform: `rotate(${moving ? Math.max(-8, Math.min(8, angle * 0.05)) : 0}deg)`,
        }}
      />
    </div>
  );
};

const Chapter = ({number, title, detail, dark = false}) => (
  <div
    style={{
      position: "absolute",
      left: 36,
      bottom: 28,
      zIndex: 70,
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "12px 15px",
      border: `1px solid ${dark ? C.darkLine : C.line}`,
      borderRadius: 12,
      background: dark ? "rgba(28,29,31,.92)" : "rgba(255,255,255,.94)",
      boxShadow: "0 10px 30px rgba(20,12,29,.12)",
    }}
  >
    <div style={{color: C.lavenderDeep, fontSize: 15, fontWeight: 800}}>{number}</div>
    <div>
      <div style={{fontSize: 17, fontWeight: 750}}>{title}</div>
      <div style={{marginTop: 2, color: dark ? "#a8aaae" : C.muted, fontSize: 13}}>{detail}</div>
    </div>
  </div>
);

const ProjectCard = ({name, file, time, kind = "tex", delay, frame}) => {
  const show = spring({frame: frame - delay, fps: 30, config: {damping: 18, stiffness: 120}});
  return (
    <div
      style={{
        height: 190,
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        border: `1.5px solid ${C.ink}`,
        borderRadius: 16,
        overflow: "hidden",
        background: C.panel,
        opacity: show,
        transform: `translateY(${(1 - show) * 24}px)`,
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          background: kind === "pptx" ? "#f4e4dd" : C.lavenderSoft,
          color: kind === "pptx" ? "#a84f2b" : C.lavenderDeep,
          fontSize: 17,
          fontWeight: 750,
        }}
      >
        {kind === "pptx" ? "SLIDES" : "PDF"}
      </div>
      <div style={{position: "relative", padding: "24px 26px"}}>
        <div style={{fontSize: 24, fontWeight: 760, lineHeight: 1.06}}>{name}</div>
        <div style={{marginTop: 9, color: C.muted, fontFamily: "ui-monospace, monospace", fontSize: 14}}>{file}</div>
        <div style={{position: "absolute", left: 26, bottom: 20, color: C.muted, fontSize: 14}}>{time}</div>
        <div style={{position: "absolute", right: 22, top: 19, color: C.muted, fontSize: 23}}>☆</div>
      </div>
    </div>
  );
};

const NewProjectModal = ({show}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      zIndex: 50,
      display: "grid",
      placeItems: "center",
      background: `rgba(35, 26, 48, ${show * 0.28})`,
      opacity: show,
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        width: 1010,
        padding: 36,
        border: `1px solid ${C.line}`,
        borderRadius: 20,
        background: C.panel,
        boxShadow: "0 30px 90px rgba(22,14,31,.2)",
        transform: `translateY(${(1 - show) * 28}px) scale(${0.96 + show * 0.04})`,
      }}
    >
      <div style={{fontSize: 34, fontWeight: 780}}>Create or import a project</div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginTop: 30}}>
        {[
          ["Blank paper", "Start with main.tex"],
          ["TeX file", "Open existing source"],
          ["PowerPoint", "Edit a .pptx deck"],
          ["Folder", "Use a local project"],
          ["Archive", "ZIP, TAR, TGZ"],
        ].map(([title, detail], index) => (
          <div
            key={title}
            style={{
              minHeight: 146,
              padding: 19,
              border: `1px solid ${index === 0 ? C.lavenderDeep : C.line}`,
              borderRadius: 14,
              background: index === 0 ? C.lavenderSoft : "#fff",
            }}
          >
            <div style={{color: C.lavenderDeep, fontSize: 28}}>{["＋", "TₑX", "P", "▣", "⌑"][index]}</div>
            <div style={{marginTop: 18, fontSize: 18, fontWeight: 720}}>{title}</div>
            <div style={{marginTop: 6, color: C.muted, fontSize: 13, lineHeight: 1.35}}>{detail}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProjectLibrary = () => {
  const frame = useCurrentFrame();
  const duration = 210;
  const openModal = interpolate(frame, [126, 144, 192, 208], [0, 1, 1, 0], clamp);
  return (
    <Window>
      <div style={{opacity: sceneOpacity(frame, duration)}}>
        <div style={{width: 1340, margin: "110px auto 0"}}>
          <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
            <div>
              <div style={{fontSize: 66, fontWeight: 780, letterSpacing: -3.7}}>Ready when you are.</div>
              <div style={{width: 425, height: 7, marginTop: 9, borderRadius: 8, background: C.lavenderDeep}} />
            </div>
            <div style={{display: "flex", gap: 14, alignItems: "center"}}>
              <Button>New Project</Button>
              <Button>Templates</Button>
              <Button>New SSH Project</Button>
              <Button>Settings</Button>
            </div>
          </div>
          <div
            style={{
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 48,
              padding: "0 18px",
              border: `1px solid ${C.line}`,
              borderRadius: 10,
              background: C.panel,
              color: C.muted,
              fontSize: 16,
            }}
          >
            <span>Search projects</span><span style={{letterSpacing: 12}}>▦ ≡ ↻</span>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18}}>
            <ProjectCard frame={frame} delay={12} name="Attention Is All You Need" file="ms.tex · arXiv-1706.03762v7" time="Edited today" />
            <ProjectCard frame={frame} delay={20} name="Research presentation" file="results.pptx · conference" time="Edited yesterday" kind="pptx" />
            <ProjectCard frame={frame} delay={28} name="Experiment notebook" file="analysis.ipynb · experiments" time="Edited 3 days ago" />
            <ProjectCard frame={frame} delay={36} name="Camera-ready manuscript" file="main.tex · submission" time="Edited last week" />
          </div>
        </div>
        <NewProjectModal show={openModal} />
        <Cursor
          frame={frame}
          points={[{x: 1440, y: 180, at: 0}, {x: 1137, y: 189, at: 122}, {x: 1137, y: 189, at: 210}]}
          clickAt={128}
        />
        <Chapter number="01" title="Projects" detail="Create, import, organize, and reopen local work" />
      </div>
    </Window>
  );
};

const FileTree = ({dark = false}) => {
  const files = [
    ["▾", "Figures"],
    ["  ◇", "model-architecture.png"],
    ["▾", "sections"],
    ["  TₑX", "introduction.tex"],
    ["  TₑX", "methods.tex"],
    ["  TₑX", "results.tex"],
    ["TₑX", "main.tex"],
    ["⌑", "references.bib"],
  ];
  return (
    <div style={{fontSize: 16, color: dark ? "#c8c9cc" : C.ink}}>
      {files.map(([icon, name], index) => (
        <div
          key={name}
          style={{
            display: "grid",
            gridTemplateColumns: "34px 1fr",
            alignItems: "center",
            minHeight: 38,
            padding: "0 12px",
            background: name === "main.tex" ? (dark ? "#34363a" : C.lavenderSoft) : "transparent",
            color: name === "main.tex" ? (dark ? "#fff" : C.ink) : undefined,
          }}
        >
          <span style={{color: name.endsWith(".tex") || name === "main.tex" ? C.lavenderDeep : dark ? "#7f838a" : C.muted}}>{icon}</span>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

const CodeEditor = ({frame, visual = false, dark = false}) => {
  const lines = [
    ["\\documentclass", "{article}"],
    ["\\usepackage", "{graphicx}"],
    ["\\usepackage", "{amsmath,booktabs}"],
    ["\\title", "{A Local-First Research Workflow}"],
    ["\\author", "{Openleaf Research Group}"],
    ["\\begin", "{document}"],
    ["\\maketitle", ""],
    ["\\begin", "{abstract}"],
    ["We present a focused workspace for writing,", ""],
    ["compiling, and reviewing technical documents.", ""],
    ["\\end", "{abstract}"],
    ["\\section", "{Introduction}"],
    ["Research moves faster when source and output", ""],
    ["remain visible in one coherent workspace.", ""],
    ["\\end", "{document}"],
  ];
  const typed = Math.floor(interpolate(frame, [45, 150], [0, lines.length], clamp));
  if (visual) {
    return (
      <div style={{height: "100%", overflow: "hidden", padding: "46px 62px", background: dark ? "#202124" : "#fff"}}>
        <div style={{maxWidth: 620, margin: "0 auto"}}>
          <div style={{fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700, textAlign: "center"}}>A Local-First Research Workflow</div>
          <div style={{marginTop: 16, color: dark ? "#b9babd" : C.muted, textAlign: "center", fontSize: 18}}>Openleaf Research Group</div>
          <div style={{marginTop: 44, fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700}}>Abstract</div>
          <p style={{fontFamily: "Georgia, serif", fontSize: 18, lineHeight: 1.65}}>We present a focused workspace for writing, compiling, and reviewing technical documents. Structured editing stays connected to the underlying LaTeX source.</p>
          <div style={{marginTop: 38, fontFamily: "Georgia, serif", fontSize: 25, fontWeight: 700}}>1&nbsp;&nbsp; Introduction</div>
          <p style={{fontFamily: "Georgia, serif", fontSize: 18, lineHeight: 1.65}}>Research moves faster when source and output remain visible in one coherent workspace.</p>
          <div style={{height: 46, marginTop: 32, borderLeft: `4px solid ${C.lavenderDeep}`, padding: "12px 16px", background: dark ? "#2b2c2f" : C.lavenderSoft, color: dark ? "#ddd" : C.ink, fontFamily: "Georgia, serif"}}>
            E = mc²
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{height: "100%", overflow: "hidden", padding: "28px 0", background: dark ? "#202124" : "#fff", fontFamily: "SFMono-Regular, Consolas, monospace", fontSize: 16, lineHeight: 1.67}}>
      {lines.map(([a, b], index) => (
        <div key={`${a}-${index}`} style={{display: "grid", gridTemplateColumns: "58px 1fr", opacity: index < typed ? 1 : 0.2}}>
          <span style={{color: dark ? "#72757d" : "#a09aa7", textAlign: "right", paddingRight: 18}}>{index + 1}</span>
          <span>
            <span style={{color: index < 8 || index > 9 ? "#bd73d5" : dark ? "#b9c8ab" : "#446f36"}}>{a}</span>
            <span style={{color: dark ? "#d6d7da" : C.ink}}>{b}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

const PdfPage = ({scale = 1, dark = false}) => (
  <div
    style={{
      width: 600 * scale,
      height: 790 * scale,
      padding: `${56 * scale}px ${64 * scale}px`,
      boxSizing: "border-box",
      background: dark ? "#efefef" : "#fff",
      color: "#252525",
      boxShadow: "0 12px 35px rgba(0,0,0,.18)",
      fontFamily: "Georgia, serif",
      transformOrigin: "top center",
    }}
  >
    <div style={{borderTop: `${2 * scale}px solid #222`, borderBottom: `${1 * scale}px solid #222`, padding: `${22 * scale}px 0`, textAlign: "center", fontSize: 25 * scale, fontWeight: 700}}>
      A Local-First Research Workflow
    </div>
    <div style={{marginTop: 27 * scale, textAlign: "center", fontSize: 12 * scale}}>Openleaf Research Group</div>
    <div style={{marginTop: 34 * scale, textAlign: "center", fontSize: 14 * scale, fontWeight: 700}}>Abstract</div>
    <div style={{marginTop: 10 * scale, fontSize: 11.5 * scale, lineHeight: 1.4, textAlign: "justify"}}>
      We present a focused workspace for writing, compiling, and reviewing technical documents. Keeping source and output together reduces context switching throughout the revision cycle.
    </div>
    <div style={{marginTop: 26 * scale, fontSize: 17 * scale, fontWeight: 700}}>1&nbsp;&nbsp; Introduction</div>
    {[0, 1, 2, 3, 4, 5].map((row) => (
      <div key={row} style={{height: 5 * scale, width: `${96 - (row % 3) * 4}%`, marginTop: 9 * scale, background: "#555"}} />
    ))}
    <div style={{marginTop: 30 * scale, textAlign: "center", fontSize: 22 * scale, fontStyle: "italic"}}>E = mc²</div>
    {[0, 1, 2, 3].map((row) => (
      <div key={row} style={{height: 5 * scale, width: `${92 - (row % 2) * 5}%`, marginTop: 9 * scale, background: "#555"}} />
    ))}
  </div>
);

const WorkspaceTopbar = ({saved = true, dark = false}) => (
  <div
    style={{
      height: 58,
      display: "grid",
      gridTemplateColumns: "280px 1fr 620px",
      alignItems: "center",
      padding: "0 18px",
      borderBottom: `1px solid ${dark ? C.darkLine : C.line}`,
      background: dark ? "#202124" : "#f7f5fa",
      fontSize: 16,
    }}
  >
    <div style={{fontWeight: 700}}>← Projects</div>
    <div style={{textAlign: "center", fontWeight: 760}}>A Local-First Research Workflow</div>
    <div style={{display: "flex", justifyContent: "flex-end", gap: 22, color: dark ? "#d8d9dc" : C.ink}}>
      <span>↻ Refresh</span><span>◷ History</span><span>◉ Push</span><span>⇣ Pull</span><span>⚙ Settings</span><span style={{color: saved ? C.green : C.amber}}>{saved ? "Saved ✓" : "Compiling…"}</span>
    </div>
  </div>
);

const LatexWorkspace = ({visual = false, review = false}) => {
  const frame = useCurrentFrame();
  const duration = visual ? 300 : 420;
  const dark = visual && frame > 210;
  const compiling = !visual && frame > 142 && frame < 194;
  const pdfRefresh = interpolate(frame, [176, 205], [0.25, 1], clamp);
  const history = review ? interpolate(frame, [110, 132, 220, 244], [0, 1, 1, 0], clamp) : 0;
  const notes = review ? interpolate(frame, [28, 48, 92, 110], [0, 1, 1, 0], clamp) : 0;
  const modeSwitch = visual ? interpolate(frame, [32, 50], [0, 1], clamp) : 0;
  return (
    <Window dark={dark}>
      <div style={{opacity: sceneOpacity(frame, duration)}}>
        <WorkspaceTopbar saved={!compiling} dark={dark} />
        <div style={{position: "absolute", top: 58, left: 0, right: 0, bottom: 0, display: "grid", gridTemplateColumns: "265px 760px 1fr"}}>
          <aside style={{borderRight: `1px solid ${dark ? C.darkLine : C.line}`, background: dark ? "#252629" : "#f8f7fa"}}>
            <div style={{height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${dark ? C.darkLine : C.line}`, fontSize: 17, fontWeight: 740}}><span>Files</span><span style={{letterSpacing: 8, color: C.muted}}>＋ ↻</span></div>
            <FileTree dark={dark} />
            <div style={{position: "absolute", left: 0, bottom: 0, width: 265, height: 44, display: "flex", alignItems: "center", justifyContent: "center", borderTop: `1px solid ${dark ? C.darkLine : C.line}`, color: dark ? "#b8b9bc" : C.muted}}>Terminal</div>
          </aside>
          <section style={{borderRight: `1px solid ${dark ? C.darkLine : C.line}`}}>
            <div style={{height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", borderBottom: `1px solid ${dark ? C.darkLine : C.line}`, background: dark ? "#252629" : "#fbfafc"}}>
              <div><div style={{fontSize: 18, fontWeight: 760}}>main.tex</div><div style={{marginTop: 4, color: dark ? "#999ca2" : C.muted, fontSize: 13}}>15 lines · 97 words</div></div>
              <div style={{display: "flex", alignItems: "center", gap: 8}}><Button small active={!visual || modeSwitch < 0.5}>Code</Button><Button small active={visual && modeSwitch >= 0.5}>Visual</Button><Button small>Normal</Button><span style={{marginLeft: 8}}>⛶</span></div>
            </div>
            <div style={{height: "calc(100% - 70px)"}}><CodeEditor frame={frame} visual={visual && modeSwitch >= 0.5} dark={dark} /></div>
          </section>
          <section style={{position: "relative", background: dark ? "#303135" : C.lavenderSoft}}>
            <div style={{height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px", borderBottom: `1px solid ${dark ? C.darkLine : C.line}`, background: dark ? "#252629" : "#fbfafc"}}>
              <div><div style={{fontSize: 18, fontWeight: 760}}>main.pdf</div><div style={{marginTop: 4, color: dark ? "#999ca2" : C.muted, fontSize: 13}}>3 pages</div></div>
              <div style={{display: "flex", alignItems: "center", gap: 11}}><Button small primary={compiling}>{compiling ? "Compiling…" : "Compile"}</Button><span>▤</span><span>↗</span><span>⇩</span><span>−</span><span style={{fontSize: 14}}>100%</span><span>＋</span><span>⇔</span></div>
            </div>
            <div style={{height: "calc(100% - 70px)", display: "grid", placeItems: "center", opacity: visual ? 1 : pdfRefresh}}><PdfPage scale={0.92} dark={dark} /></div>
            {compiling && <div style={{position: "absolute", right: 30, top: 92, padding: "12px 16px", border: `1px solid ${C.line}`, borderRadius: 10, background: "#fff", color: C.ink, fontSize: 14}}>tectonic · compiling main.tex</div>}
          </section>
        </div>
        {review && (
          <>
            <div style={{position: "absolute", right: 0, top: 92, bottom: 0, width: 460, zIndex: 35, padding: 25, borderLeft: `1px solid ${C.line}`, background: "#fff", opacity: history, transform: `translateX(${(1 - history) * 470}px)`}}>
              <div style={{fontSize: 27, fontWeight: 780}}>History</div>
              {["Compiled main.tex", "Updated introduction.tex", "Saved project settings", "Downloaded main.pdf"].map((item, index) => (
                <div key={item} style={{marginTop: 20, padding: "17px 0", borderBottom: `1px solid ${C.line}`}}><div style={{fontSize: 16, fontWeight: 690}}>{item}</div><div style={{marginTop: 5, color: C.muted, fontSize: 13}}>{index * 3 + 2} minutes ago</div></div>
              ))}
            </div>
            <div style={{position: "absolute", left: 260, right: 0, bottom: 0, height: 250, zIndex: 34, display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${C.line}`, background: "#fff", opacity: notes, transform: `translateY(${(1 - notes) * 260}px)`}}>
              <div style={{padding: 20, borderRight: `1px solid ${C.line}`}}><div style={{fontWeight: 760}}>Notes</div><div style={{marginTop: 15, color: C.muted, lineHeight: 1.7}}>## Revision checklist<br/>- Tighten abstract<br/>- Verify citations<br/>- Export final PDF</div></div>
              <div style={{padding: 20}}><div style={{fontWeight: 760}}>Compile log</div><div style={{marginTop: 15, color: C.green, fontFamily: "ui-monospace, monospace", lineHeight: 1.7}}>Running tectonic main.tex<br/>Resolved 14 references<br/>Output written to main.pdf<br/>Build completed in 1.2s</div></div>
            </div>
          </>
        )}
        <Cursor
          frame={frame}
          points={visual ? [{x: 570, y: 126, at: 0}, {x: 677, y: 126, at: 38}, {x: 1690, y: 82, at: 196}, {x: 1690, y: 82, at: duration}] : [{x: 620, y: 330, at: 0}, {x: 1374, y: 125, at: 145}, {x: 1374, y: 125, at: duration}]}
          clickAt={visual ? 42 : 150}
        />
        <Chapter
          number={review ? "03" : visual ? "03" : "02"}
          title={review ? "Review tools" : visual ? "Code and Visual" : "LaTeX + live PDF"}
          detail={review ? "Notes, history, logs, GitHub, and export stay in context" : visual ? "Switch between exact source and structured editing" : "Edit, compile locally, and inspect output side by side"}
          dark={dark}
        />
      </div>
    </Window>
  );
};

const SlideCanvas = ({frame}) => {
  const selected = frame > 72;
  const moved = interpolate(frame, [92, 150], [0, 1], clamp);
  return (
    <div style={{position: "relative", width: 1040, height: 585, overflow: "hidden", background: "#f6f1e8", boxShadow: "0 8px 28px rgba(0,0,0,.2)"}}>
      <div style={{position: "absolute", left: 0, top: 0, width: 32, height: "100%", background: "#7f65bb"}} />
      <div style={{position: "absolute", left: 72, top: 64, fontSize: 48, fontWeight: 780}}>Study results</div>
      <div style={{position: "absolute", left: 74, top: 132, width: 350, color: C.muted, fontSize: 22, lineHeight: 1.45}}>A concise overview of the primary outcomes across three evaluation cohorts.</div>
      <div
        style={{
          position: "absolute",
          left: 480 + moved * 95,
          top: 124 - moved * 18,
          width: 455,
          height: 320,
          border: selected ? `3px solid ${C.lavenderDeep}` : "3px solid transparent",
          background: "#fff",
        }}
      >
        <div style={{display: "flex", alignItems: "end", justifyContent: "space-around", height: 250, padding: "30px 34px 0"}}>
          {[112, 178, 216, 164].map((height, index) => <div key={height} style={{width: 58, height, background: [C.lavenderDeep, C.green, C.blue, C.amber][index]}} />)}
        </div>
        <div style={{display: "flex", justifyContent: "space-around", padding: "17px 34px 0", color: C.muted, fontSize: 14}}><span>A</span><span>B</span><span>C</span><span>D</span></div>
        {selected && ["-7px -7px", "calc(100% - 7px) -7px", "-7px calc(100% - 7px)", "calc(100% - 7px) calc(100% - 7px)"].map((position) => {
          const [left, top] = position.split(" ");
          return <span key={position} style={{position: "absolute", left, top, width: 12, height: 12, border: `2px solid ${C.lavenderDeep}`, background: "#fff"}} />;
        })}
      </div>
      <div style={{position: "absolute", left: 74, bottom: 58, display: "flex", gap: 10}}>{["Dataset v2", "n = 248", "95% CI"].map((text) => <span key={text} style={{padding: "8px 12px", border: `1px solid ${C.line}`, borderRadius: 20, fontSize: 14}}>{text}</span>)}</div>
    </div>
  );
};

const PowerPointWorkspace = () => {
  const frame = useCurrentFrame();
  const duration = 285;
  const saved = frame > 192;
  return (
    <Window>
      <div style={{opacity: sceneOpacity(frame, duration)}}>
        <div style={{height: 58, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: `1px solid ${C.line}`}}><div style={{fontWeight: 740}}>← Projects&nbsp;&nbsp;&nbsp; Research presentation</div><div style={{display: "flex", gap: 12}}><Button small>Present</Button><Button small primary>Save PowerPoint</Button><Button small>Settings</Button></div></div>
        <div style={{height: 42, display: "flex", alignItems: "center", gap: 24, padding: "0 22px", borderBottom: `1px solid ${C.line}`, fontSize: 14}}>{["File", "Edit", "View", "Insert", "Format", "Slide", "Arrange", "Tools", "Extensions", "Help"].map((x) => <span key={x}>{x}</span>)}</div>
        <div style={{height: 78, display: "flex", alignItems: "center", gap: 10, padding: "0 18px", borderBottom: `1px solid ${C.line}`, background: "#fbfafc"}}>
          {['↶','↷','▣','T','╱','▧','○','▥','▤'].map((x, i) => <Button key={`${x}-${i}`} small active={i === 2}>{x}</Button>)}
          <div style={{width: 1, height: 36, margin: "0 6px", background: C.line}} />
          <Button small>Inter</Button><Button small>28</Button><Button small><b>B</b></Button><Button small><i>I</i></Button><Button small>Align</Button><Button small>Fill</Button>
          {saved && <span style={{marginLeft: "auto", color: C.green, fontWeight: 720}}>Saved with backup ✓</span>}
        </div>
        <div style={{position: "absolute", top: 178, left: 0, right: 0, bottom: 0, display: "grid", gridTemplateColumns: "260px 1fr 255px"}}>
          <aside style={{padding: 16, borderRight: `1px solid ${C.line}`, background: "#f4f2f6"}}>
            {[0, 1, 2, 3].map((slide) => <div key={slide} style={{height: 128, marginBottom: 14, padding: 8, border: `2px solid ${slide === 1 ? C.lavenderDeep : C.line}`, borderRadius: 8, background: "#fff"}}><div style={{height: "100%", display: "grid", placeItems: "center", background: slide === 1 ? "#f6f1e8" : C.lavenderSoft, color: C.muted, fontSize: 14}}>Slide {slide + 1}</div></div>)}
          </aside>
          <main style={{display: "grid", placeItems: "center", background: "#dedbe2"}}><SlideCanvas frame={frame} /></main>
          <aside style={{padding: 18, borderLeft: `1px solid ${C.line}`, background: "#fbfafc"}}><div style={{fontSize: 20, fontWeight: 750}}>Format options</div>{["Position", "Size", "Fill", "Border", "Opacity", "Arrange"].map((x, i) => <div key={x} style={{display: "flex", justifyContent: "space-between", padding: "20px 0", borderBottom: `1px solid ${C.line}`, color: i < 4 ? C.ink : C.muted}}><span>{x}</span><span>›</span></div>)}</aside>
        </div>
        <Cursor frame={frame} points={[{x: 922, y: 490, at: 0}, {x: 1200, y: 420, at: 80}, {x: 1340, y: 350, at: 150}, {x: 1630, y: 72, at: 200}, {x: 1630, y: 72, at: duration}]} clickAt={82} />
        <Chapter number="04" title="Native PowerPoint editing" detail="Select, move, style, present, and save real .pptx content" />
      </div>
    </Window>
  );
};

const PythonWorkspace = () => {
  const frame = useCurrentFrame();
  const duration = 255;
  const running = frame > 54 && frame < 94;
  const output = interpolate(frame, [88, 112], [0, 1], clamp);
  const bars = [0.58, 0.82, 0.68, 0.94, 0.76];
  return (
    <Window dark>
      <div style={{opacity: sceneOpacity(frame, duration)}}>
        <WorkspaceTopbar dark saved={!running} />
        <div style={{position: "absolute", top: 58, left: 0, right: 0, bottom: 0, display: "grid", gridTemplateColumns: "250px 800px 1fr"}}>
          <aside style={{borderRight: `1px solid ${C.darkLine}`, background: C.darkPanel}}><div style={{height: 55, padding: "18px", borderBottom: `1px solid ${C.darkLine}`, fontWeight: 740}}>Files</div><FileTree dark /></aside>
          <section style={{borderRight: `1px solid ${C.darkLine}`}}>
            <div style={{height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 17px", borderBottom: `1px solid ${C.darkLine}`, background: C.darkPanel}}><div><b>analysis.ipynb</b><div style={{marginTop: 5, color: "#9b9da2", fontSize: 13}}>4 cells · Python 3.12</div></div><div style={{display: "flex", gap: 9}}><Button small primary={running}>{running ? "Running…" : "Run Cell"}</Button><Button small>Run Above</Button><Button small>Debug Cell</Button><Button small>Python 3.12</Button></div></div>
            <div style={{padding: "24px 28px", fontFamily: "SFMono-Regular, Consolas, monospace", fontSize: 17, lineHeight: 1.7}}>
              <div style={{color: "#8ab4f8"}}>import <span style={{color: "#c58af9"}}>pandas</span> as pd</div>
              <div style={{color: "#8ab4f8"}}>import <span style={{color: "#c58af9"}}>matplotlib.pyplot</span> as plt</div>
              <div style={{height: 24}} />
              <div><span style={{color: "#9aa0a6"}}># Load experiment metrics</span></div>
              <div>results = pd.read_csv(<span style={{color: "#81c995"}}>'results.csv'</span>)</div>
              <div>summary = results.groupby(<span style={{color: "#81c995"}}>'cohort'</span>).mean()</div>
              <div>summary.plot(kind=<span style={{color: "#81c995"}}>'bar'</span>)</div>
              <div>plt.title(<span style={{color: "#81c995"}}>'Evaluation by cohort'</span>)</div>
              <div style={{marginTop: 40, padding: 15, borderLeft: `3px solid ${C.lavenderDeep}`, background: "#282a2e", color: "#bdc1c6"}}>Shift + Enter to run the current cell</div>
            </div>
          </section>
          <section style={{position: "relative", padding: 30, background: "#202124"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}><div><div style={{fontSize: 21, fontWeight: 760}}>Notebook output</div><div style={{marginTop: 5, color: "#9b9da2", fontSize: 13}}>Persistent kernel · ready</div></div><div style={{display: "flex", gap: 8}}><Button small>Stop</Button><Button small>Clear</Button></div></div>
            <div style={{height: 610, marginTop: 32, padding: 26, border: `1px solid ${C.darkLine}`, background: "#fff", color: C.ink, opacity: output, transform: `translateY(${(1 - output) * 18}px)`}}>
              <div style={{fontSize: 21, fontWeight: 750}}>Evaluation by cohort</div>
              <div style={{height: 470, display: "flex", alignItems: "end", gap: 38, padding: "50px 40px 35px", borderLeft: "1px solid #777", borderBottom: "1px solid #777"}}>{bars.map((height, index) => <div key={height} style={{flex: 1, height: `${height * 100}%`, background: [C.lavenderDeep, C.blue, C.green, C.amber, "#b85e79"][index], transform: `scaleY(${output})`, transformOrigin: "bottom"}} />)}</div>
              <div style={{display: "flex", justifyContent: "space-around", marginTop: 16, color: C.muted, fontSize: 13}}>{["A", "B", "C", "D", "E"].map(x => <span key={x}>Cohort {x}</span>)}</div>
            </div>
          </section>
        </div>
        <Cursor frame={frame} points={[{x: 610, y: 340, at: 0}, {x: 716, y: 126, at: 50}, {x: 716, y: 126, at: duration}]} clickAt={56} />
        <Chapter number="05" title="Python notebooks" detail="Choose an interpreter, run cells, debug, and keep output beside code" dark />
      </div>
    </Window>
  );
};

const SettingsAndRemote = () => {
  const frame = useCurrentFrame();
  const duration = 255;
  const themeShift = interpolate(frame, [88, 118], [0, 1], clamp);
  const remoteShow = interpolate(frame, [150, 174], [0, 1], clamp);
  const options = ["Auto compile", "Auto save", "Show file sidebar", "Show minimap", "Wrap editor text", "Spell and grammar check", "Vim shortcuts", "Relative line numbers", "Notes panel"];
  return (
    <Window>
      <div style={{opacity: sceneOpacity(frame, duration)}}>
        <div style={{position: "absolute", inset: 0, background: `rgba(52,42,66,${0.18 + themeShift * 0.2})`}} />
        <div style={{position: "absolute", left: 220, top: 85, width: 1480, height: 840, display: "grid", gridTemplateColumns: "300px 1fr", overflow: "hidden", border: `1px solid ${C.line}`, borderRadius: 18, background: C.panel, boxShadow: "0 28px 80px rgba(30,20,42,.22)"}}>
          <aside style={{position: "relative", padding: "28px 20px", borderRight: `1px solid ${C.line}`, background: "#fbfafc"}}><Button small>×</Button><div style={{marginTop: 30, color: C.muted, fontSize: 13, fontWeight: 750}}>GENERAL</div>{["Workspace", "Appearance"].map((x, i) => <div key={x} style={{marginTop: 14, padding: "13px 15px", border: `2px solid ${i === (themeShift > .5 ? 1 : 0) ? C.lavenderDeep : "transparent"}`, borderRadius: 9, background: i === (themeShift > .5 ? 1 : 0) ? C.lavenderSoft : "transparent", fontWeight: 690}}>{x}</div>)}<div style={{position: "absolute", left: 20, right: 20, bottom: 25, lineHeight: 2.8, fontWeight: 650}}><div>Profile</div><div>LaTeX Handbook</div><div>Documentation</div></div></aside>
          <main style={{padding: "34px 38px"}}>
            <div style={{display: "flex", alignItems: "center", gap: 28, paddingBottom: 24, borderBottom: `1px solid ${C.line}`}}><div style={{fontSize: 30, fontWeight: 780}}>{themeShift > .5 ? "Appearance" : "Workspace"}</div><div style={{width: 300, padding: "10px 0", borderBottom: `1px solid ${C.line}`, color: C.muted}}>Search settings</div></div>
            {themeShift < .5 ? (
              <div style={{marginTop: 18}}>{options.map((option, index) => <div key={option} style={{height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`}}><span>{option}</span><span style={{width: 18, height: 18, display: "grid", placeItems: "center", border: `1px solid ${C.line}`, background: [1,4,6,8].includes(index) ? C.lavenderDeep : "#fff", color: "#fff", fontSize: 13}}>{[1,4,6,8].includes(index) ? "✓" : ""}</span></div>)}</div>
            ) : (
              <div style={{marginTop: 30}}><div style={{fontSize: 17, fontWeight: 700}}>Theme gallery</div><div style={{display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginTop: 20}}>{[["Openleaf Light", "#f6f3fa", "#8b5ed7"], ["Editorial Dark", "#202124", "#8ab4f8"], ["High Contrast", "#000", "#f5e642"], ["Paper", "#eee8db", "#3f6f55"]].map(([name,bg,accent],i) => <div key={name} style={{height: 180, padding: 15, border: `2px solid ${i===1 ? C.lavenderDeep : C.line}`, borderRadius: 12, background: bg, color: bg==="#202124"||bg==="#000" ? "#fff" : C.ink}}><div style={{height: 18, borderRadius: 3, background: accent}}/><div style={{display:"grid",gridTemplateColumns:"35% 1fr",gap:8,marginTop:10,height:90}}><div style={{background:"rgba(127,127,127,.25)"}}/><div style={{background:"rgba(127,127,127,.15)"}}/></div><div style={{marginTop:8,fontSize:14,fontWeight:700}}>{name}</div></div>)}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:22,marginTop:28}}><div><b>PDF rendering</b><div style={{display:"flex",gap:9,marginTop:15}}><Button small>Adaptive</Button><Button small>Original</Button><Button small>Invert</Button></div></div><div><b>Editor typography</b><div style={{height:42,marginTop:15,padding:"11px 14px",border:`1px solid ${C.line}`,borderRadius:8}}>SF Mono · 15 px</div></div></div></div>
            )}
          </main>
        </div>
        <div style={{position:"absolute",left:430,top:180,width:1060,padding:30,border:`1px solid ${C.line}`,borderRadius:16,background:"#fff",boxShadow:"0 24px 75px rgba(30,20,42,.24)",opacity:remoteShow,transform:`translateY(${(1-remoteShow)*25}px)`}}><div style={{fontSize:28,fontWeight:780}}>New SSH project</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginTop:24}}><div><div style={{fontSize:14,color:C.muted}}>SSH host</div><div style={{marginTop:7,padding:14,border:`1px solid ${C.line}`,borderRadius:8,fontFamily:"ui-monospace,monospace"}}>research@compute.example.edu</div></div><div><div style={{fontSize:14,color:C.muted}}>Remote path</div><div style={{marginTop:7,padding:14,border:`1px solid ${C.line}`,borderRadius:8,fontFamily:"ui-monospace,monospace"}}>/work/papers/submission</div></div></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:24}}><div style={{color:C.muted}}>Mirror remote files locally for editing and PDF preview.</div><Button primary>Connect</Button></div></div>
        <Cursor frame={frame} points={[{x:530,y:520,at:0},{x:354,y:280,at:88},{x:1510,y:190,at:150},{x:1510,y:190,at:duration}]} clickAt={92}/>
        <Chapter number="06" title="Remote work + personalization" detail="SSH projects, themes, Vim, minimap, auto-save, and layout controls" />
      </div>
    </Window>
  );
};

const Closing = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({frame, fps, config: {damping: 20, stiffness: 90}});
  const features = ["Projects", "LaTeX", "Live PDF", "Visual mode", "PowerPoint", "Python", "Notes", "History", "GitHub", "SSH", "Themes", "Export"];
  return (
    <AbsoluteFill style={{background: C.ink, color: "#fff", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"}}>
      <div style={{width: 1500, margin: "170px auto 0", opacity: reveal, transform: `translateY(${(1-reveal)*35}px)`}}>
        <div style={{color: C.lavender, fontSize: 24, fontWeight: 780, letterSpacing: 4, textTransform: "uppercase"}}>Openleaf</div>
        <div style={{marginTop: 28, fontSize: 102, fontWeight: 720, lineHeight: 1.02, letterSpacing: -5}}>Your complete local<br/>research workspace.</div>
        <div style={{display: "flex", flexWrap: "wrap", gap: 12, marginTop: 62}}>{features.map((feature,index) => {const chip=spring({frame:frame-18-index*3,fps,config:{damping:20,stiffness:115}});return <div key={feature} style={{padding:"12px 17px",border:"1px solid #49404f",borderRadius:30,color:index<6?"#fff":"#bbb3c0",fontSize:17,opacity:chip,transform:`translateY(${(1-chip)*15}px)`}}>{feature}</div>})}</div>
        <div style={{marginTop: 58, color: "#b9b1bf", fontSize: 27}}>Write. Compile. Present. Analyze. Review.</div>
      </div>
    </AbsoluteFill>
  );
};

export const OpenleafDemo = () => (
  <AbsoluteFill style={{background: C.ink}}>
    <Sequence from={0} durationInFrames={210}><ProjectLibrary /></Sequence>
    <Sequence from={195} durationInFrames={420}><LatexWorkspace /></Sequence>
    <Sequence from={600} durationInFrames={300}><LatexWorkspace visual review /></Sequence>
    <Sequence from={885} durationInFrames={285}><PowerPointWorkspace /></Sequence>
    <Sequence from={1155} durationInFrames={255}><PythonWorkspace /></Sequence>
    <Sequence from={1395} durationInFrames={255}><SettingsAndRemote /></Sequence>
    <Sequence from={1635} durationInFrames={165}><Closing /></Sequence>
  </AbsoluteFill>
);
