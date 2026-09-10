import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  LayoutDashboard,
  Instagram,
  Linkedin,
  Lock
} from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';
import { useBooking } from '../context/BookingContext';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const Footer: React.FC = () => {
  const { currentLanguage, setIsBookingOpen, setIsDashboardOpen } = useBooking();

  return (
    <footer id="contactos" className="bg-[#1C1A17] text-stone-300 pt-16 pb-12 border-t border-[#38332B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Purpose (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white border-2 border-[#E8D5A0] text-[#2A6496] flex items-center justify-center shrink-0 shadow-xs">
                <MutuaMenteSymbol className="w-7 h-7 text-[#2A6496]" />
              </div>
              <div>
                <span className="font-serif-display text-2xl font-bold text-white tracking-tight">
                  Mutua<span className="text-[#C9A84C]">Mente</span>
                </span>
                <span className="text-[10px] text-[#E8D5A0] block uppercase tracking-wider font-semibold">
                  Psicologia Clínica & Psicoterapia
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Espaço clínico fundado pela Dra. Sofia Godinho Cabrita dedicado à intervenção psicológica humanista e baseada em evidência científica, presencialmente em Lisboa e online.
            </p>

            <div className="text-[11px] text-stone-500 space-y-1">
              <div>{CLINIC_INFO.legalName}</div>
              <div>NIF: {CLINIC_INFO.nif} • Cédula OPP n.º 15786</div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-[#2A6496] text-stone-400 hover:text-white flex items-center justify-center transition border border-stone-800"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={CLINIC_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-stone-900 hover:bg-[#2A6496] text-stone-400 hover:text-white flex items-center justify-center transition border border-stone-800"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services & Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-[#E8D5A0] uppercase tracking-wider text-[11px]">
              Especialidades Clínicas
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#servicos" className="hover:text-[#C9A84C] transition">Psicoterapia Individual (Adultos)</a></li>
              <li><a href="#servicos" className="hover:text-[#C9A84C] transition">Terapia de Casal e Familiar</a></li>
              <li><a href="#servicos" className="hover:text-[#C9A84C] transition">Consultas Online (Telepsicologia)</a></li>
              <li><a href="#servicos" className="hover:text-[#C9A84C] transition">Orientação Vocacional & Carreira</a></li>
              <li><a href="#servicos" className="hover:text-[#C9A84C] transition">Avaliação Psicológica e Cognitiva</a></li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setIsDashboardOpen(true)}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-[#C9A84C] transition text-[11px] font-semibold cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span>Área Clínica Reservada (Dra. Sofia)</span>
              </button>
            </div>
          </div>

          {/* Col 3: Contacts & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-3 text-xs">
            <h4 className="font-bold text-[#E8D5A0] uppercase tracking-wider text-[11px]">
              Consultório em Lisboa & Contactos
            </h4>

            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">{CLINIC_INFO.address.street}</div>
                  <div>{CLINIC_INFO.address.postalCode} {CLINIC_INFO.address.city}, Portugal</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{CLINIC_INFO.address.metro}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition">
                  {CLINIC_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a 
                  href={CLINIC_INFO.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition font-medium"
                >
                  {CLINIC_INFO.websiteFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition">
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>{CLINIC_INFO.openingHours}</span>
              </div>
            </div>

            {/* Emergency note */}
            <div className="p-3 rounded-xl bg-stone-900 border border-[#38332B] text-[11px] text-stone-400 leading-relaxed">
              <strong className="text-amber-300">Crises Urgentes:</strong> Contacte a Linha de Apoio Psicológico do SNS 24 (<span className="text-amber-200 font-bold">808 24 24 24</span>, gratuito 24h) ou em emergência ligue <span className="text-white font-bold">112</span>.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} MutuaMente Psicologia (mutuamente.pt). Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span>Privacidade & RGPD</span>
            <span>•</span>
            <span>Código Deontológico OPP</span>
            <span>•</span>
            <a
              href="https://www.livroreclamacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-300 transition"
            >
              Livro de Reclamações Eletrónico
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
