import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'qualite-et-tests',
  title: '4. Qualité et Tests',
  icon: 'check',
  description: 'Testabilité, TDD et Property-Based Testing : construire la confiance dans le code.',
  index: 'Introduction',
  items: [
    { slug: 'pas-de-test-sans-testabilite-le-prerequis-oublie', title: 'La testabilité' },
    { slug: 'tdd-une-discipline-de-design-pas-de-test', title: 'TDD et design emergent' },
    { slug: 'property-based-testing-puissance-et-limites', title: 'Property-Based Testing' },
    { slug: 'refactoring-securise-par-property-based-testing', title: 'Refactoring sécurisé par PBT' }
  ]
}

export default buildMeta(content)
