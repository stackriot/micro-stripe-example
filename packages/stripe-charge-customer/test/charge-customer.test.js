import test from 'ava'

import app from './server'

// Mock http server
// to mock http request/response if needed
// Example: https://github.com/kevva/download/blob/master/test.js#L13-L23

// nock('http://localhost:3000')
//   .get('/')
//   .reply(200, {});

const request = require('supertest');

const fakePostData = {
  CardDetails: {
    node: {
      id: 'x',
      user: {
        stripeId: 'x'
      }
    },
  },
}

test('chargeCustomer', t => {
  // since supertest 2.0 it supports promises!!
  // Please see Ava recipe
  // https://github.com/avajs/ava/blob/master/docs/recipes/endpoint-testing.md
  try {
    let result = await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send(fakePostData)
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
    // more expectations here ...

    t.pass('Cool :)')
  } catch (err) {
    console.error(err)
    t.fail('fucked up')
  }
})
