import React, { useState } from 'react';
import {
  ExternalLink,
  Mail,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  MEDICINE_BOTTLES,
  DEVELOPER_PROFILE,
  SKILL_CATEGORIES,
} from '../data/portfolioData';
import { playCabinetOpen, playBottleClick } from '../utils/audio';
import { Modal } from './Modal';

interface InspectedItem {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  type: 'bio' | 'skills' | 'contact' | 'routine' | 'other';
}

export const MedicineCabinetSection: React.FC = () => {
  // Cabinet is open by default
  const [isOpen, setIsOpen] = useState(true);
  const [inspectedItem, setInspectedItem] = useState<InspectedItem | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const toggleCabinet = () => {
    playCabinetOpen();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: InspectedItem) => {
    playBottleClick();
    setInspectedItem(item);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="cabinet" className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* 3D Realistic Open Bathroom Medicine Cabinet */}
      <div className="relative w-full max-w-2xl perspective-1200 select-none my-auto">
        {/* Bathroom Subway Tile Wall Backing Plate */}
        <div className="relative w-full bg-[#E8ECEF] dark:bg-[#1E252B] rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-300 dark:border-slate-800">
          
          {/* Recessed Wall Shadow & Aluminum Cabinet Casing */}
          <div className="relative w-full min-h-[580px] bg-gradient-to-b from-[#CFD8DC] via-[#ECEFF1] to-[#B0BEC5] dark:from-[#1A202C] dark:via-[#2D3748] dark:to-[#171923] rounded-2xl p-4 sm:p-5 shadow-[inset_0_4px_12px_rgba(0,0,0,0.35)] border-2 border-slate-400 dark:border-slate-700 flex flex-col justify-between">
            
            {/* Mirror Interior Backplane with Soft Diffuse Morning Light Reflection */}
            <div className="absolute inset-4 rounded-xl overflow-hidden bg-gradient-to-b from-[#E2E8F0] via-[#F8FAFC] to-[#CBD5E1] dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] shadow-inner flex flex-col justify-between p-4 sm:p-6">
              {/* LED Perimeter Lighting Strip */}
              <div className="absolute inset-0 border-2 border-amber-200/50 dark:border-amber-400/20 rounded-xl pointer-events-none shadow-[inset_0_0_15px_rgba(253,230,138,0.4)]" />

              {/* Diagonal Mirror Specular Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 dark:via-white/10 to-transparent pointer-events-none" />

              {/* SHELF 1 (Top Glass Shelf): Cologne, Styling Pomade, Skincare Serum, Face Cream */}
              <div className="relative z-10 flex items-end justify-between px-2 sm:px-6 pb-2 border-b-2 border-sky-200/80 dark:border-slate-600 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                {/* Item 1.1: Glass Cologne Atomizer */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Artisan Eau de Parfum',
                      subtitle: 'Bergamot & Cedarwood · Morning Scent',
                      category: 'Grooming & Fragrance',
                      description: 'A crisp, grounding fragrance of Italian bergamot, vetiver, and smoky cedarwood. The quiet tactile sensory ritual before opening a text editor.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Cologne Atomizer"
                >
                  <div className="relative w-12 h-24 flex flex-col items-center justify-end">
                    {/* Metallic Silver Spray Nozzle */}
                    <div className="w-5 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-400 rounded-t-xs shadow-xs border border-slate-400" />
                    <div className="w-7 h-2 bg-slate-400 rounded-xs" />
                    {/* Heavy Glass Flacon with Amber Fragrance */}
                    <div className="relative w-12 h-18 bg-gradient-to-r from-amber-400/80 via-amber-300/70 to-amber-500/90 rounded-md shadow-lg border border-amber-500/60 flex items-center justify-center overflow-hidden">
                      {/* Glass Highlight */}
                      <div className="absolute top-1 left-1 w-1 h-14 bg-white/60 rounded-full blur-[0.5px]" />
                      <span className="text-[7px] font-mono font-bold tracking-widest text-amber-950 uppercase">
                        VENCE
                      </span>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Cologne
                  </span>
                </button>

                {/* Item 1.2: Matte Black Hair Styling Pomade Tin */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Matte Clay Pomade',
                      subtitle: 'Beeswax & Bentonite · Clean Finish',
                      category: 'Styling & Care',
                      description: 'Low-shine, high-hold natural styling clay. Zero residue, zero fuss. Just like clean TypeScript code.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Styling Pomade Tin"
                >
                  <div className="relative w-16 h-12 flex flex-col items-center justify-end">
                    {/* Tin Lid with Embossed Ring */}
                    <div className="w-16 h-5 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 rounded-t-lg shadow-md border border-neutral-600 flex items-center justify-center">
                      <div className="w-12 h-2 rounded-full border border-neutral-500/40 flex items-center justify-center">
                        <span className="text-[6px] font-mono font-bold text-neutral-300 uppercase">
                          MATTE CLAY
                        </span>
                      </div>
                    </div>
                    {/* Tin Base */}
                    <div className="w-15 h-7 bg-gradient-to-r from-neutral-900 via-neutral-800 to-black rounded-b-md border-x border-b border-neutral-700 shadow-md" />
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Pomade
                  </span>
                </button>

                {/* Item 1.3: Frosted Amber Skincare Serum Dropper */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Hyaluronic & B5 Daily Serum',
                      subtitle: 'Hydration & Cognitive Barrier Repair',
                      category: 'Dermatology & Skin',
                      description: 'Deep cellular hydration drops with provitamin B5. Essential after long sessions under studio lighting.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Serum Dropper"
                >
                  <div className="relative w-10 h-22 flex flex-col items-center justify-end">
                    {/* Rubber Dropper Bulb */}
                    <div className="w-4 h-4 bg-neutral-900 rounded-full" />
                    <div className="w-6 h-3 bg-white rounded-t-xs border border-slate-300 -mt-1" />
                    {/* Amber Dropper Bottle */}
                    <div className="relative w-9 h-15 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-b-md shadow-md border border-amber-600 flex items-center justify-center">
                      <div className="w-7 h-8 bg-white/95 rounded-xs p-0.5 text-center flex flex-col justify-center">
                        <span className="text-[6px] font-bold text-slate-900 leading-tight">B5</span>
                        <span className="text-[5px] text-slate-600">SERUM</span>
                      </div>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Serum
                  </span>
                </button>

                {/* Item 1.4: Sunscreen / Facial Moisturizer Tube */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Mineral SPF 50+ Moisturizer',
                      subtitle: 'Zinc Oxide · Broad Spectrum Shield',
                      category: 'Morning Defense',
                      description: 'Non-greasy mineral photoprotection against UV radiation and indoor monitor blue-light fatigue.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Moisturizer Tube"
                >
                  <div className="relative w-10 h-20 flex flex-col items-center justify-end">
                    {/* Tube Body standing upside-down */}
                    <div className="w-9 h-16 bg-gradient-to-r from-orange-100 via-amber-50 to-orange-200 rounded-t-md border border-orange-200 shadow-md p-1 flex flex-col justify-between items-center">
                      <span className="text-[6px] font-bold font-mono text-orange-950 uppercase">
                        SPF 50
                      </span>
                      <div className="w-5 h-1 bg-orange-400/80 rounded-full" />
                    </div>
                    {/* White Flip Cap Base */}
                    <div className="w-7 h-4 bg-white rounded-b-sm border border-slate-300 shadow-xs" />
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    SPF 50
                  </span>
                </button>
              </div>

              {/* SHELF 2 (Middle Glass Shelf): Core Prescriptions (Origin, Stack, Comms, Routine) */}
              <div className="relative z-10 flex items-end justify-between px-2 sm:px-6 pb-2 border-b-2 border-sky-200/80 dark:border-slate-600 shadow-[0_2px_4px_rgba(0,0,0,0.06)]">
                {/* Bottle 2.1: Rx Origin / Bio */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Rx #01 · Origin & Philosophy',
                      subtitle: 'Curiosity Extract · Genesis Dose',
                      category: 'Prescription Formula',
                      description: DEVELOPER_PROFILE.bio,
                      type: 'bio',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Rx: Bio & Origin"
                >
                  <div className="relative w-16 h-28 flex flex-col items-center justify-end">
                    {/* White Childproof Ribbed Cap */}
                    <div className="w-10 h-4 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-t-sm border border-slate-300 shadow-xs flex items-center justify-center">
                      <div className="w-7 h-1 border-t border-b border-slate-400/40" />
                    </div>
                    {/* Amber Apothecary Body */}
                    <div className="relative w-15 h-24 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-900 rounded-b-lg border border-amber-600/70 shadow-lg flex flex-col items-center justify-between p-1.5">
                      <div className="absolute top-1 left-1.5 w-1 h-18 bg-white/35 rounded-full blur-[0.5px]" />
                      <div className="w-full bg-[#FFFDF5] rounded-xs p-1 text-center shadow-xs border border-amber-900/20">
                        <p className="font-bold text-[8.5px] uppercase font-mono text-amber-950">Rx: BIO</p>
                        <p className="text-[6.5px] text-amber-800 font-semibold truncate">Origin</p>
                      </div>
                      <span className="text-[7px] font-mono text-amber-200 font-medium">100mg</span>
                    </div>
                  </div>
                  <span className="mt-1 text-[11px] font-mono font-bold text-amber-900 dark:text-amber-300 group-hover:scale-105 transition-transform">
                    Origin
                  </span>
                </button>

                {/* Bottle 2.2: Rx Stack Compound */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Rx #02 · Compound Stack-B',
                      subtitle: 'Technical Aptitude · Type-Safe Formulation',
                      category: 'Prescription Formula',
                      description: 'Production-grade engineering across TypeScript, React 19, Go, WebGL, PostgreSQL, and Distributed Systems.',
                      type: 'skills',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Rx: Technical Stack"
                >
                  <div className="relative w-16 h-30 flex flex-col items-center justify-end">
                    {/* Cap */}
                    <div className="w-10 h-4 bg-gradient-to-r from-slate-900 via-neutral-800 to-slate-950 rounded-t-sm border border-slate-700 shadow-xs" />
                    {/* Cobalt Blue Glass Bottle */}
                    <div className="relative w-15 h-26 bg-gradient-to-r from-blue-700 via-sky-600 to-indigo-950 rounded-b-lg border border-sky-400/50 shadow-lg flex flex-col items-center justify-between p-1.5">
                      <div className="absolute top-1 left-1.5 w-1 h-20 bg-white/35 rounded-full blur-[0.5px]" />
                      <div className="w-full bg-white rounded-xs p-1 text-center shadow-xs border border-sky-900/20">
                        <p className="font-bold text-[8.5px] uppercase font-mono text-sky-950">Rx: STACK</p>
                        <p className="text-[6.5px] text-sky-800 font-semibold truncate">Full-Stack</p>
                      </div>
                      <span className="text-[7px] font-mono text-sky-200 font-medium">100% TS</span>
                    </div>
                  </div>
                  <span className="mt-1 text-[11px] font-mono font-bold text-sky-900 dark:text-sky-300 group-hover:scale-105 transition-transform">
                    Stack
                  </span>
                </button>

                {/* Bottle 2.3: Rx Direct Comms */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Rx #03 · Direct Comms Elixir',
                      subtitle: 'Direct Dispatch · Active Frequency',
                      category: 'Prescription Formula',
                      description: 'Direct communication coordinates across Email, LinkedIn, GitHub, Telegram, and Upwork.',
                      type: 'contact',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Rx: Contact Info"
                >
                  <div className="relative w-15 h-26 flex flex-col items-center justify-end">
                    {/* Cap */}
                    <div className="w-9 h-3.5 bg-neutral-900 rounded-t-sm border border-emerald-400/40" />
                    {/* Emerald Glass Dropper Bottle */}
                    <div className="relative w-14 h-22 bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-950 rounded-b-lg border border-emerald-400/50 shadow-lg flex flex-col items-center justify-between p-1.5">
                      <div className="absolute top-1 left-1.5 w-1 h-16 bg-white/35 rounded-full blur-[0.5px]" />
                      <div className="w-full bg-white rounded-xs p-1 text-center shadow-xs border border-emerald-900/20">
                        <p className="font-bold text-[8.5px] uppercase font-mono text-emerald-950">Rx: COMMS</p>
                        <p className="text-[6.5px] text-emerald-800 font-semibold truncate">Direct Line</p>
                      </div>
                      <span className="text-[7px] font-mono text-emerald-200 font-medium">50ml</span>
                    </div>
                  </div>
                  <span className="mt-1 text-[11px] font-mono font-bold text-emerald-900 dark:text-emerald-300 group-hover:scale-105 transition-transform">
                    Comms
                  </span>
                </button>

                {/* Bottle 2.4: Rx Daily Focus / Ritual */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Rx #04 · Deep Focus Capsules',
                      subtitle: 'Cognitive Rhythm · Daily Cadence',
                      category: 'Prescription Formula',
                      description: 'Morning rituals and deep work habits that keep output clean, structured, and resilient.',
                      type: 'routine',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Rx: Daily Ritual"
                >
                  <div className="relative w-14 h-24 flex flex-col items-center justify-end">
                    {/* Cap */}
                    <div className="w-9 h-3.5 bg-purple-950 rounded-t-sm border border-purple-400/40" />
                    {/* Violet Glass Jar */}
                    <div className="relative w-13 h-20 bg-gradient-to-r from-purple-700 via-indigo-800 to-indigo-950 rounded-b-lg border border-purple-400/50 shadow-lg flex flex-col items-center justify-between p-1.5">
                      <div className="absolute top-1 left-1.5 w-1 h-14 bg-white/35 rounded-full blur-[0.5px]" />
                      <div className="w-full bg-white rounded-xs p-1 text-center shadow-xs border border-purple-900/20">
                        <p className="font-bold text-[8.5px] uppercase font-mono text-purple-950">FOCUS</p>
                        <p className="text-[6.5px] text-purple-800 font-semibold truncate">Ritual</p>
                      </div>
                      <span className="text-[7px] font-mono text-purple-200 font-medium">30 Caps</span>
                    </div>
                  </div>
                  <span className="mt-1 text-[11px] font-mono font-bold text-purple-900 dark:text-purple-300 group-hover:scale-105 transition-transform">
                    Ritual
                  </span>
                </button>
              </div>

              {/* SHELF 3 (Bottom Glass Shelf): Dental Tumbler with Toothbrushes, Toothpaste, Floss, Dental Rinse */}
              <div className="relative z-10 flex items-end justify-between px-2 sm:px-6 pt-2">
                {/* Item 3.1: Ceramic Tumbler with Toothbrushes */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Porcelain Toothbrush Tumbler',
                      subtitle: 'Sonic Electric & Bamboo Charcoal Brushes',
                      category: 'Dental Hygiene',
                      description: 'Dual brushes: High-frequency sonic electric toothbrush alongside a travel-ready biodegradable bamboo brush with activated charcoal bristles.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Toothbrush Tumbler"
                >
                  <div className="relative w-16 h-26 flex flex-col items-center justify-end">
                    {/* Toothbrush Handles sticking out of tumbler */}
                    <div className="absolute top-0 flex gap-2">
                      {/* Sonic Toothbrush */}
                      <div className="w-3 h-16 bg-gradient-to-b from-slate-200 via-white to-slate-300 rounded-t-full border border-slate-300 shadow-xs flex flex-col items-center pt-1 -rotate-6">
                        <div className="w-2 h-4 bg-sky-400 rounded-t-md" />
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2" />
                      </div>
                      {/* Bamboo Brush */}
                      <div className="w-2.5 h-16 bg-gradient-to-b from-[#D7CCC8] to-[#A1887F] rounded-t-full border border-[#8D6E63] shadow-xs flex flex-col items-center pt-1 rotate-6">
                        <div className="w-2 h-4 bg-neutral-800 rounded-t-md" />
                      </div>
                    </div>

                    {/* Ceramic Porcelain Tumbler Cup */}
                    <div className="relative z-10 w-14 h-15 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-b-xl border-2 border-slate-300 shadow-md flex items-center justify-center">
                      <div className="w-11 h-1 bg-slate-300/60 rounded-full -mt-10" />
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Brushes
                  </span>
                </button>

                {/* Item 3.2: Mint Toothpaste Tube */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Organic Spearmint Toothpaste',
                      subtitle: 'Fluoride & Peppermint Micro-Polish',
                      category: 'Dental Hygiene',
                      description: 'Fresh botanical mint polish in a recyclable aluminum tube. Guaranteed to wake up tastebuds before the first coffee.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Toothpaste Tube"
                >
                  <div className="relative w-24 h-12 flex items-center justify-center -rotate-12">
                    {/* Hexagonal Screw Cap */}
                    <div className="w-4 h-6 bg-white border border-slate-300 rounded-l-xs shadow-xs" />
                    {/* Toothpaste Tube Body with green botanical stripe */}
                    <div className="w-20 h-8 bg-gradient-to-r from-emerald-100 via-white to-slate-200 rounded-r-sm border border-slate-300 shadow-md flex items-center px-1.5 justify-between">
                      <div className="w-12 h-2 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                      <span className="text-[6px] font-mono font-bold text-slate-800 uppercase">
                        MINT
                      </span>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Toothpaste
                  </span>
                </button>

                {/* Item 3.3: Dental Floss Dispenser */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Waxed Peppermint Floss',
                      subtitle: 'Essential Dental Maintenance',
                      category: 'Dental Hygiene',
                      description: 'Woven vegan dental floss infused with natural coconut oil and peppermint.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Dental Floss"
                >
                  <div className="relative w-12 h-14 flex flex-col items-center justify-end">
                    {/* Teardrop Floss Box with Flip Top */}
                    <div className="w-10 h-10 bg-gradient-to-tr from-sky-50 to-white rounded-2xl border-2 border-sky-200 shadow-md flex flex-col items-center justify-between p-1">
                      {/* Metallic cutter blade */}
                      <div className="w-2 h-1.5 bg-slate-400 rounded-xs -mt-2" />
                      <div className="w-5 h-5 rounded-full border border-sky-300/80 flex items-center justify-center">
                        <span className="text-[5px] font-mono text-sky-700">FLOSS</span>
                      </div>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Floss
                  </span>
                </button>

                {/* Item 3.4: Antibacterial Dental Mouthwash Bottle */}
                <button
                  onClick={() =>
                    handleItemClick({
                      title: 'Botanical Oral Rinse',
                      subtitle: 'Tea Tree & Eucalyptus · Zero Alcohol',
                      category: 'Dental Hygiene',
                      description: 'Refreshing morning mouthwash with soothing aloe vera and essential botanical oils.',
                      type: 'other',
                    })
                  }
                  className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 cursor-pointer focus:outline-hidden"
                  title="Mouthwash Bottle"
                >
                  <div className="relative w-13 h-24 flex flex-col items-center justify-end">
                    {/* Measuring Cap */}
                    <div className="w-8 h-5 bg-gradient-to-r from-neutral-800 to-black rounded-t-sm border border-neutral-700 shadow-xs" />
                    {/* Clear Bottle filled with Teal Mouthwash */}
                    <div className="relative w-12 h-19 bg-gradient-to-r from-teal-400/80 via-emerald-300/70 to-teal-500/90 rounded-b-lg border border-teal-500/70 shadow-lg flex flex-col items-center justify-center">
                      <div className="w-9 h-7 bg-white/95 rounded-xs p-0.5 text-center flex flex-col justify-center">
                        <span className="text-[6px] font-bold text-teal-950">RINSE</span>
                        <span className="text-[5px] text-teal-800">FRESH</span>
                      </div>
                    </div>
                  </div>
                  <span className="mt-1 text-[10px] font-mono text-slate-600 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Mouthwash
                  </span>
                </button>
              </div>
            </div>

            {/* Left Mirrored Door with 3D Hinge Swing - Open by default */}
            <div
              onClick={toggleCabinet}
              className={`absolute top-4 bottom-4 left-4 w-[calc(50%-16px)] rounded-l-xl cursor-pointer transition-transform duration-700 ease-out origin-left border-r-2 border-slate-400/50 shadow-2xl flex items-center justify-end pr-2 bg-gradient-to-br from-slate-200/95 via-slate-100/95 to-slate-300/90 dark:from-slate-700/90 dark:via-slate-800/90 dark:to-slate-900/90 backdrop-blur-xs ${
                isOpen ? '-rotate-y-110' : 'rotate-y-0'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
              title={isOpen ? 'Click door to close' : 'Click door to open'}
            >
              <div className="w-2.5 h-16 bg-gradient-to-b from-slate-300 via-white to-slate-400 rounded-sm shadow-md border border-slate-400" />
            </div>

            {/* Right Mirrored Door with 3D Hinge Swing - Open by default */}
            <div
              onClick={toggleCabinet}
              className={`absolute top-4 bottom-4 right-4 w-[calc(50%-16px)] rounded-r-xl cursor-pointer transition-transform duration-700 ease-out origin-right border-l-2 border-slate-400/50 shadow-2xl flex items-center justify-start pl-2 bg-gradient-to-bl from-slate-200/95 via-slate-100/95 to-slate-300/90 dark:from-slate-700/90 dark:via-slate-800/90 dark:to-slate-900/90 backdrop-blur-xs ${
                isOpen ? 'rotate-y-110' : 'rotate-y-0'
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
              title={isOpen ? 'Click door to close' : 'Click door to open'}
            >
              <div className="w-2.5 h-16 bg-gradient-to-b from-slate-300 via-white to-slate-400 rounded-sm shadow-md border border-slate-400" />
            </div>
          </div>

          {/* Wall Mounted Chrome Bottom Towel Rail / Ambient Base */}
          <div className="mt-3 flex items-center justify-center">
            <div className="w-3/5 h-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 dark:from-slate-700 dark:via-slate-500 dark:to-slate-700 rounded-full shadow-md border border-slate-400 dark:border-slate-600" />
          </div>
        </div>

        {/* Floor Depth Shadow */}
        <div className="w-3/4 h-6 mx-auto bg-slate-900/15 dark:bg-black/40 rounded-full blur-xl -mt-2" />
      </div>

      {/* Modal Cards triggered by clicking ANY item */}
      <Modal
        isOpen={inspectedItem !== null}
        onClose={() => setInspectedItem(null)}
        title={inspectedItem?.title || ''}
        subtitle={inspectedItem?.subtitle}
      >
        {inspectedItem?.type === 'bio' && (
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                {DEVELOPER_PROFILE.status}
              </span>
              <p className="text-xs text-amber-800/90 dark:text-amber-400/90 mt-1">
                {DEVELOPER_PROFILE.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
              {DEVELOPER_PROFILE.bio}
            </p>
          </div>
        )}

        {inspectedItem?.type === 'skills' && (
          <div className="space-y-5">
            {SKILL_CATEGORIES.map((category) => (
              <div key={category.title} className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 font-mono">
                  {category.title}
                </h4>
                <div className="space-y-2">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {skill.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {inspectedItem?.type === 'contact' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 truncate">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-mono font-medium truncate">
                  {DEVELOPER_PROFILE.email}
                </span>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-700 hover:bg-slate-100 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-600 transition-colors shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-400 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">LinkedIn</span>
                  <span className="text-slate-500 font-mono text-[11px]">in/chilepeppers</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-400 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">GitHub</span>
                  <span className="text-slate-500 font-mono text-[11px]">@_chilepeppers</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={DEVELOPER_PROFILE.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-400 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">Telegram</span>
                  <span className="text-slate-500 font-mono text-[11px]">@chilepeppers_dev</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={DEVELOPER_PROFILE.upwork}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 hover:border-slate-400 transition-colors flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">Upwork</span>
                  <span className="text-slate-500 font-mono text-[11px]">Top Rated</span>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        )}

        {inspectedItem?.type === 'routine' && (
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">06:30 AM — Silent Awakening</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Hydration, cold water splash, 10 minutes of stillness before screens.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">07:15 AM — Technical Whitepapers</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">25 pages of distributed systems RFCs over morning brew.</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900/40">
              <span className="font-bold text-slate-900 dark:text-white block">08:00 AM — Single Milestone Focus</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">Define one single high-leverage engineering milestone for the day.</p>
            </div>
          </div>
        )}

        {inspectedItem?.type === 'other' && (
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {inspectedItem.category}
            </span>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {inspectedItem.description}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
};
