"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bellevue-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            <span className="font-sans text-xs tracking-[0.3em] uppercase">Home</span>
          </Link>
          <Link href="/" className="font-serif text-xl text-white tracking-wide">
            Bellevue
          </Link>
          <Link
            href="/#contact"
            className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/40 text-white hover:bg-white hover:text-bellevue-black transition-all"
          >
            Reserve
          </Link>
        </div>
      </div>

      {/* Page header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-bellevue-black/8 shadow-[0_4px_20px_-12px_rgba(26,26,26,0.15)] font-sans text-xs tracking-[0.25em] uppercase text-bellevue-forest"
          >
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-8 font-serif text-4xl md:text-5xl lg:text-6xl text-bellevue-black leading-[1.12]"
          >
            A quiet retreat in the{" "}
            <span className="italic text-bellevue-forest">heart of Ambewela</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 mx-auto w-12 h-px bg-bellevue-gold/60"
          />
        </div>
      </section>

      {/* Centered story */}
      <section className="pb-20 md:pb-28 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-7">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-xl md:text-2xl text-bellevue-black/85 leading-relaxed"
          >
            Welcome to Bellevue Chalets by Pushella — a peaceful retreat nestled in the misty
            mountains of Ambewela, where luxury meets the untouched beauty of Sri Lanka&apos;s
            central highlands.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-sans text-base md:text-lg text-bellevue-black/65 leading-[1.85]"
          >
            Founded by Belle and Pushella, Bellevue was born from a shared love of nature,
            hospitality, and the simple joy of slowing down. What began as a dream to create a
            private escape among the clouds has become a sanctuary for guests seeking rest,
            connection, and the kind of stillness that only the mountains can offer.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-sans text-base md:text-lg text-bellevue-black/65 leading-[1.85]"
          >
            Each of our three chalets is thoughtfully designed with warm wooden accents, generous
            privacy, and sweeping views of rolling green hills and flowing waters. From
            farm-to-table dining to the smallest details of your stay, every moment is crafted
            with care — so you can arrive, breathe deeply, and simply be.
          </motion.p>
        </div>
      </section>

      {/* Our Purpose — highlighted */}
      <section className="pb-24 md:pb-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-[32px] bg-bellevue-forest shadow-[0_32px_64px_-24px_rgba(26,26,26,0.45)]">
            {/* Subtle texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Gold accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-bellevue-gold/70" />

            <div className="relative px-8 md:px-14 lg:px-20 py-16 md:py-20 lg:py-24 text-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 font-sans text-xs tracking-[0.25em] uppercase text-bellevue-gold">
                Our Purpose
              </span>

              <h2 className="mt-8 font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15]">
                Peace, by <span className="italic text-bellevue-gold">design</span>
              </h2>

              <div className="mt-8 mx-auto w-10 h-px bg-bellevue-gold/50" />

              <p className="mt-10 font-sans text-base md:text-lg text-white/75 leading-[1.9] max-w-2xl mx-auto">
                At Bellevue Chalets, our purpose is to focus on every detail to provide the most
                peaceful environment for those living in today&apos;s fast-paced world. Our team is
                dedicated to offering the peace of mind often overlooked in busy lifestyles — a
                place where time slows, nature speaks, and genuine rest becomes possible again.
              </p>

              {/* Quote block */}
              <div className="mt-14 relative max-w-xl mx-auto">
                <Quote
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 text-bellevue-gold/30"
                  strokeWidth={1}
                />
                <blockquote className="pt-6 font-serif text-xl md:text-2xl italic text-white/90 leading-relaxed">
                  I believe that true relaxation begins in cozy, private chalets surrounded by
                  nature — and that is exactly what we strive to provide.
                </blockquote>
              </div>

              {/* Signature */}
              <div className="mt-12 flex flex-col items-center gap-3">
                <div className="w-16 h-px bg-bellevue-gold/40" />
                <p className="font-serif text-lg text-bellevue-gold tracking-wide">Pushella</p>
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/45">
                  Co-Founder, Bellevue Chalets
                </p>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-bellevue-gold/25 pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-bellevue-gold/25 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-bellevue-gold/25 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-bellevue-gold/25 pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Closing + CTA */}
      <section className="pb-24 md:pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-sans text-base text-bellevue-black/60 leading-relaxed"
          >
            We invite you to discover Ambewela through our eyes — and to leave with memories
            that linger long after the mist has cleared.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/chalets"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-bellevue-black text-white font-sans text-xs tracking-[0.25em] uppercase hover:bg-bellevue-forest transition-colors"
            >
              Explore Our Chalets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-3.5 border border-bellevue-black/20 text-bellevue-black font-sans text-xs tracking-[0.25em] uppercase hover:border-bellevue-gold hover:text-bellevue-gold transition-colors"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Ambient image strip */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <Image
          src="/DJI_20250113073722_0909_D-Edit.jpg"
          alt="Bellevue Chalets at dusk, Ambewela"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bellevue-black/30" />
      </section>

      {/* Footer */}
      <footer className="bg-bellevue-black py-8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40">
            &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella
          </p>
        </div>
      </footer>
    </main>
  )
}
