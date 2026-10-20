import React, { useState } from 'react';
import {
  Play,
  Square,
  Sparkles,
  Volume2,
  ExternalLink,
  Library,
} from 'lucide-react';
import { VINYL_PLAYLIST } from '../data/portfolioData';
import { VinylTrack } from '../types/portfolio';
import {
  playVinylTrack,
  stopVinylMusic,
  isVinylPlaying,
} from '../utils/audio';

export const EveningLoungeSection: React.FC = () => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isVinylPlaying());

  const currentTrack: VinylTrack = VINYL_PLAYLIST[selectedTrackIndex];

  const handleSelectTrack = (idx: number) => {
    setSelectedTrackIndex(idx);
    const track = VINYL_PLAYLIST[idx];
    playVinylTrack(track.id);
    setIsPlaying(true);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopVinylMusic();
      setIsPlaying(false);
    } else {
      playVinylTrack(currentTrack.id);
      setIsPlaying(true);
    }
  };

  return (
    <section id="lounge" className="relative min-h-[90vh] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Minimalist Scene Kicker */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-amber-300 tracking-widest font-semibold uppercase">
            05:30 PM · Vinyl Lounge & Library
          </span>
          <p className="text-xs font-mono text-amber-200/60 mt-1">
            2023–2026 Record Crate · Touch any record in the library to spin on the turntable
          </p>
        </div>

        {/* 2-Part Layout: Vinyl Crate Library on Left, Turntable Station on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          {/* Left Column: Interactive Vinyl Library Crate */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-[#3E2723] rounded-3xl p-6 shadow-2xl border-4 border-[#2D1B18] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[#5D4037] text-xs font-mono text-amber-200">
                <div className="flex items-center gap-1.5">
                  <Library className="w-3.5 h-3.5 text-amber-400" />
                  <span>VINYL CRATE · 2023–2026 HITS</span>
                </div>
                <span>6 RECORDS</span>
              </div>

              {/* Records in Crate */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {VINYL_PLAYLIST.map((track, idx) => {
                  const isCurrent = selectedTrackIndex === idx;
                  return (
                    <button
                      key={track.id}
                      onClick={() => handleSelectTrack(idx)}
                      className={`group relative p-3 rounded-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer text-left flex flex-col justify-between min-h-[140px] border shadow-md focus:outline-hidden ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-950/80 ring-2 ring-amber-400/50'
                          : 'border-white/10 bg-black/40 hover:bg-black/60'
                      }`}
                    >
                      {/* Vinyl Record Top Peeking Out */}
                      <div className="relative w-full h-12 flex items-center justify-center overflow-hidden mb-2">
                        <div
                          className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-neutral-700 shadow-md flex items-center justify-center"
                          style={{ borderColor: track.color }}
                        >
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[7px] font-mono font-bold text-slate-950"
                            style={{ backgroundColor: track.color }}
                          >
                            23+
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-amber-400 block font-semibold">
                          {track.year} · {track.genre.split('/')[0]}
                        </span>
                        <h4 className="text-xs font-bold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                          {track.title}
                        </h4>
                        <p className="text-[11px] font-mono text-slate-400 line-clamp-1 mt-0.5">
                          {track.artist}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="h-3 bg-[#5D4037] rounded-md mt-4 border-t border-amber-900/60" />
            </div>

            <span className="text-[11px] font-mono text-amber-200/70 mt-3">
              Touch any album to mount on the turntable
            </span>
          </div>

          {/* Right Column: Interactive Turntable Station */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-amber-500/30 shadow-2xl text-slate-100 flex flex-col items-center backdrop-blur-md">
              {/* Spinning Vinyl Record Disc */}
              <div className="relative mb-6 flex items-center justify-center">
                <div
                  className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center relative ${
                    isPlaying ? 'animate-spin-slow' : ''
                  }`}
                >
                  {/* Vinyl Grooves Rings */}
                  <div className="absolute inset-3 rounded-full border border-neutral-700/50 pointer-events-none" />
                  <div className="absolute inset-6 rounded-full border border-neutral-700/50 pointer-events-none" />
                  <div className="absolute inset-9 rounded-full border border-neutral-700/50 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-neutral-700/50 pointer-events-none" />

                  {/* Record Center Label */}
                  <div
                    className="w-16 h-16 rounded-full border-2 border-white/40 flex flex-col items-center justify-center text-slate-950 text-[9px] font-mono font-bold shadow-md"
                    style={{ backgroundColor: currentTrack.color }}
                  >
                    <span>_CP</span>
                    <span className="text-[7px]">SIDE A</span>
                  </div>

                  {/* Spindle hole */}
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-slate-950 shadow-inner" />
                </div>
              </div>

              {/* Track Details & Playback Controls */}
              <div className="w-full text-center space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-semibold">
                    NOW MOUNTED
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    {currentTrack.artist} · {currentTrack.album} ({currentTrack.year})
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handlePlayToggle}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md"
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Synthesizer</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Chords</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `${currentTrack.artist} ${currentTrack.title}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono transition-colors"
                  >
                    <span>YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {isPlaying && (
                  <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-mono text-emerald-400 animate-pulse">
                    <Volume2 className="w-4 h-4" />
                    <span>Synthesizing modern chord progression ({currentTrack.bpm} BPM)...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
