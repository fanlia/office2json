import {
  office2json,
  json2office,
  template,
  json2xml,
  xml2json,
} from './lib/index.js'

export { office2json, json2office, template, json2xml, xml2json }

const _readFile = async (file, action) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(e.target.result)

    reader.onerror = reject

    reader[action](file)
  })

const _writeFile = async (name, blob) => {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  a.href = url
  a.download = name
  a.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
  }, 100)
}

const u82blob = async (u8, name) => {
  const type = name.endsWith('.docx')
    ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    : name.endsWith('.pptx')
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : name.endsWith('xlsx')
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/zip'

  return new Blob([u8], { type })
}

export const readFile = async (file) => {
  const from = await _readFile(file, 'readAsArrayBuffer')
  const u8 = new Uint8Array(from)
  const json = await office2json(u8)

  return json
}

export const readFileAsDataURL = async (file) => {
  const from = await _readFile(file, 'readAsDataURL')
  return from
}

export const writeFile = async (name, json) => {
  const to = await json2office(json)

  const blob = await u82blob(to, name)

  await _writeFile(name, blob)
}
