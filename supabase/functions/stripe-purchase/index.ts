
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    )

    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user } } = await supabaseClient.auth.getUser(token)

    if (!user) {
      throw new Error('Unauthorized')
    }

    const { action, ...payload } = await req.json()
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    switch (action) {
      case 'create_payment_intent':
        return await createPaymentIntent(stripe, supabaseClient, user, payload)
      case 'create_invoice':
        return await createInvoice(stripe, supabaseClient, user, payload)
      case 'confirm_payment':
        return await confirmPayment(supabaseClient, payload)
      default:
        throw new Error('Invalid action')
    }

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function createPaymentIntent(stripe: Stripe, supabase: any, user: any, payload: any) {
  const { packageId, schoolId, appId } = payload
  
  // Get package details (you might want to store these in database)
  const packages = {
    1: { credits: 1000, price: 25 },
    2: { credits: 5000, price: 115 },
    3: { credits: 10000, price: 200 },
    4: { credits: 25000, price: 450 }
  }
  
  const selectedPackage = packages[packageId as keyof typeof packages]
  if (!selectedPackage) {
    throw new Error('Invalid package')
  }

  // Create credit purchase record
  const { data: purchase, error: purchaseError } = await supabase
    .from('credit_purchases')
    .insert({
      user_id: user.id,
      school_id: schoolId,
      app_id: appId,
      amount: selectedPackage.price,
      credits_purchased: selectedPackage.credits,
      payment_method: 'card',
      status: 'pending'
    })
    .select()
    .single()

  if (purchaseError) throw purchaseError

  // Create Stripe payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: selectedPackage.price * 100, // Stripe uses cents
    currency: 'gbp',
    metadata: {
      purchase_id: purchase.id,
      school_id: schoolId,
      app_id: appId,
      credits: selectedPackage.credits.toString()
    }
  })

  // Update purchase with Stripe payment intent ID
  await supabase
    .from('credit_purchases')
    .update({ stripe_payment_intent_id: paymentIntent.id })
    .eq('id', purchase.id)

  return new Response(
    JSON.stringify({ client_secret: paymentIntent.client_secret, purchase_id: purchase.id }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function createInvoice(stripe: Stripe, supabase: any, user: any, payload: any) {
  const { packageId, schoolId, appId } = payload
  
  const packages = {
    1: { credits: 1000, price: 25 },
    2: { credits: 5000, price: 115 },
    3: { credits: 10000, price: 200 },
    4: { credits: 25000, price: 450 }
  }
  
  const selectedPackage = packages[packageId as keyof typeof packages]
  if (!selectedPackage) {
    throw new Error('Invalid package')
  }

  // Get school details
  const { data: school } = await supabase
    .from('schools')
    .select('name, address_street, address_town, address_postcode')
    .eq('id', schoolId)
    .single()

  // Create credit purchase record
  const { data: purchase, error: purchaseError } = await supabase
    .from('credit_purchases')
    .insert({
      user_id: user.id,
      school_id: schoolId,
      app_id: appId,
      amount: selectedPackage.price,
      credits_purchased: selectedPackage.credits,
      payment_method: 'invoice',
      status: 'pending'
    })
    .select()
    .single()

  if (purchaseError) throw purchaseError

  // Generate invoice number
  const { data: invoiceNumberResult } = await supabase.rpc('generate_invoice_number')
  const invoiceNumber = invoiceNumberResult

  // Create invoice record
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 30) // 30 days payment terms

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      credit_purchase_id: purchase.id,
      invoice_number: invoiceNumber,
      school_id: schoolId,
      amount: selectedPackage.price,
      due_date: dueDate.toISOString().split('T')[0],
      status: 'draft'
    })
    .select()
    .single()

  if (invoiceError) throw invoiceError

  return new Response(
    JSON.stringify({ 
      invoice_id: invoice.id, 
      invoice_number: invoiceNumber,
      purchase_id: purchase.id 
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

async function confirmPayment(supabase: any, payload: any) {
  const { purchaseId, invoiceId, adminConfirmation = false } = payload

  if (adminConfirmation) {
    // Admin manually confirming invoice payment
    const { data: purchase } = await supabase
      .from('credit_purchases')
      .select('*, invoices(*)')
      .eq('id', purchaseId)
      .single()

    if (!purchase) throw new Error('Purchase not found')

    // Update purchase status
    await supabase
      .from('credit_purchases')
      .update({ 
        status: 'paid', 
        paid_at: new Date().toISOString() 
      })
      .eq('id', purchaseId)

    // Update invoice status
    if (invoiceId) {
      await supabase
        .from('invoices')
        .update({ 
          status: 'paid', 
          paid_at: new Date().toISOString() 
        })
        .eq('id', invoiceId)
    }

    // Add credits to balance
    await supabase.rpc('update_credit_balance', {
      p_school_id: purchase.school_id,
      p_app_id: purchase.app_id,
      p_credits_to_add: purchase.credits_purchased
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Payment confirmed and credits added' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  throw new Error('Invalid confirmation method')
}
