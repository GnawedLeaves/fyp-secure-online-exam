import React, { useEffect, useState } from 'react';
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

          </InstructorDashboardContainer>
        </InstructorHomeContainer>
      </ThemeProvider>
    );
};
        
export default Proctoring;
