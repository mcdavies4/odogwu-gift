import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
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

    // Create gift record in DB first
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

    // Create Stripe checkout
    const fee = Math.ceil(amount * 0.03)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Odogwu Gift — £${(amount / 100).toFixed(2)} for ${occasion}`,
            description: `From ${senderName}${message ? ` · "${message}"` : ''}`,
          },
          unit_amount: amount + fee,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?gift=${gift.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/send`,
      customer_email: senderEmail || undefined,
      metadata: { giftId: gift.id, giftCode: gift.code },
    })

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

