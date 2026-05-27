"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { gallerySections } from "@/lib/gallery-photos"

export default function GalleryPage() {
  let imageIndex = 0

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      <section className="pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-20"
          >
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">Visual Journey</span>
            <h1 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-bellevue-black">Gallery</h1>
            <p className="mt-6 max-w-2xl mx-auto font-sans text-base text-bellevue-black/60 leading-relaxed">
              A glimpse of Bellevue Chalets — three private sanctuaries nestled in the misty highlands of Ambewela.
            </p>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {gallerySections.map((section) => (
              <div key={section.title}>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="font-serif text-2xl md:text-3xl text-bellevue-black mb-8"
                >
                  {section.title}
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.images.map((image) => {
                    const index = imageIndex++
                    return (
                      <motion.div
                        key={image.src}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: (index % 8) * 0.05 }}
                        className="relative overflow-hidden group"
                      >
                        <div className="relative aspect-square min-h-[200px]">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white">{image.alt}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
