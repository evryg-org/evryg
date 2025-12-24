import { Features } from './Features'

export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

export interface Article {
  slug: string
  title: string
}

export interface Module {
  id: string
  slug: string
  title: string
  indexTitle: string
  icon: IconType
  description: string
  articles: Article[]
}

interface ModuleCardsProps {
  lang: string
  basePath: string
  modules: Module[]
}

export function ModuleCards({ lang, basePath, modules }: ModuleCardsProps) {
  // Map modules to features format
  const items = modules.map(mod => ({
    title: mod.title,
    icon: mod.icon,
    description: mod.description,
    href: `/${lang}/${basePath}/${mod.slug}/${mod.articles[0].slug}`
  }))

  return <Features items={items} />
}
