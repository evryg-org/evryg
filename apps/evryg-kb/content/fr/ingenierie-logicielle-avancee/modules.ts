// Module definitions - single source of truth for both _meta.tsx and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'

export const modules: Module[] = [
  {
    id: 'fondations',
    slug: 'fondations',
    title: '1. Fondations',
    icon: 'foundation',
    description: 'Monoides, DAGs et dualite code/data : les structures universelles qui sous-tendent la programmation.',
    articles: [
      'les-monoides-une-abstraction-omnipresente',
      'les-dags-une-structure-omnipresente-en-programmation',
      'code-et-data-une-dualite-fondamentale'
    ]
  },
  {
    id: 'types-bases',
    slug: 'structures-de-types',
    title: '2. Structures de Types',
    icon: 'types',
    description: "Algebre des types, ADTs et fonctions totales : les bases d'un systeme de types expressif.",
    articles: [
      'algebre-des-types-produits-et-sommes',
      'les-types-de-donnees-algebriques-precision-et-expressivite',
      'fonctions-totales-et-partielles-la-promesse-du-type'
    ]
  },
  {
    id: 'design-types',
    slug: 'design-par-les-types',
    title: '3. Design par les Types',
    icon: 'shield',
    description: "Make Illegal States Unrepresentable, Parse Don't Validate : utiliser les types comme garde-fous.",
    articles: [
      'make-illegal-states-unrepresentable',
      'parse-dont-validate',
      'machines-a-etat-et-aggregats-en-ddd',
      'isomorphismes-aux-frontieres-traduction-sans-perte-d-information'
    ]
  },
  {
    id: 'qualite',
    slug: 'qualite-et-tests',
    title: '4. Qualite et Tests',
    icon: 'check',
    description: 'Testabilite, TDD et Property-Based Testing : construire la confiance dans le code.',
    articles: [
      'pas-de-test-sans-testabilite-le-prerequis-oublie',
      'tdd-une-discipline-de-design-pas-de-test',
      'property-based-testing-puissance-et-limites',
      'refactoring-securise-par-property-based-testing'
    ]
  },
  {
    id: 'interpretation',
    slug: 'description-et-interpretation',
    title: '5. Description et Interpretation',
    icon: 'interpret',
    description: "Le programme comme valeur, DSLs et encodages : separer la description de l'execution.",
    articles: [
      'interpreter-cest-donner-du-sens-aux-donnees',
      'description-et-interpretation-le-programme-comme-valeur',
      'encodages-initial-et-final-deux-philosophies-dembedding',
      'design-systems-un-dsl-pour-lidentite-visuelle'
    ]
  },
  {
    id: 'types-logique',
    slug: 'types-et-logique',
    title: '6. Types et Logique',
    icon: 'logic',
    description: 'Curry-Howard, Propositions as Types, Refinement Types : quand les types deviennent des preuves.',
    articles: [
      'la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves',
      'propositions-as-types-lunification-de-wadler',
      'refinement-types-et-dependent-types-vers-des-types-qui-prouvent'
    ]
  },
  {
    id: 'patterns-avances',
    slug: 'patterns-avances',
    title: '7. Patterns Avances',
    icon: 'pattern',
    description: "Currying, injection implicite, interfaces et decisions architecturales : les patterns avances.",
    articles: [
      'du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite',
      'interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier',
      'trois-axes-orthogonaux-deploiement-versioning-architecture'
    ]
  }
]

// Article titles mapping (used by module folder _meta.ts files)
export const articleTitles: Record<string, string> = {
  'les-monoides-une-abstraction-omnipresente': 'Les monoides',
  'les-dags-une-structure-omnipresente-en-programmation': 'Les DAGs',
  'code-et-data-une-dualite-fondamentale': 'Code et Data',
  'algebre-des-types-produits-et-sommes': "L'algebre des types",
  'les-types-de-donnees-algebriques-precision-et-expressivite': 'Les types algebriques',
  'fonctions-totales-et-partielles-la-promesse-du-type': 'Fonctions totales et partielles',
  'make-illegal-states-unrepresentable': 'Make Illegal States Unrepresentable',
  'parse-dont-validate': "Parse, Don't Validate",
  'machines-a-etat-et-aggregats-en-ddd': 'Machines a etat et DDD',
  'isomorphismes-aux-frontieres-traduction-sans-perte-d-information': 'Isomorphismes aux frontieres',
  'pas-de-test-sans-testabilite-le-prerequis-oublie': 'La testabilite',
  'tdd-une-discipline-de-design-pas-de-test': 'TDD et design emergent',
  'property-based-testing-puissance-et-limites': 'Property-Based Testing',
  'refactoring-securise-par-property-based-testing': 'Refactoring securise par PBT',
  'interpreter-cest-donner-du-sens-aux-donnees': 'Interpreter, donner du sens',
  'description-et-interpretation-le-programme-comme-valeur': 'Le programme comme valeur',
  'encodages-initial-et-final-deux-philosophies-dembedding': 'Encodages initial et final',
  'design-systems-un-dsl-pour-lidentite-visuelle': 'Design Systems comme DSLs',
  'la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves': 'Curry-Howard',
  'propositions-as-types-lunification-de-wadler': 'Propositions as Types',
  'refinement-types-et-dependent-types-vers-des-types-qui-prouvent': 'Refinement et Dependent Types',
  'du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite': 'Currying et injection implicite',
  'interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier': 'Interfaces deductives et inductives',
  'trois-axes-orthogonaux-deploiement-versioning-architecture': 'Trois axes orthogonaux'
}
