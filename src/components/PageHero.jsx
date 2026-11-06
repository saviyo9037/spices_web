import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Leaf } from "lucide-react";
import TornEdge from "./TornEdge";

// Shared inner-page hero. Copy on the left, one arched photograph on the right with a small
// round photo overlapping it. Static on load; on phones the photo becomes a faded backdrop.
export default function PageHero({
  crumb,
  eyebrow,
  title,
  accent,
  text,
  image,
  imageAlt = "",
  circleImage,
  edge = true,
  className = "pb-24 sm:pb-28",
  children,
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#062D1B] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_70%_at_85%_45%,rgba(112,168,44,0.22),transparent_70%),radial-gradient(ellipse_40%_50%_at_5%_100%,rgba(245,185,0,0.10),transparent_70%)]" />
      {image && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 lg:hidden">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover object-[70%_50%] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#062D1B]/80 via-[#062D1B]/70 to-[#062D1B]" />
        </div>
      )}

      <div className={`mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-12 lg:gap-6 lg:px-8 ${className}`}>
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="transition-colors hover:text-[#F5B900]">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="text-white">{crumb}</span>
          </nav>

          <p className="mt-7 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#F5B900]">
            <Leaf className="h-4 w-4 text-[#70A82C]" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="mt-4 font-serif text-[clamp(2.6rem,6vw,4.9rem)] font-semibold leading-[1.02] tracking-tight">
            {title}
            {accent && <span className="mt-1 block font-script text-[1.3em] font-bold leading-[0.95] text-[#F5B900]">{accent}</span>}
          </h1>

          {text && <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>

        {image && (
          <div className="relative hidden lg:col-span-5 lg:block">
            <div aria-hidden="true" className="absolute -left-4 top-3 h-[400px] w-[78%] rounded-t-[999px] rounded-b-[1.6rem] border-2 border-[#F5B900]/40" />
            <div className="relative ml-auto h-[400px] w-[78%] overflow-hidden rounded-t-[999px] rounded-b-[1.6rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
              <Image src={image} alt={imageAlt} fill priority sizes="30vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#062D1B]/60 via-transparent to-transparent" />
            </div>
            {circleImage && (
              <div aria-hidden="true" className="absolute -left-2 bottom-0 z-10 h-36 w-36 overflow-hidden rounded-full border-[6px] border-[#062D1B] shadow-2xl ring-2 ring-[#F5B900]/60">
                <Image src={circleImage} alt="" fill sizes="144px" className="object-cover" />
              </div>
            )}
          </div>
        )}
      </div>

      {edge && <TornEdge position="bottom" fill="#FFFFFF" seed={1} />}
    </section>
  );
}
