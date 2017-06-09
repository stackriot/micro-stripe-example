import {
  parse,
  token,
} from './config'

export async function xtractData(req, opts = {}) {
  let {
    data,
    query
  } = await extract(req)
  let {
    unpack
  } = opts

  if (token !== query.token) throw Error('Token mismatch')

  return (typeof unpack === 'function') ? unpack(data) : data
}
