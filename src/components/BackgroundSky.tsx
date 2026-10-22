import React, { useState } from 'react';
import { DayPhase, StarPoint, StarLine } from '../types/portfolio';
import { RealisticSun } from './RealisticSun';
import { RealisticMoon } from './RealisticMoon';
import { StarField } from './StarField';
import { Modal } from './Modal';

interface BackgroundSkyProps {
  progress: number;
  phase: DayPhase;
  sunPosition: { x: number; y: number };
  moonPosition: { x: number; y: number };
  sunAltitude: number;
  sunOpacity: number;
  moonOpacity: number;
  starPoints: StarPoint[];
  starLines: StarLine[];
  moonPhase: number;
  moonIllumination: number;
  moonWaxing: boolean;
  moonPhaseName: string;
  isNight: boolean;
}

interface InspectedEntity {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export const BackgroundSky: React.FC<BackgroundSkyProps> = ({
  progress,
  phase,
  sunPosition,
  moonPosition,
  sunAltitude,
  sunOpacity,
  moonOpacity,
  starPoints,
  starLines,
  moonPhase,
  moonIllumination,
  moonWaxing,
  moonPhaseName,
  isNight,
}) => {
  const [inspectedEntity, setInspectedEntity] = useState<InspectedEntity | null>(null);

  // Real stars wash out through twilight: gone by -2° solar altitude,
  // fully dark by -8°
  const starOpacity = sunAltitude > -2 ? 0 : Math.min(1, (-2 - sunAltitude) / 6);

  return (
    <div className="fixed inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Dawn / Sunrise Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: phase === 'dawn' ? 1 : 0,
          background:
            'radial-gradient(ellipse at 25% 65%, #FDE047 0%, #FDBA74 30%, #F472B6 65%, #FDEBD0 100%)',
        }}
      />

      {/* 2. Bright Morning Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: phase === 'morning' ? 1 : 0,
          background:
            'radial-gradient(ellipse at 42% 28%, #FFFFFF 0%, #BAE6FD 35%, #E0F2FE 75%, #F0F9FF 100%)',
        }}
      />

      {/* 3. Midday Sun Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: phase === 'midday' ? 1 : 0,
          background:
            'radial-gradient(ellipse at 50% 18%, #FEF08A 0%, #FDE047 22%, #93C5FD 70%, #F0F9FF 100%)',
        }}
      />

      {/* 4. Sunset / Golden Hour Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: phase === 'golden' ? 1 : 0,
          background:
            'linear-gradient(180deg, #1E1B4B 0%, #581C87 25%, #BE185D 50%, #EA580C 75%, #F59E0B 100%)',
        }}
      />

      {/* 5. Midnight / Deep Cosmos Atmosphere */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: isNight ? 1 : 0,
          background:
            'radial-gradient(ellipse at 78% 28%, #1E1B4B 0%, #0F172A 48%, #030712 100%)',
        }}
      />

      {/* Soft Cirrus Cloud Layers */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          opacity: !isNight ? 0.35 : 0.08,
        }}
      >
        <div className="absolute top-1/4 left-0 w-3/4 h-24 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-3xl transform -skew-y-6" />
        <div className="absolute top-1/3 right-0 w-2/3 h-28 bg-gradient-to-l from-transparent via-white/30 to-transparent blur-3xl transform skew-y-3" />
      </div>

      {/* Night Sky: Real Astronomical Star Field (RA/Dec catalog, sidereal motion) */}
      <StarField points={starPoints} lines={starLines} opacity={starOpacity} />

      {/* CELESTIAL OBJECT: REALISTIC SUN */}
      <RealisticSun
        progress={progress}
        phase={phase}
        sunPosition={sunPosition}
        sunAltitude={sunAltitude}
        opacity={sunOpacity}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* CELESTIAL OBJECT: REALISTIC MOON */}
      <RealisticMoon
        progress={progress}
        position={moonPosition}
        sunAltitude={sunAltitude}
        opacity={moonOpacity}
        moonPhase={moonPhase}
        moonIllumination={moonIllumination}
        moonWaxing={moonWaxing}
        moonPhaseName={moonPhaseName}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* Inspector Modal for Landscape & Celestial Objects */}
      <Modal
        isOpen={inspectedEntity !== null}
        onClose={() => setInspectedEntity(null)}
        title={inspectedEntity?.title || ''}
        subtitle={inspectedEntity?.subtitle}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/50 dark:border-amber-800">
              {inspectedEntity?.tag}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {inspectedEntity?.description}
          </p>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
            Connected to diurnal daylight engine · Interactive modular entity for upcoming builds.
          </div>
        </div>
      </Modal>
    </div>
  );
};
