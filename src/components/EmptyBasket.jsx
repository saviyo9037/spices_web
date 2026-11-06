"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

// Empty cart / checkout state: a clear next step plus four bestselling spices to add right away.
export default function EmptyBasket({ title = "Your basket is empty", text = "Add a spice and it will wait for you here." }) {
  const picks = [...products].sort((a, b) => (b.badge === "Bestseller") - (a.badge === "Bestseller")).slice(0, 4);

  return (
    <div>
      <div className="relative mx-auto grid max-w-4xl items-center gap-8 overflow-hidden rounded-[2rem] bg-[#062D1B] p-8 text-white sm:p-12 md:grid-cols-[1fr_auto]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_90%_50%,rgba(112,168,44,0.25),transparent_70%)]" />
        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#F5B900] text-[#062D1B]">
            <ShoppingBag className="h-7 w-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-white/75">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#F5B900] px-7 text-sm font-extrabold text-[#062D1B] transition-all hover:-translate-y-0.5 hover:bg-[#ffcb2e] active:scale-95"
            >
              Shop all spices
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/combos"
              className="inline-flex min-h-[48px] items-center rounded-full border border-white/40 px-7 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[#F5B900] hover:text-[#F5B900] active:scale-95"
            >
              Build a combo
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="relative hidden h-48 w-48 overflow-hidden rounded-full border-[6px] border-[#062D1B] ring-2 ring-[#F5B900]/60 md:block">
          <Image src="/gallary/web-black-pepper.jpg" alt="" fill sizes="192px" className="object-cover" />
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <h2 className="font-serif text-2xl font-semibold text-[#123B22] sm:text-3xl">Popular right now</h2>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-4">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
