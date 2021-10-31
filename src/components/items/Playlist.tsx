import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { playerSlice, AppDispatch } from "../../Store";
import { TrashIcon } from "@heroicons/react/solid";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function Playlist({
  nowPlaying,
  playlist,
  setVideo,
  removeVideo,
  channelArtThemes,
  nowTheme,
}: {
  nowPlaying: IVideo;
  playlist: IVideo[];
  setVideo: Function;
  removeVideo: Function;
  channelArtThemes: IChannelArtTheme[];
  nowTheme: IChannelArtTheme;
}) {
  const scrollBarRef: any = useRef();

  useEffect(() => {
    if (scrollBarRef.current !== undefined) {
    }
  });

  const onMouseOver = () => {};

  const onMouseOut = () => {};

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.nativeEvent = null;
    console.log(e);
    focusPlayingItem();
  };

  const focusPlayingItem = () => {
    const playingItem = document.getElementById(`${nowPlaying.id}_Item`);
    const playlistElement = document.getElementById("playlist");
    if (playingItem !== null && playlistElement !== null) {
      scrollBarRef.current.scrollTo({
        top: playingItem.offsetTop - 3,
        behavior: "smooth",
      });
    }
  };

  const checkBackgroundColor = (video: IVideo) => {
    const find = channelArtThemes.find(
      (e) => e.channel.photo === video.channel.photo
    );
    return find !== undefined ? find.main : "";
  };

  focusPlayingItem();
  console.log(channelArtThemes);

  return (
    <div className="h-178 w-96 rounded-tl-xl overflow-hidden">
      <SimpleBar
        className="h-178 w-96"
        scrollableNodeProps={{ ref: scrollBarRef }}
        tabIndex={-1}
      >
        <div
          id="playlist"
          className="h-full w-full relative p-1 flex flex-col flex-nowrap gap-1 bg-gray-300 bg-opacity-50"
          style={{ backgroundColor: `${nowTheme.main}7F` }}
          onMouseLeave={onMouseLeave}
        >
          {playlist.map((video, i) => (
            <div
              key={`${video.id}_Item`}
              id={`${video.id}_Item`}
              className="group relative w-full h-14 bg-gray-50 rounded-tl-xl flex-none flex hover:bg-green-200 transition-colors overflow-hidden"
              style={{
                backgroundColor: checkBackgroundColor(video),
              }}
              onClick={() => setVideo(i)}
            >
              <img
                src={video.channel.photo}
                className={`object-contain w-14 h-14 flex-shrink ${
                  nowPlaying.id === video.id ? "animate-pulse" : ""
                }`}
              />
              <h1 className="m-auto group-hover:text-gray-500">{video.name}</h1>
              {playlist.length !== 1 ? (
                <button
                  className="absolute right-2 bottom-4 opacity-0 z-10 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeVideo(video.id);
                  }}
                >
                  <TrashIcon className="h-6 w-6 text-red-600" />
                </button>
              ) : (
                <></>
              )}
            </div>
          ))}
          <div className="w-full h-192 flex-none" />
        </div>
      </SimpleBar>
    </div>
  );
}

function mapStateToProps({
  playerSlice: { nowPlaying, playlist, channelArtThemes, nowTheme },
}: any) {
  return { nowPlaying, playlist, channelArtThemes, nowTheme };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    setVideo: (id: string) => dispatch(playerSlice.actions.set(id)),
    removeVideo: (id: string) => dispatch(playerSlice.actions.remove(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
