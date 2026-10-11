import { priced } from "@/lib/price-store";
export type LocationContentSection = {
  heading: string;
  paragraphs: string[];
  list?: { title: string; text: string }[];
  closing?: string;
};

export type Location = {
  slug: string;
  city: string;
  county: string;
  metaTitle?: string;
  metaDescription?: string;
  intro: string;
  local: string;
  nearby: string[];
  topServices: string[];
  content?: LocationContentSection[];
};

const raw_locations: Location[] = [
  {
    slug: "parker",
    city: "Parker",
    county: "Douglas County",
    metaTitle: "Junk Removal Parker CO | EZ Haulaway LLC – Fast, Free Estimates",
    metaDescription:
      "Local junk removal in Parker, CO by a family-owned crew. Furniture, appliances, hot tubs & garage cleanouts hauled away fast. Get a free quote!",
    intro:
      "Parker is home base. EZ Haulaway is a family-owned **junk removal Parker** crew serving all of **Douglas County**, so every job here is in our own neighborhood.",
    local:
      "Between newer subdivisions still filling in and established neighborhoods finally replacing that twenty-year-old deck, Parker keeps us busy with everything from single mattress pickups to full garage cleanouts.",
    nearby: ["lone-tree", "castle-rock", "centennial", "franktown", "castle-pines", "sedalia", "elizabeth"],
    topServices: ["deck-and-fence-removal", "garage-cleanouts", "hot-tub-removal"],
    content: [
      {
        heading: "Parker Junk Removal: Common Questions",
        paragraphs: [
          "Most Parker homeowners ask the same few things before they book. Here are straight answers.",
        ],
        list: [
          { title: "How much does junk removal cost in Parker?", text: "We price by trailer space. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, and dump fees are included." },
          { title: "Does Parker trash service take big items?", text: "Most Parker trash haulers and HOAs limit bulky items like couches, mattresses, and appliances. We take them, plus anything else you need gone." },
          { title: "How fast can you come?", text: "We're based in Parker, so same-day or next-day pickup is often possible. Call or text and we'll give you the soonest time." },
          { title: "Do you serve acreage and rural Parker?", text: "Yes. Larger lots out toward Franktown and Elizabeth are a regular stop for brush piles, old fencing, and shed tear-downs." },
          { title: "Do I have to be home?", text: "Not always. For curbside or garage pickups, you can pay by phone and we'll text you when it's done." },
        ],
        closing: "Want a price now? Use our free instant estimate with a few photos.",
      },
      {
        heading: "What Parker Junk Removal Includes",
        paragraphs: [
          "Our **junk removal services** include the lifting, loading, hauling, and disposal fees. We carry items out of the garage, basement, backyard, or upstairs bedroom. You don't drag anything to the curb.",
          "Common jobs include couch and mattress pickups, **garage and basement cleanouts**, old hot tubs, sheds, decks, fences, and yard debris. Usable items go to donation, and metal goes to recycling when we can.",
          "Need **junk removal Parker** homeowners can count on? We're local to **Douglas County, Colorado**, and our **junk removal services** cover basement cleanouts, move-outs, and single-item pickups alike.",
        ],
      },
      {
        heading: "Affordable Junk Removal Services in Parker, CO",
        paragraphs: [
          "Our junk removal services in Parker are priced by how much space your items take in the trailer. That keeps pickup affordable for a single couch and fair for a full house cleanout. You get a free estimate before we load anything, and the price we agree on is the price you pay.",
          "We're a local, family-owned crew, not a franchise call center. When you call or text, you reach the people who show up. That makes scheduling simple and communication clear from start to finish.",
        ],
        list: [
          { title: "Single-item pickup", text: "One old sofa, recliner, mattress, or treadmill. Pickups start at [[min]]." },
          { title: "Partial loads", text: "A few rooms of furniture or a garage corner. A half trailer runs about [[load:4]]." },
          { title: "Full cleanouts", text: "Estate, move-out, and whole-house cleanouts. A full trailer is about [[load:8]]." },
        ],
      },
      {
        heading: "Parker Neighborhoods We Serve",
        paragraphs: [
          "We haul junk all over Parker every week, including Stonegate, The Pinery, Idyllwilde, Compark, Canterberry Crossing, Clarke Farms, Bradbury Ranch, and the homes around Mainstreet and the Cherry Creek Trail. We also cover acreage out toward Hilltop Road and the county line.",
          "HOA neighborhoods often limit how long a pile can sit in the driveway. We schedule a tight arrival window and clear it in one visit, so nothing sits out for days.",
        ],
      },
      {
        heading: "How Our Parker Junk Removal Works",
        paragraphs: [
          "Booking takes a few minutes. Text a few photos or use the instant estimate, pick a time, and our crew shows up ready to work. We walk the job with you, confirm the price, and handle all the heavy lifting.",
          "We protect floors, door frames, and walls with blankets and careful carrying. After the trailer is loaded, we sweep the area so your garage or yard is clean when we leave.",
        ],
      },
      {
        heading: "Where Your Parker Junk Goes",
        paragraphs: [
          "We sort every load. Good furniture and household goods go to local donation centers. Metal, appliances, and electronics go to recycling. Only what's left goes to the landfill. It's a responsible way to clear your space and keep usable items out of the trash.",
        ],
        closing: "Ready to clear it out? Get a free estimate from Parker's local junk removal crew today.",
      },
    ],
  },
  {
    slug: "castle-rock",
    city: "Castle Rock",
    county: "Douglas County",
    metaTitle: "Junk Removal Castle Rock CO",
    metaDescription:
      "Junk removal in Castle Rock, CO — sheds, fences, hot tubs, yard debris and full cleanouts. Fast scheduling from our Parker base. Free quotes.",
    intro:
      "Castle Rock sits just down I-25 from our shop in Parker, which makes it one of the easiest areas for us to schedule quickly.",
    local:
      "Larger lots mean larger projects here — sheds, fence lines, landscaping debris, and hot tubs that have not been filled in years.",
    nearby: ["parker", "lone-tree", "highlands-ranch", "franktown", "sedalia", "elizabeth"],
    topServices: ["light-demolition", "yard-and-landscaping-debris", "deck-and-fence-removal"],
  },
  {
    slug: "centennial",
    city: "Centennial",
    county: "Arapahoe County",
    metaTitle: "Junk Removal Centennial CO | Same-Week Pickup | EZ Haulaway",
    metaDescription:
      "Junk removal in Centennial, CO — appliances, furniture, construction debris and property cleanouts. Local crew, free quotes from EZ Haulaway.",
    intro:
      "Centennial is a short run from Parker and a regular stop for household junk removal and property cleanouts.",
    local:
      "Many Centennial homes are at the age where kitchens and basements are getting remodeled, which means appliances, cabinets, and construction debris heading out the door.",
    nearby: ["lone-tree", "englewood", "littleton"],
    topServices: ["appliance-removal", "construction-debris-removal", "furniture-removal"],
    content: [
      {
        heading: "Junk Removal Centennial Homeowners Actually Call Back",
        paragraphs: [
          "Centennial covers a lot of ground, and the work changes block to block. Around Southglenn and Willow Creek our **junk removal Centennial** crew is usually hauling out the results of a remodel — old kitchen cabinets, a cast iron tub, vanity tops, and a garage full of scrap lumber and drywall offcuts. Out toward Smoky Hill and Piney Creek the calls lean residential: basements that have been collecting furniture for twenty years, treadmills nobody has touched since the kids moved out, and patio sets that did not survive another Colorado winter.",
          "We load everything by hand from wherever it sits — **all the heavy lifting** is on us. You do not have to drag a sleeper sofa up the basement stairs or wrestle a refrigerator into the driveway before we show up. Our crew brings furniture blankets and floor protection, carries it out, sweeps the space, and leaves with it in one trip.",
        ],
      },
      {
        heading: "Remodel and Construction Debris Removal in Centennial",
        paragraphs: [
          "A remodel generates more waste than most people plan for, and city trash service will not touch it. We haul **construction debris** like drywall, tile, carpet and pad, trim, scrap framing lumber, cabinets, countertops, fixtures, and broken concrete from patios and walkways. If you are working with a contractor, we can come mid-project to clear the pile so the crew keeps moving, then come back at the end for the final load.",
        ],
        list: [
          {
            title: "Appliance disposal",
            text: "Refrigerators, washers, dryers, dishwashers, and ranges run [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] each and go to metal recycling rather than a landfill.",
          },
          {
            title: "Basement and garage cleanouts",
            text: "Decades of boxes, shelving, old paint cans that are fully dried, exercise equipment, and furniture cleared in a single visit.",
          },
          {
            title: "Hot tubs and decks",
            text: "We cut down and haul old spas starting around [[item:Hot tub]], and we have torn out more than 300 decks across the south metro.",
          },
          {
            title: "Furniture and mattresses",
            text: "Mattresses are [[item:Mattress]], box springs [[item:Box spring]], and sectional couches are priced per cushion at [[item:Couch]].",
          },
        ],
      },
      {
        heading: "How Fast Can You Get to Centennial?",
        paragraphs: [
          "Centennial is a short drive from our base in Parker, so **same-week pickup** is normal and next-day often works. We give you an arrival window, and you get a price before we load anything.",
        ],
      },
      {
        heading: "Responsible Disposal and Donation",
        paragraphs: [
          "We sort every Centennial load. Usable furniture goes to **donation**, appliances and metal go to **recycling**, and only what can't be reused goes to a licensed disposal site. Our **family-owned**, **licensed and insured** crew treats your home like our own.",
          "We also help **property managers**, realtors and small businesses near the Arapahoe Road and Dry Creek corridors with tenant turnovers, office furniture removal and storage unit cleanouts.",
        ],
      },
      {
        heading: "Straight Pricing Before We Load Anything",
        paragraphs: [
          "Our 16-foot by 8-foot dump trailer holds about 14 cubic yards — roughly the same as a small roll-off dumpster, except we do all the lifting and it leaves the same day. A minimum load starts at [[min]], a quarter trailer runs [[load:2]], half is [[load:4]], three-quarters is [[load:6]], and a completely full trailer is [[load:8]]. We quote the price on site before a single item goes on the trailer, and that number is what you pay — **no hidden fees**.",
        ],
        closing:
          "Call or text us for a same-week slot in Centennial, or send photos through our instant estimate tool for a ballpark in minutes.",
      },
      {
        heading: "Centennial Neighborhoods We Serve Every Week",
        paragraphs: [
          "Our **Centennial junk removal** crew works in **Southglenn**, **Willow Creek**, **Homestead**, **Piney Creek**, **Cherry Knolls**, **Walnut Hills**, **Smoky Hill**, and the neighborhoods along the **Foxfield** border. Older ranch homes west of I-25 tend to need **basement cleanouts** and remodel debris hauled away, while newer two-story homes east of Parker Road usually call us for **garage cleanouts**, old playsets, and furniture swaps after a move.",
          "Because Centennial homes often have HOA rules about what can sit on the curb, we come to you instead. There is no dumpster parked in the driveway for a week and no pile waiting for a city bulk pickup. We load from the garage, the backyard, or the basement and leave the same visit.",
        ],
      },
      {
        heading: "Property Cleanouts, Estates, and Move-Outs in Centennial",
        paragraphs: [
          "**Estate cleanouts** and **move-out cleanouts** are some of the biggest jobs we do in Centennial. Families settling a parent's home, landlords turning over a rental, and sellers getting a house ready to list all need the same thing: everything gone fast, handled with care, and priced up front. We separate items worth **donating**, set aside anything you want to keep, and haul the rest in our **16-foot dump trailer**.",
          "For realtors and **property managers**, we can meet a lockbox, send photos when the job is done, and work around showing schedules. One call clears an entire house, garage, and yard so the listing photos look right.",
        ],
      },
    ],
  },

  {
    slug: "highlands-ranch",
    city: "Highlands Ranch",
    county: "Douglas County",
    metaTitle: "Junk Removal Highlands Ranch CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Highlands Ranch, CO — furniture, mattresses, exercise equipment and garage cleanouts. Free quotes from EZ Haulaway.",
    intro:
      "We serve Highlands Ranch several times a week, from single-item pickups to complete garage and basement clearing.",
    local:
      "Storage-heavy homes with finished basements tend to accumulate furniture and exercise equipment nobody uses anymore. Those are some of our most common calls here.",
    nearby: ["littleton", "centennial", "lone-tree"],
    topServices: ["mattress-and-bulky-item-removal", "garage-cleanouts", "furniture-removal"],
    content: [
      {
        heading: "Highlands Ranch Junk Removal: The Quick Answer",
        paragraphs: [
          "EZ Haulaway picks up junk all over Highlands Ranch. We carry it out of your home, garage or yard and haul it away in one visit. Pricing is based on trailer space: [[min]] for a small load up to [[load:8]] for a full trailer, with labor and disposal included.",
        ],
      },
      {
        heading: "What Highlands Ranch Homeowners Call Us For",
        paragraphs: [
          "Highlands Ranch homes have big basements and garages, and they fill up. These are our most common calls here:",
        ],
        list: [
          { title: "Basement furniture", text: "Old sectionals, futons, desks and bookshelves carried up the stairs for you." },
          { title: "Exercise equipment", text: "Treadmills, ellipticals, weight benches and home gyms taken apart and hauled out." },
          { title: "Mattresses", text: "Mattresses run [[item:Mattress]] and box springs [[item:Box spring]], within our [[min]] minimum." },
          { title: "Garage cleanouts", text: "Boxes, shelving, old bikes and yard tools cleared in one trip." },
        ],
      },
      {
        heading: "Working Around HOA Rules",
        paragraphs: [
          "Many Highlands Ranch neighborhoods don't want junk piled at the curb for days. With us, nothing sits outside. We load straight from your garage or house and leave the same visit.",
        ],
        closing:
          "Send photos through our free instant estimate, or call or text us for a same-week slot.",
      },
    ],
  },
  {
    slug: "lone-tree",
    city: "Lone Tree",
    county: "Douglas County",
    metaTitle: "Junk Removal Lone Tree CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Lone Tree, CO — furniture, office cleanouts, electronics and bulky items hauled away. Same-week scheduling and free quotes.",
    intro:
      "Lone Tree is minutes from Parker, so same-week scheduling is usually straightforward.",
    local:
      "We handle a mix of residential cleanouts and commercial work here, including office furniture and tenant turnovers around the business corridors.",
    nearby: ["parker", "centennial", "highlands-ranch", "castle-pines"],
    topServices: ["commercial-junk-removal", "furniture-removal", "electronics-and-e-waste-removal"],
  },
  {
    slug: "denver",
    city: "Denver",
    county: "Denver County",
    metaTitle: "Junk Removal Denver CO | EZ Haulaway – Free Estimates",
    metaDescription: "Junk removal Denver CO: furniture, couches, mattresses, appliances and cleanouts hauled from inside your home. Upfront pricing, free instant estimate.",
    intro:
      "Need **junk removal in Denver**? EZ Haulaway is a local **junk removal service** that hauls furniture, appliances, mattresses and full cleanouts from homes, apartments and offices across Denver. We do all the lifting.",
    local:
      "Denver jobs mean alleys, tight parking and narrow stairs. We plan access before we arrive, so the crew isn't figuring it out in front of your building.",
    nearby: ["englewood", "aurora"],
    topServices: ["furniture-removal", "appliance-removal", "mattress-and-bulky-item-removal", "house-and-estate-cleanouts", "commercial-junk-removal"],
    content: [
      {
        heading: "Denver Junk Removal: The Quick Answer",
        paragraphs: [
          "EZ Haulaway is a local **junk removal company** serving Denver. Two of us show up with a 16-foot dump trailer, carry your junk out from wherever it sits, and **haul it away** the same visit. You get a price before we load anything — **upfront pricing** with no surprise fees at the end.",
          "Whether you need to **get rid of** one couch or clear out an entire house, the process is the same: point at what goes, we **handle the heavy lifting**, and we sweep up before we leave.",
          "Prices are based on how much of the trailer you fill. A small load starts at [[min]] and a full trailer is [[load:8]]. Labor, loading, hauling and disposal are all included.",
        ],
      },
      {
        heading: "How Much Does Junk Removal Cost in Denver?",
        paragraphs: [
          "You pay for space, not hours. Here's how our trailer pricing works in Denver:",
        ],
        list: [
          { title: "Minimum load", text: "[[min]] — one or two bulky items, like a couch or a mattress set." },
          { title: "Quarter trailer", text: "[[load:2]] — a small room or a few pieces of furniture." },
          { title: "Half trailer", text: "[[load:4]] — a one-car garage or a large basement corner." },
          { title: "Three-quarter trailer", text: "[[load:6]] — most of an apartment or a big garage." },
          { title: "Full trailer", text: "[[load:8]] — about 14 cubic yards, a full house or estate cleanout." },
        ],
        closing:
          "Want a number now? Send photos through our free instant estimate and get a price range in about a minute.",
      },
      {
        heading: "What We Haul Away in Denver",
        paragraphs: [
          "If two people can lift it and it's not hazardous, we can usually take it. Our most common Denver jobs:",
        ],
        list: [
          { title: "Furniture and couch removal", text: "Sofas, sectionals, sleeper sofas, recliners, dressers and dining sets — carried down stairs and out of apartments." },
          { title: "Mattress disposal", text: "Mattresses and box springs, plus bed frames we take apart for you." },
          { title: "Appliance removal", text: "Fridges, washers, dryers, stoves and dishwashers, sent to metal recycling when possible." },
          { title: "Cleanouts", text: "Garages, basements, apartments, move-outs and estate cleanouts in one trip." },
          { title: "Office and commercial junk removal", text: "Desks, chairs, cubicles and filing cabinets, scheduled to keep downtime low." },
        ],
        closing:
          "We can't take wet paint, oil, chemicals, asbestos or medical waste.",
      },
      {
        heading: "Why Denver Customers Hire Us Instead of Curbside Pickup",
        paragraphs: [
          "Denver's large-item pickup only takes what you drag to the curb or alley. We come inside. That matters for a third-floor walkup, a basement in an old bungalow, or a couch that barely fit through the door.",
          "We protect floors and door frames, sweep up after, and leave with everything in one trip. Usable furniture goes to **donation** when we can, and metal and appliances go to **recycling** — less of your junk ends up in the landfill. **Responsible disposal** is part of every job, not an upsell.",
        ],
      },
      {
        heading: "Commercial Junk Removal & Construction Debris in Denver",
        paragraphs: [
          "We work with **property managers**, realtors and local **businesses** across Denver — tenant turnovers, office moves, retail cleanouts and storage-unit clears. **Commercial junk removal** is scheduled around your business so downtime stays low, and we can **book online** or by text when you need a fast turnaround.",
          "Remodeling? We handle **construction debris removal** where a roll-off dumpster isn't practical — tight alleys, no driveway space, or a job too small for a container. Drywall, lumber, tile, fixtures and scrap wood from **construction sites** all go in the trailer, and we load it ourselves.",
          "Every job is **full service**: you point at the **unwanted items**, we do the lifting, loading and hauling. It's a **professional service** at a **fair price** — the number we quote is the number you pay, with **no hidden fees** for stairs, distance or disposal.",
        ],
      },
      {
        heading: "Neighborhoods We Serve Across Denver",
        paragraphs: [
          "Our **junk removal services** cover the whole city — Capitol Hill, LoDo, Wash Park, Baker, Congress Park, Harvey Park, Montbello, Green Valley Ranch and everywhere in between. Apartment buildings, historic bungalows, new townhomes and office suites all get the same full-service treatment.",
          "Tight stairwells, freight elevators, alley access, street parking — we've worked around all of it. Tell us the situation when you book and we'll bring the right plan and equipment.",
        ],
      },
      {
        heading: "How Fast Can You Come to Denver?",
        paragraphs: [
          "We're based in Parker, and we schedule Denver jobs every week. **Same-week pickup** is common, and **same-day junk removal** opens up regularly — call or text us, or start with the free instant estimate, and we'll find a time that works.",
          "Every job starts with a firm price before we touch anything, so you know exactly what your Denver junk removal will cost before we load the trailer. One visit and the **unwanted junk** is gone — no dumpster in your driveway, no dump run in your weekend.",
        ],
      },
    ],
  },
  {
    slug: "aurora",
    city: "Aurora",
    county: "Arapahoe & Adams County",
    metaTitle: "Junk Removal Aurora CO | Aurora Junk Removal Services | EZ Haulaway",
    metaDescription:
      "Junk removal in Aurora, CO — rental turnovers, estate cleanouts, appliance and furniture hauling. Fast scheduling and free quotes from EZ Haulaway.",
    intro:
      "Need junk removal in Aurora, CO? Our **junk removal services** cover the whole city, from Southlands out toward the older neighborhoods — and no two junk removal jobs here look alike.",
    local:
      "Rental turnovers and estate cleanouts make up a good share of our Aurora work, alongside everyday appliance and furniture pickups.",
    nearby: ["denver", "centennial"],
    topServices: ["house-and-estate-cleanouts", "appliance-removal", "garage-cleanouts"],
    content: [
      {
        heading: "Junk Removal Aurora Neighborhood by Neighborhood",
        paragraphs: [
          "Aurora is close to 400,000 people spread across two counties, and no two jobs look alike. Out by Southlands and Saddle Rock we mostly clear out garage space, moving-day leftovers, and furniture from homes being listed. Around Heather Ridge and the older stretches off Colfax and Havana we handle rental turnovers, eviction cleanouts, and apartments full of items left behind. Near Buckley we work with military families on short-notice moves, which usually means everything is gone this week.",
          "Because we're based in Parker, Aurora is a straight shot with no travel surcharge. One **family-owned crew** arrives on time, quotes the job in person, and loads it out the same visit — most **customers** tell us it saves a whole weekend of **time**.",
        ],
      },
      {
        heading: "Rental Turnovers, Evictions, and Estate Cleanouts",
        paragraphs: [
          "If you manage property in Aurora, you know the clock starts the moment a unit goes empty. Our junk removal crew clears the whole thing — furniture, mattresses, appliances, carpet, trash bags, and whatever is in the closets — so your cleaners and painters can get in the next day. Property managers are some of our best Aurora **customers**: they text photos to our **phone number**, we confirm the price, and the unit is clear before the next showing. For estate cleanouts, we work slowly and respectfully, set aside what the family wants to keep, and route usable furniture to local donation centers instead of the dump.",
        ],
        list: [
          {
            title: "Tenant turnover cleanouts",
            text: "Full unit clearing including appliances, mattresses, and abandoned belongings, usually completed in one visit.",
          },
          {
            title: "Estate and probate cleanouts",
            text: "Whole-home clearing with donation sorting, so the property is ready for listing or handover.",
          },
          {
            title: "HOA compliance cleanups",
            text: "Junk piles, dead landscaping debris, broken fencing, and driveway clutter cleared before a deadline hits.",
          },
          {
            title: "Appliance and bulky item pickup",
            text: "Refrigerators and washers [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]], mattresses [[item:Mattress]], box springs [[item:Box spring]], couches priced at [[item:Couch]] per cushion.",
          },
        ],
      },
      {
        heading: "The Heavy Work Other Aurora Haulers Pass On",
        paragraphs: [
          "Plenty of junk removal companies take bagged trash and call it a day. We also cut down and haul old hot tubs starting around [[item:Hot tub]], tear down sheds, and remove worn-out decks and fence lines — more than 300 decks across the metro. Metal goes to recycling, usable furniture goes to donation, and the rest goes to a licensed transfer station. We cannot take hazardous materials like wet paint, fuel, chemicals, asbestos, and medical waste.",
        ],
      },
      {
        heading: "Why Aurora Customers Choose Our Junk Removal Services",
        paragraphs: [
          "Our junk removal services are **full service** — you point, we lift. Customers call us for **garage cleanouts**, appliance pickups, and whole-home junk removal because one crew handles the stairs, the loading, the sweep-up, and the dump run. It is the easiest way to reclaim your **space** without spending a weekend of your **time** on it. We clear the room and hand the **space** back clean.",
          "Getting a price is simple. Call or text (720) 614-7223 — that **phone number** reaches Ben directly — or send photos through our instant estimate for a junk removal price range in minutes. Either way you get a firm number first, with **no hidden fees**.",
        ],
      },
      {
        heading: "Aurora Junk Removal Pricing",
        paragraphs: [
          "Aurora junk removal is priced by how much space your items take in our 16-foot dump trailer. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, hauling, and dump fees are included, with no extra trip charge for Aurora. Every customer gets the same **upfront junk removal pricing**, whether the job is one mattress or a full **garage**.",
        ],
        closing:
          "Call or text 720-614-7223 for an Aurora junk removal slot, or send photos through our instant estimate for a price range in minutes.",
      },
    ],
  },

  {
    slug: "littleton",
    city: "Littleton",
    county: "Arapahoe & Jefferson County",
    metaTitle: "Junk Removal Littleton CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Littleton, CO — deck and fence tear-outs, basement cleanouts and yard debris hauled away. Free quotes from EZ Haulaway.",
    intro:
      "Littleton mixes long-established neighborhoods with newer development, and both keep our trailer full.",
    local:
      "Older Littleton homes often mean decks and fences well past their service life, plus basements holding decades of stored items.",
    nearby: ["highlands-ranch", "englewood", "centennial", "sedalia"],
    topServices: ["deck-and-fence-removal", "house-and-estate-cleanouts", "yard-and-landscaping-debris"],
    content: [
      {
        heading: "Junk Removal in Littleton, CO",
        paragraphs: [
          "Littleton junk removal with EZ Haulaway is simple: send a photo, get a price, and we carry everything out. We serve homes across Littleton, from the older streets near downtown to newer neighborhoods to the south.",
          "Older Littleton homes often have decks and fences past their prime, plus basements full of stored furniture, boxes, and old appliances. We handle the tear-down and the haul in one visit.",
        ],
      },
      {
        heading: "Littleton Junk Removal: Common Questions",
        paragraphs: ["Here are quick answers to what Littleton homeowners ask most."],
        list: [
          { title: "How much does junk removal cost in Littleton?", text: "We price by trailer space. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, and dump fees are included." },
          { title: "Do you remove decks and fences?", text: "Yes. Ben has taken out more than 300 decks. We tear it down and haul it off in the same visit." },
          { title: "Can you clear out a basement?", text: "Yes. We carry everything up the stairs and out, so you don't lift a thing." },
          { title: "Where does my junk go?", text: "Usable items go to donation, metal goes to recycling, and the rest goes to a licensed disposal site." },
        ],
        closing: "Want a Littleton price now? Use our free instant estimate with a few photos.",
      },
    ],
  },
  {
    slug: "englewood",
    city: "Englewood",
    county: "Arapahoe County",
    metaTitle: "Junk Removal Englewood CO | Furniture & Cleanouts | EZ Haulaway",
    metaDescription:
      "Junk removal in Englewood, CO — furniture, mattresses, small commercial cleanouts and bulky items. Local crew, free quotes.",
    intro:
      "Englewood is a quick trip for us and a frequent stop for both household and small commercial jobs.",
    local:
      "Smaller lots and older homes mean careful access and a lot of hand-carrying. That is normal work for our crew.",
    nearby: ["denver", "littleton", "centennial"],
    topServices: ["furniture-removal", "commercial-junk-removal", "mattress-and-bulky-item-removal"],
    content: [
      {
        heading: "Junk Removal Englewood Homes and Businesses Count On",
        paragraphs: [
          "Need **junk removal in Englewood**? Our **family-owned crew** hauls furniture, mattresses, appliances, garage junk and small business cleanouts from every corner of the city — from the bungalows near Belleview Park and Cornerstone Park to the apartments off Broadway and the shops around CityCenter Englewood.",
          "Englewood lots are small and many homes are older, so most jobs mean **hand-carrying** through narrow side yards, alley garages and steep basement stairs. That is normal work for us. We protect floors and door frames, load everything onto our 16-foot dump trailer, and sweep up before we leave.",
          "You never drag anything to the curb. Point at what goes and we do **all the heavy lifting** — one visit, one price, nothing left behind.",
        ],
      },
      {
        heading: "What Our Englewood Junk Removal Crew Hauls",
        paragraphs: [
          "We take almost anything that isn't hazardous. Here are the jobs we do most often in Englewood:",
        ],
        list: [
          { title: "Furniture and mattresses", text: "Couches at [[item:Couch]] per cushion, mattresses at [[item:Mattress]] and box springs at [[item:Box spring]], plus dressers, recliners and bed frames." },
          { title: "Appliance removal", text: "Fridges, washers, dryers and stoves carried out and sent to **metal recycling** whenever possible." },
          { title: "Garage and basement cleanouts", text: "Boxes, shelving, old bikes, yard tools and years of storage cleared in a single trip." },
          { title: "Small commercial cleanouts", text: "Office furniture, retail fixtures and storage rooms for **Englewood businesses** along Broadway and South Santa Fe." },
          { title: "Rental turnovers", text: "Tenant leftovers cleared fast so **landlords and property managers** can clean and re-list the unit." },
        ],
      },
      {
        heading: "Upfront Junk Removal Pricing in Englewood",
        paragraphs: [
          "We price by how much space your junk takes in our trailer. Pickups start at **[[min]]**, a half trailer is about **[[load:4]]**, and a **full trailer** is about **[[load:8]]**. Labor, loading, hauling and dump fees are all included — **no hidden fees** and no surprise charges at the door.",
          "Want a number now? Send a photo through our **free instant estimate** and you'll see a price in about a minute. We're a short drive from our Parker base, so same-week pickup is common.",
        ],
      },
      {
        heading: "Responsible Disposal for Englewood Customers",
        paragraphs: [
          "We sort every load. Usable furniture goes to **donation**, metal goes to **recycling**, and only what can't be reused heads to a licensed disposal site. Our customers like knowing their old stuff gets a second life when it can.",
        ],
        closing: "Call or text for the soonest Englewood junk removal slot, or start your free instant estimate.",
      },
      {
        heading: "Englewood Junk Removal Along South Broadway",
        paragraphs: [
          "The **South Broadway** corridor and the **Broadway business district** keep our **Englewood junk removal** crew busy with shop cleanouts, **office furniture removal**, and storefront remodels. Narrow alleys and limited parking are normal here, so we plan the load before we arrive and work quickly to keep driveways and loading zones clear.",
          "Near the **Swedish Medical Center** and **Craig Hospital** area, many homes are rentals or older bungalows close to the hospital campus. We help landlords and tenants with **move-out cleanouts**, old mattresses, broken furniture, and the stuff that piles up in detached garages and alley sheds.",
        ],
      },
      {
        heading: "Light Demolition and Commercial Hauling in Englewood",
        paragraphs: [
          "Englewood has a lot of homes from the 1940s and 1950s, and many are being updated. We handle **light demolition** like tearing out old sheds, wood fences, carpet, and small decks, then haul the **construction debris** away in the same visit. Contractors and **small businesses** use us for drywall, tile, cabinets, and scrap lumber when a dumpster won't fit on the lot.",
          "Every Englewood job gets **one upfront price** based on how much trailer space the load uses. A minimum pickup starts at [[min]], a half trailer is [[load:4]], and a full trailer is [[load:8]]. Labor, loading, hauling, and disposal fees are all included.",
        ],
      },
    ],
  },
  {
    slug: "lakewood",
    city: "Lakewood",
    county: "Jefferson County",
    metaTitle: "Junk Removal Lakewood CO | Garage & Yard Cleanouts | EZ Haulaway",
    metaDescription:
      "Junk removal in Lakewood, CO — garage cleanouts, landscaping debris and light demolition hauled away. Free quotes from EZ Haulaway.",
    intro:
      "We cover Lakewood across the west side of the metro for junk removal, cleanouts, and light demolition.",
    local:
      "Mature yards here generate serious landscaping debris, and a lot of Lakewood garages are due for a real clear-out.",
    nearby: ["denver"],
    topServices: ["yard-and-landscaping-debris", "garage-cleanouts", "light-demolition"],
    content: [
      {
        heading: "Junk Removal Lakewood Homeowners Trust",
        paragraphs: [
          "Looking for **junk removal in Lakewood**? Our **family-owned crew** clears garages, basements, yards and whole homes across the west side of the metro — from Belmar and Green Mountain to Applewood, Bear Creek and the neighborhoods along Union Boulevard.",
          "Lakewood has big mature trees, deep lots and lots of older ranch homes, so we see serious **landscaping debris**, packed garages and basements full of furniture. We load everything by hand from wherever it sits and leave the space swept clean.",
          "You don't have to rent a dumpster or borrow a truck. We do **all the heavy lifting**, haul it away the same visit, and you get your space back.",
        ],
      },
      {
        heading: "Lakewood Junk Removal Services We Offer",
        paragraphs: [
          "From one couch to a full estate, here's what Lakewood customers book most:",
        ],
        list: [
          { title: "Garage cleanouts", text: "Old tools, shelving, bikes, paint cans that are fully dried, and boxes of storage cleared in one trip." },
          { title: "Yard and landscaping debris", text: "Branches, brush, old sod, landscape rock and storm cleanup from Lakewood's mature yards." },
          { title: "Light demolition", text: "Old sheds, decks, fences and playsets torn down and hauled away together." },
          { title: "Furniture and mattress removal", text: "Couches at [[item:Couch]] per cushion and mattresses at [[item:Mattress]], carried out from any room." },
          { title: "Appliance removal", text: "Fridges, washers and dryers hauled and sent to **metal recycling** when possible." },
          { title: "Estate and move-out cleanouts", text: "Whole-house cleanouts for families, realtors and **property managers**." },
        ],
      },
      {
        heading: "Upfront Pricing for Lakewood Junk Removal",
        paragraphs: [
          "We price by trailer space. A minimum pickup starts at **[[min]]**, a half trailer runs about **[[load:4]]**, and a **full trailer** is about **[[load:8]]**. Labor, loading and disposal are always included — **no hidden fees**.",
          "Send a photo through our **free instant estimate** for a price in about a minute, or call or text for a firm quote. We show up in the window we give you.",
        ],
      },
      {
        heading: "Responsible Disposal on Every Lakewood Job",
        paragraphs: [
          "We sort each load so usable items go to **donation**, metal and yard waste go to **recycling** where possible, and only true trash goes to a licensed disposal site. It's **professional junk removal** done the right way.",
        ],
        closing: "Book Lakewood junk removal today — call or text, or start your free instant estimate.",
      },
      {
        heading: "Why Lakewood Homeowners Choose EZ Haulaway",
        paragraphs: [
          "Our **Lakewood junk removal** crew covers **Belmar**, **Green Mountain**, **Bear Creek**, **Union Square**, **Applewood** borders, and the older neighborhoods near **Lakewood Gulch**. Ranch homes from the 1950s and 1960s often come with full basements, crawl spaces, and detached garages that have collected decades of furniture, tools, and boxes. We clear them out in one visit with **all the heavy lifting** done by our crew.",
          "Hillside homes near Green Mountain and Bear Creek can mean steep driveways, long carries, and stairs. We bring dollies, straps, and furniture blankets, protect your walls and floors, and still give you **one upfront price** before anything goes in the trailer.",
        ],
      },
      {
        heading: "Garage, Yard, and Rental Cleanouts in Lakewood",
        paragraphs: [
          "Lakewood has a big mix of owners and renters, so **rental turnovers** and **move-out cleanouts** are a regular part of our week. Landlords call us for old mattresses, couches, and appliances left behind, while homeowners book **garage cleanouts**, **yard debris removal**, and old hot tub or **shed removal** in the backyard.",
          "We sort every load. Usable items go to **donation**, metal and appliances go to **recycling**, and the rest goes to a licensed disposal site. A **minimum pickup** starts at [[min]], and a full trailer of junk is [[load:8]] with disposal included.",
        ],
      },
    ],
  },
  {
    slug: "elizabeth",
    city: "Elizabeth",
    county: "Elbert County",
    metaTitle: "Junk Removal Elizabeth CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Elizabeth, CO — property cleanouts, outbuilding tear-downs, scrap and brush hauled away. Free quotes from EZ Haulaway.",
    intro:
      "EZ Haulaway makes the trip out to Elizabeth for everything from single heavy items to full property cleanouts.",
    local:
      "Rural lots and ranch-style homes mean bigger yards, older outbuildings, and plenty of long-stored household junk that needs to go.",
    nearby: ["parker", "franktown", "castle-rock"],
    topServices: ["garage-cleanouts", "yard-and-landscaping-debris", "house-and-estate-cleanouts"],
  },
  {
    slug: "franktown",
    city: "Franktown",
    county: "Douglas County",
    metaTitle: "Junk Removal Franktown CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Franktown, CO — fence tear-outs, shed removal, brush and acreage cleanups. Free quotes from EZ Haulaway.",
    intro:
      "Franktown is a quick run southeast of Parker, and we handle junk removal and light demolition jobs here regularly.",
    local:
      "A mix of acreage properties and older homes means fence tear-outs, shed removals, and brush cleanup are common requests.",
    nearby: ["parker", "castle-rock", "elizabeth", "sedalia"],
    topServices: ["deck-and-fence-removal", "light-demolition", "garage-cleanouts"],
  },
  {
    slug: "castle-pines",
    city: "Castle Pines",
    county: "Douglas County",
    metaTitle: "Junk Removal Castle Pines CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Castle Pines, CO — furniture swaps, mattress removal and garage cleanouts. Same-week scheduling. Free quotes from EZ Haulaway.",
    intro:
      "Castle Pines is close to our Parker base and an easy area for same-week junk removal scheduling.",
    local:
      "Newer homes and active move-ins mean furniture swaps, mattress removals, and garage organization jobs keep us busy here.",
    nearby: ["parker", "castle-rock", "lone-tree", "highlands-ranch"],
    topServices: ["furniture-removal", "mattress-and-bulky-item-removal", "garage-cleanouts"],
  },
  {
    slug: "sedalia",
    city: "Sedalia",
    county: "Douglas County",
    metaTitle: "Junk Removal Sedalia CO | EZ Haulaway",
    metaDescription:
      "Junk removal in Sedalia, CO — appliance haul-away, yard debris and full garage cleanouts. Free quotes from EZ Haulaway.",
    intro:
      "Sedalia sits along Highway 85 and is a regular stop for EZ Haulaway on the way to and from Parker.",
    local:
      "Mountain homes and rural properties here often need appliance haul-away, yard debris cleanup, and full garage clear-outs.",
    nearby: ["castle-rock", "littleton", "parker", "franktown"],
    topServices: ["yard-and-landscaping-debris", "appliance-removal", "garage-cleanouts"],
  },
];
export const locations = priced(raw_locations);

export const locationBySlug = (slug: string) => locations.find((location) => location.slug === slug);

/** Cities with the strongest local search demand — used for city + service cross-linking. */
export const PRIORITY_CITY_SLUGS = [
  "parker",
  "castle-rock",
  "denver",
  "highlands-ranch",
  "centennial",
  "castle-pines",
] as const;

export const priorityLocations = PRIORITY_CITY_SLUGS
  .map((slug) => locations.find((location) => location.slug === slug))
  .filter((location): location is Location => Boolean(location));

/** High-ticket, low-competition specialty services promoted on city pages. */
export const SPECIALTY_SERVICE_SLUGS = [
  "hot-tub-removal",
  "shed-removal",
  "deck-and-fence-removal",
  "mattress-and-bulky-item-removal",
] as const;
