import React, { useEffect, useState, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'd3d5469dc21747b6b1f5a1053580a8b8';
const TOKEN =
  '007eJxTYGDpNGFlbWC71X2w9ulh62fpzHn1N7vKvU+dP7r1tOi7jfsVGFKMU0xNzCxTko0MzU3Mk8ySDNNMEw0NTI1NLQwSLZIs5t26ktoQyMjAwm3AwAiFID4zQ1plAQMDADssHxQ=';
const CHANNEL = 'fyp';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const tracksRef = useRef([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === 'video') {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === 'audio') {
      // user.audioTrack.play()
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    // Check if the client is already connected or connecting
    if (client.connectionState !== 'DISCONNECTED') {
      return;
    }
  
    client.on('user-published', handleUserJoined);
    client.on('user-left', handleUserLeft);

    
  
    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([
          AgoraRTC.createMicrophoneAndCameraTracks(),
          uid,
        ])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        tracksRef.current = tracks; // Store tracks in the ref
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
            audioTrack,
          },
        ]);
        client.publish(tracks);
      })
      .catch((error) => {
        console.error('Error joining channel:', error);
      });
  
    return () => {
      // Cleanup logic here
      
    };
  }, []);
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 200px)',
        }}
      >
        {users.map((user) => (
          <VideoPlayer key={user.uid} user={user} />
        ))}
      </div>
    </div>
  );
};

export default VideoRoom;