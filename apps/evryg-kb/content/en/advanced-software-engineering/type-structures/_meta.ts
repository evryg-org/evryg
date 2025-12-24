import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'type-algebra-products-and-sums', title: 'Type Algebra' },
    { slug: 'algebraic-data-types-precision-and-expressiveness', title: 'Algebraic Data Types' },
    { slug: 'total-and-partial-functions-the-type-promise', title: 'Total and Partial Functions' }
  ]
}

export default buildMeta(content.items, content.index)
