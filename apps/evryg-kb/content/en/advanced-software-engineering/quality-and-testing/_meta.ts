import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'quality-and-testing',
  title: '4. Quality & Testing',
  icon: 'check',
  description: 'Testability, TDD and Property-Based Testing: building confidence in code.',
  index: 'Introduction',
  items: [
    { slug: 'no-test-without-testability-the-forgotten-prerequisite', title: 'Testability' },
    { slug: 'tdd-a-design-discipline-not-a-testing-one', title: 'TDD and Emergent Design' },
    { slug: 'property-based-testing-power-and-limits', title: 'Property-Based Testing' },
    { slug: 'safe-refactoring-with-property-based-testing', title: 'Safe Refactoring with PBT' }
  ]
}

export default buildMeta(content)
