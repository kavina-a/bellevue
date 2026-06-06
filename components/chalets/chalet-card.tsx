"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Bath, Mountain, Sofa, Trees, DoorOpen } from "lucide-react"
import type { Chalet, ChaletFeatureIcon } from "@/lib/chalets"

const ease = [0.22, 1, 0.36, 1] as const

function FeatureIcon({ icon }: { icon: ChaletFeatureIcon }) {
  const props = { className: "h-5 w-5", strokeWidth: 1.25 }
  switch (icon) {
    case "sitting":
      return <Sofa {...props} />
    case "view":
      return <Mountain {...props} />
    case "bath":
      return <Bath {...props} />
    case "deck":
      return <Trees {...props} />
    case "veranda":
      return <DoorOpen {...props} />
  }
}

type ChaletCardProps = {
  chalet: Chalet
  priority?: boolean
}

export function ChaletCard({ chalet, priority = false }: ChaletCardProps) {
  const hero = chalet.images[0]

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
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/70 via-bellevue-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="font-serif text-2xl uppercase tracking-[0.08em] text-white md:text-3xl">
                {chalet.name}
              </h3>
              <p className="mt-2 font-sans text-xs tracking-[0.1em] text-white/85">
                Room Size:{" "}
                <span className="font-semibold">{chalet.roomSizeSqm} sqm</span>
              </p>
            </div>
          </div>
        </Link>

        {/* Green strip — starts 12% down so the image floats above it at the top-right */}
        <div className="relative w-[6%] shrink-0 self-stretch md:w-[5.5%]">
          <div className="absolute inset-x-0 bottom-0 top-[12%] bg-[#e8efe5]" />
        </div>
      </div>

      {/* Features — green panel continues below the image */}
      <div className="flex items-center bg-[#e8efe5] py-5">
        {chalet.cardFeatures.map((feature, i) => (
          <Fragment key={feature.label}>
            {i > 0 && (
              <span
                aria-hidden
                className="h-5 w-px shrink-0 bg-bellevue-forest/25"
              />
            )}
            <div className="flex flex-1 items-center justify-center gap-2.5 px-3 text-bellevue-forest/75">
              <span className="text-bellevue-forest/55">
                <FeatureIcon icon={feature.icon} />
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.12em] md:text-[11px]">
                {feature.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>

      {/* Description + links — outside the green panel */}
      <div className="px-6 py-7 md:px-8">
        <p className="font-sans text-[15px] font-light leading-[1.8] text-bellevue-black/65">
          {chalet.cardDescription}
        </p>
        <div className="mt-7 flex items-center gap-4">
          <Link
            href={`/chalets/${chalet.slug}`}
            className="relative inline-flex items-center font-sans text-[11px] tracking-[0.25em] uppercase text-bellevue-black transition-colors hover:text-bellevue-gold"
          >
            Explore
            <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-bellevue-forest/70" />
          </Link>
          <span className="h-4 w-px bg-bellevue-black/20" />
          <Link
            href="/#book"
            className="relative inline-flex items-center font-sans text-[11px] tracking-[0.25em] uppercase text-bellevue-black transition-colors hover:text-bellevue-gold"
          >
            Check Availability
            <span className="absolute -bottom-1.5 left-0 h-[2px] w-full bg-bellevue-forest/70" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
