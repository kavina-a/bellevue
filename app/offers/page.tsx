"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { PageCover } from "@/components/page-cover"
// import { OfferInclusionsSection } from "@/components/offers/offer-inclusions-section"
import { SiteFooter } from "@/components/site-footer"

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src="/Photos/Exterior and Views/DJI_20250113065432_0854_D-Edit.jpg"
        alt="Aerial view of Bellevue Chalets in the Ambewela highlands"
        eyebrow="Offers"
        imageScale
        title="More Reasons to Escape"
        description="Enjoy more from your stay with our special offers, thoughtfully designed to make your stay at Bellevue Chalets even more memorable."
      />

      {/* <OfferInclusionsSection /> */}
      <section className="px-6 py-24 md:py-32 lg:px-12">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-bellevue-gold">
            Packages
          </p>
          <h2 className="mt-5 font-serif text-2xl text-bellevue-black md:text-3xl">
            Coming soon
          </h2>
          <div className="mx-auto mt-6 h-px w-12 bg-bellevue-gold/50" />
          <p className="mt-6 font-sans text-sm font-light leading-relaxed text-bellevue-black/60">
            Our special offers are being prepared. Please check back shortly, or contact our
            reservations team for current arrangements.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
