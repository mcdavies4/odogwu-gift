import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { senderName, senderEmail, recipientPhone, message, occasion, amount } = body

    if (!senderName || !recipientPhone || !amount || amount < 500) {
      return NextResponse.json({ error: 'Missing required fields or amount too small' }, { status: 400 })
    }

    const { data: gift, error: dbError } = await supabaseAdmin
      .from('gifts')
      .insert({
        sender_name: senderName,
        sender_email: senderEmail,
        recipient_phone: recipientPhone,
        message,
        occasion,
        amount,
        status: 'pending',
      })
      .select()
      .single()

    if (dbError || !gift) {
      return NextResponse.json({ error: 'Failed to create gift' }, { status: 500 })
    }

    const fee = Math.ceil(amount * 0.03)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL

    // Call Stripe API directly (fetch — edge compatible)
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price_data][currency]': 'gbp',
        'line_items[0][price_data][product_data][name]': `Odogwu Gift — £${(amount / 100).toFixed(2)} for ${occasion}`,
        'line_items[0][price_data][product_data][description]': `From ${senderName}${message ? ` · "${message}"` : ''}`,
        'line_items[0][price_data][unit_amount]': String(amount + fee),
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'success_url': `${appUrl}/success?gift=${gift.id}`,
        'cancel_url': `${appUrl}/send`,
        ...(senderEmail ? { 'customer_email': senderEmail } : {}),
        'metadata[giftId]': gift.id,
        'metadata[giftCode]': gift.code,
      }).toString()
    })

    const session = await stripeRes.json()
    if (!stripeRes.ok) throw new Error(session.error?.message || 'Stripe error')

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
