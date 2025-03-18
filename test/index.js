import { readFile, writeFile, template } from '../index.js'

const files = ['test.docx', 'test.xlsx', 'test.pptx']

for (const file of files) {
  const json = await readFile(file)

  const new_json = template(json, { world: '世界' })

  await writeFile(`output-${file}`, new_json)
}
