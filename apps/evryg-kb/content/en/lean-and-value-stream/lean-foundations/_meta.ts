import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'lean-foundations',
  title: '1. Lean Foundations',
  icon: 'foundation',
  description: 'Fundamental Lean principles applied to software: early error detection and flow management.',
  index: 'Introduction',
  items: [
    { slug: 'detect-errors-early-from-lean-to-shift-left', title: 'Shift Left' },
    { slug: 'kanban-from-production-signal-to-corrupted-todo-list', title: 'Kanban' }
  ]
}

export default buildMeta(content)
