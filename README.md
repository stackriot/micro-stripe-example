# micro-stripe-example

Example usage of Graphcool mutation callbacks to implement a custom Stripe payment workflow.

The full tutorial can be found [here](https://www.graph.cool/docs/tutorials/stripe-payments-with-mutation-callbacks-using-micro-and-now-soiyaquah7).

We also add [Auth0]() integration for a full Promotion/Sales site experience.

[graph.cool Auth0 tutorial](https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj/)

## Getting Started

### Auth0 config

Create new [Auth0](https://auth0.com) client.

To configure Auth0, go to their [website](https://auth0.com) and log into your Auth0 account.

[Create a new Client](https://manage.auth0.com/#/clients)

Choose *Single Page Application*.

Copy your Auth0 Client stats:

- `Domain`
- `Client ID`
- `Client secret`

From the *Settings* tab of the new client.

Add `localhost:3000 to the allowed callback URLs as well.

Hit `Save Changes` at the bottom!

### Configure Auth0 with Graphcool

In the graphcool browser console.

- Create a new project or open existing one
- Go to `Data` in right menu
- Click `User` type (System)
- Select `Configure Auth Providers`
- Enable `Auth0`

Enter the Auth0 client stats:

- `Domain`
- `Client ID`
- `Client secret`

### Setting up the Data model

The full Schema should look as follows

```idl
type CardDetails implements Node {
  cardToken: String!
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
  user: User @relation(name: "CardDetailsOnUser")
}

type Purchase implements Node {
  amount: Float!
  createdAt: DateTime!
  description: String!
  id: ID! @isUnique
  isPaid: Boolean! @defaultValue(value: false)
  updatedAt: DateTime!
  user: User @relation(name: "PurchaseOnUser")
}

type User implements Node {
  auth0UserId: String @isUnique
  cardDetails: CardDetails @relation(name: "CardDetailsOnUser")
  createdAt: DateTime!
  email: String @isUnique
  id: ID! @isUnique
  name: String!
  password: String
  purchases: [Purchase!]! @relation(name: "PurchaseOnUser")
  stripeId: String
  updatedAt: DateTime!
}
```

Here is a checklist of necessary steps to end up with the correct schema:

* Add fields `name`, `stripeId` to `User`
* Ensure `stripeId` is optional (advanced)
* Create `CardDetails` model with string field `cardToken`
* Create `Purchase` model with the fields string `description`, int `amount`, boolean `isPaid`
* ensure `isPaid` is default `false` (advanced)
* Create one-to-one relation `UserCardDetails`, `user` - `cardDetails`
* Create one-to-many relation `UserPurchases`, `user` - `purchases`

## Add email/password authentication

Enable email/password provider

- Click `Integrations`
- Select `Email-Password Auth`

### Setting up permissions

See [permission-setup](https://www.graph.cool/docs/tutorials/stripe-payments-with-mutation-callbacks-using-micro-and-now-soiyaquah7/#permission-setup)

* Everyone can create a User node - meaning that everyone can sign up

Only *authenticated users* can *add* (ie. create) card details to their own user

<img src="https://github.com/tecla5/micro-stripe-example/raw/master/screenshots/card-details-user-permission.png" alt="Authenticated CardDetails-User permissions" width="50%" height="50%">

Remove all permissions for `CardDetails`

<img src="https://github.com/tecla5/micro-stripe-example/raw/master/screenshots/card-details-permission.png" alt="CardDetails permissions" width="50%" height="50%">

Remove permission for `User.stripeId`

<img src="https://github.com/tecla5/micro-stripe-example/raw/master/screenshots/user-stripeid-permission.png" alt="User.stripeId permissions" width="50%" height="50%">

### Permission Queries

Use a permission query on the `createCardDetails` mutation like this:

```idl
{
  allUsers(filter: {
    AND: [{
      id: $userId
    }, {
      id: $new_userId
    }]
  }) {
    id
  }
}
{
  allUsers(filter: {
    AND: [{
      id: $userId
    }, {
      id: $new_userId
    }]
  }) {
    id
  }
```

Note: Use a permission query on the `createPurchases` mutation and make sure to unselect the `isPaid` field.

This is the query:

```idl
{
  allUsers(filter: {
    AND: [{
      id: $userId
    }, {
      id: $new_userId
    }]
  }) {
    id
  }
}
```

The default value false for `isPaid` and the missing permission to set `isPaid` when creating a new purchase guarantees that new purchases are automatically unpaid - ensuring that our payment workflow kicks in.

## Create test account on stripe

Retrieve test account secrets

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
