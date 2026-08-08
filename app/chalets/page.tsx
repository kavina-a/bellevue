"use client"

import { SiteNavigation } from "@/components/site-navigation"
import { SiteFooter } from "@/components/site-footer"
import { PageCover } from "@/components/page-cover"
import { ChaletCard } from "@/components/chalets/chalet-card"
import { getChaletHero } from "@/lib/chalet-photos"
import { chalets } from "@/lib/chalets"

export default function ChaletsPage() {
  const [first, second, third] = chalets

  return (
    <main className="min-h-screen bg-bellevue-cream">
      <SiteNavigation variant="hero" />

      <PageCover
        src={getChaletHero("mirador").src}
        alt="Chalet Mirador, Bellevue Chalets"
        eyebrow="Accommodation"
        imageScale
        title={
          <>
Private Luxury Chalet Experiences            <br />
          </>
        }
        description="Designed to blend luxury with nature, each chalet features warm wooden interiors, complete
privacy and uninterrupted views of the lush greenery beyond. Guests can relax to the
soothing sounds of flowing waters while enjoying panoramic hill-country vistas from their
bedroom, complemented by en-suite bathrooms and modern comforts.

"
      />

      <section className="px-6 pb-24 md:pb-32 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            <ChaletCard chalet={first} priority />
            <ChaletCard chalet={second} priority />
          </div>

          <div className="mt-8 flex justify-center lg:mt-10">
            <div className="w-full md:max-w-[calc(50%-1.25rem)]">
              <ChaletCard chalet={third} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
