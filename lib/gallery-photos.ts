import { chaletPhotos } from "./chalet-photos"
import { nearbyAttractions } from "./nearby-attractions"

export type GalleryPhoto = {
  src: string
  alt: string
}

export type GallerySection = {
  slug: string
  title: string
  images: GalleryPhoto[]
}

const photo = (folder: string, filename: string, alt: string): GalleryPhoto => ({
  src: folder
    ? `/Photos/${folder}/${encodeURIComponent(filename)}`
    : `/Photos/${encodeURIComponent(filename)}`,
  alt,
})

export const gallerySections: GallerySection[] = [
  {
    slug: "exterior-views",
    title: "Exterior & Views",
    images: [
      photo("Exterior and Views", "birdeyeshot.jpg", "Bird's-eye view of Bellevue Chalets"),
      photo("Exterior and Views", "DJI_20250113065432_0854_D-Edit.jpg", "Aerial view of the highlands"),
      photo("Exterior and Views", "DJI_20250113073722_0909_D-Edit.jpg", "Bellevue Chalets at dusk, Ambewela"),
      photo("Exterior and Views", "DJI_20250113074154_0924_D-Edit.jpg", "Drone view over the property"),
      photo("Exterior and Views", "45294a65-733d-4eba-8063-0a4685d6049a.jpg", "Bellevue Chalets exterior"),
      photo("Exterior and Views", "DSC06027-Edit.jpg", "Highland landscape"),
      photo("Exterior and Views", "DSC06062-Edit.jpg", "Mountain views from the property"),
      photo("Exterior and Views", "DSC06107-Edit.jpg", "Scenic highland vista"),
      photo("Exterior and Views", "DSC06152-Edit.jpg", "Bellevue Chalets surroundings"),
      photo("Exterior and Views", "DSC06167-Edit.jpg", "Misty highland morning"),
      photo("Exterior and Views", "DSC06192-Edit.jpg", "Property and landscape"),
      photo("Exterior and Views", "IMG_5363.jpg", "Bellevue Chalets grounds"),
    ],
  },
  {
    slug: "chalet-cove",
    title: "Chalet Cove",
    images: chaletPhotos.cove,
  },
  {
    slug: "chalet-mirador",
    title: "Chalet Mirador",
    images: chaletPhotos.mirador,
  },
  {
    slug: "chalet-grandeur",
    title: "Chalet Grandeur",
    images: chaletPhotos.grandeur,
  },
  {
    slug: "outdoor-dining",
    title: "Outdoor Dining & Meals",
    images: [
      photo("Outdoor Dining & Meals", "gardenbf.jpg", "Garden breakfast"),
      photo("Outdoor Dining & Meals", "DSC05449.jpg", "Outdoor dining setup"),
      photo("Outdoor Dining & Meals", "DSC05958.jpg", "Al fresco meal"),
      photo("Outdoor Dining & Meals", "DSC05965-Edit.jpg", "Dining in the highlands"),
      photo("Outdoor Dining & Meals", "DSC06259-Edit.jpg", "Outdoor dining experience"),
      photo("Outdoor Dining & Meals", "DSC06284.jpg", "Meal with a view"),
    ],
  },
  {
    slug: "nearby-experiences",
    title: "Nearby & Experiences",
    images: nearbyAttractions.map((a) => ({ src: a.image, alt: a.title })),
  },
  {
    slug: "property-highlights",
    title: "Property Highlights",
    images: [
      photo("", "DJI_20250113073722_0909_D-Edit.jpg", "Bellevue Chalets at dusk"),
      photo("", "DSC06027-Edit.jpg", "Highland landscape"),
      photo("", "DSC06062-Edit.jpg", "Mountain views"),
      photo("", "DSC06107-Edit.jpg", "Scenic vista"),
      photo("", "DSC06162-Edit.jpg", "Bellevue Chalets"),
      photo("", "DSC06167-Edit.jpg", "Misty morning"),
      photo("", "IMG_5363.jpg", "Property grounds"),
    ],
  },
]

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return gallerySections.flatMap((s) => s.images)
}

export type GalleryFilterSlug = "all" | "views" | "rooms" | "dining" | "spaces"

export const galleryFilters: { slug: GalleryFilterSlug; title: string }[] = [
  { slug: "all", title: "All" },
  { slug: "views", title: "Views" },
  { slug: "rooms", title: "Rooms" },
  { slug: "dining", title: "Dining" },
  { slug: "spaces", title: "Spaces" },
]

function sectionImages(slug: string): GalleryPhoto[] {
  return gallerySections.find((s) => s.slug === slug)?.images ?? []
}

/** Curated hero picks for the All filter — one mosaic block per category. */
function getCuratedAllPhotos(): GalleryPhoto[] {
  const views = sectionImages("exterior-views")
  const rooms = [
    ...sectionImages("chalet-cove").slice(0, 3),
    ...sectionImages("chalet-mirador").slice(0, 2),
    ...sectionImages("chalet-grandeur").slice(0, 2),
  ]
  const dining = sectionImages("outdoor-dining")
  const spaces = sectionImages("property-highlights")

  return [
    views[2],
    views[0],
    views[5],
    rooms[0],
    rooms[3],
    dining[1],
    spaces[1],
    views[8],
    rooms[1],
    dining[3],
    spaces[0],
    rooms[5],
    views[10],
    dining[0],
  ].filter((img): img is GalleryPhoto => Boolean(img))
}

export function getGalleryPhotosForFilter(filter: GalleryFilterSlug): GalleryPhoto[] {
  switch (filter) {
    case "all":
      return getCuratedAllPhotos()
    case "views":
      return sectionImages("exterior-views")
    case "rooms":
      return [
        ...sectionImages("chalet-cove"),
        ...sectionImages("chalet-mirador"),
        ...sectionImages("chalet-grandeur"),
      ]
    case "dining":
      return sectionImages("outdoor-dining")
    case "spaces":
      return sectionImages("property-highlights")
    default:
      return getAllGalleryPhotos()
  }
}

export function getGalleryFilterTitle(filter: GalleryFilterSlug): string {
  return galleryFilters.find((f) => f.slug === filter)?.title ?? "Gallery"
}
