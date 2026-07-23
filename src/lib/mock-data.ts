export interface TenantConfig {
  companyName: string;
  slug: string;
  logoUrl: string;
  bannerUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  autoReminders: boolean;
  customMessage: string;
  activeModules: {
    banhoTosa: boolean;
    hotel: boolean;
    creche: boolean;
    loja: boolean;
    agendamento: boolean;
    carteiraVacinas: boolean;
    estoque: boolean;
    financeiro: boolean;
    relatorios: boolean;
    crm: boolean;
    whatsapp: boolean;
  };
  operatingHours: {
    seg_fri: string;
    sab: string;
    dom: string;
  };
}

export interface PetVaccine {
  id: string;
  name: string;
  dateGiven: string;
  nextDue: string;
  veterinarian: string;
}

export interface Pet {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorPhone: string;
  name: string;
  species: string;
  breed: string;
  gender: 'MALE' | 'FEMALE';
  ageYears: number;
  weightKg: number;
  color: string;
  coatType: string;
  photoUrl: string;
  allergies: string;
  medications: string;
  notes: string;
  vaccines: PetVaccine[];
}

export interface Service {
  id: string;
  name: string;
  category: 'BANHO_TOSA' | 'HOTEL' | 'CRECHE' | 'OUTROS';
  description: string;
  basePrice: number;
  estimatedMinutes: number;
  allowedBreeds: string;
  imageUrl: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  avatarUrl: string;
  commissionRate: number;
  phone: string;
}

export interface Appointment {
  id: string;
  petId: string;
  petName: string;
  petBreed: string;
  petPhotoUrl: string;
  tutorName: string;
  tutorPhone: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  groomType?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  price: number;
}

export interface HotelStay {
  id: string;
  petId: string;
  petName: string;
  petPhotoUrl: string;
  tutorName: string;
  suiteNumber: string;
  checkInDate: string;
  checkOutDate: string;
  status: 'RESERVED' | 'CHECKED_IN' | 'CHECKED_OUT' | 'CANCELLED';
  feedingPlan: string;
  walkSchedule: string;
  medications: string;
  dailyRate: number;
  totalAmount: number;
  occurrences: Array<{ id: string; date: string; time: string; note: string; author: string }>;
  photos: string[];
}

export interface DaycareStay {
  id: string;
  petId: string;
  petName: string;
  petPhotoUrl: string;
  tutorName: string;
  entryTime: string;
  exitTime?: string;
  status: 'PRESENT' | 'DEPARTED';
  activities: string[];
  photos: string[];
  notes?: string;
  dailyRate: number;
}

export interface Product {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  sku: string;
  price: number;
  promotionalPrice?: number;
  stockQuantity: number;
  minStockAlert: number;
  description: string;
  images: string[];
  rating: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'DELIVERED' | 'CANCELLED';
  date: string;
  items: Array<{ productName: string; quantity: number; price: number }>;
}

export interface FinancialRecord {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  description: string;
  amount: number;
  date: string;
}

// --------------------------------------------------------
// DEFAULT MOCK DATA
// --------------------------------------------------------

export const initialTenantConfig: TenantConfig = {
  companyName: "Espoletta Pet Shop & Spa",
  slug: "espoletta",
  logoUrl: "/logo.png",
  bannerUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&auto=format&fit=crop&q=80",
  primaryColor: "#FF5722", // Vibrant Coral Orange
  secondaryColor: "#00E5FF", // Bright Electric Cyan
  accentColor: "#FFD166", // Sunny Yellow Highlight
  phone: "(11) 99988-7766",
  whatsapp: "5511999887766",
  email: "contato@espoletta.com.br",
  address: "Av. Brigadeiro Faria Lima, 2400 - Pinheiros",
  city: "São Paulo",
  state: "SP",
  zipCode: "05426-100",
  googleMapsUrl: "https://maps.google.com",
  instagramUrl: "https://instagram.com/espolettapet",
  facebookUrl: "https://facebook.com/espolettapet",
  autoReminders: true,
  customMessage: "Olá! Seu pet tem agendamento na Espoletta para {data} às {horario}. Responda 1 para confirmar.",
  activeModules: {
    banhoTosa: true,
    hotel: true,
    creche: true,
    loja: true,
    agendamento: true,
    carteiraVacinas: true,
    estoque: true,
    financeiro: true,
    relatorios: true,
    crm: true,
    whatsapp: true,
  },
  operatingHours: {
    seg_fri: "08:00 às 19:00",
    sab: "08:00 às 17:00",
    dom: "09:00 às 14:00 (Apenas Hotel/Creche)",
  },
};

