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
      icon: <MutuaMenteSymbol className="w-5 h-5 text-[#2A6496]" />,
      titlePt: 'Empatia & Reciprocidade',
      titleEn: 'Empathy & Reciprocity',
      descPt: 'O nome "MutuaMente" traduz o compromisso com uma relação colaborativa: não ditamos regras, construímos caminhos em conjunto.',
      descEn: '"MutuaMente" reflects our commitment to a collaborative relationship: we do not dictate rules, we build paths together.'
    },
    {
      icon: <Brain className="w-5 h-5 text-[#2A6496]" />,
      titlePt: 'Rigor Científico & OPP',
      titleEn: 'Scientific Rigor & OPP',
      descPt: 'A Dra. Sofia Godinho Cabrita é membro efetivo da Ordem dos Psicólogos Portugueses (Cédula n.º 15786), com recurso a intervenções clínicas de eficácia comprovada.',
      descEn: 'Dr. Sofia Godinho Cabrita is an accredited member of the OPP (License 15786), applying evidence-based clinical interventions.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#2A6496]" />,
      titlePt: 'Espaço Seguro & Sem Julgamentos',
      titleEn: 'Safe & Non-judgmental Space',
      descPt: 'Um ambiente de escuta acolhedor e sigiloso onde as suas dores, dúvidas e anseios são validados com o máximo respeito.',
      descEn: 'A welcoming, strictly confidential environment where your struggles and doubts are validated with deep respect.'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#9A7A2E]" />,
      titlePt: 'Impacto Prático no Dia a Dia',
      titleEn: 'Practical Day-to-Day Impact',
      descPt: 'Mais do que teorizar, focamo-nos em fornecer estratégias práticas e aplicáveis para gerir crises, sono, relações e carreira.',
      descEn: 'Beyond theory, we focus on concrete, usable strategies to handle daily stress, sleep, relationships, and career.'
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Philosophy */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-2 border-[#E8D5A0]/80 shadow-xl bg-stone-100">
                <img
                  src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=800&q=80"
                  alt="Espaço Clínico MutuaMente Lisboa"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Founder quote badge */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-[#E8D5A0]/80 shadow-md">
                <p className="font-serif-display text-sm sm:text-base italic text-[#2C2822] leading-relaxed">
                  {currentLanguage === 'pt'
                    ? '“A psicoterapia não é um ato de fraqueza, mas sim a mais nobre manifestação de coragem para nos conhecermos e vivermos em plenitude.”'
                    : '“Psychotherapy is not an admission of weakness, but the noblest demonstration of courage to truly know oneself.”'}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-[#E8D5A0]/40 pt-3">
                  <div>
                    <h4 className="text-xs font-bold text-[#2C2822]">Dra. Sofia Godinho Cabrita</h4>
                    <span className="text-[11px] text-[#6B6560]">Fundadora & Psicóloga Clínica (OPP 15786)</span>
                  </div>
                  <Award className="w-5 h-5 text-[#C9A84C] shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3 py-1 rounded-full">
              {currentLanguage === 'pt' ? 'O Conceito MutuaMente' : 'The MutuaMente Concept'}
            </span>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2822] leading-[1.2]">
              {currentLanguage === 'pt' ? (
                <>
                  Porque a mente floresce quando existe <span className="italic text-[#2A6496] font-normal">reciprocidade</span>.
                </>
              ) : (
                <>
                  Because the mind flourishes through <span className="italic text-[#2A6496] font-normal">reciprocal trust</span>.
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#6B6560] font-normal leading-relaxed">
              {currentLanguage === 'pt'
                ? 'Fundada pela psicóloga clínica Dra. Sofia Godinho Cabrita, a MutuaMente nasceu do desejo de desmistificar a saúde mental em Portugal. Oferecemos um modelo clínico contemporâneo, sem burocracias, com marcação simples e tecnologia segura ao serviço do acolhimento humano.'
                : 'Founded by clinical psychologist Dr. Sofia Godinho Cabrita, MutuaMente was born to normalize and elevate mental healthcare in Portugal. We combine scientific rigor with effortless digital booking and deep human connection.'}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8D5A0]/80 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-[#E8F1F8] flex items-center justify-center mb-3">
                    {p.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#2C2822] mb-1">
                    {currentLanguage === 'pt' ? p.titlePt : p.titleEn}
                  </h4>
                  <p className="text-xs text-[#6B6560] leading-relaxed">
                    {currentLanguage === 'pt' ? p.descPt : p.descEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white font-semibold text-sm shadow transition-colors cursor-pointer"
              >
                {currentLanguage === 'pt' ? 'Iniciar o Meu Processo Terapêutico' : 'Start My Therapy Journey'}
              </button>
              <div className="text-xs text-[#6B6560] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2A6496]" />
                <span>{currentLanguage === 'pt' ? 'Gabinete central em Lisboa & Consultas Online' : 'Lisbon Central Clinic & Online Sessions'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
