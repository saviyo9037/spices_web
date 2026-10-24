"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#e6dfd5]"
            : "bg-white/90 backdrop-blur-xs py-4 border-b border-[#e6dfd5]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="text-[#c69238] group-hover:scale-105 transition-transform">
              {/* Twin leaf logo matching reference */}
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#143627] group-hover:text-[#b07d22] transition-colors">
              Spices
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#143627] font-bold"
                      : "text-[#143627]/70 hover:text-[#143627]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Search Pill + Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-[#143627]">
            {/* Search Input Pill */}
            <div
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center justify-between w-44 lg:w-56 px-3.5 py-1.5 rounded-full bg-[#f3eee4] hover:bg-[#ece5d7] border border-[#e6dfd5] text-xs text-[#143627]/60 cursor-pointer transition-colors"
            >
              <span>Search spices...</span>
              <Search className="w-3.5 h-3.5 text-[#143627]/60" />
            </div>

            {/* Mobile search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="md:hidden w-8 h-8 flex items-center justify-center text-[#143627]/80 hover:text-[#143627]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Icon */}
            <Link
              href="/login"
              aria-label="Account"
              className="w-8 h-8 flex items-center justify-center text-[#143627]/80 hover:text-[#143627] transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/shop?tab=wishlist"
              aria-label="Wishlist"
              className="w-8 h-8 flex items-center justify-center text-[#143627]/80 hover:text-[#143627] transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#dfa84a] text-[#143627] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="w-8 h-8 flex items-center justify-center text-[#143627]/80 hover:text-[#143627] transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#dfa84a] text-[#143627] rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden w-8 h-8 flex items-center justify-center text-[#143627]/80 hover:text-[#143627]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e6dfd5] px-4 pt-3 pb-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#dfa84a] text-[#143627] font-bold"
                      : "text-[#143627]/80 hover:bg-[#f3eee4]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
