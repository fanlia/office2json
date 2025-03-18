import { office2json, json2office, template } from './lib/index.js'

export { office2json, json2office, template }

const _readFile = async (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(e.target.result)

    reader.onerror = reject

    reader.readAsArrayBuffer(file)
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

const base642blob = async (base64, name) => {
  const contentType = name.endsWith('.docx')
    ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    : name.endsWith('.pptx')
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : name.endsWith('xlsx')
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        : 'application/zip'

  return fetch(`data:${contentType};base64,${base64}`).then((res) => res.blob())
}

export const readFile = async (file) => {
  const from = await _readFile(file)

  const json = await office2json(from)

  return json
}

export const writeFile = async (name, json) => {
  const to = await json2office(json)

  const blob = await base642blob(to, name)

  await _writeFile(name, blob)
}
