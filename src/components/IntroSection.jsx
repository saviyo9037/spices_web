import { Leaf } from "lucide-react";

export default function IntroSection() {
  return (
    <section aria-labelledby="intro-heading" className="bg-white px-5 pb-16 pt-10 text-center sm:px-8 md:pb-20 md:pt-14">
      <div className="mx-auto max-w-3xl">
        <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#70A82C] sm:text-xs">
          <Leaf className="h-4 w-4" aria-hidden="true" />
          Step into the world of organics
        </p>
        <h2
          id="intro-heading"
          className="mt-4 font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1.1] tracking-tight text-[#123B22]"
        >
          Let the first step be firmly anchored!
        </h2>
        <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-16 rounded-full bg-[#70A82C]" />
      </div>
    </section>
  );
}
