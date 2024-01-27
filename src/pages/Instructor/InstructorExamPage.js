import React from "react";
import { useState } from 'react';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { InstructorDashboardContainer, InstructorHomeContainer, NavItem, SetExamTableContainer, SetExamTableData, SetExamTableRow } from "./InstructorStyle";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";

const ExamContainer = styled.div`
  // width: 90%;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
`;

const ExamTitle = styled.h3`
  margin-bottom: 10px;
`;

const ExamDescription = styled.p`
  font-size: 16px;
`;

const ExamButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 10px;
`;


// Exam form setting for mcq
const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const QuestionInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const AnswerInput = styled.input`
  margin-bottom: 5px;
  padding: 8px;
  font-size: 16px;
`;



const InstructorExamPage =() => {
  const [activeContent, setActiveContent] = useState('setExam');
  const [isExamFormActive, setIsExamFormActive] = useState(false);

  const handleSetActiveContent = (content) => {
    setActiveContent(content);
    setIsExamFormActive(false);
  };
  
  // setting of exams form format
  const [examDetails, setExamDetails] = useState({
    examTitle: '',
    numQuestions: '1',
    questions: Array(1).fill({ question: '', choices: Array(4).fill(''), correctAnswer: [0] }),
    examDate: '',
    examStartTime: '',
    examDuration: '',
  });

  const handleInputChange = (e, questionIndex, choiceIndex) => {
    const { name, value, type } = e.target;
  
    if (name === "numQuestions") {
      setExamDetails((prevExamDetails) => {
        const numQuestions = parseInt(value, 10) || 0;
        const questions = Array(numQuestions).fill({
          question: "",
          choices: Array(4).fill(""),
          correctAnswer: [],
        });
  
        return {
          ...prevExamDetails,
          numQuestions,
          questions,
        };
      });
    
      //initially was else if (type === 'text'), but enter exam title was unable to key in any data
      //By checking if the name includes 'question' or 'choice', you ensure that the text type inputs for both questions and choices are handled correctly. 
      //Update this part of your code and it should allow you to input text into the 'Enter Exam Title' field. Here's the modified code:
    } else if (name.includes('question') || name.includes('choice')) {
        setExamDetails((prevExamDetails) => {
          const updatedQuestions = [...prevExamDetails.questions];
          const updatedQuestion = { ...updatedQuestions[questionIndex] };
    
          if (name.includes('question')) {
            updatedQuestion.question = value;
          } else if (name.includes('choice')) {
            // Create a new array for choices to avoid sharing references
            updatedQuestion.choices = [...updatedQuestion.choices];
            updatedQuestion.choices[choiceIndex] = value;
            
          }
    
          updatedQuestions[questionIndex] = updatedQuestion;
    
          return {
            ...prevExamDetails,
            questions: updatedQuestions,
          };
        });
      } else if (type === 'checkbox') {
        setExamDetails((prevExamDetails) => {
          const updatedQuestions = [...prevExamDetails.questions];
          const updatedQuestion = { ...updatedQuestions[questionIndex] };
          const isChecked = e.target.checked;
    
          if (isChecked) {

            // this part create a new array for correctAnswer to avoid sharing references. previous mistake.
            updatedQuestion.correctAnswer = [...updatedQuestion.correctAnswer, choiceIndex];
          } 
          else {
            updatedQuestion.correctAnswer = updatedQuestion.correctAnswer.filter(i => i !== choiceIndex);
          }
    
          updatedQuestions[questionIndex] = updatedQuestion;
    
          return {
            ...prevExamDetails,
            questions: updatedQuestions,
          };
        });
      } 
      else {
        setExamDetails((prevExamDetails) => ({
          ...prevExamDetails,
          [name]: value,
        }));
      }
    };
  
  //For future connecting to database use.
  const handleSetExam = (e) => {
    e.preventDefault();

    // Add logic to send exam details to the database
    console.log('Set Exam Details:', examDetails);
    setIsExamFormActive(true); //Set flag true when button is clicked
    setActiveContent('examForm');
    
  };

return (
  <ThemeProvider theme={theme}>
    <InstructorHomeContainer>
      <Navbar linksArray={instructorNavBarItems} />
      <InstructorDashboardContainer>
        
        <NavItem
          active={activeContent === "setExam" || activeContent === "examForm"}
          onClick={() => handleSetActiveContent("setExam")}
        >
          Set Exam
        </NavItem>

        <NavItem
          active={activeContent === "viewExams"}
          onClick={() => handleSetActiveContent("viewExams")}
        >
          View Exams
        </NavItem>

        {activeContent === "setExam" && (
          <ExamContainer>
            <ExamTitle>Set New Exam</ExamTitle>
            <ExamDescription>

              Provide details to set a new exam.
            </ExamDescription>

            <ExamButton onClick={() => setActiveContent("examForm")}>
              Set Exam
            </ExamButton>
          </ExamContainer>
        )}
          
          
          {/* Setting of exams forms */}
        {activeContent === "examForm" && (
          
          <QuestionForm onSubmit={handleSetExam}
          >
            <ExamButton onClick={() => setActiveContent("setExam")}
            style={{width: '10%'}}>
              Back
            </ExamButton>
            <br></br>


      <label htmlFor="examTitle"
        style={{ fontSize: '16px', fontWeight: 'bold' }}>Enter Exam Title:
      </label>
      <QuestionInput
        type="text"
        name="examTitle"
        placeholder="Enter Exam Title"
        value={examDetails.examTitle}
        onChange={(e) => handleInputChange(e)}
        style={{ width: '22%' }}
        required
      />

      {/* table to contain the following set of options */}
      
      <SetExamTableContainer>
          <SetExamTableRow>
            <SetExamTableData>
            <label htmlFor="examDate"
        style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}>Set Exam Date:
      </label>
      <QuestionInput
        type="date"
        name="examDate"
        placeholder="Select Exam Date"
        value={examDetails.examDate}
        onChange={(e) => handleInputChange(e)}
        required
      />
        </SetExamTableData>

        <SetExamTableData>

        </SetExamTableData>
        <label htmlFor="examStartTime"
        style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}>Set Exam Start Time: 
      </label>
      <QuestionInput
        type="time"
        name="examStartTime"
        placeholder="Enter Exam Start Time (24hr format)"
        value={examDetails.examStartTime}
        onChange={(e) => handleInputChange(e)}
        required
      />
          </SetExamTableRow>

          <SetExamTableRow>

          <SetExamTableData>
          <label htmlFor="examQuestionsNumber"
        style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px', width:'92px', }}>Set No. of Questions:
      </label>
      <QuestionInput
        type="number"
        name="numQuestions"
        placeholder="Number of Questions"
        value={examDetails.numQuestions}
        onChange={(e) => handleInputChange(e)}
        required
      />
          </SetExamTableData>

          <SetExamTableData>

          </SetExamTableData>
          <label htmlFor="examDuration"
        style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px'}}>Set Exam Duration:
      </label>
      <QuestionInput
        type="number"
        name="examDuration"
        placeholder="Enter in MINUTES ONLY"
        value={examDetails.examDuration}
        onChange={(e) => handleInputChange(e)}
        required
        style={{ width: '200px' }}
      />
          </SetExamTableRow>

      </SetExamTableContainer>


      {examDetails.questions.map((question, questionIndex) => (
  <div key={questionIndex}>
    <QuestionInput
      type="text"
      name={`question-${questionIndex}`}
      placeholder={`Enter Question ${questionIndex + 1}`}
      value={question.question}
      onChange={(e) => handleInputChange(e, questionIndex)}
      required
    />
    {question.choices.map((choice, choiceIndex) => (
      <div key={choiceIndex}>
        <AnswerInput
          type="text"
          name={`choice-${questionIndex}-${choiceIndex}`}
          placeholder={`Enter Answer ${choiceIndex + 1}`}
          value={choice}
          onChange={(e) => handleInputChange(e, questionIndex, choiceIndex)}
          required
        />
        <input
          type="checkbox"
          name={`correctAnswer-${questionIndex}-${choiceIndex}`}
          checked={question.correctAnswer.includes(choiceIndex)}
          onChange={(e) => handleInputChange(e, questionIndex, choiceIndex)}
        />
        <label>Correct Answer</label>
      </div>
    ))}
  </div>
))}
      
      <ExamButton type="submit"
      style={{width: '10%',
      display: 'block',
      margin: '0 auto',
      cursor: 'pointer',
      textAlign: 'center',
    }}
      
      >Set Exam</ExamButton>
      
    </QuestionForm>
        )}


        {activeContent === "viewExams" && (
          <ExamContainer>
            <ExamTitle>Current Exams</ExamTitle>
            <ExamDescription>
              There are No Upcoming Examinations.
            </ExamDescription>

          </ExamContainer>
          
        )}

      </InstructorDashboardContainer>
    </InstructorHomeContainer>
  </ThemeProvider>
);
};

export default InstructorExamPage;