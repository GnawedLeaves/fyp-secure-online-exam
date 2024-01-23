import React from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  ReviewContainer,
  ReviewRow,
  ReviewTable,
  ReviewData,
  NameData,
  DateData,
  StartTimeData,
  EndTimeData,
  ResultData,

} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";

const StudentExamReviewpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Exam Review</PageTitle>
            <ReviewContainer>
              <ReviewTable>
                <ReviewRow>
                  <ReviewData>Course: </ReviewData>
                  <NameData>IE4717 Web application</NameData>
                </ReviewRow>
                <ReviewRow>
                <ReviewData>Date: </ReviewData>
                  <DateData>22 Jan 2024</DateData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>Start Time: </ReviewData>
                  <StartTimeData>02:00:08 pm</StartTimeData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>End Time: </ReviewData>
                  <EndTimeData>03:59:55 pm</EndTimeData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>Grade: </ReviewData>
                  <ResultData>A+</ResultData>
                </ReviewRow>
              </ReviewTable>
                
            </ReviewContainer>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
        
      </ThemeProvider>
  );
};

export default StudentExamReviewpage;


