import { starPos, skyPosition } from './astro';
import { StarPoint, StarLine } from '../types/portfolio';

/**
 * Brightest real stars (J2000 epoch), ~mag 3.5 and brighter.
 * raHours: right ascension in hours, decDeg: declination, mag: visual magnitude.
 */
export interface CatalogStar {
  name: string;
  raHours: number;
  decDeg: number;
  mag: number;
}

export const CATALOG: CatalogStar[] = [
  { name: 'Sirius', raHours: 6.7525, decDeg: -16.716, mag: -1.46 },
  { name: 'Canopus', raHours: 6.3992, decDeg: -52.696, mag: -0.74 },
  { name: 'Rigil Kentaurus', raHours: 14.6601, decDeg: -60.834, mag: -0.27 },
  { name: 'Arcturus', raHours: 14.261, decDeg: 19.182, mag: -0.05 },
  { name: 'Vega', raHours: 18.6156, decDeg: 38.784, mag: 0.03 },
  { name: 'Capella', raHours: 5.2782, decDeg: 45.998, mag: 0.08 },
  { name: 'Rigel', raHours: 5.2423, decDeg: -8.202, mag: 0.13 },
  { name: 'Procyon', raHours: 7.655, decDeg: 5.225, mag: 0.34 },
  { name: 'Achernar', raHours: 1.6286, decDeg: -57.237, mag: 0.46 },
  { name: 'Betelgeuse', raHours: 5.9195, decDeg: 7.407, mag: 0.5 },
  { name: 'Hadar', raHours: 14.0637, decDeg: -60.373, mag: 0.61 },
  { name: 'Altair', raHours: 19.8464, decDeg: 8.868, mag: 0.77 },
  { name: 'Acrux', raHours: 12.4433, decDeg: -63.099, mag: 0.77 },
  { name: 'Aldebaran', raHours: 4.5987, decDeg: 16.509, mag: 0.87 },
  { name: 'Antares', raHours: 16.4901, decDeg: -26.432, mag: 1.09 },
  { name: 'Spica', raHours: 13.4199, decDeg: -11.161, mag: 1.04 },
  { name: 'Pollux', raHours: 7.7553, decDeg: 28.026, mag: 1.14 },
  { name: 'Fomalhaut', raHours: 22.9608, decDeg: -29.622, mag: 1.16 },
  { name: 'Deneb', raHours: 20.6905, decDeg: 45.28, mag: 1.25 },
  { name: 'Mimosa', raHours: 12.7953, decDeg: -59.689, mag: 1.25 },
  { name: 'Regulus', raHours: 10.1395, decDeg: 11.967, mag: 1.35 },
  { name: 'Adhara', raHours: 6.9771, decDeg: -28.972, mag: 1.5 },
  { name: 'Castor', raHours: 7.5767, decDeg: 31.888, mag: 1.58 },
  { name: 'Shaula', raHours: 17.5601, decDeg: -37.104, mag: 1.62 },
  { name: 'Gacrux', raHours: 12.5205, decDeg: -57.113, mag: 1.63 },
  { name: 'Bellatrix', raHours: 5.4188, decDeg: 6.35, mag: 1.64 },
  { name: 'Elnath', raHours: 5.4382, decDeg: 28.608, mag: 1.65 },
  { name: 'Miaplacidus', raHours: 9.2217, decDeg: -69.717, mag: 1.69 },
  { name: 'Alnilam', raHours: 5.6036, decDeg: -1.202, mag: 1.69 },
  { name: 'Alnair', raHours: 22.1372, decDeg: -46.961, mag: 1.74 },
  { name: 'Alnitak', raHours: 5.6793, decDeg: -1.943, mag: 1.77 },
  { name: 'Alioth', raHours: 12.9005, decDeg: 55.96, mag: 1.77 },
  { name: 'Dubhe', raHours: 11.0621, decDeg: 61.751, mag: 1.79 },
  { name: 'Mirfak', raHours: 3.4054, decDeg: 49.861, mag: 1.79 },
  { name: 'Wezen', raHours: 7.1399, decDeg: -26.393, mag: 1.84 },
  { name: 'Kaus Australis', raHours: 18.4029, decDeg: -34.384, mag: 1.85 },
  { name: 'Alkaid', raHours: 13.7923, decDeg: 49.313, mag: 1.86 },
  { name: 'Avior', raHours: 8.3752, decDeg: -59.51, mag: 1.86 },
  { name: 'Sargas', raHours: 17.6221, decDeg: -42.998, mag: 1.87 },
  { name: 'Menkalinan', raHours: 5.9921, decDeg: 44.947, mag: 1.9 },
  { name: 'Atria', raHours: 16.811, decDeg: -69.028, mag: 1.91 },
  { name: 'Alhena', raHours: 6.6285, decDeg: 16.399, mag: 1.93 },
  { name: 'Peacock', raHours: 20.4275, decDeg: -56.735, mag: 1.94 },
  { name: 'Alsephina', raHours: 8.7452, decDeg: -54.709, mag: 1.96 },
  { name: 'Mirzam', raHours: 6.3783, decDeg: -17.956, mag: 1.98 },
  { name: 'Alphard', raHours: 9.4597, decDeg: -8.659, mag: 1.98 },
  { name: 'Polaris', raHours: 2.5303, decDeg: 89.264, mag: 1.98 },
  { name: 'Hamal', raHours: 2.1195, decDeg: 23.462, mag: 2.0 },
  { name: 'Diphda', raHours: 0.7265, decDeg: -17.987, mag: 2.04 },
  { name: 'Nunki', raHours: 18.9211, decDeg: -26.297, mag: 2.05 },
  { name: 'Alpheratz', raHours: 0.1398, decDeg: 29.09, mag: 2.06 },
  { name: 'Menkent', raHours: 14.1114, decDeg: -36.37, mag: 2.06 },
  { name: 'Saiph', raHours: 5.7959, decDeg: -9.669, mag: 2.07 },
  { name: 'Rasalhague', raHours: 17.5822, decDeg: 12.56, mag: 2.08 },
  { name: 'Algieba', raHours: 10.3328, decDeg: 19.841, mag: 2.08 },
  { name: 'Kochab', raHours: 14.8451, decDeg: 74.155, mag: 2.08 },
  { name: 'Almach', raHours: 2.0649, decDeg: 42.33, mag: 2.1 },
  { name: 'Algol', raHours: 3.1361, decDeg: 40.956, mag: 2.12 },
  { name: 'Denebola', raHours: 11.8177, decDeg: 14.572, mag: 2.14 },
  { name: 'Suhail', raHours: 9.1332, decDeg: -43.433, mag: 2.21 },
  { name: 'Aspidiske', raHours: 9.285, decDeg: -59.275, mag: 2.21 },
  { name: 'Alphecca', raHours: 15.5781, decDeg: 26.715, mag: 2.22 },
  { name: 'Mintaka', raHours: 5.5334, decDeg: -0.299, mag: 2.23 },
  { name: 'Eltanin', raHours: 17.9434, decDeg: 51.489, mag: 2.23 },
  { name: 'Sadr', raHours: 20.3705, decDeg: 40.257, mag: 2.23 },
  { name: 'Schedar', raHours: 0.6751, decDeg: 56.537, mag: 2.24 },
  { name: 'Naos', raHours: 8.0597, decDeg: -40.003, mag: 2.25 },
  { name: 'Mizar', raHours: 13.3987, decDeg: 54.925, mag: 2.23 },
  { name: 'Caph', raHours: 0.1529, decDeg: 59.15, mag: 2.28 },
  { name: 'Dschubba', raHours: 16.0056, decDeg: -22.622, mag: 2.29 },
  { name: 'Izar', raHours: 14.75, decDeg: 27.074, mag: 2.35 },
  { name: 'Merak', raHours: 11.0307, decDeg: 56.382, mag: 2.37 },
  { name: 'Scheat', raHours: 23.0629, decDeg: 28.083, mag: 2.42 },
  { name: 'Phecda', raHours: 11.8972, decDeg: 53.695, mag: 2.44 },
  { name: 'Alderamin', raHours: 21.3096, decDeg: 62.586, mag: 2.45 },
  { name: 'Aludra', raHours: 7.4015, decDeg: -29.303, mag: 2.45 },
  { name: 'Navi', raHours: 0.9451, decDeg: 60.717, mag: 2.47 },
  { name: 'Markab', raHours: 23.0793, decDeg: 15.205, mag: 2.48 },
  { name: 'Gienah', raHours: 20.7702, decDeg: 33.97, mag: 2.48 },
  { name: 'Menkar', raHours: 3.0362, decDeg: 4.09, mag: 2.53 },
  { name: 'Zosma', raHours: 11.2351, decDeg: 20.524, mag: 2.56 },
  { name: 'Muhlifain', raHours: 12.6919, decDeg: -48.96, mag: 2.58 },
  { name: 'Zubeneschamali', raHours: 15.2833, decDeg: -9.383, mag: 2.61 },
  { name: 'Sheratan', raHours: 1.9105, decDeg: 20.808, mag: 2.64 },
  { name: 'Phact', raHours: 5.6606, decDeg: -34.074, mag: 2.65 },
  { name: 'Ruchbah', raHours: 1.4303, decDeg: 60.235, mag: 2.68 },
  { name: 'Tarazed', raHours: 19.7714, decDeg: 10.613, mag: 2.72 },
  { name: 'Porrima', raHours: 12.6943, decDeg: -1.449, mag: 2.74 },
  { name: 'Kornephoros', raHours: 16.5037, decDeg: 21.49, mag: 2.77 },
  { name: 'Delta Cru', raHours: 12.7954, decDeg: -58.749, mag: 2.79 },
  { name: 'Rastaban', raHours: 17.5071, decDeg: 52.301, mag: 2.79 },
  { name: 'Algenib', raHours: 0.153, decDeg: 15.184, mag: 2.83 },
  { name: 'Cor Caroli', raHours: 12.9338, decDeg: 38.319, mag: 2.89 },
  { name: 'Gomeisa', raHours: 7.4525, decDeg: 8.289, mag: 2.89 },
  { name: 'Pherkad', raHours: 15.3453, decDeg: 71.834, mag: 3.05 },
  { name: 'Albireo', raHours: 19.5121, decDeg: 27.96, mag: 3.05 },
  { name: 'Rasalgethi', raHours: 17.244, decDeg: 14.39, mag: 3.35 },
  { name: 'Segin', raHours: 1.9066, decDeg: 63.67, mag: 3.35 },
  { name: 'Megrez', raHours: 12.2571, decDeg: 57.033, mag: 3.31 },
  { name: 'Meissa', raHours: 5.5855, decDeg: 9.934, mag: 3.39 },
  { name: 'Alshain', raHours: 19.9211, decDeg: 6.407, mag: 3.71 },
  { name: 'Delta Cyg', raHours: 19.7495, decDeg: 45.131, mag: 2.87 },
];

