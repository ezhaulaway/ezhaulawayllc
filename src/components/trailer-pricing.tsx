import { useState } from "react";
import {
  Armchair,
  Bike,
  Box,
  Boxes,
  Lamp,
  Package,
  ToyBrick,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LABOR_RATE, LOAD_LEVELS, MINIMUM_CHARGE, TRAILER_SPEC } from "@/content/pricing";

const fillLevels = LOAD_LEVELS.filter((level) => level.eighths > 0);

// Household junk: toys, boxes, garage-sale style items.
// Positions are % inside the trailer bed, staggered so items tumble in.
type JunkItem = {
  icon: LucideIcon;
  left: number;
  bottom: number;
  size: number;
  rotate: number;
  delay: number;
};

const junkPile: JunkItem[] = [
  // 1/8
  { icon: Package, left: 2, bottom: 4, size: 40, rotate: -8, delay: 0 },
  { icon: ToyBrick, left: 4, bottom: 34, size: 24, rotate: -12, delay: 140 },
  // 2/8
  { icon: Box, left: 15, bottom: 5, size: 34, rotate: 7, delay: 0 },
  { icon: Lamp, left: 16, bottom: 32, size: 24, rotate: 9, delay: 140 },
  // 3/8
  { icon: Boxes, left: 27, bottom: 5, size: 40, rotate: 6, delay: 0 },
  // 4/8
  { icon: Bike, left: 39, bottom: 6, size: 36, rotate: -6, delay: 0 },
  { icon: Box, left: 40, bottom: 36, size: 26, rotate: 11, delay: 140 },
  // 5/8
  { icon: Armchair, left: 51, bottom: 6, size: 42, rotate: -5, delay: 0 },
  // 6/8
  { icon: Package, left: 64, bottom: 6, size: 34, rotate: 9, delay: 0 },
  { icon: ToyBrick, left: 65, bottom: 36, size: 24, rotate: 14, delay: 140 },
  // 7/8
  { icon: WashingMachine, left: 76, bottom: 6, size: 40, rotate: 4, delay: 0 },
  // 8/8
  { icon: Box, left: 89, bottom: 6, size: 32, rotate: -10, delay: 0 },
  { icon: Bike, left: 88, bottom: 38, size: 26, rotate: 8, delay: 140 },
];

function eighthOf(item: JunkItem) {
  return Math.min(8, Math.floor(item.left / 12.5) + 1);
}

