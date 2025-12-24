// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

export const modules: Module[] = [
  {
    slug: 'lean-foundations',
    title: '1. Lean Foundations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Fundamental Lean principles applied to software: early error detection and flow management.',
    items: [
      { slug: 'detect-errors-early-from-lean-to-shift-left', title: 'Shift Left' },
      { slug: 'kanban-from-production-signal-to-corrupted-todo-list', title: 'Kanban' }
    ]
  },
  {
    slug: 'continuous-delivery',
    title: '2. Continuous Delivery',
    indexTitle: 'Introduction',
    icon: 'flow',
    description: 'Continuous deployment practices and collaboration patterns for a smooth delivery flow.',
    items: [
      { slug: 'f-git-production-the-continuous-deployment-equation', title: 'f(git) = production' },
      { slug: 'pull-requests-a-barrier-born-from-distrust', title: 'Pull Requests' }
    ]
  }
]

export default buildMeta(modules)
