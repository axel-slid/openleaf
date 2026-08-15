import {Composition, registerRoot} from "remotion";
import {OpenleafProfessional} from "./openleaf-professional";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafProfessional}
    durationInFrames={780}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
