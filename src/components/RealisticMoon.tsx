import React, { useState } from 'react';
import { playBottleClick } from '../utils/audio';

interface RealisticMoonProps {
  progress: number;
  sunPosition: { x: number; y: number };
  opacity: number;
  onInspect: (info: { title: string; subtitle: string; description: string; tag: string }) => void;
}

export const RealisticMoon: React.FC<RealisticMoonProps> = ({
  progress,
  sunPosition,
  opacity,
  onInspect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  if (opacity <= 0.01) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playBottleClick();
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    onInspect({
      title: 'The Moon · Luna',
      subtitle: 'Earth\'s Natural Satellite · Mean Distance: 384,400 km',
      description: 'Synchronous rotation with Earth revealing ancient basaltic lava plains (Maria) and ancient impact craters (Tycho, Copernicus) under ambient starlight.',
      tag: 'CELESTIAL OBJECT',
    });
  };

  return (
    <div
      className="absolute transition-transform duration-150 ease-out pointer-events-auto cursor-pointer"
      style={{
        left: `${sunPosition.x}%`,
        top: `${sunPosition.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity,
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="The Moon (Click to inspect)"
    >
      <div className="relative flex items-center justify-center">
        {/* Outermost Ethereal Lunar Atmosphere Halo */}
        <div
          className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(165, 180, 252, 0.28) 0%, rgba(99, 102, 241, 0.12) 50%, transparent 75%)',
            transform: isHovered || isPulsing ? 'scale(1.25)' : 'scale(1)',
          }}
        />

        {/* Intermediate Lunar Glow */}
        <div
          className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-xl pointer-events-none transition-all duration-500"
          style={{
            background: 'rgba(224, 231, 255, 0.45)',
            transform: isPulsing ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        {/* 3D Realistic Lunar Sphere */}
        <div
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden border border-slate-300/40"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #F8FAFC 0%, #E2E8F0 45%, #94A3B8 80%, #475569 100%)',
            boxShadow:
              '0 0 35px rgba(199, 210, 254, 0.5), inset -5px -6px 14px rgba(15, 23, 42, 0.75), inset 4px 4px 10px rgba(255, 255, 255, 0.8)',
            transform: isHovered || isPulsing ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {/* SVG Map of Lunar Maria & Craters */}
          <svg
            className="absolute inset-0 w-full h-full opacity-65 mix-blend-multiply pointer-events-none"
            viewBox="0 0 100 100"
          >
            {/* Mare Tranquillitatis & Serenitatis (Dark Basaltic Plains) */}
            <path
              d="M48 28 C55 24, 68 28, 70 38 C72 48, 62 55, 52 50 C44 46, 42 32, 48 28 Z"
              fill="#475569"
              opacity="0.85"
            />
            {/* Oceanus Procellarum (Large Western Plain) */}
            <path
              d="M18 35 C25 22, 42 24, 40 42 C38 58, 22 62, 16 50 C12 42, 14 36, 18 35 Z"
              fill="#334155"
              opacity="0.8"
            />
            {/* Mare Imbrium */}
            <circle cx="36" cy="32" r="11" fill="#475569" opacity="0.75" />
            {/* Mare Crisium (Oval Eastern Mare) */}
            <ellipse cx="76" cy="42" rx="6" ry="8" fill="#334155" opacity="0.85" />
            {/* Mare Nubium & Humorum (Southern Plains) */}
            <path
              d="M26 62 C34 58, 45 64, 42 74 C38 82, 28 80, 24 72 Z"
              fill="#475569"
              opacity="0.7"
            />

            {/* Craters with Ray Systems */}
            {/* Tycho Crater in Southern Highlands with radial rays */}
            <circle cx="50" cy="80" r="3" fill="#FFFFFF" opacity="0.95" />
            <line x1="50" y1="80" x2="35" y2="65" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />
            <line x1="50" y1="80" x2="68" y2="70" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />
            <line x1="50" y1="80" x2="52" y2="92" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.5" />
            <line x1="50" y1="80" x2="28" y2="84" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />

            {/* Copernicus Crater */}
            <circle cx="36" cy="48" r="3.2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="36" cy="48" r="1.4" fill="#334155" opacity="0.7" />

            {/* Kepler Crater */}
            <circle cx="24" cy="46" r="2" fill="#FFFFFF" opacity="0.8" />
          </svg>

          {/* 3D Terminator Shadow Layer (Spherical Waxing Gibbous Shading) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 28% 30%, transparent 40%, rgba(15, 23, 42, 0.45) 75%, rgba(2, 6, 23, 0.85) 100%)',
            }}
          />

          {/* Rim Light / Limb Brightening */}
          <div className="absolute inset-0 rounded-full border-t border-l border-white/60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
