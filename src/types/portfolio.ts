export type DayPhase = 'dawn' | 'morning' | 'midday' | 'golden' | 'night';

export interface StarPoint {
  key: string;
  x: number; // percent
  y: number; // percent
  r: number; // px radius
  o: number; // 0..1 opacity
  twinkle: boolean;
}

export interface StarLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DayTimeState {
  progress: number; // 0 to 1
  timeString: string; // e.g. "7:15 AM"
  phase: DayPhase;
  phaseLabel: string; // e.g. "Dawn / First Light"
  sunPosition: { x: number; y: number }; // normalized 0..100
  moonPosition: { x: number; y: number }; // normalized 0..100
  sunAltitude: number; // in degrees (negative below horizon)
  sunOpacity: number; // 0..1 horizon fade
  moonOpacity: number; // 0..1 horizon fade
  moonPhase: number; // 0..1 (0 new, 0.5 full)
  moonIllumination: number; // 0..1
  moonWaxing: boolean;
  moonPhaseName: string;
  sunriseString: string; // e.g. "6:32 AM"
  sunsetString: string; // e.g. "7:48 PM"
  starPoints: StarPoint[];
  starLines: StarLine[];
  isNight: boolean;
  ambientTextColor: string;
}

export interface MedicineBottle {
  id: 'bio' | 'skills' | 'contact' | 'routine';
  name: string;
  prescription: string;
  dosage: string;
  bottleColor: string;
  accentColor: string;
  labelTag: string;
  tagline: string;
}

export interface CabinetItem {
  id: string;
  category: 'grooming' | 'medicine' | 'skincare';
  name: string;
  subtitle: string;
  label: string;
  tagline: string;
  details: string;
}

export interface SkillCategory {
  title: string;
  items: { name: string; level: number; note: string }[];
}

export interface PhilosophyCard {
  id: string;
  item: string; // 'coffee' | 'plate' | 'newspaper' | 'seasoning'
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  detail: string;
}

export interface ShelfBook {
  id: string;
  title: string;
  author: string;
  spineColor: string;
  coverGradient: string;
  topics: string[];
  summary: string;
  keyTakeaway: string;
}

export interface NotebookPage {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  sections: {
    heading: string;
    body: string;
    highlights?: string[];
  }[];
}

export interface SoftwareProject {
  id: string;
  title: string;
  tagline: string;
  category: 'systems' | 'webgl' | 'fullstack' | 'mobile';
  categoryLabel: string;
  year: string;
  summary: string;
  metrics: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  architectureHighlights: string[];
  codeSnippet: string;
}

export interface VinylTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  bpm: number;
  color: string;
}
