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
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import WebCam from "../../components/WebCam/WebCam";
import { db } from "../../backend/firebase/firebase";
import { storage } from '../../backend/firebase/firebase';
import { ref, getDownloadURL  } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { query, where, getDocs, collection } from "firebase/firestore";

const StudentFaceRegistrationpage = () => {
  //get image from storage

  //const student = "1221"; //change to a general login id
  const [student, setStudent] = useState();
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

      return userInfo;
    } catch (error) {
      console.error("Error getting profiles:", error);
      return [];
    }
  };

  const auth = getAuth();
  const authId = auth.currentUser ? auth.currentUser.uid : null;
  console.log('authId',authId);
  if (authId) {
    getUser(authId);
  }

  const [imageUrl, setImageUrl] = useState('');
  const getImageUrl  = async (imageName) => {
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
    getImageUrl (`sample-face-registration.jpg`);
  }, []);

  

  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>

          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Face Registration</PageTitle>
            <FaceRegistrationSection>
                <SampleContainer>
                    <SampleText>Sample Image for Face Registration</SampleText>
                    <SampleImage src={imageUrl} alt="Sample Image of Face Registration" />
                    <SampleDesc>Please provide an image with your face visible and without any obstructions</SampleDesc>
                </SampleContainer>
                <CamContainer>
                    <WebCam 
                      studentId={student}/>
                </CamContainer>
            </FaceRegistrationSection>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentFaceRegistrationpage;


