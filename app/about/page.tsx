"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { getChaletHero } from "@/lib/chalet-photos"
import { ArrowRight, Mail, MapPin } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const titleY   = useTransform(scrollYProgress, [0, 1], ["0%", "14%"])
  const opacity  = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 scale-110">
        <Image
          src="/Photos/Exterior and Views/DJI_20250113074154_0924_D-Edit.jpg"
          alt="Bellevue Chalets at dusk, Ambewela highlands"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bellevue-black/40 via-bellevue-black/25 to-bellevue-black/60" />

      {/* Title */}
      <motion.div
        style={{ y: titleY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.45em" }}
          transition={{ duration: 1.2, ease }}
          className="font-sans text-[10px] uppercase text-bellevue-gold"
        >
          Ambewela · Sri Lanka
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="mt-6 font-serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] text-white"
        >
          About<br />
          <span className="italic text-bellevue-warm">Bellevue</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease }}
          className="mt-10 h-px w-20 origin-left bg-bellevue-gold/60"
        />
      </motion.div>

      {/* Scroll nudge */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-5 w-px bg-white/30"
        />
      </motion.div>
    </section>
  )
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function Intro() {
  return (
    <section className="px-6 py-20 md:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5"
          >
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-gold">
              Our Story
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-bellevue-black md:text-5xl lg:text-[3.25rem]">
              A retreat born<br />
              <span className="italic text-bellevue-forest">from the mist</span>
            </h2>

            {/* Pull stat */}
            <div className="mt-14 flex gap-14 border-t border-bellevue-black/8 pt-10">
              {[
                { n: "03", label: "Private Chalets" },
                { n: "1,800m", label: "Above Sea Level" },
                { n: "∞", label: "Peace of Mind" },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="font-serif text-3xl text-bellevue-black md:text-4xl">{n}</p>
                  <p className="mt-1 font-sans text-[9px] tracking-[0.3em] uppercase text-bellevue-black/40">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="lg:col-span-7 lg:pt-1"
          >
            <p className="font-serif text-xl leading-[1.75] text-bellevue-black md:text-2xl">
              A private highland retreat where mist, mountain air, and unhurried hospitality
              come together — crafted for guests who wish to truly arrive.
            </p>

            <div className="mt-10 grid gap-8 border-t border-bellevue-black/8 pt-10 md:grid-cols-2 md:gap-12">
              <p className="font-sans text-[0.92rem] leading-[1.95] text-bellevue-black/65">
                Founded by Belle and Pushella, Bellevue was born from a shared love of nature,
                hospitality, and the simple joy of slowing down. What began as a dream to create
                a private escape among the clouds has grown into a sanctuary for guests seeking
                rest, connection, and mountain stillness.
              </p>
              <p className="font-sans text-[0.92rem] leading-[1.95] text-bellevue-black/65">
                Each of our three chalets is composed with warm timber, generous privacy, and
                views that unfold with the light. From farm-to-table dining to the smallest
                details of your stay, every moment is crafted to be remembered long after the
                mist has cleared.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Mosaic ───────────────────────────────────────────────────────────────────
// function Mosaic() {
//   return (
//     <section className="px-6 lg:px-16">
//       <div className="mx-auto max-w-[1400px]">
//         <div className="grid grid-rows-2 gap-3 md:grid-cols-12 md:gap-4 lg:gap-5">
//           {/* Tall left */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 1.1, ease }}
//             className="relative overflow-hidden md:col-span-7 md:row-span-2"
//           >
//             <div className="relative aspect-[3/4] md:h-full md:min-h-[600px]">
//               <Image
//                 src="/Photos/Exterior and Views/birdeyeshot.jpg"
//                 alt="Bird's-eye view of Bellevue Chalets"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 58vw"
//                 className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
//               />
//             </div>
//           </motion.div>

//           {/* Top right */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 1.1, delay: 0.1, ease }}
//             className="relative overflow-hidden md:col-span-5"
//           >
//             <div className="relative aspect-[4/3]">
//               <Image
//                 src="/Photos/Exterior and Views/DSC06192-Edit.jpg"
//                 alt="Bellevue Chalets exterior in the highlands"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 42vw"
//                 className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
//               />
//             </div>
//           </motion.div>

//           {/* Bottom right */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 1.1, delay: 0.2, ease }}
//             className="relative overflow-hidden md:col-span-5"
//           >
//             <div className="relative aspect-[4/3]">
//               <Image
//                 src="/Photos/Outdoor Dining & Meals/gardenbf.jpg"
//                 alt="Garden breakfast at Bellevue Chalets"
//                 fill
//                 sizes="(max-width: 768px) 100vw, 42vw"
//                 className="object-cover transition-transform duration-1000 hover:scale-[1.03]"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

// ─── Purpose (dark) ───────────────────────────────────────────────────────────
function Purpose() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section ref={ref} className="relative overflow-hidden bg-bellevue-dark-forest py-28 md:py-36 lg:py-44">
      {/* Subtle texture */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-[-10%] opacity-[0.035]"
        aria-hidden
      >
        <Image
          src="/Photos/Exterior and Views/DJI_20250113065432_0854_D-Edit.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-bellevue-gold/20" />

      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold"
        >
          Our Purpose
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="mt-8 font-serif text-3xl leading-[1.2] text-white md:text-4xl lg:text-[2.75rem]"
        >
          Peace, by{" "}
          <span className="italic text-bellevue-gold">design</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="mx-auto mt-10 max-w-2xl font-sans text-[0.95rem] leading-[1.95] text-white/60"
        >
          At Bellevue Chalets, our purpose is to focus on every detail to provide the most
          peaceful environment for those living in today&apos;s fast-paced world. We are dedicated
          to offering the peace of mind often overlooked in busy lifestyles — a place where time
          slows, nature speaks, and genuine rest becomes possible again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="mt-16 border-t border-white/10 pt-14"
        >
          <blockquote className="font-serif text-2xl italic leading-[1.6] text-white/90 md:text-[1.75rem]">
            &ldquo;I believe that true relaxation begins in cozy, private chalets<br className="hidden md:block" />
            surrounded by nature — and that is exactly what we strive to provide.&rdquo;
          </blockquote>
          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="h-px w-10 bg-bellevue-gold/40" />
            <p className="mt-4 font-serif text-xl text-bellevue-gold">Pushella</p>
            <p className="font-sans text-[9px] tracking-[0.35em] uppercase text-white/35">
              Co-Founder, Bellevue Chalets
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Dining filmstrip ─────────────────────────────────────────────────────────
function DiningStrip() {
  const photos = [
    { src: "/Photos/Outdoor Dining & Meals/DSC05965-Edit.jpg", alt: "Al fresco dining in the highlands", offset: "md:translate-y-6" },
    { src: "/Photos/Outdoor Dining & Meals/DSC06259-Edit.jpg", alt: "Outdoor meal at Bellevue", offset: "" },
    { src: "/Photos/Exterior and Views/DSC06152-Edit.jpg",     alt: "Bellevue Chalets setting", offset: "md:-translate-y-6" },
  ]

  return (
    <section className="px-6 py-20 md:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-end justify-between">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold"
          >
            Life at Bellevue
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            className="h-px flex-1 origin-right bg-bellevue-black/8 mx-8"
          />
          <motion.span
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-base italic text-bellevue-black/40"
          >
            Ambewela, Sri Lanka
          </motion.span>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {photos.map(({ src, alt, offset }, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.95, delay: i * 0.1, ease }}
              className={`relative overflow-hidden ${offset}`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.04]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[55vh] min-h-[360px]">
        <Image
          src="/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"
          alt="Bellevue Chalets at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bellevue-black/55" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="font-serif text-3xl italic leading-[1.35] text-white md:text-4xl lg:text-5xl">
            Three sanctuaries.<br />
            <span className="not-italic text-bellevue-warm">One unforgettable retreat.</span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/chalets"
              className="inline-flex items-center gap-3 border border-white/40 px-8 py-3.5 font-sans text-[11px] tracking-[0.3em] uppercase text-white transition-all hover:bg-white hover:text-bellevue-black"
            >
              Explore Our Chalets
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
            </Link>
            <Link
              href="/#book"
              className="inline-flex items-center gap-3 bg-bellevue-gold px-8 py-3.5 font-sans text-[11px] tracking-[0.3em] uppercase text-white transition-all hover:bg-white hover:text-bellevue-black"
            >
              Book a Stay
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Discover (between CTA and footer) ────────────────────────────────────────
const discoverLinks = [
  {
    href: "/chalets",
    label: "Our Chalets",
    title: "Three private sanctuaries",
    image: getChaletHero("mirador").src,
    alt: "Chalet Mirador, Bellevue Chalets",
  },
  {
    href: "/experiences",
    label: "Experiences",
    title: "The highlands, up close",
    image: "/Photos/Nearby%20Attractions/Horton%20Plains%20National%20Park.jpg",
    alt: "Horton Plains National Park",
  },
  {
    href: "/gallery",
    label: "Gallery",
    title: "A visual journey",
    image: "/Photos/Exterior and Views/DSC06107-Edit.jpg",
    alt: "Scenic highland vista at Bellevue",
  },
]

function Discover() {
  return (
    <section className="border-t border-bellevue-black/8 bg-[#eceae6] px-6 py-20 md:py-28 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-sans text-[10px] tracking-[0.45em] uppercase text-bellevue-gold">
              Continue exploring
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-[1.1] text-bellevue-black md:text-4xl">
              Discover Bellevue
            </h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-bellevue-black/55 md:text-right">
            From your chalet to cloud forests and curated stays — everything you need
            for an Ambewela escape.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {discoverLinks.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: i * 0.08, ease }}
            >
              <Link href={item.href} className="group block">
                <div className="relative aspect-[5/4] overflow-hidden bg-bellevue-black/5">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bellevue-black/70 via-bellevue-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                    <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-bellevue-gold">
                      {item.label}
                    </span>
                    <p className="mt-2 font-serif text-xl text-white md:text-2xl">{item.title}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase text-white/70 transition-colors group-hover:text-white">
                      Explore
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.25} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, delay: 0.15, ease }}
          className="mt-14 flex flex-col gap-8 border-t border-bellevue-black/8 pt-12 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <a
              href="mailto:reservations@bellevuechalets.com"
              className="inline-flex items-center gap-3 font-sans text-sm text-bellevue-black/70 transition-colors hover:text-bellevue-gold"
            >
              <Mail className="h-4 w-4 shrink-0 text-bellevue-gold" strokeWidth={1.25} />
              reservations@bellevuechalets.com
            </a>
            <span className="inline-flex items-center gap-3 font-sans text-sm text-bellevue-black/70">
              <MapPin className="h-4 w-4 shrink-0 text-bellevue-gold" strokeWidth={1.25} />
              Ambewela, Nuwara Eliya
            </span>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.3em] uppercase text-bellevue-black transition-colors hover:text-bellevue-gold"
          >
            Get in touch
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#eceae6]">
      <SiteNavigation variant="hero" />
      <Hero />
      <Intro />
      {/* <Mosaic /> */}
      <Purpose />
      <DiningStrip />
      {/* <Cta /> */}
      <Discover />
      <SiteFooter />
    </main>
  )
}
