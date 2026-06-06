"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { offerInclusions, offerInclusionsImage } from "@/lib/offer-inclusions"

const ease = [0.22, 1, 0.36, 1] as const

export function OfferInclusionsSection() {
  return (
    <section className="overflow-visible bg-white px-6 py-20 md:py-28 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative lg:py-16 xl:py-20">
          {/* Shorter cream band — image breaks above and below */}
          <div
            className="absolute inset-x-0 top-1/2 z-0 hidden h-[min(420px,72%)] -translate-y-1/2 bg-[#e8efe5] lg:block lg:left-[34%]"
            aria-hidden
          />

          <div className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
            {/* Image — pops out of the band */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease }}
              className="relative w-full shrink-0 lg:w-[44%]"
            >
              <div className="relative mx-auto aspect-[4/5] max-w-[520px] shadow-[0_32px_70px_-28px_rgba(26,26,26,0.4)] lg:mx-0 lg:aspect-[5/6] lg:max-w-none">
                <Image
                  src={offerInclusionsImage.src}
                  alt={offerInclusionsImage.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 44vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Inclusions */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: 0.1 }}
              className="relative flex flex-col justify-center lg:w-[56%] lg:py-12 lg:pl-4 xl:pl-8"
            >
              {/* Mobile band behind text */}
              <div
                className="absolute inset-0 -z-10 bg-[#e8efe5] lg:hidden"
                aria-hidden
              />

              <div className="px-2 py-8 sm:px-6 lg:px-0 lg:py-0">
                <h2 className="font-serif text-2xl tracking-[0.1em] text-bellevue-black md:text-3xl">
                  OFFER INCLUSIONS
                </h2>

                <ul className="mt-8 space-y-4 md:mt-10">
                  {offerInclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-sans text-sm font-light leading-relaxed text-bellevue-black/75 md:text-[15px]"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bellevue-black/45" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#book"
                  className="group mt-10 inline-flex flex-col items-start font-serif text-sm tracking-[0.2em] text-bellevue-black transition-colors hover:text-bellevue-gold md:mt-12"
                >
                  BOOK NOW
                  <span className="mt-2 h-px w-10 bg-bellevue-black/50 transition-all duration-300 group-hover:w-full group-hover:bg-bellevue-gold" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
