import { priced } from "@/lib/price-store";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CtaBand,
  FaqAccordion,
  InlineQuoteForm,
  PageShell,
  SectionHeader,
} from "@/components/site-chrome";
import { locationBySlug, locations } from "@/content/locations";
import { locationPhoto } from "@/content/location-images";
import { serviceBySlug, services } from "@/content/services";
import { PHONE, PHONE_TEL, SITE_URL, BUSINESS_SCHEMA } from "@/content/site";
import { rich } from "@/components/prose-section";

/**
 * Hand-written local content for priority city+service pages.
 * Keyed by `${citySlug}/${serviceSlug}`. Pages listed here get unique
 * paragraphs, a unique local section, a custom meta description and
 * page-specific FAQs so they are not near-identical to the other
 * city+service pages.
 */
const RAW_CUSTOM_PAGES: Record<
  string,
  {
    title?: string;
    h1?: string;
    description: string;
    intro: string[];
    localHeading: string;
    localText: string[];
    faqs: Array<[string, string]>;
    sections?: Array<{ heading: string; paragraphs: string[]; subsections?: Array<{ heading: string; text: string }> }>;
  }
> = {
  "castle-rock/hot-tub-removal": {
    description:
      "Hot tub removal in Castle Rock, CO from [[item:Hot tub]]. We cut up, haul out and dispose of old spas and hot tubs — including decks and pads they sit on. Free quotes, family-owned crew from Parker.",
    intro: [
      "Castle Rock backyards are full of hot tubs that came with the house — and half of them haven't run in years. Whether your spa is dead, cracked, or you're reclaiming the patio in The Meadows, Founders Village or Castlewood Ranch, we remove the whole thing: shell, cabinet, cover, pump and wiring.",
      "Most hot tubs won't fit through a gate or over a fence in one piece, so we cut them into manageable sections with a reciprocating saw, carry every piece out by hand, and load it into our 16-foot dump trailer. You don't touch anything — we disconnect, demolish, haul and sweep the pad when we're done.",
      "Hot tub removal in Castle Rock starts at [[item:Hot tub]] and goes up with size, access and whether the tub is sunk into a deck. Text us a few photos and we'll give you a firm price before we ever start the saw.",
    ],
    localHeading: "Hot Tub Removal Across Castle Rock Neighborhoods",
    localText: [
      "We work all over Castle Rock — from the older spas built into decks in The Meadows and Founders Village to newer swim spas in Crystal Valley and Terrain that need two crews and a full trailer. Tight side yards and HOA rules are normal here, and we plan around both: we protect your fence and landscaping on the carry-out and leave the site clean enough for your next project.",
      "If your hot tub sits on a concrete pad or is framed into a deck, we can take the surrounding decking and pad breaking as part of the same visit — it's one of the most common add-ons we do in Castle Rock. Everything gets sorted for disposal and recycling, and you get one price for the whole job up front.",
    ],
    faqs: [
      [
        "How much does hot tub removal cost in Castle Rock?",
        `Most Castle Rock hot tub removals run [[item:Hot tub]] to $800 depending on the tub's size, whether it's sunk into a deck, and how far we have to carry the pieces. Text photos to ${PHONE} for a firm quote — the price we give you is the price you pay.`,
      ],
      [
        "Can you remove a hot tub that's built into my deck?",
        "Yes — this is one of the most common jobs we do in Castle Rock. We cut the tub out, remove the surrounding framing if you want it gone, and can break up the concrete pad underneath as part of the same visit.",
      ],
      [
        "Do I need to disconnect the power and water first?",
        "No. We handle the disconnection as part of the job. If the tub is still live, we make sure the circuit is safe before we start cutting.",
      ],
    ],
  },
  "castle-rock/furniture-removal": {
    title: "Furniture Removal Castle Rock CO | Fast Couch & Mattress Hauling",
    h1: "Furniture Removal Castle Rock, CO",
    description:
      "Furniture removal in Castle Rock, CO from [[min]]. Couches, sectionals, dressers, recliners and office furniture carried out and hauled away. Free estimates.",
    intro: [
      "Need **furniture removal in Castle Rock**? EZ Haulaway carries out couches, sectionals, recliners, dressers, beds, tables and desks from any room in your home — upstairs bedrooms, finished basements and garages included. You point, we lift, load and haul.",
      "Single-item pickups start at [[min]]. Multiple pieces are priced by how much trailer space they fill: about [[load:4]] for a half load and [[load:8]] for a full load. Mix furniture with boxes, mattresses or garage junk and it all goes on one quote.",
      "We check furniture for **donation** before anything goes to the landfill. Sofas, tables and dressers in good shape can go to local thrift and donation centers, while broken pieces are sorted for wood and metal recycling where possible.",
    ],
    localHeading: "Furniture Pickup Across Castle Rock",
    localText: [
      "We remove furniture in The Meadows, Founders Village, Castlewood Ranch, Crystal Valley, Terrain, Red Hawk and around downtown Castle Rock. Many homes here have tight stair turns and walkout basements, so we bring blankets, straps and a dolly and protect walls and door frames on the way out. Sectionals and sleeper sofas can be taken apart if they won’t fit through a doorway.",
      "Moving, downsizing or staging a home for sale? We handle **old furniture removal** for realtors and property managers too, and can work with a lockbox when you can’t be there. For businesses, we haul office desks, chairs, cubicle panels and filing cabinets — see our commercial junk removal service for bigger office cleanouts.",
    ],
    sections: [
      {
        heading: "Room-by-Room Furniture Removal in Castle Rock",
        paragraphs: [
          "Most furniture removal jobs are not one item. They are a living room refresh, a bedroom swap or a basement that finally gets cleared. Here is what we commonly haul from each part of a Castle Rock home, so you can plan one visit instead of three.",
        ],
        subsections: [
          { heading: "Living Room and Family Room Furniture", text: "We remove **sectionals, sleeper sofas, leather recliners**, loveseats, coffee tables, end tables and entertainment centers. Couches are priced at [[item:Couch]] per cushion as single items, and a solid wood entertainment center is about [[item:Entertainment center]]. Sleeper sofas are heavier than they look, so we bring two people and straps for every carry-out." },
          { heading: "Bedroom Furniture and Mattresses", text: "We haul **bed frames, headboards, dressers, armoires**, nightstands and bunk beds. We take apart bed frames and bunk beds on site when they will not fit through a doorway. A mattress is about [[item:Mattress]] and a box spring about [[item:Box spring]], and both can go on the same trip as the rest of the bedroom set." },
          { heading: "Dining Room Furniture", text: "Dining tables, chairs, hutches and buffets are common pickups during a remodel or downsizing. A table with four chairs runs about [[item:Dining room set (table + 4 chairs)]], and a large dining room hutch about [[item:Hutch (dining room)]]. Glass doors and shelves are wrapped or removed first so nothing breaks on the way out." },
          { heading: "Home Office and Basement Furniture", text: "We remove **office desks, filing cabinets, bookshelves**, futons, old bar stools and exercise equipment from basements and home offices. A large desk is about [[item:Desk (large)]] and a treadmill about [[item:Treadmill]]. Basement jobs often mix furniture with boxes and storage junk, and it all goes on one quote." },
        ],
      },
      {
        heading: "Tight Stairs and Walkout Basements",
        paragraphs: [
          "Many Castle Rock homes have two-story great rooms, split-level layouts and finished basements with tight stair turns. Getting a heavy couch or dresser out without scuffing drywall takes planning. We measure the tightest doorway first, pad railings and door frames, and remove legs, cushions and drawers to lighten the load.",
          "If a **sectional or sleeper sofa** will not make the turn, we can take it apart at the seams or cut it down, since it is headed for disposal anyway. Walkout basements are often easiest through the back door, so we plan the shortest carry route and protect your lawn and patio along the way.",
        ],
      },
      {
        heading: "Furniture Donation and Recycling in Castle Rock",
        paragraphs: [
          "We look for a second life for furniture before anything goes to the landfill. Clean, working pieces with no rips, stains, pet damage or broken frames are the best candidates for **furniture donation**. Each donation center sets its own standards, so we cannot promise every item will be accepted.",
          "Pieces that cannot be donated get sorted. Metal frames and hardware go to **scrap metal recycling**, and the rest is taken to the proper disposal facility. If you want a donation receipt for your taxes, tell us when you book and we will let you know which items are likely to qualify.",
        ],
      },
      {
        heading: "How Our Furniture Removal Pricing Works",
        paragraphs: [
          "Single pieces are priced individually, starting at [[min]]. When you have several items, we price by how much space they take in our 16-foot dump trailer: about [[load:4]] for a half load and about [[load:8]] for a full load. The price includes carrying, loading, hauling, disposal fees and a quick sweep.",
          "Send photos for a **free furniture removal estimate**, or use the instant estimate on our site. We confirm the final price in person before we lift anything, so there are no surprise charges.",
        ],
      },
    ],
    faqs: [
      [
        "How much does furniture removal cost in Castle Rock?",
        "A single piece starts at [[min]]. Larger jobs are priced by trailer space — around [[load:4]] for a half load and [[load:8]] for a full load. We confirm the price on-site before loading.",
      ],
      [
        "Do I need to bring the furniture outside?",
        "No. We carry it out from wherever it sits, including upstairs bedrooms and basements.",
      ],
      [
        "Do you donate furniture?",
        "Yes, when it is in usable condition. Acceptance depends on the donation center, so we sort and recycle whatever they can’t take.",
      ],
    ],
  },
  "castle-rock/appliance-removal": {
    title: "Appliance Removal Castle Rock CO | Refrigerator & Washer Hauling",
    h1: "Appliance Removal Castle Rock, CO",
    description:
      "Appliance removal in Castle Rock, CO. Refrigerators, freezers, washers, dryers, stoves and water heaters hauled away and recycled. Free estimates.",
    intro: [
      "Need **appliance removal in Castle Rock**? We haul away refrigerators, freezers, washers, dryers, dishwashers, stoves, microwaves and water heaters — from kitchens, laundry rooms, basements and garages.",
      "Appliances are heavy, awkward and often tucked into tight laundry closets. Our crew uses an appliance dolly and straps, protects floors and door frames, and handles the stairs. Single appliances start at [[min]], and multiple appliances or extra junk are priced by trailer space, about [[load:4]] for a half load.",
      "Most appliances are mostly steel, so we take them to **scrap metal recycling** instead of the landfill. Refrigerators and freezers contain refrigerant that must be handled by a certified recycler, and we deliver them to facilities that accept them.",
    ],
    localHeading: "Appliance Pickup for Castle Rock Homes",
    localText: [
      "Remodels and upgrades are common across Castle Rock, from older homes near downtown to newer builds in Crystal Valley and Terrain. If your new appliance delivery doesn’t include haul-away, or you have an old garage fridge or chest freezer that finally quit, we can usually schedule within a few days.",
      "Please make sure gas lines, water lines and hardwired electrical are safely shut off and disconnected before we arrive. Standard plug-in appliances and washer hoses are no problem. Let us know about stairs or tight turns when you request your estimate so we bring the right equipment.",
    ],
    sections: [
      {
        heading: "Refrigerator and Freezer Removal",
        paragraphs: [
          "Refrigerators, **chest freezers**, mini fridges and garage freezers need careful handling because of the refrigerant inside. We take them to recyclers that recover the refrigerant before the metal is processed. A full-size fridge is about [[item:Refrigerator (full size)]] and a side-by-side model about [[item:Refrigerator (side by side)]].",
          "Please empty all food and ice and unplug the unit a day before pickup so it can drain. If your fridge has a water line for the ice maker, shut off the valve behind it. We handle the rest, including tight kitchen exits and garage stairs.",
        ],
      },
      {
        heading: "Washer and Dryer Removal",
        paragraphs: [
          "Stacked laundry units and second-floor laundry rooms are common in Castle Rock homes. Our crew uses an appliance dolly and straps to bring **washers and dryers** down stairs without damaging floors or walls. Each unit is about [[item:Washer / dryer (each)]].",
          "Before we arrive, turn off the water valves behind the washer. Unplug electric dryers. Gas dryers need the gas line shut off and capped by a qualified person first. We can remove drip pans and leftover hoses as part of the job.",
        ],
      },
      {
        heading: "Stoves, Dishwashers and Water Heaters",
        paragraphs: [
          "We haul **electric and gas ranges**, wall ovens, microwaves, dishwashers and old water heaters. A stove is about [[item:Stove]], a dishwasher about [[item:Dishwasher]] and a water heater about [[item:Water heater]]. Water heaters must be drained and disconnected before removal.",
        ],
      },
      {
        heading: "Appliance Pickup Prep Checklist",
        paragraphs: [
          "A little prep makes pickup fast. **Empty fridges and freezers**, unplug them early, and shut off water lines. Have gas lines and hardwired 240-volt connections safely disconnected. Clear a path to the door, and tell us about stairs, tight turns or a long carry when you request your estimate.",
        ],
      },
      {
        heading: "Scrap Metal Recycling for Old Appliances",
        paragraphs: [
          "Most appliances are mostly steel, with copper and aluminum inside. We separate them from regular trash and take them to **scrap metal recycling**, keeping heavy appliances out of Douglas County landfills. Working appliances in good shape may be donated when a local center can accept them.",
          "People sometimes ask about free appliance pickup. Scrap value no longer covers the fuel, two-person labor and disposal fees, so we charge a fair, upfront price instead. Single appliances start at [[min]], and you get a **free estimate** before any work begins.",
        ],
      },
    ],
    faqs: [
      [
        "How much does appliance removal cost in Castle Rock?",
        "One appliance starts at [[min]]. Several appliances or appliances mixed with other junk are priced by trailer space, about [[load:4]] for a half load.",
      ],
      [
        "Do you take refrigerators and freezers?",
        "Yes. We take them to recyclers that properly handle refrigerant. Please empty food out first.",
      ],
      [
        "Will you disconnect my gas dryer or stove?",
        "Gas and hardwired connections need to be safely disconnected before we arrive. We handle everything after that.",
      ],
    ],
  },
  "parker/shed-removal": {
    description:
      "Shed removal and tear-down in Parker, CO from [[load:4]]. We demolish, haul and dispose of old sheds — wood, metal or plastic — and leave the spot clean. Free quotes from your local Parker crew.",
    intro: [
      "We're based right here in Parker, so shed removal is practically our hometown specialty. From leaning metal sheds in older Parker neighborhoods to rotting wood sheds out toward Pinery and Stonegate, we tear them down, load every scrap into our trailer, and rake the spot clean.",
      "Most Parker shed removals run [[load:4]] to [[load:8]] depending on size, construction and what's still stored inside. If the shed is full of old tools, paint cans and junk, we clear that out first and price it with the load — one visit, one price, nothing left behind.",
      "Concrete footings and anchor posts are no problem. Post concrete gets priced with the load, and footings that can't come out cleanly can be cut at grade so you can sod or landscape right over the spot.",
    ],
    localHeading: "Parker's Local Shed Tear-Down Crew",
    localText: [
      "Because we live and work in Parker, we can usually get to a shed removal faster than anyone — often within a few days, and same-week is normal. We've torn down sheds in Canterberry, Cottonwood, Hidden River, Idyllwilde and just about every Parker neighborhood in between, so tight side yards, shared fences and HOA sightlines are nothing new to us.",
      "A lot of Parker sheds sit on gravel beds or old pavers rather than concrete. We'll tell you honestly what the ground under yours needs — sometimes the cleanest finish is hauling the gravel too, and we'll include that in the quote if you want the spot fully reset for grass, a garden bed or a new shed.",
    ],
    faqs: [
      [
        "How much does shed removal cost in Parker?",
        `Most Parker shed tear-downs run [[load:4]] to [[load:8]]. A small metal shed with easy access sits at the low end; a large wood shed full of stored junk sits at the high end. Text photos to ${PHONE} and we'll give you a firm price.`,
      ],
      [
        "Do you haul away what was inside the shed too?",
        "Yes — we clear out the contents first and price everything as one load. Old tools, lawn equipment, shelves and boxes all go in the trailer with the shed itself.",
      ],
      [
        "What about the concrete footings or slab?",
        "Post concrete gets priced with the load. Footings that won't come out cleanly can be cut at grade so you can landscape over the spot. Full slab removal is available too — just mention it when you send photos.",
      ],
    ],
  },
  "aurora/deck-and-fence-removal": {
    description:
      "Deck and fence tear-out in Aurora, CO. 300+ decks of construction experience — we demolish, haul and dispose of old decks, rails and fence lines. Free quotes, one price up front.",
    intro: [
      "Aurora's housing boom left thousands of aging cedar decks and leaning privacy fences, and we tear them out every week — from the older neighborhoods near Heather Ridge and Buckingham to newer builds out by Southlands where builders' grade decks are already failing.",
      "This isn't a side service for us. Our crew comes from construction with 300+ decks of hands-on experience, so we know exactly how a deck is put together — ledger boards, joist hangers, footings and all — which means we take it apart fast, safely, and without damaging your house.",
      "Deck and fence removal in Aurora is priced by trailer volume with a [[min]] minimum, and most full deck tear-outs run $800 to $2,500 depending on size, height and whether you want the footings pulled. Text photos for a firm quote before we start.",
    ],
    localHeading: "Deck & Fence Tear-Out Across Aurora",
    localText: [
      "We work all over Aurora's 160 square miles — second-story decks in Saddle Rock, ground-level cedar decks in Meadowood and Mission Viejo, and long fence lines along the Buckley corridor where wind does half the demolition for you. Tight lots, alley access and shared fence lines with neighbors are everyday situations for our crew.",
      "If you're replacing the deck, we coordinate timing with your contractor so the old structure is gone before the new build starts. If you're just reclaiming the yard, we can pull the footings, haul the concrete, and leave you a clean, level spot ready for sod or a patio.",
    ],
    faqs: [
      [
        "How much does deck removal cost in Aurora?",
        `Most full deck tear-outs in Aurora run $800 to $2,500 depending on size, height off the ground, and footing removal. Fence lines are priced by the trailer load with a [[min]] minimum. Text photos to ${PHONE} for a firm quote.`,
      ],
      [
        "Will tearing off the deck damage my house?",
        "No — our crew has 300+ decks of construction experience, so we know how ledger boards are flashed and fastened. We detach the deck from the house carefully and leave the rim and siding intact.",
      ],
      [
        "Do you remove the concrete footings too?",
        "Yes. Footings can be pulled and hauled with the load, or cut at grade if you'd rather landscape over them. Just let us know which you prefer when we quote the job.",
      ],
    ],
  },
  "denver/furniture-removal": {
    title: "Furniture Removal Denver CO | EZ Haulaway LLC – Fast, Free Estimates",
    description:
      "Furniture removal in Denver, CO. Couches, sectionals, mattresses & dressers hauled from inside your home. Upfront prices, free estimate. Book today!",
    intro: [
      "Need **furniture removal in Denver**? We pick up couches, sectionals, recliners, dressers, mattresses, bed frames and dining sets from inside your home, apartment, condo or office — and haul everything away in the same visit. From Capitol Hill walkups and LoDo lofts to bungalows in Wash Park and ranch homes in Harvey Park, our crew handles Denver furniture removal every week.",
      "You don't move anything to the curb. Two of us carry it down the stairs, out of the basement or through the hallway, and load it onto our 16-foot trailer. We do **all the heavy lifting** — you just point at what goes.",
      "A single couch or mattress falls under our **[[min]] minimum**. Bigger furniture removal jobs are priced by trailer space, up to **[[load:8]] for a full load**. Labor, hauling and disposal are always included in the price we quote — no hidden fees, no stair charges.",
    ],
    localHeading: "Couch and Sofa Removal Across Denver Neighborhoods",
    localText: [
      "Denver furniture removal jobs come with old bungalow basements, third-floor walkup apartments and alley-only access. We plan the route before we lift, and we protect floors, railings and door frames on the way out. Tight stairwells in Baker, narrow doorways in Congress Park, freight elevators downtown — we've worked through all of it.",
      "Wondering how to **get rid of large furniture** the city won't take? Denver's scheduled large-item pickup only covers curbside items, and you do the dragging. Our **junk removal** crew is the full-service option: we **handle the heavy lifting** from wherever the piece sits, so you never touch it. If you'd rather save a little, we also **offer curbside furniture pickup** — leave it out front and we'll swing by, load it and **haul away** everything in one stop.",
      "**Bulky furniture** is our specialty. Sleeper sofas with metal frames, oversized sectionals, solid-wood armoires, piano benches, box springs that won't bend around a landing — if it fits through the door, we'll get it out. Our **haul away services** cover single pieces all the way up to whole-house furniture disposal, priced by the trailer space your items take up.",
      "Every quote is **upfront pricing**: trailer-space rates that include labor, hauling and disposal, with **no hidden disposal fees** and no surprise charges at the door. Usable pieces go to local **furniture donation pickup** partners when we can, and we **recycle old furniture** — metal frames, springs and clean wood — to keep landfill waste down. That's removal and disposal services done the right way.",
      "**Furniture removal in Denver** often means more than one piece. Clearing a whole room, downsizing before a move, or emptying a rental between tenants? We price the whole job by trailer space so a couch, two dressers and a mattress cost less than booking three separate pickups.",
      "Furniture in good shape goes to **donation** whenever we can, so usable pieces stay in the community. Broken items get sorted, and metal frames and springs go to **recycling** instead of the landfill. Want a price before you book? Send a photo through our free instant estimate and you'll see your number in about a minute.",
      "Scheduling is simple: call or text, send photos, and we'll give you a firm price and the soonest available window. Because we're in Denver every week, most furniture removal jobs are on the calendar within a few days — and we show up when we say we will.",
      "**Office furniture removal** is a big part of our Denver work. Desks, cubicle panels, conference tables, filing cabinets and stacks of chairs come out of offices in Cherry Creek, the Tech Center and downtown. We work early or late so your team keeps working.",
      "Clearing out a loved one's home? **Estate furniture removal** is handled with care. We take the bedroom sets, china cabinets, recliners and patio furniture, set aside anything you want to keep, and send usable pieces to **donation**.",
      "Our **family-owned**, **licensed and insured** crew treats every Denver home like our own. Send a photo for a **free estimate** and get your price in about a minute.",
    ],
    faqs: [
      [
        "How much does furniture removal cost in Denver?",
        "A single couch or mattress falls under our [[min]] minimum. Couches are priced per cushion at [[item:Couch]], and bigger jobs are priced by trailer space up to [[load:8]] for a full load. Text photos to " + PHONE + " for a firm price before any work starts.",
      ],
      [
        "Can you remove furniture from an upstairs apartment?",
        "Yes. We carry furniture down stairs and out of apartments and condos all over Denver. Let us know about elevators, parking rules or tight stairwells when you book so we bring the right crew and equipment.",
      ],
      [
        "Do you take sleeper sofas and sectionals?",
        "Yes. Sleeper sofas and sectionals are some of our most common Denver pickups. We take them apart if that's needed to get them out the door.",
      ],
      [
        "What happens to my old furniture after you haul it?",
        "Usable furniture goes to local donation centers when we can. Pieces that are broken or worn out get sorted, and metal frames and springs go to recycling. Only what truly can't be reused goes to the landfill.",
      ],
    ],
  },
  "denver/mattress-and-bulky-item-removal": {
    title: "Mattress Removal & Large Item Pickup Denver CO | EZ Haulaway",
    h1: "Mattress Removal Denver",
    description:
      "Mattress removal and large item pickup in Denver, Colorado. Mattresses, couches and bulky items carried out from any room. Upfront pricing, free estimate.",
    sections: [
      {
        heading: "Large Item Pickup in Denver, Colorado",
        paragraphs: [
          "Need **large item pickup in Denver**? Beyond mattresses, we pick up couches, sectionals, recliners, dressers, armoires, treadmills, pianos, hot tubs, appliances and playsets. If two people can carry it and it isn't hazardous, we can usually take it.",
          "Denver's city large-item collection only takes what you set out at the curb or alley, on a set schedule. We come inside, carry the item out and haul it away, often the same week you call.",
          "One big item usually falls under our [[min]] minimum. Couches are about [[item:Couch]] per cushion, treadmills about [[item:Treadmill]] and pianos start around [[item:Piano]]. Several large items are priced together by trailer space, up to [[load:8]] for a full load.",
        ],
        subsections: [
          { heading: "Heavy and awkward items", text: "Pianos, sleeper sofas and solid-wood furniture need more hands and the right straps. Tell us about stairs and tight turns so we plan the carry-out." },
          { heading: "Large item pickup for move-outs", text: "Moving out of a Denver apartment or house? We clear everything that isn't going with you in one trip, so the unit is ready for cleaning." },
        ],
      },
    ],
    intro: [
      "Need **mattress removal in Denver**? We pick up old mattresses, box springs, bed frames and other bulky items from any room in your home — bedroom, basement or third-floor walkup — and haul them away in one visit. No dragging a mattress to the curb, no renting a truck.",
      "Our two-person crew does **all the heavy lifting**. We carry the mattress down the stairs, through the hallway and out to our 16-foot trailer, then sweep up before we leave. You just show us what goes.",
      "A mattress is **[[item:Mattress]]** and a box spring is **[[item:Box spring]]**. Add more items and the job is priced by trailer space, starting at our **[[min]] minimum**. Labor, hauling and disposal are included — **no hidden fees**.",
    ],
    localHeading: "Mattress Disposal, Box Spring Removal and Bulky Item Pickup Across the Denver Metro Area",
    localText: [
      "**Old mattress removal** in Denver usually means tight spaces. Narrow stairwells in Capitol Hill, basement bedrooms in Wash Park bungalows, freight elevators in LoDo and RiNo lofts — we plan the way out before we lift and protect walls, railings and door frames.",
      "We take every size: **twin, full, queen, king and California king mattresses**, plus box springs, memory foam, hybrid and pillow-top beds, futon mattresses, cribs and adjustable bases. Bed frames and headboards go too, and we'll take them apart if needed.",
      "**Mattress recycling** matters to us. Mattresses take up a huge amount of landfill space, so we separate steel springs, foam and wood for recycling whenever possible. Clean, usable mattresses go to local **donation** partners when they'll accept them.",
      "Beyond mattresses, our **bulky item removal** covers treadmills ([[item:Treadmill]]), pianos (from [[item:Piano]]), sofas, recliners, dressers, armoires and exercise equipment — anything too big or heavy to handle yourself.",
      "Moving out of a Denver apartment, swapping in a new bed, or clearing a rental between tenants? We handle **same-week mattress pickup** for homeowners, renters and property managers, and we price multi-item jobs together so you save versus separate pickups.",
      "Getting a price is easy: text a photo or use our free instant estimate. You'll get **upfront pricing** before we start, and we show up on time in the window we give you.",
      "Searching for mattress removal Denver homeowners actually recommend? Our **family-owned**, **licensed and insured** crew from Parker works Denver neighborhoods every week — Highland, Sloan's Lake, Park Hill, Stapleton, University and Washington Virginia Vale included.",
      "**Box spring disposal** is part of the job. Box springs are bulky, awkward and full of wood and steel, so we load them right alongside the mattress. **Bed frame removal** is included too — metal rails, wooden platforms, bunk beds, daybeds and trundles. We bring the tools to take them apart.",
      "Why not just leave it in the alley? Denver's large-item program has limits on what and when, and a mattress left out in rain or snow gets heavy, moldy and impossible to donate. Booking a **mattress pickup** keeps it out of the alley and off your to-do list.",
      "Bed bug concerns or a stained mattress? Let us know when you book. We wrap and load it carefully so nothing touches the rest of your home, and it goes straight to disposal instead of donation.",
      "Property managers and landlords: we clear **multiple mattresses** from rentals, Airbnbs and student housing in one trip, with one invoice and photos when the job is done.",
      "Hotels, senior living and furniture stores swapping out beds can book **bulk mattress removal** too. Larger jobs are priced by trailer space, from **[[load:2]]** for a quarter trailer up to **[[load:8]]** for a full load.",
      "**Alley and street parking in Denver.** Many Denver homes have alley-access garages, and streets in neighborhoods like Baker, Cheesman Park and Congress Park fill up fast. We plan where the trailer goes before we arrive, use the alley when we can, and keep the load moving so we're not blocking neighbors or garbage trucks.",
      "**High-rise and condo pickups.** Downtown, Cherry Creek and Union Station buildings often require elevator reservations, loading dock times and certificate of insurance paperwork. Let us know the building rules when you book. We work within your reserved time, pad the elevator if needed, and carry the mattress straight through to the trailer.",
      "**Student moves and dorm changeouts.** Around the University of Denver and Auraria campus, end-of-semester moves leave behind a lot of twin XL mattresses, futons and cheap bed frames. We clear rentals and student housing quickly so landlords can clean and re-lease before the next term.",
      "**Keeping mattresses out of the landfill.** A single mattress takes up a lot of landfill space and breaks down very slowly. When a recycler accepts them, the steel, foam, fiber and wood get recovered and reused. That's why we sort mattresses from the rest of the load instead of tossing everything together.",
      "**Same-day questions, same-week pickup.** Text a photo of what needs to go and we'll reply with a price. Most Denver jobs get scheduled within a few days, and same day pickup is sometimes open, with an arrival window that fits your plans.",
      "**Colorado mattress recycling and eco friendly disposal.** Colorado mattress recycling has grown fast, with recyclers such as Spring Back Colorado taking apart old mattresses so steel, foam and fabric can be reused. When a recycler accepts the load, our old mattress drop-offs go there instead of the landfill. That eco friendly disposal keeps a queen mattress or a full mattress and box spring set from filling Denver's solid waste management system. We serve the whole Denver metro, including Commerce City, Aurora, Lakewood and Englewood.",
      "**Mattress and box spring sets, priced together.** Most calls are for a mattress and box spring, often a queen mattress with a metal frame. We load the whole set at once, and responsible disposal is part of every job. This is mattress disposal and junk removal from one local crew, with no dumpster and no curbside wait.",
      "**Bed bugs and old mattress disposal.** If you suspect bed bugs, tell us when you book. We wrap the old mattress before carrying it out, and it goes to disposal instead of donation. Commerce City and Denver metro apartments get the same careful handling.",

      "Our promise is simple: **on-time arrival**, **careful carry-out**, **no hidden fees**, and a clean room when we leave. Call or text " + PHONE + " or start your **free instant estimate** today.",
    ],
    faqs: [
      [
        "How much does mattress removal cost in Denver?",
        "A mattress is [[item:Mattress]] and a box spring is [[item:Box spring]]. Larger jobs are priced by trailer space starting at our [[min]] minimum. Text photos to " + PHONE + " for a firm price.",
      ],
      [
        "Do you carry the mattress down the stairs?",
        "Yes. We remove mattresses from any room, including upstairs bedrooms, basements and apartments. You never have to move it yourself.",
      ],
      [
        "What sizes of mattresses do you take?",
        "All of them — twin, full, queen, king and California king, plus box springs, futons, crib mattresses and adjustable bases.",
      ],
      [
        "What happens to my old mattress?",
        "Usable mattresses go to donation when partners accept them. Others are broken down so steel, foam and wood can be recycled, keeping as much as possible out of the landfill.",
      ],
    ],
  },
  "aurora/mattress-and-bulky-item-removal": {
    title: "Mattress Removal Aurora CO | Mattress Disposal & Pickup | EZ Haulaway",
    h1: "Mattress Removal Aurora",
    description:
      "Mattress removal in Aurora, CO. We carry out mattresses, box springs, bed frames and bulky items from any room, then donate or recycle. Upfront pricing, free estimate.",
    intro: [
      "Need **mattress removal in Aurora**? We pick up old mattresses, box springs, bed frames and other bulky items from any room in your home — upstairs bedroom, basement or apartment — and haul everything away in one visit. No dragging it to the curb and no truck rental.",
      "Our **family-owned crew** does **all the heavy lifting**. We carry the mattress down the stairs, out the door and onto our 16-foot trailer, then sweep up before we go. You just show us what goes.",
      "A mattress is **[[item:Mattress]]** and a box spring is **[[item:Box spring]]**. Add more items and the job is priced by trailer space, starting at our **[[min]] minimum**. Labor, hauling and disposal are included — **no hidden fees**.",
      "Looking for mattress removal Aurora residents can book fast? Call or text " + PHONE + " or send a photo through our **free instant estimate** for a price in about a minute.",
    ],
    localHeading: "Mattress Disposal and Bulky Item Pickup Across Aurora",
    localText: [
      "Aurora is big, and we cover all of it — Southlands, Tallyn's Reach, Saddle Rock, Meadowood, Hoffman Heights, Murphy Creek and the apartments along the I-225 corridor. Whether it's a single-family home or a third-floor walkup, we plan the way out before we lift.",
      "We take every size: **twin, full, queen, king and California king mattresses**, plus box springs, memory foam, hybrid and pillow-top beds, futon mattresses, crib mattresses and adjustable bases. **Bed frame removal** is included, and we take frames apart when needed.",
      "**Mattress recycling** matters. Mattresses take up a lot of landfill space, so we send them for recycling when we can, and clean, usable mattresses go to **donation** partners that accept them.",
      "Why not leave it out with the trash? Most Aurora trash haulers and HOAs limit bulky items, and a mattress left outside in rain or snow gets heavy and moldy fast. A scheduled **mattress pickup** keeps it off the curb and out of HOA trouble.",
      "Beyond mattresses, our **bulky item removal** covers treadmills ([[item:Treadmill]]), pianos (from [[item:Piano]]), sofas at [[item:Couch]] per cushion, recliners, dressers, armoires and exercise equipment — anything too big or heavy to handle yourself.",
      "**Landlords and property managers**: we clear multiple mattresses and furniture from rentals and tenant turnovers in one trip, with one invoice. Bigger jobs are priced by trailer space, from **[[load:2]]** for a quarter trailer up to **[[load:8]]** for a full load.",
      "**Bed frames and headboards.** Metal bed frames, wooden platform bed frames, bunk bed frames, daybeds, trundles and headboards all go too. We bring the tools to take bed frames apart in the room, so they fit down the stairs without scraping walls.",
      "**Adjustable bases and heavy beds.** Power adjustable bases, split-king frames and memory foam mattresses can weigh well over 100 pounds. We unplug them, break them down when possible, and carry them out with two people so nothing gets dropped on the stairs or scraped against a wall.",
      "**House vs. apartment pickup.** In Aurora single-family homes, we usually back the trailer up to the driveway and carry the mattress straight out the front door. In apartments and condos along Havana, Iliff and the I-225 corridor, we plan for elevators, stairwells and parking rules before we arrive, and we work quickly so we don't block other residents.",
      "**Moving, upgrading or clearing a rental?** Mattress removal often comes with other jobs. Aurora families getting ready to move, couples upgrading to a king, and landlords turning over a unit can bundle mattresses with couches, dressers, bed frames and other unwanted items in one visit. Bundled junk removal is priced by trailer space, so you save versus booking separate pickups.",
      "**What happens after pickup.** We separate mattresses from the rest of the load. When a recycler accepts them, steel springs, foam and wood get recovered instead of buried. Clean, usable mattresses go to donation centers that accept mattresses. Stained, damaged or bed bug mattresses are wrapped and sent straight to disposal.",
      "**Mattress disposal vs. drop off sites.** Your own city may list drop off sites for bulky items, but many drop off sites don't accept mattresses, and you still need a truck to get there. Donation centers often refuse used mattresses too. Our mattress disposal service skips all of that: we come to you, load it, and handle the drop-off.",
      "**More than mattresses.** Our junk removal crew also hauls unwanted items from the same home — old furniture, garage clutter, yard debris and light construction debris from a bedroom remodel. We don't take hazardous waste like paint, chemicals or propane tanks, but we can point you to Aurora's hazardous waste drop-off options.",
      "**Booking mattress removal in Aurora is simple.** Text a photo, get a price, pick an arrival window and we handle the rest. Same-week mattress pickup is common across Aurora, from Southlands and Saddle Rock to Hoffman Heights and Murphy Creek. Need more than a mattress? Our Aurora junk removal crew clears whole homes too.",
      "Our promise: **upfront pricing**, **on-time arrival**, **careful carry-out** and a clean room when we leave. We're **licensed and insured** and based just down the road in Parker, and our crew does **all the heavy lifting** on every mattress pickup.",

    ],
    faqs: [
      ["How much does mattress removal cost in Aurora?", "A mattress is [[item:Mattress]] and a box spring is [[item:Box spring]]. Larger jobs are priced by trailer space starting at our [[min]] minimum. Text photos to " + PHONE + " for a firm price."],
      ["Do you carry the mattress out of my home?", "Yes. We remove mattresses from any room, including upstairs bedrooms, basements and apartments. You never have to move it yourself."],
      ["What sizes do you take?", "All of them — twin, full, queen, king and California king, plus box springs, futons, crib mattresses and adjustable bases."],
      ["What happens to my old mattress?", "Usable mattresses go to donation when partners accept them. Others go to recycling when possible, keeping as much as we can out of the landfill."],
    ],
  },
  "centennial/electronics-and-e-waste-removal": {
    title: "Electronic Disposal Centennial CO | E-Waste Recycling | EZ Haulaway",
    h1: "Electronic Disposal Centennial",
    description:
      "Electronic disposal in Centennial, CO. TVs, computers, monitors, printers and e-waste picked up from inside your home or office and recycled. Upfront pricing, free estimate.",
    intro: [
      "Need **electronic disposal in Centennial**? We pick up old TVs, computers, monitors, printers, stereo gear, game consoles and boxes of cords from your home, garage or office — and take them to proper **electronics recycling** instead of the landfill.",
      "Colorado bans most electronics from landfills, so you can't just put an old TV or computer in the trash. Our family-owned crew does **all the heavy lifting**, carries it out from any room, and handles the drop-off for you.",
      "Small electronics pickups fall under our [[min]] minimum. Bigger loads are priced by trailer space, and we can take other junk on the same trip. Labor and hauling are included — **no hidden fees**.",
      "Searching for electronic disposal Centennial homes and offices can book this week? Call or text " + PHONE + " or send a photo through our free instant estimate.",
    ],
    localHeading: "Old Electronics Pickup Across Centennial and Arapahoe County",
    localText: [
      "We work all over Centennial — Southglenn, Willow Creek, Piney Creek, Smoky Hill, Cherry Knolls and the business parks near Arapahoe Road and the Tech Center. Basement entertainment centers, home offices and storage closets are our usual starting points.",
      "**What we take**: flat screen TVs and old tube (CRT) TVs, computer monitors, desktop towers, laptops, printers, copiers, fax machines, servers, networking gear, stereo and speaker systems, DVD players, game consoles, microwaves and boxes of cables and chargers.",
      "**Protect your data.** Before pickup, we recommend wiping or removing the hard drive from every computer, and factory-resetting phones and tablets. If you aren't sure how, pull the hard drive and keep it, or ask an IT shop about hard drive destruction. Your personal information should stay with you.",
      "**Drop-off vs. doorstep pickup.** Arapahoe County and the City of Centennial run occasional electronics recycling events, and residents can ask at the Centennial Civic Center about upcoming dates. Those events are great for one small item, but they mean loading your car, finding the date, and dealing with wait times in the drop-off line. If you have a heavy TV, a basement full of old electronics, or no free Saturday, we come to you and carry it out instead.",
      "**Donate what still works.** Working laptops, monitors and small electronics can sometimes go to local charities like the Salvation Army Centennial Corps or other donation centers. Let us know what still powers on and we'll set it aside for donation when a partner will accept it. Everything else goes to a certified electronics recycling outlet.",
      "**Office electronics recycling**: Centennial businesses moving, upgrading or downsizing can clear out computers, monitors, printers and office furniture in one visit. We schedule around your hours to keep downtime low.",
      "**Big-screen and console TVs** are heavy and awkward, especially from a basement. We bring the hands and straps to get them up the stairs safely, without scratching walls or floors.",
      "Responsible disposal is the whole point. We sort old electronics from the rest of the load and take them to recycling outlets where metals, glass and circuit boards get recovered. Arapahoe County residents get the same careful handling whether it's one printer or a full office.",
      "Why hire a crew for old electronics? A CRT TV can weigh over 150 pounds, and older office gear is bulky and sharp-edged. Our team handles the lifting and the drive so you don't risk your back or your car's upholstery. Most Centennial pickups take under an hour once we arrive.",
      "Our promise: **upfront pricing**, on-time arrival and a clean space when we leave. We're **licensed and insured** and based just down the road in Parker, so same-week pickup is common across Centennial and the rest of Arapahoe County.",
    ],
    faqs: [
      ["How much does electronic disposal cost in Centennial?", "A small pickup falls under our [[min]] minimum. Larger loads are priced by trailer space, and you'll get a firm price before we load anything. Text photos to " + PHONE + "."],
      ["Can I throw a TV or computer in the trash in Colorado?", "No. Colorado bans most electronics from landfills. We take them to proper e-waste recycling for you."],
      ["Do you take old tube TVs?", "Yes. CRT TVs and console TVs are some of the heaviest items we haul, and we carry them out for you."],
      ["Should I wipe my computer first?", "Yes. We recommend removing or wiping hard drives and resetting phones and tablets before pickup to protect your data."],
    ],
  },
  "denver/appliance-removal": {
    title: "Appliance Removal Denver CO | Fridge Removal & Disposal | EZ Haulaway",
    h1: "Appliance Removal Denver",
    description:
      "Appliance removal and fridge removal in Denver, CO. Washers, dryers, stoves and freezers carried out and recycled. Upfront pricing, free estimate.",
    intro: [
      "Need **appliance removal in Denver**? We haul refrigerators, freezers, washers, dryers, stoves, dishwashers and water heaters from your kitchen, basement or garage.",
      "We do the lifting, use dollies and straps on the stairs, and protect your floors on the way out.",
      "Appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] each depending on size, and a single item falls under our [[min]] minimum. Fridges and freezers with Freon have a [[adj:freon]] handling fee.",
    ],
    localHeading: "Old Appliance Pickup Anywhere in Denver",
    localText: [
      "Replacing a kitchen or laundry set? We can take the old appliances plus any other junk from the remodel in the same trip, priced by trailer space.",
      "Denver homes make appliances hard to move. Bungalow basements in Washington Park and Platt Park have steep, narrow stairs. Capitol Hill walkups have tight landings. Alley garages in Highland and Berkeley hold old garage fridges and chest freezers. We plan the route out before we lift.",
      "Appliances go to metal recycling whenever possible instead of the landfill. Send a photo through the instant estimate for a quick price.",
    ],
    sections: [
      {
        heading: "Fridge Removal in Denver",
        paragraphs: [
          "**Fridge removal** is our most common Denver appliance job. We take full-size, side-by-side, French door and garage fridges, plus mini fridges and chest freezers. Empty the food, unplug it a day early so it defrosts, and shut off the ice-maker line. We do the rest.",
          "A full-size refrigerator is about [[item:Refrigerator (full size)]] and a side-by-side is about [[item:Refrigerator (side by side)]]. The [[adj:freon]] fee covers proper handling of the refrigerant.",
        ],
      },
      {
        heading: "Appliance Disposal and Recycling",
        paragraphs: [
          "Denver's regular trash pickup won't take most appliances, and new-appliance delivery crews often take the old one only from the curb. Our **appliance disposal** service comes inside and carries it out for you.",
          "**Appliance recycling** is part of every job. Fridges and freezers go to recyclers that recover the refrigerant first. Washers, dryers, stoves and water heaters go to scrap metal recycling, so the steel and copper get reused.",
        ],
      },
      {
        heading: "Before Your Appliance Pickup",
        paragraphs: [
          "Unplug the appliance and shut off any water line. Gas stoves, gas dryers and gas water heaters should be disconnected by a pro before we arrive. Tell us about stairs, elevators or alley access when you book so we bring the right crew.",
        ],
      },
    ],
    faqs: [
      [
        "How much does appliance removal cost in Denver?",
        "Most appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]]. A single item falls under our [[min]] minimum. Fridges and freezers add a [[adj:freon]] Freon fee.",
      ],
      [
        "Do I need to disconnect my appliance first?",
        "It's best to unplug it and shut off the water to a washer or fridge line. Gas appliances should be disconnected by a pro before we arrive.",
      ],
      [
        "Where do old appliances go?",
        "We take them to metal recycling whenever possible, so they don't end up in a landfill.",
      ],
      [
        "How do I get rid of a refrigerator in Denver?",
        "Empty it, unplug it and book fridge removal. We carry it out of the kitchen, basement or garage and take it to a recycler that handles the refrigerant.",
      ],
    ],
  },
  "parker/appliance-removal": {
    title: "Appliance Removal Parker CO | Fridge Removal & Disposal | EZ Haulaway",
    h1: "Appliance Removal Parker",
    description:
      "Appliance removal and fridge removal in Parker, CO from a local Parker crew. Washers, dryers, stoves and freezers carried out and recycled. Free quotes.",
    intro: [
      "Need **appliance removal in Parker**? We're based here, so old fridges, freezers, washers, dryers, stoves, dishwashers and water heaters are usually on our trailer within a few days.",
      "Our crew carries the appliance out of the kitchen, laundry room, basement or garage. You don't drag anything to the curb.",
      "Appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] each, a single item falls under our [[min]] minimum, and fridges and freezers have a [[adj:freon]] handling fee.",
    ],
    localHeading: "Fridge Removal and Appliance Disposal Across Parker",
    localText: [
      "We pick up appliances in Stonegate, Pradera, Idyllwilde, Clarke Farms, The Pinery, Canterberry Crossing and every Parker neighborhood in between. Walkout basements, second-floor laundry rooms and three-car garages full of old freezers are routine.",
      "**Fridge removal** is the job we get most. Empty the food, unplug it a day early and shut off the ice-maker line. We handle the dolly, stairs and loading.",
      "**Appliance disposal** done right means **appliance recycling**. Fridges and freezers go to recyclers that recover the refrigerant, and other appliances go to scrap metal recycling instead of the landfill.",
      "Remodeling a kitchen or laundry room? Add the old cabinets, countertops and boxes to the same trip. Bigger loads are priced by trailer space, from [[load:2]] for a quarter load to [[load:8]] for a full load.",
    ],
    faqs: [
      [
        "How much does appliance removal cost in Parker?",
        "Most appliances run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]]. A single item falls under our [[min]] minimum, and fridges and freezers add a [[adj:freon]] fee.",
      ],
      [
        "Will Parker trash pickup take my old fridge?",
        "Usually not with regular trash. Book fridge removal and we carry it out and take it to recycling.",
      ],
      [
        "Do I need to disconnect the appliance?",
        "Unplug it and shut off any water line. Gas appliances should be disconnected by a pro before we arrive.",
      ],
    ],
  },
};
const CUSTOM_PAGES = priced(RAW_CUSTOM_PAGES);

