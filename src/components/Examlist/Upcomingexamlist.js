import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    ExamlistContainer,
    ExamDetail,
} from "./ExamlistStyles";

const upcomingexamlist = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <ExamlistContainer>
        <ExamDetail style={{ width: '20%'}}>{props.examName}</ExamDetail>
        <ExamDetail style={{ width: '15%'}}>{props.examDate}</ExamDetail>
        <ExamDetail style={{ width: '20%'}}>{props.examStartTime}</ExamDetail>
        <ExamDetail style={{ width: '20%'}}>{props.examEndTime}</ExamDetail>
        <ExamDetail style={{ width: '20%'}}>{props.examDuration}</ExamDetail>
      </ExamlistContainer>
    </ThemeProvider>
  );
};
export default upcomingexamlist;
