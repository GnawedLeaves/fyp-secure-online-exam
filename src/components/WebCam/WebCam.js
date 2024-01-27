import React, { useRef, useState } from 'react';
import { WebCamSection, WebCamVideo, WebCamButtonContainer } from "./WebCamStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';

const WebCam = () => {
  const videoRef = useRef(null);
  const [webcamStarted, setWebcamStarted] = useState(false);

  const handleCaptureClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setWebcamStarted(true);
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const handleCaptureImage = () => {
    const confirmation = window.confirm('Are you sure you want to capture an image?');

    if (confirmation) {
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

        // Redirect to the homepage
        window.location.href = '/student/dashboard'; // Replace '/' with your homepage route

      }
    }
  };

  return (
    <WebCamSection>
      <WebCamVideo ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '600px' }} />
      
      <WebCamButtonContainer>
        {!webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={handleCaptureClick}>Start Webcam</Button>}
        {webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={handleCaptureImage}>Capture Image</Button>}
      </WebCamButtonContainer>
    </WebCamSection>
  );
};

export default WebCam;
