// InternetCheck.js
import React, { useState, useCallback } from "react";
import {
  Internet,
  InternetText,
  ProgressBarContainer,
  ProgressBarFill,
  ButtonSection,
} from "./InternetCheckStyles";
import Button from "../Button/Button";
import { theme } from "../../theme";

const InternetCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Internet>
      {isChecked ? (
        <>
          <InternetText>
            Download speed:{" "}
            {downloadSpeed !== null
              ? `${downloadSpeed.toFixed(2)} Mbps`
              : "Calculating..."}
          </InternetText>

          <ProgressBarContainer>
            <ProgressBarFill
              value={Math.min(downloadSpeed || 0, 100)}
              max="100"
            />
          </ProgressBarContainer>
          <ButtonSection>
            <Button onClick={handleClose}>Close</Button>
            <Button
              defaultColor={theme.statusError}
              filledColor={theme.statusError}
              filled={false}
              onClick={handleCalculate}
            >
              Retry
            </Button>
          </ButtonSection>
        </>
      ) : (
        <Button onClick={handleCalculate}>Check Internet</Button>
      )}
    </Internet>
  );
};

export default InternetCheck;
