import type { ContentNode } from '../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as fondations } from './fondations/_meta'
import { content as structuresDeTypes } from './structures-de-types/_meta'
import { content as designParLesTypes } from './design-par-les-types/_meta'
import { content as qualiteEtTests } from './qualite-et-tests/_meta'
import { content as descriptionEtInterpretation } from './description-et-interpretation/_meta'
import { content as typesEtLogique } from './types-et-logique/_meta'
import { content as patternsAvances } from './patterns-avances/_meta'

// Aggregate all modules - they are ContentNodes with icon/description
export const modules: ContentNode[] = [
  fondations,
  structuresDeTypes,
  designParLesTypes,
  qualiteEtTests,
  descriptionEtInterpretation,
  typesEtLogique,
  patternsAvances
]

export default buildMeta({ items: modules })
