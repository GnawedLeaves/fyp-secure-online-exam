import React, { useState, useEffect } from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  ProfileContainer,
  StudentProfileSection,
  StudentResultSection,
  DataSection,
  LeftContainer,
  RightContainer,
  SampleImage,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import sampleFaceRegistrationImg from '../../img/student/sample-face-registration.jpg';
import { useRef } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";
import { storage } from '../../backend/firebase/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { handleFirebaseDate } from "../../backend/firebase/handleFirebaseDate";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const StudentProfilepage = () => {
  //const studentId = "1221";
  const [studentId, setStudentId] = useState(null);
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
      setStudentId(userInfo[0]?.id);
      
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
  useEffect(() => {
    console.log("Updated studentId:", studentId);
  }, [studentId]);

  const profileDisplayRef = useRef(null);
  const [profile, setProfiles] = useState([]);
  

  const getProfile = async (studentId) => {
    try {
      const userDocRef = doc(db, 'users', studentId);
      const docSnapshot = await getDoc(userDocRef);

    // Extract the data from the documents
    const profilesData = {
      id: docSnapshot.id,
      ...docSnapshot.data(),
    };

      console.log("profileData", profilesData);
      setProfiles(profilesData);

      return profilesData;
    } catch (error) {
      console.error("Error getting exam detail:", error);
      return [];
    }
  };



  //get image from storage
  const [imageUrl, setImageUrl] = useState('');
  const getImageUrl = async (imageName) => {
    const imageRef = ref(storage, `student_profile/${imageName}`);

    try {
      const downloadUrl = await getDownloadURL(imageRef);
      setImageUrl(downloadUrl);
      console.log('Download URL:', downloadUrl);
    } catch (error) {
      console.error('Error getting download URL:', error.message);
    }
  };

  //updates the data array whenever the database changes

  useEffect(() => {
    getProfile(studentId);
    getImageUrl(`student_${studentId}.jpg`);
  }, [studentId]);

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Profile</PageTitle>
          <ProfileContainer>
            <StudentProfileSection ref={profileDisplayRef}>
              <LeftContainer>
                <DataSection><b>Name: </b>{profile.name}</DataSection>
                <DataSection><b>Email Address: </b>{profile.email}</DataSection>
                <DataSection><b>Programme: </b>{profile.programme}</DataSection>
                <DataSection><b>Year: </b>Year {profile.year}</DataSection>
                <DataSection><b>Student Type: </b>{profile.studentType}</DataSection>
                <DataSection><b>Enrollment Status: </b>{profile.enrollmentStatus}</DataSection>
                <DataSection><b>Enrollment Year: </b>{profile.enrollmentYear}</DataSection>
                <DataSection><b>CGPA: </b>{profile.cgpa}</DataSection>
              </LeftContainer>
              <RightContainer>
                <SampleImage src={imageUrl} alt="Sample Image of Face Registration" />
              </RightContainer>
            </StudentProfileSection>
            <StudentResultSection>
            </StudentResultSection>

          </ProfileContainer>
          <Footer />
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentProfilepage;


