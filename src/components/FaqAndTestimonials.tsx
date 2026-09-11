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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3.5 py-1 rounded-full shadow-xs">
              <MutuaMenteSymbol className="w-3.5 h-3.5" color="#CD8E33" />
              {currentLanguage === 'pt' ? 'Experiências Reais' : 'Client Testimonials'}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-normal text-[#545454] mt-4">
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
                  <div className="flex items-center gap-1 text-[#CD8E33] mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-sm text-[#545454] italic leading-relaxed font-normal">
                    “{currentLanguage === 'pt' ? t.text : t.textEn}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#545454] block">{t.clientInitials}</span>
                    <span className="text-[11px] text-stone-500">{t.clientAgeLocation}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-2 py-0.5 rounded">
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3.5 py-1 rounded-full shadow-xs">
              <MutuaMenteSymbol className="w-3.5 h-3.5" color="#CD8E33" />
              {currentLanguage === 'pt' ? 'Esclarecimentos' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-serif-display text-3xl font-normal text-[#545454] mt-4">
              {currentLanguage === 'pt' ? 'Perguntas Frequentes' : 'Common Questions'}
            </h2>
            <p className="text-sm text-[#545454] mt-2 font-normal">
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
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm text-[#545454] hover:text-[#CD8E33] transition cursor-pointer"
                  >
                    <span>{question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#CD8E33]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#545454] leading-relaxed border-t border-stone-100 font-normal">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Prompt banner to book */}
          <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#545454] border border-[#CD8E33]/40 text-white text-center space-y-3 shadow-lg">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF3E7] flex items-center justify-center mx-auto shadow-xs">
              <MutuaMenteSymbol className="w-5 h-5 text-[#CD8E33]" color="#CD8E33" />
            </div>
            <h3 className="font-serif-display text-xl font-normal text-white">
              {currentLanguage === 'pt' ? 'Ainda tem dúvidas sobre o seu caso?' : 'Still have questions?'}
            </h3>
            <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed font-normal">
              {currentLanguage === 'pt'
                ? 'A Dra. Sofia Godinho Cabrita está inteiramente disponível para acolher o seu pedido e encontrar a resposta mais adequada ao seu momento de vida.'
                : 'Dr. Sofia Godinho Cabrita is readily available to welcome your request and find the most suitable response for your life moment.'}
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white text-xs font-semibold shadow transition cursor-pointer"
            >
              {currentLanguage === 'pt' ? 'Marcar Consulta' : 'Book Session'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
