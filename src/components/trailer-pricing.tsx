import { useState } from "react";
import { Armchair, Boxes, LampFloor, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const loadLevels = [
  { quarters: 1, label: "¼ trailer", price: 200, shortLabel: "¼" },
  { quarters: 2, label: "½ trailer", price: 400, shortLabel: "½" },
  { quarters: 3, label: "¾ trailer", price: 600, shortLabel: "¾" },
  { quarters: 4, label: "Full trailer", price: 800, shortLabel: "Full" },
] as const;

const junkIcons = [Boxes, Armchair, LampFloor, Trash2] as const;

export function TrailerPricing() {
  const [selectedQuarters, setSelectedQuarters] = useState(1);
  const selected = loadLevels[selectedQuarters - 1] ?? loadLevels[0];

  return (
    <section className="border-b border-border bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Interactive price guide</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">How Much Trailer Space Do You Need?</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Hover over the trailer or choose a load size to see an estimated price.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            <div className="relative mx-auto max-w-3xl pb-16 pt-5" aria-label="Interactive trailer load size selector">
              <div className="relative aspect-[2.15/1] overflow-hidden rounded-md border-[5px] border-secondary bg-card shadow-sm">
                <div className="absolute inset-x-0 bottom-0 grid h-[78%] grid-cols-4">
                  {loadLevels.map((level, index) => {
                    const Icon = junkIcons[index] ?? Boxes;
                    const isFilled = index < selectedQuarters;
                    return (
                      <button
                        key={level.quarters}
                        type="button"
                        aria-label={`Show ${level.label} estimate: $${level.price}`}
                        aria-pressed={selectedQuarters === level.quarters}
                        onMouseEnter={() => setSelectedQuarters(level.quarters)}
                        onFocus={() => setSelectedQuarters(level.quarters)}
                        onClick={() => setSelectedQuarters(level.quarters)}
                        className="group relative border-r border-dashed border-secondary/25 last:border-r-0 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-ring/40"
                      >
                        <span
                          className={`absolute inset-x-1 bottom-1 flex h-[88%] items-center justify-center rounded-sm border transition-all duration-300 motion-reduce:transition-none ${
                            isFilled
                              ? "translate-y-0 border-primary/25 bg-primary/15 opacity-100"
                              : "translate-y-6 border-transparent bg-transparent opacity-0"
                          }`}
                          aria-hidden="true"
                        >
                          <Icon className="size-10 text-primary sm:size-14" strokeWidth={1.6} />
                        </span>
                        <span className="absolute inset-x-0 top-2 text-center text-xs font-extrabold text-secondary/55 sm:text-sm">
                          {level.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-secondary" aria-hidden="true" />
              </div>

              <div className="absolute -right-7 bottom-[3.4rem] h-3 w-16 origin-left rotate-12 rounded-full bg-secondary sm:-right-12 sm:w-24" aria-hidden="true" />
              <div className="absolute -right-12 bottom-[2.55rem] h-3 w-8 rounded-full bg-secondary sm:-right-20" aria-hidden="true" />
              <div className="absolute bottom-7 left-[16%] size-14 rounded-full border-[6px] border-secondary bg-background shadow-inner sm:size-16" aria-hidden="true">
                <span className="absolute inset-3 rounded-full bg-secondary/25" />
              </div>
              <div className="absolute bottom-7 right-[16%] size-14 rounded-full border-[6px] border-secondary bg-background shadow-inner sm:size-16" aria-hidden="true">
                <span className="absolute inset-3 rounded-full bg-secondary/25" />
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
                  <span className="text-xs opacity-80">${level.price}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-l-4 border-primary pl-6 sm:pl-8" aria-live="polite">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Estimated price</p>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl">{selected.label}</p>
            <p className="mt-2 font-display text-6xl font-extrabold text-primary">${selected.price}</p>
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