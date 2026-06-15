"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Maximize2,
  Users,
} from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { ChaletAmenitiesSection } from "@/components/chalets/chalet-amenities-section"
import { ChaletCard } from "@/components/chalets/chalet-card"
import { ChaletGallerySlider } from "@/components/chalets/chalet-gallery-slider"
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox"
import { getChaletAmenitiesImage } from "@/lib/chalet-photos"
import { getChaletAccentColor, CHALET_BUTTON_COLOR, CHALET_HIGHLIGHT_BEIGE, type Chalet } from "@/lib/chalets"
import { hotelOffers } from "@/lib/hotel-offers"

const ease = [0.22, 1, 0.36, 1] as const

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type ChaletDetailProps = {
  chalet: Chalet
  otherChalets: Chalet[]
}

export function ChaletDetail({ chalet, otherChalets }: ChaletDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [offerIndex, setOfferIndex] = useState(0)
  const accentColor = getChaletAccentColor(chalet)

  const images = chalet.images
  const collage = [images[1] ?? images[0], images[2] ?? images[0], images[3] ?? images[0]]

  const offer = hotelOffers[offerIndex]
  const offerImage = images[(offerIndex + 1) % images.length] ?? images[0]
  const nextOffer = () => setOfferIndex((i) => (i + 1) % hotelOffers.length)
  const prevOffer = () =>
    setOfferIndex((i) => (i - 1 + hotelOffers.length) % hotelOffers.length)

  const highlights = [
    { icon: Maximize2, value: `${chalet.roomSizeSqm} SQM`, label: "Room Size" },
    { icon: Users, value: `${chalet.maxGuests} ADULTS`, label: "Max Occupancy" },
    { icon: BedDouble, value: chalet.bedType, label: "Bed Type" },
  ]

  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation variant="hero" />

      {/* ── Hero ── */}
      <section className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={images[0].src}
          alt={chalet.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bellevue-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <h1 className="font-serif text-3xl uppercase tracking-[0.18em] text-white md:text-5xl lg:text-6xl">
            {chalet.name}
          </h1>
        </motion.div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-bellevue-black/8 bg-white">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1400px] items-center justify-center gap-2 px-6 py-5 font-sans text-[10px] tracking-[0.25em] uppercase text-bellevue-taupe lg:px-12"
        >
          <Link href="/" className="transition-colors hover:text-bellevue-gold">
            Home
          </Link>
          <span className="text-bellevue-gold">•</span>
          <Link href="/chalets" className="transition-colors hover:text-bellevue-gold">
            Accommodation
          </Link>
          <span className="text-bellevue-gold">•</span>
          <span className="text-bellevue-black">{chalet.name}</span>
        </nav>
      </div>

      {/* ── Window-frame collage — dragged down, hanging past green container ── */}
      <section className="overflow-visible bg-bellevue-cream px-6 py-16 pb-28 md:py-20 md:pb-32 lg:px-12 lg:py-24 lg:pb-40">
        <FadeIn className="mx-auto max-w-[1400px]">
          <div className="relative">
            {/* Green band — shorter than collage so images spill below */}
            <div
              className="absolute inset-x-0 top-8 z-0 h-[400px] sm:top-10 sm:h-[425px] md:top-10 md:h-[450px] lg:top-12 lg:h-[475px]"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 grid gap-10 px-6 sm:px-8 md:px-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14 lg:px-14 xl:gap-20">
              {/* Collage — pushed down, bottom extends past green */}
              <div className="relative translate-y-8 shadow-[0_32px_70px_-28px_rgba(26,26,26,0.45)] md:translate-y-12 lg:translate-y-16">
                <div className="grid h-[380px] grid-cols-2 grid-rows-2 gap-2 sm:h-[440px] md:h-[500px] md:gap-3 lg:h-[540px]">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(1)}
                    className="group relative row-span-2 overflow-hidden bg-white"
                  >
                    <Image
                      src={collage[0].src}
                      alt={collage[0].alt}
                      fill
                      sizes="(max-width: 1024px) 55vw, 32vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                  {collage.slice(1).map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i + 2)}
                      className="group relative overflow-hidden bg-white"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 40vw, 22vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center py-8 md:py-10 lg:min-h-[475px] lg:py-0">
                <h2 className="font-serif text-2xl leading-snug text-bellevue-black md:text-[1.85rem] lg:text-[2rem]">
                  {chalet.introHeading}
                </h2>
                <p className="mt-6 font-sans text-sm font-light leading-[1.85] text-bellevue-black/60 md:text-[15px]">
                  {chalet.introNote}
                </p>
                <Link
                  href="/#book"
                  className="mt-10 inline-flex items-center px-6 py-3.5 font-sans text-[11px] tracking-[0.25em] uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: CHALET_BUTTON_COLOR }}
                >
                  Check Availability
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Room highlights ── */}
      <section
        className="px-6 py-16 md:py-24 lg:px-12"
        style={{ backgroundColor: CHALET_BUTTON_COLOR }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-10 border-b border-white/15 pb-14 lg:grid-cols-[1fr_1.6fr]">
            <FadeIn>
              <h2 className="font-serif text-2xl tracking-[0.06em] text-white md:text-3xl">
                ROOM HIGHLIGHTS
              </h2>
              <p
                className="mt-3 font-sans text-sm font-light"
                style={{ color: CHALET_HIGHLIGHT_BEIGE }}
              >
                {chalet.sleepsLabel}
              </p>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((h, i) => (
                  <div
                    key={h.label}
                    className={`flex flex-col items-center gap-3 px-2 text-center md:flex-row md:gap-4 md:text-left ${
                      i > 0 ? "md:border-l md:border-white/15 md:pl-6" : ""
                    }`}
                  >
                    <h.icon
                      className="h-7 w-7 shrink-0 md:h-8 md:w-8"
                      style={{ color: CHALET_HIGHLIGHT_BEIGE }}
                      strokeWidth={1}
                    />
                    <div>
                      <p className="font-serif text-base text-white md:text-lg">
                        {h.value}
                      </p>
                      <p className="mt-0.5 font-sans text-[10px] tracking-[0.15em] uppercase text-white/60">
                        {h.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn className="mx-auto mt-14 max-w-3xl text-center">
            <h3 className="font-serif text-2xl leading-snug text-white md:text-[1.9rem]">
              {chalet.highlightsHeading}
            </h3>
            <p className="mt-6 font-sans text-[15px] font-light leading-[1.9] text-white/75">
              {chalet.highlightsBody}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Gallery slider — all chalet photos in a fixed frame ── */}
      <section
        className="px-6 pb-16 pt-0 md:pb-24 lg:px-12"
        style={{ backgroundColor: CHALET_BUTTON_COLOR }}
      >
        <FadeIn className="mx-auto max-w-[1400px]">
          <ChaletGallerySlider
            key={chalet.slug}
            images={images}
            onImageClick={setLightboxIndex}
          />
        </FadeIn>
      </section>

      <ChaletAmenitiesSection
        amenityImage={getChaletAmenitiesImage(chalet.slug)}
        amenities={chalet.amenities}
        accentColor={accentColor}
      />

      {/* ── More rooms ── */}
      <section className="bg-white px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn className="text-center">
            <h2 className="font-serif text-3xl tracking-[0.1em] text-bellevue-black md:text-4xl">
              MORE CHALETS
            </h2>
            <Link
              href="/chalets"
              className="mt-3 inline-flex flex-col items-center font-sans text-[10px] tracking-[0.25em] uppercase text-bellevue-taupe transition-colors hover:text-bellevue-gold"
            >
              View All
              <span className="mt-1 h-px w-8 bg-bellevue-gold/60" />
            </Link>
          </FadeIn>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-10">
            {otherChalets.map((other) => (
              <ChaletCard key={other.slug} chalet={other} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured offers ── */}
      <section className="bg-bellevue-cream px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn className="text-center">
            <h2 className="font-serif text-3xl tracking-[0.1em] text-bellevue-black md:text-4xl">
              FEATURED OFFERS
            </h2>
            <span className="mx-auto mt-3 block h-px w-10 bg-bellevue-gold/60" />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-12">
            <div className="grid items-stretch bg-white shadow-[0_30px_70px_-50px_rgba(26,26,26,0.5)] md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
                <Image
                  key={offerImage.src}
                  src={offerImage.src}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center px-8 py-12 md:px-12">
                {offer.featuredLabel && (
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-gold">
                    {offer.featuredLabel}
                  </span>
                )}
                <h3 className="mt-3 font-serif text-2xl text-bellevue-black md:text-3xl">
                  {offer.title}
                </h3>
                <p className="mt-4 font-sans text-sm font-light leading-[1.8] text-bellevue-black/60">
                  {offer.tagline}
                </p>
                <Link
                  href={offer.ctaHref}
                  className="mt-8 inline-flex items-center px-6 py-3.5 font-sans text-[11px] tracking-[0.25em] uppercase text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: CHALET_BUTTON_COLOR }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </FadeIn>

          <div className="mt-8 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={prevOffer}
              aria-label="Previous offer"
              className="text-bellevue-taupe transition-colors hover:text-bellevue-gold"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <span className="font-sans text-xs tracking-[0.2em] text-bellevue-black/60">
              {offerIndex + 1} / {hotelOffers.length}
            </span>
            <button
              type="button"
              onClick={nextOffer}
              aria-label="Next offer"
              className="text-bellevue-taupe transition-colors hover:text-bellevue-gold"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />

      <GalleryLightbox
        photos={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
        sectionTitle={chalet.name}
      />
    </main>
  )
}
