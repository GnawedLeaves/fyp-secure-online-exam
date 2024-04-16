import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  ExamboxButton,
  ExamboxButtonContainer,
  ExamboxContainer,
  ExamboxDetail,
  ExamboxDetails,
  ExamboxDetailsContainer,
  ExamboxTitle,
  ExamboxTitleOngoing,
} from "./ExamboxStyles";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Exambox = (props) => {
  const navigate = useNavigate();
  const changePage = () => {
    navigate(`/admin/exams/${props.examId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <ExamboxContainer>
        {props.status === "Ongoing" ? (
          <ExamboxTitleOngoing ongoing={true}>
            {props.title}
          </ExamboxTitleOngoing>
        ) : (
          <ExamboxTitle>{props.title}</ExamboxTitle>
        )}

        <ExamboxDetailsContainer>
          <ExamboxDetail>Exam ID: {props.examId}</ExamboxDetail>
          <ExamboxDetail>Students: {props.studentsCount}</ExamboxDetail>
          <ExamboxDetail>Time left: {props.timeLeft}</ExamboxDetail>
          <ExamboxDetail>Alerts: {props.alertsCount}</ExamboxDetail>
          <ExamboxDetail>Status: {props.status}</ExamboxDetail>

          <ExamboxButtonContainer>
            <ExamboxButton
              ongoing={props.status === "Ongoing"}
              onClick={changePage}
            >
              Manage
              <GoArrowRight />
            </ExamboxButton>
          </ExamboxButtonContainer>
        </ExamboxDetailsContainer>
        {/* <ExamboxButtonContainer>
          <ExamboxButton
            ongoing={props.status === "ongoing"}
            onClick={changePage}
          >
            Manage
            <GoArrowRight />
          </ExamboxButton>
        </ExamboxButtonContainer> */}
      </ExamboxContainer>
    </ThemeProvider>
  );
};
export default Exambox;
