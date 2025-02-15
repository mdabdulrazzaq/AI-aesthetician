import React, { useRef } from "react";

const AestheticianDetection = ({ videoRef, user }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
      />
      {/* <h3 style={{ textAlign: "center", margin: "10px 0" }}>
        {user}'s Video Feed
      </h3> */}
    </div>
  );
};

export default AestheticianDetection;