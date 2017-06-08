import {
  Loggable
} from './loggable'

export class Notifiable extends Loggable {
  constructor(name, opts) {
    super(name, opts)
    this.topic = opts.topic || 'default'
    this.observers = {}
  }

  notify(event, data) {
    let criteria = this._criteria(event, data, )
    this.publish(criteria, data)
  }

  _criteria(event, data, opts = {}) {
    return Object.assign({}, {
      topic: this.topic,
      event,
      data
    }, opts)
  }

  notifySuccess(event, data) {
    let criteria = this._criteria(event, data, {
      status: 'success'
    })
    this.publish(criteria, data)
  }

  notifyFailure(event, data) {
    let criteria = this._criteria(event, data, {
      status: 'failure'
    })
    this.publish(criteria, data)
  }

  onCriteria(criteria, observer) {
    this.log('onCriteria', criteria, observer)
    let {
      topic,
      event,
      status
    } = criteria
    this.observers[topic] = this.observers[topic] || {}
    this.observers[topic][event] = this.observers[topic][event] || {}

    let eventObservers = this.observers[topic][event]
    if (status) {
      eventObservers[status] = this.observers[topic][event][status] || []
      eventObservers[status] = eventObservers[status].concat(observer)
    } else {
      eventObservers['observers'] = eventObservers['observers'] || []
      eventObservers['observers'] = eventObservers['observers'].concat(observer)
    }
    return this
  }

  on(eventName, observer) {
    this.log('on', eventName, observer)
    if (typeof eventName === 'object') {
      let criteria = eventName
      return this.onCriteria(criteria, observer)
    }
    let slot = this.observers[eventName] || []
    this.observers[eventName] = slot.concat(observer)
    return this
  }

  onAll(eventNames, observer) {
    if (Array.isArray(eventNames)) {
      eventNames.map(e => this.on(e, observer))
      return this
    } else {
      this.handleError('onAll: first argument must be a list (Array) of event names to observe', eventNames)
    }
  }

  publishCriteria(criteria, data) {
    this.log('publishCriteria', criteria, data)
    if (typeof criteria === 'string') {
      return this.publish(eventName, data)
    }
    let {
      topic,
      event,
      status
    } = criteria

    this.observers = this.observers || {}
    let observers = this.observers[topic] || {}
    observers = observers[event] || {}

    this.publishTo(observers['observers'], data, criteria)
    this.publishTo(observers[status], data, criteria)
  }

  publishTo(observers, data, criteria) {
    if (Array.isArray(observers)) {
      observers.map(observer => observer(data))
    } else {
      this.log('no observers registered for', criteria)
    }
    return this
  }

  publish(eventName, data) {
    this.log('publish', eventName, data)

    if (typeof eventName === 'object') {
      let criteria = this._criteria(eventName, data)
      this.publishCriteria(criteria, data)
    }

    this.observers = this.observers || {}
    let observers = this.observers[eventName] || []
    if (observers) {
      observers.map(observer => observer(data))
    } else {
      this.log('no observers registered for', eventName)
    }
    return this
  }
}