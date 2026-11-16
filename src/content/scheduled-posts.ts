import type { Database } from "@/integrations/supabase/types";
import { scheduledArticleJsonLd, scheduledFaqJsonLd } from "@/lib/blog-schema";

/**
 * In-house blog posts. A post stays hidden until its publish_at time, then shows on /blog,
 * at /blog/<slug>, and in /blog-sitemap.xml. lastmod is publish_at. No redeploy.
 *
 * Ben gave standing permission on Nov 15, 2026 to publish in-house blog posts without
 * per-post approval. Add the post to SCHEDULED_POSTS and it goes live at publish_at.
 *
 * Fields:
 * - slug: lowercase hyphenated URL segment. If a BabyLoveGrowth post in blg_articles already
 *   uses this slug, this post replaces it at that URL, on the index (one card, no duplicate),
 *   and in the sitemap once publish_at passes. Before that time the imported post keeps showing.
 * - title: 60 characters or fewer.
 * - meta_description: 155 characters or fewer.
 * - publish_at: ISO-8601 at 7:00 AM America/Denver. Mountain Standard Time (winter) is 14:00 UTC,
 *   for example "2026-11-16T14:00:00.000Z". Mountain Daylight Time (summer) is 13:00 UTC,
 *   for example "2026-07-16T13:00:00.000Z".
 * - content_html: the article body, starting with one <h1>. Prices are tokens only:
 *   [[min]] [[labor]] [[travel]] [[load:0-8]] [[item:mattress]] [[adj:freon]].
 *   They resolve from the crew app at render time. Never write a dollar amount.
 *   Never name a customer, give a customer's phone number, or put in a street address.
 * - hero (optional): { src, alt, width, height }. Commit a 16:9 WebP under public/blog/<slug>/
 *   (about 1600×900, long edge 1600px or less, file about 200KB or less).
 *   src is the root path, such as "/blog/<slug>/hero.webp". It renders under the title on the
 *   post, on the blog index card, as og:image, and as the Article image. Do not repeat that
 *   file in content_html. Do not use a path containing "blog-images"; that name is reserved
 *   for hosted pictures and those are cropped to 16:9.
 * - Inline images live in the same folder, same WebP rules. In content_html:
 *   <img src="/blog/<slug>/pile.webp" alt="Brush pile on a driveway" width="1600" height="900">
 *   Always set alt, width, and height to the file's real pixel size so the page does not jump.
 *   Inline images load lazily. Keep the src on this site.
 * - faqs (optional): { question, answer }[]. Answers may use price tokens. The same list is
 *   shown at the bottom of the post and emitted as FAQPage JSON-LD. Do not copy it into
 *   content_html.
 *
 * BlogPosting JSON-LD (headline, description, image, datePublished, dateModified, author and
 * publisher EZ Haulaway, plus breadcrumbs) is built from these fields. You do not write json_ld
 * or faq_json_ld by hand.
 *
 * IndexNow: the key file is the public/<32 hex characters>.txt whose file name and body are the
 * key. After a post is live, ping
 * https://www.bing.com/indexnow?url=https://www.ezhaulawayllc.com/blog/<slug>&key=<that key>
 * so Bing can recrawl it.
 */
export type ScheduledImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ScheduledFaq = {
  question: string;
  answer: string;
};

export type ScheduledPost = {
  slug: string;
  title: string; // 60 characters or fewer
  meta_description: string; // 155 characters or fewer
  publish_at: string; // ISO time; 7:00 AM Mountain
  content_html: string;
  hero?: ScheduledImage;
  faqs?: ScheduledFaq[];
};

