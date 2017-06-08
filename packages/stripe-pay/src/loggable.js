export class Loggable {
  constructor(name, opts = {}) {
    this.opts = opts
    this.io = opts.io || console
    this.logging = opts.logging
    this.name = name || opts.name
  }

  handleError(err, ...data) {
    this.error(err, ...data)
    if (this.notify) {
      this.notify('error', data)
    }
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

  label(lv) {
    lv = lv.toUpperCase()
    return `[${this.name}] ${lv}:`
  }

  warn(...msgs) {
    if (this.logging) {
      return this.io.log(this.label('warning'), ...msgs)
    }
  }

  log(...msgs) {
    if (this.logging) {
      return this.io.log(this.label('info'), ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      return this.io.error(this.label('error'), ...msgs)
    }
  }
}