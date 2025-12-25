import type { ContentNode } from '../libs/nextra-contrib/types'
import { CardGrid } from './CardGrid'

interface ContentCardGridProps {
  lang: string
  basePath: string
  items: ContentNode[]
}

export function ContentCardGrid({ lang, basePath, items }: ContentCardGridProps) {
  const cardItems = items.map(node => ({
    title: node.title,
    icon: node.icon!,
    description: node.description!,
    href: `/${lang}/${basePath}/${node.slug}/${node.items![0].slug}`
  }))

  return <CardGrid items={cardItems} />
}
