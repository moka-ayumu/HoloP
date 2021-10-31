import React from "react";
import { connect } from "react-redux";
import {
  AppDispatch,
  fetchThemeByChannel,
  flowBarSlice,
  getThemeByImg,
  playerSlice,
} from "../../Store";
import Marquee from "react-fast-marquee";
import "./Song.scss";
import tinycolor from "tinycolor2";

function Song({
  song,
  addVideo,
  fetchTheme,
  channelArtThemes,
  addTheme,
  setSongsSelected,
}: {
  song: ISong;
  addVideo: Function;
  fetchTheme: Function;
  channelArtThemes: IChannelArtTheme[];
  addTheme: Function;
  setSongsSelected: Function;
}) {
  const videoData: IAddVideo = {
    channel: song.channel,
    name: song.name,
    start: song.start,
    end: song.end,
    videoId: song.video_id,
    art: song.art,
  };

  const getRelativeSize = (str: string) => {
    let size = new TextEncoder().encode(str).length;
    size -= (size - str.length) * 1.5;
    return size;
  };

  const getColorTheme = async (channel: IChannel) => {
    if (
      channelArtThemes.findIndex(
        (e: IChannelArtTheme) => e.channel.english_name === channel.english_name
      ) === -1
    ) {
      let main = await getThemeByImg(channel.photo);
      const mainTinyColor = tinycolor(main);
      let sub = main;
      if (!mainTinyColor.isLight()) {
        main = mainTinyColor.lighten(20).desaturate().toHexString();
      } else {
        sub = mainTinyColor.darken(20).desaturate().toHexString();
      }
      return { channel, main, sub };
    } else {
      return { channel, main: "existed", sub: "" };
    }
  };

  return (
    <div className="flex m-auto">
      <img
        src={song.channel.photo}
        className="w-10 h-10 rounded-t-3xl rounded-bl-3xl z-30 object-cover mask-rb"
        onClick={() => {
          setSongsSelected(["", song.channel_id]);
        }}
      />
      <div
        className="relative group w-80 h-44 rounded-md overflow-hidden m-auto transform transition duration-200 ease-in-out " //hover:translate-x-1 hover:translate-y-1
        onClick={(e) => {
          getColorTheme(videoData.channel).then((theme) => {
            addTheme(theme);
            addVideo(videoData);
          });
        }}
      >
        <img
          className="w-full h-full object-center object-cover filter transition-all duration-200 group-hover:blur-sm"
          src={`https://img.youtube.com/vi/${song.video_id}/0.jpg`}
        />
        <div className="absolute w-full flex flex-col right-0 bottom-0 transition-all group-hover:right-1/2 group-hover:bottom-1/2 transform group-hover:translate-x-1/2 group-hover:translate-y-1/2">
          <div className="relative w-full h-25">
            <img
              className="ml-auto absolute right-0 bottom-0 transform transition-all group-hover:right-1/2 group-hover:translate-x-1/2"
              src={song.art}
            />
          </div>
          <div className="bg-white bg-opacity-50 text-base whitespace-nowrap relative w-full h-6">
            <div className="absolute right-0 top-0 transform transition-all group-hover:right-1/2 group-hover:translate-x-1/2 pl-1 pr-1">
              {getRelativeSize(song.name) > 23 ? (
                <Marquee gradient={false}>{song.name}</Marquee>
              ) : (
                song.name
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ playerSlice: { playlist, channelArtThemes } }: any) {
  return { playlist, channelArtThemes };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addVideo: (v: IVideo) => dispatch(playerSlice.actions.add(v)),
    fetchTheme: (v: IChannel) => dispatch(fetchThemeByChannel(v)),
    addTheme: (v: IChannelArtTheme) =>
      dispatch(playerSlice.actions.addChannelTheme(v)),
    setSongsSelected: (v: string[]) =>
      dispatch(flowBarSlice.actions.setSongsSelected(v)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);
