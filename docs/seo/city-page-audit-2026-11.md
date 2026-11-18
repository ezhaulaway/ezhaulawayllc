# City page audit, November 17, 2026

This is a read-only check of the 16 live city hubs while Google's November 2026 core update is rolling out. Nothing on these pages was rewritten in this pass.

The pages are the ones at `/service-areas/{city}`: Parker, Castle Rock, Castle Pines, Lone Tree, Highlands Ranch, Monument, Elizabeth, Franktown, Kiowa, Aurora, Englewood, Denver, Lakewood, Littleton, Centennial, and Sedalia.

## How the percentages were counted

Each page was scored twice.

**Editorial text** is the copy written for that city: the intro, the local note, the sections, and the FAQ. Parker and Castle Rock have their own questions. The other 14 cities share one six-question FAQ, with the city name swapped in.

**The rendered page** adds the blocks the template puts on every city page: the neighborhood sentence (where one exists), the landlord and property-manager cards, the "jobs most haulers turn down" line, the three booking steps, and the closing section about how a job feels. Those blocks are the same on every city except for the city name.

City names were swapped for a placeholder, and price tokens such as `[[min]]` and `[[load:4]]` were treated as the same token, so a sentence that only changes the city name counts as shared. An 8-word stretch counts as shared when the same stretch shows up on at least one other city page. "Widespread" means it shows up on four or more city pages.

These are rough overlap scores, not a plagiarism percentage. A page can share a true pricing sentence ("pickups start at the minimum, a half trailer, a full trailer") and still have real local copy around it.

## Ranking, most templated first

| Rank | City | Rendered page shared | Of which is widespread | Editorial text shared | Editorial words |
| --- | --- | ---: | ---: | ---: | ---: |
| 1 | Monument | 83% | 79% | 66% | about 400 |
| 2 | Elizabeth | 80% | 70% | 64% | about 500 |
| 3 | Sedalia | 78% | 73% | 60% | about 480 |
| 4 | Franktown | 73% | 70% | 50% | about 500 |
| 5 | Kiowa | 70% | 64% | 50% | about 580 |
| 6 | Lone Tree | 58% | 58% | 34% | about 660 |
| 7 | Englewood | 50% | 49% | 27% | about 860 |
| 8 | Aurora | 49% | 47% | 27% | about 900 |
| 9 | Littleton | 48% | 45% | 25% | about 930 |
| 10 | Highlands Ranch | 46% | 45% | 23% | about 940 |
| 11 | Castle Pines | 41% | 39% | 21% | about 1,140 |
| 12 | Denver | 40% | 39% | 20% | about 1,140 |
| 13 | Lakewood | 36% | 35% | 17% | about 1,310 |
| 14 | Parker | 30% | 22% | 11% | about 1,420 |
| 15 | Centennial | 29% | 27% | 13% | about 1,770 |
| 16 | Castle Rock | 20% | 15% | 7% | about 2,370 |

The top three are Monument, Elizabeth, and Sedalia. Monument's closest match is Elizabeth (about 37% of their editorial 8-word phrases are the same set). Elizabeth, Sedalia, Franktown, and Kiowa are one family: three sections, a shared FAQ, and a haul list that mostly changes the city name.

Parker and Castle Rock are the least templated. Their long copy does not match each other (about 3% phrase overlap). Centennial is long and mostly its own writing, but it still uses the shared six-question FAQ.

## What each page already has, and what it does not

### 1. Monument (most templated)

Has: it sits on the I-25 corridor south of Castle Rock, the crew comes from Parker, and the page says there is a travel fee.

Missing: no neighborhood or landmark names, no example job, no custom FAQ, and the haul list is couches, appliances, and garage piles. The three sections are "who we are," "what we haul," and "how pricing works."

### 2. Elizabeth

Has: acreage and outbuildings, Spring Valley, Gold Creek, the town center, and a travel fee from Parker.

Missing: the same three-section skeleton as Monument, the shared FAQ, and no named roads, disposal site, or example job.

### 3. Sedalia

Has: Highway 85, Perry Park, Indian Creek, and the fact that many loads end at the Sedalia landfill. The photo caption is a rural appliance haul.

Missing: the same three-section skeleton and shared FAQ. The haul list (appliances, brush, garage, estate, electronics) could sit on another rural page with the city name changed.

### 4. Franktown

Has: southeast of Parker, Castlewood Canyon, Russellville, acreage, fence and shed tear-outs, and Ben's construction background on deck work. Travel fee is stated.

Missing: same three-section shape and shared FAQ. No street-level access notes and no example job.

### 5. Kiowa

Has: the most specific rural facts in this group. Elbert County seat, Highway 86, about 26 miles by road through Elizabeth, and a clear rule that Kiowa itself is inside the distance line while a ranch farther east may not be. Barns, shops, and fence lines are named.

Missing: still the three-section skeleton and the shared FAQ. No named ranches, roads beyond Highway 86, or example job.

### 6. Lone Tree

Has: RidgeGate, Heritage Hills, Acres Green, the Terrace, Park Meadows, and the Lincoln Avenue offices. Office furniture and tenant cleanouts are the local angle.

Missing: the body says same-week scheduling is the usual case, while the meta description says "Same-day pickup available." The live title comes from the shared pattern "Junk Removal in {City}, CO | Same-Day When Available," not from the unused `metaTitle` field on the city. Greenwood Village is named even though it is its own city. Shared FAQ. No example job.

### 7. Englewood

Has: small lots, older homes, hand-carries, Belleview Park, Cornerstone Park, Broadway, CityCenter Englewood, South Santa Fe, Swedish Medical Center, and Craig Hospital. 1940s and 1950s remodels are described.

