import test from 'ava'

import {
  Notifiable
} from '../notifiable'

let notifiable
test.before(t => {
  notifiable = new Notifiable('Notifiable', {
    logging: true
  })
})

test('Notifiable: subscribe observer', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.on('hello', observer)
  t.is(notifiable.observers[hello], observer)
})

test('Notifiable: subscribe to and publish event', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.on('hello', observer)
  notifiable.publish('hello', 'hi')
})

test('Notifiable: subscribe to and publish topic/event', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  let criteria = {
    topic: 'say',
    event: 'hello'
  }
  notifiable.on(criteria, observer)
  notifiable.publish(criteria, 'hi')
})

test('Notifiable: subscribe to and publish topic/event status', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  let criteria = {
    topic: 'say',
    event: 'hello',
    status: 'error'
  }
  notifiable.on(criteria, observer)
  notifiable.publish(criteria, 'hi')
})