import React, { useState, useEffect } from 'react';
import {
    TimerContainer,
    TimerText,
} from "./TimerStyles";

const Timer = ({ initialDuration }) => {
    const [seconds, setSeconds] = useState(initialDuration);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => Math.max(0, prevSeconds - 1));
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount
  
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const remainingSeconds = timeInSeconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

  return (
    <TimerContainer>
      <TimerText>Elapsed Time: {formatTime(seconds)}</TimerText>
    </TimerContainer>
  );
};

export default Timer;
