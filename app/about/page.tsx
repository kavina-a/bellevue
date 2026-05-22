"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0])

  const purposeRef = useRef<HTMLElement>(null)
  const { scrollYProgress: purposeProgress } = useScroll({
    target: purposeRef,
    offset: ["start end", "end start"],
  })
  const purposeImgY = useTransform(purposeProgress, [0, 1], ["-15%", "15%"])

  return (
    <main className="min-h-screen bg-bellevue-cream">
      {/* Top Nav strip */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-bellevue-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
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
            href="#contact"
            className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase border border-white/40 text-white hover:bg-white hover:text-bellevue-black transition-all"
          >
            Reserve
          </Link>
        </div>
      </div>

      {/* HERO */}
      <section ref={heroRef} className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop"
            alt="Misty highlands of Ambewela"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bellevue-black/40 via-bellevue-black/20 to-bellevue-black/70" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-sans text-xs tracking-[0.5em] uppercase text-bellevue-gold"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 font-serif text-5xl md:text-6xl lg:text-8xl text-white leading-[1.05] max-w-5xl"
          >
            A retreat <span className="italic">crafted</span><br />from quiet moments.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-12 w-px h-20 bg-bellevue-gold/60"
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="block font-sans text-[10px] tracking-[0.4em] uppercase text-white/60">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* INTRO STORY */}
      <section className="py-32 md:py-40 lg:py-48 bg-bellevue-cream">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold">
                Established 2025
              </span>
              <h2 className="mt-8 font-serif text-3xl md:text-4xl lg:text-5xl text-bellevue-black leading-[1.1]">
                {"Ambewela's"}<br />
                <span className="italic text-bellevue-forest">Hidden Paradise</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-8 lg:pt-4"
            >
              <p className="font-serif text-2xl md:text-3xl text-bellevue-black/80 leading-[1.5]">
                Welcome to{" "}
                <span className="italic text-bellevue-forest">Bellevue Chalets by Pushella</span> —
                a peaceful retreat nestled in the misty mountains of Ambewela.
              </p>
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <p className="font-sans text-base text-bellevue-black/70 leading-relaxed">
                  Experience a one-of-a-kind luxury chalet stay with warm wooden accents, surrounded by
                  lush greenery and the soothing presence of flowing waters. Each chalet is thoughtfully
                  designed to provide privacy, breathtaking views, and a calm, tranquil atmosphere.
                </p>
                <p className="font-sans text-base text-bellevue-black/70 leading-relaxed">
                  We focus on personalized experiences that stay with you. From farm-to-table meals
                  prepared with fresh local ingredients to thoughtful touches throughout your stay,
                  Bellevue Chalets ensures every moment is remembered forever.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="bg-bellevue-cream pb-24">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-12 gap-4">
            {[
              { src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=900", span: "col-span-12 md:col-span-7", aspect: "aspect-[16/10]" },
              { src: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=900", span: "col-span-12 md:col-span-5", aspect: "aspect-[16/10]" },
              { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900", span: "col-span-6 md:col-span-4", aspect: "aspect-[4/5]" },
              { src: "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=900", span: "col-span-6 md:col-span-4", aspect: "aspect-[4/5]" },
              { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=900", span: "col-span-12 md:col-span-4", aspect: "aspect-[4/5]" },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${img.span} relative ${img.aspect} overflow-hidden`}
              >
                <Image
                  src={img.src}
                  alt={`Bellevue moment ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PURPOSE */}
      <section ref={purposeRef} className="relative bg-bellevue-black overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-32 md:py-40">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div
              style={{ y: purposeImgY }}
              className="lg:col-span-6 relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop"
                  alt="Calm mountain solitude"
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* corner gold marks */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-bellevue-gold" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b border-r border-bellevue-gold" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="lg:col-span-6"
            >
              <span className="font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold">
                Our Purpose
              </span>
              <h2 className="mt-8 font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                Peace, by <span className="italic">design</span>.
              </h2>
              <div className="mt-10 h-px w-24 bg-bellevue-gold/50" />
              <p className="mt-10 font-sans text-lg text-white/70 leading-relaxed">
                {"At Bellevue Chalets, our purpose is to focus on every detail to provide the most peaceful environment for those living in today's fast-paced world. Our team is dedicated to offering the peace of mind often overlooked in busy lifestyles."}
              </p>
              <p className="mt-6 font-serif text-xl italic text-white/85 leading-relaxed">
                {"\u201CI believe that true relaxation begins in cozy, private chalets surrounded by nature — and that is exactly what we strive to provide.\u201D"}
              </p>
              <p className="mt-6 font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold/80">
                — Pushella, Founder
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-bellevue-cream py-32 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-bellevue-gold">
              Our Pillars
            </span>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-bellevue-black leading-tight">
              The four foundations<br />of our hospitality.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-bellevue-black/10">
            {[
              {
                no: "01",
                title: "Privacy",
                body: "Each chalet stands alone in its own space, undisturbed by neighbors.",
              },
              {
                no: "02",
                title: "Nature",
                body: "Lush greenery and flowing waters surround every window, every breath.",
              },
              {
                no: "03",
                title: "Craft",
                body: "Warm wooden accents and considered details define every interior.",
              },
              {
                no: "04",
                title: "Care",
                body: "A devoted team anticipates every need, with quiet, unobtrusive grace.",
              },
            ].map((v, i) => (
              <motion.div
                key={v.no}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-bellevue-cream p-10 lg:p-12"
              >
                <span className="font-serif text-3xl text-bellevue-gold">{v.no}</span>
                <h3 className="mt-6 font-serif text-2xl text-bellevue-black">{v.title}</h3>
                <p className="mt-4 font-sans text-sm text-bellevue-black/60 leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative h-[70vh] overflow-hidden" id="contact">
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
          alt="The view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bellevue-black/55" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white max-w-3xl leading-[1.1]"
          >
            Begin your<br /><span className="italic">quiet escape</span>.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/chalets"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-bellevue-gold text-bellevue-black font-sans text-xs tracking-[0.3em] uppercase hover:bg-white transition-colors"
            >
              View Chalets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-white/50 text-white font-sans text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-bellevue-black transition-all"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer mini */}
      <footer className="bg-bellevue-black border-t border-white/10 py-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-white/40">
            &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella
          </p>
        </div>
      </footer>
    </main>
  )
}
