import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="flex-comman welcome-container">
        <div className="left-page">
          <h1>Make Your</h1>
          <h1>Best Call</h1>
          <p>Fast & Easy conference call services.</p>
          <div className="welcome-btns">
            <Link to={"/join-call"}><button>Join Call</button></Link>
            <Link to={"/create-call"}><button>Create Call</button></Link>
          </div>
        </div>
        <div className="flex-comman right-page">
          <div className="img-container flex-comman">
            <img src="../../../public/conference.jpg" alt="error" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
