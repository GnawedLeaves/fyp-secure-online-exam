import { ThemeProvider } from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { theme } from "../../../theme";
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
import Navbar from "../../../components/Navbar/Navbar";
import { adminNavbarItems } from "../AdminHomePage";
import BackButton from "../../../components/BackButton/BackButton";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { db } from "../../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Modal from "../../../components/Modal/Modal";
import BubbleSelect from "../../../components/BubbleSelect/BubbleSelect";

const NewPersonnelPage = () => {
  const navigate = useNavigate();

  const [newUserName, setNewUserName] = useState("");
  const [newUserType, setNewUserType] = useState("student");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserYear, setNewUserYear] = useState("");
  const [newUserProgramme, setNewUserProgramme] = useState("");

  const [newUserStudentType, setNewUserStudentType] = useState("");
  const [newUserEnrollmentYear, setNewUserEnrollmentYear] = useState("");
  const [newUserEnrollmentStatus, setNewUserEnrollmentStatus] = useState("");
  const [newUserCgpa, setNewUserCgpa] = useState("");

  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPasswordConfirm, setNewUserPasswordConfirm] = useState("");
  const [newUserModules, setNewUserModules] = useState([]);
  const [showSignUpSuccessModal, setShowSignUpSuccessModal] = useState(false);
  const [showSignUpFailureModal, setShowSignUpFailureModal] = useState(false);
  const [signUpFailureModalContent, setSignUpFailureModalContent] = useState(
    "Check inputs and try again"
  );
  const [signUpFailureModalTitle, setSignUpFailureModalTitle] = useState("");

  const dropdownOptions = ["1", "2", "3", "4", "5", "6"];
  const dropdownOptionsStudentType = [
    "Undergraduate",
    "Postgraduate",
    "Exchange Student",
  ];
  const dropdownOptionsEnrollmentStatus = ["Full Time", "Part Time"];

  const resetInputFields = () => {
    setNewUserName("");
    setNewUserType("student");
    setNewUserEmail("");
    setNewUserYear("");
    setNewUserProgramme("");
    setNewUserPassword("");
    setNewUserModules([]);
    setNewUserStudentType("");
    setNewUserEnrollmentYear("");
    setNewUserEnrollmentStatus("");
    setNewUserCgpa("");
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
              dateCreated: timestamp,
              // Add user data here
            }
          : newUserType === "teacher"
          ? {
              authId: id,
              name: newUserName,
              modules: newUserModules,
              type: newUserType,
              dateCreated: timestamp,
            }
          : {
              authId: id,
              name: newUserName,
              type: newUserType,
              dateCreated: timestamp,
            }
      );

      const newUserFirebaseId = userDocRef.id;

      if (newUserType === "student") {
        addStudentsToExam(newUserModules, newUserFirebaseId);
      }

      setShowSignUpSuccessModal(true);
      resetInputFields();

      // Other actions if needed
    } catch (error) {
      console.log("Error for user sign up", error);
    }
  };

  const addStudentsToExam = async (newUserModules, newUserId) => {
    const examsRef = collection(db, "exams");
    // 1. Look through the array of exams and find the examId which matches the usermodules
    newUserModules.forEach(async (module) => {
      try {
        const querySnapshot = await getDocs(
          query(examsRef, where("courseId", "==", module))
        );
        const doc = querySnapshot.docs[0];
        const examData = doc?.data();

        // 2. Check if it is in the past
        const startTime = examData.startTime;
        if (!dateInPast(startTime)) {
          // 3. Extract out the students array and add on to it
          const newExamStudentObj = {
            id: newUserId,
            status: "Not submitted yet",
          };

          const updatedStudents = examData.students
            ? [...examData.students, newExamStudentObj]
            : [newExamStudentObj];
          // 4. Send back the updated student array
          updateDoc(doc.ref, { students: updatedStudents });
          console.log("update complete");
        } else {
          console.log("exam is in the past!");
        }
        // 5. Repeat the loop
      } catch (e) {
        console.log("Error updating students in ", module);
      }
    });
  };

  const dateInPast = (date) => {
    // Convert the timestamp to milliseconds
    const startTimeMilliseconds =
      date.seconds * 1000 + Math.floor(date.nanoseconds / 1000000);

    // Create a Date object representing the start time
    const startTimeDate = new Date(startTimeMilliseconds);

    // Get the current date
    const currentDate = new Date();

    // Compare the start time with the current date
    if (startTimeDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };
  //fetch modules data
  const modulesRef = collection(db, "modules");
  const [allModulesData, setAllModulesData] = useState([]);
  const [allModulesName, setAllModuleNames] = useState([]);

  useEffect(() => {
    getModuleData();
  }, []);

  const getModuleData = async () => {
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
    const namesArray = allModulesData.map((obj) => obj.name);
    setAllModuleNames(namesArray);
  }, [allModulesData]);

  const handleModulesSelected = (data) => {
    setNewUserModules(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <AdminPersonnelBigContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminNewPersonnelContainer>
          <BackButton size="2rem" />
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
          <Modal
            handleModalClose={() => {
              setShowSignUpFailureModal(false);
            }}
            actionButtonText="OK"
            actionButtonColor={theme.statusError}
            filled={true}
            actionButtonClick={() => {}}
            show={showSignUpFailureModal}
            modalTitle="Something went wrong"
            modalContent={signUpFailureModalContent}
          />

          <AdminNewPersonnelAlignContainer>
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
                Instructor
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
                  <AdminNewFieldTitle>Programme</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserProgramme(e.target.value);
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
                  <AdminNewFieldTitle>Student Type</AdminNewFieldTitle>
                  <Dropdown
                    onChange={(e) => {
                      setNewUserStudentType(e);
                    }}
                    options={dropdownOptionsStudentType}
                  />
                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Enrollment Year</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserEnrollmentYear(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Enrollment Status</AdminNewFieldTitle>
                  <Dropdown
                    onChange={(e) => {
                      setNewUserEnrollmentStatus(e);
                    }}
                    options={dropdownOptionsEnrollmentStatus}
                  />
                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>CPGA</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserCgpa(e.target.value);
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
                    type="password"
                    onChange={(e) => {
                      setNewUserPassword(e.target.value);
                    }}
                  />
                </AdminNewFieldContainer>

                <AdminNewFieldContainer>
                  <AdminNewFieldTitle>Confirm Password</AdminNewFieldTitle>
                  <AdminNewField
                    type="password"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setNewUserPasswordConfirm(e.target.value);
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
                  <BubbleSelect
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
                  <AdminNewField
                    type="password"
                    onChange={(e) => {
                      setNewUserPasswordConfirm(e.target.value);
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
                  <AdminNewFieldTitle>Email</AdminNewFieldTitle>
                  <AdminNewField
                    onChange={(e) => {
                      setNewUserEmail(e.target.value);
                    }}
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
                  <AdminNewField
                    type="password"
                    onChange={(e) => {
                      setNewUserPasswordConfirm(e.target.value);
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
                  if (newUserPasswordConfirm === newUserPassword) {
                    addUser();
                  } else {
                    setSignUpFailureModalContent(
                      "Passwords do not match. Please re-enter passwords."
                    );
                    setShowSignUpFailureModal(true);
                  }
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
          </AdminNewPersonnelAlignContainer>
        </AdminNewPersonnelContainer>
      </AdminPersonnelBigContainer>
    </ThemeProvider>
  );
};

export default NewPersonnelPage;
