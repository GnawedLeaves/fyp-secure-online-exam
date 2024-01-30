import React, { useState, useEffect } from "react";
import {
  PageTitle,
  StudentHomePageContainer,
  StudentExamDetailContainer,
  QuestionContainer,
  QuestionSection,
  LeftContainer,
  RightContainer,
  QuestionGrid,
  QuestionRow,
  PageDescription,
  PageChoice,
  PageEnterSpace,
  QuestionLegend,
  LegendRow,
  LegendData,
  LegendBlueColor,
  LegendRedColor,
  LegendGreyColor,
  LegendText,
} from "./StudentPagesStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Timer from "../../components/Timer/Timer";
import { theme } from "../../theme";
import { studentNavbarItems } from "./StudentHomepage";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
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
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../backend/firebase/firebase";
import NumberFocusbox from "../../components/Numberbox/NumberFocusbox";

const StudentExamQuestionpage = () => {
  const ExamTimeArray = [
    {
      examid: "1",
      endTime: "2024-01-27 23:30:00 ",
    },
  ];
  const examTotalQuestions = [
    {
      title: "IE4171: Web Design",
      TotalQuestion: 26,
    },
  ];
  const examQuestions = [
    {
      index: 2,
      question: "Which is the tallest animal on the earth?!",
      options: ["elephant", "zebra", "giraffe", "ant", "cat"],
    },
  ];

  const endTime = exams.length > 0 && exams[0]?.endTime?.toDate();

  if (endTime) {
    endTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
  } else {
    console.error("No valid exam data found or endTime is not defined.");
  }
  const navigate = useNavigate();
  /*const nextQuestion = () => {
    const nextQuestionNo = parseInt(questionNo, 10) + 1;
    navigate(`/student/exam/${examId}/${nextQuestionNo}`);
  };*/
  const nextQuestion = async (
    studentId,
    examId,
    totalMCQ,
    questionNo,
    optionSelected
  ) => {
    try {
      const currentQuestionNo = parseInt(questionNo, 10);

      await saveAnswerToDatabase(
        studentId,
        examId,
        totalMCQ,
        questionNo,
        optionSelected
      );

      // Navigate to the next question
      const nextQuestionNo = currentQuestionNo + 1;
      navigate(`/student/exam/${examId}/${nextQuestionNo}`);
    } catch (error) {
      console.error("Error saving/updating answer to the database:", error);
    }
  };
  const reviewExam = async (
    studentId,
    examId,
    totalMCQ,
    questionNo,
    optionSelected
  ) => {
    try {
      const currentQuestionNo = parseInt(questionNo, 10);

      await saveAnswerToDatabase(
        studentId,
        examId,
        totalMCQ,
        questionNo,
        optionSelected
      );

      // Navigate to the exam
      navigate(`/student/exam`);
    } catch (error) {
      console.error("Error saving/updating answer to the database:", error);
    }
  };

  const saveAnswerToDatabase = async (
    studentId,
    examId,
    totalMCQ,
    questionNo,
    selectedOption
  ) => {
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

      const [existingRecordSnapshot] = await Promise.all([
        getDocs(existingRecordQuery),
      ]);

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

  const grid = [];

  for (let i = 0; i < Math.ceil(exams[0]?.totalMCQ / 5); i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      const currentNumber = 5 * i + j + 1;
      if (currentNumber <= exams[0]?.totalMCQ) {
        // Check if the current number is equal to the question number
        const isQuestionNumber = currentNumber === parseInt(questionNo, 10);

        // Push the appropriate component based on the condition
        row.push(
          isQuestionNumber ? (
            <NumberFocusbox exam={examId} number={currentNumber} />
          ) : (
            <Numberbox exam={examId} number={currentNumber} />
          )
        );
      }
    }
    grid.push(<QuestionRow>{row}</QuestionRow>);
  }

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentExamDetailContainer>
          <PageTitle>IE4717 Web Application & Design</PageTitle>
          <QuestionContainer>
            {exams.length > 0 && questions.length > 0 ? (
              <>
                <LeftContainer>
                  <QuestionSection>
                    <PageDescription>
                      Question {questions[0]?.questionNo} :
                    </PageDescription>
                    <PageDescription>{questions[0]?.question} </PageDescription>
                    <PageEnterSpace />
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
                  <FaClock style={{ float: "left", marginTop: "3px" }} />
                  <Timer endTime={endTime} />
                  <QuestionGrid>{grid}</QuestionGrid>
                </RightContainer>
              </>
            ) : (
              <p>Loading...</p> // or any other message you want to show while data is being loaded
            )}
          </QuestionContainer>
          <QuestionContainer>
            <LeftContainer>
              <Button
                defaultColor={theme.primary}
                filledColor={theme.primary}
                filled={false}
                onClick={() => {
                  if (parseInt(questionNo, 10) < exams[0]?.totalMCQ) {
                    nextQuestion(
                      studentId,
                      examId,
                      exams[0]?.totalMCQ,
                      questionNo,
                      selectedOption
                    );
                  } else {
                    reviewExam(
                      studentId,
                      examId,
                      exams[0]?.totalMCQ,
                      questionNo,
                      selectedOption
                    );
                  }
                }}
              >
                {parseInt(questionNo, 10) < exams[0]?.totalMCQ
                  ? "Save & Next"
                  : "Review & Submit"}
              </Button>
            </LeftContainer>
            <RightContainer>
              <QuestionLegend>
                <LegendRow>
                  <LegendData colSpan="2" style={{ backgroundColor: "grey" }}>
                    Overall Summary
                  </LegendData>
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
          </QuestionContainer>
          <Footer />
        </StudentExamDetailContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
  );
};

export default StudentExamQuestionpage;
