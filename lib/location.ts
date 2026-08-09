/** Bellevue Chalets — Ambewela highlands */
export const BELLEVUE_LOCATION = {
  name: "Bellevue Chalets by Pushella",
  address: "Ambewela, Nuwara Eliya, Sri Lanka",
  latitude: 6.8786568,
  longitude: 80.8138217,
  placeId: "ChIJg3vzjeGH4zoRE47e162JeUE",
} as const

export const GOOGLE_MAPS_PLACE_URL =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${BELLEVUE_LOCATION.name}, ${BELLEVUE_LOCATION.address}`
  )}&query_place_id=${BELLEVUE_LOCATION.placeId}`

export const GOOGLE_MAPS_DIRECTIONS_URL =
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${BELLEVUE_LOCATION.name}, ${BELLEVUE_LOCATION.address}`
  )}&destination_place_id=${BELLEVUE_LOCATION.placeId}`

export const CONTACT = {
  phoneDisplay: "+94 71 150 1000",
  phoneTel: "+94711501000",
  whatsappUrl: "https://wa.me/94711501000",
  email: "info.bellevuechalets@gmail.com",
} as const
