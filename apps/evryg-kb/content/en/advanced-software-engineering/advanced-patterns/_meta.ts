import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'advanced-patterns',
  title: '7. Advanced Patterns',
  icon: 'pattern',
  description: 'Currying, implicit injection, interfaces and architectural decisions: advanced patterns.',
  index: 'Introduction',
  items: [
    { slug: 'from-currying-to-dynamic-scope-threads-of-implicit-injection', title: 'Currying and Implicit Injection' },
    { slug: 'deductive-and-inductive-interfaces-from-user-gesture-to-business-command', title: 'Deductive and Inductive Interfaces' },
    { slug: 'three-orthogonal-axes-deployment-versioning-architecture', title: 'Three Orthogonal Axes' }
  ]
}

export default buildMeta(content)
