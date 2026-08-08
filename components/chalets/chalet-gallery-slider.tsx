"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import type { ChaletPhoto } from "@/lib/chalet-photos"

const ease = [0.22, 1, 0.36, 1] as const

function GalleryArrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="32"
      height="10"
      viewBox="0 0 32 10"
      fill="none"
      aria-hidden
      className="text-white/75"
    >
      {direction === "left" ? (
        <path
          d="M30 5H2M2 5L7 1M2 5L7 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M2 5H30M30 5L25 1M30 5L25 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

type ChaletGallerySliderProps = {
  images: ChaletPhoto[]
  onImageClick?: (index: number) => void
}

export function ChaletGallerySlider({
  images,
  onImageClick,
}: ChaletGallerySliderProps) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const current = images[index]

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  if (!current) return null

  return (
    <div className="relative">
      {/* Fixed frame — object-cover normalises mixed aspect ratios */}
      <button
        type="button"
        onClick={() => onImageClick?.(index)}
        className="group relative block aspect-[16/8.1] w-full overflow-hidden md:aspect-[21/8.1]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
              style={{ objectPosition: current.focal }}
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {total > 1 && (
        <div className="mt-8 flex items-center justify-center gap-10">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="transition-colors hover:[&_svg]:text-white"
          >
            <GalleryArrow direction="left" />
          </button>
          <span className="font-sans text-sm text-white/75">
            <span className="font-semibold text-white">{index + 1}</span>
            <span> / {total}</span>
          </span>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="transition-colors hover:[&_svg]:text-white"
          >
            <GalleryArrow direction="right" />
          </button>
        </div>
      )}
    </div>
  )
}
