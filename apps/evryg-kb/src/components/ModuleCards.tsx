import type { ContentItem } from '../libs/nextra-contrib/types'
import { Features } from './Features'

export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

export interface Module extends ContentItem {
  icon: IconType
  description: string
  items: ContentItem[]  // required for modules (overrides optional from ContentItem)
}

interface ModuleCardsProps {
  lang: string
  basePath: string
  modules: Module[]
}

export function ModuleCards({ lang, basePath, modules }: ModuleCardsProps) {
  // Map modules to features format
  const featureItems = modules.map(mod => ({
    title: mod.title,
    icon: mod.icon,
    description: mod.description,
    href: `/${lang}/${basePath}/${mod.slug}/${mod.items[0].slug}`
  }))

  return <Features items={featureItems} />
}
