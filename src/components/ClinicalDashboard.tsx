import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  DollarSign, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  Settings, 
  Trash2, 
  Eye, 
  Plus, 
  Download, 
  UserCheck, 
  ChevronRight,
  ExternalLink,
  Lock,
  ShieldCheck,
  EyeOff,
  Key
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { useBooking } from '../context/BookingContext';
import { SERVICES, SPECIALISTS, CLINIC_INFO } from '../data/mockData';
import { Booking, BookingStatus, ServiceId } from '../types';

export const ClinicalDashboard: React.FC = () => {
  const { 
    isDashboardOpen, 
    setIsDashboardOpen, 
    bookings, 
    updateBookingStatus, 
    updateClinicalNotes, 
    deleteBooking,
    resendBookingEmail,
    emailNotifications,
    setSelectedBookingForReceipt,
    setSelectedEmailForPreview,
    setIsBookingOpen,
    isClinicalAuthenticated,
    authenticateClinical,
    logoutClinical,
    updateClinicalPassword
  } = useBooking();

  const [activeTab, setActiveTab] = useState<'consultas' | 'notificacoes' | 'agenda' | 'configuracoes'>('consultas');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todas');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Password Access Gate state
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Settings tab password change state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdChangeMessage, setPwdChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isDashboardOpen) return null;

  // Render Password Access Gate if not authenticated
  if (!isClinicalAuthenticated) {
    const handlePasswordSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!passwordInput.trim()) {
        setPasswordError('Por favor introduza a palavra-passe.');
        return;
      }
      const success = authenticateClinical(passwordInput);
      if (!success) {
        setPasswordError('Palavra-passe incorreta. Por favor tente novamente.');
      } else {
        setPasswordInput('');
        setPasswordError(null);
      }
    };

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#1C2C39] text-white p-6 text-center relative border-b border-[#2A6496]/40">
            <button
              onClick={() => setIsDashboardOpen(false)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition cursor-pointer"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-2xl bg-[#2A6496] border border-[#C9A84C]/40 text-[#F5EED8] flex items-center justify-center mx-auto mb-3 shadow-inner">
              <MutuaMenteSymbol className="w-6 h-6 text-[#C9A84C]" />
            </div>
            <h2 className="font-serif-display text-xl font-bold">Área Clínica Reservada</h2>
            <p className="text-xs text-stone-300 mt-1">Dra. Sofia Godinho Cabrita • Cédula OPP n.º 15786</p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-stone-600 space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-[#2A6496] shrink-0" />
                <span>Sigilo Profissional & Proteção de Dados</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-500">
                Este painel contém processos clínicos, notas confidenciais de sessões e dados fiscais de utentes protegidos pelo Código Deontológico da OPP e pelo RGPD.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Palavra-passe de Acesso
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(null);
                    }}
                    autoFocus
                    placeholder="Introduza a sua palavra-passe"
                    className="w-full py-2.5 pl-3 pr-10 rounded-xl border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2A6496]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-semibold">{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-sm font-semibold shadow transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#C9A84C]" />
                <span>Desbloquear Painel Clínico</span>
              </button>
            </form>

            <div className="pt-2 border-t border-stone-100 text-center text-[11px] text-stone-400">
              <span>Acesso restrito ao corpo clínico da MutuaMente Psicologia</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // KPI Calculations
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmada' || b.status === 'concluida').length;
  const pendingPayments = bookings.filter((b) => b.paymentStatus === 'pendente').length;
  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === 'pago')
    .reduce((acc, curr) => acc + curr.priceEur, 0);

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.client.nif && b.client.nif.includes(searchTerm));

    const matchesStatus = statusFilter === 'todas' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getServiceName = (id: ServiceId) => {
    return SERVICES.find((s) => s.id === id)?.title || id;
  };

  const getSpecialistName = (id: string) => {
    return SPECIALISTS.find((sp) => sp.id === id)?.name || id;
  };

  const handleOpenNotes = (booking: Booking) => {
    setEditingNotesId(booking.id);
    setTempNotes(booking.clinicalNotes || '');
  };

  const handleSaveNotes = (id: string) => {
    updateClinicalNotes(id, tempNotes);
    setEditingNotesId(null);
  };

  const exportCsv = () => {
    const headers = 'Referencia,Data,Hora,Cliente,Email,Telemovel,NIF,Servico,Especialista,Preco,Estado,Pagamento\n';
    const rows = bookings.map((b) => 
      `"${b.referenceCode}","${b.date}","${b.time}","${b.client.name}","${b.client.email}","${b.client.phone}","${b.client.nif || ''}","${getServiceName(b.serviceId)}","${getSpecialistName(b.specialistId)}","${b.priceEur}","${b.status}","${b.paymentMethod}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mutuamente-consultas-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-3xl max-w-6xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col h-[94vh]">
        {/* Dashboard Top Header */}
        <div className="bg-[#1C2C39] text-white px-6 py-5 flex items-center justify-between border-b border-[#2A6496]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2A6496] border border-[#C9A84C]/40 text-[#F5EED8] flex items-center justify-center">
              <MutuaMenteSymbol className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-display text-lg sm:text-xl font-bold">Painel Clínico & Gestão</h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#2A6496]/40 text-[#F5EED8] border border-[#C9A84C]/30">
                  MutuaMente Psicologia
                </span>
              </div>
              <p className="text-xs text-stone-300">
                Acompanhamento operacional, agendamentos em tempo real e notificações automáticas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsDashboardOpen(false);
                setIsBookingOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#C9A84C] hover:bg-[#B3933C] text-[#1C2C39] text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Novo Agendamento</span>
            </button>

            <button
              type="button"
              onClick={logoutClinical}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-rose-900/80 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 hover:border-rose-700 transition cursor-pointer"
              title="Bloquear painel clínico e terminar sessão"
            >
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Bloquear</span>
            </button>

            <button
              onClick={() => setIsDashboardOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('consultas')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'consultas'
                  ? 'bg-white text-[#2A6496] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-[#2A6496]" />
              <span>Consultas & Sessões ({bookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('notificacoes')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'notificacoes'
                  ? 'bg-white text-[#2A6496] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#2A6496]" />
              <span>Notificações Automáticas ({emailNotifications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('agenda')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'agenda'
                  ? 'bg-white text-[#2A6496] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-[#2A6496]" />
              <span>Horários & Calendário</span>
            </button>

            <button
              onClick={() => setActiveTab('configuracoes')}
              className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'configuracoes'
                  ? 'bg-white text-[#2A6496] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-stone-500" />
              <span>Configurações & SIBS</span>
            </button>
          </div>

          <button
            onClick={exportCsv}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 transition flex items-center gap-1 shrink-0 cursor-pointer"
            title="Exportar dados para folha de cálculo"
          >
            <Download className="w-3.5 h-3.5 text-[#2A6496]" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: CONSULTAS */}
          {activeTab === 'consultas' && (
            <div className="space-y-6">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Total Consultas</span>
                  <div className="text-2xl font-bold text-stone-900 mt-1">{totalBookings}</div>
                  <span className="text-[11px] text-[#2A6496] font-medium">Registadas na plataforma</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Confirmadas</span>
                  <div className="text-2xl font-bold text-[#2A6496] mt-1">{confirmedBookings}</div>
                  <span className="text-[11px] text-stone-500 font-medium">Sessões ativas no calendário</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Pendentes Pagamento</span>
                  <div className="text-2xl font-bold text-amber-700 mt-1">{pendingPayments}</div>
                  <span className="text-[11px] text-stone-500 font-medium">A aguardar liquidação SIBS</span>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Recibos Verdes Liquidados</span>
                  <div className="text-2xl font-bold text-stone-900 mt-1">€{totalRevenue}.00</div>
                  <span className="text-[11px] text-[#2A6496] font-medium">Honorários pagos (CIVA Art. 9º)</span>
                </div>
              </div>

              {/* Filters & Search Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Pesquisar por nome, NIF, ref, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs py-2 pl-9 pr-3 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-stone-500 hidden sm:inline" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-xs font-medium py-2 px-3 rounded-xl border border-stone-300 bg-white focus:outline-none w-full sm:w-auto"
                  >
                    <option value="todas">Todos os Estados</option>
                    <option value="confirmada">Confirmada</option>
                    <option value="pendente_pagamento">Pendente de Pagamento</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-stone-100/80 text-stone-600 font-semibold border-b border-stone-200">
                        <th className="py-3 px-4">Ref. / Data</th>
                        <th className="py-3 px-4">Paciente</th>
                        <th className="py-3 px-4">Especialidade / Terapeuta</th>
                        <th className="py-3 px-4">Modalidade</th>
                        <th className="py-3 px-4">Valor & Pagamento</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-stone-500">
                            Nenhum agendamento encontrado com os filtros aplicados.
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map((b) => {
                          const isOnline = b.modality === 'online';

                          return (
                            <tr key={b.id} className="hover:bg-stone-50/70 transition">
                              <td className="py-3.5 px-4 font-mono">
                                <span className="font-bold text-stone-900">{b.referenceCode}</span>
                                <div className="text-[11px] text-stone-500 font-sans mt-0.5">
                                  {b.date} às {b.time}
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-stone-900 block">{b.client.name}</span>
                                <span className="text-[11px] text-stone-500 block">{b.client.email}</span>
                                <span className="text-[10px] text-stone-400 block">{b.client.phone} {b.client.nif ? `• NIF ${b.client.nif}` : ''}</span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="font-medium text-stone-900 block">{getServiceName(b.serviceId)}</span>
                                <span className="text-[11px] text-[#2A6496] font-semibold block">{getSpecialistName(b.specialistId)}</span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                  isOnline 
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200' 
                                    : 'bg-[#E8F1F8] text-[#2A6496] border border-[#B0D0EB]'
                                }`}>
                                  {isOnline ? 'Online' : 'Presencial'}
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className="font-bold text-stone-900 block">€{b.priceEur}.00</span>
                                <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                                  {b.paymentMethod === 'pos_consulta' ? 'Pós-Consulta' : b.paymentMethod} • {b.paymentStatus}
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                <select
                                  value={b.status}
                                  onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                                  className={`text-[11px] font-semibold py-1 px-2 rounded-lg border focus:outline-none ${
                                    b.status === 'confirmada'
                                      ? 'bg-[#E8F1F8] text-[#2A6496] border-[#B0D0EB]'
                                      : b.status === 'pendente_pagamento'
                                      ? 'bg-amber-50 text-amber-900 border-amber-200'
                                      : b.status === 'concluida'
                                      ? 'bg-stone-100 text-stone-800 border-stone-300'
                                      : 'bg-rose-50 text-rose-800 border-rose-200'
                                  }`}
                                >
                                  <option value="confirmada">Confirmada</option>
                                  <option value="pendente_pagamento">Pendente</option>
                                  <option value="concluida">Concluída</option>
                                  <option value="cancelada">Cancelada</option>
                                </select>
                              </td>

                              <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                                {/* Email confirmation preview & resend */}
                                <button
                                  onClick={() => {
                                    const email = emailNotifications.find((e) => e.bookingId === b.id);
                                    if (email) setSelectedEmailForPreview(email);
                                    else resendBookingEmail(b.id);
                                  }}
                                  className="p-1.5 rounded-lg text-stone-500 hover:text-[#2A6496] hover:bg-stone-100 transition"
                                  title="Ver Notificação de Email Enviada"
                                >
                                  <Mail className="w-4 h-4" />
                                </button>

                                {/* Clinical session notes */}
                                <button
                                  onClick={() => handleOpenNotes(b)}
                                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
                                  title="Notas Clínicas Confidenciais"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>

                                {/* Recibo Verde Eletrónico */}
                                <button
                                  onClick={() => setSelectedBookingForReceipt(b)}
                                  className="p-1.5 rounded-lg text-[#2A6496] hover:text-[#1A4A72] hover:bg-[#E8F1F8] transition"
                                  title="Ver / Emitir Recibo Verde Eletrónico (Portal das Finanças / AT)"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => {
                                    if (confirm(`Pretende remover o registo da consulta ${b.referenceCode}?`)) {
                                      deleteBooking(b.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-stone-100 transition"
                                  title="Remover registo"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notes Modal */}
              {editingNotesId && (
                <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-stone-900">
                        Notas Clínicas da Sessão (Confidencial)
                      </h4>
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="p-1 text-stone-400 hover:text-stone-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-500">
                      Registo interno reservado ao psicólogo responsável. Protegido pelo dever de sigilo do Código Deontológico da OPP.
                    </p>

                    <textarea
                      rows={5}
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Anote aqui as observações clínicas, hipóteses diagnósticas e objetivos para a próxima sessão..."
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingNotesId(null)}
                        className="px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveNotes(editingNotesId)}
                        className="px-4 py-2 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold shadow"
                      >
                        Guardar Notas Clínicas
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: NOTIFICAÇÕES AUTOMÁTICAS */}
          {activeTab === 'notificacoes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    Registo do Sistema de Notificações Automáticas
                  </h3>
                  <p className="text-xs text-stone-500">
                    Monitorize todos os emails de confirmação, lembretes de consulta e faturas enviados.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A6496] bg-[#E8F1F8] px-3 py-1 rounded-full border border-[#B0D0EB]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496]" />
                    <span>Disparador SMTP Ativo</span>
                  </span>
                </div>
              </div>

              {/* Notification Rules Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#2A6496] bg-[#E8F1F8] px-2 py-0.5 rounded border border-[#B0D0EB]">Gatilho 1</span>
                  <h5 className="text-xs font-bold text-stone-900 mt-1">Confirmação Imediata</h5>
                  <p className="text-[11px] text-stone-500">
                    Disparo instantâneo após conclusão do agendamento com resumo e link do gabinete.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#9A7A2E] bg-[#F5EED8] px-2 py-0.5 rounded border border-[#E8D5A0]">Gatilho 2</span>
                  <h5 className="text-xs font-bold text-stone-900 mt-1">Lembrete 24 Horas</h5>
                  <p className="text-[11px] text-stone-500">
                    Notificação automática 24h antes da hora marcada para diminuir faltas (no-shows).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#1C2C39] bg-stone-200 px-2 py-0.5 rounded border border-stone-300">Gatilho 3</span>
                  <h5 className="text-xs font-bold text-stone-900 mt-1">Recibo Verde Eletrónico</h5>
                  <p className="text-[11px] text-stone-500">
                    Disponibilização do Recibo Verde oficial com NIF e Cédula OPP para o e-Fatura e seguradora.
                  </p>
                </div>
              </div>

              {/* List of Sent Emails */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                <div className="p-4 bg-stone-100/70 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-700">
                  <span>Histórico de Notificações Enviadas ({emailNotifications.length})</span>
                  <span className="text-stone-500 font-normal">Atualizado em tempo real</span>
                </div>

                <div className="divide-y divide-stone-100 text-xs">
                  {emailNotifications.map((notif) => (
                    <div key={notif.id} className="p-4 hover:bg-stone-50/80 transition flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F1F8] text-[#2A6496] flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900">{notif.subject}</span>
                            <span className="text-[10px] bg-[#E8F1F8] text-[#2A6496] border border-[#B0D0EB] font-semibold px-1.5 py-0.2 rounded">
                              {notif.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 mt-0.5">
                            Destinatário: <strong className="text-stone-700">{notif.recipientName}</strong> &lt;{notif.recipientEmail}&gt; • Enviado a {new Date(notif.sentAt).toLocaleString('pt-PT')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedEmailForPreview(notif)}
                          className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition cursor-pointer flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Email HTML</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AGENDA & CALENDAR */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-stone-900">Agenda Clínica — Dra. Sofia Godinho Cabrita</h3>
                <p className="text-xs text-stone-500">
                  Gestão e acompanhamento em tempo real das consultas agendadas presenciais e online (Cédula OPP n.º 15786).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SPECIALISTS.map((sp) => {
                  const spBookings = bookings.filter((b) => b.specialistId === sp.id);

                  return (
                    <div key={sp.id} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={sp.photoUrl}
                          alt={sp.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-stone-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{sp.name}</h4>
                          <span className="text-[10px] text-[#2A6496] font-medium">{sp.oppNumber}</span>
                        </div>
                      </div>

                      <div className="text-xs font-semibold text-stone-700 border-t border-stone-200/60 pt-3">
                        Consultas Agendadas ({spBookings.length}):
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {spBookings.length === 0 ? (
                          <div className="text-center py-4 text-[11px] text-stone-400">
                            Sem marcações para este período.
                          </div>
                        ) : (
                          spBookings.map((b) => (
                            <div key={b.id} className="p-3 bg-white rounded-xl border border-stone-200 text-xs shadow-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-stone-900">{b.date} às {b.time}</span>
                                <span className="text-[10px] font-semibold text-[#2A6496] bg-[#E8F1F8] px-1.5 py-0.5 rounded border border-[#B0D0EB]">
                                  {b.modality.toUpperCase()}
                                </span>
                              </div>
                              <div className="text-[11px] text-stone-600 font-medium">
                                {b.client.name}
                              </div>
                              <div className="text-[10px] text-stone-400">
                                Ref: {b.referenceCode} • €{b.priceEur}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CONFIGURAÇÕES & SIBS */}
          {activeTab === 'configuracoes' && (
            <div className="space-y-6 max-w-3xl">
              <div>
                <h3 className="text-base font-bold text-stone-900">Configurações Clínicas & Pagamentos</h3>
                <p className="text-xs text-stone-500">
                  Definições de funcionamento da clínica, integrações de gateway e templates.
                </p>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Dados Fiscais & Entidade MutuaMente
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Denominação Legal</label>
                    <input
                      type="text"
                      readOnly
                      value={CLINIC_INFO.legalName}
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-stone-100 text-stone-700"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">NIF da Clínica</label>
                    <input
                      type="text"
                      readOnly
                      value={CLINIC_INFO.nif}
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-stone-100 text-stone-700 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Gateway de Pagamentos em Portugal (SIBS & MB WAY)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Entidade Multibanco SIBS</label>
                    <input
                      type="text"
                      readOnly
                      value="21245 (MutuaMente Pagamentos Lda)"
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-stone-100 text-stone-700 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">API Key MB WAY Empresas</label>
                    <input
                      type="password"
                      readOnly
                      value="••••••••••••••••••••••••••••••••"
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-stone-100 text-stone-700 font-mono"
                    />
                  </div>
                </div>
                <div className="text-[11px] text-[#2A6496] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2A6496]" />
                  <span>Webhooks ativos: Callback instantâneo de liquidação configurado.</span>
                </div>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-[#2A6496]" />
                    <span>Segurança & Palavra-passe do Painel Clínico</span>
                  </h4>
                  <span className="text-[11px] text-stone-500">Acesso Restrito</span>
                </div>
                <p className="text-xs text-stone-600">
                  Altere a senha utilizada para desbloquear o acesso a este painel e aos dados confidenciais dos utentes.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newPwd !== confirmPwd) {
                      setPwdChangeMessage({ type: 'error', text: 'A confirmação não coincide com a nova palavra-passe.' });
                      return;
                    }
                    const res = updateClinicalPassword(currentPwd, newPwd);
                    if (res.success) {
                      setPwdChangeMessage({ type: 'success', text: 'Palavra-passe alterada com sucesso! Utilize a nova senha nos próximos acessos.' });
                      setCurrentPwd('');
                      setNewPwd('');
                      setConfirmPwd('');
                    } else {
                      setPwdChangeMessage({ type: 'error', text: res.error || 'Erro ao alterar a palavra-passe.' });
                    }
                  }}
                  className="space-y-3 max-w-md pt-2"
                >
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Palavra-passe Atual</label>
                    <input
                      type="password"
                      required
                      placeholder="Senha atual (ex: sofia2026)"
                      value={currentPwd}
                      onChange={(e) => {
                        setCurrentPwd(e.target.value);
                        setPwdChangeMessage(null);
                      }}
                      className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-white text-xs focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Nova Palavra-passe</label>
                      <input
                        type="password"
                        required
                        placeholder="Mínimo 4 carateres"
                        value={newPwd}
                        onChange={(e) => {
                          setNewPwd(e.target.value);
                          setPwdChangeMessage(null);
                        }}
                        className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-white text-xs focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">Confirmar Nova Senha</label>
                      <input
                        type="password"
                        required
                        placeholder="Repita a nova senha"
                        value={confirmPwd}
                        onChange={(e) => {
                          setConfirmPwd(e.target.value);
                          setPwdChangeMessage(null);
                        }}
                        className="w-full py-2 px-3 rounded-lg border border-stone-300 bg-white text-xs focus:ring-2 focus:ring-[#2A6496] focus:outline-none"
                      />
                    </div>
                  </div>

                  {pwdChangeMessage && (
                    <div
                      className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                        pwdChangeMessage.type === 'success'
                          ? 'bg-[#E8F1F8] text-[#2A6496] border border-[#B0D0EB]'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {pwdChangeMessage.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-[#2A6496] shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{pwdChangeMessage.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="py-2 px-4 rounded-lg bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold transition cursor-pointer"
                  >
                    Guardar Nova Palavra-passe
                  </button>
                </form>
              </div>

              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  Serviço de Correio & Notificações Automáticas
                </h4>
                <div className="text-xs text-stone-600 space-y-2">
                  <p>
                    • <strong>Remetente Oficial:</strong> {CLINIC_INFO.email}
                  </p>
                  <p>
                    • <strong>Protocolo:</strong> SMTP TLS encriptado com registo DNS SPF e DMARC ativo.
                  </p>
                  <p>
                    • <strong>Frequência de lembretes:</strong> Disparo automático 24 horas antes do horário de cada consulta.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
