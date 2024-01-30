import React, { useState, useEffect, useCallback } from "react";
import {
  SoundCheckContainer,
  SoundText,
  ButtonSection,
  OutputText,
  SoundCheckContainer,
  SoundText,
  ButtonSection,
  OutputText,
} from "./SoundCheckStyles";

const SoundCheck = () => {
  const [audioUrl, setAudioUrl] = useState("");
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
      console.log("Audio Download URL:", downloadUrl);
    } catch (error) {
      console.error("Error getting audio download URL:", error.message);
    }
  };

  useEffect(() => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Create an audio buffer (1 second of silence)
    const buffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate,
      audioContext.sampleRate
    );
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
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <SoundCheckContainer>
      {!isPlaying && <Button onClick={playAudio}>Check Audio Output</Button>}
      {isPlaying && !yesClicked && (
        <>
          <SoundText>Can you hear the audio clearly?</SoundText>
          <ButtonSection>
            <Button
              defaultColor={theme.statusGood}
              filledColor={theme.statusGood}
              filled={false}
              onClick={handleYesClick}
            >
              Yes
            </Button>
            <Button
              defaultColor={theme.statusError}
              filledColor={theme.statusError}
              filled={false}
              onClick={handleRetry}
            >
              Retry
            </Button>
          </ButtonSection>
        </>
      )}
      {yesClicked && soundOutput && (
        <OutputText>Your sound output is functioning well</OutputText>
      )}
    </SoundCheckContainer>
  );
};

export default SoundCheck;
