import React, { useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { NOTEBOOK_PAGES, SHELF_BOOKS } from '../data/portfolioData';
import { ShelfBook } from '../types/portfolio';
import { playPageFlip } from '../utils/audio';
import { Modal } from './Modal';

export const StudyDeskSection: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState<ShelfBook | null>(null);

  const currentPage = NOTEBOOK_PAGES[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < NOTEBOOK_PAGES.length - 1) {
      playPageFlip();
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      playPageFlip();
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const handleBookClick = (book: ShelfBook) => {
    playPageFlip();
    setSelectedBook(book);
  };

  return (
    <section id="study" className="relative min-h-[90vh] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Minimalist Scene Kicker */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs text-indigo-900 tracking-widest font-semibold uppercase">
            10:00 AM · Study Desk & Bookshelf
          </span>
          <p className="text-xs font-mono text-indigo-950/60 mt-1">
            Interactive Library · Touch books on the shelf to open or flip the notebook
          </p>
        </div>

        {/* 2-Part Layout: 3D Bookshelf on Left, Lined Exercise Notebook on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          {/* Bookshelf Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* 3D Wooden Bookshelf Unit */}
            <div className="w-full bg-[#4E342E] rounded-3xl p-5 shadow-2xl border-4 border-[#3E2723] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-[#6D4C41] text-xs font-mono text-amber-200/80">
                <div className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>REFERENCE SHELF</span>
                </div>
                <span>5 VOLUMES</span>
              </div>

              {/* Shelf Interior with Standing Books */}
              <div className="relative min-h-[280px] bg-[#2E1C18] rounded-xl p-4 shadow-inner flex items-end justify-between gap-2 overflow-x-auto pt-10">
                {/* Wood Backing Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {SHELF_BOOKS.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-8 hover:scale-105 cursor-pointer focus:outline-hidden shrink-0"
                    title={`Open "${book.title}"`}
                  >
                    {/* Standing Book Spine */}
                    <div
                      className={`w-11 sm:w-12 h-52 sm:h-56 rounded-t-sm rounded-b-xs shadow-xl border-l-2 border-r-2 flex flex-col justify-between p-1.5 text-center transition-all ${book.spineColor}`}
                    >
                      {/* Top Ribbon Bookmark */}
                      <div className="w-2 h-4 bg-amber-400 rounded-b-xs mx-auto -mt-2 shadow-xs" />

                      {/* Rotated Spine Title */}
                      <div className="flex-1 flex items-center justify-center my-1 overflow-hidden">
                        <span className="rotate-90 whitespace-nowrap text-[9px] sm:text-[10px] font-mono font-bold tracking-tight uppercase">
                          {book.title.length > 22 ? `${book.title.slice(0, 20)}…` : book.title}
                        </span>
                      </div>

                      {/* Author Tag on Spine Base */}
                      <div className="pt-1 border-t border-white/20 text-[7px] font-mono opacity-80 truncate">
                        {book.author.split(' ')[0]}
                      </div>
                    </div>

                    {/* Book Base Shadow */}
                    <div className="w-10 h-2 bg-black/40 rounded-full blur-[2px] mt-1" />
                  </button>
                ))}
              </div>

              {/* Wooden Shelf Ledge Bottom */}
              <div className="h-4 bg-gradient-to-r from-[#5D4037] via-[#8D6E63] to-[#5D4037] rounded-md shadow-md mt-2 border-t border-amber-900/40" />
            </div>

            <span className="text-[11px] font-mono text-slate-600 mt-3">
              Touch any book to slide out & read
            </span>
          </div>

          {/* Lined Exercise Notebook Column */}
          <div className="lg:col-span-7">
            <div className="relative bg-[#FCFBF7] rounded-3xl border border-[#E8E4DA] shadow-xl p-6 sm:p-8 overflow-hidden">
              {/* Lined Notebook Paper Effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 27px, #E5E1D5 28px)',
                }}
              />
              {/* Red Left Margin Line */}
              <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-px bg-rose-300/80 pointer-events-none" />

              {/* Notebook Header */}
              <div className="relative z-10 flex items-center justify-between pb-4 border-b border-stone-200 mb-6 pl-6 sm:pl-10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  <span className="font-mono text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {currentPage.date}
                  </span>
                </div>

                {/* Page Tab Selector */}
                <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-lg">
                  {NOTEBOOK_PAGES.map((page, idx) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        playPageFlip();
                        setCurrentPageIndex(idx);
                      }}
                      className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer ${
                        currentPageIndex === idx
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      P.{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Page Content */}
              <div className="relative z-10 mb-6 pl-6 sm:pl-10">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 tracking-tight">
                  {currentPage.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-mono text-stone-500">
                  {currentPage.subtitle}
                </p>
              </div>

              <div className="relative z-10 space-y-6 pl-6 sm:pl-10 text-stone-800">
                {currentPage.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-sm font-bold font-serif text-stone-900 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                      <span>{sec.heading}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {sec.body}
                    </p>

                    {sec.highlights && (
                      <div className="space-y-1.5 mt-2">
                        {sec.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2 p-1.5 rounded-md text-xs text-stone-700 bg-stone-100/70"
                          >
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Page Navigation Controls */}
              <div className="relative z-10 mt-8 pt-4 border-t border-stone-200 flex items-center justify-between text-xs font-mono text-stone-600 pl-6 sm:pl-10">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPageIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev Page</span>
                </button>

                <span className="tabular-nums font-semibold">
                  Page {currentPageIndex + 1} of {NOTEBOOK_PAGES.length}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={currentPageIndex === NOTEBOOK_PAGES.length - 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Inspection Modal */}
      <Modal
        isOpen={selectedBook !== null}
        onClose={() => setSelectedBook(null)}
        title={selectedBook?.title || ''}
        subtitle={`by ${selectedBook?.author}`}
      >
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {selectedBook?.summary}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
              Core Takeaway
            </span>
            <p className="text-sm font-serif italic text-slate-900 dark:text-slate-100">
              "{selectedBook?.keyTakeaway}"
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Key Syllabus Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedBook?.topics.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-mono border border-indigo-200/60 dark:border-indigo-900/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
};
