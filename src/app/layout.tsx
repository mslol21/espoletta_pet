import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TenantProvider } from '@/lib/tenant-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Espoletta Pet Shop & Spa — Banho & Tosa, Hotel VIP e Creche Daycare',
  description: 'O melhor Pet Shop e Centro Estético da região! Serviços de Banho & Tosa com fotos Antes/Depois, Hotel Pet climatizado, Creche recreativa e Loja Virtual.',
  keywords: ['Espoletta', 'pet shop espoletta', 'banho e tosa', 'hotel pet', 'creche pet daycare', 'agendamento pet online'],
  openGraph: {
    title: 'Espoletta Pet Shop & Spa',
    description: 'Cuidado Premium, Amor & Especialistas para o seu Melhor Amigo.',
    type: 'website',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="light scroll-smooth">
      <body className={`${inter.className} bg-amber-50/30 text-slate-800 min-h-screen antialiased selection:bg-orange-500 selection:text-white`}>
        <TenantProvider>{children}</TenantProvider>
      </body>
    </html>
  );
}
