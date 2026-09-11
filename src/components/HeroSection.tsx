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
    setSelectedServiceForBooking,
    setSelectedModalityForBooking 
  } = useBooking();

  const [selectedService, setSelectedService] = useState<ServiceId>('psicologia-clinica');
  const [selectedModality, setSelectedModality] = useState<Modality>('presencial');

  const handleStartBooking = () => {
    setSelectedServiceForBooking(selectedService);
    setSelectedModalityForBooking(selectedModality);
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF3E7] border border-[#E5B468]/60 text-[#CD8E33] text-xs font-semibold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#CD8E33]" />
              <span>
                {currentLanguage === 'pt' 
                  ? 'Dra. Sofia Godinho Cabrita • Psicóloga Clínica OPP n.º 15786' 
                  : 'Dr. Sofia Godinho Cabrita • Clinical Psychologist OPP 15786'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#545454] leading-[1.18]">
              {currentLanguage === 'pt' ? (
                <>
                  Um espaço de psicologia que nasce da{' '}
                  <span className="text-[#CD8E33] font-normal">paixão pelas pessoas</span>.
                </>
              ) : (
                <>
                  A psychology space born from a{' '}
                  <span className="text-[#CD8E33] font-normal">passion for people</span>.
                </>
              )}
            </h1>

            {/* Subheading - User Vision Text */}
            <p className="text-base sm:text-lg text-[#545454] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentLanguage === 'pt'
                ? 'A nossa visão é aliar conhecimentos de diferentes áreas para tornar a intervenção psicológica e a saúde mental, simples, acessíveis a todos e prioritárias na nossa vida do dia a dia.'
                : 'Our vision is to combine knowledge from diverse fields to make psychological intervention and mental health simple, accessible to all, and a priority in everyday life.'}
            </p>

            <p className="text-sm sm:text-base text-[#545454]/85 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {currentLanguage === 'pt'
                ? 'No MutuaMente pretende-se criar um ambiente acolhedor, onde o respeito mútuo e a escuta clínica transformam o sofrimento em compreensão e novos caminhos.'
                : 'At MutuaMente, our goal is to create a welcoming environment where mutual respect and clinical empathy transform distress into understanding and new directions.'}
            </p>

            {/* Key Quality Pillars */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2 text-xs font-medium text-[#545454]">
                <CheckCircle2 className="w-4 h-4 text-[#CD8E33] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Recibo Verde (IRS 15% Saúde)' : 'Tax Deductible Receipts'}</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-medium text-[#545454]">
                <CheckCircle2 className="w-4 h-4 text-[#CD8E33] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Modelo Psicanalítico' : 'Psychoanalytic Approach'}</span>
              </div>
              <div className="flex items-start gap-2 text-xs font-medium text-[#545454]">
                <CheckCircle2 className="w-4 h-4 text-[#CD8E33] shrink-0 mt-0.5" />
                <span>{currentLanguage === 'pt' ? 'Presencial & Online' : 'In-Person & Online'}</span>
              </div>
            </div>

            {/* Quick Interactive Booking Box */}
            <div className="pt-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5B468]/60 shadow-lg shadow-stone-200/50 max-w-xl mx-auto lg:mx-0">
                <div className="text-xs font-bold uppercase tracking-wider text-[#545454] mb-3 flex items-center justify-between">
                  <span>{currentLanguage === 'pt' ? 'Agendamento Direto e Rápido' : 'Fast Direct Booking'}</span>
                  <span className="text-[#CD8E33] font-semibold lowercase">
                    {currentLanguage === 'pt' ? 'vagas esta semana' : 'slots this week'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  {/* Service selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#545454] mb-1">
                      {currentLanguage === 'pt' ? 'Especialidade Clínica' : 'Specialty'}
                    </label>
                    <select
                      id="hero-service-select"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value as ServiceId)}
                      className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-lg border border-[#E5B468]/80 bg-[#FDFBF7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#CD8E33] text-[#545454] font-medium"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {currentLanguage === 'pt' ? s.title : s.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Modality Selector */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#545454] mb-1">
                      {currentLanguage === 'pt' ? 'Modalidade da Sessão' : 'Session Modality'}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF3E7] rounded-lg border border-[#E5B468]/60">
                      <button
                        type="button"
                        onClick={() => setSelectedModality('presencial')}
                        className={`text-xs py-1.5 px-2 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-1 ${
                          selectedModality === 'presencial'
                            ? 'bg-white text-[#545454] shadow-xs font-semibold'
                            : 'text-[#545454]/70 hover:text-[#545454]'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-[#CD8E33]" />
                        <span>Presencial</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedModality('online')}
                        className={`text-xs py-1.5 px-2 rounded-md font-medium transition cursor-pointer flex items-center justify-center gap-1 ${
                          selectedModality === 'online'
                            ? 'bg-white text-[#545454] shadow-xs font-semibold'
                            : 'text-[#545454]/70 hover:text-[#545454]'
                        }`}
                      >
                        <Video className="w-3 h-3 text-[#CD8E33]" />
                        <span>Videoconsulta</span>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  id="hero-book-now-button"
                  onClick={handleStartBooking}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white font-semibold text-sm transition-colors shadow-md cursor-pointer group"
                >
                  <Calendar className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>
                    {currentLanguage === 'pt' 
                      ? 'Ver Horários Disponíveis & Agendar' 
                      : 'Check Available Times & Book'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-90 group-hover:translate-x-1 transition-transform" />
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
                  src={`${import.meta.env.BASE_URL}photo.png`}
                  alt="Dra. Sofia Godinho Cabrita - Psicóloga Clínica MutuaMente"
                  className="w-full h-[420px] object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://usr-cdn.zaask.pt/users/067bf29c16c79c3f951f72f764e2bbdbdfbfab97';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/20 to-transparent" />
                
                {/* Official Logo Symbol Badge in top-right */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-full border border-[#E5B468]/80 shadow-md flex items-center justify-center" title="MutuaMente">
                  <MutuaMenteSymbol className="w-6 h-6 text-[#CD8E33]" color="#CD8E33" />
                </div>

                {/* Overlay Text on image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-[10px] tracking-wider uppercase font-bold text-[#FAF3E7] bg-[#545454]/90 border border-[#CD8E33]/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                    Direção Clínica
                  </span>
                  <h3 className="font-serif-display text-xl font-bold mt-1.5 text-white">Dra. Sofia Godinho Cabrita</h3>
                  <p className="text-xs text-[#FAF3E7] mt-0.5 font-light">
                    Psicóloga Clínica • OPP n.º 15786 • Fundadora da MutuaMente
                  </p>
                </div>
              </div>

              {/* Floating Pill 1: Verified Google Reviews Rating */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#E5B468]/70 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E7] text-[#CD8E33] flex items-center justify-center font-bold text-sm">
                  <Star className="w-5 h-5 fill-[#CD8E33] text-[#CD8E33]" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-[#545454]">4.9 / 5.0</span>
                    <div className="flex text-[#CD8E33]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#545454]/80 font-medium">
                    {currentLanguage === 'pt' ? 'Avaliação de Pacientes' : 'Client Satisfaction'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
