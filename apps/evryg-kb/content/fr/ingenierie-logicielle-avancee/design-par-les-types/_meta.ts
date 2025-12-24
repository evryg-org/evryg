import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
    { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
    { slug: 'machines-a-etat-et-aggregats-en-ddd', title: 'Machines à état et DDD' },
    { slug: 'isomorphismes-aux-frontieres-traduction-sans-perte-d-information', title: 'Isomorphismes aux frontières' }
  ]
}

export default buildMeta(content.items, content.index)
