export type NearbyAttraction = {
  slug: string
  title: string
  image: string
  description: string
  category: "Nature & Wildlife" | "Heritage & Culture" | "Local Life" | "Scenic Landscapes"
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
    distance: "6.1 km, approximately 12 minutes.",
    description:
      "Located in Sri Lanka's picturesque central highlands, is a popular tourist destination known for its fresh milk, dairy products, and stunning scenery. Visitors can explore the farm, get up close with cows, goats, and even witness the massive stud bulls. The farm is also a great spot for educational purposes, offering a firsthand look at systemized farming practices. Enjoy the cool climate and lush surroundings, making it an ideal location for nature lovers, families, and those interested in local farming.",
    additionalInfo:
      "Be environmentally conscious with waste disposal, wear comfortable footwear.",
  },
  {
    slug: "horton-plains",
    title: "Horton Plains National Park",
    image: photo("Horton Plains National Park.jpg"),
    category: "Nature & Wildlife",
    featured: true,
    distance: "12 km, approximately 25 minutes.",
    description:
      "A UNESCO World Heritage site, Horton Plains is a popular destination for tourists. Known for its stunning views, including the famous World's End cliff, the park offers scenic trekking routes, rich wildlife, and diverse plant species. A must-visit for nature lovers and adventure seekers.",
    additionalInfo:
      "Be environmentally conscious when disposing of waste, pack a camera, and begin your visit early. Snacks and meals can be packed and arranged upon request.",
  },
  {
    slug: "pattipola-railway-station",
    title: "Pattipola Railway Station",
    image: photo("Pattipola Railway Station.jpg"),
    category: "Heritage & Culture",
    featured: true,
    distance: "6.5 km, approximately 15 minutes.",
    description:
      "Nestled at an impressive altitude of 1,898.1 metres above sea level, Pattipola Railway Station holds the title of the highest railway station in Sri Lanka. This quaint and historic station lies along the scenic Main Line, connecting Colombo to Badulla, and offers visitors a truly breathtaking view of the misty highlands. With its colonial-era charm and quiet atmosphere, it's the perfect stop for those who appreciate both engineering heritage and natural beauty.",
    additionalInfo:
      "Early mornings offer the best chance to see the iconic upcountry train winding its way through the hills with golden sunlight cutting through the mist—ideal for photos.",
  },
  {
    slug: "jagro-strawberry-farm",
    title: "Jagro Strawberry Farm",
    image: photo("Jagro Strawberry Farm.jpeg"),
    category: "Local Life",
    featured: false,
    distance: "3.3 km, approximately 7 minutes.",
    description:
      "Located amidst the serene beauty of the upcountry, Jagro Strawberry Farm offers visitors the opportunity to pick fresh, sweet strawberries directly from the fields. The farm is a perfect blend of nature and agriculture, where you can not only enjoy the beauty of the rolling hills but also taste the freshest strawberries in the region. Ideal for families, couples, and nature enthusiasts, it provides an enjoyable and educational experience in the heart of Ambewela.",
    additionalInfo: "Follow farm guidelines while picking and exploring.",
  },
  {
    slug: "ambewela-wind-power-station",
    title: "Ambewela Wind Power Station",
    image: photo("Ambewela Wind Power Station.jpg"),
    category: "Scenic Landscapes",
    featured: false,
    distance: "2.8 km, approximately 6 minutes.",
    description:
      "Situated in the highlands of Ambewela, the Ambewela Wind Power Station is a notable renewable energy facility in Sri Lanka. Operated by Ace Wind Power, a subsidiary of Aitken Spence, the station comprises 12 wind turbines, each with a capacity of 250 kW, totaling an installed capacity of 3 MW . The turbines are strategically positioned to harness the region's consistent wind patterns, contributing to the country's renewable energy efforts.",
    additionalInfo:
      "Pack a camera to capture the impressive turbines and the stunning landscapes – it's a renowned photo spot.",
  },
  {
    slug: "lake-gregory",
    title: "Lake Gregory",
    image: photo("Lake Gregory.jpeg"),
    category: "Scenic Landscapes",
    featured: false,
    distance: "14.7 km, approximately 30 minutes.",
    description:
      "Nestled in the scenic town of Nuwara Eliya, Gregory Lake offers a serene escape with its beautiful surroundings. As Sri Lanka's highest lake, sitting at an elevation of 1,874 meters, it was originally built in 1873. The lake is perfect for boating, cycling, or simply enjoying a peaceful walk along its shores. With stunning views of the hills and cool, crisp air, it's an ideal spot for families, couples, and nature lovers. The lake also offers recreational activities like paddle boating and jet skiing, making it a popular destination for tourists seeking both relaxation and adventure.",
    additionalInfo:
      "Wear comfortable clothing and footwear, bring a jacket for cooler weather, a hat for sun protection, and appropriate wear for activities like jet skiing; allocate time for various activities around the lake.",
  },
  {
    slug: "ambewela-station",
    title: "Ambewela Station",
    image: photo("Ambewela Station.jpg"),
    category: "Heritage & Culture",
    featured: false,
    distance: "3.1 km, approximately 7 minutes.",
    description:
      "Ambewela Station is a charming train stop along Sri Lanka's scenic Main Line. Set amidst rolling green hills and dairy farms, the station offers travellers an authentic upcountry railway experience. Many guests choose to visit Bellevue Chalets by Pushella via this station due to its close proximity. The surrounding area is perfect for photography, enjoying the misty highlands, and witnessing the trains winding through lush landscapes.",
    additionalInfo:
      "Early mornings provide the best lighting for photos, and bring a light jacket as it can be chilly in the highlands.",
  },
  {
    slug: "kandela-forest-park",
    title: "Kandela Educational Forest Park",
    image: photo("Kandela Educational Forest Park.webp"),
    category: "Nature & Wildlife",
    featured: false,
    distance: "5.1 km, approximately 11 minutes.",
    description:
      "Kandela Educational Forest Park is a fascinating forest reserve ideal for nature enthusiasts and families. It showcases the region's native flora and fauna, offering walking trails, educational displays, and opportunities for birdwatching. Visitors can learn about local ecosystems and conservation efforts while enjoying the serenity of the forest.",
    additionalInfo:
      "Wear sturdy footwear for walking trails, carry water, and avoid disturbing wildlife.",
  },
  {
    slug: "seetha-amman-temple",
    title: "Seetha Amman Temple",
    image: photo("Seetha Amman Temple.webp"),
    category: "Heritage & Culture",
    featured: false,
    distance: "16 km, approximately 34 minutes.",
    description:
      "Located in the village of Seetha Eliya, Seetha Amman Temple is a revered Hindu temple linked to the Ramayana epic. Built around a natural spring, the temple features colourful architecture, intricate carvings, and a tranquil atmosphere. It attracts both devotees and tourists seeking cultural and historical experiences in the upcountry.",
    additionalInfo:
      "Dress modestly, remove footwear before entering the temple, and respect local customs during your visit.",
  },
  {
    slug: "lovers-leap-waterfall",
    title: "Lovers' Leap Waterfall",
    image: photo("Lovers\u2019 Leap Waterfall.jpg"),
    category: "Scenic Landscapes",
    featured: false,
    distance: "17 km, approximately 38 minutes.",
    description:
      "Lovers' Leap Waterfall is a stunning natural attraction near Nuwara Eliya, where water dramatically plunges from a high cliff into the valley below. Surrounded by lush greenery, the site creates a picturesque and serene environment perfect for photography and nature walks. According to local legend, the waterfall is named after a tragic love story, adding a romantic and mystical charm to the experience. Visitors can enjoy the sight and sound of cascading water while exploring the surrounding trails.",
    additionalInfo:
      "Wear comfortable shoes for walking, bring a camera, and be cautious near the cliff edges for safety.",
  },
]

export function getFeaturedAttractions(): NearbyAttraction[] {
  return nearbyAttractions.filter((a) => a.featured)
}

export function getAttractionBySlug(slug: string): NearbyAttraction | undefined {
  return nearbyAttractions.find((a) => a.slug === slug)
}
