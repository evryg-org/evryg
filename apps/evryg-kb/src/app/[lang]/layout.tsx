import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

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

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

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
      logo={<b>evryg</b>}
      // ... Your additional navbar options
    />
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
          docsRepositoryBase="https://github.com/evryg-org/evryg/tree/main/apps/evryg-kb"
          feedback={{ content: feedbackTranslations[lang as keyof typeof feedbackTranslations] ?? feedbackTranslations.en }}
          editLink={editLinkTranslations[lang as keyof typeof editLinkTranslations] ?? editLinkTranslations.en}
          footer={footer}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'fr', name: 'Français' }
          ]}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
