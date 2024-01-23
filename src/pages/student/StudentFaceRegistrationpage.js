import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  FaceRegistrationSection,
  SampleContainer,
  CamContainer,
  SampleImage
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import sampleFaceRegistrationImg from '../../img/student/sample-face-registration.jpg';
import WebCam from "../../components/WebCam/WebCam";

const StudentFaceRegistrationpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Face Registration</PageTitle>
            <FaceRegistrationSection>
                <SampleContainer>
                    <SampleImage src={sampleFaceRegistrationImg} alt="Sample Image of Face Registration" />
                </SampleContainer>
                <CamContainer>
                    <WebCam/>
                </CamContainer>
            </FaceRegistrationSection>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentFaceRegistrationpage;


