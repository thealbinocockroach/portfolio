import React, { useState } from 'react';
import { playBottleClick } from '../utils/audio';

interface RealisticMoonProps {
  progress: number;
  position: { x: number; y: number };
  sunAltitude: number;
  opacity: number;
  moonPhase: number;
  moonIllumination: number;
  moonWaxing: boolean;
  moonPhaseName: string;
  onInspect: (info: { title: string; subtitle: string; description: string; tag: string }) => void;
}

export const RealisticMoon: React.FC<RealisticMoonProps> = ({
  progress,
  position,
  sunAltitude,
  opacity,
  moonPhase,
  moonIllumination,
  moonWaxing,
  moonPhaseName,
  onInspect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const dayFactor = Math.min(1, Math.max(0, (sunAltitude + 6) / 10));
  const blurPx = dayFactor * 5;
  const visualOpacity = opacity * (1 - 0.45 * dayFactor);

  if (visualOpacity <= 0.01) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBottleClick();
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    onInspect({
      title: 'The Moon · Luna',
      subtitle: `${moonPhaseName} · ${Math.round(moonIllumination * 100)}% illuminated`,
      description: 'Synchronous rotation with Earth revealing ancient basaltic lava plains (Maria) and impact craters. Phase driven by real synodic month.',
      tag: 'CELESTIAL OBJECT',
    });
  };

  const R = 46;
  const cx = 50;
  const cy = 50;
  const cosA = Math.cos(moonPhase * 2 * Math.PI);
  const rx = Math.max(0.5, R * Math.abs(cosA));

  let litPath = '';
  if (moonIllumination < 0.02) {
    litPath = '';
  } else if (moonIllumination > 0.98) {
    litPath = `M ${cx - R},${cy} A ${R},${R} 0 0 1 ${cx + R},${cy} A ${R},${R} 0 0 1 ${cx - R},${cy} Z`;
  } else if (moonWaxing) {
    const sweepTerm = cosA >= 0 ? 0 : 1;
    litPath = `M ${cx},${cy - R} A ${R},${R} 0 0 1 ${cx},${cy + R} A ${rx},${R} 0 0 ${sweepTerm} ${cx},${cy - R} Z`;
  } else {
    const sweepTerm = cosA >= 0 ? 1 : 0;
    litPath = `M ${cx},${cy - R} A ${R},${R} 0 0 0 ${cx},${cy + R} A ${rx},${R} 0 0 ${sweepTerm} ${cx},${cy - R} Z`;
  }

  return (
    <div
      className="absolute transition-all duration-700 ease-out pointer-events-auto cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity: visualOpacity,
        filter: blurPx > 0.15 ? `blur(${blurPx.toFixed(1)}px)` : undefined,
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="The Moon (Click to inspect)"
    >
      <div className="relative flex items-center justify-center">
        {/* Outermost Ethereal Lunar Atmosphere Halo */}
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(165, 180, 252, 0.32) 0%, rgba(99, 102, 241, 0.14) 45%, transparent 72%)',
            transform: isHovered || isPulsing ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        {/* Intermediate Lunar Glow */}
        <div
          className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-xl pointer-events-none transition-all duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(224, 231, 255, 0.5) 0%, rgba(199, 210, 254, 0.18) 60%, transparent 100%)',
            transform: isPulsing ? 'scale(1.15)' : 'scale(1)',
          }}
        />

        {/* Hyper-detailed lunar sphere */}
        <svg
          className="relative w-28 h-28 sm:w-32 sm:h-32 transition-all duration-300 overflow-hidden rounded-full"
          viewBox="0 0 100 100"
          style={{ transform: isHovered || isPulsing ? 'scale(1.06)' : 'scale(1)' }}
        >
          <defs>
            <clipPath id="moonLit">
              {litPath && <path d={litPath} />}
            </clipPath>
            <filter id="moonTex" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="disp" />
              <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.55  0 0 0 0 0.58  0 0 0 0.35 0" result="tex" />
              <feBlend in="disp" in2="tex" mode="multiply" result="blended" />
              <feComposite in="blended" in2="SourceGraphic" operator="in" />
            </filter>
            <radialGradient id="moonBase" cx="38%" cy="34%" r="72%">
              <stop offset="0%" stopColor="#F1F5F9" />
              <stop offset="22%" stopColor="#E2E8F0" />
              <stop offset="52%" stopColor="#B6C2D4" />
              <stop offset="78%" stopColor="#7C8AA3" />
              <stop offset="100%" stopColor="#3E4A63" />
            </radialGradient>
            <radialGradient id="rimLight" cx="18%" cy="22%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Lit portion with hyper-detail */}
          {litPath && (
            <g clipPath="url(#moonLit)">
              {/* Base shaded sphere */}
              <circle cx={cx} cy={cy} r={R} fill="url(#moonBase)" filter="url(#moonTex)" />

              {/* Maria (basaltic plains) with depth */}
              <g opacity="0.72" style={{ mixBlendMode: 'multiply' }}>
                <path d="M46 26 C54 22, 69 26, 72 37 C74 48, 63 56, 52 51 C43 47, 40 31, 46 26 Z" fill="#334155" />
                <path d="M16 34 C24 20, 42 22, 40 41 C38 58, 21 63, 15 50 C11 42, 13 35, 16 34 Z" fill="#1F2937" />
                <circle cx="36" cy="32" r="11" fill="#334155" />
                <ellipse cx="76" cy="42" rx="6.5" ry="8.5" fill="#1F2937" />
                <path d="M25 61 C33 57, 45 63, 42 74 C38 83, 27 81, 23 72 Z" fill="#334155" />
              </g>

              {/* Highland displacement texture (small craters) */}
              <g opacity="0.55">
                {/* Tycho */}
                <circle cx="50" cy="80" r="3.6" fill="#94A3B8" />
                <circle cx="50" cy="80" r="2.4" fill="#475569" />
                <circle cx="49" cy="79" r="1" fill="#F8FAFC" opacity="0.9" />
                {/* Copernicus */}
                <circle cx="36" cy="48" r="3.8" fill="#94A3B8" />
                <circle cx="36" cy="48" r="2.2" fill="#475569" />
                <circle cx="35" cy="47" r="1.1" fill="#F8FAFC" opacity="0.85" />
                {/* Kepler */}
                <circle cx="24" cy="46" r="2.2" fill="#94A3B8" />
                <circle cx="24" cy="46" r="1.3" fill="#475569" />
                {/* Clavius */}
                <circle cx="52" cy="86" r="5" fill="#94A3B8" opacity="0.7" />
                <circle cx="52" cy="86" r="3.2" fill="#475569" />
                {/* Aristarchus */}
                <circle cx="22" cy="30" r="2" fill="#CBD5E1" />
                <circle cx="22" cy="30" r="1.1" fill="#475569" />
                {/* Small craters scattered */}
                {[
                  [62, 24, 1.6], [70, 58, 1.4], [40, 68, 1.3], [28, 22, 1.2],
                  [58, 44, 1.1], [46, 56, 1.0], [66, 34, 1.0], [32, 58, 0.9],
                  [74, 48, 0.9], [54, 72, 0.8], [38, 40, 0.8], [60, 62, 0.8],
                ].map(([x, y, r], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r={r as number} fill="#94A3B8" opacity="0.8" />
                    <circle cx={x} cy={y} r={(r as number) * 0.6} fill="#475569" />
                  </g>
                ))}
              </g>

              {/* Rim lighting overlay */}
              <circle cx={cx} cy={cy} r={R} fill="url(#rimLight)" />
            </g>
          )}

          {/* Soft rim glow on sphere edge (lit side only via clip) */}
          {litPath && (
            <g clipPath="url(#moonLit)">
              <circle cx={cx} cy={cy} r={R - 1} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
            </g>
          )}
          {litPath && (
            <g clipPath="url(#moonLit)">
              <circle cx={cx} cy={cy} r={R - 1} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
