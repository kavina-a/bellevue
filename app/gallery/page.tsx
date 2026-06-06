"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"
import { GalleryBentoGrid } from "@/components/gallery/gallery-bento-grid"
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox"
import {
  galleryFilters,
  getGalleryFilterTitle,
  getGalleryPhotosForFilter,
  type GalleryFilterSlug,
} from "@/lib/gallery-photos"

const ease = [0.22, 1, 0.36, 1] as const

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterSlug>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const photos = useMemo(
    () => getGalleryPhotosForFilter(activeFilter),
    [activeFilter]
  )

  const filterTitle = getGalleryFilterTitle(activeFilter)

  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation variant="hero" />

      <PageCover
        src="/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"
        alt="Bellevue Chalets at dusk, Ambewela"
        title="Gallery"
        titleBg="bg-white"
        imageClassName="object-cover"
      />

      {/* Breadcrumb + intro */}
      <div className="border-b border-bellevue-black/8 bg-white px-6 py-8 text-center md:py-10 lg:px-12">
        <nav
          aria-label="Breadcrumb"
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-black/45"
        >
          <Link href="/" className="transition-colors hover:text-bellevue-gold">
            Home
          </Link>
          <span className="mx-2 text-bellevue-gold">•</span>
          <span className="text-bellevue-black/70">Gallery</span>
        </nav>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-6 max-w-2xl font-serif text-base leading-relaxed text-bellevue-black/70 md:text-lg"
        >
          Poised to take advantage of vast views of mountains, tea country, and
          cornflower-blue highland skies.
        </motion.p>
      </div>

      {/* Category filter */}
      <nav
        aria-label="Gallery categories"
        className="border-b border-bellevue-black/8 bg-white px-6 lg:px-12"
      >
        <div className="mx-auto flex max-w-[1400px] justify-center gap-2 overflow-x-auto py-6 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden">
          {galleryFilters.map((filter) => {
            const isActive = activeFilter === filter.slug
            return (
              <button
                key={filter.slug}
                type="button"
                onClick={() => {
                  setActiveFilter(filter.slug)
                  setLightboxIndex(null)
                }}
                className={`shrink-0 px-3 py-1 font-sans text-[10px] tracking-[0.28em] uppercase transition-colors duration-300 md:text-[11px] ${
                  isActive
                    ? "text-bellevue-black"
                    : "text-bellevue-black/40 hover:text-bellevue-black/70"
                }`}
              >
                <span className="relative inline-block">
                  {filter.title}
                  {isActive && (
                    <motion.span
                      layoutId="galleryFilterUnderline"
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-bellevue-black/70"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Bento gallery */}
      <section className="bg-white px-6 py-10 md:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1400px]">
          <GalleryBentoGrid
            photos={photos}
            onPhotoClick={setLightboxIndex}
          />
        </div>
      </section>

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        sectionTitle={filterTitle}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      <SiteFooter />
    </main>
  )
}
