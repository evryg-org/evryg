import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'from-currying-to-dynamic-scope-threads-of-implicit-injection', title: 'Currying and Implicit Injection' },
    { slug: 'deductive-and-inductive-interfaces-from-user-gesture-to-business-command', title: 'Deductive and Inductive Interfaces' },
    { slug: 'three-orthogonal-axes-deployment-versioning-architecture', title: 'Three Orthogonal Axes' }
  ]
}

export default buildMeta(content.items, content.index)
