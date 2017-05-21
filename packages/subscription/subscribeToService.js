var Promise = require('native-promise-only')
// var Stripe = window.Stripe
var Stripe = require('stripe')(process.env.STRIPE_SECRET)
var stripe = stripeAsPromised(Stripe, Promise)