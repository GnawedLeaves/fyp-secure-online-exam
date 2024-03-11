import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    QuestionBox,
    NumberboxContainer
} from "./NumberboxStyles";
import { useNavigate } from "react-router-dom";

const Numberbox = ({number,hasOption,isFlagged ,onClickFunction}) => {
  return (
    <ThemeProvider theme={theme}>
        <QuestionBox isFlagged={isFlagged} onClick={onClickFunction} hasOption={hasOption}>{number}</QuestionBox>   
    </ThemeProvider>
  );
};
export default Numberbox;
