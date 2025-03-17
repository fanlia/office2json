import { Parser as XMLParser, Builder as XMLBuilder } from 'xml2js'

import JSZip from 'jszip'

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
        content = await parser.parseStringPromise(xml)
      } else {
        content = await file.async('base64')
      }

      json[filepath] = content
    }),
  )

  return json
}

export const json2office = async (json) => {
  let zip = new JSZip()

  Object.entries(json).map(([filepath, content]) => {
    if (filepath.endsWith('.xml') || filepath.endsWith('.rels')) {
      const builder = new XMLBuilder({
        renderOpts: {
          pretty: false,
        },
      })
      const xml = builder.buildObject(content)
      zip.file(filepath, xml)
    } else {
      zip.file(filepath, content, {
        base64: true,
      })
    }
  })

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
