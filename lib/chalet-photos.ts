export type ChaletSlug = "cove" | "mirador" | "grandeur"

export type ChaletPhoto = {
  src: string
  alt: string
  /**
   * CSS `object-position` value — controls which part of the photo stays
   * visible when it's cropped into a fixed-ratio frame (hero, card, collage).
   * Defaults to "center" if not set. Change per-photo, e.g. "center 30%".
   */
  focal?: string
}

const folderName: Record<ChaletSlug, string> = {
  cove: "Cove",
  mirador: "Mirador",
  grandeur: "Grandeur",
}

function photo(slug: ChaletSlug, filename: string, alt: string, focal?: string): ChaletPhoto {
  return {
    src: `/Photos/${folderName[slug]}/${encodeURIComponent(filename)}`,
    alt,
    focal,
  }
}

/**
 * Full ordered photo set per chalet — position 0 is the hero/main photo used
 * on the chalet card, chalets index, and the top of the chalet detail page.
 * This is also the gallery slider order on the chalet detail page.
 *
 * Sourced from the designer's finalized photo list. Adjust `focal` below to
 * change which part of a photo is visible when cropped.
 */
export const chaletPhotos: Record<ChaletSlug, ChaletPhoto[]> = {
  cove: [
    photo("cove", "DSC05719-Edit copy.jpg", "Chalet Cove — main view"),
    photo("cove", "DSC05738-Edit.jpg", "Chalet Cove — interior"),
    photo("cove", "DSC05650-Edit.jpg", "Chalet Cove — highland view"),
    photo("cove", "DSC05471-Edit copy.jpg", "Chalet Cove — exterior"),
    photo("cove", "DSC05754-Edit.jpg", "Chalet Cove — detail"),
    // NOTE: designer's list includes an amenity/bathroom photo here that
    // hasn't been delivered yet ("Amenity photo take bro"). Add it as the
    // 6th photo in this array once it's ready.
    photo("cove", "DSC05781-Edit copy.jpg", "Chalet Cove — evening view"),
  ],
  mirador: [
    // NOTE: designer's main/hero photo for Mirador is marked "GEN AI" with
    // no source file delivered yet. Using the first gallery photo as a
    // temporary hero — replace with the AI-generated image once ready.
    photo("mirador", "DSC05521-Edit.jpg", "Chalet Mirador — main view"),
    photo("mirador", "DSC05501-Edit.jpg", "Chalet Mirador — exterior"),
    photo("mirador", "DSC05637 copy.jpg", "Chalet Mirador — interior"),
    photo("mirador", "DSC05717.jpg", "Chalet Mirador — living space"),
    photo("mirador", "DSC05656-Edit.jpg", "Chalet Mirador — detail"),
    photo("mirador", "DSC05565-Edit.jpg", "Chalet Mirador — bedroom"),
    photo("mirador", "DSC05689-Edit.jpg", "Chalet Mirador — view"),
    photo("mirador", "DSC05543-Edit.jpg", "Chalet Mirador — interior detail"),
    photo("mirador", "DSC05650-Edit.jpg", "Chalet Mirador — highland view"),
    photo("mirador", "DSC05640-Edit copy 2.jpg", "Chalet Mirador — evening view"),
    // NOTE: designer's list includes an amenity/bathroom photo here that
    // hasn't been delivered yet ("Amenity photo take bro"). Add it as the
    // last photo in this array once it's ready.
  ],
  grandeur: [
    photo("grandeur", "DSC05808-Edit copy.jpg", "Chalet Grandeur — main view"),
    photo("grandeur", "DSC05859-Edit.jpg", "Chalet Grandeur — interior"),
    photo("grandeur", "DSC06243-Edit.jpg", "Chalet Grandeur — living space"),
    photo("grandeur", "DSC05898-Edit.jpg", "Chalet Grandeur — bedroom"),
    photo("grandeur", "DSC05915-Edit.jpg", "Chalet Grandeur — detail"),
    photo("grandeur", "DSC05927-Edit.jpg", "Chalet Grandeur — interior detail"),
    photo("grandeur", "DSC05940-Edit.jpg", "Chalet Grandeur — view"),
    photo("grandeur", "DSC05449.jpg", "Chalet Grandeur — dining"),
    photo("grandeur", "DSC06217-Edit.jpg", "Chalet Grandeur — exterior"),
    photo("grandeur", "DSC05880-Edit copy.jpg", "Chalet Grandeur — deck"),
    photo("grandeur", "DSC05650-Edit.jpg", "Chalet Grandeur — highland view"),
    // NOTE: designer's list includes an amenity/bathroom photo here that
    // hasn't been delivered yet ("Amenity photo take bro"). Add it here
    // once it's ready.
    photo("grandeur", "DSC05887-Edit.jpg", "Chalet Grandeur — evening view"),
    photo("grandeur", "DSC06034-Edit copy.jpg", "Chalet Grandeur — attic"),
  ],
}

/**
 * The 3-photo collage shown in the window-frame section near the top of
 * each chalet detail page. Curated separately from the full gallery above.
 */
export const chaletCollagePhotos: Record<ChaletSlug, ChaletPhoto[]> = {
  cove: [
    photo("cove", "TEA COFFEE.jpg", "Chalet Cove — tea and coffee service"),
    photo("cove", "DSC05738-Edit.jpg", "Chalet Cove — interior"),
    { src: "/Photos/Outdoor Dining & Meals/gardenbf.jpg", alt: "Chalet Cove — garden breakfast" },
  ],
  mirador: [
    photo("mirador", "DSC05565-Edit.jpg", "Chalet Mirador — bedroom"),
    photo("mirador", "DSC05717.jpg", "Chalet Mirador — living space"),
    { src: "/Photos/Outdoor Dining & Meals/gardenbf.jpg", alt: "Chalet Mirador — garden breakfast" },
  ],
  grandeur: [
    photo("grandeur", "DSC05859-Edit.jpg", "Chalet Grandeur — interior"),
    photo("grandeur", "DSC05449.jpg", "Chalet Grandeur — dining"),
    photo("grandeur", "DSC05898-Edit.jpg", "Chalet Grandeur — bedroom"),
  ],
}

export function getChaletHero(slug: ChaletSlug): ChaletPhoto {
  return chaletPhotos[slug][0]
}

export function getChaletImages(slug: ChaletSlug): ChaletPhoto[] {
  return chaletPhotos[slug]
}

export function getChaletCollage(slug: ChaletSlug): ChaletPhoto[] {
  return chaletCollagePhotos[slug]
}

/** Amenities photo per chalet for the shared IN-CHALET AMENITIES section. */
const amenitiesImage: Record<ChaletSlug, ChaletPhoto> = {
  cove: photo("cove", "DSC05719-Edit copy.jpg", "Chalet Cove — amenities"),
  mirador: photo("mirador", "DSC05717.jpg", "Chalet Mirador — amenities"),
  grandeur: photo("grandeur", "DSC05808-Edit copy.jpg", "Chalet Grandeur — amenities"),
}

export function getChaletAmenitiesImage(slug: ChaletSlug): ChaletPhoto {
  return amenitiesImage[slug]
}
