"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
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

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterSlug>("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const photos = useMemo(
    () => getGalleryPhotosForFilter(activeFilter),
    [activeFilter]
  )

  const filterTitle = getGalleryFilterTitle(activeFilter)

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src="/Photos/Exterior and Views/IMG_5363.jpg"
        alt="Bellevue Chalets grounds, Ambewela"
        imageScale
        title={
          <>
            Gallery
            <br />
          </>
        }
        description="A curated collection of moments from Bellevue Chalets, reflecting the architecture, landscapes, interiors, and experiences that define every stay"
      />

      {/* ── Category filter ── */}
      <nav
        aria-label="Gallery categories"
        className="border-b border-bellevue-black/8 bg-bellevue-cream px-6 lg:px-12"
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

      {/* ── Bento gallery ── */}
      <section className="bg-bellevue-cream px-6 py-10 md:py-14 lg:px-12 lg:py-16">
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
