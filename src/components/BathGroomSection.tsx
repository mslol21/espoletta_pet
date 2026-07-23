'use client';

import React, { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  Scissors,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  Camera,
  Star,
  ShieldCheck,
  Award,
  Heart,
  ArrowRight,
  Info,
} from 'lucide-react';

interface BathGroomSectionProps {
  setCurrentTab: (tab: string) => void;
}

export function BathGroomSection({ setCurrentTab }: BathGroomSectionProps) {
  const { tenant, services, staffList, appointments } = useTenant();

  const [selectedGroomFilter, setSelectedGroomFilter] = useState<'ALL' | 'BANHO' | 'TOSA' | 'SPA'>('ALL');

  const beforeAfterGallery = [
    {
      id: 'gallery-1',
      petName: 'Mel',
      breed: 'Shih Tzu',
      groomType: 'Tosa Bebê na Tesoura',
      groomer: 'Lucas Silva',
      before: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
      after: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'gallery-2',
      petName: 'Thor',
      breed: 'Golden Retriever',
      groomType: 'Banho Spa & Tosa Higiênica',
      groomer: 'Camila Santos',
      before: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&auto=format&fit=crop&q=80',
      after: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Banner Banho & Tosa */}
      <section className="relative min-h-[420px] rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 via-amber-400 to-teal-400 p-8 sm:p-12 text-white shadow-xl flex items-center justify-between">
        <div className="space-y-6 max-w-2xl z-10">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>Centro Estético & Spa Canino e Felino</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow-md">
            Banho & Tosa com Produtos Premium e Carinho Incondicional
          </h1>

          <p className="text-white/95 text-base sm:text-lg font-semibold leading-relaxed drop-shadow-xs">
            Cosméticos ozonizados, profissionais diplomados, checklists de entrada e fotos Antes & Depois direto no app do tutor!
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('agendar')}
              className="bg-white hover:bg-amber-50 text-orange-600 font-black text-sm px-7 py-3.5 rounded-2xl shadow-lg transition flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>Agendar Banho / Tosa Agora</span>
            </button>
          </div>
        </div>

        {/* Mascot Mascot Image */}
        <div className="hidden lg:block w-72 h-72 relative shrink-0">
          {/* eslint-disable-next-next/no-img-element */}
          <img
            src="/mascot.png"
            alt="Mascote Espoletta Banho"
            className="w-full h-full object-contain drop-shadow-2xl animate-pulse"
          />
        </div>
      </section>

      {/* Tipos de Tosa Breakdown Cards */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Especialidades de Tosa</h2>
          <p className="text-slate-600 text-sm font-semibold">Técnicas exclusivas para deixar seu pet lindo e confortável</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black mb-4">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Tosa na Tesoura</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Acabamento 100% manual artístico respeitando o padrão oficial da raça. Ideal para pelagens densas (Poodle, Spitz, Golden).
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-black mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Tosa Bebê</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Corte arredondado que deixa a pelagem com aspecto jovem e fofinho de filhote. Muito procurado para Shih Tzu e Lhasa.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center font-black mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Tosa Higiênica</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Aparo sanitário nas patas, barriga e região íntima para evitar acúmulo de sujeiras na rotina diária.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-md hover:border-orange-400 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Tosa Máquina Padrão</h3>
            <p className="text-slate-600 text-xs mt-2 font-medium leading-relaxed">
              Corte prático e uniforme com lâminas profissionais bactericidas, ideal para dias mais quentes.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Gallery Showcase */}
      <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-orange-600 font-black text-xs uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
              Resultados Reais
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Galeria Antes & Depois</h2>
          </div>
          <button
            onClick={() => setCurrentTab('agendar')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-2.5 rounded-xl transition shadow-md"
          >
            Quero Meu Pet Lindo Assim
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beforeAfterGallery.map((item) => (
            <div key={item.id} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span className="font-black text-slate-900 text-base">{item.petName} ({item.breed})</span>
                <span className="text-orange-600 bg-orange-100 px-2.5 py-0.5 rounded-full">{item.groomType}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase block">Antes</span>
                  <div className="h-48 rounded-2xl overflow-hidden border border-slate-300">
                    {/* eslint-disable-next-next/no-img-element */}
                    <img src={item.before} alt="Antes" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-emerald-600 uppercase block">Depois ✨</span>
                  <div className="h-48 rounded-2xl overflow-hidden border border-emerald-400 shadow-md">
                    {/* eslint-disable-next-next/no-img-element */}
                    <img src={item.after} alt="Depois" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services & Pricing Table */}
      <section className="bg-white border border-slate-200 p-8 rounded-3xl shadow-md space-y-6">
        <h2 className="text-3xl font-black text-slate-900">Tabela Completa de Serviços & Valores</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((serv) => (
            <div
              key={serv.id}
              className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="h-40 rounded-xl overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img src={serv.imageUrl} alt={serv.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-slate-900 text-base">{serv.name}</h3>
                <p className="text-slate-600 text-xs font-medium line-clamp-3">{serv.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500">Tempo Estimado:</span>
                  <span className="text-slate-900">~{serv.estimatedMinutes} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Valor Inicial:</span>
                  <span className="text-xl font-black text-orange-600">R$ {serv.basePrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setCurrentTab('agendar')}
                  className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition"
                >
                  Agendar Este Serviço
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
