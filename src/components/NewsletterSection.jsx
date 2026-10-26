"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { submitNewsletter } from "@/lib/enquiry";
import { CONTACT_EMAIL } from "@/lib/site";
import Leaf from "./BotanicalLeaf";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | not-configured | failed

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    const res = await submitNewsletter({ email: email.trim() });
    setStatus(res.ok ? "sent" : res.reason);
    if (res.ok) setEmail("");
  };

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Please add me to the Idukki Spices newsletter")}&body=${encodeURIComponent(email ? `Email: ${email}` : "")}`;

  return (
    <section className="relative isolate overflow-hidden bg-deep text-white py-14 sm:py-16">
      <Image
        src="/images/newsletter-background.jpg"
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="-z-10 object-cover opacity-20"
      />
      <Leaf className="pointer-events-none absolute -right-8 -top-8 -z-10 h-56 w-56 text-gold/15 rotate-[150deg]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold">Get Updates &amp; Spice Stories</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/75">
          New arrivals, offers and recipe ideas from the hills of Idukki, straight to your inbox.
        </p>

        <form onSubmit={onSubmit} noValidate className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            aria-invalid={Boolean(error)}
            className="min-w-0 flex-1 rounded-full bg-white px-5 py-3.5 text-sm text-forest placeholder:text-forest/45 focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-night transition-colors hover:bg-gold-light disabled:opacity-60"
          >
            {status === "sending" ? "Subscribing…" : "Subscribe"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div aria-live="polite" className="mx-auto mt-4 max-w-lg text-sm">
          {error && <p className="text-red-300" role="alert">{error}</p>}
          {status === "sent" && (
            <p className="inline-flex items-center gap-2 text-gold-light">
              <CheckCircle2 className="h-4 w-4" /> Thank you, you are subscribed.
            </p>
          )}
          {status === "not-configured" && (
            <div className="rounded-2xl border border-gold/40 bg-night/50 p-4 text-left text-white/85">
              <p className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Online sign-up is not switched on yet, so your address has not been saved.
              </p>
              <a href={mailto} className="mt-2 inline-flex items-center gap-2 font-semibold text-gold hover:underline">
                <Mail className="h-4 w-4" /> Email us to be added
              </a>
            </div>
          )}
          {status === "failed" && (
            <p className="inline-flex items-center gap-2 text-red-300">
              <AlertCircle className="h-4 w-4" /> We could not save your address. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
