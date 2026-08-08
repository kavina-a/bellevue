"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Lightbulb } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"
import {
  nearbyAttractions,
  getFeaturedAttractions,
  type NearbyAttraction,
} from "@/lib/nearby-attractions"

const ease = [0.22, 1, 0.36, 1] as const

const featured = getFeaturedAttractions()
const moreExperiences = nearbyAttractions.filter((a) => !a.featured)
const featuredCount = featured.length

function scrollToExperience(slug: string) {
  document.getElementById(slug)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

// ─── Visual index — all experiences at a glance ─────────────────────────────
function ExperienceIndex() {
  return (
    <section className="border-b border-bellevue-black/8 bg-bellevue-cream px-6 py-14 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-gold">
        POPULAR NEARBY ATTRACTIONS
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

            {attraction.distance && (
              <div className="mt-4 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-bellevue-gold" strokeWidth={1.25} />
                <span className="font-sans text-[11px] font-light italic tracking-wide text-bellevue-black/45">
                  Distance from the hotel: {attraction.distance}
                </span>
              </div>
            )}

            <div className="mt-6 h-px w-14 bg-bellevue-gold/50" />
            <p className="mt-8 text-justify font-sans text-[0.95rem] leading-[1.95] text-bellevue-black/70">
              {attraction.description}
            </p>

            {attraction.additionalInfo && (
              <div className="mt-8 border-t border-bellevue-black/8 pt-8">
                <div className="mb-3 flex items-center gap-2">
                  <Lightbulb className="h-3.5 w-3.5 shrink-0 text-bellevue-gold" strokeWidth={1.25} />
                  <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-bellevue-gold">
                    Good to know
                  </span>
                </div>
                <p className="font-sans text-[0.82rem] leading-[1.85] text-bellevue-black/50">
                  {attraction.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </article>
  )
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />
      <PageCover
        src="/Photos/Exterior and Views/kotiyo.jpg"
        alt="Leopards in the forest near Ambewela"
        eyebrow="Nearby Attractions"
        imageClassName="object-cover object-[center_50%]"
        title="Discover Nearby Wonders"
        description="Ideally located in the heart of Ambewela, Bellevue Chalets by Pushella offers easy access to some of Sri Lanka’s most breathtaking natural, cultural, and scenic attractions. Discover the beauty of the upcountry at your own pace."
      />
      <ExperienceIndex />

      {/* Signature trio — full image + content panels */}
      <section className="bg-bellevue-cream">
        <div className="border-b border-bellevue-black/8 bg-bellevue-cream px-6 py-12 md:py-16 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold">
              Signature experiences
            </span>
            <h2 className="mt-4 font-serif text-3xl text-bellevue-black md:text-4xl">
              Discover the beauty of the upcountry
            </h2>
          </div>
        </div>
        {featured.map((attraction, index) => (
          <SignatureExperience key={attraction.slug} attraction={attraction} index={index} />
        ))}
      </section>

      {/* Remaining experiences — same signature panel format */}
      <section className="bg-bellevue-cream">
        {moreExperiences.map((attraction, index) => (
          <SignatureExperience
            key={attraction.slug}
            attraction={attraction}
            index={featuredCount + index}
          />
        ))}
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
