import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'livraison-continue',
  title: '2. Livraison Continue',
  icon: 'flow',
  description: 'Pratiques de déploiement continu et patterns de collaboration pour un flux de livraison fluide.',
  index: 'Introduction',
  items: [
    { slug: 'f-git-production-lequation-du-deploiement-continu', title: 'f(git) = production' },
    { slug: 'pull-requests-une-barriere-nee-de-la-mefiance', title: 'Pull Requests' }
  ]
}

export default buildMeta(content)
