import React, { useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { playBottleClick } from '../utils/audio';

interface RealisticSunProps {
  progress: number;
  phase: DayPhase;
  sunPosition: { x: number; y: number };
  sunAltitude: number;
  opacity: number;
  onInspect: (info: { title: string; subtitle: string; description: string; tag: string }) => void;
}

export const RealisticSun: React.FC<RealisticSunProps> = ({
  progress,
  phase,
  sunPosition,
  sunAltitude,
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

    let temp = '5778K';
    let phaseDesc = 'Radiating peak solar irradiance across the atmosphere at noon.';
    if (phase === 'dawn') {
      temp = '2800K';
      phaseDesc = 'Low horizon angle creates Rayleigh atmospheric scattering, bathing the sky in warm amber and blush.';
    } else if (phase === 'morning') {
      temp = '4500K';
      phaseDesc = 'Crisp morning sunlight illuminating the atmosphere with high visual clarity.';
    } else if (phase === 'golden') {
      temp = '2200K';
      phaseDesc = 'Deep golden hour light casting long shadows and rich amber hues.';
    }

    onInspect({
      title: 'The Sun · Solar Core',
      subtitle: `Solar Altitude: ${sunAltitude}° · Effective Temp: ${temp}`,
      description: `A G2V yellow-white main-sequence star. ${phaseDesc}`,
      tag: 'CELESTIAL LUMEN',
    });
  };

  // Color schemes for natural atmospheric optical lighting
  const getAtmosphericGlow = () => {
    if (phase === 'dawn') {
      return {
        coreColor: '#FFF8E7',
        innerHalo: 'radial-gradient(circle, #FFFFFF 0%, #FEF08A 25%, #FB923C 60%, #EA580C 85%, transparent 100%)',
        outerGlow: 'radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(244, 114, 182, 0.4) 45%, rgba(253, 230, 138, 0.15) 75%, transparent 100%)',
        ambientWash: 'rgba(251, 146, 60, 0.35)',
        lensStreak: 'rgba(251, 146, 60, 0.4)',
      };
    }
    if (phase === 'morning') {
      return {
        coreColor: '#FFFFFF',
        innerHalo: 'radial-gradient(circle, #FFFFFF 0%, #FEF9C3 30%, #FDE047 65%, #F59E0B 85%, transparent 100%)',
        outerGlow: 'radial-gradient(circle, rgba(254, 240, 138, 0.8) 0%, rgba(186, 230, 253, 0.45) 50%, rgba(224, 242, 254, 0.15) 80%, transparent 100%)',
        ambientWash: 'rgba(254, 240, 138, 0.4)',
        lensStreak: 'rgba(254, 240, 138, 0.45)',
      };
    }
    if (phase === 'midday') {
      return {
        coreColor: '#FFFFFF',
        innerHalo: 'radial-gradient(circle, #FFFFFF 0%, #FEF9C3 20%, #FEF08A 50%, #FACC15 80%, transparent 100%)',
        outerGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(254, 240, 138, 0.7) 35%, rgba(253, 224, 71, 0.35) 65%, transparent 100%)',
        ambientWash: 'rgba(254, 240, 138, 0.55)',
        lensStreak: 'rgba(255, 255, 255, 0.6)',
      };
    }
    // Sunset / Golden Hour
    return {
      coreColor: '#FFFBEB',
      innerHalo: 'radial-gradient(circle, #FFFBEB 0%, #FDE047 25%, #F97316 60%, #DC2626 85%, transparent 100%)',
      outerGlow: 'radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, rgba(225, 29, 72, 0.5) 45%, rgba(190, 24, 93, 0.2) 75%, transparent 100%)',
      ambientWash: 'rgba(234, 88, 12, 0.45)',
      lensStreak: 'rgba(249, 115, 22, 0.5)',
    };
  };

  const glow = getAtmosphericGlow();
  const flareRotation = (progress - 0.5) * 40;

  return (
    <div
      className="absolute transition-transform duration-200 ease-out pointer-events-auto cursor-pointer"
      style={{
        left: `${sunPosition.x}%`,
        top: `${sunPosition.y}%`,
        transform: 'translate(-50%, -50%)',
        opacity,
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="The Sun (Click to inspect)"
    >
      <div className="relative flex items-center justify-center">
        {/* 1. Immense Soft Atmospheric Sky Wash (Rayleigh/Mie Diffusion) */}
        <div
          className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{
            background: glow.outerGlow,
            transform: isHovered || isPulsing ? 'scale(1.2)' : 'scale(1)',
          }}
        />

        {/* 2. Middle Radiant Corona Bloom */}
        <div
          className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-2xl pointer-events-none transition-all duration-500"
          style={{
            background: glow.ambientWash,
            transform: isPulsing ? 'scale(1.18)' : 'scale(1)',
          }}
        />

        {/* 3. Subtle Optical Horizon Anamorphic Beam (Clean & Pure) */}
        <div
          className="absolute w-72 sm:w-96 h-1 sm:h-1.5 rounded-full pointer-events-none blur-xs transition-transform duration-300"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${glow.lensStreak} 50%, transparent 100%)`,
            transform: `rotate(${flareRotation}deg) scaleX(${isHovered ? 1.3 : 1})`,
          }}
        />

        {/* 4. Smooth Optical Solar Disk (Seamless, Pure Light, NO Tiles or Grid) */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full pointer-events-none transition-transform duration-300 flex items-center justify-center"
          style={{
            background: glow.innerHalo,
            filter: 'blur(3px)',
            transform: isHovered || isPulsing ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* 5. Pure Blinding Incandescent Core (White Hot Heart of the Sun) */}
        <div
          className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full pointer-events-none transition-transform duration-300 shadow-2xl"
          style={{
            backgroundColor: glow.coreColor,
            boxShadow: `0 0 35px 12px ${glow.coreColor}, 0 0 65px 25px ${glow.ambientWash}`,
            filter: 'blur(1px)',
            transform: isHovered || isPulsing ? 'scale(1.06)' : 'scale(1)',
          }}
        />
      </div>
    </div>
  );
};
