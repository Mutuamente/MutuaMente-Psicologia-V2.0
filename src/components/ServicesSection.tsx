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
    setSelectedServiceForBooking,
    setSelectedModalityForBooking 
  } = useBooking();

  const [activeCategory, setActiveCategory] = useState<'todos' | 'adultos' | 'avaliacao'>('todos');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'UserCheck':
        return <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      case 'HeartHandshake':
        return <Users2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      case 'Video':
        return <Video className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      case 'Compass':
        return <Compass className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
      default:
        return <UserCheck className="w-7 h-7 sm:w-8 sm:h-8 text-[#CD8E33]" strokeWidth={2.2} />;
    }
  };

  const handleBookService = (serviceId: ServiceId) => {
    if (serviceId === 'apoio-online') {
      setSelectedServiceForBooking('psicologia-clinica');
      setSelectedModalityForBooking('online');
    } else {
      setSelectedServiceForBooking(serviceId);
      setSelectedModalityForBooking('presencial');
    }
    setIsBookingOpen(true);
  };

  return (
    <section id="servicos" className="py-20 bg-[#FDFBF7] border-y border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#CD8E33] bg-[#FAF3E7] border border-[#E5B468]/60 px-3.5 py-1 rounded-full shadow-xs">
            <MutuaMenteSymbol className="w-3.5 h-3.5" color="#CD8E33" />
            {currentLanguage === 'pt' ? 'Áreas de Intervenção Clínica & Organizacional' : 'Clinical & Organizational Services'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#545454] mt-4">
            {currentLanguage === 'pt' 
              ? 'Serviços Especializados de Psicologia' 
              : 'Specialized Psychology Services'}
          </h2>
          <p className="text-[#545454] text-base sm:text-lg mt-4 font-normal">
            {currentLanguage === 'pt'
              ? 'Intervenções baseadas em evidência clínica e metodologias reconhecidas, adaptadas às necessidades individuais e institucionais.'
              : 'Evidence-based clinical interventions and certified methodologies, tailored to individual and organizational needs.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => {
            const title = currentLanguage === 'pt' ? service.title : service.titleEn;
            const desc = currentLanguage === 'pt' ? service.shortDesc : service.shortDescEn;
            const suitableList = currentLanguage === 'pt' ? service.suitableFor : service.suitableForEn;
            const specializationsList = service.specializations;

            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-[#CD8E33]/60"
              >
                <div className="p-6 sm:p-8">
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF3E7] border border-[#E5B468]/50 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-xs">
                      {getServiceIcon(service.iconName)}
                    </div>

                    {service.badge && (
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#FAF3E7] text-[#CD8E33] border border-[#E5B468]/60">
                        {currentLanguage === 'pt' ? service.badge : service.badgeEn}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-serif-display text-2xl font-semibold text-[#545454] group-hover:text-[#CD8E33] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[#545454]/85 mt-2.5 leading-relaxed font-normal">
                    {desc}
                  </p>

                  {/* Specializations (e.g. Concursos, Condutores, Recursos Humanos) */}
                  {specializationsList && specializationsList.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[#E5B468]/20">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#CD8E33] block mb-2">
                        {currentLanguage === 'pt' ? 'Com destaque para:' : 'Key focus areas:'}
                      </span>
                      <div className="space-y-1.5">
                        {specializationsList.map((spec, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 p-2 rounded-xl bg-[#FAF3E7]/60 text-xs font-medium text-[#545454] border border-[#E5B468]/30"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CD8E33] shrink-0 mt-1.5" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Indicators / Suitable For */}
                  <div className="mt-5 pt-4 border-t border-stone-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#545454]/70 block mb-2.5">
                      {currentLanguage === 'pt' ? 'Âmbitos de intervenção:' : 'Areas covered:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#545454]">
                      {suitableList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#CD8E33] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Bar: Modality, Duration & Book CTA */}
                <div className="p-6 sm:p-8 pt-4 bg-[#FDFBF7] border-t border-[#E5B468]/40 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#545454] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#CD8E33]" />
                      <span>{service.durationMinutes} minutos</span>
                    </div>
                    <span className="text-[11px] text-[#545454]/70 block mt-0.5">
                      Presencial ou Online
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookService(service.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>{currentLanguage === 'pt' ? 'Marcar Consulta' : 'Book Session'}</span>
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
