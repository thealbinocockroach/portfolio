import React, { useMemo, useState } from 'react';
import { DayPhase } from '../types/portfolio';
import { playForestChime } from '../utils/audio';
import { mulberry32, randBetween } from '../utils/random';

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
        farCanopy: '#14532D',     // deep morning violet-amber haze
        midTrees: '#166534',      // warm redwood amber
        midFoliage: '#15803D',
        foreTrunks: '#2E1002',
        foreBoughs: '#047857',
        understory: '#022C22',
        needleHighlight: '#FDE68A',
        mist: 'rgba(254, 215, 170, 0.35)',
        fernLeaf: '#047857',
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
        farCanopy: '#14532D',     // glowing amber sunset forest
        midTrees: '#15803D',
        midFoliage: '#166534',
        foreTrunks: '#3E1303',
        foreBoughs: '#065F46',
        understory: '#022C22',
        needleHighlight: '#FDE047',
        mist: 'rgba(254, 215, 170, 0.4)',
        fernLeaf: '#14532D',
      };
    }
    // Night
    return {
      farCanopy: '#0F172A',     // nocturnal dark indigo
      midTrees: '#052E16',
      midFoliage: '#064E3B',
      foreTrunks: '#020617',
      foreBoughs: '#022C22',
      understory: '#010307',
      needleHighlight: '#94A3B8',
      mist: 'rgba(30, 27, 75, 0.3)',
      fernLeaf: '#064E3B',
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

  // Seeded random tree populations across the 1920px landscape
  const midgroundFirs = useMemo(() => {
    const r = mulberry32(1337);
    const trees: { x: number; h: number; w: number; lean: number }[] = [];
    let x = randBetween(r, 10, 60);
    while (x < 1920) {
      trees.push({
        x: Math.round(x),
        h: Math.round(randBetween(r, 125, 215)),
        w: Math.round(randBetween(r, 38, 62)),
        lean: Math.round(randBetween(r, -3, 3)),
      });
      x += randBetween(r, 55, 115);
    }
    return trees;
  }, []);

  const foregroundCanopyGiants = useMemo(() => {
    const r = mulberry32(90210);
    const trees: { x: number; h: number; w: number; lean: number }[] = [];
    let x = randBetween(r, 30, 140);
    while (x < 1900) {
      trees.push({
        x: Math.round(x),
        h: Math.round(randBetween(r, 205, 285)),
        w: Math.round(randBetween(r, 62, 92)),
        lean: Math.round(randBetween(r, -4, 4)),
      });
      x += randBetween(r, 130, 240);
    }
    return trees;
  }, []);

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
                stroke={col.foreTrunks}
                strokeWidth="1.2"
                strokeOpacity="0.45"
                className="transition-colors duration-700 ease-out"
              />
              {/* Defined branches */}
              {[0.35, 0.55, 0.75].map((r, bi) => (
                <g key={`br-${bi}`}>
                  <line
                    x1={p.x + p.lean}
                    y1={320 - p.h * r}
                    x2={p.x + p.lean + p.w * 0.55}
                    y2={320 - p.h * r + 6}
                    stroke={col.foreTrunks}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  <line
                    x1={p.x + p.lean}
                    y1={320 - p.h * r}
                    x2={p.x + p.lean - p.w * 0.55}
                    y2={320 - p.h * r + 6}
                    stroke={col.foreTrunks}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </g>
              ))}
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

        {/* Stone Walkway leading into the forest */}
        <g className="transition-colors duration-700 ease-out">
          <path
            d="M 880 320 L 910 278 L 960 270 L 1010 278 L 1040 320 Z"
            fill="#A8A29E"
            opacity="0.85"
          />
          <path
            d="M 880 320 L 910 278 L 960 270 L 1010 278 L 1040 320 Z"
            fill="none"
            stroke="#78716C"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {[{ x: 900, y: 305 }, { x: 935, y: 288 }, { x: 960, y: 280 }, { x: 985, y: 288 }, { x: 1020, y: 305 }].map((s, idx) => (
            <ellipse
              key={`stone-${idx}`}
              cx={s.x}
              cy={s.y}
              rx="9"
              ry="5"
              fill="#D6D3D1"
              opacity="0.9"
            />
          ))}
        </g>

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
