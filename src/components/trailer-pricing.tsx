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

const loadLevels = [
  { quarters: 1, label: "¼ trailer", price: 200, shortLabel: "¼" },
  { quarters: 2, label: "½ trailer", price: 400, shortLabel: "½" },
  { quarters: 3, label: "¾ trailer", price: 600, shortLabel: "¾" },
  { quarters: 4, label: "Full trailer", price: 800, shortLabel: "Full" },
] as const;

const priceRange = (price: number) => ({
  min: price - 50,
  max: price + 50,
});

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
  // Quarter 1 (front of bed)
  { icon: Package, left: 4, bottom: 4, size: 44, rotate: -8, delay: 0 },
  { icon: Box, left: 14, bottom: 6, size: 36, rotate: 7, delay: 90 },
  { icon: ToyBrick, left: 8, bottom: 32, size: 28, rotate: -12, delay: 180 },
  // Quarter 2
  { icon: Boxes, left: 28, bottom: 5, size: 44, rotate: 6, delay: 0 },
  { icon: Bike, left: 36, bottom: 8, size: 38, rotate: -6, delay: 110 },
  { icon: Lamp, left: 30, bottom: 34, size: 26, rotate: 10, delay: 200 },
  // Quarter 3
  { icon: Armchair, left: 52, bottom: 6, size: 46, rotate: -5, delay: 0 },
  { icon: Package, left: 63, bottom: 8, size: 34, rotate: 9, delay: 100 },
  { icon: ToyBrick, left: 56, bottom: 38, size: 24, rotate: 14, delay: 190 },
  // Quarter 4
  { icon: WashingMachine, left: 78, bottom: 6, size: 42, rotate: 4, delay: 0 },
  { icon: Box, left: 89, bottom: 9, size: 32, rotate: -10, delay: 90 },
  { icon: Bike, left: 82, bottom: 38, size: 28, rotate: 8, delay: 180 },
];

function quarterOf(item: JunkItem) {
  return Math.min(4, Math.floor(item.left / 25) + 1);
}

export function TrailerPricing() {
  const [selectedQuarters, setSelectedQuarters] = useState(1);
  const selected = loadLevels[selectedQuarters - 1] ?? loadLevels[0];

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
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Interactive price guide</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">How Much Trailer Space Do You Need?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Hover over the trailer or choose a load size to see an estimated price. Prices are based on a 450 cubic foot trailer. Mattresses, furniture, electronics, and other large items are priced individually rather than by total trailer space.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            {/* Dump trailer — tall black walls, triple axle, red accent rail */}
            <div className="relative mx-auto max-w-3xl pb-20 pt-5" aria-label="Interactive trailer load size selector">
              {/* Trailer bed */}
              <div className="relative aspect-[2.35/1]">
                {/* Tall bed walls */}
                <div className="absolute inset-x-0 top-0 bottom-[16%] overflow-hidden rounded-t-sm border-4 border-b-0 border-secondary bg-secondary shadow-md">
                  {/* Junk pile */}
                  <div className="absolute inset-0" aria-hidden="true">
                    {junkPile.map((item, i) => {
                      const Icon = item.icon;
                      const visible = quarterOf(item) <= selectedQuarters;
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
                  <div className="absolute inset-0 grid grid-cols-4">
                    {loadLevels.map((level) => (
                      <button
                        key={level.quarters}
                        type="button"
                        aria-label={`Show ${level.label} estimate: $${level.price}`}
                        aria-pressed={selectedQuarters === level.quarters}
                        onMouseEnter={() => setSelectedQuarters(level.quarters)}
                        onFocus={() => setSelectedQuarters(level.quarters)}
                        onClick={() => setSelectedQuarters(level.quarters)}
                        className="relative border-r border-dashed border-background/15 transition-colors last:border-r-0 hover:bg-background/5 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring/60"
                      >
                        <span className="absolute inset-x-0 top-2 text-center text-xs font-extrabold text-background/60 sm:text-sm">
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

            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4" aria-label="Choose a trailer load size">
              {loadLevels.map((level) => (
                <Button
                  key={level.quarters}
                  type="button"
                  variant={selectedQuarters === level.quarters ? "default" : "outline"}
                  onMouseEnter={() => setSelectedQuarters(level.quarters)}
                  onFocus={() => setSelectedQuarters(level.quarters)}
                  onClick={() => setSelectedQuarters(level.quarters)}
                  aria-pressed={selectedQuarters === level.quarters}
                  className="h-auto min-h-14 flex-col gap-0.5 py-2"
                >
                  <span>{level.label}</span>
                  <span className="text-xs opacity-80">${priceRange(level.price).min}–${priceRange(level.price).max}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6 sm:pl-8" aria-live="polite">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Estimated price</p>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl">{selected.label}</p>
            <p className="mt-2 font-display text-5xl font-extrabold text-primary sm:text-6xl">
              ${priceRange(selected.price).min}–${priceRange(selected.price).max}
            </p>
            <div className="mt-7 border-t border-border pt-6">
              <p className="font-bold">Smaller pickup?</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Our minimum service price starts at $125.</p>
            </div>
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              Estimates are based on volume. Heavy materials, difficult access, demolition, and special disposal items may change the final quote. You approve the price before we start.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
