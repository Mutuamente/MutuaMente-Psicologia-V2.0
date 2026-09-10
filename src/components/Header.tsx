import React, { useState } from 'react';
import { 
  Calendar, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Menu, 
  X, 
  LayoutDashboard, 
  Globe, 
  Sparkles,
  Clock,
  Lock
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CLINIC_INFO } from '../data/mockData';
import { MutuaMenteLogo, MutuaMenteSymbol } from './MutuaMenteLogo';

export const Header: React.FC = () => {
  const { 
    currentLanguage, 
    setLanguage, 
    setIsBookingOpen, 
    setIsDashboardOpen,
    bookings,
    isClinicalAuthenticated
  } = useBooking();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pendingBookingsCount = bookings.filter(b => b.status === 'pendente_pagamento' || b.status === 'confirmada').length;

  const navLinks = [
    { href: '#servicos', label: currentLanguage === 'pt' ? 'Especialidades' : 'Services' },
    { href: '#sobre', label: currentLanguage === 'pt' ? 'A MutuaMente' : 'About Us' },
    { href: '#equipa', label: currentLanguage === 'pt' ? 'Dra. Sofia Cabrita' : 'Dr. Sofia Cabrita' },
    { href: '#metodologia', label: currentLanguage === 'pt' ? 'Como Funciona' : 'How It Works' },
    { href: '#artigos', label: currentLanguage === 'pt' ? 'Artigos & Dicas' : 'Articles' },
    { href: '#contactos', label: currentLanguage === 'pt' ? 'Contactos' : 'Contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Top Clinical & Emergency Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-stone-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Cédula OPP n.º 15786</span>
            </span>
            <span className="hidden md:inline-block text-stone-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Lisboa (Av. Duque de Ávila) & Consultas Online</span>
            </span>
            <span className="hidden lg:inline-block text-stone-600">•</span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-stone-300">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{CLINIC_INFO.openingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={`tel:${CLINIC_INFO.phone}`} 
              className="inline-flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C9A84C]" />
              <span>{CLINIC_INFO.phoneFormatted}</span>
            </a>
            <span className="text-stone-700">|</span>
            <span className="text-[11px] text-amber-300/90 font-light hidden sm:inline">
              Apoio Urgente SNS 24: <strong className="font-semibold text-amber-200">808 24 24 24</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none"
            id="brand-logo-link"
          >
            <div className="w-11 h-11 rounded-full bg-white border-2 border-[#E8D5A0] text-[#2A6496] flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-[#C9A84C] transition-all duration-200">
              <MutuaMenteSymbol className="w-7 h-7 text-[#2A6496]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-2xl font-bold tracking-tight text-[#2C2822]">
                  Mutua<span className="text-[#C9A84C]">Mente</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-[#F5EED8] text-[#9A7A2E] border border-[#E8D5A0] hidden sm:inline-block">
                  Psicologia
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#6B6560] tracking-wide">
                {currentLanguage === 'pt' ? 'Psicoterapia Clínica • Lisboa & Online' : 'Clinical Psychotherapy • Lisbon & Online'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-[#6B6560] hover:text-[#9A7A2E] transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Language, Dashboard button, Book CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <button
              id="lang-toggle-btn"
              onClick={() => setLanguage(currentLanguage === 'pt' ? 'en' : 'pt')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E8D5A0]/80 text-[#6B6560] hover:text-[#2C2822] hover:bg-[#F5EED8]/40 text-xs font-semibold transition cursor-pointer"
              title="Mudar idioma / Switch language"
            >
              <Globe className="w-3.5 h-3.5 text-[#9A7A2E]" />
              <span>{currentLanguage.toUpperCase()}</span>
            </button>

            {/* Dashboard Quick Access (Password Protected) */}
            <button
              id="dashboard-open-btn"
              onClick={() => setIsDashboardOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F5EED8]/40 text-[#2C2822] text-xs font-semibold transition cursor-pointer border border-[#E8D5A0]"
              title={isClinicalAuthenticated ? "Painel Clínico Desbloqueado" : "Área Clínica Protegida por Palavra-passe"}
            >
              {isClinicalAuthenticated ? (
                <ShieldCheck className="w-3.5 h-3.5 text-[#2A6496]" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-[#9A7A2E]" />
              )}
              <span>{currentLanguage === 'pt' ? 'Área Clínica' : 'Clinical Area'}</span>
              {pendingBookingsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C9A84C] text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingBookingsCount}
                </span>
              )}
            </button>

            {/* Main Booking CTA */}
            <button
              id="header-booking-cta"
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-sm font-semibold shadow-xs hover:shadow transition-all cursor-pointer transform active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#E8D5A0]" />
              <span>{currentLanguage === 'pt' ? 'Marcar Consulta' : 'Book Appointment'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDashboardOpen(true)}
              className="p-2 rounded-lg bg-stone-100 text-stone-700 border border-stone-200"
              title="Área Clínica Reservada"
            >
              <Lock className="w-4 h-4 text-stone-600" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-4 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-lg text-base font-medium text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-200 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Idioma:</span>
              <button
                onClick={() => setLanguage(currentLanguage === 'pt' ? 'en' : 'pt')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLanguage === 'pt' ? 'Português (PT)' : 'English (EN)'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDashboardOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 text-stone-800 font-semibold text-sm border border-stone-200"
            >
              <Lock className="w-4 h-4 text-stone-600" />
              <span>Área Clínica Reservada (Dra. Sofia)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookingOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white font-semibold text-base shadow"
            >
              <Calendar className="w-5 h-5 text-[#E8D5A0]" />
              <span>Marcar Consulta Online ou Presencial</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
