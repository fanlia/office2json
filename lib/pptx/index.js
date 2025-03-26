export const pptx2json = (pptx) => {
  const slide = pptx['ppt/slides/slide1.xml']
  return slide2json(slide)
}

const slide2json = (slide) => {
  return slide.filter((d) => d.name === 'p:sld').map(p_sld2json)[0]
}

const p_sld2json = (p_sld) => {
  return p_sld.children.filter((d) => d.name === 'p:cSld').map(p_cSld2json)[0]
}

const p_cSld2json = (p_cSld) => {
  return p_cSld.children
    .filter((d) => d.name === 'p:spTree')
    .map(p_spTree2json)[0]
}

const p_spTree2json = (p_spTree) => {
  return p_spTree.children.filter((d) => d.name === 'p:sp').map(p_sp2json)
}

const p_sp2json = (p_sp) => {
  return p_sp.children
    .filter((d) => d.name === 'p:txBody')
    .map(p_txBody2json)[0]
}

const p_txBody2json = (p_txBody) => {
  return p_txBody.children.filter((d) => d.name === 'a:p').map(a_p2json)[0]
}

const a_p2json = (a_p) => {
  return a_p.children.filter((d) => d.name === 'a:r').map(a_r2json)
}

const a_r2json = (a_r) => {
  return a_r.children.filter((d) => d.name === 'a:t').map(a_t2json)[0] || ''
}

const a_t2json = (a_t) => {
  return a_t.children[0]?.value
}
