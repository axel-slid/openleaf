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
  },
  {
    src: "real-app/whiteboard.mp4",
    duration: 330,
    startFrom: 570,
    playbackRate: 3.2,
  },
  {
    src: "real-app/terminal.mp4",
    duration: 360,
    startFrom: 240,
    playbackRate: 3.6,
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
          transform: "scale(1.08)",
        }}
      />
      <AbsoluteFill style={{alignItems: "center", justifyContent: "center"}}>
        <OffthreadVideo
          muted
          src={source}
          startFrom={clip.startFrom}
          playbackRate={clip.playbackRate}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 28px 70px rgba(0, 0, 0, 0.5))",
          }}
        />
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
