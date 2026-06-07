export async function sendGiftWhatsApp({
  recipientPhone,
  senderName,
  amount,
  message,
  giftCode,
  occasion,
}: {
  recipientPhone: string
  senderName: string
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

  const body = [
    `${emoji} *You've received an Odogwu gift!*`,
    ``,
    `*${senderName}* just sprayed you *${amountStr}*${occasion ? ` for your ${occasion}` : ''}.`,
    message ? `\n"${message}"\n` : '',
    `Tap the link below to reveal your gift and get your QR code.`,
    `You can spend it at African restaurants, salons, and businesses across the UK.`,
    ``,
    `👉 *${giftUrl}*`,
    ``,
    `_Valid for 12 months · Powered by Odogwu · odogwu.online_`,
  ].filter(Boolean).join('\n')

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken  = process.env.TWILIO_AUTH_TOKEN
  const from       = process.env.TWILIO_WHATSAPP_FROM

  const credentials = btoa(`${accountSid}:${authToken}`)

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: from!,
        To: `whatsapp:${recipientPhone}`,
        Body: body,
      }).toString(),
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'WhatsApp send failed')
  }

  return res.json()
}
