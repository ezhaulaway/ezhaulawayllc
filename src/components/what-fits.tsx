import { useEffect, useRef, useState } from "react";
import { usePriceGuide } from "@/hooks/use-price-guide";
import { loadByEighths, priceText } from "@/lib/price-guide";
import animYard from "@/assets/load-anim-yard.webp";
import stillYard from "@/assets/load-still-yard.webp";
import animCouch from "@/assets/load-anim-couch.webp";
import stillCouch from "@/assets/load-still-couch.webp";
import animFridge from "@/assets/load-anim-fridge.webp";
import stillFridge from "@/assets/load-still-fridge.webp";
import animJunk from "@/assets/load-anim-junk.webp";
import stillJunk from "@/assets/load-still-junk.webp";
import animFull from "@/assets/load-anim-full.webp";
import stillFull from "@/assets/load-still-full.webp";

// Short looping animations rendered from the 3D model of our trailer, with transparent backgrounds
// so the trailer sits directly on the page. Prices are never baked into the pictures: they are
// written here as tokens so they always match the crew app price list.
const cards = [
  {
    anim: animYard,
    still: stillYard,
    alt: "Our dump trailer filling one eighth at a time, starting from a single cubic yard",
    title: "What a cubic yard is",
    text: "A cubic yard is a cube 3 feet on each side. Our trailer holds about [[yards]] of them, and we price in eighths of the trailer.",
  },
  {
    anim: animCouch,
    still: stillCouch,
    alt: "One couch loaded at the front of the trailer, taking up a quarter of the bed",
    title: "One couch",
    text: "A couch takes up about a quarter of the trailer. On its own, a 2 to 3 seat couch is [[item:couch-small]].",
  },
  {
    anim: animFridge,
    still: stillFridge,
    alt: "One full-size fridge standing at the front of the trailer, taking up an eighth of the bed",
    title: "One fridge",
    text: "A full-size fridge takes up about an eighth of the trailer. On its own it is [[item:fridge-full]].",
  },
  {
    anim: animJunk,
    still: stillJunk,
    alt: "Boxes, bags and small furniture filling a quarter of the trailer",
    title: "A typical household pickup",
    text: "Boxes, bags and a few pieces of furniture usually fill about a quarter of the trailer: [[quarter-volume]] for [[load:2]].",
  },
  {
    anim: animFull,
    still: stillFull,
    alt: "The trailer filled front to back with furniture, boxes and bags",
    title: "A full trailer",
    text: "A whole-house or garage cleanout can fill the trailer front to back: about [[yards]] cubic yards for [[load:8]].",
  },
];

/**
 * Shows the finished still until the card is on screen, then swaps in the animation.
 * Visitors who asked for less motion keep the still.
 */
function LoadAnimation({ anim, still, alt }: { anim: string; still: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const image = ref.current;
    if (!image || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) { setPlaying(false); continue; }
          // Download the animation first so the still never flashes empty.
          const loader = new Image();
          loader.onload = () => { if (!cancelled) setPlaying(true); };
          loader.src = anim;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(image);
    return () => { cancelled = true; observer.disconnect(); };
  }, [anim]);
  return (
    <img
      ref={ref}
      src={playing ? anim : still}
      alt={alt}
      width={800}
      height={600}
      loading="lazy"
      decoding="async"
      className="aspect-[4/3] w-full object-contain"
    />
  );
}

export function WhatFits() {
  const guide = usePriceGuide();
  const quarter = loadByEighths(guide, 2);
  const full = loadByEighths(guide, 8);
  const fill = (text: string) =>
    priceText(
      text
        .replace("[[quarter-volume]]", quarter ? quarter.volume.replace("yd³", "cubic yards") : "about a quarter of the trailer")
        .replace("[[yards]]", full ? full.volume.replace(" yd³", "") : "14"),
      guide,
    );
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">What fits</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">See What You're Paying For</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            These use a model of our real trailer, built from its measurements, to show how much space common loads take up.
          </p>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-12">
          {cards.map((card) => (
            <li key={card.title} className="w-full text-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
              <LoadAnimation anim={card.anim} still={card.still} alt={card.alt} />
              <h3 className="mt-3 text-xl font-bold">{card.title}</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{fill(card.text)}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
          Sizes are typical examples. Your price is confirmed from photos or on site before we load anything.
        </p>
      </div>
    </section>
  );
}
