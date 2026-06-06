export const dynamic = 'force-dynamic'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export default async function GiftPage({ params }: { params: { code: string } }) {
  const { data: gift } = await supabaseAdmin
    .from('gifts')
    .select('*')
    .eq('code', params.code.toUpperCase())
    .single()

  if (!gift) notFound()

  const amount = `£${(gift.amount / 100).toFixed(2)}`
  const redeemed = gift.status === 'redeemed'
  const expired = gift.expires_at && new Date(gift.expires_at) < new Date()

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex items-center justify-center px-6">
      <div className="max-w-sm w-full">

        {/* Gift card */}
        <div className="bg-gradient-to-br from-[#1B1B00] via-[#141414] to-[#001B0D] border border-[#D4A017]/30 rounded-3xl p-8 text-center mb-6 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#D4A017]/5 blur-xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#1B4D2E]/20 blur-xl" />

          <div className="relative">
            <div className="text-5xl mb-4">
              {redeemed ? '✅' : expired ? '⏰' : '🎊'}
            </div>
            <div className="text-sm font-bold text-[#D4A017] mb-1 tracking-widest uppercase">
              {redeemed ? 'Redeemed' : expired ? 'Expired' : gift.occasion || 'Gift'}
            </div>
            <div className="text-6xl font-black my-4">{amount}</div>
            <div className="text-sm text-[rgba(245,240,232,0.5)] mb-4">
              From <strong className="text-[#F5F0E8]">{gift.sender_name}</strong>
            </div>
            {gift.message && (
              <div className="bg-white/5 rounded-xl px-4 py-3 text-sm italic text-[rgba(245,240,232,0.7)] mb-4">
                "{gift.message}"
              </div>
            )}

            {!redeemed && !expired && (
              <>
                {/* QR Code placeholder - in production use a QR library */}
                <div className="bg-white rounded-2xl p-4 mx-auto w-40 h-40 mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-black font-black text-xl">{gift.code}</div>
                    <div className="text-black/50 text-xs mt-1">Show to merchant</div>
                  </div>
                </div>
                <div className="text-xs text-[rgba(245,240,232,0.35)]">
                  Code: <strong className="text-[#D4A017] font-mono text-sm">{gift.code}</strong>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        {!redeemed && !expired && (
          <div className="bg-[#141414] border border-white/8 rounded-2xl p-5">
            <h3 className="font-bold mb-3">How to redeem</h3>
            <ol className="space-y-2 text-sm text-[rgba(245,240,232,0.6)]">
              <li className="flex gap-2"><span className="text-[#D4A017] font-bold">1.</span>Visit any Odogwu partner business</li>
              <li className="flex gap-2"><span className="text-[#D4A017] font-bold">2.</span>Show this screen or your QR code to the merchant</li>
              <li className="flex gap-2"><span className="text-[#D4A017] font-bold">3.</span>They scan and confirm — it's done!</li>
            </ol>
            <a href="/merchants" className="block text-center mt-4 text-sm text-[#D4A017] underline">
              Find partner businesses near you →
            </a>
          </div>
        )}

        <p className="text-center text-xs text-[rgba(245,240,232,0.25)] mt-6">
          Powered by Odogwu · odogwu.online
        </p>
      </div>
    </main>
  )
}
