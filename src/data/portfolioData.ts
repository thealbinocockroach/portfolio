import {
  MedicineBottle,
  SkillCategory,
  PhilosophyCard,
  NotebookPage,
  SoftwareProject,
  VinylTrack,
  ShelfBook,
} from '../types/portfolio';

export const DEVELOPER_PROFILE = {
  handle: '_chilepeppers',
  fullName: '_chilepeppers',
  title: 'Engineering & Creative Lab',
  tagline: 'Bridging low-latency systems with tactile, interactive computing.',
  location: 'San Francisco, CA & Remote',
  email: 'alex@chilepeppers.dev',
  github: 'https://github.com/_chilepeppers',
  twitter: 'https://twitter.com/_chilepeppers',
  telegram: 'https://t.me/chilepeppers_dev',
  linkedin: 'https://linkedin.com/in/chilepeppers',
  upwork: 'https://www.upwork.com/freelancers/~chilepeppers',
  status: 'Open to High-Impact Engineering Roles & Technical Advisory',
  bio: `Full-stack engineer and creative technologist who builds high-throughput distributed systems and tactile interactive web applications. 

Focused on type safety, sub-50ms latency, zero-pill aesthetics, and intuitive human interactions.`,
};

export const MEDICINE_BOTTLES: MedicineBottle[] = [
  {
    id: 'bio',
    name: 'Curiosity Tincture',
    prescription: 'Rx #01 — Origin & Philosophy',
    dosage: '1 Dose at First Light',
    bottleColor: 'from-amber-600 via-amber-700 to-amber-950',
    accentColor: '#D97706',
    labelTag: 'ORIGIN',
    tagline: 'Background, genesis, and approach to building software.',
  },
  {
    id: 'skills',
    name: 'Compound Stack-B',
    prescription: 'Rx #02 — Technical Aptitude',
    dosage: 'Type-Safe Formulation (100% Scalable)',
    bottleColor: 'from-sky-700 via-blue-800 to-blue-950',
    accentColor: '#0284C7',
    labelTag: 'STACK',
    tagline: 'TypeScript, Go, WebGL, PostgreSQL, Distributed Systems.',
  },
  {
    id: 'contact',
    name: 'Direct Comms Drops',
    prescription: 'Rx #03 — Direct Dispatch',
    dosage: 'Take as Needed for Collaborations',
    bottleColor: 'from-emerald-600 via-teal-700 to-emerald-950',
    accentColor: '#059669',
    labelTag: 'COMMS',
    tagline: 'Email, GitHub, LinkedIn, Telegram, and Upwork coordinates.',
  },
  {
    id: 'routine',
    name: 'Deep Focus Elixir',
    prescription: 'Rx #04 — Daily Cadence',
    dosage: '1 Measure Before Deep Work Sprints',
    bottleColor: 'from-purple-700 via-indigo-800 to-indigo-950',
    accentColor: '#7C3AED',
    labelTag: 'FOCUS',
    tagline: 'Morning rituals that keep cognition sharp and output clean.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Craft & Spatial UI',
    items: [
      { name: 'TypeScript & React 19', level: 96, note: 'Strict typing, concurrent features, custom hooks' },
      { name: 'Tailwind CSS & Design Systems', level: 98, note: 'Zero-pill discipline, WCAG AAA accessibility, tokens' },
      { name: 'WebGL, Three.js & Motion', level: 88, note: 'Custom shaders, 60fps animations, spatial canvas' },
      { name: 'Performance Optimization', level: 92, note: 'Core Web Vitals, sub-100ms INP, tree-shaking' },
    ],
  },
  {
    title: 'Systems & Backend Architecture',
    items: [
      { name: 'Node.js & Go Runtime', level: 90, note: 'High-concurrency microservices, gRPC, REST' },
      { name: 'PostgreSQL, Drizzle & Redis', level: 92, note: 'Complex schema indexing, transactions, caching' },
      { name: 'Event Streaming & WebSockets', level: 86, note: 'Sub-50ms duplex telemetry, Kafka, Pub/Sub' },
      { name: 'Docker, CI/CD & Cloud Run', level: 88, note: 'Hermetic builds, container orchestration, IaC' },
    ],
  },
  {
    title: 'Practices & Engineering Values',
    items: [
      { name: 'First-Principles Architecture', level: 95, note: 'Simplicity over premature abstraction' },
      { name: 'Systematic Test Suites', level: 90, note: 'Unit, integration, and E2E regression defenses' },
      { name: 'Human-Centered Ergonomics', level: 94, note: 'Respecting user cognition and device battery' },
    ],
  },
];

