import React from "react";
import { NavbarContainer } from "./NavbarStyles";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

const StudentNavbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer></NavbarContainer>
    </ThemeProvider>
  );
};

export default StudentNavbar;
