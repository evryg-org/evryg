// Module definitions - single source of truth for both _meta.tsx and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'

export const modules: Module[] = [
  {
    id: 'lean-foundations',
    slug: 'lean-foundations',
    title: '1. Lean Foundations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Fundamental Lean principles applied to software: early error detection and flow management.',
    articles: [
      'detect-errors-early-from-lean-to-shift-left',
      'kanban-from-production-signal-to-corrupted-todo-list'
    ]
  },
  {
    id: 'continuous-delivery',
    slug: 'continuous-delivery',
    title: '2. Continuous Delivery',
    indexTitle: 'Introduction',
    icon: 'flow',
    description: 'Continuous deployment practices and collaboration patterns for a smooth delivery flow.',
    articles: [
      'f-git-production-the-continuous-deployment-equation',
      'pull-requests-a-barrier-born-from-distrust'
    ]
  }
]

// Article titles mapping
export const articleTitles: Record<string, string> = {
  'detect-errors-early-from-lean-to-shift-left': 'Shift Left',
  'kanban-from-production-signal-to-corrupted-todo-list': 'Kanban',
  'f-git-production-the-continuous-deployment-equation': 'f(git) = production',
  'pull-requests-a-barrier-born-from-distrust': 'Pull Requests'
}
