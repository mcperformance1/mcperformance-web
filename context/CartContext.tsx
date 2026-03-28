"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
  clearCart: () => void;
  cartCount: number;
  notification: { isVisible: boolean; message: string } | null;
  hideNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [notification, setNotification] = useState<{ isVisible: boolean; message: string } | null>(null);

  // Sayfa yüklendiğinde LocalStorage'dan sepeti çek
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("mcperformance_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error("Local storage sepete okunurken hata oluştu:", e);
    }
    setIsInitialized(true);
  }, []);

  // Sepet her güncellendiğinde LocalStorage'a kaydet (sadece init sonrasında)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("mcperformance_cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const showNotification = (message: string) => {
    setNotification({ isVisible: true, message });
    // Otomatik kapanma
    setTimeout(() => {
      setNotification((prev) => (prev ? { ...prev, isVisible: false } : null));
    }, 4000);
  };

  const hideNotification = () => {
    setNotification((prev) => (prev ? { ...prev, isVisible: false } : null));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    showNotification(`"${newItem.name}" Sepete Eklendi!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, notification, hideNotification 
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Kolay hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
