// JSON schema helpers
// See https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343

export function str(min, max, opts = {}) {
  return Object.assign({}, opts, {
    type: 'string',
    minLength: min,
    maxLength: max
  })
}

export const percent = num(0, 100)

export const $id = str(10, 30)

export const phone = str(8, 15)

export const country = str(2, 3)

export const url = {
  type: 'string',
  format: 'uri'
}

export const name = str(2, 30)

export const description = str(2, 255)

export const currency = str(2, 3)

export const date = {
  type: 'string',
  format: 'date-time'
}

export const email = {
  type: 'string',
  format: 'email'
}

export const money = num(-9999, 9999)
export const $money = num(0, 9999)

export function num(min, max) {
  return {
    type: 'integer',
    minimum: min,
    maximum: max
  }
}

export function obj() {
  return {
    type: 'object'
  }
}

export function list() {
  return {
    type: 'array'
  }
}


export const bool = {
  type: 'boolean'
}
