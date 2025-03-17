if (process.argv.length < 4) {
  console.log("node ./template-json.js ./xxx.[docx|xlsx|pptx] 'json_string'")
  process.exit()
}

const from_path = process.argv[2]
const to_path = 'output-template-' + from_path
const data = JSON.parse(process.argv[3])

import { readFile, writeFile } from 'node:fs/promises'

import { office2json, json2office, template } from '../index.js'

const from = await readFile(from_path)

const json = await office2json(from)

const new_json = template(json, data)

const to = await json2office(new_json)

const buffer = Buffer.from(to, 'base64')

await writeFile(to_path, buffer)