export function TrailerPricing() {
  const [selectedEighths, setSelectedEighths] = useState(2);
  const selected = LOAD_LEVELS.find((level) => level.eighths === selectedEighths) ?? LOAD_LEVELS[0];

  return (
    <section className="border-b border-border bg-muted py-16 sm:py-24">
      <style>{`
        @keyframes junk-drop {
          0% { opacity: 0; transform: translateY(-90px) rotate(0deg) scale(0.8); }
          60% { opacity: 1; transform: translateY(6px) rotate(var(--junk-rot)) scale(1.05); }
          100% { opacity: 1; transform: translateY(0) rotate(var(--junk-rot)) scale(1); }
        }
        .junk-item { animation: junk-drop 0.55s cubic-bezier(0.34, 1.4, 0.64, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .junk-item { animation: none; opacity: 1; }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Trailer fill level guide</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">How Much Trailer Space Do You Need?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Hover over the trailer or choose a fill level to see the price. Prices are based on our{" "}
            {TRAILER_SPEC.length} × {TRAILER_SPEC.width} × {TRAILER_SPEC.height} dump trailer (about {TRAILER_SPEC.cubicYards} cubic yards)
            and include standard labor, loading, hauling, and disposal. Mattresses, furniture, electronics, appliances, and other
            oversized items are priced individually rather than by trailer space.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            {/* Dump trailer — tall black walls, tandem axle, red accent rail */}
            <div className="relative mx-auto max-w-3xl pb-20 pt-5" aria-label="Interactive trailer fill level selector">
              {/* Trailer bed */}
              <div className="relative aspect-[2.35/1]">
                {/* Tall bed walls */}
                <div className="absolute inset-x-0 top-0 bottom-[16%] overflow-hidden rounded-t-sm border-4 border-b-0 border-secondary bg-secondary shadow-md">
                  {/* Junk pile */}
                  <div className="absolute inset-0" aria-hidden="true">
                    {junkPile.map((item, i) => {
                      const Icon = item.icon;
                      const visible = eighthOf(item) <= selectedEighths;
                      return (
                        <Icon
                          key={i}
                          className={visible ? "junk-item absolute text-card" : "hidden"}
                          style={{
                            left: `${item.left}%`,
                            bottom: `${item.bottom}%`,
                            width: item.size,
                            height: item.size,
                            animationDelay: `${item.delay}ms`,
                            ["--junk-rot" as string]: `${item.rotate}deg`,
                          }}
                          strokeWidth={1.7}
                        />
                      );
                    })}
                  </div>

                  {/* Vertical wall ribs */}
                  <div className="pointer-events-none absolute inset-0 flex justify-between px-5" aria-hidden="true">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} className="h-full w-1 bg-background/10" />
                    ))}
                  </div>
                  {/* Top rail highlight */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-background/15" aria-hidden="true" />

                  {/* Hover/selection zones */}
                  <div className="absolute inset-0 grid grid-cols-8">
                    {fillLevels.map((level) => (
                      <button
                        key={level.eighths}
                        type="button"
                        aria-label={`Show ${level.label} price: $${level.price}`}
                        aria-pressed={selectedEighths === level.eighths}
                        onMouseEnter={() => setSelectedEighths(level.eighths)}
                        onFocus={() => setSelectedEighths(level.eighths)}
                        onClick={() => setSelectedEighths(level.eighths)}
                        className="relative border-r border-dashed border-background/15 transition-colors last:border-r-0 hover:bg-background/5 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring/60"
                      >
                        <span className="absolute inset-x-0 top-2 text-center text-[11px] font-extrabold text-background/60 sm:text-sm">
                          {level.shortLabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Red/white reflective strip along the lower rail */}
                <div className="absolute inset-x-0 bottom-[16%] h-[4%] bg-[repeating-linear-gradient(90deg,var(--primary)_0_18px,var(--card)_18px_36px)]" aria-hidden="true" />
                {/* Bed floor / frame rail */}
                <div className="absolute inset-x-0 bottom-[12%] h-[4%] bg-secondary" aria-hidden="true" />
                {/* Under-frame */}
                <div className="absolute inset-x-[8%] bottom-[7%] h-[4%] rounded-sm bg-secondary/70" aria-hidden="true" />

                {/* Tandem (two-axle) wheels */}
                <div className="absolute bottom-0 left-[16%] size-14 rounded-full border-[6px] border-secondary bg-background shadow-inner sm:size-16" aria-hidden="true">
                  <span className="absolute inset-3 rounded-full bg-secondary/25" />
                </div>
                <div className="absolute bottom-0 left-[26%] size-14 rounded-full border-[6px] border-secondary bg-background shadow-inner sm:size-16" aria-hidden="true">
                  <span className="absolute inset-3 rounded-full bg-secondary/25" />
                </div>

                {/* Hitch tongue + coupler + jack */}
                <div className="absolute -right-10 bottom-[9%] h-2.5 w-12 rounded-full bg-secondary sm:-right-14 sm:w-16" aria-hidden="true" />
                <div className="absolute -right-12 bottom-[7.5%] size-4 rounded-full border-4 border-secondary bg-background sm:-right-16" aria-hidden="true" />
                <div className="absolute -right-2 bottom-0 h-[8%] w-1.5 bg-secondary/70" aria-hidden="true" />
              </div>
            </div>

            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5" aria-label="Choose a trailer fill level">
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
