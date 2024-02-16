import React, { useState, useEffect, useCallback } from 'react';
import {
  SoundCheckContainer,
  SoundText,
  ButtonSection,
  OutputText,
} from "./SoundCheckStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../backend/firebase/firebase';

const SoundCheck = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [audio] = useState(new Audio()); // Initialize the Audio object without a URL
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOutput, setSoundOutput] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);

  const playAudio = () => {
    if (audioUrl) {
      setYesClicked(false);
      audio.src = audioUrl; // Set the audio source before playing
      audio.play();
      setIsPlaying(true);
    }
  };

  const stopAudio = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setSoundOutput(true);
  }, [audio]);

  const handleRetry = () => {
    playAudio();
    setSoundOutput(false);
    setYesClicked(false);
  };

  const handleYesClick = () => {
    setYesClicked(true);
    stopAudio();
  };

  const getAudioUrl = async (audioName) => {
    const audioRef = ref(storage, `testing_sample/${audioName}`);
  
    try {
      const downloadUrl = await getDownloadURL(audioRef);
      setAudioUrl(downloadUrl);
      console.log('Audio Download URL:', downloadUrl);
    } catch (error) {
      console.error('Error getting audio download URL:', error.message);
    }
  };

  useEffect(() => {
    getAudioUrl(`sample-test-sound.mp3`);
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <SoundCheckContainer>
      {!isPlaying && (
        <Button onClick={playAudio}>Check Audio Output</Button>
      )}
      {isPlaying && !yesClicked && (
        <>
          <SoundText>Can you hear the audio clearly?</SoundText>
          <ButtonSection>
            <Button defaultColor={theme.statusGood} filledColor={theme.statusGood} filled={false} onClick={handleYesClick}>Yes</Button>
            <Button defaultColor={theme.statusError} filledColor={theme.statusError} filled={false} onClick={handleRetry}>Retry</Button>
          </ButtonSection>
        </>
      )}
      {yesClicked && soundOutput && <OutputText>Your sound output is functioning well</OutputText>}
    </SoundCheckContainer>
  );
};

export default SoundCheck;
