import React from "react";
import {
  DomainOption,
  DomainSelect,
  ForgotPassword,
  LoginButton,
  LoginPageContainer,
  LoginPageFormContainer,
  LoginPageLogo,
  LoginPageLogoContainer,
  LoginPageTitle,
  LoginPasswordInput,
  LoginUsernameInput,
  PasswordInputContainer,
} from "./PagesStyles";
import { ThemeProvider } from "styled-components";

import { useNavigate } from "react-router-dom";
import { theme } from "../../theme";

const Loginpage = () => {
  const navigate = useNavigate();

  const changePage = () => {
    navigate("/student/dashboard");
  };
  return (
    <ThemeProvider theme={theme}>
      <LoginPageContainer>
        <LoginPageLogoContainer>
          <LoginPageLogo></LoginPageLogo>
          <LoginPageTitle>ExamPulse</LoginPageTitle>
        </LoginPageLogoContainer>
        <LoginPageFormContainer>
          <LoginUsernameInput placeholder={"Username"} />
          <PasswordInputContainer>
            <LoginPasswordInput placeholder={"Password"} />
            <ForgotPassword>Forgot Password</ForgotPassword>
          </PasswordInputContainer>
          <DomainSelect>
            <DomainOption>Student</DomainOption>
            <DomainOption>Teacher</DomainOption>
            <DomainOption>Admin</DomainOption>
          </DomainSelect>
          <LoginButton onClick={changePage}>Log In</LoginButton>
        </LoginPageFormContainer>
      </LoginPageContainer>
    </ThemeProvider>
  );
};

export default Loginpage;
