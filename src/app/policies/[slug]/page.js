import Link from "next/link";
import { notFound } from "next/navigation";
import { POLICIES, getPolicy } from "@/lib/policies";
import { CONTACT_EMAIL } from "@/lib/site";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "lucide-react";

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
    <main className="bg-white text-forest">
      <PageHero
        crumb={policy.title}
        eyebrow="Idukki Spices policies"
        title={policy.title}
        text="How we handle orders, shipping, returns and your details."
        image="/images/Rustic Bowl of Cloves in Nature.png"
        imageAlt="A rustic bowl of cloves"
        circleImage="/gallary/web-cardamom.jpg"
        watermark="Policy"
        className="pb-20 sm:pb-24"
      />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-gold/40 bg-gold/10 p-7 sm:p-9">
            <h2 className="font-serif text-2xl font-semibold">This policy has not been published yet</h2>
            <p className="mt-3 leading-relaxed text-forest/75">
              Until the full text is available, please{" "}
              <Link href="/contact" className="font-semibold text-gold-ink underline">contact us</Link> or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-gold-ink underline">{CONTACT_EMAIL}</a>{" "}
              with any question about orders, shipping, returns or privacy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex min-h-[48px] items-center rounded-full bg-forest px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-deep active:scale-95">
                Contact us
              </Link>
              <Link href="/shop" className="inline-flex min-h-[48px] items-center rounded-full border border-forest/25 px-7 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-forest active:scale-95">
                Shop spices
              </Link>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-5" aria-label="Other policies">
          <h2 className="font-serif text-2xl font-semibold">Other policies</h2>
          <ul className="mt-5 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {POLICIES.filter((p) => p.slug !== slug).map((p) => (
              <li key={p.slug}>
                <Link href={`/policies/${p.slug}`} className="flex items-center justify-between gap-3 px-6 py-4 text-sm font-semibold transition-colors hover:bg-paper">
                  {p.title}
                  <ArrowRight className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
