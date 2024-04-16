import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import { useState } from "react";
import {
  AdminExamDetailsBackButtonContainer,
  AdminExamDetailsDetailsContainer,
  AdminExamDetailsDetailsTitle,
  AdminExamDetailsPage,
  AdminExamDetailsPersonnel,
  AdminExamDetailsPersonnelBox,
  AdminExamDetailsPersonnelBoxButtons,
  AdminExamDetailsStatusBall,
  AdminExamDetailsStatusDisplay,
  AdminExamDetailsSubtitle,
  AdminExamDetailsTimeContainer,
  AdminExamDetailsTimeField,
  AdminExamDetailsTitle,
  AdminHomePage,
  AdminHomePageContainer,
  EditTimeModalButtonContainer,
  EditTimeModalContainer,
  EditTimeModalEditIconContainer,
  EditTimeModalInput,
  EditTimeModalTitle,
  EditTimeModalTitleAndIcon,
} from "../AdminPagesStyles";
import Navbar from "../../../components/Navbar/Navbar";
import Exambox from "../../../components/Exambox/Exambox";
import { useNavigate, useParams } from "react-router-dom";
import { adminNavbarItems } from "../AdminHomePage";
import { HiArrowLongLeft } from "react-icons/hi2";
import BackButton from "../../../components/BackButton/BackButton";
import Button from "../../../components/Button/Button";
import OverviewCheatingBox from "../../../components/admin/OverviewCheatingBox/OverviewCheatingBox";
import { GoArrowRight } from "react-icons/go";
import ShortcutBox from "../../../components/admin/ShortcutBox/ShortcutBox";
import { db } from "../../../backend/firebase/firebase";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  calculateDifferenceInHours,
  handleFirebaseDate,
  handleFirebaseDateWithSeconds,
} from "../../../backend/firebase/handleFirebaseDate";
import Modal from "../../../components/Modal/Modal";
import { MdOutlineEdit } from "react-icons/md";
import { AdminNewField } from "../adminPersonnel/AdminPersonnelStyles";

