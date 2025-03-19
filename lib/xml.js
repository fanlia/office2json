import { convert, create } from 'xmlbuilder2'

export const xml2json = async (xml) => {
  const json = convert(xml, { format: 'object' })
  return json
}

export const json2xml = async (json) => {
  const doc = create({ encoding: 'UTF-8' }, json)
  const xml = doc.end()
  return xml
}
