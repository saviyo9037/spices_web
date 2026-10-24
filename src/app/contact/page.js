"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Order Inquiry",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast("Please fill in all required fields.", "error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      addToast("Your message has been sent successfully! Our estate team will reply within 24h.", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Order Inquiry",
        message: "",
      });
    }, 1000);
  };

  const faqs = [
    {
      q: "Where are your spices sourced and packed?",
      a: "Our spices are procured directly from certified estate farmers in Wayanad, Idukki, and the Cardamom Hills in Kerala. Cleaning, low-temperature milling, and nitrogen packaging take place in our regional hub in Kumily, Kerala.",
    },
    {
      q: "How long does delivery take across India?",
      a: "We dispatch orders within 24 hours via express air courier. Metro cities typically receive their packages in 2-3 business days, while other locations take 3-5 business days.",
    },
    {
      q: "What makes your packaging aroma-protective?",
      a: "We utilize multi-layer food-grade aluminum barrier pouches with airtight zip locks. This blocks sunlight, moisture, and ambient oxygen from breaking down fragile aromatic essential oils.",
    },
    {
      q: "Do you offer wholesale or bulk restaurant orders?",
      a: "Yes! We supply boutique cafes, five-star resorts, and gourmet restaurants. Select 'Wholesale / Bulk Inquiry' in the contact form or email care@malabarspices.com.",
    },
  ];

  return (
    <div className="bg-[#faf7f2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#c69238] mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect with our Team</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#143627] tracking-tight">
            Contact &amp; Customer Care
          </h1>
          <p className="text-sm sm:text-base text-[#5c6c64] mt-3">
            Have questions about spice provenance, brewing herbal infusions, wholesale supply, or order tracking? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#143627] text-white shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#dfa84a]">
                Kerala Plantation Hub
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Our estate packaging facility and sensory tasting room is located amidst the pristine rainforest slopes of Idukki.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#286349] text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#dfa84a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Estate Office</span>
                    <span className="text-xs text-white/70">
                      Cardamom Hills Road, Kumily, Idukki District, Kerala - 685509
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#dfa84a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Phone Support</span>
                    <a
                      href="tel:+919876543210"
                      className="text-xs text-[#dfa84a] hover:underline"
                    >
                      +91 98765 43210 / +91 4869 223344
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#dfa84a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Direct Email</span>
                    <a
                      href="mailto:care@malabarspices.com"
                      className="text-xs text-[#dfa84a] hover:underline"
                    >
                      care@malabarspices.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#dfa84a] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-white">Operating Hours</span>
                    <span className="text-xs text-white/70">
                      Monday to Saturday: 9:00 AM - 6:30 PM IST
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#e6dfd5] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#143627] mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#5c6c64] mb-8">
                Fill in the details below and an estate spice specialist will get back to you promptly.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Message received!</h4>
                    <p className="text-xs text-emerald-800">
                      Thank you for reaching out. We have logged your request and will respond within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Ramesh Varma"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. ramesh@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 98765 00000"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                      >
                        <option value="Order Inquiry">Order Inquiry</option>
                        <option value="Product Sourcing & Quality">
                          Product Sourcing &amp; Quality
                        </option>
                        <option value="Wholesale / Bulk Inquiry">
                          Wholesale / Bulk Inquiry
                        </option>
                        <option value="Feedback / Suggestion">
                          Feedback / Suggestion
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#143627] mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="How can we assist you today? Provide any relevant order numbers or spice queries..."
                      className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] border border-[#e6dfd5] text-sm text-[#143627] focus:outline-none focus:border-[#143627]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#143627] hover:bg-[#1c4b37] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#143627]/20"
                  >
                    {status === "loading" ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#dfa84a]" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-[#e6dfd5]">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#c69238] mb-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#143627]">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#e6dfd5] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between font-serif text-base font-bold text-[#143627] hover:text-[#c69238] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#87978f] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#143627]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#5c6c64] leading-relaxed border-t border-[#f3eee4] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
