import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { sendGiftWhatsApp } from '@/lib/whatsapp'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
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
        console.error('WhatsApp send failed:', e)
      }
    }
  }

  return NextResponse.json({ ok: true })
}
