import React from "react";
import {
  StudentHomePageContainer,
  StudentExamDetailContainer,
  PageTitle,
  PageSubtitle,
  PageDescription,
  PageList,
  PageOrderList,
  SectionContainer,
  RuleContainer,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import { theme } from "../../theme";
import { studentNavbarItems } from "./StudentHomepage";
import ExamDetailList from "../../components/student/ExamDetailList/ExamDetailList";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const StudentExamDetailpage = () => {
  const navigate = useNavigate();
  const startexam = () => {
    navigate("/student/exam/question");
  };
  const SectionArray = [
    {
      examid: "1",
      section: "A",
      sectionDesc: "MCQ (15 questions)",
      weight: "30%",
    },
    {
      examid: "1",
      section: "B",
      sectionDesc: "Short Question (15 questions)",
      weight: "60%",
    },
    {
      examid: "1",
      section: "C",
      sectionDesc: "Long Question (1 question)",
      weight: "10%",
    },
  ];

  const params = useParams();
  const examId = params.examId;
  useEffect(() => {
    console.log("params", params);
    console.log("examid", examId);
  }, [params, examId]);

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentExamDetailContainer>
          <PageTitle>IE4717 Web Application & Design</PageTitle>
          <SectionContainer>
            <PageSubtitle>Section Description</PageSubtitle>
            <PageList>
              {SectionArray.map((item, index) => {
                return (
                  <ExamDetailList
                    key={index}
                    section={item.section}
                    sectionDesc={item.sectionDesc}
                    weight={item.weight}
                  ></ExamDetailList>
                );
              })}
            </PageList>
          </SectionContainer>
          <PageDescription>
            Exam Id: {examId} <br />
            Time Duration: 2 hrs
          </PageDescription>
          <RuleContainer>
            <PageDescription>Rule and Regulation</PageDescription>
            <PageList>
              <PageOrderList>
                Conduct exams in a quiet, well-lit, and private room.
              </PageOrderList>
              <PageOrderList>
                Ensure a stable internet connection; close all irrelevant
                applications.
              </PageOrderList>
              <PageOrderList>
                No communication tools allowed in the exam room.
              </PageOrderList>
              <PageOrderList>
                No web browsing; no external resources, textbooks, or notes.
              </PageOrderList>
              <PageOrderList>
                No talking, whispering, or leaving the room without permission.
              </PageOrderList>
              <PageOrderList>
                Adhere strictly to the specified exam duration.
              </PageOrderList>
              <PageOrderList>
                No plagiarism or cheating; use of unauthorized materials is
                prohibited.
              </PageOrderList>
              <PageOrderList>
                Violations may result in penalties, including grade deduction or
                exam disqualification.
              </PageOrderList>
            </PageList>
          </RuleContainer>
          <Button
            defaultColor={theme.primary}
            filledColor={theme.primary}
            filled={false}
            onClick={() => startexam()}
          >
            Start
          </Button>
          <Footer />
        </StudentExamDetailContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentExamDetailpage;
