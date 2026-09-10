import React, { useState } from 'react';
import { 
  Star, 
  ChevronDown, 
  HelpCircle, 
  Quote, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { TESTIMONIALS, FAQS } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

export const FaqAndTestimonials: React.FC = () => {
  const { currentLanguage, setIsBookingOpen } = useBooking();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-stone-100/70 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Testimonials */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
              <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
              {currentLanguage === 'pt' ? 'Experiências Reais' : 'Client Testimonials'}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#2C2822] mt-4">
              {currentLanguage === 'pt'
                ? 'Histórias de mudança e confiança mútua'
                : 'Stories of healing and mutual trust'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#C9A84C] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-stone-700 italic leading-relaxed">
                    “{currentLanguage === 'pt' ? t.text : t.textEn}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2C2822] block">{t.clientInitials}</span>
                    <span className="text-[11px] text-stone-500">{t.clientAgeLocation}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#2A6496] bg-[#E8F1F8] border border-[#B0D0EB]/60 px-2 py-0.5 rounded">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
              <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
              {currentLanguage === 'pt' ? 'Esclarecimentos' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-serif-display text-3xl font-medium text-[#2C2822] mt-4">
              {currentLanguage === 'pt' ? 'Perguntas Frequentes' : 'Common Questions'}
            </h2>
            <p className="text-sm text-[#6B6560] mt-2 font-normal">
              {currentLanguage === 'pt'
                ? 'Tudo o que precisa de saber sobre o processo terapêutico, pagamentos e comparticipações.'
                : 'Everything you need to know about the therapy journey, payments, and insurance coverage.'}
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const question = currentLanguage === 'pt' ? faq.q : faq.qEn;
              const answer = currentLanguage === 'pt' ? faq.a : faq.aEn;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#2C2822] hover:text-[#2A6496] transition cursor-pointer"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#2A6496]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 font-normal">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt banner to book */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#1C2C39] border border-[#2A6496]/40 text-white text-center space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-[#2A6496] flex items-center justify-center mx-auto text-[#F5EED8] shadow-xs">
              <MutuaMenteSymbol className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-white">
              {currentLanguage === 'pt' ? 'Ainda tem dúvidas sobre o seu caso?' : 'Still have questions?'}
            </h3>
            <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
              {currentLanguage === 'pt'
                ? 'A Dra. Sofia Godinho Cabrita está inteiramente disponível para esclarecer as suas dúvidas e acolher o seu pedido de acompanhamento.'
                : 'Dr. Sofia Godinho Cabrita is readily available to answer your questions and welcome your therapy request.'}
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-[#C9A84C] hover:bg-[#B3933C] text-[#1C2C39] text-xs font-bold shadow transition cursor-pointer"
            >
              {currentLanguage === 'pt' ? 'Agendar Primeira Sessão de Acolhimento' : 'Book First Welcoming Session'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
