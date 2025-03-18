import {
  readFile as _readFile,
  writeFile as _writeFile,
} from 'node:fs/promises'

import { office2json, json2office, template } from './lib/index.js'

export { office2json, json2office, template }

export const readFile = async (file) => {
  const from = await _readFile(file)

  const json = await office2json(from)

  return json
}

const base642buffer = async (base64) => Buffer.from(base64, 'base64')

export const writeFile = async (name, json) => {
  const to = await json2office(json)

  const buffer = await base642buffer(to)

  await _writeFile(name, buffer)
}
