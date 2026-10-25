import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type NextStep =
  | { kind: "page"; to: "/pricing" | "/how-it-works" | "/about" | "/contact" | "/what-we-take" | "/service-areas" | "/instant-estimate" | "/faq" | "/blog"; label: string; text: string }
  | { kind: "service"; slug: string; label: string; text: string };

export function NextSteps({ title = "Where to Go Next", steps }: { title?: string; steps: NextStep[] }) {
  return (
    <section className="border-t border-border py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 className="text-2xl font-extrabold">{title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => {
            const inner = (
              <>
                <span className="flex items-center gap-2 font-bold text-foreground group-hover:text-primary">
                  {s.label} <ArrowRight className="size-4" />
                </span>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{s.text}</span>
              </>
            );
            const cls = "group block rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary";
            return s.kind === "page" ? (
              <Link key={s.label} to={s.to} className={cls}>{inner}</Link>
            ) : (
              <Link key={s.label} to="/services/$slug" params={{ slug: s.slug }} className={cls}>{inner}</Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const serviceKeywords: Array<[RegExp, string, string]> = [
  [/pallet|scrap wood/i, "wood-pallet-removal", "Wood Pallet Removal"],
  [/dumpster/i, "dumpster-rental-alternative", "Dumpster Rental Alternative"],
  [/hoard/i, "hoarder-cleanout", "Hoarder Cleanouts"],
  [/storage unit/i, "storage-unit-cleanout", "Storage Unit Cleanouts"],
  [/eviction|trash out|abandoned/i, "eviction-cleanout-and-trash-out", "Eviction Cleanouts & Trash Outs"],
  [/make[- ]ready|turnover|unit turn/i, "apartment-make-ready-haul-off", "Apartment Make-Ready Haul-Off"],
  [/basement|attic/i, "basement-and-attic-cleanouts", "Basement & Attic Cleanouts"],
  [/hot tub|spa/i, "hot-tub-removal", "Hot Tub Removal"],
  [/appliance|fridge|refrigerator|washer|dryer/i, "appliance-removal", "Appliance Removal"],
  [/couch|sofa|furniture|mattress/i, "furniture-removal", "Furniture Removal"],
  [/estate|move|moving|downsiz/i, "house-and-estate-cleanouts", "House & Estate Cleanouts"],
  [/garage/i, "garage-cleanouts", "Garage Cleanouts"],
  [/yard|landscap|branch/i, "yard-and-landscaping-debris", "Yard Debris Removal"],
  [/construction|remodel|renovation|debris/i, "construction-debris-removal", "Construction Debris Removal"],
  [/office|commercial|business/i, "commercial-junk-removal", "Commercial Junk Removal"],
  [/electronic|e-waste|tv/i, "electronics-and-e-waste-removal", "Electronics Removal"],
  [/deck|fence/i, "deck-and-fence-removal", "Deck & Fence Removal"],
  [/shed/i, "shed-removal", "Shed Removal"],
];

/** Picks up to 3 relevant service links for a blog article from its title/description. */
export function blogNextSteps(text: string): NextStep[] {
  const matched: NextStep[] = serviceKeywords
    .filter(([re]) => re.test(text))
    .slice(0, 2)
    .map(([, slug, label]) => ({ kind: "service", slug, label, text: `See how EZ Haulaway handles ${label.toLowerCase()} in Parker and the Denver metro.` }));
  const fallback: NextStep[] = [
    { kind: "page", to: "/pricing", label: "See Our Pricing", text: "Transparent trailer-space pricing, set before we lift anything." },
    { kind: "page", to: "/instant-estimate", label: "Get an Instant Estimate", text: "Describe your junk and get a price range in about a minute." },
    { kind: "page", to: "/what-we-take", label: "What We Take", text: "Furniture, appliances, debris, and more — check your items." },
  ];
  return [...matched, ...fallback].slice(0, 3);
}
