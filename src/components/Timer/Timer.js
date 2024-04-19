import React, { useState, useEffect, useCallback } from 'react';
import { TimerContainer, TimerText } from "./TimerStyles";

const Timer = ({ endTime, onTimerTick, setTimerExpired }) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const difference = endTime - now;
    const seconds = Math.max(0, Math.floor(difference / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  
    return {
      hours: hours,
      minutes: minutes,
      seconds: remainingSeconds,
    };
  }, [endTime]);

  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const { hours, minutes, seconds } = calculateTimeRemaining();
      setRemainingTime({ hours, minutes, seconds });

      // Call the onTimerTick prop with remaining seconds
      if (onTimerTick && typeof onTimerTick === 'function') {
        const totalRemainingSeconds = hours * 3600 + minutes * 60 + seconds;
        onTimerTick(totalRemainingSeconds);
      }

      // Check if timer has expired
      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        setTimerExpired(true);
        clearInterval(intervalId); // Stop the interval when timer expires
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [calculateTimeRemaining, onTimerTick]);

  const formatTime = ({ hours, minutes, seconds }) => {
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <TimerContainer>
      <TimerText>Time Remaining: {formatTime(remainingTime)}</TimerText>
    </TimerContainer>
  );
};

export default Timer;
