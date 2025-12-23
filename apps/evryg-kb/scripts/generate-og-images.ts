import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'http://localhost:3000/api/og'
const OUTPUT_DIR = 'src/tmp/og'

interface PageConfig {
  lang: string
  path: string
  filename: string
}

const pages: PageConfig[] = [
  // Home pages
  { lang: 'en', path: '', filename: 'home-en.png' },
  { lang: 'fr', path: '', filename: 'home-fr.png' },

  // EN - Advanced Software Engineering
  { lang: 'en', path: 'advanced-software-engineering', filename: 'en-advanced-software-engineering.png' },
  { lang: 'en', path: 'advanced-software-engineering/algebraic-data-types-precision-and-expressiveness', filename: 'en-advanced-software-engineering-algebraic-data-types-precision-and-expressiveness.png' },
  { lang: 'en', path: 'advanced-software-engineering/code-and-data-a-fundamental-duality', filename: 'en-advanced-software-engineering-code-and-data-a-fundamental-duality.png' },
  { lang: 'en', path: 'advanced-software-engineering/curry-howard-correspondence-linking-programs-and-proofs', filename: 'en-advanced-software-engineering-curry-howard-correspondence-linking-programs-and-proofs.png' },
  { lang: 'en', path: 'advanced-software-engineering/dags-a-ubiquitous-structure-in-programming', filename: 'en-advanced-software-engineering-dags-a-ubiquitous-structure-in-programming.png' },
  { lang: 'en', path: 'advanced-software-engineering/deductive-and-inductive-interfaces-from-user-gesture-to-business-command', filename: 'en-advanced-software-engineering-deductive-and-inductive-interfaces-from-user-gesture-to-business-command.png' },
  { lang: 'en', path: 'advanced-software-engineering/description-and-interpretation-program-as-value', filename: 'en-advanced-software-engineering-description-and-interpretation-program-as-value.png' },
  { lang: 'en', path: 'advanced-software-engineering/design-systems-a-dsl-for-visual-identity', filename: 'en-advanced-software-engineering-design-systems-a-dsl-for-visual-identity.png' },
  { lang: 'en', path: 'advanced-software-engineering/from-currying-to-dynamic-scope-threads-of-implicit-injection', filename: 'en-advanced-software-engineering-from-currying-to-dynamic-scope-threads-of-implicit-injection.png' },
  { lang: 'en', path: 'advanced-software-engineering/initial-and-final-encodings-two-embedding-philosophies', filename: 'en-advanced-software-engineering-initial-and-final-encodings-two-embedding-philosophies.png' },
  { lang: 'en', path: 'advanced-software-engineering/interpreting-is-giving-meaning-to-data', filename: 'en-advanced-software-engineering-interpreting-is-giving-meaning-to-data.png' },
  { lang: 'en', path: 'advanced-software-engineering/isomorphisms-at-boundaries-lossless-translation', filename: 'en-advanced-software-engineering-isomorphisms-at-boundaries-lossless-translation.png' },
  { lang: 'en', path: 'advanced-software-engineering/make-illegal-states-unrepresentable', filename: 'en-advanced-software-engineering-make-illegal-states-unrepresentable.png' },
  { lang: 'en', path: 'advanced-software-engineering/monoids-a-ubiquitous-abstraction', filename: 'en-advanced-software-engineering-monoids-a-ubiquitous-abstraction.png' },
  { lang: 'en', path: 'advanced-software-engineering/no-test-without-testability-the-forgotten-prerequisite', filename: 'en-advanced-software-engineering-no-test-without-testability-the-forgotten-prerequisite.png' },
  { lang: 'en', path: 'advanced-software-engineering/parse-dont-validate', filename: 'en-advanced-software-engineering-parse-dont-validate.png' },
  { lang: 'en', path: 'advanced-software-engineering/property-based-testing-power-and-limits', filename: 'en-advanced-software-engineering-property-based-testing-power-and-limits.png' },
  { lang: 'en', path: 'advanced-software-engineering/propositions-as-types-wadlers-unification', filename: 'en-advanced-software-engineering-propositions-as-types-wadlers-unification.png' },
  { lang: 'en', path: 'advanced-software-engineering/refinement-and-dependent-types-towards-types-that-prove', filename: 'en-advanced-software-engineering-refinement-and-dependent-types-towards-types-that-prove.png' },
  { lang: 'en', path: 'advanced-software-engineering/safe-refactoring-with-property-based-testing', filename: 'en-advanced-software-engineering-safe-refactoring-with-property-based-testing.png' },
  { lang: 'en', path: 'advanced-software-engineering/state-machines-and-aggregates-in-ddd', filename: 'en-advanced-software-engineering-state-machines-and-aggregates-in-ddd.png' },
  { lang: 'en', path: 'advanced-software-engineering/tdd-a-design-discipline-not-a-testing-one', filename: 'en-advanced-software-engineering-tdd-a-design-discipline-not-a-testing-one.png' },
  { lang: 'en', path: 'advanced-software-engineering/three-orthogonal-axes-deployment-versioning-architecture', filename: 'en-advanced-software-engineering-three-orthogonal-axes-deployment-versioning-architecture.png' },
  { lang: 'en', path: 'advanced-software-engineering/total-and-partial-functions-the-type-promise', filename: 'en-advanced-software-engineering-total-and-partial-functions-the-type-promise.png' },
  { lang: 'en', path: 'advanced-software-engineering/type-algebra-products-and-sums', filename: 'en-advanced-software-engineering-type-algebra-products-and-sums.png' },

  // EN - Lean and Value Stream
  { lang: 'en', path: 'lean-and-value-stream', filename: 'en-lean-and-value-stream.png' },
  { lang: 'en', path: 'lean-and-value-stream/detect-errors-early-from-lean-to-shift-left', filename: 'en-lean-and-value-stream-detect-errors-early-from-lean-to-shift-left.png' },
  { lang: 'en', path: 'lean-and-value-stream/f-git-production-the-continuous-deployment-equation', filename: 'en-lean-and-value-stream-f-git-production-the-continuous-deployment-equation.png' },
  { lang: 'en', path: 'lean-and-value-stream/kanban-from-production-signal-to-corrupted-todo-list', filename: 'en-lean-and-value-stream-kanban-from-production-signal-to-corrupted-todo-list.png' },
  { lang: 'en', path: 'lean-and-value-stream/pull-requests-a-barrier-born-from-distrust', filename: 'en-lean-and-value-stream-pull-requests-a-barrier-born-from-distrust.png' },

  // FR - Ingénierie Logicielle Avancée
  { lang: 'fr', path: 'ingenierie-logicielle-avancee', filename: 'fr-ingenierie-logicielle-avancee.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/algebre-des-types-produits-et-sommes', filename: 'fr-ingenierie-logicielle-avancee-algebre-des-types-produits-et-sommes.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/code-et-data-une-dualite-fondamentale', filename: 'fr-ingenierie-logicielle-avancee-code-et-data-une-dualite-fondamentale.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/description-et-interpretation-le-programme-comme-valeur', filename: 'fr-ingenierie-logicielle-avancee-description-et-interpretation-le-programme-comme-valeur.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/design-systems-un-dsl-pour-lidentite-visuelle', filename: 'fr-ingenierie-logicielle-avancee-design-systems-un-dsl-pour-lidentite-visuelle.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite', filename: 'fr-ingenierie-logicielle-avancee-du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/encodages-initial-et-final-deux-philosophies-dembedding', filename: 'fr-ingenierie-logicielle-avancee-encodages-initial-et-final-deux-philosophies-dembedding.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/fonctions-totales-et-partielles-la-promesse-du-type', filename: 'fr-ingenierie-logicielle-avancee-fonctions-totales-et-partielles-la-promesse-du-type.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier', filename: 'fr-ingenierie-logicielle-avancee-interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/interpreter-cest-donner-du-sens-aux-donnees', filename: 'fr-ingenierie-logicielle-avancee-interpreter-cest-donner-du-sens-aux-donnees.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/isomorphismes-aux-frontieres-traduction-sans-perte-d-information', filename: 'fr-ingenierie-logicielle-avancee-isomorphismes-aux-frontieres-traduction-sans-perte-d-information.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves', filename: 'fr-ingenierie-logicielle-avancee-la-correspondance-de-curry-howard-lien-entre-programmes-et-preuves.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/les-dags-une-structure-omnipresente-en-programmation', filename: 'fr-ingenierie-logicielle-avancee-les-dags-une-structure-omnipresente-en-programmation.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/les-monoides-une-abstraction-omnipresente', filename: 'fr-ingenierie-logicielle-avancee-les-monoides-une-abstraction-omnipresente.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/les-types-de-donnees-algebriques-precision-et-expressivite', filename: 'fr-ingenierie-logicielle-avancee-les-types-de-donnees-algebriques-precision-et-expressivite.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/machines-a-etat-et-aggregats-en-ddd', filename: 'fr-ingenierie-logicielle-avancee-machines-a-etat-et-aggregats-en-ddd.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/make-illegal-states-unrepresentable', filename: 'fr-ingenierie-logicielle-avancee-make-illegal-states-unrepresentable.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/parse-dont-validate', filename: 'fr-ingenierie-logicielle-avancee-parse-dont-validate.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/pas-de-test-sans-testabilite-le-prerequis-oublie', filename: 'fr-ingenierie-logicielle-avancee-pas-de-test-sans-testabilite-le-prerequis-oublie.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/property-based-testing-puissance-et-limites', filename: 'fr-ingenierie-logicielle-avancee-property-based-testing-puissance-et-limites.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/propositions-as-types-lunification-de-wadler', filename: 'fr-ingenierie-logicielle-avancee-propositions-as-types-lunification-de-wadler.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/refactoring-securise-par-property-based-testing', filename: 'fr-ingenierie-logicielle-avancee-refactoring-securise-par-property-based-testing.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/refinement-types-et-dependent-types-vers-des-types-qui-prouvent', filename: 'fr-ingenierie-logicielle-avancee-refinement-types-et-dependent-types-vers-des-types-qui-prouvent.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/tdd-une-discipline-de-design-pas-de-test', filename: 'fr-ingenierie-logicielle-avancee-tdd-une-discipline-de-design-pas-de-test.png' },
  { lang: 'fr', path: 'ingenierie-logicielle-avancee/trois-axes-orthogonaux-deploiement-versioning-architecture', filename: 'fr-ingenierie-logicielle-avancee-trois-axes-orthogonaux-deploiement-versioning-architecture.png' },

  // FR - Lean et Flux de Valeur
  { lang: 'fr', path: 'lean-et-flux-de-valeur', filename: 'fr-lean-et-flux-de-valeur.png' },
  { lang: 'fr', path: 'lean-et-flux-de-valeur/detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left', filename: 'fr-lean-et-flux-de-valeur-detecter-les-erreurs-au-plus-tot-du-lean-au-shift-left.png' },
  { lang: 'fr', path: 'lean-et-flux-de-valeur/f-git-production-lequation-du-deploiement-continu', filename: 'fr-lean-et-flux-de-valeur-f-git-production-lequation-du-deploiement-continu.png' },
  { lang: 'fr', path: 'lean-et-flux-de-valeur/kanban-du-signal-de-production-a-la-todo-list-devoyee', filename: 'fr-lean-et-flux-de-valeur-kanban-du-signal-de-production-a-la-todo-list-devoyee.png' },
  { lang: 'fr', path: 'lean-et-flux-de-valeur/pull-requests-une-barriere-nee-de-la-mefiance', filename: 'fr-lean-et-flux-de-valeur-pull-requests-une-barriere-nee-de-la-mefiance.png' },
]

async function generateImage(page: PageConfig): Promise<void> {
  const url = `${BASE_URL}?lang=${page.lang}&path=${encodeURIComponent(page.path)}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  const buffer = await response.arrayBuffer()
  const outputPath = join(OUTPUT_DIR, page.filename)
  await writeFile(outputPath, Buffer.from(buffer))
  console.log(`✓ ${page.filename}`)
}

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true })
  }

  console.log(`Generating ${pages.length} OG images...\n`)

  for (const page of pages) {
    await generateImage(page)
  }

  console.log(`\nDone! Generated ${pages.length} images.`)
}

main().catch(console.error)
