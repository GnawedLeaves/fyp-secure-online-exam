import React from "react";
import {
  PageTitle,
  PageTitleDesc,
  PageSubtitle,
  PageDesc,
  PageButton
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentNavbar from "../../components/Navbar/StudentNavbar";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { Link } from "react-router-dom";

const StudentHomepage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentNavbar/>
        <StudentHeader/>
        <PageTitle>Dashboard</PageTitle>
        <PageTitleDesc>Welcome User 1!</PageTitleDesc>
        <PageSubtitle>Face Registration</PageSubtitle>
        <PageDesc>Please register your face before you attend any exam. If you did not do so, you are forbidden to sit for the exam.</PageDesc>
        <Link to="/student/systemcheck">
          <PageButton>Register my face</PageButton>
        </Link>
        <PageSubtitle>System Check</PageSubtitle>
        <PageDesc>You are encouraged to have a system check before you are going to sit for any exam. This will ensure your exam are conducted smoothly.</PageDesc>
        <PageButton>Check my system</PageButton>
        <PageSubtitle>Exam Demo</PageSubtitle>
        <PageDesc>You are encouraged to have a exam demo before you are going to sit for any exam. This will ensure your exam are conducted smoothly.</PageDesc>
        <PageButton>Start a demo</PageButton>
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentHomepage;


