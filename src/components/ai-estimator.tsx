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
                <p className="text-sm font-bold uppercase tracking-wide text-primary">{LOAD_LABEL[estimate.load_size]}</p>
                <p className="mt-1 text-4xl font-extrabold">
                  {Math.round(estimate.price_low) === Math.round(estimate.price_high)
                    ? `$${Math.round(estimate.price_low)}`
                    : `$${Math.round(estimate.price_low)}–$${Math.round(estimate.price_high)}`}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Preliminary estimate · {estimate.confidence} confidence</p>
                <p className="mt-4 text-sm leading-6">{estimate.summary}</p>

                <h3 className="mt-5 text-sm font-bold">Recommended service</h3>
                <p className="mt-1 text-sm">{estimate.recommended_service}</p>
                <p className="mt-1 text-sm text-muted-foreground">{estimate.crew_and_time}</p>

                {estimate.items_identified.length > 0 && (
                  <>
                    <h3 className="mt-5 text-sm font-bold">What we spotted</h3>
                    <ul className="mt-1 flex flex-wrap gap-1.5">
                      {estimate.items_identified.map((it, i) => (
                        <li key={i} className="rounded-full bg-background px-2.5 py-1 text-xs">{it}</li>
                      ))}
                    </ul>
                  </>
                )}

                {estimate.special_items.length > 0 && (
                  <>
                    <h3 className="mt-5 text-sm font-bold">Priced individually</h3>
                    <ul className="mt-1 space-y-1 text-sm">
                      {estimate.special_items.map((s, i) => (
                        <li key={i}><span className="font-semibold">{s.item}:</span> {s.note}</li>
                      ))}
                    </ul>
                  </>
                )}

                {estimate.prep_tips.length > 0 && (
                  <>
                    <h3 className="mt-5 text-sm font-bold">Before we arrive</h3>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                      {estimate.prep_tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </>
                )}

                <p className="mt-6 text-xs text-muted-foreground">
                  AI-generated ballpark. Final price is confirmed on site before any work starts.
                </p>
                {leadSent ? (
                  <div className="mt-5 rounded-md border border-primary bg-background p-4 text-center" role="status">
                    <p className="font-bold">You're locked in!</p>
                    <p className="mt-1 text-sm text-muted-foreground">We'll call or text you shortly with your actual quote.</p>
                  </div>
                ) : (
                  <form onSubmit={submitLead} className="mt-5 rounded-md border border-border bg-background p-4">
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
