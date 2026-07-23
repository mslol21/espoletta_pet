'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HomeSection } from '@/components/HomeSection';
import { BathGroomSection } from '@/components/BathGroomSection';
import { HotelSection } from '@/components/HotelSection';
import { CrecheSection } from '@/components/CrecheSection';
import { BookingSection } from '@/components/BookingSection';
import { ShopSection } from '@/components/ShopSection';
import { ClientAreaSection } from '@/components/ClientAreaSection';
import { AdminSection } from '@/components/AdminSection';
import { useTenant } from '@/lib/tenant-context';
import { PawPrint, Heart } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const { tenant } = useTenant();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-amber-50/30">
      <div>
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <main className="container mx-auto px-4 pt-8">
          {currentTab === 'home' && <HomeSection setCurrentTab={setCurrentTab} />}
          {currentTab === 'servicos' && <BathGroomSection setCurrentTab={setCurrentTab} />}
          {currentTab === 'hotel' && <HotelSection setCurrentTab={setCurrentTab} />}
          {currentTab === 'creche' && <CrecheSection setCurrentTab={setCurrentTab} />}
          {currentTab === 'loja' && <ShopSection />}
          {currentTab === 'agendar' && <BookingSection setCurrentTab={setCurrentTab} />}
          {currentTab === 'cliente' && <ClientAreaSection />}
          {currentTab === 'admin' && <AdminSection />}
        </main>
      </div>

      {/* Clean Cheerful Footer */}
      <footer className="bg-white border-t border-orange-100 py-10 text-slate-600 text-xs shadow-inner">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-orange-200 bg-white p-0.5 shadow-xs">
              {/* eslint-disable-next-next/no-img-element */}
              <img src="/logo.png" alt={tenant.companyName} className="w-full h-full object-contain" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm">{tenant.companyName}</p>
              <p className="text-[11px] text-slate-500 font-semibold">
                © {new Date().getFullYear()} {tenant.companyName}. Todos os direitos reservados.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-slate-600 font-bold">
            <button onClick={() => setCurrentTab('home')} className="hover:text-orange-600">Início</button>
            <button onClick={() => setCurrentTab('servicos')} className="hover:text-orange-600">Banho & Tosa</button>
            <button onClick={() => setCurrentTab('hotel')} className="hover:text-orange-600">Hotel Pet</button>
            <button onClick={() => setCurrentTab('creche')} className="hover:text-orange-600">Creche Daycare</button>
            <button onClick={() => setCurrentTab('agendar')} className="hover:text-orange-600">Agendamento</button>
            <button onClick={() => setCurrentTab('loja')} className="hover:text-orange-600">Loja</button>
            <button onClick={() => setCurrentTab('cliente')} className="hover:text-orange-600">Área Cliente</button>
            <button onClick={() => setCurrentTab('admin')} className="hover:text-purple-600 text-purple-700 font-black">Painel Admin</button>
          </div>

          <div className="text-right text-[11px] font-bold">
            <p className="flex items-center space-x-1 justify-end">
              <span>Desenvolvido com</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
              <span>pela tecnologia</span>
              <strong className="text-orange-600 font-black">Espoletta White Label Engine</strong>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
