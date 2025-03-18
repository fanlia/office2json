if (process.argv.length < 4) {
  console.log("node ./template-json.js ./xxx.[docx|xlsx|pptx] 'json_string'")
  process.exit()
}

const from_path = process.argv[2]
const to_path = 'output-template-' + from_path
const data = JSON.parse(process.argv[3])

import { readFile, writeFile, template } from '../index.js'

const json = await readFile(from_path)

const new_json = template(json, data)

await writeFile(to_path, new_json)
