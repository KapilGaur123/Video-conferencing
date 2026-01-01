import React, { useEffect, useRef, useState } from "react";
import "../../components/VideoPlayer.css";
import VideoPlayer from "../../components/VideoPlayer";

const VideoCallScreen = ({ streamRef, localVideoRef, remoteStreams }) => {
  useEffect(() => {
    if (streamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = streamRef.current;
    }
  }, []);

  return (
    <div className="video-container">
      <VideoPlayer localVideoRef={localVideoRef} />
      {Object.entries(remoteStreams).map(([socketId, stream]) => (
        <VideoPlayer key={socketId} localVideoRef={stream} />
      ))}
    </div>
  );
};

export default VideoCallScreen;
