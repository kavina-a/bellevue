"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Maximize2,
  BedDouble,
  Mountain,
  Users,
  Layers,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"

type KeyFeature = {
  icon: "home" | "area" | "bed" | "view" | "guests" | "layout"
  value: string
  label: string
}

type ChaletTheme = {
  sectionBg: string
  sidebarBg: string
  sidebarBtnHover: string
  accent: string
  accentText: string
  heading: string
  body: string
  bullet: string
  border: string
  exploreBorder: string
  exploreHoverBorder: string
  exploreHoverTitle: string
  pillBorder: string
  pillText: string
  pillHoverBorder: string
  pillHoverText: string
  carouselControlBg: string
  carouselControlText: string
  imageTint: string
  reverseLayout?: boolean
}

const chaletThemes: Record<string, ChaletTheme> = {
  cove: {
    sectionBg: "bg-[#f7f0ea]",
    sidebarBg: "bg-[#9a7568]",
    sidebarBtnHover: "hover:bg-white hover:text-[#9a7568]",
    accent: "text-[#b8897a]",
    accentText: "text-[#9a7568]",
    heading: "text-[#3d2f2a]",
    body: "text-[#6b5a52]",
    bullet: "bg-[#9a7568]",
    border: "border-[#e8dcd4]",
    exploreBorder: "border-[#e8dcd4]",
    exploreHoverBorder: "hover:border-[#9a7568]",
    exploreHoverTitle: "group-hover:text-[#9a7568]",
    pillBorder: "border-[#d4b8ae]",
    pillText: "text-[#9a7568]",
    pillHoverBorder: "hover:border-[#9a7568]",
    pillHoverText: "hover:text-[#3d2f2a]",
    carouselControlBg: "bg-[#f7f0ea]/95",
    carouselControlText: "text-[#3d2f2a]",
    imageTint: "from-[#9a7568]/25 via-transparent to-[#3d2f2a]/10",
  },
  mirador: {
    sectionBg: "bg-[#eef3ef]",
    sidebarBg: "bg-[#3d5a48]",
    sidebarBtnHover: "hover:bg-[#eef3ef] hover:text-[#3d5a48]",
    accent: "text-[#5a7d62]",
    accentText: "text-[#3d5a48]",
    heading: "text-[#1e2e24]",
    body: "text-[#4a5c50]",
    bullet: "bg-[#3d5a48]",
    border: "border-[#c8d8cc]",
    exploreBorder: "border-[#c8d8cc]",
    exploreHoverBorder: "hover:border-[#3d5a48]",
    exploreHoverTitle: "group-hover:text-[#3d5a48]",
    pillBorder: "border-[#a8c4b0]",
    pillText: "text-[#3d5a48]",
    pillHoverBorder: "hover:border-[#3d5a48]",
    pillHoverText: "hover:text-[#1e2e24]",
    carouselControlBg: "bg-[#eef3ef]/95",
    carouselControlText: "text-[#1e2e24]",
    imageTint: "from-[#3d5a48]/20 via-transparent to-[#1e2e24]/15",
    reverseLayout: true,
  },
  grandeur: {
    sectionBg: "bg-[#f0ebe3]",
    sidebarBg: "bg-[#2c2824]",
    sidebarBtnHover: "hover:bg-[#b8956e] hover:text-[#2c2824]",
    accent: "text-[#b8956e]",
    accentText: "text-[#8a7048]",
    heading: "text-[#1a1714]",
    body: "text-[#5c5348]",
    bullet: "bg-[#b8956e]",
    border: "border-[#ddd4c4]",
    exploreBorder: "border-[#ddd4c4]",
    exploreHoverBorder: "hover:border-[#b8956e]",
    exploreHoverTitle: "group-hover:text-[#b8956e]",
    pillBorder: "border-[#c9b896]",
    pillText: "text-[#8a7048]",
    pillHoverBorder: "hover:border-[#b8956e]",
    pillHoverText: "hover:text-[#1a1714]",
    carouselControlBg: "bg-[#2c2824]/90",
    carouselControlText: "text-[#f0ebe3]",
    imageTint: "from-[#2c2824]/30 via-transparent to-[#b8956e]/10",
  },
}

type Chalet = {
  id: string
  name: string
  tagline: string
  heroImage: string
  description: string
  extendedDescription?: string
  keyFeatures: KeyFeature[]
  amenities: string[]
  images: string[]
  theme: ChaletTheme
}

