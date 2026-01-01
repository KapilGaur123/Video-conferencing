import React, { useEffect, useRef } from "react";
import "../../components/VideoPlayer.css";
import "./CreateCall.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";

const CreateCall = ({
  setRoomId,
  streamRef,
  localVideoRef,
  createCall,
}) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  console.log("streamRef", streamRef);

  useEffect(() => {
    const handleGenerateCode = () => {
      setRoomId("");
      setCode("");
      let temp = "";
      const charts = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

      for (let i = 0; i < 12; i++) {
        temp += charts[Math.floor(Math.random() * charts.length)];
        console.log("temp code ", temp);
      }
      setRoomId(temp);
      setCode(temp);
    };

    handleGenerateCode();
  }, []);

  useEffect(() => {
    if (streamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = streamRef.current;
    }
  }, [streamRef.current]);

  const handleForwardVideo = () => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    navigate("/video-call", { code });
  };

  const handleBackwardVideo = () => {
    navigate("/");
  };

  return (
    <div className="flex-comman join-call">
      <div className="flex-comman left-video-container">
        <VideoPlayer localVideoRef={localVideoRef} />
      </div>
      <div className="right-video-container">
        <h2>Generate the Unique Code</h2>
        <div className="flex-comman code-generate-inp">
          <input placeholder="Generated code here" value={code} readOnly />
          <button>Share</button>
        </div>
        <div className="flex-comman join-call-btn-container">
          <button
            onClick={() => {
              handleForwardVideo();
              createCall();
            }}
          >
            Enter in Window
          </button>
          <button onClick={handleBackwardVideo}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCall;
