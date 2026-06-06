'use client'
import { useState } from 'react'

export default function RedeemPage() {
  const [code, setCode] = useState('')
  const [gift, setGift] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  async function lookup() {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/redeem/lookup?code=${code.toUpperCase()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setGift(data)
    } catch (e: any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  async function confirm() {
    setLoading(true)
    try {
      const res = await fetch('/api/redeem/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.toUpperCase() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setConfirmed(true)
    } catch (e: any) {
      setError(e.message)
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A017] to-[#F0C040] flex items-center justify-center font-black text-black text-2xl mx-auto mb-4">O</div>
          <h1 className="text-2xl font-black">Merchant Redemption</h1>
          <p className="text-[rgba(245,240,232,0.5)] text-sm mt-1">Enter the customer's gift code</p>
        </div>

        {!confirmed ? (
          <div className="space-y-4">
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="Enter gift code (e.g. AB3F9C12)"
              className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-4 text-center font-mono text-xl tracking-widest focus:border-[#D4A017]/50 focus:outline-none uppercase"
              maxLength={8} />

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            {!gift ? (
              <button onClick={lookup} disabled={loading || code.length < 6}
                className="btn-gold w-full py-4 font-bold disabled:opacity-50">
                {loading ? 'Looking up...' : 'Look Up Code'}
              </button>
            ) : (
              <div className="bg-[#141414] border border-[#D4A017]/30 rounded-xl p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[rgba(245,240,232,0.5)]">Gift value</span>
                  <span className="font-black text-[#D4A017] text-xl">£{(gift.amount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[rgba(245,240,232,0.5)]">From</span>
                  <span className="font-semibold">{gift.sender_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[rgba(245,240,232,0.5)]">Status</span>
                  <span className="text-green-400 font-semibold">✓ Valid</span>
                </div>
                <button onClick={confirm} disabled={loading}
                  className="btn-gold w-full py-4 font-bold mt-2 disabled:opacity-50">
                  {loading ? 'Confirming...' : 'Confirm Redemption ✓'}
                </button>
                <button onClick={() => { setGift(null); setCode('') }}
                  className="w-full py-2 text-sm text-[rgba(245,240,232,0.4)] hover:text-white">
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="text-7xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-green-400 mb-2">Redeemed!</h2>
            <p className="text-[rgba(245,240,232,0.5)] mb-6">£{(gift?.amount / 100).toFixed(2)} successfully redeemed.</p>
            <button onClick={() => { setGift(null); setCode(''); setConfirmed(false); setError('') }}
              className="btn-gold px-8 py-3">
              Next Customer
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
