const { Resend } = require('resend')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, service, date, time, bookingId, total } = req.body

    await resend.emails.send({
      from: 'QuickWrench <bookings@quickwrench.com>',
      to: email,
      subject: 'Your QuickWrench booking is confirmed!',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
        <div style="background:#1a1a1a;padding:24px;border-radius:12px 12px 0 0">
        <h1 style="color:#fff;margin:0;font-size:20px">🔧 QuickWrench</h1></div>
        <div style="background:#f9f9f9;padding:24px;border-radius:0 0 12px 12px">
        <h2 style="margin:0 0 16px">Hi ${name}, you're booked!</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date} at ${time}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Booking #:</strong> ${bookingId}</p>
        <p style="margin-top:16px;color:#666">Our technician will contact you 30 minutes before arrival.</p>
        </div></div>
      `
    })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}