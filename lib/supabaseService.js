import { supabase } from './supabase.js'

export async function createCustomer(data) {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return customer
}

export async function createBooking(bookingData) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getBookedSlots(date) {
  const start = `${date}T00:00:00`
  const end = `${date}T23:59:59`
  const { data, error } = await supabase
    .from('bookings')
    .select('scheduled_at')
    .gte('scheduled_at', start)
    .lte('scheduled_at', end)
    .neq('status', 'cancelled')

  if (error) throw error
  return data.map((b) => b.scheduled_at)
}

export async function updateBookingStatus(id, status) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) throw error
  return data
}
