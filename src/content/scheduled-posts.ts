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
    slug: "christmas-tree-disposal",
    title: "Christmas Tree Disposal in Parker and Denver: Every Option",
    meta_description:
      "Free Christmas tree recycling in Parker, Douglas County and Denver: drop-off sites, dates, flocked and artificial tree rules, and pickup if you want it.",
    publish_at: "2026-11-16T14:00:00.000Z",
    hero: {
      src: "/blog/christmas-tree-disposal/hero.webp",
      alt: "Pile of real Christmas trees dropped off for recycling, one still nailed to its wooden stand",
      width: 1600,
      height: 900,
    },
    content_html: `<h1>Christmas Tree Disposal in Parker and Denver: Every Option</h1>
<p>The easiest Christmas tree disposal in Parker and the south Denver metro is free: strip the tree bare and drop it at your town or county recycling site in late December or January, where it gets chipped into mulch. Denver residents can also use Treecycle or large item pickup. If you'd rather not wrestle it into the car, we can pick it up.</p>
<p>Every town runs its own program with its own dates and rules, so below is what each one did last season and where to check for this year's dates. Programs usually post new dates in December.</p>
<h2>Where can I recycle a Christmas tree in Parker?</h2>
<p>Parker residents can take a real tree to the Town of Parker's free drop-off in the west paved parking lot by the Salisbury Park ballfields (field #1), 11920 Motsenbocker Road. Last season it opened Dec. 25 and ran into late January, during park hours, 6 a.m. to 11 p.m.</p>
<p>A few rules from the town:</p>
<ul>
<li>It's for Parker residents only, and only Christmas trees. No other yard waste or branches, and no trees from commercial lots.</li>
<li>Green and flocked real trees are both accepted. Artificial trees and wreaths or garland with wire backing are not.</li>
<li>Take off tarps, stands, nails, ornaments, lights, garland and tinsel first.</li>
<li>The trees become free mulch for residents, usually available next to the pile starting around Dec. 30.</li>
</ul>
<p>The town also asks people not to put Christmas trees in their garbage carts. Questions go to the Town of Parker Forestry Division at 303-805-3244. Check <a href="https://www.parkerco.gov/" rel="noopener">parkerco.gov</a> in December for this season's dates.</p>
<h2>Where are the Douglas County Christmas tree drop-off sites?</h2>
<p>Douglas County runs four free sites that are open any time of day. Last season they took trees from Dec. 26 through Jan. 31. Two are in Parker, one is in Castle Rock and one is in Highlands Ranch, and each one has free self-serve mulch while it lasts.</p>
<ul>
<li>Bayou Gulch, 4815 Fox Sparrow Road, Parker</li>
<li>Challenger Regional Park, 17299 E. Lincoln Ave., Parker</li>
<li>Fairgrounds Regional Park, 500 Fairgrounds Drive, Castle Rock</li>
<li>Highland Heritage Regional Park, 9651 S. Quebec St., Highlands Ranch</li>
</ul>
<p>One big difference from the Town of Parker site: the county does not accept flocked trees, because trees with artificial snow can't be mulched. Strip everything off, including wire, rope and nails. Douglas County Parks and Trails answers questions at 720-733-6990.</p>
<h2>Does Denver pick up Christmas trees?</h2>
<p>Yes. If you have City of Denver trash service, the city will collect your tree on your large item pickup day, but those trees are not turned into mulch. To recycle it, use Treecycle. Last season, Denver's weekday drop sites ran Dec. 29 through Jan. 30, 8 a.m. to 2 p.m.</p>
<p>The three weekday sites last season were the Cherry Creek Transfer Station (7301 E. Jewell Ave.), Havana Nursery (3685 Havana St.) and the Central Platte Campus (1271 W. Bayaud Ave.). They closed on New Year's Day and Martin Luther King Jr. Day. Extra Saturday sites at parks and schools opened on a few January weekends. The mulch goes back to residents at the city's free mulch giveaway in early May.</p>
<p>Before you go, Denver wants plastic wrap, ties, twine, decorations and the stand removed. The <a href="https://www.denvergov.org/My-Property/Recycle-Compost-Trash/Seasonal-Programs/Treecycle" rel="noopener">Treecycle page</a> posts the new sites and dates each winter.</p>
<h2>What about Castle Rock, Highlands Ranch, Lone Tree, Centennial and Aurora?</h2>
<p>Most nearby towns run their own short drop-off windows in late December and January, and some close well before February. Here is what each did last season, so you know roughly when to plan. Always check the town's page before you load up, because dates shift every year.</p>
<ul>
<li><strong>Castle Rock:</strong> Founders Park, Metzler Ranch Park and Paintbrush Park, plus the county fairgrounds, Dec. 26 through Jan. 31. Trees only, no wreaths or garland.</li>
<li><strong>Highlands Ranch:</strong> The Metro District used Dad Clark, Redstone and Toepfer parks from Dec. 26 to Jan. 11. Its events page lists this season's dates as still to be set. The county site at Highland Heritage Regional Park stays open longer.</li>
<li><strong>Lone Tree and Centennial:</strong> South Suburban Parks and Recreation took trees at the Willow Spring Service Center, 7100 S. Holly St., Centennial, sunrise to sunset from Dec. 26 to Jan. 16. No flocked or artificial trees. Lone Tree is in Douglas County, so the county sites work too. Centennial says it posts details each December.</li>
<li><strong>Aurora:</strong> Del Mar Park, Saddle Rock Golf Course and Olympic Park, Dec. 26 through Jan. 8. No artificial trees.</li>
</ul>
<p>If you live in one of these areas and the window has closed, the tree can still go out with a bulky pickup from your trash hauler, or we can take it.</p>
<h2>How do I get my tree ready for recycling?</h2>
<p>Take off everything that isn't tree. That means every light strand, ornament, hook, piece of tinsel and garland, the stand, any nails or screws, and any plastic bag or wrap. Recycling sites chip trees into mulch, and anything left on the tree ends up in that mulch or jams the chipper.</p>
<img src="/blog/christmas-tree-disposal/curbside-tree-with-stand.webp" alt="Two discarded Christmas trees at a curb with wooden stands still nailed to the trunks" width="1600" height="900">
<p>Wooden cross stands like the ones above are the item people forget most. Pull the nails and take the boards off. A few more tips:</p>
<ul>
<li>Slide an old sheet or a tree bag under the stand before you move the tree. It catches most of the needles on the way out the door.</li>
<li>Carry it trunk first. The branches fold back instead of catching on door frames.</li>
<li>Put a tarp down in the car or truck bed. Dry needles get into everything.</li>
</ul>
<h2>Can flocked or artificial Christmas trees be recycled?</h2>
<p>Flocked trees depend on the site. The Town of Parker takes flocked real trees, while Douglas County and South Suburban do not. Artificial trees are not accepted at any of the drop-offs above, because they are plastic and metal. Donate an artificial tree if it still works, or send it out as bulky trash.</p>
<p>A pre-lit artificial tree that no longer lights up usually can't be donated. Denver has run a holiday lights recycling program in past seasons for broken strands, but the tree itself is usually trash. That's a good fit for a haul-away, since most people are getting rid of other things around the holidays too, like boxes, an old tree stand, or a worn-out decoration bin.</p>
<h2>When should you get rid of your Christmas tree?</h2>
<p>Get rid of your tree soon after Christmas, or as soon as it starts drying out. The U.S. Fire Administration warns that a dry tree burns very hot and very fast. The National Fire Protection Association says not to leave a dried-out tree in the house or garage, or leaning against the outside of your home.</p>
<p>Don't burn it in the fireplace or wood stove, either. The National Park Service's holiday safety guide says the same. In our dry Colorado winters, a tree can go from fine to crispy faster than you'd think.</p>
<p>If you have room, you can also cut the branches and use them as a mulch layer over garden beds. Bigger piles of branches are something we haul all the time, too.</p>
<h2>Can someone pick up my Christmas tree for me?</h2>
<p>Yes. We haul away real, flocked and artificial trees from homes in Parker, Castle Rock, Highlands Ranch, Centennial, Aurora, Denver and the rest of the south metro. We do the carrying and loading, and we recycle or donate what we can. One tree is a minimum load, [[min]].</p>
<img src="/blog/christmas-tree-disposal/haul-away-trailer.webp" alt="EZ Haulaway red pickup truck and loaded black dump trailer parked on a south Denver metro street" width="1600" height="900">
<p>If the tree is already out at the curb, ask about our curbside discount. Most people add a few other things, like the broken patio chair or the boxes from all those gifts. Our price is based on how much of the trailer you fill, so a quarter trailer of mixed stuff runs about [[load:2]]. That covers labor, loading, hauling and disposal. You can see the full breakdown on our <a href="/pricing">pricing page</a>.</p>
<p>We are family-owned, insured, and based right here in Parker. If you need <a href="/service-areas/parker">junk removal in Parker</a>, that's home. If your tree came with a pile of branches or yard cleanup, our <a href="/services/yard-and-landscaping-debris">yard and landscaping debris removal</a> takes care of that in the same trip.</p>
<h2>Need it gone?</h2>
<p>Call or text us at <a href="tel:+17206147223">(720) 614-7223</a>, Monday through Saturday, 7 a.m. to 7 p.m. Send a photo and we'll text back a free quote, or get one in a minute with our <a href="/instant-estimate">instant estimate</a>. Jobs start at our [[min]] minimum. EZ in, junk out.</p>`,
    faqs: [
      {
        question: "Is Christmas tree recycling free in Parker?",
        answer:
          "Yes. The Town of Parker's drop-off at Salisbury Park is free for Parker residents, and the Douglas County sites in Parker at Bayou Gulch and Challenger Regional Park are free too. Both turn the trees into mulch you can take home at no charge while it lasts.",
      },
      {
        question: "Can I put my Christmas tree in the trash in Parker?",
        answer:
          "The Town of Parker asks residents not to put Christmas trees in garbage containers. Use the town or county drop-off while it's open. After that, ask your trash hauler about a bulky pickup, or have a junk removal company haul it.",
      },
      {
        question: "Are flocked Christmas trees accepted for recycling?",
        answer:
          "It depends on the site. The Town of Parker accepts flocked real trees. Douglas County and South Suburban do not, because trees with artificial snow can't be mulched. Check the rules for the site you plan to use before you go.",
      },
      {
        question: "How do I dispose of an artificial Christmas tree?",
        answer:
          "Donate it if it's in good shape and the lights still work. If not, it goes out as bulky trash, because none of the local tree recycling sites take artificial trees. We can haul it away along with anything else you're clearing out.",
      },
      {
        question: "Can I burn my Christmas tree in the fireplace?",
        answer:
          "No. The National Park Service says not to burn a Christmas tree in a fireplace or wood stove, and the U.S. Fire Administration warns that dry trees burn very hot and very fast. Recycle it or have it hauled away instead.",
      },
      {
        question: "Do I need to take the stand off before recycling my tree?",
        answer:
          "Yes. Parker, Douglas County, Castle Rock and Denver all ask you to remove the stand, plus nails, wire, lights, ornaments, tinsel and any plastic bag. Anything left on the tree can end up in the mulch.",
      },
      {
        question: "How much does Christmas tree pickup cost?",
        answer:
          "A single tree is a minimum load for us, [[min]]. If you add other junk, the price is based on how much of the trailer it fills, and a quarter trailer runs about [[load:2]]. Ask about our curbside discount if the tree is already at the curb.",
      },
    ],
  },
  {
    slug: "previous-owner-left-junk",
    title: "Previous Owner Left Junk Behind? What to Do After Closing",
    meta_description:
      "Previous owner left junk in your new house? What to do after closing in Colorado: photos, your contract, the seller, and quick haul-away near Denver.",
    publish_at: "2026-11-18T14:00:00.000Z",
    hero: {
      src: "/blog/previous-owner-left-junk/hero.webp",
      alt: "Basement in a Parker home filled with boxes, shelving, a cabinet, a trash can and a bin of cables as an EZ Haulaway crew member walks through before a cleanout",
      width: 1600,
      height: 900,
    },
    content_html: `<h1>Previous Owner Left Junk Behind? What to Do After Closing</h1>
<p>If the previous owner left junk in your new house, start with photos of everything, then have your real estate agent contact the seller's agent before you throw anything out. Check your contract for what was supposed to stay. Then decide whether the seller picks it up, pays for removal, or you just have it hauled so you can move in.</p>
<p>One of our first big jobs started with a call from a buyer's agent. The sellers had left a basement full of couches, boxes and junk, and we cleared it the same day so the new owners could move into a clean house. Here's how to handle it, step by step, with the Colorado details that matter.</p>
<h2>What should you do first when the previous owner left stuff in the house?</h2>
<p>Don't start hauling yet. Walk every room, the garage, the basement, the attic, any shed and the yard, and take photos or a video of everything the seller left. Write a simple list. Then call your agent. That record is what you'll lean on if you ask the seller to come back for it or to pay for removal.</p>
<p>Good places to check, because sellers forget them most:</p>
<ul>
<li>Garage rafters, shelving and the corners behind the water heater</li>
<li>Basement storage rooms and under the stairs</li>
<li>Attic and crawl space</li>
<li>Kitchen cabinets, closets and bathroom vanities</li>
<li>Sheds, side yards and the area under a deck</li>
</ul>
<h2>Is a seller allowed to leave things behind in Colorado?</h2>
<p>Only what the contract says stays. Colorado real estate brokers generally have to use the Real Estate Commission's standard Contract to Buy and Sell Real Estate. It lists inclusions that convey with the house and says the property is delivered in the condition it was in on the contract date, ordinary wear and tear excepted. The seller's leftover boxes aren't inclusions unless someone wrote them in.</p>
<p>Some things are supposed to stay, though, and people are sometimes surprised by them. Under the 2026 version of the form, items like window coverings, curtain rods, fireplace screens and storage sheds are included if they were on the property on the contract date, unless they were excluded. Read the inclusions and exclusions with your agent before you decide what counts as junk.</p>
<p>One more check: if you signed a Post-Closing Occupancy Agreement (a rent-back), that agreement controls when the seller has to be out. Their things may still be there legitimately until it ends.</p>
<h2>Who owns the items a seller leaves behind after closing?</h2>
<p>It depends on your contract and on state law, so there isn't one answer that fits every closing. An agent quoted by Realtor.com says buyers own the belongings once the sale closes. Other legal guides advise giving the seller written notice first. If anything looks valuable or personal, talk to your agent or a real estate attorney before you toss it.</p>
<p>In practice it splits into two piles. Obvious trash, like broken furniture, old carpet and bags of garbage, is rarely something anyone comes back for. Things with real value, family photos, paperwork, tools or a working appliance, are worth a message through the agents first. A short, polite deadline in writing ("please arrange pickup by this date or we'll donate or dispose of it") keeps everybody on the same page.</p>
<h2>Can you make the seller pay to haul it away?</h2>
<p>Sometimes. If the contract required the house to be left in a certain condition and it wasn't, your agent or a real estate attorney can ask the seller to cover a reasonable removal bill. Keep the before photos and the invoice.</p>
<p>If they won't, Colorado's county courts have a <a href="https://www.coloradojudicial.gov/self-help/opening-case" rel="noopener">small claims division</a> for disputes of 7,500 dollars or less, without a jury. Whether that's worth your time depends on the amount. For a single trailer load, it may make more sense to skip the court date and just get it done. Either way, this is a question for your agent or a real estate attorney, not your junk hauler.</p>
<img src="/blog/previous-owner-left-junk/basement-before-after.webp" alt="Before and after of a basement cleanout we did in Parker: boxes, shelving, a cabinet and a bin of cables on the left, the same basement empty and swept on the right" width="1600" height="900" loading="lazy">
<h2>How do you avoid this at the final walk-through?</h2>
<p>Use the walk-through. Colorado's standard contract gives buyers the right, with reasonable notice, to walk through the property before closing and check that it matches the contract. Open every closet, cabinet, storage room and the garage. If stuff is still there, say so before you sign, not after you have the keys.</p>
<p>If you find things at the walk-through, your agent has more options then than later. They can ask the seller to clear it before closing, write a removal deadline into the contract's additional provisions, or ask for money held back at closing to cover the haul-off. A verbal "we'll come back for it" is easy to forget once the seller's truck is gone.</p>
<h2>How much does it cost to haul away what the previous owner left?</h2>
<p>We price by how much space the items take in our 14-cubic-yard dump trailer, not by the hour. Small loads start at our [[min]] minimum. A quarter trailer is about [[load:2]], a half trailer is about [[load:4]] and a full trailer is about [[load:8]]. That covers the labor, loading, hauling and disposal fees. See the full breakdown on our <a href="/pricing">pricing page</a>.</p>
<p>A few things in the garage is often a small load. A furnished basement is more. Send photos through our <a href="/instant-estimate">instant estimate</a> and you'll know the number before we show up.</p>
<h2>What if the seller left paint, chemicals or a full house?</h2>
<p>Leftover paint cans and garage chemicals are common, and they're one thing we can't take. Paint, solvents, chemicals, fuel, oil and propane tanks need a licensed disposal facility. We'll haul everything else around them. If you aren't sure about an item, text us a photo and we'll tell you straight.</p>
<p>A full house is a different job. Our <a href="/services/house-and-estate-cleanouts">house and estate cleanouts</a> cover every room, the basement, the garage and the yard, with one firm price for the whole job before we start, even when it takes several loads. A multi-load job usually starts within a day or two. We sort out what can be donated or recycled along the way.</p>
<h2>Realtors: who handles it when sellers leave junk at closing?</h2>
<p>Agents call us when a closing gets tense because a house isn't empty. Our <a href="/services/house-and-estate-cleanouts">house and estate cleanouts</a> cover post-closing and seller-left-behind jobs for agents and attorneys. Send the address, the deadline and a few photos. We quote the whole job up front, take before and after photos for your file, and can invoice your brokerage.</p>
<p>We'll tell you honestly whether we can meet a date. We also carry general liability insurance, and a certificate is available on request, which a lot of agents ask for before the first job.</p>
<h2>Do you have to put leftover junk at the curb yourself?</h2>
<p>No. We do all the lifting and loading from wherever it is, including basements, attics and backyards. That matters in the south metro, because Douglas County doesn't provide residential curbside trash pickup. If you want to set a pile out, check with your HOA or trash hauler first about what they'll pick up.</p>
<p>If it's already at the curb, ask about our curbside discount. Ben spent about six years in construction, including leading a deck-building crew, before starting EZ Haulaway in 2026, so old lumber, tile and leftover building materials in a garage don't scare us either. For smaller leftovers, see our <a href="/services/garage-cleanouts">garage cleanouts</a> and <a href="/services/house-and-estate-cleanouts">house and estate cleanouts</a>.</p>
<h2>Need it gone?</h2>
<p>We're a family-owned, insured junk removal company based in Parker, and we serve Castle Rock, Highlands Ranch, Lone Tree, Castle Pines, Aurora, Denver and the rest of the metro. If you just closed on a house in town, here's our <a href="/service-areas/parker">Parker junk removal</a> page.</p>
<p>Call or text us at <a href="tel:+17206147223">(720) 614-7223</a>, Monday through Saturday, 7 a.m. to 7 p.m. Send a few photos and we'll text back a free quote, or get one in a minute with our <a href="/instant-estimate">instant estimate</a>. Jobs start at our [[min]] minimum. EZ in, junk out.</p>`,
    faqs: [
      {
        question: "Can I throw away things the previous owner left?",
        answer:
          "Clear trash like broken furniture or garbage bags is usually fine to get rid of. For anything valuable or personal, like photos, paperwork, tools or working appliances, take photos and have your agent contact the seller's agent first. If you're unsure, ask a real estate attorney before you toss it.",
      },
      {
        question: "Does the seller's storage shed stay with the house in Colorado?",
        answer:
          "Usually, yes. Colorado's standard residential contract lists storage sheds as included if they were on the property on the contract date, unless they were excluded. Check the inclusions and exclusions in your contract. If you don't want the shed, we can tear it down and haul it away.",
      },
      {
        question: "What does the final walk-through check in Colorado?",
        answer:
          "Colorado's standard contract gives the buyer the right, with reasonable notice, to walk through before closing and confirm the property and inclusions are in the condition the contract requires. Use it to open every closet, cabinet, storage room and the garage so leftover items get handled before you sign.",
      },
      {
        question: "Can my real estate agent help if the seller left junk behind?",
        answer:
          "Yes, and they're the right first call. Your agent can reach the seller's agent, ask the seller to pick things up by a set date, or ask them to cover a removal bill. Send your agent your photos and a list of what was left.",
      },
      {
        question: "How much does it cost to remove what the seller left behind?",
        answer:
          "We price by how much of our trailer it fills. Small loads start at [[min]], a quarter trailer is about [[load:2]], a half trailer about [[load:4]] and a full trailer about [[load:8]]. That includes labor, loading, hauling and disposal. Send photos for a firm quote.",
      },
      {
        question: "Will you take paint and chemicals the previous owner left?",
        answer:
          "No. Paint, solvents, chemicals, fuel, oil and propane tanks need a licensed disposal facility, so we leave those. We'll haul the furniture, boxes, appliances and other junk around them, and we'll tell you if we're unsure about an item.",
      },
      {
        question: "How fast can you clear a house after closing?",
        answer:
          "Smaller jobs can often be done quickly, and a multi-load whole-house cleanout usually starts within a day or two. Tell us your move-in date and we'll say honestly whether we can meet it. You get one firm price for the whole job before we start.",
      },
    ],
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
