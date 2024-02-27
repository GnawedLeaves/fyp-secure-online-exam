import { ThemeProvider } from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { theme } from "../../../theme";
import {
  AdminNewButtonsContainer,
  AdminNewField,
  AdminNewFieldContainer,
  AdminNewFieldTitle,
  AdminNewPersonnelContainer,
  AdminNewPersonnelTitle,
  AdminPersonnelBigContainer,
  AdminPersonnelContainer,
  ToggleButtonContainer,
} from "./AdminPersonnelStyles";
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import BackButton from "../../../components/BackButton/BackButton";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { db } from "../../../backend/firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Modal from "../../../components/Modal/Modal";

const NewPersonnelPage = () => {
  const navigate = useNavigate();

  const [newUserName, setNewUserName] = useState("");
  const [newUserType, setNewUserType] = useState("student");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserYear, setNewUserYear] = useState("");
  const [newUserCourse, setNewUserCourse] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserModules, setNewUserModules] = useState([]);
  const [showSignUpSuccessModal, setShowSignUpSuccessModal] = useState(false);

  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];

  const resetInputFields = () => {
    setNewUserName("");
    setNewUserType("student");
    setNewUserEmail("");
    setNewUserYear("");
    setNewUserCourse("");
    setNewUserPassword("");
    setNewUserModules([]);
  };

  //SIGN UP METHODS
  const auth = getAuth();
  const addUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      const user = userCredential.user;
      const id = user.uid;

      // Add user to user table
      const usersRef = collection(db, "users");
      const currentDate = new Date();
      const timestamp = Timestamp.fromDate(currentDate);

      const userDocRef = await addDoc(
        usersRef,
        newUserType === "student"
          ? {
              authId: id,
              name: newUserName,
              year: newUserYear,
              course: newUserCourse,
              modules: newUserModules,
              type: newUserType,
              dateAdded: timestamp,
              // Add user data here
            }
          : newUserType === "teacher"
          ? {
              authId: id,
              name: newUserName,
              modules: newUserModules,
              type: newUserType,
              dateAdded: timestamp,
            }
          : {
              authId: id,
              userName: newUserName,
              type: newUserType,
              dateAdded: timestamp,
            }
      );
      setShowSignUpSuccessModal(true);
      resetInputFields();

      // Other actions if needed
    } catch (error) {
      console.log("Error for user sign up", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminNewPersonnelContainer>
          <BackButton size="2rem" />
          <AdminNewPersonnelTitle>Add New User</AdminNewPersonnelTitle>
          <ToggleButtonContainer>
            <Button
              filled={newUserType === "student"}
              onClick={() => {
                setNewUserType("student");
              }}
            >
              Student
            </Button>
            <Button
              filled={newUserType === "teacher"}
              onClick={() => {
                setNewUserType("teacher");
              }}
            >
              Teacher
            </Button>
            <Button
              filled={newUserType === "admin"}
              onClick={() => {
                setNewUserType("admin");
              }}
            >
              Admin
            </Button>
          </ToggleButtonContainer>
          <Modal
            handleModalClose={() => {
              setShowSignUpSuccessModal(false);
            }}
            actionButtonText="OK"
            actionButtonColor={theme.primary}
            filled={true}
            actionButtonClick={() => {}}
            show={showSignUpSuccessModal}
            modalTitle="Success!"
            modalContent="Add user successful."
          />

          {newUserType === "student" && (
            <>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserName(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserEmail(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Course</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserCourse(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Year</AdminNewFieldTitle>
                <Dropdown
                  onChange={(e) => {
                    setNewUserYear(e);
                  }}
                  options={dropdownOptions}
                />
              </AdminNewFieldContainer>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Modules</AdminNewFieldTitle>
                <AdminNewField onChange={(e) => {}} />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Password</AdminNewFieldTitle>
                <AdminNewField
                  type="password"
                  onChange={(e) => {
                    setNewUserPassword(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Confirm Password</AdminNewFieldTitle>
                <AdminNewField type="password" onChange={(e) => {}} />
              </AdminNewFieldContainer>
            </>
          )}

          {newUserType === "teacher" && (
            <>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserName(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserEmail(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Modules</AdminNewFieldTitle>
                <AdminNewField onChange={(e) => {}} />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Password</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserPassword(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
            </>
          )}

          {newUserType === "admin" && (
            <>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserEmail(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserName(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>

              <AdminNewFieldContainer>
                <AdminNewFieldTitle>Password</AdminNewFieldTitle>
                <AdminNewField
                  onChange={(e) => {
                    setNewUserPassword(e.target.value);
                  }}
                />
              </AdminNewFieldContainer>
            </>
          )}

          <AdminNewButtonsContainer>
            <Button
              filled={true}
              filledColor={theme.primary}
              defaultColor={theme.primary}
              onClick={() => {
                addUser();
              }}
            >
              Add User
            </Button>
            <Button
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Button>
          </AdminNewButtonsContainer>
        </AdminNewPersonnelContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default NewPersonnelPage;
