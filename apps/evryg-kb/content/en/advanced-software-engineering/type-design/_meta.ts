import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'type-design',
  title: '3. Design by Types',
  icon: 'shield',
  description: "Make Illegal States Unrepresentable, Parse Don't Validate: using types as guardrails.",
  index: 'Introduction',
  items: [
    { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
    { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
    { slug: 'state-machines-and-aggregates-in-ddd', title: 'State Machines and DDD' },
    { slug: 'isomorphisms-at-boundaries-lossless-translation', title: 'Isomorphisms at Boundaries' }
  ]
}

export default buildMeta(content)
