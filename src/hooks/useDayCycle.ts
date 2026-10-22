import { useState, useEffect, useCallback, useMemo } from 'react';
import { DayPhase, DayTimeState } from '../types/portfolio';
import { sunPos, moonPos, findRiseSet, skyPosition, horizonFade, wallMidnightInstant, moonPhase } from '../utils/astro';
import { buildStarField } from '../utils/stars';

const DEFAULT_COORDS = { lat: 40.7128, lng: -74.006 }; // NYC fallback
const DEFAULT_TZ = 'America/New_York';

const formatHours = (h: number | null): string => {
  if (h === null || h < 0 || h > 24) return '—';
  let hh = Math.floor(h);
  let mm = Math.round((h - hh) * 60);
  if (mm === 60) {
    hh += 1;
    mm = 0;
  }
  const suffix = hh >= 12 && hh < 24 ? 'PM' : 'AM';
  const h12 = hh === 0 || hh === 24 ? 12 : hh > 12 ? hh - 12 : hh;
  return `${h12}:${mm.toString().padStart(2, '0')} ${suffix}`;
};

export function useDayCycle(): DayTimeState & {
  hourString: string;
  scrollToProgress: (target: number) => void;
  scrollToSection: (sectionId: string) => void;
} {
  const [progress, setProgress] = useState(0);
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [tz, setTz] = useState(DEFAULT_TZ);

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

  // Real observer location for sunrise/moonrise calculations
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        try {
          const machineTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (machineTz) setTz(machineTz);
        } catch {
          /* keep fallback tz */
        }
      },
      () => {
        /* keep fallback */
      },
      { timeout: 8000, maximumAge: 3600000 }
    );
  }, []);

  // Today at local midnight in the observer's timezone — the day the
  // real ephemeris is computed for, so rise/set hours match the clock
  const dayStart = useMemo(() => wallMidnightInstant(tz), [tz]);

  // Real rise/set times (decimal hours past local midnight) for today
  const { sunTimes, moonTimes } = useMemo(() => {
    const sun = findRiseSet((d) => sunPos(d, coords.lat, coords.lng).alt, dayStart, -0.833);
    const moon = findRiseSet((d) => moonPos(d, coords.lat, coords.lng).alt, dayStart, 0);
    return { sunTimes: sun, moonTimes: moon };
  }, [coords, dayStart]);

  // Map 0..1 to 6:00 AM (360 mins) -> 5:59 AM next day (1799 mins)
  const totalMinutesFromMidnight = 360 + Math.round(progress * 1439);
  const simHours = totalMinutesFromMidnight / 60;
  const hour24 = Math.floor(totalMinutesFromMidnight / 60);
  const minutes = totalMinutesFromMidnight % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');

  let timeString = '';
  let hourString = '';

  const wallHour = hour24 >= 24 ? hour24 - 24 : hour24;
  const h12 = wallHour === 0 ? 12 : wallHour > 12 ? wallHour - 12 : wallHour;
  const suffix = wallHour < 12 ? 'AM' : 'PM';
  timeString = `${h12}:${formattedMinutes} ${suffix}`;
  hourString = `${h12} ${suffix}`;

  // Real sun/moon positions for the simulated moment of today
  const simDate = useMemo(
    () => new Date(dayStart.getTime() + totalMinutesFromMidnight * 60000),
    [dayStart, totalMinutesFromMidnight]
  );

  const sun = useMemo(() => sunPos(simDate, coords.lat, coords.lng), [simDate, coords]);
  const moon = useMemo(() => moonPos(simDate, coords.lat, coords.lng), [simDate, coords]);
  const starField = useMemo(
    () => buildStarField(simDate, coords.lat, coords.lng),
    [simDate, coords]
  );
  const lunar = useMemo(() => moonPhase(simDate), [simDate]);

  const sunPosition = skyPosition(sun);
  const moonPosition = skyPosition(moon);
  const sunOpacity = horizonFade(sun.alt);
  const moonOpacity = horizonFade(moon.alt);

  // Phases follow the real sun: golden hour brackets the real sunset,
  // dawn brackets the real sunrise, night is true astronomical night.
  const noon =
    sunTimes.rise !== null && sunTimes.set !== null && sunTimes.set > sunTimes.rise
      ? (sunTimes.rise + sunTimes.set) / 2
      : 12;
  const isBeforeNoon = simHours < noon;

  let phase: DayPhase = 'midday';
  let phaseLabel = 'Midday';

  if (sun.alt < -6) {
    phase = 'night';
    phaseLabel = 'Midnight';
  } else if (sun.alt < 4) {
    phase = isBeforeNoon ? 'dawn' : 'golden';
    phaseLabel = isBeforeNoon ? 'Dawn' : 'Golden Hour';
  } else if (sun.alt < 30) {
    phase = isBeforeNoon ? 'morning' : 'golden';
    phaseLabel = isBeforeNoon ? 'Morning' : 'Golden Hour';
  }

  const isNight = phase === 'night';
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
    sunPosition,
    moonPosition,
    sunAltitude: Math.round(sun.alt),
    sunOpacity,
    moonOpacity,
    sunriseString: formatHours(sunTimes.rise),
    sunsetString: formatHours(sunTimes.set),
    starPoints: starField.points,
    starLines: starField.lines,
    moonPhase: lunar.phase,
    moonIllumination: lunar.illumination,
    moonWaxing: lunar.waxing,
    moonPhaseName: lunar.name,
    isNight,
    ambientTextColor,
    scrollToProgress,
    scrollToSection,
  };
}
