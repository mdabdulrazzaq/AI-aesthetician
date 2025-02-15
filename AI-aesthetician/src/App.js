import React from "react";
import VideoChat from "./Components/VideoChat";
// import TestFaceMesh from "./Components/TestFaceMesh"

import process from 'process';

window.process = process;

const App = () => {
  window.process = {
    env: {
        NODE_ENV: "development"
    }
};
  return (
    <div>
      <h1> AI - Aesthetician </h1>
      <VideoChat />
      {/* <TestFaceMesh/> */}
    
    </div>
  );
};

export default App;
