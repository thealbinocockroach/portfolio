import React from 'react';
import { StarPoint, StarLine } from '../types/portfolio';

interface StarFieldProps {
  points: StarPoint[];
  lines: StarLine[];
  opacity: number; // twilight wash, 0..1
}

export const StarField: React.FC<StarFieldProps> = ({ points, lines, opacity }) => {
  if (opacity <= 0.01 || points.length === 0) return null;

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, idx) => (
          <line
            key={`line-${idx}`}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="#BFDBFE"
            strokeWidth="0.5"
            opacity="0.22"
          />
        ))}
        {points.map((star) => (
          <circle
            key={star.key}
            cx={`${star.x}%`}
            cy={`${star.y}%`}
            r={star.r}
            fill={star.r > 2 ? '#FEF9C3' : '#F8FAFC'}
            className={star.twinkle ? 'animate-pulse' : undefined}
            style={{
              opacity: star.o,
              ...(star.twinkle
                ? { animationDuration: `${2.5 + (star.key.length % 4) * 0.6}s` }
                : {}),
            }}
          />
        ))}
      </svg>
    </div>
  );
};
