import { XMLParser, XMLBuilder } from './xml2js.js'
import mime from 'mime'
import JSZip from 'jszip'

export const base642dataurl = (filepath, base64) => {
  const contentType = mime.getType(filepath)
  return `data:${contentType};base64,${base64}`
}

export const office2json = async (buffer) => {
  let json = {}

  const zip = await JSZip.loadAsync(buffer)

  await Promise.all(
    Object.entries(zip.files).map(async ([filepath, file]) => {
      if (!file || file.dir) {
        return
      }

      let content

      if (filepath.endsWith('.xml') || filepath.endsWith('.rels')) {
        const xml = await file.async('string')
        const parser = new XMLParser()
        content = await parser.parse(xml)
      } else {
        const base64 = await file.async('base64')
        content = base642dataurl(filepath, base64)
      }

      json[filepath] = content
    }),
  )

  return json
}

export const json2office = async (json) => {
  let zip = new JSZip()

  await Promise.all(
    Object.entries(json).map(async ([filepath, content]) => {
      if (filepath.endsWith('.xml') || filepath.endsWith('.rels')) {
        const builder = new XMLBuilder()
        const xml = await builder.build(content)
        zip.file(filepath, xml)
      } else {
        const base64 = content.split(';')[1].slice(7)
        zip.file(filepath, base64, {
          base64: true,
        })
      }
    }),
  )

  const buffer = await zip.generateAsync({
    type: 'base64',
    compression: 'DEFLATE',
  })

  return buffer
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
