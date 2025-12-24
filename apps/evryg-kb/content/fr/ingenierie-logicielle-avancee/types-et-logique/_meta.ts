import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves', title: 'Curry-Howard' },
    { slug: 'propositions-as-types-lunification-de-wadler', title: 'Propositions as Types' },
    { slug: 'refinement-types-et-dependent-types-vers-des-types-qui-prouvent', title: 'Refinement et Dependent Types' }
  ]
}

export default buildMeta(content.items, content.index)
