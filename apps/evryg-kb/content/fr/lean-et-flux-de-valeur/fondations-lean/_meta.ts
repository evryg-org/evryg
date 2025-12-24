import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left', title: 'Shift Left' },
    { slug: 'kanban-du-signal-de-production-a-la-todo-list-devoyee', title: 'Kanban' }
  ]
}

export default buildMeta(content.items, content.index)