export const initialStaff: Staff[] = [
  {
    id: "staff-1",
    name: "Lucas Silva",
    role: "Tosador Senior & Groomer",
    specialties: ["Tosa Tesoura", "Tosa Raça", "Trimming", "Banho Spa"],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    commissionRate: 20,
    phone: "(11) 98877-6655",
  },
  {
    id: "staff-2",
    name: "Camila Santos",
    role: "Especialista em Banhos & Felinos",
    specialties: ["Banho Felino", "Hidratação Profunda", "Tosa Higiênica"],
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    commissionRate: 15,
    phone: "(11) 97766-5544",
  },
  {
    id: "staff-3",
    name: "Dr. Rodrigo Lima",
    role: "Recreador de Creche & Monitores",
    specialties: ["Comportamento Canine", "Hotel", "Creche Passaporte"],
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    commissionRate: 10,
    phone: "(11) 96655-4433",
  },
];

export const initialServices: Service[] = [
  {
    id: "serv-1",
    name: "Banho & Tosa Higiênica Completo",
    category: "BANHO_TOSA",
    description: "Banho com shampoo neutro premium, secagem rápida, corte de unhas, limpeza de ouvidos e tosa higiênica nas patas e área íntima.",
    basePrice: 85,
    estimatedMinutes: 60,
    allowedBreeds: "Todas as raças",
    imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "serv-2",
    name: "Tosa de Raça na Tesoura / Bebê",
    category: "BANHO_TOSA",
    description: "Tosa artística 100% na tesoura respeitando o padrão oficial da raça (Golden, Poodle, Shih Tzu, Spitz, Lhasa). Inclui banho hidratação.",
    basePrice: 150,
    estimatedMinutes: 90,
    allowedBreeds: "Raças de Pelagem Longa",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "serv-3",
    name: "Spa Relaxante & Hidratação de Argan",
    category: "BANHO_TOSA",
    description: "Tratamento profundo para pelos ressecados, desembolo suave, banho de ozônio e perfume suave de fragrâncias naturais.",
    basePrice: 120,
    estimatedMinutes: 75,
    allowedBreeds: "Todas as raças",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "serv-4",
    name: "Diária de Hotel Pet - Suíte Master VIP",
    category: "HOTEL",
    description: "Hospedagem individual climatizada com webcam 24h, 3 passeios diários, recreação, alimentação conforme rotina do tutor e boletim com fotos.",
    basePrice: 140,
    estimatedMinutes: 1440,
    allowedBreeds: "Cães e Gatos de médio/pequeno porte",
    imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "serv-5",
    name: "Passaporte Creche Daycare (Diária)",
    category: "CRECHE",
    description: "Um dia inteiro de brincadeiras supervisionadas no gramado sintético, piscina de bolinhas, socialização e descanso no ar condicionado.",
    basePrice: 70,
    estimatedMinutes: 600,
    allowedBreeds: "Cães sociáveis e vacinados",
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&auto=format&fit=crop&q=80",
  },
];

