import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const JoinCall = ({ setOtherRoomId, joinCall }) => {
  const [digit, setDigit] = useState("");
  const navagate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;

    setDigit(value);
  };

  const handleStartCall = () => {
    setOtherRoomId(digit);
    joinCall(digit);
    navagate("/video-call");
  };

  return (
    <div className="full-page-setup flex-comman flex-dicraction-column main-page-bg">
      <h1 className="h1-heading">Enter 12-Digit Code</h1>

      <div className="flex-comman ">
        <input
          type="text"
          className="comman-input"
          value={digit}
          onChange={handleChange}
          style={{ color: "black" }}
        />
      </div>

      <div className="flex-comman">
        <button
          onClick={() => {
            handleStartCall();
          }}
          className="main-btn-desing"
        >
          Start Call
        </button>
        <button className="main-btn-desing">Cancel</button>
      </div>
    </div>
  );
};

export default JoinCall;
