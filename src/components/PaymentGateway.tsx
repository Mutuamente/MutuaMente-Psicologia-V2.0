import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Clock, 
  AlertCircle, 
  Lock,
  ArrowRight,
  ExternalLink,
  Banknote,
  CalendarCheck
} from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentGatewayProps {
  amountEur: number;
  serviceTitle: string;
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  clientPhone: string;
  clientName: string;
  isSubmitting?: boolean;
  onPaymentComplete: (details: {
    transactionId: string;
    entity?: string;
    reference?: string;
    mbwayPhone?: string;
    paidAt?: string;
  }) => void;
}

export const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amountEur,
  serviceTitle,
  selectedMethod,
  onMethodChange,
  clientPhone,
  clientName,
  isSubmitting = false,
  onPaymentComplete
}) => {
  // MB WAY state
  const [mbwayPhone, setMbwayPhone] = useState(clientPhone.replace(/\D/g, '').slice(-9));
  const [mbwayStatus, setMbwayStatus] = useState<'idle' | 'waiting_approval' | 'approved'>('idle');
  const [mbwayTimer, setMbwayTimer] = useState(300); // 5 minutes countdown

  // Multibanco state
  const [copiedRef, setCopiedRef] = useState(false);
  const [mbEntity] = useState('21245');
  const [mbReference] = useState(() => `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`);

  // Credit Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState(clientName);
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [card3DModal, setCard3DModal] = useState(false);

  // MB WAY countdown
  useEffect(() => {
    let interval: any;
    if (mbwayStatus === 'waiting_approval' && mbwayTimer > 0) {
      interval = setInterval(() => {
        setMbwayTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mbwayStatus, mbwayTimer]);

  const handleStartMbway = () => {
    setMbwayStatus('waiting_approval');
    setMbwayTimer(300);
  };

  const handleConfirmMbwayPayment = () => {
    setMbwayStatus('approved');
    setTimeout(() => {
      onPaymentComplete({
        transactionId: `MBW-${Date.now()}`,
        mbwayPhone: mbwayPhone || clientPhone,
        paidAt: new Date().toISOString()
      });
    }, 900);
  };

  const handleConfirmMultibancoBooking = () => {
    onPaymentComplete({
      transactionId: `SIBS-MB-${Date.now()}`,
      entity: mbEntity,
      reference: mbReference
    });
  };

  const handleProcessCard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingCard(true);
    setTimeout(() => {
      setIsProcessingCard(false);
      setCard3DModal(true);
    }, 900);
  };

  const handleComplete3DSecure = () => {
    setCard3DModal(false);
    onPaymentComplete({
      transactionId: `CC-STRIPE-${Date.now()}`,
      paidAt: new Date().toISOString()
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Payment Methods Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <button
          type="button"
          onClick={() => onMethodChange('mbway')}
          className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            selectedMethod === 'mbway'
              ? 'border-[#2A6496] bg-[#E8F1F8]/80 text-[#1A4A72] ring-2 ring-[#2A6496]/20 font-semibold shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-[#E8F1F8]/40'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#E8F1F8] text-[#2A6496] flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <span className="text-xs">MB WAY</span>
          <span className="text-[10px] text-[#2A6496] font-bold uppercase">Portugal</span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange('multibanco')}
          className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            selectedMethod === 'multibanco'
              ? 'border-[#2A6496] bg-[#E8F1F8]/80 text-[#1A4A72] ring-2 ring-[#2A6496]/20 font-semibold shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-[#E8F1F8]/40'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
            <Building2 className="w-4 h-4" />
          </div>
          <span className="text-xs">Multibanco</span>
          <span className="text-[10px] text-stone-500 font-medium">Referência</span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange('cartao')}
          className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            selectedMethod === 'cartao'
              ? 'border-[#2A6496] bg-[#E8F1F8]/80 text-[#1A4A72] ring-2 ring-[#2A6496]/20 font-semibold shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-[#E8F1F8]/40'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <span className="text-xs">Cartão</span>
          <span className="text-[10px] text-stone-500 font-medium">Visa/MC</span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange('applepay')}
          className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
            selectedMethod === 'applepay'
              ? 'border-[#2A6496] bg-[#E8F1F8]/80 text-[#1A4A72] ring-2 ring-[#2A6496]/20 font-semibold shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-[#E8F1F8]/40'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs">Apple/GPay</span>
          <span className="text-[10px] text-stone-500 font-medium">1-Clique</span>
        </button>

        <button
          type="button"
          onClick={() => onMethodChange('pos_consulta')}
          className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 col-span-2 sm:col-span-1 ${
            selectedMethod === 'pos_consulta'
              ? 'border-[#C9A84C] bg-[#FDFBF7] text-[#9A7A2E] ring-2 ring-[#C9A84C]/30 font-semibold shadow-xs'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#F5EED8] text-[#9A7A2E] flex items-center justify-center">
            <Banknote className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold whitespace-nowrap">Após Consulta</span>
          <span className="text-[10px] text-[#9A7A2E] font-bold uppercase">No dia</span>
        </button>
      </div>

      {/* METHOD 1: MB WAY */}
      {selectedMethod === 'mbway' && (
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8D5A0]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#2C2822]">Pagamento instantâneo via MB WAY</h4>
              <p className="text-xs text-stone-600">
                Insira o seu número de telemóvel associado à app MB WAY.
              </p>
            </div>
            <span className="text-base font-bold text-[#2A6496]">€{amountEur}.00</span>
          </div>

          {mbwayStatus === 'idle' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Número de Telemóvel MB WAY (+351)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mbwayPhone}
                    onChange={(e) => setMbwayPhone(e.target.value)}
                    placeholder="965 197 069"
                    className="w-full text-sm font-medium py-2.5 px-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none text-stone-900"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartMbway}
                className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enviar Notificação para a App MB WAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {mbwayStatus === 'waiting_approval' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 animate-pulse">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-amber-900">Abra a sua aplicação MB WAY</h5>
                <p className="text-xs text-amber-800 mt-1 max-w-sm mx-auto">
                  Enviámos o pedido de autorização de <strong>€{amountEur}.00</strong> para o número <strong>{mbwayPhone}</strong>.
                </p>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-900 font-semibold">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Tempo restante para aprovação: {formatSeconds(mbwayTimer)}</span>
              </div>

              <div className="pt-2 border-t border-amber-200/80">
                <button
                  type="button"
                  onClick={handleConfirmMbwayPayment}
                  className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-bold shadow transition cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Já autorizei na app MB WAY • Concluir Marcação</span>
                </button>
              </div>
            </div>
          )}

          {mbwayStatus === 'approved' && (
            <div className="p-4 rounded-xl bg-[#E8F1F8] border border-[#B0D0EB] text-center text-[#1A4A72] space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#2A6496] mx-auto" />
              <h5 className="text-sm font-bold">Pagamento MB WAY Aprovado com Sucesso!</h5>
              <p className="text-xs text-[#2A6496]">A finalizar o agendamento e emitir a confirmação por email...</p>
            </div>
          )}
        </div>
      )}

      {/* METHOD 2: MULTIBANCO */}
      {selectedMethod === 'multibanco' && (
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8D5A0]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#2C2822]">Pagamento por Referência Multibanco</h4>
              <p className="text-xs text-stone-600">
                Pague através do seu homebanking ou em qualquer caixa Multibanco.
              </p>
            </div>
            <span className="text-base font-bold text-[#2C2822]">€{amountEur}.00</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 font-mono text-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 text-xs font-sans">Entidade:</span>
              <span className="font-bold text-stone-900">{mbEntity}</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 text-xs font-sans">Referência:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2A6496]">{mbReference}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(mbReference)}
                  className="p-1 text-stone-400 hover:text-stone-700 transition"
                  title="Copiar referência"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 text-xs font-sans">Montante:</span>
              <span className="font-bold text-[#2C2822]">€{amountEur}.00</span>
            </div>
          </div>

          {copiedRef && (
            <div className="text-center text-xs text-[#2A6496] font-medium">
              ✓ Referência copiada para a área de transferência!
            </div>
          )}

          <div className="text-[11px] text-stone-500 space-y-1">
            <p>• A referência é válida durante 24 horas.</p>
            <p>• A sua consulta ficará reservada e a confirmação é enviada automaticamente após o pagamento.</p>
          </div>

          <button
            type="button"
            onClick={handleConfirmMultibancoBooking}
            className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirmar Agendamento com Referência Multibanco</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* METHOD 3: CREDIT / DEBIT CARD */}
      {selectedMethod === 'cartao' && (
        <form onSubmit={handleProcessCard} className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8D5A0]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#2C2822]">Cartão de Crédito ou Débito</h4>
              <p className="text-xs text-stone-600">Processamento com encriptação SSL e 3D Secure.</p>
            </div>
            <span className="text-base font-bold text-[#2C2822]">€{amountEur}.00</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Nome no Cartão</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Número do Cartão</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4532 •••• •••• 9821"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2 pl-9 pr-3 rounded-lg border border-stone-300 bg-white font-mono focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                />
                <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Validade (MM/AA)</label>
                <input
                  type="text"
                  required
                  placeholder="12/28"
                  maxLength={5}
                  value={cardExp}
                  onChange={(e) => setCardExp(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white font-mono focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">CVC / CVV</label>
                <input
                  type="password"
                  required
                  placeholder="•••"
                  maxLength={4}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2 px-3 rounded-lg border border-stone-300 bg-white font-mono focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessingCard}
            className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] disabled:opacity-50 text-white text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
          >
            {isProcessingCard ? (
              <span>A comunicar com o emissor seguro...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pagar €{amountEur}.00 com Cartão</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* METHOD 4: APPLE PAY / GOOGLE PAY */}
      {selectedMethod === 'applepay' && (
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8D5A0]/80 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2C2822]">Apple Pay / Google Pay</h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto mt-1">
              Pague com autenticação biométrica (Face ID / Touch ID) sem partilhar os dados do cartão.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              onPaymentComplete({
                transactionId: `APAY-${Date.now()}`,
                paidAt: new Date().toISOString()
              });
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Pagar €{amountEur}.00 com 1-Clique</span>
          </button>
        </div>
      )}

      {/* METHOD 5: PAGAR APÓS CONSULTA */}
      {selectedMethod === 'pos_consulta' && (
        <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-[#E8D5A0]/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#2C2822]">Pagar após a Consulta</h4>
              <p className="text-xs text-stone-600">
                Sem pagamento antecipado. O valor é liquidado no final da sessão com a Dra. Sofia Godinho Cabrita.
              </p>
            </div>
            <span className="text-base font-bold text-[#2A6496]">€{amountEur}.00</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E8D5A0]/60 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F5EED8] text-[#9A7A2E] flex items-center justify-center shrink-0 mt-0.5 border border-[#E8D5A0]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs text-stone-700 space-y-2">
                <p className="font-semibold text-[#2C2822]">Como funciona o pagamento após a consulta:</p>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex items-start gap-2">
                    <span className="text-[#2A6496] font-bold">•</span>
                    <span><strong>Consultas Presenciais (Lisboa):</strong> Pagamento no consultório ao terminar a sessão, através de numerário, MB WAY ou Multibanco.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2A6496] font-bold">•</span>
                    <span><strong>Videoconsultas (Online):</strong> Após o término da consulta, receberá por email e WhatsApp os dados para liquidação cómoda via MB WAY ou IBAN.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2A6496] font-bold">•</span>
                    <span><strong>Recibo Verde Eletrónico (IRS):</strong> O respetivo Recibo Verde oficial da Autoridade Tributária com o seu NIF ser-lhe-á enviado diretamente por email pela Dra. Sofia Godinho Cabrita após a liquidação dos honorários.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#E8F1F8]/80 border border-[#B0D0EB]/80 text-[11px] text-[#1A4A72] flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-[#2A6496] shrink-0" />
            <span>A sua vaga fica <strong>100% confirmada na agenda</strong> da Dra. Sofia Godinho Cabrita com envio imediato de email de confirmação.</span>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => {
              if (isSubmitting) return;
              onPaymentComplete({
                transactionId: `POS-CONSULTA-${Date.now()}`
              });
            }}
            className={`w-full py-3 px-4 rounded-xl text-white text-sm font-semibold shadow transition flex items-center justify-center gap-2 ${
              isSubmitting 
                ? 'bg-stone-500 cursor-not-allowed opacity-75' 
                : 'bg-[#2A6496] hover:bg-[#1A4A72] cursor-pointer'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#F5EED8]" />
            <span>{isSubmitting ? 'A registar consulta...' : 'Confirmar Agendamento (Pagar Após Consulta)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3D Secure Simulation Modal */}
      {card3DModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#2C2822]">Verificação 3D Secure</h4>
              <p className="text-xs text-stone-600 mt-1">
                O seu banco solicita a confirmação da transação de <strong>€{amountEur}.00</strong> para <strong>MutuaMente Psicologia</strong>.
              </p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 font-mono">
              Código de segurança enviado por SMS para o telemóvel associado ao cartão.
            </div>
            <button
              type="button"
              onClick={handleComplete3DSecure}
              className="w-full py-2.5 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow cursor-pointer"
            >
              Autorizar Pagamento Seguro
            </button>
          </div>
        </div>
      )}

      {/* Legal & Fiscal Notice */}
      <div className="text-[11px] text-stone-500 flex items-start gap-2 bg-stone-100/80 p-3 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-[#2A6496] shrink-0 mt-0.5" />
        <div>
          <strong>Emissão de Recibo Verde Oficial (AT):</strong> Os atos clínicos de psicologia praticados pela Dra. Sofia Godinho Cabrita (Cédula OPP 15786) estão isentos de IVA ao abrigo do Artigo 9.º do Código do IVA. O <strong>Recibo Verde Eletrónico oficial</strong> com o seu NIF ser-lhe-á enviado diretamente pela Dra. Sofia após a consulta/liquidação, ficando automaticamente elegível para dedução como Despesa de Saúde no seu IRS (e-Fatura) e para comparticipação em subsistemas e seguros (ADSE, Médis, Multicare, etc.).
        </div>
      </div>
    </div>
  );
};
