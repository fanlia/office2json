import { convert, create } from 'xmlbuilder2'

export class Parser {
  async parse(xml) {
    const json = convert(xml, { format: 'object' })
    return json
  }
}

export class Builder {
  async build(json) {
    const doc = create({ encoding: 'UTF-8' }, json)
    const xml = doc.end()
    return xml
  }
}
