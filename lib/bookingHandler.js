import { sendConfirmation } from './emails.js'
import { createCustomer, createBooking } from './supabaseService.js'

async function onConfirmClicked() {
  const customer = await createCustomer(...)
  const booking = await createBooking(...)

  // Send confirmation email — add this one line
  await sendConfirmation(customer, booking)

  console.log('Done! Booking saved and email sent.')
}