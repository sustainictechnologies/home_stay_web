import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JALAD Homestays | Authentic Konkan Experiences',
  description:
    'Discover verified homestays from conscious local families across Ratnagiri, Sindhudurg, and Raigad. Direct host contact. No booking fees.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-stone-50 text-stone-900 antialiased`}>
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight text-stone-900">
              JALAD
              <span className="ml-1.5 text-xs font-normal text-brand-600 tracking-widest uppercase">
                Homestays
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/explore"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                Explore Stays
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-stone-200 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              © 2026 JALAD Homestays · Sustainic Technologies
            </p>
            <p className="text-xs text-stone-400">
              No booking fees · Direct host contact · Community verified
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}