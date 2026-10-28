import { CityServiceLink } from "@/components/city-service-link";
import { responsiveImage } from "@/lib/logo-images";
import { DeferredFaq } from "@/components/deferred-faq";
import { DeferredSection } from "@/components/deferred-section";
import { QuoteFormPreview } from "@/components/quote-form-preview";
import { isLiveCityService } from "@/content/live-pages";
import { type ReactNode, lazy, Suspense, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageSquareText, Phone } from "lucide-react";
import wordmarkSrc from "@/assets/ez-haulaway-wordmark-sm.webp";
import stackedSrc from "@/assets/ez-haulaway-stacked-sm.webp";
import truckAsset from "@/assets/real-IMG_5096.jpg.asset.json";
import rrbAsset from "@/assets/red-right-buyer.png.asset.json";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { PROMO } from "@/content/promo";
import { ThemeToggle } from "@/components/theme-toggle";
import { services, locations } from "@/content/navigation";

const QuoteForm = lazy(() => import("@/components/quote-form").then((module) => ({ default: module.QuoteForm })));

function QuoteFormPlaceholder() {
  return <div className="min-h-72" role="status" aria-live="polite">Loading quote form…</div>;
}

export const navItems = [
  { label: "Instant Estimate", to: "/instant-estimate" },
  { label: "What We Take", to: "/what-we-take" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Pricing", to: "/pricing" },
  { label: "Service Areas", to: "/service-areas" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
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
          <DropdownMenuSub key={location.slug}>
            <DropdownMenuSubTrigger>Junk Removal {location.city}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-[70vh] w-64 overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link to="/service-areas/$city" params={{ city: location.slug }} className="font-semibold">
                  All services in {location.city}
                </Link>
              </DropdownMenuItem>
              {services.filter((service) => service.cityPages === false || isLiveCityService(location.slug, service.slug)).map((service) => (
                <DropdownMenuItem asChild key={service.slug}>
                  {service.cityPages === false ? <Link to="/services/$slug" params={{ slug: service.slug }}>
                    {service.name}
                  </Link> : <CityServiceLink city={location.slug} service={service.slug}
                  >
                    {service.name} {location.city}
                  </CityServiceLink>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Wordmark() {
  return (
    <Link to="/" className="group inline-flex shrink-0 items-center" aria-label="EZ Haulaway home">
      <picture>
        <source media="(max-width: 639px)" srcSet={responsiveImage(stackedSrc).srcSet} sizes="115px" width={240} height={117} />
        <img
          {...responsiveImage(wordmarkSrc, "(min-width: 768px) 232px, 199px")}
          alt="EZ Haulaway"
          className="logo-outline h-14 w-auto shrink-0 object-contain transition-transform group-hover:-rotate-1 sm:h-12 md:h-14"
          width={480}
          height={116}
          decoding="async"
          fetchPriority="low"
        />
      </picture>
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
            <div>
              <DialogTitle className="font-display text-2xl">Get a Free Quote</DialogTitle>
              <DialogDescription>Tell us what needs to go. It only takes a minute.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <Suspense fallback={<QuoteFormPlaceholder />}><QuoteForm /></Suspense>
      </DialogContent>
    </Dialog>
  );
}

export function InlineQuoteForm() {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-5">
        <div>
          <h2 className="font-display text-2xl font-bold">Get a Free Quote</h2>
          <p className="text-sm text-muted-foreground">Tell us what needs to go. It only takes a minute.</p>
        </div>
      </div>
      <DeferredSection fallback={<QuoteFormPreview />}>
        <Suspense fallback={<QuoteFormPreview />}><QuoteForm /></Suspense>
      </DeferredSection>
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
  text?: string | undefined;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
      <h2
        id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
        className="mt-3 scroll-mt-24 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {text ? <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p> : null}
    </div>
  );
}

function PromoBanner() {
  if (!PROMO.active) return null;
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2 text-center text-sm font-semibold lg:px-8">
        <span className="font-extrabold uppercase tracking-wide">{PROMO.eyebrow}</span>
        <span>{PROMO.text}</span>
        <Link to="/instant-estimate" className="font-bold underline underline-offset-4">
          {PROMO.linkLabel}
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
    <PromoBanner />
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          <ServicesDropdown />
          <Link to="/pricing" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            Pricing
          </Link>
          <AreasDropdown />
          <Link to="/about" className={desktopLinkClass} activeProps={{ className: "text-foreground" }}>
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Button asChild variant="ghost" className="hidden px-3 md:inline-flex">
            <a href={`tel:${PHONE_TEL}`}>
              <Phone /> {PHONE}
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" aria-label="Call EZ Haulaway" className="md:hidden">
            <a href={`tel:${PHONE_TEL}`}>
              <Phone />
            </a>
          </Button>
          <Button asChild size="lg" className="hidden md:inline-flex">
            <Link to="/instant-estimate">Instant Estimate</Link>
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
                            Junk Removal {location.city}
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
                <SheetClose asChild>
                  <Button asChild size="lg" className="w-full">
                    <Link to="/instant-estimate">Instant Estimate</Link>
                  </Button>
                </SheetClose>
                <QuoteButton className="w-full" variant="outline" />

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
    </>
  );
}

const CHAMBER_ID = "mni-membership-639275773218557417";

function ChamberBadge() {
  useEffect(() => {
    const w = window as unknown as { MNI?: { Widgets: { Member: new (id: string, o: object) => { create: () => void } } } };
    const init = () => {
      const el = document.getElementById(CHAMBER_ID);
      if (!el || el.childElementCount || !w.MNI) return;
      new w.MNI.Widgets.Member(CHAMBER_ID, {
        member: 17087,
        styleTemplate:
          "#@id{text-align:center;position:relative}#@id .mn-widget-member-name,#@id .mn-widget-member-text{display:none!important}#@id .mn-widget-member-logo{width:44px;height:44px;aspect-ratio:1/1;object-fit:contain;margin:0 auto}#@id img{width:44px;height:44px;aspect-ratio:1/1;object-fit:contain}",
      }).create();
      el.querySelectorAll("img").forEach((img) => {
        img.setAttribute("width", "200");
        img.setAttribute("height", "200");
      });
    };
    if (w.MNI) return init();
    const el = document.getElementById(CHAMBER_ID);
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const s = document.createElement("script");
      s.src = "https://parkerchamberorcommerce.chambermaster.com/Content/Script/Member.js";
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div id={CHAMBER_ID} className="flex h-20 w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background px-3 py-1 text-xs text-foreground [&_.mn-widget-member-name]:hidden [&_.mn-widget-member-text]:hidden [&_img]:size-11 [&_img]:object-contain" />;
}

export function SiteFooter() {
  return (
    <footer className="bg-secondary py-14 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 border-b border-secondary-foreground/15 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" aria-label="EZ Haulaway home">
              <img src={truckAsset.url} alt="EZ Haulaway crew loading the maroon pickup beside the black dump trailer" className="w-44 rounded-lg object-cover" width={1620} height={1080} loading="lazy" decoding="async" />
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
              <Link to="/services/$slug" params={{ slug: "wood-pallet-removal" }} className="hover:text-secondary-foreground">
                Wood Pallet Removal
              </Link>
              <Link to="/services/$slug" params={{ slug: "dumpster-rental-alternative" }} className="hover:text-secondary-foreground">
                Dumpster Rental Alternative
              </Link>
              <Link to="/services/$slug" params={{ slug: "hoarder-cleanout" }} className="hover:text-secondary-foreground">
                Hoarder Cleanout
              </Link>
              <Link to="/services/$slug" params={{ slug: "storage-unit-cleanout" }} className="hover:text-secondary-foreground">
                Storage Unit Cleanout
              </Link>
              <Link to="/services/$slug" params={{ slug: "eviction-cleanout-and-trash-out" }} className="hover:text-secondary-foreground">
                Eviction Cleanout & Trash Out
              </Link>
              <Link to="/services/$slug" params={{ slug: "apartment-make-ready-haul-off" }} className="hover:text-secondary-foreground">
                Apartment Make-Ready Haul-Off
              </Link>
              <Link to="/services/$slug" params={{ slug: "basement-and-attic-cleanouts" }} className="hover:text-secondary-foreground">
                Basement & Attic Cleanouts
              </Link>
            </nav>
          </div>
          <div>
            <p className="font-display font-bold">Service Areas</p>
            <nav className="mt-4 grid gap-2.5 text-sm text-secondary-foreground/70" aria-label="Service area links">
              {locations.slice(0, 8).map((location) => (
                <Link key={location.slug} to="/service-areas/$city" params={{ city: location.slug }} className="hover:text-secondary-foreground">
                  Junk Removal {location.city}
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
              <Link to="/instant-estimate" className="font-semibold text-secondary-foreground">Instant Estimate</Link>
              <Link to="/how-it-works" className="hover:text-secondary-foreground">How It Works</Link>
              <Link to="/pricing" className="hover:text-secondary-foreground">Pricing</Link>
              <Link to="/about" className="hover:text-secondary-foreground">About Ben &amp; Zoe</Link>
              <Link to="/contact" className="hover:text-secondary-foreground">Contact</Link>
              <Link to="/faq" className="hover:text-secondary-foreground">FAQ</Link>
              <Link to="/blog" className="hover:text-secondary-foreground">Junk Removal Blog</Link>
              <Link to="/privacy-policy" className="hover:text-secondary-foreground">Privacy Policy</Link>
            </nav>
            <address className="mt-6 not-italic text-sm leading-6 text-secondary-foreground/70">
              <span className="block font-bold text-secondary-foreground">EZ Haulaway LLC</span>
              <span className="block">Parker, CO 80134</span>
              <a href={`tel:${PHONE_TEL}`} className="block hover:text-secondary-foreground">(720) 614-7223</a>
              <span className="block">Mon–Sat 7:00 AM – 7:00 PM · Sun Closed</span>
              <span className="block">Serving Douglas County &amp; the Denver metro</span>
            </address>
          </div>
        </div>
        <div className="flex flex-col-reverse items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-secondary-foreground/55">© 2026 EZ Haulaway LLC. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <ChamberBadge />
            <a
              href="https://redrightbuyer.com/members"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Red Right Buyer member"
              className="flex h-20 items-center rounded-lg bg-background px-4"
            >
              <img src={rrbAsset.url} alt="Red Right Buyer member badge" width={300} height={78} loading="lazy" className="h-10 w-auto" />
            </a>
            <a href="https://locatefaith.com/business/ez-haulaway" target="_blank" rel="noopener noreferrer">
              <img
                src="https://locatefaith.com/brand/verified-badge-v2.svg"
                alt="Verified Christian Business on LocateFaith"
                width={240}
                height={107}
                loading="lazy"
                className="h-20 w-auto"
              />
            </a>
          </div>

        </div>
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
  return <DeferredFaq faqs={faqs} />;
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
