if (process.argv.length < 3) {
  console.log('node ./to-json.js ./xxx.[docx|xlsx|pptx]')
  process.exit()
}

import { basename } from 'node:path'

const from_path = process.argv[2]
const to_path = 'output-' + basename(from_path) + '.json'

import { writeFile } from 'node:fs/promises'

import { readFile } from '../index.js'

const json = await readFile(from_path)

await writeFile(to_path, JSON.stringify(json, null, 2))

console.log('writed to file', to_path)
