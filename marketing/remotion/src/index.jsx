import {Composition, registerRoot} from "remotion";
import {
  OPENLEAF_FEATURE_TOUR_DURATION,
  OpenleafFeatureTour,
} from "./openleaf-feature-tour";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafFeatureTour}
    durationInFrames={OPENLEAF_FEATURE_TOUR_DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
