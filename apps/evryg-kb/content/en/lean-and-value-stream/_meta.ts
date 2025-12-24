// Module definitions - single source of truth for both Nextra navigation and ModuleCards
import type { Module } from '../../../src/components/ModuleCards'
import { buildMeta } from '../../../src/libs/nextra-contrib/buildMeta'

// Import content from each module (colocalized)
import { content as leanFoundations } from './lean-foundations/_meta'
import { content as continuousDelivery } from './continuous-delivery/_meta'

export const modules: Module[] = [
  {
    slug: 'lean-foundations',
    title: '1. Lean Foundations',
    icon: 'foundation',
    description: 'Fundamental Lean principles applied to software: early error detection and flow management.',
    content: leanFoundations
  },
  {
    slug: 'continuous-delivery',
    title: '2. Continuous Delivery',
    icon: 'flow',
    description: 'Continuous deployment practices and collaboration patterns for a smooth delivery flow.',
    content: continuousDelivery
  }
]

export default buildMeta(modules)
