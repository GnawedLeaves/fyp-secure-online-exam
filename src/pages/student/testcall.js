import React from 'react';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const Roompage =() => {
    const examId = "e3695c3f-ef0c-4ab3-a971-ac58bb9142751221";
    const studentId = "abc";
    const studentId2 = "1222";
    const Overlay = () => (
      <div style={{
        position: 'relative',
        marginBottom:'0px',
        width: '100%',
        height: '50px',
        backgroundColor: 'white', 
        zIndex: 2, // Ensure the overlay is on top of the other content
      }}>
      </div>
    );

    const myMeeting = async (element) => {
      const appID=1581360116;
      const serverSecret="93376fcc4aea0b93c88d768ceedbe9b9";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID, 
          serverSecret, 
          examId, 
          Date.now().toString(),
          studentId
      );
      
      const zc = ZegoUIKitPrebuilt.create(kitToken);
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
          layout: "Grid",
        })
    };
    

    return (
        <div>
            <h1>ry {examId} </h1>
              <div 
                ref={myMeeting}
                style={{ width: '30vw',bottom:'0'}}
              />
        </div>
    );
};

export default Roompage;