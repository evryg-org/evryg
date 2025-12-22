'use client'

import { usePathname } from 'next/navigation'
import { SuggestedPages } from '../../components/SuggestedPages'
import styles from '../../components/NotFoundPage.module.css'

const translations = {
  en: {
    title: "We couldn't find this page",
    subtitle: 'It may have been moved or is no longer available.'
  },
  fr: {
    title: 'Nous ne sommes pas parvenus à trouver cette page',
    subtitle: "Elle a peut-être été déplacée ou n'est plus disponible."
  }
}

export default function NotFound() {
  const pathname = usePathname()
  const [, lang] = pathname.split('/')
  const t = translations[lang as keyof typeof translations] ?? translations.en

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>
      <SuggestedPages />
    </div>
  )
}
