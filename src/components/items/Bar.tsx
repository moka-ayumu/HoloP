import React from "react";
import Playlist from "./Playlist";
import ProgressBar from "./ProgressBar";
import { connect } from "react-redux";

function Bar({
  progress,
  mainColor,
}: {
  progress: IProgress;
  mainColor: string;
}) {
  return (
    <div
      className="w-full h-14 relative bg-gray-600 z-20 flex transition-colors"
      style={{ backgroundColor: mainColor }}
    >
      <div className="m-auto  ">BAR</div>
      <div className="absolute left-0 -top-1 w-full">
        <ProgressBar progress={progress.progress} color={mainColor} />
      </div>
      <div className="right-0 bottom-0 transform hover:-translate-y-178 transition duration-150 ease-in-out">
        <Playlist />
      </div>
    </div>
  );
}

function mapStateToProps({
  playerSlice: { progress },
  themeSlice: { mainColor },
}: any) {
  return { progress, mainColor };
}

export default connect(mapStateToProps)(Bar);
