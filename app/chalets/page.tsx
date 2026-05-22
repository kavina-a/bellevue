"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Check, ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Chalet data
const chaletsNav = [
  { name: "Chalet Cove", slug: "cove", tagline: "Intimate Retreat" },
  { name: "Chalet Mirador", slug: "mirador", tagline: "Beautiful View" },
  { name: "Chalet Grandeur", slug: "grandeur", tagline: "Spacious Luxury" },
]

// Full chalet details
const chaletData = [
  {
    id: "cove",
    name: "Chalet Cove",
    tagline: "Intimate Retreat",
    heroImage: "/cove-1.jpg",
    description: "A cozy and intimate retreat designed for couples seeking a peaceful escape. This private chalet features a plush Queen-size bed, a comfortable mini dining area, and a dedicated private entrance for complete seclusion. Wake up to breathtaking views of Ambewela's rolling green hills and lush forests right from your bed, offering the perfect setting for a serene and romantic getaway.",
    checkIn: {
      time: "From 2:00 PM onwards",
      early: "Early check-in subject to availability"
    },
    checkOut: {
      time: "By 12:00 PM",
      early: "Early check-out at 11:00 AM, depending on occupancy levels"
    },
    specialInstructions: "To ensure a smooth arrival and seamless experience, guests will receive a booking confirmation email with all terms and conditions prior to the check-in date. We kindly recommend reviewing these details in advance for a hassle-free stay.",
    childrenPolicy: "Children aged 0–6 years stay free of charge, while children aged 7–12 years incur an additional fee. Guests aged 13 and above are considered adults. Please note that additional beds are not provided; children will share existing bedding.",
    amenities: [
      { icon: "users", label: "Accommodates up to 2 adults" },
      { icon: "bed", label: "Queen-size bed" },
      { icon: "wifi", label: "Free Wi-Fi" },
      { icon: "phone", label: "Intercom phone" },
      { icon: "coffee", label: "Tea & coffee station" },
      { icon: "mountain", label: "Balcony with scenic views" },
      { icon: "utensils", label: "Private in-chalet dining" },
      { icon: "chef", label: "Meals available (based on selected meal plan)" },
      { icon: "menu", label: "À la carte dining options" },
      { icon: "sunrise", label: "Outdoor breakfast with a view (on request)" },
      { icon: "bath", label: "Towels & essential toiletries" },
      { icon: "smile", label: "Dental kits provided" },
      { icon: "shirt", label: "Ironing facility (on request)" },
      { icon: "thermometer", label: "Heaters (on request)" },
      { icon: "waves", label: "View & soothing sound of a natural water stream" },
    ],
    images: ["/cove-1.jpg"],
  },
  {
    id: "mirador",
    name: "Chalet Mirador",
    tagline: "Beautiful View",
    heroImage: "/mirador.jpg",
    description: "A private two-storey wooden retreat with breathtaking views of the surrounding forestry. Spacious and crafted for comfort and serenity, Mirador is perfect for couples seeking a romantic escape or families of up to four adults. Built entirely from wood, the chalet radiates warmth and rustic charm. The ground floor features a cosy living and dining area, while the upper floor houses a peaceful sleeping space furnished with two 4-foot double beds.",
    extendedDescription: "True to its name, Mirador — \"Beautiful View\" — the chalet opens to sweeping vistas of the Horton Plains Forest and the lush fields of Ambewela. A gentle stream flows through the property, enhancing the soothing atmosphere. Unwind in nature's embrace and experience the comfort, privacy, and beauty of your very own mountain escape.",
    checkIn: {
      time: "From 2:00 PM onwards",
      early: "Early check-in subject to availability"
    },
    checkOut: {
      time: "By 12:00 PM",
      early: "Early check-out at 11:00 AM, depending on occupancy levels"
    },
    specialInstructions: "To ensure a smooth arrival and seamless experience, guests will receive a booking confirmation email with all terms and conditions prior to the check-in date. We kindly recommend reviewing these details in advance for a hassle-free stay.",
    childrenPolicy: "Children aged 0–6 years stay free of charge, while children aged 7–12 years incur an additional fee. Guests aged 13 and above are considered adults. Please note that additional beds are not provided; children will share existing bedding.",
    amenities: [
      { icon: "users", label: "Accommodates 2–4 adults" },
      { icon: "layers", label: "Two-storey layout" },
      { icon: "bed", label: "Two 4 ft double beds" },
      { icon: "sofa", label: "Private living area" },
      { icon: "wifi", label: "Free Wi-Fi" },
      { icon: "tv", label: "TV" },
      { icon: "refrigerator", label: "Mini fridge" },
      { icon: "wind", label: "Hair dryer" },
      { icon: "phone", label: "Intercom phone" },
      { icon: "coffee", label: "Tea & coffee station" },
      { icon: "mountain", label: "Private balcony with scenic views" },
      { icon: "utensils", label: "Private in-chalet dining" },
      { icon: "chef", label: "Meals available (based on selected meal plan)" },
      { icon: "menu", label: "À la carte dining options" },
      { icon: "sunrise", label: "Outdoor breakfast with a view (on request)" },
      { icon: "bath", label: "Towels & essential toiletries" },
      { icon: "smile", label: "Dental kits provided" },
      { icon: "shirt", label: "Ironing facility (on request)" },
      { icon: "thermometer", label: "Heaters (on request)" },
      { icon: "waves", label: "View & soothing sound of a natural water stream" },
    ],
    images: ["/mirador.jpg"],
  },
  {
    id: "grandeur",
    name: "Chalet Grandeur",
    tagline: "Spacious Luxury",
    heroImage: "/granduer.jpg",
    description: "A spacious and elegant two-storey retreat, Grandeur is perfect for two couples, families, or a group of friends seeking a luxurious escape. This expansive chalet features two well-appointed double bedrooms and a cozy attic, offering plenty of space for relaxation. The ground floor boasts a separate living and dining area, while the upper floor houses the bedrooms, ensuring added privacy.",
    extendedDescription: "Step onto the expansive deck to unwind in the cool, misty climate, where breathtaking panoramic views of Ambewela's lush green hills and surrounding forests provide the perfect backdrop for an unforgettable outdoor dining experience.",
    checkIn: {
      time: "From 2:00 PM onwards",
      early: "Early check-in subject to availability"
    },
    checkOut: {
      time: "By 12:00 PM",
      early: "Early check-out at 11:00 AM, depending on occupancy levels"
    },
    specialInstructions: "To ensure a smooth arrival and seamless experience, guests will receive a booking confirmation email with all terms and conditions prior to the check-in date. We kindly recommend reviewing these details in advance for a hassle-free stay.",
    childrenPolicy: "Children aged 0–6 years stay free of charge, while children aged 7–12 years incur an additional fee. Guests aged 13 and above are considered adults. Please note that additional beds are not provided; children will share existing bedding.",
    amenities: [
      { icon: "users", label: "Accommodates up to 5 adults" },
      { icon: "layers", label: "Two-storey layout" },
      { icon: "bed", label: "Bedroom 1: Queen-size bed" },
      { icon: "bed", label: "Bedroom 2: 4 ft double bed" },
      { icon: "bed", label: "Attic: 7 ft low bed" },
      { icon: "bath", label: "Two separate bathrooms" },
      { icon: "edit", label: "Writing table" },
      { icon: "sofa", label: "Spacious private living area" },
      { icon: "sun", label: "Outdoor wooden deck area with scenic views" },
      { icon: "wifi", label: "Free Wi-Fi" },
      { icon: "tv", label: "Smart TV" },
      { icon: "refrigerator", label: "Mini fridge" },
      { icon: "wind", label: "Hair dryer" },
      { icon: "phone", label: "Intercom phone" },
      { icon: "coffee", label: "Tea & coffee station" },
      { icon: "utensils", label: "Private in-chalet dining area" },
      { icon: "chef", label: "Meals available (based on selected meal plan)" },
      { icon: "menu", label: "À la carte dining options" },
      { icon: "sunrise", label: "Outdoor breakfast with a view (on request)" },
      { icon: "bath", label: "Towels & essential toiletries" },
      { icon: "smile", label: "Dental kits provided" },
      { icon: "shirt", label: "Ironing facility (on request)" },
      { icon: "thermometer", label: "Heaters (on request)" },
      { icon: "waves", label: "View & soothing sound of a natural water stream" },
    ],
    images: ["/granduer.jpg"],
  }
]

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isChaletDropdownOpen, setIsChaletDropdownOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
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
  }, [])

  const scrolledNavLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Chalets", href: "/chalets" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/#contact" },
  ]

  const fullMenuLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Chalets", href: "/chalets" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          aria-hidden
          className={`absolute inset-0 bg-white/95 backdrop-blur-md pointer-events-none transition-opacity duration-300 ease-out ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <AnimatePresence mode="wait" initial={false}>
            {!isScrolled ? (
              <motion.div
                key="initial-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center justify-between h-24 lg:h-28"
              >
                {/* Chalet Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsChaletDropdownOpen(!isChaletDropdownOpen)}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors font-sans text-sm tracking-wide"
                  >
                    <span>Chalets</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isChaletDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isChaletDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-4 w-64 bg-black/80 backdrop-blur-xl border border-white/10 p-4"
                      >
                        {chaletsNav.map((chalet) => (
                          <Link
                            key={chalet.slug}
                            href={`#${chalet.slug}`}
                            onClick={() => setIsChaletDropdownOpen(false)}
                            className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <span className="font-serif text-lg">{chalet.name}</span>
                            <span className="block text-xs text-white/50 mt-0.5 tracking-wider uppercase">{chalet.tagline}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Centered Logo */}
                <Link href="/" className="absolute left-1/2 -translate-x-1/2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"
                    alt="Bellevue Chalets by Pushella"
                    width={280}
                    height={84}
                    className="h-16 lg:h-20 w-auto brightness-0 invert"
                    priority
                  />
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-6">
                  <Link
                    href="#book"
                    className="hidden md:inline-block px-6 py-2.5 text-sm tracking-wide border border-white/50 text-white hover:bg-white hover:text-bellevue-black transition-all duration-300"
                  >
                    Book Now
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    aria-label="Open menu"
                  >
                    <Menu className="w-6 h-6" />
                    <span className="hidden md:inline font-sans text-sm tracking-wide">Menu</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="scrolled-nav"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between h-18 lg:h-22"
              >
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"
                    alt="Bellevue Chalets by Pushella"
                    width={220}
                    height={66}
                    className="h-14 lg:h-16 w-auto"
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
                    href="#book"
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

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-bellevue-black/95 backdrop-blur-lg"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative h-full flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 lg:top-8 lg:right-12 p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"
                  alt="Bellevue Chalets by Pushella"
                  width={320}
                  height={96}
                  className="h-20 lg:h-24 w-auto brightness-0 invert"
                />
              </motion.div>

              <nav className="flex flex-col items-center gap-6">
                {fullMenuLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-serif text-4xl lg:text-5xl text-white hover:text-bellevue-gold transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <Link
                  href="#book"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-10 py-4 border border-white/50 text-white font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-bellevue-black transition-all duration-300"
                >
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop"
          alt="Bellevue Chalets"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold"
        >
          The Collection
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white"
        >
          Our Chalets
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 font-sans text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl"
        >
          Three unique sanctuaries in the heart of Ambewela, each offering a distinct experience of luxury and tranquility.
        </motion.p>

        {/* Quick Nav */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {chaletsNav.map((chalet) => (
            <Link
              key={chalet.slug}
              href={`#${chalet.slug}`}
              className="px-6 py-3 border border-white/30 text-white/80 font-sans text-sm tracking-wide hover:bg-white hover:text-bellevue-black transition-all duration-300"
            >
              {chalet.name}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-28 left-6 lg:left-12 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-sans text-sm tracking-wide">Back to Home</span>
      </Link>
    </section>
  )
}

// Individual Chalet Section
function ChaletSection({ chalet, index }: { chalet: typeof chaletData[0], index: number }) {
  const [activeImage, setActiveImage] = useState(0)
  const isEven = index % 2 === 0

  return (
    <section id={chalet.id} className={`py-24 md:py-32 ${isEven ? 'bg-white' : 'bg-bellevue-cream'}`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Chalet Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">{chalet.tagline}</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-bellevue-black">{chalet.name}</h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={isEven ? '' : 'lg:order-2'}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={chalet.images[activeImage]}
                    alt={`${chalet.name} - Image ${activeImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3 mt-4">
              {chalet.images.map((img, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={() => setActiveImage(imgIndex)}
                  className={`relative flex-1 aspect-[4/3] overflow-hidden transition-all duration-300 ${
                    activeImage === imgIndex ? 'ring-2 ring-bellevue-gold' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Chalet Details */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className={isEven ? '' : 'lg:order-1'}
          >
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              {chalet.description}
            </p>
            {chalet.extendedDescription && (
              <p className="mt-6 font-sans text-lg text-muted-foreground leading-relaxed">
                {chalet.extendedDescription}
              </p>
            )}

            {/* Check-in/Check-out Info */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="p-6 bg-bellevue-black/5">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-bellevue-gold mb-3">Check-in</h4>
                <p className="font-sans text-sm text-bellevue-black">{chalet.checkIn.time}</p>
                <p className="font-sans text-xs text-muted-foreground mt-1">{chalet.checkIn.early}</p>
              </div>
              <div className="p-6 bg-bellevue-black/5">
                <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-bellevue-gold mb-3">Check-out</h4>
                <p className="font-sans text-sm text-bellevue-black">{chalet.checkOut.time}</p>
                <p className="font-sans text-xs text-muted-foreground mt-1">{chalet.checkOut.early}</p>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="mt-8 p-6 border-l-2 border-bellevue-gold bg-bellevue-gold/5">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-bellevue-gold mb-3">Special Check-in Instructions</h4>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{chalet.specialInstructions}</p>
            </div>

            {/* Children Policy */}
            <div className="mt-6">
              <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-bellevue-gold mb-3">Children Policy</h4>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{chalet.childrenPolicy}</p>
            </div>

            {/* Book Now CTA */}
            <div className="mt-10">
              <Link
                href="#book"
                className="inline-block px-10 py-4 bg-bellevue-black text-white font-sans text-sm tracking-widest uppercase hover:bg-bellevue-gold transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Amenities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-bellevue-black text-center mb-10">
            {chalet.name} Amenities
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {chalet.amenities.map((amenity, amenityIndex) => (
              <motion.div
                key={amenityIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: amenityIndex * 0.03 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 p-4 bg-bellevue-black/5 hover:bg-bellevue-gold/10 transition-colors"
              >
                <Check className="w-4 h-4 text-bellevue-gold flex-shrink-0" />
                <span className="font-sans text-sm text-bellevue-black">{amenity.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Quick Navigation between chalets
function QuickNav() {
  return (
    <section className="bg-bellevue-black py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-bellevue-gold">Quick Navigation</span>
            <h3 className="mt-2 font-serif text-2xl text-white">Jump to a Chalet</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {chaletsNav.map((chalet) => (
              <Link
                key={chalet.slug}
                href={`#${chalet.slug}`}
                className="px-6 py-3 border border-white/30 text-white/80 font-sans text-sm tracking-wide hover:bg-white hover:text-bellevue-black transition-all duration-300"
              >
                {chalet.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-bellevue-black border-t border-white/10 py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-removebg-preview-NZqkBBzgK3GYDWKDbmtxFChTf61bf2.png"
              alt="Bellevue Chalets by Pushella"
              width={200}
              height={60}
              className="h-14 w-auto brightness-0 invert"
            />
          </div>

          <div className="flex items-center gap-8">
            <Link href="/#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/#" className="text-sm text-white/60 hover:text-white transition-colors">Terms</Link>
            <Link href="/#contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Bellevue Chalets by Pushella. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main Page Component
export default function ChaletsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      
      {/* All Chalets */}
      {chaletData.map((chalet, index) => (
        <ChaletSection key={chalet.id} chalet={chalet} index={index} />
      ))}
      
      <QuickNav />
      <Footer />
    </main>
  )
}
