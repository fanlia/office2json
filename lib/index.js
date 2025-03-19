import { xml2json, json2xml } from './xml.js'
import { zip, unzip } from './zip.js'
import { base642u8, u82base64 } from './base64.js'
import { str2u8, u82str } from './u8.js'
import mime from 'mime'

export const base642dataurl = (filepath, base64) => {
  const contentType = mime.getType(filepath)
  return `data:${contentType};base64,${base64}`
}

export const office2json = async (u8) => {
  let json = {}

  const files = await unzip(u8)

  await Promise.all(
    Object.entries(files).map(async ([filepath, file]) => {
      if (filepath.endsWith('/')) {
        return
      }

      let content

      if (filepath.endsWith('.xml') || filepath.endsWith('.rels')) {
        const xml = u82str(file)
        content = await xml2json(xml)
      } else {
        const base64 = u82base64(file)
        content = base642dataurl(filepath, base64)
      }

      json[filepath] = content
    }),
  )

  return json
}

export const json2office = async (json) => {
  let files = {}

  await Promise.all(
    Object.entries(json).map(async ([filepath, content]) => {
      if (filepath.endsWith('.xml') || filepath.endsWith('.rels')) {
        const xml = await json2xml(content)
        files[filepath] = str2u8(xml)
      } else {
        const base64 = content.split(';')[1].slice(7)
        files[filepath] = base642u8(base64)
      }
    }),
  )

  return zip(files)
}

const RE = /\{\{(.*?)\}\}/g

export const template = (json, data = {}) => {
  const json_string = JSON.stringify(json, (key, value) => {
    if (typeof value !== 'string' || !RE.test(value)) {
      return value
    }

    const new_value = value.replace(RE, (m, d) => {
      const part = data[d] || d
      return part
    })

    return new_value
  })
  const new_json = JSON.parse(json_string)
  return new_json
}
