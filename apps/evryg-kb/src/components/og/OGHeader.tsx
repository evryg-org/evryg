import { colors } from '../../design_system/theme'
import { EvrygLogoSvg } from './EvrygLogoSvg'

interface OGHeaderProps {
  knowledgeBaseLabel: string
}

export function OGHeader({ knowledgeBaseLabel }: OGHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.raisin,
        padding: '28px 50px',
      }}
    >
      {/* Left: Logo + Knowledge Base */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <EvrygLogoSvg />

        {/* Separator */}
        <div
          style={{
            width: 1,
            height: 28,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          }}
        />

        {/* Knowledge Base label */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            letterSpacing: '0.01em',
          }}
        >
          {knowledgeBaseLabel}
        </div>
      </div>

      {/* Green square accent */}
      <div
        style={{
          width: 36,
          height: 36,
          backgroundColor: colors.accent,
        }}
      />
    </div>
  )
}
