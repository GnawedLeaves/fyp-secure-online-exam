import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../theme";
import { useState } from "react";
import {
  AdminExamDetailsBackButtonContainer,
  AdminExamDetailsDetailsContainer,
  AdminExamDetailsPage,
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
  EditTimeModalInput,
  EditTimeModalTitle,
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
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import {
  calculateDifferenceInHours,
  handleFirebaseDate,
  handleFirebaseDateWithSeconds,
} from "../../../backend/firebase/handleFirebaseDate";
import Modal from "../../../components/Modal/Modal";

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
  const [showEditEndTimeModal, setShowEditEndTimeModal] = useState(true);
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");

  const handleNewStartTime = () => {};

  return (
    <ThemeProvider theme={theme}>
      <AdminHomePageContainer>
        <Navbar linksArray={adminNavbarItems} />
        <Modal
          handleModalClose={() => {
            setShowEditStartTimeModal(false);
          }}
          actionButtonText="OK"
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
              onChange={(e) => {
                console.log(e.target.value);
                setNewStartTime(e.target.value);
              }}
            />
            {/* <EditTimeModalButtonContainer>
              <Button filled={theme.primary}>Confirm</Button>
              <Button
                onClick={() => {
                  setShowEditStartTimeModal(false);
                }}
              >
                Cancel
              </Button>
            </EditTimeModalButtonContainer> */}
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
                  <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {calculateDifferenceInHours(
                      examData.startTime,
                      examData.endTime
                    )}
                  </div>
                </AdminExamDetailsTimeField>
                <AdminExamDetailsTimeField>
                  Start Time:{" "}
                  {handleFirebaseDateWithSeconds(examData?.startTime)}{" "}
                  <Button
                    onClick={() => {
                      setShowEditStartTimeModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </AdminExamDetailsTimeField>
                <AdminExamDetailsTimeField>
                  End Time: {handleFirebaseDateWithSeconds(examData?.endTime)}
                  <Button>Edit</Button>
                </AdminExamDetailsTimeField>
              </AdminExamDetailsTimeContainer>

              <AdminExamDetailsDetailsContainer>
                Details
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
