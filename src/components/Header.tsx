'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import {
  PawPrint,
  Calendar,
  ShoppingBag,
  User,
  ShieldCheck,
  Menu,
  X,
  Phone,
  MessageCircle,
  Sparkles,
  Home,
  Bed,
  Dog,
  Scissors,
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const { tenant, cart } = useTenant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatWhatsAppLink = () => {
    const cleanPhone = tenant.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Vim pelo site da ${tenant.companyName} e gostaria de tirar uma dúvida.`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-orange-100 text-slate-800 shadow-sm transition-all">
      {/* Top Announcement Bar - Vibrant Gradient */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white text-xs py-1.5 px-4 font-bold flex items-center justify-between shadow-inner">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              ✨ WHITE LABEL ESPOLETTA
            </span>
            <span className="hidden sm:inline-block truncate drop-shadow-sm">
              {tenant.companyName} — Atendimento: {tenant.operatingHours.seg_fri}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${tenant.phone}`}
              className="hover:underline flex items-center space-x-1 text-white font-semibold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{tenant.phone}</span>
            </a>
            <a
              href={formatWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-0.5 rounded-full font-black flex items-center space-x-1.5 transition shadow-sm text-[11px]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Mascot */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="h-12 w-auto min-w-12 max-w-[160px] flex items-center justify-center group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-next/no-img-element */}
            <img
              src="/logo.png"
              alt={tenant.companyName}
              className="h-full w-auto object-contain rounded-xl drop-shadow-sm"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-black text-xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-500 to-teal-600 bg-clip-text text-transparent group-hover:opacity-90 transition">
                {tenant.companyName}
              </h1>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-300 animate-bounce hidden sm:inline-block">
                🐾 MASCOTE
              </span>
            </div>
            <p className="text-[10px] text-teal-600 font-extrabold tracking-wider uppercase">
              BANHO & TOSA • HOTEL VIP • CRECHE DAYCARE
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-1 font-bold text-sm">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
              currentTab === 'home'
                ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Início</span>
          </button>

          {tenant.activeModules.banhoTosa && (
            <button
              onClick={() => setCurrentTab('servicos')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                currentTab === 'servicos'
                  ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>Banho & Tosa</span>
            </button>
          )}

          {tenant.activeModules.hotel && (
            <button
              onClick={() => setCurrentTab('hotel')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                currentTab === 'hotel'
                  ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Bed className="w-4 h-4" />
              <span>Hotel Pet</span>
            </button>
          )}

          {tenant.activeModules.creche && (
            <button
              onClick={() => setCurrentTab('creche')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 ${
                currentTab === 'creche'
                  ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Dog className="w-4 h-4" />
              <span>Creche Daycare</span>
            </button>
          )}

          {tenant.activeModules.loja && (
            <button
              onClick={() => setCurrentTab('loja')}
              className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 relative ${
                currentTab === 'loja'
                  ? 'bg-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20'
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Loja Virtual</span>
              {cartItemCount > 0 && (
                <span className="bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-1">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          {tenant.activeModules.agendamento && (
            <button
              onClick={() => setCurrentTab('agendar')}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition flex items-center space-x-2 border border-orange-400/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Online</span>
            </button>
          )}

          <button
            onClick={() => setCurrentTab('cliente')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 transition flex items-center space-x-1.5"
          >
            <User className="w-4 h-4 text-orange-500" />
            <span>Área Cliente</span>
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className="bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-purple-200 transition flex items-center space-x-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Painel Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-orange-600 bg-slate-100 rounded-xl"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setCurrentTab('home');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm flex items-center space-x-2"
            >
              <Home className="w-4 h-4 text-orange-500" />
              <span>Início</span>
            </button>

            {tenant.activeModules.banhoTosa && (
              <button
                onClick={() => {
                  setCurrentTab('servicos');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 bg-slate-100 rounded-xl font-bold text-sm text-slate-700 flex items-center space-x-2"
              >
                <Scissors className="w-4 h-4 text-orange-500" />
                <span>Banho & Tosa</span>
              </button>
            )}

            {tenant.activeModules.hotel && (
              <button
                onClick={() => {
                  setCurrentTab('hotel');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 bg-slate-100 rounded-xl font-bold text-sm text-slate-700 flex items-center space-x-2"
              >
                <Bed className="w-4 h-4 text-orange-500" />
                <span>Hotel Pet</span>
              </button>
            )}

            {tenant.activeModules.creche && (
              <button
                onClick={() => {
                  setCurrentTab('creche');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 bg-slate-100 rounded-xl font-bold text-sm text-slate-700 flex items-center space-x-2"
              >
                <Dog className="w-4 h-4 text-orange-500" />
                <span>Creche</span>
              </button>
            )}

            {tenant.activeModules.loja && (
              <button
                onClick={() => {
                  setCurrentTab('loja');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-3 py-2.5 bg-slate-100 rounded-xl font-bold text-sm text-slate-700 flex items-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 text-orange-500" />
                <span>Loja Virtual ({cartItemCount})</span>
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            {tenant.activeModules.agendamento && (
              <button
                onClick={() => {
                  setCurrentTab('agendar');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-sm py-3 rounded-xl flex items-center justify-center space-x-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Online Agora</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCurrentTab('cliente');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-slate-100 text-slate-700 font-bold text-xs py-2.5 rounded-xl border border-slate-200 flex items-center justify-center space-x-1.5"
              >
                <User className="w-4 h-4 text-orange-500" />
                <span>Área Cliente</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-purple-50 text-purple-700 font-bold text-xs py-2.5 rounded-xl border border-purple-200 flex items-center justify-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Painel Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
