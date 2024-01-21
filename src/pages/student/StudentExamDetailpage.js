import React from "react";
import {
  StudentHomePageContainer,
  StudentExamDetailContainer,
  PageTitle,
  PageSubtitle,
  PageDescription,
  PageList,
  PageOrderList,
  SectionContainer,
  RuleContainer,
  PageButton,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";

const StudentExamDetailpage = () => {
  const navigate = useNavigate();
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentExamDetailContainer>
            <PageTitle>IE4717 Web Application & Design</PageTitle>
            <SectionContainer>
              <PageSubtitle>Section Description</PageSubtitle>
              <PageList>
                <PageOrderList>Section A --- 50%</PageOrderList>
                <PageOrderList>Section B --- 30%</PageOrderList>
                <PageOrderList>Section C --- 20%</PageOrderList>
              </PageList>
            </SectionContainer>
            <PageDescription>Time Duration: 2 hrs</PageDescription>
            <RuleContainer>
              <PageDescription>Rule and Regulation</PageDescription>
              <PageList>
                  <PageOrderList>rule</PageOrderList>
                  <PageOrderList>rule</PageOrderList>
                  <PageOrderList>rule</PageOrderList>
                  <PageOrderList>rule</PageOrderList>
                  <PageOrderList>rule</PageOrderList>
                  <PageOrderList>rule</PageOrderList>
              </PageList>
            </RuleContainer>
            <PageButton style={{ float: 'right' }} onClick={() => navigate("/student/exam/question")}>Start</PageButton>
            <Footer/>
          </StudentExamDetailContainer>
        </StudentHomePageContainer>
      </ThemeProvider>
  );
};

export default StudentExamDetailpage;


