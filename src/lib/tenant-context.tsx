'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TenantConfig,
  Pet,
  Service,
  Staff,
  Appointment,
  HotelStay,
  DaycareStay,
  Product,
  Order,
  FinancialRecord,
  initialTenantConfig,
  initialPets,
  initialServices,
  initialStaff,
  initialAppointments,
  initialHotelStays,
  initialDaycareStays,
  initialProducts,
  initialOrders,
  initialFinancialRecords,
} from './mock-data';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface TenantContextType {
  tenant: TenantConfig;
  updateTenant: (newConfig: Partial<TenantConfig>) => void;
  
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id'>) => void;
  updatePet: (id: string, petData: Partial<Pet>) => void;
  
  services: Service[];
  addService: (service: Omit<Service, 'id'>) => void;
  
  staffList: Staff[];
  
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, 'id'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status'], photos?: { before?: string; after?: string }) => void;
  
  hotelStays: HotelStay[];
  addHotelStay: (stay: Omit<HotelStay, 'id'>) => void;
  addHotelOccurrence: (stayId: string, note: string, author: string) => void;
  updateHotelStatus: (stayId: string, status: HotelStay['status']) => void;
  
  daycareStays: DaycareStay[];
  addDaycareStay: (stay: Omit<DaycareStay, 'id'>) => void;
  updateDaycareStatus: (stayId: string, status: DaycareStay['status']) => void;
  
  products: Product[];
  updateProductStock: (id: string, newStock: number) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  
  orders: Order[];
  createOrder: (customerName: string, customerPhone: string, items: CartItem[]) => Order;
  
  financials: FinancialRecord[];
  addFinancialRecord: (record: Omit<FinancialRecord, 'id'>) => void;
  
  // Shopping Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig>(initialTenantConfig);
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [hotelStays, setHotelStays] = useState<HotelStay[]>(initialHotelStays);
  const [daycareStays, setDaycareStays] = useState<DaycareStay[]>(initialDaycareStays);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [financials, setFinancials] = useState<FinancialRecord[]>(initialFinancialRecords);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Apply Dynamic Tenant Theme (CSS Variables)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', tenant.primaryColor);
      root.style.setProperty('--color-secondary', tenant.secondaryColor);
      root.style.setProperty('--color-accent', tenant.accentColor);
    }
  }, [tenant.primaryColor, tenant.secondaryColor, tenant.accentColor]);

  const updateTenant = (newConfig: Partial<TenantConfig>) => {
    setTenant((prev) => ({
      ...prev,
      ...newConfig,
      activeModules: newConfig.activeModules ? { ...prev.activeModules, ...newConfig.activeModules } : prev.activeModules,
      operatingHours: newConfig.operatingHours ? { ...prev.operatingHours, ...newConfig.operatingHours } : prev.operatingHours,
    }));
  };

  const addPet = (petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = { ...petData, id: `pet-${Date.now()}` };
    setPets((prev) => [newPet, ...prev]);
  };

  const updatePet = (id: string, petData: Partial<Pet>) => {
    setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...petData } : p)));
  };

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = { ...serviceData, id: `serv-${Date.now()}` };
    setServices((prev) => [...prev, newService]);
  };

  const addAppointment = (aptData: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = { ...aptData, id: `apt-${Date.now()}` };
    setAppointments((prev) => [newApt, ...prev]);

    // Also register financial income record
    const newFin: FinancialRecord = {
      id: `fin-${Date.now()}`,
      type: 'INCOME',
      category: 'Serviços',
      description: `Agendamento #${newApt.id} - ${newApt.petName} (${newApt.serviceName})`,
      amount: newApt.price,
      date: newApt.date,
    };
    setFinancials((prev) => [newFin, ...prev]);
  };

  const updateAppointmentStatus = (
    id: string,
    status: Appointment['status'],
    photos?: { before?: string; after?: string }
  ) => {
    setAppointments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            status,
            beforePhotoUrl: photos?.before || a.beforePhotoUrl,
            afterPhotoUrl: photos?.after || a.afterPhotoUrl,
          };
        }
        return a;
      })
    );
  };

  const addHotelStay = (stayData: Omit<HotelStay, 'id'>) => {
    const newStay: HotelStay = { ...stayData, id: `hotel-${Date.now()}` };
    setHotelStays((prev) => [newStay, ...prev]);
  };

  const addHotelOccurrence = (stayId: string, note: string, author: string) => {
    setHotelStays((prev) =>
      prev.map((s) => {
        if (s.id === stayId) {
          const newOcc = {
            id: `occ-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            note,
            author,
          };
          return { ...s, occurrences: [...s.occurrences, newOcc] };
        }
        return s;
      })
    );
  };

  const updateHotelStatus = (stayId: string, status: HotelStay['status']) => {
    setHotelStays((prev) => prev.map((s) => (s.id === stayId ? { ...s, status } : s)));
  };

  const addDaycareStay = (stayData: Omit<DaycareStay, 'id'>) => {
    const newStay: DaycareStay = { ...stayData, id: `dc-${Date.now()}` };
    setDaycareStays((prev) => [newStay, ...prev]);
  };

  const updateDaycareStatus = (stayId: string, status: DaycareStay['status']) => {
    setDaycareStays((prev) => prev.map((s) => (s.id === stayId ? { ...s, status } : s)));
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, stockQuantity: newStock } : p)));
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = { ...prodData, id: `prod-${Date.now()}` };
    setProducts((prev) => [newProd, ...prev]);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (total, item) => total + (item.product.promotionalPrice || item.product.price) * item.quantity,
    0
  );

  const createOrder = (customerName: string, customerPhone: string, items: CartItem[]): Order => {
    const totalAmount = items.reduce(
      (tot, item) => tot + (item.product.promotionalPrice || item.product.price) * item.quantity,
      0
    );
    const newOrder: Order = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      customerPhone,
      totalAmount,
      status: 'PENDING',
      date: new Date().toISOString().split('T')[0],
      items: items.map((i) => ({
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.promotionalPrice || i.product.price,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct Stock
    items.forEach((item) => {
      updateProductStock(item.product.id, Math.max(0, item.product.stockQuantity - item.quantity));
    });

    clearCart();
    return newOrder;
  };

  const addFinancialRecord = (record: Omit<FinancialRecord, 'id'>) => {
    const newRecord: FinancialRecord = { ...record, id: `fin-${Date.now()}` };
    setFinancials((prev) => [newRecord, ...prev]);
  };

  return (
    <TenantContext.Provider
      value={{
        tenant,
        updateTenant,
        pets,
        addPet,
        updatePet,
        services,
        addService,
        staffList,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        hotelStays,
        addHotelStay,
        addHotelOccurrence,
        updateHotelStatus,
        daycareStays,
        addDaycareStay,
        updateDaycareStatus,
        products,
        updateProductStock,
        addProduct,
        orders,
        createOrder,
        financials,
        addFinancialRecord,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
