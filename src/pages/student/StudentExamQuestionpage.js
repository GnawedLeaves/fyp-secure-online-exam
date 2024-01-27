import React from "react";
import {
  PageTitle,
  StudentHomePageContainer,
  StudentExamDetailContainer,
  QuestionContainer,
  QuestionSection,
  LeftContainer,
  RightContainer,
  QuestionGrid,
  QuestionRow,
  PageDescription,
  PageChoice,
  PageEnterSpace,
  QuestionLegend,
  LegendRow,
  LegendData,
  LegendBlueColor,
  LegendRedColor,
  LegendGreyColor,
  LegendText
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import  Timer from "../../components/Timer/Timer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import {
  FaClock
}from "react-icons/fa";
import Numberbox from "../../components/Numberbox/Numberbox";
import RadioButtonGroup from "../../components/student/RadioButtonGroup/RadioButtonGroup";

const StudentExamQuestionpage = () => {
  const ExamTimeArray = [
    { 
      examid: "1", 
      endTime: "2024-01-27 23:30:00 ", 
    },
  ];
  const examTotalQuestions = [
    {
      title: "IE4171: Web Design",
      TotalQuestion: 26,
    },
  ];
  const examQuestions = [
    {
      index: 2,
      question: "Which is the tallest animal on the earth?!",
      options: ["elephant", "zebra", "giraffe", "ant","cat"],
    },
  ];
  
  const endTime = new Date(ExamTimeArray[0].endTime);
  endTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
  const navigate = useNavigate();
  const nextQuestion = () => {
    navigate("/student/exam/question");
  };

  const grid = [];

  for (let i = 0; i < Math.ceil(examTotalQuestions[0].TotalQuestion/5); i++) {
    const row=[];
    for (let j = 0; j < 5; j++) {
      if(5*i+j+1 <=examTotalQuestions[0].TotalQuestion){
        row.push(<Numberbox number={5 * i + j + 1} />);
      }
    }
    grid.push(<QuestionRow>{row}</QuestionRow>);
  }

  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentExamDetailContainer>
            <PageTitle>IE4717 Web Application & Design</PageTitle>
            <QuestionContainer>
              <LeftContainer>
                <QuestionSection>
                  <PageDescription>Question {examQuestions[0].index} :</PageDescription>
                  <PageDescription>{examQuestions[0].question} </PageDescription>
                  <PageEnterSpace/>
                  <PageChoice>
                      <RadioButtonGroup index={examQuestions[0].index} options={examQuestions[0].options} />
                  </PageChoice>
                </QuestionSection>
              </LeftContainer>
              <RightContainer>
                <FaClock style={{ float: 'left', marginTop: '3px' }} />
                <Timer endTime={endTime} />
                <QuestionGrid>{grid}</QuestionGrid>
              </RightContainer>
            </QuestionContainer>
            <QuestionContainer>
              <LeftContainer>
                <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => nextQuestion()}>
                  Next
                </Button>
              </LeftContainer>
              <RightContainer>
                <QuestionLegend>
                  <LegendRow>
                    <LegendData colSpan="2" style={{ backgroundColor: 'grey'}}>Overall Summary</LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendBlueColor></LegendBlueColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Attempted</LegendText>
                    </LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendGreyColor></LegendGreyColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Not Attempted</LegendText>
                    </LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendRedColor></LegendRedColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Flag</LegendText>
                    </LegendData>
                  </LegendRow>
                </QuestionLegend>
              </RightContainer>
            </QuestionContainer>
            <Footer/>
          </StudentExamDetailContainer>
        </StudentHomePageContainer>  
      </ThemeProvider>
  );
};

export default StudentExamQuestionpage;


