import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'foundations',
  title: '1. Foundations',
  icon: 'foundation',
  description: 'Monoids, DAGs and code/data duality: the universal structures underlying programming.',
  index: 'Introduction',
  items: [
    { slug: 'monoids-a-ubiquitous-abstraction', title: 'Monoids' },
    { slug: 'dags-a-ubiquitous-structure-in-programming', title: 'DAGs' },
    { slug: 'code-and-data-a-fundamental-duality', title: 'Code and Data' }
  ]
}

export default buildMeta(content)
