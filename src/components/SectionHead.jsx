import { Leaf } from "lucide-react";
import Reveal from "./Reveal";

// Shared section heading: leaf eyebrow, serif title with an optional script accent word.
export default function SectionHead({ eyebrow, title, accent, text, align = "left", tone = "light", className = "", children }) {
  const center = align === "center";
  const dark = tone === "dark";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <p
        className={`flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em] ${
          center ? "justify-center" : ""
        } ${dark ? "text-[#F5B900]" : "text-[#5f9122]"}`}
      >
        <Leaf className="h-4 w-4" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-serif text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-[#123B22]"
        }`}
      >
        {title}
        {accent && (
          <span className={`ml-2 font-script text-[1.25em] font-bold ${dark ? "text-[#F5B900]" : "text-[#B87919]"}`}>{accent}</span>
        )}
      </h2>
      {text && <p className={`mt-4 text-base leading-relaxed ${dark ? "text-white/75" : "text-[#123B22]/80"}`}>{text}</p>}
      {children}
    </Reveal>
  );
}