const AdminExamDetailsPage2 = () => {
  const [examData, setExamData] = useState();
  const { examid: examId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (examId) {
      getExamById(examId);
    }
  }, [examId]);

  // get exam based on id
  const getExamById = async () => {
    const examRef = doc(db, "exams", examId);
    const docSnap = await getDoc(examRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setExamData({
        id: docSnap.id,
        ...data,
      });
    }
  };

  useEffect(() => {
    console.log("examData", examData);
  }, [examData]);

  const [showEditStartTimeModal, setShowEditStartTimeModal] = useState(false);
  const [showEditEndTimeModal, setShowEditEndTimeModal] = useState(false);
  const [showAddExamUserModal, setShowAddExamUserModal] = useState(false);
  const [newUserInExam, setNewUserInExam] = useState("");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const handleNewStartTime = () => {
    if (newStartTime !== "") {
      const date = new Date(newStartTime); // Convert date-time string to Date object
      const timestamp = Timestamp.fromDate(date);
      updateExamStartTime(timestamp);
    }
  };
  const handleNewEndTime = () => {
    if (newEndTime !== "") {
      const date = new Date(newEndTime); // Convert date-time string to Date object
      const timestamp = Timestamp.fromDate(date);
      updateExamEndTime(timestamp);
    }
  };

  const updateExamStartTime = async (newStartTime) => {
    try {
      const examRef = doc(db, "exams", examId);
      await updateDoc(examRef, {
        startTime: newStartTime,
      });
      getExamById(examId);
      setNewStartTime("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const updateExamEndTime = async (newEndTime) => {
    try {
      const examRef = doc(db, "exams", examId);
      await updateDoc(examRef, {
        endTime: newEndTime,
      });
      getExamById(examId);
      setNewEndTime("");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const deleteStudentFromExam = async (index) => {
    try {
      const examRef = doc(db, "exams", examId);
      const updatedStudentArray = [...examData.students];
      updatedStudentArray.splice(index, 1);
      await updateDoc(examRef, {
        students: updatedStudentArray,
      });
      getExamById(examId);
    } catch (e) {
      console.log("Error removing student from exam", e);
    }
  };

  const addStudentToExam = async () => {
    try {
      const examRef = doc(db, "exams", examId);
      let updatedStudentArray = [];
      if (examData.students?.length > 0) {
        updatedStudentArray = [
          {
            id: newUserInExam,
            status: "Not submitted yet",
          },
          ...examData.students,
        ];
      } else {
        updatedStudentArray = [
          {
            id: newUserInExam,
            status: "Not submitted yet",
          },
        ];
      }
      await updateDoc(examRef, {
        students: [...updatedStudentArray],
      });
      getExamById(examId);
    } catch (e) {
      console.log("Error adding student to exam", e);
    }
  };

  const deleteModuleFromStudent = async (userId) => {
    //examData?.courseId
    try {
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const modulesArray = userData.modules;
        const filteredArray = modulesArray.filter((module) => {
          return module !== examData.courseId;
        });
        updateDoc(userRef, {
          modules: filteredArray,
        });
      }
    } catch (e) {}
  };

  return (
    <ThemeProvider theme={theme}>
      <AdminHomePageContainer>
        <Navbar linksArray={adminNavbarItems} />
        <Modal
          handleModalClose={() => {
            setShowEditStartTimeModal(false);
          }}
          actionButtonColor={theme.primary}
          filled={true}
          modalType={"action2"}
          show={showEditStartTimeModal}
          actionButtonText={"Confirm"}
          closingButtonText={"Cancel"}
          actionButtonClick={() => {
            handleNewStartTime();
          }}
        >
          <EditTimeModalContainer>
            <EditTimeModalTitle>Choose New Start Time</EditTimeModalTitle>
            <EditTimeModalInput
              type="datetime-local"
              value={newStartTime}
              onChange={(e) => {
                console.log(e.target.value);
                setNewStartTime(e.target.value);
              }}
            />
          </EditTimeModalContainer>
        </Modal>

        <Modal
          handleModalClose={() => {
            setShowEditEndTimeModal(false);
          }}
          actionButtonColor={theme.primary}
          filled={true}
          modalType={"action2"}
          show={showEditEndTimeModal}
          actionButtonText={"Confirm"}
          closingButtonText={"Cancel"}
          actionButtonClick={() => {
            handleNewEndTime();
          }}
        >
          <EditTimeModalContainer>
            <EditTimeModalTitle>Choose New End Time</EditTimeModalTitle>
            <EditTimeModalInput
              type="datetime-local"
              value={newEndTime}
              onChange={(e) => {
                console.log(e.target.value);
                setNewEndTime(e.target.value);
              }}
            />
          </EditTimeModalContainer>
        </Modal>

        <Modal
          handleModalClose={() => {
            setShowAddExamUserModal(false);
          }}
          actionButtonColor={theme.primary}
          filled={true}
          modalType={"action2"}
          show={showAddExamUserModal}
          actionButtonText={"Add"}
          closingButtonText={"Cancel"}
          actionButtonClick={() => {
            if (newUserInExam !== "") {
              addStudentToExam();
            }
          }}
        >
          <EditTimeModalContainer>
            <EditTimeModalTitle>Add Student To Exam</EditTimeModalTitle>
            <AdminNewField
              placeholder="Enter ID"
              onChange={(e) => {
                setNewUserInExam(e.target.value);
              }}
            />
          </EditTimeModalContainer>
        </Modal>

        <AdminExamDetailsPage>
          {examData ? (
            <>
              <AdminExamDetailsBackButtonContainer>
                <BackButton size="2rem" />
              </AdminExamDetailsBackButtonContainer>

              <AdminExamDetailsTitle>
                {examData?.courseId} {examData?.name}
              </AdminExamDetailsTitle>
              <AdminExamDetailsSubtitle>ID: {examId}</AdminExamDetailsSubtitle>
              <AdminExamDetailsStatusDisplay>
                <AdminExamDetailsStatusBall status={examData?.status} /> Status:{" "}
                {examData?.status}
              </AdminExamDetailsStatusDisplay>
              <AdminExamDetailsTimeContainer>
                <AdminExamDetailsTimeField>
                  Time Left:
                  <div style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
                    {calculateDifferenceInHours(
                      examData.startTime,
                      examData.endTime
                    )}
                  </div>
                </AdminExamDetailsTimeField>
                <AdminExamDetailsTimeField>
                  <EditTimeModalTitleAndIcon>
                    Start Time
                    <EditTimeModalEditIconContainer
                      onClick={() => {
                        setShowEditStartTimeModal(true);
                      }}
                    >
                      <MdOutlineEdit size={"1.5rem"} />
                    </EditTimeModalEditIconContainer>
                  </EditTimeModalTitleAndIcon>
                  {handleFirebaseDateWithSeconds(examData?.startTime)}{" "}
                </AdminExamDetailsTimeField>

                <AdminExamDetailsTimeField>
                  <EditTimeModalTitleAndIcon>
                    End Time
                    <EditTimeModalEditIconContainer
                      onClick={() => {
                        setShowEditEndTimeModal(true);
                      }}
                    >
                      <MdOutlineEdit size={"1.5rem"} />
                    </EditTimeModalEditIconContainer>
                  </EditTimeModalTitleAndIcon>
                  {handleFirebaseDateWithSeconds(examData?.endTime)}{" "}
                </AdminExamDetailsTimeField>
              </AdminExamDetailsTimeContainer>

              <AdminExamDetailsDetailsContainer>
                <AdminExamDetailsDetailsTitle>
                  <span style={{ fontSize: "1.7rem" }}>Participants</span>

                  <Button
                    filledColor={theme.text}
                    filled="filled"
                    onClick={() => {
                      setShowAddExamUserModal(true);
                    }}
                  >
                    Add Student
                  </Button>
                </AdminExamDetailsDetailsTitle>

                <AdminExamDetailsPersonnel>
                  {examData.students ? (
                    examData?.students?.map((student, index) => {
                      return (
                        <AdminExamDetailsPersonnelBox key={index}>
                          {student.id}
                          <AdminExamDetailsPersonnelBoxButtons>
                            <Button
                              filledColor={theme.text}
                              onClick={() => {
                                navigate(`/admin/personnel/${student.id}`);
                              }}
                            >
                              Details
                            </Button>
                            <Button
                              filled={false}
                              defaultColor={theme.statusError}
                              filledColor={theme.statusError}
                              onClick={() => {
                                deleteStudentFromExam(index);
                                console.log("index", index);
                              }}
                            >
                              Delete
                            </Button>
                          </AdminExamDetailsPersonnelBoxButtons>
                        </AdminExamDetailsPersonnelBox>
                      );
                    })
                  ) : (
                    <>No students in exam</>
                  )}
                </AdminExamDetailsPersonnel>
              </AdminExamDetailsDetailsContainer>
            </>
          ) : (
            <>
              Exam Not Found
              <br />
              <br />
              <Button
                onClick={() => {
                  navigate("/admin/exams");
                }}
              >
                Return to Exams
              </Button>
            </>
          )}
        </AdminExamDetailsPage>
      </AdminHomePageContainer>
    </ThemeProvider>
  );
};

export default AdminExamDetailsPage2;
