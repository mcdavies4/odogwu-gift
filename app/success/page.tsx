const S = {dark:'#0A0A0A',text:'#F5F0E8',muted:'rgba(245,240,232,0.55)',gold:'#D4A017',goldLight:'#F0C040'}
export default function SuccessPage() {
  return (
    <main style={{minHeight:'100vh',background:S.dark,color:S.text,fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',display:'flex',alignItems:'center',justifyContent:'center',padding:24,textAlign:'center'}}>
      <div style={{maxWidth:400}}>
        <div style={{fontSize:80,marginBottom:20}}>🎊</div>
        <h1 style={{fontSize:40,fontWeight:900,marginBottom:12}}>Gift sent!</h1>
        <p style={{color:S.muted,marginBottom:32,fontSize:16,lineHeight:1.7}}>Your gift is on its way via WhatsApp. The recipient will receive it shortly.</p>
        <a href="/send" style={{background:`linear-gradient(135deg,${S.gold},${S.goldLight})`,color:'#000',fontWeight:900,borderRadius:12,padding:'14px 40px',fontSize:16,textDecoration:'none',display:'inline-block'}}>
          Send Another Gift
        </a>
      </div>
    </main>
  )
}
