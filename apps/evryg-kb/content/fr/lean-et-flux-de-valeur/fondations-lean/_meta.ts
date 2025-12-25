import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'fondations-lean',
  title: '1. Fondations Lean',
  icon: 'foundation',
  description: 'Principes fondamentaux du Lean appliqués au logiciel : détection précoce des erreurs et gestion du flux.',
  index: 'Introduction',
  items: [
    { slug: 'detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left', title: 'Shift Left' },
    { slug: 'kanban-du-signal-de-production-a-la-todo-list-devoyee', title: 'Kanban' }
  ]
}

export default buildMeta(content)
