import React from 'react';
import Scene from './components/Scene';
import TimerOverlay from './components/TimerOverlay';

const App = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      <TimerOverlay />
      <Scene />
    </div>
  );
};

export default App;
