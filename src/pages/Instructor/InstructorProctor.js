import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import { instructorNavBarItems } from "./ContactAdmin";
import Navbar from "../../components/Navbar/Navbar";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";


const SelectExamDropdown = styled.select`
  font-size: 16px;
  padding: 8px;
  margin-bottom: 20px;
`;

const StudentsListContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
`;

// table to organise layout for protoring. May/may not be use
const StudentTable = styled.div `
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const StudentTableRow = styled.tr `
    border: 1px solid #ddd;
`;

const StudentTableCell = styled.td`
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
`;

const StatusProgressText = styled.p `
    ::after {
    content: "${props => props.status}";
    color: ${props => {
    
    switch (props.status) {
      case 'In Progress':
        return 'Violet'; 
      
        case 'Completed':
        return 'Green'; 
      
        case 'Not Started':
        return 'Red'; 
      default:
        return '#000';
    }
  }};
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 10px;
  border: 1px solid #ddd;
`;

// video for demo purpose
const SampleVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InstructorProctorPage =() => {

    const [selectedExam, setSelectedExam] = useState('');
  // To be replace with actual data
  const examsList = ['Exam 1', 'Exam 2', 'Exam 3', 'Exam Name: Module'];
  
  const examStudentsList = {
    'Exam 1': [
      { id: 1, name: 'Student 1', status: 'In Progress' },
      { id: 2, name: 'Student 2', status: 'Completed' },
      { id: 3, name: 'Student 3', status: 'In Progress' },
      { id: 4, name: 'Student 4', status: 'Not Started' },
      { id: 5, name: 'Student 5', status: 'Completed' },
    ],
    'Exam 2': [
        
        { id: 6, name: 'Student 6', status: 'In Progress' },
        { id: 7, name: 'Student 7', status: 'Completed' },
        { id: 8, name: 'Student 8', status: 'Not Started' },
    ],
    'Exam 3': [
        { id: 9, name: 'Student 9', status: 'Not Started' },
        { id: 10, name: 'Student 10', status: 'Not Started' },
    ],
    'Exam Name: Module': [
      { id: 10, name: '', status: 'Testing' },
      // Sample data for future; database
    ], 
    }

  const handleExamSelection = (e) => {
    setSelectedExam(e.target.value);
    // fetch student data from the backend, tbc
  };

    return (
        <ThemeProvider theme={theme}>
            <InstructorHomeContainer>
                <Navbar linksArray={instructorNavBarItems} />
                <InstructorDashboardContainer>
                    <PageTitleInstructor>Proctoring Session</PageTitleInstructor>
                    <br></br>
                    <label htmlFor="examStartTime"
                    style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}>Select Exam to Proctor: 
                    </label>

                <SelectExamDropdown onChange={handleExamSelection}>
                <option value="">Select Exam</option>
                {examsList.map((exam,index) =>(
                    <option key={index} value={exam}>
                        {exam}
                    </option>
                ))}
                </SelectExamDropdown>
                    
                {selectedExam && (
                <StudentsListContainer>

                <h3>Students for {selectedExam}</h3>

                <StudentTable>
                    <tbody>
                    {examStudentsList[selectedExam].map((student, index) => (
                    // Creating table rows with a maximum of 3 columns; May change once data feed is in.
                    index % 3 === 0 && <StudentTableRow key={index}>
                      {[examStudentsList[selectedExam][index], examStudentsList[selectedExam][index + 1], examStudentsList[selectedExam][index + 2]].map((cell, cellIndex) => (
                        cell && <StudentTableCell key={cell.id}>
                        
                        <VideoContainer>
                        <SampleVideo controls  >
                        <source src="" type="video/mp4"/>
                        Your Web does not support the format.
                        </SampleVideo>
                        </VideoContainer>
                            
                            <p>Name: {cell.name}</p>
                            {/* Testing check */}
                            {/* <p>Status: {cell.status}</p> */}
                        
                            <StatusProgressText status={cell.status}>Status: </StatusProgressText>
                        </StudentTableCell>
                      ))}
                    </StudentTableRow>
                  ))}
                    </tbody>
                </StudentTable>
                </StudentsListContainer>

                )}    
                </InstructorDashboardContainer>

            </InstructorHomeContainer>
        </ThemeProvider>
    );
};


export default InstructorProctorPage