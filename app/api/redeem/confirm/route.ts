import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { code } = await req.json()
  if (!code) return NextResponse.json({ error: 'Code required' }, { status: 400 })

  const { data: gift } = await supabaseAdmin
    .from('gifts').select('*').eq('code', code).single()

  if (!gift || gift.status !== 'delivered')
    return NextResponse.json({ error: 'Invalid or already redeemed' }, { status: 400 })

  await supabaseAdmin.from('gifts').update({
    status: 'redeemed',
    redeemed_at: new Date().toISOString(),
  }).eq('code', code)

  return NextResponse.json({ ok: true, amount: gift.amount })
}

