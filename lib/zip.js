import { zip as _zip, unzip as _unzip } from 'fflate'

const promisify = (fn, ...args) =>
  new Promise((resolve, reject) =>
    fn(...args, (err, result) => (err ? reject(err) : resolve(result))),
  )

export const unzip = async (u8) => {
  return promisify(_unzip, u8)
}

export const zip = async (files) => {
  return promisify(_zip, files)
}
