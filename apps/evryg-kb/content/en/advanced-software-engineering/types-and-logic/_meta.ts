import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'curry-howard-correspondence-linking-programs-and-proofs', title: 'Curry-Howard' },
    { slug: 'propositions-as-types-wadlers-unification', title: 'Propositions as Types' },
    { slug: 'refinement-and-dependent-types-towards-types-that-prove', title: 'Refinement and Dependent Types' }
  ]
}

export default buildMeta(content.items, content.index)
