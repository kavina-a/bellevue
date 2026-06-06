"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { PageCover } from "@/components/page-cover"
import { OfferInclusionsSection } from "@/components/offers/offer-inclusions-section"
import { SiteFooter } from "@/components/site-footer"
import { getChaletHero } from "@/lib/chalet-photos"

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteNavigation variant="hero" />

      <PageCover
        src={getChaletHero("grandeur").src}
        alt="Chalet Grandeur at Bellevue Chalets"
        eyebrow="Offers"
        title="Curated stays in the highlands"
        titleBg="bg-white"
      />

      <OfferInclusionsSection />

      <SiteFooter />
    </main>
  )
}
