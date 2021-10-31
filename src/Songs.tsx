import React, { useRef } from "react";
import { useEffect, useState } from "react";
import * as holodex from "./utils/holodex";
import Song from "./components/items/Song";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import { connect } from "react-redux";

function Songs({
  channel_id,
  channelArtThemes,
  nowPlaying,
  nowTheme,
  selected,
}: {
  channel_id: string;
  channelArtThemes: IChannelArtTheme[];
  nowPlaying: IVideo;
  nowTheme: IChannelArtTheme;
  selected: string[];
}) {
  const [songs, setSongs] = useState<ISongs>({
    songs: [],
    offset: -1,
    total: -1,
    limit: 10,
    channel_id: "",
    org: "",
    count: 0,
  });

  const scrollBarRef: any = useRef();
  const orgSelectRef = useRef<any>();
  const channelSelectRef = useRef<any>();

  const [loading, setLoading] = useState<boolean>(true);
  const [orgs, setOrgs] = useState<IOrg[]>([]);
  const [channels, setChannels] = useState<IChannelByOrg[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    getSongWithLoading(selected[0], selected[1]);
  }, [selected]);

  const resetSelectvValue = (selectRef: any) => selectRef.current.clearValue();

  const getSongWithLoading = (org?: string, channel_id?: string) => {
    setLoading(true);
    holodex.getSongs(org, 0, 20, channel_id).then((e) => {
      setSongs(e);
      setLoading(false);
    });
  };

  const prevPage = () => {
    setLoading(true);
    holodex.getPrevSongs(songs).then((e) => {
      setSongs(e);
      setLoading(false);
    });
  };

  const nextPage = () => {
    setLoading(true);
    holodex.getNextSongs(songs).then((e) => {
      setSongs(e);
      setLoading(false);
    });
  };

  return (
    <div className="h-screen overflow-hidden flex">
      <div
        className="w-full h-full relative transition-colors duration-700"
        id="screen"
        style={{ backgroundColor: nowTheme.main }}
      >
        {loading ? (
          <div className="absolute w-full h-full bg-gray-500 z-10 backdrop-filter backdrop-blur-lg opacity-50">
            <div className="absolute left-1/3 top-1/2 transform translate-x-1/2 translate-y-1/2 text-center flex flex-col">
              <CubeIcon className="w-12 h-12 animate-spin m-auto text-white" />
              <p className="text-2xl text-gray-50 m-auto ">LOADING</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <SimpleBar
          className={`w-full h-full${loading ? " filter blur-sm" : ""}`}
          scrollableNodeProps={{ ref: scrollBarRef }}
        >
          <div className="w-full h-100" />
          <div className="flex flex-wrap gap-7 m-auto p-3">
            {songs.songs.map((e, i) => (
              <Song key={`${e.video_id}${i}`} song={e} />
            ))}
          </div>
          <div className="flex mt-3 mb-3">
            <button
              className="ml-auto"
              onClick={prevPage}
              disabled={songs.count === songs.limit ? true : false}
            >
              <ChevronLeftIcon className="w-5 h-5 transform hover:scale-125 hover:-translate-x-1 transition-transform ease-out" />
            </button>
            <button
              className="mr-auto"
              onClick={nextPage}
              disabled={songs.count >= songs.total ? true : false}
            >
              <ChevronRightIcon className="w-5 h-5 transform hover:scale-125 hover:translate-x-1 transition-transform ease-out" />
            </button>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

function mapStateToProps({
  playerSlice: { channelArtThemes, nowPlaying, nowTheme },
  flowBarSlice: {
    songs: { selected },
  },
}: any) {
  return {
    channelArtThemes,
    nowPlaying,
    nowTheme,
    selected,
  };
}

export default connect(mapStateToProps)(Songs);
