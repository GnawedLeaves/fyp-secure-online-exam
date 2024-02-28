import React, { useRef } from 'react';
import RecordRTC from 'recordrtc';
import { storage } from '../../backend/firebase/firebase'; // Import your Firebase storage instance

const TestRecordingpage = () => {
  const recorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

      // Create a recorder
      recorderRef.current = RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      // Start recording
      recorderRef.current.startRecording();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recorderRef.current) {
        // Stop recording
        recorderRef.current.stopRecording(async () => {
          // Get the recorded blob
          const blob = recorderRef.current.getBlob();

          // Upload the blob to Firebase Storage
          const storageRef = storage.ref();
          const videoRef = storageRef.child('recordings/test.webm');
          await videoRef.put(blob);

          console.log('Recording uploaded to Firebase Storage.');

          // Reset recorder
          recorderRef.current.reset();
        });
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <div>
      <h1>Test Recording Page</h1>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
};

export default TestRecordingpage;