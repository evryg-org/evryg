import { colors } from '../../design_system/theme'
import type { Labels } from './constants'
import { OGHeader } from './OGHeader'
import { OGContent } from './OGContent'
import { OGFooter } from './OGFooter'

export interface OGImageProps {
  title: string
  titleStyle: { fontSize: number; lineHeight: number }
  category: string | null
  readingTime: number | null
  isHomePage: boolean
  labels: Labels
}

export function OGImage({
  title,
  titleStyle,
  category,
  readingTime,
  isHomePage,
  labels,
}: OGImageProps) {
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

      {/* Green content area */}
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
