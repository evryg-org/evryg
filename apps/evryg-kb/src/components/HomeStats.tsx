import { getContentStats } from '../lib/content-stats'
import { Stats } from './Stats'

interface HomeStatsProps {
  locale: string
  labels: {
    articles: string
    domains: string
    toLearn: string
  }
}

export function HomeStats({ locale, labels }: HomeStatsProps) {
  const { articleCount, domainCount } = getContentStats(locale)

  return (
    <Stats
      items={[
        { value: String(articleCount), label: labels.articles },
        { value: String(domainCount), label: labels.domains },
        { value: '∞', label: labels.toLearn }
      ]}
    />
  )
}
