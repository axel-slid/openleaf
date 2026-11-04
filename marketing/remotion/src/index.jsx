import {Composition, registerRoot} from "remotion";
import {OPENLEAF_DURATION, OpenleafWebsiteFilm} from "./openleaf-website-film";

const RemotionRoot = () => (
  <Composition
    id="OpenleafDemo"
    component={OpenleafWebsiteFilm}
    durationInFrames={OPENLEAF_DURATION}
    fps={30}
    width={1920}
    height={1080}
  />
);

registerRoot(RemotionRoot);
