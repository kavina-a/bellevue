"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { ChaletPhoto } from "@/lib/chalet-photos"

const luxuryEase = [0.22, 1, 0.36, 1] as const
const SLIDE_DURATION_MS = 4000
const FADE_DURATION = 1.2

type ChaletImageCarouselProps = {
  images: ChaletPhoto[]
  isActive: boolean
  priority?: boolean
}

export function ChaletImageCarousel({ images, isActive, priority = false }: ChaletImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setCurrentIndex(0)
      return
    }

    if (images.length <= 1) return

    const id = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length)
    }, SLIDE_DURATION_MS)

    return () => window.clearInterval(id)
  }, [isActive, images.length])

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => {
        const isCurrent = index === currentIndex

        return (
          <motion.div
            key={image.src}
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{
              opacity: isCurrent ? 1 : 0,
              zIndex: isCurrent ? 2 : 1,
            }}
            transition={{
              opacity: { duration: FADE_DURATION, ease: luxuryEase },
              zIndex: { delay: isCurrent ? 0 : FADE_DURATION * 0.85 },
            }}
          >
            <motion.div
              className="absolute inset-[-4%] h-[108%] w-[108%]"
              initial={false}
              animate={{ scale: isCurrent ? 1.05 : 1 }}
              transition={{
                scale: isCurrent
                  ? { duration: SLIDE_DURATION_MS / 1000 + FADE_DURATION, ease: "linear" }
                  : { duration: 0 },
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority={priority && index === 0}
              />
            </motion.div>
          </motion.div>
        )
      })}

      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
    </div>
  )
}
