import Link from 'next/link'

export const metadata = {
  title: 'Odogwu — Digital Gift Vouchers for African Celebrations',
  description: 'Spray digital gifts at weddings, birthdays and celebrations. Recipients redeem at African businesses across the UK.',
}

const S = {
  dark: '#0A0A0A',
  surface: '#141414',
  surface2: '#1E1E1E',
  gold: '#D4A017',
  goldLight: '#F0C040',
  text: '#F5F0E8',
  muted: 'rgba(245,240,232,0.55)',
  border: 'rgba(255,255,255,0.08)',
  borderGold: 'rgba(212,160,23,0.25)',
}

export default function Home() {
  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif'}}>

      {/* Header */}
      <header style={{borderBottom:`1px solid ${S.border}`,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',background:'rgba(10,10,10,0.95)',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(12px)'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,color:'#000',fontSize:18}}>O</div>
          <span style={{fontWeight:900,fontSize:20,letterSpacing:'-0.02em'}}>Odogwu</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <Link href="/merchants" style={{fontSize:13,color:S.muted,textDecoration:'none'}}>For Businesses</Link>
          <Link href="/send" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:800,borderRadius:10,padding:'9px 20px',fontSize:13,textDecoration:'none'}}>Send a Gift</Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{maxWidth:860,margin:'0 auto',padding:'72px 24px 48px',textAlign:'center'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(212,160,23,0.1)',border:`1px solid ${S.borderGold}`,borderRadius:40,padding:'7px 16px',fontSize:13,fontWeight:700,color:S.gold,marginBottom:28}}>
          🎊 Digital Money Spraying — Now in the UK
        </div>
        <h1 style={{fontSize:64,fontWeight:900,lineHeight:1.05,letterSpacing:'-0.04em',marginBottom:20}}>
          Spray gifts.<br/>
          <span style={{color:S.gold}}>Not cash.</span>
        </h1>
        <p style={{fontSize:18,color:S.muted,maxWidth:600,margin:'0 auto 32px',lineHeight:1.7}}>
          Send digital gift vouchers at weddings, birthdays and naming ceremonies.
          Recipients redeem at African restaurants, salons, and businesses across the UK.
        </p>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,flexWrap:'wrap'}}>
          <Link href="/send" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:800,borderRadius:12,padding:'14px 32px',fontSize:16,textDecoration:'none',boxShadow:`0 8px 24px rgba(212,160,23,0.3)`}}>
            Send a Gift →
          </Link>
          <Link href="/merchants" style={{padding:'14px 32px',fontSize:16,border:`1px solid ${S.border}`,borderRadius:12,color:S.text,textDecoration:'none'}}>
            List Your Business
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
        <h2 style={{fontSize:32,fontWeight:900,textAlign:'center',marginBottom:40}}>How it works</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:16}}>
          {[
            {step:'01',icon:'💳',title:'Buy a gift',desc:"Choose an amount, add a personal message, enter the recipient's WhatsApp number."},
            {step:'02',icon:'📲',title:'They receive it',desc:'Recipient gets a WhatsApp message with a beautiful gift reveal link and QR code.'},
            {step:'03',icon:'🛍',title:'Redeem anywhere',desc:'They spend it at any Odogwu partner business — restaurants, salons, events across the UK.'},
          ].map(item => (
            <div key={item.step} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:20,padding:24}}>
              <div style={{fontSize:11,fontWeight:700,color:S.gold,letterSpacing:'0.1em',marginBottom:12}}>{item.step}</div>
              <div style={{fontSize:32,marginBottom:12}}>{item.icon}</div>
              <div style={{fontWeight:700,fontSize:17,marginBottom:8}}>{item.title}</div>
              <div style={{fontSize:14,color:S.muted,lineHeight:1.7}}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Amounts */}
      <section style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
        <h2 style={{fontSize:32,fontWeight:900,textAlign:'center',marginBottom:8}}>Popular amounts</h2>
        <p style={{textAlign:'center',color:S.muted,marginBottom:32}}>Choose any amount from £5 to £500</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:10}}>
          {[10,20,50,100,200,500].map(a => (
            <Link key={a} href={`/send?amount=${a}`} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:12,padding:'16px 8px',textAlign:'center',fontWeight:800,fontSize:16,color:S.text,textDecoration:'none',display:'block'}}>
              £{a}
            </Link>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
        <h2 style={{fontSize:32,fontWeight:900,textAlign:'center',marginBottom:36}}>Perfect for every occasion</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12}}>
          {[
            {emoji:'💒',name:'Weddings'},{emoji:'🎂',name:'Birthdays'},
            {emoji:'👶',name:'Naming ceremonies'},{emoji:'🎓',name:'Graduations'},
            {emoji:'🙏',name:'Thanksgiving'},{emoji:'🎉',name:'Parties'},
            {emoji:'❤️',name:'Engagements'},{emoji:'🏠',name:'Housewarming'},
          ].map(o => (
            <div key={o.name} style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:16,padding:'20px 12px',textAlign:'center'}}>
              <div style={{fontSize:28,marginBottom:8}}>{o.emoji}</div>
              <div style={{fontSize:13,fontWeight:600}}>{o.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{maxWidth:700,margin:'0 auto',padding:'40px 24px 60px'}}>
        <div style={{background:`linear-gradient(135deg,rgba(212,160,23,0.08),rgba(27,77,46,0.08))`,border:`1px solid ${S.borderGold}`,borderRadius:24,padding:'56px 40px',textAlign:'center'}}>
          <h2 style={{fontSize:40,fontWeight:900,marginBottom:12}}>Ready to spray?</h2>
          <p style={{color:S.muted,marginBottom:28,fontSize:16}}>Join hundreds of Nigerians celebrating the right way.</p>
          <Link href="/send" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:800,borderRadius:12,padding:'16px 40px',fontSize:17,textDecoration:'none',display:'inline-block',boxShadow:`0 8px 24px rgba(212,160,23,0.35)`}}>
            Send Your First Gift →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:`1px solid ${S.border}`,padding:'20px 24px',textAlign:'center',fontSize:13,color:'rgba(245,240,232,0.3)'}}>
        <div style={{marginBottom:8}}>
          <Link href="/merchants" style={{color:'rgba(245,240,232,0.3)',margin:'0 12px',textDecoration:'none'}}>For Businesses</Link>
          <Link href="/terms" style={{color:'rgba(245,240,232,0.3)',margin:'0 12px',textDecoration:'none'}}>Terms</Link>
          <Link href="/privacy" style={{color:'rgba(245,240,232,0.3)',margin:'0 12px',textDecoration:'none'}}>Privacy</Link>
        </div>
        <div>© 2026 Odogwu · The 36th Company Ltd · London</div>
      </footer>
    </main>
  )
}
