"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  formatOfferPrice,
  splitOfferTitle,
  type HotelOffer,
} from "@/lib/hotel-offers"
import { cn } from "@/lib/utils"

type OfferCardProps = {
  offer: HotelOffer
  className?: string
}

export function OfferCard({ offer, className }: OfferCardProps) {
  const [titleLead, titleTail] = splitOfferTitle(offer.title)
  const featured = offer.isFeatured

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: featured ? -10 : -6 }}
      className={cn("relative flex flex-col", featured && "md:pt-0", className)}
    >
      {featured && offer.featuredLabel && (
        <Badge
          className={cn(
            "absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full border-0 px-5 py-1.5",
            "bg-bellevue-black text-white font-sans text-[10px] tracking-[0.22em] uppercase shadow-md",
          )}
        >
          {offer.featuredLabel}
        </Badge>
      )}

      <Card
        className={cn(
          "relative h-full gap-0 overflow-hidden rounded-[28px] border-0 py-0 shadow-[0_24px_48px_-20px_rgba(26,26,26,0.35)] transition-shadow duration-300 hover:shadow-[0_32px_64px_-24px_rgba(26,26,26,0.45)]",
          featured
            ? "min-h-[520px] bg-bellevue-forest text-white md:min-h-[560px]"
            : "min-h-[480px] bg-bellevue-black text-white md:min-h-[500px]",
        )}
      >
        <CardContent className="flex flex-1 flex-col px-8 pb-6 pt-10 md:px-9 md:pt-12">
          <header>
            <h2 className="font-serif text-3xl leading-tight md:text-[2rem]">
              <span className="text-bellevue-gold">{titleLead}</span>
              {titleTail ? (
                <>
                  {" "}
                  <span className="text-white">{titleTail}</span>
                </>
              ) : null}
            </h2>
            <p
              className={cn(
                "mt-4 font-sans text-sm leading-relaxed md:text-[15px]",
                featured ? "text-white/80" : "text-white/65",
              )}
            >
              {offer.tagline}
            </p>
          </header>

          <div className="mt-8">
            <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-white/50">
              From
            </p>
            <p className="mt-1 font-serif text-4xl leading-none text-white md:text-5xl">
              {formatOfferPrice(offer.pricePerNight, offer.currency)}
            </p>
            <p className="mt-2 font-sans text-xs tracking-wide text-white/50">per night</p>
          </div>

          <div
            className={cn(
              "my-8 h-px w-full",
              featured ? "bg-white/20" : "bg-white/15",
            )}
            aria-hidden
          />

          <ul className="space-y-4" aria-label={`${offer.title} inclusions`}>
            {offer.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                    featured ? "bg-bellevue-gold text-bellevue-black" : "bg-bellevue-gold/90 text-bellevue-black",
                  )}
                  aria-hidden
                >
                  <Check className="size-3 stroke-[2.5]" />
                </span>
                <span className="font-sans text-sm leading-relaxed text-white/85">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="mt-auto px-8 pb-10 pt-0 md:px-9">
          <Button
            asChild
            variant={featured ? "default" : "outline"}
            size="lg"
            className={cn(
              "h-12 w-full rounded-full font-sans text-xs tracking-[0.22em] uppercase",
              featured
                ? "bg-bellevue-black text-white hover:bg-bellevue-black/90 border-0"
                : "border-bellevue-gold bg-transparent text-bellevue-gold hover:bg-bellevue-gold hover:text-bellevue-black",
            )}
          >
            <Link href={offer.ctaHref} aria-label={`${offer.ctaLabel} — ${offer.title}`}>
              {offer.ctaLabel}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.article>
  )
}
