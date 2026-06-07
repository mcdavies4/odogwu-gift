'use client'
import { useState } from 'react'

const S = {
  dark:'#0A0A0A', surface:'#141414', text:'#F5F0E8',
  muted:'rgba(245,240,232,0.55)', border:'rgba(255,255,255,0.08)',
  gold:'#D4A017', goldLight:'#F0C040',
}

export default function RedeemPage() {
  const [code, setCode] = useState('')
  const [gift, setGift] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  async function lookup() {
    if(!code.trim()) return
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/redeem/lookup?code=${code.toUpperCase()}`)
      const data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setGift(data)
    } catch(e:any) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function confirm() {
    setLoading(true)
    try {
      const res = await fetch('/api/redeem/confirm', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({code: code.toUpperCase()}),
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setConfirmed(true)
    } catch(e:any) { setError(e.message) }
    finally { setLoading(false) }
  }

  const btnGold = {background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:900,borderRadius:12,padding:'14px',fontSize:16,cursor:'pointer',border:'none',fontFamily:'inherit',width:'100%'}

  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24}}>
      <div style={{maxWidth:360,width:'100%'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{width:56,height:56,borderRadius:16,background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#000',fontSize:24,margin:'0 auto 16px'}}>O</div>
          <h1 style={{fontSize:24,fontWeight:900}}>Merchant Redemption</h1>
          <p style={{color:S.muted,fontSize:14,marginTop:4}}>Enter the customer gift code</p>
        </div>

        {!confirmed ? (
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            <input value={code} onChange={e=>setCode(e.target.value.toUpperCase())}
              placeholder="Gift code (e.g. AB3F9C12)"
              maxLength={8}
              style={{background:S.surface,border:`1px solid rgba(255,255,255,0.12)`,borderRadius:12,
                padding:'16px',textAlign:'center',fontFamily:'monospace',fontSize:22,letterSpacing:4,
                color:S.text,outline:'none',width:'100%',boxSizing:'border-box'}}/>

            {error && <p style={{color:'#e74c3c',fontSize:13,textAlign:'center'}}>{error}</p>}

            {!gift ? (
              <button onClick={lookup} disabled={loading||code.length<6} style={{...btnGold,opacity:loading||code.length<6?0.5:1}}>
                {loading ? 'Looking up...' : 'Look Up Code'}
              </button>
            ) : (
              <div style={{background:S.surface,border:`1px solid rgba(212,160,23,0.3)`,borderRadius:14,padding:20,display:'flex',flexDirection:'column',gap:12}}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                  <span style={{color:S.muted}}>Gift value</span>
                  <span style={{fontWeight:900,color:S.gold,fontSize:22}}>£{(gift.amount/100).toFixed(2)}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                  <span style={{color:S.muted}}>From</span>
                  <span style={{fontWeight:600}}>{gift.sender_name}</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
                  <span style={{color:S.muted}}>Status</span>
                  <span style={{color:'#2ECC71',fontWeight:600}}>✓ Valid</span>
                </div>
                <button onClick={confirm} disabled={loading} style={{...btnGold,marginTop:4,opacity:loading?0.5:1}}>
                  {loading ? 'Confirming...' : 'Confirm Redemption ✓'}
                </button>
                <button onClick={()=>{setGift(null);setCode('')}}
                  style={{background:'none',border:'none',color:S.muted,fontSize:13,cursor:'pointer',fontFamily:'inherit'}}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:72,marginBottom:16}}>✅</div>
            <h2 style={{fontSize:28,fontWeight:900,color:'#2ECC71',marginBottom:8}}>Redeemed!</h2>
            <p style={{color:S.muted,marginBottom:24}}>£{(gift?.amount/100).toFixed(2)} successfully redeemed.</p>
            <button onClick={()=>{setGift(null);setCode('');setConfirmed(false);setError('')}} style={btnGold}>
              Next Customer
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
