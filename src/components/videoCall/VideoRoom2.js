import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import AgoraRTM from 'agora-rtm-sdk';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'd3d5469dc21747b6b1f5a1053580a8b8';

const VideoRoom2 = ({ examId }) => {
  const [uid, setUid] = useState(String(Math.floor(Math.random() * 10000)));
  const [token, setToken] = useState(null);
  const [client, setClient] = useState(null);
  const [rtmClient, setRtmClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [remoteUsers, setRemoteUsers] = useState({});

  useEffect(() => {
    const joinRoomInit = async () => {
      const rtmClientInstance = AgoraRTM.createInstance(APP_ID);
      setRtmClient(rtmClientInstance);

      await rtmClientInstance.login({ uid, token });
      const channelInstance = await rtmClientInstance.createChannel(`exam_${examId}`);
      await channelInstance.join();
      setChannel(channelInstance);

      const rtcClientInstance = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      await rtcClientInstance.join(APP_ID, `exam_${examId}`, token, uid);
      setClient(rtcClientInstance);

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(tracks);
      rtcClientInstance.publish(tracks);
    };

    joinRoomInit();

    return () => {
      if (rtmClient) {
        rtmClient.leave();
        rtmClient.logout();
      }

      if (client) {
        client.unpublish(localTracks);
        client.leave();
      }
    };
  }, [uid, token, examId]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)' }}>
        {Object.values(remoteUsers).map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default VideoRoom2;
