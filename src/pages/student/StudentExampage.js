import React from "react";
import {
    PageTitle,
  PageTitleDesc,
  PageSubtitle,
  PageDescription
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';

const StudentExampage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHeader/>
        <PageTitle>Exam</PageTitle>
        <PageTitleDesc>Welcome User 1! Here you'll find all of your exams, click on any open exam to start.</PageTitleDesc>
        <PageSubtitle>Open</PageSubtitle>
        <PageDescription>There is no exam available for now.</PageDescription>
        <PageSubtitle>Upcoming</PageSubtitle>
        <PageDescription>There is no exam available for now.</PageDescription>
        <PageSubtitle>Past</PageSubtitle>
        <PageDescription>There is no exam available for now.</PageDescription>
        
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentExampage;


