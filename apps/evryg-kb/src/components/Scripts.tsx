import Script from 'next/script'

import { CookiebotScript } from './CookiebotScript'

/**
 * Tracking scripts component for Cookiebot and Google Tag Manager.
 *
 * Cookiebot loads first with manual blocking mode (required for Next.js).
 * GTM is blocked until statistics consent is granted via Cookiebot.
 *
 * Environment variables:
 * - NEXT_PUBLIC_ENABLE_TRACKING_SCRIPTS: Set to "true" to enable (production only)
 * - NEXT_PUBLIC_COOKIEBOT_ID: Cookiebot domain group ID
 * - NEXT_PUBLIC_GTM_ID: Google Tag Manager container ID
 */
export function Scripts() {
  const enableTracking = process.env.NEXT_PUBLIC_ENABLE_TRACKING_SCRIPTS === 'true'
  const cookiebotId = process.env.NEXT_PUBLIC_COOKIEBOT_ID
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  if (!enableTracking || !cookiebotId || !gtmId) {
    return null
  }

  return (
    <>
      {/* Cookiebot consent management - loads first */}
      <CookiebotScript cookiebotId={cookiebotId} />

      {/* Google Tag Manager - blocked until statistics consent granted */}
      <Script
        id="gtm"
        type="text/plain"
        data-cookieconsent="statistics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  )
}
