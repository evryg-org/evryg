import type { ContentNode } from '../../../../src/libs/nextra-contrib/types'
import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'

export const content: ContentNode = {
  slug: 'continuous-delivery',
  title: '2. Continuous Delivery',
  icon: 'flow',
  description: 'Continuous deployment practices and collaboration patterns for a smooth delivery flow.',
  index: 'Introduction',
  items: [
    { slug: 'f-git-production-the-continuous-deployment-equation', title: 'f(git) = production' },
    { slug: 'pull-requests-a-barrier-born-from-distrust', title: 'Pull Requests' }
  ]
}

export default buildMeta(content)
