import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import {
  CloseButton,
  CustomModalContainer,
  GroupTitle,
  InstructorDashboardContainer,
  InstructorGroupBox,
  InstructorHomeContainer,
  InstructorNavBarContainer,
  InstructorNotificationBox,
  InstructorNotificationMessage,
  ModalOverlay,
  NavContainer,
  NavItem,
  PageTitleInstructor,
  StudentCount,
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
} from "firebase/firestore";
import AdminChat from "./AdminChat";

const thStyle = {
  textAlign: 'left',
  padding: '10px 0',

};

const trStyle = {
  borderBottom: '1px solid #ccc',
};

const tdStyle = {
  textAlign: 'left',
  padding: '10px 0',
};

const Modal = ({ isOpen, onClose, students }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <CustomModalContainer>
        <h2 style={{ textAlign: 'center' }}>Students in Group</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '18px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #333' }}>
              <th style={thStyle}>No.</th>
              <th style={thStyle}>Student Name</th>
              <th style={thStyle}>Student Year</th>
              <th style={thStyle}>Programme</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
               <tr key={student.authId} style={{ borderBottom: '1px solid #ccc' }}>
               <td style={{ ...tdStyle, width: '10%' }}>{index + 1}</td>
               <td style={{ ...tdStyle, width: '45%' }}>{student.name}</td>
               <td style={{ ...tdStyle, width: '20%' }}>{student.programme}</td>
              <td style={{ ...tdStyle, width: '20%' }}>{student.year}</td>
             </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <CloseButton onClick={onClose}>
          Closed &times; 
        </CloseButton>
      </CustomModalContainer>
    </ModalOverlay>
  );
};

const InstructorPage = () => {
  const [activeContent, setActiveContent] = useState("examCalendar");
  const [tutorialGroups, setTutorialGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsCounts, setStudentsCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          const studentsData = usersQuerySnapshot.docs
          .map((doc) => doc.data())
          // Filter students based on the selected course and type "student"
          .filter((student) =>
            student.modules &&
            student.modules.includes(courseId) &&
            student.type === "student"
          );
          counts[group.id] = studentsData.length;
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
        const studentsData = usersQuerySnapshot.docs
        .map((doc) => doc.data())
        // Filter students based on the selected course and type "student"
        .filter((student) =>
          student.modules && 
          student.modules.includes(courseId) &&
          student.type === "student"
        );

      console.log("Students in Course:", studentsData);

      setStudents(studentsData);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  
    fetchStudents();
  }, [selectedGroup]);

  const handleStudentCountClick = (groupId) => {
    setSelectedGroup(groupId);
    setIsModalOpen(true);
  };
  
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
            Module Group

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
                  <StudentCount onClick={() => handleStudentCountClick(group.id)}>
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
                   Message from Admin.
                  </InstructorNotificationMessage>
                </InstructorNotificationBox>
                <AdminChat></AdminChat>
              </div>
            )}
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              students={students}
            />
        </InstructorDashboardContainer>

      </InstructorHomeContainer>

    </ThemeProvider>
  );
};

export default InstructorPage;
