"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { FORMS, USE_TAGS, allSizes, productUses, productSizes } from "@/lib/catalog";
import ProductCard from "./ProductCard";

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-forest bg-forest text-white"
          : "border-line bg-white text-forest hover:border-gold hover:text-gold-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Group({ title, children }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gold-ink mb-3">{title}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export default function SpiceFinder() {
  const params = useSearchParams();
  const startForm = FORMS.some((f) => f.id === params.get("form")) ? params.get("form") : "all";

  const [form, setForm] = useState(startForm);
  const [use, setUse] = useState("all");
  const [size, setSize] = useState("all");
  const [type, setType] = useState("all");

  const sizes = useMemo(() => allSizes(), []);

  const matches = useMemo(
    () =>
      products.filter(
        (p) =>
          (type === "all" || p.id === type) &&
          (form === "all" || p.category === form) &&
          (use === "all" || productUses(p).includes(use)) &&
          (size === "all" || productSizes(p).includes(size))
      ),
    [type, form, use, size]
  );

  const dirty = type !== "all" || form !== "all" || use !== "all" || size !== "all";
  const reset = () => {
    setType("all");
    setForm("all");
    setUse("all");
    setSize("all");
  };

  return (
    <div className="bg-paper text-forest">
      <section className="bg-deep text-white pt-14 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">Spice Finder</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3 max-w-2xl">Find the right spice for your kitchen</h1>
          <p className="mt-4 max-w-xl text-white/75">
            Narrow our range by spice, form, cooking use or pack size. Results come straight from the catalogue.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-8 rounded-3xl border border-line bg-white p-6 sm:p-8 lg:grid-cols-2">
          <Group title="Spice">
            <Chip active={type === "all"} onClick={() => setType("all")}>All spices</Chip>
            {products.map((p) => (
              <Chip key={p.id} active={type === p.id} onClick={() => setType(p.id)}>
                {p.name}
              </Chip>
            ))}
          </Group>
          <div className="grid gap-8">
            <Group title="Whole or powder">
              <Chip active={form === "all"} onClick={() => setForm("all")}>Any</Chip>
              {FORMS.map((f) => (
                <Chip key={f.id} active={form === f.id} onClick={() => setForm(f.id)}>{f.label}</Chip>
              ))}
            </Group>
            <Group title="Cooking use">
              <Chip active={use === "all"} onClick={() => setUse("all")}>Any</Chip>
              {USE_TAGS.map((t) => (
                <Chip key={t.id} active={use === t.id} onClick={() => setUse(t.id)}>{t.label}</Chip>
              ))}
            </Group>
            <Group title="Pack size">
              <Chip active={size === "all"} onClick={() => setSize("all")}>Any</Chip>
              {sizes.map((s) => (
                <Chip key={s} active={size === s} onClick={() => setSize(s)}>{s}</Chip>
              ))}
            </Group>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between" aria-live="polite">
          <p className="text-sm text-forest/70">
            <strong className="text-forest">{matches.length}</strong> {matches.length === 1 ? "spice" : "spices"} match
          </p>
          {dirty && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-ink hover:text-forest">
              <RotateCcw className="w-4 h-4" /> Reset filters
            </button>
          )}
        </div>

        {matches.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-line bg-white p-12 text-center">
            <Search className="mx-auto w-8 h-8 text-forest/40" />
            <h2 className="font-serif text-2xl font-bold mt-4">No spice matches all of those</h2>
            <p className="mt-2 text-sm text-forest/70">Try removing one filter, or browse the full range.</p>
            <button type="button" onClick={reset} className="mt-6 rounded-full bg-gold px-7 py-3 text-sm font-bold text-night hover:bg-gold-light">
              Show all spices
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {matches.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
