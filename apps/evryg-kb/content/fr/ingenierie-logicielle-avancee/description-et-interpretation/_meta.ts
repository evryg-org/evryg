import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'interpreter-cest-donner-du-sens-aux-donnees', title: 'Interpréter, donner du sens' },
    { slug: 'description-et-interpretation-le-programme-comme-valeur', title: 'Le programme comme valeur' },
    { slug: 'encodages-initial-et-final-deux-philosophies-dembedding', title: 'Encodages initial et final' },
    { slug: 'design-systems-un-dsl-pour-lidentite-visuelle', title: 'Design Systems comme DSLs' }
  ]
}

export default buildMeta(content.items, content.index)
