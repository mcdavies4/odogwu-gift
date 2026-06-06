import Link from 'next/link'

export const metadata = {
  title: 'Odogwu — Digital Gift Vouchers for African Celebrations',
  description: 'Spray digital gifts at weddings, birthdays and celebrations. Recipients redeem at African businesses across the UK.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">

      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A017] to-[#F0C040] flex items-center justify-center font-black text-black text-lg">O</div>
          <span className="font-black text-xl tracking-tight">Odogwu</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/merchants" className="text-sm text-[rgba(245,240,232,0.5)] hover:text-[#D4A017] transition-colors">For Businesses</Link>
          <Link href="/send" className="btn-gold px-5 py-2 text-sm">Send a Gift</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#D4A017]/10 border border-[#D4A017]/25 rounded-full px-4 py-1.5 text-sm font-semibold text-[#D4A017] mb-8">
          🎊 Digital Money Spraying — Now in the UK
        </div>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
          Spray gifts.<br />
          <span className="text-[#D4A017]">Not cash.</span>
        </h1>
        <p className="text-xl text-[rgba(245,240,232,0.6)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Send digital gift vouchers at weddings, birthdays and naming ceremonies.
          Recipients redeem at African restaurants, salons, and businesses across the UK.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/send" className="btn-gold px-8 py-4 text-lg">
            Send a Gift →
          </Link>
          <Link href="/merchants" className="px-8 py-4 text-lg border border-white/15 rounded-xl hover:border-[#D4A017]/40 transition-colors">
            List Your Business
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-black text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '01', icon: '💳', title: 'Buy a gift', desc: 'Choose an amount, add a personal message, enter the recipient\'s WhatsApp number.' },
            { step: '02', icon: '📲', title: 'They receive it', desc: 'Recipient gets a WhatsApp message with a beautiful gift reveal link and QR code.' },
            { step: '03', icon: '🛍', title: 'Redeem anywhere', desc: 'They spend it at any Odogwu partner business — restaurants, salons, events across the UK.' },
          ].map(item => (
            <div key={item.step} className="bg-[#141414] border border-white/8 rounded-2xl p-6">
              <div className="text-xs font-bold text-[#D4A017] mb-3 tracking-widest">{item.step}</div>
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="font-bold text-lg mb-2">{item.title}</div>
              <div className="text-[rgba(245,240,232,0.5)] text-sm leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gift amounts */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-center mb-4">Popular amounts</h2>
        <p className="text-center text-[rgba(245,240,232,0.5)] mb-10">Choose any amount from £5 to £500</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[10, 20, 50, 100, 200, 500].map(amount => (
            <Link key={amount} href={`/send?amount=${amount}`}
              className="bg-[#141414] border border-white/8 rounded-xl py-4 text-center font-bold hover:border-[#D4A017]/40 hover:bg-[#D4A017]/5 transition-all">
              £{amount}
            </Link>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-center mb-10">Perfect for every occasion</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { emoji: '💒', name: 'Weddings' },
            { emoji: '🎂', name: 'Birthdays' },
            { emoji: '👶', name: 'Naming ceremonies' },
            { emoji: '🎓', name: 'Graduations' },
            { emoji: '🙏', name: 'Thanksgiving' },
            { emoji: '🎉', name: 'Parties' },
            { emoji: '❤️', name: 'Engagements' },
            { emoji: '🏠', name: 'Housewarming' },
          ].map(occ => (
            <div key={occ.name} className="bg-[#141414] border border-white/8 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{occ.emoji}</div>
              <div className="text-sm font-semibold">{occ.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-br from-[#D4A017]/10 to-[#1B4D2E]/10 border border-[#D4A017]/20 rounded-2xl p-12">
          <h2 className="text-4xl font-black mb-4">Ready to spray?</h2>
          <p className="text-[rgba(245,240,232,0.55)] mb-8">Join hundreds of Nigerians celebrating the right way.</p>
          <Link href="/send" className="btn-gold px-10 py-4 text-lg inline-block">
            Send Your First Gift →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 px-6 py-8 text-center text-sm text-[rgba(245,240,232,0.3)]">
        <div className="mb-2">
          <Link href="/merchants" className="hover:text-[#D4A017] mx-3 transition-colors">For Businesses</Link>
          <Link href="/terms" className="hover:text-[#D4A017] mx-3 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-[#D4A017] mx-3 transition-colors">Privacy</Link>
        </div>
        <div>© 2026 Odogwu · The 36th Company Ltd · London</div>
      </footer>
    </main>
  )
}