export const initialPets: Pet[] = [
  {
    id: "pet-1",
    tutorId: "tut-1",
    tutorName: "Mariana Oliveira",
    tutorPhone: "(11) 99887-1122",
    name: "Thor",
    species: "Cão",
    breed: "Golden Retriever",
    gender: "MALE",
    ageYears: 3,
    weightKg: 32.5,
    color: "Dourado",
    coatType: "Longo",
    photoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=80",
    allergies: "Nenhuma alergia conhecida",
    medications: "Suplemento para articulações no almoço",
    notes: "Super dócil, adora brincar na água e de bolinha.",
    vaccines: [
      { id: "vac-1", name: "V10 Polivalente", dateGiven: "2025-10-15", nextDue: "2026-10-15", veterinarian: "Dra. Paula" },
      { id: "vac-2", name: "Raiva", dateGiven: "2025-10-15", nextDue: "2026-10-15", veterinarian: "Dra. Paula" },
      { id: "vac-3", name: "Gripal Bronchi-Shield", dateGiven: "2026-02-01", nextDue: "2027-02-01", veterinarian: "Dr. Roberto" },
    ],
  },
  {
    id: "pet-2",
    tutorId: "tut-2",
    tutorName: "Carlos Eduardo",
    tutorPhone: "(11) 98765-4321",
    name: "Mel",
    species: "Cão",
    breed: "Shih Tzu",
    gender: "FEMALE",
    ageYears: 2,
    weightKg: 5.2,
    color: "Branco e Dourado",
    coatType: "Longo e Sedoso",
    photoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80",
    allergies: "Sensível a shampoos com corante",
    medications: "Colírio lubrificante nos olhos após o banho",
    notes: "Tosa bebê na tesoura bem baixinha no corpo.",
    vaccines: [
      { id: "vac-4", name: "V10 Polivalente", dateGiven: "2025-08-20", nextDue: "2026-08-20", veterinarian: "Dr. Marcos" },
      { id: "vac-5", name: "Giárdia", dateGiven: "2025-09-01", nextDue: "2026-09-01", veterinarian: "Dr. Marcos" },
    ],
  },
  {
    id: "pet-3",
    tutorId: "tut-3",
    tutorName: "Fernanda Souza",
    tutorPhone: "(11) 97112-3344",
    name: "Luna",
    species: "Gato",
    breed: "Persa",
    gender: "FEMALE",
    ageYears: 4,
    weightKg: 4.1,
    color: "Cinza Prata",
    coatType: "Denso e Felpudo",
    photoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80",
    allergies: "Nenhuma",
    medications: "Pasta de malte para bolas de pelo",
    notes: "Secar com soprador de ruído baixo, assusta fácil.",
    vaccines: [
      { id: "vac-6", name: "V4 Felina", dateGiven: "2025-11-10", nextDue: "2026-11-10", veterinarian: "Dra. Amanda" },
    ],
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: "apt-1",
    petId: "pet-1",
    petName: "Thor",
    petBreed: "Golden Retriever",
    petPhotoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=80",
    tutorName: "Mariana Oliveira",
    tutorPhone: "(11) 99887-1122",
    serviceId: "serv-1",
    serviceName: "Banho & Tosa Higiênica Completo",
    staffId: "staff-1",
    staffName: "Lucas Silva",
    date: "2026-07-23",
    startTime: "09:00",
    endTime: "10:00",
    status: "CONFIRMED",
    groomType: "Higiênica",
    price: 85,
    notes: "Tutor solicitou perfume de baunilha leve.",
  },
  {
    id: "apt-2",
    petId: "pet-2",
    petName: "Mel",
    petBreed: "Shih Tzu",
    petPhotoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80",
    tutorName: "Carlos Eduardo",
    tutorPhone: "(11) 98765-4321",
    serviceId: "serv-2",
    serviceName: "Tosa de Raça na Tesoura / Bebê",
    staffId: "staff-1",
    staffName: "Lucas Silva",
    date: "2026-07-23",
    startTime: "10:30",
    endTime: "12:00",
    status: "IN_PROGRESS",
    groomType: "Bebê na Tesoura",
    price: 150,
    beforePhotoUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80",
    afterPhotoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80",
    notes: "Cortar unhas bem rente com cuidado.",
  },
  {
    id: "apt-3",
    petId: "pet-3",
    petName: "Luna",
    petBreed: "Persa",
    petPhotoUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80",
    tutorName: "Fernanda Souza",
    tutorPhone: "(11) 97112-3344",
    serviceId: "serv-3",
    serviceName: "Spa Relaxante & Hidratação de Argan",
    staffId: "staff-2",
    staffName: "Camila Santos",
    date: "2026-07-23",
    startTime: "14:00",
    endTime: "15:15",
    status: "PENDING",
    price: 120,
  },
];

export const initialHotelStays: HotelStay[] = [
  {
    id: "hotel-1",
    petId: "pet-1",
    petName: "Thor",
    petPhotoUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=80",
    tutorName: "Mariana Oliveira",
    suiteNumber: "Suíte 04 - VIP Premium",
    checkInDate: "2026-07-20",
    checkOutDate: "2026-07-25",
    status: "CHECKED_IN",
    feedingPlan: "250g Ração Premier Raças Grandes às 08h e 18h",
    walkSchedule: "3x ao dia (09h, 14h, 19h)",
    medications: "Condroton 1 comp ao dia no almoço",
    dailyRate: 140,
    totalAmount: 700,
    occurrences: [
      { id: "occ-1", date: "2026-07-21", time: "10:30", note: "Thor comeu toda a ração e brincou na piscina de bolinhas.", author: "Dr. Rodrigo" },
      { id: "occ-2", date: "2026-07-22", time: "16:00", note: "Passeio longo no gramado. Muito disposto!", author: "Dr. Rodrigo" },
    ],
    photos: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=80",
    ],
  },
];

