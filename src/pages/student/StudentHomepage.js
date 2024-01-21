import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  FeatureCheckContainer,
  FeatureCheckTitle,
  FeatureCheckDescription,
  FeatureCheckButton,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Footer from "../../components/Footer/Footer";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBugOutline } from "react-icons/io5";

export const studentNavbarItems = [
  {
    title: "Home",
    path: "/student/home",
    logo: <RiHome4Line />,
  },
  {
    title: "Exams",
    path: "/student/exam",
    logo: <IoBookOutline />,
  },
  {
    title: "Bug Report",
    path: "/student/bug_report",
    logo: <IoBugOutline />,
  },
  {
    title: "Settings",
    path: "/student/settings",
    logo: <IoSettingsOutline />,
  },
];

const StudentHomepage = () => {
  const navigate = useNavigate();
  const navigateFaceRegistration = () => {
    navigate("/student/dashboard/face_registration");
  };
  const navigateSystemCheck = () => {
    navigate("/student/dashboard/system_check");
  };

  const navigateExamDemo = () => {
    navigate("/student/dashboard/exam_demo");
  };

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Home</PageTitle>
          <FeatureCheckContainer>
            <FeatureCheckTitle>Face Registration</FeatureCheckTitle>
            <FeatureCheckDescription>
              Please register your face before you attend any exam. If you did not do so, you are forbidden to sit for the exam.
            </FeatureCheckDescription>
            <FeatureCheckButton onClick={navigateFaceRegistration}>
              Register my face
            </FeatureCheckButton>
          </FeatureCheckContainer>
          <FeatureCheckContainer>
            <FeatureCheckTitle>System Check</FeatureCheckTitle>
            <FeatureCheckDescription>
              You are encouraged to have a system check before you are going to sit for any exam. This will ensure your exam are conducted smoothly.
            </FeatureCheckDescription>
            <FeatureCheckButton onClick={navigateSystemCheck}>Check my system</FeatureCheckButton>
          </FeatureCheckContainer>
          <FeatureCheckContainer>
            <FeatureCheckTitle>Exam Demo</FeatureCheckTitle>
            <FeatureCheckDescription>
              You are encouraged to have a exam demo before you are going to sit for any exam. This will ensure your exam are conducted smoothly.
            </FeatureCheckDescription>
            <FeatureCheckButton onClick={navigateExamDemo}>Start a demo</FeatureCheckButton>
          </FeatureCheckContainer>
          <Footer/>
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
      
  );
};

export default StudentHomepage;