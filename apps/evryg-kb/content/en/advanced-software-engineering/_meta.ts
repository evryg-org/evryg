import type { ContentNode } from '../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as foundations } from './foundations/_meta'
import { content as typeStructures } from './type-structures/_meta'
import { content as typeDesign } from './type-design/_meta'
import { content as qualityAndTesting } from './quality-and-testing/_meta'
import { content as descriptionAndInterpretation } from './description-and-interpretation/_meta'
import { content as typesAndLogic } from './types-and-logic/_meta'
import { content as advancedPatterns } from './advanced-patterns/_meta'

// Aggregate all modules - they are ContentNodes with icon/description
export const modules: ContentNode[] = [
  foundations,
  typeStructures,
  typeDesign,
  qualityAndTesting,
  descriptionAndInterpretation,
  typesAndLogic,
  advancedPatterns
]

export default buildMeta({ items: modules })
