import { NextSteps } from "@/components/next-steps";
import { ProseSection } from "@/components/prose-section";
import { pageExtras } from "@/content/page-extras";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand, InlineQuoteForm, PageHero, PageShell, SectionHeader } from "@/components/site-chrome";
import { PHONE, PHONE_TEL, SITE_URL } from "@/content/site";
import { locations } from "@/content/locations";

const title = "Contact EZ Haulaway — Free Junk Removal Quotes";
const description =
  "Call or text EZ Haulaway at 720-614-7223 for a free junk removal quote in Parker and the Denver metro area, or send us your job details online.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Contact"
        title="Tell Us About Your Junk"
        text="The fastest way to get a number is a photo. Text it over, or fill in the form and we'll get back to you."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Reach us" title="Call, Text, or Send Photos" />
            <div className="mt-8 grid gap-4">
              <div className="rounded-lg border border-border bg-card p-6">
                <Phone className="size-5 text-primary" />
                <h2 className="mt-4 text-lg font-bold">Call us</h2>
                <p className="mt-1 text-sm text-muted-foreground">Talk it through and get an answer on the spot.</p>
                <Button asChild className="mt-4" size="lg">
                  <a href={`tel:${PHONE_TEL}`}>{PHONE}</a>
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <MessageSquare className="size-5 text-primary" />
                <h2 className="mt-4 text-lg font-bold">Text photos</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send pictures of the pile, the room, or the item and we'll get you close to a price before we arrive.
                </p>
                <Button asChild className="mt-4" size="lg" variant="outline">
                  <a href={`sms:${PHONE_TEL}`}>Text {PHONE}</a>
                </Button>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <MapPin className="size-5 text-primary" />
                <h2 className="mt-4 text-lg font-bold">Where we work</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Based in Parker, CO and serving {locations.map((item) => item.city).join(", ")} and the surrounding
                  Denver metro area.
                </p>
              </div>
            </div>
          </div>
          <InlineQuoteForm />
        </div>
      </section>

      <section className="border-t border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="After you reach out"
            title="What Happens Next"
            text="Reaching out about junk removal shouldn't feel like a commitment. Here's exactly what to expect."
          />
          <div className="mt-10 space-y-6 leading-8 text-muted-foreground">
            <p>
              First, we look at your photos or listen to your description and give you an honest, straightforward
              price — usually the same day. There's no obligation and no pressure; if the number doesn't work for
              you, no hard feelings.
            </p>
            <p>
              If it does work, we find a time that fits your schedule, often within a few days. Our crew arrives on
              time, confirms the price before loading anything, and handles every bit of the lifting, hauling, and
              cleanup. Most jobs across Parker and the Denver metro area are finished in a single visit — and most
              customers tell us afterward they wish they'd called months earlier.
            </p>
          </div>
        </div>
      </section>

      <ProseSection {...pageExtras["contact"]} />
      <NextSteps steps={[
        { kind: "page", to: "/instant-estimate", label: "Instant Estimate", text: "Prefer not to wait? Get a price range in about a minute." },
        { kind: "page", to: "/pricing", label: "Our Pricing", text: "See how we price by trailer space and labor." },
        { kind: "page", to: "/about", label: "Meet the Crew", text: "Learn who shows up at your door." },
      ]} />
      <CtaBand />
    </PageShell>
  );
}