/** Constellation figure lines as [nameA, nameB] pairs. */
const LINE_PAIRS: [string, string][] = [
  // Ursa Major (Big Dipper)
  ['Dubhe', 'Merak'],
  ['Merak', 'Phecda'],
  ['Phecda', 'Megrez'],
  ['Megrez', 'Alioth'],
  ['Alioth', 'Mizar'],
  ['Mizar', 'Alkaid'],
  ['Megrez', 'Dubhe'],
  // Ursa Minor tip
  ['Kochab', 'Pherkad'],
  // Cassiopeia (W)
  ['Caph', 'Schedar'],
  ['Schedar', 'Navi'],
  ['Navi', 'Ruchbah'],
  ['Ruchbah', 'Segin'],
  // Orion
  ['Betelgeuse', 'Meissa'],
  ['Meissa', 'Bellatrix'],
  ['Bellatrix', 'Mintaka'],
  ['Mintaka', 'Alnilam'],
  ['Alnilam', 'Alnitak'],
  ['Alnitak', 'Betelgeuse'],
  ['Alnitak', 'Saiph'],
  ['Saiph', 'Rigel'],
  ['Rigel', 'Mintaka'],
  // Cygnus (Northern Cross)
  ['Deneb', 'Sadr'],
  ['Sadr', 'Albireo'],
  ['Gienah', 'Sadr'],
  ['Sadr', 'Delta Cyg'],
  // Summer Triangle
  ['Vega', 'Deneb'],
  ['Vega', 'Altair'],
  ['Deneb', 'Altair'],
  // Great Square of Pegasus
  ['Alpheratz', 'Scheat'],
  ['Scheat', 'Markab'],
  ['Markab', 'Algenib'],
  ['Algenib', 'Alpheratz'],
  // Aquila
  ['Altair', 'Tarazed'],
  ['Altair', 'Alshain'],
  // Gemini
  ['Castor', 'Pollux'],
  // Leo
  ['Regulus', 'Algieba'],
  ['Algieba', 'Denebola'],
  // Taurus
  ['Aldebaran', 'Elnath'],
  // Auriga
  ['Capella', 'Menkalinan'],
  ['Capella', 'Elnath'],
  // Bootes
  ['Arcturus', 'Izar'],
  // Scorpius
  ['Antares', 'Dschubba'],
  ['Antares', 'Shaula'],
  // Southern Cross
  ['Acrux', 'Gacrux'],
  ['Mimosa', 'Delta Cru'],
];

