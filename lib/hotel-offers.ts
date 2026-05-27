export type HotelOffer = {
  id: string
  title: string
  tagline: string
  pricePerNight: number
  currency: string
  features: string[]
  isFeatured: boolean
  featuredLabel?: string
  ctaLabel: string
  ctaHref: string
}

export const hotelOffers: HotelOffer[] = [
  {
    id: "weekend-escape",
    title: "Weekend Escape",
    tagline: "Two nights of mountain calm with breakfast and a private nature walk.",
    pricePerNight: 185,
    currency: "USD",
    features: [
      "Two-night stay in Chalet Cove",
      "Daily gourmet breakfast",
      "Guided Ambewela nature walk",
      "Late checkout on Sunday",
    ],
    isFeatured: false,
    ctaLabel: "Book Now",
    ctaHref: "/#book?offer=weekend-escape",
  },
  {
    id: "honeymoon-retreat",
    title: "Honeymoon Retreat",
    tagline: "Romance among the clouds with curated dining and in-chalet indulgence.",
    pricePerNight: 265,
    currency: "USD",
    features: [
      "Three-night stay in Chalet Mirador",
      "Private candlelit dinner for two",
      "Couples spa-inspired bath setup",
      "Champagne welcome on arrival",
      "Daily afternoon tea service",
    ],
    isFeatured: true,
    featuredLabel: "Best Value",
    ctaLabel: "Book Now",
    ctaHref: "/#book?offer=honeymoon-retreat",
  },
  {
    id: "business-traveler",
    title: "Business Traveler",
    tagline: "Quiet focus and seamless comfort for working stays in the highlands.",
    pricePerNight: 155,
    currency: "USD",
    features: [
      "Flexible one to five-night stays",
      "High-speed Wi-Fi and workspace",
      "Early breakfast on request",
      "Airport transfer coordination",
    ],
    isFeatured: false,
    ctaLabel: "View Offer",
    ctaHref: "/#book?offer=business-traveler",
  },
]

export function formatOfferPrice(pricePerNight: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pricePerNight)
}

export function splitOfferTitle(title: string): [string, string] {
  const words = title.trim().split(/\s+/)
  if (words.length <= 1) return [title, ""]
  return [words[0], words.slice(1).join(" ")]
}
