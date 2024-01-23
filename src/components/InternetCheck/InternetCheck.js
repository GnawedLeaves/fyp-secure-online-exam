import React, { useState, useEffect } from 'react';
import {
    Internet,
    InternetText
  } from "./InternetCheckStyles";

const InternetCheck = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Internet>
      <InternetText>{isOnline ? 'Online' : 'Offline'}</InternetText>
    </Internet>
  );
};

export default InternetCheck;
