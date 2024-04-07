import React, { useRef, useState } from 'react';
import { WebCamSection, WebCamVideo, WebCamButtonContainer } from "./WebCamStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';
import { db } from "../../backend/firebase/firebase";
import { ref, uploadString} from 'firebase/storage';
import { query, where, getDocs, collection, updateDoc } from "firebase/firestore";
import { storage } from '../../backend/firebase/firebase';
import UploadModal from '../Modal/UploadModal';

const WebCam2 = (props) => {
  const studentId = props.studentId;
  const examId = props.examId;
  const file = props.file;
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
  const updateStudentStatusInExam = async (examId, studentId, status) => {
    try {
      const examsRef = collection(db, "exams");
      const examsQuery = query(examsRef, where("examId", "==", examId));
      // Get the current exam documents based on the query
      const examSnapshot = await getDocs(examsQuery);
  
      // Check if there are any documents
      if (examSnapshot.empty) {
        console.warn(`No exams found for exam with examId ${examId}.`);
        return null;
      }
  
      // Access the first document in the snapshot
      const examDoc = examSnapshot.docs[0];
      // Access the data of the document
      const exam = examDoc.data();
  
      // Check if the student with ID exists for the current exam
      const studentInfo = exam.students && exam.students.findIndex(student => student.id === studentId);
  
      if (studentInfo === -1) {
        console.warn(`Student with ID ${studentId} not found for exam with examId ${examId}.`);
        return null; // Skip updating this exam
      }
  
      // Update the status for the specific student
      exam.students[studentInfo].status = status;
  
      // Update the document in the "exams" collection
      await updateDoc(examDoc.ref, { students: exam.students });
  
      console.log("Student status updated successfully!");
    } catch (error) {
      console.error("Error updating student status in exam:", error);
    }
  };

  
  const uploadImageData = async (dataUrl) => {
    if (dataUrl&&examId&&studentId) {
      const storageRef = ref(storage, 'captured_images/' + studentId + '-' + examId + '.png');
      try {
        await uploadString(storageRef, dataUrl, 'data_url');
        console.log('Image uploaded successfully!');
        await updateStudentStatusInExam(examId, studentId, "In Progress");
        window.location.href = '/student/exam/'+ examId ;
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
        modalTitle="Matric Card Verification"
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

export default WebCam2;
