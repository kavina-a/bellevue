"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  X,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Mountain,
  Users,
  Maximize2,
  Home,
  Layers,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"
import { getChaletImages, type ChaletPhoto } from "@/lib/chalet-photos"
import { SiteFooter } from "@/components/site-footer"

/* ─── Types ─── */

type KeyFeature = {
  icon: "home" | "area" | "bed" | "view" | "guests" | "layout"
  value: string
  label: string
}

type ChaletInfo = {
  id: string
  name: string
  tagline: string
  description: string
  extendedDescription?: string
  keyFeatures: KeyFeature[]
  amenities: string[]
  images: ChaletPhoto[]
}

/* ─── Data ─── */

const coveData: ChaletInfo = {
  id: "cove",
  name: "Chalet Cove",
  tagline: "Intimate Retreat",
  description:
    "A cozy and intimate retreat designed for couples seeking a peaceful escape. This private chalet features a plush Queen-size bed, a comfortable mini dining area, and a dedicated private entrance for complete seclusion.",
  extendedDescription:
    "Wake up to breathtaking views of Ambewela's rolling green hills and lush forests right from your bed.",
  keyFeatures: [
    { icon: "guests", value: "2 Adults", label: "Capacity" },
    { icon: "area", value: "Intimate", label: "Layout" },
    { icon: "bed", value: "Queen-size bed", label: "Bed" },
    { icon: "view", value: "Forest & Hills", label: "View" },
  ],
  amenities: [
    "Queen-size bed",
    "Accommodates up to 2 adults",
    "Free Wi-Fi",
    "Intercom phone",
    "Tea & coffee station",
    "Balcony with scenic views",
    "Private in-chalet dining",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
    "View & soothing sound of a natural water stream",
  ],
  images: getChaletImages("cove"),
}

const miradorData: ChaletInfo = {
  id: "mirador",
  name: "Chalet Mirador",
  tagline: "Beautiful View",
  description:
    "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort and serenity, Mirador is perfect for couples seeking a romantic escape or families of up to four adults.",
  extendedDescription:
    "True to its name — \"Beautiful View\" — the chalet opens to sweeping vistas of the Horton Plains Forest and the lush fields of Ambewela. A gentle stream flows through the property, enhancing the soothing atmosphere. Built entirely from wood, the chalet radiates warmth and rustic charm.",
  keyFeatures: [
    { icon: "guests", value: "2–4 Adults", label: "Capacity" },
    { icon: "area", value: "Two-Storey", label: "Layout" },
    { icon: "bed", value: "Two 4 ft double beds", label: "Bed" },
    { icon: "view", value: "Horton Plains", label: "View" },
  ],
  amenities: [
    "Two-storey layout",
    "Two 4 ft double beds",
    "Private living area",
    "Free Wi-Fi",
    "TV",
    "Mini fridge",
    "Hair dryer",
    "Intercom phone",
    "Tea & coffee station",
    "Private balcony with scenic views",
    "Private in-chalet dining",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
    "View & soothing sound of a natural water stream",
  ],
  images: getChaletImages("mirador"),
}

