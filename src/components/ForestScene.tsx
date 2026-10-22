import React from 'react';

interface ForestSceneProps {
  isNight?: boolean;
}

const BackTree = ({ delay }: { delay: number }) => (
  <div className="tree-sway" style={{ animationDelay: `${delay}s` }}>
    <svg width="110" height="200" viewBox="0 0 110 200" aria-hidden="true">
      <defs>
        <linearGradient id={`bt-${delay}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6B4A2E" />
          <stop offset="50%" stopColor="#8B6340" />
          <stop offset="100%" stopColor="#4A3320" />
        </linearGradient>
        <radialGradient id={`bf-${delay}`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#8FC98A" />
          <stop offset="60%" stopColor="#5FA36A" />
          <stop offset="100%" stopColor="#3D7A4A" />
        </radialGradient>
      </defs>
      {/* Trunk */}
      <path d="M50 200 L46 120 Q44 90 48 70 L52 70 Q56 90 54 120 L50 200 Z" fill={`url(#bt-${delay})`} />
      {/* Bark lines */}
      <path d="M48 190 L47 130" stroke="#3E2A1A" strokeWidth="0.6" opacity="0.5" />
      <path d="M52 180 L51 125" stroke="#3E2A1A" strokeWidth="0.6" opacity="0.4" />
      {/* Branches */}
      <path d="M49 100 Q38 88 28 80" stroke="#6B4A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M51 92 Q62 80 72 74" stroke="#6B4A2E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M48 78 Q40 66 34 60" stroke="#6B4A2E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Foliage clusters */}
      <ellipse cx="48" cy="62" rx="34" ry="40" fill={`url(#bf-${delay})`} />
      <ellipse cx="30" cy="72" rx="22" ry="26" fill="#6BB06A" opacity="0.85" />
      <ellipse cx="66" cy="68" rx="20" ry="24" fill="#7BC47A" opacity="0.8" />
      <ellipse cx="48" cy="46" rx="24" ry="28" fill="#86C882" opacity="0.85" />
      <ellipse cx="38" cy="52" rx="12" ry="14" fill="#A3D99F" opacity="0.6" />
      {/* Highlights */}
      <ellipse cx="42" cy="40" rx="8" ry="10" fill="#BFE3B8" opacity="0.35" />
    </svg>
  </div>
);

const FrontTree = ({ delay }: { delay: number }) => (
  <div className="tree-sway" style={{ animationDelay: `${delay}s` }}>
    <svg width="150" height="260" viewBox="0 0 150 260" aria-hidden="true">
      <defs>
        <linearGradient id={`ft-${delay}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#4A3320" />
          <stop offset="40%" stopColor="#7A5A3A" />
          <stop offset="100%" stopColor="#3E2A1A" />
        </linearGradient>
        <radialGradient id={`ff-${delay}`} cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#7BC47A" />
          <stop offset="50%" stopColor="#4F9358" />
          <stop offset="100%" stopColor="#2F6B3A" />
        </radialGradient>
      </defs>
      {/* Trunk with taper */}
      <path d="M70 260 L64 150 Q60 110 66 80 L74 80 Q80 110 76 150 L70 260 Z" fill={`url(#ft-${delay})`} />
      {/* Bark texture */}
      <path d="M66 250 L65 160" stroke="#2A1A10" strokeWidth="0.8" opacity="0.5" />
      <path d="M72 240 L71 150" stroke="#2A1A10" strokeWidth="0.8" opacity="0.4" />
      <path d="M68 200 L67 120" stroke="#2A1A10" strokeWidth="0.6" opacity="0.3" />
      {/* Roots */}
      <path d="M66 255 Q58 258 52 260" stroke="#4A3320" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M74 255 Q82 258 88 260" stroke="#4A3320" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Branches */}
      <path d="M67 120 Q50 100 38 88" stroke="#5A3F28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M73 110 Q92 92 106 82" stroke="#5A3F28" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M66 95 Q56 80 48 70" stroke="#5A3F28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M74 88 Q86 74 94 66" stroke="#5A3F28" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M68 76 Q62 62 58 54" stroke="#5A3F28" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Sub-branches */}
      <path d="M42 84 Q34 76 30 70" stroke="#5A3F28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M100 78 Q108 70 112 64" stroke="#5A3F28" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Foliage clusters */}
      <ellipse cx="70" cy="74" rx="52" ry="62" fill={`url(#ff-${delay})`} />
      <ellipse cx="44" cy="86" rx="34" ry="40" fill="#6BB06A" opacity="0.85" />
      <ellipse cx="96" cy="80" rx="32" ry="38" fill="#5FA36A" opacity="0.85" />
      <ellipse cx="70" cy="50" rx="40" ry="46" fill="#7BC47A" opacity="0.8" />
      <ellipse cx="52" cy="58" rx="22" ry="26" fill="#86C882" opacity="0.75" />
      <ellipse cx="88" cy="54" rx="20" ry="24" fill="#86C882" opacity="0.75" />
      <ellipse cx="70" cy="34" rx="26" ry="30" fill="#A3D99F" opacity="0.6" />
      {/* Highlights */}
      <ellipse cx="60" cy="40" rx="12" ry="14" fill="#C8E6C2" opacity="0.3" />
      <ellipse cx="82" cy="46" rx="10" ry="12" fill="#C8E6C2" opacity="0.25" />
    </svg>
  </div>
);

export const ForestScene: React.FC<ForestSceneProps> = ({ isNight = false }) => (
  <section className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none" aria-label="Forest">
    <style>{`
      @keyframes sway { 0%,100% { transform: rotate(-1.2deg); } 50% { transform: rotate(1.2deg); } }
      .tree-sway { animation: sway 7s ease-in-out infinite; transform-origin: bottom center; }
    `}</style>

    {/* Mountains (defined peaks) */}
    <svg className="absolute bottom-[22%] left-0 w-full h-[45%]" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="mtnFar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#B8C9D9" />
          <stop offset="100%" stopColor="#8FA3B8" />
        </linearGradient>
        <linearGradient id="mtnNear" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9AAFC4" />
          <stop offset="100%" stopColor="#6E86A0" />
        </linearGradient>
        <linearGradient id="mtnSnow" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE6F0" />
        </linearGradient>
      </defs>
      {/* Far range */}
      <path d="M0 320 L0 220 L60 180 L120 210 L180 150 L260 190 L320 120 L400 170 L470 95 L560 160 L640 110 L720 155 L800 80 L880 145 L960 100 L1040 160 L1120 115 L1200 175 L1280 130 L1360 185 L1440 150 L1440 320 Z" fill="url(#mtnFar)" opacity="1" />
      {/* Snow caps far */}
      <path d="M300 135 L320 120 L340 135 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M455 110 L470 95 L485 110 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M625 125 L640 110 L655 125 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M785 95 L800 80 L815 95 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M945 115 L960 100 L975 115 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M1105 130 L1120 115 L1135 130 Z" fill="url(#mtnSnow)" opacity="1" />
      <path d="M1265 145 L1280 130 L1295 145 Z" fill="url(#mtnSnow)" opacity="1" />
      {/* Near range */}
      <path d="M0 320 L0 260 L90 225 L170 255 L250 195 L340 240 L420 170 L510 225 L600 160 L690 215 L780 150 L870 210 L960 165 L1050 220 L1140 175 L1230 225 L1320 190 L1440 230 L1440 320 Z" fill="url(#mtnNear)" />
      {/* Ridge lines for definition */}
      <path d="M250 195 L340 240 L420 170" stroke="#5A7390" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M600 160 L690 215 L780 150" stroke="#5A7390" strokeWidth="1.2" fill="none" opacity="0.6" />
      <path d="M960 165 L1050 220 L1140 175" stroke="#5A7390" strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Snow caps near */}
      <path d="M395 185 L420 170 L445 185 Z" fill="url(#mtnSnow)" />
      <path d="M575 175 L600 160 L625 175 Z" fill="url(#mtnSnow)" />
      <path d="M755 165 L780 150 L805 165 Z" fill="url(#mtnSnow)" />
      <path d="M935 180 L960 165 L985 180 Z" fill="url(#mtnSnow)" />
      <path d="M1115 190 L1140 175 L1165 190 Z" fill="url(#mtnSnow)" />
      {/* Shadows on near slopes */}
      <path d="M420 170 L510 225 L600 160 L420 170 Z" fill="#4A6080" opacity="0.25" />
      <path d="M780 150 L870 210 L960 165 L780 150 Z" fill="#4A6080" opacity="0.25" />
    </svg>

    {/* Distant hills */}
    <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="hill1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#B7D9A8" />
          <stop offset="100%" stopColor="#8FC48A" />
        </linearGradient>
        <linearGradient id="hill2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#9FCF95" />
          <stop offset="100%" stopColor="#6FAE5C" />
        </linearGradient>
      </defs>
      <path d="M0 300 Q360 240 720 285 T1440 260 L1440 420 L0 420 Z" fill="url(#hill1)" opacity="1" />
      <path d="M0 330 Q400 285 760 318 T1440 295 L1440 420 L0 420 Z" fill="url(#hill2)" opacity="1" />
    </svg>

    {/* Trees (back row) */}
    <div className="absolute bottom-[24%] left-0 w-full flex justify-around items-end px-2 pointer-events-none">
      {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
        <BackTree key={`back-${i}`} delay={i * 0.6} />
      ))}
    </div>

    {/* Trees (mid row) */}
    <div className="absolute bottom-[20%] left-0 w-full flex justify-around items-end px-4 pointer-events-none" style={{ transform: 'scale(0.85)', transformOrigin: 'bottom center' }}>
      {[0,1,2,3,4,5,6,7].map((i) => (
        <BackTree key={`mid-${i}`} delay={i * 0.7 + 0.3} />
      ))}
    </div>

    {/* Trees (front row) */}
    <div className="absolute bottom-[16%] left-0 w-full flex justify-around items-end px-6 pointer-events-none">
      {[0,1,2,3,4,5,6].map((i) => (
        <FrontTree key={`front-${i}`} delay={i * 0.9 + 0.4} />
      ))}
    </div>

    {/* Ground */}
    <div className="absolute bottom-0 left-0 w-full h-[20%]" style={{ background: 'linear-gradient(180deg, #6FAE5C 0%, #5A8F4A 45%, #4A7A3E 100%)' }} />
    <div className="absolute bottom-0 left-0 w-full h-[5%]" style={{ background: 'linear-gradient(180deg, #3E6A32 0%, #2F5526 100%)' }} />

    {/* Grass blades */}
    <svg className="absolute bottom-[18%] left-0 w-full h-14" viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: 72 }).map((_, i) => (
        <path
          key={i}
          d={`M${i * 20 + (i % 3) * 3} 56 Q${i * 20 + 5} 28 ${i * 20 + (i % 2 ? 12 : 6)} 0`}
          stroke="#7BC47A"
          strokeWidth="1.6"
          fill="none"
          opacity="0.75"
        />
      ))}
    </svg>

    {/* Foreground leaves */}
    <div className="absolute bottom-0 left-0 w-full pointer-events-none">
      <svg className="w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="100" cy="50" rx="70" ry="26" fill="#3E6A32" opacity="0.92" />
        <ellipse cx="320" cy="60" rx="90" ry="30" fill="#3E6A32" opacity="0.9" />
        <ellipse cx="620" cy="54" rx="80" ry="28" fill="#3E6A32" opacity="0.92" />
        <ellipse cx="920" cy="62" rx="100" ry="32" fill="#3E6A32" opacity="0.9" />
        <ellipse cx="1240" cy="56" rx="90" ry="30" fill="#3E6A32" opacity="0.92" />
      </svg>
    </div>

    {/* Night darkening overlay */}
    <div
      className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
      style={{
        opacity: isNight ? 0.72 : 0,
        background: 'linear-gradient(180deg, rgba(2,6,23,0.85) 0%, rgba(15,23,42,0.6) 50%, rgba(2,6,23,0.9) 100%)',
      }}
    />

    {/* Moonlight glow on trees at night */}
    {isNight && (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 78% 28%, rgba(148,163,184,0.18) 0%, transparent 60%)',
        }}
      />
    )}
  </section>
);


