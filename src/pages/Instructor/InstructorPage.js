import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  InstructorDashboardContainer,
  InstructorHomeContainer,
  InstructorNavBarContainer,
  NavContainer,
  NavItem,
  PageTitleInstructor,
} from "./InstructorStyle";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import ExamCalendar from "./CalendarGenerator";

export const InstructorNotificationBox = styled.div`
  background-color: #ffe066;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #ccc;
  width: 90%;
`;

export const InstructorNotificationMessage = styled.div `
  margin: 0;
  font-size: 16px;
`;
const InstructorGroupBox = styled.div`
  background-color: #e6f7ff;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid #ccc;
  width: 90%;
`;

const GroupTitle = styled.h3`
  margin: 0;
`;

const StudentCount = styled.p`
  margin: 5px 0;
  font-weight: bold;
  cursor: pointer;
  color: blue;
`;


const InstructorPage = () => {
  const [activeContent, setActiveContent] = useState("examCalendar");
  const TutorialGroupTab = [
    { id: 1, name: "Tutorial Group A", students: ["Student A", "Student B", "Student C","Student D"] },
    { id: 2, name: "Tutorial Group B", students: ["Student E", "Student G", "Student F"] },
    { id: 3, name: "Tutorial Group C", students: ["Student H", "Student J", "Student I", "Student I", "Student I"] },
  
  ];

  return (
    <ThemeProvider theme={theme}>
      <InstructorHomeContainer>
        <Navbar linksArray={instructorNavBarItems} />

        <InstructorDashboardContainer>

          <PageTitleInstructor >Welcome to Exam Pulse!</PageTitleInstructor>
          <NavItem
            active={activeContent === "examCalendar"}
            onClick={() => setActiveContent("examCalendar")}
          >
            Exam Calendar
          </NavItem>
          
          <NavItem
            active={activeContent === "tutorialGroup"}
            onClick={() => setActiveContent("tutorialGroup")}
          >
            Tutorial Group
          </NavItem>
          <NavItem
            active={activeContent === "notification"}
            onClick={() => setActiveContent("notification")}
          >
            Notification
          </NavItem>

          {activeContent === "examCalendar" && (
              <ExamCalendar></ExamCalendar>
              
            )}
            
            {activeContent === "tutorialGroup" && (
              <div >
                <ul>

                {TutorialGroupTab.map((tutorialGroup) => (
                <div key={tutorialGroup.id}>

                <InstructorGroupBox>
                  <GroupTitle>{tutorialGroup.name}</GroupTitle>
                  <StudentCount>
                
                    Total Students: {tutorialGroup.students.length}{" "}
                    <Link to ={'/students/${tutorialGroup.id}'}>View Students</Link>

                  </StudentCount>

                </InstructorGroupBox></div>
                ))}
                </ul>
              </div>
            )}

            {activeContent === "notification" && (
              <div >
                <InstructorNotificationBox>
                  <InstructorNotificationMessage>
                  There is currently no message from Admin.
                  </InstructorNotificationMessage>
                </InstructorNotificationBox>
              </div>
            )}

        </InstructorDashboardContainer>

      </InstructorHomeContainer>

    </ThemeProvider>
  );
};

export default InstructorPage;
