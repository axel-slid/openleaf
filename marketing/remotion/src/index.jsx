import {Composition, registerRoot} from "remotion";
import {
  OPENLEAF_DIGITAL_SHOWCASE_DURATION,
  OpenleafDigitalShowcase,
} from "./openleaf-digital-showcase";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafDigitalShowcase}
    durationInFrames={OPENLEAF_DIGITAL_SHOWCASE_DURATION}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{matteBackground: false}}
  />
);

registerRoot(RemotionRoot);
