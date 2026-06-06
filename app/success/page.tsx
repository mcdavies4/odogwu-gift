export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="text-8xl mb-6">🎊</div>
        <h1 className="text-4xl font-black mb-3">Gift sent!</h1>
        <p className="text-[rgba(245,240,232,0.55)] mb-8 leading-relaxed">
          Your gift is on its way via WhatsApp. The recipient will receive it shortly.
        </p>
        <a href="/send" className="btn-gold px-8 py-4 inline-block font-bold">
          Send Another Gift
        </a>
      </div>
    </main>
  )
}
