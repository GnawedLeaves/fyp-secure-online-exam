import { useState } from "react";
import {
  TempNavbarBox,
  TempNavbarBoxes,
  TempNavbarContainer,
  TempNavbarContent,
  TempNavbarHandle,
  TempNavbarHeader,
  TempNavbarHome,
} from "./TempNavbarStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { adminRoutes, studentRoutes, teacherRoutes } from "../../../App";

const TempNavbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [studentOpen, setStudentOpen] = useState(false);
  const [teacherOpen, setTeacherOpen] = useState(false);

  const navigate = useNavigate();

  const navigateOut = (link) => {
    navigate(link);
  };
  return (
    <ThemeProvider theme={theme}>
      <TempNavbarHandle
        open={navbarOpen}
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      />
      <TempNavbarContainer open={navbarOpen}>
        <TempNavbarContent>
          <TempNavbarHome
            onClick={() => {
              navigateOut("/");
            }}
          >
            localhost:3000
          </TempNavbarHome>
          <TempNavbarHeader
            onClick={() => {
              setAdminOpen(!adminOpen);
            }}
          >
            Admin <MdOutlineKeyboardArrowDown />
          </TempNavbarHeader>
          <TempNavbarBoxes open={adminOpen}>
            {adminRoutes.map((navbox, index) => {
              return (
                <TempNavbarBox
                  key={index}
                  onClick={() => {
                    // setNavbarOpen(false);
                    navigateOut(navbox.link);
                  }}
                >
                  {navbox.title}
                </TempNavbarBox>
              );
            })}
          </TempNavbarBoxes>
          <TempNavbarHeader
            onClick={() => {
              setStudentOpen(!studentOpen);
            }}
          >
            Student <MdOutlineKeyboardArrowDown />
          </TempNavbarHeader>
          <TempNavbarBoxes open={studentOpen}>
            {studentRoutes.map((navbox, index) => {
              return (
                <TempNavbarBox
                  key={index}
                  onClick={() => {
                    // setNavbarOpen(false);
                    navigateOut(navbox.link);
                  }}
                >
                  {navbox.title}
                </TempNavbarBox>
              );
            })}
          </TempNavbarBoxes>
          <TempNavbarHeader
            onClick={() => {
              setTeacherOpen(!teacherOpen);
            }}
          >
            Teacher <MdOutlineKeyboardArrowDown />
          </TempNavbarHeader>
          <TempNavbarBoxes open={teacherOpen}>
            {teacherRoutes.map((navbox, index) => {
              return (
                <TempNavbarBox
                  key={index}
                  onClick={() => {
                    // setNavbarOpen(false);
                    navigateOut(navbox.link);
                  }}
                >
                  {navbox.title}
                </TempNavbarBox>
              );
            })}
          </TempNavbarBoxes>
        </TempNavbarContent>
      </TempNavbarContainer>
    </ThemeProvider>
  );
};

export default TempNavbar;
