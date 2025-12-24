// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as foundations } from './foundations/_meta'
import { content as typeStructures } from './type-structures/_meta'
import { content as typeDesign } from './type-design/_meta'
import { content as qualityAndTesting } from './quality-and-testing/_meta'
import { content as descriptionAndInterpretation } from './description-and-interpretation/_meta'
import { content as typesAndLogic } from './types-and-logic/_meta'
import { content as advancedPatterns } from './advanced-patterns/_meta'

export const modules: Module[] = [
  {
    slug: 'foundations',
    title: '1. Foundations',
    icon: 'foundation',
    description: 'Monoids, DAGs and code/data duality: the universal structures underlying programming.',
    content: foundations
  },
  {
    slug: 'type-structures',
    title: '2. Type Structures',
    icon: 'types',
    description: 'Type algebra, ADTs and total functions: the foundations of an expressive type system.',
    content: typeStructures
  },
  {
    slug: 'type-design',
    title: '3. Design by Types',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate: using types as guardrails.",
    content: typeDesign
  },
  {
    slug: 'quality-and-testing',
    title: '4. Quality & Testing',
    icon: 'check',
    description: 'Testability, TDD and Property-Based Testing: building confidence in code.',
    content: qualityAndTesting
  },
  {
    slug: 'description-and-interpretation',
    title: '5. Description & Interpretation',
    icon: 'interpret',
    description: 'Program as value, DSLs and encodings: separating description from execution.',
    content: descriptionAndInterpretation
  },
  {
    slug: 'types-and-logic',
    title: '6. Types & Logic',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types: when types become proofs.',
    content: typesAndLogic
  },
  {
    slug: 'advanced-patterns',
    title: '7. Advanced Patterns',
    icon: 'pattern',
    description: 'Currying, implicit injection, interfaces and architectural decisions: advanced patterns.',
    content: advancedPatterns
  }
]

export default buildMeta(modules)
