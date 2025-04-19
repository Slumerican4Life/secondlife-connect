
import { useEffect, useState } from 'react';
import safetyControls from '../lib/safety/SafetyControls';

export const useSafety = (userId?: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    // Check authorization if userId is provided
    if (userId) {
      setIsAuthorized(safetyControls.isUserAuthorized(userId));
    }

    // Perform safety checks
    const checkSafety = () => {
      const safetyStatus = safetyControls.checkSafety();
      setIsSafe(safetyStatus);
    };

    // Initial check
    checkSafety();

    // Regular safety checks
    const interval = setInterval(checkSafety, 5000);

    return () => clearInterval(interval);
  }, [userId]);

  return {
    isAuthorized,
    isSafe,
    safetyControls
  };
};
