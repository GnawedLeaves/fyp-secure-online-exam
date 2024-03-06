import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    ExamlistContainer,
    ExamDetail,
    ExamAction,
} from "./ExamlistStyles";
import { useNavigate } from "react-router-dom";

const Pastexamlist = (props) => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <ExamlistContainer>
        <ExamDetail style={{ width: '20%'}}>{props.courseId} {props.examName}</ExamDetail>
        <ExamDetail style={{ width: '15%'}}>{props.examEndDate}</ExamDetail>
        <ExamDetail style={{ width: '32%'}}>{props.examSubmissionTime}</ExamDetail>
        <ExamDetail style={{ width: '18%'}}>{props.examStatus}</ExamDetail>
        <ExamDetail style={{ width: '10%'}}>
        <ExamAction onClick={() => navigate("/student/exam/submission/" + props.examId)}>Reivew</ExamAction>
        </ExamDetail>
      </ExamlistContainer>
    </ThemeProvider>
  );
};
export default Pastexamlist;
