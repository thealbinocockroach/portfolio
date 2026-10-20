import React from 'react';
import {
  Lightbulb,
  Moon,
  ArrowUp,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { playLightSwitch } from '../utils/audio';

interface BedtimeSectionProps {
  lightsOut: boolean;
  onToggleLightsOut: () => void;
  onScrollToTop: () => void;
}

export const BedtimeSection: React.FC<BedtimeSectionProps> = ({
  lightsOut,
  onToggleLightsOut,
  onScrollToTop,
}) => {
  const handleSwitchClick = () => {
    const nextState = !lightsOut;
    playLightSwitch(nextState);
    onToggleLightsOut();
  };

  return (
    <section id="bedtime" className="relative min-h-[90vh] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center">
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col items-center">
        {/* Minimalist Scene Kicker */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs text-indigo-300 tracking-widest font-semibold uppercase">
            12:00 AM · Bedside & Lights Out
          </span>
          <p className="text-xs font-mono text-indigo-200/60 mt-1">
            Midnight Rest · Touch the rocker switch to toggle lights out
          </p>
        </div>

        {/* 3D Bed & Bedside Nightstand Scene */}
        <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-8 select-none">
          {/* Cozy Modern Bed Visual Container */}
          <div className="relative w-full sm:w-80 h-72 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-black p-5 border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden">
            {/* Wooden Headboard */}
            <div className="w-full h-10 bg-gradient-to-r from-[#4E342E] via-[#5D4037] to-[#4E342E] rounded-t-xl border-b-2 border-amber-900/40 shadow-md" />

            {/* Pillows */}
            <div className="flex justify-around px-4 -mt-3">
              <div className="w-20 h-10 bg-slate-200 rounded-xl shadow-md border border-slate-300" />
              <div className="w-20 h-10 bg-slate-200 rounded-xl shadow-md border border-slate-300" />
            </div>

            {/* Quilted Duvet Bedding */}
            <div
              className={`w-full h-36 rounded-2xl transition-all duration-700 shadow-inner p-4 flex flex-col justify-between ${
                lightsOut
                  ? 'bg-gradient-to-b from-slate-800 to-indigo-950 border border-indigo-900/50'
                  : 'bg-gradient-to-b from-amber-950/60 to-slate-900 border border-amber-600/30'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>MIDNIGHT SLUMBER</span>
                <span>REST</span>
              </div>
              <p className="text-xs font-serif italic text-slate-300 text-center">
                Sleep restores the architecture of the mind.
              </p>
            </div>
          </div>

          {/* Nightstand Table with Brass Desk Lamp & Tactile Rocker Switch */}
          <div className="relative w-full sm:w-72 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col items-center text-center">
            {/* Lamp Visual */}
            <div className="relative mb-5 flex flex-col items-center">
              {/* Conical Light Beam */}
              <div
                className={`absolute -bottom-20 w-44 h-32 bg-amber-400/25 blur-xl rounded-full transition-opacity duration-700 pointer-events-none ${
                  lightsOut ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                }`}
              />

              {/* Lamp Shade */}
              <div className="w-20 h-14 bg-gradient-to-b from-amber-200 to-amber-100 rounded-t-3xl shadow-lg border-t-2 border-amber-300 flex items-center justify-center relative overflow-hidden">
                <div
                  className={`w-7 h-7 rounded-full blur-xs transition-colors duration-500 ${
                    lightsOut ? 'bg-amber-900/40' : 'bg-amber-300'
                  }`}
                />
              </div>

              {/* Brass Stem & Base */}
              <div className="w-2 h-16 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 shadow-xs" />
              <div className="w-16 h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 rounded-full shadow-md" />
            </div>

            {/* Nightstand Switch Box */}
            <div className="w-full bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs font-mono font-bold text-white block">
                  Nightstand Switch
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {lightsOut ? 'Dim Moonlit' : 'Lamp Glow'}
                </span>
              </div>

              {/* Rocker Toggle Switch */}
              <button
                onClick={handleSwitchClick}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 cursor-pointer p-1 border shadow-inner ${
                  lightsOut
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-amber-500 border-amber-400'
                }`}
                aria-label={lightsOut ? 'Turn Lamp On' : 'Turn Lamp Off'}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                    lightsOut ? 'translate-x-0' : 'translate-x-6'
                  }`}
                >
                  {lightsOut ? (
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                  ) : (
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll back to Dawn CTA */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Rise & Shine — Back to Dawn (Top)</span>
          </button>

          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Diurnal cycle resets to 07:00 AM</span>
          </span>
        </div>
      </div>

      {/* Clean Minimalist Footer as requested */}
      <footer className="w-full max-w-5xl mx-auto mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          <span className="font-bold text-slate-200">_chilepeppers</span>
        </div>

        {/* Social Links: GitHub, Twitter, Email, Telegram, LinkedIn, Upwork */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GitHub
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href={DEVELOPER_PROFILE.twitter}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Twitter / X
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            className="hover:text-amber-400 transition-colors"
          >
            Email
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href={DEVELOPER_PROFILE.telegram}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Telegram
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            LinkedIn
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href={DEVELOPER_PROFILE.upwork}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            Upwork
          </a>
        </div>
      </footer>
    </section>
  );
};
