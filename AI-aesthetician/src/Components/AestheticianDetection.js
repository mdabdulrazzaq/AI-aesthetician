import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Camera } from '@mediapipe/camera_utils';
import { FaceMesh } from '@mediapipe/face_mesh';
import { drawConnectors } from '@mediapipe/drawing_utils';

const AestheticianDetection = ({ videoRef, user }) => {
  const canvasRef = useRef(null);
  const [facialAnalysis, setFacialAnalysis] = useState(null);
  
  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        initializeFaceMesh();
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();
  }, []);

  const initializeFaceMesh = () => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onFaceMeshResults);
  };

  // Basic image analysis functions
  const detectSpots = async (imageData) => {
    // Placeholder implementation
    return { 
      detected: true, 
      severity: 'moderate', 
      locations: [] 
    };
  };

  const detectWrinkles = async (imageData) => {
    // Placeholder implementation
    return {
      detected: true,
      severity: 'mild',
      areas: ['forehead', 'around_eyes']
    };
  };

  const analyzeTexture = async (imageData) => {
    return {
      smoothness: 'moderate',
      uniformity: 'good'
    };
  };

  const detectDarkCircles = async (imageData) => {
    return {
      detected: true,
      severity: 'moderate'
    };
  };

  const analyzeMoisture = async (imageData) => {
    return {
      level: 'moderate',
      areas_of_concern: []
    };
  };

  const analyzeOiliness = async (imageData) => {
    return {
      level: 'normal',
      t_zone: 'moderate'
    };
  };

  const detectRedness = async (imageData) => {
    return {
      level: 'mild',
      areas: []
    };
  };

  const detectAcne = async (imageData) => {
    return {
      detected: true,
      severity: 'mild',
      type: 'inflammatory'
    };
  };

  const analyzePores = async (imageData) => {
    return {
      size: 'moderate',
      visibility: 'noticeable'
    };
  };

  const analyzeFirmness = async (imageData) => {
    return {
      level: 'good',
      areas_of_concern: []
    };
  };

  const analyzeEyeLids = async (imageData) => {
    return {
      upper: 'normal',
      lower: 'slight_drooping'
    };
  };

  const analyzeRadiance = async (imageData) => {
    return {
      level: 'moderate',
      uniformity: 'good'
    };
  };

  const analyzeTearTrough = async (imageData) => {
    return {
      depth: 'moderate',
      symmetry: 'good'
    };
  };

  const analyzeFacialFeatures = async (imageData) => {
    const analysis = {
      spots: await detectSpots(imageData),
      wrinkles: await detectWrinkles(imageData),
      texture: await analyzeTexture(imageData),
      darkCircles: await detectDarkCircles(imageData),
      moisture: await analyzeMoisture(imageData),
      oiliness: await analyzeOiliness(imageData),
      redness: await detectRedness(imageData),
      acne: await detectAcne(imageData),
      pores: await analyzePores(imageData),
      firmness: await analyzeFirmness(imageData),
      eyeLidDrooping: await analyzeEyeLids(imageData),
      radiance: await analyzeRadiance(imageData),
      tearTrough: await analyzeTearTrough(imageData)
    };
    
    setFacialAnalysis(analysis);
    return analysis;
  };

  const onFaceMeshResults = async (results) => {
    if (!results.multiFaceLandmarks || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw face mesh
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(ctx, landmarks, FaceMesh.FACEMESH_TESSELATION, 
        { color: '#C0C0C070', lineWidth: 1 });
    }

    // Analyze facial features
    const analysis = await analyzeFacialFeatures(results.image);
    
    // Send analysis to the backend
    sendAnalysisToBackend(analysis);
  };

  const sendAnalysisToBackend = async (analysis) => {
    try {
      const response = await fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysis)
      });
      
      const data = await response.json();
      console.log('Analysis response:', data);
    } catch (error) {
      console.error('Error sending analysis:', error);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
      {facialAnalysis && (
        <div style={styles.analysisOverlay}>
          <h3>Facial Analysis Results:</h3>
          {Object.entries(facialAnalysis).map(([feature, data]) => (
            <div key={feature} style={styles.analysisItem}>
              <span>{feature}: </span>
              <span>{typeof data === 'object' ? JSON.stringify(data) : data}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  analysisOverlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    maxWidth: '300px',
    zIndex: 2
  },
  analysisItem: {
    margin: '5px 0',
    fontSize: '14px'
  }
};

export default AestheticianDetection;