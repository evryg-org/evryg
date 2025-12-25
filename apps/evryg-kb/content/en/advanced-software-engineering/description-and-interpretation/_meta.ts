import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'description-and-interpretation',
  title: '5. Description & Interpretation',
  icon: 'interpret',
  description: 'Program as value, DSLs and encodings: separating description from execution.',
  index: 'Introduction',
  items: [
    { slug: 'interpreting-is-giving-meaning-to-data', title: 'Interpreting, Giving Meaning' },
    { slug: 'description-and-interpretation-program-as-value', title: 'Program as Value' },
    { slug: 'initial-and-final-encodings-two-embedding-philosophies', title: 'Initial and Final Encodings' },
    { slug: 'design-systems-a-dsl-for-visual-identity', title: 'Design Systems as DSLs' }
  ]
}

export default buildMeta(content)
