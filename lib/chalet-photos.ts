export type ChaletSlug = "cove" | "mirador" | "grandeur"

export type ChaletPhoto = {
  src: string
  alt: string
}

function photos(slug: ChaletSlug, count: number): ChaletPhoto[] {
  const folder = slug.charAt(0).toUpperCase() + slug.slice(1)
  const name = folder
  return Array.from({ length: count }, (_, i) => ({
    src: `/Photos/${folder}/${slug}-${i + 1}.jpg`,
    alt: `Chalet ${name} — ${i + 1}`,
  }))
}

/** Numbered photos per chalet. First photo is the hero. Add new files as `{slug}-N.jpg` in `public/Photos/{slug}/`. */
export const chaletPhotos: Record<ChaletSlug, ChaletPhoto[]> = {
  cove: photos("cove", 7),
  mirador: photos("mirador", 13),
  grandeur: photos("grandeur", 17),
}

export function getChaletHero(slug: ChaletSlug): ChaletPhoto {
  return chaletPhotos[slug][0]
}

export function getChaletImages(slug: ChaletSlug): ChaletPhoto[] {
  return chaletPhotos[slug]
}
