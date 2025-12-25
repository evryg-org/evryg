import type { ContentNode } from '../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as fondationsLean } from './fondations-lean/_meta'
import { content as livraisonContinue } from './livraison-continue/_meta'

// Aggregate all modules - they are ContentNodes with icon/description
export const modules: ContentNode[] = [
  fondationsLean,
  livraisonContinue
]

export default buildMeta({ items: modules })
