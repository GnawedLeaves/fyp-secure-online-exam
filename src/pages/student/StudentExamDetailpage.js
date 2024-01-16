import React from "react";
import {
    PageTitle,
  PageSubtitle,
  PageDescription,
  PageList,
  PageOrderList,
  PageButton,
  PageEnterSpace
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { Link } from "react-router-dom";

const StudentExamDetailpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHeader/>
        <PageTitle>IE4717 Web Application & Design</PageTitle>
        <PageSubtitle>Section Description</PageSubtitle>
        <PageList>
            <PageOrderList>Section A --- 50%</PageOrderList>
            <PageOrderList>Section B --- 30%</PageOrderList>
            <PageOrderList>Section C --- 20%</PageOrderList>
        </PageList>
        <PageDescription>Time Duration: 2 hrs</PageDescription>
        <PageDescription>Rule and Regulation</PageDescription>
        <PageList>
            <PageOrderList>rule</PageOrderList>
            <PageOrderList>rule</PageOrderList>
            <PageOrderList>rule</PageOrderList>
            <PageOrderList>rule</PageOrderList>
            <PageOrderList>rule</PageOrderList>
            <PageOrderList>rule</PageOrderList>
        </PageList>
        <Link to="/student/exam/question">
            <PageButton style={{ float: 'right' }}>Start</PageButton>
        </Link>
        <PageEnterSpace/>
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentExamDetailpage;


