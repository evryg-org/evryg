import type { ContentNode } from '../libs/nextra-contrib/types'

interface ModuleStatsProps {
  modules: ContentNode[]
}

export function ModuleStats({ modules }: ModuleStatsProps) {
  const moduleCount = modules.length
  const articleCount = modules.reduce((sum, mod) => sum + (mod.items?.length ?? 0), 0)

  return (
    <p>
      Les {articleCount} articles sont organises en {moduleCount} modules progressifs.
    </p>
  )
}
