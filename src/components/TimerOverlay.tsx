import React, { useEffect, useState } from 'react';

const TimerOverlay = () => {
  const [time, setTime] = useState<number>(25 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-5xl font-mono z-10">
      {formatTime(time)}
    </div>
  );
};

export default TimerOverlay;
