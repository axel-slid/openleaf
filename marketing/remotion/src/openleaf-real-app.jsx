import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FADE = 12;

const clips = [
  {
    id: "editor",
    src: "real-app/editor.mp4",
    duration: 300,
    startFrom: 45,
    playbackRate: 1.15,
    aspectRatio: "3024 / 1964",
    motion: {
      x: [-76, 38, -18],
      y: [34, -26, 10],
      rotateX: [1.8, -0.8, 0.4],
      rotateY: [-3.8, 2.2, -1.2],
      rotateZ: [-0.8, 0.5, -0.25],
      scale: [0.94, 1.025, 0.985],
    },
  },
  {
    id: "agent-prompt",
    src: "real-app/codex-agent-real.mp4",
    duration: 300,
    startFrom: 60,
    playbackRate: 2.2,
    aspectRatio: "1524 / 896",
    motion: {
      x: [96, -48, 18],
      y: [-24, 30, -8],
      rotateX: [-1.2, 1.1, -0.4],
      rotateY: [4.6, -2.4, 1],
      rotateZ: [0.9, -0.45, 0.2],
      scale: [0.91, 1.045, 0.99],
    },
  },
  {
    id: "agent-result",
    src: "real-app/codex-agent-real.mp4",
    duration: 300,
    startFrom: 720,
    playbackRate: 2.45,
    aspectRatio: "1524 / 896",
    motion: {
      x: [-92, 54, -12],
      y: [26, -34, 6],
      rotateX: [1.5, -1, 0.25],
      rotateY: [-4.4, 2.6, -0.8],
      rotateZ: [-0.8, 0.5, -0.15],
      scale: [0.92, 1.05, 1],
    },
  },
  {
    id: "agent-settings",
    src: "real-app/agents-settings-real.mp4",
    duration: 180,
    startFrom: 300,
    playbackRate: 1.7,
    aspectRatio: "1524 / 896",
    motion: {
      x: [58, -34, 0],
      y: [-18, 24, 0],
      rotateX: [-0.8, 0.7, 0],
      rotateY: [3.1, -1.8, 0],
      rotateZ: [0.5, -0.3, 0],
      scale: [0.95, 1.035, 1],
    },
  },
];

const starts = clips.reduce((values, clip, index) => {
  if (index === 0) return [0];
  return [...values, values[index - 1] + clips[index - 1].duration - FADE];
}, []);

export const OPENLEAF_REAL_DURATION =
  starts.at(-1) + clips.at(-1).duration;

const RealCapture = ({clip, index}) => {
  const frame = useCurrentFrame();
  const motionFrames = [0, Math.round(clip.duration * 0.52), clip.duration];
  const fadeIn = index === 0 ? 1 : interpolate(frame, [0, FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = index === clips.length - 1
    ? 1
    : interpolate(frame, [clip.duration - FADE, clip.duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const opacity = Math.min(fadeIn, fadeOut);
  const source = staticFile(clip.src);
  const move = (values) => interpolate(frame, motionFrames, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = move(clip.motion.x);
  const y = move(clip.motion.y);
  const rotateX = move(clip.motion.rotateX);
  const rotateY = move(clip.motion.rotateY);
  const rotateZ = move(clip.motion.rotateZ);
  const scale = move(clip.motion.scale);
  const depth = interpolate(opacity, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        background:
          "radial-gradient(circle at 50% 42%, #202938 0%, #111722 52%, #090d14 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "74vw",
          height: "74vw",
          left: "13vw",
          top: "-28vw",
          borderRadius: "50%",
          background: "rgba(95, 131, 183, 0.11)",
          filter: "blur(100px)",
          transform: `translate(${-x * 0.08}px, ${-y * 0.08}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          perspective: 1700,
          perspectiveOrigin: "50% 46%",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "92vh",
            aspectRatio: clip.aspectRatio,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.28)",
            borderRadius: 32,
            background: "#252c39",
            boxShadow:
              "0 55px 120px rgba(0, 0, 0, 0.62), 0 14px 38px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
            transform: `translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale * depth})`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <OffthreadVideo
            muted
            src={source}
            startFrom={clip.startFrom}
            playbackRate={clip.playbackRate}
            style={{height: "100%", width: "100%", objectFit: "cover"}}
          />
          <AbsoluteFill
            style={{
              pointerEvents: "none",
              boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const OpenleafRealApp = () => (
  <AbsoluteFill style={{backgroundColor: "#111722"}}>
    {clips.map((clip, index) => (
      <Sequence
        key={clip.id}
        from={starts[index]}
        durationInFrames={clip.duration}
      >
        <RealCapture clip={clip} index={index} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
