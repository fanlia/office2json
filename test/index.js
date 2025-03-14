import { readFile, writeFile } from 'node:fs/promises'

import { office2json, json2office } from '../index.js'

const files = ['test.docx', 'test.xlsx', 'test.pptx']

for (const file of files) {
  const from = await readFile(file)

  const json = await office2json(from)

  await writeFile(`output-${file}.json`, JSON.stringify(json, null, 2))

  const to = await json2office(json)

  const buffer = Buffer.from(to, 'base64')

  await writeFile(`output-${file}`, buffer)
}
