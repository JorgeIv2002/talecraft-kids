import React from "react";
import { Composition, Still } from "remotion";
import { TikTokPromo } from "./TikTokPromo";
import {
  GalleryCover,
  GalleryChoice,
  GalleryNightMode,
  GalleryStreakBazaar,
} from "./GalleryStills";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TikTokPromo"
        component={TikTokPromo}
        durationInFrames={450} // 15 segundos a 30 fps
        fps={30}
        width={1080}
        height={1920}
      />
      <Still
        id="GalleryCover"
        component={GalleryCover}
        width={1270}
        height={760}
      />
      <Still
        id="GalleryChoice"
        component={GalleryChoice}
        width={1270}
        height={760}
      />
      <Still
        id="GalleryNightMode"
        component={GalleryNightMode}
        width={1270}
        height={760}
      />
      <Still
        id="GalleryStreakBazaar"
        component={GalleryStreakBazaar}
        width={1270}
        height={760}
      />
    </>
  );
};
