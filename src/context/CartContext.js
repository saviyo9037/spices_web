"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { addToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("spices_cart_v1");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("spices_cart_v1", JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [items, isInitialized]);

  const addToCart = (product, weightOption = null, quantity = 1) => {
    const selectedWeight = weightOption || (product.weights && product.weights[0]) || { label: "Standard", price: product.price, originalPrice: product.originalPrice };
    const itemPrice = selectedWeight.price || product.price;
    const itemOriginalPrice = selectedWeight.originalPrice || product.originalPrice || itemPrice;
    const weightLabel = selectedWeight.label || "Standard";

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.weight === weightLabel
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image,
            weight: weightLabel,
            price: itemPrice,
            originalPrice: itemOriginalPrice,
            quantity: quantity,
          },
        ];
      }
    });

    addToast(`Added ${quantity}x ${product.name} (${weightLabel}) to cart!`, "success");
    setIsCartOpen(true);
  };

  const removeFromCart = (id, weight) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.weight === weight)));
    addToast("Item removed from cart", "info");
  };

  const updateQuantity = (id, weight, qty) => {
    if (qty <= 0) {
      removeFromCart(id, weight);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.weight === weight ? { ...i, quantity: qty } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartOriginalTotal = items.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const cartSavings = Math.max(0, cartOriginalTotal - cartSubtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartCount,
        cartSubtotal,
        cartOriginalTotal,
        cartSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
