import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  ExamboxButton,
  ExamboxButtonContainer,
  ExamboxContainer,
  ExamboxDetail,
  ExamboxDetails,
  ExamboxTitle,
} from "./ExamboxStyles";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Exambox = (props) => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate(`/admin/exam/${props.examId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <ExamboxContainer ongoing={props.status === "ongoing"}>
        <ExamboxTitle>{props.title}</ExamboxTitle>
        <ExamboxDetails>
          <ExamboxDetail>Exam ID: {props.examId}</ExamboxDetail>
          <ExamboxDetail>Students: {props.studentsCount}</ExamboxDetail>
          <ExamboxDetail>Time left: {props.timeLeft}</ExamboxDetail>
          <ExamboxDetail>Alerts: {props.alertsCount}</ExamboxDetail>
        </ExamboxDetails>
        <ExamboxButtonContainer>
          <ExamboxButton
            ongoing={props.status === "ongoing"}
            onClick={changePage}
          >
            Manage
            <GoArrowRight />
          </ExamboxButton>
        </ExamboxButtonContainer>
      </ExamboxContainer>
    </ThemeProvider>
  );
};
export default Exambox;
