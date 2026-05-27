export type NearbyAttraction = {
  slug: string
  title: string
  image: string
  description: string
  category: "Nature & Wildlife" | "Heritage & Culture" | "Local Life" | "Scenic Views"
  featured: boolean
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
    description:
      "Ambewela is a hill station in the Nuwara Eliya District, often called \"Little New Zealand\" for its rolling pastures and cool climate. Ambewela Farm is a beloved destination known for scenic beauty and exceptional dairy products. Home to cows, goats, and pigs, the farm welcomes visitors to tour the grounds, learn about dairy production, and sample fresh milk, yogurt, and cheese.",
  },
  {
    slug: "horton-plains",
    title: "Horton Plains National Park",
    image: photo("Horton Plains National Park.jpg"),
    category: "Nature & Wildlife",
    featured: true,
    description:
      "Horton Plains National Park is a protected area in Sri Lanka's central highlands, designated in 1988. At 2,100–2,300 m elevation, it encompasses montane grassland and cloud forest rich in endemic biodiversity. World\u2019s End cliff and Baker\u2019s Falls are among its most celebrated draws — a morning on the plateau is one of the great highland experiences.",
  },
  {
    slug: "pattipola-railway-station",
    title: "Pattipola Railway Station",
    image: photo("Pattipola Railway Station.jpg"),
    category: "Heritage & Culture",
    featured: true,
    description:
      "Pattipola is the 62nd station on Sri Lanka\u2019s Main Line — and the highest railway station in the country at 1,897.5 m above sea level. Located in the Nuwara Eliya District, 224 km from Colombo, it sits amid mist and mountain scenery. Podi Menike and Udarata Menike express trains pause here, making it a memorable stop on one of the world\u2019s most scenic rail journeys.",
  },
  {
    slug: "lake-gregory",
    title: "Lake Gregory",
    image: photo("Lake Gregory.jpeg"),
    category: "Scenic Views",
    featured: false,
    description:
      "Lake Gregory in Nuwara Eliya is a serene man-made lake surrounded by gentle hills and colonial-era charm. Boating, lakeside walks, and picnics beneath cool highland skies make it a leisurely afternoon escape — especially when the mist rolls in across the water.",
  },
  {
    slug: "jagro-strawberry-farm",
    title: "Jagro Strawberry Farm",
    image: photo("Jagro Strawberry Farm.jpeg"),
    category: "Local Life",
    featured: false,
    description:
      "Jagro Strawberry Farm invites visitors into the heart of Nuwara Eliya\u2019s strawberry country. Walk the rows, pick your own fruit in season, and taste the region\u2019s famous fresh strawberries — a sweet, hands-on taste of highland agriculture.",
  },
  {
    slug: "kandela-forest-park",
    title: "Kandela Educational Forest Park",
    image: photo("Kandela Educational Forest Park.webp"),
    category: "Nature & Wildlife",
    featured: false,
    description:
      "Kandela Educational Forest Park offers shaded trails through native woodland — ideal for a quiet walk among ferns, birdsong, and filtered highland light. An educational and restorative outing for guests who wish to connect with the forest at an unhurried pace.",
  },
  {
    slug: "ambewela-station",
    title: "Ambewela Station",
    image: photo("Ambewela Station.jpg"),
    category: "Heritage & Culture",
    featured: false,
    description:
      "Ambewela Station sits along the scenic Main Line railway, surrounded by pastureland and misty hills. A stop here captures the romance of Sri Lankan hill-country rail travel — wooden benches, mountain air, and views that unfold with every passing train.",
  },
  {
    slug: "ambewela-wind-power-station",
    title: "Ambewela Wind Power Station",
    image: photo("Ambewela Wind Power Station.jpg"),
    category: "Scenic Views",
    featured: false,
    description:
      "The Ambewela Wind Power Station crowns open highland ridges where turbines turn above sweeping green valleys. The drive and viewpoints offer dramatic panoramas — a striking contrast of modern engineering and timeless mountain landscape.",
  },
  {
    slug: "lovers-leap-waterfall",
    title: "Lovers\u2019 Leap Waterfall",
    image: photo("Lovers\u2019 Leap Waterfall.jpg"),
    category: "Scenic Views",
    featured: false,
    description:
      "Lovers\u2019 Leap Waterfall cascades near Nuwara Eliya, named for a local legend of devotion and loss. The falls are at their most powerful after rain, sending mist across tea-clad slopes — a poetic pause on any highland itinerary.",
  },
  {
    slug: "seetha-amman-temple",
    title: "Seetha Amman Temple",
    image: photo("Seetha Amman Temple.webp"),
    category: "Heritage & Culture",
    featured: false,
    description:
      "Seetha Amman Temple in Seetha Eliya is revered in the Ramayana tradition as a place linked to Sita\u2019s captivity. Set beside a stream in lush forest, the colourful shrine draws pilgrims and curious travellers alike — a window into Sri Lanka\u2019s living mythology.",
  },
]

export function getFeaturedAttractions(): NearbyAttraction[] {
  return nearbyAttractions.filter((a) => a.featured)
}

export function getAttractionBySlug(slug: string): NearbyAttraction | undefined {
  return nearbyAttractions.find((a) => a.slug === slug)
}
