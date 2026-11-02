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
  MapPin,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "Spices", href: "/spices", icon: Sparkles },
  { name: "Combos", href: "/combos", icon: Layers },
  { name: "Recipes", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: Leaf },
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

  // SPECIAL CASE: Checkout Page - Focused, distraction-free
  if (isCheckout) {
    return (
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xs py-3.5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Idukki Spices">
            <Leaf className="w-6 h-6 text-[#70A82C] fill-[#70A82C]" />
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#08271d]">
                Idukki Spices
              </span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Direct from Farm
              </span>
            </div>
          </Link>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-700/80 font-normal">256-Bit SSL Encrypted</span>
          </div>

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

  // HOME PAGE: FLOATING PILL NAVBAR MATCHING REFERENCE IMAGE
  if (isHome) {
    return (
      <>
        {/* Top Utility Announcement Bar */}
        <div className="fixed top-0 inset-x-0 z-50 bg-[#072616] text-white text-[11px] sm:text-xs py-1.5 px-4 hidden md:block border-b border-white/10 shadow-xs pointer-events-auto">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 text-white/90">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#F5B900]" /> Idukki, Kerala
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#F5B900]" /> Pan India Delivery
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Leaf className="w-3.5 h-3.5 text-[#F5B900]" /> 100% Natural
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/90 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-[#F5B900]" />
              <span>Need Help? +91 98765 43210</span>
            </div>
          </div>
        </div>

        <header className="fixed top-2 md:top-10 inset-x-0 z-50 px-3 sm:px-6 header-fade pointer-events-none">
          <div className="pointer-events-auto max-w-[1080px] mx-auto rounded-full bg-[#FAF7EE] shadow-2xl shadow-black/30 border border-[#EDE7D9] py-1.5 px-2.5 sm:px-3 flex items-center justify-between gap-2">
            {/* Left Brand Badge with dark green fill, gold border & leaf icon */}
            <Link
              href="/"
              className="group flex items-center gap-2 bg-[#0B3320] border-2 border-[#D4AF37]/80 rounded-full px-3.5 sm:px-4 py-1.5 shadow-md shrink-0 transition-transform hover:scale-[1.02] active:scale-95"
              aria-label="Idukki Spices"
            >
              <Leaf className="w-4 h-4 text-[#F5B900] fill-[#F5B900]" />
              <span className="font-serif text-sm sm:text-base font-bold tracking-tight text-white whitespace-nowrap">
                Idukki Spices
              </span>
            </Link>

            {/* Center Navigation Links with little gold dot indicator */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = link.href === "/";
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex flex-col items-center group transition-colors ${
                      isActive
                        ? "bg-[#0B3320] text-white rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs"
                        : "text-[#2A3B30] hover:text-[#0B3320] text-xs font-medium py-1"
                    }`}
                  >
                    {!isActive && (
                      <span className="w-1 h-1 rounded-full bg-[#E5A93C] mb-0.5 opacity-90" />
                    )}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1.5">
              <div className="hidden sm:block h-4 w-px bg-slate-300 mx-1" />
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search spices"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-700 hover:text-[#0B3320] hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                href="/login"
                aria-label="My Account"
                className="w-8 h-8 hidden sm:flex items-center justify-center rounded-full text-slate-700 hover:text-[#0B3320] hover:bg-slate-200/60 transition-colors"
              >
                <User className="w-4 h-4" />
              </Link>
              <Link
                href="/shop?tab=wishlist"
                aria-label="Wishlist"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-700 hover:text-[#0B3320] hover:bg-slate-200/60 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </Link>
              <button
                onClick={openCart}
                aria-label="Shopping Cart"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-700 hover:text-[#0B3320] hover:bg-slate-200/60 transition-colors relative cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#E5A93C] text-[#062D1B] font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-[#FAF7EE] shadow-xs">
                  {cartCount > 0 ? cartCount : 3}
                </span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="w-8 h-8 lg:hidden flex items-center justify-center rounded-full text-slate-700 hover:text-[#0B3320] hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Search Modal */}
        <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF7EE] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#EDE7D9]">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-[#143627]" />
                    <span className="font-serif text-lg font-bold text-[#143627]">Idukki Spices</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-600 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#143627] hover:bg-white/80 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#EDE7D9] text-xs text-slate-500 text-center">
                From the misty hills of Idukki to your kitchen.
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // STANDARD PAGES (Shop, About, Blog, etc.)
  const position = "sticky top-0";
  const surface = isScrolled
    ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-900/5 py-2.5 sm:py-3"
    : "bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.03)] py-3 sm:py-4";

  return (
    <>
      {/* Top Utility Announcement Bar on standard pages too */}
      <div className="w-full bg-[#072616] text-white text-[11px] sm:text-xs py-1.5 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-white/90">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#F5B900]" /> Idukki, Kerala
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#F5B900]" /> Pan India Delivery
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Leaf className="w-3.5 h-3.5 text-[#F5B900]" /> 100% Natural
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/90 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-[#F5B900]" />
            <span>Need Help? +91 98765 43210</span>
          </div>
        </div>
      </div>

      <header className={`${position} z-40 w-full transition-all duration-300 ${surface}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Idukki Spices">
            <Leaf className="w-6 h-6 sm:w-7 sm:h-7 text-[#70A82C] fill-[#70A82C]" />
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#0B3322]">
                Idukki Spices
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.18em] text-[#3D6852] uppercase leading-none mt-0.5">
                PURE SPICES • PURE KERALA
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs xl:text-sm font-medium px-3 xl:px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#EAF3E7] text-[#2D5A34] font-semibold"
                      : "text-slate-700 hover:text-[#0B3322] hover:bg-slate-100/80"
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#599E2F] shrink-0" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 hover:text-[#08271d] hover:bg-slate-100 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              href="/login"
              aria-label="My Account"
              className="w-9 h-9 hidden sm:flex items-center justify-center rounded-full text-slate-700 hover:text-[#08271d] hover:bg-slate-100 transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>
            <Link
              href="/shop?tab=wishlist"
              aria-label="Wishlist"
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 hover:text-[#08271d] hover:bg-slate-100 transition-colors relative"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#70A82C]" />
              )}
            </Link>
            <button
              onClick={openCart}
              aria-label="Shopping Cart"
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 hover:text-[#08271d] hover:bg-slate-100 transition-colors relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#E5A93C] text-[#062D1B] font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="w-9 h-9 lg:hidden flex items-center justify-center rounded-full text-slate-700 hover:text-[#08271d] hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-[#70A82C]" />
                  <span className="font-serif text-lg font-bold text-[#08271d]">Idukki Spices</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
              Direct from the spice farms of Kerala
            </div>
          </div>
        </div>
      )}
    </>
  );
}
