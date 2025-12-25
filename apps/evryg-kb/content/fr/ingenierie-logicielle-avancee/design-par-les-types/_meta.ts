import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'design-par-les-types',
  title: '3. Design par les Types',
  icon: 'shield',
  description: "Make Illegal States Unrepresentable, Parse Don't Validate : utiliser les types comme garde-fous.",
  index: 'Introduction',
  items: [
    { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
    { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
    { slug: 'machines-a-etat-et-aggregats-en-ddd', title: 'Machines à état et DDD' },
    { slug: 'isomorphismes-aux-frontieres-traduction-sans-perte-d-information', title: 'Isomorphismes aux frontières' }
  ]
}

export default buildMeta(content)
