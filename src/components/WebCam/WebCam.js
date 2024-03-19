import React, { useRef, useState } from 'react';
import { WebCamSection, WebCamVideo, WebCamButtonContainer } from "./WebCamStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';
import { ref, uploadString } from 'firebase/storage';
import { storage } from '../../backend/firebase/firebase';
import UploadModal from '../Modal/UploadModal';

const WebCam = (props) => {
  const studentId = props.studentId;
  const videoRef = useRef(null);
  const [webcamStarted, setWebcamStarted] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
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
  const getImgDataUrl = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
  
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
      // Convert the canvas content to a data URL
      const newDataUrl = canvas.toDataURL('image/png');
      
      // Log and set the dataUrl in state
      console.log('newDataUrl', newDataUrl);
      setDataUrl(newDataUrl);
    }
  };
  
  const uploadImageData = async (dataUrl) => {
    if (dataUrl&&studentId) {
      const storageRef = ref(storage, 'captured_images/' + studentId + '.png');
      try {
        await uploadString(storageRef, dataUrl, 'data_url');
        console.log('Image uploaded successfully!');
        window.location.href = '/student/home';
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
  };

  const handleCaptureAndShowModal = async () => {
    await getImgDataUrl();
    setShowDeleteModal(true);
  };


  return (
    <WebCamSection>
      <UploadModal
        handleModalClose={() => {
          setShowDeleteModal(false);
        }}
        modalType="addPhoto"
        actionButtonText="Yes"
        actionButtonColor={theme.statusGood}
        actionButtonClick={() => {
          uploadImageData(dataUrl);
        }}
        show={showDeleteModal}
        modalTitle="Face Registration"
        modalContent="Are you sure you want to submit your image? This action cannot be undone."
        imageCaptured={dataUrl}
      />
      <WebCamVideo ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '600px' }} />
      
      <WebCamButtonContainer>
        {!webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={handleCaptureClick}>Start Webcam</Button>}
        {webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => handleCaptureAndShowModal()}>Capture Image</Button>}
      </WebCamButtonContainer>
    </WebCamSection>
  );
};

export default WebCam;
