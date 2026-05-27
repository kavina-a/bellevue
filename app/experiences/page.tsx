"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { nearbyAttractions } from "@/lib/nearby-attractions"
import { SiteFooter } from "@/components/site-footer"

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function ExperiencesPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35])

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden pt-32 md:pt-40">
        <motion.div style={{ y: heroImageY, opacity: heroOpacity }} className="absolute inset-0">
          <Image
            src={nearbyAttractions[1].image}
            alt="Horton Plains National Park"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bellevue-black/45 via-bellevue-black/30 to-bellevue-cream" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[55vh] max-w-4xl flex-col items-center justify-end px-6 pb-20 text-center lg:px-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="font-sans text-xs tracking-[0.45em] uppercase text-bellevue-gold"
          >
            Nearby Attractions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: luxuryEase }}
            className="mt-6 font-serif text-4xl uppercase leading-[1.12] tracking-[0.03em] text-white md:text-5xl lg:text-6xl"
          >
            The highlands,
            <br />
            <span className="italic normal-case tracking-normal text-bellevue-warm">
              yours to explore
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: luxuryEase }}
            className="mt-8 max-w-2xl font-sans text-base leading-[1.85] text-white/75 md:text-lg"
          >
            A stay at Bellevue is only the beginning. Step into cloud forests, heritage
            temples, dairy country, and scenic railway lines — each within reach of your chalet.
          </motion.p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1200px]">
          {nearbyAttractions.map((attraction, index) => {
            const isEven = index % 2 === 0

            return (
              <motion.article
                key={attraction.slug}
                id={attraction.slug}
                initial={{ opacity: 0, y: 56 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: luxuryEase }}
                className={`scroll-mt-28 grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-20 ${
                  index > 0 ? "mt-24 md:mt-32" : ""
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
                  className={`relative aspect-[4/5] overflow-hidden ${isEven ? "" : "lg:order-2"}`}
                >
                  <Image
                    src={attraction.image}
                    alt={attraction.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: isEven ? 32 : -32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.85, delay: 0.15, ease: luxuryEase }}
                  className={isEven ? "" : "lg:order-1"}
                >
                  <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-bellevue-gold">
                    {attraction.category}
                  </span>
                  <h2 className="mt-4 font-serif text-3xl uppercase leading-tight text-bellevue-black md:text-4xl">
                    {attraction.title}
                  </h2>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
                    className="mt-6 h-px w-16 origin-left bg-bellevue-gold/50"
                  />
                  <p className="mt-8 font-sans text-base leading-[1.9] text-bellevue-black/70">
                    {attraction.description}
                  </p>
                </motion.div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="border-t border-bellevue-black/8 bg-white px-6 py-20 md:py-28 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: luxuryEase }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-sans text-base leading-relaxed text-bellevue-black/60">
            Our team can help arrange transport and timing for any of these excursions —
            so you spend less time planning and more time in the highlands.
          </p>
          <Link
            href="/#contact"
            className="mt-10 inline-flex items-center gap-3 bg-bellevue-black px-8 py-3.5 font-sans text-xs tracking-[0.25em] uppercase text-white transition-colors hover:bg-bellevue-forest"
          >
            Plan your excursions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  )
}
