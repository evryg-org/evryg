// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

export const modules: Module[] = [
  {
    id: 'foundations',
    slug: 'foundations',
    title: '1. Foundations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Monoids, DAGs and code/data duality: the universal structures underlying programming.',
    items: [
      { slug: 'monoids-a-ubiquitous-abstraction', title: 'Monoids' },
      { slug: 'dags-a-ubiquitous-structure-in-programming', title: 'DAGs' },
      { slug: 'code-and-data-a-fundamental-duality', title: 'Code and Data' }
    ]
  },
  {
    id: 'type-basics',
    slug: 'type-structures',
    title: '2. Type Structures',
    indexTitle: 'Introduction',
    icon: 'types',
    description: 'Type algebra, ADTs and total functions: the foundations of an expressive type system.',
    items: [
      { slug: 'type-algebra-products-and-sums', title: 'Type Algebra' },
      { slug: 'algebraic-data-types-precision-and-expressiveness', title: 'Algebraic Data Types' },
      { slug: 'total-and-partial-functions-the-type-promise', title: 'Total and Partial Functions' }
    ]
  },
  {
    id: 'type-design',
    slug: 'type-design',
    title: '3. Design by Types',
    indexTitle: 'Introduction',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate: using types as guardrails.",
    items: [
      { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
      { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
      { slug: 'state-machines-and-aggregates-in-ddd', title: 'State Machines and DDD' },
      { slug: 'isomorphisms-at-boundaries-lossless-translation', title: 'Isomorphisms at Boundaries' }
    ]
  },
  {
    id: 'quality',
    slug: 'quality-and-testing',
    title: '4. Quality & Testing',
    indexTitle: 'Introduction',
    icon: 'check',
    description: 'Testability, TDD and Property-Based Testing: building confidence in code.',
    items: [
      { slug: 'no-test-without-testability-the-forgotten-prerequisite', title: 'Testability' },
      { slug: 'tdd-a-design-discipline-not-a-testing-one', title: 'TDD and Emergent Design' },
      { slug: 'property-based-testing-power-and-limits', title: 'Property-Based Testing' },
      { slug: 'safe-refactoring-with-property-based-testing', title: 'Safe Refactoring with PBT' }
    ]
  },
  {
    id: 'interpretation',
    slug: 'description-and-interpretation',
    title: '5. Description & Interpretation',
    indexTitle: 'Introduction',
    icon: 'interpret',
    description: 'Program as value, DSLs and encodings: separating description from execution.',
    items: [
      { slug: 'interpreting-is-giving-meaning-to-data', title: 'Interpreting, Giving Meaning' },
      { slug: 'description-and-interpretation-program-as-value', title: 'Program as Value' },
      { slug: 'initial-and-final-encodings-two-embedding-philosophies', title: 'Initial and Final Encodings' },
      { slug: 'design-systems-a-dsl-for-visual-identity', title: 'Design Systems as DSLs' }
    ]
  },
  {
    id: 'types-logic',
    slug: 'types-and-logic',
    title: '6. Types & Logic',
    indexTitle: 'Introduction',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types: when types become proofs.',
    items: [
      { slug: 'curry-howard-correspondence-linking-programs-and-proofs', title: 'Curry-Howard' },
      { slug: 'propositions-as-types-wadlers-unification', title: 'Propositions as Types' },
      { slug: 'refinement-and-dependent-types-towards-types-that-prove', title: 'Refinement and Dependent Types' }
    ]
  },
  {
    id: 'advanced-patterns',
    slug: 'advanced-patterns',
    title: '7. Advanced Patterns',
    indexTitle: 'Introduction',
    icon: 'pattern',
    description: 'Currying, implicit injection, interfaces and architectural decisions: advanced patterns.',
    items: [
      { slug: 'from-currying-to-dynamic-scope-threads-of-implicit-injection', title: 'Currying and Implicit Injection' },
      { slug: 'deductive-and-inductive-interfaces-from-user-gesture-to-business-command', title: 'Deductive and Inductive Interfaces' },
      { slug: 'three-orthogonal-axes-deployment-versioning-architecture', title: 'Three Orthogonal Axes' }
    ]
  }
]

export default buildMeta(modules)
