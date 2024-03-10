import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { InstructorDashboardContainer, InstructorHomeContainer, NavItem, SetExamTableContainer, SetExamTableData, SetExamTableRow } from "./InstructorStyle";
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
import InstructorModal from "../../components/Modal/InstructorModal";
import { v4 as uuidv4, } from 'uuid';


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
  width: 140px;
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const InstructorExamPage =() => {
  const [activeContent, setActiveContent] = useState('setExam');
  const [isExamFormActive, setIsExamFormActive] = useState(false);
  const [numQuestions, setNumQuestions] = useState(0);
  const [examData, setExamData] = useState([]);
  const [examDuration, setExamDuration] = useState('');
  const [startTime, setstartTime] = useState('');
  const [examTime, setExamTime] = useState('');
  const [courseId, setCourseId] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalContent, setModalContent] = useState(null); // State to manage modal content
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSetActiveContent = (content) => {
    setActiveContent(content);
    setIsExamFormActive(false);
  };

  const handleNumQuestionsChange = (e) => {
    // setNumQuestions(parseInt(e.target.value));
    const newNumQuestions = parseInt(e.target.value);
    if (newNumQuestions < 1) {
      setErrorMsg("Number of questions cannot be zero.");
    } else {
      setErrorMsg("");
      setNumQuestions(newNumQuestions);

      // Create an array with newNumQuestions elements
      const newExamData = Array.from(
        { length: newNumQuestions },
        () => ({ question: "", options: ["", "", "", ""], correct_answer: "" })
      );
      setExamData(newExamData);
    }
  };

  const handleAddQuestion = () => {
  const newQuestion = { question: '', options: ['', '', '', ''], correct_answer: '' };
  setExamData([...examData, newQuestion]);
  setNumQuestions(numQuestions + 1); 
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...examData];
    updatedQuestions.splice(index, 1);
    setExamData(updatedQuestions);
    setNumQuestions(numQuestions - 1);
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...examData];
    updatedData[index][name] = value;
    setExamData(updatedData);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const value = e.target.value;
    const updatedData = [...examData];
    updatedData[questionIndex].options[optionIndex] = value;
    setExamData(updatedData);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const value = e.target.value;
    const updatedData = [...examData];
    updatedData[questionIndex].correct_answer = value;
    setExamData(updatedData);
  };


  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // Add one day to today
    const minDate = today.toISOString().split('T')[0]; // Convert to yyyy-mm-dd format
    return minDate;
  };

  const formatDateInViewExams = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(date.toDate()).toLocaleDateString('en-GB', options);
  };

  const formatExamDuration = (value) => {
    // Remove any non-numeric characters
    const formattedValue = value.replace(/\D/g, '');

    //No longer than 4 digits
    if (formattedValue.length > 4) {
      return formattedValue.slice(0, 4);
    }

    // Value has 3 digits, insert colon in between
    if (formattedValue.length > 2) {
      return formattedValue.slice(0, 2) + ':' + formattedValue.slice(2);
    }
  
    return formattedValue;
  };
  
  //to display exam database from firebase to 'view exams' tab viewing of questions
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      try {
        const currentDate = new Date(); 
        const querySnapshot = await getDocs(collection(db, 'exams'));
        const examsData = [];
  
        querySnapshot.forEach((doc) => {
          const examData = doc.data();
          if (examData.startTime) { // Check if startTime exists
            const startTime = examData.startTime.toDate(); // Convert Firestore Timestamp to Date object
            if (startTime >= currentDate) { // Only include exams from the current date onwards
              examsData.push({ id: doc.id, ...examData });
            }
          }
        });
  
        setUpcomingExams(examsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exams: ', error);
        setLoading(false);
      }
    };
  
    if (activeContent === 'viewExams') {
      fetchExams();
    }
  }, [activeContent]);

  const handleViewQuestions = async (examId) => {
    try {
      const fetchedQuestions = await fetchQuestions(examId);
      console.log('Fetched Questions:', fetchedQuestions); // Log the fetched questions
      setShowModal(true);
      setQuestions(fetchedQuestions); // Set state with fetched questions
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  const formatQuestionsForModal = (questions) => {
    return questions.map((question, index) => (
      <div key={index}>
        <p><strong>Question {index + 1}:</strong> {question.question}</p>
        <p><strong>Options:</strong></p>
        <ul>
          {question.options.map((option, optionIndex) => (
            <li key={optionIndex}>{option}</li>
          ))}
        </ul>
        <p><strong>Correct Answer:</strong>  <span style={{ textDecoration: 'underline' }}>{question.correct_answer}</span></p>
      </div>
    ));
  };
 
  //   setModalContent(questions);
  

  const fetchQuestions = async (examId) => {
    try {
      const questionQuerySnapshot = await getDocs(query(collection(db, 'questions'), 
      where('examId', '==', examId)));
      
      const questionsData = [];
      questionQuerySnapshot.forEach((doc) => {
        questionsData.push(doc.data());
      });
      
      console.log('Questions:', questionsData);
      return questionsData;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return [];
    }
  };
  

  const examId = uuidv4();

  const handleSubmit = async () => {
    if (!startTime || !examTime || !examDuration) {
      setErrorMsg("Please provide exam date, time, and duration.");
      return;
    }
  
    const [hours, minutes] = examDuration.split(':').map(Number);
    const hoursText = hours > 0 ? `${hours} Hour${hours !== 1 ? 's' : ''}` : '';
    const minsText = minutes > 0 ? `${minutes} Min${minutes !== 1 ? 's' : ''}` : '';
    const durationText = `${hoursText}${hoursText && minsText ? ' ' : ''}${minsText}`;
  
    const startTimeTime = new Date(`${startTime}T${examTime}`);
    const endTime = new Date(startTimeTime.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000);
  
    try {
      // Create exam document
      const examRef = await addDoc(collection(db, 'exams'), {
        startTime: Timestamp.fromDate(startTimeTime),
        endTime: Timestamp.fromDate(endTime),
        examDuration: examDuration,
        duration: durationText,
        courseId: courseId,
        name: name,
        examId: examId,
        status: 'Not Started',
        sections: [
          {
            description: `MCQ (${examData.length}) questions`,
            section: 'A',
            weightage: '100',
          }
        ]
      });
      
      // Save questions and answers
      for (let i = 0; i < examData.length; i++) {
        const question = examData[i];
        
        // Create question document
        const questionRef = await addDoc(collection(db, 'questions'), {
          examId: examId,
          questionNumber: i + 1,
          question: question.question,
          options: question.options,
          correct_answer: question.correct_answer
        });
  
        // Create answers document
        await addDoc(collection(db, 'answers'), {
          examId: examId,
          question: question.question,
          answers: question.options.map((option, optionIndex) => ({
            option: option,
            isCorrect: option === question.correct_answer,
          }))
        });
      }
  
      console.log('Exam data, questions, and answers added to Firestore');
      
      //refresh windows
      window.location.reload();

      //setSuccessMessage(`Successfully created exam: ${courseId} - ${name}`);
      setShowSuccessModal(true);

    } catch (error) {
      console.error('Error adding exam data: ', error);
    }
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
          <div>
            <ExamButton onClick={() => setActiveContent("setExam")}>
              Back
            </ExamButton>

          <br></br>
          <br></br>
      <label style={{ fontSize: '16px', fontWeight: 'bold', }}>Course ID:</label>
      <QuestionInput type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} placeholder="Enter Course Code" required style={{ width: '140px', }}></QuestionInput>
      <br></br>
      <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Name:</label>
      <QuestionInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Exam Title" required style={{ width: '140px', }}></QuestionInput>
      <br/>
  
      <SetExamTableContainer>
          <SetExamTableRow>
            <SetExamTableData>
            <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Date:</label>
      <QuestionInput type="date" value={startTime} onChange={(e) => setstartTime(e.target.value)} min={getMinDate()} required></QuestionInput>

        </SetExamTableData>

        <SetExamTableData>

        </SetExamTableData>
        <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Time:</label>
      <QuestionInput type="time" value={examTime} onChange={(e) => setExamTime(e.target.value)} required></QuestionInput>
      <br></br>
          </SetExamTableRow>

          <SetExamTableRow>

          <SetExamTableData>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Number of Questions:</label>
      <QuestionInput type="number" value={numQuestions} onChange={handleNumQuestionsChange} style={{ width: '140px', }} ></QuestionInput>{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
 
          </SetExamTableData>

          <SetExamTableData>

          </SetExamTableData>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Duration:</label>
      <QuestionInput type="text" value={examDuration} onChange={(e) => setExamDuration(formatExamDuration(e.target.value))} placeholder="HH:MM" required style={{ width: '80px', }}></QuestionInput>

          </SetExamTableRow>

      </SetExamTableContainer>

      <button onClick={handleAddQuestion} 
      style={{width: '150px',
    }}
      >Set Questions</button>

      {examData.map((question, index) => (
        <div key={index}>
          <br></br>
          <label>Question <strong>{index + 1}</strong>:</label>
          <input type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(index, e)} required />
          <button onClick={() => handleDeleteQuestion(index)}style={{ marginLeft: '20px' }}>Delete</button>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Option {String.fromCharCode(65 + optionIndex)}:</label>
              <input type="text" value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)} required />
            </div>
          ))}
          <br></br>

          <label>Correct Answer:</label>
          <select value={question.correct_answer} onChange={(e) => handleCorrectAnswerChange(index, e)}>
            {question.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>{option}</option>
            ))}
          </select>
          
        </div>
      ))}

      
      <ExamButton
  onClick={() => {
    handleSubmit(); // Call handleSubmit directly here
    //setActiveContent("setExam"); // Additionally, set activeContent to "setExam"
  }}
