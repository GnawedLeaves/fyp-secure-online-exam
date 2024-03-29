import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  PageEnterSpace,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import CameraCheck from "../../components/CameraCheck/CameraCheck";
import SoundCheck from "../../components/SoundCheck/SoundCheck";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import InternetCheck from "../../components/InternetCheck/InternetCheck";

const StudentSystemCheckpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>System Check</PageTitle>
            <PageEnterSpace/><PageEnterSpace/><PageEnterSpace/>
            <CameraCheck/>
            <PageEnterSpace/>
            <SoundCheck/>
            <PageEnterSpace/>
            <InternetCheck/>
            <PageEnterSpace/>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
        
      </ThemeProvider>
  );
};

export default StudentSystemCheckpage;


