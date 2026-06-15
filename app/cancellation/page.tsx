"use client"

import { motion } from "framer-motion"
import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"

const LEGAL_COVER_IMAGE = "/Photos/Exterior and Views/DJI_20250113073722_0909_D-Edit.jpg"

const sections = [
  {
    title: "1. Cancellation by Guest",
    body: "Guests may cancel their reservation by contacting us directly via email or phone. The applicable cancellation fee will depend on the notice period provided prior to the scheduled arrival date.",
  },
  {
    title: "2. Cancellation Notice Periods",
    body: "Cancellations made 14 or more days before arrival: Full refund of any deposit paid. Cancellations made 7–13 days before arrival: 50% of the total booking value will be charged. Cancellations made less than 7 days before arrival or no-shows: 100% of the total booking value will be charged.",
  },
  {
    title: "3. Modifications to Reservations",
    body: "Requests to modify the dates of your stay are subject to availability and must be submitted at least 7 days prior to arrival. We will do our best to accommodate changes, but cannot guarantee availability.",
  },
  {
    title: "4. Cancellation by Bellevue Chalets",
    body: "In the unlikely event that we must cancel your reservation due to unforeseen circumstances, we will notify you as soon as possible and provide a full refund of any payments made.",
  },
  {
    title: "5. Refund Processing",
    body: "Approved refunds will be processed within 7–14 business days and returned via the original payment method. Processing times may vary depending on your bank or payment provider.",
  },
  {
    title: "6. Force Majeure",
    body: "Bellevue Chalets shall not be liable for cancellations arising from events beyond our reasonable control, including but not limited to natural disasters, government restrictions, or public health emergencies.",
  },
  {
    title: "7. How to Cancel",
    body: "To cancel or modify your reservation, please contact us at reservations@bellevuechalets.com with your booking reference and requested changes.",
  },
]

const lastUpdated = new Date().toLocaleDateString("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function CancellationPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src={LEGAL_COVER_IMAGE}
        alt="Bellevue Chalets, Ambewela"
        eyebrow="Legal"
        imageScale
        title="Cancellation Policy"
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
              To cancel or amend your booking, please contact us at{" "}
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
