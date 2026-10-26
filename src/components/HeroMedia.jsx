"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Background for the hero: the shop photo shows immediately, and the walk-through film fades in
// over it once it can play. The film is skipped on phones, data-saver mode and reduced motion.
export const HERO_VIDEO = "/images/idukki_spices_15s_walk_to_light_h264.mp4";

export default function HeroMedia() {
  const [useVideo, setUseVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saveData = navigator.connection?.saveData === true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUseVideo(!reduced && wide && !saveData);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/spice-shop-interior.jpg"
        alt="Traditional wooden spice shop with baskets of pepper, turmeric and cardamom and an open door to the green hills of Idukki"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_35%]"
      />
      {useVideo && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setReady(true)}
        />
      )}
    </div>
  );
}
