"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { formatOfferPrice, type HotelOffer } from "@/lib/hotel-offers"
import { cn } from "@/lib/utils"

type OfferCardProps = {
  offer: HotelOffer
  className?: string
}

export function OfferCard({ offer, className }: OfferCardProps) {
  const featured = offer.isFeatured

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex h-full flex-col overflow-hidden bg-white",
        "border border-bellevue-black/10 shadow-[0_12px_40px_-24px_rgba(26,26,26,0.18)]",
        "transition-shadow duration-500 hover:shadow-[0_20px_56px_-20px_rgba(26,26,26,0.22)]",
        featured && "ring-1 ring-bellevue-gold/50",
        className,
      )}
    >
      {/* Offer imagery */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/55 via-bellevue-black/10 to-transparent" />

        {featured && offer.featuredLabel && (
          <span className="absolute left-5 top-5 border border-white/25 bg-bellevue-black/75 px-3 py-1.5 font-sans text-[9px] tracking-[0.28em] uppercase text-white backdrop-blur-sm">
            {offer.featuredLabel}
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-white/70">
            {offer.stayLabel}
          </p>
          <h2 className="mt-2 font-serif text-2xl leading-tight text-white md:text-[1.75rem]">
            {offer.title}
          </h2>
        </div>
      </div>

      {/* Package details */}
      <div className="flex flex-1 flex-col px-6 py-7 md:px-7 md:py-8">
        <p className="font-sans text-sm leading-relaxed text-bellevue-black/65">{offer.tagline}</p>

        <div className="mt-6 flex items-end justify-between gap-4 border-y border-bellevue-black/8 py-5">
          <div>
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-black/45">
              From
            </p>
            <p className="mt-1 font-serif text-3xl leading-none text-bellevue-forest md:text-4xl">
              {formatOfferPrice(offer.pricePerNight, offer.currency)}
            </p>
          </div>
          <p className="font-sans text-xs text-bellevue-black/45">per night</p>
        </div>

        <p className="mt-6 font-sans text-[10px] tracking-[0.3em] uppercase text-bellevue-gold">
          Package includes
        </p>
        <ul className="mt-4 space-y-2.5" aria-label={`${offer.title} inclusions`}>
          {offer.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-3 font-sans text-sm leading-relaxed text-bellevue-black/75"
            >
              <span className="mt-2 h-px w-3 shrink-0 bg-bellevue-gold" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href={offer.ctaHref}
          aria-label={`${offer.ctaLabel} — ${offer.title}`}
          className={cn(
            "mt-8 inline-flex w-full items-center justify-center gap-2.5 px-6 py-3.5",
            "font-sans text-[11px] tracking-[0.28em] uppercase transition-colors duration-300",
            featured
              ? "bg-bellevue-forest text-white hover:bg-bellevue-black"
              : "border border-bellevue-black/20 text-bellevue-black hover:border-bellevue-forest hover:bg-bellevue-forest hover:text-white",
          )}
        >
          {offer.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
        </Link>
      </div>
    </motion.article>
  )
}
