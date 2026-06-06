"use client"

import { motion } from "framer-motion"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { ChaletCard } from "@/components/chalets/chalet-card"
import { chalets } from "@/lib/chalets"

const ease = [0.22, 1, 0.36, 1] as const

export default function ChaletsPage() {
  const [first, second, third] = chalets

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      {/* Intro */}
      <section className="px-6 pt-32 pb-12 md:pt-40 md:pb-16 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-sans text-[11px] tracking-[0.4em] uppercase text-bellevue-gold"
          >
            Accommodation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="mt-6 font-serif text-3xl leading-[1.2] text-bellevue-black md:text-[2.6rem]"
          >
            Each of our three chalets was thoughtfully designed to showcase
            far-reaching views of the Ambewela valley
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
            className="mx-auto mt-7 max-w-2xl font-sans text-[15px] font-light leading-[1.85] text-bellevue-black/65"
          >
            Chalets at Bellevue are all distinct in design and layout, yet equally
            comfortable and luxurious. Each is crafted from warm timber and furnished
            with private sitting areas, ensuite bathrooms, and balconies framing the
            rolling hills, forests, and gentle streams of Ambewela.
          </motion.p>
        </div>
      </section>

      {/* Chalets */}
      <section className="px-6 pb-24 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            <ChaletCard chalet={first} priority />
            <ChaletCard chalet={second} priority />
          </div>

          <div className="mt-8 flex justify-center lg:mt-10">
            <div className="w-full md:max-w-[calc(50%-1.25rem)]">
              <ChaletCard chalet={third} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