const chaletData: Chalet[] = [
  {
    id: "cove",
    name: "Chalet Cove",
    tagline: "Intimate Retreat",
    heroImage: "/cove-1.jpg",
    description:
      "A cozy and intimate retreat designed for couples seeking a peaceful escape. This private chalet features a plush Queen-size bed, a comfortable mini dining area, and a dedicated private entrance for complete seclusion. Wake up to breathtaking views of Ambewela's rolling green hills and lush forests right from your bed.",
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
    images: ["/cove-1.jpg", "/DJI_20250113073722_0909_D-Edit.jpg"],
    theme: chaletThemes.cove,
  },
  {
    id: "mirador",
    name: "Chalet Mirador",
    tagline: "Beautiful View",
    heroImage: "/mirador.jpg",
    description:
      "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort and serenity, Mirador is perfect for couples seeking a romantic escape or families of up to four adults. Built entirely from wood, the chalet radiates warmth and rustic charm.",
    extendedDescription:
      "True to its name, Mirador — \"Beautiful View\" — the chalet opens to sweeping vistas of the Horton Plains Forest and the lush fields of Ambewela. A gentle stream flows through the property, enhancing the soothing atmosphere.",
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
    images: ["/mirador.jpg", "/DJI_20250113073722_0909_D-Edit.jpg"],
    theme: chaletThemes.mirador,
  },
  {
    id: "grandeur",
    name: "Chalet Grandeur",
    tagline: "Spacious Luxury",
    heroImage: "/granduer.jpg",
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
    images: ["/granduer.jpg", "/DJI_20250113073722_0909_D-Edit.jpg"],
    theme: chaletThemes.grandeur,
  },
]

function FeatureIcon({ icon }: { icon: KeyFeature["icon"] }) {
  const props = { className: "w-8 h-8 text-white/90 stroke-[1.25]", strokeWidth: 1.25 }
  switch (icon) {
    case "home":
      return <Home {...props} />
    case "area":
      return <Maximize2 {...props} />
    case "bed":
      return <BedDouble {...props} />
    case "view":
      return <Mountain {...props} />
    case "guests":
      return <Users {...props} />
    case "layout":
      return <Layers {...props} />
  }
}

