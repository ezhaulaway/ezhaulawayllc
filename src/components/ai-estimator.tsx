import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAiEstimate, submitEstimateLead, type AiEstimate } from "@/lib/ai-estimate.functions";

const LOAD_LABEL: Record<AiEstimate["load_size"], string> = {
  minimum: "Minimum / small load",
  eighth: "About ⅛ trailer",
  quarter: "About ¼ trailer",
  three_eighths: "About ⅜ trailer",
  half: "About ½ trailer",
  five_eighths: "About ⅝ trailer",
  three_quarters: "About ¾ trailer",
  seven_eighths: "About ⅞ trailer",
  full: "About a full trailer",
  multiple_loads: "More than one trailer",
};

/** How full the mini trailer graphic should look, 0–1. */
const LOAD_FILL: Record<AiEstimate["load_size"], number> = {
  minimum: 0.08,
  eighth: 0.125,
  quarter: 0.25,
  three_eighths: 0.375,
  half: 0.5,
  five_eighths: 0.625,
  three_quarters: 0.75,
  seven_eighths: 0.875,
  full: 1,
  multiple_loads: 1,
};

/** Mini side-view dump trailer with junk filling from the rear. */
function TrailerGauge({ fill, label }: { fill: number; label: string }) {
  // Bed interior: x 14–170, y 30–62. Junk fills right-to-left (rear first).
  const bedX = 14;
  const bedW = 156;
  const junkW = Math.max(6, Math.round(bedW * Math.min(1, fill)));
  const junkX = bedX + bedW - junkW;
  const heap = fill >= 0.99;
  return (
    <svg viewBox="0 0 220 92" role="img" aria-label={label} className="w-full max-w-72">
      {/* junk fill */}
      <rect x={junkX} y={heap ? 22 : 34} width={junkW} height={heap ? 40 : 28} rx={4} className="fill-primary/80" />
      {heap && <circle cx={junkX + 10} cy={24} r={7} className="fill-primary/80" />}
      {fill > 0.3 && <circle cx={bedX + bedW - 8} cy={heap ? 18 : 30} r={6} className="fill-primary" />}
      {/* trailer bed walls */}
      <path d="M10 30 h164 v34 h-164 z M10 30 l-6 -10 M174 30 l6 -10" fill="none" strokeWidth={4} className="stroke-foreground" strokeLinejoin="round" />
      {/* floor line + hitch */}
      <path d="M4 68 h180 M184 68 h22 l8 -6" fill="none" strokeWidth={4} className="stroke-foreground" strokeLinecap="round" />
      {/* wheels */}
      <circle cx={60} cy={76} r={10} className="fill-foreground" />
      <circle cx={60} cy={76} r={4} className="fill-background" />
      <circle cx={96} cy={76} r={10} className="fill-foreground" />
      <circle cx={96} cy={76} r={4} className="fill-background" />
      {/* load tick marks */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1={bedX + bedW * t} y1={64} x2={bedX + bedW * t} y2={58} strokeWidth={2} className="stroke-muted-foreground/60" />
      ))}
    </svg>
  );
}

