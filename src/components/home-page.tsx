import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, MobileCtaBar, QuoteButton } from "@/components/site-chrome";
import { GoogleReviewsGrid } from "@/components/google-reviews";
import { locations } from "@/content/locations";
import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Building2,
  Check,
  ChevronDown,
  Clock3,
  Construction,
  House,
  ImagePlus,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  Refrigerator,
  ShieldCheck,
  Star,
  Trees,
  Users,
} from "lucide-react";
import wordmarkAsset from "@/assets/ez-haulaway-wordmark.png.asset.json";
import truckAsset from "@/assets/ez-haulaway-truck.png.asset.json";
import heroJobAsset from "@/assets/appliance_removal.avif.asset.json";
import timelapseAsset from "@/assets/ez-haulaway-timelapse.mp4.asset.json";
import benJobsiteAsset from "@/assets/Ben_real_photo_at_jobsite_thumbs_up.avif.asset.json";
import benZoeAsset from "@/assets/ben_and_zoe_photo.avif.asset.json";
import characterAsset from "@/assets/ez-haulaway-character.webp.asset.json";
import furnitureAsset from "@/assets/service-furniture-removal.jpg.asset.json";
import applianceAsset from "@/assets/service-appliance-removal.jpg.asset.json";
import hotTubAsset from "@/assets/service-hot-tub-removal.jpg.asset.json";
import constructionAsset from "@/assets/service-construction-debris.jpg.asset.json";
import garageAsset from "@/assets/service-garage-cleanout.jpg.asset.json";
import estateAsset from "@/assets/service-estate-cleanout.jpg.asset.json";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PHONE = "720-614-7223";

const navItems = [
  ["Services", "#services"],
  ["How It Works", "#how-it-works"],
  ["About", "#about"],
  ["Reviews", "#reviews"],
  ["Service Areas", "#service-area"],
] as const;

const services: Array<{ title: string; text: string; icon: LucideIcon; image: string; position: string }> = [
  { title: "Furniture", text: "Couches, tables, chairs, shelving, and more.", icon: Armchair, image: furnitureAsset.url, position: "50% 40%" },
  { title: "Appliances", text: "Large and small household appliances.", icon: Refrigerator, image: applianceAsset.url, position: "50% 35%" },
  { title: "Household Junk", text: "Clutter, boxes, unwanted items, and general junk.", icon: House, image: garageAsset.url, position: "50% 45%" },
  { title: "Property Cleanouts", text: "Garages, storage units, homes, and other spaces.", icon: Building2, image: estateAsset.url, position: "50% 40%" },
  { title: "Yard & Construction Debris", text: "Branches, lumber, renovation debris, and more.", icon: Trees, image: constructionAsset.url, position: "50% 45%" },
  { title: "Hot Tubs & Light Demolition", text: "Hot tubs, decks, pergolas, and select structures.", icon: Construction, image: hotTubAsset.url, position: "50% 40%" },
];

const extraServices: Array<{ label: string; slug?: string }> = [
  { label: "Residential junk removal" },
  { label: "Shed removal and demolition", slug: "shed-removal" },
  { label: "Garage cleanouts", slug: "garage-cleanouts" },
  { label: "Storage unit cleanouts" },
  { label: "Mattress removal", slug: "mattress-and-bulky-item-removal" },
  { label: "Electronics removal", slug: "electronics-and-e-waste-removal" },
  { label: "Deck and pergola removal", slug: "deck-and-fence-removal" },
];

const trustSignals: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Users, label: "Family Owned" },
  { icon: MapPin, label: "Locally Operated" },
  { icon: MessageSquareText, label: "Free Quotes" },
  { icon: Clock3, label: "Fast Scheduling" },
];

const reasons: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Clock3, title: "Dependable Service", text: "Clear communication and reliable scheduling from a local team." },
  { icon: MessageSquareText, title: "Straightforward Quotes", text: "A simple process that makes the job easy to understand." },
  { icon: ShieldCheck, title: "Respect for Your Property", text: "Careful removal and cleanup after the hauling is done." },
  { icon: Users, title: "Local & Family Owned", text: "Work with a real local business that cares about its reputation." },
];

