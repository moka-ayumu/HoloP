import React from "react";
import { connect } from "react-redux";
import Player from "./Player";
import "./MainPlayer.scss";
import { Helmet } from "react-helmet";

function MainPlayer({
  channelArtThemes,
  nowPlaying,
  progress,
  nowTheme,
}: {
  channelArtThemes: IChannelArtTheme[];
  nowPlaying: IVideo;
  progress: IProgress;
  nowTheme: IChannelArtTheme;
}) {
  const availableNowPlaying = nowPlaying.hasOwnProperty("channel");

  return (
    <div id="player_parent" className="absolute flex w-full">
      {availableNowPlaying ? (
        <div className="relative m-auto flex-1 z-20">
          <Helmet>
            <title>{`HoloP : Playing ${nowPlaying.name}`}</title>
          </Helmet>
          {nowPlaying.hasOwnProperty("art") ? (
            <div className="relative w-48 h-48 m-auto">
              <img
                src={nowPlaying.channel.photo}
                // transform scale-75
                className="w-32 absolute bottom-1/3 right-1/3 rounded-t-3xl rounded-bl-3xl z-30 object-cover mask-rb"
              />
              <img
                src={nowPlaying.art}
                className="w-32 absolute right-0 bottom-0 rounded-full animate-spin-slow object-cover"
              />
              <svg
                className="h-32 w-32 absolute right-0 bottom-0 z-30 mix-blend-hard-light"
                viewBox="0 0 128 128"
                x="0px"
                y="0px"
              >
                <circle
                  cx="64"
                  cy="64"
                  r="61"
                  className="art_circle"
                  style={{
                    stroke: nowTheme.main,
                    strokeDashoffset: 383 - progress.progress * 3.83,
                  }}
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <Player />
      {availableNowPlaying ? (
        <div className="m-auto flex-1 z-20 flex flex-col">
          <p className="w-10/12 text-2xl m-auto">{nowPlaying.channel.name}</p>
          <p className="w-10/12 m-auto">{nowPlaying.channel.english_name}</p>
          <p className="w-10/12 text-xl m-auto text-right">{nowPlaying.name}</p>
        </div>
      ) : (
        <></>
      )}

      <div
        className="absolute top-0 left-0 w-full h-full z-10 mix-blend-multiply mask-b transition-colors duration-700"
        style={{ backgroundColor: nowTheme.main }}
      />
    </div>
  );
}

function mapStateToProps({
  playerSlice: { channelArtThemes, nowPlaying, progress, nowTheme },
}: any) {
  return { channelArtThemes, nowPlaying, progress, nowTheme };
}

export default connect(mapStateToProps)(MainPlayer);