const grandeurData: ChaletInfo = {
  id: "grandeur",
  name: "Chalet Grandeur",
  tagline: "Spacious Luxury",
  description:
    "A spacious and elegant two-storey retreat, Grandeur is perfect for two couples, families, or a group of friends seeking a luxurious escape. This expansive chalet features two well-appointed double bedrooms and a cozy attic, offering plenty of space for relaxation.",
  extendedDescription:
    "Step onto the expansive deck to unwind in the cool, misty climate, where breathtaking panoramic views of Ambewela's lush green hills and surrounding forests provide the perfect backdrop for an unforgettable outdoor dining experience.",
  keyFeatures: [
    { icon: "guests", value: "Up to 5 Adults", label: "Capacity" },
    { icon: "area", value: "Two-Storey + Attic", label: "Layout" },
    { icon: "bed", value: "Queen + Double + Attic", label: "Bed" },
    { icon: "view", value: "Panoramic Hills", label: "View" },
  ],
  amenities: [
    "Two-storey layout with attic",
    "Bedroom 1: Queen-size bed",
    "Bedroom 2: 4 ft double bed",
    "Attic: 7 ft low bed",
    "Two separate bathrooms",
    "Writing table",
    "Spacious private living area",
    "Outdoor wooden deck area with scenic views",
    "Free Wi-Fi",
    "Smart TV",
    "Mini fridge",
    "Hair dryer",
    "Intercom phone",
    "Tea & coffee station",
    "Private in-chalet dining area",
    "Meals available (based on selected meal plan)",
    "À la carte dining options",
    "Outdoor breakfast with a view (on request)",
    "Towels & essential toiletries",
    "Dental kits provided",
    "Ironing facility (on request)",
    "Heaters (on request)",
    "View & soothing sound of a natural water stream",
  ],
  images: getChaletImages("grandeur"),
}

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const luxuryEase = [0.22, 1, 0.36, 1] as const
const luxuryTransition = { duration: 0.8, ease: luxuryEase }
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ ...luxuryTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Shared Components ─── */

function FeatureIcon({ icon, className = "w-5 h-5" }: { icon: KeyFeature["icon"]; className?: string }) {
  const props = { className, strokeWidth: 1.5 }
  switch (icon) {
    case "home": return <Home {...props} />
    case "area": return <Maximize2 {...props} />
    case "bed": return <BedDouble {...props} />
    case "view": return <Mountain {...props} />
    case "guests": return <Users {...props} />
    case "layout": return <Layers {...props} />
  }
}

/* ── Lightbox ── */

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: ChaletPhoto[]
  initialIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(initialIndex)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose, prev, next])

  useEffect(() => {
    const thumb = thumbsRef.current?.children[index] as HTMLElement | undefined
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-100 bg-black/95 flex flex-col"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 text-white/70 hover:text-white transition-colors"
        aria-label="Close gallery"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex-1 relative flex items-center justify-center px-4 md:px-16" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35 }}
            className="relative w-full h-[60vh] md:h-[72vh]"
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Previous photo"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Next photo"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="pb-5 pt-3 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center">
          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide max-w-3xl px-2"
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative shrink-0 w-16 h-12 overflow-hidden transition-all duration-300 ${
                  i === index
                    ? "ring-2 ring-white ring-offset-1 ring-offset-black opacity-100"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
        <p className="text-center text-white/40 text-[11px] tracking-[0.2em] mt-3 font-sans">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
      </div>
    </motion.div>
  )
}

/* ── Amenities Grid ── */

function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  return (
    <FadeIn>
      <h3 className="font-serif text-2xl text-center mb-10 text-bellevue-black">
        Amenities & Inclusions
      </h3>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 max-w-[960px] mx-auto">
        {amenities.map((a) => (
          <li key={a} className="flex items-start gap-3 font-sans text-[13px] leading-relaxed text-muted-foreground">
            <span className="mt-[7px] w-1 h-1 rounded-full shrink-0 bg-bellevue-gold" />
            {a}
          </li>
        ))}
      </ul>
    </FadeIn>
  )
}

/* ─── Page Hero ─── */

function PageHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src="/Photos/Exterior and Views/birdeyeshot.jpg"
          alt="Bellevue Chalets overlooking Ambewela"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-linear-to-b from-bellevue-black/45 via-bellevue-black/25 to-bellevue-black/65" />

      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: luxuryEase }}
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-white/70"
        >
          Accommodation
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: luxuryEase }}
          className="mt-5 font-serif text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.05] text-white max-w-4xl"
        >
          Our Luxury<br />
          <span className="italic text-bellevue-warm">Chalets</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: luxuryEase }}
          className="mt-6 max-w-xl font-sans text-base font-light leading-relaxed text-white/75"
        >
          Three private sanctuaries in the heart of Ambewela — each composed for a distinct way of
          experiencing the highlands.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: luxuryEase }}
          className="mt-10 h-px w-20 origin-center bg-bellevue-gold/60"
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-5 w-px bg-white/30"
        />
      </motion.div>
    </section>
  )
}

