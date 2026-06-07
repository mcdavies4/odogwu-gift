export const runtime = 'edge'
export const dynamic = 'force-dynamic'
import { supabaseAdmin } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const S = {
  dark:'#0A0A0A', surface:'#141414', text:'#F5F0E8',
  muted:'rgba(245,240,232,0.55)', border:'rgba(255,255,255,0.08)',
  gold:'#D4A017', goldLight:'#F0C040', borderGold:'rgba(212,160,23,0.3)',
}

export default async function GiftPage({ params }: { params: { code: string } }) {
  const { data: gift } = await supabaseAdmin
    .from('gifts').select('*').eq('code', params.code.toUpperCase()).single()

  if (!gift) notFound()

  const amount = `£${(gift.amount / 100).toFixed(2)}`
  const redeemed = gift.status === 'redeemed'
  const expired  = gift.expires_at && new Date(gift.expires_at) < new Date()

  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{maxWidth:380,width:'100%'}}>

        {/* Gift card */}
        <div style={{background:`linear-gradient(135deg,#1a1500,${S.surface},#001a0d)`,border:`1px solid ${S.borderGold}`,borderRadius:28,padding:'36px 28px',textAlign:'center',marginBottom:16,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-40,right:-40,width:120,height:120,borderRadius:'50%',background:'rgba(212,160,23,0.06)',filter:'blur(20px)'}}/>
          <div style={{position:'relative'}}>
            <div style={{fontSize:48,marginBottom:12}}>
              {redeemed ? '✅' : expired ? '⏰' : '🎊'}
            </div>
            <div style={{fontSize:11,fontWeight:700,color:S.gold,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8}}>
              {redeemed ? 'Redeemed' : expired ? 'Expired' : gift.occasion || 'Gift'}
            </div>
            <div style={{fontSize:56,fontWeight:900,letterSpacing:'-0.03em',margin:'8px 0'}}>{amount}</div>
            <div style={{fontSize:14,color:S.muted,marginBottom:16}}>
              From <strong style={{color:S.text}}>{gift.sender_name}</strong>
            </div>
            {gift.message && (
              <div style={{background:'rgba(255,255,255,0.05)',borderRadius:12,padding:'12px 16px',fontSize:14,fontStyle:'italic',color:'rgba(245,240,232,0.7)',marginBottom:16}}>
                "{gift.message}"
              </div>
            )}
            {!redeemed && !expired && (
              <>
                <div style={{background:'#fff',borderRadius:16,padding:16,margin:'0 auto 12px',width:144,height:144,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                  <div style={{color:'#000',fontWeight:900,fontSize:18,fontFamily:'monospace',letterSpacing:2}}>{gift.code}</div>
                  <div style={{color:'rgba(0,0,0,0.4)',fontSize:11,marginTop:4}}>Show to merchant</div>
                </div>
                <div style={{fontSize:12,color:'rgba(245,240,232,0.35)'}}>
                  Code: <strong style={{color:S.gold,fontFamily:'monospace',fontSize:14}}>{gift.code}</strong>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Instructions */}
        {!redeemed && !expired && (
          <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:20,padding:20,marginBottom:16}}>
            <h3 style={{fontWeight:700,marginBottom:14,fontSize:15}}>How to redeem</h3>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {['Visit any Odogwu partner business','Show this screen or QR code to the merchant','They scan and confirm — done!'].map((step,i) => (
                <div key={i} style={{display:'flex',gap:12,fontSize:14,color:S.muted,alignItems:'flex-start'}}>
                  <span style={{color:S.gold,fontWeight:700,flexShrink:0}}>{i+1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <Link href="/merchants" style={{display:'block',textAlign:'center',marginTop:16,fontSize:13,color:S.gold,textDecoration:'none'}}>
              Find partner businesses near you →
            </Link>
          </div>
        )}

        <p style={{textAlign:'center',fontSize:12,color:'rgba(245,240,232,0.2)'}}>
          Powered by Odogwu · odogwu.online
        </p>
      </div>
    </main>
  )
}
