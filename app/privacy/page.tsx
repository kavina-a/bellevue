"use client"

import { motion } from "framer-motion"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"

const LEGAL_COVER_IMAGE = "/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect personal information you provide when making a reservation, including your name, email address, phone number, and payment details. We may also collect information about your stay preferences and special requests.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to process and manage your reservation, communicate with you about your stay, personalise your experience, and comply with legal obligations. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Data Storage & Security",
    body: "We store your data securely and take appropriate technical measures to protect it against unauthorised access, alteration, or disclosure. Payment information is processed through secure, encrypted channels.",
  },
  {
    title: "4. Cookies",
    body: "Our website uses cookies to improve your browsing experience. You may disable cookies in your browser settings, though some features of the website may not function as intended as a result.",
  },
  {
    title: "5. Third-Party Services",
    body: "We may share necessary data with trusted third-party service providers (such as payment processors and booking platforms) solely for the purpose of completing your reservation.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, correct, or request deletion of the personal data we hold about you. To exercise these rights, please contact us directly.",
  },
  {
    title: "7. Contact",
    body: "If you have any questions or concerns about how we handle your personal data, please reach out to us at reservations@bellevuechalets.com.",
  },
]

const lastUpdated = new Date().toLocaleDateString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src={LEGAL_COVER_IMAGE}
        alt="Bellevue Chalets, Ambewela"
        eyebrow="Legal"
        imageScale
        title="Privacy Policy"
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
              For privacy-related enquiries, contact us at{" "}
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