>
  Set Exam
</ExamButton>
        <InstructorModal
              show={showSuccessModal}
              handleModalClose={() => setShowSuccessModal(false)}
              modalType="successExam"
              actionButtonText="OK"
              actionButtonColor={theme.primary}
              actionButtonClick={() => {}}
              modalTitle="Exam Created Successfully"
            />
</div>
        )}

        {activeContent === "viewExams" && (
          <ExamContainer>
            <ExamTitle>Current Exams</ExamTitle>
            {loading ? (
      <p>Loading...</p>
    ) : (
      <div>
        {upcomingExams.length > 0 ? (
          upcomingExams.map((exam) => (
            <div key={exam.id}>
              <ExamDescription>
               Course ID: <span style={{ fontWeight: 'bold' }}>{exam.courseId}</span><br />
               Exam Name: {exam.name}<br />
               Date: <span style={{ textDecoration: 'underline', fontWeight: 'bold' }}>{formatDateInViewExams(exam.startTime)}</span><br /> 
               Time: {exam.startTime.toDate().toLocaleTimeString()}<br />
               Number of Questions:{" "}
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleViewQuestions(exam.examId)}
                >
                  {exam.sections[0].description}
                  {/* {exam.sections[0].description.match(/\d+/)} */}
                </span>

              </ExamDescription>

            </div>
          ))
        ) : (
          <ExamDescription>There are No Upcoming Examinations.</ExamDescription>
        )}

          <InstructorModal
            show={showModal}
            handleModalClose={() => setShowModal(false)}
            actionButtonText="OK"
            actionButtonColor={theme.primary}
            actionButtonClick={() => {}}
            modalTitle="Exam Questions"
            modalContent={formatQuestionsForModal(questions)} // Pass the questions array here
            closingButtonText="Cancel"
            />
     </div>
    )}
          </ExamContainer>
        )}

      </InstructorDashboardContainer>
    </InstructorHomeContainer>
  </ThemeProvider>
);
};

export default InstructorExamPage;
