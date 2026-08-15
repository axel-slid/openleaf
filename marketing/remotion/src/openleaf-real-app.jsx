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
    src: "real-app/editor.mp4",
    duration: 330,
    startFrom: 45,
    playbackRate: 1.1,
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
    src: "real-app/whiteboard.mp4",
    duration: 330,
    startFrom: 570,
    playbackRate: 3.2,
    motion: {
      x: [92, -42, 54],
      y: [-20, 26, -12],
      rotateX: [-1.1, 1.3, -0.5],
      rotateY: [4.4, -2.6, 1.5],
      rotateZ: [0.9, -0.55, 0.3],
      scale: [0.925, 1.035, 0.975],
    },
  },
  {
    src: "real-app/terminal.mp4",
    duration: 360,
    startFrom: 240,
    playbackRate: 3.6,
    motion: {
      x: [-88, 46, 0],
      y: [28, -32, 0],
      rotateX: [1.4, -1, 0],
      rotateY: [-4.2, 2.4, 0],
      rotateZ: [-0.75, 0.45, 0],
      scale: [0.93, 1.04, 1],
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
    <AbsoluteFill style={{backgroundColor: "#111722", opacity}}>
      <OffthreadVideo
        muted
        src={source}
        startFrom={clip.startFrom}
        playbackRate={clip.playbackRate}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          filter: "blur(44px) brightness(0.42) saturate(0.8)",
          transform: `scale(1.12) translate(${-x * 0.08}px, ${-y * 0.08}px)`,
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
            aspectRatio: "3024 / 1964",
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
        key={clip.src}
        from={starts[index]}
        durationInFrames={clip.duration}
      >
        <RealCapture clip={clip} index={index} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
