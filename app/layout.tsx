import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Odogwu — Digital Gift Vouchers for African Celebrations',
  description: 'Spray digital gifts at weddings, birthdays and naming ceremonies. Recipients redeem at African restaurants, salons and businesses across the UK.',
  metadataBase: new URL('https://odogwu.online'),
  openGraph: {
    title: 'Odogwu — Digital Gift Vouchers for African Celebrations',
    description: 'Spray digital gifts at Nigerian and African celebrations. Redeem at UK African businesses.',
    url: 'https://odogwu.online',
    siteName: 'Odogwu',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