export const PHILOSOPHY_CARDS: PhilosophyCard[] = [
  {
    id: 'coffee',
    item: 'Ceramic Coffee Mug',
    title: 'Deliberate Craft Over Haste',
    subtitle: 'The 9-Bar Extraction Principle',
    quote: 'Slow brews yield the richest notes. In software as in coffee, pressure without precision creates bitterness, while patience reveals depth.',
    author: '_chilepeppers',
    detail: 'I approach every component like a manual lever pull: calibrate the inputs, control the variables, and measure the output with unrelenting standards.',
  },
  {
    id: 'plate',
    item: 'Stoneware Breakfast Plate',
    title: 'Systems Before Transient Tools',
    subtitle: 'Foundations Outlast Trends',
    quote: 'Libraries come and go every 18 months; deep understanding of memory, network physics, and human attention remains durable for decades.',
    author: '_chilepeppers',
    detail: 'Before reaching for an external dependency, I verify whether standard platform primitives can achieve the same result with zero payload weight.',
  },
  {
    id: 'newspaper',
    item: 'The Morning Chronicle',
    title: 'Tactile Computing Manifesto',
    subtitle: 'Editorial Edition / Page 3',
    quote: 'Software should not feel like flat, cold glass. It should push back with physical weight, clear feedback, and intentional motion.',
    author: 'The Morning Chronicle (Interview)',
    detail: 'Why should physical machinery have all the satisfying clicks, switches, and grain? We can craft web interfaces with the tactile delight of high-end mechanical cameras.',
  },
  {
    id: 'seasoning',
    item: 'Chili Flake Shaker',
    title: 'The Spice of Individuality',
    subtitle: 'Why "_chilepeppers"',
    quote: 'Without seasoning, every dish tastes the same. Without taste and point of view, every website looks like the same AI-generated template.',
    author: '_chilepeppers',
    detail: 'The moniker is a constant reminder: avoid the bland middle. Bring distinct color, bold flavor, and memorable character to every line of code.',
  },
];

export const SHELF_BOOKS: ShelfBook[] = [
  {
    id: 'ddia',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    spineColor: 'bg-emerald-900 text-emerald-100 border-emerald-950',
    coverGradient: 'from-emerald-800 to-teal-950',
    topics: ['Distributed Consensus', 'Replication Topologies', 'Eventual Consistency', 'Transactions'],
    summary: 'The defining modern treatise on reliable, scalable, and maintainable systems. Explores the deep trade-offs between consistency, availability, and network latency.',
    keyTakeaway: 'There are no solutions, only trade-offs. Design for failure from day zero.',
  },
  {
    id: 'sicp',
    title: 'Structure & Interpretation of Computer Programs',
    author: 'Abelson & Sussman (MIT)',
    spineColor: 'bg-indigo-900 text-indigo-100 border-indigo-950',
    coverGradient: 'from-indigo-800 to-slate-950',
    topics: ['Metalinguistic Abstraction', 'Evaluation Models', 'Closures', 'Streams'],
    summary: 'Mastery of abstraction barriers and computational models. Teaches how programming languages function as formal frameworks for expressing thought.',
    keyTakeaway: 'Programs must be written for people to read, and only incidentally for machines to execute.',
  },
  {
    id: 'ostep',
    title: 'Operating Systems: Three Easy Pieces',
    author: 'Remzi H. Arpaci-Dusseau',
    spineColor: 'bg-amber-900 text-amber-100 border-amber-950',
    coverGradient: 'from-amber-800 to-stone-950',
    topics: ['Virtualization', 'Concurrency & Locks', 'Persistence & File Systems'],
    summary: 'A foundational look at CPU virtualization, memory paging, mutual exclusion, and crash-consistent journaled file systems.',
    keyTakeaway: 'Understanding hardware and kernel abstractions is the ultimate superpower for backend debugging.',
  },
  {
    id: 'algo',
    title: 'The Algorithm Design Manual',
    author: 'Steven S. Skiena',
    spineColor: 'bg-rose-900 text-rose-100 border-rose-950',
    coverGradient: 'from-rose-800 to-neutral-950',
    topics: ['Graph Traversal', 'Dynamic Programming', 'NP-Completeness', 'Heuristics'],
    summary: 'Practical algorithmic problem-solving with real engineering war stories illustrating how theory rescues real-world software bottlenecks.',
    keyTakeaway: 'Recognize the mathematical shape of your problem before writing a single loop.',
  },
  {
    id: 'interpreters',
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    spineColor: 'bg-purple-900 text-purple-100 border-purple-950',
    coverGradient: 'from-purple-800 to-violet-950',
    topics: ['Lexing & ASTs', 'Bytecode VMs', 'Garbage Collection', 'Closures'],
    summary: 'Hands-on construction of tree-walking interpreters and stack-based virtual machines from scratch.',
    keyTakeaway: 'Building an interpreter de-mystifies how runtimes like V8 and the JVM execute code.',
  },
];

