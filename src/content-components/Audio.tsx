/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { Fragment, useCallback, useRef, useState } from "react";
import { useMediaContext } from "../context/useMediaContext";

import { MediaObject } from "../components/MediaObject";

export const Audio = ({
  mediaObject: { onLoad, ...mediaObject },
}: {
  mediaObject: MediaObject;
}) => {
  const { getStyles } = useMediaContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const togglePlay = useCallback((evt: React.MouseEvent<HTMLAudioElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (audioRef.current) {
      playing ? audioRef.current.pause() : audioRef.current.play();
      setPlaying(!playing);
    }
  }, [audioRef, playing]);

  return (
    <Fragment>
      <button
        onClick={togglePlay}
        {...getStyles("mediaAudioButton", { playing })}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <audio
        loop={true}
        ref={audioRef}
        onLoadedData={onLoad}
        {...mediaObject}
      />
    </Fragment>
  );
};
