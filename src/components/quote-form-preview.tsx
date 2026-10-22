import { ArrowRight, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
/** Initial quote view, matching the form while its submission code loads. */
export function QuoteFormPreview() {
  return <form className="mt-5 space-y-4" aria-busy="true" inert onSubmit={(event) => event.preventDefault()}>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="space-y-1.5 text-sm font-semibold">Name<Input name="name" autoComplete="name" required className="h-11 bg-card" /></label>
      <label className="space-y-1.5 text-sm font-semibold">Phone number<Input name="phone" type="tel" autoComplete="tel" required className="h-11 bg-card" /></label>
    </div>
    <label className="block space-y-1.5 text-sm font-semibold">City or ZIP code<Input name="location" autoComplete="postal-code" required className="h-11 bg-card" /></label>
    <label className="block space-y-1.5 text-sm font-semibold">What needs to be removed?<Textarea name="details" required rows={4} className="min-h-24 resize-y bg-card" /></label>
    <div className="space-y-2"><label className="block cursor-pointer rounded-md border border-dashed border-input bg-muted/60 p-4 text-center transition-colors hover:border-primary">
      <Upload className="mx-auto size-5 text-primary" /><span className="mt-2 block text-sm font-semibold">Add photos (optional)</span>
      <span className="mt-1 block text-xs text-muted-foreground">Up to 10 images, 10 MB each</span><input className="sr-only" type="file" accept="image/*" multiple />
    </label></div>
    <Button type="submit" size="lg" className="w-full">Request My Free Quote<ArrowRight className="ml-2 size-4" /></Button>
    <p className="text-center text-xs leading-5 text-muted-foreground">We will respond as soon as we can. Call or text for immediate service.</p>
  </form>;
}