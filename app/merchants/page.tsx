import Link from 'next/link'

const S = {
  dark:'#0A0A0A', surface:'#141414', text:'#F5F0E8',
  muted:'rgba(245,240,232,0.55)', border:'rgba(255,255,255,0.08)',
  gold:'#D4A017', goldLight:'#F0C040', borderGold:'rgba(212,160,23,0.25)',
}
const input = {width:'100%',background:S.dark,border:`1px solid ${S.border}`,borderRadius:12,padding:'12px 16px',color:S.text,fontSize:14,fontFamily:'inherit',outline:'none',display:'block',boxSizing:'border-box' as const}

export default function MerchantsPage() {
  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'}}>
      <div style={{maxWidth:680,margin:'0 auto',padding:'40px 24px 60px'}}>
        <Link href="/" style={{color:S.gold,fontSize:13,textDecoration:'none',display:'block',marginBottom:32}}>← Back to Odogwu</Link>

        <h1 style={{fontSize:36,fontWeight:900,marginBottom:12}}>List your business on Odogwu</h1>
        <p style={{color:S.muted,fontSize:16,lineHeight:1.7,marginBottom:40}}>
          Reach thousands of Nigerian and African diaspora customers at weddings, birthdays
          and celebrations across the UK. They receive Odogwu gifts — you get new customers.
        </p>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:14,marginBottom:40}}>
          {[
            {icon:'👥',title:'New customers',desc:'Gift recipients are actively looking to spend at your business.'},
            {icon:'💷',title:'Guaranteed payment',desc:'Odogwu pays you for every redemption, within 7 days.'},
            {icon:'📍',title:'UK-wide',desc:'Any African business in the UK can join — restaurants, salons, fashion, events.'},
          ].map(item => (
            <div key={item.title} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:18,padding:20}}>
              <div style={{fontSize:28,marginBottom:12}}>{item.icon}</div>
              <div style={{fontWeight:700,marginBottom:6,fontSize:15}}>{item.title}</div>
              <div style={{fontSize:13,color:S.muted,lineHeight:1.6}}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{background:S.surface,border:`1px solid ${S.borderGold}`,borderRadius:20,padding:32}}>
          <h2 style={{fontSize:24,fontWeight:900,marginBottom:24}}>Apply to join</h2>
          <form style={{display:'flex',flexDirection:'column',gap:12}}
            action="mailto:merchants@odogwu.online" method="post">
            <input placeholder="Business name" required style={input}/>
            <input placeholder="Business category (restaurant, salon, etc.)" style={input}/>
            <input placeholder="City" style={input}/>
            <input type="email" placeholder="Email address" required style={input}/>
            <input placeholder="Phone number" style={input}/>
            <button type="submit" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,
              color:'#000',fontWeight:900,borderRadius:12,padding:'14px',fontSize:16,
              cursor:'pointer',border:'none',fontFamily:'inherit',marginTop:8}}>
              Apply Now →
            </button>
          </form>
          <p style={{fontSize:12,textAlign:'center',color:'rgba(245,240,232,0.3)',marginTop:14}}>
            12% commission on redemptions · Paid weekly · Free to join
          </p>
        </div>
      </div>
    </main>
  )
}
