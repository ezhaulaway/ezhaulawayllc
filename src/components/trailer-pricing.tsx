import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TRAILER_SPEC } from "@/content/pricing";
import { formatDiscount } from "@/lib/price-guide";
import { usePriceGuide } from "@/hooks/use-price-guide";
// Rendered from the 3D model of our own trailer, one frame per eighth. All nine share one crop so they line up.
import fill0 from "@/assets/trailer-3d-fill-0.webp";
import fill1 from "@/assets/trailer-3d-fill-1.webp";
import fill2 from "@/assets/trailer-3d-fill-2.webp";
import fill3 from "@/assets/trailer-3d-fill-3.webp";
import fill4 from "@/assets/trailer-3d-fill-4.webp";
import fill5 from "@/assets/trailer-3d-fill-5.webp";
import fill6 from "@/assets/trailer-3d-fill-6.webp";
import fill7 from "@/assets/trailer-3d-fill-7.webp";
import fill8 from "@/assets/trailer-3d-fill-8.webp";

const fillDescriptions: Record<number, string> = {
  0: "one cubic yard marked at the front, the size of a minimum pickup",
  1: "one-eighth of the bed filled",
  2: "one-quarter of the bed filled",
  3: "three-eighths of the bed filled",
  4: "half of the bed filled",
  5: "five-eighths of the bed filled",
  6: "three-quarters of the bed filled",
  7: "seven-eighths of the bed filled",
  8: "the whole bed filled",
};

const loadImages = [fill0, fill1, fill2, fill3, fill4, fill5, fill6, fill7, fill8];

export function TrailerPricing() {
  const guide = usePriceGuide();
  const LOAD_LEVELS = guide.loads;
  const MINIMUM_CHARGE = guide.minimum;
  const LABOR_RATE = guide.laborRate;
  const [selectedEighths, setSelectedEighths] = useState(2);
  // Only the chosen frame loads with the page. The rest load on first touch so dragging is smooth.
  const [warm, setWarm] = useState(false);
  const selected = LOAD_LEVELS.find((level) => level.eighths === selectedEighths) ?? LOAD_LEVELS[0];

  if (!selected) return null;

  return (
    <section className="border-b border-border bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Trailer fill level guide</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">How Much Trailer Space Do You Need?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Drag the slider or choose a fill level to see the price. Prices are based on our{" "}
            {TRAILER_SPEC.length} × {TRAILER_SPEC.width} × {TRAILER_SPEC.height} dump trailer (about {TRAILER_SPEC.cubicYards} cubic yards)
            and include standard labor, loading, hauling, and disposal. Mattresses, furniture, electronics, appliances, and other
            oversized items are priced individually rather than by trailer space.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            <div
              className="relative mx-auto max-w-3xl"
              aria-label="Trailer fill level preview"
              onPointerEnter={() => setWarm(true)}
              onTouchStart={() => setWarm(true)}
              onFocus={() => setWarm(true)}
            >
              <div className="relative aspect-[4/3]">
                {loadImages.map((image, eighths) =>
                  eighths === selectedEighths || warm ? (
                    <img
                      key={image}
                      src={image}
                      alt={eighths === selectedEighths ? `EZ Haulaway 16-foot dump trailer with ${fillDescriptions[eighths]}` : ""}
                      aria-hidden={eighths !== selectedEighths}
                      width={1000}
                      height={750}
                      loading="eager"
                      decoding="async"
                      fetchPriority={eighths === selectedEighths ? "high" : "low"}
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-200 ease-out ${
                        eighths === selectedEighths ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null,
                )}
                <span className="absolute left-3 top-3 rounded-full bg-secondary/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">
                  {selected.eighths === 0 ? "Minimum load" : `${selected.label}`}
                </span>
              </div>
              <label className="mt-2 block">
                <span className="sr-only">Drag to fill the trailer</span>
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={selectedEighths}
                  onChange={(event) => setSelectedEighths(Number(event.target.value))}
                  aria-valuetext={`${selected.eighths === 0 ? "Minimum load" : selected.label}, ${selected.volume}, $${selected.price}`}
                  className="h-8 w-full cursor-pointer accent-primary"
                />
              </label>
              <div className="flex justify-between text-xs font-bold uppercase tracking-wide text-muted-foreground" aria-hidden="true">
                <span>Minimum</span>
                <span>Drag to fill</span>
                <span>Full</span>
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
                  <li key={a.id} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">{a.label}</span>
                    <span className="font-bold">{a.amount}</span>
                  </li>
                ))}
              </ul>
            )}
            {guide.discounts.length > 0 && (
              <ul className="mt-4 space-y-1 text-sm">
                {guide.discounts.map((discount) => {
                  const shown = formatDiscount(discount);
                  return (
                    <li key={discount.id} className="flex justify-between gap-3">
                      <span className="text-muted-foreground">{shown.label}</span>
                      {shown.amount ? <span className="font-bold">{shown.amount}</span> : null}
                    </li>
                  );
                })}
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
