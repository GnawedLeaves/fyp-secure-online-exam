import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { instructorNavBarItems } from "./ContactAdmin";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";

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


const InstructorSettings =() => {

    const [selectedQuizMode, setSelectedQuizMode] = useState('');
    const [selectedExam, setSelectedExam] = useState('');
    const [examDuration, setExamDuration] = useState('');
    const [releaseResultsOption, setReleaseResultsOption] = useState('');
    const [selectedResultCategories, setSelectedResultCategories] = useState([]);
  
    const handleSaveSettings = () => {
      // save settings to the database
      console.log('Settings saved!');
    };

    return (
        <ThemeProvider theme={theme}>
            <InstructorHomeContainer>
            <Navbar linksArray={instructorNavBarItems} />
            <InstructorDashboardContainer>
                <PageTitleInstructor>Exams and Results Settings</PageTitleInstructor>
                <br></br>
                
                <label style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}
                >Select Exam: </label>

                <select value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                    <option value="">-- Select Exam --</option>
                    <option value="Exam1">Exam 1</option>
                    <option value="Exam2">Exam 2</option>
                    <option value="Exam3">Exam 3</option>
                </select>

                <br></br>
                <br></br>

                <label style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}
                >Select Quiz Mode: </label>

                <select value={selectedQuizMode} onChange={(e) => setSelectedQuizMode(e.target.value)}>
                    <option value="">-- Select Quiz Mode --</option>
                    <option value="Timed">Timed Exam</option>
                    <option value="Open">Open Exam</option>
                </select>

                <br></br>
                <br></br>

                <label style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}
                >Exam Duration (in minutes): </label>

                <input
                    type="number"
                    value={examDuration}
                    onChange={(e) => setExamDuration(e.target.value)}/>

                <br></br>
                <br></br>
                <br></br>

                <label style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}
                >Results Page Configuration:</label>

                <div>
                <input
                    type="radio"
                    id="autoRelease"
                    name="releaseOption"
                    value="Auto"
                    checked={releaseResultsOption === 'Auto'}
                    onChange={() => setReleaseResultsOption('Auto')}
                />
                <label htmlFor="autoRelease">Always Automatically</label>
                <br></br>

                <input
                    type="radio"
                    id="manualRelease"
                    name="releaseOption"
                    value="Manual"
                    checked={releaseResultsOption === 'Manual'}
                    onChange={() => setReleaseResultsOption('Manual')}
                />
                <label htmlFor="manualRelease">Manually</label>
                </div>
   
                <br></br>
                

                <label style={{ fontSize: '16px', fontWeight: 'bold', paddingRight:'5px' }}
                >Type of Results to be release:</label>

      <div>
        <input
          type="checkbox"
          id="noneCategory"
          value="None"
          checked={selectedResultCategories.includes('None')}
          onChange={() =>
            setSelectedResultCategories((prevCategories) =>
              prevCategories.includes('None')
                ? prevCategories.filter((category) => category !== 'None')
                : [...prevCategories, 'None']
            )
          }
        />
        <label htmlFor="noneCategory">None</label>

        <br></br>
        <input
          type="checkbox"
          id="scoreCategory"
          value="Score"
          checked={selectedResultCategories.includes('Score')}
          onChange={() =>
            setSelectedResultCategories((prevCategories) =>
              prevCategories.includes('Score')
                ? prevCategories.filter((category) => category !== 'Score')
                : [...prevCategories, 'Score']
            )
          }
        />
        
        <label htmlFor="scoreCategory">Score</label>
        
        <br></br>
        <input
          type="checkbox"
          id="timeSpendCategory"
          value="TimeSpend"
          checked={selectedResultCategories.includes('TimeSpend')}
          onChange={() =>
            setSelectedResultCategories((prevCategories) =>
              prevCategories.includes('TimeSpend')
                ? prevCategories.filter((category) => category !== 'TimeSpend')
                : [...prevCategories, 'TimeSpend']
            )
          }
        />

        <label htmlFor="timeSpendCategory">Time Spend</label>
        
        <br></br>
        <input
          type="checkbox"
          id="gradeCategory"
          value="Grade"
          checked={selectedResultCategories.includes('Grade')}
          onChange={() =>
            setSelectedResultCategories((prevCategories) =>
              prevCategories.includes('Grade')
                ? prevCategories.filter((category) => category !== 'Grade')
                : [...prevCategories, 'Grade']
            )
          }
        />
        <label htmlFor="gradeCategory">Grade</label>
      </div>

                <br></br>
          <ExamButton onClick={handleSaveSettings}>Save Settings</ExamButton>

            </InstructorDashboardContainer>
            </InstructorHomeContainer>
        </ThemeProvider>
    );
};

export default InstructorSettings
