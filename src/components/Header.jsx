"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Spices", href: "/spices" },
  { name: "Combos", href: "/combos" },
  { name: "About", href: "/about" },
  { name: "Recipes", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // On the home page the header floats over the hero image and uses light text.
  // Everywhere else it is a normal sticky white bar.
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // close the mobile menu on navigation
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  const position = isHome ? "fixed inset-x-0 top-0" : "sticky top-0";
  const surface = isHome
    ? isScrolled || mobileMenuOpen
      ? "bg-[#08271D]/90 backdrop-blur-xl border-b border-white/10 shadow-lg py-3"
      : "bg-gradient-to-b from-black/50 to-transparent border-b border-transparent py-5"
    : isScrolled
      ? "bg-white/95 backdrop-blur-md shadow-md border-b border-line py-3"
      : "bg-white/90 backdrop-blur-xs border-b border-line py-4";

  const text = isHome ? "text-white" : "text-[#143627]";
  const textSoft = isHome ? "text-white/75 hover:text-white" : "text-[#143627]/70 hover:text-[#143627]";
  const iconBtn = `w-9 h-9 flex items-center justify-center rounded-full transition-colors relative ${
    isHome ? "text-white/85 hover:text-gold hover:bg-white/10" : "text-[#143627]/80 hover:text-[#143627] hover:bg-paper-deep"
  }`;

  return (
    <>
      <header className={`${position} z-40 w-full transition-all duration-300 ${surface}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Idukki Spices home">
            <svg className="w-7 h-7 fill-current text-gold group-hover:scale-105 transition-transform" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors ${text} group-hover:text-gold`}>
              Idukki Spices
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-8" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium py-1 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                    isActive ? `${text} after:w-full` : `${textSoft} after:w-0 hover:after:w-full`
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search spices"
              className={`hidden md:flex items-center justify-between gap-6 w-44 xl:w-56 h-9 pl-4 pr-3 rounded-full border text-xs transition-colors ${
                isHome
                  ? "border-white/25 bg-white/10 text-white/70 hover:bg-white/15 hover:border-white/40"
                  : "border-line bg-paper-deep text-[#143627]/60 hover:bg-paper"
              }`}
            >
              <span>Search spices...</span>
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className={`${iconBtn} md:hidden`}>
              <Search className="w-5 h-5" />
            </button>

            <Link href="/login" aria-label="Account" className={`${iconBtn} hidden sm:flex`}>
              <User className="w-5 h-5" />
            </Link>

            <Link href="/shop?tab=wishlist" aria-label="Wishlist" className={iconBtn}>
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-gold text-forest rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button onClick={openCart} aria-label="Shopping cart" className={iconBtn}>
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-gold text-forest rounded-full text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className={`${iconBtn} lg:hidden`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav
            aria-label="Mobile"
            className={`lg:hidden px-4 pt-3 pb-6 space-y-1 border-t ${isHome ? "border-white/10" : "bg-white border-line"}`}
          >
            {[...navLinks, { name: "Account", href: "/login" }].map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gold text-forest font-bold"
                      : isHome
                        ? "text-white/85 hover:bg-white/10"
                        : "text-[#143627]/80 hover:bg-paper-deep"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
