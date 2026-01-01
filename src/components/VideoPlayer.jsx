import React from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ localVideoRef }) => {

  return (
    <div>
          <video
          className="video"
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
          ></video>
    </div>
  );
};

export default VideoPlayer;
