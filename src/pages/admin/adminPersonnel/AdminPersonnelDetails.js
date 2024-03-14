import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import { AdminPersonnelDetailsContainer, AdminPersonnelDetailsHeader } from "./AdminPersonnelStyles";
import { adminNavbarItems } from "../AdminHomePage";
import Navbar from "../../../components/Navbar/Navbar";
import BackButton from "../../../components/BackButton/BackButton";
import Button from "../../../components/Button/Button";
import {
  AdminNewButtonsContainer,
  AdminNewField,
  AdminNewFieldContainer,
  AdminNewFieldTitle,
  AdminNewPersonnelAlignContainer,
  AdminNewPersonnelContainer,
  AdminNewPersonnelTitle,
  AdminPersonnelBigContainer,
  AdminPersonnelContainer,
  ToggleButtonContainer,
} from "./AdminPersonnelStyles";
import Dropdown from "../../../components/Dropdown/Dropdown";
import BubbleSelect from "../../../components/BubbleSelect/BubbleSelect";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";
import { useEffect } from "react";



const AdminPersonnelDetailsPage = () => {
  const { userId } = useParams();
  // const userId = "vbPKgsYVIoRcNc7KOktN"
  const navigate = useNavigate();

  const [newUserName, setNewUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("student");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserYear, setNewUserYear] = useState("");
  const [newUserCourse, setNewUserCourse] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState("");
  const [newUserModules, setNewUserModules] = useState([]);
  const [showSignUpSuccessModal, setShowSignUpSuccessModal] = useState(false);
  const [showSignUpFailureModal, setShowSignUpFailureModal] = useState(false);
  const [signUpFailureModalContent, setSignUpFailureModalContent] = useState("");
  const [signUpFailureModalTitle, setSignUpFailureModalTitle] = useState("");
  const [allModulesData, setAllModulesData] = useState([])
  const [allModulesName, setAllModuleNames] = useState([]);
  const [currentUserData, setCurrentUserData] = useState()
  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];



  const updateUser = () => {

  }
  const getUserData = async () => {
    const userRef = collection(db, "users");
    try {

      const querySnapshot = await getDocs(query(userRef, where("id", "==", userId)))
      if (!querySnapshot.empty) {
        console.log("snapshot not empty")
        const doc = querySnapshot.docs[0];
        const userData = doc?.data();
        setCurrentUserData(userData)
      }
      else {
        console.log("snapshot empty")

      }
    }
    catch (e) {
      console.log("Error getting user data", e)
    }

  }



  const handleModulesSelected = (modulesSelected) => {
    setNewUserModules(modulesSelected);

  }

  const getModuleData = async () => {
    const modulesRef = collection(db, "modules");

    try {
      const querySnapshot = await getDocs(modulesRef);
      const modulesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedItems = [...modulesData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setAllModulesData(sortedItems);
    } catch (e) {
      console.log("Error getting module data: ", e);
    }
  };

  useEffect(() => {
    getUserData();
    // getUserData2(userId)
    getModuleData();

  }, [])

  useEffect(() => {
    console.log("currentUserData", currentUserData)
    setCurrentUserType(currentUserData?.type || "student")
  }, [currentUserData])


  useEffect(() => {
    const namesArray = allModulesData.map((obj) => obj.name);
    setAllModuleNames(namesArray);
  }, [allModulesData]);
  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminPersonnelDetailsContainer>
          <BackButton size="2rem" />
          <AdminNewPersonnelAlignContainer>
            <AdminPersonnelDetailsHeader>
              Edit User: {userId}
            </AdminPersonnelDetailsHeader>
            {currentUserType === "student" && (
              <>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                  <AdminNewField
                    value={currentUserData?.name}
                    onChange={(e) => {
                      setNewUserName(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                  <AdminNewField
                    value={currentUserData?.email}
                    onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Course</AdminNewFieldTitle>
                  <AdminNewField
                    value={currentUserData?.course}

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
                  <BubbleSelect
                    preSelectedOptions={currentUserData?.modules}
                    allOptions={allModulesName}
                    handleOptionsSelected={handleModulesSelected}
                  />
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
                  <AdminNewField type="password" onChange={(e) => {
                    setNewUserPasswordConfirm(e)
                  }} />
                </AdminNewFieldContainer>
              </>
            )}

            {currentUserType === "teacher" && (
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
                  <BubbleSelect
                    allOptions={allModulesName}
                    handleOptionsSelected={handleModulesSelected}
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

            {currentUserType === "admin" && (
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
                  updateUser();
                }}
              >
                Update User
              </Button>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </AdminNewButtonsContainer>
          </AdminNewPersonnelAlignContainer>


        </AdminPersonnelDetailsContainer>

      </AdminPersonnelBigContainer>

    </ThemeProvider>
  )
}


export default AdminPersonnelDetailsPage