const faqs = [
  [
    "What types of junk do you remove?",
    "We handle furniture, appliances, household junk, yard and construction debris, storage unit and property cleanouts, mattresses, electronics, hot tubs, and select light demolition projects.",
  ],
  [
    "How do I get a quote?",
    "Use the short quote form to share your contact information and tell us what needs to go. You can also call or text us directly.",
  ],
  [
    "Can I text photos?",
    `Yes. Text photos and job details to ${PHONE} so we can better understand what you need removed.`,
  ],
  [
    "Do you handle the lifting?",
    "Yes. Our crew handles the lifting, loading, hauling, and cleanup so you do not have to.",
  ],
  [
    "Do you offer larger property cleanouts?",
    "Yes. Tell us about the size and scope of your cleanout, and we can review the job with you.",
  ],
  [
    "What areas do you serve?",
    "EZ Haulaway is based in Parker, Colorado and serves customers throughout the Denver metro area.",
  ],
] as const;

function Wordmark() {
  return (
    <a href="#top" className="group inline-flex items-center" aria-label="EZ Haulaway home">
      <img
        src={wordmarkAsset.url}
        alt="EZ Haulaway"
        className="h-9 w-auto transition-transform group-hover:-rotate-1 sm:h-10"
        width={1254}
        height={302}
      />
    </a>
  );
}



function SectionHeader({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p> : null}
    </div>
  );
}

