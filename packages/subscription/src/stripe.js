import Promise from 'native-promise-only'
import stripeAsPromised from 'stripe-as-promised'
import stripe from 'stripe'

const Stripe = stripe(process.env.STRIPE_SECRET)
export default stripeAsPromised(stripe, Promise)