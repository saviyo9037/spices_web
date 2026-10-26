import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { categories } from "@/data/categories";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/site";
import { POLICIES } from "@/lib/policies";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Spice Finder", href: "/spices" },
  { name: "Spice Combos", href: "/combos" },
  { name: "Recipes", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Bulk Orders", href: "/#bulk-order" },
];

const support = [
  { name: "Contact Us", href: "/contact" },
  { name: "My Cart", href: "/cart" },
  { name: "My Account", href: "/login" },
  ...POLICIES.map((p) => ({ name: p.title, href: `/policies/${p.slug}` })),
];

function Column({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">{title}</h3>
      <ul className="space-y-2.5 text-sm text-white/70">
        {links.map((l) => (
          <li key={l.name}>
            <Link href={l.href} className="transition-colors hover:text-white">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const socials = SOCIAL_LINKS.filter((s) => s.href);
  return (
    <footer className="bg-night text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Idukki Spices home">
              <svg className="h-8 w-8 fill-current text-gold" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
              </svg>
              <span className="leading-none">
                <span className="block font-serif text-2xl font-bold">Idukki</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Spices</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Authentic spices from the hills of Idukki, Kerala, carefully selected for their aroma, flavour and freshness.
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex gap-2" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 items-center rounded-full bg-white/10 px-4 text-xs font-semibold transition-colors hover:bg-gold hover:text-night"
                    >
                      {s.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-2">
            <Column title="Quick Links" links={quickLinks} />
          </div>
          <div className="lg:col-span-2">
            <Column
              title="Shop Categories"
              links={categories.map((c) => ({ name: c.name, href: `/category/${c.slug}` }))}
            />
          </div>
          <div className="lg:col-span-2">
            <Column title="Customer Support" links={support} />
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all hover:text-white">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>Idukki, Kerala, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>&copy; 2026 Idukki Spices. All rights reserved.</p>
          <p>Spices from the hills of Idukki, Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
