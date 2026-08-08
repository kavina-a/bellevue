export type GalleryPhoto = {
  src: string
  alt: string
  /**
   * CSS `object-position` value — controls which part of the photo stays
   * visible when it's cropped into the bento grid. Defaults to "center".
   * Change per-photo, e.g. "center 30%", to shift the visible crop.
   */
  focal?: string
}

export type GallerySection = {
  slug: string
  title: string
  images: GalleryPhoto[]
}

const photo = (folder: string, filename: string, alt: string, focal?: string): GalleryPhoto => ({
  src: folder
    ? `/Photos/${folder}/${encodeURIComponent(filename)}`
    : `/Photos/${encodeURIComponent(filename)}`,
  alt,
  focal,
})

/**
 * Gallery sections, matching the designer's finalized photo list exactly.
 * Order within each section is the order specified by the designer.
 */
export const gallerySections: GallerySection[] = [
  {
    slug: "chalets-interiors",
    title: "Chalets & Interiors",
    images: [
      photo("Grandeur", "DSC05808-Edit copy.jpg", "Chalet Grandeur — main view"),
      photo("Grandeur", "DSC05824-Edit.jpg", "Chalet Grandeur — interior"),
      photo("Grandeur", "DSC05846-Edit.jpg", "Chalet Grandeur — interior detail"),
      photo("Grandeur", "DSC05859-Edit.jpg", "Chalet Grandeur — living space"),
      photo("Grandeur", "DSC05880-Edit copy.jpg", "Chalet Grandeur — deck"),
      photo("Grandeur", "DSC05898-Edit.jpg", "Chalet Grandeur — bedroom"),
      photo("Grandeur", "DSC05927-Edit.jpg", "Chalet Grandeur — interior detail"),
      photo("Grandeur", "DSC05887-Edit.jpg", "Chalet Grandeur — evening view"),
      photo("Grandeur", "DSC05650-Edit.jpg", "Bellevue Chalets — highland view"),
      photo("Grandeur", "DSC06034-Edit copy.jpg", "Chalet Grandeur — attic"),
      photo("Grandeur", "DSC06243-Edit.jpg", "Chalet Grandeur — living space"),
      photo("Mirador", "DSC05501-Edit.jpg", "Chalet Mirador — exterior"),
      photo("Mirador", "DSC05521-Edit.jpg", "Chalet Mirador — main view"),
      photo("Mirador", "DSC05543-Edit.jpg", "Chalet Mirador — interior detail"),
      photo("Mirador", "DSC05588-Edit.jpg", "Chalet Mirador — interior"),
      photo("Mirador", "DSC05637 copy.jpg", "Chalet Mirador — interior"),
      photo("Mirador", "DSC05640-Edit copy 2.jpg", "Chalet Mirador — evening view"),
      photo("Mirador", "DSC05689-Edit.jpg", "Chalet Mirador — view"),
      photo("Mirador", "DSC05656-Edit.jpg", "Chalet Mirador — detail"),
      photo("Mirador", "DSC05565-Edit.jpg", "Chalet Mirador — bedroom"),
      photo("Cove", "DSC05738-Edit.jpg", "Chalet Cove — interior"),
      photo("Cove", "DSC05719-Edit copy.jpg", "Chalet Cove — main view"),
      photo("Cove", "DSC05781-Edit copy.jpg", "Chalet Cove — evening view"),
    ],
  },
  {
    slug: "scenery-views",
    title: "Scenery & Views",
    images: [
      photo("Exterior and Views", "DJI_20250113073722_0909_D-Edit.jpg", "Bellevue Chalets at dusk, Ambewela"),
      photo("Exterior and Views", "IMG_5363.jpg", "Bellevue Chalets grounds"),
      photo("Exterior and Views", "DSC06167-Edit.jpg", "Misty highland morning"),
      photo("Exterior and Views", "DSC06107-Edit.jpg", "Scenic highland vista"),
      photo("Exterior and Views", "DSC06062-Edit.jpg", "Mountain views from the property"),
      photo("Exterior and Views", "DSC06027-Edit.jpg", "Highland landscape"),
      photo("Exterior and Views", "DJI_20250113074154_0924_D-Edit.jpg", "Drone view over the property"),
      photo("Mirador", "DSC05565-Edit.jpg", "View from Chalet Mirador"),
      photo("Grandeur", "DSC06217-Edit.jpg", "Chalet Grandeur — exterior"),
      photo("Cove", "DSC05471-Edit copy.jpg", "Chalet Cove — exterior"),
      photo("Cove", "DSC05754-Edit.jpg", "Chalet Cove — detail"),
      photo("Exterior and Views", "birdeyeshot.jpg", "Bird's-eye view of Bellevue Chalets"),
      photo("Exterior and Views", "45294a65-733d-4eba-8063-0a4685d6049a.jpg", "Bellevue Chalets exterior"),
      photo("Exterior and Views", "DJI_20250113065432_0854_D-Edit.jpg", "Aerial view of the highlands"),
      photo("Exterior and Views", "DSC06152-Edit.jpg", "Bellevue Chalets surroundings"),
      photo("Exterior and Views", "DSC06192-Edit.jpg", "Property and landscape"),
    ],
  },
  {
    slug: "dining-experience",
    title: "Dining Experience",
    images: [
      photo("Outdoor Dining & Meals", "DSC05449.jpg", "Outdoor dining setup"),
      photo("Outdoor Dining & Meals", "DSC05958.jpg", "Al fresco meal"),
      photo("Outdoor Dining & Meals", "DSC05965-Edit.jpg", "Dining in the highlands"),
      photo("Outdoor Dining & Meals", "DSC06259-Edit.jpg", "Outdoor dining experience"),
      photo("Outdoor Dining & Meals", "DSC06284.jpg", "Meal with a view"),
      photo("Outdoor Dining & Meals", "gardenbf.jpg", "Garden breakfast"),
    ],
  },
]

export function getAllGalleryPhotos(): GalleryPhoto[] {
  return gallerySections.flatMap((s) => s.images)
}

export type GalleryFilterSlug = "all" | "chalets-interiors" | "scenery-views" | "dining-experience"

export const galleryFilters: { slug: GalleryFilterSlug; title: string }[] = [
  { slug: "all", title: "All" },
  { slug: "chalets-interiors", title: "Chalets & Interiors" },
  { slug: "scenery-views", title: "Scenery & Views" },
  { slug: "dining-experience", title: "Dining Experience" },
]

function sectionImages(slug: string): GalleryPhoto[] {
  return gallerySections.find((s) => s.slug === slug)?.images ?? []
}

export function getGalleryPhotosForFilter(filter: GalleryFilterSlug): GalleryPhoto[] {
  switch (filter) {
    case "all":
      return getAllGalleryPhotos()
    case "chalets-interiors":
      return sectionImages("chalets-interiors")
    case "scenery-views":
      return sectionImages("scenery-views")
    case "dining-experience":
      return sectionImages("dining-experience")
    default:
      return getAllGalleryPhotos()
  }
}

export function getGalleryFilterTitle(filter: GalleryFilterSlug): string {
  return galleryFilters.find((f) => f.slug === filter)?.title ?? "Gallery"
}
