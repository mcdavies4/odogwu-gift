const S = {dark:'#0A0A0A',surface:'#141414',text:'#F5F0E8',muted:'rgba(245,240,232,0.55)',gold:'#D4A017',goldLight:'#F0C040',border:'rgba(255,255,255,0.08)'}
export default function SuccessPage() {
  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <div style={{maxWidth:440}}>
        <div style={{fontSize:72,marginBottom:20}}>🎊</div>
        <h1 style={{fontSize:38,fontWeight:900,marginBottom:12}}>Payment confirmed!</h1>
        <p style={{color:S.muted,marginBottom:12,fontSize:16,lineHeight:1.7}}>
          Your gift has been created. Check your email — we have sent you the gift link and QR code to forward to the recipient.
        </p>
        <div style={{background:S.surface,border:`1px solid ${S.border}`,borderRadius:16,padding:20,marginBottom:28,textAlign:'left'}}>
          <div style={{fontWeight:700,fontSize:14,marginBottom:12}}>What to do next:</div>
          {[
            '📧 Check your email for the gift details',
            '📲 Forward the gift link to the recipient via WhatsApp, iMessage or any way you like',
            '🎉 They tap the link, see the gift card and QR code',
            '🛍 They redeem at any Odogwu partner business',
          ].map((step,i) => (
            <div key={i} style={{fontSize:14,color:S.muted,marginBottom:8,lineHeight:1.6}}>{step}</div>
          ))}
        </div>
        <a href="/send" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:900,borderRadius:12,padding:'14px 40px',fontSize:16,textDecoration:'none',display:'inline-block'}}>
          Send Another Gift
        </a>
      </div>
    </main>
  )
}
