import React, { useState } from 'react';
import { 
  Calendar, 
  ShieldCheck, 
  Video, 
  MapPin, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Sparkles,
  Users,
  Award
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SERVICES, CLINIC_INFO } from '../data/mockData';
import { ServiceId, Modality } from '../types';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const HeroSection: React.FC = () => {
  const { 
    currentLanguage, 
    setIsBookingOpen, 
    setSelectedServiceForBooking 
  } = useBooking();

  const [selectedService, setSelectedService] = useState<ServiceId>('psicologia-adultos');
  const [selectedModality, setSelectedModality] = useState<Modality>('presencial');

  const handleStartBooking = () => {
    setSelectedServiceForBooking(selectedService);
    setIsBookingOpen(true);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-[#FDFBF7]">
      {/* Subtle organic background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F5EED8]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#E8F1F8]/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5EED8] border border-[#E8D5A0] text-[#9A7A2E] text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#2A6496]" />
              <span>
                {currentLanguage === 'pt' 
                  ? 'Dra. Sofia Godinho Cabrita • Psicóloga Clínica OPP n.º 15786' 
                  : 'Dr. Sofia Godinho Cabrita • Clinical Psychologist OPP 15786'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C2822] leading-[1.15]">
              {currentLanguage === 'pt' ? (
                <>
                  Um espaço de escuta, <br className="hidden sm:inline" />
                  <span className="italic text-[#2A6496] font-normal">respeito mútuo</span> e bem-estar psicológico.
                </>
              ) : (
                <>
                  A space of empathy, <br className="hidden sm:inline" />
                  <span className="italic text-[#2A6496] font-normal">mutual trust</span> and emotional well-being.
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-[#6B6560] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentLanguage === 'pt'
                ? 'Na MutuaMente, acreditamos que a psicoterapia é uma colaboração recíproca. Oferecemos consultas individuais, de casal, orientação vocacional e avaliação psicológica no nosso consultório em Lisboa ou através de videoconsultas encriptadas para qualquer parte do mundo.'
                : 'At MutuaMente, psychotherapy is a collaborative journey. We offer individual, couples, vocational guidance, and psychological assessments at our central Lisbon clinic or via secure online video consultations worldwide.'}
            </p>

            {/* Key Quality Pillars */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2 text-xs font-medium text-[#2C2822]">
                <CheckCircle2 className="w-4 h-4 text-[#2A6496] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Recibo Verde (IRS 15% Saúde)' : 'Tax Deductible Receipts'}</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-medium text-[#2C2822]">
                <CheckCircle2 className="w-4 h-4 text-[#2A6496] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Sigilo Profissional Estrito' : 'Strict Confidentiality'}</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-medium text-[#2C2822]">
                <CheckCircle2 className="w-4 h-4 text-[#2A6496] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Presencial & Online HD' : 'In-Person & Online'}</span>
              </div>
            </div>

            {/* Quick Interactive Booking Box */}
            <div className="pt-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8D5A0]/80 shadow-lg shadow-stone-200/50 max-w-xl mx-auto lg:mx-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#6B6560] mb-3 flex items-center justify-between">
                  <span>{currentLanguage === 'pt' ? 'Agendamento Direto e Rápido' : 'Fast Direct Booking'}</span>
                  <span className="text-[#9A7A2E] font-semibold lowercase">
                    {currentLanguage === 'pt' ? 'vagas esta semana' : 'slots this week'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {/* Service selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6560] mb-1">
                      {currentLanguage === 'pt' ? 'Especialidade Clínica' : 'Specialty'}
                    </label>
                    <select
                      id="hero-service-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value as ServiceId)}
                      className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-[#E8D5A0]/80 bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A6496] text-[#2C2822] font-medium"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {currentLanguage === 'pt' ? s.title : s.titleEn} (€{s.priceEur})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Modality Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#6B6560] mb-1">
                      {currentLanguage === 'pt' ? 'Modalidade da Sessão' : 'Session Modality'}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#F5F0E5]/60 rounded-lg border border-[#E8D5A0]/60">
                      <button
                        type="button"
                        onClick={() => setSelectedModality('presencial')}
                        className={`text-xs py-1.5 px-2 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-1 ${
                          selectedModality === 'presencial'
                            ? 'bg-white text-[#2C2822] shadow-xs font-semibold'
                            : 'text-[#6B6560] hover:text-[#2C2822]'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-[#2A6496]" />
                        <span>Presencial</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedModality('online')}
                        className={`text-xs py-1.5 px-2 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-1 ${
                          selectedModality === 'online'
                            ? 'bg-white text-[#2C2822] shadow-xs font-semibold'
                            : 'text-[#6B6560] hover:text-[#2C2822]'
                        }`}
                      >
                        <Video className="w-3 h-3 text-[#2A6496]" />
                        <span>Online Vídeo</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  id="hero-book-now-button"
                  onClick={handleStartBooking}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white font-semibold text-sm transition-colors shadow-md cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-[#E8D5A0] group-hover:scale-110 transition-transform" />
                  <span>
                    {currentLanguage === 'pt' 
                      ? 'Ver Horários Disponíveis & Confirmar' 
                      : 'Check Available Times & Book'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual & Trust Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100">
                <img
                  src="https://raw.githubusercontent.com/Mutuamente/mutuamente-website/main/photo.png"
                  alt="Dra. Sofia Godinho Cabrita - Psicóloga Clínica MutuaMente"
                  className="w-full h-[420px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent" />
                
                {/* Official Logo Symbol Badge in top-right */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-full border border-[#E8D5A0] shadow-md flex items-center justify-center" title="MutuaMente">
                  <MutuaMenteSymbol className="w-6 h-6 text-[#2A6496]" />
                </div>

                {/* Overlay Text on image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#F5EED8] bg-[#1A4A72]/90 border border-[#C9A84C]/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                    Direção Clínica
                  </span>
                  <h3 className="font-serif-display text-xl font-bold mt-1.5 text-white">Dra. Sofia Godinho Cabrita</h3>
                  <p className="text-xs text-[#F5EED8] mt-0.5">
                    Psicóloga Clínica • OPP n.º 15786 • Fundadora da MutuaMente
                  </p>
                </div>
              </div>

              {/* Floating Pill 1: Verified Google Reviews Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#E8D5A0]/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F5EED8] text-[#9A7A2E] flex items-center justify-center font-bold text-sm">
                  <Star className="w-5 h-5 fill-[#C9A84C] text-[#C9A84C]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#2C2822]">4.9 / 5.0</span>
                    <div className="flex text-[#C9A84C]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#6B6560] font-medium">
                    {currentLanguage === 'pt' ? 'Avaliação de Pacientes' : 'Client Satisfaction'}
                  </span>
                </div>
              </div>

              {/* Floating Pill 2: Payment Security & MB WAY Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#E8D5A0]/80 flex items-center gap-3 max-w-[260px]">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1F8] text-[#2A6496] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-[#2A6496]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#2C2822]">
                    {currentLanguage === 'pt' ? 'Pagamentos Seguros' : 'Secure Payments'}
                  </div>
                  <div className="text-[10px] text-[#6B6560] flex items-center gap-1.5 mt-0.5">
                    <span className="font-semibold text-[#2C2822]">MB WAY</span> • 
                    <span>Multibanco</span> • 
                    <span>Cartão</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
