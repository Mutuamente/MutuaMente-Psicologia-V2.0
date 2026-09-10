export type ServiceId = 
  | 'psicologia-adultos'
  | 'terapia-casal'
  | 'apoio-online'
  | 'orientacao-vocacional'
  | 'avaliacao-neuropsicologica';

export type Modality = 'presencial' | 'online';

export type PaymentMethod = 'mbway' | 'multibanco' | 'cartao' | 'applepay' | 'paypal' | 'pos_consulta';

export type BookingStatus = 'confirmada' | 'pendente_pagamento' | 'concluida' | 'cancelada';

export interface Service {
  id: ServiceId;
  title: string;
  titleEn: string;
  shortDesc: string;
  shortDescEn: string;
  fullDesc: string;
  fullDescEn: string;
  durationMinutes: number;
  priceEur: number;
  targetAudience: string;
  targetAudienceEn: string;
  iconName: string;
  badge?: string;
  badgeEn?: string;
  suitableFor: string[];
  suitableForEn: string[];
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  oppNumber: string; // Ordem dos Psicólogos Portugueses
  bio: string;
  bioEn: string;
  specialties: string[];
  specialtiesEn: string[];
  languages: string[];
  photoUrl: string;
  consultationTypes: ServiceId[];
  availabilityDays: number[]; // 0 = Sunday, 1 = Monday, ...
}

export interface TimeSlot {
  time: string; // e.g., "09:30"
  available: boolean;
}

export interface BookingFormData {
  serviceId: ServiceId;
  modality: Modality;
  specialistId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNif?: string;
  notes?: string;
  isFirstSession: boolean;
  termsAccepted: boolean;
  paymentMethod: PaymentMethod;
  paymentDetails?: {
    transactionId?: string;
    mbwayPhone?: string;
    cardNumber?: string;
    cardExp?: string;
    cardCvc?: string;
  };
}

export interface Booking {
  id: string;
  referenceCode: string;
  createdAt: string;
  serviceId: ServiceId;
  modality: Modality;
  specialistId: string;
  date: string;
  time: string;
  durationMinutes: number;
  priceEur: number;
  status: BookingStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pago' | 'pendente' | 'reembolsado';
  paymentReference?: {
    entity?: string;
    reference?: string;
    mbwayPhone?: string;
    transactionId: string;
    paidAt?: string;
  };
  client: {
    name: string;
    email: string;
    phone: string;
    nif?: string;
    notes?: string;
  };
  meetingUrl?: string; // For online consultations
  locationAddress?: string; // For in-person consultations
  clinicalNotes?: string;
  emailSent: boolean;
  reminderSent: boolean;
}

export interface EmailNotification {
  id: string;
  bookingId: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  sentAt: string;
  type: 'confirmacao' | 'lembrete_24h' | 'fatura' | 'cancelamento';
  status: 'enviado' | 'entregue' | 'aberto';
  htmlContent: string;
}

export interface Article {
  id: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  categoryEn: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  clientInitials: string;
  clientAgeLocation: string;
  text: string;
  textEn: string;
  service: string;
  rating: number;
}
