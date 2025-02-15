import React, { useEffect, useRef, useState } from "react";
import AestheticianDetection from "./AestheticianDetection";
import ChatBox from "./ChatBox"; // Add this import

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
    <div style={styles.container}>
      <div style={styles.videoSection}>
        <h2></h2>
        <video ref={myVideo} autoPlay playsInline muted style={styles.video} />
        {myVideo && <AestheticianDetection videoRef={myVideo} user="Your" />}
      </div>
      <ChatBox />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    alignItems: 'flex-start'
  },
  videoSection: {
    flex: '1',
    maxWidth: '70%'
  },
  video: {
    width: '100%',
    borderRadius: '10px'
  }
};

export default VideoChat;