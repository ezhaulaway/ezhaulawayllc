import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TRAILER_SPEC } from "@/content/pricing";
import { usePriceGuide } from "@/hooks/use-price-guide";
import trailerEmpty from "@/assets/trailer-base-empty-clean.png";
import trailerJunk0 from "@/assets/trailer-junk-0.png";
import trailerJunk1 from "@/assets/trailer-junk-1.png";
import trailerJunk2 from "@/assets/trailer-junk-2.png";
import trailerJunk3 from "@/assets/trailer-junk-3.png";
import trailerJunk4 from "@/assets/trailer-junk-4.png";
import trailerJunk5 from "@/assets/trailer-junk-5.png";
import trailerJunk6 from "@/assets/trailer-junk-6.png";
import trailerJunk7 from "@/assets/trailer-junk-7.png";
import trailerJunk8 from "@/assets/trailer-junk-8.png";

const fillDescriptions: Record<number, string> = {
  0: "Cartoon of the EZ Haulaway black dump trailer with a small minimum load at the rear",
  1: "Cartoon dump trailer about one-eighth full of junk, building from the rear",
  2: "Cartoon dump trailer about one-quarter full of junk, building from the rear",
  3: "Cartoon dump trailer about three-eighths full of junk, building from the rear",
  4: "Cartoon dump trailer half full of household junk, building from the rear",
  5: "Cartoon dump trailer about five-eighths full of junk, building from the rear",
  6: "Cartoon dump trailer three-quarters full of junk, building from the rear",
  7: "Cartoon dump trailer seven-eighths full of junk, building from the rear",
  8: "Cartoon dump trailer heaping full of furniture, appliances, boxes, and bags",
};

const loadImages = [
  trailerJunk0,
  trailerJunk1,
  trailerJunk2,
  trailerJunk3,
  trailerJunk4,
  trailerJunk5,
  trailerJunk6,
  trailerJunk7,
  trailerJunk8,
];

export function TrailerPricing() {
  const guide = usePriceGuide();
  const LOAD_LEVELS = guide.loads;
  const MINIMUM_CHARGE = guide.minimum;
  const LABOR_RATE = guide.laborRate;
  const [selectedEighths, setSelectedEighths] = useState(2);
  const selected = LOAD_LEVELS.find((level) => level.eighths === selectedEighths) ?? LOAD_LEVELS[0];

  if (!selected) return null;

  return (
    <section className="border-b border-border bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Trailer fill level guide</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">How Much Trailer Space Do You Need?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Choose a fill level to see the price. Prices are based on our{" "}
            {TRAILER_SPEC.length} × {TRAILER_SPEC.width} × {TRAILER_SPEC.height} dump trailer (about {TRAILER_SPEC.cubicYards} cubic yards)
            and include standard labor, loading, hauling, and disposal. Mattresses, furniture, electronics, appliances, and other
            oversized items are priced individually rather than by trailer space.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            {/* Cartoon trailer with junk fill */}
            <div className="relative mx-auto max-w-3xl" aria-label="Trailer fill level preview">
              <div className="relative aspect-[1376/768]">
                {/* One fixed trailer stays mounted while nine transparent junk stages crossfade. */}
                <img
                  src={trailerEmpty}
                  alt=""
                  aria-hidden="true"
                  width={1376}
                  height={768}
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                {loadImages.map((image, eighths) => (
                  <img
                    key={image}
                    src={image}
                    alt={eighths === selectedEighths ? fillDescriptions[eighths] : ""}
                    aria-hidden={eighths !== selectedEighths}
                    width={1376}
                    height={768}
                    loading="eager"
                    className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out ${
                      eighths === selectedEighths ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">
                  {selected.eighths === 0 ? "Minimum load" : `${selected.label}`}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Choose a trailer fill level">
              {LOAD_LEVELS.map((level) => (
                <Button
                  key={level.eighths}
                  type="button"
                  variant={selectedEighths === level.eighths ? "default" : "outline"}
                  onMouseEnter={() => setSelectedEighths(level.eighths)}
                  onFocus={() => setSelectedEighths(level.eighths)}
                  onClick={() => setSelectedEighths(level.eighths)}
                  aria-pressed={selectedEighths === level.eighths}
                  className="h-auto min-h-14 flex-col gap-0.5 px-1 py-2 text-xs"
                >
                  <span>{level.eighths === 0 ? "Minimum" : level.label.replace(" trailer", "")}</span>
                  <span className="text-xs opacity-80">${level.price}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6 sm:pl-8" aria-live="polite">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Price</p>
            <p className="mt-3 text-2xl font-extrabold sm:text-3xl">{selected.label}</p>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">{selected.volume}</p>
            <p className="mt-2 font-display text-5xl font-extrabold text-primary sm:text-6xl">${selected.price}</p>
            <div className="mt-7 border-t border-border pt-6">
              <p className="font-bold">Smaller pickup?</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Our minimum service price starts at ${MINIMUM_CHARGE}.
              </p>
            </div>
            {guide.adjustments.length > 0 && (
              <ul className="mt-5 space-y-1 text-sm">
                {guide.adjustments.map((a) => (
                  <li key={a.label} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="font-bold">{a.amount}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              Additional labor of ${LABOR_RATE}/hour per crew member may apply for difficult access, disassembly, oversized or heavy
              items, or extended loading time. Pricing may vary based on material, weight, and access. Your final price is approved
              before any work begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
