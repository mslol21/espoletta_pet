'use client';

import React from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  Scissors,
  Bed,
  Dog,
  ShoppingBag,
  Calendar,
  MessageCircle,
  Sparkles,
  Star,
  CheckCircle2,
  Clock,
  ShieldAlert,
  MapPin,
  Phone,
  Mail,
  Award,
  HeartHandshake,
  ArrowRight,
  Camera,
  Heart,
} from 'lucide-react';

interface HomeSectionProps {
  setCurrentTab: (tab: string) => void;
}

export function HomeSection({ setCurrentTab }: HomeSectionProps) {
  const { tenant, services } = useTenant();

  const formatWhatsAppLink = () => {
    const cleanPhone = tenant.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Gostaria de mais informações sobre os serviços da ${tenant.companyName}.`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <div className="space-y-16 pb-20">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION - CLEAN, BRIGHT, VIBRANT & CHEERFUL */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden rounded-3xl border border-orange-200 shadow-xl bg-gradient-to-br from-orange-50 via-white to-amber-50/80">
        {/* Decorative Colorful Shapes */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-6 py-16 text-center space-y-8 max-w-4xl z-10">
          
          {/* Mascot Avatar & Speech Bubble Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white/90 border border-orange-200 backdrop-blur-md p-4 rounded-3xl shadow-lg shadow-orange-500/10 max-w-xl mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-400 to-teal-400 p-1 shrink-0 shadow-md shadow-orange-500/20">
              {/* eslint-disable-next-next/no-img-element */}
              <img
                src="/mascot.png"
                alt="Mascote Espoletta"
                className="w-full h-full object-cover rounded-[12px] bg-amber-50"
              />
            </div>
            <div className="text-left space-y-1">
              <span className="inline-flex items-center space-x-1 text-orange-600 font-black text-[11px] uppercase tracking-wider bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-200">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>O Mascotinho Espoletta Diz:</span>
              </span>
              <p className="text-slate-800 text-xs font-semibold leading-relaxed">
                "Au au! Seja bem-vindo à <strong className="text-orange-600 font-black">Espoletta</strong>! Aqui seu pet ganha o banho mais cheiroso, tosa com amor, hotel vip e a melhor creche da cidade!" 🐾✨
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            Banho, Tosa, Hotel & Creche com Amor e Alegria na{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600 bg-clip-text text-transparent">
              {tenant.companyName}
            </span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-semibold">
            Agende serviços estéticos com fotos Antes/Depois no app, suítes climatizadas no Hotel Pet e recreação com acompanhamento ao vivo na Creche Daycare.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {tenant.activeModules.agendamento && (
              <button
                onClick={() => setCurrentTab('agendar')}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 hover:scale-105 transition flex items-center justify-center space-x-3 border border-orange-300"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Agendar Online Agora</span>
              </button>
            )}

            <a
              href={formatWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-white font-black text-base px-7 py-4 rounded-2xl shadow-lg shadow-teal-500/20 hover:scale-105 transition flex items-center justify-center space-x-2 border border-teal-400"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>

          {/* Quick Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-orange-200/80 text-left max-w-3xl mx-auto">
            <div className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-orange-200 shadow-sm">
              <ShieldAlert className="w-6 h-6 text-orange-500 shrink-0" />
              <div>
                <p className="text-xs font-black text-slate-800">Groomers VIP</p>
                <p className="text-[11px] text-slate-500 font-bold">Especialistas</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-teal-200 shadow-sm">
              <Clock className="w-6 h-6 text-teal-500 shrink-0" />
              <div>
                <p className="text-xs font-black text-slate-800">Zero Conflito</p>
                <p className="text-[11px] text-slate-500 font-bold">Horários Precisos</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm">
              <Camera className="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-black text-slate-800">Fotos no App</p>
                <p className="text-[11px] text-slate-500 font-bold">Antes & Depois</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-sm">
              <Star className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <p className="text-xs font-black text-slate-800">Nota 4.9/5.0</p>
                <p className="text-[11px] text-slate-500 font-bold">+500 Tutores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* MODULE HIGHLIGHT CARDS - CLEAN WHITE CARDS */}
      {/* ---------------------------------------------------- */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900">Serviços & Módulos Oferecidos</h2>
          <p className="text-slate-600 text-sm font-semibold">
            Tudo o que preparamos para proporcionar bem-estar, higiene e diversão com carinho para seu pet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tenant.activeModules.banhoTosa && (
            <div className="group bg-white border border-slate-200 hover:border-orange-400 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Cover Image Header */}
                <div className="h-44 relative overflow-hidden bg-orange-100">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80"
                    alt="Banho & Tosa Spa"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Módulo Ativo</span>
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <h3 className="font-black text-xl drop-shadow-md">Banho & Tosa Spa</h3>
                    <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md">
                      <Scissors className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Banhos terapêuticos, tosas específicas por raça (Tesoura, Máquina, Bebê, Higiênica) e hidratação ozonizada.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 font-semibold border-t border-slate-100 pt-3">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Checklist de Saúde na Entrada</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Fotos Antes & Depois no App</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Shampoos Neutros Premium</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentTab('servicos')}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md shadow-orange-500/20"
                >
                  <span>Ver Preços & Agendar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {tenant.activeModules.hotel && (
            <div className="group bg-white border border-slate-200 hover:border-purple-400 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Cover Image Header */}
                <div className="h-44 relative overflow-hidden bg-purple-100">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80"
                    alt="Hotel Pet VIP"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-purple-200" />
                    <span>Hospedagem VIP</span>
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <h3 className="font-black text-xl drop-shadow-md">Hotel Pet VIP</h3>
                    <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                      <Bed className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Suítes individuais climatizadas, monitoramento 24h, alimentação personalizada e boletins diários de foto.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 font-semibold border-t border-slate-100 pt-3">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>3 Passeios Guiados ao Dia</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Webcam 24h ao Vivo</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Administração de Remédios</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentTab('hotel')}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md shadow-purple-500/20"
                >
                  <span>Conhecer Suítes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {tenant.activeModules.creche && (
            <div className="group bg-white border border-slate-200 hover:border-teal-400 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Cover Image Header */}
                <div className="h-44 relative overflow-hidden bg-teal-100">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80"
                    alt="Creche Daycare"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-teal-200" />
                    <span>Recreativo</span>
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <h3 className="font-black text-xl drop-shadow-md">Creche Daycare</h3>
                    <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                      <Dog className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Socialização supervisionada no gramado sintético, piscina de bolinhas e exercícios de agilidade.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 font-semibold border-t border-slate-100 pt-3">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>Gramado Sintético Antialérgico</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>Passaportes Diários & Mensais</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>Supervisão 100% Presencial</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentTab('creche')}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md shadow-teal-500/20"
                >
                  <span>Planos de Creche</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {tenant.activeModules.loja && (
            <div className="group bg-white border border-slate-200 hover:border-amber-400 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div>
                {/* Cover Image Header */}
                <div className="h-44 relative overflow-hidden bg-amber-100">
                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80"
                    alt="Loja Virtual Pet"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

                  <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Loja Virtual</span>
                  </span>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <h3 className="font-black text-xl drop-shadow-md">Loja Virtual Pet</h3>
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    Rações Super Premium, petiscos naturais, brinquedos interativos KONG e produtos de higiene.
                  </p>
                  <ul className="text-xs text-slate-700 space-y-2 font-semibold border-t border-slate-100 pt-3">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Pedido Direto no WhatsApp</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Rações Super Premium</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Entrega Rápida no Bairro</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setCurrentTab('loja')}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-xl transition flex items-center justify-center space-x-1 shadow-md shadow-amber-500/20"
                >
                  <span>Ver Produtos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* FEATURED SERVICES PREVIEW */}
      {/* ---------------------------------------------------- */}
      <section className="space-y-8 bg-white border border-slate-200 p-8 rounded-3xl shadow-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-orange-600 font-black text-xs uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-full">
              Estética & Cuidados
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">Serviços Populares</h2>
          </div>
          {tenant.activeModules.agendamento && (
            <button
              onClick={() => setCurrentTab('agendar')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-md shadow-orange-500/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendamento Online Instantâneo</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.slice(0, 3).map((serv) => (
            <div
              key={serv.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-44 overflow-hidden relative">
                {/* eslint-disable-next-next/no-img-element */}
                <img
                  src={serv.imageUrl}
                  alt={serv.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-orange-600 font-black text-xs px-3 py-1 rounded-full shadow-sm border border-orange-200">
                  R$ {serv.basePrice.toFixed(2)}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-extrabold text-lg text-slate-900">{serv.name}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 font-medium">{serv.description}</p>
                <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-bold border-t border-slate-200">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>~{serv.estimatedMinutes} min</span>
                  </span>
                  <span className="text-slate-700">{serv.allowedBreeds}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* TESTIMONIALS & TRUST */}
      {/* ---------------------------------------------------- */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Depoimentos dos Tutores</h2>
          <p className="text-slate-600 text-sm font-semibold">O que dizem os clientes satisfeitos da {tenant.companyName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-700 text-xs italic leading-relaxed font-medium">
              "O Thor ama ir ao hotel da Espoletta! Recebo fotos todos os dias dele brincando. O banho e tosa é impecável e ele volta sempre cheiroso."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 font-black flex items-center justify-center text-xs">
                MO
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Mariana Oliveira</p>
                <p className="text-[10px] text-slate-500 font-bold">Tutor do Thor (Golden Retriever)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-700 text-xs italic leading-relaxed font-medium">
              "A tosa tesoura da Mel é perfeita. Os tosadores são muito carinhosos e atenciosos com o cuidado dos olhos dela. Recomendo de olhos fechados!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 font-black flex items-center justify-center text-xs">
                CE
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Carlos Eduardo</p>
                <p className="text-[10px] text-slate-500 font-bold">Tutor da Mel (Shih Tzu)</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-slate-700 text-xs italic leading-relaxed font-medium">
              "Agendamento online muito prático! Escolho o horário exato, o tosador preferido e o sistema envia o lembrete no WhatsApp."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-600 font-black flex items-center justify-center text-xs">
                FS
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Fernanda Souza</p>
                <p className="text-[10px] text-slate-500 font-bold">Tutor da Luna (Persa)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* LOCATION & CONTACT FOOTER PREVIEW */}
      {/* ---------------------------------------------------- */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 shadow-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-orange-600 font-black text-xs uppercase tracking-wider bg-orange-100 px-3 py-1 rounded-full">
              Localização & Contato
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2">{tenant.companyName}</h2>
            <p className="text-slate-600 text-xs font-medium">Venha nos visitar ou solicite nosso serviço de Taxi Pet!</p>
          </div>

          <div className="space-y-3 text-sm text-slate-700 font-semibold">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-black text-slate-900">{tenant.address}</p>
                <p className="text-xs text-slate-500 font-bold">
                  {tenant.city} - {tenant.state}, CEP {tenant.zipCode}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-teal-500 shrink-0" />
              <span>{tenant.phone}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-purple-500 shrink-0" />
              <span>{tenant.email}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-3">
            <a
              href={tenant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black px-4 py-2.5 rounded-xl border border-slate-200 transition inline-flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Abrir no Google Maps</span>
            </a>
          </div>
        </div>

        {/* Map Placeholder Graphic */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
            <MapPin className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base">Unidade Principal {tenant.city}</h3>
            <p className="text-slate-600 text-xs mt-1 font-semibold">Estacionamento gratuito para clientes no local</p>
          </div>
          <div className="w-full bg-white border border-amber-200 p-3 rounded-xl text-left text-xs text-slate-700 space-y-1 font-semibold">
            <p className="font-black text-orange-600">Horários de Atendimento:</p>
            <p>• Segunda a Sexta: {tenant.operatingHours.seg_fri}</p>
            <p>• Sábado: {tenant.operatingHours.sab}</p>
            <p>• Domingo: {tenant.operatingHours.dom}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
