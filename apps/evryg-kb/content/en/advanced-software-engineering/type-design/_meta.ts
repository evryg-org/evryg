import { buildMeta } from '../../../../src/libs/nextra-contrib/buildMeta'
import { modules } from '../_meta'

const mod = modules.find(m => m.slug === 'type-design')!
export default buildMeta(mod.items, mod.indexTitle)
