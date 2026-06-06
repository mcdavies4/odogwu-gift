import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 })

  const { data: gift } = await supabaseAdmin
    .from('gifts').select('*').eq('code', code).single()

  if (!gift) return NextResponse.json({ error: 'Gift not found' }, { status: 404 })
  if (gift.status === 'redeemed') return NextResponse.json({ error: 'Gift already redeemed' }, { status: 400 })
  if (gift.expires_at && new Date(gift.expires_at) < new Date())
    return NextResponse.json({ error: 'Gift has expired' }, { status: 400 })
  if (gift.status !== 'delivered')
    return NextResponse.json({ error: 'Gift payment not confirmed' }, { status: 400 })

  return NextResponse.json({ amount: gift.amount, sender_name: gift.sender_name, occasion: gift.occasion })
}

