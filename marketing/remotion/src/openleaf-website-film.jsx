import React from "react";
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {
  OPENLEAF_EXACT_BEATS,
  OPENLEAF_EXACT_DURATION,
  OpenleafExactRemotion,
} from "./openleaf-exact-remotion";

const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"};

const cameraForFrame = (frame) => {
  // Keep the application at one physical size. The framing only tracks the
  // part of the interface that is active; it never performs decorative zooms.
  const frames = [0, 150, 300, 440, 600, 760, 940, 1120, 1240, 1370, 1500, 1529];
  const sample = (values) => interpolate(frame, frames, values, {...clamp, easing: Easing.inOut(Easing.cubic)});
  return {
    x: sample([0, 0, -10, -20, 16, 0, 10, -18, 0, -20, 0, 0]),
    y: sample([8, 8, 4, 2, 3, 4, -7, 2, 5, 2, 8, 8]),
  };
};

const FeatureCaption = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const beat = OPENLEAF_EXACT_BEATS.find(({start, end}) => frame >= start && frame < end) || OPENLEAF_EXACT_BEATS[0];
  const local = frame - beat.start;
  const duration = beat.end - beat.start;
  const reveal = spring({frame: local - 4, fps, config: {damping: 20, stiffness: 115, mass: .9}});
  const window = Math.min(
    interpolate(local, [2, 12], [0, 1], clamp),
    interpolate(local, [duration - 15, duration - 5], [1, 0], clamp),
  );
  const shown = Math.max(0, Math.min(1, reveal * window));
  return (
    <div style={{
      position: "absolute",
      zIndex: 30,
      left: 108,
      top: 38,
      maxWidth: 1220,
      padding: "11px 17px 13px",
      border: "1px solid rgba(255,255,255,.13)",
      borderRadius: 12,
      background: "rgba(5,9,7,.9)",
      boxShadow: "0 14px 42px rgba(0,0,0,.44)",
      color: "#f3f6f4",
      font: "800 37px/1.05 Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      letterSpacing: -1.5,
      opacity: shown,
      transform: `translate(${(1 - shown) * -22}px, ${(1 - shown) * 10}px)`,
    }}>{beat.title}</div>
  );
};

export const OpenleafWebsiteFilm = () => {
  const frame = useCurrentFrame();
  const camera = cameraForFrame(frame);
  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#0c110e", fontFamily: "Inter, ui-sans-serif, system-ui"}}>
      <FeatureCaption/>
      <div style={{position: "absolute", left: "50%", top: "55%", transform: "translate(-50%,-50%)"}}>
        <div style={{
          width: 1920,
          height: 1080,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,.16)",
          borderRadius: 22,
          background: "#11151d",
          boxShadow: "0 48px 120px rgba(0,0,0,.66), 0 12px 34px rgba(0,0,0,.45)",
          transformOrigin: "50% 50%",
          transform: `translate3d(${camera.x}px,${camera.y}px,0) scale(.805)`,
        }}>
          <OpenleafExactRemotion/>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const OPENLEAF_DURATION = OPENLEAF_EXACT_DURATION;
