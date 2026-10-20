import React from 'react';
import { useDayCycle } from './hooks/useDayCycle';
import { BackgroundSky } from './components/BackgroundSky';
import { Header } from './components/Header';

export default function App() {
  const {
    progress,
    timeString,
    hourString,
    phase,
    phaseLabel,
    sunPosition,
    isNight,
    scrollToProgress,
  } = useDayCycle();

  return (
    <div
      className={`relative min-h-[500vh] font-sans selection:bg-amber-400 selection:text-slate-950 ${
        isNight ? 'text-slate-100' : 'text-slate-900'
      }`}
    >
      {/* Dynamic Diurnal Sky with the Sun and the Moon */}
      <BackgroundSky
        progress={progress}
        phase={phase}
        sunPosition={sunPosition}
        isNight={isNight}
      />

      {/* Header with Brand, 12-Hour Time & Day Navigation */}
      <Header
        timeString={timeString}
        hourString={hourString}
        phase={phase}
        phaseLabel={phaseLabel}
        progress={progress}
        isNight={isNight}
        onNavigateProgress={scrollToProgress}
      />
    </div>
  );
}
