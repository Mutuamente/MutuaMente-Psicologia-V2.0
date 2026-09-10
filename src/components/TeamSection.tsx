import React from 'react';
import { 
  Award, 
  Calendar, 
  Languages, 
  CheckCircle2, 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { useBooking } from '../context/BookingContext';
import { SPECIALISTS } from '../data/mockData';

export const TeamSection: React.FC = () => {
  const { 
    currentLanguage, 
    setIsBookingOpen, 
    setSelectedSpecialistForBooking 
  } = useBooking();

  const specialist = SPECIALISTS[0]; // Dra. Sofia Godinho Cabrita

  const handleBookWithDraSofia = () => {
    setSelectedSpecialistForBooking(specialist.id);
    setIsBookingOpen(true);
  };

  const role = currentLanguage === 'pt' ? specialist.role : specialist.roleEn;
  const bio = currentLanguage === 'pt' ? specialist.bio : specialist.bioEn;
  const specialtiesList = currentLanguage === 'pt' ? specialist.specialties : specialist.specialtiesEn;

  return (
    <section id="equipa" className="py-20 bg-stone-100/60 border-t border-stone-200/70 relative">
      <div id="sobre-dra-sofia" className="scroll-mt-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
            <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
            {currentLanguage === 'pt' ? 'Psicóloga Clínica Responsável' : 'Lead Clinical Psychologist'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2822] mt-4">
            {currentLanguage === 'pt' 
              ? 'Conheça a Dra. Sofia Godinho Cabrita' 
              : 'Meet Dr. Sofia Godinho Cabrita'}
          </h2>
          <p className="text-[#6B6560] text-base sm:text-lg mt-4 font-normal">
            {currentLanguage === 'pt'
              ? 'Acompanhamento clínico individualizado, rigor ético e uma escuta calorosa adaptada ao seu ritmo e história singular.'
              : 'Individualized clinical guidance, ethical rigor, and empathetic care tailored to your unique journey.'}
          </p>
        </div>

        {/* Dra. Sofia Featured Profile Presentation */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200/90 shadow-md hover:shadow-lg transition-all overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Col: Photo & Credentials (5 cols) */}
            <div className="md:col-span-5 bg-[#FDFBF7] p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-200/80 text-center">
              <div className="space-y-4 w-full flex flex-col items-center">
                {/* Official Photo */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                  <img
                    src={specialist.photoUrl}
                    alt={specialist.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-2 right-2 bg-[#2C2822]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                    <Award className="w-3 h-3 text-[#C9A84C]" />
                    <span>{specialist.oppNumber}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#2C2822]">
                    {specialist.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#2A6496] mt-0.5">
                    {role}
                  </p>
                  <span className="inline-block mt-1.5 text-[11px] font-medium text-stone-500 bg-white border border-stone-200 px-2.5 py-0.5 rounded-md">
                    Registo ERS • Membro Efectivo OPP
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="w-full pt-6 mt-6 border-t border-stone-200/80 space-y-2.5 text-left text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#2A6496] shrink-0" />
                  <span className="text-[11px]">Licenciatura & Mestrado no ISPA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="text-[11px]">+15 anos de experiência clínica</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#2A6496] shrink-0" />
                  <span className="text-[11px]">{specialist.languages.join(' • ')}</span>
                </div>
              </div>
            </div>

            {/* Right Col: Biography, Approach & Focus Areas (7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9A7A2E] mb-1">
                    {currentLanguage === 'pt' ? 'Percurso & Abordagem Terapêutica' : 'Background & Approach'}
                  </h4>
                  <p className="text-sm text-stone-700 leading-relaxed font-normal">
                    {bio}
                  </p>
                </div>

                {/* Specialties / Areas of Intervention */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C2822] block mb-2.5">
                    {currentLanguage === 'pt' ? 'Áreas de Intervenção Principal:' : 'Main Areas of Intervention:'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {specialtiesList.map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-[#E8F1F8] text-[#2A6496] border border-[#B0D0EB] px-2.5 py-1 rounded-lg"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Principles */}
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8D5A0]/80 space-y-2">
                  <div className="text-[11px] font-bold text-[#2C2822] uppercase tracking-wider">
                    {currentLanguage === 'pt' ? 'Garantias do Acompanhamento:' : 'Clinical Commitments:'}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6B6560]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496] shrink-0" />
                      <span>Sigilo profissional integral</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496] shrink-0" />
                      <span>Dedução IRS (Despesas de Saúde)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496] shrink-0" />
                      <span>Presencial em Lisboa ou Online</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496] shrink-0" />
                      <span>Recibo Verde com NIF (OPP 15786)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Action Button */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  id="dra-sofia-book-button"
                  onClick={handleBookWithDraSofia}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs sm:text-sm font-semibold transition cursor-pointer shadow-md group"
                >
                  <Calendar className="w-4 h-4 text-[#F5EED8] group-hover:scale-110 transition-transform" />
                  <span>
                    {currentLanguage === 'pt' 
                      ? 'Agendar Consulta com a Dra. Sofia Cabrita' 
                      : 'Book Consultation with Dr. Sofia Cabrita'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
