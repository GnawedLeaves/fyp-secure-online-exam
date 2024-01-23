import React, { useState, useEffect } from 'react';
import {
  Sound,
  SoundText
} from "./SoundCheckStyles";


const SoundCheck = () => {
  const [isSoundOutput, setIsSoundOutput] = useState(false);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create an audio buffer (1 second of silence)
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Connect to the audio context destination (speakers)
    source.connect(audioContext.destination);

    // Play the audio buffer
    source.start();

    // Set a timeout to check if sound was actually played
    const timeout = setTimeout(() => {
      setIsSoundOutput(true);
    }, 1000); // Adjust the timeout duration as needed

    return () => {
      clearTimeout(timeout);
      // Close the audio context when the component is unmounted
      audioContext.close();
    };
  }, []);

  return (
    <Sound>
      <SoundText>{isSoundOutput ? 'Sound Output Detected' : 'No Sound Output'}</SoundText>
    </Sound>
  );
};

export default SoundCheck;
