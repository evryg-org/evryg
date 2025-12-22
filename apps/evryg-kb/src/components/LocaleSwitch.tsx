'use client'

import { usePathname } from 'next/navigation'

type Locale = 'en' | 'fr'

interface SlugMapping {
  fr: string
  en: string
}

interface LocaleSwitchProps {
  i18n: Array<{ locale: string; name: string }>
  slugMappings: Record<string, SlugMapping>
}

const flags: Record<string, string> = {
  en: '🇬🇧',
  fr: '🇫🇷'
}

function translatePath(
  pathname: string,
  toLocale: Locale,
  mappings: Record<string, SlugMapping>
): string {
  const segments = pathname.split('/')
  return segments.map((segment, i) => {
    if (i === 0) return segment
    if (i === 1) return toLocale
    return mappings[segment]?.[toLocale] ?? segment
  }).join('/')
}

export function LocaleSwitch({ i18n, slugMappings }: LocaleSwitchProps) {
  const pathname = usePathname()
  const [, currentLocale] = pathname.split('/', 2)

  if (!i18n.length) return null

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {i18n.map((item) => {
        const isActive = item.locale === currentLocale
        const href = translatePath(pathname, item.locale as Locale, slugMappings)

        return (
          <a
            key={item.locale}
            href={href}
            style={{
              opacity: isActive ? 1 : 0.6,
              textDecoration: 'none',
              fontSize: '1.25rem',
              transition: 'opacity 0.2s'
            }}
            title={item.name}
          >
            {flags[item.locale] ?? item.locale.toUpperCase()}
          </a>
        )
      })}
    </div>
  )
}
