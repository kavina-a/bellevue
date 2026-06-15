import {
  getChaletImages,
  getChaletHero,
  type ChaletPhoto,
  type ChaletSlug,
} from "./chalet-photos"

export type ChaletFeatureIcon = "chalet" | "view" | "bath" | "deck" | "veranda" | "users"

export type ChaletFeature = {
  icon: ChaletFeatureIcon
  labelLine1: string
  labelLine2: string
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

/** Shared highlights shown in the amenity photo overlay panel across every chalet. */
export const sustainabilityFeatures: string[] = [
  "Personalised guest service",
  "Complimentary tea & coffee station",
  "Fresh meals using produce from our garden",
  "Views and sounds of a natural stream",
  "0% Noise, 100% Nature.",
]

const coveData: Chalet = {
  slug: "cove",
  name: "Chalet Cove",
  tagline: "Intimate Retreat",
  roomSizeSqm: 28,
  maxGuests: 2,
  bedType: "Queen",
  sleepsLabel: "Comfortably sleeps up to 2 adults",
  cardFeatures: [
    { icon: "view", labelLine1: "Panoramic View", labelLine2: "Balcony" },
    { icon: "chalet", labelLine1: "Single-Storey", labelLine2: "Chalet" },
    { icon: "users", labelLine1: "2", labelLine2: "Adults" },
  ],
  cardDescription:
    "A cozy and intimate retreat designed for couples seeking a peaceful escape, with a plush Queen-size bed, a mini dining area, and a dedicated private entrance for complete seclusion.",
  introHeading: "Intimate and cosy, perfect for couples.",
  introNote:
    "Your stay includes meals as per your selected plan, a complimentary tea and coffee station, and scenic views from the comfort of your bed.",
  highlightsHeading:
    "A cozy and intimate retreat designed for couples seeking a peaceful escape",
  highlightsBody:
    "This chalet features a plush Queen-size bed, a comfortable mini dining area, and a dedicated private entrance for complete seclusion. Wake up to breathtaking views of Ambewela's rolling green hills and lush forests right from your bed, offering the perfect setting for a serene and romantic getaway.",
  amenities: [
    "Queen-size bed",
    "En-suite bathroom",
    "Complimentary Wi-Fi",
    "Intercom phone",
    "Balcony with scenic views",
    "Private in-chalet dining",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
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
  sleepsLabel: "Accommodates 2–4 adults",
  cardFeatures: [
    { icon: "view", labelLine1: "Panoramic View", labelLine2: "Private Balcony" },
    { icon: "chalet", labelLine1: "Two-Storey", labelLine2: "1-Bedroom Chalet" },
    { icon: "users", labelLine1: "2–4", labelLine2: "Adults" },
  ],
  cardDescription:
    "A private two-storey wooden retreat with breathtaking views of the surrounding forestry — spacious and crafted for couples or families of up to four adults.",
  introHeading: "Spacious and serene, a favourite among honeymooners and ideal for families.",
  introNote:
    "Your stay includes meals as per your selected plan, a complimentary tea and coffee station, and a private balcony with uninterrupted views of greenery.",
  highlightsHeading:
    "Chalet Mirador is a favourite among honeymooners, offering a private nature escape, while its spacious design also makes it ideal for families",
  highlightsBody:
    "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort and serenity, Mirador is perfect for couples seeking a romantic escape or families of up to four adults. Built entirely from wood, the chalet radiates warmth and rustic charm. The ground floor features a cosy living and dining area, while the upper floor houses a peaceful sleeping space furnished with two double beds. True to its name, Mirador — \"Beautiful View\" — the chalet opens to sweeping vistas of the Horton Plains Forest and the lush fields of Ambewela. A gentle stream flows through the property, enhancing the soothing atmosphere. Unwind in nature's embrace and experience the comfort, privacy, and beauty of your very own mountain escape.",
  amenities: [
    "Two-storey layout",
    "Two 4 ft double beds",
    "Private living area with TV",
    "Private balcony with scenic views",
    "Complementary Wi-Fi",
    "Intercom phone",
    "Mini fridge",
    "Private in-chalet dining",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "En-suite bathroom",
    "Hairdryer, towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
  ],
  images: getChaletImages("mirador"),
}

const grandeurData: Chalet = {
  slug: "grandeur",
  name: "Chalet Grandeur",
  tagline: "Spacious Luxury",
  roomSizeSqm: 70,
  maxGuests: 5,
  bedType: "Queen + Double + Attic sleeping area",
  sleepsLabel: "Comfortably sleeps up to 5 adults",
  cardFeatures: [
    { icon: "deck", labelLine1: "Deck & Panoramic", labelLine2: "View Balcony" },
    { icon: "chalet", labelLine1: "Two-Storey", labelLine2: "2-Bedroom Chalet" },
    { icon: "users", labelLine1: "4–5", labelLine2: "Adults" },
  ],
  cardDescription:
    "A spacious and elegant two-storey retreat with two double bedrooms and a cozy attic — perfect for two couples, families, or a group of friends.",
  introHeading: "Expansive and grand, perfect for gathering with family and friends.",
  introNote:
    "Your stay includes meals as per your selected plan, a complimentary tea and coffee station, and panoramic views from the expansive outdoor deck.",
  highlightsHeading:
    "Chalet Grandeur opens onto an expansive deck with panoramic views of Ambewela's hills",
  highlightsBody:
    "A spacious and elegant two-storey retreat, Grandeur is perfect for two couples, families, or a group of friends seeking a luxurious escape. This spacious chalet features two well-appointed double bedrooms and a cozy attic, offering ample space for relaxation. The ground floor boasts a separate living and dining area, while the upper floor houses the bedrooms for enhanced privacy. Step onto the wide outdoor deck to unwind in the cool, misty climate, where breathtaking panoramic views of Ambewela's lush green hills and surrounding forests create the perfect setting for an unforgettable outdoor dining experience.",
  amenities: [
    "Two-storey layout",
    "Two separate bedrooms",
    "Bedroom 1: Queen-size bed",
    "Bedroom 2: 4 ft double bed",
    "Attic: 7 ft mattress sleeping space",
    "Two en-suite bathrooms",
    "Writing table",
    "Spacious private living area with Smart TV",
    "Outdoor wooden deck area with scenic views",
    "Complementary Wi-Fi",
    "Intercom phone",
    "Mini fridge",
    "Private in-chalet dining area",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "Hair dryer, towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
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
