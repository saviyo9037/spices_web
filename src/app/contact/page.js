"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Package,
  Boxes,
  Sprout,
} from "lucide-react";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_ADDRESS, CONTACT_HOURS } from "@/lib/site";
import { submitEnquiry } from "@/lib/enquiry";

const SUBJECTS = ["Order enquiry", "Product question", "Bulk / wholesale", "Feedback"];

const TOPICS = [
  { icon: Package, title: "Order help", text: "Questions about an order or delivery.", subject: "Order enquiry" },
  { icon: Sprout, title: "Product questions", text: "Origin, ingredients, pack sizes.", subject: "Product question" },
  { icon: Boxes, title: "Bulk orders", text: "Larger quantities for your business.", subject: "Bulk / wholesale" },
];

// Answers only state what the site itself already says elsewhere.
const FAQS = [
  {
    q: "Where do your spices come from?",
    a: "Idukki Spices brings you spices from the high ranges of Kerala, sourced from trusted farmers. The origin of each spice is listed on its product page.",
  },
  {
    q: "How do I choose a pack size?",
    a: "Every product page and product card shows the pack sizes available for that spice, with the price for each. Pick a size and add it to your cart.",
  },
  {
    q: "Where can I see the ingredients?",
    a: "Origin, ingredients and shelf life are listed on every product page.",
  },
  {
    q: "Do you deliver across India?",
    a: "Yes, orders ship to addresses across India. For shipping times and charges, see our Shipping Policy or contact us.",
  },
  {
    q: "Can I order larger quantities?",
    a: "Yes. Use the bulk enquiry form on our home page, or choose \"Bulk / wholesale\" in the form above.",
  },
];

const field =
  "w-full rounded-xl border bg-white px-4 py-3 text-sm text-forest placeholder:text-forest/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";

