import React, { useState, useEffect } from "react";
import {
  StudentHomePageContainer,
  StudentNavbarContentContainer,
  PageTitle,
  ExamTableContainer,
  TableTitle,
  OpenExams,
  ExamlistContainer,
  ExamDetail,
  TableDescription,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { theme } from "../../theme";
import { studentNavbarItems } from "./StudentHomepage";
import Examlist from "../../components/Examlist/Examlist";
import Pastexamlist from "../../components/Examlist/Pastexamlist";
import Upcomingexamlist from "../../components/Examlist/Upcomingexamlist";
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
import { getAuth, onAuthStateChanged } from "firebase/auth";

const usersRef = collection(db, "users");
const examsRef = collection(db, "exams");

export const getExam = async (studentId) => {
  try {
    // Check if studentId is defined
    if (!studentId) {
      console.error("Error: studentId is not defined.");
      return [];
    }

    // Create a query to get exams for the specific studentId
    const examsQuery = query(usersRef,where("id","==", studentId));

    // Get the documents based on the query
    const querySnapshot = await getDocs(examsQuery);

    // Extract the data from the documents
    const examsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("examData", examsData);
    return examsData;
  } catch (error) {
    console.error("Error getting exam list:", error);
    return [];
  }
};

export function formatDateString(date) {
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

  const formattedDate = date.toLocaleDateString('en-US', options);

  // Extract day, month, and year
  const [_, month, day, year] = formattedDate.match(/(\w+) (\d+), (\d+)/);

  // Construct the formatted date in the desired format
  return `${day} ${month} ${year}`;
}

const StudentExampage = () => {
  //const studentId = "1221";
  const [studentId, setStudent] = useState();
  const [authId, setAuthId] = useState(null);
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

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthId(user.uid); // Update authId when user is authenticated
      } else {
        setAuthId(null); // Reset authId when user is not authenticated
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array to run effect only once on mount

  useEffect(() => {
    if (authId) {
      getUser(authId);
    }
  }, [authId]); // Run effect when authId changes
  console.log("authid",authId);

  const examDisplayRef = useRef(null);
  const [pastExams, setPastExams] = useState([]);
  const [presentExams, setPresentExams] = useState([]);
  const [futureExams, setFutureExams] = useState([]);


  const getCurrentTime = () => {
    // Get the current time as a Firestore Timestamp
    return new Date(); 
  };

  const getExamDetails = async (examsData, studentId) => {
    try {
      const pastExams = [];
      const presentExams = [];
      const futureExams = [];
  
      if (!examsData || examsData.length === 0 || !examsData[0].exams) {
        console.warn(`No exams found for student with ID ${studentId}.`);
        return { pastExams, presentExams, futureExams };
      }
  
      const examIdArray = examsData[0].exams;
  
      for (const examId of examIdArray) {
        // Perform a query to get the document with matching courseId
        const examsQuery = query(examsRef, where("courseId", "==", examId));
  
        const querySnapshot = await getDocs(examsQuery);
  
        // Check if there's a matching document
        if (!querySnapshot.empty) {
          for (const examDoc of querySnapshot.docs) {
            // Retrieve the start and end times of the exam
            const startTime = examDoc.data().startTime?.toDate();
            const endTime = examDoc.data().endTime?.toDate();
    
            // Classify the exam based on the date
            const currentTime = getCurrentTime();

            if (currentTime < startTime) {
              futureExams.push({
                courseId: examDoc.courseId,
                id: examDoc.id,
                ...examDoc.data(),
              });
            } else if (currentTime >= startTime && currentTime <= endTime) {
              presentExams.push({
                courseId: examDoc.courseId,
                id: examDoc.id,
                ...examDoc.data(),
              });
            } else {
              pastExams.push({
                courseId: examDoc.courseId,
                id: examDoc.id,
                ...examDoc.data(),
              });
            }
          }
        } else {
          console.warn(`Exam with courseId ${examId} not found.`);
        }
      }
  
      console.log("Past exams:", pastExams);
      console.log("Present exams:", presentExams);
      console.log("Future exams:", futureExams);
  
      return { pastExams, presentExams, futureExams };
    } catch (error) {
      console.error("Error getting detailed exam list:", error);
      return { pastExams: [], presentExams: [], futureExams: [] };
    }
  };

  const fetchExamData = async () => {
    try {
      const examsData = await getExam(studentId);
      const { pastExams, presentExams, futureExams } = await getExamDetails(examsData, studentId);

      setPastExams(pastExams);
      setPresentExams(presentExams);
      setFutureExams(futureExams);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  useEffect(() => {
    fetchExamData();
  }, [studentId]); 

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Exam</PageTitle>
          <ExamTableContainer>
            <TableTitle>Open</TableTitle>
            {presentExams.length > 0 ? (
              <OpenExams>
                <ExamlistContainer>
                  <ExamDetail style={{ width: "20%" }}>Name</ExamDetail>
                  <ExamDetail style={{ width: "15%" }}>Date</ExamDetail>
                  <ExamDetail style={{ width: "10%" }}>Start Time</ExamDetail>
                  <ExamDetail style={{ width: "10%" }}>End Time</ExamDetail>
                  <ExamDetail style={{ width: "10%" }}>Duration</ExamDetail>
                  <ExamDetail style={{ width: "18%" }}>Status</ExamDetail>
                  <ExamDetail style={{ width: "10%" }}>Action</ExamDetail>
                </ExamlistContainer>
                {presentExams.length > 0 ? (
                  presentExams.map((exam) => {
                    const studentInfo = exam.students && exam.students.find(student => student.id === studentId);

                    // Check if the student with ID '1221' exists for the current exam
                    if (!studentInfo) {
                      console.warn(`Student with ID ${studentId} not found for exam with courseId ${exam.courseId}.`);
                      return null; // Skip rendering this exam
                    }
                    return (
                      <Examlist
                        key={exam.id}
                        courseId={exam.courseId}
                        examId={exam.examId}
                        examName={exam.name}
                        examDate={exam.startTime ? formatDateString(exam.startTime.toDate()) : ''}
                        examStartTime={exam.startTime ? exam.startTime.toDate().toLocaleTimeString() : ''}
                        examEndTime={exam.endTime ? exam.endTime.toDate().toLocaleTimeString() : ''}
                        examDuration={exam.duration}
                        examStatus={studentInfo ? studentInfo.status : 'Not available'}
                      />
                    );
                  })
                ) : (
                  <TableDescription>
                    Loading exams... {/* Add a loading indicator or message */}
                  </TableDescription>
                )}
              </OpenExams>
            ) : (
              <TableDescription>
                You do not currently have any open exams.{" "}
              </TableDescription>
            )}
          </ExamTableContainer>
          <ExamTableContainer>
            <TableTitle>Upcoming</TableTitle>
            {futureExams.length > 0 ? (
              <OpenExams>
                <ExamlistContainer>
                  <ExamDetail style={{ width: "20%" }}>Name</ExamDetail>
                  <ExamDetail style={{ width: "15%" }}>Date</ExamDetail>
                  <ExamDetail style={{ width: "20%" }}>Start Time</ExamDetail>
                  <ExamDetail style={{ width: "20%" }}>End Time</ExamDetail>
                  <ExamDetail style={{ width: "20%" }}>Duration</ExamDetail>
                </ExamlistContainer>
                {futureExams.map((upcomingexam) => (
                  <Upcomingexamlist
                  courseId={upcomingexam.courseId}
                  examId={upcomingexam.examId}
                  examName={upcomingexam.name}
                  examDate={upcomingexam.startTime ? formatDateString(upcomingexam.startTime.toDate()) : ''}
                  examStartTime={upcomingexam.startTime ? upcomingexam.startTime.toDate().toLocaleTimeString() : ''}
                  examEndTime={upcomingexam.endTime ? upcomingexam.endTime.toDate().toLocaleTimeString() : ''}
                  examDuration={upcomingexam.duration}
                  />
                ))}
              </OpenExams>
            ) : (
              <TableDescription>
                You do not currently have any upcoming exams.{" "}
              </TableDescription>
            )}
          </ExamTableContainer>
          <ExamTableContainer>
            <TableTitle>Past</TableTitle>
            {pastExams.length > 0 ? (
              <OpenExams>
                <ExamlistContainer>
                  <ExamDetail style={{ width: "20%" }}>Name</ExamDetail>
                  <ExamDetail style={{ width: "15%" }}>End Date</ExamDetail>
                  <ExamDetail style={{ width: "32%" }}>
                    Submission Time
                  </ExamDetail>
                  <ExamDetail style={{ width: "18%" }}>Status</ExamDetail>
                  <ExamDetail style={{ width: "10%" }}>Result</ExamDetail>
                </ExamlistContainer>
                {pastExams.length > 0 ? (
                  pastExams.map((closedexam) => {
                    const studentInfo = closedexam.students && closedexam.students.find(student => student.id === studentId);

                    // Check if the student with ID '1221' exists for the current exam
                    if (!studentInfo) {
                      console.warn(`Student with ID ${studentId} not found for exam with courseId ${closedexam.courseId}.`);
                      return null; // Skip rendering this exam
                    }
                    return (
                      <Pastexamlist
                        courseId={closedexam.courseId}
                        examId={closedexam.examId}
                        examName={closedexam.name}
                        examEndDate={closedexam.endTime ? formatDateString(closedexam.endTime.toDate()) : ''}
                        examSubmissionTime={studentInfo && studentInfo.submissionTime ? studentInfo.submissionTime.toDate().toLocaleTimeString() : ''}
                        examStatus={studentInfo ? studentInfo.status : 'Not available'}
                        
                      />
                    );
                  })
                ) : (
                  <TableDescription>
                    Loading exams... {/* Add a loading indicator or message */}
                  </TableDescription>
                )}
              </OpenExams>
            ) : (
              <TableDescription>
                You do not currently have any open exams.{" "}
              </TableDescription>
            )}
          </ExamTableContainer>
          <Footer />
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentExampage;
