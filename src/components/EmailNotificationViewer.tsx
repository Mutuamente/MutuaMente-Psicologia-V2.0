import React, { useState } from 'react';
import { 
  Mail, 
  X, 
  CheckCircle2, 
  Clock, 
  Send, 
  Eye, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { CLINIC_INFO } from '../data/mockData';

export const EmailNotificationViewer: React.FC = () => {
  const { 
    selectedEmailForPreview, 
    setSelectedEmailForPreview, 
    emailNotifications,
    resendBookingEmail 
  } = useBooking();

  const [copiedLink, setCopiedLink] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  if (!selectedEmailForPreview) return null;

  const handleResend = () => {
    resendBookingEmail(selectedEmailForPreview.bookingId);
    setResendStatus('Email reenviado com sucesso para a caixa de correio!');
    setTimeout(() => setResendStatus(null), 3000);
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(selectedEmailForPreview.subject);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[92vh]">
        {/* Email Header */}
        <div className="bg-[#1C2C39] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#2A6496]/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2A6496] border border-[#C9A84C]/40 text-[#F5EED8] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">Sistema de Notificações Automáticas</h3>
                <span className="text-[10px] bg-[#2A6496] text-[#F5EED8] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" />
                  <span>Entregue</span>
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Visualização do email de confirmação enviado ao paciente
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedEmailForPreview(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Meta Bar */}
        <div className="bg-stone-50 p-4 border-b border-stone-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">De:</span>
              <span className="font-semibold text-stone-900">
                MutuaMente Psicologia &lt;{CLINIC_INFO.email}&gt;
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-mono">
              {new Date(selectedEmailForPreview.sentAt).toLocaleString('pt-PT')}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-stone-500 font-medium">Para:</span>
              <span className="font-semibold text-[#2A6496]">
                {selectedEmailForPreview.recipientName} &lt;{selectedEmailForPreview.recipientEmail}&gt;
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResend}
                className="text-[11px] font-semibold text-stone-700 bg-white hover:bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 transition cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3 text-[#2A6496]" />
                <span>Reenviar Agora</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
            <span className="text-stone-500 font-medium">Assunto:</span>
            <span className="font-bold text-stone-900 flex-1 truncate">
              {selectedEmailForPreview.subject}
            </span>
            <button
              onClick={handleCopySubject}
              className="text-stone-400 hover:text-stone-700 transition"
              title="Copiar assunto"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          {resendStatus && (
            <div className="p-2 rounded-lg bg-[#E8F1F8] text-[#1A4A72] text-[11px] font-medium text-center border border-[#B0D0EB]">
              ✓ {resendStatus}
            </div>
          )}
        </div>

        {/* HTML Email Body Container */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-100">
          <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: selectedEmailForPreview.htmlContent }}
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-stone-500">
            <ShieldCheck className="w-4 h-4 text-[#2A6496]" />
            <span>Sistema SMTP certificado com SPF, DKIM e DMARC</span>
          </div>

          <button
            onClick={() => setSelectedEmailForPreview(null)}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold transition cursor-pointer"
          >
            Fechar Pré-visualização
          </button>
        </div>
      </div>
    </div>
  );
};
