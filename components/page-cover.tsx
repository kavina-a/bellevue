"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1] as const

export const PAGE_COVER_IMAGE_HEIGHT =
  "h-[68vh] min-h-[306px] max-h-[663px]" as const

type PageCoverProps = {
  src: string
  alt: string
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: "left" | "center"
  titleBg?: string
  imageClassName?: string
  imageScale?: boolean
  imageContainerClassName?: string
  titleClassName?: string
}

export function PageCover({
  src,
  alt,
  eyebrow,
  title,
  description,
  align = "center",
  titleBg = "bg-bellevue-cream",
  imageClassName = "object-cover",
  imageScale = false,
  imageContainerClassName = PAGE_COVER_IMAGE_HEIGHT,
  titleClassName = "font-serif text-[clamp(1.6rem,4.4vw,3.6rem)] leading-[1.08] text-bellevue-black",
}: PageCoverProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-left"
  const lineOrigin = align === "center" ? "origin-center mx-auto" : "origin-left"

  return (
    <section ref={ref} className="relative">
      <div className={`relative overflow-hidden ${imageContainerClassName}`}>
        <motion.div
          style={{ y: imgY }}
          className={`absolute inset-0 ${imageScale ? "scale-110" : ""}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority
            className={imageClassName}
          />
        </motion.div>
      </div>

      <div
        className={`flex min-h-[20vh] flex-col justify-center px-6 py-10 md:px-12 lg:px-16 ${titleBg} ${alignClasses}`}
      >
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease }}
            className="font-sans text-[8px] tracking-[0.4em] uppercase text-bellevue-taupe"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: eyebrow ? 0.15 : 0.1, ease }}
          className={`${titleClassName} ${eyebrow ? "mt-5" : ""} max-w-4xl`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease }}
            className={`mt-5 max-w-2xl font-sans text-[0.8rem] font-light leading-relaxed text-bellevue-black/65 ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease }}
          className={`mt-8 h-px w-20 bg-bellevue-gold/60 ${lineOrigin}`}
        />
      </div>
    </section>
  )
}
