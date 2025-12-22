import { Features } from './Features'
import { modules, type IconType } from '../../content/fr/ingenierie-avancee/modules'

interface ModuleCardsProps {
  lang: string
  basePath: string
}

export async function ModuleCards({ lang, basePath }: ModuleCardsProps) {
  // Map modules to features format
  const items = modules.map(module => ({
    title: module.title,
    icon: module.icon as IconType,
    description: module.description,
    href: `/${lang}/${basePath}/${module.articles[0]}`
  }))

  return <Features items={items} />
}
