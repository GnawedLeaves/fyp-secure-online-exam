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
  EndTimeData,
  ResultData,

} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

const StudentExamReviewpage = () => {
  const examReview = [
    {
      examId: 1,
      examName: "IE4171: Web Design",
      examDate: "12th Feb 2024",
      examSubmissionTime: "09:45:59",
      examGrade: "A+",
    },
  ];

  const navigate = useNavigate();
  const NavigateAllExam = () => {
    navigate("/student/exam");
  };
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
                  <NameData>{examReview[0].examName}</NameData>
                </ReviewRow>
                <ReviewRow>
                <ReviewData>Date: </ReviewData>
                  <DateData>{examReview[0].examDate}</DateData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>Submission Time: </ReviewData>
                  <EndTimeData>{examReview[0].examSubmissionTime}</EndTimeData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>Grade: </ReviewData>
                  <ResultData>{examReview[0].examGrade}</ResultData>
                </ReviewRow>
              </ReviewTable>
              <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => NavigateAllExam()}>
                  Back
                </Button>
            </ReviewContainer>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
        
      </ThemeProvider>
  );
};

export default StudentExamReviewpage;


