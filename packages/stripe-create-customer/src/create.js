const {
  send
} = require('micro')

export async function charge(user, stripeToken) {
  try {
    return await stripe.customers.create({
      email: user.email,
      description: user.name,
      source: stripeToken.stripeToken
    })
  } catch (err) {
    console.log(err)
    send(res, 400, {
      error: `Stripe customer with card details ${stripeToken.id} could not be created for user ${userId}`
    })
  }
}