import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'f-git-production-lequation-du-deploiement-continu', title: 'f(git) = production' },
    { slug: 'pull-requests-une-barriere-nee-de-la-mefiance', title: 'Pull Requests' }
  ]
}

export default buildMeta(content.items, content.index)
