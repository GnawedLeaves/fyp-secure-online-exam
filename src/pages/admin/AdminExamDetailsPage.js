import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import {
  AdminBackButtonContainer,
  AdminExamAllStudentsBox,
  AdminExamAllStudentsBoxContainer,
  AdminExamAllStudentsContainer,
  AdminExamAllStudentsName,
  AdminExamAllStudentsTitle,
  AdminExamAllStudentsVideo,
  AdminExamAttributes,
  AdminExamAttributesContainer,
  AdminExamAttributesControlsContainer,
  AdminExamAttributesTimeLeft,
  AdminExamAttributesTimeLeftContainer,
  AdminExamAttributesTimeLeftTitle,
  AdminExamDetailsPageTitle,
  AdminExamOneStatContainer,
  AdminExamShortcutContainer,
  AdminExamStatsButtonBar,
  AdminExamStatsCompletedTitle,
  AdminExamStatsContainer,
  AdminExamStatsTitle,
  AdminExamStatusBall,
  AdminExamStatusContainer,
  AdminExamStudentsAndStatsContainer,
  AdminExamStudentsCheatingBoxContainer,
  AdminExamStudentsCheatingBubble,
  AdminExamStudentsCheatingContainer,
  AdminExamStudentsCheatingTitle,
  AdminExamStudentsCheatingTitleContainer,
  AdminExamStudentsContainer,
  AdminExamStudentsContainerButtonBar,
  AdminExamStudentsMediumBubble,
  AdminExamStudentsTitle,
  AdminExamsOneStatViewAllContainer,
  AdminHomePage,
  AdminHomePageContainer,
  AdminNavbarContainer,
  AdminNavbarContentContainer,
  AdminTitleAndStatusContainer,
  OngoingExams,
  OngoingExamsContainer,
  OngoingExamsTitle,
  PageTitle,
} from "./AdminPagesStyles";
import Navbar from "../../components/Navbar/Navbar";
import Exambox from "../../components/Exambox/Exambox";
import { useParams } from "react-router-dom";
import { adminNavbarItems } from "./AdminHomePage";
import { HiArrowLongLeft } from "react-icons/hi2";
import BackButton from "../../components/BackButton/BackButton";
import Button from "../../components/Button/Button";
import OverviewCheatingBox from "../../components/admin/OverviewCheatingBox/OverviewCheatingBox";
import { GoArrowRight } from "react-icons/go";
import ShortcutBox from "../../components/admin/ShortcutBox/ShortcutBox";

