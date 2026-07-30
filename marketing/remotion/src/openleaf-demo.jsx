import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import interfaceShot from "../../../docs/interface-example.png";

const green = "#67d09a";
const cyan = "#59c8e7";
const violet = "#a78bfa";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
};

const leafPath =
  "M17.6 3.1C9.5 3.7 4.4 8 3 16.3c-.2 1.3.9 2.4 2.2 2.2 8.3-1.3 12.7-6.5 13.2-14.6.1-.5-.3-.9-.8-.8Z";

const Pane = ({title, subtitle, color, left, top, start, frame, symbol}) => {
  const show = spring({
    frame: frame - start,
    fps: 30,
    config: {damping: 12, stiffness: 125, mass: 0.8},
  });
  const drift = Math.sin((frame + start) / 13) * 4;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: top + drift,
        width: 205,
        height: 116,
        borderRadius: 19,
        padding: 18,
        boxSizing: "border-box",
        background: "linear-gradient(145deg, rgba(28,39,33,.97), rgba(10,15,13,.96))",
        border: `1px solid ${color}70`,
        boxShadow: `0 24px 55px #000b, 0 0 32px ${color}20`,
        opacity: show,
        transform: `translateY(${(1 - show) * 65}px) rotate(${(1 - show) * 6}deg) scale(${0.65 + show * 0.35})`,
        color: "white",
        fontFamily: "Inter, ui-sans-serif, system-ui",
      }}
    >
      <div style={{fontSize: 27, color, marginBottom: 9}}>{symbol}</div>
      <div style={{fontWeight: 820, fontSize: 17, letterSpacing: -0.45}}>{title}</div>
      <div style={{fontSize: 12, color: "#a7b7ad", marginTop: 3}}>{subtitle}</div>
    </div>
  );
};

export const OpenleafDemo = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 95, mass: 0.85},
  });
  const sceneTwo = interpolate(frame, [142, 166], [0, 1], clamp);
  const close = interpolate(frame, [220, 239], [0, 1], clamp);
  const screenPan = interpolate(frame, [38, 140], [-12, 12], {
    ...clamp,
    easing: (t) => t * t * (3 - 2 * t),
  });
  const scanX = interpolate(frame % 100, [0, 100], [-150, 1110]);

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: "#0d110f",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 102,
          top: 72,
          width: 756,
          height: 396,
          borderRadius: 17,
          overflow: "hidden",
          border: "1px solid rgba(193,255,220,.25)",
          boxShadow: "0 42px 90px #000d, 0 0 70px #60d3941b",
          opacity: intro * (1 - sceneTwo),
          transform: `perspective(1100px) translateY(${(1 - intro) * 65}px) rotateX(${(1 - intro) * 12}deg) rotateY(${(1 - intro) * -9}deg) scale(${0.72 + intro * 0.28 + sceneTwo * 0.1})`,
        }}
      >
        <div
          style={{
            height: 31,
            background: "linear-gradient(#262c29, #191e1b)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 13,
            gap: 7,
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
            <span key={color} style={{width: 9, height: 9, borderRadius: "50%", background: color}} />
          ))}
          <span
            style={{
              color: "#bed0c4",
              font: "600 11px Inter, ui-sans-serif, system-ui",
              marginLeft: 256,
            }}
          >
            Openleaf — research, compiled
          </span>
        </div>
        <div style={{height: 365, overflow: "hidden", position: "relative"}}>
          <Img
            src={interfaceShot}
            style={{
              height: "100%",
              width: "auto",
              minWidth: "100%",
              objectFit: "cover",
              transform: `translateX(${screenPan}px) scale(1.025)`,
              filter: "saturate(1.08) contrast(1.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: scanX,
              width: 120,
              transform: "skewX(-12deg)",
              background: "linear-gradient(90deg, transparent, rgba(108,231,161,.18), transparent)",
            }}
          />
        </div>
      </div>

      <div style={{opacity: sceneTwo * (1 - close)}}>
        <div
          style={{
            position: "absolute",
            top: 58,
            width: "100%",
            textAlign: "center",
            color: "white",
            fontFamily: "Inter, ui-sans-serif, system-ui",
            transform: `translateY(${(1 - sceneTwo) * 30}px)`,
          }}
        >
          <div style={{fontSize: 18, color: green, fontWeight: 800, letterSpacing: 4}}>ONE WORKSPACE</div>
          <div style={{fontSize: 39, fontWeight: 860, letterSpacing: -1.7, marginTop: 7}}>
            Papers, slides, and agents in sync.
          </div>
        </div>
        <svg
          width="960"
          height="540"
          style={{position: "absolute", inset: 0, opacity: sceneTwo * 0.6}}
        >
          <path d="M276 238 C390 182 565 182 680 238" fill="none" stroke={green} strokeWidth="2" strokeDasharray="7 10" />
          <path d="M276 370 C390 430 565 430 680 370" fill="none" stroke={cyan} strokeWidth="2" strokeDasharray="7 10" />
          <circle cx={480} cy={304} r={53 + Math.sin(frame / 8) * 5} fill="none" stroke={violet} strokeWidth="2" opacity=".7" />
        </svg>
        <Pane title="Source" subtitle="Code + visual editing" color={green} left={66} top={185} start={158} frame={frame} symbol="⌘" />
        <Pane title="Compiled PDF" subtitle="Fast local preview" color={cyan} left={689} top={185} start={164} frame={frame} symbol="◫" />
        <Pane title="PowerPoint" subtitle="Native slide editing" color={violet} left={66} top={330} start={170} frame={frame} symbol="◆" />
        <Pane title="Agent terminals" subtitle="Codex, Claude, and shell" color="#f6c35b" left={689} top={330} start={176} frame={frame} symbol="›_" />
        <div
          style={{
            position: "absolute",
            left: 406,
            top: 231,
            width: 148,
            height: 148,
            borderRadius: 38,
            background: "linear-gradient(145deg, #71dfa6, #1b855c)",
            boxShadow: "0 30px 70px #000c, 0 0 50px #68d99b55",
            display: "grid",
            placeItems: "center",
            color: "#082416",
            opacity: spring({frame: frame - 178, fps, config: {damping: 11}}),
            transform: `rotate(${Math.sin(frame / 18) * 4}deg)`,
          }}
        >
          <svg viewBox="0 0 22 22" width="82">
            <path d={leafPath} fill="#082416" />
            <path d="M5.5 17.2c3-4.4 6.2-7.4 10.1-9.8" fill="none" stroke="#7af0b0" strokeWidth="1.2" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          opacity: close,
          transform: `scale(${0.85 + close * 0.15})`,
          color: "white",
          fontFamily: "Inter, ui-sans-serif, system-ui",
          textAlign: "center",
          background: `rgba(5, 11, 8, ${close * 0.75})`,
        }}
      >
        <div>
          <div style={{fontSize: 60, fontWeight: 900, letterSpacing: -3}}>Openleaf</div>
          <div style={{color: green, fontSize: 18, fontWeight: 720, letterSpacing: 2.7, marginTop: 8}}>
            WRITE · COMPILE · PRESENT
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
