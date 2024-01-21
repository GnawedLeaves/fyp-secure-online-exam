import React from "react";
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
import { theme } from '../../theme';
import { studentNavbarItems } from "./StudentHomepage";
import Examlist from "../../components/Examlist/Examlist";
import Pastexamlist from "../../components/Examlist/Pastexamlist";
import Upcomingexamlist from "../../components/Examlist/Upcomingexamlist";

const StudentExampage = () => {
  const examList = [
    {
      examId: 1,
      examName: "IE4171: Web Design",
      examDate: "12th Feb 2024",
      examStartTime: "10:00:00 am",
      examEndTime: "02:00:00 pm",
      examDuration: "4 hrs"    ,
      examStatus: "Submitted",
      examAction: "Review",
    },
    {
      examId: 11,
      examName: "IE4172: Web fwfwf5y5yh thdrger gerger",
      examDate: "12th Feb 2024",
      examStartTime: "10:00:00 am",
      examEndTime: "02:00:00 pm",
      examDuration: "4 hrs",
      examStatus: "Not submitted yet ",
      examAction: "Start",
    },
  ];
  const examUpcomingList =[
    {
      examId: 21,
      examName: "IE4172: Web fwfwf5y5yh thdrger gerger",
      examDate: "14th Feb 2024",
      examStartTime: "10:00:00 am",
      examEndTime: "02:00:00 pm",
      examDuration: "4 hrs",
    },
  ];
  const examPastList = [
    {
      examId: 31,
      examName: "IE4171: Web Design",
      examEndDate: "12th Jan 2024",
      examSubmissionTime: "10:20:45 am",
      examStatus: "Submitted",
      examResult: "Review",
    },
    {
      examId: 32,
      examName: "IE4172: Web fwfwf5y5yh thdrger ger",
      examEndDate: "12th Jan 2024",
      examSubmissionTime: "09:45:59",
      examStatus: "Graded",
      examResult: "Review",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <StudentHomePageContainer>
        <Navbar linksArray={studentNavbarItems} />
        <StudentNavbarContentContainer>
          <PageTitle>Exam</PageTitle>
          <ExamTableContainer>
            <TableTitle>Open</TableTitle>
            {
              examList.length > 0 ? (
                <OpenExams>
                  <ExamlistContainer>
                    <ExamDetail style={{ width: '20%'}}>Name</ExamDetail>
                    <ExamDetail style={{ width: '15%'}}>Date</ExamDetail>
                    <ExamDetail style={{ width: '10%'}}>Start Time</ExamDetail>
                    <ExamDetail style={{ width: '10%'}}>End Time</ExamDetail>
                    <ExamDetail style={{ width: '10%'}}>Duration</ExamDetail>
                    <ExamDetail style={{ width: '18%'}}>Status</ExamDetail>
                    <ExamDetail style={{ width: '10%'}}>Action</ExamDetail>
                  </ExamlistContainer>
                  {examList.map((exam) => (
                    <Examlist
                      examId={exam.examId}
                      examName={exam.examName}
                      examDate={exam.examDate}
                      examStartTime={exam.examStartTime}
                      examEndTime={exam.examEndTime}
                      examDuration={exam.examDuration}
                      examStatus={exam.examStatus}
                      examAction={exam.examAction}
                    />
                  ))}
                </OpenExams>
              ) : (
                <TableDescription>You do not currently have any open exams. </TableDescription>
              )
            }
          </ExamTableContainer>
          <ExamTableContainer>
            <TableTitle>Upcoming</TableTitle>
            {
              examUpcomingList.length > 0 ? (
                <OpenExams>
                  <ExamlistContainer>
                    <ExamDetail style={{ width: '20%'}}>Name</ExamDetail>
                    <ExamDetail style={{ width: '15%'}}>Date</ExamDetail>
                    <ExamDetail style={{ width: '20%'}}>Start Time</ExamDetail>
                    <ExamDetail style={{ width: '20%'}}>End Time</ExamDetail>
                    <ExamDetail style={{ width: '20%'}}>Duration</ExamDetail>
                  </ExamlistContainer>
                    {examUpcomingList.map((upcomingexam) => (
                      <Upcomingexamlist
                        examName={upcomingexam.examName}
                        examDate={upcomingexam.examDate}
                        examStartTime={upcomingexam.examStartTime}
                        examEndTime={upcomingexam.examEndTime}
                        examDuration={upcomingexam.examDuration}
                      />
                    ))}
                </OpenExams>
              ) : (
                <TableDescription>You do not currently have any upcoming exams. </TableDescription>
              )
            }
          </ExamTableContainer>
          <ExamTableContainer>
            <TableTitle>Past</TableTitle>
            {
              examPastList.length > 0 ? (
                <OpenExams>
                  <ExamlistContainer>
                    <ExamDetail style={{ width: '20%'}}>Name</ExamDetail>
                    <ExamDetail style={{ width: '15%'}}>End Date</ExamDetail>
                    <ExamDetail style={{ width: '32%'}}>Submission Time</ExamDetail>
                    <ExamDetail style={{ width: '18%'}}>Status</ExamDetail>
                    <ExamDetail style={{ width: '10%'}}>Result</ExamDetail>
                  </ExamlistContainer>
                    {examPastList.map((closedexam) => (
                      <Pastexamlist
                        examId={closedexam.examId}
                        examName={closedexam.examName}
                        examEndDate={closedexam.examEndDate}
                        examSubmissionTime={closedexam.examSubmissionTime}
                        examStatus={closedexam.examStatus}
                        examResult={closedexam.examResult}
                      />
                    ))}
                </OpenExams>
              ) : (
                <TableDescription>You do not currently have any past exams. </TableDescription>
              )
            }
          </ExamTableContainer>
          <Footer />
        </StudentNavbarContentContainer>
      </StudentHomePageContainer>
    </ThemeProvider>
    
  );
};

export default StudentExampage;


