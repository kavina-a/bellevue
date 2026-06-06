"use client"

import Image from "next/image"
import {
  chunkGalleryImages,
  getBentoPlacements,
} from "@/lib/gallery-layouts"
import type { GalleryPhoto } from "@/lib/gallery-photos"

type GalleryBentoGridProps = {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}

function BentoMosaic({
  photos,
  startIndex,
  chunkIndex,
  onPhotoClick,
}: {
  photos: GalleryPhoto[]
  startIndex: number
  chunkIndex: number
  onPhotoClick: (index: number) => void
}) {
  const placements = getBentoPlacements(photos.length, chunkIndex)

  return (
    <div className="grid grid-cols-12 grid-rows-6 gap-[3px] bg-white shadow-[0_12px_48px_-20px_rgba(26,26,26,0.18)] md:min-h-[520px] lg:min-h-[640px] xl:min-h-[720px]">
      {photos.map((photo, i) => {
        const placement = placements[i]
        if (!placement) return null

        return (
          <button
            key={`${photo.src}-${startIndex + i}`}
            type="button"
            onClick={() => onPhotoClick(startIndex + i)}
            className="group relative min-h-[120px] overflow-hidden bg-bellevue-black/5 text-left sm:min-h-[140px]"
            style={{
              gridColumn: placement.gridColumn,
              gridRow: placement.gridRow,
            }}
            aria-label={`View ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06] transition-colors duration-300 group-hover:ring-black/15" />
            <div className="absolute inset-0 bg-bellevue-black/0 transition-colors duration-300 group-hover:bg-bellevue-black/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="border border-white/60 bg-bellevue-black/25 px-4 py-2 font-sans text-[9px] tracking-[0.3em] uppercase text-white backdrop-blur-[2px]">
                View
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export function GalleryBentoGrid({ photos, onPhotoClick }: GalleryBentoGridProps) {
  const chunks = chunkGalleryImages(photos, 7)

  if (photos.length === 0) {
    return (
      <p className="py-20 text-center font-sans text-sm text-bellevue-black/50">
        No images in this category yet.
      </p>
    )
  }

  return (
    <div className="space-y-[3px] bg-white">
      {chunks.map((chunk, chunkIndex) => {
        const startIndex = chunkIndex * 7
        return (
          <BentoMosaic
            key={`mosaic-${chunkIndex}-${chunk[0]?.src ?? "empty"}`}
            photos={chunk}
            startIndex={startIndex}
            chunkIndex={chunkIndex}
            onPhotoClick={onPhotoClick}
          />
        )
      })}
    </div>
  )
}
