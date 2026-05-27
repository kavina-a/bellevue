"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteNavigation } from "@/components/site-navigation"
import { SpecialOffersSection } from "@/components/offers/special-offers-section"
import { SiteFooter } from "@/components/site-footer"

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      <section className="px-6 pb-4 pt-32 md:pt-40 md:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-bellevue-black/8 bg-white px-4 py-1.5 font-sans text-xs tracking-[0.25em] uppercase text-bellevue-forest shadow-[0_4px_20px_-12px_rgba(26,26,26,0.15)]"
          >
            Offers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-8 font-serif text-4xl leading-[1.12] text-bellevue-black md:text-5xl lg:text-6xl"
          >
            Packages crafted for{" "}
            <span className="italic text-bellevue-forest">every kind of escape</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mx-auto mt-8 h-px w-12 bg-bellevue-gold/60"
          />
        </div>
      </section>

      <SpecialOffersSection showIntro={false} className="pt-8 md:pt-12" />

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-sans text-base leading-relaxed text-bellevue-black/60"
          >
            Need something tailored to your dates or celebration? Our team can arrange private
            dining, extended stays, and exclusive chalet combinations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-bellevue-black px-8 py-3.5 font-sans text-xs tracking-[0.25em] uppercase text-white transition-colors hover:bg-bellevue-forest"
            >
              Contact Reservations
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/chalets"
              className="inline-flex items-center gap-3 border border-bellevue-black/20 px-8 py-3.5 font-sans text-xs tracking-[0.25em] uppercase text-bellevue-black transition-colors hover:border-bellevue-gold hover:text-bellevue-gold"
            >
              Explore Chalets
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
