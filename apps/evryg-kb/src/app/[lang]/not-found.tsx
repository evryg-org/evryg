'use client'

import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { SuggestedPages } from '../../components/SuggestedPages'
import { buildGitHubIssueUrl } from '../../main/core/domain/BrokenLinkReport'
import { buildBrokenLinkReport } from '../../main/core/use_cases/BuildBrokenLinkReport'
import { REPO_URL } from '../../config'
import styles from '../../components/NotFoundPage.module.css'

const translations = {
  en: {
    title: "We couldn't find this page",
    subtitle: 'It may have been moved or is no longer available.',
    reportLink: 'Let us know about this broken link →'
  },
  fr: {
    title: 'Nous ne sommes pas parvenus à trouver cette page',
    subtitle: "Elle a peut-être été déplacée ou n'est plus disponible.",
    reportLink: 'Signaler ce lien cassé →'
  }
}

const ISSUE_LABELS = ['bug', 'kb.evryg.com']

export default function NotFound() {
  const pathname = usePathname()
  const [, lang] = pathname.split('/')
  const t = translations[lang as keyof typeof translations] ?? translations.en

  const issueUrl = useMemo(() => {
    const report = buildBrokenLinkReport({
      pathname,
      lang,
      fullUrl: typeof window !== 'undefined' ? window.location.href : pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    })
    return buildGitHubIssueUrl(report, REPO_URL, ISSUE_LABELS)
  }, [pathname, lang])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>
      <a href={issueUrl} target="_blank" rel="noopener noreferrer" className={styles.reportLink}>
        {t.reportLink}
      </a>
      <SuggestedPages />
    </div>
  )
}
