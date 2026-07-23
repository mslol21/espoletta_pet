'use client';

import React, { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  User,
  Dog,
  Calendar,
  Syringe,
  Bed,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Heart,
  Camera,
  FileText,
  Sparkles,
} from 'lucide-react';

export function ClientAreaSection() {
  const { tenant, pets, appointments, hotelStays, daycareStays, addPet } = useTenant();

  const [activeSubTab, setActiveSubTab] = useState<'pets' | 'vacinas' | 'agendamentos' | 'hospedagem'>('pets');

  // New Pet Modal state
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Cão');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [ageYears, setAgeYears] = useState(2);
  const [weightKg, setWeightKg] = useState(10);
  const [color, setColor] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');

  const handleSavePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPet({
      tutorId: 'tut-client',
      tutorName: 'Tutor Autenticado',
      tutorPhone: tenant.phone,
      name,
      species,
      breed: breed || 'SRD',
      gender,
      ageYears,
      weightKg,
      color: color || 'Caramelo',
      coatType: 'Médio',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
      allergies: allergies || 'Nenhuma',
      medications: medications || 'Nenhum',
      notes: 'Cadastrado na área do cliente',
      vaccines: [
        {
          id: `vac-${Date.now()}`,
          name: 'V10 Polivalente',
          dateGiven: '2025-06-10',
          nextDue: '2026-06-10',
          veterinarian: 'Dra. Clínica Veterinária',
        },
      ],
    });

    setName('');
    setBreed('');
    setShowAddPetModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Tutor Profile Header */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-md">
            <div className="w-full h-full bg-orange-50 rounded-[14px] flex items-center justify-center font-black text-orange-600 text-xl">
              MO
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-slate-900">Mariana Oliveira</h2>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                TUTOR VIP
              </span>
            </div>
            <p className="text-slate-500 text-xs font-semibold">(11) 99887-1122 • mariana.oliveira@email.com</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddPetModal(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Pet</span>
        </button>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('pets')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeSubTab === 'pets'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Dog className="w-4 h-4" />
          <span>Meus Pets ({pets.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('vacinas')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeSubTab === 'vacinas'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Syringe className="w-4 h-4" />
          <span>Carteira de Vacinação</span>
        </button>

        <button
          onClick={() => setActiveSubTab('agendamentos')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeSubTab === 'agendamentos'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Meus Agendamentos</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hospedagem')}
          className={`px-4 py-2 rounded-xl font-black text-xs transition flex items-center space-x-2 ${
            activeSubTab === 'hospedagem'
              ? 'bg-orange-500 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Status Hotel & Creche</span>
        </button>
      </div>

      {/* PETS SUBTAB */}
      {activeSubTab === 'pets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md space-y-4"
            >
              <div className="h-44 relative overflow-hidden">
                {/* eslint-disable-next-next/no-img-element */}
                <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-xl text-white drop-shadow-md">{pet.name}</h3>
                    <p className="text-white text-xs font-bold drop-shadow-md">{pet.breed} • {pet.species}</p>
                  </div>
                  <span className="bg-white/90 backdrop-blur-sm text-orange-600 font-black text-[10px] px-2.5 py-1 rounded-full uppercase shadow-sm">
                    {pet.gender === 'MALE' ? 'Macho' : 'Fêmea'}
                  </span>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3 text-xs text-slate-700 font-semibold">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Idade</span>
                    <span className="font-black text-slate-900">{pet.ageYears} anos</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Peso</span>
                    <span className="font-black text-slate-900">{pet.weightKg} kg</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-black text-[11px]">Alergias & Cuidados:</p>
                  <p className="text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 font-semibold">
                    {pet.allergies || 'Nenhuma'}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 font-black text-[11px]">Medicamentos:</p>
                  <p className="text-teal-800 bg-teal-50 p-2 rounded-xl border border-teal-200 font-semibold">
                    {pet.medications || 'Nenhum'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VACCINES WALLET SUBTAB */}
      {activeSubTab === 'vacinas' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-md">
            <div className="flex items-center space-x-2">
              <Syringe className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-black text-slate-900">Carteira Digital de Vacinação dos Pets</h3>
            </div>

            {pets.map((pet) => (
              <div key={pet.id} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-300">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">{pet.name}</h4>
                      <p className="text-slate-500 text-xs font-semibold">{pet.breed}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                    Vacinação em Dia
                  </span>
                </div>

                <div className="space-y-2">
                  {pet.vaccines && pet.vaccines.length > 0 ? (
                    pet.vaccines.map((v) => (
                      <div
                        key={v.id}
                        className="bg-white p-3 rounded-xl flex items-center justify-between text-xs text-slate-700 border border-slate-200 font-semibold"
                      >
                        <div className="space-y-0.5">
                          <p className="font-black text-slate-900">{v.name}</p>
                          <p className="text-slate-500 text-[11px]">Aplicada em: {v.dateGiven} • Vet: {v.veterinarian}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold block">Próxima Dose</span>
                          <span className="font-black text-orange-600">{v.nextDue}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 italic">Nenhuma vacina registrada ainda.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPOINTMENTS HISTORY SUBTAB */}
      {activeSubTab === 'agendamentos' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-md">
          <h3 className="text-lg font-black text-slate-900">Histórico de Agendamentos & Fotos</h3>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3 font-semibold"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-wide">
                      Agendamento #{apt.id}
                    </span>
                    <h4 className="font-black text-slate-900 text-base">{apt.serviceName}</h4>
                    <p className="text-xs text-slate-500">
                      Pet: <strong className="text-slate-800">{apt.petName}</strong> • Tosador: <strong className="text-slate-800">{apt.staffName}</strong>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black px-3 py-1 rounded-full">
                      {apt.status}
                    </span>
                    <p className="text-xs font-black text-slate-900 mt-1">
                      {apt.date} às {apt.startTime}
                    </p>
                  </div>
                </div>

                {/* Before & After Photos Display */}
                {(apt.beforePhotoUrl || apt.afterPhotoUrl) && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-black text-slate-800 flex items-center space-x-1">
                      <Camera className="w-4 h-4 text-amber-500" />
                      <span>Fotos Antes & Depois do Banho / Tosa:</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {apt.beforePhotoUrl && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-500 font-bold block">Antes</span>
                          <div className="h-36 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                            {/* eslint-disable-next-next/no-img-element */}
                            <img src={apt.beforePhotoUrl} alt="Antes" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                      {apt.afterPhotoUrl && (
                        <div className="space-y-1">
                          <span className="text-[10px] text-emerald-600 font-black block">Depois ✨</span>
                          <div className="h-36 rounded-xl overflow-hidden border border-emerald-300 shadow-xs">
                            {/* eslint-disable-next-next/no-img-element */}
                            <img src={apt.afterPhotoUrl} alt="Depois" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOTEL & DAYCARE STATUS SUBTAB */}
      {activeSubTab === 'hospedagem' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-md">
            <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <Bed className="w-5 h-5 text-purple-600" />
              <span>Acompanhamento de Hospedagem & Creche em Tempo Real</span>
            </h3>

            {hotelStays.map((hs) => (
              <div key={hs.id} className="bg-slate-50 border border-purple-200 p-5 rounded-2xl space-y-4 font-semibold">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-xs font-black text-purple-600">{hs.suiteNumber}</span>
                    <h4 className="font-black text-slate-900 text-base">Hóspede: {hs.petName}</h4>
                    <p className="text-xs text-slate-500">Entrada: {hs.checkInDate} | Saída prevista: {hs.checkOutDate}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                    EM HOSPEDAGEM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-black text-slate-900">Plano de Alimentação:</p>
                    <p>{hs.feedingPlan}</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-black text-slate-900">Rotina de Passeios:</p>
                    <p>{hs.walkSchedule}</p>
                  </div>
                </div>

                {/* Log of Occurrences */}
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-900">Boletim Diário de Ocorrências:</p>
                  {hs.occurrences.map((occ) => (
                    <div key={occ.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1">
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
          </div>
        </div>
      )}

      {/* NEW PET MODAL */}
      {showAddPetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-slate-900">Cadastrar Novo Pet</h3>

            <form onSubmit={handleSavePet} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-slate-800 font-black mb-1">Nome do Pet *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Thor, Mel, Bob"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 p-2.5 rounded-xl outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-800 font-black mb-1">Espécie</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 p-2.5 rounded-xl outline-none font-semibold"
                  >
                    <option value="Cão">Cão</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-800 font-black mb-1">Raça</label>
                  <input
                    type="text"
                    placeholder="Ex: Golden, Poodle, SRD"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 p-2.5 rounded-xl outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPetModal(false)}
                  className="bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-2 rounded-xl"
                >
                  Salvar Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
