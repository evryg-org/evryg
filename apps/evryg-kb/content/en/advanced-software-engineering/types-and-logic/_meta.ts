import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'types-and-logic',
  title: '6. Types & Logic',
  icon: 'logic',
  description: 'Curry-Howard, Propositions as Types, Refinement Types: when types become proofs.',
  index: 'Introduction',
  items: [
    { slug: 'curry-howard-correspondence-linking-programs-and-proofs', title: 'Curry-Howard' },
    { slug: 'propositions-as-types-wadlers-unification', title: 'Propositions as Types' },
    { slug: 'refinement-and-dependent-types-towards-types-that-prove', title: 'Refinement and Dependent Types' }
  ]
}

export default buildMeta(content)
