if (process.argv.length < 3) {
  console.log('node ./from-json.js ./xxx.json ./yyy.json')
  process.exit()
}
const from_path = process.argv[2]
const to_path = process.argv[3]
const { default: json_left } = await import(from_path, {
  with: { type: 'json' },
})
const { default: json_right } = await import(to_path, {
  with: { type: 'json' },
})

import jsonpatch from 'fast-json-patch'
const { compare } = jsonpatch
const diff = compare(json_left, json_right)
console.dir(diff, { depth: null })
