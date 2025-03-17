# office2json

pptx, docx, xlsx to and from json

## Getting started

```sh
npm i office2json
```

## Usage

```javascript
import { readFile, writeFile } from 'node:fs/promises'

import { office2json, json2office, template } from '../index.js'

const files = ['test.docx', 'test.xlsx', 'test.pptx']

for (const file of files) {
  const from = await readFile(file)

  const json = await office2json(from)

  const to = await json2office(json)

  const buffer = Buffer.from(to, 'base64')

  await writeFile(`output-${file}`, buffer)
}

const json = {
  a: {
    b: {
      c: [
        {
          d: 'ok {{value1}}  ',
        },
      ],
    },
    e: '{{value1}} {{value2}}',
  },
}

const result = template(json, {
  value1: 'hello',
  value2: 'world',
})

console.dir({ json, result }, { depth: null })
//{
//  json: {
//    a: {
//      b: { c: [ { d: 'ok {{value1}}   ' } ] },
//      e: '{{value1}} {{value2}}'
//    }
//  },
//  result: {
//    a: {
//      b: { c: [ { d: 'ok hello   ' } ] },
//      e: 'hello world'
//    }
//  }
//}
```

## Thanks

[pptx2json](https://www.npmjs.com/package/pptx2json)
