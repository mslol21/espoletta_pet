'use client';

import React from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  Bed,
  Sparkles,
  CheckCircle2,
  Clock,
  Camera,
  ShieldCheck,
  Calendar,
  Heart,
  MessageCircle,
  Video,
  Utensils,
  Sun,
} from 'lucide-react';

interface HotelSectionProps {
  setCurrentTab: (tab: string) => void;
}

export function HotelSection({ setCurrentTab }: HotelSectionProps) {
  const { tenant, hotelStays } = useTenant();

  const suites = [
    {
      id: 'suite-master',
      name: 'Suíte Master VIP com Webcam 24h',
      price: 140,
      description: 'Espaço privativo amplo climatizado, cama ortopédica, acesso à câmera ao vivo pelo aplicativo 24h por dia e 3 passeios guiados ao dia.',
      image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80',
      highlights: ['Webcam 24h ao vivo', '3 Passeios diários', 'Ar condicionado silencioso', 'Fotos diárias no WhatsApp'],
    },
    {
      id: 'suite-standard',
      name: 'Suíte Standard Climatizada',
      price: 90,
      description: 'Achegante e segura para cães de médio e pequeno porte, com música ambiente relaxante e acompanhamento veterinário prévio.',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80',
      highlights: ['Música ambiente relaxante', '2 Passeios ao dia', 'Higiene diária da suíte', 'Supervisão presencial'],
    },
    {
      id: 'suite-felina',
      name: 'Suíte Felina Gatificação Luxo',
      price: 110,
      description: 'Ambiente 100% gatificado sem ruídos de cães! Nichos elevados, arranhadores gigantes, brinquedos de caça e fonte de água filtrada.',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=80',
      highlights: ['Ambiente isolado de cães', 'Nichos e prateleiras suspensas', 'Fonte de água corrente', 'Caixa de areia limpa 3x/dia'],
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Banner Hotel */}
      <section className="relative min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-400 p-8 sm:p-12 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-6 max-w-2xl z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Hospedagem VIP 5 Estrelas Espoletta</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow-md">
            Hotel Pet Climatizado com Monitoramento & Amor de Família
          </h1>

          <p className="text-white/95 text-base sm:text-lg font-semibold leading-relaxed drop-shadow-xs">
            Viaje com tranquilidade! Seu pet terá um cantinho seguro, passeios divertidos e fotos diárias enviadas diretamente no seu WhatsApp!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('agendar')}
              className="bg-white hover:bg-purple-50 text-purple-700 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Reservar Suíte no Hotel</span>
            </button>
          </div>
        </div>

        {/* Mascot Mascot Image */}
        <div className="hidden lg:block w-72 h-72 relative shrink-0">
          {/* eslint-disable-next-next/no-img-element */}
          <img
            src="/mascot.png"
            alt="Mascote Espoletta Hotel"
            className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
          />
        </div>
      </section>

      {/* Suítes Showcase */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Nossas Suítes de Hospedagem</h2>
          <p className="text-slate-600 text-sm font-semibold">Escolha a acomodação ideal para o porte e estilo do seu pet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suites.map((suite) => (
            <div
              key={suite.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={suite.image} alt={suite.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-purple-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                    R$ {suite.price}/diária
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-black text-xl text-slate-900">{suite.name}</h3>
                  <p className="text-slate-600 text-xs font-medium leading-relaxed">{suite.description}</p>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-black text-purple-600 uppercase">Destaques da Suíte:</span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                      {suite.highlights.map((h, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentTab('agendar')}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md transition"
                >
                  Solicitar Reserva desta Suíte
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routine & Rules Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Routine */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <Sun className="w-7 h-7 text-amber-500" />
            <h3 className="text-2xl font-black text-slate-900">Rotina Diária dos Hóspedes</h3>
          </div>

          <div className="space-y-4">
            {[
              { time: '08:00', title: 'Despertar & Alimentação', desc: 'Ração habitual do tutor servida individualmente com água fresca.' },
              { time: '09:30', title: 'Passeio & Socialização', desc: 'Recreação supervisionada no gramado sintético antialérgico.' },
              { time: '12:30', title: 'Soninho Climatizado', desc: 'Descanso relaxante na suíte com música suave.' },
              { time: '15:30', title: 'Atividades Cognitivas', desc: 'Jogos de buscar mordedor e brincadeiras com os monitores.' },
              { time: '18:00', title: 'Jantar & Higiene', desc: 'Segunda refeição e escovação de pelos.' },
              { time: '20:00', title: 'Hora de Dormir VIP', desc: 'Checagem final, carinho da boa noite e suítes trancadas com segurança.' },
            ].map((r, idx) => (
              <div key={idx} className="flex items-start space-x-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="font-black text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-xl shrink-0">
                  {r.time}
                </span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{r.title}</h4>
                  <p className="text-slate-600 text-xs font-medium">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prerequisites & Requirements */}
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
            <ShieldCheck className="w-7 h-7 text-teal-600" />
            <h3 className="text-2xl font-black text-slate-900">Requisitos de Check-in</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-700">
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 space-y-1">
              <h4 className="font-black text-teal-800 text-sm">💉 Vacinação 100% em Dia</h4>
              <p>Obrigatório apresentar carteira com V10/V4, Raiva e Gripal aplicadas nos últimos 12 meses.</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
              <h4 className="font-black text-amber-800 text-sm">💊 Antipulgas & Vermífugo</h4>
              <p>Aplicação comprovada nas últimas 4 semanas para garantir a saúde coletiva do hotel.</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-1">
              <h4 className="font-black text-purple-800 text-sm">🍖 Ração em Quantidade Suficiente</h4>
              <p>Traga a ração habitual do pet fracionada por dia para evitar trocas bruscas de dieta.</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-1">
              <h4 className="font-black text-orange-800 text-sm">🧸 Objeto de Apego Familiar</h4>
              <p>Recomendamos trazer uma caminhas, paninho ou brinquedo preferido com cheirinho de casa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Guest Diary Demo */}
      <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
        <h3 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
          <Camera className="w-6 h-6 text-purple-600" />
          <span>Exemplo de Diário de Bordo ao Vivo dos Hóspedes</span>
        </h3>

        {hotelStays.map((hs) => (
          <div key={hs.id} className="bg-slate-50 border border-purple-200 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-black text-purple-600">{hs.suiteNumber}</span>
                <h4 className="font-black text-slate-900 text-lg">Hóspede: {hs.petName}</h4>
              </div>
              <span className="bg-purple-100 text-purple-700 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                CHECKED-IN
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hs.photos.map((p, i) => (
                <div key={i} className="h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={p} alt="Foto diária" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-black text-slate-900">Registros dos Monitores:</p>
              {hs.occurrences.map((occ) => (
                <div key={occ.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs font-semibold">
                  <div className="flex justify-between text-[11px] text-purple-600 font-black">
                    <span>{occ.date} - {occ.time}</span>
                    <span>Por: {occ.author}</span>
                  </div>
                  <p className="text-slate-800">{occ.note}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
