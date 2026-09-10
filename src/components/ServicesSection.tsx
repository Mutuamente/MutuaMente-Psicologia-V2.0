import React, { useState } from 'react';
import { 
  UserCheck, 
  Sparkles, 
  Users2, 
  Video, 
  Compass, 
  BrainCircuit, 
  Clock, 
  ArrowRight, 
  Check, 
  ShieldAlert
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { useBooking } from '../context/BookingContext';
import { SERVICES } from '../data/mockData';
import { Service, ServiceId } from '../types';

export const ServicesSection: React.FC = () => {
  const { 
    currentLanguage, 
    setIsBookingOpen, 
    setSelectedServiceForBooking 
  } = useBooking();

  const [activeCategory, setActiveCategory] = useState<'todos' | 'adultos' | 'avaliacao'>('todos');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-[#2A6496]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#C9A84C]" />;
      case 'HeartHandshake':
        return <Users2 className="w-6 h-6 text-[#2A6496]" />;
      case 'Video':
        return <Video className="w-6 h-6 text-[#2A6496]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#C9A84C]" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-6 h-6 text-[#2A6496]" />;
      default:
        return <UserCheck className="w-6 h-6 text-[#2A6496]" />;
    }
  };

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === 'adultos') {
      return s.id === 'psicologia-adultos' || s.id === 'terapia-casal' || s.id === 'apoio-online';
    }
    if (activeCategory === 'avaliacao') {
      return s.id === 'orientacao-vocacional' || s.id === 'avaliacao-neuropsicologica';
    }
    return true;
  });

  const handleBookService = (serviceId: ServiceId) => {
    setSelectedServiceForBooking(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <section id="servicos" className="py-20 bg-stone-100/70 border-y border-stone-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
            <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
            {currentLanguage === 'pt' ? 'Áreas de Intervenção Clínica' : 'Clinical Specialties'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C2822] mt-4">
            {currentLanguage === 'pt' 
              ? 'Cuidados psicológicos com rigor científico e empatia' 
              : 'Scientific rigor and compassionate psychological care'}
          </h2>
          <p className="text-[#6B6560] text-base sm:text-lg mt-4 font-normal">
            {currentLanguage === 'pt'
              ? 'Acompanhamento clínico individualizado conduzido pela Dra. Sofia Godinho Cabrita para jovens, adultos e casais, presencialmente em Lisboa ou por videochamada.'
              : 'Individualized clinical support conducted by Dr. Sofia Godinho Cabrita for adolescents, adults, and couples, in Lisbon or via secure video.'}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveCategory('todos')}
              className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer ${
                activeCategory === 'todos'
                  ? 'bg-[#2A6496] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-[#E8F1F8]/50 border border-stone-200'
              }`}
            >
              {currentLanguage === 'pt' ? 'Todas as Áreas' : 'All Areas'}
            </button>
            <button
              onClick={() => setActiveCategory('adultos')}
              className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer ${
                activeCategory === 'adultos'
                  ? 'bg-[#2A6496] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-[#E8F1F8]/50 border border-stone-200'
              }`}
            >
              {currentLanguage === 'pt' ? 'Adultos & Casais' : 'Adults & Couples'}
            </button>
            <button
              onClick={() => setActiveCategory('avaliacao')}
              className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-xl transition cursor-pointer ${
                activeCategory === 'avaliacao'
                  ? 'bg-[#2A6496] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-[#E8F1F8]/50 border border-stone-200'
              }`}
            >
              {currentLanguage === 'pt' ? 'Avaliação & Vocacional' : 'Assessment & Career'}
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const title = currentLanguage === 'pt' ? service.title : service.titleEn;
            const desc = currentLanguage === 'pt' ? service.shortDesc : service.shortDescEn;
            const suitableList = currentLanguage === 'pt' ? service.suitableFor : service.suitableForEn;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-[#2A6496]/50"
              >
                <div className="p-6 sm:p-7">
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#E8F1F8] border border-[#B0D0EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.iconName)}
                    </div>

                    {service.badge && (
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#F5EED8] text-[#9A7A2E] border border-[#E8D5A0]">
                        {currentLanguage === 'pt' ? service.badge : service.badgeEn}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-serif-display text-xl font-bold text-[#2C2822] group-hover:text-[#2A6496] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[#6B6560] mt-2 leading-relaxed">
                    {desc}
                  </p>

                  {/* Indicators / Suitable For */}
                  <div className="mt-5 pt-5 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A7A2E] block mb-2.5">
                      {currentLanguage === 'pt' ? 'Indicado para:' : 'Recommended for:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {suitableList.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#2A6496] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar: Price, Duration & Book CTA */}
                <div className="p-6 sm:p-7 pt-4 bg-[#FDFBF7] border-t border-[#E8D5A0]/60 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#2C2822]">€{service.priceEur}</span>
                      <span className="text-xs text-stone-500 font-medium">/ sessão</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{service.durationMinutes} minutos</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookService(service.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer group-hover:bg-[#1A4A72]"
                  >
                    <span>{currentLanguage === 'pt' ? 'Agendar' : 'Book'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
