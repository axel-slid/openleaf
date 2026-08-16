import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const FPS = 30;
const TRANSITION = 18;

const chapters = [
  {
    eyebrow: "01  ·  WRITE",
    title: "LaTeX + live PDF",
    copy: "Write source and see the compiled paper update beside it.",
    src: "real-app/editor.mp4",
    startFrom: 45,
    duration: 180,
    playbackRate: 1.25,
    aspect: 3024 / 1964,
    accent: "#77e7ff",
    shot: "wide",
    transition: "none",
  },
  {
    eyebrow: "02  ·  EDIT",
    title: "Code or visual mode",
    copy: "Move between precise LaTeX and direct visual editing without leaving the document.",
    src: "real-app/editor.mp4",
    startFrom: 135,
    duration: 150,
    playbackRate: 1.6,
    aspect: 3024 / 1964,
    accent: "#a68cff",
    shot: "right",
    transition: "wipe",
  },
  {
    eyebrow: "03  ·  DELEGATE",
    title: "Codex · Claude · Shell",
    copy: "Give agents the project, selected text, or a terminal—and keep the work visible.",
    src: "real-app/codex-agent-real.mp4",
    startFrom: 600,
    duration: 210,
    playbackRate: 4,
    aspect: 1524 / 896,
    accent: "#8ff4c6",
    shot: "left",
    transition: "diagonal",
  },
  {
    eyebrow: "04  ·  COMPUTE",
    title: "Persistent Python",
    copy: "Run cells beside the project and keep the interpreter connected while you work.",
    src: "real-app/features-python.mp4",
    startFrom: 60,
    duration: 165,
    playbackRate: 3,
    aspect: 1524 / 896,
    accent: "#f6dd6e",
    shot: "left",
    transition: "iris",
  },
  {
    eyebrow: "05  ·  PRESENT",
    title: "Editable PowerPoint",
    copy: "Open, edit, and present native .pptx files from the same workspace.",
    src: "real-app/features-pptx-editor.mp4",
    startFrom: 0,
    duration: 240,
    playbackRate: 4.8,
    aspect: 1524 / 896,
    accent: "#ff916f",
    shot: "center",
    transition: "lift",
  },
  {
    eyebrow: "06  ·  REVIEW",
    title: "History + GitHub",
    copy: "Inspect edits, restore earlier work, and move changes through review.",
    src: "real-app/features-history.mp4",
    startFrom: 540,
    duration: 150,
    playbackRate: 4.8,
    aspect: 1524 / 896,
    accent: "#73a7ff",
    shot: "center",
    transition: "wipe",
  },
  {
    eyebrow: "07  ·  THINK",
    title: "Notes + whiteboard",
    copy: "Sketch the idea, annotate it, and keep the reasoning next to the project.",
    src: "real-app/whiteboard.mp4",
    startFrom: 570,
    duration: 165,
    playbackRate: 6.5,
    aspect: 3024 / 1964,
    accent: "#ff79bf",
    shot: "right",
    transition: "diagonal",
  },
  {
    eyebrow: "08  ·  CONNECT",
    title: "Local + SSH projects",
    copy: "Work on this Mac or open a remote project with the same desktop interface.",
    src: "real-app/features-ssh.mp4",
    startFrom: 0,
    duration: 120,
    playbackRate: 3.2,
    aspect: 1524 / 896,
    accent: "#63dfda",
    shot: "center",
    transition: "iris",
  },
  {
    eyebrow: "09  ·  PERSONALIZE",
    title: "Agents that fit your workflow",
    copy: "Choose the agent for edits, prompts, and project instructions in workspace settings.",
    src: "real-app/agents-settings-real.mp4",
    startFrom: 300,
    duration: 120,
    playbackRate: 2.5,
    aspect: 1524 / 896,
    accent: "#b391ff",
    shot: "right",
    transition: "lift",
  },
];

const offsets = chapters.reduce((all, chapter, index) => {
  if (index === 0) return [0];
  return [...all, all[index - 1] + chapters[index - 1].duration - TRANSITION];
}, []);

export const OPENLEAF_FEATURE_TOUR_DURATION =
  offsets[offsets.length - 1] + chapters[chapters.length - 1].duration;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};

const revealFor = (type, amount) => {
  const value = Math.max(0, Math.min(1, amount));
  if (type === "none") return "inset(0 0 0 0 round 34px)";
  if (type === "wipe") {
    return `inset(0 ${100 - value * 100}% 0 0 round 34px)`;
  }
  if (type === "lift") {
    return `inset(${100 - value * 100}% 0 0 0 round 34px)`;
  }
  if (type === "iris") {
    return `circle(${value * 76}% at 58% 48%)`;
  }
  return `polygon(0 0, ${value * 125}% 0, ${Math.max(0, value * 125 - 25)}% 100%, 0 100%)`;
};

const cameraFor = (shot, progress) => {
  const ease = Easing.inOut(Easing.cubic);
  const p = interpolate(progress, [0, 1], [0, 1], {...clamp, easing: ease});
  const presets = {
    wide: {x: [-30, 20], y: [18, -8], scale: [0.965, 1.025], rotate: [-0.22, 0.12]},
    left: {x: [75, 22], y: [12, -6], scale: [1.07, 1.125], rotate: [0.18, -0.08]},
    right: {x: [-72, -18], y: [10, -7], scale: [1.075, 1.13], rotate: [-0.17, 0.07]},
    center: {x: [0, 0], y: [16, -10], scale: [0.98, 1.055], rotate: [-0.08, 0.08]},
  };
  const preset = presets[shot];
  return {
    x: interpolate(p, [0, 1], preset.x),
    y: interpolate(p, [0, 1], preset.y),
    scale: interpolate(p, [0, 1], preset.scale),
    rotate: interpolate(p, [0, 1], preset.rotate),
  };
};

