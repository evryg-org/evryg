import { getPageMap } from 'nextra/page-map'
import type { Folder, MdxFile } from 'nextra'

interface ModuleStatsProps {
  lang: string
  basePath: string
}

const translations = {
  en: (articleCount: number, moduleCount: number) =>
    `The ${articleCount} articles are organized into ${moduleCount} progressive modules.`,
  fr: (articleCount: number, moduleCount: number) =>
    `Les ${articleCount} articles sont organisés en ${moduleCount} modules progressifs.`
}

export async function ModuleStats({ lang, basePath }: ModuleStatsProps) {
  const pageMap = await getPageMap(`/${lang}/${basePath}`)

  // Count modules (folders) and articles (non-index pages within each folder)
  const modules = pageMap.filter((item): item is Folder => 'children' in item)
  const moduleCount = modules.length
  const articleCount = modules.reduce((sum, folder) => {
    const articles = folder.children.filter(
      (child): child is MdxFile => 'frontMatter' in child && child.name !== 'index'
    )
    return sum + articles.length
  }, 0)

  const translate = translations[lang as keyof typeof translations] || translations.en

  return <p>{translate(articleCount, moduleCount)}</p>
}
