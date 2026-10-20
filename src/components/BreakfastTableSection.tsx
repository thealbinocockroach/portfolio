import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { PHILOSOPHY_CARDS } from '../data/portfolioData';
import { PhilosophyCard } from '../types/portfolio';
import { playCoffeeSip, playPageFlip } from '../utils/audio';
import { Modal } from './Modal';

export const BreakfastTableSection: React.FC = () => {
  const [activePhilosophy, setActivePhilosophy] = useState<PhilosophyCard | null>(null);
  const [shakingSeasoning, setShakingSeasoning] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleCoffeeClick = () => {
    playCoffeeSip();
    const card = PHILOSOPHY_CARDS.find((c) => c.id === 'coffee');
    if (card) setActivePhilosophy(card);
  };

  const handlePlateClick = () => {
    const card = PHILOSOPHY_CARDS.find((c) => c.id === 'plate');
    if (card) setActivePhilosophy(card);
  };

  const handleNewspaperClick = () => {
    playPageFlip();
    const card = PHILOSOPHY_CARDS.find((c) => c.id === 'newspaper');
    if (card) setActivePhilosophy(card);
  };

  const handleSeasoningClick = () => {
    setShakingSeasoning(true);
    setTimeout(() => setShakingSeasoning(false), 700);
    const card = PHILOSOPHY_CARDS.find((c) => c.id === 'seasoning');
    if (card) setActivePhilosophy(card);
  };

  return (
    <section id="breakfast" className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      {/* 3D Morning Dining Room & Kitchen Nook Environment */}
      <div className="relative w-full max-w-5xl my-auto select-none">
        
        {/* Architectural Dining Nook Setting */}
        <div className="relative w-full min-h-[580px] sm:min-h-[620px] rounded-3xl bg-gradient-to-b from-[#FAF8F5] to-[#EFEBE6] dark:from-[#181D24] dark:to-[#11141A] p-6 sm:p-10 shadow-2xl border border-amber-200/40 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
          
          {/* Background Kitchen & Dining Accents */}
          {/* Ceiling Hanging Brass Pendant Light */}
          <div className="absolute top-0 left-1/3 sm:left-1/4 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
            {/* Cord */}
            <div className="w-0.5 h-20 bg-slate-400 dark:bg-slate-600" />
            {/* Cone Shade */}
            <div className="w-14 h-8 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full shadow-md" />
            {/* Warm Light Aura */}
            <div className="w-36 h-28 bg-amber-400/20 blur-2xl rounded-full -mt-2" />
          </div>

          {/* Kitchen Counter / Window Shelf in the background (Right side) */}
          <div className="absolute top-8 right-6 sm:right-12 w-64 sm:w-80 h-32 flex flex-col justify-end pointer-events-none opacity-85">
            {/* Counter Surface */}
            <div className="flex items-end justify-between px-4 pb-1">
              {/* Espresso Machine */}
              <div className="w-20 h-22 bg-gradient-to-t from-slate-700 via-slate-600 to-slate-800 rounded-t-lg shadow-md border border-slate-500 flex flex-col items-center justify-between p-1.5">
                <div className="w-6 h-2 bg-slate-900 rounded-xs" />
                <div className="w-10 h-3 bg-amber-500/80 rounded-xs" />
                <div className="w-8 h-6 bg-slate-900 rounded-xs border border-slate-700" />
              </div>

              {/* Potted Monstera / Kitchen Plant */}
              <div className="flex flex-col items-center">
                <div className="flex -space-x-1 -mb-1">
                  <div className="w-5 h-7 bg-emerald-600 rounded-full -rotate-12 shadow-xs" />
                  <div className="w-6 h-8 bg-emerald-500 rounded-full rotate-6 shadow-xs" />
                  <div className="w-5 h-7 bg-emerald-600 rounded-full rotate-45 shadow-xs" />
                </div>
                {/* Terracotta Pot */}
                <div className="w-9 h-10 bg-[#D97706] rounded-b-md shadow-md border-t-2 border-[#B45309]" />
              </div>

              {/* Pour-Over Glass Carafe */}
              <div className="w-14 h-18 bg-white/40 dark:bg-slate-700/40 rounded-b-xl border border-slate-300 dark:border-slate-600 shadow-xs flex flex-col items-center justify-end p-1">
                <div className="w-8 h-7 bg-amber-900/60 rounded-b-lg" />
              </div>
            </div>
            {/* Oak Floating Shelf Ledge */}
            <div className="w-full h-3 bg-[#8D6E63] rounded-sm shadow-md" />
          </div>

          {/* Floor Planks Ambient Line */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#DDD6CE] to-transparent dark:from-[#0B0E14] pointer-events-none opacity-40" />

          {/* CIRCULAR 3D BREAKFAST DINING TABLE */}
          <div className="relative z-20 my-auto w-full max-w-xl mx-auto sm:ml-12 lg:ml-20 perspective-1000">
            {/* Table Shadow on Floor */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-14 bg-black/20 dark:bg-black/50 rounded-full blur-2xl" />

            {/* Circular Solid Oak Dining Table Top */}
            <div
              className="relative w-full aspect-square max-w-[480px] mx-auto rounded-full bg-gradient-to-br from-[#EFE8DF] via-[#E2D8CB] to-[#C9B9A6] dark:from-[#332A24] dark:via-[#261F1A] dark:to-[#1A1411] border-8 border-[#D5C7B7] dark:border-[#3D332D] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),inset_0_2px_8px_rgba(255,255,255,0.4)] p-6 sm:p-8 flex items-center justify-center transition-transform duration-500 hover:rotate-x-1"
            >
              {/* Subtle Natural Woodgrain Rings */}
              <div className="absolute inset-4 rounded-full border border-[#D5C7B7]/40 dark:border-white/5 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-[#D5C7B7]/30 dark:border-white/5 pointer-events-none" />
              <div className="absolute inset-24 rounded-full border border-[#D5C7B7]/20 dark:border-white/5 pointer-events-none" />

              {/* Natural Breakfast Setting Layout (NO WRITING ON TABLE) */}
              <div className="relative w-full h-full flex flex-col justify-between items-center p-2">
                
                {/* Top Section: Steaming Ceramic Coffee Mug & Chili Shaker */}
                <div className="w-full flex items-center justify-around">
                  {/* Item 1: Artisan Ceramic Coffee Mug */}
                  <button
                    onClick={handleCoffeeClick}
                    onMouseEnter={() => setHoveredItem('Ceramic Mug')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer focus:outline-hidden"
                    title="Coffee Mug"
                  >
                    {/* Steam Plumes */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                      <span className="w-1.5 h-5 bg-amber-600/35 rounded-full animate-steam-1" />
                      <span className="w-1.5 h-7 bg-amber-700/40 rounded-full animate-steam-2" />
                      <span className="w-1.5 h-5 bg-amber-600/35 rounded-full animate-steam-3" />
                    </div>

                    {/* Ceramic Saucer */}
                    <div className="absolute -bottom-1 w-22 h-6 bg-[#D7CCC8] dark:bg-[#4E342E] rounded-full shadow-md border border-[#BCAAA4] dark:border-[#3E2723]" />

                    {/* Ceramic Mug Body */}
                    <div className="relative w-16 h-18 bg-gradient-to-r from-[#F5F2EB] via-white to-[#E4DFD5] dark:from-[#3E2723] dark:via-[#4E342E] dark:to-[#2D1B18] rounded-b-2xl rounded-t-sm shadow-xl border-2 border-slate-300/80 dark:border-slate-600 flex flex-col items-center">
                      {/* Coffee Liquid Surface */}
                      <div className="w-full h-5 bg-[#2B1713] rounded-full border border-amber-900/60 shadow-inner flex items-center justify-center overflow-hidden">
                        {/* Crema foam swirl */}
                        <div className="w-7 h-2 rounded-full bg-[#8D6E63]/80 blur-[0.5px]" />
                      </div>
                      {/* Mug Handle */}
                      <div className="absolute -right-3 top-2.5 w-4.5 h-10 border-3 border-[#D7CCC8] dark:border-[#4E342E] rounded-r-xl" />
                    </div>
                  </button>

                  {/* Item 2: Glass Chili Flake Seasoning Shaker */}
                  <button
                    onClick={handleSeasoningClick}
                    onMouseEnter={() => setHoveredItem('Chili Shaker')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer focus:outline-hidden ${
                      shakingSeasoning ? 'animate-bounce' : ''
                    }`}
                    title="Chili Flake Shaker"
                  >
                    <div className="relative w-10 h-22 flex flex-col items-center justify-end">
                      {/* Perforated Chrome Lid */}
                      <div className="w-8 h-4 bg-gradient-to-b from-slate-300 via-white to-slate-400 rounded-t-sm border border-slate-400 flex items-center justify-center gap-0.5 shadow-xs">
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                      </div>
                      {/* Glass Body with Crushed Chili Flakes */}
                      <div className="relative w-10 h-16 bg-gradient-to-t from-red-700 via-rose-600 to-amber-600 rounded-b-lg p-1 border border-slate-300 dark:border-slate-600 shadow-lg flex flex-wrap gap-0.5 justify-center items-center overflow-hidden">
                        <div className="absolute top-1 left-1 w-1 h-12 bg-white/40 rounded-full blur-[0.5px]" />
                        <span className="w-1 h-1 bg-yellow-200 rounded-full" />
                        <span className="w-1.5 h-1 bg-red-950 rounded-xs" />
                        <span className="w-1 h-1 bg-amber-300 rounded-full" />
                        <span className="w-1.5 h-1 bg-red-900 rounded-xs" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Bottom Section: Breakfast Plate (Egg & Toast) & Folded Newspaper */}
                <div className="w-full flex items-center justify-around mt-4">
                  {/* Item 3: Breakfast Plate (Sunny Egg & Sourdough) */}
                  <button
                    onClick={handlePlateClick}
                    onMouseEnter={() => setHoveredItem('Breakfast Plate')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer focus:outline-hidden"
                    title="Breakfast Plate"
                  >
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-[#ECEFF1] to-white dark:from-[#263238] dark:to-[#37474F] border-3 border-[#CFD8DC] dark:border-[#455A64] shadow-xl flex items-center justify-center p-2">
                      {/* Plate Center Well */}
                      <div className="w-22 h-22 rounded-full bg-[#F5F5F5] dark:bg-[#1E272C] border border-slate-200/80 dark:border-slate-700 shadow-inner flex items-center justify-center relative overflow-hidden">
                        {/* Golden Sourdough Slice */}
                        <div className="w-13 h-15 bg-gradient-to-br from-[#D7CCC8] to-[#8D6E63] rounded-lg rotate-12 shadow-md border border-[#6D4C41] flex items-center justify-center">
                          <div className="w-9 h-9 rounded-sm bg-[#A1887F]/40" />
                        </div>
                        {/* Sunny-Side Up Egg with Radiant Yolk */}
                        <div className="absolute w-12 h-12 bg-white/95 rounded-full shadow-md -translate-x-1.5 translate-y-1 flex items-center justify-center">
                          <div className="w-5.5 h-5.5 bg-gradient-to-tr from-amber-500 to-yellow-400 rounded-full shadow-xs border border-amber-600/40" />
                        </div>
                        {/* Herbs */}
                        <div className="absolute bottom-2 right-3 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                        <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </button>

                  {/* Item 4: The Morning Chronicle Newspaper */}
                  <button
                    onClick={handleNewspaperClick}
                    onMouseEnter={() => setHoveredItem('Morning Chronicle')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-3 hover:scale-105 cursor-pointer focus:outline-hidden"
                    title="The Morning Chronicle"
                  >
                    <div className="relative w-26 h-22 bg-[#F8F7F2] rounded-xs shadow-xl border border-stone-300 -rotate-6 p-2 flex flex-col justify-between">
                      {/* Newspaper Masthead */}
                      <div className="border-b border-stone-400 pb-0.5 text-center">
                        <p className="font-serif font-black text-[7px] tracking-tight uppercase text-stone-900">
                          THE MORNING CHRONICLE
                        </p>
                        <p className="text-[5px] font-mono text-stone-500">
                          GLOBAL CRAFT & TECH
                        </p>
                      </div>
                      {/* Column Lines */}
                      <div className="grid grid-cols-2 gap-1 py-1">
                        <div className="space-y-0.5">
                          <div className="w-full h-1 bg-stone-300 rounded-xs" />
                          <div className="w-4/5 h-1 bg-stone-200 rounded-xs" />
                          <div className="w-full h-1 bg-stone-300 rounded-xs" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="w-3/4 h-1 bg-stone-300 rounded-xs" />
                          <div className="w-full h-1 bg-stone-200 rounded-xs" />
                          <div className="w-4/5 h-1 bg-stone-300 rounded-xs" />
                        </div>
                      </div>
                      <span className="text-[6px] font-mono text-stone-800 font-bold truncate">
                        "Crafting Tactile Software"
                      </span>
                    </div>
                  </button>
                </div>

                {/* Subtle Hover Tooltip Pill */}
                {hoveredItem && (
                  <div className="absolute -bottom-8 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full text-[10px] font-mono text-white shadow-lg pointer-events-none animate-in fade-in">
                    Touch to open: {hoveredItem}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Card for Philosophy Details */}
      <Modal
        isOpen={activePhilosophy !== null}
        onClose={() => setActivePhilosophy(null)}
        title={activePhilosophy?.title || ''}
        subtitle={activePhilosophy?.subtitle}
      >
        <div className="space-y-4">
          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/20 border-l-4 border-amber-500 rounded-r-xl">
            <Quote className="w-5 h-5 text-amber-600 mb-2 opacity-80" />
            <blockquote className="text-base sm:text-lg font-serif italic text-slate-900 dark:text-slate-100">
              "{activePhilosophy?.quote}"
            </blockquote>
            <p className="mt-2 text-xs font-mono text-amber-800 dark:text-amber-400">
              — {activePhilosophy?.author}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {activePhilosophy?.detail}
          </p>
        </div>
      </Modal>
    </section>
  );
};
