import type { Database } from "@/integrations/supabase/types";

/**
 * Blog posts written in-house. Each one is hidden until its publish_at time, then shows up on /blog,
 * in the blog sitemap and at /blog/<slug> with no redeploy. Add a post here once Ben has approved it.
 * Prices are tokens ([[min]] [[load:4]] ...) and resolve from the crew app at render time.
 * Never put customer names, phone numbers of customers or the street address in a post.
 */
export type ScheduledPost = {
  slug: string;
  title: string; // 60 characters or fewer
  meta_description: string; // 155 characters or fewer
  publish_at: string; // ISO time; 7:00 AM Mountain
  content_html: string;
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

export function livePosts(now = Date.now()): ScheduledPost[] {
  return SCHEDULED_POSTS.filter((p) => Date.parse(p.publish_at) <= now);
}

/** Shapes a scheduled post like a blg_articles row so the blog pages treat both the same. Ids are negative so they never clash. */
export function toRow(p: ScheduledPost, index: number): Row {
  return {
    id: -(index + 1),
    slug: p.slug,
    previous_slugs: [],
    title: p.title,
    meta_description: p.meta_description,
    hero_image_url: null,
    content_html: p.content_html,
    json_ld: null,
    faq_json_ld: null,
    language_code: "en",
    article_created_at: p.publish_at,
    article_updated_at: p.publish_at,
    synced_at: p.publish_at,
  };
}
