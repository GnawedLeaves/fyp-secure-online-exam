import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import { InstructorDashboardContainer, InstructorHomeContainer, PageTitleInstructor } from "./InstructorStyle";
import Navbar from "../../components/Navbar/Navbar";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { IoBackspaceOutline, } from "react-icons/io5";
import { db,storage } from "../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

const ExamButton = styled.button`
background-color: ${props => props.theme.primary};
color: ${props => props.theme.white};
border: none;
border-radius: 5px;
padding: 15px 25px;
font-family: ${props => props.theme.font};
transition: ${props => props.theme.transition};
cursor: pointer;

&:hover {
  background-color: ${props => props.theme.primary};
  opacity: 0.8;
}
`;

const BackText = styled.span`
  font-size: 18px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ProctoringSessionText = styled.span`
  margin-left: 20px;
`;

const ReportBox = styled.div`
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 20px;
  display: block;
  font-weight: bold;
  padding-top: 10px;
`;

const Input = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 5px;
`;

const TextArea = styled.textarea`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-left: 5px;
  resize: vertical;
`;

const ReportButton = styled.button`
  background-color: red;
  color: ${props => props.theme.white};
  border: none;
  border-radius: 5px;
  padding: 15px 25px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: ${props => props.theme.transition};

  &:hover {
    opacity: 0.8;
  }
`;
const InputContainer = styled.div`
  display: flex; 
`;
const StyledSelect = styled.select`
  font-size: 18px; 
  padding: 4px; 
  margin-left: 5px;
`;

const StyledOption = styled.option`
  font-size: 15px;
`;

const Proctoring =() => {

    const { courseId } = useParams();
    const location = useLocation();

    const roomId = "e3695c3f-ef0c-4ab3-a971-ac58bb9142751221";
    const teacherId = "1234";

    const myMeeting = async (element) => {
      const appID=1581360116;
      const serverSecret="93376fcc4aea0b93c88d768ceedbe9b9";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID, 
          serverSecret, 
          roomId, 
          Date.now().toString(),
          teacherId
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
          showPreJoinView: false,
          container: element,
          scenario:{
              mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
          turnOnMicrophoneWhenJoining: false,
          turnOnCameraWhenJoining: false,
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
          showNonVideoUser: true,
          showScreenSharingButton: false,
          layout: "Grid",
      })
  };

  const handleBack = () => {
    window.location.href = "/Instructor/InstructorProctor";
  };

  const renderBackButton = location.pathname !== "/Instructor/InstructorProctor";

 //firebase for sending message

  const messageInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("medium"); // Default alert type
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const handleSubmitMessage = async () => {
    try {
      if (!studentId) {
        setError("Please fill in the Student ID.");
        return;
      }

      const messageData = {
        alertType: alertType,
        dateCreatedAt: serverTimestamp(),
        description: message,
        examId: courseId,
        studentId: studentId
      };
      await addDoc(collection(db, "cheating"), messageData);
      setMessage(""); 
      setStudentId(""); 
      setAlertType("medium");
      setError(""); 
    } catch (error) {
      console.error("Error sending message:", error);
      setError("An error occurred while sending the message.");
    }
  };
  
  
    return (
        <ThemeProvider theme={theme}>
        <InstructorHomeContainer>
          <InstructorDashboardContainer>
            <PageTitleInstructor> 
               <Container>
                {renderBackButton && <ExamButton onClick={handleBack}><BackText>Back</BackText></ExamButton>} 
                <ProctoringSessionText>
                Proctoring Session
                </ProctoringSessionText>
                </Container>
                </PageTitleInstructor>
            <br />
  
            <div >
            <h1>Room ID: {roomId} </h1>
            <div ref={myMeeting}/>
        </div>

  
        <div style={{ display: 'flex' }}>
        
          <Container>
            <ReportBox>
            <h2>Reporting Guidelines</h2>
          <p>Please follow these guidelines while reporting any incidents:</p>
          <ul>
            <li>Provide accurate information about the incident.</li>
            <li>Include specific details such student's background.</li>
            <li>Describe the incident clearly and concisely.</li>
            <li>In the event of <strong>multiple students</strong>,leave the Description <br/>as <strong><u>"ENS"</u></strong> (Emergency Notification System).</li>
            <li>Do not make false accusations or provide any <br/>misleading information.</li>
          </ul>
            </ReportBox>
          </Container>
        
        
          <Container>
            <ReportBox>
              <InputContainer>
                <Label>Alert Type:</Label>
                <StyledSelect value={alertType} onChange={(e) => setAlertType(e.target.value)}>
                  <StyledOption value="medium">Medium</StyledOption>
                  <StyledOption value="high">High</StyledOption>
                </StyledSelect>
                <br/>
              </InputContainer>
              <br/>
              <InputContainer>
                <Label>Student ID:</Label>
                <Input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
              </InputContainer>
              <InputContainer>
                <Label>Description:</Label>
                <TextArea rows={5} 
                          cols={30} 
                value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter Report" />
              </InputContainer>
              <ReportButton onClick={handleSubmitMessage}>Report</ReportButton>
              {error && <p style={{ color: 'red', fontSize: '18px' }}>{error}</p>}
            </ReportBox>
          </Container>
        
          <ReportBox>
        
          <h2>Additional Notes</h2>
          <p>Please note that:</p>
          <ul>
            <li>All reports are confidential and will be <br/>reviewed by the appropriate authorities.</li>
            <br/>
            <li>False or misleading reports may <br/>result in disciplinary action.</li>
            
            <br/>
            <li>Thank you for your cooperation<br/> in maintaining the integrity of our examinations.</li>
          </ul>
        </ReportBox>
        </div>

          </InstructorDashboardContainer>
        </InstructorHomeContainer>
      </ThemeProvider>
    );
};
        
export default Proctoring;
