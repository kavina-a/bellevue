"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { ChaletPhoto } from "@/lib/chalet-photos"

const ease = [0.22, 1, 0.36, 1] as const

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
        className="group relative block aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]"
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
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-bellevue-black shadow-sm transition-colors hover:bg-white md:left-6 md:h-11 md:w-11"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-bellevue-black shadow-sm transition-colors hover:bg-white md:right-6 md:h-11 md:w-11"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </button>
          <span className="absolute bottom-4 right-4 z-10 bg-bellevue-black/50 px-3 py-1 font-sans text-[10px] tracking-[0.2em] text-white/90 md:bottom-6 md:right-6">
            {index + 1} / {total}
          </span>
        </>
      )}
    </div>
  )
}
