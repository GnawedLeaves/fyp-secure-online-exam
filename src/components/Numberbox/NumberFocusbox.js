import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    QuestionFocusBox
} from "./NumberboxStyles";
import { useNavigate } from "react-router-dom";

const NumberFocusbox = ({number,isFlagged,onClickFunction}) => {

  return (
    <ThemeProvider theme={theme}>
      <QuestionFocusBox isFlagged={isFlagged} onClick={onClickFunction}>{number}</QuestionFocusBox>
    </ThemeProvider>
  );
};
export default NumberFocusbox;
