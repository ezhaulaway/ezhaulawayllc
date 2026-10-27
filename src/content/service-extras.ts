import { priced } from "@/lib/price-store";
// Extra long-form copy per service page (unique text for SEO depth).
const raw_serviceExtras: Record<string, { sections: Array<{ heading: string; text: string; links?: Array<{ slug: string; label: string }> }>; faqs: Array<[string, string]> }> = {
"appliance-removal": {
    sections: [
      { heading: "Refrigerators, freezers, washers, dryers, and more", text: "Old appliances are heavy, awkward, and often stuck in basements or laundry rooms with tight turns. Our crew disconnects nothing live, but once your unit is unplugged and water lines are shut off, we handle the dolly work, the stairs, and the loading. Refrigerator removal in Parker and the Denver metro area typically runs [[item:Refrigerator (full size)]] to [[item:Refrigerator (side by side)]] per unit, and we can add other junk to the same trip." },
      { heading: "Responsible appliance disposal", text: "Refrigerators and freezers contain refrigerants that need proper handling, and most appliances hold recyclable steel and copper. We route working units toward donation when possible and send the rest to facilities that recycle the metal instead of burying it in a landfill." },
      { heading: "Fridge removal made simple", text: "**Fridge removal** is our most common appliance call. Full-size, side-by-side, French door, garage beer fridges, mini fridges and chest freezers all go. Empty the food, unplug it a day early so it can defrost, and shut off the ice-maker water line. We handle the dolly, the stairs and the haul away. Fridges and freezers carry a [[adj:freon]] handling fee for the refrigerant." },
      { heading: "Appliance recycling, not the landfill", text: "**Appliance recycling** keeps tons of steel, copper and aluminum in use. We take fridges and freezers to recyclers that recover the refrigerant first, and other appliances to scrap metal recyclers. Washers, dryers, stoves, dishwashers and water heaters are mostly metal, so very little of an appliance ends up buried." },
      { heading: "Your appliance disposal options", text: "Most trash pickup won't take appliances. Some retailers haul the old unit only when they deliver a new one, and usually only from the curb. Scrap yards take metal, but you need a truck and helpers. Our **appliance disposal** service comes inside, carries it out and handles the drop-off. One appliance falls under our [[min]] minimum, and bigger loads are priced by trailer space." },
    ],
    faqs: [
      ["Do I need to empty the fridge first?", "Yes, please empty food and remove loose shelves if you can. We'll take care of the rest, including carrying it out of the kitchen or basement."],
      ["Can you take an appliance from a basement?", "Yes. Basement and upstairs appliance removal is part of what we do — just mention it when you request your quote so we plan the right crew."],
      ["How do I get rid of an old refrigerator?", "Empty it, unplug it and shut off the water line. Then book fridge removal. We carry it out and take it to a recycler that handles the refrigerant. A full-size fridge is about [[item:Refrigerator (full size)]]."],
      ["Do you recycle appliances?", "Yes. Fridges and freezers go to recyclers that recover the refrigerant, and other appliances go to scrap metal recycling whenever possible."],
    ],
  },
"commercial-junk-removal": {
    sections: [
      { heading: "Offices, retail spaces, and rental turnovers", text: "Businesses across Parker, Castle Rock, Centennial, and Denver call us for office furniture removal, retail fixture cleanouts, warehouse junk, and rental property turnovers. We work around your hours, including early mornings, so your team and customers aren't disrupted." },
      { heading: "Property managers and landlords", text: "When a tenant leaves behind furniture, mattresses, and bags of trash, you need the unit cleared fast so it can be cleaned and re-listed. Send photos, get a price, and we'll schedule the cleanout quickly: **same day or next day**, with a 48-hour wait the rare exception. We take **before and after photos on every job**, **invoice your company**, and can **add your company to our certificate of insurance**. Ask about **volume discounts or locked-in rates** if you have guaranteed jobs.", links: [{ slug: "eviction-cleanout-and-trash-out", label: "Eviction cleanouts and trash outs" }, { slug: "apartment-make-ready-haul-off", label: "Apartment make-ready and unit turnover haul-off" }] },
      { heading: "Office junk removal service", text: "Our **office junk removal service** clears **desks, office chairs, conference tables, filing cabinets** and bookshelves from suites of any size. We take apart **cubicles and modular workstations** on site, carry everything out, and haul it away. One room or a whole floor goes on a single upfront quote." },
      { heading: "Office electronics and e-waste", text: "Old computers, monitors, printers, phones and boxes of cables pile up in storage rooms. We sort **office e-waste** from the rest of the load and send it to recycling. Please wipe or pull hard drives before pickup so your business data stays protected." },
      { heading: "Office moves, closures and lease-end cleanouts", text: "Moving, downsizing or closing an office? We clear what the movers won't take and what isn't worth moving. Tell us about loading docks, freight elevators, parking and building rules when you book, and we'll plan around them. Early mornings, evenings and weekends keep your team working." },
      { heading: "Office cleanout pricing", text: "Commercial jobs are priced by trailer space, starting at [[min]]. A half load is about [[load:4]] and a full load about [[load:8]], with labor, loading, hauling and disposal included. Send photos or a walkthrough video for a **free office junk removal quote**." },
    ],
    faqs: [
      ["Can you work after business hours?", "Often, yes. Tell us your schedule and we'll do our best to fit the job in when it causes the least disruption."],
      ["Do you handle recurring pickups?", "We can talk through repeat hauls for property managers and businesses with ongoing junk removal needs."],
      ["Do you take apart cubicles?", "Yes. We break down cubicle panels and modular desks on site so they can be carried out and loaded."],
      ["Can you provide proof of insurance for our building?", "We're licensed and insured, and property managers can be added to our certificate of insurance. Let us know what your building or owner requires before the job."],
      ["Do you do make readies, trash outs and eviction cleanouts?", "We handle the haul-off step: clearing out furniture, mattresses, trash and household items, then sweeping and blowing off the area. Same-day and next-day slots are available. We do not clean, paint or repair."],
      ["Can you invoice my company?", "Yes. We can invoice a company, and we offer volume discounts or locked-in rates for guaranteed jobs."],
    ],
  },
"construction-debris-removal": {
    sections: [
      { heading: "Remodel debris without renting a dumpster", text: "A dumpster sits in your driveway for a week and you still have to load it yourself. We show up, load drywall, lumber, old cabinets, flooring, tile, and trim, and drive away the same day. It's a popular option for Parker and Highlands Ranch homeowners finishing kitchen and bathroom remodels." },
      { heading: "Heavy materials priced honestly", text: "Concrete, brick, tile, and dirt weigh far more than household junk, so they're priced with weight in mind. Send a photo of the pile and we'll give you a straightforward number before anything is loaded." },
    ],
    faqs: [
      ["Do you work with contractors?", "Yes. We haul debris for homeowners and contractors alike, and we can coordinate pickup timing with your project."],
      ["Is construction debris more expensive?", "Heavy materials like concrete and tile can cost more than light junk because of disposal weight. We'll always tell you the price up front."],
    ],
  },
"electronics-and-e-waste-removal": {
    sections: [
      { heading: "TVs, computers, printers, and old cords", text: "Electronics pile up in closets and garages because they can't go in the trash. We collect old TVs, monitors, desktop and laptop computers, printers, stereo equipment, game consoles, and boxes of cables from homes and offices throughout Parker and the Denver metro area." },
      { heading: "E-waste recycling done right", text: "Electronics contain metals and components that should be recycled, not landfilled. We sort e-waste from the rest of the load and take it to appropriate recycling outlets. We recommend wiping or removing hard drives before pickup to protect your personal data." },
    ],
    faqs: [
      ["Should I wipe my computer before you take it?", "Yes. We recommend removing or wiping hard drives and phones before pickup so your personal data stays safe."],
      ["Can you take big old tube TVs?", "Yes. Heavy CRT and projection TVs are exactly the kind of item people call us for."],
    ],
  },
"furniture-removal": {
    sections: [
      { heading: "How to get rid of a couch or sofa", text: "You have four main options: donate it, sell it, put it out for bulk trash, or hire couch removal. Donation centers usually want clean pieces with no rips or stains. Bulk trash often means dragging it to the curb yourself. Our couch removal service is the easy route: we remove a couch from any room, carry it out, and haul it away the same visit." },
      { heading: "Furniture removal services we offer", text: "Our furniture removal services cover sofas, sectionals, recliners, dressers, tables, chairs, desks, and office furniture. Need one piece gone or a whole house? Either way, we're a local furniture removal company that does the lifting, loading, and disposal for you." },
      { heading: "Couch, sectional, and table removal pricing", text: "Couches are priced at about [[item:Couch]] per cushion. Larger furniture loads are priced by how much trailer space they take, starting at our [[min]] minimum. You'll know the exact number before we lift anything." },
      { heading: "Donation first when furniture is still usable", text: "A lot of furniture we pick up still has life in it. When pieces are in good shape, we set them aside for local donation rather than the landfill, so your old dresser or dining set can help another Denver-area family." },
      { heading: "Sofa removal and furniture hauling in Denver", text: "Sofas, sectionals, sleeper sofas, and recliners are the most common furniture we haul in Denver. Sleeper sofas are heavy and awkward, and older Denver homes have narrow doors and steep stairs. We bring the hands and tools to get it out without scraping walls. Alley pickups, walkup apartments, and basements are all part of the job." },
      { heading: "Couch removal, sectionals, and heavy pieces", text: "**Couch removal** is our most common call. We take **sleeper sofas**, reclining sectionals, loveseats, and futons, and we break down oversized pieces when they won't clear a doorway. Our two-person crew does **all the heavy lifting**, so nobody in your house strains a back on the stairs." },
      { heading: "Office furniture and commercial pickups", text: "Moving offices or downsizing? We haul **office furniture** like desks, cubicle panels, conference tables, filing cabinets, and chairs. We can schedule early or late so your team keeps working, and we price the whole job as one load instead of piece by piece." },
      { heading: "Old furniture disposal done responsibly", text: "**Responsible disposal** is part of every job. Usable pieces go to **donation**, metal frames and springs go to **recycling**, and only what can't be reused ends up at a licensed disposal site. Most of our customers are surprised by how little goes to the landfill." },
      { heading: "Moving, downsizing, and estate furniture", text: "Moving day leaves behind the pieces that didn't make the cut. Downsizing parents, empty-nesters, and families settling an estate call us to clear whole rooms at once. Bedroom sets, dining tables, patio furniture, bunk beds, and entertainment centers all go on the same trailer." },
      { heading: "Why homeowners pick a local crew", text: "We are a **family-owned** business from Parker, **licensed and insured**, with **upfront pricing** and **no hidden fees**. You get a firm number before we lift anything, an arrival window we keep, and a clean space when we leave. Send a photo for a **free estimate** and see your price in about a minute." },
      { heading: "What a furniture haul-away includes", text: "We carry the furniture out, load it, haul it off, and pay the dump fees. You don't rent a truck, find helpers, or make a trip to the landfill. Add other junk to the same trip and we price it all together by trailer space." },
    ],
    faqs: [
      ["What's the easiest way to dispose of a sofa?", "Book sofa removal. We carry it out of the house, load it, and haul it away. You don't need a truck or helpers."],
      ["Can you take furniture the same week?", "Usually, yes. Send photos and we'll offer the soonest available time that works for you."],
      ["Do I need to disassemble anything?", "No. If a piece needs to come apart to get out a door, our crew handles it."],
      ["How much does sofa removal cost in Denver?", "Couches are about [[item:Couch]] per cushion. A single sofa usually lands near our [[min]] minimum. Sectionals and bigger loads are priced by trailer space."],
      ["Do you remove sleeper sofas and sectionals?", "Yes. Sleeper sofas, sectionals, and power recliners are heavy, but our crew handles them every week."],
      ["Do you donate furniture?", "Yes. If a piece is clean and in good shape, we set it aside for local donation instead of the landfill."],
    ],
  },
"garage-cleanouts": {
    sections: [
      { heading: "Get your parking spot back", text: "Most garage cleanouts in Parker and Highlands Ranch start the same way: boxes from the last move, broken bikes, old paint cans, and furniture nobody wanted inside. We sort, load, and haul it all in a single visit, then sweep up so you can finally park inside again — just in time for Colorado winters." },
      { heading: "You decide what stays", text: "We work alongside you, not around you. Point out what goes and what stays, and we'll handle the heavy lifting. Most garage cleanouts fall between a quarter and a half trailer load, roughly [[load:2]] to [[load:4]]." },
    ],
    faqs: [
      ["How long does a garage cleanout take?", "Most take one to three hours depending on the size of the garage and how much is going."],
      ["Do I need to sort everything first?", "No. Just tell us what's staying and our crew takes care of the rest."],
    ],
  },
"house-and-estate-cleanouts": {
    sections: [
      { heading: "Handled with patience and respect", text: "Estate cleanouts often come at an emotional time. Our family-owned crew works carefully and at your pace, setting aside keepsakes, paperwork, and anything you want to hold onto while clearing the rest of the home in Parker, Castle Rock, or anywhere in the Denver metro area." },
      { heading: "After an estate sale", text: "When an estate sale ends, what did not sell still has to go: leftover furniture, boxes, appliances, electronics and household items. We clear what is left, load it, sweep and haul it away, so the home can be listed, rented or handed over. Tell us what stays with the family or the estate sale company and what goes." },
      { heading: "Pre-listing cleanouts and listing prep", text: "Realtors and sellers often need a house, garage or basement emptied before photos or a showing. Give us the date and we will tell you honestly whether we can meet it. We sweep and blow off after loading, and property managers and agents can ask about before and after photos for their file." },
      { heading: "Estate cleanout pricing", text: "Estate and house cleanouts are priced by how much space the items take in our 14-cubic-yard dump trailer, not by the hour. Our minimum is [[min]], a half trailer is about [[load:4]] and a full trailer about [[load:8]]. Whole houses can take several loads, so we quote the full scope up front. Send photos or a walkthrough video for a preliminary estimate." },
      { heading: "Move-outs, foreclosures, and hoarding situations", text: "Whole-house cleanouts can involve every room, the basement, the garage, and the yard. We quote the full scope up front, bring the crew size the job needs, and sort donations and recycling along the way so the property is ready to list, sell, or move into." },
    ],
    faqs: [
      ["Can you work with realtors or family out of state?", "Yes. We can coordinate with a realtor, executor, or family member remotely using photos and phone updates."],
      ["Will you donate usable items?", "Whenever possible, usable furniture and household goods are set aside for donation instead of the landfill."],
      ["Can you clear a house after an estate sale?", "Yes. We haul what is left after the sale, from furniture and boxes to appliances and household items, then sweep and blow off the area."],
      ["How much does an estate cleanout cost?", "Pricing is based on trailer space used: a minimum of [[min]], about [[load:4]] for a half trailer and about [[load:8]] for a full one. Whole houses can need several loads, and we give you the full number before we start."],
    ],
  },
"light-demolition": {
    sections: [
      { heading: "Tear-out and haul-away in one visit", text: "Most demolition companies won't touch small jobs, and most junk haulers won't swing a hammer. We do both — taking down sheds, playsets, old decks, fences, interior cabinets, and non-structural walls, then loading all the debris on our trailer the same day." },
      { heading: "Real construction experience", text: "Ben has around six years of hands-on construction and demolition work, including more than 300 decks. That experience means we know how to take things apart cleanly without damaging siding, landscaping, or the parts of your property that are staying." },
    ],
    faqs: [
      ["Do you remove structural walls?", "No. We handle non-structural light demolition only. Load-bearing work needs a licensed contractor and engineer."],
      ["Do you remove concrete footings?", "Small footings can often be handled — send photos and we'll let you know what's realistic for your job."],
    ],
  },
"yard-and-landscaping-debris": {
    sections: [
      { heading: "Storm cleanup, branches, and landscaping projects", text: "Colorado hail, wind, and spring snow leave broken branches and limbs across yards in Parker, Castle Rock, and Elizabeth. We haul branches, brush, old sod, landscape rock, railroad ties, and bagged leaves, so your yard is clean without multiple trips to the dump." },
      { heading: "Acreage and rural properties", text: "Larger lots in Franktown, Elizabeth, and Sedalia often collect years of scrap fencing, old lumber, and brush piles. Our 16-foot dump trailer is built for these bigger outdoor cleanups, and we price by how much space the load takes." },
    ],
    faqs: [
      ["Do you take dirt and rock?", "Yes, in reasonable amounts. Because they're heavy, we'll price them based on weight and volume."],
      ["Do I need to bag leaves and branches?", "Bagged leaves are easiest, but loose branches and brush are fine — we'll load them as they are."],
    ],
  },
"hot-tub-removal": {
    sections: [
      { heading: "Hot tub removal and spa disposal in Denver, Parker, and Castle Rock", text: "Hot tub removal in Denver and the south metro starts around [[item:Hot tub]] for a standard backyard spa. We drain what's left in the shell, cut the tub down into sections that fit through gates and side yards, load the frame, cover, and steps, and haul everything away the same visit. Hot tub disposal is one of the jobs most haulers turn down, and it's one we do every week." },
      { heading: "Safe electrical shutoff before we cut", text: "Safety comes first. The spa circuit gets shut off at the breaker, and **hard-wired 240-volt tubs** should be disconnected by a licensed electrician before we arrive. Once the tub is safely dead, our crew handles the **spa removal** from start to finish." },
      { heading: "Swim spas, in-ground tubs, and gazebos", text: "We remove **swim spas**, jetted tubs, inflatable spas, and old **gazebos or pergolas** that cover them. Spas set into a deck can come out together with the surrounding framing, so you get one crew, one visit, and **one upfront price** for the whole backyard project." },
      { heading: "Where your old spa goes", text: "A hot tub is mostly wood, foam, plastic, and metal. We separate the **metal parts for recycling** — pumps, heaters, and frames — and haul the rest to a licensed disposal site. It is **responsible disposal**, not a pile behind a fence." },
      { heading: "What to do before we arrive", text: "Clear a path to the tub, unlock the gate, and let us know about pets, sprinklers, or soft ground. If you can drain the tub a day early, great — if not, we'll handle it. We leave the pad **swept clean** and ready for a new spa, a patio set, or grass." },
      { heading: "How hot tub removal works, step by step", text: "Every **hot tub removal** follows the same steps. First the power is off and the **electrical is disconnected**. Next we **drain the spa** and pull the cover, steps, and cabinet panels. Then we **cut the shell into sections** small enough to carry through a gate, load the frame and pieces into our **16-foot dump trailer**, and sweep the pad. Most backyard spas are gone in **two to three hours**." },
      { heading: "Recessed and deck-surround hot tubs", text: "A tub set into a deck takes more work than one sitting on a pad. We can remove the **deck surround**, the tub, and the framing together, or leave the deck in place and lift the spa out. Either way you get **one crew, one visit**, and the price before we start, so you can **reclaim your backyard space** without a second contractor." },
      { heading: "Tight gates, decks, and second-story patios", text: "Most spas were set in place before the fence went up, so the only way out is to cut. We protect gates, siding, and landscaping while we work, and we can remove a spa surround or deck section at the same time if the tub is built in." },
    ],
    faqs: [
      ["How much does hot tub removal cost in Denver?", "Most hot tub removals start around [[item:Hot tub]] and go up with size, access, and whether a deck or surround has to come apart. We confirm the price before any cutting starts."],
      ["Do you disconnect the electrical?", "We shut off the breaker and disconnect the whip at the tub, but any panel work should be done by a licensed electrician."],
    ],
  },
"deck-and-fence-removal": {
    sections: [
      { heading: "Deck demolition and fence removal across the Denver metro", text: "Ben has torn out and rebuilt more than 300 decks, so deck demolition in Denver, Parker, Castle Rock, and Highlands Ranch is familiar ground. We take out boards, framing, posts, footings where possible, railings, and old fence panels, then haul every piece of lumber and hardware away so the yard is clear." },
      { heading: "Old fencing, posts, and concrete", text: "Wood fence removal, chain link, and leaning cedar panels all come out the same day. Post concrete is heavy, so we price it with the load, and we tell you up front whether footings are coming out or being cut at grade." },
    ],
    faqs: [
      ["How much does deck removal cost?", "Small decks often fit in one trailer load, while large multi-level decks take more than one. Send photos with rough dimensions and we'll quote it before we start."],
      ["Will the siding be damaged where the deck attaches?", "We separate the ledger board carefully and leave the wall ready for repair, and we'll point out anything we find behind it."],
    ],
  },
"mattress-and-bulky-item-removal": {
    sections: [
      { heading: "Mattress disposal, box spring removal, and large item pickup", text: "Mattress disposal in Denver is one of the most searched junk problems in Colorado, and it's simple with us: mattresses are [[item:Mattress]], box springs [[item:Box spring]], treadmills [[item:Treadmill]], and pianos start around [[item:Piano]]. Mattresses, box springs, bed frames, and exercise equipment all come out of the room they're in, not just off the curb." },
      { heading: "Stairs, apartments, and awkward turns", text: "Bulky items rarely come out the way they went in. We bring straps, dollies, and the extra hands to get a king mattress down a stairwell or a box spring through a narrow hallway without damaging walls or doorframes." },
      { heading: "Why mattress disposal in Denver is a hassle", text: "Most Denver trash pickup won't take a mattress with the regular cans, and many dumps charge extra or refuse them. Mattresses also don't fit in most cars. We pick it up from your bedroom, load it, and handle the disposal fee. Clean mattresses can often be recycled for their steel, foam, and wood." },
      { heading: "How to get ready for mattress pickup", text: "Strip the sheets and mattress cover. If the bed frame is staying, leave it. If it's going, we can take it apart for you. That's it — you don't need to bag it or carry it downstairs." },
    ],
    faqs: [
      ["How much does mattress disposal cost in Denver?", "A mattress is [[item:Mattress]] and a box spring is [[item:Box spring]]. If they're part of a bigger load, we price the whole load by trailer space instead."],
      ["Can you take just one mattress?", "Yes. A single mattress pickup usually falls near our [[min]] minimum, and we'll carry it out for you."],
      ["Does Denver trash pickup take mattresses?", "Usually not with regular trash. Denver's large-item pickup is limited and scheduled weeks out. We can often come the same week."],
      ["Can you take a mattress from an upstairs bedroom or apartment?", "Yes. We carry it down the stairs and out the door. Third-floor walkups and tight stairwells are no problem."],
      ["Do you recycle mattresses?", "When a mattress is dry and clean, we try to send it to recycling so the steel and foam get reused instead of buried."],
    ],
  },
  "shed-removal": {
    sections: [
      { heading: "Shed removal and backyard tear-downs in Colorado", text: "Shed removal in Denver and the south metro means more than hauling: we take the structure apart. Wood sheds, metal kits, plastic resin sheds, and playhouses all get dismantled, loaded, and hauled off, including the contents and the old flooring. Ben's construction and demolition background is why we can tear down a shed that a standard junk truck won't touch." },
      { heading: "Light demolition on the same visit", text: "While the trailer is on site, we can also handle small demolition projects — a rotting deck, a section of fence, a playset, or an old chicken coop — and clear the debris in the same trip instead of scheduling a second crew." },
    ],
    faqs: [
      ["How much does shed removal cost?", "Most sheds land between a half and a full trailer load, roughly [[load:4]] to [[load:8]], depending on size, materials, and what's still inside."],
      ["Do you remove the shed floor and base?", "Yes. We take the floor and skids, and we'll tell you up front if a concrete pad needs a separate plan."],
    ],
  }
};
export const serviceExtras = priced(raw_serviceExtras);
