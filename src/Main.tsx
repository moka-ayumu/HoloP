import React from "react";
import { Helmet } from "react-helmet";
import Songs from "./Songs";
import MainPlayer from "./components/items/MainPlayer";
import Playlist from "./components/items/Playlist";
import Flowbar from "./components/Flowbar/Flowbar";

function Main() {
  return (
    <div>
      <Helmet>
        <title>HoloP</title>
      </Helmet>
      <div className="w-full h-screen flex flex-col">
        <Flowbar />
        <MainPlayer />
        <div className="h-full">
          <Songs channel_id="UC7fk0CB07ly8oSl0aqKkqFg" />
        </div>
        {/* <Bar /> */}
        <div className="fixed right-0 -bottom-164 transform hover:-translate-y-164 transition duration-150 ease-in-out z-50">
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default Main;
