import { readFile, extract } from '../index.js'

if (process.argv.length < 3) {
  console.log('node ./extract.js ./xxx.[docx|xlsx|pptx]')
  process.exit()
}

const from_path = process.argv[2]

const json = await readFile(from_path)

const text = extract(json, from_path)

console.log(text)
