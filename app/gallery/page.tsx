"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SiteNavigation } from "@/components/site-navigation"

const galleryImages = [
  {
    src: "/DJI_20250113073722_0909_D-Edit.jpg",
    alt: "Bellevue Chalets at dusk, Ambewela",
    span: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[4/3] md:aspect-auto md:h-full",
  },
  {
    src: "/cove-1.jpg",
    alt: "Chalet Cove",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/mirador.jpg",
    alt: "Chalet Mirador",
    span: "",
    aspect: "aspect-square",
  },
  {
    src: "/granduer.jpg",
    alt: "Chalet Grandeur",
    span: "md:col-span-2",
    aspect: "aspect-[2/1]",
  },
]

export default function GalleryPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative overflow-hidden group ${image.span}`}
              >
                <div className={`relative ${image.aspect} min-h-[280px]`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-sans text-xs tracking-[0.2em] uppercase text-white">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
