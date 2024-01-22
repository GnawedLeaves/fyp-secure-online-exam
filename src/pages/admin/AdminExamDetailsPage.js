import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  AdminExamDetailsPageTitle,
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
import { useParams } from "react-router-dom";
import { adminNavbarItems } from "./AdminHomePage";

const AdminExamDetailsPage = () => {
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

  const { examid } = useParams();
  useEffect(() => {
    console.log("params", examid);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AdminHomePageContainer>
        <Navbar linksArray={adminNavbarItems} />

        <AdminNavbarContentContainer>
          <AdminExamDetailsPageTitle>
            IE4171: Web Design
          </AdminExamDetailsPageTitle>
        </AdminNavbarContentContainer>
      </AdminHomePageContainer>
    </ThemeProvider>
  );
};

export default AdminExamDetailsPage;
