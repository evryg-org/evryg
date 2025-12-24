// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

export const modules: Module[] = [
  {
    id: 'fondations',
    slug: 'fondations',
    title: '1. Fondations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Monoides, DAGs et dualite code/data : les structures universelles qui sous-tendent la programmation.',
    items: [
      { slug: 'les-monoides-une-abstraction-omnipresente', title: 'Les monoides' },
      { slug: 'les-dags-une-structure-omnipresente-en-programmation', title: 'Les DAGs' },
      { slug: 'code-et-data-une-dualite-fondamentale', title: 'Code et Data' }
    ]
  },
  {
    id: 'types-bases',
    slug: 'structures-de-types',
    title: '2. Structures de Types',
    indexTitle: 'Introduction',
    icon: 'types',
    description: "Algebre des types, ADTs et fonctions totales : les bases d'un systeme de types expressif.",
    items: [
      { slug: 'algebre-des-types-produits-et-sommes', title: "L'algebre des types" },
      { slug: 'les-types-de-donnees-algebriques-precision-et-expressivite', title: 'Les types algebriques' },
      { slug: 'fonctions-totales-et-partielles-la-promesse-du-type', title: 'Fonctions totales et partielles' }
    ]
  },
  {
    id: 'design-types',
    slug: 'design-par-les-types',
    title: '3. Design par les Types',
    indexTitle: 'Introduction',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate : utiliser les types comme garde-fous.",
    items: [
      { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
      { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
      { slug: 'machines-a-etat-et-aggregats-en-ddd', title: 'Machines a etat et DDD' },
      { slug: 'isomorphismes-aux-frontieres-traduction-sans-perte-d-information', title: 'Isomorphismes aux frontieres' }
    ]
  },
  {
    id: 'qualite',
    slug: 'qualite-et-tests',
    title: '4. Qualite et Tests',
    indexTitle: 'Introduction',
    icon: 'check',
    description: 'Testabilite, TDD et Property-Based Testing : construire la confiance dans le code.',
    items: [
      { slug: 'pas-de-test-sans-testabilite-le-prerequis-oublie', title: 'La testabilite' },
      { slug: 'tdd-une-discipline-de-design-pas-de-test', title: 'TDD et design emergent' },
      { slug: 'property-based-testing-puissance-et-limites', title: 'Property-Based Testing' },
      { slug: 'refactoring-securise-par-property-based-testing', title: 'Refactoring securise par PBT' }
    ]
  },
  {
    id: 'interpretation',
    slug: 'description-et-interpretation',
    title: '5. Description et Interpretation',
    indexTitle: 'Introduction',
    icon: 'interpret',
    description: "Le programme comme valeur, DSLs et encodages : separer la description de l'execution.",
    items: [
      { slug: 'interpreter-cest-donner-du-sens-aux-donnees', title: 'Interpreter, donner du sens' },
      { slug: 'description-et-interpretation-le-programme-comme-valeur', title: 'Le programme comme valeur' },
      { slug: 'encodages-initial-et-final-deux-philosophies-dembedding', title: 'Encodages initial et final' },
      { slug: 'design-systems-un-dsl-pour-lidentite-visuelle', title: 'Design Systems comme DSLs' }
    ]
  },
  {
    id: 'types-logique',
    slug: 'types-et-logique',
    title: '6. Types et Logique',
    indexTitle: 'Introduction',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types : quand les types deviennent des preuves.',
    items: [
      { slug: 'la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves', title: 'Curry-Howard' },
      { slug: 'propositions-as-types-lunification-de-wadler', title: 'Propositions as Types' },
      { slug: 'refinement-types-et-dependent-types-vers-des-types-qui-prouvent', title: 'Refinement et Dependent Types' }
    ]
  },
  {
    id: 'patterns-avances',
    slug: 'patterns-avances',
    title: '7. Patterns Avances',
    indexTitle: 'Introduction',
    icon: 'pattern',
    description: "Currying, injection implicite, interfaces et decisions architecturales : les patterns avances.",
    items: [
      { slug: 'du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite', title: 'Currying et injection implicite' },
      { slug: 'interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier', title: 'Interfaces deductives et inductives' },
      { slug: 'trois-axes-orthogonaux-deploiement-versioning-architecture', title: 'Trois axes orthogonaux' }
    ]
  }
]

export default buildMeta(modules)
