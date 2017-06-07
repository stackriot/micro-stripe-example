const {
  send
} = require('micro')

export async function charge(customerId, purchase) {
  try {
    return await stripe.charges.create({
      amount: purchase.amount,
      currency: 'usd',
      description: purchase.description,
      customer: customerId,
    })
  } catch (err) {
    console.log(err)
    send(res, 400, {
      error: `Customer ${customerId} could not be charged`
    })
  }
}