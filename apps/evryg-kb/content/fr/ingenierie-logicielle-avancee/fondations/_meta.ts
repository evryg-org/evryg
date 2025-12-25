import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'fondations',
  title: '1. Fondations',
  icon: 'foundation',
  description: 'Monoides, DAGs et dualité code/data : les structures universelles qui sous-tendent la programmation.',
  index: 'Introduction',
  items: [
    { slug: 'les-monoides-une-abstraction-omnipresente', title: 'Les monoides' },
    { slug: 'les-dags-une-structure-omnipresente-en-programmation', title: 'Les DAGs' },
    { slug: 'code-et-data-une-dualite-fondamentale', title: 'Code et Data' }
  ]
}

export default buildMeta(content)
