export const xlsx2json = (xlsx) => {
  const sheet = xlsx['xl/worksheets/sheet1.xml']
  const sharedStrings = xlsx['xl/sharedStrings.xml']
  const sharedStringsMap = sharedStrings2map(sharedStrings)
  const rows = sheet2json(sheet)
  return rows2json(rows, sharedStringsMap)
}

const rows2json = (rows, sharedStringsMap) => {
  return rows.map((row) =>
    row.map((col) => (col.t === 's' ? sharedStringsMap[col.v] : col.v)),
  )
}

const sheet2json = (sheet) => {
  return sheet.filter((d) => d.name === 'worksheet').map(worksheet2json)[0]
}

const worksheet2json = (worksheet) => {
  return worksheet.children
    .filter((d) => d.name === 'sheetData')
    .map(sheetData2json)[0]
}

const sheetData2json = (sheetData) => {
  return sheetData.children.filter((d) => d.name === 'row').map(row2json)
}

const row2json = (row) => {
  return row.children.filter((d) => d.name === 'c').map(c2json)
}

const c2json = (c) => {
  const t = c.attrs.t
  const v = c.children.filter((d) => d.name === 'v').map(v2json)[0] || ''
  return { t, v }
}

const v2json = (v) => {
  return v.children[0]?.value
}

const sharedStrings2map = (sharedStrings) => {
  return sharedStrings.filter((d) => d.name === 'sst').map(sst2map)[0]
}

const sst2map = (sst) => {
  return sst.children
    .filter((d) => d.name === 'si')
    .map(si2map)
    .reduce((m, d, i) => ({ ...m, [i]: d }), {})
}

const si2map = (si) => {
  return si.children.filter((d) => d.name === 't').map(t2map)[0]
}

const t2map = (t) => {
  return t.children[0].value
}
