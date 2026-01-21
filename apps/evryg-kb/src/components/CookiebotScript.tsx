import Script from 'next/script'

/**
 * Cookiebot consent management script with CSS override for smaller banner.
 * Reference: https://support.cookiebot.com/hc/en-us/articles/11349045625756
 */
export function CookiebotScript({ cookiebotId }: { cookiebotId: string }) {
  return (
    <>
      <style>{`
        div#CybotCookiebotDialog {
          scale: 65%;
        }
      `}</style>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={cookiebotId}
        data-blockingmode="manual"
        strategy="afterInteractive"
      />
    </>
  )
}
