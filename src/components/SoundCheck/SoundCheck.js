import React, { useState, useEffect, useCallback } from 'react';
import {
  SoundCheckContainer,
  SoundText,
  ButtonSection,
  OutputText,
} from "./SoundCheckStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';

const audioPath = process.env.PUBLIC_URL + '/sample-test-sound.mp3';

const SoundCheck = () => {
  const [audio] = useState(new Audio(audioPath));
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundOutput, setSoundOutput] = useState(false);
  const [yesClicked, setYesClicked] = useState(false);

  const playAudio = () => {
    setYesClicked(false); // Reset yesClicked when Play Sample Audio is clicked
    audio.play();
    setIsPlaying(true);
  };

  const stopAudio = useCallback(() => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setSoundOutput(true);
  }, [audio]);

  const handleRetry = () => {
    playAudio(); // Call playAudio to replay the music
    setSoundOutput(false); // Reset the sound output status
    setYesClicked(false); // Reset the Yes button click status
  };

  const handleYesClick = () => {
    setYesClicked(true);
    stopAudio();
  };

  useEffect(() => {
    // Cleanup function to stop audio when the component is unmounted
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
