// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as fondationsLean } from './fondations-lean/_meta'
import { content as livraisonContinue } from './livraison-continue/_meta'

export const modules: Module[] = [
  {
    slug: 'fondations-lean',
    title: '1. Fondations Lean',
    icon: 'foundation',
    description: 'Principes fondamentaux du Lean appliqués au logiciel : détection précoce des erreurs et gestion du flux.',
    content: fondationsLean
  },
  {
    slug: 'livraison-continue',
    title: '2. Livraison Continue',
    icon: 'flow',
    description: 'Pratiques de déploiement continu et patterns de collaboration pour un flux de livraison fluide.',
    content: livraisonContinue
  }
]

export default buildMeta(modules)
