import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    QuestionFocusBox
} from "./NumberboxStyles";
import { useNavigate } from "react-router-dom";

const NumberFocusbox = ({exam,number,isFlagged}) => {
  const navigate = useNavigate();

  const navigateToQuestion = () => {
    //  "/student/exam/:examId/:questionNo"
    navigate(`/student/exam/${exam}/${number}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <QuestionFocusBox isFlagged={isFlagged} onClick={navigateToQuestion}>{number}</QuestionFocusBox>
    </ThemeProvider>
  );
};
export default NumberFocusbox;
