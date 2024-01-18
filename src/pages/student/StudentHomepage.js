import React from "react";
import {
  PageTitle,
  PageTitleDesc,
  PageSubtitle,
  PageDesc,
  PageButton,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import StudentHeader from "../../components/Header/StudentHeader";
import Footer from "../../components/Footer/Footer";
import { theme } from "../../theme";
import { Link } from "react-router-dom";
import { adminNavbarItems } from "../admin/AdminHomePage";
import Navbar from "../../components/Navbar/Navbar";
import { RiHome4Line } from "react-icons/ri";

export const studentNavbarItems = [
  {
    title: "Home",
    path: "/admin/home",
    logo: <RiHome4Line />,
  },
];

const StudentHomepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <Navbar linksArray={studentNavbarItems} />
        <div style={{ width: "100%" }}>
          <StudentHeader />
          <PageTitle>Dashboard</PageTitle>
          <PageTitleDesc>Welcome User 1!</PageTitleDesc>
          <PageSubtitle>Face Registration</PageSubtitle>
          <PageDesc>
            Please register your face before you attend any exam. If you did not
            do so, you are forbidden to sit for the exam.
          </PageDesc>
          <Link to="/student/systemcheck">
            <PageButton>Register my face</PageButton>
          </Link>
          <PageSubtitle>System Check</PageSubtitle>
          <PageDesc>
            You are encouraged to have a system check before you are going to
            sit for any exam. This will ensure your exam are conducted smoothly.
          </PageDesc>
          <PageButton>Check my system</PageButton>
          <PageSubtitle>Exam Demo</PageSubtitle>
          <PageDesc>
            You are encouraged to have a exam demo before you are going to sit
            for any exam. This will ensure your exam are conducted smoothly.
          </PageDesc>
          <Link to="/student/exam/exam_detail">
            <PageButton>Start a demo</PageButton>
          </Link>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default StudentHomepage;
