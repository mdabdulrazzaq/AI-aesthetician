import React, { useRef } from "react";
import "./style.css";

const AestheticianDetection = ({ videoRef, user }) => {
  return (
  
      <video className='video-container'
        ref={videoRef}
        autoPlay
        muted
      />
      
    
  );
};

export default AestheticianDetection;