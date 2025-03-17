import { template } from '../index.js'

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
