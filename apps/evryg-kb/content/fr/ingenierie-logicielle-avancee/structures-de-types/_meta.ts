import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'structures-de-types',
  title: '2. Structures de Types',
  icon: 'types',
  description: "Algèbre des types, ADTs et fonctions totales : les bases d'un système de types expressif.",
  index: 'Introduction',
  items: [
    { slug: 'algebre-des-types-produits-et-sommes', title: "L'algèbre des types" },
    { slug: 'les-types-de-donnees-algebriques-precision-et-expressivite', title: 'Les types algébriques' },
    { slug: 'fonctions-totales-et-partielles-la-promesse-du-type', title: 'Fonctions totales et partielles' }
  ]
}

export default buildMeta(content)
