"use client"

import { useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { nearbyAttractions } from "@/lib/nearby-attractions"
import { ExperienceCard } from "@/components/experiences/experience-card"

const luxuryEase = [0.22, 1, 0.36, 1] as const

export function NearbyExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const headingY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])
  const glowOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0, 1, 0])

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" })
  }, [])

  const goTo = (step: -1 | 1) => {
    const next = (activeIndex + step + nearbyAttractions.length) % nearbyAttractions.length
    setActiveIndex(next)
    scrollToIndex(next)
  }

  const selectIndex = (index: number) => {
    setActiveIndex(index)
    scrollToIndex(index)
  }

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="relative overflow-hidden bg-white py-28 md:py-36 lg:py-44"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,149,110,0.08),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-16 flex flex-col gap-10 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <motion.div style={{ y: headingY }} className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="block text-center font-sans text-xs tracking-[0.45em] uppercase text-bellevue-gold lg:text-left"
            >
              Nearby Attractions
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.08, ease: luxuryEase }}
              className="mt-6 text-center font-serif text-3xl uppercase leading-[1.15] tracking-[0.04em] text-bellevue-black md:text-4xl lg:text-left lg:text-[2.75rem]"
            >
              Discover Nearby Wonders
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.18, ease: luxuryEase }}
              className="mx-auto mt-8 max-w-xl text-center font-sans text-base leading-[1.85] text-bellevue-black/60 lg:mx-0 lg:text-left"
            >
              Beyond the chalet doors, Bellevue Chalets offers easy access to some of Sri
              Lanka&apos;s most breathtaking natural, cultural, and scenic attractions.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: luxuryEase }}
            className="flex shrink-0 justify-center lg:justify-end"
          >
            <Link
              href="/experiences"
              className="inline-flex items-center gap-3 border border-bellevue-black/20 px-7 py-3.5 font-sans text-[11px] tracking-[0.3em] uppercase text-bellevue-black transition-all duration-500 hover:border-bellevue-black hover:bg-bellevue-black hover:text-white"
            >
              View all Nearby Attractions

            </Link>
          </motion.div>
        </div>

        <div className="relative px-12 md:px-16 lg:px-20">
          <CarouselArrow
            direction="prev"
            onClick={() => goTo(-1)}
            className="absolute left-0 top-[36%] z-10 -translate-y-1/2"
          />
          <CarouselArrow
            direction="next"
            onClick={() => goTo(1)}
            className="absolute right-0 top-[36%] z-10 -translate-y-1/2"
          />

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth [scrollbar-width:none] xl:gap-12 [&::-webkit-scrollbar]:hidden"
          >
            {nearbyAttractions.map((attraction, index) => (
              <div
                key={attraction.slug}
                className="w-full shrink-0 snap-start lg:w-[calc((100%-4rem)/3)] xl:w-[calc((100%-6rem)/3)]"
                onClick={() => selectIndex(index)}
              >
                <ExperienceCard
                  attraction={attraction}
                  variant="carousel"
                  index={index}
                  compact
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <span className="font-sans text-[11px] tracking-[0.25em] tabular-nums text-bellevue-black/40">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(nearbyAttractions.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {nearbyAttractions.map((item, index) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => selectIndex(index)}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={`h-1.5 transition-all duration-500 ${
                    index === activeIndex
                      ? "w-8 bg-bellevue-gold"
                      : "w-1.5 bg-bellevue-black/15 hover:bg-bellevue-black/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CarouselArrow({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next"
  onClick: () => void
  className?: string
}) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous experience" : "Next experience"}
      className={`flex h-11 w-11 items-center justify-center border border-bellevue-black/15 bg-white/90 text-bellevue-black/70 shadow-[0_4px_24px_-8px_rgba(26,26,26,0.12)] backdrop-blur-sm transition-all duration-500 hover:border-bellevue-black hover:text-bellevue-black hover:shadow-[0_8px_32px_-8px_rgba(26,26,26,0.18)] ${className}`}
    >
      <Icon className="h-4 w-4" strokeWidth={1.25} />
    </button>
  )
}
