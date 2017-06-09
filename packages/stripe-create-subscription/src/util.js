export function unpack(data) {
  const purchase = data.CardDetails.node
  const purchaseId = purchase.id
  const customerId = purchase.user.stripeId
  return {
    purchase,
    purchaseId,
    customerId
  }
}
