import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0b1f16] text-white pt-14 pb-8 overflow-hidden border-t border-white/10">
      {/* Background Image: footer-background.jpg */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-luminosity">
        <Image
          src="/images/footer-background.jpg"
          alt="Spices Footer Texture"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b1f16]/90 to-[#040906] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 5 Columns matching reference design */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Social */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-[#dfa84a]">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-[#dfa84a] transition-colors">
                Spices
              </span>
            </Link>

            <p className="text-xs text-white/60">
              Pure Spices. Better Life.
            </p>

            {/* Circular Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#dfa84a] flex items-center justify-center text-white/80 hover:text-[#143627] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#dfa84a] flex items-center justify-center text-white/80 hover:text-[#143627] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#dfa84a] flex items-center justify-center text-white/80 hover:text-[#143627] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#dfa84a] flex items-center justify-center text-white/80 hover:text-[#143627] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop Categories */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link href="/category/whole-spices" className="hover:text-white transition-colors">
                  Whole Spices
                </Link>
              </li>
              <li>
                <Link href="/category/ground-spices" className="hover:text-white transition-colors">
                  Ground Spices
                </Link>
              </li>
              <li>
                <Link href="/category/herbs-seasonings" className="hover:text-white transition-colors">
                  Herbs &amp; Seasonings
                </Link>
              </li>
              <li>
                <Link href="/category/spice-blends" className="hover:text-white transition-colors">
                  Spice Blends
                </Link>
              </li>
              <li>
                <Link href="/category/masalas" className="hover:text-white transition-colors">
                  Masalas
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Return &amp; Refund
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact Us */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-3">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfa84a] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#dfa84a] shrink-0" />
                <a href="mailto:support@spices.com" className="hover:text-white transition-colors">
                  support@spices.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#dfa84a] shrink-0" />
                <span>Kochi, Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching reference: Left copyright, Right Made with ❤️ in India */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>
            &copy; 2026 Spices. All rights reserved.
          </div>
          <div>
            Made with <span className="text-red-500">❤️</span> in India
          </div>
        </div>
      </div>
    </footer>
  );
}
