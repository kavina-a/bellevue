export const GOOGLE_PLACE_ID = "ChIJg3vzjeGH4zoRE47e162JeUE"

export type GoogleReviewsData = {
  rating: number
  reviewCount: number
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}
