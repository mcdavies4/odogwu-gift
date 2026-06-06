'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const AMOUNTS = [10, 20, 50, 100, 200, 500]
const OCCASIONS = ['Wedding', 'Birthday', 'Naming Ceremony', 'Graduation', 'Thanksgiving', 'Party', 'Engagement', 'Housewarming', 'Other']

export default function SendForm() {
  const params = useSearchParams()
  const [amount, setAmount] = useState(parseInt(params.get('amount') || '50'))
  const [custom, setCustom] = useState('')
  const [form, setForm] = useState({ senderName: '', senderEmail: '', recipientPhone: '', message: '', occasion: 'Wedding' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const finalAmount = custom ? parseInt(custom) : amount
  const fee = Math.ceil(finalAmount * 0.03)
  const total = finalAmount + fee

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: finalAmount * 100 }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      window.location.href = data.checkoutUrl
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-lg mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="text-[#D4A017] text-sm mb-4 block">← Back</Link>
          <h1 className="text-3xl font-black mb-2">Send a gift 🎊</h1>
          <p className="text-[rgba(245,240,232,0.5)]">They will receive it on WhatsApp instantly.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3">Gift amount</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {AMOUNTS.map(a => (
                <button key={a} type="button"
                  onClick={() => { setAmount(a); setCustom('') }}
                  className={`py-3 rounded-xl font-bold text-sm border transition-all ${
                    !custom && amount === a
                      ? 'bg-[#D4A017] text-black border-[#D4A017]'
                      : 'bg-[#141414] border-white/10 hover:border-[#D4A017]/40'
                  }`}>£{a}</button>
              ))}
            </div>
            <input type="number" placeholder="Custom amount (£5 - £500)"
              value={custom} onChange={e => setCustom(e.target.value)}
              min={5} max={500}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Occasion</label>
            <select value={form.occasion} onChange={e => setForm({...form, occasion: e.target.value})}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none">
              {OCCASIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold">Your details</label>
            <input required placeholder="Your name" value={form.senderName}
              onChange={e => setForm({...form, senderName: e.target.value})}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <input type="email" placeholder="Your email (for receipt)" value={form.senderEmail}
              onChange={e => setForm({...form, senderEmail: e.target.value})}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-bold">Recipient</label>
            <input required placeholder="WhatsApp number (e.g. +447911123456)" value={form.recipientPhone}
              onChange={e => setForm({...form, recipientPhone: e.target.value})}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none" />
            <textarea placeholder="Personal message (optional)" value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              rows={3}
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#D4A017]/50 focus:outline-none resize-none" />
          </div>
          <div className="bg-[#141414] border border-white/10 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[rgba(245,240,232,0.5)]">Gift value</span><span className="font-bold">£{finalAmount}</span></div>
            <div className="flex justify-between"><span className="text-[rgba(245,240,232,0.5)]">Service fee (3%)</span><span>£{fee}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-2"><span className="font-bold">Total</span><span className="font-black text-[#D4A017]">£{total}</span></div>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading || !finalAmount || finalAmount < 5}
            className="btn-gold w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Creating...' : `Pay £${total} & Send Gift 🎊`}
          </button>
          <p className="text-xs text-center text-[rgba(245,240,232,0.3)]">
            Secured by Stripe · Gift valid 12 months · Redeemable at all Odogwu partners
          </p>
        </form>
      </div>
    </main>
  )
}
