import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";




const InstructorLibrary =() => {

  const modulesData = [
    { _id: 'module1', name: 'Web App Design' },
    { _id: 'module2', name: 'Database System' },
    { _id: 'module3', name: 'Software Engineering' },
  ];

  const [selectedModule, setSelectedModule] = useState(null);

  const [selectedExam, setSelectedExam] = useState(null);

  const examsData = [
    { _id: 'exam1', moduleId: 'module1', examTitle: 'Web App 1', examDate: '2022-03-15', numQuestions: 5, examDuration: 60 },
    { _id: 'exam2', moduleId: 'module2', examTitle: 'Database Quiz 1', examDate: '2022-04-20', numQuestions: 10, examDuration: 45 },
    { _id: 'exam3', moduleId: 'module3', examTitle: 'Software Mid Term 1', examDate: '2022-05-10', numQuestions: 8, examDuration: 75 },
  ];

  const handleModuleClick = (moduleId) => {
    setSelectedModule(moduleId);
    setSelectedExam(null);
  };

  const handleExamClick = (examId) => {
    setSelectedExam(examId);
  };

  return (

    <ThemeProvider theme={theme}>
      <InstructorHomeContainer>
        <Navbar linksArray={instructorNavBarItems}/>
        <InstructorDashboardContainer>
          <PageTitleInstructor>View All Exams</PageTitleInstructor>
          <br></br>
          
        {modulesData.map((module) => (
          <button key={module._id} onClick={() => handleModuleClick(module._id)} className={selectedModule === module._id ? 'active' : ''}>
            {module.name}
          </button>
        ))}
      
      {selectedModule && (
        <div>
          <h3>Module: {selectedModule}</h3>
          <ul>
                {examsData
                  .filter((exam) => exam.moduleId === selectedModule)
                  .map((exam) => (
                    <li key={exam._id} onClick={() => handleExamClick(exam._id)} className={selectedExam === exam._id ? 'active' : ''}>
                      <p>Exam Title: {exam.examTitle}</p>
                      <p>Date: {exam.examDate}</p>
                      <p>Number of Questions: {exam.numQuestions}</p>
                      <p>Exam Duration: {exam.examDuration} minutes</p>
                    </li>
                  ))}
              </ul>
        </div>
      )}

        </InstructorDashboardContainer>
      </InstructorHomeContainer>
    </ThemeProvider>
  );
};

export default InstructorLibrary