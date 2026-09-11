import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Heart, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Smile,
  Brain
} from 'lucide-react';
import { WHEN_TO_SEEK_THERAPY, DETAILED_REASONS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const WhyTherapySection: React.FC = () => {
  const { currentLanguage, setIsBookingOpen } = useBooking();
  const [expandedReasonId, setExpandedReasonId] = useState<string>('autoconhecimento');

  const toggleReason = (id: string) => {
    setExpandedReasonId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="quando-procurar" className="py-20 bg-[#FDFBF7] border-t border-stone-200/80 relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[#FAF3E7] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3.5 py-1 rounded-full shadow-xs">
            <MutuaMenteSymbol className="w-3.5 h-3.5" color="#CD8E33" />
            {currentLanguage === 'pt' ? 'Autoconhecimento & Cuidado' : 'Self-Discovery & Care'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#545454] mt-4">
            {currentLanguage === 'pt' 
              ? 'Motivos para procurar um psicólogo' 
              : 'Reasons to seek a psychologist'}
          </h2>
          <p className="text-[#545454] text-base sm:text-lg mt-4 font-normal leading-relaxed">
            {currentLanguage === 'pt'
              ? 'A intervenção psicológica e a saúde mental devem ser simples, acessíveis a todos e prioritárias na nossa vida do dia a dia.'
              : 'Psychological intervention and mental health should be simple, accessible to all, and a priority in everyday life.'}
          </p>
        </div>

        {/* 1. Procure um psicólogo se: (12 Checklist Points) */}
        <div className="mb-16 bg-white rounded-3xl p-8 sm:p-10 border border-[#E5B468]/50 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#CD8E33]">
                {currentLanguage === 'pt' ? 'Sinais & Situações Comuns' : 'Signs & Common Situations'}
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#545454] font-medium mt-1">
                {currentLanguage === 'pt' ? 'Procure um psicólogo se:' : 'Seek a psychologist if:'}
              </h3>
            </div>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>{currentLanguage === 'pt' ? 'Marcar Consulta de Acolhimento' : 'Book Welcome Session'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {WHEN_TO_SEEK_THERAPY.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5B468]/30 hover:border-[#CD8E33] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#FAF3E7] text-[#CD8E33] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-[#545454] leading-relaxed font-normal">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Deep Dive: 9 Comprehensive Reasons */}
        <div className="space-y-4">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#545454] font-medium">
              {currentLanguage === 'pt' 
                ? 'Compreender cada etapa do processo terapêutico' 
                : 'Understanding each phase of therapy'}
            </h3>
            <p className="text-xs sm:text-sm text-[#545454] mt-2">
              {currentLanguage === 'pt'
                ? 'Clique num dos temas abaixo para ler a reflexão clínica detalhada.'
                : 'Click any topic below to explore the detailed clinical reflection.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {DETAILED_REASONS.map((reason, idx) => {
              const isExpanded = expandedReasonId === reason.id;
              return (
                <div
                  key={reason.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'bg-white border-[#CD8E33] shadow-md' 
                      : 'bg-white/80 hover:bg-white border-stone-200 shadow-xs'
                  }`}
                >
                  <button
                    onClick={() => toggleReason(reason.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isExpanded 
                          ? 'bg-[#CD8E33] text-white' 
                          : 'bg-[#FAF3E7] text-[#CD8E33]'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="font-serif-display text-lg sm:text-xl text-[#545454] font-medium">
                        {reason.title}
                      </h4>
                    </div>

                    <div className="shrink-0 text-stone-400">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-[#CD8E33]" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-stone-100 mt-2">
                      <p className="text-sm sm:text-base text-[#545454] leading-relaxed whitespace-pre-line font-normal pt-4">
                        {reason.fullContent}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Concluding CTA Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#545454] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="font-serif-display text-2xl sm:text-3xl font-medium">
              {currentLanguage === 'pt' ? 'Deseja iniciar este caminho de transformação?' : 'Ready to begin your journey of self-discovery?'}
            </h4>
            <p className="text-sm text-stone-200 max-w-xl font-normal">
              {currentLanguage === 'pt'
                ? 'Dra. Sofia Godinho Cabrita oferece um acolhimento empático e sem julgamentos, presencialmente em Lisboa ou por videoconsulta.'
                : 'Dr. Sofia Godinho Cabrita offers an empathetic and non-judgmental space, in Lisbon or via secure video consultation.'}
            </p>
          </div>
          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-3.5 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white text-sm font-semibold shadow transition-colors shrink-0 cursor-pointer"
          >
            {currentLanguage === 'pt' ? 'Agendar Consulta de Psicologia' : 'Book Clinical Consultation'}
          </button>
        </div>
      </div>
    </section>
  );
};
