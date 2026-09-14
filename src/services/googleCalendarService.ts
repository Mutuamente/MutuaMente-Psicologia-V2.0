import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut, 
  User 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Booking } from '../types';

export const CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events'
];

const provider = new GoogleAuthProvider();
CALENDAR_SCOPES.forEach((scope) => provider.addScope(scope));

// In-memory token caching (never stored in localStorage or sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Falha ao obter token de acesso Google Calendar');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Erro no login Google Calendar:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logoutGoogle = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface CalendarEventResult {
  eventId: string;
  htmlLink: string;
  meetLink?: string;
}

/**
 * Creates a Google Calendar event on the therapist's primary Google Calendar.
 * If the appointment is online, it automatically provisions a real Google Meet video conference link
 * and sends an invite with updates to the patient's email.
 */
export const createGoogleCalendarEvent = async (
  booking: Booking,
  token: string
): Promise<CalendarEventResult> => {
  // Format start and end date times in ISO 8601
  const startDateTimeStr = `${booking.date}T${booking.time}:00`;
  const startDate = new Date(startDateTimeStr);
  const duration = booking.durationMinutes || 50;
  const endDate = new Date(startDate.getTime() + duration * 60000);

  // Pad helper
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatIsoWithTz = (d: Date) => {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  };

  const isOnline = booking.modality === 'online';

  const requestBody: any = {
    summary: `${isOnline ? 'Videoconsulta' : 'Consulta Presencial'} - ${booking.client.name} (MutuaMente)`,
    description: `Consulta agendada no consultório MutuaMente Psicologia com a Dra. Sofia Godinho Cabrita.\n\n` +
      `Utente: ${booking.client.name}\n` +
      `Email: ${booking.client.email}\n` +
      `Telefone: ${booking.client.phone}\n` +
      `Referência: ${booking.referenceCode}\n` +
      `Modalidade: ${isOnline ? 'Online (Videoconsulta Google Meet)' : 'Presencial em Lisboa (Av. Duque de Ávila 22, Saldanha)'}\n` +
      `Duração: ${duration} minutos\n` +
      `Preço: €${booking.priceEur}.00 (Isento Art. 9º CIVA)\n` +
      `Notas Clínicas Prévias: ${booking.client.notes || 'Sem observações'}\n\n` +
      `MutuaMente Psicologia • Cédula OPP 15786`,
    start: {
      dateTime: `${formatIsoWithTz(startDate)}+01:00`,
      timeZone: 'Europe/Lisbon'
    },
    end: {
      dateTime: `${formatIsoWithTz(endDate)}+01:00`,
      timeZone: 'Europe/Lisbon'
    },
    location: isOnline ? 'Google Meet Videoconferência' : 'Av. Duque de Ávila 22, 1050-083 Lisboa',
    attendees: [
      {
        email: booking.client.email,
        displayName: booking.client.name,
        responseStatus: 'needsAction'
      }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 1440 }, // 24 hours
        { method: 'popup', minutes: 30 }    // 30 mins
      ]
    }
  };

  if (isOnline) {
    requestBody.conferenceData = {
      createRequest: {
        requestId: `meet-${booking.id}-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    };
  }

  const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('Google Calendar API error:', errText);
    throw new Error(`Erro ao criar evento no Google Calendar: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Extract Google Meet link if present
  let meetLink = data.hangoutLink;
  if (!meetLink && data.conferenceData?.entryPoints) {
    const videoEntry = data.conferenceData.entryPoints.find((ep: any) => ep.entryPointType === 'video');
    if (videoEntry?.uri) {
      meetLink = videoEntry.uri;
    }
  }

  return {
    eventId: data.id,
    htmlLink: data.htmlLink,
    meetLink: meetLink || booking.meetingUrl
  };
};

/**
 * Removes an event from Google Calendar (requires user confirmation before calling)
 */
export const deleteGoogleCalendarEvent = async (
  eventId: string,
  token: string
): Promise<void> => {
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?sendUpdates=all`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Erro ao remover evento do Google Calendar: ${response.status}`);
  }
};
