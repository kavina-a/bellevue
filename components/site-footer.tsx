import Image from "next/image"
import Link from "next/link"

const LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"

const navColumns = [
  {
    title: "Chalets",
    links: [
      { name: "Chalet Cove", href: "/chalets/cove" },
      { name: "Chalet Mirador", href: "/chalets/mirador" },
      { name: "Chalet Grandeur", href: "/chalets/grandeur" },
      { name: "View All Chalets", href: "/chalets" },
    ],
  },
  {
    title: "Experiences",
    links: [
      { name: "Nearby Attractions", href: "/experiences" },
      { name: "Horton Plains", href: "/experiences#horton-plains" },
      { name: "Ambewela Farm", href: "/experiences#ambewela-farm" },
      { name: "Pattipola Railway", href: "/experiences#pattipola-railway-station" },
    ],
  },
  {
    title: "Offers",
    links: [
      { name: "Curated Stays", href: "/offers" },
      { name: "View All Offers", href: "/offers" },
      { name: "Contact Reservations", href: "/#contact" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Gallery", href: "/gallery" },
      { name: "FAQ", href: "/#faq" },
      { name: "Contact Us", href: "/#contact" },
    ],
  },
]

const legalLinks = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cancellation Policy", href: "/cancellation" },
  { name: "GDPR Compliance", href: "/gdpr" },
  { name: "Sitemap", href: "/sitemap" },
]

export function SiteFooter() {
  return (
    <footer className="bg-bellevue-warm">
      {/* Soft top edge — continues from FAQ without a hard break */}
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-bellevue-gold/30 to-transparent"
        aria-hidden
      />

      <div className="grid lg:grid-cols-[4fr_8fr]">
        {/* Left — full aerial photo, shown uncropped (container matches the photo's own aspect ratio) */}
        <div className="relative aspect-[2792/3722] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[420px]">
          <Image
            src="/Photos/Exterior and Views/birdeyeshot.jpg"
            alt="Bellevue Chalets aerial view, Ambewela"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover object-center lg:object-contain"
          />
          {/* Light at bottom so houses stay visible; darker only at top for logo */}
          <div className="absolute inset-0 bg-gradient-to-b from-bellevue-black/55 via-bellevue-black/10 to-bellevue-black/25" />

          <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
            <Link href="/" className="inline-block w-fit">
              <Image
                src={LOGO_URL}
                alt="Bellevue Chalets by Pushella"
                width={200}
                height={60}
                className="h-11 w-auto brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] lg:h-12"
              />
            </Link>

            <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-white/50">
              Ambewela &middot; Sri Lanka
            </p>
          </div>
        </div>

        {/* Right — nav columns on warm ground */}
        <div className="border-t border-bellevue-gold/15 px-10 py-16 lg:border-t-0 lg:border-l lg:px-16 lg:py-20">
          <div className="grid h-full grid-cols-2 content-start gap-12 md:grid-cols-4 md:gap-10">
            {navColumns.map((col) => (
              <div key={col.title}>
                <p className="font-serif text-sm tracking-[0.2em] uppercase text-bellevue-forest">
                  {col.title}
                </p>
                <div className="mt-4 h-px w-8 bg-bellevue-gold/50" />
                <ul className="mt-6 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="font-sans text-sm text-bellevue-black/50 transition-colors duration-500 hover:text-bellevue-gold"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar — deeper warm tone, not a stark white jump */}
      <div className="border-t border-bellevue-gold/20 bg-[#ddd2c0]">
        <div className="mx-auto max-w-[1500px] px-10 py-6 lg:px-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[11px] tracking-[0.08em] text-bellevue-black/45">
              &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center gap-y-2">
              {legalLinks.map((link, i) => (
                <span key={link.href} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-3 text-bellevue-gold/40 text-xs" aria-hidden>
                      |
                    </span>
                  )}
                  <Link
                    href={link.href}
                    className="font-sans text-[11px] tracking-[0.06em] text-bellevue-black/45 transition-colors duration-500 hover:text-bellevue-forest"
                  >
                    {link.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
