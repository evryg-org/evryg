import { modules } from './modules'

// Generate meta from modules config - single source of truth
const meta: Record<string, string> = {
  index: 'Introduction'
}

for (const mod of modules) {
  // Reference the folder by its slug
  meta[mod.slug] = mod.title
}

export default meta
