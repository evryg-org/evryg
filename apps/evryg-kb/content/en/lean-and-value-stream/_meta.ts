import type { ContentNode } from '../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as leanFoundations } from './lean-foundations/_meta'
import { content as continuousDelivery } from './continuous-delivery/_meta'

// Aggregate all modules - they are ContentNodes with icon/description
export const modules: ContentNode[] = [
  leanFoundations,
  continuousDelivery
]

export default buildMeta({ items: modules })
