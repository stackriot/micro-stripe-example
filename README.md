# micro-stripe-example

Example usage of Graphcool mutation callbacks to implement a custom Stripe payment workflow. The full tutorial can be found [here](https://www.graph.cool/docs/tutorials/stripe-payments-with-mutation-callbacks-using-micro-and-now-soiyaquah7).

## Getting Started

### Setting up the data model

```idl
type User {
  id: ID!
  name: String!
  email: String!
  password: String!
  stripeId: String
  orders: [Purchase]
  cardDetails: CardDetails
}

type CardDetails {
  id: ID!
  cardToken: String!
  user: User
}

type Purchase {
  id: ID!
  description: String!
  amount: Int!
  isPaid: Boolean!
  user: User
}
```

Here is a checklist of necessary steps to end up with the correct schema:

* Add fields `name`, `stripeId` to `User`
* Create `CardDetails` model with string field `cardToken`
* Create `Purchase` model with the fields string `description`, int `amount`, boolean `isPaid`
* Create one-to-one relation `UserCardDetails`, `user` - `cardDetails`
* Create one-to-many relation `UserPurchases`, `user` - `purchases`

## Add email/password authentication

* Enable email/password provider

`/integrations/authentication/email` on your project, or click *integrations* in left menu

### Setting up permissions

* everyone can create a User node - meaning that everyone can sign up
* authenticated users can add card details to their own user node
* remove all permissions for `CardDetails` and `User.stripeId`

![Perm](https://github.com/tela5/micro-stripe-example/raw/master/screenshots/permission1.png "P1")

![Perm2](https://github.com/tela5/micro-stripe-example/raw/master/screenshots/permission2.png "P2")


### Using now for deployment

```sh
npm install -g now
```

Now add the needed secrets:

* `now secret add stripe-secret sk_test_XXXXXXXXXXXXXXXXXXXXXXXX`
* `now secret add gc-pat XXX`
* `now secret add create-secret XXX`
* `now secret add charge-secret XXX`
* `now secret add endpoint https://api.graph.cool/simple/v1/__PROJECT_ID__`

Deploy the two microservices:

* `now -e STRIPE_SECRET=@stripe-secret -e GC_PAT=@gc-pat -e ENDPOINT=@endpoint TOKEN=@create-secret create/`
* `now -e STRIPE_SECRET=@stripe-secret -e GC_PAT=@gc-pat -e ENDPOINT=@endpoint TOKEN=@charge-secret charge/`

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
