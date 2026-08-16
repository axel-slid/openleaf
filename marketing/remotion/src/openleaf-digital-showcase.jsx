import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const TRANSITION = 20;

const scenes = [
  {
    id: "latex",
    src: "real-app/editor.mp4",
    startFrom: 45,
    duration: 165,
    playbackRate: 1.35,
    aspect: 3024 / 1964,
    accent: "#7ba7c8",
    camera: "wide",
    transition: "none",
    caption: "Write in LaTeX and watch the PDF update live",
  },
  {
    id: "visual",
    src: "real-app/editor.mp4",
    startFrom: 135,
    duration: 135,
    playbackRate: 1.75,
    aspect: 3024 / 1964,
    accent: "#9a87ef",
    camera: "right",
    transition: "split",
    caption: "Switch between code and visual editing",
  },
  {
    id: "agents",
    src: "real-app/codex-agent-real.mp4",
    startFrom: 600,
    duration: 180,
    playbackRate: 4,
    aspect: 1524 / 896,
    accent: "#68d8b1",
    camera: "left",
    transition: "split",
    caption: "Ask Codex to revise the project in place",
  },
  {
    id: "python",
    src: "real-app/features-python.mp4",
    startFrom: 60,
    duration: 135,
    playbackRate: 3,
    aspect: 1524 / 896,
    accent: "#e5c95c",
    camera: "left",
    transition: "lift",
    caption: "Run Python beside the paper you are writing",
  },
  {
    id: "powerpoint",
    src: "real-app/features-pptx-editor.mp4",
    startFrom: 0,
    duration: 210,
    playbackRate: 4.8,
    aspect: 1524 / 896,
    accent: "#ef785a",
    camera: "center",
    transition: "zoom",
    caption: "Build and edit slides without changing tools",
  },
  {
    id: "whiteboard",
    src: "real-app/whiteboard.mp4",
    startFrom: 570,
    duration: 150,
    playbackRate: 6.5,
    aspect: 3024 / 1964,
    accent: "#ef73ad",
    camera: "right",
    transition: "split",
    caption: "Sketch ideas on an infinite whiteboard",
  },
  {
    id: "ssh",
    src: "real-app/features-ssh.mp4",
    startFrom: 0,
    duration: 105,
    playbackRate: 3.2,
    aspect: 1524 / 896,
    accent: "#54cfcc",
    camera: "center",
    transition: "zoom",
    caption: "Keep the same workspace over SSH",
  },
  {
    id: "themes",
    duration: 330,
    aspect: 1192 / 768,
    accent: "#b1a0e9",
    camera: "wide",
    transition: "fade",
    themes: true,
    caption: "Match the workspace to the way you think",
  },
];

const starts = scenes.reduce((all, scene, index) => {
  if (index === 0) return [0];
  return [...all, all[index - 1] + scenes[index - 1].duration - TRANSITION];
}, []);

export const OPENLEAF_DIGITAL_SHOWCASE_DURATION =
  starts.at(-1) + scenes.at(-1).duration;

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};

const eased = (value) => Easing.inOut(Easing.cubic)(Math.max(0, Math.min(1, value)));

const revealClip = (type, rawProgress) => {
  const progress = eased(rawProgress);
  if (type === "none" || type === "flip" || type === "fade" || type === "zoom") {
    return "inset(0 0 0 0 round 30px)";
  }
  if (type === "split") {
    return `inset(0 ${50 - progress * 50}% 0 ${50 - progress * 50}% round 30px)`;
  }
  if (type === "diagonal") {
    return `polygon(0 0, ${progress * 125}% 0, ${Math.max(0, progress * 125 - 25)}% 100%, 0 100%)`;
  }
  if (type === "diagonal-reverse") {
    return `polygon(${100 - progress * 125}% 0, 100% 0, 100% 100%, ${Math.min(100, 125 - progress * 125)}% 100%)`;
  }
  if (type === "lift") {
    return `inset(${100 - progress * 100}% 0 0 0 round 30px)`;
  }
  if (type === "iris") {
    return `circle(${progress * 76}% at 50% 48%)`;
  }
  return "inset(0 0 0 0 round 30px)";
};

const cameraFor = (preset, progress) => {
  const p = eased(progress);
  const cameras = {
    wide: {
      x: [0, -20, 0],
      y: [0, 8, 0],
      scale: [1, 1.016, 1],
      rotateX: [0, 0.28, 0],
      rotateY: [0, -0.7, 0],
      rotateZ: [0, -0.08, 0],
    },
    left: {
      x: [0, 26, 0],
      y: [0, -7, 0],
      scale: [1, 1.018, 1],
      rotateX: [0, -0.24, 0],
      rotateY: [0, 0.9, 0],
      rotateZ: [0, 0.08, 0],
    },
    right: {
      x: [0, -26, 0],
      y: [0, 7, 0],
      scale: [1, 1.018, 1],
      rotateX: [0, 0.24, 0],
      rotateY: [0, -0.9, 0],
      rotateZ: [0, -0.08, 0],
    },
    center: {
      x: [0, 0, 0],
      y: [0, 7, 0],
      scale: [1, 1.016, 1],
      rotateX: [0, 0.24, 0],
      rotateY: [0, -0.42, 0],
      rotateZ: [0, -0.06, 0],
    },
  };
  const camera = cameras[preset];
  const read = (key) => interpolate(p, [0, 0.52, 1], camera[key]);
  return {
    x: read("x"),
    y: read("y"),
    scale: read("scale"),
    rotateX: read("rotateX"),
    rotateY: read("rotateY"),
    rotateZ: read("rotateZ"),
  };
};

