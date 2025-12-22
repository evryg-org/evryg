import { colors } from '../../design_system/theme'
import type { Labels } from '../../main/core/domain/OGImageData'
import { OGHeader } from './OGHeader'
import { OGContent } from './OGContent'
import { OGFooter } from './OGFooter'

export interface OGImageProps {
  title: string
  category: string | null
  readingTime: number | null
  isHomePage: boolean
  labels: Labels
}

function getTitleStyle(title: string): { fontSize: number; lineHeight: number } {
  const length = title.length
  if (length <= 30) return { fontSize: 64, lineHeight: 1.1 }
  if (length <= 50) return { fontSize: 56, lineHeight: 1.15 }
  if (length <= 80) return { fontSize: 48, lineHeight: 1.2 }
  if (length <= 120) return { fontSize: 40, lineHeight: 1.25 }
  return { fontSize: 34, lineHeight: 1.3 }
}

export function OGImage({
  title,
  category,
  readingTime,
  isHomePage,
  labels,
}: OGImageProps) {
  const titleStyle = getTitleStyle(title)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Source Sans 3, sans-serif',
        backgroundColor: colors.accent,
      }}
    >
      <OGHeader knowledgeBaseLabel={labels.knowledgeBase} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '40px 50px 50px 50px',
          justifyContent: 'space-between',
        }}
      >
        <OGContent
          title={title}
          titleStyle={titleStyle}
          category={category}
          readingTime={readingTime}
          isHomePage={isHomePage}
          labels={labels}
        />
        <OGFooter />
      </div>
    </div>
  )
}
