import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CircleCheck, Loader2, Upload, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PHONE, PHONE_TEL } from "@/content/site";
import { supabase } from "@/integrations/supabase/client";
import { submitQuoteRequest, type QuoteInput } from "@/lib/quote.functions";
import { useServerFn } from "@tanstack/react-start";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  phone: z.string().trim().min(1, "Phone is required").max(30, "Phone is too long"),
  location: z.string().trim().min(1, "Location is required").max(100, "Location is too long"),
  details: z.string().trim().min(1, "Please describe what needs to be removed").max(2000, "Details are too long"),
});

function generateId() {
  const c = typeof crypto !== "undefined" ? crypto : undefined;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  // RFC 4122 v4 fallback so uploads always land in a UUID folder
  const bytes = new Uint8Array(16);
  if (c && typeof c.getRandomValues === "function") {
    c.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i += 1) bytes[i] = Math.floor(Math.random() * 256);
  }
  bytes[6] = ((bytes[6] ?? 0) & 0x0f) | 0x40;
  bytes[8] = ((bytes[8] ?? 0) & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}


function safeFileName(name: string) {
  const parts = name.split(".");
  const ext = parts.length > 1 ? parts.pop()!.toLowerCase() : "jpg";
  const base = parts.join(".").replace(/[^a-zA-Z0-9-_]/g, "-").slice(0, 60) || "photo";
  return `${base}.${ext}`;
}



function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function QuoteForm({ children }: { children?: ReactNode }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteInput | "root", string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rootError, setRootError] = useState("");
  const submit = useServerFn(submitQuoteRequest);

  if (submitted) {
    return (
      <div className="grid min-h-72 place-items-center text-center" role="status">
        <div>
          <CircleCheck className="mx-auto size-12 text-primary" />
          <h3 className="mt-5 text-2xl font-bold">Quote request sent</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            We received your details and will reach out soon. For immediate service, call or text us directly.
          </p>
          <Button asChild className="mt-6" size="lg">
            <a href={`sms:${PHONE_TEL}`}>Text {PHONE}</a>
          </Button>
        </div>
      </div>
    );
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const imageFiles = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...imageFiles].slice(0, 10));
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setRootError("");

    const parsed = quoteSchema.safeParse({ name, phone, location, details });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.errors.forEach((err) => {
        const path = err.path[0] as keyof QuoteInput;
        if (!fieldErrors[path]) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      const quoteId = generateId();
      const photoPaths: string[] = [];
      const uploadErrors: string[] = [];

      for (const file of files) {
        const path = `${quoteId}/${safeFileName(file.name)}`;
        const { error } = await supabase.storage.from("quote-photos").upload(path, file, {
          cacheControl: "3600",
          upsert: false,
        });
        if (error) {
          console.error("photo upload error", error);
          uploadErrors.push(file.name);
        } else {
          photoPaths.push(path);
        }
      }

      const result = await submit({
        data: {
          name: parsed.data.name,
          phone: parsed.data.phone,
          location: parsed.data.location,
          details: parsed.data.details,
          photoPaths,
        },
      });

      if (result.success) {
        setSubmitted(true);
        if (uploadErrors.length > 0) {
          console.warn("Some photos failed to upload:", uploadErrors);
        }
      } else {
        setRootError("Could not send your request. Please call or text us.");
      }
    } catch (err) {
      console.error("quote submit error", err);
      setRootError("Something went wrong. Please call or text us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      {children}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 text-sm font-semibold">
          Name
          <Input
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 bg-card"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? <p id="name-error" className="text-xs text-destructive">{errors.name}</p> : null}
        </label>
        <label className="space-y-1.5 text-sm font-semibold">
          Phone number
          <Input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-11 bg-card"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone ? <p id="phone-error" className="text-xs text-destructive">{errors.phone}</p> : null}
        </label>
      </div>
      <label className="block space-y-1.5 text-sm font-semibold">
        City or ZIP code
        <Input
          name="location"
          autoComplete="postal-code"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-11 bg-card"
          aria-invalid={!!errors.location}
          aria-describedby={errors.location ? "location-error" : undefined}
        />
        {errors.location ? <p id="location-error" className="text-xs text-destructive">{errors.location}</p> : null}
      </label>
      <label className="block space-y-1.5 text-sm font-semibold">
        What needs to be removed?
        <Textarea
          name="details"
          required
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="min-h-24 resize-y bg-card"
          aria-invalid={!!errors.details}
          aria-describedby={errors.details ? "details-error" : undefined}
        />
        {errors.details ? <p id="details-error" className="text-xs text-destructive">{errors.details}</p> : null}
      </label>

      <div className="space-y-2">
        <label className="block cursor-pointer rounded-md border border-dashed border-input bg-muted/60 p-4 text-center transition-colors hover:border-primary">
          <Upload className="mx-auto size-5 text-primary" />
          <span className="mt-2 block text-sm font-semibold">Add photos (optional)</span>
          <span className="mt-1 block text-xs text-muted-foreground">Up to 10 images, 10 MB each</span>
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
        </label>

        {files.length > 0 ? (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm">
                <span className="truncate pr-3">
                  {file.name} <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="shrink-0 rounded p-1 text-muted-foreground hover:text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {rootError ? <p className="text-sm text-destructive">{rootError}</p> : null}

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>
        {submitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        {submitting ? "Sending..." : "Request My Free Quote"}
        {!submitting ? <ArrowRight className="ml-2 size-4" /> : null}
      </Button>
      <p className="text-center text-xs leading-5 text-muted-foreground">
        We will respond as soon as we can. Call or text for immediate service.
      </p>
    </form>
  );
}
