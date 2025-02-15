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

useEffect(() => {
  const loadFaceApiModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]);
  };
  loadFaceApiModels();
}, []);

  return (
    <div>
      <h1> AI - Aesthetician </h1>
      <VideoChat />
      {/* <TestFaceMesh/> */}
    
    </div>
  );
};

export default App;
