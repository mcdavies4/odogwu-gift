export async function sendGiftEmail({
  senderName,
  senderEmail,
  recipientPhone,
  amount,
  message,
  giftCode,
  occasion,
}: {
  senderName: string
  senderEmail: string
  recipientPhone: string
  amount: number
  message?: string
  giftCode: string
  occasion: string
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  const giftUrl = `${appUrl}/gift/${giftCode}`
  const amountStr = `£${(amount / 100).toFixed(2)}`

  const occasionEmoji: Record<string, string> = {
    'Wedding': '💒', 'Birthday': '🎂', 'Naming Ceremony': '👶',
    'Graduation': '🎓', 'Thanksgiving': '🙏', 'Party': '🎉',
    'Engagement': '❤️', 'Housewarming': '🏠',
  }
  const emoji = occasionEmoji[occasion] || '🎊'

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:500px;margin:0 auto;padding:40px 24px">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px">
      <div style="display:inline-flex;align-items:center;gap:10px">
        <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#D4A017,#F0C040);display:inline-flex;align-items:center;justify-content:center;font-weight:900;color:#000;font-size:18px">O</div>
        <span style="font-weight:900;font-size:20px;color:#F5F0E8">Odogwu</span>
      </div>
    </div>

    <!-- Gift card -->
    <div style="background:linear-gradient(135deg,#1a1500,#141414,#001a0d);border:1px solid rgba(212,160,23,0.3);border-radius:24px;padding:36px 28px;text-align:center;margin-bottom:24px">
      <div style="font-size:48px;margin-bottom:12px">${emoji}</div>
      <div style="font-size:12px;font-weight:700;color:#D4A017;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px">${occasion} Gift</div>
      <div style="font-size:56px;font-weight:900;color:#F5F0E8;letter-spacing:-0.03em;margin:8px 0">${amountStr}</div>
      <div style="font-size:14px;color:rgba(245,240,232,0.55);margin-bottom:${message ? '16px' : '0'}">
        From <strong style="color:#F5F0E8">${senderName}</strong>
      </div>
      ${message ? `<div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:12px 16px;font-size:14px;font-style:italic;color:rgba(245,240,232,0.7)">"${message}"</div>` : ''}
    </div>

    <!-- Gift code box -->
    <div style="background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;text-align:center;margin-bottom:24px">
      <div style="font-size:13px;font-weight:700;color:#F5F0E8;margin-bottom:8px">Gift Code</div>
      <div style="font-size:28px;font-weight:900;font-family:monospace;letter-spacing:4px;color:#D4A017;margin-bottom:4px">${giftCode}</div>
      <div style="font-size:12px;color:rgba(245,240,232,0.4)">Show this code to any Odogwu partner merchant</div>
    </div>

    <!-- CTA button -->
    <div style="text-align:center;margin-bottom:24px">
      <a href="${giftUrl}" style="background:linear-gradient(135deg,#D4A017,#F0C040);color:#000;font-weight:900;border-radius:12px;padding:16px 40px;font-size:16px;text-decoration:none;display:inline-block">
        View Gift & Get QR Code →
      </a>
    </div>

    <!-- Instructions -->
    <div style="background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;margin-bottom:24px">
      <div style="font-weight:700;font-size:14px;color:#F5F0E8;margin-bottom:12px">How to redeem</div>
      <div style="font-size:13px;color:rgba(245,240,232,0.55);line-height:1.8">
        1. Visit any Odogwu partner business in the UK<br>
        2. Show this email or tap the button above for your QR code<br>
        3. The merchant scans and confirms — done!
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;font-size:12px;color:rgba(245,240,232,0.3)">
      <div style="margin-bottom:4px">Valid for 12 months · Powered by Odogwu</div>
      <div>© 2026 Odogwu · The 36th Company Ltd · London</div>
    </div>
  </div>
</body>
</html>`

  // Send to recipient if we have their email, otherwise send to sender to forward
  // For now we send to sender with forwarding instructions
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Odogwu Gifts <gifts@odogwu.online>',
      to: senderEmail,
      subject: `${emoji} Your Odogwu gift is ready to send — ${amountStr} for ${occasion}`,
      html,
      reply_to: 'support@odogwu.online',
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Email send failed')
  }

  return res.json()
}
