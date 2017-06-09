# Micro service: Create customer

Micro service to create a customer via [stripe api](https://stripe.com/docs/api#charges)

## Design

Uses `@tecla5/stripe-pay` module

## TODO

- use apollo or lokka client via [apollo-auth-conn]() and [lokka-auth-conn]()
- use async/await promise based GraphQL queries

```json
"@tecla5/apollo-auth-conn": "^0.1.0",
"@tecla5/lokka-auth-conn": "^0.1.0",
```

## Testing

Using [Ava endpoint testing recipe](https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md)

```js
test('signup:Success', async t => {
  t.plan(2)

  const res = await request(makeApp())
    .post('/signup')
    .send({email: 'ava@rocks.com', password: '123123'})

  t.is(res.status, 200)
  t.is(res.body.email, 'ava@rocks.com')
});
```

## License

MIT
