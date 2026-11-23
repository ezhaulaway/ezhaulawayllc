import { useEffect, useRef } from "react";
import { usePriceGuide } from "@/hooks/use-price-guide";
import { loadByEighths, priceText } from "@/lib/price-guide";
import clipYard from "@/assets/load-clip-yard.mp4";
import posterYard from "@/assets/load-clip-yard.webp";
import clipCouch from "@/assets/load-clip-couch.mp4";
import posterCouch from "@/assets/load-clip-couch.webp";
import clipFridge from "@/assets/load-clip-fridge.mp4";
import posterFridge from "@/assets/load-clip-fridge.webp";
import clipJunk from "@/assets/load-clip-junk.mp4";
import posterJunk from "@/assets/load-clip-junk.webp";

// Short silent clips rendered from the 3D model of our trailer. Prices are never baked into the
// video: they are written here as tokens so they always match the crew app price list.
const cards = [
  {
    clip: clipYard,
    poster: posterYard,
    label: "A 3-foot cube, then the trailer filling one eighth at a time",
    title: "What a cubic yard is",
    text: "A cubic yard is a cube 3 feet on each side. Our trailer holds about [[yards]] of them, and we price in eighths of the trailer.",
  },
  {
    clip: clipCouch,
    poster: posterCouch,
    label: "One couch loaded at the front of the trailer",
    title: "One couch",
    text: "A couch takes up about a quarter of the trailer. On its own, a 2 to 3 seat couch is [[item:couch-small]].",
  },
  {
    clip: clipFridge,
    poster: posterFridge,
    label: "One full-size fridge standing at the front of the trailer",
    title: "One fridge",
    text: "A full-size fridge takes up about an eighth of the trailer. On its own it is [[item:fridge-full]].",
  },
  {
    clip: clipJunk,
    poster: posterJunk,
    label: "Boxes, bags and small furniture filling a quarter of the trailer",
    title: "A typical household pickup",
    text: "Boxes, bags and a few pieces of furniture usually fill about a quarter of the trailer: [[quarter-volume]] for [[load:2]].",
  },
];

/** Plays only while it is on screen, and never autoplays for visitors who asked for less motion. */
function LoadClip({ clip, poster, label }: { clip: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      video.controls = true;
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) void video.play().catch(() => { video.controls = true; });
          else video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={clip}
      poster={poster}
      width={960}
      height={540}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="aspect-video w-full bg-muted object-cover"
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
            These clips use a model of our real trailer, built from its measurements, to show how much space common loads take up.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <li key={card.title} className="overflow-hidden rounded-lg border border-border bg-card">
              <LoadClip clip={card.clip} poster={card.poster} label={card.label} />
              <div className="p-5">
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{fill(card.text)}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
          Sizes are typical examples. Your price is confirmed from photos or on site before we load anything.
        </p>
      </div>
    </section>
  );
}
