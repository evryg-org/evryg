// Module definitions - single source of truth for both _meta.tsx and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'

export const modules: Module[] = [
  {
    id: 'foundations',
    slug: 'foundations',
    title: '1. Foundations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Monoids, DAGs and code/data duality: the universal structures underlying programming.',
    articles: [
      'monoids-a-ubiquitous-abstraction',
      'dags-a-ubiquitous-structure-in-programming',
      'code-and-data-a-fundamental-duality'
    ]
  },
  {
    id: 'type-basics',
    slug: 'type-structures',
    title: '2. Type Structures',
    indexTitle: 'Introduction',
    icon: 'types',
    description: 'Type algebra, ADTs and total functions: the foundations of an expressive type system.',
    articles: [
      'type-algebra-products-and-sums',
      'algebraic-data-types-precision-and-expressiveness',
      'total-and-partial-functions-the-type-promise'
    ]
  },
  {
    id: 'type-design',
    slug: 'type-design',
    title: '3. Design by Types',
    indexTitle: 'Introduction',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate: using types as guardrails.",
    articles: [
      'make-illegal-states-unrepresentable',
      'parse-dont-validate',
      'state-machines-and-aggregates-in-ddd',
      'isomorphisms-at-boundaries-lossless-translation'
    ]
  },
  {
    id: 'quality',
    slug: 'quality-and-testing',
    title: '4. Quality & Testing',
    indexTitle: 'Introduction',
    icon: 'check',
    description: 'Testability, TDD and Property-Based Testing: building confidence in code.',
    articles: [
      'no-test-without-testability-the-forgotten-prerequisite',
      'tdd-a-design-discipline-not-a-testing-one',
      'property-based-testing-power-and-limits',
      'safe-refactoring-with-property-based-testing'
    ]
  },
  {
    id: 'interpretation',
    slug: 'description-and-interpretation',
    title: '5. Description & Interpretation',
    indexTitle: 'Introduction',
    icon: 'interpret',
    description: 'Program as value, DSLs and encodings: separating description from execution.',
    articles: [
      'interpreting-is-giving-meaning-to-data',
      'description-and-interpretation-program-as-value',
      'initial-and-final-encodings-two-embedding-philosophies',
      'design-systems-a-dsl-for-visual-identity'
    ]
  },
  {
    id: 'types-logic',
    slug: 'types-and-logic',
    title: '6. Types & Logic',
    indexTitle: 'Introduction',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types: when types become proofs.',
    articles: [
      'curry-howard-correspondence-linking-programs-and-proofs',
      'propositions-as-types-wadlers-unification',
      'refinement-and-dependent-types-towards-types-that-prove'
    ]
  },
  {
    id: 'advanced-patterns',
    slug: 'advanced-patterns',
    title: '7. Advanced Patterns',
    indexTitle: 'Introduction',
    icon: 'pattern',
    description: 'Currying, implicit injection, interfaces and architectural decisions: advanced patterns.',
    articles: [
      'from-currying-to-dynamic-scope-threads-of-implicit-injection',
      'deductive-and-inductive-interfaces-from-user-gesture-to-business-command',
      'three-orthogonal-axes-deployment-versioning-architecture'
    ]
  }
]

// Article titles mapping (used by module folder _meta.ts files)
export const articleTitles: Record<string, string> = {
  'monoids-a-ubiquitous-abstraction': 'Monoids',
  'dags-a-ubiquitous-structure-in-programming': 'DAGs',
  'code-and-data-a-fundamental-duality': 'Code and Data',
  'type-algebra-products-and-sums': 'Type Algebra',
  'algebraic-data-types-precision-and-expressiveness': 'Algebraic Data Types',
  'total-and-partial-functions-the-type-promise': 'Total and Partial Functions',
  'make-illegal-states-unrepresentable': 'Make Illegal States Unrepresentable',
  'parse-dont-validate': "Parse, Don't Validate",
  'state-machines-and-aggregates-in-ddd': 'State Machines and DDD',
  'isomorphisms-at-boundaries-lossless-translation': 'Isomorphisms at Boundaries',
  'no-test-without-testability-the-forgotten-prerequisite': 'Testability',
  'tdd-a-design-discipline-not-a-testing-one': 'TDD and Emergent Design',
  'property-based-testing-power-and-limits': 'Property-Based Testing',
  'safe-refactoring-with-property-based-testing': 'Safe Refactoring with PBT',
  'interpreting-is-giving-meaning-to-data': 'Interpreting, Giving Meaning',
  'description-and-interpretation-program-as-value': 'Program as Value',
  'initial-and-final-encodings-two-embedding-philosophies': 'Initial and Final Encodings',
  'design-systems-a-dsl-for-visual-identity': 'Design Systems as DSLs',
  'curry-howard-correspondence-linking-programs-and-proofs': 'Curry-Howard',
  'propositions-as-types-wadlers-unification': 'Propositions as Types',
  'refinement-and-dependent-types-towards-types-that-prove': 'Refinement and Dependent Types',
  'from-currying-to-dynamic-scope-threads-of-implicit-injection': 'Currying and Implicit Injection',
  'deductive-and-inductive-interfaces-from-user-gesture-to-business-command': 'Deductive and Inductive Interfaces',
  'three-orthogonal-axes-deployment-versioning-architecture': 'Three Orthogonal Axes'
}
