"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2, AlertCircle, Mail, Sprout, Package, Truck } from "lucide-react";
import { products } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiry";
import { CONTACT_EMAIL } from "@/lib/site";

// Clove-specific enquiry: the product defaults to the catalogue clove entry.
const DEFAULT_PRODUCT = (products.find((p) => p.slug === "cloves") || products[0] || {}).name || "";

const highlights = [
  { icon: Sprout, label: "Premium Idukki cloves" },
  { icon: Package, label: "Multiple pack sizes" },
  { icon: Truck, label: "Pan India delivery" },
];

const QUICK_QTY = [5, 10, 25, 50];
const UNITS = ["kg", "g"];

const initial = { name: "", phone: "", email: "", product: DEFAULT_PRODUCT, quantity: "", unit: "kg", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.product) e.product = "Choose a product.";
  if (!(Number(v.quantity) > 0)) e.quantity = "Enter a quantity above zero.";
  return e;
}

// 16px text on phones stops iOS zooming into the field; 48px height gives a comfortable tap target.
const field =
  "h-12 w-full rounded-lg border bg-[#FAF7EF] px-4 text-base text-[#123B22] placeholder:text-[#123B22]/50 transition-colors focus:border-[#123B22] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F5B900]/50 sm:text-sm";

export default function BulkEnquiry() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | not-configured | failed

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const mailto = () => {
    const body = [
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      `Product: ${values.product}`,
      `Quantity: ${values.quantity} ${values.unit}`,
      "",
      values.message,
    ].join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Bulk order enquiry")}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await submitEnquiry(values);
    setStatus(res.ok ? "sent" : res.reason);
    if (res.ok) setValues(initial);
  };

  const err = (k) =>
    errors[k] ? (
      <p id={`be-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {errors[k]}
      </p>
    ) : null;
  const border = (k) => (errors[k] ? "border-red-500" : "border-[#123B22]/20");
  const aria = (k) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `be-${k}-err` : undefined });

  return (
    <section id="bulk-order" aria-labelledby="bulk-heading" className="relative isolate overflow-hidden bg-night py-14 text-white sm:py-24 lg:py-28">
      <Image src="/images/clove-bulk-background.webp" alt="" fill loading="lazy" sizes="100vw" className="-z-10 object-cover object-[12%_85%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/90 via-night/70 to-night/80 lg:bg-gradient-to-r lg:from-night/85 lg:via-night/45 lg:to-night/55" />

      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Copy */}
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">Bulk orders</p>
          <h2 id="bulk-heading" className="mt-3 font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-[#F8F3E8] sm:text-5xl">
            Need larger
            <span className="block text-[#F5B900]">quantities?</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
            Looking for larger quantities of cloves? Tell us what you need and we will get back to you about your bulk order.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
                <Icon className="h-5 w-5 shrink-0 text-[#F5B900]" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-sm font-semibold text-[#F8F3E8]">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          {status === "sent" ? (
            <div role="status" className="rounded-2xl border-t-4 border-[#F5B900] bg-white p-8 text-center text-[#123B22] shadow-xl shadow-black/30 sm:p-12">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#70A82C]/15 text-[#3f6a12]">
                <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-serif text-2xl font-semibold sm:text-3xl">Enquiry received</h3>
              <p className="mx-auto mt-2 max-w-sm text-[#123B22]/80">Thank you. Your enquiry has been received and we will get back to you shortly.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#123B22]/30 px-7 text-sm font-bold transition hover:border-[#123B22] hover:bg-[#123B22]/5"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="rounded-2xl border-t-4 border-[#F5B900] bg-white p-5 text-[#123B22] shadow-xl shadow-black/30 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold">Bulk order enquiry</h3>
              <p className="mt-1 text-sm text-[#123B22]/75">Two short steps. It takes about a minute.</p>

              {/* Step 1 */}
              <fieldset className="mt-6">
                <legend className="mb-3 flex items-center gap-2.5 text-sm font-bold">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#123B22] text-xs text-white">1</span>
                  Your details
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="be-name" className="mb-1.5 block text-sm font-semibold">Name</label>
                    <input id="be-name" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name")} className={`${field} ${border("name")}`} />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="be-phone" className="mb-1.5 block text-sm font-semibold">Phone</label>
                    <input id="be-phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} {...aria("phone")} className={`${field} ${border("phone")}`} />
                    {err("phone")}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="be-email" className="mb-1.5 block text-sm font-semibold">Email</label>
                    <input id="be-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} {...aria("email")} className={`${field} ${border("email")}`} />
                    {err("email")}
                  </div>
                </div>
              </fieldset>

              <hr className="my-6 border-[#123B22]/10" />

              {/* Step 2 */}
              <fieldset>
                <legend className="mb-3 flex items-center gap-2.5 text-sm font-bold">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#123B22] text-xs text-white">2</span>
                  Your order
                </legend>
                <div className="grid gap-4">
                  <div>
                    <label htmlFor="be-product" className="mb-1.5 block text-sm font-semibold">Product</label>
                    <select id="be-product" value={values.product} onChange={set("product")} {...aria("product")} className={`${field} ${border("product")}`}>
                      <option value="">Choose a product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                      <option value="Several products">Several products</option>
                    </select>
                    {err("product")}
                  </div>

                  <div>
                    <label htmlFor="be-qty" className="mb-1.5 block text-sm font-semibold">Quantity</label>
                    <div className="flex gap-2">
                      <input id="be-qty" type="number" min="1" inputMode="decimal" value={values.quantity} onChange={set("quantity")} {...aria("quantity")} className={`${field} ${border("quantity")}`} />
                      <div role="group" aria-label="Unit" className="grid h-12 shrink-0 grid-cols-2 rounded-lg border border-[#123B22]/20 bg-[#FAF7EF] p-1">
                        {UNITS.map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setValues((v) => ({ ...v, unit: u }))}
                            aria-pressed={values.unit === u}
                            className={`min-w-[3rem] cursor-pointer touch-manipulation rounded-md px-3 text-sm font-bold transition-colors ${
                              values.unit === u ? "bg-[#123B22] text-white" : "text-[#123B22]/80 hover:bg-[#123B22]/10"
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>
                    {err("quantity")}
                    <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label="Common quantities">
                      {QUICK_QTY.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => setValues((v) => ({ ...v, quantity: String(q), unit: "kg" }))}
                          className="min-h-[40px] cursor-pointer touch-manipulation rounded-full border border-[#123B22]/20 px-4 text-sm font-semibold transition hover:border-[#123B22] hover:bg-[#123B22]/5 active:scale-95"
                        >
                          {q} kg
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="be-msg" className="mb-1.5 block text-sm font-semibold">
                      Message <span className="font-normal text-[#123B22]/60">(optional)</span>
                    </label>
                    <textarea id="be-msg" rows={3} value={values.message} onChange={set("message")} className={`${field} h-auto min-h-[6rem] border-[#123B22]/20 py-3`} />
                  </div>
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#123B22] px-8 text-base font-bold text-white transition-colors hover:bg-[#1c5336] active:scale-[0.98] disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {status === "sending" ? "Sending…" : "Send enquiry"}
              </button>

              <div aria-live="polite" className="mt-4 text-sm">
                {status === "not-configured" && (
                  <div className="rounded-xl border border-[#F5B900] bg-[#FFF8E1] p-4">
                    <p className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#B07D22]" aria-hidden="true" />
                      Online enquiries are not switched on yet, so nothing has been sent. You can email your details instead.
                    </p>
                    <a href={mailto()} className="mt-3 inline-flex min-h-[44px] items-center gap-2 font-semibold underline underline-offset-2 hover:text-[#B07D22]">
                      <Mail className="h-4 w-4" aria-hidden="true" /> Email {CONTACT_EMAIL}
                    </a>
                  </div>
                )}
                {status === "failed" && (
                  <p className="flex items-start gap-2 text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" /> We could not send your enquiry. Please try again, or email{" "}
                    <a href={mailto()} className="font-semibold underline">{CONTACT_EMAIL}</a>.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
