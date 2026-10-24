"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";
import { products } from "@/data/products";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("spices_wishlist_v1");
      if (saved) {
        setWishlistIds(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Failed to read wishlist from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("spices_wishlist_v1", JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn("Failed to save wishlist to localStorage", e);
    }
  }, [wishlistIds, isInitialized]);

  const toggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : "Product";

    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast(`Removed ${prodName} from wishlist`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Added ${prodName} to wishlist!`, "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const wishlistCount = wishlistIds.length;
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
