import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'patterns-avances',
  title: '7. Patterns Avancés',
  icon: 'pattern',
  description: "Currying, injection implicite, interfaces et décisions architecturales : les patterns avancés.",
  index: 'Introduction',
  items: [
    { slug: 'du-currying-au-dynamic-scope-fils-conducteurs-de-linjection-implicite', title: 'Currying et injection implicite' },
    { slug: 'interfaces-deductives-et-inductives-du-geste-utilisateur-a-la-commande-metier', title: 'Interfaces déductives et inductives' },
    { slug: 'trois-axes-orthogonaux-deploiement-versioning-architecture', title: 'Trois axes orthogonaux' }
  ]
}

export default buildMeta(content)
