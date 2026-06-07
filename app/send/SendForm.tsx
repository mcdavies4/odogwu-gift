'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const S = {
  dark:'#0A0A0A', surface:'#141414', text:'#F5F0E8',
  muted:'rgba(245,240,232,0.55)', border:'rgba(255,255,255,0.08)',
  gold:'#D4A017', goldLight:'#F0C040',
}
const AMOUNTS = [10,20,50,100,200,500]
const OCCASIONS = ['Wedding','Birthday','Naming Ceremony','Graduation','Thanksgiving','Party','Engagement','Housewarming','Other']
const input = {width:'100%',background:S.surface,border:`1px solid ${S.border}`,borderRadius:12,padding:'12px 16px',color:S.text,fontSize:14,fontFamily:'inherit',outline:'none',boxSizing:'border-box' as const}

export default function SendForm() {
  const params = useSearchParams()
  const [amount, setAmount] = useState(parseInt(params.get('amount')||'50'))
  const [custom, setCustom] = useState('')
  const [form, setForm] = useState({senderName:'',senderEmail:'',recipientPhone:'',message:'',occasion:'Wedding'})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const finalAmount = custom ? parseInt(custom)||0 : amount
  const fee = Math.ceil(finalAmount * 0.03)
  const total = finalAmount + fee

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/create-gift', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({...form, amount: finalAmount * 100}),
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data.error||'Something went wrong')
      window.location.href = data.checkoutUrl
    } catch(err:any) {
      setError(err.message); setLoading(false)
    }
  }

  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'}}>
      <div style={{maxWidth:520,margin:'0 auto',padding:'40px 24px 60px'}}>
        <Link href="/" style={{color:S.gold,fontSize:13,textDecoration:'none',display:'block',marginBottom:24}}>← Back</Link>
        <h1 style={{fontSize:32,fontWeight:900,marginBottom:6}}>Send a gift 🎊</h1>
        <p style={{color:S.muted,marginBottom:32,fontSize:15}}>You will receive the gift link by email to forward to the recipient.</p>

        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:24}}>

          {/* Amount */}
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:700,marginBottom:12}}>Gift amount</label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:10}}>
              {AMOUNTS.map(a => (
                <button key={a} type="button" onClick={()=>{setAmount(a);setCustom('')}}
                  style={{padding:'12px 8px',borderRadius:12,fontWeight:800,fontSize:15,cursor:'pointer',fontFamily:'inherit',
                    border: !custom&&amount===a ? `2px solid ${S.gold}` : `1px solid ${S.border}`,
                    background: !custom&&amount===a ? 'rgba(212,160,23,0.15)' : S.surface,
                    color: !custom&&amount===a ? S.gold : S.text}}>
                  £{a}
                </button>
              ))}
            </div>
            <input type="number" placeholder="Custom amount (£5–£500)" value={custom}
              onChange={e=>setCustom(e.target.value)} min={5} max={500} style={input}/>
          </div>

          {/* Occasion */}
          <div>
            <label style={{display:'block',fontSize:13,fontWeight:700,marginBottom:8}}>Occasion</label>
            <select value={form.occasion} onChange={e=>setForm({...form,occasion:e.target.value})} style={input}>
              {OCCASIONS.map(o=><option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Your details */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <label style={{fontSize:13,fontWeight:700}}>Your details</label>
            <input required placeholder="Your name" value={form.senderName}
              onChange={e=>setForm({...form,senderName:e.target.value})} style={input}/>
            <input required type="email" placeholder="Your email — we send the gift link here"
              value={form.senderEmail} onChange={e=>setForm({...form,senderEmail:e.target.value})} style={input}/>
            <div style={{fontSize:12,color:S.muted,padding:'4px 4px'}}>
              📧 After payment, you will receive the gift card and QR code by email to forward however you like.
            </div>
          </div>

          {/* Recipient info */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            <label style={{fontSize:13,fontWeight:700}}>Recipient (optional)</label>
            <input placeholder="Recipient name (shown on gift card)" value={form.recipientPhone}
              onChange={e=>setForm({...form,recipientPhone:e.target.value})} style={input}/>
            <textarea placeholder="Personal message (optional)" value={form.message}
              onChange={e=>setForm({...form,message:e.target.value})} rows={3}
              style={{...input,resize:'none'}}/>
          </div>

          {/* Summary */}
          <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:14,padding:'16px 20px',display:'flex',flexDirection:'column',gap:10}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
              <span style={{color:S.muted}}>Gift value</span>
              <span style={{fontWeight:700}}>£{finalAmount}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14}}>
              <span style={{color:S.muted}}>Service fee (3%)</span>
              <span>£{fee}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',borderTop:`1px solid ${S.border}`,paddingTop:10}}>
              <span style={{fontWeight:800,fontSize:15}}>Total</span>
              <span style={{fontWeight:900,color:S.gold,fontSize:18}}>£{total}</span>
            </div>
          </div>

          {error && <p style={{color:'#e74c3c',fontSize:14}}>{error}</p>}

          <button type="submit" disabled={loading||!finalAmount||finalAmount<5}
            style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:900,
              borderRadius:14,padding:'16px',fontSize:17,cursor:'pointer',border:'none',fontFamily:'inherit',
              opacity:loading||!finalAmount||finalAmount<5?0.5:1,boxShadow:'0 8px 24px rgba(212,160,23,0.3)'}}>
            {loading ? 'Creating...' : `Pay £${total} & Send Gift 🎊`}
          </button>

          <p style={{fontSize:12,textAlign:'center',color:'rgba(245,240,232,0.3)'}}>
            Secured by Stripe · Gift valid 12 months · Redeemable at all Odogwu partners
          </p>
        </form>
      </div>
    </main>
  )
}