const AdminExamDetailsPage = () => {
  const students = [
    { name: "John", courseCode: "EEE" },
    { name: "Alice", courseCode: "IEM" },
    { name: "Bob", courseCode: "EEE" },
    { name: "Jane", courseCode: "IEM" },
    { name: "Charlie", courseCode: "EEE" },
    { name: "Emma", courseCode: "IEM" },
    { name: "David", courseCode: "EEE" },
    { name: "Grace", courseCode: "IEM" },
    { name: "Frank", courseCode: "EEE" },
    { name: "Henry", courseCode: "IEM" },
    { name: "Lily", courseCode: "EEE" },
    { name: "Oliver", courseCode: "IEM" },
    { name: "Sophia", courseCode: "EEE" },
    { name: "Matthew", courseCode: "IEM" },
    { name: "Charlotte", courseCode: "EEE" },
    { name: "James", courseCode: "IEM" },
    { name: "Ava", courseCode: "EEE" },
    { name: "William", courseCode: "IEM" },
    { name: "Ella", courseCode: "EEE" },
    { name: "Daniel", courseCode: "IEM" },
  ];
  const [seeAllStudents, setSeeAllStudents] = useState(false);
  const [allStudentsArray, setAllStudentsArray] = useState(students);
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

  // Cheating
  const cheatingArray = [
    { id: "1", name: "marcel", issue: "Eyes moving multiple times" },
    { id: "2", name: "marcel", issue: "Eyes moving multiple times" },
    { id: "3", name: "marcel", issue: "Eyes moving multiple times" },
    { id: "4", name: "marcel", issue: "Eyes moving multiple times" },
  ];
  const mediumCheatingArray = [
    { id: "1", name: "marcel", issue: "Eyes moving multiple times" },
    { id: "2", name: "marcel", issue: "Eyes moving multiple times" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AdminHomePageContainer>
        <Navbar linksArray={adminNavbarItems} />
        <AdminHomePage>
          <AdminNavbarContentContainer>
            <BackButton size="2rem" />
            <AdminTitleAndStatusContainer>
              <AdminExamDetailsPageTitle>
                IE4171: Web Design
              </AdminExamDetailsPageTitle>

              <AdminExamStatusContainer>
                <AdminExamStatusBall /> Ongoing
              </AdminExamStatusContainer>
            </AdminTitleAndStatusContainer>
            <AdminExamAttributesContainer>
              <AdminExamAttributes>
                ID: {examid}
                <br />
                Started: 13 Sept 2023 3.45pm
                <br />
                Created by: teacher002
              </AdminExamAttributes>
              <AdminExamAttributesTimeLeftContainer>
                <AdminExamAttributesTimeLeft>
                  Time Left:
                  <br />
                  <AdminExamAttributesTimeLeftTitle>
                    2h 15mins 10sec
                  </AdminExamAttributesTimeLeftTitle>
                </AdminExamAttributesTimeLeft>
                <Button
                  onClick={() => {
                    console.log("edit time");
                  }}
                >
                  Edit Time
                </Button>
              </AdminExamAttributesTimeLeftContainer>
              <AdminExamAttributesControlsContainer>
                <Button
                  defaultColor={theme.statusGood}
                  filledColor={theme.statusGood}
                  filled={true}
                  onClick={() => {}}
                >
                  Start
                </Button>
                <Button filled={true} onClick={() => {}}>
                  Pause
                </Button>
                <Button>Stop</Button>
              </AdminExamAttributesControlsContainer>
            </AdminExamAttributesContainer>
          </AdminNavbarContentContainer>
          {seeAllStudents ? (
            <AdminExamAllStudentsContainer>
              {" "}
              <BackButton
                onClick={() => {
                  setSeeAllStudents(false);
                }}
                size="2rem"
              />
              <AdminExamAllStudentsTitle>
                All Students
              </AdminExamAllStudentsTitle>
              <AdminExamAllStudentsBoxContainer>
                {allStudentsArray &&
                  allStudentsArray.map((student, index) => (
                    <AdminExamAllStudentsBox key={index}>
                      <AdminExamAllStudentsVideo />
                      <AdminExamAllStudentsName>
                        {student.name}
                      </AdminExamAllStudentsName>
                    </AdminExamAllStudentsBox>
                  ))}
              </AdminExamAllStudentsBoxContainer>
            </AdminExamAllStudentsContainer>
          ) : (
            <>
              <AdminExamStudentsAndStatsContainer>
                <AdminExamStudentsContainer>
                  <AdminExamStudentsTitle>Students</AdminExamStudentsTitle>
                  <AdminExamStudentsCheatingContainer>
                    <AdminExamStudentsCheatingTitleContainer>
                      <AdminExamStudentsCheatingTitle>
                        Potential Cheating
                      </AdminExamStudentsCheatingTitle>
                      <AdminExamStudentsCheatingBubble>
                        {cheatingArray.length}
                      </AdminExamStudentsCheatingBubble>
                    </AdminExamStudentsCheatingTitleContainer>
                    <AdminExamStudentsCheatingBoxContainer>
                      {cheatingArray.map((item, index) => {
                        return (
                          <OverviewCheatingBox
                            key={index}
                            id={item.id}
                            issue={item.issue}
                          ></OverviewCheatingBox>
                        );
                      })}
                    </AdminExamStudentsCheatingBoxContainer>
                  </AdminExamStudentsCheatingContainer>
                  <AdminExamStudentsCheatingContainer>
                    <AdminExamStudentsCheatingTitleContainer>
                      <AdminExamStudentsCheatingTitle>
                        Medium Alert
                      </AdminExamStudentsCheatingTitle>
                      <AdminExamStudentsMediumBubble>
                        {mediumCheatingArray.length}
                      </AdminExamStudentsMediumBubble>
                    </AdminExamStudentsCheatingTitleContainer>
                    <AdminExamStudentsCheatingBoxContainer>
                      {mediumCheatingArray.map((item, index) => {
                        return (
                          <OverviewCheatingBox
                            key={index}
                            id={item.id}
                            issue={item.issue}
                          ></OverviewCheatingBox>
                        );
                      })}
                    </AdminExamStudentsCheatingBoxContainer>
                  </AdminExamStudentsCheatingContainer>
                  <AdminExamStudentsContainerButtonBar
                    onClick={() => {
                      console.log("clicked");
                      setSeeAllStudents(true);
                    }}
                  >
                    <Button>
                      View All <GoArrowRight />
                    </Button>
                  </AdminExamStudentsContainerButtonBar>
                </AdminExamStudentsContainer>
                <AdminExamStatsContainer>
                  <AdminExamStatsTitle>Statistics</AdminExamStatsTitle>
                  <AdminExamOneStatContainer>
                    <AdminExamStatsCompletedTitle>
                      12% (21)
                    </AdminExamStatsCompletedTitle>
                    Completed the Exam
                    <br />
                    <AdminExamsOneStatViewAllContainer>
                      View All <GoArrowRight />
                    </AdminExamsOneStatViewAllContainer>
                  </AdminExamOneStatContainer>
                  <AdminExamOneStatContainer>
                    <AdminExamStatsCompletedTitle>
                      80% (112)
                    </AdminExamStatsCompletedTitle>
                    Doing the exam
                    <br />
                    <AdminExamsOneStatViewAllContainer>
                      View All <GoArrowRight />
                    </AdminExamsOneStatViewAllContainer>
                  </AdminExamOneStatContainer>
                  <AdminExamOneStatContainer>
                    <AdminExamStatsCompletedTitle>
                      8% (9)
                    </AdminExamStatsCompletedTitle>
                    Have not started the exam
                    <br />
                    <AdminExamsOneStatViewAllContainer>
                      View All
                      <GoArrowRight />
                    </AdminExamsOneStatViewAllContainer>
                  </AdminExamOneStatContainer>
                  <AdminExamStatsButtonBar>
                    <Button>
                      Details <GoArrowRight />
                    </Button>
                  </AdminExamStatsButtonBar>
                </AdminExamStatsContainer>
              </AdminExamStudentsAndStatsContainer>
              <AdminExamShortcutContainer>
                <ShortcutBox ballBackground={theme.statusError}>
                  Cheated
                </ShortcutBox>
                <ShortcutBox ballBackground={theme.statusIntermediate}>
                  Issues
                </ShortcutBox>
                <ShortcutBox ballBackground={theme.statusGood}>
                  Questions
                </ShortcutBox>
              </AdminExamShortcutContainer>
            </>
          )}
        </AdminHomePage>
      </AdminHomePageContainer>
    </ThemeProvider>
  );
};

export default AdminExamDetailsPage;