export const Route = createFileRoute("/service-areas/$city_/$service")({
  loader: ({ params }) => {
    const location = locationBySlug(params.city);
    const service = serviceBySlug(params.service);
    if (!location || !service || service.cityPages === false) throw notFound();
    const custom = CUSTOM_PAGES[`${params.city}/${params.service}`] ?? null;
    return { location, service, custom };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found — EZ Haulaway" }, { name: "robots", content: "noindex" }] };
    }
    const { location, service, custom } = loaderData;
    const url = `${SITE_URL}/service-areas/${params.city}/${params.service}`;
    const title = custom?.title ?? `${service.name} ${location.city} CO | EZ Haulaway`;
    const description =
      custom?.description ??
      `${service.name} in ${location.city}, Colorado. ${service.summary} Local, family-owned crew from Parker. Free quotes — call or text ${PHONE}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${service.name} in ${location.city}, CO`,
            serviceType: service.name,
            url,
            description,
            areaServed: { "@type": "City", name: `${location.city}, CO` },
            provider: BUSINESS_SCHEMA,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
              { "@type": "ListItem", position: 3, name: location.city, item: `${SITE_URL}/service-areas/${params.city}` },
              { "@type": "ListItem", position: 4, name: service.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: CityServicePage,
  notFoundComponent: CityServiceNotFound,
});

function CityServiceNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-extrabold">We couldn’t find that page</h1>
        <p className="mt-4 text-muted-foreground">Pick your city to see every service we offer there.</p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/service-areas">View Service Areas</Link>
        </Button>
      </div>
    </PageShell>
  );
}

