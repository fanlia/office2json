if (process.argv.length < 3) {
  console.log('node ./to-dataurl.js filepath')
  process.exit()
}

const from_path = process.argv[2]

import { readFileAsDataURL } from '../index.js'

const dataurl = await readFileAsDataURL(from_path)

console.log(dataurl)
