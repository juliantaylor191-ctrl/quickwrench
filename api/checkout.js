const Stripe = require('stripe')

module.exports = async (req, res) => {
  // Allow requests from your app
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    const { amount, service, customerEmail } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'affirm', 'klarna'],
      customer_email: customerEmail,
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'QuickWrench — ' + service },
          unit_amount: amount * 100
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: 'https://quickwrench-lid7.vercel.app/success.html',
      cancel_url: 'https://quickwrench-lid7.vercel.app/'
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}