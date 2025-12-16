import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="some-key">Nextra 4.0 is released</Banner>

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  const navbar = (
    <Navbar
      logo={<b>Nextra</b>}
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
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
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
