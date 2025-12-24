// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

export const modules: Module[] = [
  {
    id: 'fondations-lean',
    slug: 'fondations-lean',
    title: '1. Fondations Lean',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Principes fondamentaux du Lean appliques au logiciel : detection precoce des erreurs et gestion du flux.',
    items: [
      { slug: 'detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left', title: 'Shift Left' },
      { slug: 'kanban-du-signal-de-production-a-la-todo-list-devoyee', title: 'Kanban' }
    ]
  },
  {
    id: 'livraison-continue',
    slug: 'livraison-continue',
    title: '2. Livraison Continue',
    indexTitle: 'Introduction',
    icon: 'flow',
    description: 'Pratiques de deploiement continu et patterns de collaboration pour un flux de livraison fluide.',
    items: [
      { slug: 'f-git-production-lequation-du-deploiement-continu', title: 'f(git) = production' },
      { slug: 'pull-requests-une-barriere-nee-de-la-mefiance', title: 'Pull Requests' }
    ]
  }
]

export default buildMeta(modules)
