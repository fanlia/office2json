# office2json

pptx, docx, xlsx to and from json

## Getting started

```sh
npm i office2json
```

## Usage

```javascript
import { readFile, writeFile } from 'node:fs/promises'

import { office2json, json2office } from '../index.js'

const files = ['test.docx', 'test.xlsx', 'test.pptx']

for (const file of files) {
  const from = await readFile(file)

  const json = await office2json(from)

  const to = await json2office(json)

  const buffer = Buffer.from(to, 'base64')

  await writeFile(`output-${file}`, buffer)
}
```

## Thanks

[pptx2json](https://www.npmjs.com/package/pptx2json)
