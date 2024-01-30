import React from "react";
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
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import sampleFaceRegistrationImg from '../../img/student/sample-face-registration.jpg';

const StudentProfilepage = () => {

  const profile = [
    {
      name: "Wei jie",
      matric: "U2020520F",
      programme: "Information Engineering & Media",
      year: "year 4",
      studentType: "undergraduate",
      enrollment: "enrolled",
      enrollmentYear: "2020",
      cgpa:4.5,
    },
  ];
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Profile</PageTitle>
            <ProfileContainer>
              <StudentProfileSection>
                <LeftContainer>
                  <DataSection>Name: {profile[0].name}</DataSection>
                  <DataSection>Matric Card: {profile[0].matric}</DataSection>
                  <DataSection>Programme: {profile[0].programme}</DataSection>
                  <DataSection>Year: {profile[0].year}</DataSection>
                  <DataSection>Student Type: {profile[0].studentType}</DataSection>
                  <DataSection>Enrollment Status: {profile[0].enrollment}</DataSection>
                  <DataSection>Enrollment Year: {profile[0].enrollmentYear}</DataSection>
                  <DataSection>CGPA: {profile[0].cgpa}</DataSection>
                </LeftContainer>
                <RightContainer>
                  <SampleImage src={sampleFaceRegistrationImg} alt="Sample Image of Face Registration"/>
                </RightContainer>
              </StudentProfileSection>
              <StudentResultSection>
                ##Should we put all the result here? <br/>
                ##or make another page to check it?
              </StudentResultSection>
              
            </ProfileContainer>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentProfilepage;


