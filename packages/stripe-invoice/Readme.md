# Micro service: Create stripe invoice as Pdf

Micro service to create and stream Invoice as PDF to customer

Based on [stripe-pdf-invoice](https://github.com/jonathanasquier/stripe-pdf-invoice)

See [working with Stripe invoices](https://stripe.com/docs/subscriptions/invoices)

## Pre-requisites

Set `STRIPE_SECRET` environment variable

## Configuration

Use `src/config.js` to configure invoice and stripe options to suit your needs...

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
