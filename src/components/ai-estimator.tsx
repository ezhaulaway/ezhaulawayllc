import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateAiEstimate, type AiEstimate } from "@/lib/ai-estimate.functions";

const LOAD_LABEL: Record<AiEstimate["load_size"], string> = {
  minimum: "Minimum job",
  quarter: "About ¼ trailer",
  half: "About ½ trailer",
  three_quarters: "About ¾ trailer",
  full: "About a full trailer",
  multiple_loads: "More than one trailer",
};

async function resize(file: File): Promise<string> {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.8);
}

export function AiEstimator() {
  const run = useServerFn(generateAiEstimate);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<AiEstimate | null>(null);

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

  return (
    <section id="instant-estimate" className="py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Instant AI estimate</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Snap a Photo, Get a Ballpark Price</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Upload up to 4 photos and describe your junk. We'll give you a preliminary price range and what to expect — confirmed on site before we start.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <form onSubmit={submit} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <label className="text-sm font-bold" htmlFor="ai-desc">What needs to go?</label>
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
                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={() => setImages((p) => p.filter((_, j) => j !== i))}
                      className="absolute right-1 top-1 rounded-full bg-background/90 p-0.5 text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
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
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Looking over your junk…</> : <><Sparkles className="h-4 w-4" /> Get my estimate</>}
            </Button>
          </form>

          <div className="rounded-lg border border-border bg-muted p-6">
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
                  ${Math.round(estimate.price_low)}–${Math.round(estimate.price_high)}
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
                <Button asChild className="mt-4 w-full">
                  <a href="/contact">Lock in a free quote</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
