"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox"
import { gallerySections, getAllGalleryPhotos, type GalleryPhoto } from "@/lib/gallery-photos"

const ease = [0.22, 1, 0.36, 1] as const

type FlatPhoto = GalleryPhoto & {
  globalIndex: number
  sectionSlug: string
  sectionTitle: string
}

function buildFlatPhotos(): FlatPhoto[] {
  let i = 0
  return gallerySections.flatMap((section) =>
    section.images.map((image) => ({
      ...image,
      globalIndex: i++,
      sectionSlug: section.slug,
      sectionTitle: section.title,
    }))
  )
}

const flatPhotos = buildFlatPhotos()

export default function GalleryPage() {
  const [activeSection, setActiveSection] = useState(gallerySections[0].slug)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [lightboxSection, setLightboxSection] = useState<string | undefined>()
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const lightboxPhotos = useMemo(() => {
    if (!lightboxSection) return getAllGalleryPhotos()
    return gallerySections.find((s) => s.slug === lightboxSection)?.images ?? getAllGalleryPhotos()
  }, [lightboxSection])

  const openLightbox = (globalIndex: number) => {
    const photo = flatPhotos[globalIndex]
    setLightboxSection(photo.sectionSlug)
    const section = gallerySections.find((s) => s.slug === photo.sectionSlug)
    const localIdx = section?.images.findIndex((img) => img.src === photo.src) ?? 0
    setLightboxIndex(localIdx)
  }

  const handleLightboxNavigate = (localIndex: number) => {
    setLightboxIndex(localIndex)
  }

  const scrollToSection = (slug: string) => {
    setActiveSection(slug)
    sectionRefs.current[slug]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    gallerySections.forEach(({ slug }) => {
      const el = sectionRefs.current[slug]
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(slug)
        },
        { rootMargin: "-120px 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  let imageIndex = 0

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      <section className="pt-32 pb-8 md:pt-40 md:pb-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="text-center"
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">
              Visual Journey
            </span>
            <h1 className="mt-4 font-serif text-4xl text-bellevue-black md:text-5xl lg:text-6xl">
              Gallery
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-bellevue-black/60">
              A glimpse of Bellevue Chalets — three private sanctuaries nestled in the misty
              highlands of Ambewela.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section nav */}
      <nav
        aria-label="Gallery categories"
        className="sticky top-20 z-40 border-y border-bellevue-black/8 bg-bellevue-cream/90 backdrop-blur-md md:top-24"
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallerySections.map((section) => {
              const isActive = activeSection === section.slug
              return (
                <button
                  key={section.slug}
                  type="button"
                  onClick={() => scrollToSection(section.slug)}
                  className={`shrink-0 px-4 py-2 font-sans text-[10px] tracking-[0.25em] uppercase transition-colors duration-500 md:px-5 md:text-[11px] ${
                    isActive
                      ? "text-bellevue-black"
                      : "text-bellevue-black/40 hover:text-bellevue-black/70"
                  }`}
                >
                  <span className="relative inline-block">
                    {section.title}
                    {isActive && (
                      <motion.span
                        layoutId="galleryNavUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-bellevue-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1400px] space-y-16 px-6 md:space-y-24 lg:px-12">
          {gallerySections.map((section) => (
            <div
              key={section.slug}
              id={section.slug}
              ref={(el) => {
                sectionRefs.current[section.slug] = el
              }}
              className="scroll-mt-36 md:scroll-mt-40"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="mb-8 font-serif text-2xl text-bellevue-black md:text-3xl"
              >
                {section.title}
              </motion.h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {section.images.map((image) => {
                  const globalIndex = imageIndex++
                  return (
                    <motion.button
                      key={image.src}
                      type="button"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: (globalIndex % 8) * 0.05, ease }}
                      onClick={() => openLightbox(globalIndex)}
                      className="group relative overflow-hidden text-left"
                      aria-label={`View ${image.alt}`}
                    >
                      <div className="relative aspect-square min-h-[200px]">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="border border-white/50 px-4 py-2 font-sans text-[9px] tracking-[0.3em] uppercase text-white">
                            View
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <GalleryLightbox
        photos={lightboxPhotos}
        index={lightboxIndex}
        sectionTitle={
          lightboxSection
            ? gallerySections.find((s) => s.slug === lightboxSection)?.title
            : undefined
        }
        onClose={() => {
          setLightboxIndex(null)
          setLightboxSection(undefined)
        }}
        onNavigate={handleLightboxNavigate}
      />

      <SiteFooter />
    </main>
  )
}
