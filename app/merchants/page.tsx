export default function MerchantsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-[#D4A017] text-sm mb-8 block">← Back to Odogwu</a>

        <h1 className="text-4xl font-black mb-4">List your business on Odogwu</h1>
        <p className="text-[rgba(245,240,232,0.55)] text-lg mb-12 leading-relaxed">
          Reach thousands of Nigerian and African diaspora customers at weddings, birthdays
          and celebrations across the UK. They receive Odogwu gifts — you get new customers.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '👥', title: 'New customers', desc: 'Gift recipients are actively looking to spend at your business.' },
            { icon: '💷', title: 'Guaranteed payment', desc: 'Odogwu pays you directly for every redemption, within 7 days.' },
            { icon: '📍', title: 'UK-wide', desc: 'Any African business in the UK can join — restaurants, salons, fashion, events.' },
          ].map(item => (
            <div key={item.title} className="bg-[#141414] border border-white/8 rounded-2xl p-5">
              <div className="text-2xl mb-3">{item.icon}</div>
              <div className="font-bold mb-1">{item.title}</div>
              <div className="text-sm text-[rgba(245,240,232,0.5)]">{item.desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#141414] border border-[#D4A017]/20 rounded-2xl p-8">
          <h2 className="text-2xl font-black mb-6">Apply to join</h2>
          <form className="space-y-4" action="mailto:merchants@odogwu.online" method="post">
            <input placeholder="Business name" required className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <input placeholder="Business category (restaurant, salon, etc.)" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <input placeholder="City" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <input type="email" placeholder="Email address" required className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <input placeholder="Phone number" className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <button type="submit" className="btn-gold w-full py-4 font-bold">
              Apply Now →
            </button>
          </form>
          <p className="text-xs text-center text-[rgba(245,240,232,0.3)] mt-4">
            12% commission on redemptions · Paid weekly · Free to join
          </p>
        </div>
      </div>
    </main>
  )
}
