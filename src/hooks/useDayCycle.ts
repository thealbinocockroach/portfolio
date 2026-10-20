import { useState, useEffect, useCallback } from 'react';
import { DayPhase, DayTimeState } from '../types/portfolio';

export function useDayCycle(): DayTimeState & {
  hourString: string;
  scrollToProgress: (target: number) => void;
  scrollToSection: (sectionId: string) => void;
} {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docElement = document.documentElement;
          const totalHeight = docElement.scrollHeight - docElement.clientHeight;
          const currentScroll = window.scrollY || docElement.scrollTop || 0;
          const currentProgress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
          setProgress(currentProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Map 0..1 to 7:00 AM (420 mins) -> 12:00 AM Midnight (1440 mins)
  const totalMinutesFromMidnight = 420 + Math.round(progress * 1020);
  const hour24 = Math.min(Math.floor(totalMinutesFromMidnight / 60), 24);
  const minutes = totalMinutesFromMidnight % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  let timeString = '';
  let hourString = '';

  if (hour24 === 24) {
    timeString = '12:00 AM';
    hourString = '12 AM';
  } else if (hour24 === 12) {
    timeString = `12:${formattedMinutes} PM`;
    hourString = '12 PM';
  } else if (hour24 > 12) {
    const h12 = hour24 - 12;
    timeString = `${h12}:${formattedMinutes} PM`;
    hourString = `${h12} PM`;
  } else {
    timeString = `${hour24}:${formattedMinutes} AM`;
    hourString = `${hour24} AM`;
  }

  // Determine current phase
  let phase: DayPhase = 'dawn';
  let phaseLabel = 'Dawn / Sunrise';

  if (progress < 0.15) {
    phase = 'dawn';
    phaseLabel = 'Dawn';
  } else if (progress < 0.38) {
    phase = 'morning';
    phaseLabel = 'Morning';
  } else if (progress < 0.62) {
    phase = 'midday';
    phaseLabel = 'Midday';
  } else if (progress < 0.85) {
    phase = 'golden';
    phaseLabel = 'Golden Hour';
  } else {
    phase = 'night';
    phaseLabel = 'Midnight';
  }

  const isNight = phase === 'night';

  // Celestial sun / moon position along parabolic arch
  const celestialX = 8 + progress * 84;
  let celestialY = 55;
  if (progress <= 0.8) {
    const sunProgress = progress / 0.8;
    celestialY = 55 - Math.sin(sunProgress * Math.PI) * 42;
  } else {
    const moonProgress = (progress - 0.8) / 0.2;
    celestialY = 48 - Math.sin(moonProgress * Math.PI) * 25;
  }

  const sunAltitude = Math.round(Math.max(0, 90 - Math.abs(progress - 0.5) * 160));
  const ambientTextColor = isNight ? 'text-slate-100' : 'text-slate-900';

  const scrollToProgress = useCallback((target: number) => {
    const docElement = document.documentElement;
    const totalHeight = docElement.scrollHeight - docElement.clientHeight;
    window.scrollTo({
      top: totalHeight * Math.max(0, Math.min(1, target)),
      behavior: 'smooth',
    });
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    progress,
    timeString,
    hourString,
    phase,
    phaseLabel,
    sunPosition: { x: celestialX, y: celestialY },
    sunAltitude,
    isNight,
    ambientTextColor,
    scrollToProgress,
    scrollToSection,
  };
}
