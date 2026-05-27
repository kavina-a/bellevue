"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { NearbyAttraction } from "@/lib/nearby-attractions"

const luxuryEase = [0.22, 1, 0.36, 1] as const

type ExperienceCardProps = {
  attraction: NearbyAttraction
  variant?: "carousel" | "grid"
  index?: number
  compact?: boolean
}

export function ExperienceCard({
  attraction,
  variant = "carousel",
  index = 0,
  compact = false,
}: ExperienceCardProps) {
  const isCarousel = variant === "carousel"

  return (
    <motion.article
      initial={{ opacity: 0, y: isCarousel ? 48 : 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay: index * 0.12, ease: luxuryEase }}
      className={`group flex h-full flex-col ${compact ? "mx-auto w-[80%]" : ""}`}
    >
      <Link href={`/experiences#${attraction.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-bellevue-black/5">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.9, ease: luxuryEase }}
          >
            <Image
              src={attraction.image}
              alt={attraction.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        <div className={`flex flex-1 flex-col ${isCarousel ? `${compact ? "pt-6" : "pt-8"} text-center` : "pt-6"}`}>
          <span
            className={`font-sans tracking-[0.35em] uppercase text-bellevue-gold ${
              compact ? "text-[8px]" : "text-[10px]"
            }`}
          >
            {attraction.category}
          </span>
          <h3
            className={`mt-3 font-serif uppercase leading-snug text-bellevue-black ${
              isCarousel
                ? compact
                  ? "text-base md:text-lg"
                  : "text-lg md:text-xl"
                : "text-2xl md:text-3xl"
            }`}
          >
            {attraction.title}
          </h3>

          {variant === "grid" && (
            <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-bellevue-black/60">
              {attraction.description}
            </p>
          )}

          <span
            className={`mt-auto inline-flex items-center justify-center border border-bellevue-black/15 font-sans tracking-[0.3em] uppercase text-bellevue-black transition-colors duration-500 group-hover:border-bellevue-gold group-hover:text-bellevue-gold ${
              compact ? "mt-6 px-5 py-2.5 text-[9px]" : "mt-8 px-6 py-3 text-[11px]"
            } ${isCarousel ? "mx-auto w-fit" : "mt-8 w-fit"}`}
          >
            Explore
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