export const SCHEDULED_POSTS: ScheduledPost[] = [
  {
    slug: "yard-waste-brush-removal-cost-parker",
    title: "Yard Waste and Brush Removal Cost in Parker, CO",
    meta_description:
      "What yard waste and brush removal costs in Parker, what counts as yard debris, and how we cleared a chicken coop and brush piles. Free photo quote.",
    publish_at: "2026-11-04T14:00:00.000Z",
    content_html: `<h1>Yard Waste and Brush Removal Cost in Parker, CO</h1>
<p>Yard waste and brush removal in Parker is priced by how much of our trailer it fills. Small piles start at our [[min]] minimum. A quarter trailer is about [[load:2]], a half trailer is about [[load:4]], and a full trailer is about [[load:8]]. Send a couple of photos and you get a firm number before we show up.</p>
<h2>What counts as yard debris</h2>
<p>Most curbside pickups won't take a big pile of yard waste, and it fills a truck bed fast. Our <a href="/services/yard-and-landscaping-debris">yard and landscaping debris removal</a> takes branches, limbs and brush, storm damage, old sod, dirt and landscape rock, leaves and clippings, planters and edging, and old playground equipment.</p>
<p>You don't need to bag or cut anything. Leave the pile as it is. We don't cut down trees, but we haul away what is already cut or fallen.</p>
<h2>How the price works</h2>
<p>We price by the space your pile takes up in our 16-foot trailer, not by the hour. That covers labor, loading, hauling and disposal fees, and we agree on the price before we load anything. Heavy material like dirt and rock is priced by weight. You can see the full breakdown on our <a href="/pricing">pricing page</a>.</p>
<h2>A real job: a chicken coop and piles of brush</h2>
<p>A customer reached out about some yard debris he needed gone. When we got there, it was a chicken coop, plus several piles of brush spread across his land. We took the coop down, hauled it away, and cleared every brush pile.</p>
<p>That happens a lot. People say yard debris and mean a whole structure. If there is a shed, coop, fence or playset in the mix, put it in your photos. Our <a href="/services/light-demolition">light demolition service</a> takes it down and hauls it in the same visit.</p>
<h2>Serving Parker and the south metro</h2>
<p>We work out of Parker and cover the Denver metro. See everything we do on our <a href="/service-areas/parker">Parker junk removal page</a>, or skip ahead and get a <a href="/instant-estimate">free photo quote</a>.</p>`,
  },
];

type Row = Database["public"]["Tables"]["blg_articles"]["Row"];

export type InHouseFields = {
  hero_image_alt: string | null;
  hero_image_width: number | null;
  hero_image_height: number | null;
  faqs: ScheduledFaq[] | null;
};

export type BlogArticle = Row & InHouseFields;

export function livePosts(now = Date.now()): ScheduledPost[] {
  return SCHEDULED_POSTS.filter((p) => Date.parse(p.publish_at) <= now);
}

/** Shapes a scheduled post like a blg_articles row so the blog pages treat both the same. Ids are negative so they never clash. */
export function toRow(p: ScheduledPost, index: number): BlogArticle {
  return {
    id: -(index + 1),
    slug: p.slug,
    previous_slugs: [],
    title: p.title,
    meta_description: p.meta_description,
    hero_image_url: p.hero?.src ?? null,
    hero_image_alt: p.hero?.alt ?? null,
    hero_image_width: p.hero?.width ?? null,
    hero_image_height: p.hero?.height ?? null,
    content_html: p.content_html,
    json_ld: scheduledArticleJsonLd({
      slug: p.slug,
      title: p.title,
      meta_description: p.meta_description,
      publish_at: p.publish_at,
      hero: p.hero ?? null,
    }),
    faq_json_ld: scheduledFaqJsonLd(p.slug, p.faqs ?? []),
    faqs: p.faqs && p.faqs.length > 0 ? p.faqs : null,
    language_code: "en",
    article_created_at: p.publish_at,
    article_updated_at: p.publish_at,
    synced_at: p.publish_at,
  };
}

/** The in-house post for this slug once publish_at has passed, or null while the imported post should keep showing. */
export function publishedScheduledPost(
  posts: readonly ScheduledPost[],
  slug: string,
  now: number,
): BlogArticle | null {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return null;
  const post = posts[index];
  if (!post || Date.parse(post.publish_at) > now) return null;
  return toRow(post, index);
}

export function scheduledPostForSlug(slug: string, now = Date.now()): BlogArticle | null {
  return publishedScheduledPost(SCHEDULED_POSTS, slug, now);
}

/** Imported rows have no in-house image or FAQ fields. */
export function importedArticle(row: Row): BlogArticle {
  return {
    ...row,
    hero_image_alt: null,
    hero_image_width: null,
    hero_image_height: null,
    faqs: null,
  };
}

/** Hero rendered on an in-house post. Imported posts keep the pictures already in their HTML. */
export function articleHero(post: {
  id: number;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  hero_image_width: number | null;
  hero_image_height: number | null;
}): ScheduledImage | null {
  if (
    post.id >= 0 ||
    !post.hero_image_url ||
    post.hero_image_alt == null ||
    post.hero_image_width == null ||
    post.hero_image_height == null
  ) {
    return null;
  }
  return {
    src: post.hero_image_url,
    alt: post.hero_image_alt,
    width: post.hero_image_width,
    height: post.hero_image_height,
  };
}