function CityServicePage() {
  const { location, service, custom } = Route.useLoaderData();
  const photo = locationPhoto(location.slug);
  const city = location.city;
  const name = service.name;
  const lower = name.toLowerCase();
  const otherServices = services.filter((item) => item.slug !== service.slug);
  const nearby = locations.filter((item) => location.nearby.includes(item.slug));

  const faqs = custom
    ? custom.faqs
    : ([
        [`How much does ${lower} cost in ${city}?`, `We price by how much space it takes in our 16-foot trailer, starting at a [[min]] minimum, and certain heavy items are priced individually. Text photos to ${PHONE} and we'll give you a price before any work starts — no trip charge for ${city}.`],
        [`How soon can you do ${lower} in ${city}?`, `We're based in Parker and work in ${city} every week, so openings often come up within a few days. Call or text for the soonest slot.`],
        ...service.faqs.slice(0, 3),
      ] as Array<[string, string]>);

  const introParagraphs = custom ? custom.intro : service.intro;

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span className="px-2">/</span>
            <Link to="/service-areas" className="hover:text-foreground">Service Areas</Link>
            <span className="px-2">/</span>
            <Link to="/service-areas/$city" params={{ city: location.slug }} className="hover:text-foreground">{city}</Link>
            <span className="px-2">/</span>
            <span className="font-semibold text-foreground">{name}</span>
          </nav>
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="size-4" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">{city}, CO · {location.county}</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.1] sm:text-5xl">{custom?.h1 ?? `${name} ${city}`}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Need {lower} in {city}? {service.summary}
            </p>
            <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">{location.local}</p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone /> Call or Text {PHONE}
                </a>
              </Button>
            </div>
          </div>
          <figure className="overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={service.image}
              alt={`${service.imageAlt} — ${lower} in ${city}, CO`}
              width={1200}
              height={800}
              className="aspect-[3/2] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionHeader
              eyebrow={`${name} in ${city}`}
              title={`How ${name} Works in ${city}`}
            />
            <div className="mt-6 space-y-5 leading-8 text-muted-foreground">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{rich(paragraph)}</p>
              ))}
            </div>
            <h3 className="mt-10 font-display text-xl font-bold">What’s included for {city} customers</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-6">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <InlineQuoteForm />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          {service.sections.slice(0, 2).map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{section.heading}</h2>
              <p className="mt-5 leading-8 text-muted-foreground">{section.text}</p>
            </div>
          ))}
          {custom ? (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                {custom.localHeading}
              </h2>
              {custom.localText.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">
                  {rich(paragraph)}
                </p>
              ))}
              {custom.sections?.map((s) => (
                <div key={s.heading} className="mt-10">
                  <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="mt-5 leading-8 text-muted-foreground">{rich(p)}</p>
                  ))}
                  {s.subsections?.map((sub) => (
                    <div key={sub.heading} className="mt-6">
                      <h3 className="text-lg font-bold">{sub.heading}</h3>
                      <p className="mt-2 leading-8 text-muted-foreground">{rich(sub.text)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10">
              <h2 className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
                Why {city} Calls EZ Haulaway
              </h2>
              <p className="mt-5 leading-8 text-muted-foreground">{location.intro}</p>
            </div>
          )}
          {photo && (
            <figure className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
              <img src={photo.src} alt={photo.alt} loading="lazy" width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
              <figcaption className="px-5 py-4 text-sm leading-6 text-muted-foreground">{photo.caption}</figcaption>
            </figure>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <SectionHeader eyebrow="Common questions" title={`${name} in ${city}: Questions`} />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <section className="border-y border-border bg-muted py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="font-display font-bold">More services in {city}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherServices.map((item) => (
              item.cityPages === false ? <Link
                key={item.slug}
                to="/services/$slug"
                params={{ slug: item.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.name}
              </Link> : <Link
                key={item.slug}
                to="/service-areas/$city/$service"
                params={{ city: location.slug, service: item.slug }}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {item.name} {city}
              </Link>
            ))}
          </div>
          {nearby.length > 0 && (
            <>
              <p className="mt-8 font-display font-bold">{name} in nearby towns</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {nearby.map((item) => (
                  <Link
                    key={item.slug}
                    to="/service-areas/$city/$service"
                    params={{ city: item.slug, service: service.slug }}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {name} {item.city}
                  </Link>
                ))}
              </div>
            </>
          )}
          <Link to="/services/$slug" params={{ slug: service.slug }} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
            Full {lower} details and pricing <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <CtaBand title={`Book ${name} in ${city}`} />
    </PageShell>
  );
}
