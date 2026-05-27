"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"

const chalets = [
  { name: "Chalet Cove", slug: "cove", tagline: "Intimate Retreat" },
  { name: "Chalet Mirador", slug: "mirador", tagline: "Beautiful View" },
  { name: "Chalet Grandeur", slug: "grandeur", tagline: "Spacious Luxury" },
]

const LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"

type SiteNavigationProps = {
  /** Hero overlay on the landing page; solid bar on inner pages */
  variant?: "hero" | "solid"
}

function useNavLinks() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const scrolledNavLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: isHome ? "#about" : "/about" },
    { name: "Chalets", href: isHome ? "#chalets" : "/chalets" },
    { name: "Offers", href: isHome ? "#offers" : "/offers" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQ", href: isHome ? "#faq" : "/#faq" },
  ]

  const fullMenuLinks = [
    ...scrolledNavLinks,
    { name: "Contact", href: isHome ? "#contact" : "/#contact" },
  ]

  const bookHref = isHome ? "#book" : "/#book"

  return { scrolledNavLinks, fullMenuLinks, bookHref }
}

export function SiteNavigation({ variant = "hero" }: SiteNavigationProps) {
  const isSolid = variant === "solid"
  const [isScrolled, setIsScrolled] = useState(isSolid)
  const [isChaletDropdownOpen, setIsChaletDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const chaletDropdownRef = useRef<HTMLDivElement>(null)
  const { scrolledNavLinks, fullMenuLinks, bookHref } = useNavLinks()

  const showScrolledNav = isSolid || isScrolled

  useEffect(() => {
    if (isSolid) return

    const handleScroll = () => {
      setIsScrolled((prev) => {
        if (window.scrollY > 100) return true
        if (window.scrollY < 50) return false
        return prev
      })
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isSolid])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isChaletDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (chaletDropdownRef.current && !chaletDropdownRef.current.contains(event.target as Node)) {
        setIsChaletDropdownOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsChaletDropdownOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isChaletDropdownOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          aria-hidden
          className={`absolute inset-0 bg-white/95 backdrop-blur-md pointer-events-none transition-opacity duration-300 ease-out ${
            showScrolledNav ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait" initial={false}>
            {!showScrolledNav ? (
              <motion.div
                key="initial-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-between h-32 lg:h-44"
              >
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                  <span className="hidden md:inline font-sans text-sm tracking-wide">Menu</span>
                </button>

                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                  <Image
                    src={LOGO_URL}
                    alt="Bellevue Chalets by Pushella"
                    width={480}
                    height={144}
                    className="h-38 sm:h-48 lg:h-72 w-auto brightness-0 invert"
                    priority
                  />
                </Link>

                <div className="flex items-center gap-6">
                  <div ref={chaletDropdownRef} className="relative hidden md:block">
                    <button
                      onClick={() => setIsChaletDropdownOpen((open) => !open)}
                      aria-expanded={isChaletDropdownOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-2 font-sans text-sm tracking-wide transition-colors ${
                        isChaletDropdownOpen ? "text-white" : "text-white/90 hover:text-white"
                      }`}
                    >
                      <span>Chalets</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isChaletDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isChaletDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                          className="absolute top-[calc(100%+0.75rem)] right-0 z-[60] w-[min(18rem,calc(100vw-3rem))] origin-top-right overflow-hidden rounded-2xl border border-white/20 bg-black/20 backdrop-blur-xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)]"
                        >
                          <div className="p-2">
                            {chalets.map((chalet) => (
                              <Link
                                key={chalet.slug}
                                href={`/chalets#${chalet.slug}`}
                                onClick={() => setIsChaletDropdownOpen(false)}
                                className="group block rounded-xl px-4 py-3.5 transition-colors hover:bg-white/10"
                              >
                                <span className="font-serif text-[17px] text-white transition-colors group-hover:text-bellevue-gold">
                                  {chalet.name}
                                </span>
                                <span className="mt-0.5 block text-[10px] font-sans tracking-[0.18em] uppercase text-white/50">
                                  {chalet.tagline}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-white/15 px-2 py-2">
                            <Link
                              href="/chalets"
                              onClick={() => setIsChaletDropdownOpen(false)}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-sans tracking-wide text-bellevue-gold transition-colors hover:bg-white/10"
                            >
                              View All Chalets
                              <ArrowRight className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    href={bookHref}
                    className="hidden md:inline-block px-6 py-2.5 text-sm tracking-wide border border-white/50 text-white hover:bg-white hover:text-bellevue-black transition-all duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scrolled-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between h-20 lg:h-24"
              >
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src={LOGO_URL}
                    alt="Bellevue Chalets by Pushella"
                    width={320}
                    height={96}
                    className="h-18 lg:h-22 w-auto"
                  />
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                  {scrolledNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-sm tracking-wide font-sans text-bellevue-black hover:text-bellevue-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href={bookHref}
                    className="px-6 py-2.5 text-sm tracking-wide bg-bellevue-black text-white hover:bg-bellevue-gold transition-all duration-300"
                  >
                    Book Now
                  </Link>
                </div>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden p-2 text-bellevue-black"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-bellevue-black/40 backdrop-blur-[2px]"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[101] w-[min(340px,88vw)] bg-bellevue-cream border-r border-bellevue-black/10 shadow-[4px_0_32px_-8px_rgba(26,26,26,0.18)] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between px-6 py-7 border-b border-bellevue-black/8">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src={LOGO_URL}
                    alt="Bellevue Chalets by Pushella"
                    width={280}
                    height={84}
                    className="h-16 sm:h-20 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-bellevue-black/60 hover:text-bellevue-black transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-1">
                  {fullMenuLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 font-serif text-2xl text-bellevue-black hover:text-bellevue-gold transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 py-6 border-t border-bellevue-black/8">
                <Link
                  href={bookHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-6 py-3.5 bg-bellevue-black text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-bellevue-gold transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
