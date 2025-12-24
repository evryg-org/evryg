// Module definitions - single source of truth for both _meta.tsx and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'

export const modules: Module[] = [
  {
    id: 'fondations-lean',
    slug: 'fondations-lean',
    title: '1. Fondations Lean',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Principes fondamentaux du Lean appliques au logiciel : detection precoce des erreurs et gestion du flux.',
    articles: [
      'detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left',
      'kanban-du-signal-de-production-a-la-todo-list-devoyee'
    ]
  },
  {
    id: 'livraison-continue',
    slug: 'livraison-continue',
    title: '2. Livraison Continue',
    indexTitle: 'Introduction',
    icon: 'flow',
    description: 'Pratiques de deploiement continu et patterns de collaboration pour un flux de livraison fluide.',
    articles: [
      'f-git-production-lequation-du-deploiement-continu',
      'pull-requests-une-barriere-nee-de-la-mefiance'
    ]
  }
]

// Article titles mapping
export const articleTitles: Record<string, string> = {
  'detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left': 'Shift Left',
  'kanban-du-signal-de-production-a-la-todo-list-devoyee': 'Kanban',
  'f-git-production-lequation-du-deploiement-continu': 'f(git) = production',
  'pull-requests-une-barriere-nee-de-la-mefiance': 'Pull Requests'
}
