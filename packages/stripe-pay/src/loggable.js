export class Loggable {
  constructor(name, opts = {}) {
    this.opts = opts
    this.io = opts.io || console
    this.logging = opts.logging
    this.observers = {}
    this.name = name || opts.name
  }

  notify(method, data) {
    this.publish({
      topic: 'orders',
      method,
      data
    })
  }

  on(eventName, observer) {
    this.log('on', eventName, observer)
    let slot = this.observers[eventName] || []
    this.observers[eventName] = slot.concat(observer)
    return this
  }

  publish(eventName, args) {
    this.log('publish', eventName, args)
    this.observers = this.observers || {}
    let observers = this.observers[eventName] || []
    if (observers) {
      observers.map(observer => observer(args))
    } else {
      this.log('no observers registered for', eventName)
    }
    return this
  }

  handleError(err, ...data) {
    this.error(err, ...data)
    throw err
  }

  enableLog() {
    this.logging = true
    return this
  }

  disableLog() {
    this.logging = false
    return this
  }

  warn(...msgs) {
    if (this.logging) {
      this.io.log('WARNING', this.name, ...msgs)
    }
  }

  log(...msgs) {
    if (this.logging) {
      this.io.log(this.name, ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      this.io.error(this.name, ...msgs)
    }
  }
}