export default function ContactPage() {
  const [v, setV] = useState({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | not-configured | failed
  const [open, setOpen] = useState(0);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (v.phone.trim() && !/^[+\d][\d\s-]{7,15}$/.test(v.phone.trim())) e.phone = "Enter a valid phone number.";
    if (v.message.trim().length < 5) e.message = "Please write a short message.";
    return e;
  };

  const mailto = () => {
    const body = [`Name: ${v.name}`, `Email: ${v.email}`, v.phone && `Phone: ${v.phone}`, "", v.message].filter((x) => x !== false).join("\n");
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    const res = await submitEnquiry({ type: "contact", ...v });
    setStatus(res.ok ? "sent" : res.reason);
    if (res.ok) setV({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  };

  const err = (k) => (errors[k] ? <p className="mt-1 text-xs text-red-700" role="alert">{errors[k]}</p> : null);
  const cls = (k) => `${field} ${errors[k] ? "border-red-500" : "border-line"}`;

  const details = [
    { icon: Mail, label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    CONTACT_PHONE && { icon: Phone, label: "Phone", value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, "")}` },
    CONTACT_ADDRESS && { icon: MapPin, label: "Address", value: CONTACT_ADDRESS },
    CONTACT_HOURS && { icon: Clock, label: "Hours", value: CONTACT_HOURS },
  ].filter(Boolean);

  return (
    <div className="bg-white text-forest">
      <section className="relative isolate overflow-hidden bg-night text-white">
        <Image src="/images/peppercorn-spoon.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[80%_50%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/10" />
        <div className="mx-auto max-w-7xl px-4 pb-32 pt-10 sm:px-6 sm:pb-36 sm:pt-14 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">Contact</span>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Contact us</p>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
            We are happy <span className="text-gold">to help</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Questions about an order, a spice or a bulk requirement? Send us a message and we will get back to you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact-form" className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light">Send a message</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold transition-colors hover:border-gold hover:text-gold">
              <Mail className="h-4 w-4" /> Email us
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-3 sm:grid-cols-3">
          {TOPICS.map(({ icon: Icon, title, text, subject }) => (
            <li key={title}>
              <a
                href="#contact-form"
                onClick={() => setV((s) => ({ ...s, subject }))}
                className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-xl shadow-forest/10 transition-all hover:-translate-y-0.5 hover:border-gold"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest text-gold">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-serif text-lg font-bold group-hover:text-gold-ink">{title}</span>
                  <span className="text-sm text-forest/65">{text}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section className="relative isolate -mt-24 overflow-hidden bg-night pb-16 pt-32 sm:pb-24 sm:pt-36">
        <Image src="/images/clove-bulk-background.webp" alt="" fill loading="lazy" sizes="100vw" className="-z-10 object-cover object-[15%_70%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/90 via-night/75 to-night/90" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <aside className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-7 text-white backdrop-blur-xl sm:p-9">
            <h2 className="font-serif text-3xl font-bold">Get in <span className="text-gold">touch</span></h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">The quickest way to reach us is by email. We read every message.</p>
            <ul className="mt-6 space-y-5 border-t border-white/15 pt-6">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-night">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-[0.2em] text-gold">{label}</span>
                    {href ? (
                      <a href={href} className="break-all font-semibold hover:text-gold">{value}</a>
                    ) : (
                      <span className="font-semibold">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <ol className="rounded-3xl border border-white/15 bg-white/10 p-7 text-white backdrop-blur-xl sm:p-9">
            <li className="mb-5 font-serif text-xl font-bold">What happens next</li>
            {[
              ["You send your message", "Tell us what you need."],
              ["We read it", "Your message reaches our team."],
              ["We reply by email", "Keep an eye on your inbox."],
            ].map(([t, d], i) => (
              <li key={t} className="relative flex gap-4 pb-5 last:pb-0">
                {i < 2 && <span className="absolute left-[15px] top-9 h-[calc(100%-2rem)] w-px bg-gold/40" aria-hidden="true" />}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-night">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{t}</span>
                  <span className="text-sm text-white/70">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>

        <div className="lg:col-span-7">
          <form id="contact-form" onSubmit={onSubmit} noValidate className="scroll-mt-28 overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/40">
            <div className="flex items-center gap-4 bg-forest px-6 py-6 text-white sm:px-9">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-night">
                <Send className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">Send us a message</h2>
                <p className="text-sm text-white/75">Fill in your details and we will get back to you.</p>
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <fieldset>
                <legend className="mb-2.5 text-sm font-semibold">What is this about?</legend>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((x) => (
                    <button
                      key={x}
                      type="button"
                      aria-pressed={v.subject === x}
                      onClick={() => setV((s) => ({ ...s, subject: x }))}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        v.subject === x ? "border-forest bg-forest text-white shadow-sm" : "border-line bg-white text-forest hover:border-gold"
                      }`}
                    >
                      {x}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-sm font-semibold">Full name</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink" aria-hidden="true" />
                    <input id="c-name" autoComplete="name" placeholder="Your name" value={v.name} onChange={set("name")} aria-invalid={Boolean(errors.name)} className={`${cls("name")} pl-11`} />
                  </div>
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-sm font-semibold">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink" aria-hidden="true" />
                    <input id="c-email" type="email" autoComplete="email" placeholder="you@example.com" value={v.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} className={`${cls("email")} pl-11`} />
                  </div>
                  {err("email")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-phone" className="mb-1.5 block text-sm font-semibold">Phone <span className="font-normal text-forest/50">(optional)</span></label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-ink" aria-hidden="true" />
                    <input id="c-phone" type="tel" autoComplete="tel" placeholder="Phone number" value={v.phone} onChange={set("phone")} aria-invalid={Boolean(errors.phone)} className={`${cls("phone")} pl-11`} />
                  </div>
                  {err("phone")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-1.5 flex items-center justify-between text-sm font-semibold">
                    Message <span className="text-xs font-normal text-forest/50">{v.message.length} characters</span>
                  </label>
                  <textarea id="c-message" rows={5} value={v.message} onChange={set("message")} aria-invalid={Boolean(errors.message)} placeholder="How can we help? Include an order number if you have one." className={cls("message")} />
                  {err("message")}
                </div>
              </div>

              <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-forest/55">We use your details only to reply to this message.</p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-sm font-bold text-night shadow-lg shadow-gold/30 transition-all hover:-translate-y-0.5 hover:bg-gold-light disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>

              <div aria-live="polite" className="mt-4 text-sm">
                {status === "sent" && (
                  <p className="flex items-start gap-2 rounded-xl bg-green-50 p-4 text-forest">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" /> Thank you. Your message has been received.
                  </p>
                )}
                {status === "not-configured" && (
                  <div className="rounded-xl border border-gold/50 bg-gold/10 p-4">
                    <p className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
                      Online messages are not switched on yet, so nothing has been sent. You can email your message instead.
                    </p>
                    <a href={mailto()} className="mt-3 inline-flex items-center gap-2 font-semibold text-gold-ink hover:underline">
                      <Mail className="h-4 w-4" /> Email {CONTACT_EMAIL}
                    </a>
                  </div>
                )}
                {status === "failed" && (
                  <p className="flex items-start gap-2 text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> We could not send your message. Please try again, or email{" "}
                    <a href={mailto()} className="font-semibold underline">{CONTACT_EMAIL}</a>.
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-24" aria-labelledby="faq">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-ink">FAQ</p>
            <h2 id="faq" className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-5xl">Common <span className="text-gold-ink">questions</span></h2>
            <p className="mt-4 max-w-sm text-forest/70">Quick answers about our spices, pack sizes and delivery. Cannot find yours? Send us a message.</p>
            <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-3xl shadow-xl shadow-forest/15 lg:block">
              <Image src="/images/story-cardamom-bowl.jpg" alt="Green cardamom pods in a wooden bowl" fill sizes="40vw" className="object-cover" />
            </div>
            <p className="mt-6 text-sm text-forest/65">
              More details in our{" "}
              <Link href="/policies/shipping-policy" className="font-semibold text-gold-ink hover:underline">Shipping Policy</Link> and{" "}
              <Link href="/policies/return-refund-policy" className="font-semibold text-gold-ink hover:underline">Return &amp; Refund Policy</Link>.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-7">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className={`overflow-hidden rounded-2xl border bg-white transition-all ${isOpen ? "border-gold shadow-lg shadow-gold/10" : "border-line"}`}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-5 text-left font-serif text-lg font-bold hover:text-gold-ink"
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isOpen ? "bg-gold text-night" : "bg-paper-deep/70 text-forest"}`}>{i + 1}</span>
                    <span className="flex-1">{f.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-forest/50 transition-transform ${isOpen ? "rotate-180 text-gold-ink" : ""}`} aria-hidden="true" />
                  </button>
                  {isOpen && <p className="pb-5 pl-[4.25rem] pr-5 leading-relaxed text-forest/70">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-night py-16 text-white sm:py-20">
        <Image src="/images/story-hills-sunrise.jpg" alt="" fill loading="lazy" sizes="100vw" className="-z-10 object-cover" />
        <div className="absolute inset-0 -z-10 bg-night/70" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold sm:text-5xl">Still exploring? <span className="text-gold">Taste Idukki.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Browse whole spices, powders and blends, or find the right spice for your kitchen.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light">Shop spices</Link>
            <Link href="/spices" className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-bold transition-colors hover:border-gold hover:text-gold">Spice Finder</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
