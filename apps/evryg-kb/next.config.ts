import type { NextConfig } from "next";
import nextra from 'nextra'

const nextConfig: NextConfig = {
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  }
};

// Set up Nextra with its configuration
const withNextra = nextra({
  unstable_shouldAddLocaleToLinks: true
})

// Export the final Next.js config with Nextra included
export default withNextra(nextConfig)