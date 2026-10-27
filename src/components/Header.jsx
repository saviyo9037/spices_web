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
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Home,
  Sparkles,
  Layers,
  Leaf,
  BookOpen,
  Mail,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Spices", href: "/spices", icon: Sparkles },
  { name: "Combos", href: "/combos", icon: Layers },
  { name: "About", href: "/about", icon: Leaf },
  { name: "Recipes", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = pathname === "/";
  const isCheckout = pathname === "/checkout";

  // Handle scroll state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Global Cmd+K / Ctrl+K shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // SPECIAL CASE: Checkout Page - Focused, distraction-free, 100% secure header
  if (isCheckout) {
    return (
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Idukki Spices">
            <svg
              className="w-7 h-7 fill-current text-[#dfa84a] group-hover:scale-105 transition-transform"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#08271d]">
                Idukki Spices
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Direct from Farm
              </span>
            </div>
          </Link>

          {/* Secure Checkout Trust Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-700/80 font-normal">256-Bit SSL Encrypted</span>
          </div>

          {/* Return link */}
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#08271d] px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <span>Back to Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  // STANDARD PAGES & HOME
  const position = isHome ? "fixed inset-x-0 top-0" : "sticky top-0";

  // Dynamic surface styling based on page and scroll position
  const surface = isHome
    ? isScrolled || mobileMenuOpen
      ? "bg-[#08271d]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20 py-2.5 sm:py-3"
      : "bg-gradient-to-b from-black/60 via-black/30 to-transparent border-b border-transparent py-4 sm:py-5"
    : isScrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-900/5 py-2.5 sm:py-3"
    : "bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] py-3 sm:py-4";

  // Text color tokens
  const logoText = isHome
    ? "text-white group-hover:text-[#dfa84a]"
    : "text-[#08271d] group-hover:text-emerald-800";

  const iconBtnClass = `w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-200 relative ${
    isHome
      ? "text-white/85 hover:text-white hover:bg-white/15"
      : "text-slate-700 hover:text-[#08271d] hover:bg-slate-100"
  }`;

  return (
    <>
      <header className={`${position} z-40 w-full transition-all duration-300 ${surface}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 min-[360px]:gap-2.5 group shrink-0" aria-label="Idukki Spices">
            <div className="relative flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-[#dfa84a] group-hover:scale-105 group-hover:rotate-6 transition-all duration-300"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
            </div>
            <span className={`font-serif text-lg min-[360px]:text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap transition-colors ${logoText}`}>
              Idukki Spices
            </span>
          </Link>

          {/* Desktop Navigation Links - Modern Interactive Pills */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-xs xl:text-sm font-medium px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? isHome
                        ? "bg-white/20 text-white font-semibold ring-1 ring-white/30 backdrop-blur-md shadow-xs"
                        : "bg-emerald-50 text-[#08271d] font-semibold ring-1 ring-emerald-700/20 shadow-xs"
                      : isHome
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-slate-600 hover:text-[#08271d] hover:bg-slate-100/90"
                  }`}
                >
                  {/* Glowing active indicator dot */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfa84a] shadow-[0_0_8px_#dfa84a] shrink-0 animate-pulse" />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-0.5 min-[360px]:gap-1.5 sm:gap-2.5">
            {/* Search Pill Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search spices"
              className={`hidden md:flex items-center justify-between gap-4 w-44 xl:w-56 h-9 sm:h-9.5 px-3.5 rounded-full border text-xs transition-all duration-200 cursor-pointer shadow-2xs group ${
                isHome
                  ? "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:border-white/40 hover:text-white backdrop-blur-md"
                  : "border-slate-200/90 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Search className={`w-3.5 h-3.5 ${isHome ? "text-[#dfa84a]" : "text-emerald-700"}`} />
                <span className="truncate">Search spices...</span>
              </div>
              <kbd
                className={`hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                  isHome
                    ? "bg-white/15 border-white/20 text-white/80"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                ⌘K
              </kbd>
            </button>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className={`${iconBtnClass} md:hidden`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account Link */}
            <Link
              href="/login"
              aria-label="Account"
              className={`${iconBtnClass} hidden sm:flex`}
              title="My Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Button */}
            <Link
              href="/shop?tab=wishlist"
              aria-label="Wishlist"
              className={iconBtnClass}
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-500 to-[#dfa84a] text-[#08271d] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              aria-label="Shopping cart"
              className={iconBtnClass}
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-amber-500 to-[#dfa84a] text-[#08271d] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className={`${iconBtnClass} lg:hidden`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-300 ${
              isHome
                ? "bg-[#08271d]/98 backdrop-blur-2xl border-white/10 text-white"
                : "bg-white/98 backdrop-blur-2xl border-slate-200 text-[#08271d] shadow-xl"
            }`}
          >
            {/* Mobile Quick Search Input */}
            <div className="pt-1 pb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm ${
                  isHome
                    ? "bg-white/10 border-white/20 text-white/70"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#dfa84a]" />
                  <span>Search all spices...</span>
                </span>
                <span className="text-xs font-semibold text-[#dfa84a]">Find</span>
              </button>
            </div>

            {/* Navigation links with icons */}
            <nav aria-label="Mobile Navigation" className="space-y-1">
              {[...navLinks, { name: "My Account", href: "/login", icon: User }].map((link) => {
                const IconComponent = link.icon;
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(link.href + "/");

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? isHome
                          ? "bg-white/20 text-white font-bold ring-1 ring-white/30"
                          : "bg-emerald-50 text-[#08271d] font-bold ring-1 ring-emerald-700/20"
                        : isHome
                        ? "text-white/80 hover:bg-white/10 hover:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#08271d]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-[#dfa84a]"
                            : isHome
                            ? "text-white/50"
                            : "text-slate-400"
                        }`}
                      />
                      <span>{link.name}</span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#dfa84a] shadow-[0_0_8px_#dfa84a]" />
                    ) : (
                      <ChevronRight
                        className={`w-4 h-4 ${isHome ? "text-white/30" : "text-slate-300"}`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Trust and Help Pill in Mobile Menu */}
            <div
              className={`mt-4 pt-3 border-t flex items-center justify-between text-xs ${
                isHome ? "border-white/10 text-white/70" : "border-slate-100 text-slate-500"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#dfa84a]" />
                <span>100% Pure Idukki Spices</span>
              </div>
              <Link
                href="/contact"
                className={`flex items-center gap-1 font-semibold ${
                  isHome ? "text-[#dfa84a]" : "text-emerald-800"
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Support</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
