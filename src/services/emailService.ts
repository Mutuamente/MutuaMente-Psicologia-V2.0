import emailjs from '@emailjs/browser';
import { Booking } from '../types';
import { SERVICES, SPECIALISTS, CLINIC_INFO } from '../data/mockData';

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_dvovw47',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_m1xcm8d',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'RsatJtM1ZmUEVPMlZ',
};

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a real confirmation email using EmailJS connected to Gmail mutuamentepsicologia@gmail.com
 */
export async function sendBookingConfirmationEmail(booking: Booking): Promise<SendEmailResult> {
  const service = SERVICES.find((s) => s.id === booking.serviceId);
  const specialist = SPECIALISTS.find((sp) => sp.id === booking.specialistId) || SPECIALISTS[0];
  const isOnline = booking.modality === 'online';

  const modalityLabel = isOnline 
    ? 'Online (Videoconsulta Segura)' 
    : `Presencial em Lisboa (${CLINIC_INFO.address.street})`;

  const locationText = isOnline
    ? (booking.meetingUrl || 'Gabinete Virtual Encriptado')
    : `${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.postalCode} ${CLINIC_INFO.address.city} (${CLINIC_INFO.address.metro})`;

  const paymentLabel = booking.paymentMethod === 'pos_consulta'
    ? 'Pagamento após a consulta no consultório'
    : `Liquidado via ${booking.paymentMethod.toUpperCase()}`;

  const messageSummary = `Exmo(a). ${booking.client.name},

A sua consulta na MutuaMente Psicologia foi agendada com sucesso com a Dra. Sofia Godinho Cabrita.

Detalhes da Marcação:
• Serviço: ${service?.title || 'Consulta de Psicologia'}
• Profissional: ${specialist?.name || 'Dra. Sofia Godinho Cabrita'} (${specialist?.oppNumber || 'Cédula OPP 15786'})
• Data e Hora: ${booking.date} às ${booking.time} (${booking.durationMinutes} min)
• Modalidade: ${modalityLabel}
• Referência de Marcação: ${booking.referenceCode}
• Honorários: €${booking.priceEur}.00 (${paymentLabel})
${isOnline && booking.meetingUrl ? `• Gabinete Virtual: ${booking.meetingUrl}\n` : ''}
Localização do Consultório: ${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.postalCode} Lisboa
Contactos: Tel. ${CLINIC_INFO.phoneFormatted} | Email: ${CLINIC_INFO.email} | Site: ${CLINIC_INFO.websiteFormatted}

Nota: O Recibo Verde oficial (com dedução à coleta no IRS como Despesa de Saúde) ser-lhe-á emitido pela Dra. Sofia Godinho Cabrita.`;

  const templateParams: Record<string, any> = {
    // Recipient & sender
    to_name: booking.client.name,
    client_name: booking.client.name,
    name: booking.client.name,
    to_email: booking.client.email,
    client_email: booking.client.email,
    email: booking.client.email,
    reply_to: CLINIC_INFO.email,
    from_name: 'MutuaMente Psicologia',
    clinic_name: 'MutuaMente Psicologia',
    clinic_email: CLINIC_INFO.email,
    clinic_phone: CLINIC_INFO.phoneFormatted,
    clinic_address: `${CLINIC_INFO.address.street}, ${CLINIC_INFO.address.postalCode} ${CLINIC_INFO.address.city}`,

    // Client contact
    phone: booking.client.phone,
    client_phone: booking.client.phone,
    nif: booking.client.nif || 'Consumidor Final',
    client_nif: booking.client.nif || 'Consumidor Final',
    notes: booking.client.notes || 'Sem observações adicionais',
    client_notes: booking.client.notes || 'Sem observações adicionais',

    // Specialist
    specialist_name: specialist?.name || 'Dra. Sofia Godinho Cabrita',
    specialist_opp: specialist?.oppNumber || 'Cédula OPP 15786',

    // Appointment
    service_title: service?.title || 'Consulta de Psicologia',
    service_name: service?.title || 'Consulta de Psicologia',
    service: service?.title || 'Consulta de Psicologia',
    date: booking.date,
    booking_date: booking.date,
    time: booking.time,
    booking_time: booking.time,
    duration: `${booking.durationMinutes} min`,
    modality: modalityLabel,
    location: locationText,
    meeting_url: booking.meetingUrl || '',
    reference_code: booking.referenceCode,
    booking_ref: booking.referenceCode,
    ref: booking.referenceCode,

    // Pricing
    price: `€${booking.priceEur}.00`,
    price_eur: `€${booking.priceEur}.00`,
    payment_method: paymentLabel,
    payment_status: booking.paymentStatus === 'pago' ? 'Pago' : 'Pendente de liquidação',

    // Full text message for templates using a single {{message}} tag
    message: messageSummary,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.info('EmailJS confirmation sent successfully:', response.status, response.text);
    return {
      success: true,
      messageId: `${response.status}-${Date.now()}`,
    };
  } catch (err: any) {
    console.error('EmailJS error sending booking confirmation:', err);
    return {
      success: false,
      error: err?.text || err?.message || 'Falha no envio através do EmailJS',
    };
  }
}
