import React, { useMemo, useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { playMountainBreeze } from '../utils/audio';
import { mulberry32, randBetween } from '../utils/random';

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

    let lightMood = 'Reflecting clear midday sunlight across rounded alpine slopes.';
    if (phase === 'dawn') {
      lightMood = 'Bathed in luminous rose and amber Alpenglow across the rounded massifs.';
    } else if (phase === 'morning') {
      lightMood = 'Crisp morning illumination highlighting eastern faces and shadowed western slopes.';
    } else if (phase === 'golden') {
      lightMood = 'Dramatic golden hour casting deep vermilion shadows across the rounded arêtes.';
    } else if (isNight) {
      lightMood = 'Silent nocturnal peaks silhouetted under starry skies with silvery moonlight grazing the snowfields.';
    }

    onInspect({
      title: 'Rounded Alpine Mountain Massif',
      subtitle: 'Peak Elevation: 4,418 m · Continental Ridge',
      description: `Ancient folded granite massifs with rounded, smooth summits and couloir snowfields. ${lightMood} Natural mountain object with realistic geological strata, responsive to the diurnal sun cycle.`,
      tag: 'ALPINE MASSIF',
    });
  };

  const getMountainColors = () => {
    if (phase === 'dawn') {
      return {
        farPeakLit: '#FDBA74',
        farPeakShadow: '#C084FC',
        farHaze: 'rgba(253, 186, 116, 0.35)',
        farSnow: '#FFF1F2',
        midRockLit: '#E27D60',
        midRockShadow: '#7E22CE',
        midRockDeep: '#581C87',
        midSnowLit: '#FEF3C7',
        midSnowShadow: '#F472B6',
        nearRockLit: '#B45309',
        nearRockShadow: '#4C1D95',
        ridgeLine: '#FDE68A',
        valleyMist: 'rgba(254, 215, 170, 0.45)',
      };
    }
    if (phase === 'morning') {
      return {
        farPeakLit: '#93C5FD',
        farPeakShadow: '#60A5FA',
        farHaze: 'rgba(186, 230, 253, 0.4)',
        farSnow: '#FFFFFF',
        midRockLit: '#64748B',
        midRockShadow: '#334155',
        midRockDeep: '#1E293B',
        midSnowLit: '#FFFFFF',
        midSnowShadow: '#CBD5E1',
        nearRockLit: '#475569',
        nearRockShadow: '#0F172A',
        ridgeLine: '#F8FAFC',
        valleyMist: 'rgba(224, 242, 254, 0.4)',
      };
    }
    if (phase === 'midday') {
      return {
        farPeakLit: '#64748B',
        farPeakShadow: '#475569',
        farHaze: 'rgba(240, 249, 255, 0.3)',
        farSnow: '#FFFFFF',
        midRockLit: '#5A6A80',
        midRockShadow: '#283344',
        midRockDeep: '#1A212D',
        midSnowLit: '#FFFFFF',
        midSnowShadow: '#94A3B8',
        nearRockLit: '#384454',
        nearRockShadow: '#0D131C',
        ridgeLine: '#FFFFFF',
        valleyMist: 'rgba(255, 255, 255, 0.35)',
      };
    }
    if (phase === 'golden') {
      return {
        farPeakLit: '#FB923C',
        farPeakShadow: '#9D174D',
        farHaze: 'rgba(251, 146, 60, 0.45)',
        farSnow: '#FEF08A',
        midRockLit: '#EA580C',
        midRockShadow: '#7C2D12',
        midRockDeep: '#431407',
        midSnowLit: '#FDE047',
        midSnowShadow: '#BE185D',
        nearRockLit: '#C2410C',
        nearRockShadow: '#3B0764',
        ridgeLine: '#FDE047',
        valleyMist: 'rgba(249, 115, 22, 0.4)',
      };
    }
    return {
      farPeakLit: '#1E1B4B',
      farPeakShadow: '#0F172A',
      farHaze: 'rgba(30, 27, 75, 0.5)',
      farSnow: '#E0E7FF',
      midRockLit: '#1E293B',
      midRockShadow: '#0F172A',
      midRockDeep: '#020617',
      midSnowLit: '#C7D2FE',
      midSnowShadow: '#475569',
      nearRockLit: '#0F172A',
      nearRockShadow: '#020617',
      ridgeLine: '#A5B4FC',
      valleyMist: 'rgba(15, 23, 42, 0.65)',
    };
  };

  const col = getMountainColors();

  const getTreeColors = () => {
    if (phase === 'dawn') return { lit: '#3E7A4F', dark: '#1E3B2A' };
    if (phase === 'morning') return { lit: '#3F9A57', dark: '#1E4D30' };
    if (phase === 'midday') return { lit: '#2E8B4A', dark: '#17512E' };
    if (phase === 'golden') return { lit: '#3A7A48', dark: '#1C3A25' };
    return { lit: '#123428', dark: '#060F0B' };
  };
  const treeCol = getTreeColors();

  const makeConifer = (cx: number, baseY: number, h: number, w: number) => {
    const tiers = [
      { top: baseY - h, bottom: baseY - h * 0.5, half: w * 0.35 },
      { top: baseY - h * 0.72, bottom: baseY - h * 0.26, half: w * 0.52 },
      { top: baseY - h * 0.46, bottom: baseY, half: w * 0.68 },
    ];
    let d = '';
    tiers.forEach((seg) => {
      d += `M ${cx} ${seg.top} L ${cx + seg.half} ${seg.bottom} L ${cx - seg.half} ${seg.bottom} Z `;
    });
    return d;
  };

  const qPoint = (
    p0: { x: number; y: number },
    c: { x: number; y: number },
    p1: { x: number; y: number },
    t: number
  ) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * c.x + t ** 2 * p1.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p1.y,
  });

  type SlopeTree = { x: number; y: number; h: number; w: number };

  // Random trees scattered across every mountain slope and ridge
  const slopeTrees = useMemo(() => {
    const r = mulberry32(555);

    // Far ridge treeline (tiny silhouettes along the distant ridge)
    const farRidges = [
      [{ x: 0, y: 340 }, { x: 240, y: 200 }, { x: 480, y: 280 }],
      [{ x: 480, y: 280 }, { x: 720, y: 160 }, { x: 960, y: 240 }],
      [{ x: 960, y: 240 }, { x: 1200, y: 180 }, { x: 1440, y: 260 }],
      [{ x: 1440, y: 260 }, { x: 1680, y: 200 }, { x: 1920, y: 290 }],
    ];
    const far: SlopeTree[] = [];
    farRidges.forEach(([p0, c, p1]) => {
      const n = Math.floor(randBetween(r, 14, 22));
      for (let i = 0; i < n; i++) {
        const t = randBetween(r, 0.04, 0.96);
        const p = qPoint(p0, c, p1, t);
        const h = randBetween(r, 9, 20);
        far.push({ x: p.x, y: p.y + randBetween(r, 2, 14), h, w: h * 0.7 });
      }
    });

    // Mid mountain slope treelines
    const midRidges = [
      [{ x: 60, y: 420 }, { x: 240, y: 120 }, { x: 420, y: 420 }],
      [{ x: 700, y: 400 }, { x: 960, y: 60 }, { x: 1220, y: 400 }],
      [{ x: 1400, y: 420 }, { x: 1580, y: 140 }, { x: 1760, y: 420 }],
    ];
    const mid: SlopeTree[] = [];
    midRidges.forEach(([p0, c, p1]) => {
      const n = Math.floor(randBetween(r, 26, 38));
      for (let i = 0; i < n; i++) {
        const t = randBetween(r, 0.06, 0.94);
        const p = qPoint(p0, c, p1, t);
        const drop = randBetween(r, 6, 150) * (0.4 + (p.y / 600) * 0.8);
        const alt = Math.min(1, p.y / 600);
        const h = randBetween(r, 16, 34) * (0.55 + alt * 0.7);
        mid.push({ x: p.x + randBetween(r, -14, 14), y: p.y + drop, h, w: h * 0.75 });
      }
    });

    // Foothill treeline (larger, closer trees along the near ridge)
    const footRidges = [
      [{ x: 0, y: 420 }, { x: 120, y: 360 }, { x: 240, y: 400 }],
      [{ x: 240, y: 400 }, { x: 360, y: 340 }, { x: 480, y: 380 }],
      [{ x: 480, y: 380 }, { x: 600, y: 330 }, { x: 720, y: 390 }],
      [{ x: 720, y: 390 }, { x: 840, y: 350 }, { x: 960, y: 400 }],
      [{ x: 960, y: 400 }, { x: 1080, y: 340 }, { x: 1200, y: 385 }],
      [{ x: 1200, y: 385 }, { x: 1320, y: 330 }, { x: 1440, y: 390 }],
      [{ x: 1440, y: 390 }, { x: 1560, y: 345 }, { x: 1680, y: 385 }],
      [{ x: 1680, y: 385 }, { x: 1800, y: 360 }, { x: 1920, y: 400 }],
    ];
    const near: SlopeTree[] = [];
    footRidges.forEach(([p0, c, p1]) => {
      const n = Math.floor(randBetween(r, 5, 9));
      for (let i = 0; i < n; i++) {
        const t = randBetween(r, 0.05, 0.95);
        const p = qPoint(p0, c, p1, t);
        const h = randBetween(r, 34, 68);
        near.push({ x: p.x + randBetween(r, -10, 10), y: p.y + randBetween(r, 18, 110), h, w: h * 0.8 });
      }
    });

    return { far, mid, near };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[48vh] min-h-[340px] max-h-[620px] pointer-events-auto cursor-pointer select-none transition-all duration-700 overflow-hidden"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Rounded Alpine Mountains (Click to inspect)"
    >
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

        {/* Far rounded ridge */}
        <path
          d="M 0 600
             L 0 340
             Q 240 200 480 280
             Q 720 160 960 240
             Q 1200 180 1440 260
             Q 1680 200 1920 290
             L 1920 600 Z"
          fill="url(#farMountainGrad)"
          className="transition-colors duration-700 ease-out"
        />

        {/* Snow caps on far ridge */}
        <path
          d="M 960 240 Q 940 220 920 235 Q 945 225 960 210 Q 975 225 1000 235 Q 980 220 960 240 Z"
          fill={col.farSnow}
          opacity="0.85"
          className="transition-colors duration-700 ease-out"
        />

        {/* Far ridge treeline silhouettes */}
        <g fill={treeCol.dark} opacity="0.75" className="transition-colors duration-700 ease-out">
          {slopeTrees.far.map((t, i) => (
            <path key={`ft-${i}`} d={makeConifer(t.x, t.y, t.h, t.w)} />
          ))}
        </g>

        {/* Far valley mist */}
        <rect
          x="-100"
          y="240"
          width="2120"
          height="120"
          fill="url(#valleyFog1)"
          className="animate-mist-slow pointer-events-none"
        />

        {/* Mid rounded mountains */}
        {/* Left mountain */}
        <path
          d="M 60 600 L 60 420 Q 240 120 420 420 L 420 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 240 120 Q 420 420 420 600 L 240 600 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 240 120 Q 210 170 190 200 Q 230 180 240 150 Q 250 180 290 200 Q 270 170 240 120 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />

        {/* Central mountain */}
        <path
          d="M 700 600 L 700 400 Q 960 60 1220 400 L 1220 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 960 60 Q 1220 400 1220 600 L 960 600 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 960 60 Q 920 130 890 170 Q 940 140 960 95 Q 980 140 1030 170 Q 1000 130 960 60 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />

        {/* Right mountain */}
        <path
          d="M 1400 600 L 1400 420 Q 1580 140 1760 420 L 1760 600 Z"
          fill="url(#midRockEastGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 1580 140 Q 1760 420 1760 600 L 1580 600 Z"
          fill="url(#midRockWestGrad)"
          className="transition-colors duration-700 ease-out"
        />
        <path
          d="M 1580 140 Q 1550 190 1530 220 Q 1565 200 1580 165 Q 1595 200 1630 220 Q 1610 190 1580 140 Z"
          fill={col.midSnowLit}
          className="transition-colors duration-700 ease-out"
        />

        {/* Random trees scattered across mid mountain slopes */}
        <g className="transition-colors duration-700 ease-out">
          {slopeTrees.mid.map((t, i) => (
            <g key={`mt-${i}`}>
              <path d={makeConifer(t.x, t.y, t.h, t.w)} fill={treeCol.dark} />
              <path
                d={makeConifer(t.x - t.w * 0.12, t.y - t.h * 0.04, t.h * 0.78, t.w * 0.72)}
                fill={treeCol.lit}
                opacity="0.85"
              />
            </g>
          ))}
        </g>

        {/* Intermediate mist */}
        <rect
          x="-100"
          y="320"
          width="2120"
          height="140"
          fill="url(#valleyFog2)"
          className="animate-mist-reverse pointer-events-none"
        />

        {/* Near foothills - smooth rounded */}
        <path
          d="M 0 600
             L 0 420
             Q 120 360 240 400
             Q 360 340 480 380
             Q 600 330 720 390
             Q 840 350 960 400
             Q 1080 340 1200 385
             Q 1320 330 1440 390
             Q 1560 345 1680 385
             Q 1800 360 1920 400
             L 1920 600 Z"
          fill="url(#nearSpurGrad)"
          className="transition-colors duration-700 ease-out"
        />

        {/* Random foreground foothill trees */}
        <g className="transition-colors duration-700 ease-out">
          {slopeTrees.near.map((t, i) => (
            <g key={`nt-${i}`}>
              <rect x={t.x - t.w * 0.05} y={t.y - t.h * 0.08} width={t.w * 0.1} height={t.h * 0.12} fill={treeCol.dark} />
              <path d={makeConifer(t.x, t.y, t.h, t.w)} fill={treeCol.dark} />
              <path
                d={makeConifer(t.x - t.w * 0.14, t.y - t.h * 0.05, t.h * 0.75, t.w * 0.7)}
                fill={treeCol.lit}
                opacity="0.9"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
