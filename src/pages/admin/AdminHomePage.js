import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  AdminHomePageContainer,
  AdminNavbarContainer,
  AdminNavbarContentContainer,
  OngoingExams,
  OngoingExamsContainer,
  OngoingExamsTitle,
  PageTitle,
} from "./AdminPagesStyles";
import Navbar from "../../components/Navbar/Navbar";
import Exambox from "../../components/Exambox/Exambox";
import { useNavigate } from "react-router-dom";

const AdminHomePage = () => {
  const navigate = useNavigate();
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

  return (
    <ThemeProvider theme={theme}>
      <AdminHomePageContainer>
        <Navbar />
        <AdminNavbarContentContainer>
          <PageTitle>Exams</PageTitle>
          <OngoingExamsContainer>
            <OngoingExamsTitle>Ongoing Exams</OngoingExamsTitle>
            <OngoingExams>
              {examList.map((exam) => (
                <Exambox
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
              {examList2.map((exam) => (
                <Exambox
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
              {examList2.map((exam) => (
                <Exambox
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
    </ThemeProvider>
  );
};

export default AdminHomePage;
