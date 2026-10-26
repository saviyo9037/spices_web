import Link from "next/link";
import { notFound } from "next/navigation";
import { POLICIES, getPolicy } from "@/lib/policies";
import { CONTACT_EMAIL } from "@/lib/site";

export function generateStaticParams() {
  return POLICIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  return { title: policy ? policy.title : "Policy", robots: { index: false } };
}

export default async function PolicyPage({ params }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <main className="bg-paper text-forest">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gold-ink">Idukki Spices</p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold mt-3">{policy.title}</h1>
        <div className="mt-8 rounded-2xl border border-gold/40 bg-gold/10 p-6">
          <p className="font-semibold">This policy has not been published yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-forest/75">
            Until the full text is available, please{" "}
            <Link href="/contact" className="font-semibold text-gold-ink underline">contact us</Link> or email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-ink underline">{CONTACT_EMAIL}</a>{" "}
            with any question about orders, shipping, returns or privacy.
          </p>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3 text-sm">
          {POLICIES.filter((p) => p.slug !== slug).map((p) => (
            <li key={p.slug}>
              <Link href={`/policies/${p.slug}`} className="rounded-full border border-line bg-white px-4 py-2 hover:border-gold">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
