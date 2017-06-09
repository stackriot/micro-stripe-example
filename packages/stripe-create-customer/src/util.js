export function unpack(data) {
  const stripeToken = data.Purchase.node
  const user = stripeToken.stripeTokenToUser
  const userId = user.id
  return {
    stripeToken,
    user,
    userId
  }
}
