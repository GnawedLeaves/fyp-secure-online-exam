import { useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import {
  AdminPersonnelDetailsContainer,
  AdminPersonnelDetailsHeader,
} from "./AdminPersonnelStyles";
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
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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

  const [newUserStudentType, setNewUserStudentType] = useState("");
  const [newUserEnrollmentYear, setNewUserEnrollmentYear] = useState("");
  const [newUserEnrollmentStatus, setNewUserEnrollmentStatus] = useState("");
  const [newUserCgpa, setNewUserCgpa] = useState("");

  const [newUserModules, setNewUserModules] = useState([]);
  const [updatedUserModules, setUpdatedUserModules] = useState([]);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showEditFailureModal, setShowEditFailureModal] = useState(false);
  const [editFailureReason, setEditFailureReason] = useState("");
  const [signUpFailureModalContent, setSignUpFailureModalContent] =
    useState("");
  const [signUpFailureModalTitle, setSignUpFailureModalTitle] = useState("");
  const [allModulesData, setAllModulesData] = useState([]);
  const [allModulesName, setAllModuleNames] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];
  const dropdownOptionsStudentType = [
    "Undergraduate",
    "Postgraduate",
    "Exchange Student",
  ];
  const dropdownOptionsEnrollmentStatus = ["Full Time", "Part Time"];

  const userRef = doc(db, "users", userId);

  const updateUser = async () => {
    const currentDate = new Date();
    const timestamp = Timestamp.fromDate(currentDate);
    if (currentUserType === "student") {
      if (
        newUserName !== currentUserData.name ||
        newUserCourse !== currentUserData.course ||
        newUserYear !== currentUserData.year ||
        updatedUserModules !== currentUserData.modules ||
        newUserStudentType !== currentUserData.studentType ||
        newUserEnrollmentYear !== currentUserData.enrollmentYear ||
        newUserEnrollmentStatus !== currentUserData.enrollmentStatus ||
        newUserCgpa !== currentUserData.cgpa
      ) {
        try {
          await addUserToExamArray();
          await updateDoc(userRef, {
            name: newUserName,
            year: newUserYear,
            programme: newUserCourse,
            modules: updatedUserModules,
            dateEdited: timestamp,
            studentType: newUserStudentType,
            enrollmentYear: newUserEnrollmentYear,
            enrollmentStatus: newUserEnrollmentStatus,
            cgpa: newUserCgpa,
          });
          setShowEditSuccessModal(true);
        } catch (e) {
          console.log("cant update user", e);
          setEditFailureReason(e);
          setShowEditFailureModal(true);
        }
      } else {
        setEditFailureReason("No changes made to user.");
        setShowEditFailureModal(true);
      }
    } else if (currentUserType === "teacher") {
      if (
        newUserName !== currentUserData.name ||
        updatedUserModules !== currentUserData.modules
      ) {
        try {
          await updateDoc(userRef, {
            name: newUserName,
            modules: newUserModules,
            dateEdited: timestamp,
          });
          setShowEditSuccessModal(true);
        } catch (e) {
          setEditFailureReason("No changes made to user.");
          setShowEditFailureModal(true);
        }
      } else {
        setEditFailureReason("No changes made to user.");
        setShowEditFailureModal(true);
      }
    } else if (currentUserType === "admin") {
      try {
        await updateDoc(userRef, {
          name: newUserName,
          dateEdited: timestamp,
        });
        setShowEditSuccessModal(true);
      } catch (e) {
        setEditFailureReason("No changes made to user.");
        setShowEditFailureModal(true);
      }
    }
  };
  const getUserData = async () => {
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setCurrentUserData(userData);
      } else {
        setCurrentUserData(null);

        console.log("user does not exist");
      }
    } catch (e) {
      console.log("Error getting user data", e);
    }
  };

  const handleModulesSelected = (modulesSelected) => {
    setUpdatedUserModules(modulesSelected);
  };

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
      console.log("sortedItems", sortedItems);
    } catch (e) {
      console.log("Error getting module data: ", e);
    }
  };

  useEffect(() => {
    getUserData();
    getModuleData();
  }, [userId]);

  useEffect(() => {
    setCurrentUserType(currentUserData?.type || "student");
    setNewUserName(currentUserData?.name || "");
    setNewUserCourse(currentUserData?.programme || "");
    setNewUserModules(currentUserData?.modules || []);
    setNewUserYear(currentUserData?.year || "");
    setNewUserStudentType(currentUserData?.studentType || "");
    setNewUserEnrollmentYear(currentUserData?.enrollmentYear || "");
    setNewUserEnrollmentStatus(currentUserData?.enrollmentStatus || "");
    setNewUserCgpa(currentUserData?.cgpa || "");
  }, [currentUserData]);

  useEffect(() => {
    const namesArray = allModulesData.map((obj) => obj.name);
    setAllModuleNames(namesArray);
  }, [allModulesData]);

  const addUserToExamArray = async () => {
    const querySnapshot = await getDocs(collection(db, "exams"));
    const allExamsData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    allExamsData.forEach(async (exam) => {
      //Check if the student exists, if student exists, check if updated modules dont have this exam, remove the student
      if (!dateInPast(exam.startTime)) {
        if (exam.students?.length > 0) {
          const studentExists = exam.students.some(
            (student) => student.id === userId
          );

          if (studentExists) {
            if (!updatedUserModules.includes(exam.courseId)) {
              let updatedStudentsArray = exam.students.filter(
                (student) => student.id !== userId
              );
              const examRef = doc(db, "exams", exam.id);
              try {
                await updateDoc(examRef, { students: updatedStudentsArray });
              } catch (e) {
                console.log("Error removing student from exam: ", e);
              }
            }
          } else {
            //if student does not exist, and if the updated modules contain the exam, add the studen into the array

            if (updatedUserModules.includes(exam.courseId)) {
              let updatedStudentsArray = [
                ...exam.students,
                {
                  id: userId,
                  status: "Not submitted yet",
                },
              ];
              const examRef = doc(db, "exams", exam.id);
              try {
                await updateDoc(examRef, { students: updatedStudentsArray });
              } catch (e) {
                console.log("Error adding student to exam", e);
              }
            }
          }
        }
      } else {
        console.log("Exam in past not added");
      }
    });
    console.log("allExamsData", allExamsData);
  };
  const dateInPast = (date) => {
    const startTimeMilliseconds =
      date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000);
    const startTimeDate = new Date(startTimeMilliseconds);
    const currentDate = new Date();
    if (startTimeDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSuccessModalClose = () => {};
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
            actionButtonClick={() => {}}
            show={showEditSuccessModal}
            modalTitle="Edit User Successful"
            modalContent="User details have been updated. You may return to the personnel page."
          />
          <Modal
            handleModalClose={() => {
              setShowEditFailureModal(false);
              setEditFailureReason("");
            }}
            actionButtonText="OK"
            actionButtonColor={theme.statusError}
            filled={true}
            actionButtonClick={() => {}}
            show={showEditFailureModal}
            modalTitle="Edit User Not Successful"
            modalContent={editFailureReason}
          />
          <AdminNewPersonnelAlignContainer>
            {currentUserData !== null ? (
              <>
                <AdminPersonnelDetailsHeader>
                  Edit
                  {currentUserType.charAt(0).toUpperCase() +
                    currentUserType.slice(1)}
                  : <br />
                  {userId}
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
                      {newUserYear ? (
                        <Dropdown
                          defaultValue={newUserYear}
                          onChange={(e) => {
                            setNewUserYear(e);
                          }}
                          options={dropdownOptions}
                        />
                      ) : (
                        <></>
                      )}
                    </AdminNewFieldContainer>

                    <AdminNewFieldContainer>
                      <AdminNewFieldTitle>Student Type</AdminNewFieldTitle>
                      {newUserStudentType ? (
                        <Dropdown
                          defaultValue={newUserStudentType}
                          onChange={(e) => {
                            setNewUserStudentType(e);
                          }}
                          options={dropdownOptionsStudentType}
                        />
                      ) : (
                        <></>
                      )}
                    </AdminNewFieldContainer>

                    <AdminNewFieldContainer>
                      <AdminNewFieldTitle>Enrollment Year</AdminNewFieldTitle>
                      <AdminNewField
                        value={newUserEnrollmentYear}
                        onChange={(e) => {
                          setNewUserEnrollmentYear(e.target.value);
                        }}
                      />
                    </AdminNewFieldContainer>

                    <AdminNewFieldContainer>
                      <AdminNewFieldTitle>Enrollment Status</AdminNewFieldTitle>
                      {newUserEnrollmentStatus ? (
                        <Dropdown
                          defaultValue={newUserEnrollmentStatus}
                          onChange={(e) => {
                            setNewUserEnrollmentStatus(e);
                          }}
                          options={dropdownOptionsEnrollmentStatus}
                        />
                      ) : (
                        <></>
                      )}
                    </AdminNewFieldContainer>

                    <AdminNewFieldContainer>
                      <AdminNewFieldTitle>CGPA</AdminNewFieldTitle>
                      <AdminNewField
                        value={newUserCgpa}
                        onChange={(e) => {
                          setNewUserCgpa(e.target.value);
                        }}
                      />
                    </AdminNewFieldContainer>

                    <AdminNewFieldContainer>
                      <AdminNewFieldTitle>Modules</AdminNewFieldTitle>
                      {newUserModules ? (
                        <BubbleSelect
                          preSelectedOptions={newUserModules}
                          allOptions={allModulesName}
                          handleOptionsSelected={handleModulesSelected}
                        />
                      ) : (
                        <></>
                      )}
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
                      {newUserModules ? (
                        <BubbleSelect
                          preSelectedOptions={newUserModules}
                          allOptions={allModulesName}
                          handleOptionsSelected={handleModulesSelected}
                        />
                      ) : (
                        <></>
                      )}
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
                {currentUserData?.dateEdited
                  ? "Last Edited: " +
                    handleFirebaseDate(currentUserData?.dateEdited)
                  : ""}{" "}
                <br />
                {currentUserData?.dateCreated
                  ? "Date Created: " +
                    handleFirebaseDate(currentUserData?.dateCreated)
                  : ""}{" "}
              </>
            ) : (
              <>User Not Found</>
            )}
          </AdminNewPersonnelAlignContainer>
        </AdminPersonnelDetailsContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default AdminPersonnelDetailsPage;
