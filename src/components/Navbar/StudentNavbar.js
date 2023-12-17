import React from "react";
import { NavbarContainer } from "./NavbarStyles";
import { ThemeProvider } from "styled-components";
import { theme as importedTheme } from "../../theme";


const StudentNavbar = () => {
const theme = importedTheme;
  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer></NavbarContainer>
    </ThemeProvider>
  );
};
export default StudentNavbar;
