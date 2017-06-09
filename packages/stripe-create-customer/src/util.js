import {
  parse,
  token,
} from './config'

export function unpackData(data) {
  const stripeToken = data.Purchase.node
  const user = stripeToken.stripeTokenToUser
  const userId = user.id
  return {
    stripeToken,
    user,
    userId
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
