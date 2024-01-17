import React, { useState } from "react";
import {
  NavbarContainer,
  NavbarSidebar,
  NavbarTopsection,
  NavbarBar,
  NavbarAnchorLogo,
  NavbarAnchor,
  NavbarLogoTitle,
  NavbarMain,
  NavBarLink,
} from "./StudentNavbarStyles";
import { ThemeProvider } from "styled-components";
import { theme as importedTheme } from "../../theme";
import { FaTh, FaBook, FaBug, FaWhmcs, FaBars } from "react-icons/fa";

const StudentNavbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const theme = importedTheme;
  return (
    <ThemeProvider theme={theme}>
      <NavbarContainer>
        <NavbarSidebar style={{ width: isOpen ? "300px" : "50px" }}>
          <NavbarTopsection>
            <NavbarLogoTitle style={{ display: isOpen ? "block" : "none" }}>
              ExamPulse
            </NavbarLogoTitle>
            <NavbarBar style={{ marginLeft: isOpen ? "50px" : "0px" }}>
              <FaBars onClick={toggle} />
            </NavbarBar>
          </NavbarTopsection>
          <NavBarLink to="/student/dashboard">
            <NavbarAnchorLogo>
              <FaTh />
            </NavbarAnchorLogo>
            <NavbarAnchor style={{ display: isOpen ? "block" : "none" }}>
              Dashboard
            </NavbarAnchor>
          </NavBarLink>
          <NavBarLink to="/student/exam">
            <NavbarAnchorLogo>
              <FaBook />
            </NavbarAnchorLogo>
            <NavbarAnchor style={{ display: isOpen ? "block" : "none" }}>
              Exam
            </NavbarAnchor>
          </NavBarLink>
          <NavBarLink to="/student/bug_report">
            <NavbarAnchorLogo>
              <FaBug />
            </NavbarAnchorLogo>
            <NavbarAnchor style={{ display: isOpen ? "block" : "none" }}>
              Bug Report
            </NavbarAnchor>
          </NavBarLink>
          <NavBarLink to="/student/settings">
            <NavbarAnchorLogo>
              <FaWhmcs />
            </NavbarAnchorLogo>
            <NavbarAnchor style={{ display: isOpen ? "block" : "none" }}>
              Settings
            </NavbarAnchor>
          </NavBarLink>
        </NavbarSidebar>
        <NavbarMain>{children}</NavbarMain>
      </NavbarContainer>
    </ThemeProvider>
  );
};
export default StudentNavbar;
