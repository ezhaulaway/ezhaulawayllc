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
  /** Optional H1 override when the target search phrase puts the city first. */
  h1?: string;
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
        heading: "Junk Removal Centennial",
        paragraphs: [
          "Centennial covers a lot of ground, and the work changes block to block. Around Southglenn and Willow Creek our **junk removal Centennial** crew is usually hauling out the results of a remodel — old kitchen cabinets, a cast iron tub, vanity tops, and a garage full of scrap lumber and drywall offcuts. Out toward Smoky Hill and Piney Creek the calls lean residential: basements that have been collecting furniture for twenty years, treadmills nobody has touched since the kids moved out, and patio sets that did not survive another Colorado winter.",
          "We load everything by hand from wherever it sits — **all the heavy lifting** is on us. You do not have to drag a sleeper sofa up the basement stairs or wrestle a refrigerator into the driveway before we show up. Our crew brings furniture blankets and floor protection, carries it out, sweeps the space, and leaves with it in one trip.",
        ],
      },
      {
        heading: "Remodel Debris Removal",
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
        heading: "How Fast We Arrive",
        paragraphs: [
          "Centennial is a short drive from our base in Parker, so **same-week pickup** is normal and next-day often works. We give you an arrival window, and you get a price before we load anything.",
        ],
      },
      {
        heading: "Responsible Disposal and Donation",
        paragraphs: [
          "We sort every Centennial load. Usable furniture goes to donation, appliances and metal go to recycling, and only what can't be reused goes to a licensed disposal site. Our family-owned, **licensed and insured** crew treats your home like our own.",
          "We also help property managers, realtors and small businesses near the Arapahoe Road and Dry Creek corridors with tenant turnovers, office furniture removal and storage unit cleanouts.",
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
        heading: "Centennial Neighborhoods",
        paragraphs: [
          "Our crew works in Southglenn, Willow Creek, Homestead, Piney Creek, Cherry Knolls, Walnut Hills, Smoky Hill, and the neighborhoods along the Foxfield border. Older ranch homes west of I-25 tend to need basement cleanouts and remodel debris hauled away, while newer two-story homes east of Parker Road usually call us for garage cleanouts, old playsets, and furniture swaps after a move.",
          "Because Centennial homes often have HOA rules about what can sit on the curb, we come to you instead. There is no dumpster parked in the driveway for a week and no pile waiting for a city bulk pickup. We load from the garage, the backyard, or the basement and leave the same visit.",
        ],
      },
      {
        heading: "Estate and Move-Out Cleanouts",
        paragraphs: [
          "Estate cleanouts and move-out cleanouts are some of the biggest jobs we do in Centennial. Families settling a parent's home, landlords turning over a rental, and sellers getting a house ready to list all need the same thing: everything gone fast, handled with care, and priced up front. We separate items worth donating, set aside anything you want to keep, and haul the rest in our 16-foot dump trailer.",
          "For realtors and property managers, we can meet a lockbox, send photos when the job is done, and work around showing schedules. One call clears an entire house, garage, and yard so the listing photos look right.",
        ],
      },
      {
        heading: "Garage Cleanouts in Centennial",
        paragraphs: [
          "Centennial garages fill up fast. Between bikes the kids outgrew, a broken treadmill, shelving that never got organized, old lawn mowers, leftover building materials, and boxes from the last move, a two-car garage can end up holding zero cars. A garage cleanout is one of the most common reasons Centennial homeowners call us.",
          "We start by asking what stays. You can point at a few things to keep, or set aside a corner, and we clear the rest. Our crew loads everything into the trailer, separates metal and electronics for recycling, and sets usable items aside for donation. When we're done, we sweep the floor so you can actually see the concrete again.",
          "Most garage cleanouts fit somewhere between a half trailer and a full trailer. If you aren't sure, send a few photos through the instant estimate and you'll get a price range before we ever drive over.",
        ],
      },
      {
        heading: "Furniture and Appliance Removal",
        paragraphs: [
          "Not every job is a full cleanout. Plenty of Centennial customers just need one or two big things gone: an old sectional after a new one arrives, a mattress and box spring after a bed upgrade, a refrigerator that stopped cooling, or a washer and dryer pair replaced during a laundry room remodel.",
          "We carry furniture out of any room, including upstairs bedrooms and finished basements. We take dressers, recliners, sleeper sofas, dining sets, desks, bookshelves, entertainment centers, and patio furniture. Mattresses of every size go too, along with bed frames and headboards. Appliances are hauled out with a dolly and straps and sent to metal recycling whenever possible.",
          "Single items are priced individually, and multi-item jobs are priced by trailer space, so you never pay more than the load actually takes. You'll know the exact number before we lift anything.",
        ],
      },
      {
        heading: "Yard Waste, Hot Tubs, and Outdoor Junk",
        paragraphs: [
          "Centennial's mature neighborhoods have big trees and established landscaping, which means branches, brush piles, old sod, landscape rock, and storm cleanup after Colorado wind and hail. We bag or bundle it, load it, and send green waste to recycling when we can.",
          "Backyards also collect bigger items: old playsets, trampolines, broken grills, above-ground pools, and hot tubs that haven't run in years. We cut down hot tubs on site, tear down small sheds and fences, and haul every piece away in the same visit. Nothing is left in the yard when we leave.",
        ],
      },
      {
        heading: "Commercial and Office Junk Removal in Centennial",
        paragraphs: [
          "Centennial has a strong business community along Arapahoe Road, Dry Creek Road, and the Denver Tech Center edge. We help offices, retail shops, medical suites, and property management companies clear out old desks, cubicle panels, filing cabinets, chairs, shelving, and electronics.",
          "We schedule around your business hours, keep hallways and parking areas clear while we work, and give you one invoice when the job is done. For property managers, we handle tenant turnovers, abandoned belongings, common-area cleanups, and storage unit cleanouts across multiple properties.",
        ],
      },
      {
        heading: "How It Works",
        paragraphs: [
          "Step one is a price. Call, text, or send photos through the instant estimate and we'll give you a range right away. Step two is scheduling — we offer an arrival window that works for you, and same-week appointments are common. Step three is the job itself: we show up, confirm the final price on site, load everything, and sweep up.",
          "That's it. No dumpster rental, no trips to the landfill, and no lifting on your part. Centennial customers tell us the hardest part is deciding what to get rid of — we handle everything after that.",
        ],
      },
      {
        heading: "Why Centennial Chooses Us",
        paragraphs: [
          "We are a family-owned business based just down the road in Parker. Ben runs the jobs himself, which means the person who quotes your job is the same person who shows up to do it. We drive a red Ford F-250 and pull a 16-foot dump trailer, so we can fit in tight driveways and cul-de-sacs where bigger trucks can't.",
          "We are licensed and insured, we show up on time, and we treat your home and yard with respect. Whether you need a single couch gone or a whole house cleared, you get the same honest pricing and careful work every time.",
        ],
      },
      {
        heading: "Junk Removal Services Centennial Trusts",
        paragraphs: [
          "Our junk removal services in Centennial CO cover homes, rentals, offices and yards. As a locally owned junk removal team, we answer the phone ourselves, give a free estimate from photos, and show up when we say we will. Junk removal in Centennial should be simple, and that is how we run every job.",
          "Junk removal hauling is the core of what we do. Our junk haulers load furniture, appliances, boxes, yard waste and excess junk from anywhere on your property, then haul it away in the same trip. You never carry unwanted stuff to the curb, and you never rent a dumpster that sits in the driveway for a week.",
          "Need junk removed fast? Same day service is sometimes open when our Centennial CO route has room, and same-week junk removal is common. Text a photo and our junk removal team will reply with a free estimate and the next arrival window.",
        ],
      },
      {
        heading: "Office Space and Business Junk Removal",
        paragraphs: [
          "Centennial has a lot of business parks and office space near Arapahoe Road, Dry Creek and the Denver Tech Center. When a company moves, downsizes or updates its office space, we clear old desks, chairs, filing cabinets, cubicle panels and electronics. We can work around your hours so the office space stays open for staff.",
          "Property managers use our junk removal services for tenant move-outs, common-area cleanups and storage rooms. Every job gets one price up front, and we send photos when the space is clear. It's junk removal hauling that keeps buildings rentable.",
        ],
      },
      {
        heading: "Hassle Free Junk Removal, Start to Finish",
        paragraphs: [
          "Hassle free junk removal means you point and we lift. Our crew handles the heavy lifting, from an old hot tub on the back deck to a basement full of boxes. We protect floors and door frames, load the trailer, and sweep before we go.",
          "Hassle free also means honest pricing. Pickups start at [[min]], a half trailer is about [[load:4]], and a full trailer is about [[load:8]]. Labor, junk removal hauling, and disposal are included. Get your free estimate by text or online, and see why Centennial CO homeowners keep calling a locally owned junk removal team for every cleanout.",
          "When you need junk removal Centennial neighbors recommend, call or text for a free estimate. Our junk haulers serve every Centennial neighborhood, and we treat each home the way we would want ours treated.",
        ],
      },
    ],
  },

  {
    slug: "highlands-ranch",
    city: "Highlands Ranch",
    county: "Douglas County",
    h1: "Highlands Ranch Junk Removal",
    metaTitle: "Highlands Ranch Junk Removal CO | Free Quotes | EZ Haulaway",
    metaDescription:
      "Highlands Ranch junk removal: old furniture, garage cleanouts, yard debris and commercial junk removal. Hassle free, upfront pricing. Free quotes.",
    intro:
      "We serve the area several times a week, from single-item pickups to complete garage and basement clearing.",
    local:
      "Storage-heavy homes with finished basements tend to accumulate furniture and exercise equipment nobody uses anymore. Those are some of our most common calls here.",
    nearby: ["littleton", "centennial", "lone-tree"],
    topServices: ["mattress-and-bulky-item-removal", "garage-cleanouts", "furniture-removal"],
    content: [
      {
        heading: "Reliable Junk Removal, The Quick Answer",
        paragraphs: [
          "EZ Haulaway provides **Highlands Ranch junk removal** from a family-owned crew based in Parker. We carry junk out of your home, garage or yard and haul it away in one visit. Pricing is based on trailer space: [[min]] for a small load up to [[load:8]] for a full trailer, with labor and disposal included.",
          "Our **junk removal services** are built to be **hassle free**. You point at the **unwanted items**, and we do the **heavy lifting**, loading, hauling and sweep-up. It's reliable junk removal without a dumpster in the driveway.",
        ],
      },
      {
        heading: "What Homeowners Call Us For",
        paragraphs: [
          "Homes here have big basements and garages, and they fill up. These are our most common calls:",
        ],
        list: [
          { title: "Basement furniture", text: "**Old furniture** like sectionals, futons, desks and bookshelves carried up the stairs for you." },
          { title: "Exercise equipment", text: "Treadmills, ellipticals, weight benches and home gyms taken apart and hauled out." },
          { title: "Mattresses", text: "Mattresses run [[item:Mattress]] and box springs [[item:Box spring]], within our [[min]] minimum." },
          { title: "Garage cleanouts", text: "Boxes, shelving, old bikes and yard tools cleared in one trip." },
        ],
      },
      {
        heading: "Basement, Attic and Garage Cleanouts",
        paragraphs: [
          "Finished basements are great until they become storage for every couch, crib and box from the last fifteen years. We carry everything up the stairs and out the door, protecting floors and walls along the way. **All the heavy lifting** is on us, so you never wrestle a sleeper sofa up a staircase.",
          "Garage cleanouts are just as common. We clear old paint cans that are fully dried, broken shelving, bikes, lawn mowers, holiday decorations and boxes of unwanted items. Tell us what stays, and we take the rest. Most garage jobs fit between a half trailer at [[load:4]] and a full trailer at [[load:8]].",
        ],
      },
      {
        heading: "Yard Debris, Hot Tubs and Remodel Waste",
        paragraphs: [
          "Big trees and established landscaping create plenty of **yard waste**. We haul branch piles, brush, old sod, landscape rock and storm cleanup. **Yard debris** from a weekend project or a full backyard redo goes in the trailer, and we load it ourselves.",
          "We also remove old hot tubs, playsets, sheds and decks. Ben has torn out more than 300 decks, so the tear-down and the haul happen in one visit. Remodel waste like drywall, carpet, cabinets and scrap lumber goes too.",
        ],
      },
      {
        heading: "Responsible Disposal and Donation",
        paragraphs: [
          "**Responsible disposal** is part of every job. Usable furniture and household goods go to donation, metal and appliances go to recycling, and only what's left goes to a licensed disposal site. Old furniture in good shape often gets a second home.",
          "Customers tell us they like knowing their junk didn't all end up in a landfill. That kind of **responsible disposal** is what reliable junk haulers should offer, and it's included in our price.",
        ],
      },
      {
        heading: "Commercial Junk Removal and Rentals",
        paragraphs: [
          "We also offer **commercial junk removal** for offices, retail shops, property managers and realtors. Tenant turnovers, office furniture, storage rooms and listing prep are all handled with one upfront price. We can meet a lockbox and send photos when the job is done.",
        ],
      },
      {
        heading: "Working Around HOA Rules",
        paragraphs: [
          "Many neighborhoods here don't want junk piled at the curb for days. With us, nothing sits outside. We load straight from your garage or house and leave the same visit. That's why so many neighbors choose Highlands Ranch junk removal from a local crew.",
          "Need reliable junk removal this week? Our junk removal services start at [[min]], with **no hidden fees**. Call, text or use the instant estimate for a free quote on your Highlands Ranch junk removal job.",
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
    h1: "Lone Tree Junk Removal",
    metaTitle: "Lone Tree Junk Removal CO | Same-Week Pickup | EZ Haulaway",
    metaDescription:
      "Lone Tree junk removal: furniture, office cleanouts, electronics and bulky items hauled away. Same-week scheduling, upfront pricing and free quotes.",
    intro:
      "Our family-owned crew is minutes away in Parker, so same-week scheduling is usually straightforward.",
    local:
      "We handle a mix of residential cleanouts and commercial work here, including office furniture and tenant turnovers around the business corridors.",
    nearby: ["parker", "centennial", "highlands-ranch", "castle-pines"],
    topServices: ["commercial-junk-removal", "furniture-removal", "electronics-and-e-waste-removal"],
    content: [
      {
        heading: "Homes and Businesses We Serve",
        paragraphs: [
          "EZ Haulaway offers **Lone Tree junk removal** for homes in RidgeGate, Heritage Hills, Acres Green and the Terrace neighborhoods, plus businesses near Park Meadows and the Lincoln Avenue corridor. We also cover nearby Greenwood Village and the Denver Tech Center.",
          "We carry junk out from wherever it sits, load our 16-foot dump trailer, and haul it away the same visit. You don't move anything to the curb, and we sweep up before we leave.",
        ],
      },
      {
        heading: "Office Furniture and Tenant Cleanouts",
        paragraphs: [
          "Offices around Park Meadows and Greenwood Village call us for **commercial junk removal**: desks, chairs, cubicle panels, filing cabinets and old electronics. We schedule around your hours to keep downtime low, and electronics go to a proper recycler.",
          "Property managers use us for tenant turnovers and storage rooms, with one price up front and photos when the space is clear.",
        ],
      },
      {
        heading: "Clear Pricing",
        paragraphs: [
          "We price by trailer space with **no hidden fees**. Pickups start at [[min]], a half trailer is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, hauling and disposal are included.",
          "For fast Lone Tree junk removal, call or text for a free estimate, or send photos through the instant estimate. **Same-week pickup** is common.",
        ],
      },
    ],
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
          "Plenty of haulers take bagged trash and call it a day. As a full junk removal company, our hauling services also cut down old hot tubs starting around [[item:Hot tub]], tear down sheds, and remove worn-out decks and fences — more than 300 decks across the metro. Metal goes to recycling, usable furniture to donation, the rest to a licensed transfer station. We cannot take hazardous materials like wet paint, fuel, chemicals, asbestos, or medical waste.",
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
    h1: "Junk Removal Littleton CO",
    metaTitle: "Junk Removal Littleton CO | Local Junk Haulers | EZ Haulaway",
    metaDescription:
      "Junk removal Littleton CO: furniture removal, deck tear-outs, basement cleanouts and yard debris hauled away. Eco friendly, upfront pricing. Free quotes.",
    intro:
      "Littleton mixes long-established neighborhoods with newer development, and both keep our trailer full.",
    local:
      "Older Littleton homes often mean decks and fences well past their service life, plus basements holding decades of stored items.",
    nearby: ["highlands-ranch", "englewood", "centennial", "sedalia"],
    topServices: ["deck-and-fence-removal", "house-and-estate-cleanouts", "yard-and-landscaping-debris"],
    content: [
      {
        heading: "Littleton Junk Removal",
        paragraphs: [
          "Need junk removal Littleton homeowners trust? EZ Haulaway makes junk removal simple: send a photo, get a price, and we carry everything out. Our junk removal crew serves homes across Littleton CO, from the older streets near downtown to newer neighborhoods to the south.",
          "Older homes often have decks and fences past their prime, plus basements full of stored furniture, boxes, and old appliances. We handle the tear-down and the junk removal in one visit.",
          "Furniture removal is one of our most common Littleton jobs. Couches, recliners, dressers, and mattresses are carried out of any room. If you just need furniture removal for one big piece, pickups start at [[min]].",
        ],
      },
      {
        heading: "Eco Friendly Disposal",
        paragraphs: [
          "Our junk removal is eco friendly by design. Usable items go to donation, metal goes to recycling, and only the rest goes to a licensed disposal site. Junk removal in Littleton should keep good stuff out of the landfill.",
        ],
      },
      {
        heading: "Common Questions",
        paragraphs: ["Quick answers about junk removal Littleton customers ask most."],
        list: [
          { title: "How much does junk removal cost?", text: "We price by trailer space. Pickups start at [[min]], a half load is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, and dump fees are included." },
          { title: "Do you remove decks and fences?", text: "Yes. Ben has taken out more than 300 decks. We tear it down and haul it off in the same visit." },
          { title: "Can you clear a basement?", text: "Yes. Our junk removal crew carries everything up the stairs and out, so you don't lift a thing." },
          { title: "How do I book?", text: "Call or text with an email or phone number, or use our free instant estimate with a few photos." },
        ],
        closing: "Want a price now? Use our free instant estimate for Littleton junk removal.",
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
        heading: "Junk Removal Englewood",
        paragraphs: [
          "Need **junk removal in Englewood**? Our locally owned, family-run crew provides local junk removal for furniture, mattresses, appliances, garage junk and small business cleanouts in every corner of the city — from the bungalows near Belleview Park and Cornerstone Park to the apartments off Broadway and the shops around CityCenter Englewood.",
          "Englewood lots are small and many homes are older, so most jobs mean hand-carrying through narrow side yards, alley garages and steep basement stairs. That is normal work for us. We protect floors and door frames, load everything onto our 16-foot dump trailer, and sweep up before we leave.",
          "You never drag anything to the curb. Point at what goes and we do **all the heavy lifting** — one visit, one price, nothing left behind. It's a stress free way to get your space back.",
        ],
      },
      {
        heading: "What We Haul",
        paragraphs: [
          "Our junk removal services cover almost anything that isn't hazardous. Here are the jobs we do most often in Englewood:",
        ],
        list: [
          { title: "Furniture and mattresses", text: "Unwanted furniture like couches at [[item:Couch]] per cushion, mattresses at [[item:Mattress]] and box springs at [[item:Box spring]], plus dressers, recliners and bed frames." },
          { title: "Appliance removal", text: "Fridges, washers, dryers and stoves carried out and sent to metal recycling whenever possible." },
          { title: "Garage and basement cleanouts", text: "Boxes, shelving, old bikes, yard tools and years of storage cleared in a single trip." },
          { title: "Small commercial cleanouts", text: "Office furniture, retail fixtures and storage rooms for Englewood businesses along Broadway and South Santa Fe." },
          { title: "Rental turnovers", text: "Tenant leftovers and unwanted furniture cleared fast so landlords and property managers can clean and re-list the unit." },
        ],
      },
      {
        heading: "Upfront Pricing",
        paragraphs: [
          "We price by how much space your junk takes in our trailer. Pickups start at [[min]], a half trailer is about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, hauling and dump fees are all included — **no hidden fees** and no surprise charges at the door.",
          "Want a number now? Book online with our free instant estimate and you'll see a price in about a minute. We're a short drive from our Parker base, so same-week pickup is common.",
        ],
      },
      {
        heading: "Responsible Disposal",
        paragraphs: [
          "We sort every load. Usable furniture goes to **donation**, metal goes to **recycling**, and only what can't be reused heads to a licensed disposal site. Our customers like knowing their local junk gets a second life when it can — that's what local junk removal from a locally owned crew looks like.",
        ],
        closing: "Call or text for the soonest Englewood junk removal slot, or book online with your free instant estimate.",
      },
      {
        heading: "South Broadway Junk Removal",
        paragraphs: [
          "The South Broadway corridor and the Broadway business district keep our **Englewood junk removal** crew busy with shop cleanouts, office furniture removal, and storefront remodels. Narrow alleys and limited parking are normal here, so we plan the load before we arrive and work quickly to keep driveways and loading zones clear.",
          "Near the Swedish Medical Center and Craig Hospital area, many homes are rentals or older bungalows close to the hospital campus. We help landlords and tenants with move-out cleanouts, old mattresses, unwanted furniture, and the stuff that piles up in detached garages and alley sheds.",
        ],
      },
      {
        heading: "Light Demolition and Commercial Hauling",
        paragraphs: [
          "Englewood has a lot of homes from the 1940s and 1950s, and many are being updated. We handle light demolition like tearing out old sheds, wood fences, carpet, and small decks, then haul the construction debris away in the same visit. Contractors and small businesses use our junk removal services for drywall, tile, cabinets, and scrap lumber when a dumpster won't fit on the lot.",
          "Every Englewood job gets **one upfront price** based on how much trailer space the load uses. A minimum pickup starts at [[min]], a half trailer is [[load:4]], and a full trailer is [[load:8]]. Labor, loading, hauling, and disposal fees are all included, so the whole job stays stress free.",
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
      {
        heading: "Lakewood Junk Removal for Basements, Remodels, and Estates",
        paragraphs: [
          "**Basement cleanouts** are one of the most common Lakewood jobs we see. Older homes near **Belmar** and **Union Square** often have finished basements packed with **old couches**, **broken recliners**, **exercise equipment**, **boxes of paperwork**, and **holiday decorations** nobody has opened in years. We carry everything up the stairs for you, protect the walls and railings, and leave the room **empty and swept**.",
          "**Remodel debris** is another big one. When Lakewood homeowners update a kitchen or bath, they end up with **old cabinets**, **countertops**, **tile**, **drywall**, **carpet and pad**, and **scrap lumber**. We haul **construction debris** the same day, so you don't need a **dumpster sitting in the driveway** for a week.",
          "**Estate cleanouts** take patience and care. We work at your pace, set aside **family keepsakes**, route **usable furniture to donation**, and clear the rest so the home is ready to list or hand over. Realtors and families across **Jefferson County** use us because one call handles the **entire house, garage, and yard**.",
        ],
      },
      {
        heading: "Yard Waste and Outdoor Junk Removal in Lakewood",
        paragraphs: [
          "Lakewood's mature trees mean **branches**, **brush piles**, **storm debris**, and **old landscaping** every season. We bag or bundle it, load it, and take **green waste to recycling** whenever possible. We also remove **old playsets**, **trampolines**, **patio furniture**, **broken grills**, and **above-ground pools**.",
          "Thinking about a backyard refresh? We handle **light demolition** like **shed tear-downs**, **wood fence removal**, and **small deck removal**, then haul every piece away in the same visit. Hillside lots near **Green Mountain** and **Bear Creek** are no problem — our crew is used to **long carries and steep grades**.",
        ],
      },
      {
        heading: "Fast, Local Junk Removal in Lakewood",
        paragraphs: [
          "We're a **family-owned**, **licensed and insured** business, and Lakewood is part of our regular west-side route. **Same-week appointments** are common, and we give you an **arrival window** so you're not waiting around all day.",
          "Getting a price is easy. **Call or text**, or **send photos through our free instant estimate** for a price range in about a minute. Every Lakewood job comes with **upfront pricing**, **no hidden fees**, and a **clean space** when we leave — whether it's **one mattress** or a **full-house cleanout**.",
        ],
      },
      {
        heading: "Junk Removal Lakewood Families Book Again",
        paragraphs: [
          "Our **junk removal Lakewood** customers call us for every kind of job. Whatever your **junk removal needs** are, our crew handles **all the loading**, hauling and cleanup. We take **unwanted junk**, **unwanted items** and **unwanted furniture** from garages, basements, sheds and back yards.",
          "**Furniture removal** is one of our most common jobs — couches, sectionals, dressers and recliners carried out from any room. We also help with **construction debris** from small remodels and **yard waste** like branches, sod and old landscaping. Moving soon? Our junk removal pairs well with **moving services**: clear what you don't want before the movers arrive, and the move costs less.",
          "For **junk removal Lakewood** homeowners can count on, get **free estimates** by text or through our instant estimate. **Free estimates** come with no pressure, and our junk removal services are priced by trailer space — pickups start at [[min]]. Whatever your junk removal needs, we make **junk removal Lakewood** simple.",
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
    h1: "Castle Pines Junk Removal",
    metaTitle: "Castle Pines Junk Removal | Fast, Local Pickup | EZ Haulaway",
    metaDescription:
      "Castle Pines junk removal by a family-owned Douglas County crew. Furniture, hot tubs, yard waste and cleanouts hauled away. Upfront pricing, free estimate.",
    intro:
      "Looking for **Castle Pines junk removal** from a local crew? EZ Haulaway is a family-owned team based in nearby Parker, and we handle **all the heavy lifting** for homes across Castle Pines.",
    local:
      "Newer homes and active move-ins mean furniture swaps, mattress removals, and garage organization jobs keep us busy here.",
    nearby: ["parker", "castle-rock", "lone-tree", "highlands-ranch"],
    topServices: ["furniture-removal", "mattress-and-bulky-item-removal", "garage-cleanouts"],
    content: [
      {
        heading: "Local Junk Removal Services in Castle Pines",
        paragraphs: [
          "Our **junk removal services** cover everything from single item pickups to full home cleanouts. We carry your unwanted junk out of the garage, basement, backyard or upstairs bedroom, load it into our 16-foot dump trailer, and haul it away in the same visit. You never drag anything to the curb.",
          "Castle Pines is a short drive from our Parker shop, so scheduling is easy. Same-week pickup is common, and same day service is sometimes open when our route has room. Whatever your junk removal needs look like, one call or text gets you a free estimate and a clear arrival window.",
          "We are a small, **professional team** — Ben and his family — not a call center. The people you talk to on the phone are the same people who show up, walk the job with you, and do the work.",
        ],
      },
      {
        heading: "Castle Pines Village and Surrounding Neighborhoods",
        paragraphs: [
          "We work throughout Castle Pines Village, The Canyons, Lagae Ranch, Forest Park, and the homes along Castle Pines Parkway. Larger lots and rolling hills mean longer carries and steeper driveways, and that is normal work for our crew. We also serve the surrounding areas of Castle Rock, Lone Tree, Highlands Ranch, and the rest of Douglas County.",
          "Many Castle Pines neighborhoods have HOA rules about what can sit at the curb and for how long. With us, nothing sits outside. We load straight from your home or garage and leave with everything the same day, so there is no dumpster in the driveway and no pile waiting for a bulk pickup.",
        ],
      },
      {
        heading: "Furniture, Appliance and Hot Tub Removal",
        paragraphs: [
          "Plenty of Castle Pines customers just need a few big things gone. We take **unwanted furniture** like sectionals, sleeper sofas, recliners, dressers, desks, and dining sets, plus mattresses, box springs, and bed frames. Appliances like refrigerators, washers, dryers, and ranges are hauled out with a dolly and straps and sent to metal recycling whenever possible.",
          "Old hot tubs are one of our specialties. We cut the spa down, carry the pieces out of the backyard, and haul everything away, usually without touching your landscaping. If the tub sits in a deck, we can take out the deck too.",
        ],
        list: [
          { title: "Single item pickups", text: "One couch, mattress, or treadmill. Pickups start at [[min]]." },
          { title: "Mattresses and box springs", text: "Mattresses run [[item:Mattress]] and box springs [[item:Box spring]]." },
          { title: "Hot tub removal", text: "Old spas cut down and hauled away, starting around [[item:Hot tub]]." },
        ],
      },
      {
        heading: "Yard Waste and Construction Debris",
        paragraphs: [
          "Mature trees and big yards create a lot of **yard waste**. We haul branch piles, brush, old landscaping rock, sod, and storm cleanup. We also take out sheds, playsets, and old wood fences, then haul the boards away in the same trip.",
          "Remodeling? We remove **construction debris** like drywall, carpet, tile, cabinets, scrap lumber, and old fixtures. When a roll-off dumpster isn't practical or the HOA won't allow one, our trailer is the easy answer. We load it ourselves, so your contractor can stay focused on the build.",
        ],
      },
      {
        heading: "Upfront, Transparent Pricing",
        paragraphs: [
          "We believe in **upfront pricing** with **no hidden fees**. You pay for how much space your items take in the trailer, not how long we're there. Pickups start at [[min]], a half trailer runs about [[load:4]], and a full trailer is about [[load:8]]. Labor, loading, hauling, and dump fees are all included.",
          "Get a free quote by text with a few photos, or book online with our instant estimate. We confirm the price on site before anything is loaded, and that number is what you pay. Transparent pricing is how we earn repeat customers across Castle Pines.",
        ],
      },
      {
        heading: "Donation, Recycling and E-Waste",
        paragraphs: [
          "We sort every load. **Usable items** like furniture and household goods go to local charities, so they get a **second life** instead of a landfill. Metal and appliances go to recycling, and e waste like old TVs and computers goes to a proper electronics recycler.",
          "Only what can't be reused or recycled goes to a licensed disposal site. It's a responsible way to clear your space and keep unwanted items useful.",
        ],
      },
      {
        heading: "Why Castle Pines Chooses a Local Crew",
        paragraphs: [
          "National franchises like Junk King and JDog Junk Removal serve the area, but we are a locally owned, **licensed and insured** family business right next door in Parker. That means efficient service, honest prices, and a crew that treats your home like our own. We proudly offer thanks to first responders, teachers, and veterans who call us.",
          "When you need Castle Pines junk removal you can count on, call or text for a free estimate. We'll handle the heavy lifting, sweep up before we leave, and give you your garage back.",
        ],
        closing: "Ready to clear it out? Get your free Castle Pines junk removal estimate today.",
      },
    ],
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
