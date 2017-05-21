var stripe = require('../stripe')
let payment = {}
let receiver = await stripe.bitcoinReceiver.createReceiver(payment)
let poll = await stripe.bitcoinReceiver.pollReceiver(receiver.id)