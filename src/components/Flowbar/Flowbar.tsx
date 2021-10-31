import React from "react";
import { ArchiveIcon, FilmIcon, MusicNoteIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import { AppDispatch, flowBarSlice } from "../../Store";
import Songs from "./Songs";

function Flowbar({ nowTheme }: { nowTheme: IChannelArtTheme }) {
  return (
    <div
      className="absolute top-96 left-1/2 z-10 h-12 p-2 bg-gray-400 rounded-md flex gap-2 transform -translate-x-1/2 " //-translate-y-7 hover:translate-y-0 transition-transform
      style={{ backgroundColor: `${nowTheme.sub}7F` }}
    >
      <FilmIcon className="w-8 h-8" />
      <MusicNoteIcon className="w-8 h-8" />
      <ArchiveIcon className="w-8 h-8" />
      <div
        className="border-l-2"
        style={{ borderColor: `${nowTheme.sub}7F` }}
      />
      <Songs />
    </div>
  );
}

function mapStateToProps({ playerSlice: { nowTheme } }: any) {
  return { nowTheme };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    setSelectedTab: (v: string) =>
      dispatch(flowBarSlice.actions.setSelectedTab(v)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Flowbar);
