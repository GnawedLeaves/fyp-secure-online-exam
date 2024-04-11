import React, { useState, useEffect } from "react";
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
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import ExamCalendar from "./CalendarGenerator";
import { db } from "../../backend/firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsCounts, setStudentsCounts] = useState({});

  //get the exams courseId and courseName
  useEffect(() => {
    const fetchTutorialGroups = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "exams"));
        const groups = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch student count for each group
        const counts = {};
        for (const group of groups) {
          const groupData = await getDoc(doc(db, "exams", group.id));
          const { courseId } = groupData.data();
          const usersQuerySnapshot = await getDocs(collection(db, "users"));
          const studentsData = usersQuerySnapshot.docs.map((doc) => doc.data());
          const studentsInCourse = studentsData.filter(
            (student) => student.modules && student.modules.includes(courseId)
          );
          counts[group.id] = studentsInCourse.length;
        }

        // Set tutorial groups and student counts
        setTutorialGroups(groups);
        setStudentsCounts(counts);
      } catch (error) {
        console.error("Error fetching tutorial groups and student counts:", error);
      }
    };

    fetchTutorialGroups();
  }, []);

  //fetching the student detail
  useEffect(() => {
    const fetchStudents = async () => {
      console.log("Fetching students...");
      if (!selectedGroup) {
        console.log("No selected group.");
        return;
      }
  
      try {
        const groupData = await getDoc(doc(db, "exams", selectedGroup));
        const { courseId } = groupData.data();
  
        console.log("Selected Group:", selectedGroup);
        console.log("Course ID:", courseId);
  
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        const studentsData = usersQuerySnapshot.docs.map((doc) => doc.data());
  
        // Filter students based on the selected course
        const studentsInCourse = studentsData.filter((student) =>
          student.modules && student.modules.includes(courseId)
        );
        console.log("Students in Course:", studentsInCourse);
  
        setStudents(studentsInCourse);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    fetchStudents();
  }, [selectedGroup]);


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
                {tutorialGroups.map((group) => (
                <InstructorGroupBox key={group.id}>
                  <GroupTitle>{group.name}</GroupTitle>
                  <StudentCount onClick={() => setSelectedGroup(group.id)}>
                  Total Students: {studentsCounts[group.id] || 0}
                  </StudentCount>
                </InstructorGroupBox>
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