Missing: shared FAQ and a repeated pricing paragraph. The neighborhood list used in the intro also includes Cherry Hills Village, which is its own city, not an Englewood neighborhood.

### 8. Aurora

Has: two counties, Southlands, Saddle Rock, Heather Ridge, Colfax, Havana, Buckley, rental turnovers, and military-family move-outs. Travel fee is stated. The phone in the copy is the real EZ Haulaway number.

Missing: shared FAQ. The pricing and "why customers choose us" sections repeat the same trailer prices and "you point, we lift" lines used on other cities.

### 9. Littleton

Has: older homes, decks and fences past their life, basements, and a deck-removal focus. Ken Caryl, Columbine, Roxborough, downtown, and Highline appear in the neighborhood sentence and the landlord blurb.

Missing: the main sections rarely use those neighborhood names. "Common Questions" on the page repeats pricing and deck answers, and the page also prints the shared six-question FAQ. No example job and no named disposal site.

### 10. Highlands Ranch

Has: finished basements, HOA rules about curb piles, and a same-week close. Westridge, Eastridge, Northridge, Southridge, and BackCountry are in the neighborhood sentence and the landlord blurb.

Missing: the long sections say "homes here" and do not name those neighborhoods, an HOA, or a street. Shared FAQ. A lot of the wording is "hassle free," "heavy lifting," and "responsible disposal" repeated with the city name.

### 11. Castle Pines

Has: Castle Pines Village, The Canyons, Lagae Ranch, Forest Park, Castle Pines Parkway, longer carries, HOAs, and hot tubs. It names Junk King and JDog as the national crews people compare it with.

Missing: shared FAQ. One sentence says the company offers thanks to first responders, teachers, and veterans. The published price list has a military discount only, so that sentence is not something to treat as a local fact. No example job.

### 12. Denver

Has: alleys, stairs, elevators, and building rules. Neighborhoods named in the body include Capitol Hill, LoDo, Wash Park, Baker, Congress Park, Harvey Park, Montbello, and Green Valley Ranch. Apartment turnovers, insurance certificates, and a travel fee are spelled out. The trailer table (minimum through a full 14-cubic-yard load) matches the live price list.

Missing: shared FAQ. Several sections are service lists (couches, mattresses, appliances, offices) that match other cities once "Denver" is removed. No single named job.

### 13. Lakewood

Has: Belmar, Green Mountain, Applewood, Bear Creek, Union Boulevard, Union Square, Lakewood Gulch, hillside driveways, 1950s and 1960s ranches, basements, and mature-yard debris.

Missing: donation, pricing, and "you don't lift it" paragraphs repeat across the ten sections. Shared FAQ. Jefferson County is named, but there is no example job or disposal site.

### 14. Parker

Has: home base, no distance fee, Stonegate, Stroh Ranch, The Pinery, Idyllwilde, Canterberry Crossing, Bradbury Ranch, Clarke Farms, Pradera, Compark, Mainstreet, the Cherry Creek Trail, Hilltop Road, O'Brien Park, the PACE Center, and the 20 Mile House as a landmark. Its own FAQ. A described basement job (boxes, treadmill, dresser, TV) cleared in about 45 minutes. Loads that are not donated or recycled go to the Sedalia landfill.

Missing: little. The rendered-page score is still about 30% because every city page, including this one, carries the shared landlord cards, booking steps, and closing section.

### 15. Centennial

Has: the longest middle-of-the-pack original copy. Southglenn, Willow Creek, Homestead, Piney Creek, Cherry Knolls, Walnut Hills, Smoky Hill, the Foxfield border, Arapahoe Road, Dry Creek, and the Denver Tech Center edge. Remodel debris, HOA curb rules, garage cleanouts, and office cleanouts are written as Centennial work. Same-day is described as sometimes open, not promised.

Missing: it still uses the shared six-question FAQ instead of Centennial questions. No single named job.

### 16. Castle Rock (least templated)

Has: its own FAQ and the most original sections, including neighborhoods (The Meadows, Crystal Valley Ranch, Castlewood Ranch, Plum Creek, Founders Village), HOA dumpster rules, acreage and outbuildings, and separate sections for furniture, yard waste, estates, appliances, hot tubs, sheds, and decks.

Missing: not a doorway problem. Later edits should add a real Castle Rock job the way Parker has one, not another pricing recap.

## Shared pieces on every city page

These are fine as site chrome. They are also why a short city page looks mostly duplicated once Google reads the whole URL:

- The same landlord, make-ready, pre-listing, and office cards, plus the same four promise lines (48-hour wait, photos, insurance certificate, volume rates).
- The same "six years and 300 decks" specialty introduction.
- The same three booking steps.
- The same three-paragraph close that swaps in the city name ("the part {city} customers talk about most").
- On 14 of the 16 cities, the same six FAQ answers.

## City-plus-service pages

This score is the city hubs only. Live city-plus-service URLs are a second set. A handful have their own essays (Castle Rock hot tub, furniture, and appliance; Denver furniture, mattress, and appliance; Aurora deck and mattress; Centennial electronics; Parker shed and appliance). The rest fall back to one description pattern per service, with `{City}` filled in, for furniture, appliances, hot tubs, garages, estates, electronics, commercial work, and construction debris. Those were not rewritten here.

## What not to do in a later rewrite

Do not spin the five short rural and Monument pages by search-and-replacing the city name again. Give each one facts only that city has: a road, a neighborhood or landmark, how the drive from Parker actually works, and what the crew usually finds there. Leave Parker's and Castle Rock's long copy alone except to fix a specific false line. FAQ markup can stay; Google stopped showing FAQ rich results on May 7, 2026, and the markup itself is not the problem.
