import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'algebre-des-types-produits-et-sommes', title: "L'algèbre des types" },
    { slug: 'les-types-de-donnees-algebriques-precision-et-expressivite', title: 'Les types algébriques' },
    { slug: 'fonctions-totales-et-partielles-la-promesse-du-type', title: 'Fonctions totales et partielles' }
  ]
}

export default buildMeta(content.items, content.index)
