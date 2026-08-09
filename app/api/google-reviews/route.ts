import { NextResponse } from "next/server"
import { GOOGLE_PLACE_ID, type GoogleReviewsData } from "@/lib/review-count"

const FALLBACK: GoogleReviewsData = {
  rating: 4.9,
  reviewCount: 190,
}

function json(data: GoogleReviewsData, cacheSeconds: number) {
  return NextResponse.json(data, {
    headers: {
      "Cache-Control":
        cacheSeconds > 0
          ? `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds}`
          : "no-store",
    },
  })
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID ?? GOOGLE_PLACE_ID

  if (!apiKey) {
    console.warn("[google-reviews] GOOGLE_PLACES_API_KEY is missing — using fallback")
    return json(FALLBACK, 0)
  }

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json")
    url.searchParams.set("place_id", placeId)
    url.searchParams.set("fields", "rating,user_ratings_total")
    url.searchParams.set("key", apiKey)

    const response = await fetch(url.toString(), { cache: "no-store" })

    if (!response.ok) {
      console.warn("[google-reviews] HTTP error", response.status)
      return json(FALLBACK, 0)
    }

    const payload = (await response.json()) as {
      status: string
      error_message?: string
      result?: { rating?: number; user_ratings_total?: number }
    }

    if (payload.status !== "OK" || !payload.result) {
      console.warn(
        "[google-reviews] Places API error:",
        payload.status,
        payload.error_message ?? ""
      )
      return json(FALLBACK, 0)
    }

    const data: GoogleReviewsData = {
      rating: payload.result.rating ?? FALLBACK.rating,
      reviewCount: payload.result.user_ratings_total ?? FALLBACK.reviewCount,
    }

    // Cache successful live data for 1 hour
    return json(data, 3600)
  } catch (error) {
    console.warn("[google-reviews] Fetch failed:", error)
    return json(FALLBACK, 0)
  }
}
