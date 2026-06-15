"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { PageCover } from "@/components/page-cover"
import { OfferInclusionsSection } from "@/components/offers/offer-inclusions-section"
import { SiteFooter } from "@/components/site-footer"
import { getChaletHero } from "@/lib/chalet-photos"

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src={getChaletHero("grandeur").src}
        alt="Chalet Grandeur at Bellevue Chalets"
        eyebrow="Offers"
        imageScale
        title={
          <>
            An invitation
            <br />
            <span className="italic text-bellevue-forest">to linger</span>
          </>
        }
        description="Unhurried packages for those who wish to stay a little longer — private dining, forest mornings, and the quiet luxury of time well spent among the highlands."
      />

      <OfferInclusionsSection />

      <SiteFooter />
    </main>
  )
}
