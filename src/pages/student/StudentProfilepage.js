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
import { theme } from "../../theme";
import { studentNavbarItems } from "./StudentHomepage";
import sampleFaceRegistrationImg from "../../img/student/sample-face-registration.jpg";
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
import { storage } from "../../backend/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { handleFirebaseDate } from "../../backend/firebase/handleFirebaseDate";

const StudentProfilepage = () => {
  const studentId = "1221";
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
  const [imageUrl, setImageUrl] = useState("");
  const getImageUrl = async (imageName) => {
    const imageRef = ref(storage, `student_profile/${imageName}`);

    try {
      const downloadUrl = await getDownloadURL(imageRef);
      setImageUrl(downloadUrl);
      console.log("Download URL:", downloadUrl);
    } catch (error) {
      console.error("Error getting download URL:", error.message);
    }
  };

  //updates the data array whenever the database changes

  useEffect(() => {
    getProfile(studentId);
    getImageUrl(`student_${studentId}.jpg`);
  }, []);

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

          <Footer />
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentProfilepage;
