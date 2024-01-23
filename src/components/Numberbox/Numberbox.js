import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
    QuestionBox
} from "./NumberboxStyles";

const Numberbox = ({number}) => {

  return (
    <ThemeProvider theme={theme}>
      <QuestionBox>{number}</QuestionBox>
    </ThemeProvider>
  );
};
export default Numberbox;
