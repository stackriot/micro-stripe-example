# micro-stripe-example

Example usage of [Graphcool](https://www.graph.cool) mutation callbacks to implement a custom Stripe payment workflow.

The full tutorial can be found [here](https://www.graph.cool/docs/tutorials/stripe-payments-with-mutation-callbacks-using-micro-and-now-soiyaquah7).

A more advanced Stripe tutorial example can be found [here](https://medium.com/consciousapps/integrating-stripe-with-react-graphql-and-apollo-client-e09fdc9e5b95) which build on top of this one :)

We also add [Auth0](https://auth0.com) integration to act as a template a full Promotion/Sales site experience.

[graph.cool Auth0 tutorial](https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj/)

The project is structured and packaged as a [lerna](https://github.com/lerna/lerna) project

## Getting Started

Install dependencies for each project

`$ lerna bootstrap`

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

### Create test account on stripe

Retrieve test account secrets, something like:

```bash
TEST_STRIPE_SECRET_KEY=sk_test_XqWFki7E63nnvexW7Aucxxxx
TEST_STRIPE_PUBLISHABLE_KEY=pk_test_lG8swclqDn3BoODaNWotxxxx
```

### Using now for deployment

Install [now](https://zeit.co/now) by [zeit.co](https://zeit.co) globally:

```sh
npm install -g now
```

## Adding secrets

Make sure now is properly installed `now -v`

**trouble shooting**

If `now` doesn't return the version (`5.3` or higher, if not maybe `now` is used for something else in your environment!)

_In my case, I had an alias `now` (defined in my `~/.bash_profile`) to return the current time, so I had to remove it_

### Stripe secret

`now secret add sk_test_XXXXXXXXXXXXXXXXXXXXXXXX`

Example:

```bash
$ now secret add stripe-secret sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
> Enter your email: xxx@gmail.com
> Please follow the link sent to xxxx@gmail.com to log in.
> Verify that the provided security code in the email matches Snowy Crested Penguin.

⠼ Waiting for confirmtion...
✔ Confirmed email address!
```

### GC Auth token

In GraphCool console, create an [authentication-token](https://www.graph.cool/docs/reference/auth/authentication-tokens-eip7ahqu5o/)

- Go to Project -> Settings -> Authentication (`/settings/authentication`)
- Create a new Auth token called `gc-pat`

Should be a very long token string like this:

`aaaaaaaeyJpYXQiOjE0OTQ5NTAzNjQsImNsaWVudElkI4444444InByb2plY3RJZxxxxxxxxAwMTYwdWZhdHV6bHUifQ.lqvwhD1-gsd5orZNfwwGB-LdMAHjpyWWxq5A7_sbcbk`


```bash
$ now secret add gc-pat eyJ0exxxxxxxxx

> Success! Secret gc-pat (xxxxDymjktZGwWHiBQj5vc) added (xxxx@gmail.com)
```

### Add GC endpoint secret

In GraphCool browser console, click `Endpoints` (bottom left)

Endpoint should be something like: `https://api.graph.cool/simple/v1/ont28601k6x1qe8cj2rlxxxx`

```bash
$ now secret add endpoint https://api.graph.cool/simple/v1/cj2rloi1xxxxxx
> Success! Secret endpoint (xxxxFrI5J0LrkTaiOURZwC) added (xxxx@gmail.com)
```

### Add custom secrets

Add custom secrets for `create-secret` and `charge-secret` such as:

- `xyz123` and `abc4567` (only for testing)

`$ now secret add create-secret xyz123`
`$ now secret add charge-secret abc4567`

Note: `create-secret` and `charge-secret` are used to create a secret URL so not everyone can just invoke your endpointin URL. This can be replaced instead by using an Auth header instead ([@nilan](https://graphcool.slack.com/messages/@nilan/))

... and so on ...

### Deploy the microservices

The following commands are to be issued literally "as is".
Note: The `@xxx` reference the registered secrets.

Each secret must be refereced in the form `-e ENV_VARIABLE_NAME=@secret-ref`
The last argument is the path to the service to be deployed

#### Deploy create service

```bash
$ now -e STRIPE_SECRET=@stripe-secret -e GC_PAT=@gc-pat -e ENDPOINT=@endpoint -e TOKEN=@create-secret -e LOG=@log packages/create/

Deploying ~/repos/micro-stripe-example/packages/create under xxxx@gmail.com
> Using Node.js 7.10.0 (default)
> Ready! https://stripe-create-customer-example-xxxx.now.sh (copied to clipboard) [4s]
> You (xxx@gmail.com) are on the OSS plan. Your code will be made public.
> Upload [====================] 100% 0.0s
> Sync complete (2.01kB) [2m]
> Initializing…
> Building
> ▲ npm install
> ⧗ Installing:
> ...
> ✓ Installed 163 modules [6s]
> ▲ npm start
> Deployment complete!
```

Notice the `https://stripe-create-customer-example-xxxx.now.sh` (copied to clipboard)

#### Deploy charge service

Notice all the variables are with capital letters and underscores (_), such as `STRIPE_SECRET` whereas serets are lowercase with dashes (-). Please stick to this convention to minimize chance of errors.

```bash
$ now -e STRIPE_SECRET=@stripe-secret -e GC_PAT=@gc-pat -e ENDPOINT=@endpoint -e TOKEN=@charge-secret -e LOG=@log packages/charge/

> Deploying ~/repos/micro-stripe-example/packages/charge under xxxx@gmail.com
> Using Node.js 7.10.0 (default)
> Ready! https://stripe-charge-customer-example-yyyyyy.now.sh (copied to clipboard)
> ....
> Deployment complete!
```

Again: `https://stripe-charge-customer-example-yyyyyy.now.sh` (copied to clipboard)

## Add Server Side Subscriptions (SSS)

In Graph Cool browser console

- Click `Mutation callbacks`
- Click `Functions` page
- Select `New function` and `Server-Side Subscriptions`

### Create SSS functions

When new card details are created, create corresponding Stripe customer

We add a new SSS with the trigger `CardDetails is created`. This SSS creates a new Stripe customer whenever new card details are created

- See [Server Side Subscriptions](https://www.graph.cool/docs/reference/functions/server-side-subscriptions-ahlohd8ohn/)

- Select `CardDetails` as the trigger type

Now filter only on `CREATED` mutations...

```text
subscription {
  CardDetails(filter: {
    mutation_in: [CREATED]
  }) {
    node {
      id
      cardToken
      user {
        id
        email
        name
      }
    }
  }
}
```

### Test SSS

You can test the SSS you created directly in the GraphCool console:

`https://console.graph.cool/YOUR-APP/functions/create`

As you can see in the response, the HTTP data (JSON) received is of the form:

`data.<type>.node` such as `data.Post.node` for a `Post` mutation.

After you have confirmed that the SSS works as you would expect, take the service url, add the value for the `create-secret` secret as a query parameter and paste it to the SSS url. For example:

`https://yourappname-create-customer-xxxx.now.sh?token=XXX`

Please check [subscribing-to-created-nodes](https://www.graph.cool/docs/reference/simple-api/subscribing-to-created-nodes-oe8oqu8eis/)

In the `create` service code, we reference the mutated node as: `data.CardDetails.node`

```js
module.exports = async(req, res) => {
  const data = await json(req)

  // extract node data from incoming node
  const stripeToken = data.CardDetails.node
  const user = stripeToken.stripeTokenToUser
  const userId = user.id
  // Add logs during development, but remember to remove them for production
  console.log('Stripe Token object');
  console.log(stripeToken);

  // TODO: don't create customer if stripe id already exists

  // first, create a new Stripe customer
  stripe.customers.create({
    // ...
  }, (err, customer) => {
    // then update user with obtained Stripe customer id
    const updateUser = `mutation {
      updateUser(id: "${userId}", stripeId: "${customer.id}") {
        id
      }
    }`
    request.post({
      // ...
      body: JSON.stringify({query: updateUser}),
      // ...
})
```

### Charge customer service

We create a new subscription for when a purchase is created, linking it to the charge customer now service (endpoint)

```text
subscription {
  Purchase(filter: {
    mutation_in: [CREATED]
  }) {
  node {
    id
    user {
      stripeId
    }
    amount
    description
    isPaid
  }
}
```

Now take the obtained url, add the `charge-secret` as a query parameter and paste it to the SSS url. For example:

`https://yourappname-charge-customer-xxxx.now.sh?token=XXX`

In the `charge` service code we reference the incoming mutated node: `data.Purchase.node`

```js
module.exports = async(req, res) => {
  const data = await json(req)
    // ...

  // extract node data from incoming node
  const purchase = data.Purchase.node
  const purchaseId = purchase.id
  const customerId = purchase.user.stripeId

  // Add logs during development, but remove for production
  console.log('Purchase Object');
  console.log(purchase);

  if (purchase.isPaid) {
    // ...
  }
```

### Testing mutations

First [Create a test user](https://www.graph.cool/docs/tutorials/stripe-payments-with-mutation-callbacks-using-micro-and-now-soiyaquah7/#create-a-user)

Save the user `id` for use later.

### Create Card details

Now create a new `CardDetails` node. First [Create a stripe card token](https://stripe.com/docs#try-now) by clicking on the blue `submit` button to the on the card to the right on the screen. The `userId` should reference the test user you just created.

```text
mutation {
  createCardDetails(
    cardToken: "tok_19cIRbD7TaYA8JWHv5WIEOiL"
    userId: "cixyw53tg6i8a0173kx2nrwto"
  ) {
    id
  }
}
```

Notice that the response should have the form: `data.CardDetails.node`

### Create a purchase

```text
mutation {
  createPurchase(
    amount: 50000,
    description: "A new laptop",
    userId: "cixyw53tg6i8a0173kx2nrwto"
  ) {
    isPaid
  }
}
```

### Bonus: Keys file

You can add a special key file to keep track of your secrets as you go.
Then you can experiment with loading secrets into `now` using the `load` tool of this project. Note that some keys require user input.

You can add secrets in a special `now/secrets.json` file which is included in the `.gitignore` so that is is not shared.

```js
{
  "gc-pat": "aaaaaaaeyJpYXQiOjE0OTQ5NTAzNjQsImNsaWVudElkI4444444InByb2plY3RJZxxxxxxxxAwMTYwdWZhdHV6bHUifQ.lqvwhD1-gsd5orZNfwwGB-LdMAHjpyWWxq5A7_sbcbk",
  "create-secret": "xyc",
  "charge-secret": "123",
  "log": "XXX",
  "endpoint": "https://api.graph.cool/simple/v1/cj2rloi1xxxxxx"
}
```

To add the keys: `npm run keys` or `node ./now/load.js`

## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
