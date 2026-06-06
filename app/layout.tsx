import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { cormorant, inter } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bellevue Chalets by Pushella | Luxury Alpine Retreats',
  description: 'Experience the pinnacle of mountain hospitality. Handcrafted luxury chalets in the most breathtaking alpine locations, where timeless elegance meets raw natural beauty.',
  keywords: 'luxury chalets, alpine retreats, ski chalets, mountain lodges, Swiss Alps, Pushella, Bellevue Chalets',
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
