"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryPhoto } from "@/lib/gallery-photos"

const ease = [0.22, 1, 0.36, 1] as const

type GalleryLightboxProps = {
  photos: GalleryPhoto[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
  sectionTitle?: string
}

export function GalleryLightbox({
  photos,
  index,
  onClose,
  onNavigate,
  sectionTitle,
}: GalleryLightboxProps) {
  const isOpen = index !== null
  const current = index !== null ? photos[index] : null
  const total = photos.length

  const goPrev = useCallback(() => {
    if (index === null) return
    onNavigate((index - 1 + total) % total)
  }, [index, total, onNavigate])

  const goNext = useCallback(() => {
    if (index === null) return
    onNavigate((index + 1) % total)
  }, [index, total, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, onClose, goPrev, goNext])

  return (
    <AnimatePresence>
      {isOpen && current && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-0 z-[200] flex flex-col bg-bellevue-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Top bar */}
          <div
            className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              {(current.category ?? sectionTitle) && (
                <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-bellevue-gold">
                  {current.category ?? sectionTitle}
                </p>
              )}
              <p className="mt-1 font-sans text-[11px] tabular-nums tracking-[0.2em] text-white/50">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
            >
              <X className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </div>

          {/* Image */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:text-white md:left-6 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
                className="relative h-full w-full max-h-[75vh] max-w-[1200px]"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-all hover:border-white/40 hover:text-white md:right-6 md:h-12 md:w-12"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          {/* Caption */}
          <div
            className="shrink-0 border-t border-white/10 px-6 py-5 text-center md:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-base text-white/90 md:text-lg">
              {current.category ?? current.alt}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
