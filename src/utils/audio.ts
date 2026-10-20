/**
 * Resilient Web Audio synthesizer for tactile interface feedback and lo-fi chords.
 * Operates purely client-side without relying on external MP3 assets.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;
let isPlayingVinyl = false;
let vinylLoopInterval: number | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function toggleAudio(enable?: boolean): boolean {
  if (typeof enable === 'boolean') {
    soundEnabled = enable;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (!soundEnabled && isPlayingVinyl) {
    stopVinylMusic();
  }
  return soundEnabled;
}

export function playCabinetOpen() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.35);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.38);
}

export function playBottleClick() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1860, now);
  osc.frequency.exponentialRampToValueAtTime(940, now + 0.14);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
}

export function playCoffeeSip() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(540, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.16);

  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);
}

export function playPageFlip() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1600, now);
  filter.Q.setValueAtTime(2.2, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.09, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.1);
}

export function playLightSwitch(turnOn: boolean) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  const startFreq = turnOn ? 850 : 420;
  const endFreq = turnOn ? 380 : 180;

  osc.frequency.setValueAtTime(startFreq, now);
  osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.05);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

// Track-specific harmonic progressions for 2023+ hits
const TRACK_CHORDS: Record<string, number[][]> = {
  espresso: [
    [329.63, 415.3, 493.88, 622.25], // Emaj7 (Upbeat funk)
    [293.66, 369.99, 440.0, 554.37], // Dmaj7
    [369.99, 440.0, 554.37, 659.25], // F#m7
    [329.63, 392.0, 493.88, 587.33], // Em7
  ],
  backon74: [
    [261.63, 329.63, 392.0, 493.88], // Cmaj7 (Neo-Soul)
    [293.66, 349.23, 440.0, 523.25], // Dm7
    [329.63, 392.0, 493.88, 587.33], // Em7
    [349.23, 440.0, 523.25, 659.25], // Fmaj7
  ],
  birds: [
    [392.0, 493.88, 587.33, 739.99], // Gmaj7 (Indie dream)
    [329.63, 392.0, 493.88, 587.33], // Em7
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
    [293.66, 369.99, 440.0, 587.33], // D7
  ],
  toosweet: [
    [220.0, 261.63, 329.63, 392.0],  // Am7 (Blues Soul)
    [349.23, 440.0, 523.25, 659.25], // Fmaj7
    [261.63, 329.63, 392.0, 523.25], // C
    [392.0, 493.88, 587.33, 659.25], // G6
  ],
  leavemealone: [
    [293.66, 349.23, 440.0, 523.25], // Dm (UK Garage bass)
    [246.94, 311.13, 369.99, 440.0], // Bbm
    [329.63, 392.0, 493.88, 587.33], // Em
    [261.63, 329.63, 392.0, 493.88], // Cmaj7
  ],
  greedy: [
    [277.18, 349.23, 415.3, 523.25], // C#m (Pop bounce)
    [329.63, 415.3, 493.88, 659.25], // E
    [246.94, 311.13, 369.99, 493.88], // B
    [220.0, 277.18, 329.63, 440.0],  // A
  ],
};

export function playVinylTrack(trackId: string = 'espresso') {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isPlayingVinyl = true;
  const chords = TRACK_CHORDS[trackId] || TRACK_CHORDS.espresso;
  let step = 0;

  const playChord = () => {
    if (!isPlayingVinyl || !soundEnabled) return;
    const currentChord = chords[step % chords.length];
    step++;

    const now = ctx.currentTime;
    currentChord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.025);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.045 / currentChord.length, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.025);
      osc.stop(now + 1.85);
    });
  };

  playChord();
  if (vinylLoopInterval) clearInterval(vinylLoopInterval);
  vinylLoopInterval = window.setInterval(playChord, 1900);
}

export function stopVinylMusic() {
  isPlayingVinyl = false;
  if (vinylLoopInterval) {
    clearInterval(vinylLoopInterval);
    vinylLoopInterval = null;
  }
}

export function isVinylPlaying(): boolean {
  return isPlayingVinyl;
}

/**
 * Resonant mountain alpine wind breeze using filtered noise
 */
export function playMountainBreeze() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 0.8;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(320, now);
  filter.frequency.exponentialRampToValueAtTime(580, now + 0.35);
  filter.frequency.exponentialRampToValueAtTime(220, now + 0.75);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.78);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.8);
}

/**
 * Gentle crystalline pine forest chime / leaf rustle
 */
export function playForestChime() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [880, 1174.66, 1318.51, 1760]; // A5, D6, E6, A6

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.04);

    gain.gain.setValueAtTime(0.001, now + idx * 0.04);
    gain.gain.linearRampToValueAtTime(0.035, now + idx * 0.04 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.04);
    osc.stop(now + idx * 0.04 + 0.52);
  });
}

