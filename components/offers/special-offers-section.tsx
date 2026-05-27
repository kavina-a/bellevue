"use client"

import { motion } from "framer-motion"
import { OfferCard } from "@/components/offers/offer-card"
import { hotelOffers, type HotelOffer } from "@/lib/hotel-offers"
import { cn } from "@/lib/utils"

type SpecialOffersSectionProps = {
  offers?: HotelOffer[]
  className?: string
  showIntro?: boolean
}

function OfferBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 900 900"
        className="absolute left-1/2 top-[42%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-bellevue-forest/10"
        fill="none"
      >
        {[180, 260, 340, 420, 500].map((radius) => (
          <circle
            key={radius}
            cx="450"
            cy="450"
            r={radius}
            stroke="currentColor"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  )
}

export function SpecialOffersSection({
  offers = hotelOffers,
  className,
  showIntro = true,
}: SpecialOffersSectionProps) {
  const featured = offers.find((offer) => offer.isFeatured)
  const others = offers.filter((offer) => !offer.isFeatured)
  const displayOffers =
    featured && others.length >= 2
      ? [others[0], featured, others[1]]
      : offers

  return (
    <section
      className={cn("relative overflow-hidden bg-bellevue-cream px-6 py-20 md:py-28 lg:px-12", className)}
      aria-labelledby="special-offers-heading"
    >
      <OfferBackgroundDecor />

      <div className="relative mx-auto max-w-[1200px]">
        {showIntro && (
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 rounded-full border border-bellevue-black/8 bg-white px-4 py-1.5 font-sans text-xs tracking-[0.25em] uppercase text-bellevue-forest shadow-[0_4px_20px_-12px_rgba(26,26,26,0.15)]"
            >
              Special Offers
            </motion.span>

            <motion.h2
              id="special-offers-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 font-serif text-4xl leading-[1.12] text-bellevue-black md:text-5xl lg:text-6xl"
            >
              Every stay tells a story —{" "}
              <span className="italic text-bellevue-forest">choose yours.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-bellevue-black/65 md:text-lg"
            >
              Thoughtfully curated packages for weekend escapes, romantic retreats, and focused
              working stays — each designed to make the most of your time in Ambewela.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mx-auto mt-8 h-px w-12 bg-bellevue-gold/60"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-end md:gap-6 lg:gap-8">
          {displayOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              className={offer.isFeatured ? "md:-translate-y-8" : undefined}
            />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center font-sans text-xs leading-relaxed text-bellevue-black/45 md:mt-16">
          Rates are indicative and subject to seasonal availability. Taxes and selected meal plans
          may apply. Contact our reservations team for bespoke arrangements.
        </p>
      </div>
    </section>
  )
}
