import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendGiftWhatsApp } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

// Stripe webhook verification using Web Crypto API (edge-compatible)
async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  try {
    const parts = sigHeader.split(',')
    const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1]
    const signature = parts.find(p => p.startsWith('v1='))?.split('=')[1]
    if (!timestamp || !signature) return false

    const signedPayload = `${timestamp}.${payload}`
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    )
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload))
    const expected = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
    return expected === signature
  } catch { return false }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature') || ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET || ''

  const valid = await verifyStripeSignature(body, sig, secret)
  if (!valid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  let event: any
  try { event = JSON.parse(body) } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const giftId  = session.metadata?.giftId
    if (!giftId) return NextResponse.json({ ok: true })

    await supabaseAdmin.from('gifts').update({
      status: 'delivered',
      stripe_payment_id: session.payment_intent,
    }).eq('id', giftId)

    const { data: gift } = await supabaseAdmin
      .from('gifts').select('*').eq('id', giftId).single()

    if (gift) {
      try {
        await sendGiftWhatsApp({
          recipientPhone: gift.recipient_phone,
          senderName: gift.sender_name,
          amount: gift.amount,
          message: gift.message,
          giftCode: gift.code,
          occasion: gift.occasion,
        })
        await supabaseAdmin.from('gifts').update({
          whatsapp_sent_at: new Date().toISOString()
        }).eq('id', giftId)
      } catch (e) {
        console.error('WhatsApp failed:', e)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
