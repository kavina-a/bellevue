"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
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

const ease = [0.22, 1, 0.36, 1] as const

type SiteNavigationProps = {
  /** Hero overlay on the landing page; solid bar on inner pages */
  variant?: "hero" | "solid"
}

function useNavLinks() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const scrolledNavLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: isHome ? "#about" : "/about" },
    { name: "CHALETS", href: isHome ? "#chalets" : "/chalets" },
    { name: "GALLERY", href: "/gallery" },
    { name: "NEARBY ATTRACTIONS", href: isHome ? "#experiences" : "/experiences" },
    { name: "OFFERS", href: isHome ? "#offers" : "/offers" },
    { name: "FAQ", href: isHome ? "#faq" : "/#faq" },
    { name: "CONTACT US", href: isHome ? "#contact" : "/#contact" },
  ]

  const fullMenuLinks = scrolledNavLinks
  const bookHref = isHome ? "#book" : "/#book"

  return { scrolledNavLinks, fullMenuLinks, bookHref }
}

function NavLink({
  href,
  children,
  onClick,
  tone = "dark",
}: {
  href: string
  children: ReactNode
  onClick?: () => void
  tone?: "dark" | "light"
}) {
  const color =
    tone === "light"
      ? "text-white/85 hover:text-white"
      : "text-bellevue-black/75 hover:text-bellevue-black"

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center py-1 font-sans text-[0.7rem] tracking-[0.16em] uppercase transition-colors duration-300 ${color}`}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-bellevue-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </Link>
  )
}

export function SiteNavigation({ variant = "hero" }: SiteNavigationProps) {
  const isSolid = variant === "solid"
  const [isScrolled, setIsScrolled] = useState(isSolid)
  const [isChaletDropdownOpen, setIsChaletDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const chaletTriggerRef = useRef<HTMLDivElement>(null)
  const chaletPanelRef = useRef<HTMLDivElement>(null)
  const { scrolledNavLinks, fullMenuLinks, bookHref } = useNavLinks()

  const showScrolledNav = isSolid || isScrolled

  useEffect(() => {
    if (isSolid) return

    const handleScroll = () => {
      setIsScrolled((prev) => {
        if (window.scrollY > 80) return true
        if (window.scrollY < 40) return false
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
    if (showScrolledNav) setIsChaletDropdownOpen(false)
  }, [showScrolledNav])

  useEffect(() => {
    if (!isChaletDropdownOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (chaletTriggerRef.current?.contains(target) || chaletPanelRef.current?.contains(target)) return
      setIsChaletDropdownOpen(false)
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
        {/* Backdrop — soft cream glass + hairline when scrolled */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{
            opacity: showScrolledNav ? 1 : 0,
            y: showScrolledNav ? 0 : -8,
          }}
          transition={{ duration: 0.45, ease }}
          className="pointer-events-none absolute inset-0 border-b border-bellevue-black/6 bg-bellevue-cream/90 shadow-[0_10px_40px_-24px_rgba(26,26,26,0.28)] backdrop-blur-xl"
        />

        {/* Subtle gold edge that draws in on scroll */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ scaleX: showScrolledNav ? 1 : 0, opacity: showScrolledNav ? 1 : 0 }}
          transition={{ duration: 0.55, ease, delay: showScrolledNav ? 0.08 : 0 }}
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-px origin-center bg-gradient-to-r from-transparent via-bellevue-gold/55 to-transparent"
        />

        <nav className="relative mx-auto max-w-[1480px] px-5 lg:px-10 xl:px-12">
          <AnimatePresence mode="wait" initial={false}>
            {!showScrolledNav ? (
              <motion.div
                key="initial-nav"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease }}
                className="relative flex h-40 items-center justify-between sm:h-48 lg:h-56"
              >
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease }}
                  onClick={() => setIsMenuOpen(true)}
                  className="group flex items-center gap-2.5 text-white/85 transition-colors hover:text-white"
                  aria-label="Open menu"
                >
                  <span className="relative flex h-4 w-5 flex-col justify-between">
                    <span className="h-px w-full bg-current transition-all duration-300 group-hover:w-3/4" />
                    <span className="h-px w-full bg-current" />
                    <span className="h-px w-3/4 bg-current transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="hidden font-sans text-[0.7rem] tracking-[0.22em] uppercase md:inline">
                    Menu
                  </span>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease }}
                  className="absolute left-1/2 -translate-x-1/2"
                >
                  <Link href="/" className="block">
                    <Image
                      src={LOGO_URL}
                      alt="Bellevue Chalets by Pushella"
                      width={624}
                      height={187}
                      className="h-[12.35rem] w-auto brightness-0 invert sm:h-[15.6rem] lg:h-[23.4rem]"
                      priority
                    />
                  </Link>
                </motion.div>

                <div className="flex items-center gap-5 md:gap-7">
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.2, ease }}
                    ref={chaletTriggerRef}
                    className="relative hidden md:block"
                  >
                    <button
                      onClick={() => setIsChaletDropdownOpen((open) => !open)}
                      aria-expanded={isChaletDropdownOpen}
                      aria-haspopup="true"
                      className={`group flex items-center gap-1.5 font-sans text-[0.7rem] tracking-[0.18em] uppercase transition-colors ${
                        isChaletDropdownOpen ? "text-white" : "text-white/85 hover:text-white"
                      }`}
                    >
                      <span>Chalets</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-400 ${
                          isChaletDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isChaletDropdownOpen && (
                        <motion.div
                          ref={chaletPanelRef}
                          initial={{ opacity: 0, y: -8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={{ duration: 0.28, ease }}
                          className="absolute right-0 top-full mt-3 w-56 overflow-hidden border border-white/12 bg-bellevue-black/80 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
                        >
                          <ul className="py-1.5">
                            {chalets.map((chalet, i) => (
                              <motion.li
                                key={chalet.slug}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.04 + i * 0.05, duration: 0.35, ease }}
                              >
                                <Link
                                  href={`/chalets/${chalet.slug}`}
                                  onClick={() => setIsChaletDropdownOpen(false)}
                                  className="block px-4 py-2.5 font-sans text-[0.7rem] tracking-[0.12em] text-white/80 transition-colors hover:bg-white/8 hover:text-white"
                                >
                                  <span className="block">{chalet.name}</span>
                                  <span className="mt-0.5 block text-[0.6rem] tracking-[0.16em] uppercase text-bellevue-gold/70">
                                    {chalet.tagline}
                                  </span>
                                </Link>
                              </motion.li>
                            ))}
                          </ul>
                          <div className="border-t border-white/10 px-4 py-2.5">
                            <Link
                              href="/chalets"
                              onClick={() => setIsChaletDropdownOpen(false)}
                              className="group inline-flex items-center gap-1.5 font-sans text-[0.65rem] tracking-[0.16em] uppercase text-bellevue-gold transition-colors hover:text-white"
                            >
                              View all
                              <ArrowRight className="h-3 w-3 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.28, ease }}
                  >
                    <Link
                      href={bookHref}
                      className="group relative hidden overflow-hidden border border-white/45 px-5 py-2 font-sans text-[0.7rem] tracking-[0.2em] uppercase text-white transition-colors duration-400 md:inline-block hover:border-white hover:text-bellevue-black"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                      />
                      <span className="relative">Book Now</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scrolled-nav"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="flex h-[4.25rem] items-center justify-between lg:h-[4.75rem]"
              >
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <Link href="/" className="flex-shrink-0">
                    <Image
                      src={LOGO_URL}
                      alt="Bellevue Chalets by Pushella"
                      width={320}
                      height={96}
                      className="h-[4.55rem] w-auto lg:h-[5.2rem]"
                    />
                  </Link>
                </motion.div>

                <div className="hidden items-center gap-4 xl:gap-5 2xl:gap-6 lg:flex">
                  {scrolledNavLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + index * 0.03, ease }}
                    >
                      <NavLink href={link.href}>{link.name}</NavLink>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.32, ease }}
                  >
                    <Link
                      href={bookHref}
                      className="group relative ml-1 overflow-hidden bg-bellevue-black px-4 py-2 font-sans text-[0.7rem] tracking-[0.18em] uppercase text-white transition-colors duration-400 hover:text-bellevue-black"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-bellevue-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                      />
                      <span className="relative">Book Now</span>
                    </Link>
                  </motion.div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 text-bellevue-black transition-colors hover:text-bellevue-gold lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
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
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[100] bg-bellevue-black/45 backdrop-blur-[3px]"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.42, ease }}
              className="fixed bottom-0 left-0 top-0 z-[101] flex w-[min(340px,88vw)] flex-col border-r border-bellevue-black/8 bg-bellevue-cream shadow-[8px_0_40px_-12px_rgba(26,26,26,0.22)]"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between border-b border-bellevue-black/8 px-6 py-6">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src={LOGO_URL}
                    alt="Bellevue Chalets by Pushella"
                    width={280}
                    height={84}
                    className="h-14 w-auto sm:h-16"
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-bellevue-black/50 transition-colors hover:text-bellevue-black"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-7">
                <ul className="flex flex-col">
                  {fullMenuLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, duration: 0.4, ease }}
                      className="border-b border-bellevue-black/6 last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-center justify-between py-3.5 font-serif text-[1.35rem] tracking-wide text-bellevue-black transition-colors duration-300 hover:text-bellevue-gold"
                      >
                        <span>{link.name}</span>
                        <span
                          aria-hidden
                          className="h-px w-0 bg-bellevue-gold/70 transition-all duration-400 group-hover:w-6"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-bellevue-black/8 px-6 py-5">
                <Link
                  href={bookHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-bellevue-black px-6 py-3.5 text-center font-sans text-[0.7rem] tracking-[0.22em] uppercase text-white transition-colors duration-300 hover:bg-bellevue-gold"
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
