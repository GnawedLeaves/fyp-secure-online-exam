import React, { useState, useEffect } from 'react';
import {
  Camera,
  CameraText,
} from "./CameraCheckStyles";
const CameraCheck = () => {
  const [isCameraAccessible, setIsCameraAccessible] = useState(false);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        // Request access to the user's camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // If successful, close the camera stream and set the state to true
        stream.getTracks().forEach(track => track.stop());
        setIsCameraAccessible(true);
      } catch (error) {
        // If there's an error, set the state to false
        setIsCameraAccessible(false);
        console.error('Error accessing camera:', error);
      }
    };

    // Call the camera check function
    checkCamera();

  }, []);

  return (
    <Camera>
      <CameraText>{isCameraAccessible ? 'Camera Accessible' : 'No Camera Access'}</CameraText>
    </Camera>
  );
};

export default CameraCheck;