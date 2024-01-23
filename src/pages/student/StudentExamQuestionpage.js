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
  PageInput,
  PageLabel,
  PageButton,
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
import  Timer from "../../components/Timer/Timer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import {
  FaClock
}from "react-icons/fa";
import Numberbox from "../../components/Numberbox/Numberbox";

const StudentExamQuestionpage = () => {
  const endTime = new Date();
  endTime.setHours(19, 0, 0, 0); //7pm
  const navigate = useNavigate();
  const TotalQuestion = 31;

  const grid = [];

  for (let i = 0; i < Math.ceil(TotalQuestion/5); i++) {
    const row=[];
    for (let j = 0; j < 5; j++) {
      if(5*i+j+1 <=TotalQuestion){
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
                  <PageDescription>Question 1:</PageDescription>
                  <PageDescription>Which is the tallest animal on the earth? </PageDescription>
                  <PageEnterSpace/>
                  <PageChoice>
                      <PageInput type="radio" name="Answer" value="A"/><PageLabel>A</PageLabel><PageEnterSpace/>
                      <PageInput type="radio" name="Answer" value="B"/><PageLabel>B</PageLabel><PageEnterSpace/>
                      <PageInput type="radio" name="Answer" value="C"/><PageLabel>C</PageLabel><PageEnterSpace/>
                      <PageInput type="radio" name="Answer" value="D"/><PageLabel>D</PageLabel><PageEnterSpace/>
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
                <PageButton style={{ margin: '100px auto' }} onClick={() => navigate("/student/exam/question")}>Next</PageButton>
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


