import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Eye,
  AlertCircle,
  Copy,
  Check,
  CalendarCheck,
  ExternalLink,
  Sun,
  Sunset,
  Info
} from 'lucide-react';
import { useBooking, generateEmailContent, generateGoogleCalendarUrl } from '../context/BookingContext';
import { SERVICES, SPECIALISTS, CLINIC_INFO } from '../data/mockData';
import { ServiceId, Modality, PaymentMethod, BookingFormData, Booking } from '../types';
import { PaymentGateway } from './PaymentGateway';
import { MutuaMenteSymbol } from './MutuaMenteLogo';

export const BookingModal: React.FC = () => {
  const { 
    bookings,
    isBookingOpen, 
    setIsBookingOpen, 
    selectedServiceForBooking, 
    selectedModalityForBooking,
    selectedSpecialistForBooking,
    createBooking,
    setSelectedEmailForPreview,
    emailNotifications,
    currentLanguage,
    isSlotOccupied,
    getOccupiedSlotsForDate,
    isClientDoubleBooked
  } = useBooking();

  // Streamlined Wizard Steps: 1: Especialidade & Terapeuta, 2: Horário & Vagas, 3: Seus Dados, 4: Pagamento, 5: Sucesso
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [serviceId, setServiceId] = useState<ServiceId>('psicologia-clinica');
  const [modality, setModality] = useState<Modality>('presencial');
  const [copiedMeet, setCopiedMeet] = useState(false);
  const [specialistId, setSpecialistId] = useState<string>('sofia-godinho-cabrita');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNif, setClientNif] = useState('');
  const [notes, setNotes] = useState('');
  const [isFirstSession, setIsFirstSession] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mbway');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available standard appointment time slots
  const morningSlots = ['09:00', '10:30', '12:00'];
  const afternoonSlots = ['14:30', '16:00', '17:30', '19:00'];
  const timeSlots = useMemo(() => [...morningSlots, ...afternoonSlots], []);

  // Current occupied slots for the selected specialist and date
  const occupiedSlots = useMemo(() => {
    return selectedDate ? getOccupiedSlotsForDate(specialistId, selectedDate) : [];
  }, [specialistId, selectedDate, getOccupiedSlotsForDate, bookings]);

  // Current specialist & service details
  const currentService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const currentSpecialist = SPECIALISTS.find((s) => s.id === specialistId) || SPECIALISTS[0];
  const effectivePrice = modality === 'online' ? Math.max(0, currentService.priceEur - 10) : currentService.priceEur;

  // Calculate session end time based on duration
  const getSlotEndTime = (startTime: string, durationMinutes: number = 50) => {
    const [h, m] = startTime.split(':').map(Number);
    const totalMins = h * 60 + m + durationMinutes;
    const endH = Math.floor(totalMins / 60) % 24;
    const endM = totalMins % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  // Generate the next 7 available clinic days with slot availability summary
  const upcomingDays = useMemo(() => {
    const days = [];
    const base = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(base.getDate() + i);
      // Skip Sundays (clinic is closed)
      if (d.getDay() === 0) continue;
      
      const dateStr = d.toISOString().split('T')[0];
      const occupied = getOccupiedSlotsForDate(specialistId, dateStr);
      const freeCount = Math.max(0, timeSlots.length - occupied.length);
      const dayName = d.toLocaleDateString('pt-PT', { weekday: 'short' });
      const dayNum = d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
      
      days.push({
        dateStr,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1).replace('.', ''),
        dayNum,
        freeCount,
        totalCount: timeSlots.length,
        isFullyBooked: freeCount === 0
      });
      if (days.length === 7) break;
    }
    return days;
  }, [specialistId, bookings, timeSlots, getOccupiedSlotsForDate]);

  // Sync props when modal opens
  useEffect(() => {
    if (isBookingOpen) {
      setFormError(null);
      setStep(1);
      const targetSpecialist = selectedSpecialistForBooking || 'sofia-godinho-cabrita';
      setSpecialistId(targetSpecialist);

      if (selectedServiceForBooking) {
        if (selectedServiceForBooking === 'apoio-online') {
          setServiceId('psicologia-clinica');
          setModality('online');
        } else {
          setServiceId(selectedServiceForBooking);
        }
      }
      if (selectedModalityForBooking) {
        setModality(selectedModalityForBooking);
      }

      // Pick tomorrow as default date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Skip Sunday if tomorrow is Sunday
      if (tomorrow.getDay() === 0) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }
      const initialDate = tomorrow.toISOString().split('T')[0];
      setSelectedDate(initialDate);

      // Select first available (non-occupied) slot for this date
      const occupied = getOccupiedSlotsForDate(targetSpecialist, initialDate);
      const firstFree = timeSlots.find((s) => !occupied.includes(s));
      setSelectedTime(firstFree || '');
    }
  }, [isBookingOpen, selectedServiceForBooking, selectedModalityForBooking, selectedSpecialistForBooking, timeSlots, getOccupiedSlotsForDate]);

  if (!isBookingOpen) return null;

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setFormError(null);
    const occupied = getOccupiedSlotsForDate(specialistId, newDate);
    if (occupied.includes(selectedTime) || !selectedTime) {
      const firstFree = timeSlots.find((s) => !occupied.includes(s));
      setSelectedTime(firstFree || '');
    }
  };

  const handleNextFromDateTime = () => {
    if (!selectedDate) {
      setFormError('Por favor selecione a data pretendida.');
      return;
    }
    if (!selectedTime) {
      setFormError('Não existem vagas disponíveis para esta data. Por favor escolha outro dia no calendário.');
      return;
    }
    if (isSlotOccupied(specialistId, selectedDate, selectedTime, currentService.durationMinutes)) {
      setFormError('O horário selecionado já se encontra reservado na agenda da clínica. Por favor selecione outra vaga.');
      return;
    }
    setFormError(null);
    setStep(3);
  };

  const handleNextFromClientInfo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setFormError('Por favor preencha os campos obrigatórios (Nome, Email e Telemóvel).');
      return;
    }
    if (!termsAccepted) {
      setFormError('Por favor assinale a caixa de consentimento informado e RGPD para avançar.');
      return;
    }
    // Check if slot is still available
    if (isSlotOccupied(specialistId, selectedDate, selectedTime, currentService.durationMinutes)) {
      setFormError(`O horário das ${selectedTime} no dia ${selectedDate} já se encontra reservado. Por favor selecione outro horário.`);
      setStep(2);
      return;
    }
    // Check if client is already double booked at this exact time
    if (isClientDoubleBooked(clientEmail, clientPhone, selectedDate, selectedTime)) {
      setFormError(`Já existe um agendamento registado para este utente no dia ${selectedDate} às ${selectedTime}.`);
      return;
    }

    setFormError(null);
    setStep(4);
  };

  const handlePaymentComplete = async (paymentDetails: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const formData: BookingFormData = {
        serviceId,
        modality,
        specialistId,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientEmail,
        clientPhone,
        clientNif,
        notes,
        isFirstSession,
        termsAccepted,
        paymentMethod,
        paymentDetails
      };

      const booking = await createBooking(formData);
      setConfirmedBooking(booking);
      setStep(5);
    } catch (err: any) {
      setFormError(err?.message || 'Este horário já não se encontra disponível. Por favor selecione outra data ou vaga.');
      setStep(2); // Return user to step 2 so they can pick a free slot
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadIcs = () => {
    if (!confirmedBooking) return;
    const title = `Consulta MutuaMente - ${currentService.title}`;
    const desc = `Consulta com ${currentSpecialist.name}. Ref: ${confirmedBooking.referenceCode}`;
    const loc = confirmedBooking.modality === 'online' ? (confirmedBooking.meetingUrl || 'Videoconsulta') : CLINIC_INFO.address.street;
    const startStr = `${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.time.replace(':', '')}00`;
    
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MutuaMente Psicologia//PT',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `DTSTART:${startStr}`,
      `DTEND:${startStr}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `agendamento-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreviewEmail = () => {
    if (confirmedBooking) {
      const email = emailNotifications.find(e => e.bookingId === confirmedBooking.id);
      if (email) {
        setSelectedEmailForPreview(email);
      } else {
        setSelectedEmailForPreview(generateEmailContent(confirmedBooking));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="bg-[#1A4A72] text-white px-6 py-4 flex items-center justify-between border-b border-[#C9A84C]/30">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white border border-[#E8D5A0] flex items-center justify-center shrink-0">
                <MutuaMenteSymbol className="w-4 h-4 text-[#2A6496]" />
              </div>
              <span className="font-serif-display text-lg font-bold">
                Mutua<span className="text-[#C9A84C]">Mente</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#2A6496] text-[#F5EED8] border border-[#C9A84C]/40">
                Agendamento
              </span>
            </div>
            <p className="text-xs text-[#E8D5A0]/80 mt-0.5">
              {step === 5 ? 'Consulta Confirmada com Sucesso' : `Passo ${step} de 4: Marcação de Consulta`}
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(false)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (Steps 1-4) */}
        {step <= 4 && (
          <div className="bg-[#FDFBF7] px-6 py-2.5 border-b border-[#E8D5A0]/60">
            <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500">
              <span className={step >= 1 ? 'text-[#2A6496] font-bold' : ''}>1. Especialidade & Terapeuta</span>
              <span>→</span>
              <span className={step >= 2 ? 'text-[#2A6496] font-bold' : ''}>2. Horários & Vagas</span>
              <span>→</span>
              <span className={step >= 3 ? 'text-[#2A6496] font-bold' : ''}>3. Seus Dados</span>
              <span>→</span>
              <span className={step >= 4 ? 'text-[#2A6496] font-bold' : ''}>4. Pagamento</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: SERVICE, MODALITY & CLINICIAN REASSURANCE */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#2C2822]">Selecione a Especialidade Clínica</h3>
                <p className="text-xs text-stone-500">Escolha o serviço mais adequado à sua necessidade atual.</p>
              </div>

              {/* 3 Core Services */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SERVICES.filter((s) => s.id !== 'apoio-online' && (s.id as string) !== 'psicologia-adultos').map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceId(s.id)}
                    className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      serviceId === s.id
                        ? 'border-[#CD8E33] bg-[#FAF3E7] ring-2 ring-[#CD8E33]/30'
                        : 'border-stone-200 hover:border-[#CD8E33]/40 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#2C2822]">{s.title}</span>
                        <span className="text-xs font-bold text-[#CD8E33]">€{s.priceEur}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6560] mt-1 line-clamp-2">{s.shortDesc}</p>
                    </div>
                    <div className="mt-2 text-[10px] text-stone-400 font-medium">
                      {s.durationMinutes} minutos • {s.targetAudience}
                    </div>
                  </button>
                ))}
              </div>

              {/* Modality Choice with -10€ discount on Google Meet */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#2C2822] mb-2">
                  Modalidade de Atendimento:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setModality('presencial')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition cursor-pointer ${
                      modality === 'presencial'
                        ? 'border-[#CD8E33] bg-[#FAF3E7] ring-2 ring-[#CD8E33]/30 text-[#2C2822]'
                        : 'border-stone-200 text-stone-700 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FAF3E7] text-[#CD8E33] border border-[#E5B468]/40 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Presencial em Lisboa</div>
                      <div className="text-[10px] text-stone-500">Av. Duque de Ávila 22, Saldanha</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModality('online')}
                    className={`p-3.5 rounded-2xl border flex items-center gap-3 transition cursor-pointer ${
                      modality === 'online'
                        ? 'border-[#CD8E33] bg-[#FAF3E7] ring-2 ring-[#CD8E33]/30 text-[#2C2822]'
                        : 'border-stone-200 text-stone-700 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#FAF3E7] text-[#CD8E33] border border-[#E5B468]/40 flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>Online</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                          -10€ desconto
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-500">Videoconsulta via Google Meet</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Integrated Clinician Reassurance Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl border border-[#E8D5A0]/90 bg-[#FDFBF7] flex items-center gap-3.5">
                <img
                  src={currentSpecialist.photoUrl}
                  alt={currentSpecialist.name}
                  className="w-13 h-13 rounded-xl object-cover shrink-0 border-2 border-white shadow-xs"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://usr-cdn.zaask.pt/users/067bf29c16c79c3f951f72f764e2bbdbdfbfab97';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <h4 className="text-xs font-bold text-[#2C2822]">{currentSpecialist.name}</h4>
                    <span className="inline-block text-[10px] font-bold text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-2 py-0.5 rounded-full">
                      {currentSpecialist.oppNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#2A6496] font-medium mt-0.5">
                    {currentSpecialist.role} • Mestrado Psicologia Clínica ISPA
                  </p>
                  <p className="text-[10px] text-[#6B6560] mt-0.5">
                    Mais de 15 anos de prática clínica. A sua sessão é conduzida pessoalmente pela Dra. Sofia.
                  </p>
                </div>
              </div>

              {/* Step 1 Action */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continuar para Horários & Vagas</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SCHEDULE & INTERACTIVE BUSY / FREE SLOTS VISUALIZER */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-[#2C2822]">Escolha o Dia e Horário Disponível</h3>
                <p className="text-xs text-stone-500">
                  Consulte a disponibilidade em tempo real da Dra. Sofia Cabrita (fuso horário de Lisboa).
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-semibold">{formError}</span>
                </div>
              )}

              {/* 7-Day Quick Availability Ribbon */}
              <div>
                <label className="block text-xs font-bold text-[#2C2822] mb-1.5">
                  Próximos Dias com Vagas:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {upcomingDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => handleDateChange(day.dateStr)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between gap-1 ${
                          isSelected
                            ? 'border-[#2A6496] bg-[#E8F1F8] ring-2 ring-[#2A6496]/20'
                            : day.isFullyBooked
                            ? 'border-stone-200 bg-stone-100/60 opacity-60 text-stone-400'
                            : 'border-stone-200 bg-white hover:border-[#CD8E33]/60 hover:bg-[#FAF3E7]/40'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-stone-600 uppercase">
                          {day.dayName}
                        </span>
                        <span className={`text-xs font-extrabold ${isSelected ? 'text-[#2A6496]' : 'text-[#2C2822]'}`}>
                          {day.dayNum}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            day.isFullyBooked
                              ? 'bg-rose-100 text-rose-800'
                              : isSelected
                              ? 'bg-[#2A6496] text-white'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {day.isFullyBooked ? 'Esgotado' : `${day.freeCount} vagas`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alternative Date Picker Input */}
              <div className="bg-[#FDFBF7] p-3.5 rounded-2xl border border-[#E8D5A0]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#CD8E33]" />
                  <span className="text-xs font-semibold text-[#2C2822]">Escolher outra data:</span>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="text-xs sm:text-sm py-1.5 px-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none font-medium text-stone-900"
                />
              </div>

              {/* Slot Availability Legend & Status */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2">
                  <div className="text-xs font-bold text-[#2C2822] flex items-center gap-1.5">
                    <span>Horários para {selectedDate}:</span>
                    <span className="text-[11px] font-normal text-stone-500">
                      ({Math.max(0, timeSlots.length - occupiedSlots.length)} de {timeSlots.length} vagas livres)
                    </span>
                  </div>

                  {/* Visual Legend */}
                  <div className="flex items-center gap-3 text-[10px] font-medium text-stone-600">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Disponível</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      <span>Ocupado na Agenda</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#CD8E33]"></span>
                      <span>Selecionado</span>
                    </span>
                  </div>
                </div>

                {timeSlots.length > 0 && occupiedSlots.length >= timeSlots.length ? (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Sem vagas nesta data</strong>
                      Todos os horários de {selectedDate} já se encontram ocupados na agenda de {currentSpecialist.name}. Por favor selecione outro dia no seletor de datas.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Morning Period */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1.5">
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                        <span>Período da Manhã (09:00 – 13:00)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {morningSlots.map((slot) => {
                          const isOccupied = occupiedSlots.includes(slot);
                          const isSelected = selectedTime === slot;
                          const endTime = getSlotEndTime(slot, currentService.durationMinutes);

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isOccupied}
                              onClick={() => {
                                if (!isOccupied) {
                                  setSelectedTime(slot);
                                  setFormError(null);
                                }
                              }}
                              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition text-center flex items-center justify-between gap-2 relative ${
                                isOccupied
                                  ? 'border-rose-200 bg-rose-50/50 text-stone-400 cursor-not-allowed opacity-80'
                                  : isSelected
                                  ? 'border-[#CD8E33] bg-[#CD8E33] text-white shadow-xs cursor-pointer ring-2 ring-[#CD8E33]/30'
                                  : 'border-stone-200 bg-white text-stone-700 hover:border-[#CD8E33]/60 hover:bg-[#FAF3E7]/40 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-left">
                                <Clock className={`w-3.5 h-3.5 ${isOccupied ? 'text-rose-300' : isSelected ? 'text-white' : 'text-[#CD8E33]'}`} />
                                <div>
                                  <div className={`font-bold ${isOccupied ? 'line-through text-stone-400' : ''}`}>
                                    {slot}
                                  </div>
                                  <div className={`text-[10px] font-normal ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                                    até às {endTime}
                                  </div>
                                </div>
                              </div>

                              {isOccupied ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                                  Ocupado
                                </span>
                              ) : isSelected ? (
                                <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                  <Check className="w-3 h-3" />
                                  <span>Escolha</span>
                                </span>
                              ) : (
                                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                                  Livre
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon Period */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 mb-1.5">
                        <Sunset className="w-3.5 h-3.5 text-orange-500" />
                        <span>Período da Tarde / Fim de Dia (14:30 – 20:00)</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {afternoonSlots.map((slot) => {
                          const isOccupied = occupiedSlots.includes(slot);
                          const isSelected = selectedTime === slot;
                          const endTime = getSlotEndTime(slot, currentService.durationMinutes);

                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isOccupied}
                              onClick={() => {
                                if (!isOccupied) {
                                  setSelectedTime(slot);
                                  setFormError(null);
                                }
                              }}
                              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition text-center flex items-center justify-between gap-2 relative ${
                                isOccupied
                                  ? 'border-rose-200 bg-rose-50/50 text-stone-400 cursor-not-allowed opacity-80'
                                  : isSelected
                                  ? 'border-[#CD8E33] bg-[#CD8E33] text-white shadow-xs cursor-pointer ring-2 ring-[#CD8E33]/30'
                                  : 'border-stone-200 bg-white text-stone-700 hover:border-[#CD8E33]/60 hover:bg-[#FAF3E7]/40 cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 text-left">
                                <Clock className={`w-3.5 h-3.5 ${isOccupied ? 'text-rose-300' : isSelected ? 'text-white' : 'text-[#CD8E33]'}`} />
                                <div>
                                  <div className={`font-bold ${isOccupied ? 'line-through text-stone-400' : ''}`}>
                                    {slot}
                                  </div>
                                  <div className={`text-[10px] font-normal ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                                    até às {endTime}
                                  </div>
                                </div>
                              </div>

                              {isOccupied ? (
                                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                                  Ocupado
                                </span>
                              ) : isSelected ? (
                                <span className="text-[10px] font-bold text-white bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                                  <Check className="w-3 h-3" />
                                  <span>Escolha</span>
                                </span>
                              ) : (
                                <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                                  Livre
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Online Google Meet & Calendar Sync Notification */}
              {modality === 'online' && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-start gap-2.5">
                  <Video className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Videoconsulta com Google Meet Integrado</strong>
                    Será criada automaticamente uma sala de videoconferência segura no Google Meet e enviada para o seu email. A consulta será sincronizada em tempo real com a agenda Google da Dra. Sofia Cabrita.
                  </div>
                </div>
              )}

              {/* Summary recap box */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900">{currentService.title}</span>
                  <div className="text-[11px] text-stone-500">
                    com {currentSpecialist.name} ({modality === 'online' ? 'ONLINE • VIDEOCONSULTA' : 'PRESENCIAL'})
                    {selectedTime && (
                      <span className="ml-1 text-[#2A6496] font-semibold">• {selectedTime}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#CD8E33] text-sm">
                    €{effectivePrice}.00
                  </div>
                  {modality === 'online' && (
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      -10€ desconto online
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Actions */}
              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextFromDateTime}
                  className="px-6 py-2.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Continuar para Seus Dados</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT DETAILS */}
          {step === 3 && (
            <form onSubmit={handleNextFromClientInfo} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-stone-900">Identificação & Contacto</h3>
                <p className="text-xs text-stone-500">Os seus dados estão protegidos por sigilo profissional clínico estrito.</p>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-semibold">{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Maria João Duarte"
                    className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email (para confirmação) *</label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Telemóvel (WhatsApp / SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+351 965 197 069"
                    className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    NIF (Opcional - Dedução Saúde IRS)
                  </label>
                  <input
                    type="text"
                    value={clientNif}
                    onChange={(e) => setClientNif(e.target.value)}
                    placeholder="Ex: 249810345"
                    className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Breve nota sobre o motivo da consulta (Confidencial)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Ansiedade no trabalho, dificuldades no sono, orientação pessoal..."
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                />
              </div>

              {/* RGPD and Terms checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                    className="mt-0.5 rounded text-[#2A6496] focus:ring-[#2A6496]"
                  />
                  <span>
                    Autorizo o tratamento dos dados fornecidos estritamente para efeitos de agendamento clínico e receção de notificações automáticas por email, em conformidade com o RGPD e o Código Deontológico da OPP.
                  </span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar aos Horários</span>
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Avançar para Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: PAYMENT GATEWAY */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-[#2C2822]">Confirmação & Pagamento</h3>
                <p className="text-xs text-stone-500">
                  Escolha o seu método preferido (MB WAY, Multibanco, Cartão ou Pagar após consulta).
                </p>
              </div>

              {/* Booking Recap banner */}
              <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E8D5A0]/80 text-xs text-stone-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#2C2822]">{currentService.title}</span>
                  <div className="text-[11px] text-stone-500">
                    {selectedDate} às {selectedTime} • {currentSpecialist.name} ({modality === 'online' ? 'Videoconsulta' : 'Presencial'})
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#CD8E33]">€{effectivePrice}.00</div>
                  {modality === 'online' ? (
                    <div className="text-[10px] text-emerald-700 font-semibold">-10€ em videoconferência</div>
                  ) : (
                    <div className="text-[10px] text-stone-400">IVA Isento Art. 9º CIVA</div>
                  )}
                </div>
              </div>

              <PaymentGateway
                amountEur={effectivePrice}
                serviceTitle={currentService.title}
                selectedMethod={paymentMethod}
                onMethodChange={setPaymentMethod}
                clientPhone={clientPhone}
                clientName={clientName}
                isSubmitting={isSubmitting}
                onPaymentComplete={handlePaymentComplete}
              />

              <div className="pt-2 flex items-center justify-start">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar aos Dados</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS & AUTOMATED EMAIL CONFIRMATION */}
          {step === 5 && confirmedBooking && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F1F8] text-[#2A6496] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3 py-1 rounded-full">
                  Agendamento Registado com Sucesso
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#2C2822] mt-2">
                  Obrigado, {confirmedBooking.client.name}!
                </h3>
                <p className="text-xs text-[#6B6560] mt-1 max-w-md mx-auto">
                  A sua consulta foi registada sob a referência <strong className="text-[#2C2822]">{confirmedBooking.referenceCode}</strong>. 
                  Enviámos uma notificação automática com todos os detalhes para <strong>{confirmedBooking.client.email}</strong>.
                </p>
              </div>

              {/* Consultation Details Card */}
              <div className="bg-[#FDFBF7] rounded-2xl p-5 border border-[#E8D5A0]/80 text-left text-xs space-y-3 max-w-lg mx-auto">
                <div className="flex items-center justify-between border-b border-[#E8D5A0]/40 pb-2.5">
                  <span className="text-stone-500">Serviço:</span>
                  <span className="font-bold text-[#2C2822]">{currentService.title}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8D5A0]/40 pb-2.5">
                  <span className="text-stone-500">Terapeuta Responsável:</span>
                  <span className="font-bold text-[#2C2822]">{currentSpecialist.name} ({currentSpecialist.oppNumber})</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8D5A0]/40 pb-2.5">
                  <span className="text-stone-500">Data e Hora:</span>
                  <span className="font-bold text-[#2A6496]">{confirmedBooking.date} às {confirmedBooking.time}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E8D5A0]/40 pb-2.5">
                  <span className="text-stone-500">Modalidade:</span>
                  <span className="font-bold text-[#2C2822]">
                    {confirmedBooking.modality === 'online' ? 'Videoconsulta Segura' : 'Presencial (Lisboa)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Estado do Pagamento:</span>
                  {confirmedBooking.paymentMethod === 'pos_consulta' ? (
                    <span className="inline-flex items-center gap-1 font-bold text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-2.5 py-0.5 rounded text-[11px]">
                      <Clock className="w-3 h-3 text-[#9A7A2E]" />
                      <span>A PAGAR APÓS CONSULTA</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-bold text-[#2A6496] bg-[#E8F1F8] border border-[#B0D0EB] px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{confirmedBooking.paymentStatus.toUpperCase()} ({confirmedBooking.paymentMethod.toUpperCase()})</span>
                    </span>
                  )}
                </div>
              </div>

              {confirmedBooking.paymentMethod === 'pos_consulta' ? (
                <div className="p-3.5 bg-[#F5EED8]/70 rounded-2xl border border-[#E8D5A0] text-xs text-[#5C4513] text-left max-w-lg mx-auto flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#9A7A2E] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Opção de Pagamento Após Consulta Ativa</p>
                    <p className="text-[11px] text-[#7A6025] mt-0.5 leading-relaxed">
                      O montante de <strong>€{confirmedBooking.priceEur}.00</strong> será liquidado no final da sua sessão diretamente com a Dra. Sofia Godinho Cabrita ({confirmedBooking.modality === 'online' ? 'via MB WAY ou transferência bancária IBAN' : 'em numerário, MB WAY ou Multibanco'}). O <strong>Recibo Verde Eletrónico (AT)</strong> oficial para IRS ser-lhe-á enviado por email pela Dra. Sofia após a consulta.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-[#E8F1F8]/70 rounded-2xl border border-[#B0D0EB] text-xs text-[#1A4A72] text-left max-w-lg mx-auto flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2A6496] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Pagamento Registado • Recibo Verde (IRS) a Enviar</p>
                    <p className="text-[11px] text-[#2A6496] mt-0.5 leading-relaxed">
                      O <strong>Recibo Verde Eletrónico</strong> oficial da Autoridade Tributária (com isenção de IVA - Art. 9.º do CIVA e associado ao NIF <strong>{confirmedBooking.client.nif || 'Consumidor Final'}</strong>) ser-lhe-á emitido e enviado diretamente para o seu email pela Dra. Sofia Godinho Cabrita para efeitos de <strong>dedução no IRS (e-Fatura)</strong> e reembolso em seguradoras.
                    </p>
                  </div>
                </div>
              )}

              {/* Google Meet Room Card for Online Consultations */}
              {confirmedBooking.modality === 'online' && confirmedBooking.meetingUrl && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left space-y-2.5 max-w-lg mx-auto shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-950 font-bold text-xs">
                      <Video className="w-4 h-4 text-sky-600" />
                      <span>Link da Videoconsulta Google Meet</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                      Google Meet
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-800 leading-relaxed">
                    A sua sessão de psicologia decorrerá por Google Meet. O link seguro de acesso foi gerado e enviado para <strong>{confirmedBooking.client.email}</strong>:
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <div className="flex-1 px-3 py-2 bg-white rounded-xl border border-sky-200 text-xs font-mono text-sky-950 truncate select-all">
                      {confirmedBooking.meetingUrl}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirmedBooking.meetingUrl) {
                            navigator.clipboard.writeText(confirmedBooking.meetingUrl);
                            setCopiedMeet(true);
                            setTimeout(() => setCopiedMeet(false), 2500);
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-sky-100 text-sky-900 border border-sky-300 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                      >
                        {copiedMeet ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-700" />}
                        <span>{copiedMeet ? 'Copiado!' : 'Copiar'}</span>
                      </button>
                      <a
                        href={confirmedBooking.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir Sala</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Automated Actions: View Email, Add to Google Calendar, Download .ics */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={generateGoogleCalendarUrl(confirmedBooking, currentService.title, currentSpecialist.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#CD8E33] hover:bg-[#B57827] text-white text-xs font-semibold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Adicionar ao Google Calendar</span>
                </a>

                <button
                  type="button"
                  onClick={handlePreviewEmail}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF3E7] text-[#CD8E33] hover:bg-[#F3E5CD] border border-[#E5B468]/50 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-[#CD8E33]" />
                  <span>Ver Email de Confirmação</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadIcs}
                  className="px-4 py-2.5 rounded-xl bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-stone-500" />
                  <span>Calendário (.ics)</span>
                </button>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(false)}
                  className="px-8 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  Fechar Janela
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
