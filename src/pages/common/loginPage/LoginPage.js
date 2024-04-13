import React, { useEffect, useState } from "react";
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
} from "./LoginPagesStyles";
import { ThemeProvider } from "styled-components";

import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Modal from "../../../components/Modal/Modal";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";

const Loginpage = () => {
  const navigate = useNavigate();

  const changePage = () => {
    switch (domainSelected) {
      case "Student":
        navigate("/student/home");
        break;
      case "Teacher":
        navigate("/Instructor/InstructorPage");
        break;
      case "Admin":
        navigate("/admin/home");
        break;
    }
  };

  const [domainSelected, setDomainSelected] = useState("Student");
  const onDomainChange = (e) => {
    setDomainSelected(e.target.value);
  };

  //LOGIN METHODS
  const auth = getAuth();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState();

  const handleLogin = async () => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        getUserDomain(userCredential.user.uid);
      })
      .catch((error) => {
        setShowLogInFailureModal(true);
        console.log("error in sign in: ", error.code, error.message);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userType = loggedInUserData?.type;
        console.log("userType", userType, loggedInUserData?.name);
        if (userType === "student") {
          setLoggedInUserData(null);
          navigate("/student/home");
        } else if (userType === "teacher") {
          setLoggedInUserData(null);
          navigate("/Instructor/InstructorPage");
        } else if (userType === "admin") {
          setLoggedInUserData(null);
          navigate("/admin/home");
        }
      } else {
        //Not signed in
        //console.log("User not signed in yet");
      }
    });
  }, [loggedInUserData]);

  const getUserDomain = async (userCredential) => {
    const q = query(
      collection(db, "users"),
      where("authId", "==", userCredential)
    );
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs[0].data();
    setLoggedInUserData(userData);
  };

  //MODAL methods

  const [showLogInSucessModal, setShowLogInSucessModal] = useState(false);
  const [showLogInFailureModal, setShowLogInFailureModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <LoginPageContainer>
        <Modal
          handleModalClose={() => {
            setShowLogInFailureModal(false);
          }}
          actionButtonText="OK"
          actionButtonColor={theme.statusError}
          actionButtonClick={() => {}}
          show={showLogInFailureModal}
          modalTitle="Log In Unsuccessful"
          modalContent="Wrong Email or Password. Please try again."
        />
        <LoginPageLogoContainer>
          <LoginPageLogo></LoginPageLogo>
          <LoginPageTitle>ExamPulse</LoginPageTitle>
        </LoginPageLogoContainer>
        <LoginPageFormContainer>
          <LoginUsernameInput
            placeholder={"Email"}
            onChange={(e) => {
              setInputEmail(e.target.value);
            }}
          />
          <PasswordInputContainer>
            <LoginPasswordInput
              placeholder={"Password"}
              type="password"
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
            />
            <ForgotPassword>Forgot Password</ForgotPassword>
          </PasswordInputContainer>
          <DomainSelect onChange={onDomainChange}>
            <DomainOption>Student</DomainOption>
            <DomainOption>Instructor</DomainOption>
            <DomainOption>Admin</DomainOption>
          </DomainSelect>
          <LoginButton
            onClick={() => {
              handleLogin();
            }}
          >
            Log In
          </LoginButton>
          <LoginButton onClick={changePage}>
            Enter without logging in
          </LoginButton>
        </LoginPageFormContainer>
      </LoginPageContainer>
    </ThemeProvider>
  );
};

export default Loginpage;
