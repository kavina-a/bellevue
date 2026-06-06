import {
  getChaletImages,
  getChaletHero,
  type ChaletPhoto,
  type ChaletSlug,
} from "./chalet-photos"

export type ChaletFeatureIcon = "sitting" | "view" | "bath" | "deck" | "veranda"

export type ChaletFeature = {
  icon: ChaletFeatureIcon
  label: string
}

export type Chalet = {
  slug: ChaletSlug
  name: string
  tagline: string
  /** Approx. floor area in square metres */
  roomSizeSqm: number
  maxGuests: number
  bedType: string
  sleepsLabel: string

  /** Listing / "more rooms" card */
  cardFeatures: ChaletFeature[]
  cardDescription: string

  /** Detail page */
  introHeading: string
  introNote: string
  highlightsHeading: string
  highlightsBody: string

  /** In-room amenities list */
  amenities: string[]

  images: ChaletPhoto[]
}

/** Sustainability commitments shared across every chalet. */
export const sustainabilityFeatures: string[] = [
  "LED energy saving light bulbs",
  "Refillable glass water bottles",
  "Biodegradable bathroom amenities",
  "Mindful of towel and linen replacement",
  "Chemical-free toiletries",
]

const coveData: Chalet = {
  slug: "cove",
  name: "Chalet Cove",
  tagline: "Intimate Retreat",
  roomSizeSqm: 28,
  maxGuests: 2,
  bedType: "Queen",
  sleepsLabel: "Comfortably sleeps up to 2 guests",
  cardFeatures: [
    { icon: "sitting", label: "Private Balcony" },
    { icon: "view", label: "Forest & Hill View" },
    { icon: "bath", label: "Ensuite Bathroom" },
  ],
  cardDescription:
    "A cozy and intimate retreat designed for couples seeking a peaceful escape, with a plush Queen-size bed, a mini dining area, and a private entrance for complete seclusion.",
  introHeading: "Intimate and secluded, a favourite with couples",
  introNote:
    "Your stay includes all meals, tea & coffee, complimentary Wi-Fi, and far-reaching highland views.",
  highlightsHeading:
    "Chalet Cove offers a peaceful, private space to relax and soak in the calm of Ambewela",
  highlightsBody:
    "A cozy and intimate retreat designed for couples seeking a peaceful escape. This private chalet features a plush Queen-size bed, a comfortable mini dining area, and a dedicated private entrance for complete seclusion. Wake up to breathtaking views of Ambewela's rolling green hills and lush forests right from your bed.",
  amenities: [
    "Queen-size bed",
    "Accommodates up to 2 adults",
    "Free Wi-Fi",
    "Intercom phone",
    "Tea & coffee station",
    "Balcony with scenic views",
    "Private in-chalet dining",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
    "Natural water stream views",
  ],
  images: getChaletImages("cove"),
}

const miradorData: Chalet = {
  slug: "mirador",
  name: "Chalet Mirador",
  tagline: "Beautiful View",
  roomSizeSqm: 45,
  maxGuests: 4,
  bedType: "Two Doubles",
  sleepsLabel: "Comfortably sleeps up to 4 guests",
  cardFeatures: [
    { icon: "veranda", label: "Private Balcony" },
    { icon: "view", label: "Horton Plains View" },
    { icon: "bath", label: "Ensuite Bathroom" },
  ],
  cardDescription:
    "A private two-storey wooden retreat with breathtaking views of the surrounding forestry — spacious and crafted for couples or families of up to four adults.",
  introHeading: "Spacious and serene, framed by beautiful views",
  introNote:
    "Your stay includes all meals, tea & coffee, complimentary Wi-Fi, and sweeping forest vistas.",
  highlightsHeading:
    "Chalet Mirador opens to sweeping vistas of the Horton Plains Forest and the fields of Ambewela",
  highlightsBody:
    "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort and serenity, Mirador is perfect for couples seeking a romantic escape or families of up to four adults. A gentle stream flows through the property, and built entirely from wood, the chalet radiates warmth and rustic charm.",
  amenities: [
    "Two 4 ft double beds",
    "Two-storey layout",
    "Private living area",
    "Free Wi-Fi",
    "TV",
    "Mini fridge",
    "Hair dryer",
    "Intercom phone",
    "Tea & coffee station",
    "Private balcony with scenic views",
    "Private in-chalet dining",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
    "Natural water stream views",
  ],
  images: getChaletImages("mirador"),
}

const grandeurData: Chalet = {
  slug: "grandeur",
  name: "Chalet Grandeur",
  tagline: "Spacious Luxury",
  roomSizeSqm: 70,
  maxGuests: 5,
  bedType: "Queen + Double",
  sleepsLabel: "Comfortably sleeps up to 5 guests",
  cardFeatures: [
    { icon: "deck", label: "Outdoor Deck" },
    { icon: "view", label: "Panoramic Hill View" },
    { icon: "bath", label: "Two Bathrooms" },
  ],
  cardDescription:
    "A spacious and elegant two-storey retreat with two double bedrooms and a cozy attic — perfect for two couples, families, or a group of friends.",
  introHeading: "Expansive and grand, made for gathering together",
  introNote:
    "Your stay includes all meals, tea & coffee, complimentary Wi-Fi, and panoramic highland views.",
  highlightsHeading:
    "Chalet Grandeur opens onto an expansive deck with panoramic views of Ambewela's hills",
  highlightsBody:
    "A spacious and elegant two-storey retreat, Grandeur is perfect for two couples, families, or a group of friends seeking a luxurious escape. This expansive chalet features two well-appointed double bedrooms and a cozy attic. Step onto the expansive deck to unwind in the cool, misty climate, where breathtaking panoramic views provide the perfect backdrop for an unforgettable outdoor dining experience.",
  amenities: [
    "Bedroom 1: Queen-size bed",
    "Bedroom 2: 4 ft double bed",
    "Attic: 7 ft low bed",
    "Two separate bathrooms",
    "Spacious private living area",
    "Outdoor wooden deck",
    "Writing table",
    "Free Wi-Fi",
    "Smart TV",
    "Mini fridge",
    "Hair dryer",
    "Tea & coffee station",
    "Private in-chalet dining",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Heaters (on request)",
  ],
  images: getChaletImages("grandeur"),
}

/** Ordered list — the listing page renders the first two side-by-side and the third centered. */
export const chalets: Chalet[] = [coveData, miradorData, grandeurData]

export function getChalet(slug: string): Chalet | undefined {
  return chalets.find((c) => c.slug === slug)
}

export function getOtherChalets(slug: string): Chalet[] {
  return chalets.filter((c) => c.slug !== slug)
}

export { getChaletHero }
export type { ChaletSlug, ChaletPhoto }
