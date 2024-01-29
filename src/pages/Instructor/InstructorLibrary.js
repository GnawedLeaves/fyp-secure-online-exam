import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";


//modal without npm install react-modal
const CustomModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  width: 35%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ModalOverlay onClick={onClose} />
      <CustomModalContainer>
        {children}
        <button onClick={onClose}>Close Modal</button>
      </CustomModalContainer>
    </>
  );
};


//main
const InstructorLibrary =() => {

  const modulesData = [
    { _id: 'module1', name: 'Web App Design' },
    { _id: 'module2', name: 'Database System' },
    { _id: 'module3', name: 'Software Engineering' },
  ];

  const [selectedModule, setSelectedModule] = useState(null);

  const [selectedExam, setSelectedExam] = useState(null);

  //for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const examsData = [
    { _id: 'exam1', moduleId: 'module1', examTitle: 'Web App 1', examDate: '2022-03-15', numQuestions: 5, examDuration: 60 },
    { _id: 'exam2', moduleId: 'module1', examTitle: 'Web App 2', examDate: '2022-04-20', numQuestions: 8, examDuration: 45 },
    { _id: 'exam3', moduleId: 'module1', examTitle: 'Web App 3', examDate: '2022-05-10', numQuestions: 10, examDuration: 75 },
    { _id: 'exam4', moduleId: 'module1', examTitle: 'Web App 4', examDate: '2022-06-01', numQuestions: 7, examDuration: 55 },
    { _id: 'exam5', moduleId: 'module1', examTitle: 'Web App 5', examDate: '2022-07-15', numQuestions: 6, examDuration: 70 },
    { _id: 'exam6', moduleId: 'module2', examTitle: 'Database Quiz 1', examDate: '2022-08-10', numQuestions: 8, examDuration: 50 },
    { _id: 'exam7', moduleId: 'module2', examTitle: 'Database Quiz 2', examDate: '2022-09-05', numQuestions: 12, examDuration: 65 },
    { _id: 'exam8', moduleId: 'module2', examTitle: 'Database Quiz 3', examDate: '2022-10-20', numQuestions: 10, examDuration: 55 },
    { _id: 'exam9', moduleId: 'module3', examTitle: 'Software Mid Term 1', examDate: '2022-11-15', numQuestions: 6, examDuration: 40 },
    { _id: 'exam10', moduleId: 'module3', examTitle: 'Software Mid Term 2', examDate: '2022-12-10', numQuestions: 8, examDuration: 60 },
    
  ];

  const [selectedQuestions, setSelectedQuestions] = useState([]);

  //load to nodal. will be tied to database 
  const sampleQuestions = {
    exam0:[
    { questionId: 'q1', text: 'What is React?', options: ['A framework', 'A library', 'A programming language', 'An operating system'], correctAnswer: 1 },
    { questionId: 'q2', text: 'What is NTU?', options: ['Nanyang Tech Uni', 'Not Taken Up', 'Network Termination Unit', 'National Taiwan Uni'], correctAnswer: 0 },
    { questionId: 'q3', text: 'How are you?', options: ['Good', 'Very Good', 'Extremely Good', 'Gan Good'], correctAnswer: 0 },
  ], 

  exam1:[
    { questionId: 'q4', text: 'Testing?', options: ['1', '2', '3', '4'], correctAnswer: 1 },
    { questionId: 'q5', text: 'What is Node.js?', options: ['Frontend framework', 'Database system', 'Runtime environment', 'Programming language'], correctAnswer: 2 },
  ], 

  exam6:[
    { questionId: 'q6', text: 'Testing?', options: ['1', '2', '3', '4'], correctAnswer: 1 },
    { questionId: 'q7', text: 'What is Node.js?', options: ['Frontend framework', 'Database system', 'Runtime environment', 'Programming language'], correctAnswer: 2 },
    { questionId: 'q3', text: 'How are you?', options: ['Good', 'Very Good', 'Extremely Good', 'Gan Good'], correctAnswer: 0 },
  ], 
  };

  const handleModuleClick = (moduleId) => {
    setSelectedModule(moduleId);
    setSelectedExam(null);
  };

  const handleExamClick = (examId) => {
    setSelectedExam(examId);
  };

  const handleNumQuestionsClick = (numQuestions) => {
    // navigation or when numQuestions is clicked, show the question. will link to database later on
    console.log("selectedExam:", selectedExam);
   //demo fetch questions from database but here we fetch from sampleQuestions
   const questions = sampleQuestions[selectedExam] || [];
   setSelectedQuestions(questions);

   //open modal
   const selectedQuestionsSubset = questions.slice(0, numQuestions);
    setIsModalOpen(true);
   setSelectedQuestions(selectedQuestionsSubset);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (

    <ThemeProvider theme={theme}>
      <InstructorHomeContainer>
        <Navbar linksArray={instructorNavBarItems}/>
        <InstructorDashboardContainer>
          <PageTitleInstructor>View All Exams</PageTitleInstructor>
          <br></br>
    
        {modulesData.map((module) => (
          <button key={module._id} onClick={() => handleModuleClick(module._id)} className={selectedModule === module._id ? 'active' : ''}
          style={{
            background: "#4caf50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "18px",
            margin: "6px",
          }}>
            {module.name}
          </button>
        ))}
      
      {selectedModule && (
        <div>
          <h3>Module: {modulesData.find((module) => module._id === selectedModule)?.name}</h3>
          <ul>
                {examsData
                  .filter((exam) => exam.moduleId === selectedModule)
                  .map((exam) => (
                    <li key={exam._id} onClick={() => handleExamClick(exam._id)} className={selectedExam === exam._id ? 'active' : ''}
                    style={{padding: '10px', }}
                    >
                      <p style={{ fontWeight: 'bold' }}>Exam Title: {exam.examTitle}</p>
                      
                      <p style={{ textDecoration: 'underline' }}>Date: {exam.examDate}</p>

                      <p>Number of Questions:{" "}
                      <span style={{textDecoration: 'underline',cursor: 'pointer',}}
                            onClick={() => handleNumQuestionsClick(exam.numQuestions)}
                          >
                            {exam.numQuestions}
                          </span>
                        </p>

                      <p>Exam Duration: {exam.examDuration} minutes</p>
                    </li>
                  ))}
              </ul>

              {selectedExam && selectedQuestions.length > 0 && (
                <div>
                  <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                  <h4>Selected Exam Questions</h4>
                  <ul>
                    {selectedQuestions.map((question) => (
                      <li key={question.questionId}>
                        <p>{question.text}</p>
                        <ul>
                          {question.options.map((option, index) => (
                            <li key={index} style={{ listStyleType: 'circle' }}>
                              {option}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  </CustomModal>
                </div>
              )}

        </div>
      )}

        </InstructorDashboardContainer>
      </InstructorHomeContainer>
    </ThemeProvider>
  );
};

export default InstructorLibrary
