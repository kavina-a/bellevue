"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"

const sitemapSections = [
  {
    title: "Main Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Chalets",
    links: [
      { name: "All Chalets", href: "/chalets" },
      { name: "Chalet Cove", href: "/chalets/cove" },
      { name: "Chalet Mirador", href: "/chalets/mirador" },
      { name: "Chalet Grandeur", href: "/chalets/grandeur" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { name: "All Experiences", href: "/experiences" },
      { name: "Ambewela Farm", href: "/experiences#ambewela-farm" },
      { name: "Horton Plains National Park", href: "/experiences#horton-plains" },
      { name: "Pattipola Railway Station", href: "/experiences#pattipola-railway-station" },
      { name: "Lake Gregory", href: "/experiences#lake-gregory" },
      { name: "Jagro Strawberry Farm", href: "/experiences#jagro-strawberry-farm" },
      { name: "Kandela Forest Park", href: "/experiences#kandela-forest-park" },
      { name: "Ambewela Station", href: "/experiences#ambewela-station" },
      { name: "Wind Power Station", href: "/experiences#ambewela-wind-power-station" },
      { name: "Lovers' Leap Waterfall", href: "/experiences#lovers-leap-waterfall" },
      { name: "Seetha Amman Temple", href: "/experiences#seetha-amman-temple" },
    ],
  },
  {
    title: "Offers & Reservations",
    links: [
      { name: "All Offers", href: "/offers" },
      { name: "Contact & Reservations", href: "/#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cancellation Policy", href: "/cancellation" },
      { name: "GDPR Compliance", href: "/gdpr" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src="/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"
        alt="Bellevue Chalets, Ambewela"
        eyebrow="Navigation"
        imageScale
        title="Sitemap"
        description="Every page across Bellevue Chalets — chalets, experiences, offers, and guest information."
      />

      <section className="px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {sitemapSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: sectionIndex * 0.08 }}
              >
                <p className="font-sans text-[10px] font-semibold tracking-[0.35em] uppercase text-bellevue-black">
                  {section.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-bellevue-black/55 transition-colors duration-300 hover:text-bellevue-black"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
