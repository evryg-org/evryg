import { importPage } from 'nextra/pages'
import type { IconType } from '../libs/nextra-contrib/types'
import { CardGrid } from './CardGrid'

interface ContentCardGridProps {
  lang: string
  basePath: string
  moduleSlugs: string[]
  firstArticleSlugs: Record<string, string>
}

export async function ContentCardGrid({
  lang,
  basePath,
  moduleSlugs,
  firstArticleSlugs
}: ContentCardGridProps) {
  const modules = await Promise.all(
    moduleSlugs.map(async slug => {
      const { metadata } = await importPage([basePath, slug], lang)
      return {
        title: (metadata as { sidebarTitle?: string }).sidebarTitle || slug,
        icon: (metadata as { icon?: IconType }).icon!,
        description: (metadata as { description?: string }).description || '',
        href: `/${lang}/${basePath}/${slug}/${firstArticleSlugs[slug]}`
      }
    })
  )

  return <CardGrid items={modules} />
}
