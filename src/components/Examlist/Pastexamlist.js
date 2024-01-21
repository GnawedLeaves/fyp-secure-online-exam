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
        <ExamDetail style={{ width: '20%'}}>{props.examName}</ExamDetail>
        <ExamDetail style={{ width: '15%'}}>{props.examEndDate}</ExamDetail>
        <ExamDetail style={{ width: '32%'}}>{props.examSubmissionTime}</ExamDetail>
        <ExamDetail style={{ width: '18%'}}>{props.examStatus}</ExamDetail>
        <ExamDetail style={{ width: '10%'}}>
          {
            props.examStatus ==="Graded" ? (
            <ExamAction onClick={() => navigate("/student/exam/result/" + props.examId)}>Reivew</ExamAction>
            ) : (
              <ExamAction onClick={() => navigate("/student/exam/submission/" + props.examId)}>Review</ExamAction>
            )
          }
        </ExamDetail>
      </ExamlistContainer>
    </ThemeProvider>
  );
};
export default Pastexamlist;
