import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LogIn from "./screens/authentication/LogIn";
import SignUp from "./screens/authentication/SignUp";
import Welcome from "./screens/mainPages/Welcome";
import PrivateRoutes from "./PublicPrivateRoutes/PrivateRoutes";
import PublicRoutes from "./PublicPrivateRoutes/PublicRoutes";
import io from "socket.io-client";
import VideoCall from "./PublicPrivateRoutes/VideoCall";
import VideoCallScreen from "./screens/JoinCall/VideoCallScreen";
import CreateCall from "./screens/JoinCall/CreateCall";
import JoinCallRouter from "./PublicPrivateRoutes/JoinCallRouter";
import JoinCall from "./screens/JoinCall/joinCall";

// const a = "https://webrtcapi.anayatcoders.com/"
// const a = "http://localhost:5000";
//const a = "http://192.168.1.14:5000"
const a = "https://coercively-ulcerous-cecille.ngrok-free.dev";

const socket = io(a, {
  reconnection: true,
  reconnectionAttempts: Infinity,
  randomizationFactor: 0.5,
});

function App() {
  const localVideoRef = useRef(null);

  const streamRef = useRef(null);
  const pcRef = useRef({});
  const remoteStreams = useRef({});

  const [roomId, setRoomId] = useState(null);
  const [otherRoomId, setOtherRoomId] = useState(null);

  const config = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    startCamera();

  }, [roomId]);

  useEffect(() => {
    socket.on("existing-user", (users) => {
      users.forEach((socketId) => {
        createOffer(socketId);
      });
    });
    socket.on("new-user-join", handleNewJoin);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("error", (msg)=> alert(msg))
  }, []);

  const startCamera = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    localVideoRef.current.srcObject = streamRef;
  };

  const peerConnection = (socketId) => {
    // creating the connection between users
    const pc = new RTCPeerConnection(config);

    if (streamRef.current) {
      // pass the our local stream to WeRTC that use other user
      streamRef.current.getTracks().forEach((Track) => {
        pc.addTrack(Track, streamRef.current);
      });
    }

    const oneRemoteStream = new MediaStream();
    // getting the other user video/audio stream
    pc.ontrack = (event) => {
      event.streams[0]
        .getTracks()
        .forEach((track) => oneRemoteStream.addTrack(track));
      remoteStreams.current[socketId] = oneRemoteStream;
    };

    // sent our ice-candidate to other
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          roomId: socketId,
        });
      }
    };
    pcRef.current[socketId] = pc;
    return pc;
  };

  const handleNewJoin = (socketId) => {
    alert("new user is joinning ", socketId);
  };

  // sent join request to all other
  const createOffer = async (socketId) => {
    const pc = peerConnection(socketId);
    const offer = pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.emit("offer", { offer, roomId });
  };

  const handleOffer = async (offer, socketId) => {
    const pc = peerConnection(socketId);
    await pc.setRemoteDescription(offer);
    const answer = pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("answer", { answer, roomId });
  };

  const handleAnswer = async (answer, socketId) => {
    await pcRef.current[socketId].setRemoteDescription(answer);
  };

  const handleIceCandidate = async (candidate, socketId) => {
    await pcRef.current[socketId].addIceCandidate(candidate);
  };

  const createCall = (roomId) => {
    if (!roomId) return;

    socket.emit("create-call", roomId);
  };

  const joinCall = (roomId) => {
    if (!roomId) return;

    socket.emit("join-call", roomId);
  };

  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Welcome />} />
        </Route>

        <Route element={<JoinCallRouter />}>
          <Route
            path="/join-call"
            element={
              <JoinCall setOtherRoomId={setOtherRoomId} joinCall={joinCall} />
            }
          />
        </Route>

        <Route element={<VideoCall />}>
          <Route
            path="/create-call"
            element={
              <CreateCall
                setRoomId={setRoomId}
                streamRef={streamRef}
                localVideoRef={localVideoRef}
                createCall={createCall}
              />
            }
          />
          <Route
            path="/video-call"
            element={
              <VideoCallScreen
                streamRef={streamRef}
                localVideoRef={localVideoRef}
                remoteStreams={remoteStreams}
                pcRef={pcRef}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
