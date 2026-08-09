import Image from "next/image"
import {
  Coffee,
  Handshake,
  Salad,
  Trees,
  Waves,
} from "lucide-react"
import { motion } from "framer-motion"
import { sustainabilityFeatures, type AmenityItem } from "@/lib/chalets"
import type { ChaletPhoto } from "@/lib/chalet-photos"

const ease = [0.22, 1, 0.36, 1] as const

const sustainabilityIcons = [Handshake, Coffee, Salad, Waves, Trees]

function SustainabilityList() {
  return (
    <ul>
      {sustainabilityFeatures.map((feature, i) => {
        const Icon = sustainabilityIcons[i % sustainabilityIcons.length]
        return (
          <li
            key={feature}
            className="flex items-center gap-3 border-b border-white/20 py-3 last:border-b-0 md:py-4 lg:py-5"
          >
            <Icon
              className="h-4 w-4 shrink-0 text-white/90"
              strokeWidth={1.25}
            />
            <span className="font-sans text-[10px] font-light leading-snug text-white/90 md:text-[11px]">
              {feature}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

type ChaletAmenitiesSectionProps = {
  amenityImage: ChaletPhoto
  amenities: AmenityItem[]
  accentColor: string
}

export function ChaletAmenitiesSection({
  amenityImage,
  amenities,
  accentColor,
}: ChaletAmenitiesSectionProps) {
  return (
    <section className="overflow-visible bg-bellevue-cream px-6 py-16 pb-20 md:py-24 md:pb-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="@container/amenities relative [container-type:inline-size] lg:pb-28 xl:pb-32">
            <div className="relative z-0 aspect-[4/3] overflow-hidden lg:aspect-[5/4] lg:w-[54%]">
              <Image
                src={amenityImage.src}
                alt={amenityImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="object-cover object-[38%_center]"
              />
              <div
                className="absolute bottom-0 right-0 top-16 flex w-[42%] flex-col justify-center bg-bellevue-black/45 px-5 backdrop-blur-[2px] md:top-20 md:px-6 lg:hidden"
                aria-hidden
              >
                <SustainabilityList />
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-col lg:absolute lg:inset-x-0 lg:top-20 lg:mt-0 lg:flex-row lg:items-stretch xl:top-24">
              <div className="hidden shrink-0 lg:block lg:w-[31.2%]" aria-hidden />

              <div
                className="relative hidden shrink-0 lg:block lg:w-[22.8%]"
                style={{ backgroundColor: accentColor }}
              >
                <div className="absolute inset-x-0 top-0 flex h-[calc(100cqw*0.54*4/5-5rem)] flex-col justify-center overflow-hidden bg-bellevue-black/45 px-7 backdrop-blur-[2px] xl:h-[calc(100cqw*0.54*4/5-6rem)] xl:px-8">
                  <SustainabilityList />
                </div>
              </div>

              <div
                className="flex-1 px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 xl:px-14 xl:py-16"
                style={{ backgroundColor: accentColor }}
              >
                <h2 className="font-serif text-2xl tracking-[0.08em] text-bellevue-black md:text-3xl">
                  IN-CHALET AMENITIES
                </h2>
                <ul className="mt-8 space-y-3.5">
                  {amenities.map((item) => (
                    <li
                      key={item.label}
                      className="font-sans text-sm font-light leading-relaxed text-bellevue-black/75"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bellevue-black/50" />
                        {item.label}
                      </div>
                      {item.children && item.children.length > 0 && (
                        <ul className="mt-2.5 space-y-2 pl-7">
                          {item.children.map((child) => (
                            <li key={child} className="flex items-start gap-2.5 text-bellevue-black/65">
                              <span className="mt-2 h-px w-2.5 shrink-0 bg-bellevue-black/35" />
                              {child}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
