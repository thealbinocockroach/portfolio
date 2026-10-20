import React, { useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { playMountainBreeze } from '../utils/audio';

interface MountainRangeProps {
  phase: DayPhase;
  isNight: boolean;
  onInspect: (info: { title: string; subtitle: string; description: string; tag: string }) => void;
}

export const MountainRange: React.FC<MountainRangeProps> = ({
  phase,
  isNight,
  onInspect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMountainBreeze();

    let lightMood = 'Reflecting clear midday sunlight across alpine granite slopes and glacial cirques.';
    if (phase === 'dawn') {
      lightMood = 'Bathed in luminous rose and amber Alpenglow across the snow-capped massifs.';
    } else if (phase === 'morning') {
      lightMood = 'Crisp morning illumination highlighting eastern granite faces and shadowed western couloirs.';
    } else if (phase === 'golden') {
      lightMood = 'Dramatic golden hour casting deep vermilion shadows across the jagged arêtes.';
    } else if (isNight) {
      lightMood = 'Silent nocturnal peaks silhouetted under starry skies with silvery moonlight grazing the snowfields.';
    }

    onInspect({
      title: 'Glacial Alpine Mountain Massif',
      subtitle: 'Peak Elevation: 4,418 m · Continental Ridge',
      description: `Ancient folded granite massifs with faceted arêtes, cirque glaciers, and couloir snowfields. ${lightMood} Natural mountain object with realistic geological strata, responsive to the diurnal sun cycle.`,
      tag: 'ALPINE MASSIF',
    });
  };

  // Realistic diurnal palettes for multiple geological layers and lighting angles
  const getMountainColors = () => {
    if (phase === 'dawn') {
      return {
        // Far peaks: soft pastel violet-rose alpenglow
        farPeakLit: '#FDBA74',
        farPeakShadow: '#C084FC',
        farHaze: 'rgba(253, 186, 116, 0.35)',
        farSnow: '#FFF1F2',
        // Mid massifs: warm morning amber granite with plum shadows
        midRockLit: '#E27D60',
        midRockShadow: '#7E22CE',
        midRockDeep: '#581C87',
        midSnowLit: '#FEF3C7',
        midSnowShadow: '#F472B6',
        // Near foothills: deep warm earthy granite
        nearRockLit: '#B45309',
        nearRockShadow: '#4C1D95',
        ridgeLine: '#FDE68A',
        valleyMist: 'rgba(254, 215, 170, 0.45)',
      };
    }
    if (phase === 'morning') {
      return {
        // Far peaks: airy sky blue and crisp granite
        farPeakLit: '#93C5FD',
        farPeakShadow: '#60A5FA',
        farHaze: 'rgba(186, 230, 253, 0.4)',
        farSnow: '#FFFFFF',
        // Mid massifs: cool slate gray with warm sunlit facets
        midRockLit: '#64748B',
        midRockShadow: '#334155',
        midRockDeep: '#1E293B',
        midSnowLit: '#FFFFFF',
        midSnowShadow: '#CBD5E1',
        // Near foothills: sharp contrast rock
        nearRockLit: '#475569',
        nearRockShadow: '#0F172A',
        ridgeLine: '#F8FAFC',
        valleyMist: 'rgba(224, 242, 254, 0.4)',
      };
    }
    if (phase === 'midday') {
      return {
        // Far peaks: high clarity distant blue-gray
        farPeakLit: '#64748B',
        farPeakShadow: '#475569',
        farHaze: 'rgba(240, 249, 255, 0.3)',
        farSnow: '#FFFFFF',
        // Mid massifs: bright weathered granite
        midRockLit: '#5A6A80',
        midRockShadow: '#283344',
        midRockDeep: '#1A212D',
        midSnowLit: '#FFFFFF',
        midSnowShadow: '#94A3B8',
        // Near foothills: deep textured rock
        nearRockLit: '#384454',
        nearRockShadow: '#0D131C',
        ridgeLine: '#FFFFFF',
        valleyMist: 'rgba(255, 255, 255, 0.35)',
      };
    }
    if (phase === 'golden') {
      return {
        // Far peaks: fiery magenta and dusk purple
        farPeakLit: '#FB923C',
        farPeakShadow: '#9D174D',
        farHaze: 'rgba(251, 146, 60, 0.45)',
        farSnow: '#FEF08A',
        // Mid massifs: blazing copper and deep crimson shadows
        midRockLit: '#EA580C',
        midRockShadow: '#7C2D12',
        midRockDeep: '#431407',
        midSnowLit: '#FDE047',
        midSnowShadow: '#BE185D',
        // Near foothills: dark burnt umber
        nearRockLit: '#C2410C',
        nearRockShadow: '#3B0764',
        ridgeLine: '#FDE047',
        valleyMist: 'rgba(249, 115, 22, 0.4)',
      };
    }
    // Night
    return {
      // Far peaks: nocturnal indigo under starlight
      farPeakLit: '#1E1B4B',
      farPeakShadow: '#0F172A',
      farHaze: 'rgba(30, 27, 75, 0.5)',
      farSnow: '#E0E7FF',
      // Mid massifs: deep navy-slate
      midRockLit: '#1E293B',
      midRockShadow: '#0F172A',
      midRockDeep: '#020617',
      midSnowLit: '#C7D2FE',
      midSnowShadow: '#475569',
      // Near foothills: deep obsidian silhouette
      nearRockLit: '#0F172A',
      nearRockShadow: '#020617',
      ridgeLine: '#A5B4FC',
      valleyMist: 'rgba(15, 23, 42, 0.65)',
    };
  };

  const col = getMountainColors();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[48vh] min-h-[340px] max-h-[620px] pointer-events-auto cursor-pointer select-none transition-all duration-700 overflow-hidden"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Glacial Alpine Mountains (Click to inspect)"
    >
      {/* Alpenglow Atmospheric Rim Glow along the summits */}
      <div
        className={`absolute inset-x-0 top-0 h-36 transition-opacity duration-700 pointer-events-none blur-3xl ${
          isHovered ? 'opacity-90' : 'opacity-50'
        }`}
        style={{
          background: isNight
            ? 'radial-gradient(ellipse at 50% 20%, rgba(165, 180, 252, 0.3), transparent 70%)'
            : phase === 'golden'
            ? 'radial-gradient(ellipse at 50% 20%, rgba(249, 115, 22, 0.5), transparent 70%)'
            : phase === 'dawn'
            ? 'radial-gradient(ellipse at 50% 20%, rgba(251, 146, 60, 0.45), transparent 70%)'
            : 'radial-gradient(ellipse at 50% 20%, rgba(186, 230, 253, 0.4), transparent 70%)',
        }}
      />

      <svg
        className="w-full h-full"
        viewBox="0 0 1920 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradients for natural atmospheric falloff */}
          <linearGradient id="farMountainGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.farPeakLit} />
            <stop offset="65%" stopColor={col.farPeakShadow} />
            <stop offset="100%" stopColor={col.farHaze} stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="midRockEastGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={col.midRockLit} />
            <stop offset="100%" stopColor={col.midRockShadow} />
          </linearGradient>

          <linearGradient id="midRockWestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.midRockShadow} />
            <stop offset="100%" stopColor={col.midRockDeep} />
          </linearGradient>

          <linearGradient id="nearSpurGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.nearRockLit} />
            <stop offset="100%" stopColor={col.nearRockShadow} />
          </linearGradient>

          <linearGradient id="valleyFog1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.valleyMist} stopOpacity="0" />
            <stop offset="50%" stopColor={col.valleyMist} stopOpacity="0.85" />
            <stop offset="100%" stopColor={col.valleyMist} stopOpacity="0" />
          </linearGradient>

          <linearGradient id="valleyFog2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.valleyMist} stopOpacity="0" />
            <stop offset="50%" stopColor={col.valleyMist} stopOpacity="0.7" />
            <stop offset="100%" stopColor={col.valleyMist} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* TIER 1: FAR HORIZON ALPINE PEAKS (Grand distant glaciated range) */}
        {/* ============================================================== */}
        <path
          d="M 0 600
             L 0 310
             L 45 285 L 90 300 L 140 265 L 185 280 L 240 230 L 295 260 L 350 205 L 410 245
             L 470 170 L 530 220 L 590 185 L 660 130 L 720 180 L 780 145 L 850 110 L 920 160
             L 990 120 L 1070 180 L 1140 140 L 1210 190 L 1290 125 L 1370 175 L 1450 135
             L 1530 190 L 1610 145 L 1690 195 L 1760 160 L 1830 210 L 1920 180
             L 1920 600 Z"
          fill="url(#farMountainGrad)"
          className="transition-colors duration-700 ease-out"
        />

        {/* Glacial Snow Caps on Far Peaks */}
        <path
          d="M 660 130 L 640 160 L 655 155 L 675 162 L 660 130 Z
             M 850 110 L 830 145 L 848 138 L 868 148 L 850 110 Z
             M 470 170 L 455 195 L 472 190 L 485 200 L 470 170 Z
             M 1290 125 L 1272 155 L 1290 150 L 1308 158 L 1290 125 Z
             M 1450 135 L 1435 160 L 1450 155 L 1465 162 L 1450 135 Z"
          fill={col.farSnow}
          opacity="0.85"
          className="transition-colors duration-700 ease-out"
        />

        {/* Far Valley Drift Mist Layer */}
        <rect
          x="-100"
          y="240"
          width="2120"
          height="120"
          fill="url(#valleyFog1)"
          className="animate-mist-slow pointer-events-none"
        />

        {/* ============================================================== */}
        {/* TIER 2: MIDGROUND ROCKY MASSIFS (Detailed 3D Facets & Arêtes)  */}
        {/* ============================================================== */}

        {/* MASSIF A: Western Ridge (Left, Summit at X=380, Y=160) */}
        {/* Sunward East Face */}
        <path
          d="M 80 600 L 160 380 L 240 310 L 320 230 L 380 160
             L 395 240 L 410 320 L 430 420 L 450 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* Shadowed West Face & Couloirs */}
        <path
          d="M 380 160 L 420 220 L 460 280 L 520 360 L 580 460 L 640 600
             L 450 600 L 430 420 L 410 320 L 395 240 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* Snowpack & Cirque on Massif A */}
        <path
          d="M 380 160 L 350 210 Q 370 205 395 240 Q 405 200 425 215 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 380 160 L 395 240 Q 415 220 425 215 Z"
          fill={col.midSnowShadow}
          className="transition-colors duration-700 ease-out"
        />
        {/* Rocky Cleavage Fracture Lines */}
        <path
          d="M 320 230 L 345 285 L 360 350
             M 240 310 L 265 370
             M 420 220 L 440 290 L 460 370"
          stroke={col.midRockDeep}
          strokeWidth="2.5"
          opacity="0.6"
        />

        {/* MASSIF B: Central Monarch Peak (Summit at X=960, Y=95) */}
        {/* East Glacial Face (Illuminated) */}
        <path
          d="M 520 600 L 640 430 L 740 320 L 840 220 L 920 145 L 960 95
             L 980 190 L 1000 280 L 1025 390 L 1060 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* West Precipice (Deep Shadow) */}
        <path
          d="M 960 95 L 1010 170 L 1070 260 L 1150 360 L 1230 470 L 1310 600
             L 1060 600 L 1025 390 L 1000 280 L 980 190 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* Glacial Cirque & Snow Summit on Monarch Peak */}
        <path
          d="M 960 95 L 925 150 Q 950 145 980 190 Q 995 150 1020 165 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 960 95 L 980 190 Q 1000 165 1020 165 Z"
          fill={col.midSnowShadow}
          className="transition-colors duration-700 ease-out"
        />
        {/* Glacial Couloir Snow Tongues running down rocky ravines */}
        <path
          d="M 980 190 Q 990 235 998 275 Q 1010 240 1020 210 Z
             M 925 150 Q 895 200 870 240 Q 900 220 920 190 Z"
          fill={col.midSnowLit}
          opacity="0.9"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 998 275 Q 1005 320 1015 365 Q 1025 330 1035 300 Z"
          fill={col.midSnowShadow}
          opacity="0.85"
          className="transition-colors duration-700 ease-out"
        />

        {/* MASSIF C: Eastern High Horn (Right, Summit at X=1520, Y=140) */}
        {/* East Face */}
        <path
          d="M 1180 600 L 1280 430 L 1380 310 L 1460 220 L 1520 140
             L 1540 230 L 1560 320 L 1585 430 L 1620 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* West Shadow Face */}
        <path
          d="M 1520 140 L 1570 210 L 1640 300 L 1720 400 L 1800 500 L 1880 600
             L 1620 600 L 1585 430 L 1560 320 L 1540 230 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        {/* Snowcap on Massif C */}
        <path
          d="M 1520 140 L 1490 190 Q 1515 185 1540 230 Q 1555 190 1580 205 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 1520 140 L 1540 230 Q 1560 205 1580 205 Z"
          fill={col.midSnowShadow}
          className="transition-colors duration-700 ease-out"
        />

        {/* Intermediate Floating Mountain Mist */}
        <rect
          x="-100"
          y="320"
          width="2120"
          height="140"
          fill="url(#valleyFog2)"
          className="animate-mist-reverse pointer-events-none"
        />

        {/* ============================================================== */}
        {/* TIER 3: CRAGGY FOREGROUND FOOTHILLS & ROCK RIDGES               */}
        {/* Natural rugged rock ridges with jagged contours and talus      */}
        {/* ============================================================== */}

        {/* Left Foothill Spur (Rugged granite bluffs) */}
        <path
          d="M 0 600
             L 0 380
             Q 60 340 120 365
             Q 180 320 260 350
             Q 340 300 420 345
             Q 500 310 590 360
             Q 680 330 760 380
             Q 840 350 920 405
             L 920 600 Z"
          fill="url(#nearSpurGrad)"
          className="transition-colors duration-700 ease-out"
        />

        {/* Right Foothill Spur (Interlocking mountain ridge) */}
        <path
          d="M 850 600
             L 850 420
             Q 940 360 1040 395
             Q 1130 335 1240 375
             Q 1340 320 1450 365
             Q 1560 330 1670 380
             Q 1780 345 1920 390
             L 1920 600 Z"
          fill="url(#nearSpurGrad)"
          className="transition-colors duration-700 ease-out"
        />

        {/* Sharp Razor Ridge Edge Highlights (Light catching rocky crests) */}
        <path
          d="M 380 160 L 320 230 L 240 310 L 160 380
             M 960 95 L 920 145 L 840 220 L 740 320 L 640 430
             M 1520 140 L 1460 220 L 1380 310 L 1280 430"
          stroke={col.ridgeLine}
          strokeWidth="2"
          strokeLinecap="round"
          opacity={isNight ? '0.5' : '0.8'}
        />

        {/* Subtle Scree Slope & Rock Outcrop Lines on Foothills */}
        <path
          d="M 120 365 L 145 420 M 260 350 L 290 410 M 420 345 L 450 415
             M 1040 395 L 1070 455 M 1240 375 L 1270 440 M 1450 365 L 1485 435"
          stroke={col.nearRockShadow}
          strokeWidth="2"
          opacity="0.45"
        />
      </svg>
    </div>
  );
};