const nameIndex = new Map<string, number>();
CATALOG.forEach((s, i) => nameIndex.set(s.name, i));

export interface StarFieldData {
  points: StarPoint[];
  lines: StarLine[];
}

const magRadius = (mag: number): number => Math.max(0.7, Math.min(2.8, 2.9 - mag * 0.42));
const magOpacity = (mag: number): number => Math.max(0.28, Math.min(1, 1.05 - mag * 0.14));

/**
 * Compute on-screen star points/lines for an instant and observer.
 * Extinction dims stars near the horizon; below ~-2° altitude they fade out.
 */
export const buildStarField = (date: Date, lat: number, lng: number): StarFieldData => {
  const points: StarPoint[] = [];
  const screen: (StarPoint | null)[] = CATALOG.map((star, i) => {
    const pos = starPos(date, star.raHours, star.decDeg, lat, lng);
    const extinction = Math.min(1, Math.max(0, (pos.alt + 2) / 10));
    const o = magOpacity(star.mag) * extinction;
    if (o <= 0.02 || pos.alt < -2) return null;
    const { x, y } = skyPosition(pos);
    const point: StarPoint = {
      key: star.name || `star-${i}`,
      x,
      y,
      r: magRadius(star.mag),
      o,
      twinkle: star.mag <= 0.5,
    };
    points.push(point);
    return point;
  });

  const lines: StarLine[] = [];
  for (const [a, b] of LINE_PAIRS) {
    const ia = nameIndex.get(a);
    const ib = nameIndex.get(b);
    if (ia === undefined || ib === undefined) continue;
    const pa = screen[ia];
    const pb = screen[ib];
    if (!pa || !pb) continue;
    if (Math.abs(pa.x - pb.x) > 45) continue; // seam crossing — skip
    lines.push({ x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y });
  }

  return { points, lines };
};
