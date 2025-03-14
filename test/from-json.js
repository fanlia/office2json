if (process.argv.length < 4) {
  console.log('node ./from-json.js ./xxx.json xxx.[docx|xlsx|pptx]')
  process.exit()
}

const from_path = process.argv[2]
const to_path = 'output-' + process.argv[3]

const { default: json } = await import(from_path, { with: { type: 'json' } })

import { writeFile } from 'node:fs/promises'

import { json2office } from '../index.js'

const to = await json2office(json)

const buffer = Buffer.from(to, 'base64')

await writeFile(to_path, buffer)

console.log('writed to file', to_path)
