import {
  readFile as _readFile,
  writeFile as _writeFile,
} from 'node:fs/promises'

import {
  office2json,
  json2office,
  template,
  xml2json,
  json2xml,
  base642dataurl,
} from './lib/index.js'

export { office2json, json2office, template, xml2json, json2xml }

export const readFile = async (file) => {
  const from = await _readFile(file)
  const u8 = new Uint8Array(from)
  const json = await office2json(u8)

  return json
}

export const readFileAsDataURL = async (file) => {
  const buffer = await _readFile(file)
  const base64 = buffer.toString('base64')
  return base642dataurl(file, base64)
}

const base642buffer = async (base64) => Buffer.from(base64, 'base64')

export const writeFile = async (name, json) => {
  const to = await json2office(json)

  const buffer = await base642buffer(to)

  await _writeFile(name, buffer)
}
