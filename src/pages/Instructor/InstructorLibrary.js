import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { BackButton, CloseButton, CustomModalContainer,InstructorDashboardContainer, InstructorHomeContainer, NavItem, PageTitleInstructor, SetExamTableContainer, SetExamTableData, SetExamTableRow, XButton,ModalOverlay, } from "./InstructorStyle";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
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

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ThStyle = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TdStyle = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
`;

const formatDate = (date) => {
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric',
    hour12: true // Display time in 12-hour format
  };
  return new Date(date.toDate()).toLocaleDateString('en-GB', options);
};

//Modal to display the questions
const ExamDetailModal = ({ isOpen, onClose, questions }) => (
  <CustomModal isOpen={isOpen} onClose={onClose}>
    <XButton onClick={onClose} title="Close">X</XButton>
    <h2>Exam Questions</h2>
    <ul>
      {questions.map((questionItem, index) => (
        <li key={index}>
          <h4>Question {index + 1}: {questionItem.question} </h4>
          
          <ul>
            {questionItem.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                {option === questionItem.correct_answer ? (
                  <strong><u>{option}</u></strong>
                ) : (
                  option
                )}
                {option === questionItem.correct_answer && (
                  <strong>(Correct)</strong>)}
                </li>
            ))}
          </ul>
          <p>
              {/* correct answer:<space> */}
            Correct Answer: {" "} 
            <strong><u>{questionItem.correct_answer}</u></strong>
            </p>
        </li>
      ))}
    </ul>
  </CustomModal>
);

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <CustomModalContainer>
        {children}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </CustomModalContainer>
    </>
  );
};

const InstructorLibrary = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleExams, setModuleExams] = useState({});
  const [courseId, setCourseId] = useState([]);
  const [activeContent, setActiveContent] = useState("moduleList");

  const [selectedExamQuestions, setSelectedExamQuestions] = useState([]);
  const [examDetailModalOpen, setExamDetailModalOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);


  useEffect(() => {
    const fetchcourseIds = async () => {
      try {
        const examsRef = collection(db, "exams");
        const querySnapshot = await getDocs(examsRef);
        const uniquecourseIds = new Set();
        
        querySnapshot.forEach((doc) => {
          
          const data = doc.data();
          console.log("Document data:", data);

          const courseId = data.courseId;
          console.log("Extracted Course ID:", courseId);
          uniquecourseIds.add(courseId);

        });

        setCourseId(Array.from(uniquecourseIds));

        console.log("Fetched Module IDs:", Array.from(uniquecourseIds));
      } catch (error) {
        console.error("Error fetching module IDs:", error);
      }
    };

    fetchcourseIds();
  }, []);

//firebase get all the exams info
  useEffect(() => {
    const fetchExamsForModule = async (courseId) => {
      try {
        const examsRef = collection(db, "exams");
        const q = query(examsRef, where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);
        const exams = [];
        querySnapshot.forEach((doc) => {
          exams.push(doc.data());
        });

        console.log("Fetched exams:", exams);
        setModuleExams((prevExams) => ({ ...prevExams, [courseId]: exams }));
        console.log("Fetched Exams for Module:", courseId, exams);
      } catch (error) {
        console.error("Error fetching exams for module:", error);
      }
    };

    if (selectedModule) {
      fetchExamsForModule(selectedModule);
    }
  }, [selectedModule]);

  const handleModuleClick = async (courseId) => {
    setSelectedModule(courseId);
    setActiveContent("examsFor")
    console.log("Selected Module:", courseId);
    
    try {
      const examsRef = collection(db, "exams");
      const q = query(examsRef, where("courseId", "==", courseId));
      const querySnapshot = await getDocs(q);
      const exams = [];
      querySnapshot.forEach((doc) => {
        exams.push(doc.data());
      });
      setModuleExams((prevExams) => ({ ...prevExams, [courseId]: exams }));
    } catch (error) {
      console.error("Error fetching exams for module:", error);
    }
  };

  const handleBackButtonClick = () => {
    setSelectedModule(null); // Reset selected module
    setActiveContent("moduleList"); // Show module list
  };

  //force number to be pushed
  const fetchNumberExamsForModule = async (courseId) => { // Define fetchExamsForModule function
    try {
      const examsRef = collection(db, "exams");
      const q = query(examsRef, where("courseId", "==", courseId));
      const querySnapshot = await getDocs(q);
      const exams = [];
      querySnapshot.forEach((doc) => {
        exams.push(doc.data());
      });

      console.log("Fetched exams:", exams);
      setModuleExams((prevExams) => ({ ...prevExams, [courseId]: exams }));
      console.log("Fetched Exams for Module:", courseId, exams);
    } catch (error) {
      console.error("Error fetching exams for module:", error);
    }
  };


  //opening of modal for questions
  const handleExamFieldClick = async (examId) => {
    try {
      // Fetch questions for the selected exam from Firestore
      const questionsRef = collection(db, "questions");
      const q = query(questionsRef, where("examId", "==", examId));
      const querySnapshot = await getDocs(q);
      const questions = [];
      querySnapshot.forEach((doc) => {

        const { questionNumber, question, options, correct_answer } = doc.data();
        questions.push({ questionNumber,question, options, correct_answer });
      });

      console.log('questions:', questions)
      setSelectedExamQuestions(questions);
      setSelectedExamId(examId);
      setExamDetailModalOpen(true);
    } catch (error) {
      console.error("Error fetching questions for exam:", error);
    }
  };

  const handleCloseExamDetailModal = () => {
    setExamDetailModalOpen(false);
    setSelectedExamId(null);
  };



  return (
    <ThemeProvider theme={theme}>
      <InstructorHomeContainer>
        <Navbar linksArray={instructorNavBarItems}/>
        
        <InstructorDashboardContainer>

          <PageTitleInstructor>View All Exams</PageTitleInstructor>
          <br />

          {activeContent === "moduleList" && (
          <>
          <h2>Module List</h2>
          <ul>
          {courseId.length > 0 && courseId.map((courseId) => {
        
        const numExams = moduleExams[courseId] ? moduleExams[courseId].length : 0;
        if (numExams === 0) {
          //fetech exam data for this courseID
          fetchNumberExamsForModule(courseId);
        }
        
        return (
              <li 
                key={courseId} 
                onClick={() => handleModuleClick(courseId)}
                style={{
                  marginBottom: '30px',
                  height: 'auto',
                  width:'250px',
                }}
              >
                <a href="#">{`${courseId} (${numExams})`}</a>
              </li>
            );
          })}
        </ul>
      </>
    )}

          {activeContent === "examsFor" && selectedModule && moduleExams[selectedModule] && (
            <>

          <BackButton onClick={handleBackButtonClick}>Back</BackButton>
          {selectedModule && moduleExams[selectedModule] ? (
              <div>
                <h2>Exams for {selectedModule}</h2>
                <TableStyle>
                  <thead>
                    <tr>
                      <ThStyle>Course ID</ThStyle>
                      <ThStyle>Name</ThStyle>
                      <ThStyle>Start Time</ThStyle>
                      <ThStyle>Duration</ThStyle>
                      <ThStyle>End Time</ThStyle>
                      <ThStyle>Number of Questions</ThStyle>
                    </tr>
                  </thead>
                  <tbody>
                    {moduleExams[selectedModule].map((exam) => (
                      <tr key={exam.examId}>
                        <TdStyle>{exam.courseId}</TdStyle>
                        <TdStyle>{exam.name}</TdStyle>
                        <TdStyle onClick={() => handleExamFieldClick(exam.examId)} style={{ cursor: 'pointer' }}>{formatDate(exam.startTime)}</TdStyle>
                        <TdStyle>{exam.duration}</TdStyle>
                        <TdStyle onClick={() => handleExamFieldClick(exam.examId)} style={{ cursor: 'pointer' }}>{formatDate(exam.endTime)}</TdStyle>
                        <TdStyle onClick={() => handleExamFieldClick(exam.examId)} style={{ cursor: 'pointer' }}>{exam.sections[0].description.match(/\d+/)}</TdStyle>
                      </tr>
                    ))}
                  </tbody>
                </TableStyle>
              </div>
            ) : (
              <p>No exams found for {selectedModule}</p>
            )}
          </>
          )}
          </InstructorDashboardContainer>
          {examDetailModalOpen && (
            <ExamDetailModal isOpen={examDetailModalOpen} onClose={handleCloseExamDetailModal} questions={selectedExamQuestions} />
          )}
      </InstructorHomeContainer>
    </ThemeProvider>
  );
};

export default InstructorLibrary;
