"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { products } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiry";
import { CONTACT_EMAIL } from "@/lib/site";
import Reveal from "./Reveal";

const initial = { name: "", phone: "", email: "", product: "", quantity: "", unit: "kg", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[+\d][\d\s-]{7,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.product) e.product = "Choose a product.";
  if (!(Number(v.quantity) > 0)) e.quantity = "Enter a quantity above zero.";
  return e;
}

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none";

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

  const err = (k) => (errors[k] ? <p className="mt-1 text-xs text-red-700" role="alert">{errors[k]}</p> : null);

  return (
    <section id="bulk-order" className="bg-deep text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-12 items-start">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">Bulk Orders</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">Need larger quantities?</h2>
          <p className="mt-4 text-white/75 max-w-md">
            Looking for larger quantities? Get in touch about your bulk order requirements.
          </p>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-paper p-6 sm:p-8 text-forest">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="be-name" className="mb-1.5 block text-sm font-medium">Name</label>
                <input id="be-name" autoComplete="name" value={values.name} onChange={set("name")} aria-invalid={Boolean(errors.name)} className={`${field} ${errors.name ? "border-red-600" : "border-line"}`} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="be-phone" className="mb-1.5 block text-sm font-medium">Phone</label>
                <input id="be-phone" type="tel" autoComplete="tel" value={values.phone} onChange={set("phone")} aria-invalid={Boolean(errors.phone)} className={`${field} ${errors.phone ? "border-red-600" : "border-line"}`} />
                {err("phone")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="be-email" className="mb-1.5 block text-sm font-medium">Email</label>
                <input id="be-email" type="email" autoComplete="email" value={values.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} className={`${field} ${errors.email ? "border-red-600" : "border-line"}`} />
                {err("email")}
              </div>
              <div>
                <label htmlFor="be-product" className="mb-1.5 block text-sm font-medium">Product</label>
                <select id="be-product" value={values.product} onChange={set("product")} aria-invalid={Boolean(errors.product)} className={`${field} ${errors.product ? "border-red-600" : "border-line"}`}>
                  <option value="">Choose a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="Several products">Several products</option>
                </select>
                {err("product")}
              </div>
              <div>
                <label htmlFor="be-qty" className="mb-1.5 block text-sm font-medium">Quantity</label>
                <div className="flex gap-2">
                  <input id="be-qty" type="number" min="1" inputMode="numeric" value={values.quantity} onChange={set("quantity")} aria-invalid={Boolean(errors.quantity)} className={`${field} ${errors.quantity ? "border-red-600" : "border-line"}`} />
                  <select aria-label="Unit" value={values.unit} onChange={set("unit")} className={`${field} w-24 border-line`}>
                    <option>kg</option>
                    <option>g</option>
                  </select>
                </div>
                {err("quantity")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="be-msg" className="mb-1.5 block text-sm font-medium">Message <span className="text-forest/50">(optional)</span></label>
                <textarea id="be-msg" rows={3} value={values.message} onChange={set("message")} className={`${field} border-line`} />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>

            <div aria-live="polite" className="mt-4 text-sm">
              {status === "sent" && (
                <p className="flex items-start gap-2 text-forest">
                  <CheckCircle2 className="mt-0.5 w-4 h-4 shrink-0 text-green-700" /> Thank you. Your enquiry has been received.
                </p>
              )}
              {status === "not-configured" && (
                <div className="rounded-xl border border-gold/50 bg-gold/10 p-4 text-forest">
                  <p className="flex items-start gap-2">
                    <AlertCircle className="mt-0.5 w-4 h-4 shrink-0 text-gold-ink" />
                    Online enquiries are not switched on yet, so nothing has been sent. You can email your details instead.
                  </p>
                  <a href={mailto()} className="mt-3 inline-flex items-center gap-2 font-semibold text-gold-ink hover:underline">
                    <Mail className="w-4 h-4" /> Email {CONTACT_EMAIL}
                  </a>
                </div>
              )}
              {status === "failed" && (
                <p className="flex items-start gap-2 text-red-700">
                  <AlertCircle className="mt-0.5 w-4 h-4 shrink-0" /> We could not send your enquiry. Please try again, or email{" "}
                  <a href={mailto()} className="font-semibold underline">{CONTACT_EMAIL}</a>.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
