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
import { Timestamp, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../backend/firebase/firebase";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { handleFirebaseDate } from "../../../backend/firebase/handleFirebaseDate";
import Modal from "../../../components/Modal/Modal";


const AdminPersonnelDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [newUserName, setNewUserName] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserYear, setNewUserYear] = useState("");
  const [newUserCourse, setNewUserCourse] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState("");
  const [newUserModules, setNewUserModules] = useState([]);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showEditFailureModal, setShowEditFailureModal] = useState(false);
  const [editFailureReason, setEditFailureReason] = useState("")
  const [signUpFailureModalContent, setSignUpFailureModalContent] = useState("");
  const [signUpFailureModalTitle, setSignUpFailureModalTitle] = useState("");
  const [allModulesData, setAllModulesData] = useState([])
  const [allModulesName, setAllModuleNames] = useState([]);
  const [currentUserData, setCurrentUserData] = useState()
  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];
  const userRef = doc(db, "users", userId);



  const updateUser = async () => {
    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);
    if (currentUserType === 'student') {
      if (newUserName !== currentUserData.name || newUserCourse !== currentUserData.course || newUserYear !== currentUserData.year || newUserModules !== currentUserData.modules) {
        try {


          await updateDoc(userRef, {
            name: newUserName,
            year: newUserYear,
            course: newUserCourse,
            modules: newUserModules,
            dateEdited: timestamp,
          });
          setShowEditSuccessModal(true)
        }
        catch (e) {
          console.log("cant update user", e)
          setEditFailureReason(e)
          setShowEditFailureModal(true)
        }

      }
      else {
        setEditFailureReason("No changes made to user.")
        setShowEditFailureModal(true)
      }
    }
    else if (currentUserType === 'teacher') {
      if (newUserName !== currentUserData.name || newUserModules !== currentUserData.modules) {
        try {
          await updateDoc(userRef, {
            name: newUserName,
            modules: newUserModules,
            dateEdited: timestamp,
          });
          setShowEditSuccessModal(true)
        }
        catch (e) {
          setEditFailureReason("No changes made to user.")
          setShowEditFailureModal(true)
        }
      }
      else {
        setEditFailureReason("No changes made to user.")
        setShowEditFailureModal(true)
      }
    }
    else if (currentUserType === 'admin') {
      try {
        await updateDoc(userRef, {
          name: newUserName,
          dateEdited: timestamp,
        });
        setShowEditSuccessModal(true)
      }
      catch (e) {
        setEditFailureReason("No changes made to user.")
        setShowEditFailureModal(true)
      }
    }
  }
  const getUserData = async () => {
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentUserData(userData)
      }
      else {
        console.log("user does not exist")
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
    getModuleData();
  }, [userId])

  useEffect(() => {
    setCurrentUserType(currentUserData?.type || "student")
    setNewUserName(currentUserData?.name || "")
    setNewUserCourse(currentUserData?.course || "")
    setNewUserModules(currentUserData?.modules || [])
    setNewUserYear(currentUserData?.year || "")
  }, [currentUserData])

  useEffect(() => {
    console.log("newUserModules", newUserModules)
  }, [newUserModules])


  useEffect(() => {
    const namesArray = allModulesData.map((obj) => obj.name);
    setAllModuleNames(namesArray);
  }, [allModulesData]);

  const handleEditSuccessModalClose = () => {

  }
  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminPersonnelDetailsContainer>
          <BackButton size="2rem" />
          <Modal
            handleModalClose={() => {
              setShowEditSuccessModal(false);
              // navigate("/admin/personnel")
            }}
            actionButtonText="OK"
            actionButtonColor={theme.primary}
            filled={true}
            actionButtonClick={() => { }}
            show={showEditSuccessModal}
            modalTitle="Edit User Successful"
            modalContent="User details have been updated. You may return to the personnel page."
          />
          <Modal
            handleModalClose={() => {
              setShowEditFailureModal(false);
              setEditFailureReason("")
            }}
            actionButtonText="OK"
            actionButtonColor={theme.statusError}
            filled={true}
            actionButtonClick={() => { }}
            show={showEditFailureModal}
            modalTitle="Edit User Not Successful"
            modalContent={editFailureReason}
          />
          <AdminNewPersonnelAlignContainer>
            <AdminPersonnelDetailsHeader>
              Edit {currentUserType.charAt(0).toUpperCase() + currentUserType.slice(1)
              }: <br />{userId}
            </AdminPersonnelDetailsHeader>
            {currentUserType === "student" && (
              <>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                  <AdminNewField
                    value={newUserName}
                    onChange={(e) => {
                      setNewUserName(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>
                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                  <AdminNewField
                    value={currentUserData?.email}
                    onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer> */}
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Course</AdminNewFieldTitle>
                  <AdminNewField
                    value={newUserCourse}
                    onChange={(e) => {
                      setNewUserCourse(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Year</AdminNewFieldTitle>
                  {newUserYear ? <Dropdown
                    defaultValue={newUserYear}
                    onChange={(e) => {
                      setNewUserYear(e);
                    }}
                    options={dropdownOptions}
                  /> : <></>}

                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Modules</AdminNewFieldTitle>
                  {newUserModules ? <BubbleSelect
                    preSelectedOptions={newUserModules}
                    allOptions={allModulesName}
                    handleOptionsSelected={handleModulesSelected}
                  /> : <></>}

                </AdminNewFieldContainer>

                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle> New Password</AdminNewFieldTitle>
                  <AdminNewField
                    type="password"
                    onChange={(e) => {
                      setNewUserPassword(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Confirm New Password</AdminNewFieldTitle>
                  <AdminNewField type="password" onChange={(e) => {
                    setNewUserPasswordConfirm(e)
                  }} />
                </AdminNewFieldContainer> */}
              </>
            )}

            {currentUserType === "teacher" && (
              <>
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                  <AdminNewField
                    value={newUserName}
                    onChange={(e) => {
                      setNewUserName(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>

                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer> */}

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Modules</AdminNewFieldTitle>
                  {newUserModules ? <BubbleSelect
                    preSelectedOptions={newUserModules}
                    allOptions={allModulesName}
                    handleOptionsSelected={handleModulesSelected}
                  /> : <></>}

                </AdminNewFieldContainer>

                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Password</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserPassword(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer> */}
              </>
            )}

            {currentUserType === "admin" && (
              <>
                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer> */}
                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Name</AdminNewFieldTitle>
                  <AdminNewField
                    value={newUserName}
                    onChange={(e) => {
                      setNewUserName(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>

                {/* <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Password</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserPassword(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer> */}
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
                Update
              </Button>
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </AdminNewButtonsContainer>
            {currentUserData?.dateEdited ? "Last Edited: " + handleFirebaseDate(currentUserData?.dateEdited) : ""} <br />
            {currentUserData?.dateCreated ? "Date Created: " + handleFirebaseDate(currentUserData?.dateCreated) : ""}
          </AdminNewPersonnelAlignContainer>
        </AdminPersonnelDetailsContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  )
}


export default AdminPersonnelDetailsPage


