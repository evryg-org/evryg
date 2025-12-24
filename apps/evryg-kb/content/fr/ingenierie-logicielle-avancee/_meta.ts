// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as fondations } from './fondations/_meta'
import { content as structuresDeTypes } from './structures-de-types/_meta'
import { content as designParLesTypes } from './design-par-les-types/_meta'
import { content as qualiteEtTests } from './qualite-et-tests/_meta'
import { content as descriptionEtInterpretation } from './description-et-interpretation/_meta'
import { content as typesEtLogique } from './types-et-logique/_meta'
import { content as patternsAvances } from './patterns-avances/_meta'

export const modules: Module[] = [
  {
    slug: 'fondations',
    title: '1. Fondations',
    icon: 'foundation',
    description: 'Monoides, DAGs et dualité code/data : les structures universelles qui sous-tendent la programmation.',
    content: fondations
  },
  {
    slug: 'structures-de-types',
    title: '2. Structures de Types',
    icon: 'types',
    description: "Algèbre des types, ADTs et fonctions totales : les bases d'un système de types expressif.",
    content: structuresDeTypes
  },
  {
    slug: 'design-par-les-types',
    title: '3. Design par les Types',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate : utiliser les types comme garde-fous.",
    content: designParLesTypes
  },
  {
    slug: 'qualite-et-tests',
    title: '4. Qualité et Tests',
    icon: 'check',
    description: 'Testabilité, TDD et Property-Based Testing : construire la confiance dans le code.',
    content: qualiteEtTests
  },
  {
    slug: 'description-et-interpretation',
    title: '5. Description et Interprétation',
    icon: 'interpret',
    description: "Le programme comme valeur, DSLs et encodages : séparer la description de l'exécution.",
    content: descriptionEtInterpretation
  },
  {
    slug: 'types-et-logique',
    title: '6. Types et Logique',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types : quand les types deviennent des preuves.',
    content: typesEtLogique
  },
  {
    slug: 'patterns-avances',
    title: '7. Patterns Avancés',
    icon: 'pattern',
    description: "Currying, injection implicite, interfaces et décisions architecturales : les patterns avancés.",
    content: patternsAvances
  }
]

export default buildMeta(modules)
