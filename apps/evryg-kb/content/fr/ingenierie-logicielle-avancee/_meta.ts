// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

export const modules: Module[] = [
  {
    slug: 'fondations',
    title: '1. Fondations',
    indexTitle: 'Introduction',
    icon: 'foundation',
    description: 'Monoides, DAGs et dualité code/data : les structures universelles qui sous-tendent la programmation.',
    items: [
      { slug: 'les-monoides-une-abstraction-omnipresente', title: 'Les monoides' },
      { slug: 'les-dags-une-structure-omnipresente-en-programmation', title: 'Les DAGs' },
      { slug: 'code-et-data-une-dualite-fondamentale', title: 'Code et Data' }
    ]
  },
  {
    slug: 'structures-de-types',
    title: '2. Structures de Types',
    indexTitle: 'Introduction',
    icon: 'types',
    description: "Algèbre des types, ADTs et fonctions totales : les bases d'un système de types expressif.",
    items: [
      { slug: 'algebre-des-types-produits-et-sommes', title: "L'algèbre des types" },
      { slug: 'les-types-de-donnees-algebriques-precision-et-expressivite', title: 'Les types algébriques' },
      { slug: 'fonctions-totales-et-partielles-la-promesse-du-type', title: 'Fonctions totales et partielles' }
    ]
  },
  {
    slug: 'design-par-les-types',
    title: '3. Design par les Types',
    indexTitle: 'Introduction',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate : utiliser les types comme garde-fous.",
    items: [
      { slug: 'make-illegal-states-unrepresentable', title: 'Make Illegal States Unrepresentable' },
      { slug: 'parse-dont-validate', title: "Parse, Don't Validate" },
      { slug: 'machines-a-etat-et-aggregats-en-ddd', title: 'Machines à état et DDD' },
      { slug: 'isomorphismes-aux-frontieres-traduction-sans-perte-d-information', title: 'Isomorphismes aux frontières' }
    ]
  },
  {
    slug: 'qualite-et-tests',
    title: '4. Qualité et Tests',
    indexTitle: 'Introduction',
    icon: 'check',
    description: 'Testabilité, TDD et Property-Based Testing : construire la confiance dans le code.',
    items: [
      { slug: 'pas-de-test-sans-testabilite-le-prerequis-oublie', title: 'La testabilité' },
      { slug: 'tdd-une-discipline-de-design-pas-de-test', title: 'TDD et design emergent' },
      { slug: 'property-based-testing-puissance-et-limites', title: 'Property-Based Testing' },
      { slug: 'refactoring-securise-par-property-based-testing', title: 'Refactoring sécurisé par PBT' }
    ]
  },
  {
    slug: 'description-et-interpretation',
    title: '5. Description et Interprétation',
    indexTitle: 'Introduction',
    icon: 'interpret',
    description: "Le programme comme valeur, DSLs et encodages : séparer la description de l'exécution.",
    items: [
      { slug: 'interpreter-cest-donner-du-sens-aux-donnees', title: 'Interpréter, donner du sens' },
      { slug: 'description-et-interpretation-le-programme-comme-valeur', title: 'Le programme comme valeur' },
      { slug: 'encodages-initial-et-final-deux-philosophies-dembedding', title: 'Encodages initial et final' },
      { slug: 'design-systems-un-dsl-pour-lidentite-visuelle', title: 'Design Systems comme DSLs' }
    ]
  },
  {
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
    slug: 'patterns-avances',
    title: '7. Patterns Avancés',
    indexTitle: 'Introduction',
    icon: 'pattern',
    description: "Currying, injection implicite, interfaces et décisions architecturales : les patterns avancés.",
    items: [
      { slug: 'du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite', title: 'Currying et injection implicite' },
      { slug: 'interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier', title: 'Interfaces déductives et inductives' },
      { slug: 'trois-axes-orthogonaux-deploiement-versioning-architecture', title: 'Trois axes orthogonaux' }
    ]
  }
]

export default buildMeta(modules)
