/** Grid placement for architected bento mosaics (12-column × 6-row system). */
export type BentoPlacement = {
  gridColumn: string
  gridRow: string
}

/** Primary 7-tile mosaic — every column/row segment is covered. */
export const BENTO_MOSAIC_7: BentoPlacement[] = [
  { gridColumn: "1 / 6", gridRow: "1 / 5" },
  { gridColumn: "6 / 9", gridRow: "1 / 3" },
  { gridColumn: "9 / 13", gridRow: "1 / 3" },
  { gridColumn: "6 / 9", gridRow: "3 / 5" },
  { gridColumn: "9 / 13", gridRow: "3 / 7" },
  { gridColumn: "1 / 6", gridRow: "5 / 7" },
  { gridColumn: "6 / 9", gridRow: "5 / 7" },
]

/** Alternate 7-tile mosaic for visual rhythm between chunks. */
export const BENTO_MOSAIC_7_ALT: BentoPlacement[] = [
  { gridColumn: "1 / 7", gridRow: "1 / 4" },
  { gridColumn: "7 / 10", gridRow: "1 / 2" },
  { gridColumn: "10 / 13", gridRow: "1 / 4" },
  { gridColumn: "7 / 10", gridRow: "2 / 4" },
  { gridColumn: "1 / 5", gridRow: "4 / 7" },
  { gridColumn: "5 / 9", gridRow: "4 / 7" },
  { gridColumn: "9 / 13", gridRow: "4 / 7" },
]

/** 6-tile mosaic — extends the mid column so the bottom row has no gap. */
export const BENTO_MOSAIC_6: BentoPlacement[] = [
  { gridColumn: "1 / 6", gridRow: "1 / 5" },
  { gridColumn: "6 / 9", gridRow: "1 / 3" },
  { gridColumn: "9 / 13", gridRow: "1 / 3" },
  { gridColumn: "6 / 9", gridRow: "3 / 7" },
  { gridColumn: "9 / 13", gridRow: "3 / 7" },
  { gridColumn: "1 / 6", gridRow: "5 / 7" },
]

/** 5-tile mosaic — full-width bottom band closes the grid. */
export const BENTO_MOSAIC_5: BentoPlacement[] = [
  { gridColumn: "1 / 7", gridRow: "1 / 5" },
  { gridColumn: "7 / 10", gridRow: "1 / 3" },
  { gridColumn: "10 / 13", gridRow: "1 / 5" },
  { gridColumn: "7 / 13", gridRow: "3 / 5" },
  { gridColumn: "1 / 13", gridRow: "5 / 7" },
]

export const BENTO_MOSAIC_4: BentoPlacement[] = [
  { gridColumn: "1 / 7", gridRow: "1 / 4" },
  { gridColumn: "7 / 10", gridRow: "1 / 4" },
  { gridColumn: "10 / 13", gridRow: "1 / 4" },
  { gridColumn: "1 / 13", gridRow: "4 / 7" },
]

export const BENTO_MOSAIC_3: BentoPlacement[] = [
  { gridColumn: "1 / 9", gridRow: "1 / 4" },
  { gridColumn: "9 / 13", gridRow: "1 / 4" },
  { gridColumn: "1 / 13", gridRow: "4 / 7" },
]

export const BENTO_MOSAIC_2: BentoPlacement[] = [
  { gridColumn: "1 / 7", gridRow: "1 / 7" },
  { gridColumn: "7 / 13", gridRow: "1 / 7" },
]

export const BENTO_MOSAIC_1: BentoPlacement[] = [
  { gridColumn: "1 / 13", gridRow: "1 / 7" },
]

const MOSAIC_TEMPLATES_7 = [BENTO_MOSAIC_7, BENTO_MOSAIC_7_ALT] as const

const MOSAIC_BY_COUNT: Record<number, BentoPlacement[]> = {
  1: BENTO_MOSAIC_1,
  2: BENTO_MOSAIC_2,
  3: BENTO_MOSAIC_3,
  4: BENTO_MOSAIC_4,
  5: BENTO_MOSAIC_5,
  6: BENTO_MOSAIC_6,
}

export function chunkGalleryImages<T>(images: T[], size = 7): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < images.length; i += size) {
    chunks.push(images.slice(i, i + size))
  }
  return chunks
}

export function getBentoPlacements(
  count: number,
  chunkIndex: number
): BentoPlacement[] {
  if (count <= 0) return []

  if (count >= 7) {
    const template = MOSAIC_TEMPLATES_7[chunkIndex % MOSAIC_TEMPLATES_7.length]
    return template.slice(0, 7)
  }

  return MOSAIC_BY_COUNT[count] ?? BENTO_MOSAIC_1
}
