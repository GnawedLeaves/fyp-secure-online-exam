import React, { useState, useEffect } from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  FaceRegistrationSection,
  SampleContainer,
  CamContainer,
  SampleImage,
  SampleText,
  SampleDesc
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import WebCam2 from "../../components/WebCam/WebCam2";
import { db } from "../../backend/firebase/firebase";
import { storage } from '../../backend/firebase/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { query, where, getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useParams } from 'react-router-dom';

const StudentCardVerificationpage = () => {
  const { examId } = useParams();
  //const student = "1221"; //change to a general login id
  const [student, setStudent] = useState();
  const [student_exam, setStudentExam] = useState();
  const [authId, setAuthId] = useState(null);
  
  const getUser = async (authId) => {
    try {
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("authId", "==", authId));

      const querySnapshot = await getDocs(usersQuery);

      const userInfo = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("userInfo", userInfo);
      setStudent(userInfo[0]?.id);
      const student_exam = `${student}_${examId}`;
      setStudentExam(student_exam);

      return userInfo;
    } catch (error) {
      console.error("Error getting profiles:", error);
      return [];
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthId(user.uid); // Update authId when user is authenticated
      } else {
        setAuthId(null); // Reset authId when user is not authenticated
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run effect only once on mount

  useEffect(() => {
    if (authId) {
      getUser(authId);
    }
  }, [authId]); // Run effect when authId changes
  console.log("authid", authId);

  const [imageUrl, setImageUrl] = useState('');
  const getImageUrl = async (imageName) => {
    const imageRef = ref(storage, `testing_sample/${imageName}`);

    try {
      const downloadUrl = await getDownloadURL(imageRef);
      setImageUrl(downloadUrl);
      console.log('Download URL:', downloadUrl);
    } catch (error) {
      console.error('Error getting download URL:', error.message);
    }
  };

  useEffect(() => {
    getImageUrl(`matric_sample.png`);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>

        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Matric Card Verification</PageTitle>
          <FaceRegistrationSection>
            <SampleContainer>
              <SampleText>Sample Image for Matric Card</SampleText>
              <SampleImage src={imageUrl} alt="Sample Image of Matric Card Verification" />
              <SampleDesc>Please provide an image with your matriculation card visible and without any obstructions</SampleDesc>
            </SampleContainer>
            <CamContainer>
              <WebCam2
                studentId={student}
                examId={examId}/>
            </CamContainer>
          </FaceRegistrationSection>
          <Footer />
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentCardVerificationpage;


