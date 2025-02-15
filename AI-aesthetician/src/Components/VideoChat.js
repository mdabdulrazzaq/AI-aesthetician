import React, { useEffect, useRef, useState } from "react";
import AestheticianDetection from "./AestheticianDetection"; // Import AestheticianDetection

const VideoChat = () => {
  const myVideo = useRef();
  const streamRef = useRef();

  useEffect(() => {
    // Access the user's media devices (camera and microphone)
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Set the stream to the video element
        myVideo.current.srcObject = stream;
        streamRef.current = stream;
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // Cleanup function to stop the stream when the component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h2></h2>
      <video ref={myVideo} autoPlay playsInline muted />
      {myVideo && <AestheticianDetection videoRef={myVideo} user="Your" />}
    </div>
  );
};

export default VideoChat;