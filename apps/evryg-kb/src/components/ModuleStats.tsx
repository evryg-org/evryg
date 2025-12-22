import type { Module } from './ModuleCards'

interface ModuleStatsProps {
  modules: Module[]
}

export function ModuleStats({ modules }: ModuleStatsProps) {
  const moduleCount = modules.length
  const articleCount = modules.reduce((sum, mod) => sum + mod.articles.length, 0)

  return (
    <p>
      Les {articleCount} articles sont organises en {moduleCount} modules progressifs.
    </p>
  )
}
