import type { ModuleContent } from '../libs/nextra-contrib/types'
import { Features } from './Features'

export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

export interface Module {
  slug: string
  title: string
  icon: IconType
  description: string
  content: ModuleContent
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
    href: `/${lang}/${basePath}/${mod.slug}/${mod.content.items[0].slug}`
  }))

  return <Features items={featureItems} />
}
