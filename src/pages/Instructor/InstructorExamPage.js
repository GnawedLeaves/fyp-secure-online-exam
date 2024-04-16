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
import {updateDoc, deleteDoc } from "../../backend/firebase/firebase";

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
  const [editMode, setEditMode] = useState(false);
  const [currentExamId, setCurrentExamId] = useState(null);

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
  setExamData(prevExamData => [...prevExamData, newQuestion]); // Use functional update to ensure the latest state is used
  setNumQuestions(prevNumQuestions => prevNumQuestions + 1); // Increment numQuestions by 1
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

         // Sort exams by date in ascending order
        examsData.sort((a, b) => {
          // Extract the date part from the startTime
          const dateA = new Date(a.startTime.toDate().setHours(0, 0, 0, 0));
          const dateB = new Date(b.startTime.toDate().setHours(0, 0, 0, 0));
          // Compare dates
          return dateA - dateB;
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
      setCurrentExamId(examId);
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
        <br/>
        </div>
    ));
  };
  
//view question
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
      
      const examRef = await addDoc(collection(db, 'exams'), {
        startTime: Timestamp.fromDate(startTimeTime),
        endTime: Timestamp.fromDate(endTime),
        examDuration: examDuration,
        duration: durationText,
        courseId: courseId,
        name: name,
        examId: examId,
        status: 'Not Started',
        totalMCQ: examData.length,
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

//Editing view for the tutor
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const resetQuestions = () => {
    setQuestions([...examData]);
    setEditMode(false);
  };

  // Function to save changes or updates made by the tutor
const saveChanges = async () => {
  try {
    // Update existing questions in Firebase
    await Promise.all(questions.map(async (question, index) => {
      // If the question has an 'id', it means it already exists in Firestore and needs to be updated
      if (question.id) {
        const questionRef = doc(db, 'questions', question.id);
        await updateDoc(questionRef, {
          question: question.question,
          options: question.options,
          correct_answer: question.correct_answer
        });
      } else {
        // If the question does not have an 'id', it means it's a new question and needs to be added to Firestore
        const newQuestionFirestore = {
          examId: currentExamId,
          questionNumber: index + 1,
          question: question.question,
          options: question.options,
          correct_answer: question.correct_answer
        };
        const newQuestionRef = await addDoc(collection(db, 'questions'), newQuestionFirestore);
        console.log('New question added to Firestore with ID:', newQuestionRef.id);
      }
    }));

    console.log('Questions updated successfully');

    const totalMCQ = questions.length;
    console.log('number of mcq: ', totalMCQ)

  const examsSnapshot = await getDocs(collection(db, 'exams'));
      examsSnapshot.forEach(async (doc) => {
        const examData = doc.data();
        if (examData.examId === currentExamId) {
          const examRef = doc.ref;
          await updateDoc(examRef, { 
            totalMCQ: totalMCQ,
            sections: [
              {
                description: `MCQ (${totalMCQ}) questions`,
                section: 'A',
                weightage: '100',
              }
            ]
          });
          console.log(`TotalMCQ updated for exam with ID ${doc.id}`);
        }
      });
      
      setEditMode(false); // Exit edit mode after saving changes
    } catch (error) {
      console.error('Error updating questions:', error);
    }
  };


useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'exams'), (snapshot) => {
    const examsData = [];
    snapshot.forEach((doc) => {
      const examData = doc.data();
      const startTime = examData.startTime.toDate(); // Convert Firestore Timestamp to Date object
      if (startTime >= new Date()) { // Only include exams from the current date onwards
        examsData.push({ id: doc.id, ...examData });
      }
    });
    setUpcomingExams(examsData);
    setLoading(false);
  });

  // Clean up the listener on component unmount
  return () => unsubscribe();
}, []); 



// Function to delete a specific question in edit view
const deleteQuestion = async (index) => {
  const confirmation = window.confirm("Are you sure you want to delete this question? This action cannot be undone.");
  
if(confirmation){
  try {
  const deletedQuestion = questions[index]; 
  const updatedQuestions = [...questions];
  updatedQuestions.splice(index, 1); 
  setQuestions(updatedQuestions); 

  await deleteDoc(doc(db, 'questions', deletedQuestion.id));
  console.log('Question deleted successfully from Firestore');

  const examId = deletedQuestion.examId;
  console.log('deletedId',examId);

  const examsSnapshot = await getDocs(query(collection(db, 'exams'), 
  where('examId', '==', examId)));

  examsSnapshot.forEach(async (doc) => {
    const examRef = doc.ref;
    const examData = doc.data();
    const updatedTotalMCQ = examData.totalMCQ - 1;
    const updatedSections = [...examData.sections]; // Create a copy of the sections array
    const sectionIndex = updatedSections.findIndex(section => section.section === 'A');
    
    // If the section with section === 'A' is found, update its description
    if (sectionIndex !== -1) {
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        description: `MCQ (${updatedTotalMCQ}) questions`
      };
    }
    await updateDoc(examRef, { totalMCQ: updatedTotalMCQ, sections: updatedSections });
    console.log(`TotalMCQ updated for exam with ID ${doc.id}`);
  });
  } catch (error) {
    console.error('Error deleting question from Firestore:', error);
  }
}
};

