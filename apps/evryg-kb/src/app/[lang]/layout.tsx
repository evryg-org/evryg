import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import 'katex/dist/katex.min.css'
import { LocaleSwitch } from '../../components/LocaleSwitch'
import { DOCS_REPOSITORY_BASE } from '../../config'
import { ThemedEvrygLogo } from '../../design_system/ThemedEvrygLogo'
import { VerticalSeparator } from '../../design_system/VerticalSeparator'
import { getSlugMappings } from '../../slug-mappings'

const bannerTranslations = {
  en: "Looking for experienced guidance on Lean software delivery? We'd be glad to explore how we can work together.",
  fr: "Vous cherchez un accompagnement senior en Lean software delivery ? Discutons ensemble de notre collaboration future."
}

const feedbackTranslations = {
  en: "Question about this page? Talk to evryg directly",
  fr: "Une question sur cette page ? Parlez-en avec evryg directement"
}

const editLinkTranslations = {
  en: "Edit this page",
  fr: "Modifier cette page"
}

function getMetadataBaseUrl(): string {
  // Production: use configured URL
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Vercel preview: use deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Fallback
  return 'https://kb.evryg.com'
}

export const metadata = {
  metadataBase: new URL(getMetadataBaseUrl()),
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const slugMappings = getSlugMappings()
  const i18n = [
    { locale: 'en', name: 'English' },
    { locale: 'fr', name: 'Français' }
  ]

  const banner = (
    <Banner storageKey="evryg-lean-consulting" style={{ padding: '0.75rem 0' }}>
      🇫🇷 🇪🇺 {bannerTranslations[lang as keyof typeof bannerTranslations] ?? bannerTranslations.en}{' '}
      <a
        href="https://www.evryg.com/contact"
        style={{ fontWeight: 'bold', textDecoration: 'underline', marginLeft: '0.5rem' }}
      >
        Contact →
      </a>
    </Banner>
  )

  const navbar = (
    <Navbar
      logo={<a href={`/${lang}`} style={{ display: "flex", alignItems: "center", height: "100%" }}><ThemedEvrygLogo /></a>}
      logoLink={false}
    >
      <LocaleSwitch i18n={i18n} slugMappings={slugMappings} />
      <VerticalSeparator />
      <ThemeSwitch />
    </Navbar>
  )
  const footer = (
    <Footer>
      <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">
        CC BY-NC 4.0
      </a>{' '}
      {new Date().getFullYear()} © evryg sas
    </Footer>
  )

  return (
    <html
      lang={lang}
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        {/* Your additional tags should be passed as children of <Head> element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap(`/${lang}`)}
          docsRepositoryBase={DOCS_REPOSITORY_BASE}
          feedback={{ content: feedbackTranslations[lang as keyof typeof feedbackTranslations] ?? feedbackTranslations.en }}
          editLink={editLinkTranslations[lang as keyof typeof editLinkTranslations] ?? editLinkTranslations.en}
          footer={footer}
          i18n={[]}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
