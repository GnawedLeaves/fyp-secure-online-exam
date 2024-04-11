import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import {
  AdminHomePageContainer,
  AdminNavbarContainer,
  AdminNavbarContentContainer,
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
import { collection } from "firebase/firestore";

const AdminExamsPage = () => {
  const navigate = useNavigate();
  const examRef = collection(db, "exams");
  const [allExamsData, setAllExamsData] = useState([]);

  const getAllExams = async () => {
    try {
      const examData = await getAllDocumentsWithoutDate("exams");
      setAllExamsData(examData);
      console.log("examData", examData);
    } catch (error) {
      console.error("Error getting all exams:", error);
    }
  };

  useEffect(() => {
    console.log("examData", allExamsData);
  }, [allExamsData]);
  const changePage = () => {
    navigate("/adminexamdetails");
  };
  const examList = [
    {
      title: "IE4171: Web Design",
      examId: "00012",
      studentsCount: 108,
      timeLeft: "2h 15mins 10sec",
      alertsCount: 0,
      status: "ongoing",
    },
    {
      title: "IE3000: Algorithms",
      examId: "00012",
      studentsCount: 108,
      timeLeft: "2h 15mins 10sec",
      alertsCount: 0,
      status: "ongoing",
    },
  ];

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
              <OngoingExams>
                {examList.map((exam, index) => (
                  <Exambox
                    key={index}
                    title={exam.title}
                    examId={exam.examId}
                    studentsCount={exam.studentsCount}
                    timeLeft={exam.timeLeft}
                    alertsCount={exam.alertsCount}
                    status={exam.status}
                  />
                ))}
              </OngoingExams>
            </OngoingExamsContainer>
            <OngoingExamsContainer>
              <OngoingExamsTitle>Upcoming Exams</OngoingExamsTitle>
              <OngoingExams>
                {examList2.map((exam, index) => (
                  <Exambox
                    key={index}
                    title={exam.title}
                    examId={exam.examId}
                    studentsCount={exam.studentsCount}
                    timeLeft={exam.timeLeft}
                    alertsCount={exam.alertsCount}
                    status={exam.status}
                  />
                ))}
              </OngoingExams>
            </OngoingExamsContainer>
            <OngoingExamsContainer>
              <OngoingExamsTitle>Completed Exams</OngoingExamsTitle>
              <OngoingExams>
                {examList2.map((exam, index) => (
                  <Exambox
                    key={index}
                    title={exam.title}
                    examId={exam.examId}
                    studentsCount={exam.studentsCount}
                    timeLeft={exam.timeLeft}
                    alertsCount={exam.alertsCount}
                    status={exam.status}
                  />
                ))}
              </OngoingExams>
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
