import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import AestheticianDetection from "./AestheticianDetection";
import { io } from "socket.io-client";

// const socket = io("http://localhost:8080");

const VideoChat = () => {
  const myVideo = useRef();
  const streamRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        myVideo.current.srcObject = stream;
        streamRef.current = stream;
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="container">
        <AestheticianDetection  videoRef={myVideo} />
    </div>
  );
};

export default VideoChat;