export const NOTEBOOK_PAGES: NotebookPage[] = [
  {
    id: 'education',
    title: 'University Credentials & Foundations',
    subtitle: 'Computer Science · Systems & UI/UX Concentration',
    date: 'Academic Record',
    sections: [
      {
        heading: 'B.S. in Computer Science (Summa Cum Laude)',
        body: 'University of Washington, Seattle · GPA: 3.94 / 4.00. Focus on Distributed Systems, Advanced Algorithms, and Human-Computer Interaction.',
        highlights: [
          'Dean\'s High Honors across all 8 consecutive semesters',
          'Teaching Assistant for CS 332: Systems Architecture & C Programming',
          'President of the Open-Source Systems & Graphics Guild',
        ],
      },
      {
        heading: 'Core Technical Coursework',
        body: 'Distributed Systems & Raft, Computer Graphics, Operating Systems, Machine Learning, Compiler Construction, Linear Algebra.',
      },
    ],
  },
  {
    id: 'research',
    title: 'Academic Research & Lab Projects',
    subtitle: 'Peer-reviewed systems prototypes and benchmarks',
    date: 'Lab Archives',
    sections: [
      {
        heading: 'Low-Latency Audio Scheduling in Browser Runtimes',
        body: 'Designed a lock-free Web Audio ring buffer with sub-2.4ms jitter across throttled CPU states using SharedArrayBuffer and Atomics.',
        highlights: [
          'Zero-allocation ring buffer implementation',
          'Near native parity against C++ DSP kernels',
        ],
      },
      {
        heading: 'Distributed Consensus Topology Simulator',
        body: 'Interactive visualizer demonstrating leader election, network partitions, and split-brain recovery under Raft consensus protocols.',
      },
    ],
  },
];