export function HomePage() {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />

      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                <MapPin className="size-3.5 text-primary" /> CASTLE ROCK, CO · DENVER METRO
              </div>
              <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">
                Junk Removal <span className="text-primary">Castle Rock</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Professional residential and commercial junk removal that takes the stress out of clearing out unwanted furniture, old appliances, and everyday clutter. Made EZ.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteButton />
                <Button asChild variant="outline" size="lg">
                  <a href={`tel:${PHONE.replaceAll("-", "")}`}><Phone /> Call or Text {PHONE}</a>
                </Button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Check className="size-4 text-primary" /> Family-owned and locally operated
              </p>
            </div>
            <div className="relative min-w-0">
              <img
                src={heroJobAsset.url}
                alt="EZ Haulaway crew loading a refrigerator onto the branded trailer at a Parker home"
                className="aspect-[4/3] min-h-80 w-full rounded-lg border border-border object-cover"
              />
              <div className="absolute -bottom-5 left-4 max-w-64 rounded-md bg-secondary p-4 text-secondary-foreground shadow-lg sm:left-[-1rem]">
                <p className="font-display text-lg font-bold">We do the hauling.</p>
                <p className="mt-1 text-sm text-secondary-foreground/75">You point. We load, haul, and clean up.</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Why customers choose EZ Haulaway" className="border-b border-border bg-muted">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border px-5 py-4 sm:grid-cols-4 sm:divide-y-0 lg:px-8">
            {trustSignals.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-2 px-3 py-4 text-center text-sm font-bold">
                <Icon className="size-4 text-primary" /> {label}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="relative overflow-hidden py-20 sm:py-28">
          <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeader eyebrow="What we haul" title="Junk Removal Services" text="From one bulky item to a full cleanout, tell us what needs to go." />
              <QuoteButton className="w-fit" label="Ask About Your Job" />
            </div>
            <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ title, text, icon: Icon, image, position }) => (
                <article key={title} className="group relative isolate flex min-h-64 flex-col justify-end overflow-hidden bg-secondary p-7 sm:min-h-72">
                  <img
                    src={image}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    style={{ objectPosition: position }}
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.72)_38%,rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.12)_100%)] transition-opacity duration-300 group-hover:opacity-90"
                    aria-hidden
                  />
                  <div className="grid size-11 place-items-center rounded-md bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"><Icon className="size-5" /></div>
                  <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-2 leading-6 text-white/85">{text}</p>
                </article>
              ))}
            </div>
            {showAllServices ? (
              <div className="mt-6 grid gap-3 rounded-lg border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-3">
                {extraServices.map(({ label, slug }) => (
                  <div key={label} className="flex items-center gap-3 text-sm font-semibold">
                    <Check className="size-4 shrink-0 text-primary" />
                    {slug ? (
                      <Link to="/services/$slug" params={{ slug }} className="hover:text-primary">
                        {label}
                      </Link>
                    ) : (
                      label
                    )}
                  </div>
                ))}
              </div>
            ) : null}
            <Button variant="outline" className="mt-6" onClick={() => setShowAllServices((value) => !value)} aria-expanded={showAllServices}>
              {showAllServices ? "Show Less" : "View All Services"}<ChevronDown className={showAllServices ? "rotate-180" : ""} />
            </Button>
          </div>
        </section>

        <section id="how-it-works" className="bg-secondary py-20 text-secondary-foreground sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Simple from start to finish</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">Three Steps. Then It’s Gone. EZ</h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {[
                ["01", "Send Us Photos", "Tell us what needs to go and send photos when possible."],
                ["02", "Get Your Quote", "We'll review the job and help schedule a convenient time."],
                ["03", "We Haul It Away", "We handle the lifting, loading, hauling, and cleanup."],
              ].map(([number, title, text]) => (
                <article key={number} className="border-t border-secondary-foreground/20 pt-6">
                  <span className="font-display text-5xl font-extrabold text-primary">{number}</span>
                  <h3 className="mt-7 text-xl font-bold">{title}</h3>
                  <p className="mt-3 max-w-sm leading-7 text-secondary-foreground/70">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="in-action" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeader center eyebrow="On the job" title="See EZ Haulaway in Action" text="See how quickly a cluttered space can become a clean one." />
          </div>
          <div className="relative mt-10 w-full overflow-hidden border-y border-border bg-secondary shadow-sm">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={heroJobAsset.url}
              src={timelapseAsset.url}
              className="aspect-video w-full object-cover"
            >
              Your browser does not support video playback.
            </video>
          </div>
        </section>


        <section className="border-y border-border bg-muted py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <SectionHeader eyebrow="Why EZ Haulaway" title="A Better Experience Is Worth It" text="When you invite a crew onto your property, dependable service and clear communication matter." />
              <img
                src={benJobsiteAsset.url}
                alt="Ben from EZ Haulaway giving a thumbs up in front of the dump trailer at a jobsite"
                loading="lazy"
                className="mt-8 aspect-[4/3] w-full rounded-lg border border-border object-cover"
              />
            </div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article key={title} className="bg-card p-7">
                  <Icon className="size-6 text-primary" />
                  <h3 className="mt-6 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <SectionHeader eyebrow="CUSTOMER REVIEWS" title="What Our Customers Say" text="Real 5-star reviews from EZ Haulaway customers on Google." />
            <GoogleReviewsGrid />
          </div>
        </section>

        <section id="about" className="bg-card py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <div className="rounded-lg border border-border bg-muted p-3">
              <img
                src={benZoeAsset.url}
                alt="Ben and Zoe, owners of EZ Haulaway"
                loading="lazy"
                width={619}
                height={640}
                className="h-auto w-full rounded-md"
              />
            </div>
            <div>
              <SectionHeader eyebrow="Meet the owners" title="Meet Ben & Zoe" />
              <p className="mt-6 text-lg leading-8 text-muted-foreground">EZ Haulaway is a family-owned business based in Parker, Colorado. Ben and Zoe believe getting rid of unwanted junk should be straightforward, respectful, and easy.</p>
              <p className="mt-5 leading-7 text-muted-foreground">Ben brings approximately six years of hands-on construction and demolition experience, including work on more than 300 decks.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-muted px-4 py-2 text-sm font-bold">Parker based</span>
                <span className="rounded-full bg-muted px-4 py-2 text-sm font-bold">Family owned</span>
                <span className="rounded-full bg-muted px-4 py-2 text-sm font-bold">Hands-on experience</span>
              </div>
            </div>
          </div>
        </section>

        <section id="service-area" className="border-y border-border bg-muted py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <SectionHeader eyebrow="Service area" title="Proudly Serving the Denver Metro Area" text="EZ Haulaway provides professional junk removal throughout Parker and communities across the Denver metro area." />
            <div className="rounded-lg border border-border bg-card p-7">
              <div className="flex items-center gap-3">
                <MapPin className="size-6 text-primary" />
                <p className="font-display font-bold text-foreground">Denver metro service area</p>
              </div>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {locations.map((location) => (
                  <li key={location.slug} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <Link
                      to="/service-areas/$city"
                      params={{ city: location.slug }}
                      className="transition-colors hover:text-foreground"
                    >
                      {location.city}, CO
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to="/service-areas" className="mt-6 inline-block text-sm font-bold text-primary">
                View all service areas
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
            <SectionHeader eyebrow="Common questions" title="Good to Know Before We Go" text="Need an answer about your specific job? Call or text and we’ll talk it through." />
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`}>
                  <AccordionTrigger className="py-5 text-base font-bold hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="max-w-2xl pr-8 text-base leading-7 text-muted-foreground">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/75">Let’s clear it out</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-5xl">Ready to Get That Junk Out of the Way?</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">Send a few details or give us a call. Getting started is easy.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <QuoteButton className="bg-card text-foreground hover:bg-card/90" />
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={`sms:${PHONE.replaceAll("-", "")}`}><MessageSquareText /> Call or Text {PHONE}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <MobileCtaBar />
    </div>
  );
}