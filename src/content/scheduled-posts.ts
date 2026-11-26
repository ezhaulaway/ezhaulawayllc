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
  {
    slug: "kitchen-cabinet-removal-cost",
    title: "Kitchen Cabinet Removal Cost: Tear-Out and Haul-Away",
    meta_description:
      "Kitchen cabinet removal cost in Parker and the south Denver metro: tear-out and haul-away priced by trailer space, ReStore donation rules and lead paint.",
    publish_at: "2026-11-20T14:00:00.000Z",
    hero: {
      src: "/blog/kitchen-cabinet-removal-cost/hero.webp",
      alt: "Worker in a dust mask carrying out an old base cabinet with its laminate countertop during a kitchen tear-out, with the upper cabinets already removed",
      width: 1600,
      height: 900,
    },
    content_html: `<h1>Kitchen Cabinet Removal Cost: Tear-Out and Haul-Away</h1>
<p>Kitchen cabinet removal cost with us comes down to two things. How much of my trailer the old cabinets and debris take up, and how much tear-out work there is if we're the ones pulling them off the wall. Haulaway starts at [[min]]. A quarter trailer runs about [[load:2]] and a half about [[load:4]], and loading, hauling and dump fees are all in there. If there's tear-out, I add that time to the quote so you get one number before we start.</p>
<p>I'm Ben, I own EZ Haulaway here in Parker. I spent about six years in construction before this, and part of that was leading a deck crew. Pulling a run of cabinets off a wall is normal work for me.</p>
<h2>How much does kitchen cabinet removal cost?</h2>
<p>We price by trailer space, not by the linear foot. Our 16-foot dump trailer holds about 14 cubic yards. Small loads start at [[min]]. A quarter trailer is about [[load:2]], half is about [[load:4]], three-quarters about [[load:6]] and a full trailer about [[load:8]]. Loading, hauling and disposal are included.</p>
<p>Tear-out is separate. If we're the ones taking the cabinets down, that's extra labor at [[labor]] per hour per crew member. I put it in the quote up front. Totally understand if you'd rather pull them yourself and save on labor. Then it's just the haulaway.</p>
<p>National guides like Angi price cabinet removal by the linear foot or by the hour, then tell you to budget for debris removal on top of that. With us it's one total. Send me a couple photos and I'll get you a number, and we lock in the exact price on site before anything comes off the wall. Full breakdown's on our <a href="/pricing">pricing page</a>.</p>
<p>Here's a real one. A customer sent screenshots of a remodel pile with wood, old cabinets, drywall, some checkerboard tile and a set of stairs. Plus two toilets and a dishwasher. Just from the photos I figured it at a half to five-eighths of the trailer.</p>
<p>So when you're pricing cabinet removal, look at the whole pile, not just the boxes.</p>
<p>To be straight with you, full kitchen tear-outs haven't been a big part of our work yet. We opened in June 2026, and 6 of the 39 jobs we've finished since then were construction debris or heavy stuff like concrete and tile. A recent one was about 6 cubic yards of wood, fencing, and stone and tile pieces out of a backyard in Aurora. I quoted it by text off the customer's photos.</p>
<h2>What changes the price of a cabinet tear-out?</h2>
<p>Mostly four things. Are we tearing them out or just hauling them? What are the countertops made of? Is there tile? And how far do we carry it all to the trailer? A few uppers in a condo isn't the same job as a full kitchen with an island and stone tops, so the quote follows what you've actually got.</p>
<ul>
<li><strong>Tear-out or haul only.</strong> If you or your remodeler already pulled them, that's a <a href="/services/construction-debris-removal">construction debris removal</a> job and it's less work for us. If we're taking them off the wall, it's <a href="/services/light-demolition">light demolition</a>.</li>
<li><strong>Countertops.</strong> Laminate is light. Granite and quartz are way heavier, so send a photo and I'll tell you how we'll price them.</li>
<li><strong>Backsplash and tile.</strong> Tile counts as heavy material, [[adj:heavy]] per cubic yard with a 2-yard minimum. It fills the trailer by weight long before it fills it by space.</li>
<li><strong>Stairs and long carries.</strong> No stair charge. I just need to know about it so we plan the time.</li>
<li><strong>Everything else.</strong> The old dishwasher, flooring, drywall and trim can ride in the same load.</li>
</ul>
<h2>Do I need to disconnect the sink and appliances first?</h2>
<p>Yes. We don't do plumbing or electrical. Before we pull base cabinets, have a plumber shut off and cap the sink and dishwasher lines, and get an electrician for anything hardwired. Gas range going too? Have a pro disconnect it. After that the cabinets, the sink and the old <a href="/services/appliance-removal">appliances</a> can all go in one trip.</p>
<p>Empty the cabinets before we get there. Dishes, food, the stuff under the sink, all of it. Cleaners, paint or any other chemicals can't go in our trailer, so just set those aside.</p>
<h2>How long does it take to remove kitchen cabinets?</h2>
<p>Should take a few hours to a day. That's the range for most of our light demolition jobs. A small kitchen with the plumbing already capped is on the quicker end, and a big one with an island, stone tops and a tile backsplash takes longer. I'll tell you which one yours looks like from your photos.</p>
<p>We take the uppers down first, then the countertops, then the base cabinets. We load as we go so nothing piles up in your house.</p>
<p>I've spent a lot of years taking decks apart, and in my experience anything that went together with screws comes apart the same way, just backwards. A cabinet box is no different.</p>
<p>Someone should walk the kitchen with us at the start so we know what stays. When we leave, the debris is gone and the floor's swept.</p>
<img src="/blog/kitchen-cabinet-removal-cost/cabinets-pulled.webp" alt="Kitchen mid tear-out with the upper cabinets gone, base cabinets pulled from the wall, a stainless sink on the floor and a reciprocating saw nearby" width="1600" height="900">
<h2>Can old kitchen cabinets be donated in Denver?</h2>
<p>Yes, if they're in decent shape. Habitat for Humanity of Metro Denver's ReStores take cabinet sets, single cabinets and vanities, as long as every door and drawer is attached, the boxes are structurally sound and no nails or screws are sticking out. Loose cabinet parts by themselves are a no, and staff make the final call in person.</p>
<p>For most of Parker the closest one is the Aurora ReStore at 1640 S. Abilene St. There are also stores in Denver, Littleton and Arvada. Donation docks are open every day from 10 a.m. to 5:30 p.m.</p>
<p>Habitat does have a standard pickup, but it costs a fee and those drivers can't come inside. The cabinets need to already be in the garage or driveway. Check their <a href="https://habitatmetrodenver.org/restore/donate/donate-guide/" rel="noopener">donation guidelines</a> before you go.</p>
<p>If you want to donate, they have to come off clean. That means unscrewing them from the wall and from each other, not prying them off. Let me know ahead of time and we'll take them down carefully and set the good ones aside.</p>
<p>We separate out metal for recycling and donate reusable stuff whenever we can. Honestly, I'd rather see a solid set of oak cabinets end up in somebody's garage than in the landfill.</p>
<h2>Where do cabinets go if they can't be reused?</h2>
<p>Water damaged, swollen, or broke coming off the wall? Then they go to a licensed disposal site with the rest of the debris. For us that's a landfill like the one in Sedalia, where we've taken loads, or the Denver Arapahoe Disposal Site in Aurora that the Town of Parker points residents to. Either way, you're not hauling it.</p>
<p>That matters out here. The Town of Parker doesn't provide trash service, and Douglas County doesn't have residential curbside pickup. A pile of remodel debris in a south metro garage doesn't really have an easy way out.</p>
<img src="/blog/kitchen-cabinet-removal-cost/loading-the-trailer.webp" alt="EZ Haulaway crew member in a company T-shirt carrying a load to our black dump trailer parked on a residential street" width="1080" height="1350">
<h2>Should I hire a junk removal company or rent a dumpster?</h2>
<p>My take: a dumpster makes sense when a remodel runs for weeks and your crew is filling it every day. If the cabinets are coming out in one day, a haulaway is easier. We do the tear-out and the loading, and nothing sits in your driveway for a week. Our <a href="/services/dumpster-rental-alternative">dumpster rental alternative</a> page goes over how they compare.</p>
<p>Some remodel calls are a mix. One customer in Parker wanted a couple of sectional pieces, a dresser, a bathroom vanity top, cabinets and some construction debris gone all at once.</p>
<p>One load, one price. Not three separate pickups.</p>
<h2>Do you remove cabinets in older homes?</h2>
<p>Tell me what year your house was built before we schedule. The EPA lists removing kitchen cabinets as work that can disturb paint. In homes built before 1978, its Renovation, Repair and Painting Rule says anyone paid to do that work generally has to be a lead-safe certified firm. We're not an EPA lead-safe certified firm.</p>
<p>So if your place is pre-1978 and the cabinets or the walls around them are painted, we'll leave that tear-out to a certified renovator or pass on that part of the job.</p>
<p>We also don't remove asbestos, mold or lead paint, and we don't take out walls. Cabinets that are just storage come out. A wall holding up the floor above stays put.</p>
<h2>Do you remove cabinets from offices and businesses?</h2>
<p>Yes. Break room and storage cabinets that are screwed to the wall come out the same way a kitchen does. We can plan around your hours, early mornings included, so your team isn't working around us. See our <a href="/services/commercial-junk-removal">commercial junk removal</a> page, or just send photos and I'll quote it the same way.</p>
<h2>Need it gone?</h2>
<p>We're family-owned, insured and based in Parker. We do junk removal and light demolition all over the south metro, including <a href="/service-areas/highlands-ranch">Highlands Ranch</a>, <a href="/service-areas/castle-rock">Castle Rock</a> and <a href="/service-areas/aurora">Aurora</a>. If you're in town, here's our <a href="/service-areas/parker">Parker junk removal</a> page and our <a href="/service-areas/parker/construction-debris-removal">Parker construction debris removal</a> page.</p>
<p>Call or text me at <a href="tel:+17206147223">(720) 614-7223</a>, Monday through Saturday, 7 a.m. to 7 p.m. Send me a couple photos of the kitchen and I'll text back a price, or get one in a minute with our <a href="/instant-estimate">instant estimate</a>. Jobs start at our [[min]] minimum. Let me know if you have any questions. EZ in, junk out.</p>`,
    faqs: [
      {
        question: "Can you haul the cabinets, drywall and tile from my remodel in one trip?",
        answer:
          "Yes, as long as it fits in the trailer. Cabinets, drywall, wood and tile can all go in one load for one price. One remodel pile I quoted from photos, with cabinets, drywall, tile and stairs, came out to a half to five-eighths of the trailer. Tile is priced as heavy material, so send me a photo of it.",
      },
      {
        question: "Can you take the old dishwasher and toilets with the cabinets?",
        answer:
          "Yep. Old appliances and fixtures can go in the same load as the cabinets. Just have a plumber shut off and cap the water lines first, since we don't do plumbing or electrical. Send me a couple photos and it all goes on one quote.",
      },
      {
        question: "Can you carry the debris down the stairs for me?",
        answer:
          "Yes. We do all the carrying and loading. Upstairs, basement, garage, backyard, doesn't matter. There's no stair charge. Just mention the stairs when you send photos so we plan the time.",
      },
      {
        question: "How much does it cost to remove kitchen cabinets?",
        answer:
          "We price the haulaway by how much of our 14-cubic-yard trailer the job fills. Small loads start at [[min]], a quarter trailer is about [[load:2]], half about [[load:4]] and a full trailer about [[load:8]]. If we do the tear-out, that's extra labor at [[labor]] per hour per crew member, and it's in the quote up front.",
      },
      {
        question: "Will Habitat for Humanity take my old kitchen cabinets?",
        answer:
          "If they're in good shape, yes. Habitat for Humanity of Metro Denver's ReStores take cabinet sets, single cabinets and vanities with all the doors and drawers attached, structurally sound, with no nails or screws sticking out. Loose cabinet parts by themselves won't work, and staff approve every donation in person.",
      },
      {
        question: "Do you remove painted cabinets in older homes?",
        answer:
          "Tell me the year your home was built. EPA rules generally require a lead-safe certified firm for paid work that disturbs paint in homes built before 1978, and removing kitchen cabinets is one of EPA's examples. We're not a certified firm, so we leave that work to a certified renovator.",
      },
      {
        question: "Do I need a permit to remove kitchen cabinets?",
        answer:
          "We don't pull permits. If the cabinets are part of a bigger remodel, check with the Town of Parker or your county building department about what the whole project needs before anybody starts.",
      },
    ],
  },
  {
    slug: "estate-cleanout-cost",
    title: "Estate Cleanout Cost in Parker and the South Metro",
    meta_description:
      "Estate cleanout cost in Parker and the south Denver metro, priced by trailer space. What drives the price, what to donate first and how to get a quote.",
    publish_at: "2026-11-22T14:00:00.000Z",
    hero: {
      src: "/blog/estate-cleanout-cost/hero.webp",
      alt: "EZ Haulaway crew member tipping a gray reclining sofa onto a hand truck outside a townhome",
      width: 1600,
      height: 900,
    },
    content_html: `<h1>Estate Cleanout Cost in Parker and the South Metro</h1>
<p>Estate cleanout cost with us depends on one thing more than anything: how much of my trailer the stuff fills. Small loads start at [[min]], half a trailer is about [[load:4]] and a full trailer is about [[load:8]]. Loading, hauling and dump fees are in that number. A full house with a garage and basement can take more than one load, so send me photos and I'll give you a real number before we start.</p>
<p>I'm Ben. I own EZ Haulaway here in Parker, and my wife helps me run it. We're local, insured and family-owned. Estate jobs are different from a couch pickup. It's somebody's whole life in that house, so I try to keep it simple for the family.</p>

<h2>How much does an estate cleanout cost?</h2>
<p>We don't charge by the room or by the square foot. We charge by trailer space. A quarter trailer runs about [[load:2]], half about [[load:4]], three-quarters about [[load:6]] and a full trailer about [[load:8]]. That covers the carrying, loading, the drive and the landfill. If the house needs more than one full load, each extra load is priced the same way, and you hear the total before anything moves.</p>
<p>For reference, our biggest junk jobs so far each filled most or all of the trailer. That includes a job at an old double-wide in Kiowa and others in Parker, Highlands Ranch, Aurora and Centennial. Those six were the big ones out of about 40 jobs since we opened in June. A packed house with a full garage and basement can go past one load.</p>
<p>Want to see every price? It's all on our <a href="/pricing">pricing page</a>, and you can get a ballpark in a couple minutes on the <a href="/instant-estimate">instant estimate</a>.</p>

<h2>What makes an estate cleanout cost more?</h2>
<p>Mostly volume. Then it's the stuff that costs me more to dump. Fridges, freezers and other appliances with Freon are [[adj:freon]] each, because they have to be handled separately. Dirt, rock, tile and concrete get priced separately too. A half trailer of concrete weighs way more than a half trailer of couches, and the landfill charges by weight.</p>
<p>Old fridges show up more than you'd think. This fall we had one job with five old fridges and another with two Freon appliances. If there's an old fridge or chest freezer in the garage, tell me up front so it's in the quote.</p>
<p>Stairs matter too. Carrying a basement full of boxes up one at a time is slower than loading a garage. That goes into the price I give you, so there's no add-on at the end.</p>

<h2>What does a typical estate cleanout request look like?</h2>
<p>Here's a real one from this month, no names. Someone filled out our form and said they were "just getting prices." The list: a two-car garage with an old refrigerator, lots of kids' toys and baby items, bunk beds in great shape, a couple dressers, a couch and loveseat under 10 years old, plus some stuff upstairs.</p>
<p>Honestly that's what most of these look like. Some trash, some stuff somebody could use, and one old fridge. The bunk beds and a newer couch shouldn't go to the landfill if somebody can use them. So yeah, send me photos of all of it. Not just the big stuff.</p>
<img src="/blog/estate-cleanout-cost/table.webp" alt="EZ Haulaway crew member carrying a dark wood table upside down on his shoulder down a sidewalk" width="1600" height="900">

<h2>Can I sell or donate things before the cleanout?</h2>
<p>Yes, and you should if there's time. Anything the family sells or donates first is stuff you're not paying to haul. Family takes what they want first. Then sell what's worth selling, donate what you can, and call me for the rest.</p>
<p>Habitat for Humanity of Metro Denver ReStores take gently used furniture and household goods. They have ReStores in Denver, Littleton, Arvada and Aurora, and they'll pick up for a small fee. Two catches. Their crews can't go inside the house, so items have to be outside or in the garage. And they don't take mattresses, electronics, paint or appliances that don't work.</p>
<p>Stuff we haul doesn't all go to the dump either. If it's still good, I set it aside. This month we sold a couch and a couple other things we hauled on Facebook Marketplace, and my wife sometimes meets the buyers. And honestly, if I see something worth real money, I'll tell you. You should be the one selling it, not me.</p>

<h2>Where does estate junk go in Douglas County?</h2>
<p>Douglas County has no county trash pickup. Most homes here use a private hauler or an HOA contract, and regular trash service isn't set up for a garage full of furniture. Regular junk from our jobs goes to the Sedalia landfill or the WM site in Aurora.</p>
<p>Some things shouldn't go in the trailer at all. Douglas County GreenWorks in Sedalia takes household hazardous waste and electronics for free from county residents. You need an appointment and proof of residency. We don't haul paint, solvents, chemicals, fuel or propane tanks, so those go there. TVs and other electronics we can take, or county residents can drop them at GreenWorks.</p>

<h2>Who has to approve the cleanout?</h2>
<p>Make sure the right person says yes first. In Colorado, when an estate goes through probate, the court appoints a personal representative. That person has authority over the estate's property, including the house contents. I'm not a lawyer, so if there's any question about who gets what, sort that out first. Once the stuff is in my trailer, it's gone.</p>
<p>Get the family's keep list settled before you book. It makes the day a lot easier.</p>

<h2>How do I get an exact price for an estate cleanout?</h2>
<p>Send me a couple photos of every room, the garage, the basement and any sheds. Text them to (720) 614-7223, or use the <a href="/instant-estimate">instant estimate</a>. Send me the job details and I'll get you a number.</p>
<p>For a bigger house I'll come walk it. Earlier this month I walked a Parker job on a Tuesday, gave a price on site, and we had it cleared that Friday. A walkthrough also lets you point at what stays, what goes and what to set aside.</p>
<p>If you're a realtor or attorney handling the estate for a family, I'm happy to work with you directly.</p>

<h2>What we'll do on the day</h2>
<p>We walk it with you or whoever has the keys and confirm the price. Then my crew starts carrying. If you told me to watch for papers, photos or anything else, we set it aside instead of tossing it.</p>
<p>We handle full <a href="/services/house-and-estate-cleanouts">house and estate cleanouts</a>, plus <a href="/services/garage-cleanouts">garage cleanouts</a> and basement and attic cleanouts on their own. We work Parker, <a href="/service-areas/castle-rock">Castle Rock</a>, <a href="/service-areas/highlands-ranch">Highlands Ranch</a>, Aurora, Denver and the rest of the south metro. Not sure if we take something? Check <a href="/what-we-take">what we take</a>.</p>

<h2>Need it gone?</h2>
<p>Call or text me at (720) 614-7223 with a few photos, or get a price on the <a href="/instant-estimate">instant estimate</a>. Small jobs start at [[min]]. EZ in, junk out.</p>`,
    faqs: [
      {
        question: "How much does an estate cleanout cost in Parker?",
        answer:
          "We price by trailer space. Small loads start at [[min]], half a trailer is about [[load:4]] and a full trailer is about [[load:8]], with loading, hauling and dump fees included. A full house with a garage and basement can need more than one load. Send photos and I'll give you the total before we start.",
      },
      {
        question: "Is an estate cleanout cheaper if I donate things first?",
        answer:
          "Yes. Anything sold, donated or kept by family first is space you aren't paying for in my trailer. Habitat for Humanity of Metro Denver ReStores take gently used furniture, but their crews won't go inside, so items need to be outside or in the garage.",
      },
      {
        question: "Do you charge extra for old refrigerators and freezers?",
        answer:
          "Yes. Appliances with Freon, like fridges, freezers and AC units, are [[adj:freon]] each on top of the load price, because they have to be handled separately. Tell me about them up front so they're in the quote.",
      },
      {
        question: "Who can approve an estate cleanout in Colorado?",
        answer:
          "If the estate is in probate, the court-appointed personal representative has authority over the estate's property. Make sure that person signs off before anything leaves the house. If there's any question about who gets what, check with the estate's attorney first.",
      },
      {
        question: "Can you take paint and chemicals from an estate garage?",
        answer:
          "We don't haul paint, solvents, chemicals, fuel or propane tanks. Douglas County residents can take household hazardous waste and electronics to Douglas County GreenWorks in Sedalia for free with an appointment and proof of residency.",
      },
      {
        question: "Do you have to see the house before giving a price?",
        answer:
          "Not always. Photos of every room, the garage and the basement usually get you a solid range. For bigger houses I'll come walk it and give you a firm price on site.",
      },
    ],
  },
  {
    slug: "electronics-recycling-denver",
    title: "Electronics Recycling in Denver and Douglas County",
    meta_description:
      "Electronics recycling in Denver and Douglas County: free GreenWorks drop-off in Sedalia, Denver's E-cycle coupon, what's banned from the trash, and pickup.",
    publish_at: "2026-11-24T14:00:00.000Z",
    hero: {
      src: "/blog/electronics-recycling-denver/hero.webp",
      alt: "Basement in a Parker home before a cleanout, with a cardboard box full of tangled old cords and cables, a vacuum, a small cabinet, shelving and a trash can",
      width: 1600,
      height: 900,
    },
    content_html: `<h1>Electronics Recycling in Denver and Douglas County</h1>
<p>Here's the short answer on electronics recycling in Denver and Douglas County. In Colorado you can't throw TVs, computers, monitors or printers in the trash. They have to get recycled. If you live in Douglas County you can drop them off free at GreenWorks in Sedalia, you just need an appointment. Denver gives you one E-cycle coupon a year for a discount. Or we haul it, starting at [[min]].</p>
<p>I'm Ben, I own EZ Haulaway here in Parker. With electronics, people usually need to get rid of old TVs. That's the most common item. Following that is printers.</p>
<h2>Can I throw away a TV in Colorado?</h2>
<p>No. Colorado has banned electronics from landfills since July 1, 2013, so the TV can't go out with the trash. It has to be recycled. Same goes for computers, monitors, laptops, tablets, printers, fax machines, keyboards and mice, DVD players and VCRs. Any screen bigger than four inches, measured diagonally, counts too.</p>
<p>The law is SB 12-133, the Electronic Recycling Jobs Act, and Denver's <a href="https://denvergov.org/My-Property/Recycle-Compost-Trash/Recycle/Electronic-Recycling" rel="noopener">electronic recycling page</a> has the whole list. Telephones aren't covered. Neither are the electronics built into washers, fridges and microwaves.</p>
<h2>Where can I recycle electronics for free in Douglas County?</h2>
<p>GreenWorks in Sedalia. It's the county's drop-off site right next to the Sedalia Landfill, and electronics recycling there is free for Douglas County residents. Parker, Castle Rock, Highlands Ranch, Lone Tree, Castle Pines and Sedalia all count. You do need an appointment, and you need an ID or other proof you live in the county.</p>
<p>They're open Monday through Saturday, 8 a.m. to 5 p.m., and the last appointment is 4:30. Closed Sundays and county holidays. Open year-round, weather permitting. Reservations open ten days out and the county says they fill up fast, so if you don't see a slot, check back the next day. For booking help, call 303-660-7480 or go to the <a href="https://www.douglasco.gov/greenworks/electronics/" rel="noopener">GreenWorks electronics recycling page</a>.</p>
<p>This is pretty new. Year-round drop-off at GreenWorks only started in July 2026.</p>
<h2>What does Douglas County's electronics recycling accept?</h2>
<p>In my words, "their accepted items are computers, tablets, monitors, televisions." Printers too, plus fax machines, keyboards and mice, DVD players, VCRs, cell phones, game consoles, stereo and audio stuff, networking gear, servers and external hard drives. If it's not on their list they don't take it. Take the stand or wall bracket off the TV first.</p>
<p>The no list is long. No fridges, freezers, washers or dryers, and nothing with Freon, mini fridges included. No small appliances like microwaves, fans, coffee makers, toasters or blenders. No electric mowers, power tools, vacuums or exercise equipment. No car electronics, AC units or swamp coolers. And no light bulbs of any kind, fluorescent light ballasts, or anything with liquid mercury like an old thermostat.</p>
<p>Tube TVs are the tricky one. TVs are on the yes list but broken or exposed CRT glass isn't, so if the old tube TV has a cracked screen, call GreenWorks before you load it up.</p>
<img src="/blog/electronics-recycling-denver/old-monitors-pile.webp" alt="Pile of old beige CRT computer monitors and a desktop computer tower stacked outside, waiting for electronics recycling" width="1600" height="900">
<h2>How does electronics recycling work in Denver?</h2>
<p>Denver doesn't really have a free drop-off for TVs. It has the E-cycle coupon. If you live in Denver you can request one per household per calendar year, and it gets you a discounted rate on TVs, monitors and other electronics at Blue Star Recyclers. Bring the coupon code and proof of your address when you drop off.</p>
<p>You request it on the city's <a href="https://denvergov.org/My-Property/Recycle-Compost-Trash/Recycle/Electronic-Recycling" rel="noopener">electronic recycling page</a>. They email you the code, and the city says to allow 12 to 24 hours. It's for drop-offs only. Businesses can't use it, PO boxes can't, and neither can anyone outside the City and County of Denver. Denver's list is also wider than Douglas County's. It takes coffee makers, vacuums, toasters, cords and cables, rechargeable batteries and some small appliances like microwaves.</p>
<p>At <a href="https://bluestarrecyclers.org/electronics-recycling/for-residents/" rel="noopener">Blue Star Recyclers</a> computers, cell phones and tablets are free. TVs, monitors and most other electronics are charged by the pound, and a broken CRT costs more. They're open Monday through Friday 9 to 5 and Saturday 9 to 1.</p>
<p>Don't take a TV to the Cherry Creek Recycling and Compost Drop-off. It only takes regular household recycling and compost. In Aurora or anywhere else in Arapahoe County, check with your city. The state keeps a <a href="https://cdphe.colorado.gov/hm/information-residential-electronics-and-computer-waste" rel="noopener">list of electronics recyclers</a> and says to expect a fee.</p>
<h2>What do we do with the electronics we haul?</h2>
<p>We recycle them. We take everything to an electronics recycler that accepts it. We don't usually resell electronics either. "Usually we take everything to the electronics recycling."</p>
<p>A lot of the time the electronics are just one part of a bigger cleanout. One Parker basement had a TV and a big box of old cords and cables in with a treadmill, a dresser and a bunch of boxes. That's the basement in the photo up top. My crew had it empty in about 45 minutes.</p>
<p>TVs come up in our leads more than any other electronics. This fall we had a 65-inch TV just north of Denver that still worked, it was just too big for the house. Someone else had six old tube TVs going out with a bed set, a couch and a desk. Another lead was two TVs and three computer towers along with six office chairs. In Aurora it was a 2006 rear-projection TV with two sofas, a fridge and a lawn mower. And in Englewood, a tube TV, a TV/monitor and a wood TV cabinet, all down in the basement.</p>
<p>Back in September we drove up to the mountains to pick up one TV. Just the one. So yes, we'll come out for a single TV.</p>
<h2>How much does electronics pickup cost?</h2>
<p>Our jobs start at [[min]], and that covers loading, hauling and disposal. A trip for just one TV is that minimum. Most people have more than one thing to get rid of, so the TVs get quoted with the rest of the load. There's also [[travel]].</p>
<p>Bigger jobs go by how much of the trailer you fill. Half a trailer is about [[load:4]] and a full trailer is about [[load:8]]. Old tube TVs are heavy and awkward, and a lot of services turn them down. We take them.</p>
<p>Fastest way to a price is to send me a couple photos and your city. I'll lock in the exact price and give you our soonest availability. You can also run it through our <a href="/instant-estimate">instant estimate</a>, and the whole price list is on our <a href="/pricing">pricing page</a>.</p>
<h2>Should I wipe my computer or phone before recycling it?</h2>
<p>Yes. Wipe it or pull the drive before it leaves your house. Denver's recycling page says deleting your personal files and resetting to factory settings is generally enough for laptops, computers and phones. We don't wipe data. So if a drive has anything sensitive on it, take it out or destroy it before we show up.</p>
<h2>What can't you recycle at the electronics drop-off?</h2>
<p>At Douglas County's drop-off, a lot of everyday stuff with a plug gets turned away. Microwaves, vacuums, toasters, power tools, electric mowers, exercise equipment, fridges and AC units all get a no. That doesn't make any of it trash, though. We can still haul most of it.</p>
<p>Here's how I put it: "we are able to take pretty much anything that can be transported apart from biohazardous or hazardous waste." The treadmill, the microwave and the old fridge can go on the same trip as the TVs. Anything with Freon is [[adj:freon]] extra per unit. More on our <a href="/services/appliance-removal">appliance removal</a> and <a href="/what-we-take">what we take</a> pages.</p>
<p>Paint, chemicals and other hazardous waste can't go in our trailer. For those, Douglas County's GreenWorks page links to its A-Z Recycling Guide.</p>
<h2>Need your old electronics gone?</h2>
<p>We're family-owned, insured and based in Parker, and we pick up electronics all over the south metro. See our <a href="/services/electronics-and-e-waste-removal">electronics and e-waste removal</a> page, or the local pages for <a href="/service-areas/sedalia/electronics-and-e-waste-removal">Sedalia</a> and <a href="/service-areas/centennial/electronics-and-e-waste-removal">Centennial</a>. We also work in <a href="/service-areas/parker">Parker</a>, <a href="/service-areas/castle-rock">Castle Rock</a>, <a href="/service-areas/highlands-ranch">Highlands Ranch</a> and <a href="/service-areas/denver">Denver</a>.</p>
<p>Call or text me at <a href="tel:+17206147223">(720) 614-7223</a>, Monday through Saturday, 7 a.m. to 7 p.m. Send me a couple photos of the TVs, printers or whatever's piled up and I'll text you back a price. Or get one in a minute with our <a href="/instant-estimate">instant estimate</a>. EZ in, junk out.</p>`,
    faqs: [
      {
        question: "Is electronics recycling free in Douglas County?",
        answer:
          "Yes, if you live in Douglas County. GreenWorks in Sedalia takes TVs, computers, monitors, printers and the rest of its list for free. Book an appointment and show an ID or other proof you live in the county. Slots open ten days ahead and go fast.",
      },
      {
        question: "Can I throw a TV in the trash in Colorado?",
        answer:
          "No. Colorado has banned electronics from landfills since July 1, 2013. TVs, computers, monitors, printers, laptops, tablets, any screen over four inches. It all has to go to a recycler, not the trash.",
      },
      {
        question: "Is there free TV recycling in Denver?",
        answer:
          "Not really. If you live in Denver you can get one E-cycle coupon per household each year, and it gets you a discount at Blue Star Recyclers. Computers, phones and tablets are free there. TVs and monitors are charged by the pound.",
      },
      {
        question: "Does Douglas County's electronics recycling take microwaves or vacuums?",
        answer:
          "No, neither one. The Douglas County drop-off doesn't take small appliances, and that includes microwaves, vacuums, coffee makers, toasters and fans. Denver's E-cycle program does list vacuums and microwaves. Either way, we can haul them for you.",
      },
      {
        question: "How much does it cost to have a TV picked up?",
        answer:
          "Our jobs start at [[min]], with loading, hauling and disposal included. A trip for just one TV is that minimum, and TVs going out with other junk are quoted with the rest of the load. There's also [[travel]]. Send me a couple photos and your city and I'll lock in the exact price.",
      },
      {
        question: "Do you take old tube TVs?",
        answer:
          "Yes. Tube TVs are heavy and a lot of services won't take them, but we do. If the glass is cracked, let me know. Douglas County won't take broken or exposed CRT glass.",
      },
      {
        question: "Do you wipe hard drives before recycling?",
        answer:
          "No, we don't wipe data. Pull or destroy any hard drive with sensitive info on it before we pick up the computer.",
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
