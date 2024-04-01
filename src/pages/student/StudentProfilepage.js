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
} from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";
import { storage } from '../../backend/firebase/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { handleFirebaseDate } from "../../backend/firebase/handleFirebaseDate";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const StudentProfilepage = () => {
  //const studentId = "1221";
  const [studentId, setStudent] = useState();
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

  const profileDisplayRef = useRef(null);
  const [profile, setProfiles] = useState([]);
  const profilesRef = collection(db, "users");

  const getProfile = async (studentId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const profilesQuery = query(profilesRef, where("id", "==", studentId));

      // Get the documents based on the query
      const querySnapshot = await getDocs(profilesQuery);

      // Extract the data from the documents
      const profilesData = querySnapshot.docs.map((doc) => ({
        id: doc.Id,
        ...doc.data(),
      }));
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

  const dummy_profile = [
    {
      name: "Wei jie",
      matric: "U2020520F",
      programme: "Information Engineering & Media",
      year: "year 4",
      studentType: "undergraduate",
      enrollment: "enrolled",
      enrollmentYear: "2020",
      cgpa: 4.5,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Profile</PageTitle>
          <ProfileContainer>
            <StudentProfileSection ref={profileDisplayRef}>
              <LeftContainer>
                <DataSection><b>Name: </b>{profile[0]?.name}</DataSection>
                <DataSection><b>Matric Card: </b>{profile[0]?.matric}</DataSection>
                <DataSection><b>Email Address: </b>{profile[0]?.email}</DataSection>
                <DataSection><b>Programme: </b>{profile[0]?.programme}</DataSection>
                <DataSection><b>Year: </b>Year {profile[0]?.year}</DataSection>
                <DataSection><b>Student Type: </b>{profile[0]?.studentType}</DataSection>
                <DataSection><b>Enrollment Status: </b>{profile[0]?.enrollmentStatus}</DataSection>
                <DataSection><b>Enrollment Year: </b>{profile[0]?.enrollmentYear}</DataSection>
                <DataSection><b>CGPA: </b>{profile[0]?.cgpa.toFixed(1)}</DataSection>
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