function ImageCarousel({ images, name, theme }: { images: string[]; name: string; theme: ChaletTheme }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length)
  }

  return (
    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[520px] xl:h-[580px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image src={images[activeIndex]} alt={`${name} - ${activeIndex + 1}`} fill className="object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme.imageTint} pointer-events-none`} />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-0 backdrop-blur-sm ${theme.carouselControlBg}`}
        >
          <button
            onClick={() => goTo(activeIndex - 1)}
            className={`px-4 py-3 ${theme.carouselControlText} hover:opacity-70 transition-opacity border-r ${theme.border}`}
            aria-label="Previous image"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span
            className={`px-5 py-3 font-sans text-xs tracking-widest tabular-nums ${theme.carouselControlText}`}
          >
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => goTo(activeIndex + 1)}
            className={`px-4 py-3 ${theme.carouselControlText} hover:opacity-70 transition-opacity border-l ${theme.border}`}
            aria-label="Next image"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function KeyFeaturesSidebar({ features, theme }: { features: KeyFeature[]; theme: ChaletTheme }) {
  return (
    <div className={`${theme.sidebarBg} px-8 py-10 lg:px-10 lg:py-12 flex flex-col h-full`}>
      <h3 className="font-serif text-2xl lg:text-3xl text-white tracking-wide">Key Features</h3>

      <div className="mt-8 lg:mt-10 flex-1">
        {features.map((feature, index) => (
          <div key={feature.label}>
            <div className="flex items-start gap-5 py-6 lg:py-7">
              <FeatureIcon icon={feature.icon} />
              <div>
                <p className="font-sans text-lg lg:text-xl text-white leading-snug">{feature.value}</p>
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-white/70 mt-1">{feature.label}</p>
              </div>
            </div>
            {index < features.length - 1 && <div className="border-t border-white/20" />}
          </div>
        ))}
      </div>

      <Link
        href="/#book"
        className={`mt-8 inline-block w-full text-center px-6 py-3.5 border border-white/80 text-white text-[11px] tracking-[0.2em] uppercase font-sans transition-all duration-300 ${theme.sidebarBtnHover}`}
      >
        Book This Chalet
      </Link>
    </div>
  )
}

function ExploreOtherChalets({ currentId, theme }: { currentId: string; theme: ChaletTheme }) {
  const others = chaletData.filter((c) => c.id !== currentId)

  return (
    <div className={`mt-16 lg:mt-20 pt-12 border-t ${theme.border}`}>
      <h3 className={`font-serif text-2xl lg:text-3xl text-center mb-10 ${theme.heading}`}>
        Explore Other Chalets
      </h3>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {others.map((chalet) => {
          const otherTheme = chalet.theme
          return (
            <Link
              key={chalet.id}
              href={`#${chalet.id}`}
              className={`group grid grid-cols-[1fr_auto] items-center gap-6 p-6 lg:p-8 border transition-colors ${otherTheme.exploreBorder} ${otherTheme.exploreHoverBorder} ${otherTheme.sectionBg}`}
            >
              <div>
                <h4
                  className={`font-serif text-xl lg:text-2xl transition-colors ${otherTheme.heading} ${otherTheme.exploreHoverTitle}`}
                >
                  {chalet.name}
                </h4>
                <p className={`mt-1 text-[10px] tracking-[0.2em] uppercase ${otherTheme.accent}`}>
                  {chalet.tagline}
                </p>
                <div className="mt-4 space-y-3">
                  {chalet.keyFeatures.slice(0, 3).map((f) => (
                    <div key={f.label} className={`flex items-center gap-4 text-sm ${otherTheme.body}`}>
                      <span className={`font-sans ${otherTheme.heading}`}>{f.value}</span>
                      <span className="text-[10px] tracking-[0.15em] uppercase opacity-70">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-24 h-24 lg:w-28 lg:h-28 overflow-hidden shrink-0">
                <Image src={chalet.heroImage} alt={chalet.name} fill className="object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${otherTheme.imageTint} pointer-events-none`} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function PageIntro() {
  return (
    <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-4 lg:pb-8 text-center">
      <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-bellevue-taupe">Accommodation</span>
      <h1 className="mt-4 font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-tight text-bellevue-black">
        Luxury Chalets in the Heart of Ambewela
      </h1>
      <p className="mt-6 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
        Three unique sanctuaries where timeless elegance meets raw natural beauty. Each chalet offers a distinct
        experience of luxury, privacy, and breathtaking mountain views.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {chaletData.map((chalet) => (
          <Link
            key={chalet.id}
            href={`#${chalet.id}`}
            className={`px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase font-sans border transition-colors ${chalet.theme.pillBorder} ${chalet.theme.pillText} ${chalet.theme.pillHoverBorder} ${chalet.theme.pillHoverText}`}
          >
            {chalet.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

function ChaletBlock({ chalet }: { chalet: Chalet }) {
  const { theme } = chalet

  return (
    <section id={chalet.id} className={`${theme.sectionBg} scroll-mt-24`}>
      {/* Accent strip */}
      <div className={`h-1 ${theme.sidebarBg}`} />

      <div className="max-w-[900px] mx-auto px-6 lg:px-12 pt-14 lg:pt-16 pb-8 lg:pb-10 text-center">
        <span className={`font-sans text-[11px] tracking-[0.25em] uppercase ${theme.accent}`}>{chalet.tagline}</span>
        <h2 className={`mt-3 font-serif text-3xl md:text-4xl lg:text-[2.5rem] leading-tight ${theme.heading}`}>
          {chalet.name}
        </h2>
        <p className={`mt-5 font-sans text-base lg:text-lg leading-relaxed font-light ${theme.body}`}>
          {chalet.description}
        </p>
        {chalet.extendedDescription && (
          <p className={`mt-4 font-sans text-base lg:text-lg leading-relaxed font-light ${theme.body}`}>
            {chalet.extendedDescription}
          </p>
        )}
      </div>

      {/* Key Features + Carousel */}
      <div
        className={`grid lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr] ${
          theme.reverseLayout ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
        }`}
      >
        <KeyFeaturesSidebar features={chalet.keyFeatures} theme={theme} />
        <ImageCarousel images={chalet.images} name={chalet.name} theme={theme} />
      </div>

      {/* Amenities */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <h3 className={`font-serif text-2xl lg:text-3xl text-center mb-10 lg:mb-12 ${theme.heading}`}>Amenities</h3>
        <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-3 max-w-[900px] mx-auto">
          {chalet.amenities.map((amenity) => (
            <li key={amenity} className={`flex items-start gap-3 font-sans text-sm ${theme.body}`}>
              <span className={`mt-2 w-1 h-1 rounded-full shrink-0 ${theme.bullet}`} />
              {amenity}
            </li>
          ))}
        </ul>

        <ExploreOtherChalets currentId={chalet.id} theme={theme} />
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-bellevue-black border-t border-white/10 py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"
            alt="Bellevue Chalets by Pushella"
            width={200}
            height={60}
            className="h-14 w-auto brightness-0 invert"
          />
          <div className="flex items-center gap-8">
            <Link href="/#" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/#contact" className="text-sm text-white/60 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

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
    <main className="min-h-screen bg-white">
      <SiteNavigation variant="solid" />
      <PageIntro />
      {chaletData.map((chalet) => (
        <ChaletBlock key={chalet.id} chalet={chalet} />
      ))}
      <Footer />
    </main>
  )
}
