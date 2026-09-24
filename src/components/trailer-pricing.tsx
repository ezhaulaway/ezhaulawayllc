import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LABOR_RATE, LOAD_LEVELS, MINIMUM_CHARGE, TRAILER_SPEC } from "@/content/pricing";
import trailerEmpty from "@/assets/trailer-base-empty.png";
import trailerQuarter from "@/assets/trailer-base-quarter.png";
import trailerHalf from "@/assets/trailer-base-half.png";
import trailerThreeQuarter from "@/assets/trailer-base-three-quarter.png";
import trailerFull from "@/assets/trailer-base-full.png";

// Map each eighth-fill level to the closest cartoon junk fill image.
const fillImages: Record<number, { src: string; alt: string }> = {
  0: { src: trailerEmpty, alt: "Cartoon of the EZ Haulaway black dump trailer with a small pile — a minimum load" },
  1: { src: trailerQuarter, alt: "Cartoon dump trailer with a small pile of junk — about an eighth full" },
  2: { src: trailerQuarter, alt: "Cartoon dump trailer with boxes and a chair — about a quarter full" },
  3: { src: trailerHalf, alt: "Cartoon dump trailer with furniture and boxes — about three-eighths full" },
  4: { src: trailerHalf, alt: "Cartoon dump trailer half full of household junk" },
  5: { src: trailerThreeQuarter, alt: "Cartoon dump trailer with a couch, bike and boxes — about five-eighths full" },
  6: { src: trailerThreeQuarter, alt: "Cartoon dump trailer three-quarters full of junk" },
  7: { src: trailerFull, alt: "Cartoon dump trailer nearly overflowing with junk" },
  8: { src: trailerFull, alt: "Cartoon dump trailer heaping full of furniture, appliances and junk" },
};

export function TrailerPricing() {
  const [selectedEighths, setSelectedEighths] = useState(2);
  const selected = (LOAD_LEVELS.find((level) => level.eighths === selectedEighths) ?? LOAD_LEVELS[0])!;
  const image = fillImages[selectedEighths] ?? fillImages[0]!;

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
                {Object.entries(fillImages)
                  .filter(([eighths]) => Number(eighths) !== 0 || selectedEighths === 0)
                  .map(([eighths, img]) => (
                    <img
                      key={eighths}
                      src={img.src}
                      alt={Number(eighths) === selectedEighths ? img.alt : ""}
                      aria-hidden={Number(eighths) !== selectedEighths}
                      width={1376}
                      height={768}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                        Number(eighths) === selectedEighths ? "opacity-100" : "opacity-0"
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
