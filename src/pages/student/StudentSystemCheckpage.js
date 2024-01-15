import React from "react";
import {
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import  StudentHeader from "../../components/Header/StudentHeader";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';

const StudentSystemCheckpage = () => {
  return (
      <ThemeProvider theme={theme}>
        <StudentHeader/>
        
        <Footer/>
      </ThemeProvider>
  );
};

export default StudentSystemCheckpage;


