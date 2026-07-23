'use client';

import React, { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  ShieldCheck,
  LayoutDashboard,
  Calendar,
  Bed,
  Dog,
  ShoppingBag,
  DollarSign,
  Palette,
  CheckCircle2,
  Clock,
  Camera,
  AlertTriangle,
  MessageCircle,
  Plus,
  TrendingUp,
  Users,
  Box,
  Settings,
  Scissors,
  Save,
  RefreshCw,
  Search,
} from 'lucide-react';

export function AdminSection() {
  const {
    tenant,
    updateTenant,
    pets,
    services,
    staffList,
    appointments,
    updateAppointmentStatus,
    hotelStays,
    addHotelOccurrence,
    updateHotelStatus,
    daycareStays,
    products,
    updateProductStock,
    orders,
    financials,
  } = useTenant();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'agenda' | 'banhoTosa' | 'hotel' | 'creche' | 'estoque' | 'financeiro' | 'whitelabel'
  >('dashboard');

  // White-Label Studio local state
  const [wlName, setWlName] = useState(tenant.companyName);
  const [wlLogo, setWlLogo] = useState(tenant.logoUrl);
  const [wlBanner, setWlBanner] = useState(tenant.bannerUrl);
  const [wlPrimaryColor, setWlPrimaryColor] = useState(tenant.primaryColor);
  const [wlSecondaryColor, setWlSecondaryColor] = useState(tenant.secondaryColor);
  const [wlAccentColor, setWlAccentColor] = useState(tenant.accentColor);
  const [wlPhone, setWlPhone] = useState(tenant.phone);
  const [wlWhatsapp, setWlWhatsapp] = useState(tenant.whatsapp);
  const [wlAddress, setWlAddress] = useState(tenant.address);
  const [wlSavedSuccess, setWlSavedSuccess] = useState(false);

  const [modules, setModules] = useState(tenant.activeModules);

  const [photoModalAptId, setPhotoModalAptId] = useState<string | null>(null);
  const [beforeUrlInput, setBeforeUrlInput] = useState('');
  const [afterUrlInput, setAfterUrlInput] = useState('');

  const [hotelOccStayId, setHotelOccStayId] = useState<string | null>(null);
  const [occNote, setOccNote] = useState('');

  const [stockEditProdId, setStockEditProdId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);

  const todayDateStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === '2026-07-23' || a.date === todayDateStr);
  const activeHotelStays = hotelStays.filter((h) => h.status === 'CHECKED_IN');
  const activeDaycare = daycareStays.filter((d) => d.status === 'PRESENT');
  const lowStockProducts = products.filter((p) => p.stockQuantity <= p.minStockAlert);

  const totalMonthlyIncome = financials
    .filter((f) => f.type === 'INCOME')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalMonthlyExpense = financials
    .filter((f) => f.type === 'EXPENSE')
    .reduce((sum, f) => sum + f.amount, 0);

  const netProfit = totalMonthlyIncome - totalMonthlyExpense;

  const handleSaveWhiteLabel = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenant({
      companyName: wlName,
      logoUrl: wlLogo,
      bannerUrl: wlBanner,
      primaryColor: wlPrimaryColor,
      secondaryColor: wlSecondaryColor,
      accentColor: wlAccentColor,
      phone: wlPhone,
      whatsapp: wlWhatsapp,
      address: wlAddress,
      activeModules: modules,
    });

    setWlSavedSuccess(true);
    setTimeout(() => setWlSavedSuccess(false), 3000);
  };

  const handleSavePhotos = () => {
    if (!photoModalAptId) return;
    updateAppointmentStatus(photoModalAptId, 'COMPLETED', {
      before: beforeUrlInput || undefined,
      after: afterUrlInput || undefined,
    });
    setPhotoModalAptId(null);
  };

  const handleSaveHotelOccurrence = () => {
    if (!hotelOccStayId || !occNote.trim()) return;
    addHotelOccurrence(hotelOccStayId, occNote, 'Admin / Equipe');
    setOccNote('');
    setHotelOccStayId(null);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Admin Top Banner */}
      <div className="bg-white border border-purple-200 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 border border-purple-300 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-slate-900">Painel Administrativo White Label</h2>
              <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-purple-300">
                PRO ENGINE
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-0.5 font-semibold">
              Empresa Atual: <strong className="text-orange-600 font-black">{tenant.companyName}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('whitelabel')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2 border border-purple-500"
        >
          <Palette className="w-4 h-4" />
          <span>Personalizar Marca & Cores</span>
        </button>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'dashboard'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Visão Geral</span>
        </button>

        <button
          onClick={() => setActiveTab('agenda')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'agenda'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Agenda Inteligente</span>
        </button>

        <button
          onClick={() => setActiveTab('banhoTosa')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'banhoTosa'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Banho & Tosa</span>
        </button>

        <button
          onClick={() => setActiveTab('hotel')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'hotel'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Hotel Pet ({activeHotelStays.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('creche')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'creche'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Dog className="w-4 h-4" />
          <span>Creche ({activeDaycare.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('estoque')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'estoque'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Loja & Estoque</span>
          {lowStockProducts.length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {lowStockProducts.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('financeiro')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'financeiro'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Financeiro</span>
        </button>

        <button
          onClick={() => setActiveTab('whitelabel')}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeTab === 'whitelabel'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>White Label Studio</span>
        </button>
      </div>

      {/* DASHBOARD VISÃO GERAL */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between text-orange-500">
                <span className="text-xs font-black uppercase tracking-wider">Agendamentos Hoje</span>
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900">{todayAppointments.length}</p>
              <p className="text-[11px] text-slate-500 font-bold">Serviços de Banho & Tosa confirmados</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between text-purple-600">
                <span className="text-xs font-black uppercase tracking-wider">Hóspedes Hotel</span>
                <Bed className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900">{activeHotelStays.length}</p>
              <p className="text-[11px] text-slate-500 font-bold">Pets em suítes climatizadas</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between text-teal-600">
                <span className="text-xs font-black uppercase tracking-wider">Pets na Creche</span>
                <Dog className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900">{activeDaycare.length}</p>
              <p className="text-[11px] text-slate-500 font-bold">Presentes no gramado hoje</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center justify-between text-amber-600">
                <span className="text-xs font-black uppercase tracking-wider">Faturamento Mês</span>
                <TrendingUp className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-slate-900">R$ {totalMonthlyIncome.toFixed(2)}</p>
              <p className="text-[11px] text-emerald-600 font-black">Lucro Líquido: R$ {netProfit.toFixed(2)}</p>
            </div>
          </div>

          {lowStockProducts.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 p-5 rounded-3xl flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3 text-rose-800 font-semibold">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <div>
                  <h4 className="font-black text-sm">Alerta de Estoque Mínimo Atingido ({lowStockProducts.length})</h4>
                  <p className="text-xs text-rose-700">
                    Produtos precisam de reposição: {lowStockProducts.map((p) => p.name).join(', ')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('estoque')}
                className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs px-4 py-2 rounded-xl shadow-xs"
              >
                Ajustar Estoque
              </button>
            </div>
          )}

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-md">
            <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>Agendamentos do Dia (23 de Julho)</span>
            </h3>

            <div className="space-y-3">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300 shrink-0">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={apt.petPhotoUrl} alt={apt.petName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{apt.petName} ({apt.petBreed})</h4>
                      <p className="text-slate-600">
                        {apt.serviceName} • Tosador: <strong className="text-orange-600">{apt.staffName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
                      {apt.startTime} - {apt.endTime}
                    </span>
                    <span className="bg-orange-100 text-orange-700 font-black px-3 py-1 rounded-xl border border-orange-200">
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AGENDA INTELIGENTE */}
      {activeTab === 'agenda' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">Agenda Inteligente de Atendimento</h3>
              <p className="text-slate-600 text-xs font-semibold">Gestão de horários, atualização de status e lembretes WhatsApp</p>
            </div>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4 shadow-xs font-semibold"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-300 shrink-0">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={apt.petPhotoUrl} alt={apt.petName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-black text-slate-900 text-base">{apt.petName}</h4>
                        <span className="text-xs text-slate-500 font-bold">({apt.petBreed})</span>
                      </div>
                      <p className="text-xs text-slate-700">
                        Serviço: <strong className="text-orange-600">{apt.serviceName}</strong> ({apt.groomType})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Tutor: {apt.tutorName} • {apt.tutorPhone}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'CONFIRMED')}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                        apt.status === 'CONFIRMED'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      Confirmado
                    </button>

                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'IN_PROGRESS')}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                        apt.status === 'IN_PROGRESS'
                          ? 'bg-amber-500 text-white'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      Em Banho/Tosa
                    </button>

                    <button
                      onClick={() => {
                        setPhotoModalAptId(apt.id);
                        setBeforeUrlInput(apt.beforePhotoUrl || '');
                        setAfterUrlInput(apt.afterPhotoUrl || '');
                      }}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs transition flex items-center space-x-1 ${
                        apt.status === 'COMPLETED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-300'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Fotos & Concluir</span>
                    </button>

                    <a
                      href={`https://wa.me/${apt.tutorPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        tenant.customMessage.replace('{data}', apt.date).replace('{horario}', apt.startTime)
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-xl flex items-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Lembrete WA</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHITE LABEL STUDIO */}
      {activeTab === 'whitelabel' && (
        <div className="bg-white border border-purple-200 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <Palette className="w-7 h-7 text-purple-600" />
            <div>
              <h3 className="text-2xl font-black text-slate-900">White Label Studio & Personalização da Marca</h3>
              <p className="text-xs text-slate-600 font-semibold">
                Altere Identidade Visual, Cores, Logotipo, Contatos e Módulos Ativos sem tocar no código!
              </p>
            </div>
          </div>

          {wlSavedSuccess && (
            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-emerald-800 font-black text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Configurações salvas com sucesso! A aplicação foi atualizada em tempo de execução.</span>
            </div>
          )}

          <form onSubmit={handleSaveWhiteLabel} className="space-y-6 font-semibold">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">Nome da Empresa / Pet Shop *</label>
                <input
                  type="text"
                  required
                  value={wlName}
                  onChange={(e) => setWlName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-purple-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 mb-1">URL da Logomarca (Logo PNG)</label>
                <input
                  type="text"
                  value={wlLogo}
                  onChange={(e) => setWlLogo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-purple-500 font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-black text-sm px-8 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Salvar & Aplicar White Label</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
