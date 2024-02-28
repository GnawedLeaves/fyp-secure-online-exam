import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    QuestionBox
} from "./NumberboxStyles";
import { useNavigate } from "react-router-dom";

const Numberbox = ({exam,number,hasOption}) => {
  const navigate = useNavigate();

  const navigateToQuestion = () => {
    //  "/student/exam/:examId/:questionNo"
    navigate(`/student/exam/${exam}/${number}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <QuestionBox onClick={navigateToQuestion} hasOption={hasOption}>{number}</QuestionBox>
    </ThemeProvider>
  );
};
export default Numberbox;
