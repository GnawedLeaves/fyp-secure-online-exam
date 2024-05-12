import React, { useRef, useState } from 'react';
import { WebCamSection, WebCamVideo, WebCamButtonContainer } from "./WebCamStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';
import { db } from "../../backend/firebase/firebase";
import { ref, uploadString} from 'firebase/storage';
import { query, where, getDocs, collection, updateDoc,doc,getDoc } from "firebase/firestore";
import { storage } from '../../backend/firebase/firebase';
import UploadModal from '../Modal/UploadModal';
import Tesseract from 'tesseract.js';

const WebCam2 = (props) => {
  const studentId = props.studentId;
  const examId = props.examId;
  const file = props.file;
  const videoRef = useRef(null);
  const [webcamStarted, setWebcamStarted] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [objectUrl, setObjectUrl] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = React.useState(0);

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

        // Convert the canvas content to a Data URL
        const dataUrl = canvas.toDataURL('image/png');
        setImageDataUrl(dataUrl);

        // Log the data URL for PNG format
        console.log('Data URL (PNG):', dataUrl);

        // Convert the data URL to a Blob
        const blob = dataURLToBlob(dataUrl);

        // Convert the Blob to a File
        const file = blobToFile(blob, 'image.png');

        // Create an Object URL from the File
        const objectUrl = URL.createObjectURL(file);

        // Log and set the Object URL in state or use it as needed
        console.log('Object URL:', objectUrl);
        setObjectUrl(objectUrl);
    }
  };

  const dataURLToBlob = (dataUrl) => {
      const byteString = atob(dataUrl.split(',')[1]);
      const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
  };

  const blobToFile = (blob, fileName) => {
      const file = new File([blob], fileName, { type: blob.type });
      return file;
  };
  
  const updateCardStatusToVerified = async (examId, studentId) => {
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
  
      // Update the cardStatus to 'verified' for the specific student
      exam.students[studentInfo].cardStatus = 'verified';
  
      // Update the document in the "exams" collection
      await updateDoc(examDoc.ref, { students: exam.students });
  
      console.log("Card status updated to 'verified' successfully!");
    } catch (error) {
      console.error("Error updating card status to 'verified' in exam:", error);
    }
  };  

  const updateCardStatus = async (examId, studentId, status) => {
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

        // Update the cardStatus for the specific student
        exam.students[studentInfo].cardStatus = status;

        // Update the document in the "exams" collection
        await updateDoc(examDoc.ref, { students: exam.students });

        console.log(`Card status updated to '${status}' successfully!`);
    } catch (error) {
        console.error(`Error updating card status to '${status}' in exam:`, error);
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
    if (dataUrl && examId && studentId) {
      const storageRef = ref(storage, 'captured_images/card/' + studentId + '-' + examId + '.png');
      try {
        await uploadString(storageRef, dataUrl, 'data_url');
        console.log('Image uploaded successfully!');
        await extractTextFromImage(objectUrl);
        //await updateCardStatusToVerified(examId, studentId)
        await updateStudentStatusInExam(examId, studentId, "In Progress");
        window.location.href = '/student/exam/' + examId;
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
  };
  
  const getUserData = async (studentId) => {
    try {
        const usersRef = collection(db, "users");
        const userDoc = await getDoc(doc(usersRef, studentId));

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.warn(`User with ID ${studentId} not found.`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
  };

  const extractTextFromImage = async (object) => {
    try {
      // Initialize Tesseract
      const worker = Tesseract.createWorker();
      await worker.load();
      await worker.loadLanguage('eng'); // Load the English language
      await worker.initialize('eng'); // Initialize Tesseract with the English language

      // Recognize text from the provided image URL
      setIsLoading(true);
      const result = await worker.recognize(object, 'eng');
      console.log(result.data);
      setExtractedText(result.data.text);

      const userData = await getUserData(studentId);
      console.log ("userData",userData)
      const matricFieldValue = userData.matric; 
      console.log ("matricFieldValue",matricFieldValue)

      // Check if the extracted text matches the matric field value
      const containsWord = result.data.text.includes(matricFieldValue);

      // Update cardStatus based on the presence of the word
      const cardStatus = containsWord ? 'success' : 'failed';
      await updateCardStatus(examId, studentId, cardStatus);

      setIsLoading(false);
  } catch (err) {
      console.error("Error during recognition:", err);
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
          uploadImageData(imageDataUrl);
        }}
        show={showDeleteModal}
        modalTitle="Matric Card Verification"
        modalContent="Are you sure you want to submit your image? This action cannot be undone."
        imageCaptured={imageDataUrl}
      />
      <WebCamVideo ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: '600px' }} />
      
      <WebCamButtonContainer>
        {!webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={handleCaptureClick}>Start Webcam</Button>}
        {webcamStarted && <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => handleCaptureAndShowModal()}>Capture Image</Button>}
      </WebCamButtonContainer>

      {isLoading && <p>Loading...</p>}
      
      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </WebCamSection>
  );
};

export default WebCam2;
