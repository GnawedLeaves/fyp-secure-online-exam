import React from "react";
import {
    PageTitle,
  PageDescription,
  PageChoice,
  PageInput,
  PageLabel,
  PageButton,
  ExamPageContainer,
  ExamPageContainer2,
  PageEnterSpace,
  QuestionTable,
  QuestionTableRow,
  QuestionTableCell,
  QuestionTableData,
  QuestionLegend,
  LegendRow,
  LegendData,
  LegendColor,
  LegendText
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { Link } from "react-router-dom";
import {
  FaClock
}from "react-icons/fa";

const StudentExamQuestionpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHeader/>
        <PageTitle>IE4717 Web Application & Design</PageTitle>
        <ExamPageContainer>
          <PageDescription>Question 1:</PageDescription>
          <PageDescription>Which is the tallest animal on the earth? </PageDescription>
          <PageEnterSpace/>
          <PageChoice>
              <PageInput type="radio" name="Answer" value="A"/><PageLabel>A</PageLabel><PageEnterSpace/>
              <PageInput type="radio" name="Answer" value="B"/><PageLabel>B</PageLabel><PageEnterSpace/>
              <PageInput type="radio" name="Answer" value="C"/><PageLabel>C</PageLabel><PageEnterSpace/>
              <PageInput type="radio" name="Answer" value="D"/><PageLabel>D</PageLabel><PageEnterSpace/>
          </PageChoice>
          <Link to="/student/exam/question">
            <PageButton style={{ margin: '100px auto' }}>Next</PageButton>
          </Link>
          <PageEnterSpace/>
        </ExamPageContainer>
        <ExamPageContainer2>
          <FaClock style={{ float: 'left', marginTop: '3px' }} />
          <PageDescription>01:56:20</PageDescription>
          <QuestionTable>
            <QuestionTableRow>
              <QuestionTableCell>
              <QuestionTableData>1</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>2</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>3</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>4</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>5</QuestionTableData>
              </QuestionTableCell>
            </QuestionTableRow>
            <QuestionTableRow>
              <QuestionTableCell>
              <QuestionTableData>6</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>7</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>8</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>9</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>10</QuestionTableData>
              </QuestionTableCell>
            </QuestionTableRow>
            <QuestionTableRow>
              <QuestionTableCell>
              <QuestionTableData>11</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>12</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>13</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>14</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>15</QuestionTableData>
              </QuestionTableCell>
            </QuestionTableRow>
            <QuestionTableRow>
              <QuestionTableCell>
              <QuestionTableData>16</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>17</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>18</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>19</QuestionTableData>
              </QuestionTableCell>
              <QuestionTableCell>
              <QuestionTableData>20</QuestionTableData>
              </QuestionTableCell>
            </QuestionTableRow>
          </QuestionTable>
          <QuestionLegend>
            <LegendRow>
              <LegendData colSpan="2" style={{ backgroundColor: 'grey'}}>Overall Summary</LegendData>
            </LegendRow>
            <LegendRow>
              <LegendData>
                <LegendColor style={{ backgroundColor: 'blue' }}></LegendColor>
              </LegendData>
              <LegendData>
                <LegendText>Attempted</LegendText>
              </LegendData>
            </LegendRow>
            <LegendRow>
              <LegendData>
                <LegendColor style={{ backgroundColor: 'grey' }}></LegendColor>
              </LegendData>
              <LegendData>
                <LegendText>Not Attempted</LegendText>
              </LegendData>
            </LegendRow>
            <LegendRow>
              <LegendData>
                <LegendColor style={{ backgroundColor: 'red' }}></LegendColor>
              </LegendData>
              <LegendData>
                <LegendText>Flag</LegendText>
              </LegendData>
            </LegendRow>
          </QuestionLegend>
        </ExamPageContainer2>
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentExamQuestionpage;


