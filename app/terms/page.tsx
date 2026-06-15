"use client"

import { motion } from "framer-motion"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"

const LEGAL_COVER_IMAGE = "/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or making a reservation at Bellevue Chalets by Pushella, you agree to be bound by these Terms and Conditions. Please read them carefully before completing a booking.",
  },
  {
    title: "2. Reservations & Payments",
    body: "All reservations are subject to availability. A deposit may be required at the time of booking to confirm your stay. Full payment details will be communicated during the reservation process.",
  },
  {
    title: "3. Check-in & Check-out",
    body: "Standard check-in time is 2:00 PM and check-out is 12:00 PM. Early check-in or late check-out may be available upon request, subject to availability and may incur an additional charge.",
  },
  {
    title: "4. Guest Conduct",
    body: "Guests are expected to respect the property, other guests, and the natural surroundings of Ambewela. Any damage to property caused by guests will be charged accordingly.",
  },
  {
    title: "5. Liability",
    body: "Bellevue Chalets by Pushella shall not be liable for any loss, damage, or injury to guests or their belongings during their stay, except where required by applicable law.",
  },
  {
    title: "6. Governing Law",
    body: "These terms are governed by the laws of Sri Lanka. Any disputes arising shall be subject to the jurisdiction of the courts of Sri Lanka.",
  },
  {
    title: "7. Amendments",
    body: "We reserve the right to update these Terms and Conditions at any time. The most current version will always be available on this page.",
  },
]

const lastUpdated = new Date().toLocaleDateString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src={LEGAL_COVER_IMAGE}
        alt="Bellevue Chalets, Ambewela"
        eyebrow="Legal"
        imageScale
        title="Terms & Conditions"
        description={`Last updated: ${lastUpdated}`}
      />

      <section className="px-6 py-16 md:py-24 lg:px-12">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
            >
              <h2 className="font-sans text-base font-semibold tracking-wide text-bellevue-black">
                {section.title}
              </h2>
              <p className="mt-3 font-sans text-base leading-[1.85] text-bellevue-black/65">
                {section.body}
              </p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-t border-bellevue-black/10 pt-10"
          >
            <p className="font-sans text-sm text-bellevue-black/50">
              For any questions about these Terms and Conditions, please contact us at{" "}
              <a
                href="mailto:reservations@bellevuechalets.com"
                className="text-bellevue-gold hover:underline"
              >
                reservations@bellevuechalets.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
