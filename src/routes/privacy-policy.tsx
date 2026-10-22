import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site-chrome";
import { PHONE, SITE_URL } from "@/content/site";

const title = "Privacy Policy | EZ Haulaway LLC";
const description =
  "How EZ Haulaway LLC collects, uses, and protects the information you share when requesting a junk removal quote.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { name: "twitter:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/privacy-policy` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy-policy` }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          This policy explains what EZ Haulaway LLC does with the information you share with us.
        </p>

        <div className="mt-10 grid gap-8 leading-7 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground">Information we collect</h2>
            <p className="mt-3">
              When you request a quote, we collect the details you give us: your name, phone number, the location of the
              job, and any description or photos of the items you want removed.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">How we use it</h2>
            <p className="mt-3">
              We use your information only to respond to your request, quote the job, schedule the work, and follow up
              about the service. We do not sell or rent your information to anyone.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Sharing</h2>
            <p className="mt-3">
              We share information only when it's needed to complete your job or when the law requires it. Our website
              may use standard hosting and analytics services that record basic technical data such as pages viewed.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Text messages and calls</h2>
            <p className="mt-3">
              If you contact us by phone or text, we may reply the same way to discuss your job. You can ask us to stop
              contacting you at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Your choices</h2>
            <p className="mt-3">
              You can ask us to correct or delete the information we hold about you. Call or text {PHONE} and we'll take
              care of it.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Photos you send us</h2>
            <p className="mt-3">
              Photos uploaded through our quote form or instant AI estimate are used only to size up your job and price
              it. AI estimates are generated automatically from your description and photos; the estimate is a starting
              point, and the final price is always confirmed in person before any work begins.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">How we protect your information</h2>
            <p className="mt-3">
              Quote requests and photos are stored in secure, access-restricted systems that only EZ Haulaway can view.
              We keep job records only as long as we need them to serve you, handle billing, and meet our legal
              obligations in Colorado.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Cookies and analytics</h2>
            <p className="mt-3">
              Our site uses Google Analytics to understand which pages are helpful, such as how many visitors view our
              pricing page. This data is collected in aggregate and does not identify you personally. You can block
              cookies in your browser settings at any time.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Children's privacy</h2>
            <p className="mt-3">
              Our services are intended for adults. We do not knowingly collect information from anyone under 13.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground">Changes to this policy</h2>
            <p className="mt-3">
              If we update this policy, the revised version will be posted on this page.
            </p>
          </section>
        </div>
      </article>
    </PageShell>
  );
}