export const SOFTWARE_PROJECTS: SoftwareProject[] = [
  {
    id: 'chilipulse',
    title: 'ChiliPulse Telemetry',
    tagline: 'High-throughput real-time telemetry with sub-30ms ingest latency',
    category: 'systems',
    categoryLabel: 'Systems & Backend',
    year: '2026',
    summary: 'A developer-first distributed telemetry engine designed to monitor web vitals, error traces, and microservice health with zero telemetry bloat.',
    metrics: ['Sub-30ms ingestion', '1.2M events/sec benchmark', '99.99% reliability'],
    techStack: ['Go', 'TypeScript', 'WebSockets', 'ClickHouse', 'Tailwind'],
    githubUrl: 'https://github.com/_chilepeppers/chilipulse',
    liveUrl: 'https://chilipulse.dev',
    architectureHighlights: [
      'Micro-batched memory buffers to minimize disk write amplification',
      'Zero-allocation JSON deserialization in Go worker nodes',
      'Real-time WebSocket canvas renderer delivering 60fps telemetry charts',
    ],
    codeSnippet: `// High-concurrency ring buffer flush in ChiliPulse Go agent
func (rb *TelemetryRing) FlushToCluster(ctx context.Context) error {
    batch := rb.drainActiveWindow()
    if len(batch) == 0 {
        return nil
    }
    return rb.clickhouseClient.AppendBatch(ctx, batch)
}`,
  },
  {
    id: 'auracanvas',
    title: 'AuraCanvas Studio',
    tagline: 'Node-based generative WebGL shader studio and visual synthesizer',
    category: 'webgl',
    categoryLabel: 'Creative & WebGL',
    year: '2025',
    summary: 'An in-browser creative coding playground where generative artists compose procedural shaders using visual node graphs or live raw GLSL with instantaneous preview.',
    metrics: ['60 FPS real-time rendering', '140+ built-in math nodes', 'Zero external plugins'],
    techStack: ['WebGL 2.0', 'Three.js', 'React 19', 'WebAudio API', 'GLSL'],
    githubUrl: 'https://github.com/_chilepeppers/auracanvas',
    liveUrl: 'https://auracanvas.studio',
    architectureHighlights: [
      'Graph-to-GLSL compiler synthesizing single-pass fragment shaders on the fly',
      'Audio-reactive FFT frequency analysis nodes driving vertex displacements',
      'Export to standalone Web Component, MP4 canvas recording, or raw GLSL',
    ],
    codeSnippet: `// Fragment shader synthesis generator
function compileNodeGraphToGLSL(graph: ShaderGraph): string {
  const uniformDeclarations = graph.generateUniforms();
  const mathExpressions = graph.traverseTopologicalOrder();
  return \`#version 300 es
  precision highp float;
  \${uniformDeclarations}
  out vec4 fragColor;
  void main() {
    \${mathExpressions}
    fragColor = vec4(finalColor, 1.0);
  }\`;
}`,
  },
  {
    id: 'kiteflow',
    title: 'KiteFlow Orchestrator',
    tagline: 'Autonomous DAG task engine with deterministic failure retries',
    category: 'systems',
    categoryLabel: 'Distributed Orchestration',
    year: '2025',
    summary: 'A resilient async job coordinator built for unpredictable external API integrations. Offers transparent DAG inspection, checkpointing, and instant rollback.',
    metrics: ['Zero runtime dependencies', 'Sub-5MB binary footprint', 'Local SQLite engine'],
    techStack: ['TypeScript', 'Node.js', 'SQLite/WAL', 'Docker', 'React'],
    githubUrl: 'https://github.com/_chilepeppers/kiteflow',
    liveUrl: 'https://kiteflow.run',
    architectureHighlights: [
      'Write-Ahead-Log checkpointing ensuring jobs survive sudden container restarts',
      'Dynamic topological dependency solver with circular cycle rejection',
      'Interactive visual DAG timeline with live step-level logs and retry triggers',
    ],
    codeSnippet: `// Deterministic DAG Step Execution with Exponential Backoff
export async function executeStepWithRetry<T>(
  step: WorkflowStep<T>,
  state: ExecutionContext
): Promise<StepResult<T>> {
  for (let attempt = 1; attempt <= step.maxRetries; attempt++) {
    try {
      return await step.run(state);
    } catch (err) {
      if (attempt === step.maxRetries) throw new StepExhaustedError(step.id, err);
      await sleep(calculateJitterBackoff(attempt));
    }
  }
}`,
  },
  {
    id: 'habitchronicle',
    title: 'HabitChronicle Diurnal',
    tagline: 'Cognitive daylight-synced spatial journal & habit companion',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Application',
    year: '2024',
    summary: 'An offline-first personal operating system that modulates its interface typography, contrast, and cognitive load based on the sun\'s solar position at your coordinates.',
    metrics: ['100% offline capable', 'Zero tracking telemetry', 'PWA compliant'],
    techStack: ['React', 'Tailwind CSS', 'IndexedDB', 'Solar Calculation API'],
    githubUrl: 'https://github.com/_chilepeppers/habitchronicle',
    liveUrl: 'https://habitchronicle.app',
    architectureHighlights: [
      'Astronomical solar elevation calculations running purely client-side',
      'Client-side AES-GCM 256-bit encryption for all personal journal entries',
      'Zero round-trip latency with bidirectional IndexedDB sync',
    ],
    codeSnippet: `// Solar elevation calculation for circadian UI palette
export function getCircadianColorBalance(lat: number, lng: number): DayPeriod {
  const solarAltitude = computeSolarDeclination(lat, lng, new Date());
  if (solarAltitude < -6) return 'night';
  if (solarAltitude < 6) return 'twilight';
  if (solarAltitude < 35) return 'morning';
  return 'solarNoon';
}`,
  },
];

// Recent Music from 2023 - 2026 onwards as requested!
export const VINYL_PLAYLIST: VinylTrack[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    album: 'Short n\' Sweet',
    year: '2024',
    genre: 'Nu-Disco / Pop',
    bpm: 104,
    color: '#D97706',
  },
  {
    id: 'backon74',
    title: 'Back On 74',
    artist: 'Jungle',
    album: 'Volcano',
    year: '2023',
    genre: 'Neo-Soul / Funk',
    bpm: 96,
    color: '#E11D48',
  },
  {
    id: 'birds',
    title: 'BIRDS OF A FEATHER',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    year: '2024',
    genre: 'Indie Pop',
    bpm: 105,
    color: '#3B82F6',
  },
  {
    id: 'toosweet',
    title: 'Too Sweet',
    artist: 'Hozier',
    album: 'Unheard EP',
    year: '2024',
    genre: 'Blues Rock / Soul',
    bpm: 117,
    color: '#8B5CF6',
  },
  {
    id: 'leavemealone',
    title: 'leavemealone',
    artist: 'Fred again.. & Baby Keem',
    album: 'leavemealone Single',
    year: '2023',
    genre: 'UK Garage / Bass',
    bpm: 134,
    color: '#10B981',
  },
  {
    id: 'greedy',
    title: 'greedy',
    artist: 'Tate McRae',
    album: 'THINK LATER',
    year: '2023',
    genre: 'Pop / Dance',
    bpm: 111,
    color: '#F59E0B',
  },
];
