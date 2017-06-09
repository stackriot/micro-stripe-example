import {
  parse,
  token,
} from './config'

export function unpackData(data) {
  const purchase = data.CardDetails.node
  const purchaseId = purchase.id
  const customerId = purchase.user.stripeId
  return {
    purchase,
    purchaseId,
    customerId
  }
}

export async function xtractData(req) {
  let {
    data,
    query
  } = await extract(req)

  if (token !== query.token) throw Error('Token mismatch')

  return unpackData(data)
}
