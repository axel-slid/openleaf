import {Composition, registerRoot} from "remotion";
import {OPENLEAF_REAL_DURATION, OpenleafRealApp} from "./openleaf-real-app";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafRealApp}
    durationInFrames={OPENLEAF_REAL_DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
