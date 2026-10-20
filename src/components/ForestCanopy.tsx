import React, { useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { playForestChime } from '../utils/audio';

interface ForestCanopyProps {
  phase: DayPhase;
  isNight: boolean;
  onInspect: (info: { title: string; subtitle: string; description: string; tag: string }) => void;
}

export const ForestCanopy: React.FC<ForestCanopyProps> = ({
  phase,
  isNight,
  onInspect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playForestChime();

    let canopyMood = 'Soaking in midday sunbeams, evergreen needles releasing rich pinene aromatics.';
    if (phase === 'dawn') {
      canopyMood = 'Morning dew mist rolling gently through the towering fir and cedar boughs.';
    } else if (phase === 'morning') {
      canopyMood = 'Crisp sunlight piercing through the tiered conifer branches and fern understory.';
    } else if (phase === 'golden') {
      canopyMood = 'Golden hour backlighting silhouetting ancient hemlock and pine needles in warm amber.';
    } else if (isNight) {
      canopyMood = 'Deep nocturnal stillness with bioluminescent fireflies rising through the pine boughs under starlight.';
    }

    onInspect({
      title: 'Old-Growth Evergreen Forest Canopy',
      subtitle: 'Conifer Woodland & Alpine Understory · Canopy Height: 48 m',
      description: `A dense, living ecosystem of Pacific Douglas fir, western red cedar, mountain hemlock, and wild fern understory. ${canopyMood} Built as an interactive botanical biome responsive to the diurnal sun and moon cycles.`,
      tag: 'BOTANICAL BIOME',
    });
  };

  // Color schemes for realistic diurnal botanical lighting
  const getForestColors = () => {
    if (phase === 'dawn') {
      return {
        farCanopy: '#581C87',     // deep morning violet-amber haze
        midTrees: '#451A03',      // warm redwood amber
        midFoliage: '#78350F',
        foreTrunks: '#2E1002',
        foreBoughs: '#3F1703',
        understory: '#2A0E02',
        needleHighlight: '#FDE68A',
        mist: 'rgba(254, 215, 170, 0.35)',
        fernLeaf: '#3F1703',
      };
    }
    if (phase === 'morning') {
      return {
        farCanopy: '#134E4A',     // fresh blue-green distant conifer
        midTrees: '#115E59',
        midFoliage: '#14532D',    // lush morning pine
        foreTrunks: '#1C1917',
        foreBoughs: '#064E3B',    // deep emerald fir
        understory: '#022C22',
        needleHighlight: '#A7F3D0',
        mist: 'rgba(204, 251, 241, 0.3)',
        fernLeaf: '#047857',
      };
    }
    if (phase === 'midday') {
      return {
        farCanopy: '#064E3B',     // rich dark pine
        midTrees: '#047857',
        midFoliage: '#166534',
        foreTrunks: '#292524',
        foreBoughs: '#14532D',
        understory: '#022C22',
        needleHighlight: '#86EFAC',
        mist: 'rgba(240, 253, 244, 0.2)',
        fernLeaf: '#15803D',
      };
    }
    if (phase === 'golden') {
      return {
        farCanopy: '#7C2D12',     // glowing amber sunset forest
        midTrees: '#9A3412',
        midFoliage: '#C2410C',
        foreTrunks: '#3E1303',
        foreBoughs: '#431407',
        understory: '#260B02',
        needleHighlight: '#FDE047',
        mist: 'rgba(254, 215, 170, 0.4)',
        fernLeaf: '#7C2D12',
      };
    }
    // Night
    return {
      farCanopy: '#0F172A',     // nocturnal dark indigo
      midTrees: '#090E17',
      midFoliage: '#0A1322',
      foreTrunks: '#020617',
      foreBoughs: '#030814',
      understory: '#010307',
      needleHighlight: '#94A3B8',
      mist: 'rgba(30, 27, 75, 0.3)',
      fernLeaf: '#06101E',
    };
  };

  const col = getForestColors();

  /**
   * Generates a realistic organic conifer path with drooping boughs and textured needle fronds.
   * Uses asymmetric branch steps and natural curve variations.
   */
  const makeRealisticFir = (
    cx: number,
    baseY: number,
    height: number,
    width: number,
    lean: number = 0
  ) => {
    const tipY = baseY - height;
    const trunkW = width * 0.12;

    // Build multi-tier tiered drooping conifer silhouette
    // We create 7 organic bough tiers from tip to base
    let path = `M ${cx} ${tipY} `;

    // Right side descending with organic drooping needle tips
    const steps = [
      { yRatio: 0.12, wRatio: 0.18, droop: 4 },
      { yRatio: 0.24, wRatio: 0.32, droop: 7 },
      { yRatio: 0.38, wRatio: 0.48, droop: 10 },
      { yRatio: 0.52, wRatio: 0.64, droop: 14 },
      { yRatio: 0.67, wRatio: 0.8, droop: 18 },
      { yRatio: 0.82, wRatio: 0.94, droop: 22 },
      { yRatio: 0.95, wRatio: 1.0, droop: 25 },
    ];

    // Down the right flank
    steps.forEach((s) => {
      const curY = tipY + height * s.yRatio;
      const curW = width * s.wRatio;
      path += `Q ${cx + curW * 0.6 + lean} ${curY - s.droop * 0.5} ${cx + curW + lean} ${curY} `;
      path += `Q ${cx + curW * 0.45 + lean} ${curY + s.droop * 0.6} ${cx + curW * 0.3 + lean} ${curY + height * 0.04} `;
    });

    // Trunk right base
    path += `L ${cx + trunkW} ${baseY} `;
    // Trunk left base
    path += `L ${cx - trunkW} ${baseY} `;

    // Up the left flank
    for (let i = steps.length - 1; i >= 0; i--) {
      const s = steps[i];
      const curY = tipY + height * s.yRatio;
      const curW = width * s.wRatio;
      path += `L ${cx - curW * 0.3 + lean} ${curY + height * 0.04} `;
      path += `Q ${cx - curW * 0.45 + lean} ${curY + s.droop * 0.6} ${cx - curW + lean} ${curY} `;
      path += `Q ${cx - curW * 0.6 + lean} ${curY - s.droop * 0.5} ${cx + lean} ${curY - height * 0.05} `;
    }

    path += `Z`;
    return path;
  };

  /**
   * Generates a realistic Ponderosa Pine with dynamic branching limbs and cloud foliage pads
   */
  const makePonderosaPine = (
    cx: number,
    baseY: number,
    height: number,
    spread: number
  ) => {
    const tipY = baseY - height;
    const trunkW = spread * 0.1;

    return `
      M ${cx - trunkW} ${baseY}
      Q ${cx - trunkW * 0.8} ${baseY - height * 0.4} ${cx - trunkW * 0.5} ${baseY - height * 0.75}
      L ${cx} ${tipY}
      L ${cx + trunkW * 0.5} ${baseY - height * 0.75}
      Q ${cx + trunkW * 0.8} ${baseY - height * 0.4} ${cx + trunkW} ${baseY}
      Z
    `;
  };

  /**
   * Generates a detailed woodland fern with arching rachis and pinnate leaflets
   */
  const makeFernFrond = (
    startX: number,
    startY: number,
    reachX: number,
    reachY: number,
    frondCount: number = 6
  ) => {
    let d = `M ${startX} ${startY} Q ${(startX + reachX) / 2} ${reachY + 15} ${reachX} ${reachY} `;
    for (let i = 1; i <= frondCount; i++) {
      const t = i / (frondCount + 1);
      const px = startX + (reachX - startX) * t;
      const py = startY + (reachY - startY) * t;
      const leafW = 10 * (1 - t * 0.6);
      d += `M ${px} ${py} Q ${px + leafW} ${py - 4} ${px + leafW * 1.3} ${py - 1} `;
      d += `M ${px} ${py} Q ${px - leafW} ${py - 4} ${px - leafW * 1.3} ${py - 1} `;
    }
    return d;
  };

  // Diverse natural tree populations across the 1920px landscape
  // Notice varied heights, widths, species distributions, and natural groves
  const distantRidgePines = [
    { x: 30, h: 85, w: 22 },
    { x: 65, h: 95, w: 25 },
    { x: 105, h: 80, w: 20 },
    { x: 145, h: 105, w: 26 },
    { x: 185, h: 90, w: 24 },
    { x: 230, h: 110, w: 28 },
    { x: 275, h: 95, w: 25 },
    { x: 320, h: 115, w: 29 },
    { x: 365, h: 85, w: 22 },
    { x: 410, h: 105, w: 27 },
    { x: 460, h: 120, w: 30 },
    { x: 510, h: 95, w: 25 },
    { x: 560, h: 110, w: 28 },
    { x: 610, h: 88, w: 23 },
    { x: 660, h: 118, w: 30 },
    { x: 710, h: 100, w: 26 },
    { x: 760, h: 122, w: 31 },
    { x: 810, h: 90, w: 24 },
    { x: 860, h: 115, w: 29 },
    { x: 910, h: 105, w: 26 },
    { x: 960, h: 125, w: 32 },
    { x: 1010, h: 92, w: 24 },
    { x: 1060, h: 118, w: 30 },
    { x: 1110, h: 100, w: 25 },
    { x: 1160, h: 124, w: 31 },
    { x: 1210, h: 88, w: 23 },
    { x: 1260, h: 115, w: 28 },
    { x: 1310, h: 95, w: 25 },
    { x: 1360, h: 120, w: 30 },
    { x: 1410, h: 102, w: 26 },
    { x: 1460, h: 125, w: 31 },
    { x: 1510, h: 90, w: 24 },
    { x: 1560, h: 116, w: 29 },
    { x: 1610, h: 98, w: 25 },
    { x: 1660, h: 122, w: 30 },
    { x: 1710, h: 92, w: 24 },
    { x: 1760, h: 115, w: 28 },
    { x: 1810, h: 105, w: 26 },
    { x: 1860, h: 120, w: 30 },
    { x: 1900, h: 95, w: 24 },
  ];

  const midgroundFirs = [
    { x: 50, h: 140, w: 42, lean: 2 },
    { x: 120, h: 165, w: 48, lean: -3 },
    { x: 200, h: 135, w: 40, lean: 1 },
    { x: 280, h: 175, w: 52, lean: -2 },
    { x: 350, h: 150, w: 45, lean: 3 },
    { x: 440, h: 185, w: 54, lean: -1 },
    { x: 520, h: 145, w: 44, lean: 2 },
    { x: 600, h: 170, w: 50, lean: -3 },
    { x: 680, h: 195, w: 58, lean: 1 },
    { x: 770, h: 155, w: 46, lean: -2 },
    { x: 850, h: 180, w: 52, lean: 2 },
    { x: 940, h: 205, w: 60, lean: -1 },
    { x: 1030, h: 160, w: 48, lean: 3 },
    { x: 1120, h: 190, w: 55, lean: -2 },
    { x: 1200, h: 150, w: 45, lean: 1 },
    { x: 1290, h: 185, w: 54, lean: -3 },
    { x: 1380, h: 165, w: 49, lean: 2 },
    { x: 1470, h: 200, w: 58, lean: -1 },
    { x: 1560, h: 155, w: 46, lean: 3 },
    { x: 1650, h: 180, w: 52, lean: -2 },
    { x: 1740, h: 160, w: 48, lean: 1 },
    { x: 1830, h: 190, w: 56, lean: -2 },
    { x: 1905, h: 145, w: 44, lean: 2 },
  ];

  const foregroundCanopyGiants = [
    { x: 90, h: 220, w: 68, lean: 4 },
    { x: 240, h: 245, w: 76, lean: -3 },
    { x: 400, h: 215, w: 66, lean: 2 },
    { x: 570, h: 260, w: 82, lean: -4 },
    { x: 730, h: 235, w: 72, lean: 3 },
    { x: 900, h: 275, w: 88, lean: -2 },
    { x: 1080, h: 240, w: 75, lean: 4 },
    { x: 1250, h: 270, w: 84, lean: -3 },
    { x: 1420, h: 230, w: 70, lean: 2 },
    { x: 1600, h: 265, w: 82, lean: -4 },
    { x: 1780, h: 245, w: 76, lean: 3 },
  ];

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[30vh] min-h-[220px] max-h-[380px] pointer-events-auto cursor-pointer select-none transition-all duration-700 z-10 overflow-hidden"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Old-Growth Evergreen Forest Canopy (Click to inspect)"
    >
      {/* Canopy Hover Aura & Living Light */}
      <div
        className={`absolute inset-x-0 -top-8 h-20 transition-opacity duration-500 pointer-events-none blur-2xl ${
          isHovered ? 'opacity-85' : 'opacity-0'
        }`}
        style={{
          background: isNight
            ? 'radial-gradient(ellipse at 50% 100%, rgba(52, 211, 153, 0.45), transparent 75%)'
            : phase === 'golden'
            ? 'radial-gradient(ellipse at 50% 100%, rgba(249, 115, 22, 0.5), transparent 75%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(34, 197, 94, 0.45), transparent 75%)',
        }}
      />

      {/* Bioluminescent Night Fireflies dancing through the canopy */}
      {isNight && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: '8%', bottom: '42%', delay: '0s', duration: '3.4s' },
            { left: '18%', bottom: '68%', delay: '1.2s', duration: '2.8s' },
            { left: '29%', bottom: '48%', delay: '0.5s', duration: '3.6s' },
            { left: '42%', bottom: '75%', delay: '1.8s', duration: '4.2s' },
            { left: '55%', bottom: '52%', delay: '0.2s', duration: '3.1s' },
            { left: '68%', bottom: '70%', delay: '1.5s', duration: '3.7s' },
            { left: '82%', bottom: '46%', delay: '0.9s', duration: '3.2s' },
            { left: '92%', bottom: '64%', delay: '1.6s', duration: '3.5s' },
            { left: '36%', bottom: '28%', delay: '2.1s', duration: '4.0s' },
            { left: '74%', bottom: '32%', delay: '0.7s', duration: '3.9s' },
          ].map((ff, idx) => (
            <div
              key={idx}
              className="absolute w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#6EE7B7] animate-pulse"
              style={{
                left: ff.left,
                bottom: ff.bottom,
                animationDelay: ff.delay,
                animationDuration: ff.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Forest Canopy SVG Rendering */}
      <svg
        className="w-full h-full"
        viewBox="0 0 1920 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Valley Forest Mist Ribbon */}
          <linearGradient id="canopyMist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.mist} stopOpacity="0" />
            <stop offset="50%" stopColor={col.mist} stopOpacity="0.85" />
            <stop offset="100%" stopColor={col.mist} stopOpacity="0.2" />
          </linearGradient>

          {/* Foreground Tree Bough Gradient (Sunlit crown to deep shadowed base) */}
          <linearGradient id="foreTreeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={col.needleHighlight} stopOpacity="0.4" />
            <stop offset="25%" stopColor={col.foreBoughs} />
            <stop offset="100%" stopColor={col.understory} />
          </linearGradient>
        </defs>

        {/* ============================================================== */}
        {/* LAYER 1: DISTANT HIGH FOOTHILL TREELINE (Background Canopy)    */}
        {/* ============================================================== */}
        <g fill={col.farCanopy} className="transition-colors duration-700 ease-out opacity-85">
          {distantRidgePines.map((p, idx) => (
            <path
              key={`dist-${idx}`}
              d={makeRealisticFir(p.x, 320, p.h, p.w, 0)}
              className="transition-colors duration-700 ease-out"
            />
          ))}
        </g>

        {/* Atmospheric Valley Mist drifting between distant and midground forest */}
        <rect
          x="-100"
          y="180"
          width="2120"
          height="75"
          fill="url(#canopyMist)"
          className="animate-mist-slow pointer-events-none"
        />

        {/* ============================================================== */}
        {/* LAYER 2: MIDGROUND DENSE EVERGREEN CONIFERS (Firs & Hemlocks)  */}
        {/* ============================================================== */}
        <g fill={col.midTrees} className="transition-colors duration-700 ease-out">
          {midgroundFirs.map((p, idx) => (
            <path
              key={`mid-${idx}`}
              d={makeRealisticFir(p.x, 320, p.h, p.w, p.lean)}
              className="transition-colors duration-700 ease-out"
            />
          ))}
        </g>

        {/* ============================================================== */}
        {/* LAYER 3: FOREGROUND OLD-GROWTH GIANT PINES (Swaying in Wind)   */}
        {/* Detailed drooping boughs, visible organic trunks, needle edges */}
        {/* ============================================================== */}
        <g className="animate-tree-sway">
          {foregroundCanopyGiants.map((p, idx) => (
            <g key={`fore-${idx}`}>
              {/* Organic Trunk */}
              <path
                d={makePonderosaPine(p.x, 320, p.h, p.w * 0.4)}
                fill={col.foreTrunks}
                className="transition-colors duration-700 ease-out"
              />
              {/* Layered Foliage Boughs */}
              <path
                d={makeRealisticFir(p.x, 320, p.h, p.w, p.lean)}
                fill="url(#foreTreeGrad)"
                className="transition-colors duration-700 ease-out"
              />
              {/* Sunlit Rim Needle Accents on Crown Tips */}
              <circle
                cx={p.x + p.lean}
                cy={320 - p.h}
                r="3"
                fill={col.needleHighlight}
                opacity={isNight ? 0.3 : 0.75}
              />
            </g>
          ))}
        </g>

        {/* ============================================================== */}
        {/* LAYER 4: ORGANIC BOTANICAL UNDERSTORY (Ferns, Moss, Wild Flora)*/}
        {/* ============================================================== */}

        {/* Undulating Forest Floor Earth Mound */}
        <path
          d="M 0 320
             L 0 280
             Q 80 268 160 276
             Q 260 260 360 274
             Q 480 258 600 272
             Q 720 260 840 275
             Q 960 258 1080 274
             Q 1200 260 1320 273
             Q 1440 258 1560 275
             Q 1680 262 1800 274
             Q 1860 266 1920 272
             L 1920 320 Z"
          fill={col.understory}
          className="transition-colors duration-700 ease-out"
        />

        {/* Arching Wild Woodland Ferns along the forest floor */}
        <g
          stroke={col.fernLeaf}
          strokeWidth="2.2"
          strokeLinecap="round"
          className="animate-fern-sway transition-colors duration-700 ease-out"
        >
          {[
            { x: 40, y: 285, rx: 75, ry: 250 },
            { x: 130, y: 282, rx: 165, ry: 245 },
            { x: 220, y: 284, rx: 185, ry: 248 },
            { x: 310, y: 280, rx: 345, ry: 242 },
            { x: 390, y: 283, rx: 360, ry: 246 },
            { x: 490, y: 278, rx: 530, ry: 240 },
            { x: 570, y: 282, rx: 540, ry: 244 },
            { x: 670, y: 280, rx: 710, ry: 242 },
            { x: 750, y: 284, rx: 720, ry: 247 },
            { x: 850, y: 279, rx: 890, ry: 241 },
            { x: 930, y: 283, rx: 900, ry: 246 },
            { x: 1030, y: 278, rx: 1070, ry: 240 },
            { x: 1110, y: 282, rx: 1080, ry: 245 },
            { x: 1210, y: 280, rx: 1250, ry: 242 },
            { x: 1290, y: 284, rx: 1260, ry: 248 },
            { x: 1390, y: 279, rx: 1430, ry: 241 },
            { x: 1470, y: 283, rx: 1440, ry: 246 },
            { x: 1570, y: 278, rx: 1610, ry: 240 },
            { x: 1650, y: 282, rx: 1620, ry: 245 },
            { x: 1750, y: 280, rx: 1790, ry: 242 },
            { x: 1830, y: 284, rx: 1800, ry: 247 },
            { x: 1890, y: 280, rx: 1920, ry: 244 },
          ].map((fern, idx) => (
            <path
              key={`fern-${idx}`}
              d={makeFernFrond(fern.x, fern.y, fern.rx, fern.ry, 5)}
              className="transition-colors duration-700 ease-out"
            />
          ))}
        </g>

        {/* Alpine Wild Grass Sprigs swaying in the understory */}
        {[
          25, 70, 115, 175, 235, 290, 355, 415, 470, 535, 595, 650, 715, 775, 830,
          895, 955, 1010, 1075, 1135, 1190, 1255, 1315, 1370, 1435, 1495, 1550, 1615,
          1675, 1730, 1795, 1855, 1910,
        ].map((x, idx) => (
          <path
            key={`grass-${idx}`}
            d={`M ${x} 290 Q ${x - 6} 272 ${x - 10} 260 M ${x} 290 Q ${x + 2} 270 ${x + 5} 258 M ${x} 290 Q ${x + 8} 274 ${x + 12} 264`}
            stroke={col.needleHighlight}
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity={isNight ? 0.35 : 0.75}
            className="transition-colors duration-700 ease-out"
          />
        ))}

        {/* Mossy Forest Bed Baseline */}
        <rect
          x="0"
          y="312"
          width="1920"
          height="8"
          fill={col.understory}
          className="transition-colors duration-700 ease-out"
        />
      </svg>
    </div>
  );
};
