import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'types-et-logique',
  title: '6. Types et Logique',
  icon: 'logic',
  description: 'Curry-Howard, Propositions as Types, Refinement Types : quand les types deviennent des preuves.',
  index: 'Introduction',
  items: [
    { slug: 'la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves', title: 'Curry-Howard' },
    { slug: 'propositions-as-types-lunification-de-wadler', title: 'Propositions as Types' },
    { slug: 'refinement-types-et-dependent-types-vers-des-types-qui-prouvent', title: 'Refinement et Dependent Types' }
  ]
}

export default buildMeta(content)
