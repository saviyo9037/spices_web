import { Leaf } from "lucide-react";

const NAMES = ["Black Pepper", "Green Cardamom", "Cinnamon", "Cloves", "Turmeric", "Red Chilli", "Nutmeg", "Star Anise"];

// Slow scrolling ribbon of spice names. Pure CSS; static when reduced motion is requested.
export default function SpiceMarquee() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
      {NAMES.map((n) => (
        <li key={n} className="flex items-center gap-10 whitespace-nowrap font-script text-3xl font-bold text-[#F5B900]/95 sm:text-4xl">
          {n}
          <Leaf className="h-5 w-5 text-[#70A82C]" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative overflow-hidden bg-[#123B22] py-5" role="presentation">
      <span className="sr-only">Black pepper, green cardamom, cinnamon, cloves, turmeric, red chilli, nutmeg and star anise.</span>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
