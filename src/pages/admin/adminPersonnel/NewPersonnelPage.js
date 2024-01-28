import { ThemeProvider } from "styled-components";
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

const NewPersonnelPage = () => {
  const navigate = useNavigate();

  const [newUserName, setNewUserName] = useState("");
  const [newUserType, setNewUserType] = useState("student");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserYear, setNewUserYear] = useState("");
  const [newUserCourse, setNewUserCourse] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserModules, setNewUserModules] = useState([]);

  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];
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
                  onChange={(e) => {
                    setNewUserPassword(e.target.value);
                  }}
                />
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
