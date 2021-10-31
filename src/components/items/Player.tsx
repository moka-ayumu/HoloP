import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { AppDispatch, playerSlice, themeSlice } from "../../Store";
import ColorThief from "colorthief";
import Youtube from "react-youtube";
import { rgbToHex } from "../../utils/utils";
import { ArchiveIcon } from "@heroicons/react/outline";

function Player({
  nowPlaying,
  count,
  nextVideo,
  updateProgress,
  setMainColor,
  playlist,
  setVideoCanPlay,
  removeVideo,
}: {
  nowPlaying: IVideo;
  count: number;
  nextVideo: Function;
  updateProgress: Function;
  setMainColor: Function;
  playlist: IVideo[];
  setVideoCanPlay: Function;
  removeVideo: Function;
}) {
  console.log(nowPlaying);
  const playerRef = useRef(undefined);

  useEffect(() => {
    //PLAY
    if (playerRef.current !== undefined) {
      if (nowPlaying.canPlay) {
        const player: IPlayer = playerRef.current;
        const additional = nowPlaying.hasOwnProperty("end")
          ? { end: nowPlaying.end }
          : {};
        player.loadVideoById({
          videoId: nowPlaying.videoId,
          startSeconds: nowPlaying.start,
          ...additional,
        });
      } else {
        nextVideo();
      }
    }
  }, [count]);

  useEffect(() => {
    const thumburl = `https://img.youtube.com/vi/${nowPlaying.videoId}/0.jpg`;
    const thumb = document.createElement("img");
    thumb.crossOrigin = "annoymous";
    thumb.src = thumburl;
    thumb.onload = () => {
      const colorThief = new ColorThief();
      const res = rgbToHex(colorThief.getColor(thumb));
      setMainColor(res);
    };
  }, [nowPlaying.videoId]);

  const onReady = (e: any) => {
    const player: IPlayer = e.target;
    playerRef.current = player;
    if (nowPlaying.videoId !== undefined) {
      if (player.getDuration() === 0) {
        removeVideo(nowPlaying.id);
      } else {
        initTimer(player);
      }
    }
  };

  const opts_end = nowPlaying.hasOwnProperty("end")
    ? { end: nowPlaying.end }
    : {};

  const opts: any = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  let playingState = useRef(0);
  const onStateChange = (e: any) => {
    const player: IPlayer = e.target;
    switch (e.data) {
      case -1:
      case 0: //ENDED
      case 2: //PAUSED
        playingState.current = 0;
        break;

      case 1: //PLAYING
        playingState.current = 1;
        initTimer(player);
        break;

      case 3: //BUFFERIN
        if (chkForCanPlay !== "unknown") {
        } else {
        }

      default:
        break;
    }
  };

  const initTimer = (player: IPlayer) => {
    let timer: NodeJS.Timer = undefined;
    const progressWeight =
      100 /
      ((nowPlaying.hasOwnProperty("end")
        ? nowPlaying.end
        : player.getDuration()) -
        nowPlaying.start);
    timer = setInterval(() => {
      const progress =
        progressWeight * (player.getCurrentTime() - nowPlaying.start);
      if (progress > 100) {
        nextVideo();
      } else {
        updateProgress({
          progress,
        });
      }
      if (playingState.current === 0) {
        clearInterval(timer);
      }
    }, 100);
  };

  const onEnd = () => {
    nextVideo();
  };

  let chkForCanPlay = "unknown";
  const onPlaybackQualityChange = (e: any) => {
    chkForCanPlay = e;
  };

  return (
    <div className="m-auto relative z-20">
      {playlist.length === 0 ? (
        <div className="absolute w-full h-full z-10">
          <p className="absolute animate-pulse left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl pointer-events-none bg-gray-700 p-3 rounded-lg bg-opacity-75">
            <ArchiveIcon className="w-9 h-9" />
            Playlist Empty
          </p>
        </div>
      ) : (
        <></>
      )}

      <Youtube
        videoId=""
        className="player relative"
        opts={opts}
        onReady={onReady}
        onEnd={onEnd}
        onPlaybackQualityChange={onPlaybackQualityChange}
        onStateChange={onStateChange}
        onPlaybackRateChange={(e) => console.log(e)}
      />
    </div>
  );
}

function mapStateToProps({
  playerSlice: { nowPlaying, count, playlist },
}: any) {
  return { nowPlaying, count, playlist };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    nextVideo: () => dispatch(playerSlice.actions.next("")),
    updateProgress: (v: IProgress) =>
      dispatch(playerSlice.actions.updateProgress(v)),
    setMainColor: (v: string) => dispatch(themeSlice.actions.setMainColor(v)),
    setVideoCanPlay: (v: { id: number; canPlay: boolean }) =>
      dispatch(playerSlice.actions.setVideoCanPlay(v)),
    removeVideo: (v: number) => dispatch(playerSlice.actions.remove(v)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
