"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, ShoppingBag, Timer, X } from "lucide-react";

// Quick view for a product card: the essentials and the add-to-cart action without leaving the page.
// Rendered in a portal so the card's hover transform and overflow never clip it.
export default function QuickViewModal({ product, selected, onSelect, onAdd, added, onClose }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const weights = product.weights || [];
  const price = selected ? selected.price : product.price;
  const originalPrice = selected ? selected.originalPrice : product.originalPrice;
  const hasDiscount = originalPrice && originalPrice > price;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#03100D]/80 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.name}`}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[1.6rem] bg-white shadow-2xl sm:rounded-[1.6rem] md:grid-cols-2"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute right-3 top-3 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/90 text-[#123B22] shadow-md transition hover:bg-[#F5B900] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F5B900]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative aspect-[4/3] w-full bg-[#F4F8EC] md:aspect-auto md:min-h-[460px]">
          <Image src={product.image} alt={product.name} fill sizes="(min-width: 768px) 450px, 100vw" className="object-cover" />
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5f9122]">{product.categoryName}</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#123B22] sm:text-3xl">{product.name}</h2>
          {product.subtitle && <p className="mt-1 text-sm text-[#123B22]/80">{product.subtitle}</p>}

          {product.shortDescription && <p className="mt-4 text-sm leading-relaxed text-[#123B22]/75">{product.shortDescription}</p>}

          <ul className="mt-4 flex flex-wrap gap-2">
            {(product.tastingNotes || []).map((n) => (
              <li key={n} className="rounded-full bg-[#70A82C]/12 px-3 py-1 text-xs font-semibold text-[#3f6a12]">
                {n}
              </li>
            ))}
          </ul>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#123B22]/80">
            {product.origin && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#B07D22]" aria-hidden="true" />
                <dt className="sr-only">Origin</dt>
                <dd>{product.origin}</dd>
              </div>
            )}
            {product.shelfLife && (
              <div className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5 text-[#B07D22]" aria-hidden="true" />
                <dt className="sr-only">Shelf life</dt>
                <dd>{product.shelfLife} shelf life</dd>
              </div>
            )}
          </dl>

          {weights.length > 1 && (
            <div role="group" aria-label="Pack size" className="mt-5 flex flex-wrap gap-2">
              {weights.map((w) => {
                const on = selected?.label === w.label;
                return (
                  <button
                    key={w.label}
                    type="button"
                    onClick={() => onSelect(w)}
                    aria-pressed={on}
                    className={`min-h-[40px] cursor-pointer touch-manipulation rounded-full border px-4 text-sm font-bold transition-all ${
                      on ? "border-[#123B22] bg-[#123B22] text-white" : "border-[#123B22]/20 text-[#123B22]/75 hover:border-[#70A82C]"
                    }`}
                  >
                    {w.label}
                  </button>
                );
              })}
            </div>
          )}

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold text-[#123B22]">₹{price}</span>
            {hasDiscount && <span className="text-sm text-[#123B22]/80 line-through">₹{originalPrice}</span>}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onAdd}
              className={`flex min-h-[48px] flex-1 cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-full text-sm font-extrabold transition-all active:scale-[0.97] ${
                added ? "bg-[#70A82C] text-white" : "bg-[#123B22] text-white hover:bg-[#F5B900] hover:text-[#062D1B]"
              }`}
            >
              {added ? <Check className="h-4 w-4" aria-hidden="true" /> : <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
              {added ? "Added to cart" : "Add to cart"}
            </button>
            <Link
              href={`/product/${product.slug}`}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#123B22]/25 px-6 text-sm font-bold text-[#123B22] transition-all hover:border-[#123B22] hover:bg-[#123B22]/5"
            >
              See full details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
