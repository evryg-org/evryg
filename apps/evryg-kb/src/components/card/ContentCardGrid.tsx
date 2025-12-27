import { getPageMap } from 'nextra/page-map'
import type { Folder, MdxFile } from 'nextra'
import type { IconType } from '../../libs/nextra-contrib/types'
import { CardGrid } from './CardGrid'

interface ContentCardGridProps {
  lang: string
  basePath: string
}

export async function ContentCardGrid({
  lang,
  basePath
}: ContentCardGridProps) {
  const pageMap = await getPageMap(`/${lang}/${basePath}`)

  // Filter for folders (modules) and build items
  const items = pageMap
    .filter((item): item is Folder => 'children' in item)
    .map(folder => {
      // Find the index page for this module (for title, icon, description)
      const indexPage = folder.children.find(
        (child): child is MdxFile => 'frontMatter' in child && child.name === 'index'
      )
      // Find the first article (non-index page)
      const firstArticle = folder.children.find(
        (child): child is MdxFile => 'frontMatter' in child && child.name !== 'index'
      )

      const frontMatter = indexPage?.frontMatter as {
        sidebarTitle?: string
        icon?: IconType
        description?: string
      } | undefined

      return {
        title: frontMatter?.sidebarTitle || folder.name,
        icon: frontMatter?.icon || 'foundation',
        description: frontMatter?.description || '',
        href: firstArticle?.route || folder.route
      }
    })

  return <CardGrid items={items} />
}
