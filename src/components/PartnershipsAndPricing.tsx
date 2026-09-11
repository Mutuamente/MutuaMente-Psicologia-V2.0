import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Tag, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  Handshake,
  ExternalLink,
  MessageCircle,
  Percent
} from 'lucide-react';
import { PARTNERSHIPS_INFO, CLINIC_INFO } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const PartnershipsAndPricing: React.FC = () => {
  const { currentLanguage, setIsBookingOpen } = useBooking();
  const [showPricingDetails, setShowPricingDetails] = useState(false);

  return (
    <section id="acordos-precos" className="py-16 sm:py-20 bg-white border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3.5 py-1 rounded-full shadow-xs">
            <Handshake className="w-3.5 h-3.5 text-[#CD8E33]" />
            {currentLanguage === 'pt' ? 'Acordos, Parcerias & Transparência' : 'Partnerships & Transparency'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#545454] mt-4">
            {currentLanguage === 'pt' 
              ? 'Acordos, Comparticipações e Honorários' 
              : 'Insurance, Partnerships & Fees'}
          </h2>
          <p className="text-[#545454] text-base sm:text-lg mt-4 font-normal">
            {currentLanguage === 'pt'
              ? 'Acesso simplificado a cuidados de saúde mental, com clareza nos custos, protocolos institucionais e elegibilidade para comparticipação.'
              : 'Simplified mental healthcare access with transparent fees, institutional protocols, and insurance reimbursement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Allianz Comparticipação */}
          <div className="bg-[#FDFBF7] rounded-3xl p-7 sm:p-8 border border-[#E5B468]/50 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF3E7] text-[#CD8E33] border border-[#E5B468]/60">
                  Seguro de Saúde
                </span>
                <ShieldCheck className="w-6 h-6 text-[#CD8E33]" />
              </div>

              <h3 className="font-serif-display text-2xl font-semibold text-[#545454]">
                {PARTNERSHIPS_INFO.allianz.name}
              </h3>

              <div className="inline-block bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-semibold text-[#545454]">
                {PARTNERSHIPS_INFO.allianz.status}
              </div>

              <p className="text-sm text-[#545454] leading-relaxed">
                {PARTNERSHIPS_INFO.allianz.desc}
              </p>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E5B468]/30 space-y-1.5 text-xs text-[#545454]">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#CD8E33] shrink-0" />
                  <span>Emissão de fatura-recibo com Cédula OPP 15786</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#CD8E33] shrink-0" />
                  <span>Submissão simplificada no portal Allianz</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200/60">
              <a
                href={CLINIC_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#CD8E33] text-[#CD8E33] hover:bg-[#FAF3E7] font-semibold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Esclarecer Reembolso Allianz</span>
              </a>
            </div>
          </div>

          {/* Card 2: Parcerias e Protocolos (10% Desconto) */}
          <div className="bg-[#FAF3E7] rounded-3xl p-7 sm:p-8 border-2 border-[#CD8E33] shadow-md flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#CD8E33] text-white">
                  Protocolo Especial
                </span>
                <Percent className="w-6 h-6 text-[#CD8E33]" />
              </div>

              <h3 className="font-serif-display text-2xl font-semibold text-[#545454]">
                {PARTNERSHIPS_INFO.protocols.title}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif-display font-bold text-[#CD8E33]">
                  10% Desconto
                </span>
                <span className="text-xs text-[#545454] font-medium">
                  em Psicologia Clínica
                </span>
              </div>

              <p className="text-sm text-[#545454] leading-relaxed">
                {PARTNERSHIPS_INFO.protocols.desc}
              </p>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E5B468]/50 space-y-1.5 text-xs text-[#545454]">
                <p className="font-medium text-stone-700">
                  Tem uma empresa, associação ou sindicato e gostaria de estabelecer um protocolo de apoio psicológico aos seus colaboradores?
                </p>
                <p className="text-[11px] text-[#CD8E33] font-semibold pt-1">
                  (Acordos em fase contínua de adesão e expansão)
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E5B468]/60">
              <a
                href={`mailto:${CLINIC_INFO.email}?subject=Proposta%20de%20Protocolo%20/%20Parceria%20MutuaMente`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white font-semibold text-xs shadow-xs transition-colors"
              >
                <span>Propor Protocolo Institucional</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Honorários e Transparência Fiscal */}
          <div className="bg-[#FDFBF7] rounded-3xl p-7 sm:p-8 border border-[#E5B468]/50 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF3E7] text-[#CD8E33] border border-[#E5B468]/60">
                  Benefícios Fiscais
                </span>
                <FileText className="w-6 h-6 text-[#CD8E33]" />
              </div>

              <h3 className="font-serif-display text-2xl font-semibold text-[#545454]">
                Honorários & IRS
              </h3>

              <p className="text-sm text-[#545454] leading-relaxed">
                {PARTNERSHIPS_INFO.pricingNote}
              </p>

              <p className="text-xs text-[#545454] leading-relaxed">
                {PARTNERSHIPS_INFO.reimbursementGuide}
              </p>

              <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1 text-xs text-[#545454]">
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="font-medium">Dedução no IRS:</span>
                  <span className="font-bold text-[#CD8E33]">15% em Saúde</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-100">
                  <span className="font-medium">Regime de IVA:</span>
                  <span className="font-bold text-[#CD8E33]">Isento (Art. 9.º)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium">Outros Seguros:</span>
                  <span className="font-bold text-stone-700">Médis, Multicare, ADSE</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200/60">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#545454] hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Consultar Vagas e Agendar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
