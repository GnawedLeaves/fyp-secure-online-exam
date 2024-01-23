import React, { useRef } from 'react';
import { WebCamSection, WebCamVideo, WebCamButton } from "./WebCamStyles";

const WebCam = () => {
  const videoRef = useRef(null);

  const handleCaptureClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const handleCaptureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // You can then save the dataUrl as needed, for example, by sending it to a server or using it to create an image file.
      console.log('Captured Image Data URL:', dataUrl);
    }
  };

  return (
    <WebCamSection>
      <WebCamVideo ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '600px' }} />
      
      <WebCamButton onClick={handleCaptureClick}>Start Webcam</WebCamButton>
      <WebCamButton onClick={handleCaptureImage}>Capture Image</WebCamButton>
    </WebCamSection>
  );
};

export default WebCam;
