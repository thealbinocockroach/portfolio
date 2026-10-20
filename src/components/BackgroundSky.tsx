import React, { useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { ChevronDown, Sparkles } from 'lucide-react';
import { RealisticSun } from './RealisticSun';
import { RealisticMoon } from './RealisticMoon';
import { MountainRange } from './MountainRange';
import { ForestCanopy } from './ForestCanopy';
import { Modal } from './Modal';

interface BackgroundSkyProps {
  progress: number;
  phase: DayPhase;
  sunPosition: { x: number; y: number };
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
  isNight,
}) => {
  const [inspectedEntity, setInspectedEntity] = useState<InspectedEntity | null>(null);

  // Sun visibility: 0 -> 0.76 (fades out as golden hour transitions to night)
  const sunOpacity = progress <= 0.7 ? 1 : Math.max(0, 1 - (progress - 0.7) / 0.1);

  // Moon visibility: rises starting at 0.72, full by 0.84
  const moonOpacity = progress < 0.72 ? 0 : Math.min(1, (progress - 0.72) / 0.12);

  return (
    <div className="fixed inset-0 overflow-hidden select-none" aria-hidden="true">
      {/* 1. Dawn / Sunrise Atmosphere (7:00 AM - 8:30 AM) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: Math.max(0, 1 - progress * 3.8),
          background:
            'radial-gradient(ellipse at 25% 65%, #FDE047 0%, #FDBA74 30%, #F472B6 65%, #FDEBD0 100%)',
        }}
      />

      {/* 2. Bright Morning Atmosphere (8:30 AM - 11:30 AM) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity:
            progress >= 0.12 && progress <= 0.48
              ? Math.sin(((progress - 0.12) / 0.36) * Math.PI)
              : 0,
          background:
            'radial-gradient(ellipse at 42% 28%, #FFFFFF 0%, #BAE6FD 35%, #E0F2FE 75%, #F0F9FF 100%)',
        }}
      />

      {/* 3. Midday Sun Atmosphere (11:30 AM - 3:00 PM) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity:
            progress >= 0.36 && progress <= 0.68
              ? Math.sin(((progress - 0.36) / 0.32) * Math.PI)
              : 0,
          background:
            'radial-gradient(ellipse at 50% 18%, #FEF08A 0%, #FDE047 22%, #93C5FD 70%, #F0F9FF 100%)',
        }}
      />

      {/* 4. Sunset / Golden Hour Atmosphere (4:30 PM - 7:30 PM) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity:
            progress >= 0.58 && progress <= 0.86
              ? Math.sin(((progress - 0.58) / 0.28) * Math.PI)
              : 0,
          background:
            'linear-gradient(180deg, #1E1B4B 0%, #581C87 25%, #BE185D 50%, #EA580C 75%, #F59E0B 100%)',
        }}
      />

      {/* 5. Midnight / Deep Cosmos Atmosphere (8:30 PM - 12:00 AM) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          opacity: progress >= 0.74 ? Math.min(1, (progress - 0.74) / 0.18) : 0,
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

      {/* Night Sky Stars & Constellations */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
        style={{
          opacity: isNight ? Math.min(1, (progress - 0.74) / 0.16) : 0,
        }}
      >
        <svg className="w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
          {[
            { cx: '12%', cy: '14%', r: '1.4' },
            { cx: '18%', cy: '28%', r: '1.0' },
            { cx: '24%', cy: '09%', r: '1.8' },
            { cx: '35%', cy: '18%', r: '1.1' },
            { cx: '42%', cy: '07%', r: '1.6' },
            { cx: '55%', cy: '22%', r: '1.3' },
            { cx: '63%', cy: '12%', r: '2.0' },
            { cx: '72%', cy: '32%', r: '1.0' },
            { cx: '81%', cy: '15%', r: '1.7' },
            { cx: '88%', cy: '25%', r: '1.3' },
            { cx: '92%', cy: '08%', r: '1.1' },
            { cx: '07%', cy: '38%', r: '1.2' },
            { cx: '15%', cy: '52%', r: '1.5' },
            { cx: '30%', cy: '44%', r: '1.0' },
            { cx: '48%', cy: '38%', r: '1.6' },
            { cx: '68%', cy: '48%', r: '1.2' },
            { cx: '85%', cy: '42%', r: '1.5' },
            { cx: '94%', cy: '58%', r: '1.2' },
          ].map((star, idx) => (
            <circle
              key={idx}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="#FFFFFF"
              className="animate-pulse"
              style={{
                animationDelay: `${(idx * 0.4) % 3}s`,
                animationDuration: `${2 + (idx % 3)}s`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* CELESTIAL OBJECT: REALISTIC SUN */}
      <RealisticSun
        progress={progress}
        phase={phase}
        sunPosition={sunPosition}
        opacity={sunOpacity}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* CELESTIAL OBJECT: REALISTIC MOON */}
      <RealisticMoon
        progress={progress}
        sunPosition={sunPosition}
        opacity={moonOpacity}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* NATURAL LANDSCAPE OBJECT 1: MOUNTAIN RANGE */}
      <MountainRange
        phase={phase}
        isNight={isNight}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* NATURAL LANDSCAPE OBJECT 2: FOREST CANOPY */}
      <ForestCanopy
        phase={phase}
        isNight={isNight}
        onInspect={(info) => setInspectedEntity(info)}
      />

      {/* Scroll & Interaction Prompt indicator (Fades out as user scrolls) */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-500 pointer-events-none z-20"
        style={{
          opacity: Math.max(0, 1 - progress * 9),
        }}
      >
        <span className="text-[11px] font-mono font-medium tracking-wider text-amber-950/80 dark:text-slate-200/80 uppercase flex items-center gap-1.5 bg-white/40 dark:bg-black/40 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Scroll for diurnal transit · Touch objects to inspect</span>
        </span>
        <ChevronDown className="w-4 h-4 text-amber-900/70 dark:text-slate-300/70 animate-bounce" />
      </div>

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
