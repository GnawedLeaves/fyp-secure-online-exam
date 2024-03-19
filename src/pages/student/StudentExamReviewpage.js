import React, { useState, useEffect } from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  ReviewContainer,
  ReviewRow,
  ReviewTable,
  ReviewData,
  NameData,
  DateData,
  EndTimeData,
  ResultData,

} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";
import { storage } from '../../backend/firebase/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';
import {formatDateString} from "../student/StudentExampage";
import { getAuth } from "firebase/auth";

const StudentExamReviewpage = () => {
  //const studentId = "1221";
  const [studentId, setStudent] = useState();
  const getUser = async (authId) => {
    try {
      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("authId", "==", authId));

      const querySnapshot = await getDocs(usersQuery);

      const userInfo = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("userInfo", userInfo);
      setStudent(userInfo[0]?.id);
      

      return userInfo;
    } catch (error) {
      console.error("Error getting profiles:", error);
      return [];
    }
  };

  const auth = getAuth();
  const authId = auth.currentUser ? auth.currentUser.uid : null;
  console.log('authId',authId);
  if (authId) {
    getUser(authId);
  }
  const { examId } = useParams();
  const submissionDisplayRef = useRef(null);
  const [examReview, setExamReview] = useState([]);
  const submissionRef = collection(db, "exams");

  const navigate = useNavigate();
  const NavigateAllExam = () => {
    navigate("/student/exam");
  };

  const getSubmissionDetails = async (studentId, examId) => {
    try {
      // Check if studentId and examId are defined
      if (!studentId || !examId) {
        console.error("Error: studentId or examId is not defined.");
        return null;
      }
  
      // Perform a query to get the document with matching examId
      const examQuery = query(submissionRef, where("examId", "==", examId));
      const examSnapshot = await getDocs(examQuery);
  
      // Check if there's a matching document
      if (!examSnapshot.empty) {
        const examDoc = examSnapshot.docs[0];
  
        // Retrieve the grade, submission time, exam name, and exam date for the specific student
        const studentInfo = examDoc.data().students && Object.values(examDoc.data().students).find(student => student.id === studentId);
  
        if (studentInfo) {
          const grade = studentInfo.grade;
          const submissionTime = studentInfo.submissionTime ? studentInfo.submissionTime.toDate() : null;
          const courseId = examDoc.data().courseId;
          const examName = examDoc.data().name;
          const examEndTime = examDoc.data().endTime ? examDoc.data().endTime.toDate() : null;
          const examDate = examDoc.data().startTime ? examDoc.data().startTime.toDate() : null;
  
          return { courseId, grade, submissionTime, examName, examEndTime,examDate };
        } else {
          console.warn(`Student with ID ${studentId} not found for exam with courseId ${examId}.`);
          return null;
        }
      } else {
        console.warn(`Exam with courseId ${examId} not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error getting student exam details:", error);
      return null;
    }
  };

  const fetchSubmissionData = async () => {
    try {
      const {courseId, grade, submissionTime, examName, examEndTime, examDate } = await getSubmissionDetails(studentId, examId);
      setExamReview({
        courseId,
        grade,
        submissionTime,
        examName,
        examEndTime,
        examDate,
      });
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  useEffect(() => {
    fetchSubmissionData();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
          <Navbar linksArray={studentNavbarItems} />
          <StudentNavbarContentContainer>
            <PageTitle>Exam Review</PageTitle>
            <ReviewContainer>
              <ReviewTable>
                <ReviewRow>
                  <ReviewData>Course: </ReviewData>
                  <NameData>{examReview.courseId} {examReview.examName}</NameData>
                </ReviewRow>
                <ReviewRow>
                <ReviewData>Date: </ReviewData>
                  <DateData>{examReview.examDate? formatDateString(examReview.examDate): ""}</DateData>
                </ReviewRow>
                <ReviewRow>
                  <ReviewData>Submission Time: </ReviewData>
                  <EndTimeData>{examReview.submissionTime? examReview.submissionTime.toLocaleTimeString(): ""}</EndTimeData>
                </ReviewRow>
                <ReviewRow>
                <ReviewData>End Time: </ReviewData>
                <EndTimeData>{examReview.examEndTime? examReview.examEndTime.toLocaleTimeString(): ""}</EndTimeData>
                </ReviewRow>
                
                <ReviewRow>
                  <ReviewData>Grade: </ReviewData>
                  <ResultData>{examReview.grade}</ResultData>
                </ReviewRow>
              </ReviewTable>
              <Button defaultColor={theme.primary} filledColor={theme.primary} filled={false} onClick={() => NavigateAllExam()}>
                  Back
                </Button>
            </ReviewContainer>
            <Footer/>
          </StudentNavbarContentContainer>
        </StudentHomePageContainer>
        
      </ThemeProvider>
  );
};

export default StudentExamReviewpage;


