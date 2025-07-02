
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  try {
    const body = await req.text()
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''
    )

    console.log('Webhook event:', event.type)

    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent)
        break
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error', { status: 400 })
  }
})

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id)
  
  // Find the purchase record
  const { data: purchase, error: findError } = await supabase
    .from('credit_purchases')
    .select('*')
    .eq('stripe_payment_intent_id', paymentIntent.id)
    .single()

  if (findError || !purchase) {
    console.error('Purchase not found:', findError)
    return
  }

  // Update purchase status
  const { error: updateError } = await supabase
    .from('credit_purchases')
    .update({ 
      status: 'paid', 
      paid_at: new Date().toISOString() 
    })
    .eq('id', purchase.id)

  if (updateError) {
    console.error('Error updating purchase:', updateError)
    return
  }

  // Add credits to balance
  const { error: creditError } = await supabase.rpc('update_credit_balance', {
    p_school_id: purchase.school_id,
    p_app_id: purchase.app_id,
    p_credits_to_add: purchase.credits_purchased
  })

  if (creditError) {
    console.error('Error updating credits:', creditError)
    return
  }

  console.log(`Added ${purchase.credits_purchased} credits to school ${purchase.school_id}`)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id)
  
  // Update purchase status to failed
  const { error } = await supabase
    .from('credit_purchases')
    .update({ status: 'failed' })
    .eq('stripe_payment_intent_id', paymentIntent.id)

  if (error) {
    console.error('Error updating failed payment:', error)
  }
}
