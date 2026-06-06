import { Belleza, Cormorant_Garamond, Inter } from 'next/font/google'

export const belleza = Belleza({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})
