import { Camera, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
/** Exact empty non-campaign view; no estimator or lead logic runs here. */
export function EstimatePreview() {
  const inputCls = "mt-1 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";
  return <div className="mt-10 grid gap-5 lg:grid-cols-2" aria-busy="true">
    <form className="rounded-lg border border-border bg-card p-6 shadow-sm" onSubmit={(event) => event.preventDefault()}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2"><label className="block text-sm font-bold" htmlFor="ai-name">Name *</label><input id="ai-name" required maxLength={100} autoComplete="name" className={inputCls} /></div>
        <div><label className="block text-sm font-bold" htmlFor="ai-city">City *</label><input id="ai-city" required maxLength={200} autoComplete="address-level2" placeholder="e.g. Parker" className={inputCls} /></div>
        <div><label className="block text-sm font-bold" htmlFor="ai-phone">Phone *</label><input id="ai-phone" type="tel" inputMode="tel" required maxLength={30} autoComplete="tel" className={inputCls} /></div>
      </div>
      <label className="mt-4 block text-sm font-bold" htmlFor="ai-desc">What needs to go?</label>
      <textarea id="ai-desc" maxLength={2000} rows={5} placeholder="e.g. Old couch, 2 mattresses, about 15 boxes in the garage. Ground floor, driveway access." className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      <div className="mt-4"><p className="text-sm font-bold">Photos (optional, up to 4)</p><div className="mt-2 grid grid-cols-4 gap-2">
        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"><Camera className="h-5 w-5" /><span className="mt-1 text-xs font-semibold">Add</span><input type="file" accept="image/*" multiple className="sr-only" /></label>
      </div></div>
      <Button type="submit" size="lg" className="mt-6 w-full"><Sparkles className="h-4 w-4" />Get My Free Instant Estimate</Button>
      <p className="mt-2 text-center text-xs font-semibold text-muted-foreground">Free · Instant · No spam, ever</p>
    </form>
    <div className="rounded-lg border border-border bg-muted p-6"><div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground"><Sparkles className="h-8 w-8 text-primary" /><p className="mt-3 text-sm">Your estimate will appear here.</p></div></div>
  </div>;
}