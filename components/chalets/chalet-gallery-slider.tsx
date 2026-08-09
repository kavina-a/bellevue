"use client"

import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import type { ChaletPhoto } from "@/lib/chalet-photos"

/** Apple-like ease — soft settle, no bounce */
const spacesEase = [0.32, 0.72, 0, 1] as const

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
  const [direction, setDirection] = useState(1)
  const total = images.length
  const current = images[index]

  const goPrev = useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  const goNext = useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % total)
  }, [total])

  if (!current) return null

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onImageClick?.(index)}
        className="group relative block aspect-[16/8.1] w-full overflow-hidden md:aspect-[21/8.1]"
        aria-label="Click to enlarge photograph"
      >
        {/* Mac Spaces–style swipe — panels glide past each other */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current.src}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                x: `${d * 72}%`,
                scale: 1.035,
                opacity: 0.55,
              }),
              center: {
                x: "0%",
                scale: 1,
                opacity: 1,
              },
              exit: (d: number) => ({
                x: `${d * -72}%`,
                scale: 0.97,
                opacity: 0.45,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: spacesEase,
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
              style={{ objectPosition: current.focal }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </button>

      <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <div className="hidden sm:block" aria-hidden />

        {total > 1 ? (
          <div className="flex items-center justify-center gap-10">
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
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={() => onImageClick?.(index)}
          className="group/enlarge flex items-center justify-end gap-3 justify-self-end font-sans text-[9px] tracking-[0.38em] uppercase text-white/40 transition-colors duration-500 hover:text-bellevue-gold/85"
        >
          <span className="h-px w-5 bg-white/20 transition-colors duration-500 group-hover/enlarge:bg-bellevue-gold/45" aria-hidden />
          Click to enlarge
          <span className="h-px w-5 bg-white/20 transition-colors duration-500 group-hover/enlarge:bg-bellevue-gold/45" aria-hidden />
        </button>
      </div>
    </div>
  )
}
