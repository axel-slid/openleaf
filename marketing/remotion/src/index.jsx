import {Composition, registerRoot} from "remotion";
import {OPENLEAF_DURATION, OpenleafProfessional} from "./openleaf-professional";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafProfessional}
    durationInFrames={OPENLEAF_DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