const handleAddNewQuestion = () => {
  // Add an empty question to the local state
  const newQuestion = {
    examId: currentExamId, //bring over the examId to this new question
    question: '',
    options: ['', '', '', ''],
    correct_answer: ''
  };

  const updatedQuestions = [...questions, newQuestion];

  setQuestions([...questions, newQuestion]);

  setNumQuestions(updatedQuestions.length); // Update the numQuestions state based on the length of the updated questions array
  console.log('New question added for examId:', currentExamId);
  console.log('Update Question number: ', updatedQuestions.length)
};

// Function to handle changes in question text edit view
const handleQuestionTextChange = (index, e) => {
  const updatedQuestions = [...questions];
  updatedQuestions[index].question = e.target.value;
  setQuestions(updatedQuestions);
};

// Function to handle changes in option text
const handleOptionTextChange = (questionIndex, optionIndex, e) => {
  const updatedQuestions = [...questions];
  updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
  setQuestions(updatedQuestions);
};

// Function to handle changes in correct answer
const handleNewAnswer = (questionIndex, e) => {
  const updatedQuestions = [...questions];
  updatedQuestions[questionIndex].correct_answer = e.target.value;
  setQuestions(updatedQuestions);
};

// Render editable fields based on edit mode
const renderEditableFields = () => {
  return questions.map((question, index) => (
    <div key={index}>
       <br></br>
       <label style={{ marginRight: '10px', fontSize: '17px' }}><strong>Question {index + 1}: </strong></label>
      <input
        style={{ fontSize: '17px' }}
        type="text"
        value={question.question}
        onChange={(e) => handleQuestionTextChange(index, e)}
      />
      <br></br>
      <br></br>

      <div style={{ display: 'flex', }}>
        <label style={{ marginRight: '10px' }}><strong>Options:</strong></label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionTextChange(index, optionIndex, e)}
             
            />
          ))}
        </div>
      </div>
      <br></br>
      <label style={{ fontSize: '18px' }}><strong>Correct Answer: </strong></label>
      <select style={{ fontSize: '17px' }} value={question.correct_answer} onChange={(e) => handleNewAnswer(index, e)}>
        {question.options.map((option, optionIndex) => (
          <option key={optionIndex} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={() => deleteQuestion(index)}
      style={{ marginLeft: '10px', fontSize: '17px' }}>Delete</button>
      <button onClick={() => handleAddNewQuestion(index)}
      style={{ marginLeft: '10px', fontSize: '17px' }}>Add</button>
      <br></br>
    </div>
  ));
};

const renderActionButtons = () => {
  if (editMode) {
    return (
      <>
        <br />
        <button style={{ fontSize: '17px' }} onClick={saveChanges}>Save</button>
        <button style={{  marginLeft: '10px', fontSize: '17px' }} onClick={toggleEditMode}>Cancel</button>
      </>
    );
  } else {
    return <button onClick={toggleEditMode}>Edit</button>;
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
      <label style={{ fontSize: '16px', fontWeight: 'bold', }}>Course ID: </label>
      <QuestionInput type="text" value={courseId} onChange={(e) => setCourseId(e.target.value)} placeholder="Enter Course Code" required style={{ width: '140px', }}></QuestionInput>
      <br></br>
      <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Name: </label>
      <QuestionInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Exam Title" required style={{ width: '140px', }}></QuestionInput>
      <br/>
  
      <SetExamTableContainer>
          <SetExamTableRow>
            <SetExamTableData>
            <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Date: </label>
      <QuestionInput type="date" value={startTime} onChange={(e) => setstartTime(e.target.value)} min={getMinDate()} required></QuestionInput>

        </SetExamTableData>

        <SetExamTableData>

        </SetExamTableData>
        <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Time: </label>
      <QuestionInput type="time" value={examTime} onChange={(e) => setExamTime(e.target.value)} required></QuestionInput>
      <br></br>
          </SetExamTableRow>

          <SetExamTableRow>

          <SetExamTableData>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Number of Questions: </label>
      <QuestionInput type="number" value={numQuestions} onChange={handleNumQuestionsChange} style={{ width: '140px', }} ></QuestionInput>{errorMsg && <ErrorText>{errorMsg}</ErrorText>}
 
          </SetExamTableData>

          <SetExamTableData>

          </SetExamTableData>
          <label style={{ fontSize: '16px', fontWeight: 'bold' }}>Exam Duration: </label>
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
          <label style={{ fontSize: '18px', marginBottom: '5px' }}>Question <strong>{index + 1}</strong>:</label>
          <input type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(index, e)} required style={{ fontSize: '17px', marginBottom: '5px' }} />
          <button onClick={() => handleDeleteQuestion(index)}style={{ marginLeft: '20px' }}>Delete</button>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label style={{ fontSize: '18px' }}>Option {String.fromCharCode(65 + optionIndex)}:</label>
              <input type="text" value={option} onChange={(e) => handleOptionChange(index, optionIndex, e)} required style={{ fontSize: '17px', marginBottom: '5px' }} />
            </div>
          ))}
          <br></br>

          <label style={{ fontSize: '18px' }}>Correct Answer:</label>
          <select value={question.correct_answer} onChange={(e) => handleCorrectAnswerChange(index, e)} style={{ fontSize: '18px' }}>
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
            handleModalClose={() => 
              {resetQuestions();
              setShowModal(false);
            }}

            actionButtonText="OK"
            actionButtonColor={theme.primary}
            actionButtonClick={() => {}}
            modalTitle="Exam Questions"
            
            modalContent={
              <>
                {editMode ? renderEditableFields() : formatQuestionsForModal(questions)}
                {renderActionButtons()}
              </>
            }// Pass the questions array here
            
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
