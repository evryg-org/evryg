import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'
import { modules } from '../_meta'

const mod = modules.find(m => m.slug === 'lean-foundations')!
export default buildMeta(mod.articles, mod.indexTitle)
