import { Features } from './Features'

export type IconType = 'foundation' | 'types' | 'shield' | 'check' | 'interpret' | 'logic' | 'pattern' | 'code' | 'flow'

export interface Module {
  id: string
  title: string
  icon: IconType
  description: string
  articles: string[]
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
    href: `/${lang}/${basePath}/${mod.articles[0]}`
  }))

  return <Features items={items} />
}