async function resize(file: File): Promise<string> {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Photo could not be prepared.");
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

type AiEstimatorProps = {
  campaign?: boolean;
  showIntro?: boolean;
};

export function AiEstimator({ campaign = false, showIntro = true }: AiEstimatorProps) {
  const run = useServerFn(generateAiEstimate);
  const lockIn = useServerFn(submitEstimateLead);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [preferredDay, setPreferredDay] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<AiEstimate | null>(null);
  const [leadSending, setLeadSending] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [leadSent, setLeadSent] = useState(false);

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const picked = Array.from(files).filter((f) => f.type.startsWith("image/")).slice(0, 4 - images.length);
    const urls = await Promise.all(picked.map(resize));
    setImages((prev) => [...prev, ...urls].slice(0, 4));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (description.trim().length < 5) {
      setError("Tell us a little about what needs to go.");
      return;
    }
    setLoading(true);
    setError(null);
    setEstimate(null);
    setLeadSent(false);
    try {
      const res = await run({ data: { description, images } });
      if (res.ok) setEstimate(res.estimate);
      else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again or send a quote request.");
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!estimate) return;
    if (name.trim().length < 1) return setLeadError("Please add your name.");
    if (phone.replace(/\D/g, "").length < 10) return setLeadError("Please add a phone number we can reach you at.");
    if (address.trim().length < 3) return setLeadError("Please add the job address.");
    setLeadSending(true);
    setLeadError(null);
    try {
      await lockIn({
        data: {
          name, phone, address,
          description: preferredDay.trim()
            ? `${description.slice(0, Math.max(0, 1970 - preferredDay.trim().length))}\n\nPreferred day: ${preferredDay.trim()}`
            : description,
          photoCount: images.length,
          estimate: {
            load_size: estimate.load_size,
            price_low: estimate.price_low,
            price_high: estimate.price_high,
            summary: estimate.summary,
            items_identified: estimate.items_identified,
          },
        },
      });
      setLeadSent(true);
    } catch {
      setLeadError("Couldn't send that. Please call or text us.");
    } finally {
      setLeadSending(false);
    }
  }

  const inputCls = "mt-1 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="instant-estimate" className={campaign ? "py-4 sm:py-6" : "py-16 sm:py-24"}>
      <div className={campaign ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl px-5 lg:px-8"}>
        {showIntro && <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            100% Free · Instant Junk Removal Estimator
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            Get Your Free Junk Removal Price Right Now
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            No waiting on a callback, no obligation, no cost. Snap up to 4 photos or just describe your junk and get
            an instant price range for hauling it away — in seconds, right here.
          </p>
        </div>}

        <div className={`${showIntro ? "mt-10" : ""} grid gap-5 lg:grid-cols-2`}>
          <form onSubmit={submit} className={`rounded-lg border border-border bg-card shadow-sm ${campaign ? "p-5 sm:p-6" : "p-6"}`}>


            <label className="block text-sm font-bold" htmlFor="ai-desc">What needs to go?</label>
            <textarea
              id="ai-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
              rows={5}
              placeholder="e.g. Old couch, 2 mattresses, about 15 boxes in the garage. Ground floor, driveway access."
              className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="mt-4">
              <p className="text-sm font-bold">Photos (optional, up to 4)</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-md border border-border">
                    <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label="Remove photo"
                      onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                      className="absolute right-1 top-1 size-7 rounded-full bg-background/90 text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
                {images.length < 4 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary">
                    <Camera className="h-5 w-5" />
                    <span className="mt-1 text-xs font-semibold">Add</span>
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                  </label>
                )}
              </div>
            </div>

            {error && <p className="mt-4 text-sm font-semibold text-destructive">{error}</p>}

            <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Pricing your junk right now…</> : <><Sparkles className="h-4 w-4" /> Get My Free Instant Estimate</>}
            </Button>
            <p className="mt-2 text-center text-xs font-semibold text-muted-foreground">
              Free · Instant · No phone call required
            </p>
          </form>

          <div className={`rounded-lg border border-border bg-muted ${campaign ? "min-h-72 p-5 sm:p-6" : "p-6"}`}>
            {!estimate && !loading && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 text-primary" />
                <p className="mt-3 text-sm">Your estimate will appear here.</p>
              </div>
            )}
            {loading && (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-3 text-sm">This can take up to a minute.</p>
              </div>
            )}
            {estimate && (
              <div>
                {/* Price + trailer gauge */}
                <div className="rounded-lg border border-primary/40 bg-background p-4 text-center">
                  <TrailerGauge fill={LOAD_FILL[estimate.load_size]} label={`Trailer graphic showing ${LOAD_LABEL[estimate.load_size].toLowerCase()}`} />
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-primary">{LOAD_LABEL[estimate.load_size]}</p>
                  <p className="mt-1 font-display text-4xl font-extrabold">
                    {Math.round(estimate.price_low) === Math.round(estimate.price_high)
                      ? `$${Math.round(estimate.price_low)}`
                      : `$${Math.round(estimate.price_low)}–$${Math.round(estimate.price_high)}`}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Preliminary estimate · {estimate.confidence} confidence</p>
                </div>

                {/* Job scope at a glance */}
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="rounded-md bg-background p-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your job</p>
                    <p className="mt-1 leading-6">{estimate.summary}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Service</p>
                      <p className="mt-1 font-semibold">{estimate.recommended_service}</p>
                    </div>
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">What it takes</p>
                      <p className="mt-1 font-semibold">{estimate.crew_and_time}</p>
                    </div>
                  </div>
                  {estimate.items_identified.length > 0 && (
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">What we spotted</p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {estimate.items_identified.map((it, i) => (
                          <li key={i} className="rounded-full border border-border px-2.5 py-0.5 text-xs">{it}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {estimate.special_items.length > 0 && (
                    <div className="rounded-md bg-background p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Priced individually</p>
                      <ul className="mt-1 space-y-0.5">
                        {estimate.special_items.map((s, i) => (
                          <li key={i}><span className="font-semibold">{s.item}:</span> {s.note}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {estimate.prep_tips.length > 0 && (
                    <details className="rounded-md bg-background p-3">
                      <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        Before we arrive ({estimate.prep_tips.length} quick tips)
                      </summary>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {estimate.prep_tips.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </details>
                  )}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Estimates and pricing can subject to change. Final price is confirmed before any work starts.
                </p>
                {leadSent ? (
                  <div className="mt-4 rounded-md border border-primary bg-background p-4 text-center" role="status">
                    <p className="font-bold">You're locked in!</p>
                    <p className="mt-1 text-sm text-muted-foreground">We'll call or text you shortly with your actual quote.</p>
                  </div>
                ) : (
                  <form onSubmit={submitLead} className="mt-4 rounded-lg border-2 border-primary bg-background p-4">
                    <p className="font-bold">Get your actual quote & lock in this price</p>
                    <p className="mt-1 text-xs text-muted-foreground">We'll reach out fast to confirm — no spam, ever.</p>
                    <label className="mt-3 block text-sm font-semibold" htmlFor="ai-name">Name</label>
                    <input id="ai-name" required maxLength={100} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                    <label className="mt-3 block text-sm font-semibold" htmlFor="ai-phone">Phone number</label>
                    <input id="ai-phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
                    <label className="mt-3 block text-sm font-semibold" htmlFor="ai-address">Job address</label>
                    <input id="ai-address" required maxLength={200} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city" className={inputCls} />
                    {campaign && (
                      <>
                        <label className="mt-3 block text-sm font-semibold" htmlFor="ai-preferred-day">Preferred service day (optional)</label>
                        <input id="ai-preferred-day" maxLength={80} value={preferredDay} onChange={(e) => setPreferredDay(e.target.value)} placeholder="e.g. Friday afternoon" className={inputCls} />
                      </>
                    )}
                    {leadError && <p className="mt-3 text-sm font-semibold text-destructive">{leadError}</p>}
                    <Button type="submit" className="mt-4 w-full" disabled={leadSending}>
                      {leadSending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : "Lock in my quote"}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