const themeStates = [
  {src: "real-app/theme-nord.jpg", from: 0, to: 56, accent: "#718ca8"},
  {src: "real-app/theme-latex-nord.jpg", from: 42, to: 98, accent: "#718ca8"},
  {src: "real-app/theme-tokyo-night.jpg", from: 84, to: 140, accent: "#7069db"},
  {src: "real-app/theme-latex-tokyo-night.jpg", from: 126, to: 182, accent: "#7069db"},
  {src: "real-app/theme-molten-amber.jpg", from: 168, to: 224, accent: "#d57936"},
  {src: "real-app/theme-latex-molten-amber.jpg", from: 210, to: 266, accent: "#d57936"},
  {src: "real-app/theme-marigold-paper.jpg", from: 252, to: 308, accent: "#e7ca6c"},
  {src: "real-app/theme-latex-marigold-paper.jpg", from: 294, to: 330, accent: "#e7ca6c"},
];

const ThemeCycle = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: "#202631"}}>
      {themeStates.map((theme, index) => {
        const local = frame - theme.from;
        const entry = index === 0
          ? 1
          : interpolate(local, [0, 18], [0, 1], clamp);
        const scale = interpolate(local, [0, theme.to - theme.from], [1.005, 1.016], clamp);
        return (
          <Sequence key={theme.src} from={theme.from} durationInFrames={theme.to - theme.from}>
            <AbsoluteFill
              style={{
                opacity: entry,
                background: "#171d27",
              }}
            >
              <Img
                src={staticFile(theme.src)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: `scale(${scale})`,
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const Scene = ({scene, index, matteBackground}) => {
  const frame = useCurrentFrame();
  const progress = frame / Math.max(1, scene.duration - 1);
  const entry = index === 0
    ? 1
    : interpolate(frame, [0, TRANSITION], [0, 1], clamp);
  const camera = cameraFor(scene.camera, progress);
  const launch = index === 0
    ? interpolate(frame, [0, 28], [0, 1], clamp)
    : 1;
  const outro = index === scenes.length - 1
    ? interpolate(frame, [scene.duration - 30, scene.duration - 1], [1, 0], clamp)
    : 1;
  const captionInStart = index === 0 ? 12 : TRANSITION + 4;
  const captionOpacity = Math.min(
    interpolate(frame, [captionInStart, captionInStart + 16], [0, 1], clamp),
    interpolate(frame, [scene.duration - 26, scene.duration - 10], [1, 0], clamp),
  );
  const flip = scene.transition === "flip";
  const entryScale = flip
    ? interpolate(entry, [0, 1], [0.94, 1], clamp)
    : scene.transition === "zoom"
      ? interpolate(entry, [0, 1], [0.94, 1], clamp)
      : 1;
  const entryRotateY = flip
    ? interpolate(entry, [0, 1], [-10, 0], clamp)
    : 0;
  const glowX = interpolate(progress, [0, 1], [-70, 90]);
  const windowHeight = 900;
  const windowWidth = 1460;

  return (
    <AbsoluteFill style={{perspective: 1800, overflow: "hidden", opacity: outro}}>
      <AbsoluteFill
        style={{
          background: matteBackground
            ? "radial-gradient(circle at 50% 42%, rgba(98,76,128,.1), transparent 56%)"
            : "transparent",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          left: `calc(50% - 380px + ${glowX}px)`,
          top: -240,
          borderRadius: "50%",
          background: scene.accent,
          opacity: 0.12,
          filter: "blur(125px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: windowWidth,
          height: windowHeight,
          overflow: "hidden",
          borderRadius: 30,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "#222936",
          boxShadow: `0 58px 150px rgba(0,0,0,0.66), 0 12px 42px rgba(0,0,0,0.48), 0 0 90px ${scene.accent}18, inset 0 1px 0 rgba(255,255,255,0.13)`,
          opacity: (flip || scene.transition === "zoom" || scene.transition === "fade" ? entry : 1) * launch,
          clipPath: revealClip(scene.transition, entry),
          transform: `translate(-50%, -50%) translate3d(${camera.x}px, ${camera.y + (1 - launch) * 24}px, 0) rotateX(${camera.rotateX + (1 - launch) * 0.7}deg) rotateY(${camera.rotateY + entryRotateY}deg) rotateZ(${camera.rotateZ}deg) scale(${camera.scale * entryScale * (0.95 + launch * 0.05)})`,
          transformStyle: "preserve-3d",
          willChange: "transform, clip-path",
        }}
      >
        {scene.themes ? (
          <ThemeCycle />
        ) : (
          <OffthreadVideo
            muted
            src={staticFile(scene.src)}
            startFrom={scene.startFrom}
            playbackRate={scene.playbackRate}
            style={{width: "100%", height: "100%", objectFit: "contain"}}
          />
        )}
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.035), transparent 17%, transparent 76%, rgba(0,0,0,0.08))",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          right: 0,
          bottom: 38,
          left: 0,
          color: "rgba(255,255,255,.94)",
          font: "650 24px/1.2 Inter, ui-sans-serif, system-ui",
          letterSpacing: -0.35,
          textAlign: "center",
          textShadow: "0 4px 22px rgba(0,0,0,.92)",
          opacity: captionOpacity,
          transform: `translateY(${(1 - captionOpacity) * 12}px)`,
        }}
      >
        {scene.caption}
      </div>
    </AbsoluteFill>
  );
};

export const OpenleafDigitalShowcase = ({matteBackground = false}) => (
  <AbsoluteFill style={{background: matteBackground ? "#120e19" : "transparent"}}>
    {scenes.map((scene, index) => (
      <Sequence
        key={scene.id}
        from={starts[index]}
        durationInFrames={scene.duration}
        premountFor={30}
      >
        <Scene scene={scene} index={index} matteBackground={matteBackground} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
