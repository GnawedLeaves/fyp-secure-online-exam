import React, { useState } from 'react';
import {
  Camera,
  CameraText,
  ProgressBarContainer,
  ProgressBarFill,
} from "./CameraCheckStyles";
import Button from '../Button/Button';

const CameraCheck = () => {
  const [cameraQuality, setCameraQuality] = useState(null);
  const [isCameraDetected, setIsCameraDetected] = useState(true);

  const checkCameraQuality = async () => {
    try {

      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Get the first video track from the stream
      const videoTrack = stream.getVideoTracks()[0];

      if (!videoTrack) {
        setIsCameraDetected(false);
        return;
      }

      // Get the settings object from the video track
      const settings = videoTrack.getSettings();

      // Assess camera quality based on resolution
      const resolutionScore = calculateResolutionScore(settings.width, settings.height);

      setCameraQuality(resolutionScore);

      // Stop the video stream
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error checking camera quality:', error);
      setIsCameraDetected(false);
    }
  };

  const calculateResolutionScore = (width, height) => {
    // You can adjust the normalization factor to increase or decrease the camera quality score
    const totalPixels = width * height;
    const resolutionScore = (totalPixels / (854 * 480)) * 100; // Normalize to a percentage

    // Adjust the maximum acceptable value to fit the desired range
    const maxAcceptableValue = 100; // You can change this value as needed

    // Ensure the resolution score doesn't exceed the maximum acceptable value
    const adjustedScore = Math.min(resolutionScore, maxAcceptableValue);

    return adjustedScore;
  };

  const handleRetry = () => {
    setIsCameraDetected(true);
  setCameraQuality(null);
    console.log(cameraQuality);
  };

  return (
    <Camera>
      {!cameraQuality  && (
        <Button onClick={checkCameraQuality}>Check Camera</Button>
      )}
      {isCameraDetected && cameraQuality !== null && (
        <>
          <CameraText>Camera Quality: {cameraQuality ? `${cameraQuality.toFixed(2)}%` : 'Calculating...'}</CameraText>
          <ProgressBarContainer>
            <ProgressBarFill value={cameraQuality} max="100" />
          </ProgressBarContainer>
          <Button onClick={handleRetry}>Close</Button>
        </>
      )}
      {!isCameraDetected && (
        <CameraText>No Camera Detected</CameraText>
      )}
    </Camera>
  );
};

export default CameraCheck;
