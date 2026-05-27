import { NextResponse } from "next/server"
import { GOOGLE_PLACE_ID, type GoogleReviewsData } from "@/lib/review-count"

const FALLBACK: GoogleReviewsData = {
  rating: 4.9,
  reviewCount: 190,
}

export const revalidate = 86400

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID ?? GOOGLE_PLACE_ID

  if (!apiKey) {
    return NextResponse.json(FALLBACK)
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json")
    url.searchParams.set("place_id", placeId)
    url.searchParams.set("fields", "rating,user_ratings_total")
    url.searchParams.set("key", apiKey)

    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      return NextResponse.json(FALLBACK)
    }

    const payload = (await response.json()) as {
      status: string
      result?: { rating?: number; user_ratings_total?: number }
    }

    if (payload.status !== "OK" || !payload.result) {
      return NextResponse.json(FALLBACK)
    }

    const data: GoogleReviewsData = {
      rating: payload.result.rating ?? FALLBACK.rating,
      reviewCount: payload.result.user_ratings_total ?? FALLBACK.reviewCount,
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