/* ─── Page Intro ─── */

function PageIntro() {
  return (
    <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-16 lg:pb-24 text-center">
      <FadeIn>
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-bellevue-taupe">
          Accommodation
        </span>
        <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.15] text-bellevue-black">
          Three Sanctuaries,{" "}
          <span className="italic font-light">Three Stories</span>
        </h1>
        <p className="mt-7 font-sans text-base lg:text-[17px] text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
          Each chalet at Bellevue is a world unto itself — designed with its own character, its own rhythm,
          and its own way of framing the extraordinary landscape of Ambewela.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {[
            { id: "cove", name: "Cove", sub: "Intimate · 2 Guests" },
            { id: "mirador", name: "Mirador", sub: "Scenic · 2–4 Guests" },
            { id: "grandeur", name: "Grandeur", sub: "Grand · Up to 5 Guests" },
          ].map((c) => (
            <Link
              key={c.id}
              href={`#${c.id}`}
              className="group px-7 py-4 border border-bellevue-warm hover:border-bellevue-gold transition-colors text-center"
            >
              <span className="block font-serif text-lg text-bellevue-black group-hover:text-bellevue-gold transition-colors">
                {c.name}
              </span>
              <span className="block mt-1 font-sans text-[10px] tracking-[0.15em] uppercase text-bellevue-taupe">
                {c.sub}
              </span>
            </Link>
          ))}
        </div>
      </FadeIn>
    </div>
  )
}

const reserveBtnClass =
  "inline-block px-10 py-4 bg-bellevue-black text-white text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-bellevue-forest transition-colors duration-500"

/* ═══════════════════════════════════════════════════════════════
   COVE — Magazine spread: hero beside text, photo strip below
   ═══════════════════════════════════════════════════════════════ */

function CoveSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const { images } = coveData

  const scrollStrip = (dir: "left" | "right") => {
    stripRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" })
  }

  return (
    <section id="cove" className="scroll-mt-20 bg-white border-t border-bellevue-black/8">
      {/* Header */}
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-6 text-center">
        <FadeIn>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-bellevue-gold">
            {coveData.tagline}
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-bellevue-black">
            {coveData.name}
          </h2>
        </FadeIn>
      </div>

      {/* Split: Hero Image + Text & Features */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-start">
          {/* Hero Image */}
          <FadeIn>
            <div
              className="relative aspect-4/5 lg:aspect-3/4 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-bellevue-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </FadeIn>

          {/* Text + Features */}
          <div className="py-4 lg:py-12">
            <FadeIn delay={0.15}>
              <p className="font-sans text-[15px] lg:text-base leading-[1.8] font-light text-muted-foreground">
                {coveData.description}
              </p>
              {coveData.extendedDescription && (
                <p className="mt-4 font-sans text-[15px] lg:text-base leading-[1.8] font-light text-muted-foreground">
                  {coveData.extendedDescription}
                </p>
              )}
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-10 pt-8 border-t border-bellevue-black/8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid grid-cols-2 gap-6"
                >
                  {coveData.keyFeatures.map((f) => (
                    <motion.div key={f.label} variants={fadeUp} transition={luxuryTransition}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <FeatureIcon icon={f.icon} className="w-[18px] h-[18px] text-bellevue-gold" />
                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-bellevue-taupe">
                          {f.label}
                        </span>
                      </div>
                      <p className="font-serif text-lg text-bellevue-black">{f.value}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <Link href="/#book" className={`mt-10 ${reserveBtnClass}`}>
                Reserve Chalet Cove
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Photo Strip */}
      <div className="mt-16 lg:mt-24 relative group/strip">
        <FadeIn>
          <div className="px-6 lg:px-12 mb-6 flex items-end justify-between max-w-[1400px] mx-auto">
            <h3 className="font-serif text-xl text-bellevue-black">Gallery</h3>
            <span className="font-sans text-[11px] tracking-[0.15em] text-bellevue-taupe">
              {images.length} photos
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => scrollStrip("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center text-bellevue-black opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              ref={stripRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide px-6 lg:px-12 snap-x snap-mandatory"
            >
              {images.slice(1).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i + 1)}
                  className="relative shrink-0 w-[260px] md:w-[300px] lg:w-[340px] aspect-3/2 overflow-hidden snap-start group/thumb"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-105"
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors duration-500" />
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollStrip("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center text-bellevue-black opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Amenities */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <AmenitiesGrid amenities={coveData.amenities} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MIRADOR — Cinematic hero, mosaic gallery
   ═══════════════════════════════════════════════════════════════ */

function MiradorSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { images } = miradorData

  return (
    <section id="mirador" className="scroll-mt-20 bg-bellevue-cream border-t border-bellevue-black/8">
      {/* Full-bleed Hero */}
      <FadeIn className="relative">
        <div
          className="relative h-[70vh] lg:h-[80vh] overflow-hidden cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-bellevue-black/70 via-bellevue-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/70">
              {miradorData.tagline}
            </span>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-none">
              {miradorData.name}
            </h2>
          </div>
        </div>
      </FadeIn>

      {/* Editorial Text + Features */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 items-start">
          <FadeIn>
            <p className="font-sans text-[15px] lg:text-base leading-[1.85] font-light text-muted-foreground">
              {miradorData.description}
            </p>
            {miradorData.extendedDescription && (
              <p className="mt-5 font-sans text-[15px] lg:text-base leading-[1.85] font-light text-muted-foreground">
                {miradorData.extendedDescription}
              </p>
            )}
            <Link href="/#book" className={`mt-10 ${reserveBtnClass}`}>
              Reserve Chalet Mirador
            </Link>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="border-l border-bellevue-black/10 pl-8 lg:pl-12">
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-bellevue-gold mb-8">
                At a Glance
              </h3>
              <div className="space-y-7">
                {miradorData.keyFeatures.map((f) => (
                  <div key={f.label} className="flex items-start gap-4">
                    <FeatureIcon icon={f.icon} className="w-5 h-5 text-bellevue-gold mt-0.5" />
                    <div>
                      <p className="font-serif text-xl text-bellevue-black">{f.value}</p>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-bellevue-taupe mt-0.5">
                        {f.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Mosaic Photo Grid */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-8">
        <FadeIn>
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-serif text-xl text-bellevue-black">Gallery</h3>
            <span className="font-sans text-[11px] tracking-[0.15em] text-bellevue-taupe">
              {images.length} photos
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-2 lg:gap-3">
            {/* Large left image */}
            <div
              className="col-span-2 row-span-2 relative aspect-square md:aspect-auto min-h-[300px] cursor-pointer group/mosaic overflow-hidden"
              onClick={() => setLightboxIndex(1)}
            >
              <Image
                src={images[1]?.src ?? images[0].src}
                alt={images[1]?.alt ?? images[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover/mosaic:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/mosaic:bg-black/10 transition-colors duration-500" />
            </div>

            {/* 4 smaller images */}
            {images.slice(2, 6).map((img, i) => {
              const isLast = i === 3
              const remaining = images.length - 6
              return (
                <div
                  key={i}
                  className="relative aspect-4/3 cursor-pointer group/mosaic overflow-hidden"
                  onClick={() => setLightboxIndex(i + 2)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/mosaic:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/mosaic:bg-black/10 transition-colors duration-500" />
                  {isLast && remaining > 0 && (
                    <div className="absolute inset-0 bg-bellevue-black/50 flex items-center justify-center transition-colors hover:bg-bellevue-black/60">
                      <span className="text-white font-sans text-sm tracking-wide">
                        +{remaining} more
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>

      {/* Amenities */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <AmenitiesGrid amenities={miradorData.amenities} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GRANDEUR — Split layout, showcase gallery + photo strip
   ═══════════════════════════════════════════════════════════════ */

function GrandeurSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const { images } = grandeurData

  const scrollStrip = (dir: "left" | "right") => {
    stripRef.current?.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" })
  }

  return (
    <section id="grandeur" className="scroll-mt-20 bg-white border-t border-bellevue-black/8">
      {/* Header */}
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-6 text-center">
        <FadeIn>
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-bellevue-gold">
            {grandeurData.tagline}
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight text-bellevue-black">
            {grandeurData.name}
          </h2>
        </FadeIn>
      </div>

      {/* Split: Text & features + hero image */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-14 items-start">
          <div className="py-4 lg:py-12 order-2 lg:order-1">
            <FadeIn>
              <p className="font-sans text-[15px] lg:text-base leading-[1.85] font-light text-muted-foreground">
                {grandeurData.description}
              </p>
              {grandeurData.extendedDescription && (
                <p className="mt-5 font-sans text-[15px] lg:text-base leading-[1.85] font-light text-muted-foreground">
                  {grandeurData.extendedDescription}
                </p>
              )}

              <div className="mt-10 pt-8 border-t border-bellevue-black/8 space-y-6">
                {grandeurData.keyFeatures.map((f) => (
                  <div key={f.label} className="flex items-start gap-4">
                    <FeatureIcon icon={f.icon} className="w-5 h-5 text-bellevue-gold mt-0.5" />
                    <div>
                      <p className="font-serif text-lg text-bellevue-black">{f.value}</p>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-bellevue-taupe mt-0.5">
                        {f.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/#book" className={`mt-10 ${reserveBtnClass}`}>
                Reserve Chalet Grandeur
              </Link>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div
              className="relative aspect-4/5 lg:aspect-3/4 overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 56vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-bellevue-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Showcase Gallery: Featured + 2 stacked */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-16 lg:mt-24">
        <FadeIn>
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-serif text-xl text-bellevue-black">Gallery</h3>
            <span className="font-sans text-[11px] tracking-[0.15em] text-bellevue-taupe">
              {images.length} photos
            </span>
          </div>

          <div className="grid md:grid-cols-[1.5fr_1fr] gap-3">
            {/* Large featured image */}
            <div
              className="relative aspect-4/3 overflow-hidden cursor-pointer group/showcase"
              onClick={() => setLightboxIndex(1)}
            >
              <Image
                src={images[1]?.src ?? images[0].src}
                alt={images[1]?.alt ?? images[0].alt}
                fill
                className="object-cover transition-transform duration-700 group-hover/showcase:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/showcase:bg-black/10 transition-colors duration-500" />
            </div>

            {/* 2 stacked images */}
            <div className="grid grid-rows-2 gap-3">
              {images.slice(2, 4).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-3/2 md:aspect-auto overflow-hidden cursor-pointer group/showcase"
                  onClick={() => setLightboxIndex(i + 2)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/showcase:scale-105"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/showcase:bg-black/10 transition-colors duration-500" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Remaining Photos Strip */}
      {images.length > 4 && (
        <div className="mt-6 relative group/strip">
          <FadeIn>
            <div className="relative">
              <button
                onClick={() => scrollStrip("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bellevue-black/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-bellevue-black"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                ref={stripRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide px-6 lg:px-12 snap-x snap-mandatory"
              >
                {images.slice(4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i + 4)}
                    className="relative shrink-0 w-[220px] md:w-[260px] lg:w-[300px] aspect-3/2 overflow-hidden snap-start group/thumb"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/thumb:scale-105"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/10 transition-colors duration-500" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollStrip("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-bellevue-black/80 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover/strip:opacity-100 transition-opacity duration-300 hover:bg-bellevue-black"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Amenities */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <AmenitiesGrid amenities={grandeurData.amenities} />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─── Page ─── */

export default function ChaletsPage() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />
      <PageHero />
      <PageIntro />
      <CoveSection />
      <MiradorSection />
      <GrandeurSection />
      <SiteFooter />
    </main>
  )
}
