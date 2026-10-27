import { Suspense } from "react";
import SpiceFinder from "@/components/SpiceFinder";

export const metadata = {
  title: "Spice Finder",
  description:
    "Find the right Idukki Spices product by spice, whole or powder, cooking use and pack size.",
};

export default function SpicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-40 text-center font-serif text-lg text-forest">Loading spices…</div>}>
      <SpiceFinder />
    </Suspense>
  );
}
