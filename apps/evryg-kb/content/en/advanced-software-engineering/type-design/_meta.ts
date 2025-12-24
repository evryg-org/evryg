import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
    { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
    { slug: 'state-machines-and-aggregates-in-ddd', title: 'State Machines and DDD' },
    { slug: 'isomorphisms-at-boundaries-lossless-translation', title: 'Isomorphisms at Boundaries' }
  ]
}

export default buildMeta(content.items, content.index)
