/**
 * Lightweight solar & lunar position math (NOAA sun approximation,
 * low-precision Meeus lunar theory) used to drive real sunrise/sunset
 * and moonrise/moonset times in the diurnal scene.
 */

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

export interface CelestialPos {
  alt: number; // altitude in degrees (negative = below horizon)
  az: number; // azimuth in degrees, 0=N, 90=E, 180=S, 270=W
}

const jdFromDate = (date: Date): number => date.getTime() / 86400000 + 2440587.5;

/** Greenwich mean sidereal time in hours for a given JD. */
const gmstHours = (jd: number): number => {
  const n = jd - 2451545.0;
  const g = 18.697374558 + 24.06570982441908 * n;
  return ((g % 24) + 24) % 24;
};

const altAzFrom = (
  ra: number,
  dec: number,
  lat: number,
  lng: number,
  jd: number
): CelestialPos => {
  const lst = (gmstHours(jd) * 15 + lng) * RAD;
  const H = lst - ra;
  const phi = lat * RAD;
  const alt =
    Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) * DEG;
  let az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi)) * DEG + 180;
  az = ((az % 360) + 360) % 360;
  return { alt, az };
};

/** Sun altitude/azimuth for a local-time Date at the given coordinates. */
export const sunPos = (date: Date, lat: number, lng: number): CelestialPos => {
  const jd = jdFromDate(date);
  const n = jd - 2451545.0;
  const L = (280.46 + 0.9856474 * n) * RAD;
  const g = (357.528 + 0.9856003 * n) * RAD;
  const lambda = L + (1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
  const eps = (23.439 - 0.0000004 * n) * RAD;
  const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
  const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
  return altAzFrom(ra, dec, lat, lng, jd);
};

/** Moon altitude/azimuth for a local-time Date at the given coordinates. */
export const moonPos = (date: Date, lat: number, lng: number): CelestialPos => {
  const jd = jdFromDate(date);
  const n = jd - 2451545.0;
  const L = (218.316 + 13.176396 * n) * RAD;
  const M = (134.963 + 13.064993 * n) * RAD;
  const F = (93.272 + 13.22935 * n) * RAD;
  const lambda = L + 6.289 * RAD * Math.sin(M);
  const beta = 5.128 * RAD * Math.sin(F);
  const eps = (23.439 - 0.0000004 * n) * RAD;
  const ra = Math.atan2(
    Math.sin(lambda) * Math.cos(eps) - Math.tan(beta) * Math.sin(eps),
    Math.cos(lambda)
  );
  const dec = Math.asin(
    Math.sin(beta) * Math.cos(eps) + Math.cos(beta) * Math.sin(eps) * Math.sin(lambda)
  );
  return altAzFrom(ra, dec, lat, lng, jd);
};

/** Star altitude/azimuth for a fixed RA/Dec catalog star at the given coordinates. */
export const starPos = (
  date: Date,
  raHours: number,
  decDeg: number,
  lat: number,
  lng: number
): CelestialPos => altAzFrom(raHours * 15 * RAD, decDeg * RAD, lat, lng, jdFromDate(date));

/**
 * Scan a local day (starting at dayStart, local time) in 10-minute steps and
 * return the first rise and first set as decimal hours past local midnight.
 * `horizon` should be -0.833 for the sun (refraction + semidiameter) and 0
 * for the moon. Returns rise=0/set=1441 sentinels when the body never sets
 * or never rises, or null/null when it stays below all day.
 */
export const findRiseSet = (
  compute: (d: Date) => number,
  dayStart: Date,
  horizon = 0
): { rise: number | null; set: number | null } => {
  const stepMin = 10;
  let prev = compute(dayStart) - horizon;
  let rise: number | null = null;
  let set: number | null = null;

  for (let m = stepMin; m <= 1440; m += stepMin) {
    const cur = compute(new Date(dayStart.getTime() + m * 60000)) - horizon;
    if (prev < 0 && cur >= 0 && rise === null) {
      rise = (m - stepMin * (cur / (cur - prev))) / 60;
    }
    if (prev >= 0 && cur < 0 && set === null) {
      set = (m - stepMin * (cur / (cur - prev))) / 60;
    }
    prev = cur;
    if (rise !== null && set !== null) break;
  }

  if (rise === null && set === null) {
    const midday = compute(new Date(dayStart.getTime() + 720 * 60000)) - horizon;
    if (midday >= 0) return { rise: 0, set: 1441 }; // up all day
    return { rise: null, set: null }; // down all day
  }
  return { rise, set };
};

/**
 * Map altitude/azimuth to a screen position in percent (top-left origin).
 * Full 360° azimuth wraps linearly (seam at due north / screen edges) so
 * sun, moon and stars share one consistent, astronomically correct frame.
 */
export const skyPosition = (pos: CelestialPos): { x: number; y: number } => {
  const az = ((pos.az % 360) + 360) % 360;
  const x = 2 + (az / 360) * 96;
  const y = 55 - Math.min(pos.alt, 90) * (40 / 90);
  return {
    x: Math.min(98, Math.max(2, x)),
    y: Math.min(60, Math.max(8, y)),
  };
};

/**
 * Horizon fade: bodies hold full brightness as they touch the horizon
 * (like a real rising/setting disc) and only dissolve once well below it.
 */
export const horizonFade = (alt: number): number =>
  Math.min(1, Math.max(0, (alt + 2.5) / 2));

/** Lunar phase for a given date (synodic month ~29.53 d). */
export interface MoonPhaseInfo {
  age: number; // days since new moon
  phase: number; // 0..1 (0 new, 0.25 first quarter, 0.5 full, 0.75 last quarter)
  illumination: number; // 0..1
  waxing: boolean;
  name: string;
}

const SYNODIC_MONTH = 29.53058867;
const REF_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);

export const moonPhase = (date: Date): MoonPhaseInfo => {
  const days = (date.getTime() - REF_NEW_MOON_UTC) / 86400000;
  const age = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const phase = age / SYNODIC_MONTH;
  const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
  const waxing = phase < 0.5;
  const names = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
  ];
  const idx = Math.round(phase * 8) % 8;
  return { age, phase, illumination, waxing, name: names[idx] };
};

/** Offset (local - UTC) in ms for a timezone at a given instant. */
const tzOffsetMs = (tz: string, date: Date): number => {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = dtf.formatToParts(date);
  const v = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const asUtc = Date.UTC(v('year'), v('month') - 1, v('day'), v('hour'), v('minute'), v('second'));
  return asUtc - date.getTime();
};

/**
 * Instant of today's local midnight in the given IANA timezone.
 * Used as `dayStart` so rise/set decimal hours line up with the
 * wall-clock timeline shown in the UI.
 */
export const wallMidnightInstant = (tz: string, now = new Date()): Date => {
  const dayInTz = new Date(now.getTime() + tzOffsetMs(tz, now));
  const wallUtc = Date.UTC(dayInTz.getUTCFullYear(), dayInTz.getUTCMonth(), dayInTz.getUTCDate());
  return new Date(wallUtc - tzOffsetMs(tz, new Date(wallUtc)));
};
