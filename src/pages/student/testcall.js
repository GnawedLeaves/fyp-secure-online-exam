import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  FeatureCheckContainer,
  FeatureCheckTitle,
  FeatureCheckDescription,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Footer from "../../components/Footer/Footer";
import { theme } from "../../theme";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoBugOutline } from "react-icons/io5";
import Button from "../../components/Button/Button";
import  VideoRoom  from "../../components/videoCall/VideoRoom";
import  VideoRoom2  from "../../components/videoCall/VideoRoom2";

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
    title: "Profile",
    path: "/student/profile",
    logo: <IoPersonOutline />,
  },
];

const Testcall = () => {
  const navigate = useNavigate();
  const navigateFaceRegistration = () => {
    navigate("/student/home/face_registration");
  };
  const navigateSystemCheck = () => {
    navigate("/student/home/system_check");
  };

  const navigateExamDemo = () => {
    navigate("/student/home/exam_demo");
  };

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
        <VideoRoom/>
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
      
  );
};

export default Testcall;