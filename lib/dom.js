import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom'

export const xml2json = async (xml) => {
  const dom = new DOMParser().parseFromString(xml, 'text/xml')
  return dom2json(dom)
}

export const json2xml = async (json) => {
  const dom = await json2dom(json)
  return new XMLSerializer().serializeToString(dom)
}

const instruction2json = ({ nodeName, nodeValue }) => {
  return {
    name: nodeName,
    type: 'instruction',
    value: nodeValue,
  }
}

const json2instruction = (dom, item) => {
  const node = dom.ownerDocument.createProcessingInstruction(
    item.name,
    item.value,
  )
  dom.appendChild(node)
}

const text2json = ({ nodeValue }) => {
  return {
    name: '#',
    type: 'text',
    value: nodeValue,
  }
}

const json2text = (dom, item) => {
  const node = dom.ownerDocument.createTextNode(item.value)
  dom.appendChild(node)
}

const attributes2json = (attributes) => {
  const attrs = {}
  for (const { name, value } of attributes) {
    attrs[name] = value
  }
  return attrs
}

const json2atttributes = (dom, attrs) => {
  for (const [name, value] of Object.entries(attrs)) {
    dom.setAttribute(name, value)
  }
}

const element2json = ({ nodeName, attributes, childNodes }) => {
  return {
    name: nodeName,
    type: 'element',
    attrs: attributes2json(attributes),
    children: nodes2json(childNodes),
  }
}

const json2element = (dom, item) => {
  const node = dom.ownerDocument.createElement(item.name)
  json2atttributes(node, item.attrs)
  json2nodes(node, item.children)
  dom.appendChild(node)
}

const nodes2json = (nodes) => {
  const children = []
  for (const node of nodes) {
    if (node.nodeType === 1) {
      const child = element2json(node)
      children.push(child)
    } else if (node.nodeType === 3) {
      const child = text2json(node)
      children.push(child)
    } else if (node.nodeType === 7) {
      const child = instruction2json(node)
      children.push(child)
    }
  }
  return children
}

const json2nodes = (dom, items) => {
  for (const item of items) {
    if (item.type === 'text') {
      json2text(dom, item)
    } else if (item.type === 'instruction') {
      json2instruction(dom, item)
    } else {
      json2element(dom, item)
    }
  }
}

export const dom2json = async (dom) => {
  return nodes2json(dom.childNodes)
}

export const json2dom = async (json) => {
  const dom = new DOMImplementation().createDocument()
  json2nodes(dom, json)
  return dom
}
