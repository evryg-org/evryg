import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'detect-errors-early-from-lean-to-shift-left', title: 'Shift Left' },
    { slug: 'kanban-from-production-signal-to-corrupted-todo-list', title: 'Kanban' }
  ]
}

export default buildMeta(content.items, content.index)
