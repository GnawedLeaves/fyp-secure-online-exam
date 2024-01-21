import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  PageButton,
  PageEnterSpace
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";

const StudentBugReportpage = () => {
  const navigate = useNavigate();
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Bug Report</PageTitle>
            <PageEnterSpace/><PageEnterSpace/><PageEnterSpace/>
            <PageButton onClick={() => navigate("/student/exam/question")}>Request A New Query</PageButton>
            <PageEnterSpace/>
            <PageButton onClick={() => navigate("/student/exam/question")}>Check Opened Query</PageButton>
            <PageEnterSpace/>
            <PageButton onClick={() => navigate("/student/exam/question")}>Check Closed Query</PageButton>
            <PageEnterSpace/>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentBugReportpage;


