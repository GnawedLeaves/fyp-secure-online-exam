import React from "react";
import {
    PageTitle,
  PageTitleDesc,
  PageContainer,
  PageButton,
  PageEnterSpace
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { Link } from "react-router-dom";

const StudentBugReportpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHeader/>
        <PageTitle>Bug Report</PageTitle>
        <PageTitleDesc>Welcome User 1! Here you'll find all of your bug report history and submit new bug report.</PageTitleDesc>
        <PageContainer>
            <Link to="###">
            <PageButton>Request A New Query</PageButton>
            </Link><PageEnterSpace/>
            <Link to="###">
            <PageButton>Check Opened Query</PageButton>
            </Link><PageEnterSpace/>
            <Link to="###">
            <PageButton>Check Closed Query</PageButton>
            </Link><PageEnterSpace/>
        </PageContainer>
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentBugReportpage;


