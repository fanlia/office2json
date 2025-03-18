# office2json

pptx, docx, xlsx to and from json

## Getting started

```sh
npm i office2json
```

## Usage

### platform

- browser
- node

```javascript
import { readFile, writeFile, template } from 'office2json'

const files = ['test.docx', 'test.xlsx', 'test.pptx']

for (const file of files) {
  const json = await readFile(file)

  const new_json = template(json, { world: '世界' })

  await writeFile(`output-${file}`, new_json)
}
```

## Thanks

[pptx2json](https://www.npmjs.com/package/pptx2json)
[pptxgen](https://github.com/gitbrent/PptxGenJS)
