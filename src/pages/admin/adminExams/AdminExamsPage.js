import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  AdminHomePageContainer,
  AdminNavbarContainer,
  AdminNavbarContentContainer,
  NoExamsTitle,
  OngoingExams,
  OngoingExamsContainer,
  OngoingExamsTitle,
  PageTitle,
} from "../AdminPagesStyles";
import Navbar from "../../../components/Navbar/Navbar";
import Exambox from "../../../components/Exambox/Exambox";
import { LuBookMarked } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import LoadingPage from "../../common/loadingPage/LoadingPage";
import { theme } from "../../../theme";
import { adminNavbarItems } from "../AdminHomePage";
import {
  getAllDocuments,
  getAllDocumentsWithoutDate,
} from "../../../backend/firebase/getAllDocuments";
import { db } from "../../../backend/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  calculateDifferenceInHours,
  handleFirebaseDate,
} from "../../../backend/firebase/handleFirebaseDate";

const AdminExamsPage = () => {
  const navigate = useNavigate();
  const examRef = collection(db, "exams");
  const [allExamsData, setAllExamsData] = useState([]);

  const getAllExams = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "exams"));
      const examDataArray = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        if (doc.endTime !== null && doc.startTime !== null) {
          const calculatedDurationHours = calculateDifferenceInHours(
            docData.startTime,
            docData.endTime
          );
          const convertedEndTime = handleFirebaseDate(docData.endTime);
          const convertedStartTime = handleFirebaseDate(docData.startTime);
          return {
            id: doc.id,
            convertedEndTime: convertedEndTime,
            convertedStartTime: convertedStartTime,
            calculatedDurationHours: calculatedDurationHours,
            ...docData,
          };
        } else {
          return {
            id: doc.id,
            ...docData,
          };
        }
      });
      console.log("examDataArray", examDataArray);
      setAllExamsData(examDataArray);
    } catch (error) {
      console.error("Error getting all exams:", error);
    }
  };

  useEffect(() => {
    getAllExams();
  }, []);

  const changePage = () => {
    navigate("/adminexamdetails");
  };

  const [ongoingExams, setOngoingExams] = useState([]);
  const [completedExams, setCompletedExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);

  const sortExams = () => {
    const allExams = allExamsData;
    const ongoingExams = allExams.filter((exam) => exam.status === "Ongoing");
    const upcomingExams = allExams.filter(
      (exam) => exam.status === "Not Started"
    );
    const completedExams = allExams.filter(
      (exam) => exam.status === "Completed"
    );

    setOngoingExams(ongoingExams);
    setCompletedExams(completedExams);
    setUpcomingExams(upcomingExams);
    console.log("ongoingExams", ongoingExams);
    console.log("upcomingExams", upcomingExams);
    console.log("allExams", allExams);
  };

  useEffect(() => {
    sortExams();
  }, [allExamsData]);

  const examList2 = [
    {
      title: "IE4171: Web Design",
      examId: "00012",
      studentsCount: 108,
      timeLeft: "2h 15mins 10sec",
      alertsCount: 0,
      status: "",
    },
    {
      title: "IE3000: Algorithms",
      examId: "00012",
      studentsCount: 108,
      timeLeft: "2h 15mins 10sec",
      alertsCount: 0,
      status: "",
    },
  ];

  //edit this when want to add loading screen
  const [finishedLoading, setFinishedLoading] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      {finishedLoading ? (
        <AdminHomePageContainer>
          <Navbar linksArray={adminNavbarItems} />
          <AdminNavbarContentContainer>
            <PageTitle>Exams</PageTitle>

            <OngoingExamsContainer>
              <OngoingExamsTitle>Ongoing Exams</OngoingExamsTitle>
              {ongoingExams.length > 0 ? (
                <OngoingExams>
                  {ongoingExams.map((exam, index) => (
                    <Exambox
                      key={index}
                      title={exam.courseId}
                      examId={exam.id}
                      studentsCount={exam.students?.length}
                      timeLeft={exam.calculatedDurationHours}
                      alertsCount={exam.alertsCount}
                      status={exam.status}
                    />
                  ))}
                </OngoingExams>
              ) : (
                <NoExamsTitle>No Ongoing Exams</NoExamsTitle>
              )}
            </OngoingExamsContainer>
            <OngoingExamsContainer>
              <OngoingExamsTitle>Upcoming Exams</OngoingExamsTitle>
              {upcomingExams.length > 0 ? (
                <OngoingExams>
                  {upcomingExams.map((exam, index) => (
                    <Exambox
                      key={index}
                      title={exam.courseId}
                      examId={exam.id}
                      studentsCount={exam.students?.length}
                      timeLeft={exam.calculatedDurationHours}
                      alertsCount={exam.alertsCount}
                      status={exam.status}
                    />
                  ))}
                </OngoingExams>
              ) : (
                <NoExamsTitle>No Upcoming Exams</NoExamsTitle>
              )}
            </OngoingExamsContainer>
            <OngoingExamsContainer>
              <OngoingExamsTitle>Completed Exams</OngoingExamsTitle>
              {completedExams.length > 0 ? (
                <OngoingExams>
                  {completedExams.map((exam, index) => (
                    <Exambox
                      key={index}
                      title={exam.courseId}
                      examId={exam.id}
                      studentsCount={exam.students?.length}
                      timeLeft={exam.calculatedDurationHours}
                      alertsCount={exam.alertsCount}
                      status={exam.status}
                    />
                  ))}
                </OngoingExams>
              ) : (
                <NoExamsTitle>No Competed Exams</NoExamsTitle>
              )}
            </OngoingExamsContainer>
          </AdminNavbarContentContainer>
        </AdminHomePageContainer>
      ) : (
        <LoadingPage />
      )}
    </ThemeProvider>
  );
};

export default AdminExamsPage;
