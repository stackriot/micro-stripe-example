# Micro service: Create subscription

Micro service to create a Stripe subscription:

[Stripe subscriptions quickstart](https://stripe.com/docs/subscriptions/quickstart)

## Design

Uses  `@tecla5/stripe-pay` module

## TODO

- use apollo or lokka client via [apollo-auth-conn]() and [lokka-auth-conn]()
- use async/await promise based GraphQL queries

```json
"@tecla5/apollo-auth-conn": "^0.1.0",
"@tecla5/lokka-auth-conn": "^0.1.0",
```

## License

MIT
