import React from 'react';
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'

const Roompage =() => {
    const roomId = "e3695c3f-ef0c-4ab3-a971-ac58bb9142751221";
    const teacherId = "1234";

    const myMeeting = async (element) => {
      const appID=552252558;
      const serverSecret="2679f71641820de66f51b17a7960ad32";
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
          showMyCameraToggleButton: true,
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
            <h1>teacher view {roomId} </h1>
            <div ref={myMeeting}/>
        </div>
    );
};

export default Roompage;