"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import {
  nearbyAttractions,
  getFeaturedAttractions,
  type NearbyAttraction,
} from "@/lib/nearby-attractions"

const ease = [0.22, 1, 0.36, 1] as const

const featured = getFeaturedAttractions()
const moreExperiences = nearbyAttractions.filter((a) => !a.featured)

function scrollToExperience(slug: string) {
  document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3])

  return (
    <section ref={ref} className="relative min-h-[85vh] overflow-hidden pt-28 md:pt-36">
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src={featured[1].image}
          alt="Horton Plains National Park"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-bellevue-black/50 via-bellevue-black/35 to-bellevue-cream" />

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-end px-6 pb-16 text-center lg:px-12 lg:pb-24"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold"
        >
          Nearby Attractions
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="mt-6 font-serif text-4xl leading-[1.1] text-white md:text-5xl lg:text-6xl"
        >
          The highlands,
          <br />
          <span className="italic text-bellevue-warm">yours to explore</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
          className="mt-8 max-w-2xl font-sans text-base leading-[1.85] text-white/75 md:text-lg"
        >
          Cloud forests, dairy country, heritage railways, and sacred temples — each
          experience paired with the landscapes that define Ambewela.
        </motion.p>
      </motion.div>
    </section>
  )
}

// ─── Visual index — all experiences at a glance ─────────────────────────────
function ExperienceIndex() {
  return (
    <section className="border-b border-bellevue-black/8 bg-bellevue-cream px-6 py-14 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-gold">
          {nearbyAttractions.length} experiences near Bellevue
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:gap-4">
          {nearbyAttractions.map((item, i) => (
            <motion.button
              key={item.slug}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04, ease }}
              onClick={() => scrollToExperience(item.slug)}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-bellevue-black/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 45vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/75 via-bellevue-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-bellevue-gold md:text-[9px]">
                    {item.category}
                  </span>
                  <p className="mt-1 font-serif text-xs leading-tight text-white md:text-sm">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Signature experience — image + copy as one panel ───────────────────────────
function SignatureExperience({
  attraction,
  index,
}: {
  attraction: NearbyAttraction
  index: number
}) {
  const isEven = index % 2 === 0
  const num = String(index + 1).padStart(2, "0")

  return (
    <article
      id={attraction.slug}
      className="scroll-mt-28 border-b border-bellevue-black/8 last:border-b-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.95, ease }}
        className="mx-auto max-w-[1400px]"
      >
        <div
          className={`grid lg:grid-cols-12 lg:gap-0 ${
            isEven ? "" : "lg:[direction:rtl]"
          }`}
        >
          {/* Image — large, always paired with text */}
          <div className={`lg:col-span-7 ${isEven ? "" : "lg:[direction:ltr]"}`}>
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[520px] lg:h-full">
              <Image
                src={attraction.image}
                alt={attraction.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </div>

          {/* Content — same row, cream panel */}
          <div
            className={`flex flex-col justify-center bg-white px-6 py-12 md:px-12 md:py-16 lg:col-span-5 lg:px-14 lg:py-20 ${
              isEven ? "" : "lg:[direction:ltr]"
            }`}
          >
            <span className="font-serif text-5xl text-bellevue-black/8 md:text-6xl">{num}</span>
            <span className="mt-4 font-sans text-[10px] tracking-[0.35em] uppercase text-bellevue-gold">
              {attraction.category}
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-bellevue-black md:text-4xl">
              {attraction.title}
            </h2>
            <div className="mt-6 h-px w-14 bg-bellevue-gold/50" />
            <p className="mt-8 font-sans text-[0.95rem] leading-[1.95] text-bellevue-black/70">
              {attraction.description}
            </p>
          </div>
        </div>
      </motion.div>
    </article>
  )
}

// ─── More experiences — cards with image + text unified ───────────────────────
function MoreExperienceCard({ attraction, index }: { attraction: NearbyAttraction; index: number }) {
  return (
    <motion.article
      id={attraction.slug}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: (index % 3) * 0.06, ease }}
      className="scroll-mt-28 flex h-full flex-col overflow-hidden bg-white shadow-[0_8px_40px_-20px_rgba(26,26,26,0.12)]"
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={attraction.image}
          alt={attraction.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-bellevue-gold">
          {attraction.category}
        </span>
        <h3 className="mt-2 font-serif text-xl text-bellevue-black md:text-2xl">{attraction.title}</h3>
        <p className="mt-4 flex-1 font-sans text-sm leading-[1.85] text-bellevue-black/65">
          {attraction.description}
        </p>
      </div>
    </motion.article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />
      <Hero />
      <ExperienceIndex />

      {/* Signature trio — full image + content panels */}
      <section className="bg-bellevue-cream">
        <div className="border-b border-bellevue-black/8 bg-bellevue-cream px-6 py-12 md:py-16 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold">
              Signature experiences
            </span>
            <h2 className="mt-4 font-serif text-3xl text-bellevue-black md:text-4xl">
              Unmissable from Ambewela
            </h2>
          </div>
        </div>
        {featured.map((attraction, index) => (
          <SignatureExperience key={attraction.slug} attraction={attraction} index={index} />
        ))}
      </section>

      {/* Remaining experiences — grid cards */}
      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold">
            More to discover
          </span>
          <h2 className="mt-4 font-serif text-3xl text-bellevue-black md:text-4xl">
            Further afield
          </h2>
          <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-bellevue-black/55">
            Lakes, temples, waterfalls, and forest walks — each within reach of your chalet.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {moreExperiences.map((attraction, index) => (
              <MoreExperienceCard key={attraction.slug} attraction={attraction} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bellevue-black/8 bg-bellevue-dark-forest px-6 py-20 md:py-28 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-serif text-2xl italic leading-relaxed text-white/90 md:text-3xl">
            Let us arrange your highland excursions
          </p>
          <p className="mt-6 font-sans text-sm leading-relaxed text-white/55">
            Our team can help with transport and timing — so you spend less time planning
            and more time in the mist.
          </p>
          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-3 border border-white/30 px-8 py-3.5 font-sans text-[11px] tracking-[0.25em] uppercase text-white transition-colors hover:bg-white hover:text-bellevue-black"
          >
            Plan your excursions
            <ArrowRight className="h-4 w-4" strokeWidth={1.25} />
          </Link>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  )
}