const FeatureRail = ({active, accent}) => (
  <div
    style={{
      position: "absolute",
      right: 72,
      top: 58,
      display: "flex",
      alignItems: "center",
      gap: 9,
      padding: "13px 16px",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 999,
      background: "rgba(8, 11, 18, 0.56)",
      backdropFilter: "blur(18px)",
      boxShadow: "0 16px 44px rgba(0,0,0,0.28)",
    }}
  >
    {chapters.map((_, index) => (
      <div
        key={index}
        style={{
          width: index === active ? 34 : 8,
          height: 8,
          borderRadius: 99,
          background: index === active ? accent : "rgba(255,255,255,0.2)",
          boxShadow: index === active ? `0 0 18px ${accent}88` : "none",
          transition: "none",
        }}
      />
    ))}
  </div>
);

const FeatureLabel = ({chapter, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const labelDelay = index === 0 ? 0 : TRANSITION;
  const entrance = spring({
    fps,
    frame: Math.max(0, frame - labelDelay - 5),
    config: {damping: 18, stiffness: 140, mass: 0.8},
  });
  const opacity = interpolate(
    frame,
    [labelDelay + 3, labelDelay + 15],
    [0, 1],
    clamp,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        bottom: 58,
        width: 690,
        padding: "23px 26px 24px",
        borderRadius: 24,
        color: "#f7f9ff",
        background: "linear-gradient(135deg, rgba(8,11,18,0.91), rgba(15,19,30,0.76))",
        border: `1px solid ${chapter.accent}55`,
        boxShadow: "0 22px 70px rgba(0,0,0,0.46)",
        backdropFilter: "blur(22px)",
        opacity,
        transform: `translateY(${(1 - entrance) * 34}px)`,
      }}
    >
      <div style={{display: "flex", alignItems: "center", gap: 13, marginBottom: 10}}>
        <div
          style={{
            width: 33,
            height: 4,
            borderRadius: 10,
            background: chapter.accent,
            boxShadow: `0 0 20px ${chapter.accent}88`,
          }}
        />
        <div
          style={{
            fontSize: 17,
            fontWeight: 760,
            letterSpacing: 2.6,
            color: chapter.accent,
          }}
        >
          {chapter.eyebrow}
        </div>
      </div>
      <div style={{fontSize: 45, lineHeight: 1.02, fontWeight: 750, letterSpacing: -1.6}}>
        {chapter.title}
      </div>
      <div
        style={{
          marginTop: 10,
          fontSize: 21,
          lineHeight: 1.42,
          fontWeight: 470,
          letterSpacing: -0.15,
          color: "rgba(237,242,255,0.72)",
        }}
      >
        {chapter.copy}
      </div>
    </div>
  );
};

const FeatureChapter = ({chapter, index}) => {
  const frame = useCurrentFrame();
  const progress = frame / Math.max(1, chapter.duration - 1);
  const entry = index === 0 ? 1 : interpolate(frame, [0, TRANSITION], [0, 1], clamp);
  const isLast = index === chapters.length - 1;
  const exit = isLast
    ? 1
    : interpolate(frame, [chapter.duration - TRANSITION, chapter.duration], [1, 0], clamp);
  const camera = cameraFor(chapter.shot, progress);
  const width = Math.min(1570, 850 * chapter.aspect);
  const glowX = interpolate(progress, [0, 1], [-70, 95]);
  const glowY = interpolate(progress, [0, 1], [25, -45]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        opacity: exit,
        clipPath: revealFor(chapter.transition, entry),
        background:
          "radial-gradient(circle at 72% 18%, #182034 0, #0c1019 37%, #070a10 78%)",
        fontFamily: "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          right: -80 + glowX,
          top: -160 + glowY,
          borderRadius: "50%",
          background: chapter.accent,
          opacity: 0.12,
          filter: "blur(105px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "49%",
          width,
          height: 850,
          borderRadius: 30,
          overflow: "hidden",
          background: "#171c27",
          border: "1px solid rgba(255,255,255,0.17)",
          boxShadow: `0 44px 130px rgba(0,0,0,0.62), 0 0 90px ${chapter.accent}18`,
          transform: `translate(-50%, -50%) translate(${camera.x}px, ${camera.y}px) scale(${camera.scale}) rotate(${camera.rotate}deg)`,
          transformOrigin: "50% 50%",
        }}
      >
        <OffthreadVideo
          src={staticFile(chapter.src)}
          startFrom={chapter.startFrom}
          playbackRate={chapter.playbackRate}
          muted
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.035), transparent 19%, transparent 70%, rgba(4,7,12,0.13))",
          }}
        />
      </div>
      <FeatureRail active={index} accent={chapter.accent} />
      <FeatureLabel chapter={chapter} index={index} />
    </AbsoluteFill>
  );
};

export const OpenleafFeatureTour = () => (
  <AbsoluteFill style={{background: "#070a10"}}>
    {chapters.map((chapter, index) => (
      <Sequence
        key={chapter.title}
        from={offsets[index]}
        durationInFrames={chapter.duration}
        premountFor={FPS}
      >
        <FeatureChapter chapter={chapter} index={index} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
