'use client';

import React from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  Dog,
  Sparkles,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  Award,
  Sun,
  Smile,
  HeartHandshake,
  Check,
} from 'lucide-react';

interface CrecheSectionProps {
  setCurrentTab: (tab: string) => void;
}

export function CrecheSection({ setCurrentTab }: CrecheSectionProps) {
  const { tenant, daycareStays } = useTenant();

  const plans = [
    {
      id: 'plan-daily',
      name: 'Passaporte Diária Avulsa',
      price: 70,
      period: 'por diária',
      description: 'Ideal para tutores que precisam de um dia esporádico de diversão para gastar energia do pet.',
      features: ['Acesso total ao gramado e brinquedos', 'Supervisão 100% presencial', 'Boletim de fotos no WhatsApp', 'Soninho em sala climatizada'],
      isPopular: false,
    },
    {
      id: 'plan-weekly',
      name: 'Passaporte Semanal (3x por semana)',
      price: 180,
      period: 'por semana',
      description: 'Perfeito para manter uma rotina saudável de socialização e exercícios toda semana.',
      features: ['3 Diárias semanais flexíveis', 'Desconto especial no Banho & Tosa', 'Fotos e vídeos em tempo real', 'Avaliação comportamental gratuita'],
      isPopular: true,
    },
    {
      id: 'plan-monthly',
      name: 'Plano Mensal VIP Recreativo',
      price: 580,
      period: 'por mês (seg a sex)',
      description: 'A experiência completa! Acesso livre de segunda a sexta-feira para o pet gastar toda a energia.',
      features: ['Acesso ilimitado de Seg a Sex', '1 Banho completo de cortesia por mês', 'Armário privativo para pertences', 'Prioridade de vaga em feriados no Hotel'],
      isPopular: false,
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Banner Creche */}
      <section className="relative min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 p-8 sm:p-12 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-6 max-w-2xl z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Creche Daycare Recreativa Espoletta</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow-md">
            Um Dia Inteiro de Brincadeiras, Amigos & Muita Energia Gasta!
          </h1>

          <p className="text-white/95 text-base sm:text-lg font-semibold leading-relaxed drop-shadow-xs">
            Socialização supervisionada por especialistas, piscina de bolinhas, gramado antialérgico e descanso no ar condicionado!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('agendar')}
              className="bg-white hover:bg-teal-50 text-teal-700 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Matricular Meu Pet na Creche</span>
            </button>
          </div>
        </div>

        {/* Mascot Mascot Image */}
        <div className="hidden lg:block w-72 h-72 relative shrink-0">
          {/* eslint-disable-next-next/no-img-element */}
          <img
            src="/mascot.png"
            alt="Mascote Espoletta Creche"
            className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
          />
        </div>
      </section>

      {/* Activity Stations Breakdown */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Estações de Diversão & Recreação</h2>
          <p className="text-slate-600 text-sm font-semibold">Estrutura completa pensada no bem-estar físico e mental</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-teal-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-black mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Gramado Sintético 100% Antialérgico</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Área aberta ensolarada para corridas e brincadeiras coletivas sem lama ou parasitas.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-teal-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Piscina de Bolinhas Higienizada</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Estímulo sensorial e enriquecimento ambiental para exercitar a mente dos cães.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-teal-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Circuito Agility & Túneis</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Rampas de madeira, túneis flexíveis e obstáculos para gastar energia de raças ativas.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-teal-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Sala do Soninho Climatizada</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Pausa das 12h às 14h com aromaterapia e colchões macios para recuperação de energia.
            </p>
          </div>
        </div>
      </section>

      {/* Planos Passaporte Pricing Table */}
      <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Planos & Passaportes de Creche</h2>
          <p className="text-slate-600 text-sm font-semibold">Escolha a frequência ideal para o estilo de vida do seu cão</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition relative ${
                plan.isPopular
                  ? 'bg-gradient-to-b from-teal-500 to-emerald-600 text-white shadow-xl scale-105 border-2 border-amber-300'
                  : 'bg-slate-50 border border-slate-200 text-slate-900 shadow-md'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-4 py-1 rounded-full shadow-md">
                  MAIS POPULAR ★
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className={`font-black text-xl ${plan.isPopular ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-1 font-medium ${plan.isPopular ? 'text-white/90' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-1">
                    <span className={`text-3xl font-black ${plan.isPopular ? 'text-white' : 'text-slate-900'}`}>
                      R$ {plan.price.toFixed(2)}
                    </span>
                    <span className={`text-xs font-bold ${plan.isPopular ? 'text-white/80' : 'text-slate-500'}`}>
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs font-semibold pt-2 border-t border-slate-200/40">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Check className={`w-4 h-4 shrink-0 ${plan.isPopular ? 'text-amber-300' : 'text-teal-600'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setCurrentTab('agendar')}
                  className={`w-full py-3 rounded-xl font-black text-xs transition shadow-md ${
                    plan.isPopular
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  Contratar {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Daycare Attendance Grid */}
      <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
          <Dog className="w-6 h-6 text-teal-600" />
          <span>Pets Presentes na Creche Hoje (Ao Vivo)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {daycareStays.map((dc) => (
            <div key={dc.id} className="bg-slate-50 border border-teal-200 p-5 rounded-2xl space-y-3 font-semibold">
              <div className="flex items-center space-x-4 border-b border-slate-200 pb-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-300 shrink-0">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={dc.petPhotoUrl} alt={dc.petName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-base">{dc.petName}</h4>
                  <p className="text-xs text-slate-500">Tutor: {dc.tutorName}</p>
                  <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-100 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>PRESENTE NO GRAMADO</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-black text-slate-800">Atividades de Hoje:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 font-medium">
                  {dc.activities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
