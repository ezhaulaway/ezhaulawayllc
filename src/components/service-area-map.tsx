import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { locations } from "@/content/locations";

const cityPoints: Record<string, { x: number; y: number; labelX: number; labelY: number; anchor?: "start" | "middle" | "end" }> = {
  denver: { x: 207, y: 105, labelX: 220, labelY: 93, anchor: "start" },
  lakewood: { x: 100, y: 145, labelX: 87, labelY: 133, anchor: "end" },
  aurora: { x: 392, y: 116, labelX: 406, labelY: 104, anchor: "start" },
  englewood: { x: 210, y: 211, labelX: 195, labelY: 201, anchor: "end" },
  littleton: { x: 176, y: 252, labelX: 162, labelY: 269, anchor: "end" },
  centennial: { x: 338, y: 288, labelX: 324, labelY: 307, anchor: "end" },
  "highlands-ranch": { x: 222, y: 326, labelX: 206, labelY: 346, anchor: "end" },
  "lone-tree": { x: 332, y: 340, labelX: 319, labelY: 328, anchor: "end" },
  parker: { x: 475, y: 363, labelX: 491, labelY: 353, anchor: "start" },
  "castle-pines": { x: 306, y: 430, labelX: 291, labelY: 448, anchor: "end" },
  sedalia: { x: 190, y: 462, labelX: 175, labelY: 451, anchor: "end" },
  franktown: { x: 481, y: 492, labelX: 496, labelY: 482, anchor: "start" },
  "castle-rock": { x: 359, y: 514, labelX: 344, labelY: 536, anchor: "end" },
  elizabeth: { x: 650, y: 525, labelX: 634, labelY: 547, anchor: "end" },
};

export function ServiceAreaMap() {
  return (
    <section className="border-y border-border bg-muted py-16 sm:py-20" aria-labelledby="coverage-map-title">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
          <div className="min-w-0 overflow-hidden rounded-lg border border-border bg-card p-3 shadow-sm sm:p-5">
            <svg
              viewBox="0 0 760 600"
              role="img"
              aria-labelledby="service-map-title service-map-description"
              className="h-auto w-full text-foreground"
            >
              <title id="service-map-title">EZ Haulaway Denver metro service area map</title>
              <desc id="service-map-description">
                An outlined service region connecting fourteen communities from Denver to Elizabeth, with Parker marked as the home base.
              </desc>

              <path
                d="M60 108 C92 58 170 35 247 52 C322 68 379 61 448 76 C523 92 581 148 589 218 C598 285 565 338 610 395 C658 456 718 489 690 554 C648 588 565 571 497 552 C423 573 347 565 276 548 C191 565 103 531 73 465 C43 399 75 338 61 278 C45 211 28 160 60 108Z"
                className="fill-primary/10 stroke-primary"
                strokeWidth="3"
                strokeDasharray="10 8"
              />

              <g className="fill-none stroke-border" strokeWidth="2">
                <path d="M205 28 C212 132 207 234 222 326 C236 410 303 489 374 579" />
                <path d="M43 154 C172 164 277 176 395 153 C515 131 630 161 721 202" />
                <path d="M82 286 C198 273 300 292 391 344 C485 398 575 428 704 419" />
                <path d="M102 488 C210 462 305 429 392 394 C505 349 591 279 687 246" />
              </g>
              <g className="fill-muted-foreground" opacity="0.55" fontSize="12" fontWeight="700">
                <text x="215" y="45">I-25</text>
                <text x="573" y="159">E-470</text>
                <text x="77" y="148">US-6</text>
              </g>

              {locations.map((location, index) => {
                const point = cityPoints[location.slug];
                if (!point) return null;
                const isHome = location.slug === "parker";
                return (
                  <a
                    key={location.slug}
                    href={`/service-areas/${location.slug}`}
                    aria-label={`Junk removal in ${location.city}`}
                    className="group outline-none"
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHome ? 16 : 11}
                      className={isHome ? "fill-primary stroke-card" : "fill-card stroke-primary"}
                      strokeWidth="4"
                    />
                    <text
                      x={point.x}
                      y={point.y + 4}
                      textAnchor="middle"
                      className={isHome ? "fill-primary-foreground" : "fill-foreground"}
                      fontSize={isHome ? 11 : 9}
                      fontWeight="800"
                    >
                      {index + 1}
                    </text>
                    <text
                      x={point.labelX}
                      y={point.labelY}
                      textAnchor={point.anchor ?? "start"}
                      className={isHome ? "fill-primary" : "fill-foreground group-hover:fill-primary"}
                      fontSize={isHome ? 16 : 14}
                      fontWeight={isHome ? "800" : "700"}
                    >
                      {location.city}
                    </text>
                    {isHome ? (
                      <text x={point.labelX} y={point.labelY + 16} className="fill-muted-foreground" fontSize="10" fontWeight="700">
                        HOME BASE
                      </text>
                    ) : null}
                  </a>
                );
              })}
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Our coverage</p>
            <h2 id="coverage-map-title" className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Parker & Castle Rock Junk Removal Coverage
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              We dispatch from our Parker home base, regularly serve Castle Rock, and cover communities across the south and central Denver metro. Select your city for local services and details.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-2.5" aria-label="Mapped service areas">
              {locations.map((location, index) => (
                <li key={location.slug}>
                  <Link
                    to="/service-areas/$city"
                    params={{ city: location.slug }}
                    className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary text-xs font-bold text-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                      {index + 1}
                    </span>
                    <span>{location.city}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-7 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              Nearby but not listed? Call us—we may still be able to schedule your haul.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}