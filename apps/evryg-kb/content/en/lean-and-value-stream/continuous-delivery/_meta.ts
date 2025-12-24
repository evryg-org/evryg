import type { ModuleContent } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ModuleContent = {
  index: 'Introduction',
  items: [
    { slug: 'f-git-production-the-continuous-deployment-equation', title: 'f(git) = production' },
    { slug: 'pull-requests-a-barrier-born-from-distrust', title: 'Pull Requests' }
  ]
}

export default buildMeta(content.items, content.index)
