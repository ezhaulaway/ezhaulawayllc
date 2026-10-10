import { priced } from "@/lib/price-store";
type Extra = { eyebrow: string; title: string; blocks: Array<[string, string]> };

const raw_pageExtras = {
  home: {
    eyebrow: "Local junk removal",
    title: "Why Parker Homeowners Call EZ Haulaway",
    blocks: [
      ["How much does junk removal cost in Parker?", "Our **junk removal services** are priced by how much space your junk takes in our 16-foot trailer. Small pickups start at a [[min]] minimum. A half load is about [[load:4]], and a full trailer is about [[load:8]]. That price covers labor, loading, hauling, and disposal fees, so junk removal stays **affordable** with no surprise fuel or mileage charges. We **agree** on the upfront price before loading starts, and we **accept** all standard payment methods once your unwanted items are completely **removed**."],
      ["Get a free estimate from pictures", "Want a **free estimate** fast? Text pictures of your items to 720-614-7223, or upload pictures to our instant estimator. A few pictures from different angles help us price your junk removal accurately before we ever show up. You can also **check** our availability and book a pickup window online in about a minute."],
      ["Full-service junk removal vs. renting a dumpster", "A **dumpster rental** sits in your driveway for days, may need a permit, and you still load it yourself. With full-service junk removal, our crew does **all the heavy lifting**, the trailer leaves the same day, and the price includes disposal. For most homeowners, junk removal is the more convenient and affordable choice over a dumpster."],
      ["What does EZ Haulaway pick up?", "**Old furniture** like couches and tables, mattresses, appliances, hot tubs, sheds, decks, yard waste, remodel debris, and full garage or whole-house cleanouts. If it's not hazardous and two people can load it, our junk removal crew can usually take it."],
      ["We handle all the heavy lifting", "You don't need to drag anything to the curb. We carry items out of the house, from attics, basements, bedrooms, and garages. **Heavy lifting** is our job, so you can just point and we'll haul it away."],
      ["Yard waste and debris removal", "Our **debris removal** covers branches, brush, old fencing, landscape waste, and storm cleanup. Construction debris removal for remodels and deck tear-outs is part of our everyday junk removal work too."],
      ["Serving Parker, Castle Rock, and the Denver metro", "From our Parker **location**, we provide **efficient**, **timely**, and **reliable** junk removal services daily in Castle Rock, Castle Pines, Highlands Ranch, Lone Tree, Centennial, Aurora, Littleton, Englewood, Lakewood, Denver, Elizabeth, Franktown, and Sedalia."],
      ["Donate, recycle, then dispose", "Every junk removal load is sorted before it heads to the landfill. Usable old furniture goes toward donation, and metal, appliances, and electronics are recycled whenever possible."],
      ["Same-day junk removal pickup", "Moving day, a closing date, or a rental turnover can't wait. We keep room for **same-day pickup** and next-day junk removal in Parker, Castle Rock, Lone Tree, Centennial, and Denver whenever the trailer is free."],
      ["Mattress, couch, and appliance pickup", "Most calls start with one item: mattress disposal, couch disposal, a refrigerator, a washer and dryer, or a treadmill. A **single-item pickup** starts at [[min]], and we carry it out of the house ourselves."],
      ["Hot tubs, sheds, and decks other haulers skip", "Hot tub removal, shed tear-downs, deck demolition, and fence removal need tools and experience, not just a truck. Ben's construction background means these junk removal services get done in one visit across the Denver metro area."],
    ],
  },
  about: {
    eyebrow: "Our story",
    title: "A Family Business Built on Hard Work",
    blocks: [
      ["Started in Parker, Colorado", "EZ Haulaway began with a simple idea: junk removal should be easy, honest, and done by people who care. Ben and Zoe built the business around showing up on time, communicating clearly, and treating every property like their own."],
      ["Construction roots", "Ben's background in construction and demolition — including more than 300 decks — is why we can handle jobs other haulers turn down, like shed tear-downs, hot tub removal, and deck and fence demolition."],
      ["Reputation over volume", "As a local family-owned company, our name is on every job. Most of our work comes from neighbors, repeat customers, and Google reviews, so we'd rather do each job right than rush to the next one."],
    ],
  },
  contact: {
    eyebrow: "Quick answers",
    title: "Before You Reach Out",
    blocks: [
      ["Best way to get a fast price", "Text a few photos of the items or the space to 720-614-7223. Photos from a couple of angles, plus a note about stairs or long carries, let us give you an accurate junk removal quote quickly."],
      ["Scheduling", "We work throughout the week across Parker and the Denver metro area and can often fit jobs in within a few days. Let us know if you have a deadline, such as a move-out or closing date."],
      ["What to have ready", "Nothing, really. You don't need to bag, sort, or move items to the curb. Just make sure we can access the area, and our crew handles the rest."],
      ["Need same-day junk removal?", "Call or text if it's urgent. Same-day and next-day junk removal in Parker, Castle Rock, Lone Tree, Centennial, and Denver is often possible when the trailer isn't already booked."],
    ],
  },
  "how-it-works": {
    eyebrow: "Step by step",
    title: "Your Junk Removal Day, Start to Finish",
    blocks: [
      ["Arrival and walkthrough", "Our crew arrives in the red pickup and black dump trailer during your scheduled window. We walk the space with you, confirm what's going, and confirm the price before loading."],
      ["Loading and protection", "We carry items out carefully, protecting doorframes, floors, and landscaping. Heavy items like appliances, hot tubs, and pianos get the right equipment and extra hands."],
      ["Cleanup and haul-away", "Once the trailer is loaded, we sweep the area and head out. Items are sorted for donation and recycling before anything goes to a landfill."],
    ],
  },
  pricing: {
    eyebrow: "Pricing examples",
    title: "What Typical Jobs Cost",
    blocks: [
      ["Single items", "One couch, mattress, or appliance usually falls near our [[min]] minimum. Couches are about [[item:Couch]] per cushion, mattresses [[item:Mattress]], box springs [[item:Box spring]], refrigerators [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]], and treadmills [[item:Treadmill]]."],
      ["Garage and room cleanouts", "Most garage cleanouts and single-room cleanouts fill a quarter to a half trailer, roughly [[load:2]] to [[load:4]], depending on weight and access."],
      ["Whole-house and large projects", "Estate cleanouts, remodel debris, and deck tear-outs can fill a full trailer — about [[load:8]] — or more than one load. Hot tubs start around [[item:Hot tub]] and pianos around [[item:Piano]]."],
      ["Specialty removal and disposal pricing", "Some jobs are priced by the item instead of by trailer space: hot tub removal from [[item:Hot tub]], piano removal from [[item:Piano]], mattress disposal [[item:Mattress]], box spring [[item:Box spring]], couch disposal about [[item:Couch]] per cushion, refrigerator disposal [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]], and treadmill removal [[item:Treadmill]]."],
      ["Cheaper than a dumpster rental", "A dumpster in Denver sits in your driveway for a week and you still load it yourself. Our price includes the labor, the loading, the hauling, and the disposal fees, and the trailer leaves the same day."],
    ],
  },
  "service-areas": {
    eyebrow: "Coverage",
    title: "Local Junk Removal from Parker to Castle Rock",
    blocks: [
      ["Parker junk removal from our home base", "EZ Haulaway is based in Parker, where we handle single-item pickups, furniture and appliance removal, garage cleanouts, hot tubs, sheds, decks, fences, and other hauling projects for our neighbors."],
      ["Castle Rock junk removal just down I-25", "Castle Rock is one of our core service areas. We regularly help with larger-property projects such as shed and fence removal, landscaping debris, hot tubs, household junk, and full cleanouts."],
      ["Douglas County", "Parker, Castle Rock, Castle Pines, Highlands Ranch, Lone Tree, Franktown, and Sedalia are all part of our regular service area."],
      ["Arapahoe, Elbert, and Jefferson Counties", "We regularly haul junk in Centennial, Aurora, Littleton, Englewood, Elizabeth, and Lakewood, from suburban garages to rural acreage cleanups."],
      ["Denver", "From alley pickups to bungalow basement cleanouts, we serve Denver neighborhoods with the same straightforward pricing we offer everywhere else."],
      ["Specialty hauling in every city we serve", "Hot tub removal in Castle Rock, deck demolition in Highlands Ranch, shed removal in Parker, mattress disposal in Denver, and estate cleanouts in Littleton — the same crew and the same trailer covers all of it."],
      ["Searching for junk removal near you", "If you're looking up junk removal near me in Parker, Castle Rock, Centennial, Highlands Ranch, Aurora, Littleton, or Denver, you're inside our normal route, so there's no travel surcharge."],
    ],
  },
  "what-we-take": {
    eyebrow: "Items we haul",
    title: "Common Items We Remove Every Week",
    blocks: [
      ["Around the house", "Couches, recliners, mattresses, box springs, dressers, tables, TVs, exercise equipment, boxes, clothing, toys, and general household clutter."],
      ["Outdoors", "Hot tubs, sheds, playsets, decks, fencing, grills, patio furniture, branches, brush, landscape debris, and old lumber."],
      ["Items we can't take", "For safety, we don't haul hazardous materials such as wet paint, chemicals, fuel, asbestos, or medical waste. If you're unsure about an item, send us a photo and we'll let you know."],
      ["Disposal, not just removal", "People search for mattress disposal, couch disposal, appliance disposal, refrigerator disposal, and yard waste removal — that's all the same call here. We take the item out and handle the dump and recycling fees in your price."],
      ["Cleanouts of every size", "Garage cleanouts, basement cleanouts, estate and eviction cleanouts, storage units, rental turnovers, and construction debris removal all get hauled in our 16-foot dump trailer."],
    ],
  },
} satisfies Record<string, Extra>;
export const pageExtras = priced(raw_pageExtras);