export const initialDaycareStays: DaycareStay[] = [
  {
    id: "dc-1",
    petId: "pet-2",
    petName: "Mel",
    petPhotoUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80",
    tutorName: "Carlos Eduardo",
    entryTime: "2026-07-23T08:30:00",
    status: "PRESENT",
    activities: ["Socialização no gramado", "Brincadeiras de buscar o mordedor", "Hora do descanso soninho"],
    photos: ["https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&auto=format&fit=crop&q=80"],
    notes: "Mel interagiu muito bem com outros cães pequenos.",
    dailyRate: 70,
  },
];

export const initialProducts: Product[] = [
  {
    id: "prod-1",
    categoryId: "cat-1",
    categoryName: "Rações",
    name: "Ração Premier Formula Cães Adultos Raças Grandes - 15kg",
    sku: "RAC-PREM-15KG",
    price: 289.90,
    promotionalPrice: 269.90,
    stockQuantity: 18,
    minStockAlert: 5,
    description: "Alimento super premium formulado para atender todas as necessidades nutricionais de cães adultos de porte grande.",
    images: ["https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=80"],
    rating: 4.9,
  },
  {
    id: "prod-2",
    categoryId: "cat-2",
    categoryName: "Petiscos",
    name: "Biscoito Canino Natural de Frango e Cenoura - 250g",
    sku: "PET-BISC-250G",
    price: 24.90,
    stockQuantity: 42,
    minStockAlert: 10,
    description: "Petisco crocante 100% natural, sem corantes e sem conservantes artificiais.",
    images: ["https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&auto=format&fit=crop&q=80"],
    rating: 4.8,
  },
  {
    id: "prod-3",
    categoryId: "cat-3",
    categoryName: "Brinquedos",
    name: "Mordedor KONG Classic Vermelho - Tamanho M",
    sku: "BRIN-KONG-M",
    price: 99.90,
    promotionalPrice: 89.90,
    stockQuantity: 2, // Low stock trigger test
    minStockAlert: 4,
    description: "Brinquedo ultra resistente em borracha natural, ideal para rechear com petiscos e diminuir ansiedade.",
    images: ["https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=500&auto=format&fit=crop&q=80"],
    rating: 5.0,
  },
  {
    id: "prod-4",
    categoryId: "cat-4",
    categoryName: "Higiene",
    name: "Shampoo Neutro Hidratante Pelos Macios - 500ml",
    sku: "HIG-SHAMP-500",
    price: 45.00,
    stockQuantity: 25,
    minStockAlert: 6,
    description: "Fórmula suave com óleo de argan e camomila. Proporciona brilho maciez e facilidade ao pentear.",
    images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80"],
    rating: 4.7,
  },
];

export const initialOrders: Order[] = [
  {
    id: "ord-101",
    customerName: "Mariana Oliveira",
    customerPhone: "(11) 99887-1122",
    totalAmount: 369.80,
    status: "PAID",
    date: "2026-07-22",
    items: [
      { productName: "Ração Premier Formula 15kg", quantity: 1, price: 269.90 },
      { productName: "Mordedor KONG Classic M", quantity: 1, price: 99.90 },
    ],
  },
  {
    id: "ord-102",
    customerName: "Lucas Almeida",
    customerPhone: "(11) 98822-4455",
    totalAmount: 49.80,
    status: "PENDING",
    date: "2026-07-23",
    items: [
      { productName: "Biscoito Canino Natural 250g", quantity: 2, price: 24.90 },
    ],
  },
];

export const initialFinancialRecords: FinancialRecord[] = [
  { id: "fin-1", type: "INCOME", category: "Serviços Banho/Tosa", description: "Agendamento #apt-1 - Thor (Golden)", amount: 85, date: "2026-07-22" },
  { id: "fin-2", type: "INCOME", category: "Loja Virtual", description: "Pedido #ord-101 - Mariana Oliveira", amount: 369.80, date: "2026-07-22" },
  { id: "fin-3", type: "INCOME", category: "Hotel Pet", description: "Diárias Hospedagem Suíte Master Thor", amount: 700, date: "2026-07-20" },
  { id: "fin-4", type: "EXPENSE", category: "Comissão Tosador", description: "Comissão Lucas Silva (Agendamento #apt-1)", amount: 17, date: "2026-07-22" },
  { id: "fin-5", type: "EXPENSE", category: "Estoque Produtos", description: "Reposição Shampoos e Toalhas", amount: 250, date: "2026-07-18" },
];
