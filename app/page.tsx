"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { easeOutCubic, type GoogleReviewsData } from "@/lib/review-count"
import Image from "next/image"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"
import { Play, Pause, Volume2, VolumeX, ArrowRight, ArrowLeft, Quote, Plus, ArrowUp, Facebook, Instagram, Mail, Phone, MapPin, Star, Linkedin } from "lucide-react"

const GOOGLE_REVIEWS_URL = "https://www.google.com/travel/search?g2lb=4965990,72471280,72560029,72573224,72647020,72686036,72803964,72882230,73064764,121529349,121608705&hl=en-LK&gl=lk&cs=1&ssta=1&q=bellevue+chalets+by+pushella&ts=CAEaRwopEicyJTB4M2FlMzg3ZTE4ZGYzN2I4MzoweDQxNzk4OWFkZDdkZThlMTMSGhIUCgcI6g8QBhgMEgcI6g8QBhgNGAEyAhAA&qs=CAEyE0Nnb0lrNXo2dnQyMTRyeEJFQUU4AkIJCROO3tetiXlBQgkJE47e162JeUE&ap=ugEHcmV2aWV3cw&ictx=111"

// Chalet data
const chalets = [
  { name: "Chalet Cove", slug: "cove", tagline: "Intimate Retreat" },
  { name: "Chalet Mirador", slug: "mirador", tagline: "Beautiful View" },
  { name: "Chalet Grandeur", slug: "grandeur", tagline: "Spacious Luxury" },
]

// Video Hero Section
function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tryPlay = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch {
        setIsPlaying(false)
      }
    }

    tryPlay()
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            poster="/DJI_20250113073722_0909_D-Edit.jpg"
            onError={() => setVideoFailed(true)}
          >
            <source src="/landing-page.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/DJI_20250113073722_0909_D-Edit.jpg"
            alt="Bellevue Chalets at dusk, Ambewela"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Dark elegant overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-end items-end text-right px-6 lg:px-12 pb-14 md:pb-24 lg:pb-32 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white max-w-2xl leading-tight"
        >
          Escape to Extraordinary
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 font-sans text-lg md:text-xl text-white/80 font-light tracking-wide max-w-xl"
        >
          Experience luxury mountain living in Ambewela, where misty highlands meet timeless comfort.
        </motion.p>
      </div>

      {/* Video Controls */}
      {!videoFailed && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 flex items-center gap-4"
      >
        <button
          onClick={togglePlay}
          className="p-3 border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4" strokeWidth={1.5} /> : <Play className="w-4 h-4" strokeWidth={1.5} />}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" strokeWidth={1.5} /> : <Volume2 className="w-4 h-4" strokeWidth={1.5} />}
        </button>
      </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-white/40 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

// About Section - Editorial split layout with parallax
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section ref={sectionRef} className="relative bg-bellevue-cream overflow-hidden" id="about">
      {/* Decorative top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-4 pt-16">
        <span className="w-16 h-px bg-bellevue-gold/40" />
        <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-gold">Est. 2025</span>
        <span className="w-16 h-px bg-bellevue-gold/40" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-32 md:py-40 lg:py-48">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left - Image with parallax */}
          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/DJI_20250113073722_0909_D-Edit.jpg"
                alt="Bellevue Chalets at dusk, Ambewela"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </motion.div>
            {/* Vertical text decoration */}
            <div className="absolute -left-4 top-0 h-full hidden lg:flex flex-col justify-center">
              <span
                className="font-sans text-[10px] tracking-[0.5em] uppercase text-bellevue-black/40"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                Ambewela — Sri Lanka
              </span>
            </div>
            {/* Floating accent number */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-bellevue-cream p-6 hidden md:block"
            >
              <p className="font-serif text-5xl text-bellevue-forest">03</p>
              <p className="mt-1 font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-black/60">
                Private Chalets
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Text with staggered reveal */}
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7 lg:pl-8"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="block font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold"
            >
              Our Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-bellevue-black leading-[1.1]"
            >
              {"Ambewela's"}<br />
              <span className="text-bellevue-forest">Hidden Paradise</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 h-px bg-bellevue-gold/40 w-24 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-10 font-sans text-lg text-bellevue-black/70 leading-relaxed"
            >
              Welcome to Bellevue Chalets by Pushella, a peaceful retreat nestled in the misty mountains of
              Ambewela. Experience a one-of-a-kind luxury chalet stay with warm wooden accents, surrounded
              by lush greenery and the soothing presence of flowing waters.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 font-sans text-base text-bellevue-black/60 leading-relaxed"
            >
              From farm-to-table meals prepared with fresh local ingredients to thoughtful touches throughout
              your stay, every moment with us is crafted to be remembered forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 group font-sans text-sm tracking-[0.2em] uppercase text-bellevue-black hover:text-bellevue-gold transition-colors"
              >
                <span>Discover Our Purpose</span>
                <span className="w-12 h-px bg-bellevue-black group-hover:bg-bellevue-gold group-hover:w-16 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Parallax Quote Divider — cinematic break between sections
function QuoteDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0, 1, 1, 0])
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05])

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-125">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
          alt="Misty highlands"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bellevue-black/50" />
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="relative h-full flex flex-col items-center justify-center text-center px-6"
      >
        <span className="font-sans text-xs tracking-[0.5em] uppercase text-bellevue-gold">Philosophy</span>
        <div className="mt-6 mb-8 w-px h-12 bg-bellevue-gold/60" />
        <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.2] max-w-4xl italic">
          {"\u201CWhere stillness becomes a luxury, and nature is the host.\u201D"}
        </h3>
        <p className="mt-10 font-sans text-xs tracking-[0.4em] uppercase text-white/60">
          — Bellevue Chalets, Ambewela
        </p>
      </motion.div>
    </section>
  )
}

// Stats / Pillars strip — adds editorial rhythm between sections
function PillarsStrip() {
  const pillars = [
    { number: "1,800m", label: "Elevation" },
    { number: "100%", label: "Farm-to-Table" },
    { number: "24/7", label: "Concierge" },
    { number: "5★", label: "Hospitality" },
  ]
  return (
    <section className="bg-bellevue-cream border-y border-bellevue-gold/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center md:border-l md:first:border-l-0 md:border-bellevue-black/10 md:px-6"
            >
              <p className="font-serif text-4xl md:text-5xl text-bellevue-forest">{p.number}</p>
              <p className="mt-3 font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-black/50">
                {p.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Luxury Chalets Section - Completely redesigned
const chaletDetails = [
  {
    name: "Chalet Cove",
    slug: "cove",
    tagline: "Intimate Retreat",
    description: "A cozy and intimate retreat designed for couples seeking a peaceful escape. This private chalet features a plush Queen-size bed and breathtaking views of Ambewela's rolling green hills.",
    image: "/cove-1.jpg",
    guests: "2 Adults",
  },
  {
    name: "Chalet Mirador",
    slug: "mirador",
    tagline: "Beautiful View",
    description: "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort, perfect for couples or families of up to four adults.",
    image: "/mirador.jpg",
    guests: "2-4 Adults",
  },
  {
    name: "Chalet Grandeur",
    slug: "grandeur",
    tagline: "Spacious Luxury",
    description: "A spacious and elegant two-storey retreat perfect for two couples, families, or a group of friends. Features two well-appointed bedrooms, a cozy attic, and an expansive outdoor deck.",
    image: "/granduer.jpg",
    guests: "Up to 5 Adults",
  },
]

function ChaletsSection() {
  const [activeChalet, setActiveChalet] = useState(0)
  const [direction, setDirection] = useState(1)
  const luxuryEase = [0.22, 1, 0.36, 1] as const

  const selectChalet = (index: number) => {
    if (index === activeChalet) return
    setDirection(index > activeChalet ? 1 : -1)
    setActiveChalet(index)
  }

  const active = chaletDetails[activeChalet]

  return (
    <section className="bg-bellevue-black py-24 md:py-32 lg:py-40 overflow-hidden" id="chalets">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: luxuryEase }}
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 lg:mb-24"
        >
          <div>
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold">— Our Chalets</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              Three sanctuaries.
              <br />
              <span className="italic text-white/70">One unforgettable retreat.</span>
            </h2>
          </div>
          <p className="max-w-md font-sans text-white/50 leading-relaxed font-light">
            Each residence is its own world — distinctly composed for couples, families, or
            those seeking solitude in the highlands.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-0">
          {/* Left — Chalet Selector */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pr-14">
            <div className="relative">
              {chaletDetails.map((chalet, index) => {
                const isActive = activeChalet === index
                return (
                  <motion.button
                    key={chalet.slug}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: luxuryEase }}
                    viewport={{ once: true }}
                    onClick={() => selectChalet(index)}
                    className="group relative w-full text-left py-7 md:py-8 border-b border-white/[0.08]"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="chaletActiveLine"
                        className="absolute left-0 top-6 bottom-6 w-px bg-bellevue-gold"
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    )}

                    <div className="pl-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <motion.span
                          animate={{
                            color: isActive ? "rgba(184, 149, 110, 1)" : "rgba(255, 255, 255, 0.35)",
                          }}
                          transition={{ duration: 0.5, ease: luxuryEase }}
                          className="font-sans text-[10px] tracking-[0.25em] uppercase block"
                        >
                          {String(index + 1).padStart(2, "0")} — {chalet.tagline}
                        </motion.span>

                        <motion.h3
                          animate={{
                            color: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.45)",
                          }}
                          transition={{ duration: 0.5, ease: luxuryEase }}
                          className="mt-2 font-serif text-2xl md:text-[1.75rem] leading-tight"
                        >
                          {chalet.name}
                        </motion.h3>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key={`detail-${chalet.slug}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                opacity: { duration: 0.45, ease: luxuryEase },
                                height: { duration: 0.55, ease: luxuryEase },
                              }}
                              className="overflow-hidden"
                            >
                              <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.5, delay: 0.08, ease: luxuryEase }}
                                className="mt-4 font-sans text-sm text-white/55 leading-relaxed font-light"
                              >
                                {chalet.description}
                              </motion.p>
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45, delay: 0.14, ease: luxuryEase }}
                                className="mt-4 font-sans text-[10px] tracking-[0.2em] uppercase text-white/35"
                              >
                                {chalet.guests}
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          x: isActive ? 0 : -8,
                        }}
                        transition={{ duration: 0.45, ease: luxuryEase }}
                        className="pt-1 shrink-0"
                      >
                        <ArrowRight className="w-5 h-5 text-bellevue-gold" strokeWidth={1.25} />
                      </motion.div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: luxuryEase }}
              viewport={{ once: true }}
              className="mt-10 pl-5"
            >
              <Link
                href="/chalets"
                className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.25em] uppercase text-bellevue-gold hover:text-white transition-colors duration-500"
              >
                <span>Explore All Chalets</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.25} />
              </Link>
            </motion.div>
          </div>

          {/* Right — Layered image panel */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-bellevue-dark-forest">
              {/* Stacked images — crossfade without unmounting */}
              {chaletDetails.map((chalet, index) => {
                const isActive = activeChalet === index
                return (
                  <motion.div
                    key={chalet.slug}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 1.06,
                      zIndex: isActive ? 2 : 1,
                    }}
                    transition={{
                      opacity: { duration: 0.9, ease: luxuryEase },
                      scale: { duration: 1.35, ease: luxuryEase },
                      zIndex: { delay: isActive ? 0 : 0.85 },
                    }}
                  >
                    <Image
                      src={chalet.image}
                      alt={chalet.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
                  </motion.div>
                )
              })}

              {/* Overlay content — direction-aware text swap */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12 pointer-events-none">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active.slug}
                    custom={direction}
                    variants={{
                      enter: (d: number) => ({
                        opacity: 0,
                        y: d > 0 ? 28 : -28,
                        filter: "blur(6px)",
                      }),
                      center: { opacity: 1, y: 0, filter: "blur(0px)" },
                      exit: (d: number) => ({
                        opacity: 0,
                        y: d > 0 ? -20 : 20,
                        filter: "blur(4px)",
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.65, ease: luxuryEase }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-gold">
                      {active.tagline}
                    </span>
                    <h3 className="mt-2 font-serif text-3xl md:text-4xl lg:text-[2.75rem] text-white leading-[1.05]">
                      {active.name}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* View Details — fades with content */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.45, ease: luxuryEase }}
                  >
                    <Link
                      href={`/chalets#${active.slug}`}
                      className="inline-block px-6 py-3 bg-white/[0.08] backdrop-blur-md border border-white/25 text-white font-sans text-[11px] tracking-[0.15em] uppercase hover:bg-white hover:text-bellevue-black transition-colors duration-500"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress indicators */}
            <div className="mt-8 flex items-center justify-center gap-4">
              {chaletDetails.map((chalet, index) => (
                <button
                  key={chalet.slug}
                  onClick={() => selectChalet(index)}
                  className="group flex flex-col items-center gap-2 py-1"
                  aria-label={`View ${chalet.name}`}
                >
                  <motion.div
                    className="h-px bg-white/20 overflow-hidden"
                    animate={{ width: activeChalet === index ? 56 : 28 }}
                    transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  >
                    <motion.div
                      className="h-full bg-bellevue-gold"
                      animate={{ scaleX: activeChalet === index ? 1 : 0 }}
                      transition={{ duration: 0.55, ease: luxuryEase }}
                      style={{ originX: 0 }}
                    />
                  </motion.div>
                  <span
                    className={`font-sans text-[9px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                      activeChalet === index ? "text-bellevue-gold" : "text-white/25 group-hover:text-white/45"
                    }`}
                  >
                    {chalet.name.replace("Chalet ", "")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Experiences Section
function ExperiencesSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="offers">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop"
          alt="Mountain landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">Curated Experiences</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Beyond the Ordinary
            </h2>
            <p className="mt-8 font-sans text-lg text-white/80 leading-relaxed">
              From scenic tea trail walks and farm visits to private dining experiences with locally sourced ingredients, 
              we curate moments that transform your stay into unforgettable memories in the heart of Sri Lankan highlands.
            </p>
            <Link
              href="/offers"
              className="inline-block mt-10 px-8 py-3 border border-white/50 text-white font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-bellevue-black transition-all duration-300"
            >
              View Special Offers
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { title: "Tea Trails", desc: "Highland walks" },
              { title: "Farm Dining", desc: "Local ingredients" },
              { title: "Nature Walks", desc: "Forest exploration" },
              { title: "Private Dining", desc: "In-chalet experience" },
            ].map((exp) => (
              <div
                key={exp.title}
                className="p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                <h3 className="font-serif text-xl text-white">{exp.title}</h3>
                <p className="mt-2 text-sm text-white/60">{exp.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials data - inspired by guest feedback on Google
const testimonials = [
  {
    quote: "An unforgettable escape into nature. The chalets are beautifully designed and the attention to detail is remarkable. Waking up to the misty mountains was pure magic.",
    author: "Sarah & Michael",
    location: "Colombo, Sri Lanka",
    rating: 5,
  },
  {
    quote: "Bellevue Chalets exceeded all our expectations. The privacy, the views and the warm hospitality made this our most memorable vacation. We will definitely return.",
    author: "James Thompson",
    location: "London, United Kingdom",
    rating: 5,
  },
  {
    quote: "A hidden gem in the highlands. The farm-to-table dining was exceptional and the peaceful atmosphere helped us truly disconnect and relax.",
    author: "Priya & Arun",
    location: "Chennai, India",
    rating: 5,
  },
  {
    quote: "The perfect blend of luxury and nature. Every detail was thoughtfully curated. The team made us feel like family from the moment we arrived.",
    author: "Emma Wilson",
    location: "Sydney, Australia",
    rating: 5,
  },
  {
    quote: "Tucked away in the clouds — quite literally. The view from the chalet at sunrise is something I will never forget. Service was warm and seamless.",
    author: "Daniel Fernando",
    location: "Kandy, Sri Lanka",
    rating: 5,
  },
  {
    quote: "Quiet, elegant, and incredibly thoughtful. From the welcome tea to the bedtime turn-down, the small touches made all the difference.",
    author: "Aiko Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
  },
  {
    quote: "Stayed two nights and could easily have stayed two weeks. The chalet is stunning, the food is incredible, and the staff are simply lovely.",
    author: "Leila Mansour",
    location: "Dubai, UAE",
    rating: 5,
  },
  {
    quote: "Best stay we have had in Sri Lanka by a long way. Stylish, peaceful and run with real care. Already planning our next visit.",
    author: "Oliver & Grace Bennett",
    location: "Melbourne, Australia",
    rating: 5,
  },
]

// Google "G" mark
function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  )
}

// A single review card used in the marquee
function ReviewCard({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.author
    .split(" ")
    .filter((p) => /^[A-Za-z]/.test(p))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase()

  return (
    <article className="shrink-0 w-[320px] sm:w-[360px] lg:w-[400px] mx-3 lg:mx-4 bg-white rounded-[28px] border border-bellevue-black/5 shadow-[0_10px_40px_-18px_rgba(26,26,26,0.18)] p-8 lg:p-10 flex flex-col">
      {/* Decorative opening quote — large, gold, serif */}
      <span
        aria-hidden
        className="font-serif text-[72px] leading-[0.6] text-bellevue-gold select-none"
      >
        &ldquo;
      </span>

      <p className="mt-5 font-sans text-[15px] leading-[1.7] text-bellevue-black/75 line-clamp-5 min-h-[140px]">
        {t.quote}
      </p>

      <div className="mt-7 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-bellevue-forest flex items-center justify-center shrink-0">
          <span className="font-serif text-sm text-white tracking-wide">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[15px] font-medium text-bellevue-black truncate">
            {t.author}
          </p>
          <p className="font-sans text-xs text-bellevue-black/50 truncate mt-0.5">
            {t.location}
          </p>
        </div>
      </div>
    </article>
  )
}

// Reusable marquee row — framer-motion drives a perfectly smooth, seamless loop.
// Content is duplicated, so animating x by exactly -50% (or +50%) loops without a visible reset.
function MarqueeRow({
  items,
  direction = "left",
  duration = 60,
}: {
  items: typeof testimonials
  direction?: "left" | "right"
  duration?: number
}) {
  return (
    <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <motion.div
        className="flex w-max will-change-transform"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            duration,
          },
        }}
      >
        {[...items, ...items].map((t, i) => (
          <ReviewCard key={`${direction}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

// Animated Google rating pill — fetches live count and counts up on scroll
function GoogleRatingPill() {
  const pillRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(pillRef, { once: true, margin: "-80px" })
  const [reviews, setReviews] = useState<GoogleReviewsData>({ rating: 4.9, reviewCount: 190 })
  const [displayCount, setDisplayCount] = useState(0)
  const [hasFetched, setHasFetched] = useState(false)

  const reviewCount = reviews.reviewCount

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((data: GoogleReviewsData) => {
        setReviews(data)
        setHasFetched(true)
      })
      .catch(() => setHasFetched(true))
  }, [])

  useEffect(() => {
    if (!isInView) return

    setDisplayCount(0)
    const duration = 1800
    const start = performance.now()
    let frameId: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplayCount(Math.round(easeOutCubic(progress) * reviewCount))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, reviewCount])

  return (
    <div
      ref={pillRef}
      className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-bellevue-black px-6 py-3.5 md:px-7 md:py-4 rounded-full shadow-[0_8px_32px_-12px_rgba(26,26,26,0.45)] ring-1 ring-white/10"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 md:w-4 md:h-4 fill-[#FBBC05] text-[#FBBC05]"
              strokeWidth={0}
            />
          ))}
        </div>
        <span className="font-sans text-sm md:text-base font-medium text-white tabular-nums">
          {reviews.rating.toFixed(1)}
        </span>
      </div>

      <span className="hidden sm:block w-px h-5 bg-white/20" aria-hidden />

      <div className="flex items-baseline gap-1.5">
        <motion.span
          key={hasFetched ? "live" : "loading"}
          initial={{ scale: 0.92, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="font-sans text-2xl md:text-3xl font-semibold text-bellevue-gold tabular-nums tracking-tight drop-shadow-[0_0_12px_rgba(184,149,110,0.35)]"
        >
          {displayCount}
        </motion.span>
        <span className="font-sans text-xs md:text-sm text-white/55 uppercase tracking-[0.15em]">
          reviews
        </span>
      </div>
    </div>
  )
}

// Testimonials Section
function TestimonialsSection() {
  // Split testimonials across two rows. Offset bottom row so the two strips don't mirror each other.
  const mid = Math.ceil(testimonials.length / 2)
  const topRow = testimonials.slice(0, mid)
  const bottomRow = [...testimonials.slice(mid), testimonials[0]]

  return (
    <section id="testimonials" className="relative bg-bellevue-cream py-24 md:py-32 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <GoogleRatingPill />

          <span className="mt-8 font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">
            Testimonials
          </span>
          <div className="mt-2 w-12 h-0.5 bg-bellevue-gold" />

          <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-bellevue-black leading-tight max-w-3xl">
            Words of praise from our guests
            <br className="hidden md:block" />
            <span className="italic text-bellevue-black/70"> about their stay.</span>
          </h2>
        </motion.div>

        {/* Marquee Rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-16 lg:mt-20 space-y-6"
        >
          {/* Top row — scrolls leftward */}
          <MarqueeRow items={topRow} direction="left" duration={70} />
          {/* Bottom row — scrolls rightward */}
          <MarqueeRow items={bottomRow} direction="right" duration={80} />
        </motion.div>

        {/* Footer CTA — the single, rich Google link */}
        <div className="mt-14 lg:mt-20 flex justify-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white border border-bellevue-black/10 shadow-[0_8px_28px_-14px_rgba(26,26,26,0.22)] hover:shadow-[0_14px_36px_-14px_rgba(26,26,26,0.3)] hover:border-bellevue-black/20 transition-all duration-300"
          >
            <GoogleG className="w-[18px] h-[18px]" />
            <span className="font-sans text-sm tracking-wide text-bellevue-black">
              Read all reviews on Google
            </span>
            <ArrowRight className="w-4 h-4 text-bellevue-gold group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section className="bg-bellevue-black py-24 md:py-32" id="contact">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">Get in Touch</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-white">
              Begin Your Journey
            </h2>
            <p className="mt-8 font-sans text-lg text-white/70 leading-relaxed">
              Our dedicated team is here to craft your perfect highland escape. Reach out to discuss your 
              requirements and let us create an unforgettable experience at Bellevue Chalets.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">Email</p>
                <a href="mailto:reservations@bellevuechalets.com" className="mt-1 block font-sans text-white hover:text-bellevue-gold transition-colors">
                  reservations@bellevuechalets.com
                </a>
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">Phone</p>
                <a href="tel:+94771234567" className="mt-1 block font-sans text-white hover:text-bellevue-gold transition-colors">
                  +94 77 123 4567
                </a>
              </div>
              <div>
                <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/50">Location</p>
                <p className="mt-1 font-sans text-white/80">
                  Ambewela, Nuwara Eliya<br />
                  Sri Lanka
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] lg:aspect-auto"
          >
            <Image
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"
              alt="Mountain vista"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// FAQ Section
const faqItems = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 2:00 PM onwards and check-out is by 12:00 PM. Early check-in and early check-out may be available depending on occupancy — please contact us in advance.",
  },
  {
    question: "What meal plans are available?",
    answer:
      "Meals are available based on your selected meal plan, with à la carte dining options and outdoor breakfast with a view available on request. All dishes are prepared with fresh, locally sourced ingredients.",
  },
  {
    question: "What is the children policy?",
    answer:
      "Children aged 0–6 years stay free of charge. Children aged 7–12 incur an additional fee. Guests aged 13 and above are considered adults. Additional beds are not provided; children share existing bedding.",
  },
  {
    question: "How do I get to Bellevue Chalets?",
    answer:
      "Bellevue Chalets is located in Ambewela, Nuwara Eliya — approximately 1,800m above sea level in Sri Lanka's central highlands. Detailed directions and arrival instructions are shared in your booking confirmation email.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "To preserve the tranquil atmosphere and comfort of all guests, pets are not permitted at Bellevue Chalets. Please contact us if you have special circumstances you'd like to discuss.",
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative bg-bellevue-warm py-24 md:py-32 lg:py-40 pb-28 md:pb-36 lg:pb-44" id="faq">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-bellevue-taupe">FAQ</span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-bellevue-forest leading-[1.1]">
              Answers to<br />your questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <div key={item.question} className="border-t border-bellevue-forest/20 last:border-b">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base md:text-lg text-bellevue-black group-hover:text-bellevue-gold transition-colors">
                      {item.question}
                    </span>
                    <Plus
                      className={`w-5 h-5 text-bellevue-forest shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 font-sans text-sm md:text-base text-bellevue-black/65 leading-relaxed max-w-2xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer — olive wave overlapping the warm FAQ section
function Footer() {
  const footerLinks = [
    {
      title: "Book Your Stay",
      links: [
        { name: "Our Chalets", href: "/chalets" },
        { name: "About Us", href: "/about" },
        { name: "Special Offers", href: "/offers" },
        { name: "Contact", href: "/#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Gallery", href: "/gallery" },
        { name: "FAQ", href: "#faq" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Ambewela", href: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/#contact" },
        { name: "Terms of Use", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
  ]

  return (
    <footer className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 z-10">
      <div className="relative">
        {/* Shadow layer — sits behind the wave on the warm FAQ section */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-3 sm:top-4 md:top-5 block w-full h-[96px] sm:h-[112px] md:h-[128px] lg:h-[144px] pointer-events-none"
          aria-hidden
        >
          <path
            fill="#1a1a1a"
            fillOpacity="0.12"
            d="M0,72
               C200,126 420,54 640,100
               C860,146 1080,60 1300,104
               C1360,116 1400,76 1440,68
               L1440,160 L0,160 Z"
          />
        </svg>

        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="relative block w-full h-[96px] sm:h-[112px] md:h-[128px] lg:h-[144px] drop-shadow-[0_-8px_24px_rgba(26,26,26,0.18)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="footerWaveGradient" x1="0" y1="0" x2="1440" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2c3e2d" />
              <stop offset="100%" stopColor="#1e2a1f" />
            </linearGradient>
            <filter id="footerWaveShadow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="-6" stdDeviation="10" floodColor="#1a1a1a" floodOpacity="0.22" />
            </filter>
          </defs>

          <path
            fill="url(#footerWaveGradient)"
            filter="url(#footerWaveShadow)"
            d="M0,64
               C200,118 420,46 640,92
               C860,138 1080,52 1300,96
               C1360,108 1400,68 1440,60
               L1440,160 L0,160 Z"
          />
        </svg>

        <div className="bg-bellevue-dark-forest -mt-px">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 md:pb-14 pt-4 md:pt-6">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16">
              {/* Logo */}
              <div className="shrink-0">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <span className="absolute inset-0 rounded-full bg-bellevue-gold/50 translate-x-1" />
                    <span className="absolute inset-0 rounded-full bg-bellevue-forest/80 -translate-x-1" />
                  </div>
                  <span className="font-sans text-2xl font-light tracking-wide text-white lowercase">
                    bellevue
                  </span>
                </Link>
              </div>

              {/* Link columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-8 flex-1">
                {footerLinks.map((col) => (
                  <div key={col.title}>
                    <p className="font-sans text-[15px] font-semibold text-white mb-4">
                      {col.title}
                    </p>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="font-sans text-sm text-white/80 hover:text-bellevue-gold transition-colors"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-bellevue-cream border-t border-bellevue-forest/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-bellevue-forest transition-colors">
              <Facebook className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-bellevue-forest transition-colors">
              <Instagram className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-bellevue-forest transition-colors">
              <Linkedin className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function BellevueChaletsPage() {
  return (
    <main className="min-h-screen">
      <SiteNavigation variant="hero" />
      <VideoHeroSection />
      <AboutSection />
      {/* <PillarsStrip /> */}
      <ChaletsSection />
      <QuoteDivider />
      <ExperiencesSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
