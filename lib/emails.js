import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendConfirmation(customer, booking) {
  await resend.emails.send({
    from: 'QuickWrench <no-reply@quickwrench.com>',
    to: customer.email,
    subject: `Booking confirmed — ${booking.service}`,
    html: `<p>Hi ${customer.name}, your booking for <strong>${booking.service}</strong> on ${booking.scheduled_at} is confirmed. Booking #${booking.id}.</p>`,
  })
}
