import type { ContentNode } from '../libs/nextra-contrib/types'
import { Features } from './Features'

interface ModuleCardsProps {
  lang: string
  basePath: string
  modules: ContentNode[]
}

export function ModuleCards({ lang, basePath, modules }: ModuleCardsProps) {
  // Map modules to features format
  const featureItems = modules.map(mod => ({
    title: mod.title,
    icon: mod.icon!,
    description: mod.description!,
    href: `/${lang}/${basePath}/${mod.slug}/${mod.items![0].slug}`
  }))

  return <Features items={featureItems} />
}
