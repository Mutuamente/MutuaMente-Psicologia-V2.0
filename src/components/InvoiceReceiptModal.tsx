import React from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, FileText, AlertCircle } from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { useBooking } from '../context/BookingContext';
import { CLINIC_INFO, SERVICES, SPECIALISTS } from '../data/mockData';

export const InvoiceReceiptModal: React.FC = () => {
  const { selectedBookingForReceipt, setSelectedBookingForReceipt } = useBooking();

  if (!selectedBookingForReceipt) return null;

  const b = selectedBookingForReceipt;
  const service = SERVICES.find((s) => s.id === b.serviceId);
  const specialist = SPECIALISTS.find((sp) => sp.id === b.specialistId) || SPECIALISTS[0];

  const isPaid = b.paymentStatus === 'pago';
  const emissionYear = new Date().getFullYear();
  const receiptNumber = `${emissionYear}/${b.referenceCode.replace('MUT-', '')}`;
  const validationCode = `AT-RV${b.referenceCode.replace('MUT-', '')}-${emissionYear}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col print:border-none print:shadow-none print:max-w-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Toolbar (hidden when printing) */}
        <div className="bg-[#1C2C39] text-white px-6 py-4 flex items-center justify-between print:hidden border-b border-[#2A6496]/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#2A6496] border border-[#C9A84C]/40 text-[#F5EED8] flex items-center justify-center font-bold text-xs">
              <MutuaMenteSymbol className="w-4 h-4 text-[#C9A84C]" />
            </div>
            <div>
              <div className="font-serif-display text-sm font-bold flex items-center gap-2">
                <span>Dados de Apoio à Emissão de Recibo Verde</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  isPaid 
                    ? 'bg-[#2A6496] text-[#F5EED8] border border-[#C9A84C]/40' 
                    : 'bg-amber-900/80 text-amber-300 border border-amber-700/50'
                }`}>
                  {isPaid ? 'Honorários Liquidados' : 'Pendente de Consulta'}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">Minuta clínica com NIF para emissão no Portal das Finanças (AT) e posterior envio ao utente</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[#C9A84C]" />
              <span>Imprimir / Guardar PDF</span>
            </button>

            <button
              onClick={() => setSelectedBookingForReceipt(null)}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Recibo Verde Document */}
        <div className="p-6 sm:p-8 space-y-5 text-stone-800 text-xs bg-white">
          
          {/* Official AT Header */}
          <div className="border border-stone-300 rounded-2xl p-5 bg-stone-50/50 relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                {/* Visual Official Emblem Stamp */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C2C39] via-[#2A6496] to-[#1C2C39] text-white flex flex-col items-center justify-center shadow-xs border border-[#C9A84C]/40 shrink-0">
                  <div className="w-6 h-6 rounded-full border border-[#C9A84C] flex items-center justify-center text-[9px] font-bold text-[#F5EED8]">
                    RP
                  </div>
                  <span className="text-[8px] tracking-widest font-mono text-[#F5EED8] font-bold mt-0.5">AT</span>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-600">
                    República Portuguesa • Autoridade Tributária e Aduaneira
                  </div>
                  <h1 className="font-serif-display text-base sm:text-lg font-bold text-stone-900 leading-tight">
                    Recibo Verde Eletrónico / Fatura-Recibo
                  </h1>
                  <p className="text-[11px] text-stone-500">
                    Portal das Finanças • Emissão nos termos do art. 115.º do CIRS e art. 29.º do CIVA
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right bg-white p-2.5 rounded-xl border border-stone-200 shadow-2xs shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  Número do Documento
                </span>
                <span className="text-sm font-bold text-[#2A6496] font-mono">
                  N.º {receiptNumber}
                </span>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  Emissão: <strong className="text-stone-700">{b.date}</strong>
                </div>
              </div>
            </div>

            {/* Status Banner */}
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5">
                {isPaid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#2A6496]" />
                    <span className="font-semibold text-[#1A4A72]">
                      Recibo de Quitação • Valor Total Liquidado com Sucesso
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-amber-900">
                      Registo Prévio de Consulta • O Recibo Verde definitivo será emitido na AT após a consulta
                    </span>
                  </>
                )}
              </div>
              <span className="font-mono text-[10px] text-stone-400 hidden sm:inline">
                Validação: {validationCode}
              </span>
            </div>
          </div>

          {/* 1. Prestador de Serviços & 2. Adquirente (2-column layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Prestador */}
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-1.5">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7A2E]">
                  1. Prestador de Serviços (Trabalhador Independente)
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#2A6496]" />
              </div>
              <div className="text-xs font-bold text-stone-900">
                Sofia de Fátima Godinho Cabrita
              </div>
              <div className="text-[11px] text-stone-600">
                NIF: <strong className="font-mono text-stone-900">249 810 345</strong>
              </div>
              <div className="text-[11px] text-stone-600">
                Cédula Profissional: <strong className="text-[#2A6496]">OPP n.º 15786</strong>
              </div>
              <div className="text-[11px] text-stone-600">
                Atividade / CIRS: <strong className="text-stone-800">1519 - Psicólogos</strong> (CAE 86906)
              </div>
              <div className="text-[10px] text-stone-500 pt-0.5 leading-snug">
                {CLINIC_INFO.address.street}, {CLINIC_INFO.address.postalCode} Lisboa
              </div>
            </div>

            {/* Adquirente */}
            <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-1.5">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A7A2E]">
                  2. Adquirente dos Serviços (Utente)
                </span>
                <span className="text-[10px] text-stone-400 font-mono">Consumidor</span>
              </div>
              <div className="text-xs font-bold text-stone-900">
                {b.client.name}
              </div>
              <div className="text-[11px] text-stone-600">
                NIF: <strong className="font-mono text-stone-900">{b.client.nif || 'Consumidor Final'}</strong>
              </div>
              <div className="text-[11px] text-stone-600">
                Email: {b.client.email}
              </div>
              <div className="text-[11px] text-stone-600">
                Contacto: {b.client.phone}
              </div>
              <div className="text-[10px] text-stone-500 pt-0.5">
                País: Portugal • Referência: <span className="font-mono">{b.referenceCode}</span>
              </div>
            </div>
          </div>

          {/* 3. Descrição do Ato Clínico */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-100/80 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-stone-600 border-b border-stone-200">
              3. Descrição dos Atos Clínicos Prestados
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 text-[10px] font-semibold bg-stone-50">
                  <th className="py-2 px-4 text-left">Ato Clínico / Consulta</th>
                  <th className="py-2 px-2 text-center">Data & Hora</th>
                  <th className="py-2 px-2 text-center">Regime IVA</th>
                  <th className="py-2 px-4 text-right">Valor Líquido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                <tr>
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900 text-xs">
                      {service?.title || 'Consulta de Psicologia Clínica'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Ato de saúde praticado por Dra. Sofia Godinho Cabrita (Cédula OPP 15786)
                    </div>
                    <div className="text-[10px] text-[#2A6496] font-medium mt-0.5">
                      Modalidade: {b.modality === 'online' ? 'Videoconsulta Segura (Telepsicologia)' : 'Presencial (Gabinete Lisboa)'} • {b.durationMinutes} min
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-mono text-[11px]">
                    {b.date}<br/>{b.time}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-block bg-[#E8F1F8] text-[#2A6496] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#B0D0EB]">
                      Isento Art. 9º CIVA
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-stone-900 text-sm">
                    €{b.priceEur},00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 4. Enquadramento Fiscal e Resumo Financeiro */}
          <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-[11px] text-stone-600">
                <div className="font-bold text-stone-800 text-xs">
                  Enquadramento Fiscal (Autoridade Tributária)
                </div>
                <p>
                  <strong>Regime de IVA:</strong> Isenção nos termos do artigo 9.º do Código do IVA (prestações de serviços de saúde humana por profissional habilitado).
                </p>
                <p>
                  <strong>Regime de IRS:</strong> Sem retenção - art. 101.º-B, n.º 1, alínea a) do CIRS (dispensa de retenção na fonte).
                </p>
                <p>
                  <strong>Forma de Liquidação:</strong>{' '}
                  {b.paymentMethod === 'pos_consulta'
                    ? 'A liquidar no término da consulta'
                    : `${b.paymentMethod.toUpperCase()} (Ref: ${b.paymentReference?.transactionId || b.referenceCode})`}
                </p>
              </div>

              {/* Values Table */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-1 text-[11px] shadow-2xs">
                <div className="flex justify-between text-stone-600">
                  <span>Valor dos Honorários:</span>
                  <span className="font-mono font-medium">€{b.priceEur},00</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Imposto sobre o Valor Acrescentado (IVA 0%):</span>
                  <span className="font-mono font-medium">€0,00</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Retenção na Fonte de IRS:</span>
                  <span className="font-mono font-medium">€0,00</span>
                </div>
                <div className="border-t border-stone-200 pt-1.5 mt-1.5 flex justify-between items-center">
                  <span className="font-bold text-stone-900 text-xs">
                    {isPaid ? 'Valor Total Recebido:' : 'Valor Total a Liquidar:'}
                  </span>
                  <span className="text-base font-bold text-[#2A6496] font-mono">
                    €{b.priceEur},00
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Dedução no IRS & Reembolsos */}
          <div className="p-3.5 rounded-2xl bg-[#E8F1F8] border border-[#B0D0EB] text-[11px] text-[#1C2C39] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#2A6496] text-xs">
              <ShieldCheck className="w-4 h-4 text-[#2A6496] shrink-0" />
              <span>Dedução Fiscal no IRS & Reembolso em Seguros de Saúde</span>
            </div>
            <p className="leading-relaxed text-[#1A4A72]">
              • <strong>e-Fatura (IRS):</strong> Este recibo verde com o seu NIF fica registado no sistema da Autoridade Tributária no setor de <strong>Despesas de Saúde</strong>, conferindo a respetiva dedução à coleta de 15% em sede de IRS.
            </p>
            <p className="leading-relaxed text-[#1A4A72]">
              • <strong>Seguros & Subsistemas:</strong> Documento oficial emitido com número de Cédula Profissional da Ordem dos Psicólogos Portugueses (OPP n.º 15786), válido para pedidos de comparticipação e reembolso na <strong>ADSE, Médis, Multicare, AdvanceCare, SAMS</strong> e seguradoras congéneres.
            </p>
          </div>

          {/* 6. Footer Signature & Verification */}
          <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] text-stone-400">
            <div className="text-center sm:text-left">
              Documento oficial da <strong>Autoridade Tributária e Aduaneira</strong> emitido em Portugal.<br/>
              MutuaMente Psicologia • {CLINIC_INFO.email} • {CLINIC_INFO.phoneFormatted}
            </div>
            
            {/* Visual QR Verification Box */}
            <div className="flex items-center gap-2 bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200 text-stone-600 font-mono text-[9px]">
              <div className="w-7 h-7 bg-[#1C2C39] text-[#F5EED8] flex items-center justify-center rounded text-[8px] font-bold">
                QR
              </div>
              <div>
                <span className="font-bold text-stone-800 block">AT-VALID</span>
                <span>{b.referenceCode}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

