import React, { useState, useEffect } from "react";
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
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import ExamDetailList from "../../components/student/ExamDetailList/ExamDetailList";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useRef } from "react"; 
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"; 
import { db } from "../../backend/firebase/firebase";
import { handleFirebaseDate } from "../../backend/firebase/handleFirebaseDate";

const StudentExamDetailpage = () => {
  const { examId } = useParams();
  const courseId = examId;
  const examDisplayRef = useRef(null);
  const [exams, setExams] = useState([]);
  const examsRef = collection(db, "exams");
  const navigate = useNavigate();
  

  const startexam = () => {
    navigate("/student/exam/",examId,"/1");
  };

  const getExamDetail = async (courseId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const examsQuery = query(examsRef, where("courseId", "==", courseId));

      // Get the documents based on the query
      const querySnapshot = await getDocs(examsQuery);

      // Extract the data from the documents
      const examsData = querySnapshot.docs.map((doc) => ({
        courseId: doc.courseId,
        ...doc.data(),
      }));
      console.log("examData",examsData);
      setExams(examsData);

      return examsData;
    } catch (error) {
      console.error("Error getting exam detail:", error);
      return [];
    }
  };

  //updates the data array whenever the database changes


  useEffect(() => {
    getExamDetail(courseId);
  }, []);

  
  

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentExamDetailContainer ref={examDisplayRef}>
          <PageTitle>{exams[0]?.courseId} {exams[0]?.name}</PageTitle>
          <SectionContainer>
            <PageSubtitle>Section Description</PageSubtitle>
            <PageList>
            {exams.length > 0 &&
              Object.values(exams[0]?.sections || {})
                .sort((a, b) => a.section.localeCompare(b.section))
                .map((item, index) => (
                  <ExamDetailList
                    key={index}
                    section={item.section}
                    sectionDesc={item.description}
                    weight={item.weight}
                  />
                ))}
            </PageList>
          </SectionContainer>
          <PageDescription>Time Duration: {exams[0]?.duration}</PageDescription>
          <RuleContainer>
            <PageDescription>Rule and Regulation</PageDescription>
            <PageList>
              <PageOrderList>Conduct exams in a quiet, well-lit, and private room.</PageOrderList>
              <PageOrderList>Ensure a stable internet connection; close all irrelevant applications.</PageOrderList>
              <PageOrderList>No communication tools allowed in the exam room.</PageOrderList>
              <PageOrderList>No web browsing; no external resources, textbooks, or notes.</PageOrderList>
              <PageOrderList>No talking, whispering, or leaving the room without permission.</PageOrderList>
              <PageOrderList>Adhere strictly to the specified exam duration.</PageOrderList>
              <PageOrderList>No plagiarism or cheating; use of unauthorized materials is prohibited.</PageOrderList>
              <PageOrderList>Violations may result in penalties, including grade deduction or exam disqualification.</PageOrderList>
            </PageList>
          </RuleContainer>
          <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => startexam()}>
            Start
          </Button>
          <Footer/>
        </StudentExamDetailContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentExamDetailpage;
