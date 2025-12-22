interface OGFooterProps {
  lang: string
}

const FOOTER_TEXT = {
  en: {
    tagline: 'evryg · Paris · Senior Consulting on Lean Software Delivery',
    services: 'AI · Cloud · DevOps · Backend · Frontend · Change Management · Organisation Consulting',
  },
  fr: {
    tagline: 'evryg · Paris · Conseil Senior en Lean Software Delivery',
    services: 'IA · Cloud · DevOps · Backend · Frontend · Conduite du Changement · Conseil en organisation',
  },
}

export function OGFooter({ lang }: OGFooterProps) {
  const text = FOOTER_TEXT[lang as keyof typeof FOOTER_TEXT] || FOOTER_TEXT.en

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '1px solid rgba(255, 255, 255, 0.25)',
        paddingTop: 20,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.01em',
          }}
        >
          {text.tagline}
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.6)',
            letterSpacing: '0.02em',
          }}
        >
          {text.services}
        </div>
      </div>

      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
          color: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        www.evryg.com
      </div>
    </div>
  )
}
