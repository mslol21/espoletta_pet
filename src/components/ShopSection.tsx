'use client';

import React, { useState } from 'react';
import { useTenant, CartItem } from '@/lib/tenant-context';
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  Trash2,
  MessageCircle,
  CheckCircle2,
  Tag,
  Star,
  Plus,
  Minus,
  Sparkles,
  X,
  Filter,
} from 'lucide-react';

export function ShopSection() {
  const { tenant, products, cart, addToCart, removeFromCart, clearCart, cartTotal, createOrder } = useTenant();

  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Customer Checkout Modal
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [completedOrderWhatsappLink, setCompletedOrderWhatsappLink] = useState<string | null>(null);

  const categories = ['TODOS', 'Rações', 'Petiscos', 'Brinquedos', 'Higiene', 'Medicamentos', 'Acessórios'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'TODOS' || p.categoryName === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || cart.length === 0) return;

    const order = createOrder(customerName, customerPhone, cart);

    // Format WhatsApp Order Message
    const cleanPhone = tenant.whatsapp.replace(/\D/g, '');
    let msg = `🛍️ *NOVO PEDIDO DE COMPRA - ${tenant.companyName}*\n`;
    msg += `-----------------------------------\n`;
    msg += `📋 *Pedido:* #${order.id}\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    msg += `📞 *Telefone:* ${customerPhone}\n\n`;
    msg += `📦 *ITENS DO PEDIDO:*\n`;

    cart.forEach((item) => {
      const price = item.product.promotionalPrice || item.product.price;
      msg += `• ${item.quantity}x ${item.product.name} (R$ ${price.toFixed(2)})\n`;
    });

    msg += `\n💰 *TOTAL DO PEDIDO:* R$ ${cartTotal.toFixed(2)}\n`;
    msg += `-----------------------------------\n`;
    msg += `Aguardo instruções de entrega e chave PIX para pagamento!`;

    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    setCompletedOrderWhatsappLink(waLink);
  };

  return (
    <div className="space-y-8 pb-16 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-300 text-amber-800 px-3 py-1 rounded-full text-xs font-black uppercase">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Loja Virtual Integrada WhatsApp</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Produtos & Acessórios Pet</h2>
          <p className="text-slate-600 text-sm font-semibold">
            Entregas rápidas e pagamento direto via WhatsApp com a confiança de sempre.
          </p>
        </div>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-3 shrink-0"
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          <span>Meu Carrinho ({cartItemCount})</span>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-lg font-black">
            R$ {cartTotal.toFixed(2)}
          </span>
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white border border-slate-200 p-4 rounded-3xl space-y-4 shadow-md">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Buscar por nome do produto ou código SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm pl-12 pr-4 py-3 rounded-2xl outline-none focus:border-amber-500 font-semibold"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const hasPromo = product.promotionalPrice && product.promotionalPrice < product.price;
          const finalPrice = product.promotionalPrice || product.price;

          return (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-400 transition duration-300 group shadow-md hover:shadow-xl"
            >
              <div>
                <div className="h-48 bg-slate-50 overflow-hidden relative p-4 flex items-center justify-center border-b border-slate-100">
                  {hasPromo && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white font-black text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md z-10">
                      OFERTA
                    </span>
                  )}

                  {/* eslint-disable-next-next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute bottom-3 right-3 bg-white/90 text-slate-500 font-bold text-[10px] px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                    SKU: {product.sku}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase">
                      {product.categoryName}
                    </span>
                    <div className="flex items-center space-x-1 text-amber-500 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm line-clamp-2">{product.name}</h3>
                  <p className="text-slate-600 text-xs line-clamp-2 font-medium">{product.description}</p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-black text-slate-900">R$ {finalPrice.toFixed(2)}</span>
                  {hasPromo && (
                    <span className="text-xs text-slate-400 line-through font-bold">
                      R$ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stockQuantity === 0}
                  className={`w-full py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center space-x-2 ${
                    product.stockQuantity === 0
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{product.stockQuantity === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------------------------------------------- */}
      {/* CART DRAWER / MODAL */}
      {/* ---------------------------------------------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full border-l border-slate-200 p-6 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6 text-amber-500" />
                <h3 className="text-lg font-black text-slate-900">Carrinho de Compras</h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 text-sm font-semibold">Seu carrinho está vazio.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cart.map((item) => {
                  const price = item.product.promotionalPrice || item.product.price;
                  return (
                    <div
                      key={item.product.id}
                      className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center space-x-3"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white p-1 shrink-0 flex items-center justify-center border border-slate-200">
                        {/* eslint-disable-next-next/no-img-element */}
                        <img src={item.product.images[0]} alt={item.product.name} className="max-h-full object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                        <p className="text-amber-600 text-xs font-black">R$ {price.toFixed(2)} x {item.quantity}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg bg-white border border-rose-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <div className="flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Total:</span>
                  <span className="text-amber-600 text-lg font-black">R$ {cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setShowCheckoutModal(true);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm py-3.5 rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Finalizar Pedido pelo WhatsApp</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CHECKOUT MODAL */}
      {/* ---------------------------------------------------- */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-md space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-current" />
                <span>Dados para Envio do Pedido</span>
              </h3>
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  setCompletedOrderWhatsappLink(null);
                }}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!completedOrderWhatsappLink ? (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariana Oliveira"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-amber-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-800 mb-1">Seu Telefone WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: (11) 99999-8888"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl outline-none focus:border-amber-500 font-semibold"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl text-xs space-y-1 font-semibold text-slate-700 border border-amber-200">
                  <p>Total do Pedido: <strong className="text-amber-700 font-black">R$ {cartTotal.toFixed(2)}</strong></p>
                  <p className="text-[11px] text-slate-500 font-medium">Ao clicar abaixo, seu pedido será enviado pronto para a loja no WhatsApp.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl transition flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Gerar Pedido no WhatsApp</span>
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-black text-slate-900 text-base">Pedido Gerado com Sucesso!</h4>
                <p className="text-slate-600 text-xs font-semibold">
                  Clique no botão abaixo para abrir a conversa no WhatsApp e transmitir a sua solicitação.
                </p>

                <a
                  href={completedOrderWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-xl transition flex items-center justify-center space-x-2 inline-flex"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Abrir WhatsApp Agora</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
