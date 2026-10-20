import React, { useState } from 'react';
import { Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { DayPhase } from '../types/portfolio';
import { toggleAudio, isAudioEnabled } from '../utils/audio';

interface HeaderProps {
  timeString: string;
  hourString: string;
  phase: DayPhase;
  phaseLabel: string;
  progress: number;
  isNight: boolean;
  onNavigateProgress: (target: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  timeString,
  phase,
  isNight,
  onNavigateProgress,
}) => {
  const [audioActive, setAudioActive] = useState<boolean>(isAudioEnabled());

  const handleAudioToggle = () => {
    const newState = toggleAudio();
    setAudioActive(newState);
  };

  const navLinks = [
    { label: 'Dawn', time: '7 AM', progress: 0 },
    { label: 'Morning', time: '8:30 AM', progress: 0.18 },
    { label: 'Study', time: '10 AM', progress: 0.35 },
    { label: 'Laboratory', time: '2 PM', progress: 0.58 },
    { label: 'Me Time', time: '5:30 PM', progress: 0.78 },
    { label: 'Midnight', time: '12 AM', progress: 1.0 },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-3 transition-colors duration-700 backdrop-blur-md border-b ${
        isNight
          ? 'bg-slate-950/30 border-white/10 text-slate-100'
          : 'bg-white/25 border-black/5 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 md:gap-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => onNavigateProgress(0)}
          className="group flex items-center gap-2 text-left focus-visible:outline-hidden rounded-sm shrink-0 cursor-pointer"
          aria-label="Chili Peppers home - scroll to top"
        >
          <span className="font-mono text-base md:text-lg font-bold tracking-tight group-hover:text-amber-500 transition-colors whitespace-nowrap">
            Chili Peppers
          </span>
          <span className="hidden sm:inline-block text-xs font-mono opacity-50 whitespace-nowrap">
            / portfolio
          </span>
        </button>

        {/* Zone 2: Navigation Links with 12-hour AM/PM */}
        <nav
          className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-medium shrink-0"
          aria-label="Diurnal Timeline Navigation"
        >
          {navLinks.map((item) => (
            <button
              key={item.time}
              onClick={() => onNavigateProgress(item.progress)}
              className={`transition-colors py-1 hover:underline underline-offset-4 cursor-pointer whitespace-nowrap ${
                isNight
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-black'
              }`}
            >
              <span className="font-mono text-[11px] opacity-60 mr-1.5 tabular-nums">
                {item.time}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Dynamic 12-Hour Time & Sound Indicator */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dynamic 12-Hour Pill Indicator */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tabular-nums transition-all ${
              isNight
                ? 'bg-slate-900/60 border-indigo-400/30 text-slate-100 shadow-xs'
                : 'bg-white/60 border-amber-300/50 text-amber-950 shadow-xs'
            }`}
            title="Current Narrative Time"
          >
            {isNight ? (
              <Moon className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
            ) : (
              <Sun
                className={`w-3.5 h-3.5 shrink-0 ${
                  phase === 'golden' ? 'text-amber-500' : 'text-amber-600'
                }`}
              />
            )}
            <span className="font-bold tracking-wide">{timeString}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isNight
                ? 'bg-slate-900/50 border-white/10 text-slate-300 hover:text-white'
                : 'bg-white/50 border-black/5 text-slate-700 hover:text-black'
            }`}
            title={audioActive ? 'Mute audio' : 'Enable audio'}
            aria-label={audioActive ? 'Mute audio' : 'Enable audio'}
          >
            {audioActive ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 opacity-40" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
