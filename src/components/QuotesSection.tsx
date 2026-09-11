import React, { useState } from 'react';
import { Quote as QuoteIcon, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { QUOTES } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const QuotesSection: React.FC = () => {
  const { currentLanguage } = useBooking();
  const [activeIdx, setActiveIdx] = useState(0);

  const nextQuote = () => {
    setActiveIdx((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    setActiveIdx((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const current = QUOTES[activeIdx];

  return (
    <section className="py-14 sm:py-18 bg-[#FAF3E7] border-y border-[#E5B468]/40 relative overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#CD8E33]/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#CD8E33]/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#CD8E33] bg-white border border-[#E5B468]/60 px-3 py-1 rounded-full shadow-xs">
            <MutuaMenteSymbol className="w-3.5 h-3.5" color="#CD8E33" />
            {currentLanguage === 'pt' ? 'Inspiração & Pensamento' : 'Inspiration & Reflection'}
          </span>
        </div>

        {/* Featured Quote Display */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5B468]/50 shadow-md relative">
          <QuoteIcon className="w-12 h-12 text-[#CD8E33]/20 absolute top-6 left-6 sm:top-8 sm:left-8 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <p className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-[#545454] leading-snug tracking-tight font-normal">
              “{current.text}”
            </p>

            {current.translationPt && (
              <p className="text-sm sm:text-base text-[#545454]/80 italic max-w-2xl mx-auto border-t border-[#E5B468]/30 pt-3">
                {current.translationPt}
              </p>
            )}

            <div className="pt-2">
              <h4 className="font-serif-display text-lg sm:text-xl font-semibold text-[#CD8E33]">
                {current.author}
              </h4>
              {current.authorRole && (
                <span className="text-xs text-[#545454]/70 font-medium">
                  {current.authorRole}
                </span>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-stone-100">
            <div className="flex items-center gap-2">
              {QUOTES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    activeIdx === idx 
                      ? 'w-8 bg-[#CD8E33]' 
                      : 'w-2 bg-stone-200 hover:bg-stone-300'
                  }`}
                  aria-label={`Ver citação ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevQuote}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#CD8E33] hover:text-[#CD8E33] text-[#545454] flex items-center justify-center transition-colors cursor-pointer bg-white"
                aria-label="Citação anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextQuote}
                className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#CD8E33] hover:text-[#CD8E33] text-[#545454] flex items-center justify-center transition-colors cursor-pointer bg-white"
                aria-label="Próxima citação"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Small 4-quote preview pills */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUOTES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-white border-[#CD8E33] shadow-xs'
                  : 'bg-white/60 hover:bg-white border-transparent text-[#545454]'
              }`}
            >
              <p className="text-xs font-semibold text-[#545454] truncate">
                {q.author}
              </p>
              <p className="text-[11px] text-[#545454]/70 truncate mt-0.5">
                "{q.text}"
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
