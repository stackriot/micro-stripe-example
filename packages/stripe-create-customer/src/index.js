import {
  graphQlServer,
  createMutation,
  extractData,
  parse,
  charge,
  endpoint,
  graphcoolToken,
  token,
  stripe,
  send,
  json
} from './config'


console.log('create customer')

module.exports = async(req, res) => {
  let {
    data,
    query
  } = await extract(req)

  if (token !== query.token) return

  // Add logs during development, but remember to remove them for production
  console.log('Stripe Token object');
  console.log(stripeToken);

  // TODO: don't create customer if stripe id already exists
  let {
    stripeToken,
    user,
    userId
  } = extractData(data)

  // first, create a new Stripe customer
  let customer = await create(user, stripeToken)

  // then update user with obtained Stripe customer id
  const mutation = createMutation(userId, customer)
  graphQlServer.mutate(mutation)
    .on('error', (e) => {
      send(res, 400, {
        error: `User ${userId} could not be updated`
      })
    }).on('response', (response) => {
      send(res, 200, {
        message: `User ${userId} was successfully registered at Stripe`
      })
    })
}