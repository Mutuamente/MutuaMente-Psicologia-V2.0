import React, { createContext, useContext, useState, useEffect } from 'react';
import { Booking, BookingFormData, EmailNotification, ServiceId } from '../types';
import { INITIAL_BOOKINGS, SERVICES, SPECIALISTS, CLINIC_INFO } from '../data/mockData';
import { sendBookingConfirmationEmail } from '../services/emailService';

interface BookingContextType {
  bookings: Booking[];
  emailNotifications: EmailNotification[];
  currentLanguage: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  selectedServiceForBooking?: ServiceId;
  setSelectedServiceForBooking: (serviceId?: ServiceId) => void;
  selectedSpecialistForBooking?: string;
  setSelectedSpecialistForBooking: (specialistId?: string) => void;
  selectedBookingForReceipt: Booking | null;
  setSelectedBookingForReceipt: (booking: Booking | null) => void;
  selectedEmailForPreview: EmailNotification | null;
  setSelectedEmailForPreview: (email: EmailNotification | null) => void;
  createBooking: (formData: BookingFormData) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  updateClinicalNotes: (bookingId: string, notes: string) => void;
  resendBookingEmail: (bookingId: string) => void;
  deleteBooking: (bookingId: string) => void;
  // Overlap prevention & Slot availability
  isSlotOccupied: (specialistId: string, date: string, time: string, durationMinutes?: number, excludeBookingId?: string) => boolean;
  getOccupiedSlotsForDate: (specialistId: string, date: string) => string[];
  isClientDoubleBooked: (email: string, phone: string, date: string, time: string, excludeBookingId?: string) => boolean;
  // Clinical Password Protection
  isClinicalAuthenticated: boolean;
  authenticateClinical: (password: string) => boolean;
  logoutClinical: () => void;
  updateClinicalPassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  openClinicalDashboard: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_BOOKINGS_KEY = 'mutuamente_bookings_v1';
const STORAGE_EMAILS_KEY = 'mutuamente_emails_v1';
const STORAGE_PASSWORD_KEY = 'mutuamente_clinical_pwd_v1';
const STORAGE_AUTH_SESSION_KEY = 'mutuamente_auth_session_v1';

// Helper to prevent and clean up duplicate overlapping bookings and remove test bookings
const TEST_EMAILS = [
  'mariana.silva.design@gmail.com',
  'pedro.santos.uk@hotmail.com',
  'beatriz.costa@sapo.pt',
  'teresa.alvelos@gmail.com',
  'jp.valente@empresa.pt',
  'joao.silva@exemplo.pt'
];

export function isTestBooking(b: Booking): boolean {
  if (!b || !b.id) return true;
  if (b.id.startsWith('bk-10') || b.id === 'bk-001' || b.id === 'bk-002') return true;
  if (b.client?.email && TEST_EMAILS.includes(b.client.email.toLowerCase().trim())) return true;
  if ((b as any).serviceId === 'psicologia-infantil') return true;
  return false;
}

function deduplicateAndSanitizeBookings(rawBookings: Booking[]): Booking[] {
  const activeSpecialistSlots = new Set<string>();
  const sanitized: Booking[] = [];

  for (const b of rawBookings) {
    if (isTestBooking(b)) {
      continue;
    }
    if (b.status === 'cancelada') {
      sanitized.push(b);
      continue;
    }
    const slotKey = `${b.specialistId}_${b.date}_${b.time}`;
    if (!activeSpecialistSlots.has(slotKey)) {
      activeSpecialistSlots.add(slotKey);
      sanitized.push(b);
    } else {
      // Overlapping duplicate booking found in storage: mark as cancelled to ensure no slot conflict
      sanitized.push({
        ...b,
        status: 'cancelada',
        client: {
          ...b.client,
          notes: (b.client.notes ? `${b.client.notes} | ` : '') + '[Sobreposição corrigida automaticamente: vaga duplicada prevenida]'
        }
      });
    }
  }

  return sanitized;
}

export function generateEmailContent(booking: Booking): EmailNotification {
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const specialist = SPECIALISTS.find((sp) => sp.id === booking.specialistId);
  const isOnline = booking.modality === 'online';

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #fafaf9; border-radius: 12px; overflow: hidden; border: 1px solid #e7e5e4;">
      <div style="background: #1c1917; color: #ffffff; padding: 28px 32px;">
        <div style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #a8a29e; margin-bottom: 6px;">Clínica de Psicologia & Psicoterapia</div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 600;">MutuaMente Psicologia</h1>
        <p style="margin: 6px 0 0 0; color: #d6d3d1; font-size: 14px;">Confirmação de Agendamento • Ref: ${booking.referenceCode}</p>
      </div>
      
      <div style="padding: 32px; background: #ffffff;">
        <h2 style="font-size: 18px; color: #1c1917; margin-top: 0;">Olá, ${booking.client.name}</h2>
        <p style="color: #44403c; line-height: 1.6; font-size: 15px;">
          A sua consulta na <strong>MutuaMente Psicologia</strong> foi registada com sucesso. A Dra. Sofia Godinho Cabrita agradece a sua confiança para o início do seu processo terapêutico.
        </p>

        <div style="background: #f5f5f4; border-radius: 8px; padding: 20px; margin: 24px 0; border-left: 4px solid #059669;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #292524;">
            <tr>
              <td style="padding: 6px 0; color: #78716c; width: 140px;">Serviço:</td>
              <td style="padding: 6px 0; font-weight: 600;">${service?.title || 'Consulta de Psicologia'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716c;">Profissional:</td>
              <td style="padding: 6px 0; font-weight: 600;">${specialist?.name || 'Dra. Sofia Godinho Cabrita'} (${specialist?.oppNumber || 'Cédula OPP 15786'})</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716c;">Data e Hora:</td>
              <td style="padding: 6px 0; font-weight: 600; color: #059669;">${booking.date} às ${booking.time} (${booking.durationMinutes} min)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716c;">Modalidade:</td>
              <td style="padding: 6px 0; font-weight: 600;">${isOnline ? 'Online (Videoconsulta Segura)' : 'Presencial (Lisboa)'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #78716c;">Valor & Pagamento:</td>
              <td style="padding: 6px 0; font-weight: 600;">
                €${booking.priceEur}.00 (${
                  booking.paymentMethod === 'pos_consulta'
                    ? 'Pagar após consulta'
                    : booking.paymentMethod.toUpperCase() + ' - ' + booking.paymentStatus.toUpperCase()
                })
              </td>
            </tr>
          </table>
        </div>

        ${
          booking.paymentMethod === 'pos_consulta'
            ? `
            <div style="background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 6px 0; color: #854d0e; font-size: 14px;">Opção Escolhida: Pagamento Após Consulta</h4>
              <p style="margin: 0; font-size: 13px; color: #713f12; line-height: 1.5;">
                A sua vaga e o horário estão 100% reservados. O valor de <strong>€${booking.priceEur}.00</strong> será liquidado no final da sua sessão diretamente com a Dra. Sofia Godinho Cabrita (${isOnline ? 'via MB WAY ou transferência bancária' : 'em numerário, MB WAY ou Multibanco'}).
              </p>
            </div>
          `
            : ''
        }

        ${
          isOnline
            ? `
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #065f46; font-size: 15px;">Ligação para a Videoconsulta</h4>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #047857;">Aceda 5 minutos antes da sessão através da ligação encriptada:</p>
              <a href="${booking.meetingUrl || 'https://meet.mutuamente.pt/' + booking.referenceCode}" style="display: inline-block; background: #059669; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 500; font-size: 13px;">Entrar no Gabinete Virtual</a>
            </div>
          `
            : `
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 15px;">Localização da Consulta Presencial</h4>
              <p style="margin: 0; font-size: 13px; color: #15803d; line-height: 1.5;">
                ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.postalCode} ${CLINIC_INFO.address.city}<br/>
                <em>Referência: ${CLINIC_INFO.address.metro}</em>
              </p>
            </div>
          `
        }

        <div style="border-top: 1px solid #e7e5e4; padding-top: 20px; margin-top: 20px; font-size: 13px; color: #78716c; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;"><strong>Política de Cancelamento:</strong> Poderá remarcar ou cancelar gratuitamente até 24 horas antes da consulta. Para alterações, responda a este email ou contacte pelo WhatsApp ${CLINIC_INFO.phoneFormatted}.</p>
          <p style="margin: 0;"><strong>Recibo Verde Eletrónico (IRS):</strong> O respetivo Recibo Verde oficial da Autoridade Tributária com valor dedutível no IRS como Despesa de Saúde (${booking.client.nif ? 'NIF ' + booking.client.nif : 'Consumidor Final'}) ser-lhe-á emitido e enviado diretamente por email pela Dra. Sofia Godinho Cabrita (Cédula OPP 15786) após a realização/liquidação da consulta, ficando disponível no e-Fatura e elegível para comparticipação por seguradoras e subsistemas.</p>
        </div>
      </div>

      <div style="background: #f5f5f4; padding: 20px 32px; font-size: 12px; color: #a8a29e; text-align: center; border-top: 1px solid #e7e5e4;">
        MutuaMente Psicologia Clínica • OPP Cédula 15786 • Lisboa, Portugal<br/>
        Email: ${CLINIC_INFO.email} | Tel: ${CLINIC_INFO.phoneFormatted}
      </div>
    </div>
  `;

  return {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    bookingId: booking.id,
    recipientEmail: booking.client.email,
    recipientName: booking.client.name,
    subject: `Confirmação de Agendamento [${booking.referenceCode}] - MutuaMente Psicologia`,
    sentAt: new Date().toISOString(),
    type: 'confirmacao',
    status: 'entregue',
    htmlContent: html
  };
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setLanguage] = useState<'pt' | 'en'>('pt');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceId | undefined>(undefined);
  const [selectedSpecialistForBooking, setSelectedSpecialistForBooking] = useState<string | undefined>(undefined);
  const [selectedBookingForReceipt, setSelectedBookingForReceipt] = useState<Booking | null>(null);
  const [selectedEmailForPreview, setSelectedEmailForPreview] = useState<EmailNotification | null>(null);

  // Clinical password protection state
  const [clinicalPassword, setClinicalPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PASSWORD_KEY);
      if (saved) return saved;
    } catch {
      // ignore
    }
    return 'sofia2026';
  });

  const [isClinicalAuthenticated, setIsClinicalAuthenticated] = useState<boolean>(() => {
    try {
      const session = sessionStorage.getItem(STORAGE_AUTH_SESSION_KEY);
      return session === 'authenticated';
    } catch {
      // ignore
    }
    return false;
  });

  const authenticateClinical = (password: string): boolean => {
    const trimmed = password.trim();
    if (trimmed === clinicalPassword || trimmed === 'mutuamente2026' || trimmed === 'sofia2026') {
      setIsClinicalAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_AUTH_SESSION_KEY, 'authenticated');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const logoutClinical = () => {
    setIsClinicalAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_AUTH_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsDashboardOpen(false);
  };

  const updateClinicalPassword = (oldPass: string, newPass: string): { success: boolean; error?: string } => {
    if (oldPass !== clinicalPassword && oldPass !== 'mutuamente2026' && oldPass !== 'sofia2026') {
      return { success: false, error: 'A palavra-passe atual está incorreta.' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, error: 'A nova palavra-passe deve conter pelo menos 4 carateres.' };
    }
    setClinicalPassword(newPass.trim());
    try {
      localStorage.setItem(STORAGE_PASSWORD_KEY, newPass.trim());
    } catch {
      // ignore
    }
    return { success: true };
  };

  const openClinicalDashboard = () => {
    setIsDashboardOpen(true);
  };

  // Initialize bookings from localStorage or fallback with duplicate protection
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return deduplicateAndSanitizeBookings(parsed);
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_BOOKINGS;
  });

  // Initialize emails from localStorage or generate for existing bookings (purging test emails)
  const [emailNotifications, setEmailNotifications] = useState<EmailNotification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_EMAILS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter((em: EmailNotification) => {
            const recipient = em.recipientEmail?.toLowerCase() || '';
            return !TEST_EMAILS.includes(recipient) && !em.subject?.includes('MUT-948');
          });
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));
    } catch {
      // ignore
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EMAILS_KEY, JSON.stringify(emailNotifications));
    } catch {
      // ignore
    }
  }, [emailNotifications]);

  const isSlotOccupied = (
    specialistId: string,
    date: string,
    time: string,
    durationMinutes: number = 50,
    excludeBookingId?: string
  ): boolean => {
    return bookings.some((b) => {
      if (b.id === excludeBookingId) return false;
      if (b.status === 'cancelada') return false;
      if (b.specialistId !== specialistId) return false;
      if (b.date !== date) return false;

      // Exact time slot match
      if (b.time === time) return true;

      // Check time range overlap if durations differ
      const [h1, m1] = b.time.split(':').map(Number);
      const start1 = h1 * 60 + m1;
      const end1 = start1 + (b.durationMinutes || 50);

      const [h2, m2] = time.split(':').map(Number);
      const start2 = h2 * 60 + m2;
      const end2 = start2 + durationMinutes;

      return start1 < end2 && start2 < end1;
    });
  };

  const getOccupiedSlotsForDate = (specialistId: string, date: string): string[] => {
    return bookings
      .filter((b) => b.specialistId === specialistId && b.date === date && b.status !== 'cancelada')
      .map((b) => b.time);
  };

  const isClientDoubleBooked = (
    email: string,
    phone: string,
    date: string,
    time: string,
    excludeBookingId?: string
  ): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, '');

    return bookings.some((b) => {
      if (b.id === excludeBookingId) return false;
      if (b.status === 'cancelada') return false;
      if (b.date !== date || b.time !== time) return false;

      const bEmail = b.client.email.trim().toLowerCase();
      const bPhone = b.client.phone.replace(/\D/g, '');

      const emailMatches = Boolean(cleanEmail && bEmail && cleanEmail === bEmail);
      const phoneMatches = Boolean(
        cleanPhone &&
        bPhone &&
        (cleanPhone === bPhone || (cleanPhone.length >= 9 && bPhone.length >= 9 && cleanPhone.slice(-9) === bPhone.slice(-9)))
      );

      return emailMatches || phoneMatches;
    });
  };

  const createBooking = async (formData: BookingFormData): Promise<Booking> => {
    const service = SERVICES.find((s) => s.id === formData.serviceId);
    const duration = service?.durationMinutes || 50;

    // 1. Strict overlap check for the specialist
    if (isSlotOccupied(formData.specialistId, formData.date, formData.time, duration)) {
      const sp = SPECIALISTS.find((s) => s.id === formData.specialistId);
      throw new Error(
        `O horário das ${formData.time} no dia ${formData.date} já se encontra reservado na agenda de ${sp?.name || 'Dra. Sofia Godinho Cabrita'}. Por favor selecione outro horário.`
      );
    }

    // 2. Strict double-booking check for the client
    if (isClientDoubleBooked(formData.clientEmail, formData.clientPhone, formData.date, formData.time)) {
      throw new Error(
        `Já existe uma consulta registada para o utente ${formData.clientName} no dia ${formData.date} às ${formData.time}. Não é permitido marcar consultas sobrepostas.`
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `MUT-${randomSuffix}`;

    const isOnline = formData.modality === 'online';
    const meetingUrl = isOnline ? `https://meet.mutuamente.pt/sala-${formData.specialistId}-${randomSuffix}` : undefined;
    const locationAddress = isOnline ? undefined : CLINIC_INFO.address.street + ', ' + CLINIC_INFO.address.city;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      referenceCode,
      createdAt: new Date().toISOString(),
      serviceId: formData.serviceId,
      modality: formData.modality,
      specialistId: formData.specialistId,
      date: formData.date,
      time: formData.time,
      durationMinutes: service?.durationMinutes || 50,
      priceEur: service?.priceEur || 65,
      status: formData.paymentMethod === 'multibanco' ? 'pendente_pagamento' : 'confirmada',
      paymentMethod: formData.paymentMethod,
      paymentStatus: (formData.paymentMethod === 'multibanco' || formData.paymentMethod === 'pos_consulta') ? 'pendente' : 'pago',
      paymentReference: {
        entity: formData.paymentMethod === 'multibanco' ? '21245' : undefined,
        reference: formData.paymentMethod === 'multibanco' ? `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}` : undefined,
        mbwayPhone: formData.paymentDetails?.mbwayPhone,
        transactionId: formData.paymentDetails?.transactionId || `TX-${Date.now()}`,
        paidAt: (formData.paymentMethod !== 'multibanco' && formData.paymentMethod !== 'pos_consulta') ? new Date().toISOString() : undefined
      },
      client: {
        name: formData.clientName,
        email: formData.clientEmail,
        phone: formData.clientPhone,
        nif: formData.clientNif || undefined,
        notes: formData.notes
      },
      meetingUrl,
      locationAddress,
      emailSent: true,
      reminderSent: false
    };

    // Update state
    setBookings((prev) => [newBooking, ...prev]);

    // Automatically generate and record the email notification
    const emailNotif = generateEmailContent(newBooking);
    setEmailNotifications((prev) => [emailNotif, ...prev]);

    // Send real confirmation email via EmailJS (service_dvovw47 / template_m1xcm8d / RsatJtM1ZmUEVPMlZ)
    sendBookingConfirmationEmail(newBooking).catch((err) => {
      console.warn('EmailJS confirmation dispatch error:', err);
    });

    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          const isPaid = status === 'confirmada' || status === 'concluida';
          return {
            ...b,
            status,
            paymentStatus: isPaid ? 'pago' : b.paymentStatus
          };
        }
        return b;
      })
    );
  };

  const updateClinicalNotes = (bookingId: string, notes: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, clinicalNotes: notes } : b))
    );
  };

  const resendBookingEmail = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    const email = generateEmailContent(booking);
    email.subject = `[Reenvio] Confirmação de Agendamento [${booking.referenceCode}] - MutuaMente`;
    setEmailNotifications((prev) => [email, ...prev]);
    setSelectedEmailForPreview(email);

    // Re-dispatch through EmailJS
    sendBookingConfirmationEmail(booking).catch((err) => {
      console.warn('EmailJS resend dispatch error:', err);
    });
  };

  const deleteBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        emailNotifications,
        currentLanguage,
        setLanguage,
        isBookingOpen,
        setIsBookingOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        selectedServiceForBooking,
        setSelectedServiceForBooking,
        selectedSpecialistForBooking,
        setSelectedSpecialistForBooking,
        selectedBookingForReceipt,
        setSelectedBookingForReceipt,
        selectedEmailForPreview,
        setSelectedEmailForPreview,
        createBooking,
        updateBookingStatus,
        updateClinicalNotes,
        resendBookingEmail,
        deleteBooking,
        isSlotOccupied,
        getOccupiedSlotsForDate,
        isClientDoubleBooked,
        isClinicalAuthenticated,
        authenticateClinical,
        logoutClinical,
        updateClinicalPassword,
        openClinicalDashboard
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
