export const docx2json = (docx) => {
  const document = docx['word/document.xml']
  return document2json(document)
}

const document2json = (document) => {
  return document.filter((d) => d.name === 'w:document').map(w_document2json)[0]
}

const w_document2json = (w_document) => {
  return w_document.children
    .filter((d) => d.name === 'w:body')
    .map(w_body2json)[0]
}

const w_body2json = (w_body) => {
  return w_body.children.filter((d) => d.name === 'w:p').map(w_p2json)
}

const w_p2json = (w_p) => {
  return w_p.children.filter((d) => d.name === 'w:r').map(w_r2json)
}

const w_r2json = (w_r) => {
  return w_r.children.filter((d) => d.name === 'w:t').map(w_t2json)[0] || ''
}

const w_t2json = (w_t) => {
  return w_t.children[0]?.value
}
