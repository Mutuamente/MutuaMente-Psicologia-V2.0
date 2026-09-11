import React from 'react';
import { 
  ShieldCheck, 
  Brain, 
  Sparkles, 
  Award, 
  Compass, 
  Users, 
  CheckCircle2 
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CLINIC_INFO } from '../data/mockData';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const AboutSection: React.FC = () => {
  const { currentLanguage, setIsBookingOpen } = useBooking();

  const pillars = [
    {
      icon: <MutuaMenteSymbol className="w-5 h-5 text-[#CD8E33]" color="#CD8E33" />,
      titlePt: 'Ambiente Acolhedor & Seguro',
      titleEn: 'Safe & Welcoming Environment',
      descPt: 'Um espaço onde cada pessoa se sente segura, ouvida e compreendida sem qualquer tipo de julgamento.',
      descEn: 'A space where every person feels safe, heard, and understood without judgment.'
    },
    {
      icon: <Brain className="w-5 h-5 text-[#CD8E33]" />,
      titlePt: 'Interdisciplinaridade & Rigor',
      titleEn: 'Interdisciplinary Scientific Rigor',
      descPt: 'Aliamos conhecimentos de diferentes áreas para tornar a intervenção psicológica e a saúde mental simples e acessíveis a todos.',
      descEn: 'Combining knowledge from different fields to make psychological care accessible and intuitive.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#CD8E33]" />,
      titlePt: 'Respeito Mútuo & Sigilo',
      titleEn: 'Mutual Respect & Confidentiality',
      descPt: 'A psicoterapia é uma colaboração recíproca regida pelo rigor deontológico da Ordem dos Psicólogos Portugueses.',
      descEn: 'Therapy as a collaborative relationship anchored in strict ethical and clinical standards.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#CD8E33]" />,
      titlePt: 'Transformação & Resiliência',
      titleEn: 'Transformation & Resilience',
      descPt: 'A saúde mental é um pilar essencial para uma vida plena e com significado, promovendo o autoconhecimento e a resiliência.',
      descEn: 'Mental health as a core pillar for a meaningful life, nurturing self-discovery and personal growth.'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Philosophy */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#E5B468]/60 shadow-xl bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80"
                  alt="Espaço Clínico MutuaMente Lisboa"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Freud / Founder quote badge */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-[#E5B468]/50 shadow-md">
                <p className="font-serif-display text-sm sm:text-base italic text-[#545454] leading-relaxed">
                  {currentLanguage === 'pt'
                    ? '“O pensamento é o ensaio da ação.”'
                    : '“Thought is action in rehearsal.”'}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[#E5B468]/30 pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#545454]">Sigmund Freud</h4>
                    <span className="text-[11px] text-[#545454]/70">Pilar da Abordagem Psicanalítica</span>
                  </div>
                  <Award className="w-5 h-5 text-[#CD8E33] shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3 py-1 rounded-full">
              {currentLanguage === 'pt' ? 'A Nossa Visão' : 'Our Vision'}
            </span>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#545454] leading-[1.2]">
              {currentLanguage === 'pt' ? (
                <>
                  Tornar a intervenção psicológica <br className="hidden sm:inline" />
                  <span className="text-[#CD8E33] font-normal">simples, acessível e prioritária</span>.
                </>
              ) : (
                <>
                  Making psychological care <br className="hidden sm:inline" />
                  <span className="text-[#CD8E33] font-normal">simple, accessible, and a priority</span>.
                </>
              )}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#545454] font-normal leading-relaxed">
              <p>
                {currentLanguage === 'pt'
                  ? 'O MutuaMente é um espaço de psicologia que nasce da paixão pelas pessoas. A nossa visão é aliar conhecimentos de diferentes áreas para tornar a intervenção psicológica e a saúde mental, simples, acessíveis a todos e prioritárias na nossa vida do dia a dia.'
                  : 'MutuaMente is a psychology space born from a passion for people. Our vision is to combine knowledge from different fields to make psychological intervention and mental health simple, accessible to all, and a priority in everyday life.'}
              </p>
              <p className="text-sm sm:text-base text-[#545454]/85">
                {currentLanguage === 'pt'
                  ? 'No MutuaMente pretende-se criar um espaço com um ambiente acolhedor, onde cada pessoa se sinta segura, ouvida e compreendida sem qualquer julgamento. Acreditamos que a saúde mental é um pilar essencial para uma vida plena e com significado, e por isso dedicamo-nos a promover o autoconhecimento, a resiliência e a transformação pessoal.'
                  : 'At MutuaMente, our aim is to foster a welcoming space where each individual feels safe, heard, and understood without judgment. We believe mental health is a vital pillar for a fulfilling life, dedicated to nurturing self-knowledge, resilience, and personal growth.'}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#E5B468]/40 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF3E7] flex items-center justify-center mb-3">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#545454] mb-1">
                    {currentLanguage === 'pt' ? p.titlePt : p.titleEn}
                  </h4>
                  <p className="text-xs text-[#545454]/80 leading-relaxed">
                    {currentLanguage === 'pt' ? p.descPt : p.descEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white font-semibold text-sm shadow transition-colors cursor-pointer"
              >
                {currentLanguage === 'pt' ? 'Iniciar o Meu Processo Terapêutico' : 'Start My Therapy Journey'}
              </button>
              <div className="text-xs text-[#545454] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#CD8E33]" />
                <span>{currentLanguage === 'pt' ? 'Gabinete central em Lisboa & Consultas Online' : 'Lisbon Central Clinic & Online Sessions'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
