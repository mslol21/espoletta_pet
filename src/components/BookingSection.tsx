'use client';

import React, { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles,
  Plus,
  ArrowRight,
  ArrowLeft,
  Info,
} from 'lucide-react';

interface BookingSectionProps {
  setCurrentTab: (tab: string) => void;
}

export function BookingSection({ setCurrentTab }: BookingSectionProps) {
  const { tenant, services, pets, staffList, appointments, addAppointment, addPet } = useTenant();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [selectedPetId, setSelectedPetId] = useState<string>(pets[0]?.id || '');

  // New Pet modal/form state
  const [showNewPetForm, setShowNewPetForm] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState('Cão');
  const [newPetGender, setNewPetGender] = useState<'MALE' | 'FEMALE'>('MALE');

  // Booking Parameters
  const [bookingDate, setBookingDate] = useState('2026-07-24');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [selectedStaffId, setSelectedStaffId] = useState<string>(staffList[0]?.id || '');
  const [groomType, setGroomType] = useState('Higiênica');
  const [notes, setNotes] = useState('');

  // Confirmation result
  const [confirmedAptId, setConfirmedAptId] = useState<string | null>(null);

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectedPet = pets.find((p) => p.id === selectedPetId);
  const selectedStaff = staffList.find((st) => st.id === selectedStaffId);

  // Available Time Slots
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const isSlotBooked = (time: string) => {
    return appointments.some(
      (a) =>
        a.date === bookingDate &&
        a.startTime === time &&
        a.staffId === selectedStaffId &&
        a.status !== 'CANCELLED'
    );
  };

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const createdPet = {
      tutorId: 'tut-guest',
      tutorName: 'Tutor Visitante',
      tutorPhone: tenant.phone,
      name: newPetName,
      species: newPetSpecies,
      breed: newPetBreed || 'SRD',
      gender: newPetGender,
      ageYears: 2,
      weightKg: 8.0,
      color: 'Geral',
      coatType: 'Médio',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80',
      allergies: 'Nenhuma',
      medications: 'Nenhum',
      notes: 'Cadastrado no agendamento online',
      vaccines: [],
    };

    addPet(createdPet);
    setNewPetName('');
    setNewPetBreed('');
    setShowNewPetForm(false);
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedPet || !selectedStaff) return;

    if (isSlotBooked(bookingTime)) {
      alert('Atenção: Este horário já possui um agendamento com este tosador. Por favor escolha outro horário.');
      return;
    }

    const newAptData = {
      petId: selectedPet.id,
      petName: selectedPet.name,
      petBreed: selectedPet.breed,
      petPhotoUrl: selectedPet.photoUrl,
      tutorName: selectedPet.tutorName || 'Cliente Online',
      tutorPhone: selectedPet.tutorPhone || tenant.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      staffId: selectedStaff.id,
      staffName: selectedStaff.name,
      date: bookingDate,
      startTime: bookingTime,
      endTime: `${parseInt(bookingTime.split(':')[0]) + 1}:00`,
      status: 'CONFIRMED' as const,
      groomType,
      notes,
      price: selectedService.basePrice,
    };

    addAppointment(newAptData);
    setConfirmedAptId(`apt-${Date.now()}`);
    setStep(4);
  };

  const generateWhatsAppConfirmationLink = () => {
    const cleanPhone = tenant.whatsapp.replace(/\D/g, '');
    const msg = `Olá ${tenant.companyName}! Gostaria de confirmar meu agendamento:\n\n` +
      `🐾 Pet: ${selectedPet?.name} (${selectedPet?.breed})\n` +
      `✂️ Serviço: ${selectedService?.name}\n` +
      `👤 Tosador: ${selectedStaff?.name}\n` +
      `📅 Data: ${bookingDate} às ${bookingTime}\n` +
      `💰 Valor: R$ ${selectedService?.basePrice.toFixed(2)}\n\n` +
      `Obrigado!`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 bg-orange-100 border border-orange-200 text-orange-600 px-3 py-1 rounded-full text-xs font-black uppercase">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span>Agendamento Online Instantâneo Espoletta</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900">Agende o Horário do Seu Pet</h2>
        <p className="text-slate-600 text-sm font-semibold">
          Sem filas e sem espera. Selecione o serviço, o pet e o tosador ideal.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-4 gap-2 bg-white border border-slate-200 p-3 rounded-2xl shadow-sm">
        <div
          className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-black ${
            step >= 1 ? 'bg-orange-500 text-white' : 'text-slate-400'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">1</span>
          <span className="hidden sm:inline">1. Serviço</span>
        </div>

        <div
          className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-black ${
            step >= 2 ? 'bg-orange-500 text-white' : 'text-slate-400'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">2</span>
          <span className="hidden sm:inline">2. Pet & Tosador</span>
        </div>

        <div
          className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-black ${
            step >= 3 ? 'bg-orange-500 text-white' : 'text-slate-400'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
          <span className="hidden sm:inline">3. Data & Horário</span>
        </div>

        <div
          className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-black ${
            step === 4 ? 'bg-emerald-600 text-white' : 'text-slate-400'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">4</span>
          <span className="hidden sm:inline">4. Confirmação</span>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* STEP 1: SERVICE SELECTION */}
      {/* ---------------------------------------------------- */}
      {step === 1 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-md">
          <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
            <Scissors className="w-5 h-5 text-orange-500" />
            <span>Selecione o Serviço Desejado</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((serv) => {
              const isSelected = selectedServiceId === serv.id;
              return (
                <div
                  key={serv.id}
                  onClick={() => setSelectedServiceId(serv.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start space-x-4 ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-400 shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                    {/* eslint-disable-next-next/no-img-element */}
                    <img src={serv.imageUrl} alt={serv.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-sm">{serv.name}</h4>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500" />}
                    </div>
                    <p className="text-slate-600 text-xs line-clamp-2 font-medium">{serv.description}</p>
                    <div className="flex items-center justify-between pt-1 font-bold">
                      <span className="text-xs text-slate-500">~{serv.estimatedMinutes} min</span>
                      <span className="text-orange-600 font-black text-sm">
                        R$ {serv.basePrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-6 py-3 rounded-xl transition flex items-center space-x-2 shadow-md shadow-orange-500/20"
            >
              <span>Próximo Passo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 2: PET & STAFF SELECTION */}
      {/* ---------------------------------------------------- */}
      {step === 2 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-8 shadow-md">
          {/* Select Pet */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <User className="w-5 h-5 text-orange-500" />
                <span>Escolha o Pet</span>
              </h3>
              <button
                onClick={() => setShowNewPetForm(!showNewPetForm)}
                className="bg-orange-50 hover:bg-orange-100 text-orange-600 font-extrabold text-xs px-3 py-1.5 rounded-xl border border-orange-200 flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Cadastrar Novo Pet</span>
              </button>
            </div>

            {/* Quick New Pet Form */}
            {showNewPetForm && (
              <form onSubmit={handleCreatePet} className="bg-amber-50/50 border border-amber-200 p-4 rounded-2xl space-y-3">
                <p className="text-xs font-black text-orange-600">Novo Pet Rápido:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Nome do Pet *"
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    required
                    className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-2 rounded-xl focus:border-orange-500 outline-none font-semibold"
                  />
                  <input
                    type="text"
                    placeholder="Raça (Ex: Golden, Poodle)"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-2 rounded-xl focus:border-orange-500 outline-none font-semibold"
                  />
                  <select
                    value={newPetSpecies}
                    onChange={(e) => setNewPetSpecies(e.target.value)}
                    className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-2 rounded-xl outline-none font-semibold"
                  >
                    <option value="Cão">Cão</option>
                    <option value="Gato">Gato</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs px-4 py-2 rounded-xl"
                >
                  Salvar Pet
                </button>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {pets.map((pet) => {
                const isSelected = selectedPetId === pet.id;
                return (
                  <div
                    key={pet.id}
                    onClick={() => setSelectedPetId(pet.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-400'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-900 text-sm">{pet.name}</h4>
                      <p className="text-slate-500 text-xs font-semibold">{pet.breed}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Select Staff */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span>Escolha o Tosador / Groomer</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {staffList.map((st) => {
                const isSelected = selectedStaffId === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStaffId(st.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex items-center space-x-3 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      {/* eslint-disable-next-next/no-img-element */}
                      <img src={st.avatarUrl} alt={st.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-900 text-sm">{st.name}</h4>
                      <p className="text-purple-600 text-[11px] font-bold">{st.role}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grooming Type Options */}
          {selectedService?.category === 'BANHO_TOSA' && (
            <div className="space-y-3 border-t border-slate-100 pt-6">
              <label className="block font-black text-xs text-slate-800">
                Preferência de Tosa (Opcional):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Higiênica', 'Bebê na Tesoura', 'Máquina Padrão', 'Somente Banho & Hidratação'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGroomType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      groomType === type
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-xl transition flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black text-sm px-6 py-2.5 rounded-xl transition flex items-center space-x-2 shadow-md shadow-orange-500/20"
            >
              <span>Escolher Data & Horário</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 3: DATE & TIME SLOT SELECTION */}
      {/* ---------------------------------------------------- */}
      {step === 3 && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-md">
          <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
            <span>Selecione a Data e o Horário</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Input */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">Escolha o Dia:</label>
              <input
                type="date"
                value={bookingDate}
                min="2026-07-23"
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-black text-sm px-4 py-3 rounded-xl outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-slate-500 font-semibold flex items-center space-x-1 pt-1">
                <Info className="w-3.5 h-3.5 text-orange-500" />
                <span>Horários verificados em tempo real contra conflitos.</span>
              </p>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-800">Horários Disponíveis:</label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot) => {
                  const booked = isSlotBooked(slot);
                  const isSelected = bookingTime === slot;
                  return (
                    <button
                      key={slot}
                      disabled={booked}
                      onClick={() => setBookingTime(slot)}
                      className={`py-2.5 rounded-xl font-black text-xs border transition flex items-center justify-center space-x-1 ${
                        booked
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2 border-t border-slate-100 pt-4">
            <label className="block text-xs font-black text-slate-800">Observações para a Equipe (Opcional):</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Cão é um pouco agitado com soprador, tomar cuidado com as orelhas..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs p-3 rounded-xl outline-none focus:border-orange-500 font-medium"
            />
          </div>

          {/* Order Summary Box */}
          <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-bold">
              <span>Serviço:</span>
              <span className="font-black text-slate-900">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-bold">
              <span>Pet:</span>
              <span className="font-black text-slate-900">{selectedPet?.name} ({selectedPet?.breed})</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-bold">
              <span>Tosador:</span>
              <span className="font-black text-slate-900">{selectedStaff?.name}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600 font-bold">
              <span>Data e Hora:</span>
              <span className="font-black text-orange-600">{bookingDate} às {bookingTime}</span>
            </div>
            <div className="flex justify-between text-sm font-black text-slate-900 border-t border-amber-200 pt-2">
              <span>Total Estimado:</span>
              <span className="text-emerald-600">R$ {selectedService?.basePrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setStep(2)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-xl transition flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
            <button
              onClick={handleConfirmBooking}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm px-8 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition flex items-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Confirmar Agendamento</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STEP 4: SUCCESS CONFIRMATION */}
      {/* ---------------------------------------------------- */}
      {step === 4 && (
        <div className="bg-white border border-emerald-300 rounded-3xl p-8 text-center space-y-6 max-w-2xl mx-auto shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Agendamento Realizado com Sucesso!</h3>
            <p className="text-slate-600 text-xs font-semibold">
              Seu agendamento foi registrado no sistema da <strong className="text-orange-600">{tenant.companyName}</strong>.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-left space-y-2 text-xs font-bold text-slate-700">
            <p>Código do Agendamento: <strong className="text-slate-900">{confirmedAptId}</strong></p>
            <p>Pet: <strong className="text-slate-900">{selectedPet?.name}</strong></p>
            <p>Serviço: <strong className="text-slate-900">{selectedService?.name}</strong></p>
            <p>Data: <strong className="text-orange-600">{bookingDate} às {bookingTime}</strong></p>
            <p>Tosador: <strong className="text-slate-900">{selectedStaff?.name}</strong></p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <a
              href={generateWhatsAppConfirmationLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Enviar Confirmação no WhatsApp</span>
            </a>

            <button
              onClick={() => setCurrentTab('cliente')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-6 py-3 rounded-xl border border-slate-200 transition"
            >
              Ver em Meus Agendamentos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
