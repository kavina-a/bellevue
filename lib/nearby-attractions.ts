export type NearbyAttraction = {
  slug: string
  title: string
  image: string
  description: string
  category: "Nature & Wildlife" | "Heritage & Culture" | "Local Life" | "Scenic Views"
  featured: boolean
  distance?: string
  additionalInfo?: string
}

const photo = (filename: string) =>
  `/Photos/Nearby Attractions/${encodeURIComponent(filename)}`

export const nearbyAttractions: NearbyAttraction[] = [
  {
    slug: "ambewela-farm",
    title: "Ambewela Farm",
    image: photo("Ambewela Farm .jpg"),
    category: "Local Life",
    featured: true,
    distance: "6.1 km — approximately 12 minutes",
    description:
      "Step into the \"Little New Zealand\" of Sri Lanka. Ambewela Farm offers a serene escape with its rolling green pastures, mist-covered hills, and pure mountain air. Witness the charm of dairy farming, interact with gentle cows, and enjoy fresh dairy products straight from the source. It\u2019s a perfect blend of nature and tranquility, ideal for families and nature lovers.",
    additionalInfo:
      "Be environmentally conscious with waste disposal and wear comfortable footwear. Early morning visits offer the most atmospheric experience as mist still clings to the pastures.",
  },
  {
    slug: "horton-plains",
    title: "Horton Plains National Park",
    image: photo("Horton Plains National Park.jpg"),
    category: "Nature & Wildlife",
    featured: true,
    distance: "12 km — approximately 25 minutes",
    description:
      "A UNESCO World Heritage site, Horton Plains is a breathtaking highland plateau. Trek through windswept grasslands and dense cloud forests to reach the dramatic \"World\u2019s End\" cliff, offering a sheer drop and stunning panoramic views. Discover the enchanting Baker\u2019s Falls and the unique biodiversity that makes this park a must-visit for adventurers and photographers.",
    additionalInfo:
      "Begin your visit early — the cliff views clear before the mist returns around mid-morning. Pack a camera, carry snacks, and dispose of all waste responsibly. The park can be cool and windy; a light layer is advised.",
  },
  {
    slug: "pattipola-railway-station",
    title: "Pattipola Railway Station",
    image: photo("Pattipola Railway Station.jpg"),
    category: "Heritage & Culture",
    featured: true,
    distance: "6.5 km — approximately 15 minutes",
    description:
      "Experience the charm of the highest railway station in Sri Lanka. Situated at an elevation of 1,897 meters, Pattipola is a gateway to the misty highlands. The station\u2019s colonial-style architecture and the scenic train journey through lush tea estates and tunnels provide a nostalgic and picturesque experience that captures the essence of Sri Lanka\u2019s hill country.",
    additionalInfo:
      "Early mornings offer the best chance to see the iconic upcountry train winding through the hills with golden light cutting through the mist — ideal for photography. Our team can assist with train schedules and tickets upon request.",
  },
  {
    slug: "lake-gregory",
    title: "Lake Gregory",
    image: photo("Lake Gregory.jpeg"),
    category: "Scenic Views",
    featured: false,
    distance: "22 km — approximately 45 minutes",
    description:
      "Lake Gregory in Nuwara Eliya is a serene man-made lake surrounded by gentle hills and colonial-era charm. Boating, lakeside walks, and picnics beneath cool highland skies make it a leisurely afternoon escape — especially when the mist rolls in across the water.",
    additionalInfo:
      "Pedal boats and rowboats are available for hire. The lakeside promenade is best enjoyed in the late afternoon when the light softens over the surrounding hills.",
  },
  {
    slug: "jagro-strawberry-farm",
    title: "Jagro Strawberry Farm",
    image: photo("Jagro Strawberry Farm.jpeg"),
    category: "Local Life",
    featured: false,
    distance: "20 km — approximately 40 minutes",
    description:
      "Jagro Strawberry Farm invites visitors into the heart of Nuwara Eliya\u2019s strawberry country. Walk the rows, pick your own fruit in season, and taste the region\u2019s famous fresh strawberries — a sweet, hands-on taste of highland agriculture.",
    additionalInfo:
      "Strawberry season peaks between December and April. Freshly picked fruit and strawberry-based products are available to purchase on-site. A delightful stop for families with young children.",
  },
  {
    slug: "kandela-forest-park",
    title: "Kandela Educational Forest Park",
    image: photo("Kandela Educational Forest Park.webp"),
    category: "Nature & Wildlife",
    featured: false,
    distance: "14 km — approximately 28 minutes",
    description:
      "Kandela Educational Forest Park offers shaded trails through native woodland — ideal for a quiet walk among ferns, birdsong, and filtered highland light. An educational and restorative outing for guests who wish to connect with the forest at an unhurried pace.",
    additionalInfo:
      "Wear sturdy shoes and carry insect repellent. The trails are well-marked but can be slippery after rain. Guided walks are occasionally available — enquire with our concierge.",
  },
  {
    slug: "ambewela-station",
    title: "Ambewela Station",
    image: photo("Ambewela Station.jpg"),
    category: "Heritage & Culture",
    featured: false,
    distance: "2.5 km — approximately 6 minutes",
    description:
      "Ambewela Station sits along the scenic Main Line railway, surrounded by pastureland and misty hills. A stop here captures the romance of Sri Lankan hill-country rail travel — wooden benches, mountain air, and views that unfold with every passing train.",
    additionalInfo:
      "The train passes through in the early morning and late afternoon — check the schedule with our team for exact timings. A short walk from the station leads to scenic viewpoints over the surrounding farmland.",
  },
  {
    slug: "ambewela-wind-power-station",
    title: "Ambewela Wind Power Station",
    image: photo("Ambewela Wind Power Station.jpg"),
    category: "Scenic Views",
    featured: false,
    distance: "4 km — approximately 10 minutes",
    description:
      "The Ambewela Wind Power Station crowns open highland ridges where turbines turn above sweeping green valleys. The drive and viewpoints offer dramatic panoramas — a striking contrast of modern engineering and timeless mountain landscape.",
    additionalInfo:
      "The ridge roads can be narrow and windy; take care when driving. Sunset visits are particularly spectacular as the light catches the turbine blades against the open sky.",
  },
  {
    slug: "lovers-leap-waterfall",
    title: "Lovers\u2019 Leap Waterfall",
    image: photo("Lovers\u2019 Leap Waterfall.jpg"),
    category: "Scenic Views",
    featured: false,
    distance: "24 km — approximately 48 minutes",
    description:
      "Lovers\u2019 Leap Waterfall cascades near Nuwara Eliya, named for a local legend of devotion and loss. The falls are at their most powerful after rain, sending mist across tea-clad slopes — a poetic pause on any highland itinerary.",
    additionalInfo:
      "The path to the falls can be steep and slippery; wear closed shoes with good grip. The falls are most impressive during or just after the rainy season. Allow at least an hour for the full walk.",
  },
  {
    slug: "seetha-amman-temple",
    title: "Seetha Amman Temple",
    image: photo("Seetha Amman Temple.webp"),
    category: "Heritage & Culture",
    featured: false,
    distance: "18 km — approximately 35 minutes",
    description:
      "Seetha Amman Temple in Seetha Eliya is revered in the Ramayana tradition as a place linked to Sita\u2019s captivity. Set beside a stream in lush forest, the colourful shrine draws pilgrims and curious travellers alike — a window into Sri Lanka\u2019s living mythology.",
    additionalInfo:
      "Dress modestly when visiting — covered shoulders and knees are respectful and expected. Remove footwear before entering the main shrine. The temple is most atmospheric in the early morning when fewer visitors are present.",
  },
]

export function getFeaturedAttractions(): NearbyAttraction[] {
  return nearbyAttractions.filter((a) => a.featured)
}

export function getAttractionBySlug(slug: string): NearbyAttraction | undefined {
  return nearbyAttractions.find((a) => a.slug === slug)
}
