"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Bath, House, MountainSnow, Trees, DoorOpen, Users, Mountain } from "lucide-react"
import { getChaletAccentColor, CHALET_BUTTON_COLOR, type Chalet, type ChaletFeatureIcon } from "@/lib/chalets"

const ease = [0.22, 1, 0.36, 1] as const

function FeatureLabel({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <span className="text-left font-sans text-[10px] uppercase leading-tight tracking-[0.12em] md:text-[11px]">
      <span className="block whitespace-nowrap">{line1}</span>
      <span className="block whitespace-nowrap">{line2}</span>
    </span>
  )
}

function FeatureIcon({ icon }: { icon: ChaletFeatureIcon }) {
  const props = { className: "h-5 w-5", strokeWidth: 1.25 }
  switch (icon) {
    case "chalet":
      return <House {...props} />
    case "view":
      return <Mountain {...props} />
    case "bath":
      return <Bath {...props} />
    case "deck":
      return <Mountain {...props} />
    case "veranda":
      return <DoorOpen {...props} />
    case "users":
      return <Users {...props} />
  }
}

type ChaletCardProps = {
  chalet: Chalet
  priority?: boolean
}

export function ChaletCard({ chalet, priority = false }: ChaletCardProps) {
  const hero = chalet.images[0]
  const accentColor = getChaletAccentColor(chalet)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
      className="group"
    >
      {/* Image row — photo on top; green strip peeks in from 12% down on the right */}
      <div className="flex">
        <Link href={`/chalets/${chalet.slug}`} className="relative z-10 block min-w-0 flex-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={hero.src}
              alt={chalet.name}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              style={{ objectPosition: hero.focal }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/70 via-bellevue-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="font-serif text-2xl uppercase tracking-[0.08em] text-white md:text-3xl">
                {chalet.name}
              </h3>
              <p className="mt-2 font-sans text-xs tracking-[0.1em] text-white/85">
                Chalet Size:{" "}
                <span className="font-semibold">{chalet.roomSizeSqm} sqm</span>
              </p>
            </div>
          </div>
        </Link>

        {/* Green strip — starts 12% down so the image floats above it at the top-right */}
        <div className="relative w-[6%] shrink-0 self-stretch md:w-[5.5%]">
          <div
            className="absolute inset-x-0 bottom-0 top-[12%]"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Features — green panel continues below the image */}
      <div
        className="flex items-center px-6 py-5 md:px-8"
        style={{ backgroundColor: accentColor }}
      >
        {chalet.cardFeatures.map((feature, i) => (
          <Fragment key={`${feature.labelLine1}-${feature.labelLine2}`}>
            {i > 0 && (
              <span
                aria-hidden
                className="h-5 w-px shrink-0 bg-bellevue-forest/25"
              />
            )}
            <div className="flex flex-1 items-center justify-start gap-2.5 px-3 first:pl-0 text-bellevue-forest/75">
              <span className="text-bellevue-forest/55">
                <FeatureIcon icon={feature.icon} />
              </span>
              <FeatureLabel line1={feature.labelLine1} line2={feature.labelLine2} />
            </div>
          </Fragment>
        ))}
      </div>

      {/* Description + links — outside the green panel */}
      <div className="px-6 py-7 md:px-8">
        <p className="font-sans text-[15px] font-light leading-[1.8] text-bellevue-black/65">
          {chalet.cardDescription}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={`/chalets/${chalet.slug}`}
            className="inline-flex items-center px-5 py-3 font-sans text-[11px] tracking-[0.25em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: CHALET_BUTTON_COLOR }}
          >
            Explore
          </Link>
          <Link
            href="/#book"
            className="inline-flex items-center px-5 py-3 font-sans text-[11px] tracking-[0.25em] uppercase text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: CHALET_BUTTON_COLOR }}
          >
            Check Availability
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
