// InternetCheck.js
import React, { useState, useCallback } from 'react';
import {
  Internet,
  InternetText,
  ProgressBarContainer,
  ProgressBarFill,
  ButtonSection,
} from "./InternetCheckStyles";
import Button from '../Button/Button';
import { theme } from '../../theme';

const InternetCheck = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [testCount] = useState(10);
  const [isChecked, setIsChecked] = useState(false);

  const checkSpeed = useCallback(async () => {
    try {
      let totalSpeed = 0;

      for (let i = 0; i < testCount; i++) {
        const response = await fetch('https://raw.githubusercontent.com/GnawedLeaves/fyp-secure-online-exam/master/src/pages/Instructor/InstructorExamPage.js');
        const startTime = new Date().getTime();
        const data = await response.arrayBuffer();
        const endTime = new Date().getTime();

        const timeDifferenceInSeconds = (endTime - startTime) / 1000;

        // Set a minimum time difference threshold (adjust as needed)
        const minTimeDifference = 0.0000016;

        if (timeDifferenceInSeconds < minTimeDifference) {
          console.log('Time difference below threshold. Retrying speed calculation.');
          i--; // Retry the speed calculation
          continue;
        }

        const fileSizeInBits = data.byteLength * 8;
        const speedInMbps = (fileSizeInBits / timeDifferenceInSeconds) / 1024 / 1024;

        console.log(`Download speed test ${i + 1}:`, speedInMbps.toFixed(2), 'Mbps');

        // Ignore infinity values and values less than 1
        if (isFinite(speedInMbps) && speedInMbps >= 1) {
          totalSpeed += speedInMbps;
        } else {
          i--; // Retry the speed calculation
        }
      }

      // Calculate the average speed
      const averageSpeed = totalSpeed / testCount;

      console.log('Average download speed:', averageSpeed.toFixed(2), 'Mbps');
      setDownloadSpeed(averageSpeed);
      setIsChecked(true); // Set to true after the first check
    } catch (error) {
      console.error('Error checking speed:', error);
      setDownloadSpeed(null);
    }
  }, [testCount]);

  const handleCalculate = () => {
    setDownloadSpeed(null);
    setIsChecked(false); // Reset isChecked state when recalculating
    checkSpeed();
  };

  const handleClose = () => {
    setDownloadSpeed(null);
    setIsChecked(false);
  };

  return (
    <Internet>
      {isChecked ? (
        <>
          <InternetText>Download speed: {downloadSpeed !== null ? `${downloadSpeed.toFixed(2)} Mbps` : 'Calculating...'}</InternetText>
          
              <ProgressBarContainer>
              <ProgressBarFill value={Math.min(downloadSpeed || 0, 100)} max="100" />
            </ProgressBarContainer>
            <ButtonSection>
              <Button onClick={handleClose}>Close</Button>
              <Button defaultColor={theme.statusError} filledColor={theme.statusError} filled={false} onClick={handleCalculate}>Retry</Button>
            </ButtonSection>
        </>
      ) : (
        <Button onClick={handleCalculate}>Check Internet</Button>
      )}
    </Internet>
  );
};

export default InternetCheck;
