import { modules, articleTitles } from './modules'

// Generate meta from modules config - single source of truth
const meta: Record<string, string | { type: 'separator'; title: string }> = {
  index: 'Introduction'
}

for (const mod of modules) {
  // Add separator
  meta[`-- ${mod.id}`] = { type: 'separator', title: mod.title }

  // Add articles
  for (const article of mod.articles) {
    meta[article] = articleTitles[article] ?? article
  }
}

export default meta
