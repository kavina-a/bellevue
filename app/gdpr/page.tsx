"use client"

import { motion } from "framer-motion"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"

const sections = [
  {
    title: "1. Our Commitment",
    body: "Bellevue Chalets by Pushella is committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable data protection laws.",
  },
  {
    title: "2. Data Controller",
    body: "Bellevue Chalets by Pushella acts as the data controller for personal information collected through this website and during the reservation process.",
  },
  {
    title: "3. Legal Basis for Processing",
    body: "We process your personal data on the basis of contractual necessity (to fulfil your reservation), legitimate interests (to improve our services), and legal obligation (to comply with applicable laws).",
  },
  {
    title: "4. Data Retention",
    body: "We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Reservation data is typically retained for a period of up to 7 years.",
  },
  {
    title: "5. Your GDPR Rights",
    body: "Under GDPR, you have the right to access your data, request rectification or erasure, restrict or object to processing, and data portability. You also have the right to lodge a complaint with a supervisory authority.",
  },
  {
    title: "6. International Data Transfers",
    body: "If your data is transferred outside the European Economic Area, we ensure appropriate safeguards are in place to protect your information in accordance with GDPR requirements.",
  },
  {
    title: "7. How to Exercise Your Rights",
    body: "To exercise any of your GDPR rights, please contact us in writing at reservations@bellevuechalets.com. We will respond to all requests within 30 days.",
  },
]

export default function GDPRPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="solid" />

      <section className="px-6 pt-32 pb-8 md:pt-40 md:pb-12 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sans text-xs tracking-[0.35em] uppercase text-bellevue-gold"
          >
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="mt-5 font-serif text-4xl leading-[1.12] text-bellevue-black md:text-5xl"
          >
            GDPR Compliance
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 h-px w-12 origin-left bg-bellevue-gold/60"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 font-sans text-sm text-bellevue-black/50"
          >
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </motion.p>
        </div>
      </section>

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
              For GDPR-related enquiries, contact us at{" "}
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
