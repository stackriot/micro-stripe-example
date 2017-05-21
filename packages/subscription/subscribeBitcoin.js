var Stripe = require('stripe')(process.env.STRIPE_SECRET)
var stripe = stripeAsPromised(Stripe, Promise)
let payment = {}
let receiver = await stripe.bitcoinReceiver.createReceiver(payment)