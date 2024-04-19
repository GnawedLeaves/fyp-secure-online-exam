import React, { useState, useEffect } from "react";
import {
  QuestionPageTitle,
  StudentHomePageContainer,
  StudentExamDetailContainer,
  QuestionContainer,
  QuestionSection,
  LeftContainer,
  RightContainer,
  QuestionGrid,
  QuestionRow,
  PageDescription,
  QuestionPageDescription,
  PageChoice,
  PageEnterSpace,
  QuestionLegend,
  LegendRow,
  LegendData,
  LegendBlueColor,
  LegendRedColor,
  LegendGreyColor,
  LegendText,
  ButtonContainer
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import  Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import  Timer from "../../components/Timer/Timer";
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import {
  FaClock
}from "react-icons/fa";
import Numberbox from "../../components/Numberbox/Numberbox";
import RadioButtonGroup from "../../components/student/RadioButtonGroup/RadioButtonGroup";
import { useParams } from "react-router-dom";
import { useRef } from "react"; 
import {
  doc,
  Timestamp,
  addDoc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"; 
import { db } from "../../backend/firebase/firebase";
import NumberFocusbox from "../../components/Numberbox/NumberFocusbox";
import UploadModal from '../../components/Modal/UploadModal';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appID, serverSecret } from "../../backend/zegocloud/zegocloud";

const StudentExamQuestionpage = () => {
  //const studentId = "1221";
  const [studentId, setStudent] = useState();
  const [authId, setAuthId] = useState(null);
  const [timerExpired, setTimerExpired] = useState(false);
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
  }, [authId]);

  const { examId, questionNo } = useParams();
  const examsRef = collection(db, "exams");
  const questionsRef = collection(db, "questions");
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answerArray, setAnswerArray] = useState([]);
  const [flagArray, setFlagArray] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [flag, setFlag] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const getExamDetail = async (examId) => {
    try {
      // Create a query to get all messages where recipientId matches
      const examsQuery = query(examsRef, where("examId", "==", examId));

      // Get the documents based on the query
      const querySnapshot = await getDocs(examsQuery);

      // Extract the data from the documents
      const examsData = querySnapshot.docs.map((doc) => ({
        examId: doc.examId,
        ...doc.data(),
      }));
      console.log("examData",examsData);

      return examsData;
    } catch (error) {
      console.error("Error getting exam detail:", error);
      return [];
    }
  };
  const getQuestionDetail = async (examId,questionNo) => {
    try {
      // Create a query to get all messages where recipientId matches
      const questionsQuery = query(questionsRef, 
        where("examId", "==", examId),
        where("questionNumber", "==", Number(questionNo))
      );

      // Get the documents based on the query
      const querySnapshot = await getDocs(questionsQuery);

      // Extract the data from the documents
      const questionsData = querySnapshot.docs.map((doc) => ({
        examId: doc.examId,
        ...doc.data(),
      }));
      console.log("questionsData",questionsData);

      return questionsData;
    } catch (error) {
      console.error("Error getting question detail:", error);
      return [];
    }
  };

  //updates the data array whenever the database changes
  const fetchExamData = async () => {
    try {
      const [examsData, questionsData, answerArray, flagArray] = await Promise.all([
        getExamDetail(examId),
        getQuestionDetail(examId, questionNo),
        getAnswerArray(studentId, examId),
        getFlagArray(studentId, examId),
      ]);
  
      setExams(examsData);
      setQuestions(questionsData);
      setAnswerArray(answerArray);
      setFlagArray(flagArray); 
      setSelectedOption(null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData = async () => {
    try {
      const examsData = await getExamDetail(examId);
      const questionsData = await getQuestionDetail(examId, questionNo);

      // Check if there is an existing answer record for the current student and exam
      const answersQuery = query(
        collection(db, "answers"),
        where("studentId", "==", studentId),
        where("examId", "==", examId)
      );

      const answersSnapshot = await getDocs(answersQuery);

      if (!answersSnapshot.empty) {
        const answersData = answersSnapshot.docs[0].data().answers;

        // Check if there is a saved answer for the current question
        const savedAnswer = answersData[questionNo - 1];

        if (savedAnswer !== null) {
          // Set the selectedOption state with the saved answer
          setSelectedOption(savedAnswer);
        }
      }

      setExams(examsData);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addCheatRecord = async (studentId, examId, description, alertType) => {
    try {
      const cheatCollection = collection(db, "cheating");
      const timestamp = Timestamp.fromDate(new Date());
  
      // Add a document to the 'cheat' collection
      await addDoc(cheatCollection, {
        studentId: studentId,
        examId: examId,
        description: description,
        alertType: alertType,
        dateCreatedAt: timestamp,
      });
  
      console.log("Cheat record added successfully!");
    } catch (error) {
      console.error("Error adding cheat record:", error);
    }
  };

  useEffect(() => {
    console.log("Visibility effect mounted");
  
    // Cross-browser function to get the visibility state
    const getVisibilityState = () => {
      return document.visibilityState || document.webkitVisibilityState || document.mozVisibilityState || document.msVisibilityState;
    };
  
    // Cross-browser event handler for visibility change
    const handleVisibilityChange = () => {
      console.log("Visibility changed:", document.visibilityState);
      setIsPageVisible(!document.hidden);
      setShowAlertModal(true);
    };
  
    // Set up event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    // Initialize visibility state
    setIsPageVisible(!document.hidden);
  
    // Clean up event listener when component unmounts
    return () => {
      console.log("Visibility effect unmounted");
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);


  useEffect(() => {
    fetchExamData();
    fetchData();
    
  }, [studentId, examId, questionNo]);
  
  const endTime = exams.length > 0 && exams[0]?.endTime?.toDate();

  if (endTime) {
    endTime.setHours(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds(), 0);
    
  } else {
    console.error('No valid exam data found or endTime is not defined.');
  }
  const navigate = useNavigate();
  const nextQuestion = async (studentId, examId, totalMCQ, questionNo, optionSelected) => {
    try {
      const currentQuestionNo = parseInt(questionNo, 10);
  
      await saveAnswerToDatabase(studentId, examId, totalMCQ, questionNo, optionSelected);
  
      // Navigate to the next question
      const nextQuestionNo = currentQuestionNo + 1;
      navigate(`/student/exam/${examId}/${nextQuestionNo}`);
    } catch (error) {
      console.error("Error saving/updating answer to the database:", error);
    }
  };
  const saveQuestion = async (studentId, examId, totalMCQ, questionNo, optionSelected) => {
    try {
      const currentQuestionNo = parseInt(questionNo, 10);
  
      await saveAnswerToDatabase(studentId, examId, totalMCQ, questionNo, optionSelected);
    } catch (error) {
      console.error("Error saving/updating answer to the database:", error);
    }
  };
  const reviewExam = async (studentId, examId, totalMCQ, questionNo, optionSelected) => {
    try {
      const currentQuestionNo = parseInt(questionNo, 10);
  
      await saveAnswerToDatabase(studentId, examId, totalMCQ, questionNo, optionSelected);
  
      await updateStudentStatusInExam(examId, studentId, "Submitted");

      // Navigate to the exam
      navigate(`/student/exam`);

      window.location.reload();
    } catch (error) {
      console.error("Error saving/updating answer to the database:", error);
    }
  };
  
  const saveAnswerToDatabase = async (studentId, examId, totalMCQ, questionNo, selectedOption ) => {
  
    try {
      if (!examId || !studentId) {
        console.error("Invalid examId or studentId");
        return;
      }

    // Create a reference to the answers collection
    const answersCollection = collection(db, "answers");

    // Check if there is an existing record for the provided studentId and examId
    const existingRecordQuery = query(
      answersCollection,
      where("studentId", "==", studentId),
      where("examId", "==", examId)
    );

    const [existingRecordSnapshot] = await Promise.all([getDocs(existingRecordQuery)]);

      // If there is an existing record, update it
      if (!existingRecordSnapshot.empty) {
        const existingRecordDoc = existingRecordSnapshot.docs[0];
        const existingRecordRef = doc(answersCollection, existingRecordDoc.id);

        // Retrieve the existing answers array
        const existingAnswers = existingRecordDoc.data().answers;

        // Update the answers array with the new optionSelected for the specific questionNo
        existingAnswers[questionNo - 1] = selectedOption;

        // Update the document in the "answers" collection
        await updateDoc(existingRecordRef, { answers: existingAnswers });
      } else {
        // If there is no existing record, create a new one with an array of null values
        const newAnswers = new Array(totalMCQ).fill(null);
        newAnswers[questionNo - 1] = selectedOption;

        await addDoc(answersCollection, {
          studentId,
          examId,
          answers: newAnswers,
        });
      }

      console.log("Answer saved successfully!");
      //console.log(studentId);
      //console.log(examId);
      //console.log(selectedOption);
    } catch (error) {
      console.error("Error saving answer:", error);
    }
  };
  
const getAnswerArray = async (studentId, examId) => {
  try {
    // Create a reference to the answers collection
    const answersCollection = collection(db, "answers");

    // Query to get the specific document for the provided studentId and examId
    const answersQuery = query(
      answersCollection,
      where("studentId", "==", studentId),
      where("examId", "==", examId)
    );

    // Get the documents based on the query
    const querySnapshot = await getDocs(answersQuery);

    // If there is a document, return the answers array
    if (!querySnapshot.empty) {
      const answerArray = querySnapshot.docs[0].data().answers;
      return answerArray;
    }

    // If no document is found, return an empty array or handle it as needed
    return [];
  } catch (error) {
    console.error("Error getting answerArray:", error);
    return [];
  }
};

const updateStudentStatusInExam = async (examId, studentId, status) => {
  try {
    const examsRef = collection(db, "exams");
    const examsQuery = query(examsRef, where("examId", "==", examId));
    // Get the current exam documents based on the query
    const examSnapshot = await getDocs(examsQuery);

    // Check if there are any documents
    if (examSnapshot.empty) {
      console.warn(`No exams found for exam with examId ${examId}.`);
      return null;
    }

    // Access the first document in the snapshot
    const examDoc = examSnapshot.docs[0];
    // Access the data of the document
    const exam = examDoc.data();

    // Check if the student with ID exists for the current exam
    const studentInfo = exam.students && exam.students.findIndex(student => student.id === studentId);

    if (studentInfo === -1) {
      console.warn(`Student with ID ${studentId} not found for exam with examId ${examId}.`);
      return null; // Skip updating this exam
    }

    // Update the status for the specific student
    exam.students[studentInfo].status = status;
    exam.students[studentInfo].grade = "Not graded yet";
    exam.students[studentInfo].submissionTime = new Date();

    // Update the document in the "exams" collection
    await updateDoc(examDoc.ref, { students: exam.students });

    console.log("Student status updated successfully!");
  } catch (error) {
    console.error("Error updating student status in exam:", error);
  }
};



const saveFlagToDatabase = async (studentId, examId, totalMCQ, questionNo, flagStatus) => {
  console.log(flagStatus);
  try {
    if (!Array.isArray(flagArray)) {
      console.error("Invalid flagArray:", flagArray);
      return;
    }

    if (!examId || !studentId) {
      console.error("Invalid examId or studentId");
      return;
    }

    // Create a copy of the current flagArray to avoid mutating the state directly
    const newFlagArray = [...flagArray];

    // Update the flag status for the specific questionNo
    newFlagArray[questionNo - 1] = flagStatus;

    // Update the state with the new flagArray
    setFlagArray(newFlagArray);
    console.log(newFlagArray);

    // Now, update the database with the new flag status
    const flagsCollection = collection(db, "flags");
    const existingFlagQuery = query(
      flagsCollection,
      where("studentId", "==", studentId),
      where("examId", "==", examId)
    );

    const [existingFlagSnapshot] = await Promise.all([getDocs(existingFlagQuery)]);

    // If there is an existing record, update it
    if (!existingFlagSnapshot.empty) {
      const existingFlagDoc = existingFlagSnapshot.docs[0];
      const existingFlagRef = doc(flagsCollection, existingFlagDoc.id);

      await updateDoc(existingFlagRef, { flags: newFlagArray });
    } else {
      const newFlags = new Array(totalMCQ).fill(null);
      newFlags[questionNo - 1] = flagStatus;

      await addDoc(flagsCollection, {
        studentId,
        examId,
        flags: newFlags,
      });
    }

    console.log("Flag status saved successfully!");
  } catch (error) {
    console.error("Error saving flags:", error);
  }
};


const getFlagArray = async (studentId, examId) => {
  try {
    // Create a reference to the flags collection
    const flagsCollection = collection(db, "flags");

    // Query to get the specific document for the provided studentId and examId
    const flagsQuery = query(
      flagsCollection,
      where("studentId", "==", studentId),
      where("examId", "==", examId)
    );

    // Get the documents based on the query
    const querySnapshot = await getDocs(flagsQuery);

    // If there is a document, return the flags array
    if (!querySnapshot.empty) {
      const flagArray = querySnapshot.docs[0].data().flags;
      return flagArray || []; // Return an empty array if flagArray is falsy
    }

    // If no document is found, return an empty array or handle it as needed
    return [];
  } catch (error) {
    console.error("Error getting flagArray:", error);
    return [];
  }
};

const navigateToQuestion = (exam,number) => {
  //  "/student/exam/:examId/:questionNo"
  
  navigate(`/student/exam/${exam}/${number}`);
};

useEffect(() => {
  console.log("Timer expired effect triggered:", timerExpired);

  if (timerExpired) {
    // Auto-save and auto-submit logic here
    console.log("Timer expired! Auto-saving and auto-submitting...");
    saveQuestion(studentId, examId, exams[0]?.totalMCQ, questionNo, selectedOption);
    reviewExam(studentId, examId, exams[0]?.totalMCQ, questionNo, selectedOption);
  }
}, [timerExpired, studentId, examId, exams, questionNo, selectedOption]);

const handleTimerTick = (remainingSeconds) => {
  // Optionally, you can perform actions on each tick of the timer
  console.log(`Time remaining: ${remainingSeconds} seconds`);
};

  const grid = [];

  for (let i = 0; i < Math.ceil(exams[0]?.totalMCQ / 5); i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      const currentNumber = 5 * i + j + 1;
      if (currentNumber <= exams[0]?.totalMCQ) {
        // Check if the current number is equal to the question number
        
        const isQuestionNumber = currentNumber === parseInt(questionNo, 10);

        const hasAnswer = answerArray[currentNumber - 1] !== null && answerArray[currentNumber - 1] !== undefined;
        const hasFlag = flagArray[currentNumber - 1] !== null && flagArray[currentNumber - 1] !== undefined && flagArray[currentNumber - 1] !== "false";
        // Push the appropriate component based on the condition
        row.push(
          isQuestionNumber ? (
            <NumberFocusbox number={currentNumber}  isFlagged={hasFlag} onClickFunction={() => navigateToQuestion(examId, currentNumber)}/>
          ) : (
            <Numberbox number={currentNumber} hasOption={hasAnswer} isFlagged={hasFlag} onClickFunction={() => navigateToQuestion(examId, currentNumber)}/>
          )
        );
      }
    }
    grid.push(<QuestionRow>{row}</QuestionRow>);
  }

  const myMeeting = async (element) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID, 
        serverSecret, 
        examId, 
        Date.now().toString(),
        studentId
    );
    
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    if(studentId){
      zc.joinRoom({
        showPreJoinView: false,
        container: element,
        scenario:{
            mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        turnOnMicrophoneWhenJoining: false,
        turnOnCameraWhenJoining: true,
        showTextChat: false,
        showUserList: false,
        lowerLeftNotification: {
            showUserJoinAndLeave: false,
            showTextChat: false
        },
        showPinButton: false,
        showLeavingView: false,
        showLeaveRoomConfirmDialog: false,
        showRoomDetailsButton: false,
        showMyCameraToggleButton: false,
        showMyMicrophoneToggleButton: false,
        showAudioVideoSettingsButton: false,
        showLayoutButton: false,
        showNonVideoUser: false,
        showScreenSharingButton: false,
        layout: "Sidebar",
      })
    }
    
};

  return (
      <ThemeProvider theme={theme}>
        <StudentHomePageContainer>
        <UploadModal
          handleModalClose={() => {
            setShowAlertModal(false);
          }}
          modalType="alert"
          actionButtonText="OK"
          actionButtonColor={theme.statusError}
          actionButtonClick={() => {
            addCheatRecord(studentId, examId, "Navigate to other windows/tabs", "medium");
          }}
          show={showAlertModal}
          modalTitle="Navigation Alert"
          modalContent="You are not allowed to navigate to other windows or tabs. This action will be recorded."
        />
        <UploadModal
        handleModalClose={() => {
          setShowSubmitModal(false);
        }}
        modalType="action"
        actionButtonText="Yes"
        actionButtonColor={theme.statusGood}
        actionButtonClick={() => {
          reviewExam(studentId, examId, exams[0]?.totalMCQ, questionNo, selectedOption);
        }}
        show={showSubmitModal}
        modalTitle="Submit Answer"
        modalContent="Are you sure you want to submit your answer? This action cannot be undone."
      />
          
          <StudentExamDetailContainer>
            <QuestionPageTitle>{exams[0]?.courseId} {exams[0]?.name}</QuestionPageTitle>
            <QuestionContainer>
            {exams.length > 0 && questions.length > 0 ? (
            <>
              <LeftContainer>
                <QuestionSection>
                  <QuestionPageDescription>Question {questions[0]?.questionNo} :</QuestionPageDescription>
                  <QuestionPageDescription>{questions[0]?.question} </QuestionPageDescription>
                  <PageEnterSpace/>
                  <PageChoice>
                      <RadioButtonGroup 
                        index={questions[0]?.questionNo} 
                        options={questions[0]?.options} 
                        onChange={(option) => setSelectedOption(option)}
                        selectedOption={selectedOption}
                      />
                  </PageChoice>
                </QuestionSection>
              </LeftContainer>
              <RightContainer>
                <FaClock style={{ float: 'left', marginTop: '3px' }} />
                <Timer endTime={endTime} onTimerTick={handleTimerTick} setTimerExpired={setTimerExpired} />
                <QuestionGrid>{grid}</QuestionGrid>
              </RightContainer>
            </>
            ) : (
              <p>Loading...</p> // or any other message you want to show while data is being loaded
            )}
            </QuestionContainer>
            <QuestionContainer>
              <LeftContainer>
                <ButtonContainer>
                  <Button 
                    defaultColor={theme.primary} 
                    filledColor={theme.primary} 
                    filled={false} 
                    onClick={() => {
                      if (parseInt(questionNo, 10) < exams[0]?.totalMCQ) {
                        nextQuestion(studentId, examId, exams[0]?.totalMCQ, questionNo, selectedOption);
                      } else {
                        saveQuestion(studentId, examId, exams[0]?.totalMCQ, questionNo, selectedOption);
                      }
                    }}
                  >
                    {parseInt(questionNo, 10) < exams[0]?.totalMCQ ? 'Save & Next' : 'Save'}
                  </Button>
                  <Button 
                    defaultColor={theme.primary} 
                    filledColor={theme.primary} 
                    filled={false} 
                    onClick={() => {
                        setShowSubmitModal(true);
                    }}
                  >Submit
                  </Button>
                  <Button 
                    defaultColor={theme.primary} 
                    filledColor={theme.primary} 
                    filled={false} 
                    onClick={() => {
                      if (flagArray[questionNo-1] =="true" ) {
                        saveFlagToDatabase(studentId, examId, exams[0]?.totalMCQ, questionNo, "false");
                      } else {
                        saveFlagToDatabase(studentId, examId, exams[0]?.totalMCQ, questionNo, "true");
                      }
                    }}
                  >
                    {flagArray[questionNo - 1] =="true" ? 'Unflag' : 'Flag'}
                  </Button>
                </ButtonContainer>
              </LeftContainer>
              <RightContainer>
                <QuestionLegend>
                  <LegendRow>
                    <LegendData colSpan="2" style={{ backgroundColor: 'grey'}}>Overall Summary</LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendBlueColor></LegendBlueColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Attempted</LegendText>
                    </LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendGreyColor></LegendGreyColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Not Attempted</LegendText>
                    </LegendData>
                  </LegendRow>
                  <LegendRow>
                    <LegendData>
                      <LegendRedColor></LegendRedColor>
                    </LegendData>
                    <LegendData>
                      <LegendText>Flag</LegendText>
                    </LegendData>
                  </LegendRow>
                </QuestionLegend>
              </RightContainer>
              <div style={{ width: '100%'}}>
                <div 
                  ref={myMeeting}
                  style={{ width: '20vw',bottom:'0', display:'none'}}
                />
              </div>
            </QuestionContainer>
          </StudentExamDetailContainer>
        </StudentHomePageContainer>  
      </ThemeProvider>
  );
};

export default StudentExamQuestionpage;
