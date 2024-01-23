import React, { useState, useEffect, useCallback } from 'react';
import { TimerContainer, TimerText } from "./TimerStyles";

const Timer = ({ endTime }) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const difference = endTime - now;
    return Math.max(0, Math.floor(difference / 1000)); // Convert milliseconds to seconds
  }, [endTime]); // Include endTime in the dependency array

  const [seconds, setSeconds] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeRemaining]); // Include calculateTimeRemaining in the dependency array

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const remainingSeconds = timeInSeconds % 60;

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <TimerContainer>
      <TimerText>Time Remaining: {formatTime(seconds)}</TimerText>
    </TimerContainer>
  );
};

export default Timer;
