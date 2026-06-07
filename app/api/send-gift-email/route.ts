import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendGiftEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { giftId } = await req.json()
    if (!giftId) return NextResponse.json({ error: 'giftId required' }, { status: 400 })

    const { data: gift, error } = await supabaseAdmin
      .from('gifts').select('*').eq('id', giftId).single()

    if (error || !gift) return NextResponse.json({ error: 'Gift not found' }, { status: 404 })

    if (!gift.sender_email) return NextResponse.json({ error: 'No sender email' }, { status: 400 })

    // Idempotency: skip if already sent
    if (gift.whatsapp_sent_at) return NextResponse.json({ ok: true, skipped: true })

    await sendGiftEmail({
      senderName:     gift.sender_name,
      senderEmail:    gift.sender_email,
      recipientPhone: gift.recipient_phone,
      amount:         gift.amount,
      message:        gift.message,
      giftCode:       gift.code,
      occasion:       gift.occasion,
    })

    await supabaseAdmin.from('gifts').update({
      whatsapp_sent_at: new Date().toISOString(),
    }).eq('id', giftId)

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('[send-gift-email] failed:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
