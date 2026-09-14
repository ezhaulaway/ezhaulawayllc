import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageSquareText, Phone } from "lucide-react";
import wordmarkAsset from "@/assets/ez-haulaway-wordmark.png.asset.json";
import truckAsset from "@/assets/ez-haulaway-truck.png.asset.json";
import characterAsset from "@/assets/ez-haulaway-character.webp.asset.json";
import { QuoteForm } from "@/components/quote-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
import { PHONE, PHONE_TEL } from "@/content/site";
import { services } from "@/content/services";
import { locations } from "@/content/locations";

export const navItems = [
  { label: "What We Take", to: "/what-we-take" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const desktopLinkClass =
  "text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground";

function ServicesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`inline-flex items-center gap-1 ${desktopLinkClass} data-[state=open]:text-foreground`}>
        Services <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-[70vh] w-64 overflow-y-auto">
        <DropdownMenuItem asChild>
          <Link to="/what-we-take" className="font-semibold">All Services — What We Take</Link>
        </DropdownMenuItem>
        {services.map((service) => (
          <DropdownMenuItem asChild key={service.slug}>
            <Link to="/services/$slug" params={{ slug: service.slug }}>{service.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AreasDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`inline-flex items-center gap-1 ${desktopLinkClass} data-[state=open]:text-foreground`}>
        Service Areas <ChevronDown className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-[70vh] w-56 overflow-y-auto">
        <DropdownMenuItem asChild>
          <Link to="/service-areas" className="font-semibold">All Service Areas</Link>
        </DropdownMenuItem>
        {locations.map((location) => (
          <DropdownMenuItem asChild key={location.slug}>
            <Link to="/service-areas/$city" params={{ city: location.slug }}>{location.city}, CO</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="group inline-flex items-center" aria-label="EZ Haulaway home">
      <img
        src={wordmarkAsset.url}
        alt="EZ Haulaway"
        className="h-9 w-auto transition-transform group-hover:-rotate-1 sm:h-10"
        width={1254}
        height={302}
      />
    </Link>
  );
}


export function QuoteButton({
  className = "",
  label = "Get a Free Quote",
  variant = "default",
}: {
  className?: string;
  label?: string;
  variant?: "default" | "outline";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant={variant} className={className}>
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-5">
            <img src={characterAsset.url} alt="" aria-hidden className="h-24 w-auto shrink-0 object-contain sm:h-28" />
            <div>
              <DialogTitle className="font-display text-2xl">Get a Free Quote</DialogTitle>
              <DialogDescription>Tell us what needs to go. It only takes a minute.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <QuoteForm />
      </DialogContent>
    </Dialog>
  );
}

export function InlineQuoteForm() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-5">
        <img src={characterAsset.url} alt="" aria-hidden className="h-24 w-auto shrink-0 object-contain sm:h-28" />
        <div>
          <h2 className="font-display text-2xl font-bold">Get a Free Quote</h2>
          <p className="text-sm text-muted-foreground">Tell us what needs to go. It only takes a minute.</p>
        </div>
      </div>
      <QuoteForm />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p> : null}
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          <ServicesDropdown />
          <Link to="/how-it-works" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            How It Works
          </Link>
          <Link to="/pricing" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            Pricing
          </Link>
          <AreasDropdown />
          <Link to="/about" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            About
          </Link>
          <Link to="/contact" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            Contact
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" className="px-3">
            <a href={`tel:${PHONE_TEL}`}>
              <Phone /> {PHONE}
            </a>
          </Button>
          <QuoteButton />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild variant="outline" size="icon" aria-label="Call EZ Haulaway">
            <a href={`tel:${PHONE_TEL}`}>
              <Phone />
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="dark" size="icon" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[88%] overflow-y-auto">
              <SheetHeader className="text-left">
                <SheetTitle>
                  <Wordmark />
                </SheetTitle>
                <SheetDescription>Junk removal in Parker and the Denver metro area.</SheetDescription>
              </SheetHeader>
              <nav className="mt-8 grid" aria-label="Mobile navigation">
                <Accordion type="single" collapsible>
                  <AccordionItem value="services" className="border-border">
                    <AccordionTrigger className="py-4 font-display text-lg font-bold hover:no-underline">
                      Services
                    </AccordionTrigger>
                    <AccordionContent className="grid pb-2">
                      <SheetClose asChild>
                        <Link to="/what-we-take" className="py-2.5 font-semibold text-primary">
                          All Services — What We Take
                        </Link>
                      </SheetClose>
                      {services.map((service) => (
                        <SheetClose asChild key={service.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: service.slug }}
                            className="py-2.5 text-muted-foreground"
                          >
                            {service.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="areas" className="border-border">
                    <AccordionTrigger className="py-4 font-display text-lg font-bold hover:no-underline">
                      Service Areas
                    </AccordionTrigger>
                    <AccordionContent className="grid pb-2">
                      <SheetClose asChild>
                        <Link to="/service-areas" className="py-2.5 font-semibold text-primary">
                          All Service Areas
                        </Link>
                      </SheetClose>
                      {locations.map((location) => (
                        <SheetClose asChild key={location.slug}>
                          <Link
                            to="/service-areas/$city"
                            params={{ city: location.slug }}
                            className="py-2.5 text-muted-foreground"
                          >
                            {location.city}, CO
                          </Link>
                        </SheetClose>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {navItems
                  .filter(({ to }) => to !== "/what-we-take" && to !== "/service-areas")
                  .map(({ label, to }) => (
                    <SheetClose asChild key={to}>
                      <Link to={to} className="border-b border-border py-4 font-display text-lg font-bold">
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
              </nav>
              <div className="mt-8 grid gap-3">
                <QuoteButton className="w-full" />
                <Button asChild variant="outline" size="lg">
                  <a href={`sms:${PHONE_TEL}`}>
                    <MessageSquareText /> Text {PHONE}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-secondary py-14 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 border-b border-secondary-foreground/15 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" aria-label="EZ Haulaway home">
              <img src={truckAsset.url} alt="EZ Haulaway truck logo" className="w-44" width={1233} height={814} />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-secondary-foreground/65">
              Professional junk removal and light demolition from a family-owned business in Parker, Colorado.
            </p>
            <a href={`tel:${PHONE_TEL}`} className="mt-5 inline-block font-display text-lg font-bold">
              {PHONE}
            </a>
          </div>
          <div>
            <p className="font-display font-bold">Services</p>
            <nav className="mt-4 grid gap-2.5 text-sm text-secondary-foreground/70" aria-label="Service links">
              {services.slice(0, 8).map((service) => (
                <Link key={service.slug} to="/services/$slug" params={{ slug: service.slug }} className="hover:text-secondary-foreground">
                  {service.name}
                </Link>
              ))}
              <Link to="/what-we-take" className="font-semibold text-secondary-foreground">
                View all services
              </Link>
            </nav>
          </div>
          <div>
            <p className="font-display font-bold">Service Areas</p>
            <nav className="mt-4 grid gap-2.5 text-sm text-secondary-foreground/70" aria-label="Service area links">
              {locations.slice(0, 8).map((location) => (
                <Link key={location.slug} to="/service-areas/$city" params={{ city: location.slug }} className="hover:text-secondary-foreground">
                  {location.city}, CO
                </Link>
              ))}
              <Link to="/service-areas" className="font-semibold text-secondary-foreground">
                All service areas
              </Link>
            </nav>
          </div>
          <div>
            <p className="font-display font-bold">Company</p>
            <nav className="mt-4 grid gap-2.5 text-sm text-secondary-foreground/70" aria-label="Company links">
              <Link to="/how-it-works" className="hover:text-secondary-foreground">How It Works</Link>
              <Link to="/pricing" className="hover:text-secondary-foreground">Pricing</Link>
              <Link to="/about" className="hover:text-secondary-foreground">About Ben &amp; Zoe</Link>
              <Link to="/contact" className="hover:text-secondary-foreground">Contact</Link>
              <Link to="/privacy-policy" className="hover:text-secondary-foreground">Privacy Policy</Link>
            </nav>
            <p className="mt-6 text-sm text-secondary-foreground/70">Parker, Colorado</p>
            <p className="text-sm text-secondary-foreground/70">Denver metro service area</p>
          </div>
        </div>
        <p className="pt-6 text-xs text-secondary-foreground/55">© 2026 EZ Haulaway LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-border bg-background p-2 shadow-lg md:hidden">
      <Button asChild variant="outline">
        <a href={`tel:${PHONE_TEL}`}>
          <Phone /> Call / Text
        </a>
      </Button>
      <QuoteButton className="w-full" />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.1] text-foreground sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <QuoteButton />
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${PHONE_TEL}`}>
                <Phone /> Call or Text {PHONE}
              </a>
            </Button>
          </div>
        </div>
        {image ? (
          <img
            src={image}
            alt={imageAlt ?? ""}
            className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
          />
        ) : null}
      </div>
    </section>
  );
}

export function FaqAccordion({ faqs }: { faqs: ReadonlyArray<readonly [string, string]> }) {
  return (
    <Accordion type="single" collapsible className="border-t border-border">
      {faqs.map(([question, answer], index) => (
        <AccordionItem key={question} value={`faq-${index}`}>
          <AccordionTrigger className="py-5 text-base font-bold hover:no-underline">{question}</AccordionTrigger>
          <AccordionContent className="max-w-2xl pr-8 text-base leading-7 text-muted-foreground">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function CtaBand({
  title = "Ready to Get That Junk Out of the Way?",
  text = "Send a few details or give us a call. Getting started is easy.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground/75">Let’s clear it out</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-xl text-primary-foreground/80">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <QuoteButton className="bg-card text-foreground hover:bg-card/90" />
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/50 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <a href={`sms:${PHONE_TEL}`}>
              <MessageSquareText /> Call or Text {PHONE}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <SiteHeader />
      <main className="pb-20 md:pb-0">{children}</main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
