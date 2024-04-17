import React, { useEffect } from 'react';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";
import { db } from "../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Link } from 'react-router-dom';

const ExamItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const BoldExamText = styled.div`
  font-weight: bold;
`;

const Underlined = styled.span`
  text-decoration: underline;
`;

const InstructorProctorPage = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
    return formattedDate;
  };

  const fetchExams = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Reset time to 00:00 hours to include all exams from today onward
      const currentDate = Timestamp.fromDate(today);

      const examsRef = collection(db, 'exams');
      const q = query(examsRef, where("startTime", ">=", currentDate));
      const querySnapshot = await getDocs(q);
      const examsData = [];

      querySnapshot.forEach((doc) => {
        const examData = doc.data();
        examsData.push({ id: doc.id, ...examData });
      });

      // Sort exams by startTime in ascending order
      examsData.sort((a, b) => a.startTime.seconds - b.startTime.seconds);

      console.log('Exams fetched successfully:', examsData);
      setExams(examsData);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <InstructorHomeContainer>
        <Navbar linksArray={instructorNavBarItems} />
        <InstructorDashboardContainer>
          <PageTitleInstructor>Proctoring Session</PageTitleInstructor>
          <br />

          {exams.map(exam => (
            <ExamItem key={exam.id}>
              <BoldExamText><h3>Course ID: <Link to={`/Instructor/InstructorProctor/${exam.courseId}/${exam.examId}`}>{exam.courseId}</Link></h3>
              <p>Name: <Underlined><Link to={`/Instructor/InstructorProctor/${exam.courseId}/${exam.examId}`}>{exam.name}</Link></Underlined></p>
              <p>Start Time: <Underlined><Link to={`/Instructor/InstructorProctor/${exam.courseId}/${exam.examId}`}>{formatDate(exam.startTime.toDate())}</Link></Underlined></p>
              </BoldExamText>
            </ExamItem>
          ))}
        </InstructorDashboardContainer>
      </InstructorHomeContainer>
    </ThemeProvider>
  );
};


export default InstructorProctorPage;
