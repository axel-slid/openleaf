import {Composition, registerRoot} from "remotion";
import {OpenleafDemo} from "./openleaf-demo";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafDemo}
    durationInFrames={240}
    fps={30}
    width={960}
    height={540}
  />
);

registerRoot(RemotionRoot);
